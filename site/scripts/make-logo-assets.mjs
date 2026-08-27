// Génère toutes les déclinaisons du logo à partir du fichier fourni par le
// client (`logo-source.jpeg`, fond blanc opaque) — c'est la SEULE source :
//
//   public/logo.png       → fond transparent, couleurs d'origine
//                           (fonds clairs : en-tête)
//   public/logo-light.png → fond transparent, texte anthracite passé en BLANC
//                           et arcs bleus éclaircis en cyan
//                           (fonds sombres : pied de page, dashboard)
//   src/app/icon.png      → favicon : le symbole seul (les arcs), blanc sur
//                           tuile bleue arrondie
//
// POURQUOI la version « light » : la marque est composée d'arcs bleu foncé
// (#1b4a8f) et d'un texte anthracite (#2b2b2b). Rendus transparents tels quels
// sur le pied de page bleu nuit (#0a2342), les deux deviennent illisibles. On
// repousse donc le texte vers le blanc et les arcs vers le cyan clair.
//
// Usage : node scripts/make-logo-assets.mjs
// (relancer si le client fournit une nouvelle version du logo)

import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const SRC = join(root, "logo-source.jpeg");

const WIDTH = 720; // ~3× la taille d'affichage max → net en haute densité
const ICON = 256; // favicon carré

mkdirSync(join(root, "public"), { recursive: true });

// Un pixel est « fond » s'il est quasi blanc sur les trois canaux. Le JPEG
// introduit du bruit de compression, d'où le seuil à 238 plutôt que 255.
const isBackground = (r, g, b) => r > 238 && g > 238 && b > 238;

// Rend le fond blanc transparent, en dégradant l'alpha sur les pixels
// intermédiaires pour éviter un liseré blanc sur les bords antialiasés.
async function toTransparent(pipeline, transform) {
  const { data, info } = await pipeline
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (isBackground(r, g, b)) {
      data[i + 3] = 0;
      continue;
    }
    // Alpha progressif sur la frange claire : plus le pixel est clair, plus il
    // s'efface. Sans cela les contours arrondis gardent un halo blanc.
    const light = Math.min(r, g, b);
    if (light > 200) data[i + 3] = Math.round(255 * (1 - (light - 200) / 38));
    if (transform) transform(data, i);
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png();
}

// Recadre sur le contenu réel (le JPEG source a une marge blanche irrégulière).
//
// ⚠️ Le recadrage est matérialisé en mémoire AVANT toute mesure : sur un
// pipeline sharp non exécuté, metadata() renvoie les dimensions de la SOURCE,
// pas celles de l'image rognée — et un extract() calculé dessus sort du cadre
// (« bad extract area »).
const TRIMMED = await sharp(SRC)
  .flatten({ background: "#ffffff" })
  .trim({ threshold: 12 })
  .png()
  .toBuffer();
const TRIMMED_META = await sharp(TRIMMED).metadata();

const trimmed = () => sharp(TRIMMED);

// ---------------------------------------------------------------- logo.png ---
const light = await toTransparent(trimmed().resize({ width: WIDTH }));
await light.toFile(join(root, "public", "logo.png"));

// ----------------------------------------------------------- logo-light.png ---
// Deux familles de pixels à traiter différemment :
//   • texte anthracite → quasi neutre (écart R/G/B faible) → passe en blanc
//   • arcs bleus       → le bleu domine nettement → tirés vers le cyan #5cc2ee
await (
  await toTransparent(trimmed().resize({ width: WIDTH }), (data, i) => {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (data[i + 3] === 0) return;
    const neutral = Math.max(r, g, b) - Math.min(r, g, b) < 26;
    if (neutral) {
      data[i] = 255; data[i + 1] = 255; data[i + 2] = 255;
    } else {
      // Mélange 55 % vers le cyan clair : garde la forme des arcs lisible tout
      // en remontant fortement le contraste sur fond bleu nuit.
      data[i] = Math.round(r * 0.45 + 0x5c * 0.55);
      data[i + 1] = Math.round(g * 0.45 + 0xc2 * 0.55);
      data[i + 2] = Math.round(b * 0.45 + 0xee * 0.55);
    }
  })
).toFile(join(root, "public", "logo-light.png"));

