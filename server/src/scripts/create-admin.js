// Crée (ou remet à jour) le compte d'accès au dashboard.
//
// C'est le SEUL moyen de créer un compte : l'API n'expose aucune route
// d'inscription, ce qui réduit la surface d'attaque à la seule connexion.
//
// Usage, depuis le dossier server/ :
//   node src/scripts/create-admin.js <email> <motdepasse> ["Nom affiché"]
//
// Relancé avec un e-mail existant, le script remplace le mot de passe — c'est
// la procédure de réinitialisation.

import "dotenv/config";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

const [, , email, motDePasse, nom] = process.argv;

if (!email || !motDePasse) {
  console.error('Usage : node src/scripts/create-admin.js <email> <motdepasse> ["Nom"]');
  process.exit(1);
}
if (motDePasse.length < 10) {
  console.error("Mot de passe trop court : 10 caractères minimum.");
  process.exit(1);
}
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI manquant (server/.env).");
  process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI);

const existant = await Admin.findOne({ email: email.toLowerCase().trim() });

if (existant) {
  existant.motDePasse = motDePasse; // le hook pre('save') du modèle le hache
  if (nom) existant.nom = nom;
  await existant.save();
  console.log(`✓ Mot de passe mis à jour pour ${existant.email}`);
} else {
  const admin = await Admin.create({
    email: email.toLowerCase().trim(),
    motDePasse,
    nom: nom || "Administrateur",
  });
  console.log(`✓ Compte créé : ${admin.email}`);
}

await mongoose.disconnect();
