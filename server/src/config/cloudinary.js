import { v2 as cloudinary } from "cloudinary";
import { Readable } from "node:stream";

// Cloudinary : stockage des photos de chantier et des pièces jointes.
//
// ⚠️ Les identifiants restent CÔTÉ SERVEUR (§19 « absence de données sensibles
// exposées côté client »). Le navigateur envoie son fichier à cette API, qui le
// relaie ; il n'y a pas d'envoi direct navigateur → Cloudinary, qui exposerait
// une clé ou imposerait des signatures.

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

/**
 * Envoie un tampon mémoire vers Cloudinary.
 * @param {Buffer} buffer
 * @param {object} options
 * @param {string} options.dossier    dossier Cloudinary (ex. « bim-leaders/realisations »)
 * @param {"image"|"raw"} options.type `raw` pour les PDF/DWG/ZIP, qui ne sont pas des images
 * @param {string} [options.nomFichier]
 */
export function uploadBuffer(buffer, { dossier, type = "image", nomFichier }) {
  return new Promise((resolve, reject) => {
    const flux = cloudinary.uploader.upload_stream(
      {
        folder: dossier,
        resource_type: type,
        ...(nomFichier ? { public_id: nomFichier.replace(/\.[^.]+$/, "") } : {}),
        ...(type === "image"
          ? {
              // Redimensionnement à la source : une photo de téléphone fait
              // 4 à 8 Mo, ce qui plomberait le chargement des fiches projet
              // (§18 « optimisation des images »). 2000px de large suffisent
              // largement pour un affichage plein écran en haute densité.
              transformation: [
                { width: 2000, height: 2000, crop: "limit" },
                { quality: "auto:good" },
                { fetch_format: "auto" },
              ],
            }
          : {}),
      },
      (error, resultat) => (error ? reject(error) : resolve(resultat))
    );

    Readable.from(buffer).pipe(flux);
  });
}

// Suppression réelle du fichier chez Cloudinary — appelée quand une photo est
// retirée d'une fiche, pour ne pas laisser s'accumuler des fichiers orphelins.
export async function supprimerFichier(publicId, type = "image") {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: type });
  } catch (err) {
    // Un échec de suppression ne doit jamais faire échouer la requête
    // principale : la fiche a bien été mise à jour, seul le ménage a raté.
    console.warn(`Cloudinary: suppression de ${publicId} impossible —`, err.message);
  }
}

export default cloudinary;
