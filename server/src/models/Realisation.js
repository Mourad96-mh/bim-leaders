import mongoose from "mongoose";

// Une réalisation du portfolio (§11 du cahier des charges).
// C'est la SEULE collection éditable depuis le dashboard : les textes du site
// vivent dans le dépôt du front (site/src/content/), pas ici.

const PhotoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    // Conservé pour pouvoir supprimer réellement le fichier chez Cloudinary
    // quand la photo est retirée d'une fiche.
    publicId: { type: String },
    alt: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const AvantApresSchema = new mongoose.Schema(
  {
    avant: { type: String, required: true },
    apres: { type: String, required: true },
    avantPublicId: String,
    apresPublicId: String,
  },
  { _id: false }
);

const RealisationSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    // Le slug fabrique l'URL /realisations/<slug>/ : unique, et jamais modifié
    // automatiquement après coup — renommer un projet ne doit pas casser un lien
    // déjà partagé ou indexé.
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    localisation: { type: String, trim: true },
    // Sert de catégorie aux filtres du portfolio (§11 « filtres par catégorie »).
    type: { type: String, trim: true },
    surface: { type: String, trim: true },
    annee: { type: Number },
    prestations: { type: [String], default: [] },
    description: { type: String, trim: true },
    statut: {
      type: String,
      enum: ["realise", "en-cours"],
      default: "realise",
    },
    photos: { type: [PhotoSchema], default: [] },
    avantApres: { type: [AvantApresSchema], default: [] },
    // URL d'intégration (embed) d'une vidéo — cf. routes/realisations.js, qui
    // normalise les liens YouTube collés tels quels.
    videoUrl: { type: String, trim: true },
    // Ordre manuel dans la grille : plus petit = plus haut.
    ordre: { type: Number, default: 100 },
    // Un brouillon reste invisible sur le site public ET absent du snapshot.
    publie: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Le tri par défaut de la grille est calculé côté front (lib/realisations.js)
// pour rester identique entre le HTML statique et le rafraîchissement client.
// Cet index sert les requêtes de l'API et du dashboard.
RealisationSchema.index({ publie: 1, ordre: 1, annee: -1 });

export default mongoose.models.Realisation ||
  mongoose.model("Realisation", RealisationSchema);
