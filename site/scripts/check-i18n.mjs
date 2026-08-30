// Garde-fou du bilinguisme — lancé au prebuild (cf. package.json).
//
// CE QU'IL VÉRIFIE : que les deux versions d'un même dictionnaire ont EXACTEMENT
// la même forme. Une clé ajoutée en français et oubliée en anglais ne casse pas
// le build de Next : elle produit un `undefined` qui s'affiche en trou blanc sur
// la page anglaise, ou fait planter le rendu si c'est un tableau. C'est le genre
// d'erreur qu'on ne voit qu'en production, et seulement si on relit la page dans
// la bonne langue — d'où ce script.
//
// CE QU'IL NE VÉRIFIE PAS : que la traduction est bonne. Il compare des formes,
// pas du sens.
//
// Il échoue avec un code de sortie non nul : le build s'arrête, volontairement.
// Un site à moitié traduit est un bug visible par le client.

import { register } from "node:module";


register("./alias-loader.mjs", import.meta.url);

const problems = [];

/**
 * Compare récursivement la FORME de deux valeurs.
 * @param {string} where — chemin lisible de la clé, pour le message d'erreur
 */
function compare(where, fr, en) {
  const typeFr = kind(fr);
  const typeEn = kind(en);

  if (typeFr !== typeEn) {
    problems.push(`${where} : ${typeFr} en français, ${typeEn} en anglais`);
    return;
  }

  if (typeFr === "array") {
    // Une liste doit avoir la même longueur : une prestation ou une étape
    // manquante d'un côté est une page incomplète, pas un choix de rédaction.
    if (fr.length !== en.length) {
      problems.push(`${where} : ${fr.length} entrées en français, ${en.length} en anglais`);
      return;
    }
    fr.forEach((item, i) => compare(`${where}[${i}]`, item, en[i]));
    return;
  }

  if (typeFr === "object") {
    for (const key of Object.keys(fr)) {
      if (!(key in en)) problems.push(`${where}.${key} : absent de la version anglaise`);
      else compare(`${where}.${key}`, fr[key], en[key]);
    }
    for (const key of Object.keys(en)) {
      if (!(key in fr)) problems.push(`${where}.${key} : absent de la version française`);
    }
    return;
  }

  // Chaînes, nombres, fonctions : la forme suffit, le contenu diffère par nature.
  // On signale seulement une chaîne vide d'un seul côté.
  if (typeFr === "string" && Boolean(fr.trim()) !== Boolean(en.trim())) {
    problems.push(`${where} : vide d'un seul côté`);
  }
}

function kind(v) {
  if (Array.isArray(v)) return "array";
  if (v === null) return "null";
  if (typeof v === "function") return "function";
  return typeof v;
}

// On passe par l'alias `@/` plutôt que par un chemin relatif : c'est le hook
// ci-dessus qui résout, et lui seul sait annoncer à Node que ces .js sont des
// modules ES (sans quoi il les reparse en le signalant à chaque fichier).
const src = (p) => `@/${p}`;

const ui = await import(src("lib/ui.js"));
const company = await import(src("lib/company.js"));
const i18n = await import(src("lib/i18n.js"));
const home = await import(src("content/home.js"));
const services = await import(src("content/services.js"));
const bim = await import(src("content/bim.js"));
const apropos = await import(src("content/apropos.js"));
const particuliers = await import(src("content/particuliers.js"));
const investisseurs = await import(src("content/investisseurs.js"));
const contact = await import(src("content/contact.js"));
const credits = await import(src("content/credits.js"));
const realisations = await import(src("content/realisations.js"));

