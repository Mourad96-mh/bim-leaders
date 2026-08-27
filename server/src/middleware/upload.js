import multer from "multer";

// Réception des fichiers EN MÉMOIRE, jamais sur disque : Render a un système de
// fichiers éphémère, et le fichier ne fait que transiter avant d'être poussé
// vers Cloudinary (cf. config/cloudinary.js).

const MO = 1024 * 1024;

// Types acceptés pour les photos de chantier (dashboard).
const IMAGES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

// Types acceptés pour une pièce jointe de formulaire (§13.1) : plan, titre
// foncier, esquisse. Le DWG n'a pas de type MIME stable selon les navigateurs,
// d'où la vérification complémentaire par extension.
const PIECES_JOINTES = [
  ...IMAGES,
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/octet-stream",
  "image/vnd.dwg",
  "application/acad",
];
const EXTENSIONS_PJ = /\.(pdf|jpe?g|png|webp|dwg|zip)$/i;

function filtre(autorises, verifierExtension) {
  return (req, file, cb) => {
    const typeOk = autorises.includes(file.mimetype);
    const extOk = !verifierExtension || EXTENSIONS_PJ.test(file.originalname);
    // `application/octet-stream` est le type par défaut quand le navigateur ne
    // sait pas : on ne l'accepte alors que si l'extension est reconnue.
    if (typeOk && extOk) return cb(null, true);
    return cb(
      new Error(
        verifierExtension
          ? "Format non accepté. Formats autorisés : PDF, JPG, PNG, WebP, DWG, ZIP."
          : "Format d'image non accepté. Formats autorisés : JPG, PNG, WebP, AVIF."
      )
    );
  };
}

// Photos du dashboard : 12 Mo (une photo de reflex non retouchée passe).
export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 12 * MO, files: 1 },
  fileFilter: filtre(IMAGES, false),
});

// Pièce jointe d'un formulaire : 10 Mo, la limite annoncée au visiteur dans
// site/src/content/contact.js (CONTACT.upload.maxMb). Garder les deux alignées.
export const uploadPieceJointe = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * MO, files: 1 },
  fileFilter: filtre(PIECES_JOINTES, true),
});
