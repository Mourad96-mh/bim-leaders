import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Compte d'accès au dashboard. Il n'y a pas d'inscription ouverte : les comptes
// sont créés en ligne de commande (npm run create-admin), ce qui supprime toute
// surface d'attaque côté API.

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    // Empreinte bcrypt — jamais le mot de passe en clair.
    // `select: false` : le hachage n'est pas renvoyé par défaut, il faut le
    // demander explicitement (cf. routes/auth.js), ce qui évite de le laisser
    // fuiter dans une réponse JSON par inadvertance.
    motDePasse: { type: String, required: true, select: false },
    nom: { type: String, trim: true },
    dernierAcces: { type: Date },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("motDePasse")) return next();
  this.motDePasse = await bcrypt.hash(this.motDePasse, 12);
  next();
});

AdminSchema.methods.verifierMotDePasse = function verifier(candidat) {
  return bcrypt.compare(candidat, this.motDePasse);
};

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