// ------------------------------------------------- logo-mark(-light).png ----
// LE SYMBOLE SEUL (les arcs), isolé du texte.
//
// POURQUOI : le logo officiel mesure 720×447, dont le texte n'occupe qu'environ
// 12 % de la hauteur. Affiché à 52 px de haut dans l'en-tête, « BIM LEADERS »
// tomberait à ~7 px de hauteur de capitale — illisible. On sépare donc les deux :
// le symbole reste une image, et le nom est retypographié en HTML (Poppins) par
// components/Logo.js, net à toutes les tailles et lisible par les lecteurs
// d'écran.
//
// COMMENT : le texte et les arcs se chevauchent horizontalement, donc un simple
// recadrage ne suffit pas. On les sépare par la COULEUR.
//
// Le test « écart max-min faible = neutre » ne suffit PAS : la compression JPEG
// teinte légèrement les lettres et leurs bords antialiasés, et des fantômes de
// texte subsistent. On teste donc la DOMINANTE BLEUE, franche sur les arcs
// (#1b4a8f → b−r = 84 ; #1188cc → b−r = 187) et nulle sur l'anthracite
// (#2b2b2b → b−r = 0).
// Un seul seuil sur b−r laisse encore passer des fantômes de lettres : le
// dégradé de compression autour des glyphes fait localement monter le bleu.
// On exige donc AUSSI une dominante bleue sur le vert, franche sur les arcs
// (b−g ≈ 68 partout le long du dégradé) et quasi nulle sur un gris.
const isMark = (r, g, b) => b - r > 60 && b - g > 25;

// `recolor` reçoit [r,g,b] et renvoie la couleur de sortie (ou null = inchangé).
async function extractMark(recolor) {
  const { data, info } = await trimmed()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (isBackground(r, g, b) || !isMark(r, g, b)) {
      data[i + 3] = 0; // fond blanc ET lettrage : effacés
      continue;
    }
    const light = Math.min(r, g, b);
    if (light > 200) data[i + 3] = Math.round(255 * (1 - (light - 200) / 38));
    const out = recolor?.(r, g, b);
    if (out) {
      data[i] = out[0]; data[i + 1] = out[1]; data[i + 2] = out[2];
    }
  }

  // `trim` recadre sur les arcs restants ; `contain` rend l'image carrée pour
  // que le composant puisse la poser dans une boîte fixe sans déformation.
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .trim({ threshold: 8 })
    .resize({ width: 256, height: 256, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png();
}

await (await extractMark()).toFile(join(root, "public", "logo-mark.png"));
// Version pour fonds sombres : arcs remontés vers le cyan clair.
await (
  await extractMark((r, g, b) => [
    Math.round(r * 0.35 + 0x6c * 0.65),
    Math.round(g * 0.35 + 0xcc * 0.65),
    Math.round(b * 0.35 + 0xf5 * 0.65),
  ])
).toFile(join(root, "public", "logo-mark-light.png"));

// ---------------------------------------------------------------- icon.png ---
// Favicon : le symbole blanchi, posé sur une tuile bleue arrondie.
const symbol = await (
  await extractMark(() => [255, 255, 255])
)
  .resize({ width: Math.round(ICON * 0.66), height: Math.round(ICON * 0.66), fit: "inside" })
  .toBuffer();

const tile = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${ICON}" height="${ICON}">
     <defs>
       <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0" stop-color="#1b4a8f"/>
         <stop offset="1" stop-color="#1188cc"/>
       </linearGradient>
     </defs>
     <rect width="${ICON}" height="${ICON}" rx="${Math.round(ICON * 0.22)}" fill="url(#g)"/>
   </svg>`
);

mkdirSync(join(root, "src", "app"), { recursive: true });
await sharp(tile)
  .composite([{ input: symbol, gravity: "center" }])
  .png()
  .toFile(join(root, "src", "app", "icon.png"));

console.log("✓ public/logo.png");
console.log("✓ public/logo-mark.png");
console.log("✓ public/logo-mark-light.png");
console.log("✓ public/logo-light.png");
console.log("✓ src/app/icon.png");
