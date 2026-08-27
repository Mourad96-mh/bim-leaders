import { Router } from "express";
import Realisation from "../models/Realisation.js";
import auth from "../middleware/auth.js";
import { supprimerFichier } from "../config/cloudinary.js";

const router = Router();

// Fabrique un slug d'URL à partir du nom du projet.
// « Résidence Al Manar — R+4 » → « residence-al-manar-r-4 »
function versSlug(texte) {
  return String(texte)
    .normalize("NFD")
    // \p{Diacritic} plutôt qu'une plage de caractères combinants écrite
    // littéralement : celle-ci serait invisible dans un éditeur et se perdrait
    // au moindre passage par un outil qui recode le fichier.
    .replace(/\p{Diacritic}/gu, "") // retire les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// Un slug déjà pris reçoit un suffixe numérique plutôt que d'échouer : le gérant
// n'a pas à comprendre ce qu'est un slug pour enregistrer deux « Villa Souissi ».
async function slugUnique(base, idAExclure) {
  const racine = versSlug(base) || "projet";
  let candidat = racine;
  let n = 2;
  // eslint-disable-next-line no-await-in-loop
  while (await Realisation.exists({ slug: candidat, _id: { $ne: idAExclure } })) {
    candidat = `${racine}-${n}`;
    n += 1;
  }
  return candidat;
}

// Normalise un lien vidéo collé tel quel en URL d'intégration.
// Le gérant colle ce que YouTube lui donne ; c'est à nous de le convertir.
function versEmbed(url) {
  if (!url) return "";
  const v = String(url).trim();
  const youtube = v.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;
  const vimeo = v.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return v; // déjà une URL d'intégration, ou un autre hébergeur
}

// Liste blanche des champs modifiables : le corps de la requête ne va jamais
// directement dans le document.
function extraireChamps(corps) {
  const out = {};
  const textes = ["nom", "localisation", "type", "surface", "description", "statut"];
  for (const c of textes) if (corps[c] !== undefined) out[c] = corps[c];

  if (corps.annee !== undefined) out.annee = corps.annee ? Number(corps.annee) : undefined;
  if (corps.ordre !== undefined) out.ordre = Number(corps.ordre) || 100;
  if (corps.publie !== undefined) out.publie = Boolean(corps.publie);
  if (corps.videoUrl !== undefined) out.videoUrl = versEmbed(corps.videoUrl);
  if (Array.isArray(corps.prestations))
    out.prestations = corps.prestations.map((p) => String(p).trim()).filter(Boolean);
  if (Array.isArray(corps.photos)) out.photos = corps.photos;
  if (Array.isArray(corps.avantApres)) out.avantApres = corps.avantApres;

  if (out.statut && !["realise", "en-cours"].includes(out.statut)) delete out.statut;
  return out;
}

// ---------------------------------------------------------------------------
// GET /api/realisations — public (site) ou complet (dashboard, ?all=1)
//
// Sans jeton valide, seuls les projets publiés sortent : `?all=1` exige une
// authentification, sinon un simple paramètre d'URL exposerait les brouillons.
// ---------------------------------------------------------------------------
router.get("/", async (req, res, next) => {
  try {
    const veutTout = req.query.all === "1";
    if (veutTout) {
      return auth(req, res, async (err) => {
        if (err) return next(err);
        const items = await Realisation.find().sort({ ordre: 1, annee: -1 }).lean();
        return res.json({ items });
      });
    }
    const items = await Realisation.find({ publie: true })
      .sort({ ordre: 1, annee: -1 })
      .lean();
    return res.json({ items });
  } catch (err) {
    return next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const projet = await Realisation.findOne({ slug: req.params.slug, publie: true }).lean();
    if (!projet) return res.status(404).json({ message: "Réalisation introuvable." });
    return res.json(projet);
  } catch (err) {
    return next(err);
  }
});

// ---------------------------------------------------------------------------
// Écriture — réservée au dashboard.
// ---------------------------------------------------------------------------
router.post("/", auth, async (req, res, next) => {
  try {
    const champs = extraireChamps(req.body);
    if (!champs.nom?.trim()) {
      return res.status(422).json({
        message: "Le nom du projet est obligatoire.",
        errors: { nom: "Indiquez le nom du projet." },
      });
    }
    champs.slug = await slugUnique(req.body.slug || champs.nom);
    const projet = await Realisation.create(champs);
    return res.status(201).json(projet);
  } catch (err) {
    return next(err);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const existant = await Realisation.findById(req.params.id);
    if (!existant) return res.status(404).json({ message: "Réalisation introuvable." });

    const champs = extraireChamps(req.body);

    // ⚠️ Le slug n'est PAS régénéré quand le nom change : l'URL a pu être
    // partagée ou indexée par Google. Il ne bouge que si on le demande
    // explicitement, et le dashboard prévient alors de la rupture de lien.
    if (req.body.slug && req.body.slug !== existant.slug) {
      champs.slug = await slugUnique(req.body.slug, existant._id);
    }

    // Photos retirées de la fiche → supprimées aussi chez Cloudinary, pour ne
    // pas accumuler des fichiers que plus rien ne référence.
    if (Array.isArray(champs.photos)) {
      const gardees = new Set(champs.photos.map((p) => p.publicId).filter(Boolean));
      const retirees = existant.photos
        .map((p) => p.publicId)
        .filter((id) => id && !gardees.has(id));
      await Promise.all(retirees.map((id) => supprimerFichier(id, "image")));
    }

    Object.assign(existant, champs);
    await existant.save();
    return res.json(existant);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const projet = await Realisation.findByIdAndDelete(req.params.id);
    if (!projet) return res.status(404).json({ message: "Réalisation introuvable." });

    const aSupprimer = [
      ...projet.photos.map((p) => p.publicId),
      ...projet.avantApres.flatMap((p) => [p.avantPublicId, p.apresPublicId]),
    ].filter(Boolean);
    await Promise.all(aSupprimer.map((id) => supprimerFichier(id, "image")));

    return res.json({ ok: true });
  } catch (err) {
    return next(err);
  }
});

export default router;
