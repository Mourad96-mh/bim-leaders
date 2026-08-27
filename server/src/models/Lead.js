import mongoose from "mongoose";

// Une demande reçue depuis le site : formulaire de contact (§13.1) ou demande de
// dossier investisseur (§10 bis.5).
//
// Choix validé avec le client : les demandes sont STOCKÉES et consultées dans le
// dashboard, sans envoi d'e-mail. Aucune clé SMTP à gérer, et rien ne se perd —
// mais le gérant doit ouvrir le tableau de bord pour les voir. Le compteur de
// demandes non lues dans la barre latérale existe pour cette raison.

const LeadSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["contact", "investisseur"],
      default: "contact",
      index: true,
    },

    // --- Champs communs (§13.1) ---
    nom: { type: String, required: true, trim: true },
    telephone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },

    // --- Formulaire de contact ---
    typeClient: { type: String, trim: true },
    typeProjet: { type: String, trim: true },
    localisation: { type: String, trim: true },
    surface: { type: String, trim: true },
    budget: { type: String, trim: true },

    // --- Formulaire investisseur (§10 bis.5) ---
    fonction: { type: String, trim: true },
    pays: { type: String, trim: true },
    typePartenaire: { type: String, trim: true },
    secteur: { type: String, trim: true },
    fourchette: { type: String, trim: true },
    collaboration: { type: String, trim: true },
    // Slug de l'opportunité d'où vient la demande, quand elle en vient.
    projet: { type: String, trim: true },

    // Pièce jointe déposée sur Cloudinary (plan, titre foncier, esquisse…).
    fichier: {
      url: String,
      publicId: String,
      nom: String,
      taille: Number,
    },

    statut: {
      type: String,
      enum: ["nouveau", "lu", "traite"],
      default: "nouveau",
      index: true,
    },

    // Traces techniques : utiles pour le filtrage anti-abus, jamais affichées
    // publiquement. L'IP n'est conservée que pour limiter le débit d'envoi.
    ip: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

LeadSchema.index({ createdAt: -1 });

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
