import { Router } from "express";
import Lead from "../models/Lead.js";
import auth from "../middleware/auth.js";
import rateLimit from "../middleware/rateLimit.js";
import { uploadPieceJointe } from "../middleware/upload.js";
import { uploadBuffer, supprimerFichier, cloudinaryConfigured } from "../config/cloudinary.js";

const router = Router();

// ---------------------------------------------------------------------------
// POST /api/leads — dépôt d'une demande (public)
//
// §19 et §21 du cahier des charges : validation SERVEUR, protection anti-spam,
// et confirmation renvoyée au visiteur. La validation côté navigateur n'est
// qu'un confort ; c'est ici que ça compte, car rien n'empêche d'appeler l'API
// directement.
// ---------------------------------------------------------------------------

// Trois défenses complémentaires, aucune bloquante pour un humain :
//   1. le piège (« siteWeb ») — champ invisible que les robots remplissent ;
//   2. le délai minimum — un humain ne remplit pas neuf champs en 2 secondes ;
//   3. la limite de débit par IP.
const DELAI_MINIMUM_MS = 3000;

const estEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function valider(corps) {
  const erreurs = {};
  const texte = (v) => (typeof v === "string" ? v.trim() : "");

  if (!texte(corps.nom)) erreurs.nom = "Indiquez votre nom.";
  else if (texte(corps.nom).length > 120) erreurs.nom = "Nom trop long.";

  if (!texte(corps.telephone)) erreurs.telephone = "Indiquez un numéro de téléphone.";
  else if (!/^[\d\s+().-]{6,30}$/.test(texte(corps.telephone)))
    erreurs.telephone = "Ce numéro de téléphone semble incorrect.";

  if (!texte(corps.email)) erreurs.email = "Indiquez votre e-mail.";
  else if (!estEmail(texte(corps.email))) erreurs.email = "Cette adresse e-mail semble incorrecte.";

  if (!texte(corps.message)) erreurs.message = "Décrivez votre projet en quelques mots.";
  else if (texte(corps.message).length > 5000) erreurs.message = "Message trop long.";

  return erreurs;
}

router.post(
  "/",
  rateLimit({ fenetreMs: 15 * 60 * 1000, max: 5 }),
  // multer doit tourner avant la lecture du corps : la requête est en
  // multipart/form-data pour porter la pièce jointe.
  (req, res, next) =>
    uploadPieceJointe.single("fichier")(req, res, (err) =>
      err ? res.status(400).json({ message: err.message }) : next()
    ),
  async (req, res, next) => {
    try {
      // 1) Le piège à robots. Réponse 200 volontaire : un robot qui reçoit une
      //    erreur réessaie en s'adaptant, un robot qui croit avoir réussi passe
      //    à autre chose.
      if (req.body.siteWeb) {
        return res.status(200).json({ ok: true });
      }

      // 2) Délai de remplissage.
      const ouvertDepuis = Number(req.body.ouvertDepuis || 0);
      if (ouvertDepuis && ouvertDepuis < DELAI_MINIMUM_MS) {
        return res.status(400).json({
          message: "Envoi trop rapide. Vérifiez le formulaire et réessayez.",
        });
      }

      // 3) Validation des champs.
      const erreurs = valider(req.body);
      if (Object.keys(erreurs).length) {
        return res.status(422).json({
          message: "Certains champs sont incomplets ou incorrects.",
          errors: erreurs,
        });
      }

      // Pièce jointe éventuelle → Cloudinary. Les PDF/DWG/ZIP partent en `raw`,
      // Cloudinary ne sachant pas les traiter comme des images.
      let fichier;
      if (req.file) {
        if (!cloudinaryConfigured) {
          return res.status(503).json({
            message: "L'envoi de pièces jointes est momentanément indisponible.",
          });
        }
        const estImage = req.file.mimetype.startsWith("image/");
        const resultat = await uploadBuffer(req.file.buffer, {
          dossier: "bim-leaders/demandes",
          type: estImage ? "image" : "raw",
          nomFichier: req.file.originalname,
        });
        fichier = {
          url: resultat.secure_url,
          publicId: resultat.public_id,
          nom: req.file.originalname,
          taille: req.file.size,
        };
      }

      // Liste blanche explicite des champs enregistrés : ce qui arrive dans le
      // corps de la requête ne va pas directement dans la base.
      const champs = [
        "type", "nom", "telephone", "email", "message",
        "typeClient", "typeProjet", "localisation", "surface", "budget",
        "fonction", "pays", "typePartenaire", "secteur", "fourchette",
        "collaboration", "projet",
      ];
      const donnees = {};
      for (const c of champs) {
        if (typeof req.body[c] === "string" && req.body[c].trim()) {
          donnees[c] = req.body[c].trim();
        }
      }
      if (donnees.type !== "investisseur") donnees.type = "contact";

      await Lead.create({
        ...donnees,
        fichier,
        ip: req.ip,
        userAgent: (req.headers["user-agent"] || "").slice(0, 300),
      });

      return res.status(201).json({ ok: true });
    } catch (err) {
      return next(err);
    }
  }
);

// ---------------------------------------------------------------------------
// Consultation des demandes — réservée au dashboard.
// ---------------------------------------------------------------------------
router.get("/", auth, async (req, res, next) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(500).lean();
    const nonLues = await Lead.countDocuments({ statut: "nouveau" });
    res.json({ items: leads, nonLues });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { statut } = req.body;
    if (!["nouveau", "lu", "traite"].includes(statut)) {
      return res.status(422).json({ message: "Statut inconnu." });
    }
    const lead = await Lead.findByIdAndUpdate(req.params.id, { statut }, { new: true }).lean();
    if (!lead) return res.status(404).json({ message: "Demande introuvable." });
    return res.json(lead);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Demande introuvable." });
    // Ne pas laisser la pièce jointe orpheline sur Cloudinary.
    if (lead.fichier?.publicId) {
      const estImage = /\.(jpe?g|png|webp|avif)$/i.test(lead.fichier.nom || "");
      await supprimerFichier(lead.fichier.publicId, estImage ? "image" : "raw");
    }
    return res.json({ ok: true });
  } catch (err) {
    return next(err);
  }
});

export default router;
