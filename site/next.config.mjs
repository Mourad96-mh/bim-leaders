import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique → `out/` téléversable sur Hostinger (Apache/LiteSpeed).
  // Tout le dynamique (réalisations, demandes) passe par l'API Render, jamais
  // par un rendu serveur : voir scripts/sync-content.mjs.
  output: "export",
  // Émet dossier/index.html (ex. /construction/index.html) pour que Hostinger
  // serve des URLs propres avec slash final, sans règle de réécriture.
  trailingSlash: true,
  // next/image ne peut pas optimiser à la volée en export statique : les photos
  // sont pré-optimisées en WebP par scripts/make-webp.mjs, et les visuels du
  // dashboard sont déjà redimensionnés par Cloudinary.
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  // Épingle la racine du projet : le dossier Bureau est lui-même un dépôt git
  // avec son propre package-lock.json que Next prendrait sinon pour la racine.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
