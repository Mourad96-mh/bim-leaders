import { Router } from "express";
import auth from "../middleware/auth.js";
import { uploadImage } from "../middleware/upload.js";
import { uploadBuffer, cloudinaryConfigured } from "../config/cloudinary.js";

const router = Router();

// POST /api/uploads — envoi d'une photo depuis le dashboard.
//
// Le fichier transite par l'API au lieu d'aller directement du navigateur vers
// Cloudinary : les identifiants Cloudinary ne quittent jamais le serveur, et le
// redimensionnement est imposé côté serveur plutôt que laissé au client.
router.post(
  "/",
  auth,
  (req, res, next) =>
    uploadImage.single("image")(req, res, (err) => {
      if (!err) return next();
      // multer renvoie un code dédié au dépassement de taille : on le traduit
      // en message lisible plutôt que « File too large ».
      const message =
        err.code === "LIMIT_FILE_SIZE"
          ? "Image trop volumineuse (12 Mo maximum)."
          : err.message;
      return res.status(400).json({ message });
    }),
  async (req, res, next) => {
    try {
      if (!req.file) return res.status(422).json({ message: "Aucune image reçue." });
      if (!cloudinaryConfigured) {
        return res.status(503).json({
          message:
            "Stockage d'images non configuré sur le serveur (variables CLOUDINARY_* manquantes).",
        });
      }

      const resultat = await uploadBuffer(req.file.buffer, {
        dossier: "bim-leaders/realisations",
      });

      // On renvoie le publicId en plus de l'URL : c'est lui qui permettra de
      // supprimer réellement le fichier quand la photo sera retirée d'une fiche.
      return res.status(201).json({
        url: resultat.secure_url,
        publicId: resultat.public_id,
        largeur: resultat.width,
        hauteur: resultat.height,
      });
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
