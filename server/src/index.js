import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import realisationsRoutes from "./routes/realisations.js";
import leadsRoutes from "./routes/leads.js";
import uploadsRoutes from "./routes/uploads.js";

const app = express();

// Render place l'application derrière PLUSIEURS proxys. Sans réglage, req.ip
// vaut l'adresse du dernier relais et la limitation de débit par IP devient
// inopérante — ou pire, met tous les visiteurs dans le même seau.
//
// ⚠️ NE PAS remettre `trust proxy` à un NOMBRE DE SAUTS. Mesuré en production :
// avec `1`, req.ip valait « 10.192.18.52 » — une adresse interne de Render, pas
// celle du visiteur. La chaîne compte plus d'un relais, et rien ne garantit que
// leur nombre reste stable dans le temps.
//
// ⚠️ NE PAS mettre `true` non plus : Express prendrait alors l'entrée la plus à
// GAUCHE de X-Forwarded-For, que le client peut fabriquer. Il suffirait d'un
// en-tête forgé, changé à chaque requête, pour contourner la limitation.
//
// La liste ci-dessous désigne les plages PRIVÉES comme dignes de confiance
// (`uniquelocal` couvre 10/8, 172.16/12 et 192.168/16). Express remonte alors
// X-Forwarded-For de DROITE à GAUCHE et s'arrête à la première adresse non
// privée : c'est celle qu'un relais de Render a réellement observée, donc
// l'adresse publique du visiteur, et elle n'est pas falsifiable en préfixant
// l'en-tête.
app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);

// ------------------------------------------------------- IP du visiteur ----
// `trust proxy` ci-dessus ne suffit pas sur Render : le trafic passe d'abord
// par Cloudflare, dont les adresses de bordure sont PUBLIQUES. Express remonte
// X-Forwarded-For, saute bien les relais internes en 10.x, puis s'arrête sur
// l'adresse Cloudflare et la retient. Mesuré en production : req.ip valait
// « 162.158.22.149 » là où le visiteur était en « 196.65.168.255 ».
//
// Conséquence si on en restait là : la limitation de débit compterait par
// nœud Cloudflare. Plusieurs visiteurs sans lien entre eux partageraient un
// même seau — et un seul suffirait à faire refuser les demandes des autres.
//
// Cloudflare pose l'adresse réelle dans CF-Connecting-IP et ÉCRASE cet en-tête
// à chaque requête qu'il relaie : un client ne peut donc pas le forger. Le
// service n'étant joignable que par la bordure de Render, l'en-tête est fiable
// ici. On retombe sur req.ip ailleurs — en local, il n'existe pas.
//
// C'est la SEULE source d'adresse visiteur de l'application : middleware/
// rateLimit.js et routes/leads.js lisent req.clientIp, jamais req.ip.
app.use((req, res, next) => {
  const cf = req.headers["cf-connecting-ip"];
  req.clientIp = typeof cf === "string" && cf.length <= 45 ? cf.trim() : req.ip;
  next();
});

// ---------------------------------------------------------------- CORS -----
// Le site (bimleaders.ma, sur Hostinger) et l'API (Render) sont sur deux
// domaines : chaque appel du navigateur est donc cross-origin.
// CORS_ORIGIN liste les origines autorisées, séparées par des virgules.
// Sans variable définie, on autorise tout — pratique en développement local,
// à NE PAS laisser tel quel en production.
const originesAutorisees = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origine, callback) {
      if (!originesAutorisees.length) return callback(null, true);
      // `!origine` : requêtes sans en-tête Origin (curl, moniteur de Render,
      // navigation directe) — elles ne présentent pas de risque CSRF puisque
      // l'authentification passe par un en-tête, pas par un cookie.
      if (!origine || originesAutorisees.includes(origine)) return callback(null, true);
      return callback(new Error(`Origine non autorisée : ${origine}`));
    },
  })
);

// 2 Mo suffisent : les fiches réalisations sont du texte et des URLs Cloudinary.
// Les fichiers passent par multer, pas par ce parseur.
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// Sonde de santé — sert aussi à réveiller le service Render endormi avant un
// build du site (cf. site/scripts/sync-content.mjs).
app.get("/", (req, res) => {
  res.json({
    service: "BIM LEADERS API",
    statut: "ok",
    base: mongoose.connection.readyState === 1 ? "connectée" : "déconnectée",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/realisations", realisationsRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/uploads", uploadsRoutes);

app.use((req, res) => res.status(404).json({ message: "Route inconnue." }));

// Gestionnaire d'erreurs central. Le détail technique reste dans les journaux
// du serveur ; le client ne reçoit qu'un message générique (§19 « absence de
// données sensibles exposées côté client »).
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("[API]", err);

  if (err.message?.startsWith("Origine non autorisée")) {
    return res.status(403).json({ message: "Origine non autorisée." });
  }
  // Clé unique violée (slug déjà pris, e-mail admin en double).
  if (err.code === 11000) {
    return res.status(409).json({ message: "Cette valeur existe déjà." });
  }
  if (err.name === "ValidationError") {
    const errors = Object.fromEntries(
      Object.entries(err.errors).map(([champ, e]) => [champ, e.message])
    );
    return res.status(422).json({ message: "Données invalides.", errors });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Identifiant invalide." });
  }

  return res.status(500).json({ message: "Erreur serveur." });
});

const PORT = process.env.PORT || 4000;

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI manquant : impossible de démarrer.");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET manquant : impossible de démarrer.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connecté");
    app.listen(PORT, () => console.log(`API à l'écoute sur le port ${PORT}`));
  })
  .catch((err) => {
    console.error("Connexion MongoDB impossible :", err.message);
    process.exit(1);
  });
