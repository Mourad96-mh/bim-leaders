import { Router } from "express";
import Admin from "../models/Admin.js";
import auth, { signerJeton } from "../middleware/auth.js";
import rateLimit from "../middleware/rateLimit.js";

const router = Router();

// ⚠️ AUCUNE ROUTE D'INSCRIPTION, volontairement. Les comptes du dashboard sont
// créés en ligne de commande (npm run create-admin), donc la seule surface
// exposée est la connexion. Ne pas ajouter de /register « pour dépanner ».

router.post(
  "/login",
  // Freine le bourrinage de mots de passe sans gêner un humain qui se trompe
  // deux ou trois fois.
  rateLimit({
    fenetreMs: 10 * 60 * 1000,
    max: 10,
    message: "Trop de tentatives de connexion. Réessayez dans quelques minutes.",
  }),
  async (req, res, next) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) {
        return res.status(422).json({ message: "E-mail et mot de passe requis." });
      }

      // `motDePasse` est en select:false sur le modèle : il faut le demander.
      const admin = await Admin.findOne({ email: String(email).toLowerCase().trim() }).select(
        "+motDePasse"
      );

      // Message identique que le compte existe ou non : sinon la réponse
      // permettrait d'énumérer les adresses valides.
      const invalide = () =>
        res.status(401).json({ message: "E-mail ou mot de passe incorrect." });

      if (!admin) return invalide();
      const ok = await admin.verifierMotDePasse(password);
      if (!ok) return invalide();

      admin.dernierAcces = new Date();
      await admin.save();

      return res.json({
        token: signerJeton(admin),
        admin: { email: admin.email, nom: admin.nom },
      });
    } catch (err) {
      return next(err);
    }
  }
);

// Permet au dashboard de vérifier au chargement que le jeton stocké est encore
// valide, avant d'afficher quoi que ce soit.
router.get("/me", auth, async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.sub).lean();
    if (!admin) return res.status(401).json({ message: "Compte introuvable." });
    return res.json({ email: admin.email, nom: admin.nom });
  } catch (err) {
    return next(err);
  }
});

export default router;
