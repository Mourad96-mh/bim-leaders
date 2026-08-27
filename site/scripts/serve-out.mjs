// Petit serveur statique pour l'export de production (site/out/).
//
// Sert à vérifier le site EXACTEMENT tel que Hostinger le servira : URLs à slash
// final résolues en dossier/index.html, aucun rechargement à chaud, aucun outil
// de développement injecté. C'est aussi ce que consomme scripts/check-responsive.mjs.
//
// Zéro dépendance, et surtout : ne touche PAS au dossier .next, donc peut
// tourner en même temps que le `next dev` de quelqu'un d'autre.
//
// Usage : node scripts/serve-out.mjs [port]

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RACINE = join(__dirname, "..", "out");
const PORT = Number(process.argv[2] || process.env.PORT || 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

async function resoudre(cheminUrl) {
  // `normalize` + préfixe vérifié : empêche un ../../ de sortir de out/.
  const rel = normalize(decodeURIComponent(cheminUrl.split("?")[0])).replace(/^([/\\])+/, "");
  const cible = join(RACINE, rel);
  if (!cible.startsWith(RACINE)) return null;

  try {
    const infos = await stat(cible);
    // Une URL en /construction/ pointe sur un dossier : on sert son index.html,
    // exactement comme Apache avec `trailingSlash: true`.
    if (infos.isDirectory()) return join(cible, "index.html");
    return cible;
  } catch {
    // Repli : /contact → /contact/index.html (sans slash final).
    try {
      const avecIndex = join(cible, "index.html");
      await stat(avecIndex);
      return avecIndex;
    } catch {
      return null;
    }
  }
}

createServer(async (req, res) => {
  const fichier = await resoudre(req.url || "/");

  if (!fichier) {
    const html404 = join(RACINE, "404.html");
    try {
      res.writeHead(404, { "Content-Type": TYPES[".html"] });
      res.end(await readFile(html404));
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404");
    }
    return;
  }

  try {
    const contenu = await readFile(fichier);
    res.writeHead(200, {
      "Content-Type": TYPES[extname(fichier)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(contenu);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(`Erreur : ${err.message}`);
  }
}).listen(PORT, () => {
  console.log(`Export statique servi sur http://localhost:${PORT}`);
});
