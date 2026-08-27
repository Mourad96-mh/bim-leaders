import jwt from "jsonwebtoken";

// Authentification par jeton JWT en en-tête `Authorization: Bearer <token>`.
//
// ⚠️ POURQUOI PAS DE COOKIE httpOnly : le site est un export statique servi par
// Hostinger (bimleaders.ma) tandis que l'API tourne sur Render — deux origines
// différentes. Un cookie httpOnly ne serait pas renvoyé sur ces requêtes
// cross-origin sans une configuration de cookies tiers que les navigateurs
// bloquent désormais par défaut. Le jeton vit donc dans localStorage côté
// dashboard et voyage en en-tête.

export function signerJeton(admin) {
  return jwt.sign(
    { sub: String(admin._id), email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "12h" }
  );
}

export default function auth(req, res, next) {
  const entete = req.headers.authorization || "";
  const [schema, jeton] = entete.split(" ");

  if (schema !== "Bearer" || !jeton) {
    return res.status(401).json({ message: "Authentification requise." });
  }

  try {
    req.admin = jwt.verify(jeton, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    // On distingue les deux cas : le dashboard renvoie l'utilisateur vers la
    // page de connexion avec un message utile plutôt qu'une erreur opaque.
    const expire = err.name === "TokenExpiredError";
    return res.status(401).json({
      message: expire ? "Session expirée, reconnectez-vous." : "Jeton invalide.",
      expired: expire,
    });
  }
}