// --- Les dictionnaires appariés par langue --------------------------------
const dictionaries = [
  ["lib/ui.js — t()", ui.t],
  ["lib/company.js — text()", company.text],
  ["lib/company.js — openingHours()", company.openingHours],
  ["content/home.js", home.getHome],
  ["content/services.js — catalogue", services.getServices],
  ["content/services.js — habillage", services.getConstructionPage],
  ["content/bim.js", bim.getBim],
  ["content/apropos.js", apropos.getApropos],
  ["content/particuliers.js", particuliers.getParticuliers],
  ["content/investisseurs.js", investisseurs.getInvestisseurs],
  ["content/investisseurs.js — opportunités", investisseurs.getOpportunitesIntro],
  ["content/investisseurs.js — dossier", investisseurs.getDossierContenu],
  ["content/contact.js", contact.getContact],
  ["content/contact.js — dossier", contact.getDossierForm],
  ["content/credits.js", credits.getCreditsPage],
  ["content/realisations.js", realisations.getRealisationsPage],
];

for (const [name, get] of dictionaries) {
  compare(name, get("fr"), get("en"));
}

// --- Les listes d'options { value, label:{fr,en} } --------------------------
// Leur `value` part vers l'API et reste français ; seul `label` est traduit,
// et il doit l'être dans les deux langues sous peine d'un <option> vide.
const optionLists = [
  ["content/contact.js — TYPES_CLIENT", contact.TYPES_CLIENT],
  ["content/contact.js — TYPES_PROJET", contact.TYPES_PROJET],
  ["content/contact.js — BUDGETS", contact.BUDGETS],
  ["content/investisseurs.js — TYPES_COLLABORATION", investisseurs.TYPES_COLLABORATION],
  ["content/investisseurs.js — FOURCHETTES", investisseurs.FOURCHETTES_INVESTISSEMENT],
  ["content/investisseurs.js — STATUTS", investisseurs.OPPORTUNITY_STATUSES],
  ["content/credits.js — PHOTO_CREDITS", credits.PHOTO_CREDITS.map((c) => ({ label: c.usage }))],
];

for (const [name, list] of optionLists) {
  list.forEach((o, i) => {
    const label = o.label;
    if (!label?.fr) problems.push(`${name}[${i}] : libellé français manquant`);
    if (!label?.en) problems.push(`${name}[${i}] : libellé anglais manquant`);
  });
}

// --- Les routes -------------------------------------------------------------
// Une route sans son pendant anglais casserait le sélecteur de langue et les
// hreflang : `path()` retomberait silencieusement sur le français.
for (const [key, entry] of Object.entries(i18n.ROUTES)) {
  for (const lang of i18n.LOCALES) {
    if (!entry[lang]) problems.push(`lib/i18n.js — ROUTES.${key} : chemin ${lang} manquant`);
  }
  if (entry.en && !entry.en.startsWith("/en/")) {
    problems.push(`lib/i18n.js — ROUTES.${key} : le chemin anglais devrait vivre sous /en/`);
  }
}

// --- Les métiers ------------------------------------------------------------
// La `key` est ce qui relie /construction/gros-oeuvre/ à
// /en/construction/structural-works/ : sans elle, pas d'alternate hreflang.
const keysFr = services.getServices("fr").map((s) => s.key);
const keysEn = services.getServices("en").map((s) => s.key);
for (const key of keysFr) {
  if (!keysEn.includes(key)) problems.push(`content/services.js — métier « ${key} » absent en anglais`);
}
for (const key of keysEn) {
  if (!keysFr.includes(key)) problems.push(`content/services.js — métier « ${key} » absent en français`);
}
// Deux métiers ne peuvent pas partager un slug : la route deviendrait ambiguë.
for (const lang of i18n.LOCALES) {
  const slugs = services.getServices(lang).map((s) => s.slug);
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (dupes.length) problems.push(`content/services.js — slugs ${lang} en double : ${dupes.join(", ")}`);
}

// --- Verdict ----------------------------------------------------------------
if (problems.length) {
  console.error(`\n✗ Bilinguisme : ${problems.length} incohérence(s)\n`);
  for (const p of problems) console.error(`  • ${p}`);
  console.error("");
  process.exit(1);
}

console.log("✓ Bilinguisme : les deux langues ont la même forme");
