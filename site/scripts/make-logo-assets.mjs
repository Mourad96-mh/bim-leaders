// Génère toutes les déclinaisons du logo à partir des fichiers officiels
// fournis par le client (PNG haute définition 2024×712, fond DÉJÀ transparent) :
//
//   logo-source.png       → logo couleur (arcs bleus, texte bleu nuit)
//   logo-source-blanc.png → même logo, lettrage et arcs en blanc + arc cyan
//
// Sorties :
//   public/logo.png            → logo couleur complet     (fonds clairs)
//   public/logo-light.png      → logo blanc complet        (fonds sombres)
//   public/logo-mark.png       → symbole seul, couleur     (en-tête)
//   public/logo-mark-light.png → symbole seul, blanc       (pied de page, admin)
//   src/app/icon.png           → favicon : symbole blanc sur tuile bleue
//
// POURQUOI deux sources plutôt qu'une recolorisation : le client livre une
// version « blanc » officielle. La reprendre telle quelle donne un rendu fidèle
// sur le pied de page bleu nuit, là où un remappage de couleurs approximerait.
//
// Usage : node scripts/make-logo-assets.mjs
// (relancer si le client fournit une nouvelle version du logo)

import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const COLOR = join(root, "logo-source.png");
const WHITE = join(root, "logo-source-blanc.png");

const WIDTH = 900; // ~3× la largeur d'affichage max → net en haute densité
const MARK = 256; // symbole carré
const ICON = 256; // favicon carré

// Le lockup officiel sépare nettement le symbole (les arcs) du lettrage : une
// colonne entièrement transparente court de x=738 à x=878 sur 2024 px de large.
// On coupe au milieu de ce couloir, en proportion pour rester valable si le
// client relivre le logo dans une autre définition (même composition).
const SPLIT = 808 / 2024;

const transparentBg = { r: 0, g: 0, b: 0, alpha: 0 };

mkdirSync(join(root, "public"), { recursive: true });

// -------------------------------------------------- logo complet (2 variantes)
// `trim` retire la marge transparente autour du lockup pour que la hauteur CSS
// pilote réellement la hauteur du dessin.
async function fullLogo(src, out) {
  await sharp(src)
    .trim()
    .resize({ width: WIDTH })
    .png()
    .toFile(join(root, "public", out));
}

await fullLogo(COLOR, "logo.png");
await fullLogo(WHITE, "logo-light.png");

// ------------------------------------------------------------ symbole seul ---
// POURQUOI isoler le symbole : le lockup complet mesure ~2,9:1, dont le
// lettrage ne fait qu'un cinquième de la hauteur. Posé à 52 px dans l'en-tête,
// « BIM LEADERS » tomberait à ~10 px de hauteur de capitale. On sépare donc :
// le symbole reste une image, et le nom est retypographié en HTML (Poppins) par
// components/Logo.js — net à toutes les tailles et lu par les lecteurs d'écran.
//
// ⚠️ Le recadrage doit être matérialisé en mémoire AVANT le `trim` : enchaînés
// dans le même pipeline sharp, `extract` et `trim` se calculent tous deux sur
// les dimensions de la SOURCE et le second sort du cadre (« bad extract area »).
async function extractMark(src) {
  const { width, height } = await sharp(src).metadata();
  const cropped = await sharp(src)
    .extract({ left: 0, top: 0, width: Math.round(width * SPLIT), height })
    .png()
    .toBuffer();

  return sharp(cropped)
    .trim()
    .resize({ width: MARK, height: MARK, fit: "contain", background: transparentBg })
    .png();
}

await (await extractMark(COLOR)).toFile(join(root, "public", "logo-mark.png"));
await (await extractMark(WHITE)).toFile(join(root, "public", "logo-mark-light.png"));

// ---------------------------------------------------------------- icon.png ---
// Favicon : le symbole blanc posé sur une tuile bleue arrondie. À 16–32 px le
// symbole doit respirer, d'où les 72 % de la tuile (marge de sécurité autour).
const symbol = await (await extractMark(WHITE))
  .resize({ width: Math.round(ICON * 0.72), height: Math.round(ICON * 0.72), fit: "inside" })
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
console.log("✓ public/logo-light.png");
console.log("✓ public/logo-mark.png");
console.log("✓ public/logo-mark-light.png");
console.log("✓ src/app/icon.png");
