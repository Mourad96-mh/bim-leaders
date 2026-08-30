// Cœur du bilinguisme — une seule source de vérité pour les URLs des deux
// arbres du site.
//
// STRATÉGIE D'URL (choisie avec le client) :
//   • le FRANÇAIS reste À LA RACINE   → bimleaders.ma/contact/
//   • l'ANGLAIS vit sous /en/         → bimleaders.ma/en/contact/
// Aucune URL française déjà indexée par Google ne bouge : pas de redirection
// 301 à écrire dans un .htaccess Hostinger, pas de position perdue. C'est la
// raison d'être de cette dissymétrie apparente entre les deux colonnes.
//
// Les SLUGS ANGLAIS SONT TRADUITS (/en/about/ et non /en/a-propos/) : c'est ce
// que Google et un lecteur anglophone attendent. Le prix à payer est ce tableau
// de correspondance — c'est lui qui fait le lien entre les deux versions d'une
// même page, pour le sélecteur de langue comme pour les balises hreflang.

import { serviceKeyBySlug, serviceSlugByKey } from "@/content/services";

export const LOCALES = ["fr", "en"];
export const DEFAULT_LOCALE = "fr";

// Langue « autre » — le sélecteur n'a que deux entrées, autant l'écrire une fois.
export const otherLocale = (lang) => (lang === "en" ? "fr" : "en");

// Attribut <html lang> et locale Open Graph.
export const OG_LOCALE = { fr: "fr_MA", en: "en_US" };

// Libellés du sélecteur de langue.
export const LOCALE_LABELS = {
  fr: { short: "FR", full: "Français" },
  en: { short: "EN", full: "English" },
};

// ---------------------------------------------------------------------------
// Table des routes statiques. La `key` est l'identité d'une page, indépendante
// de la langue : c'est elle qu'on manipule dans le code, jamais l'URL en dur.
// ---------------------------------------------------------------------------
export const ROUTES = {
  home: { fr: "/", en: "/en/" },
  construction: { fr: "/construction/", en: "/en/construction/" },
  bim: { fr: "/bim/", en: "/en/bim/" },
  particuliers: { fr: "/particuliers/", en: "/en/individuals/" },
  investisseurs: { fr: "/investisseurs/", en: "/en/investors/" },
  opportunites: {
    fr: "/investisseurs/opportunites/",
    en: "/en/investors/opportunities/",
  },
  dossier: {
    fr: "/investisseurs/dossier/",
    en: "/en/investors/information-pack/",
  },
  realisations: { fr: "/realisations/", en: "/en/projects/" },
  apropos: { fr: "/a-propos/", en: "/en/about/" },
  contact: { fr: "/contact/", en: "/en/contact/" },
  credits: { fr: "/credits/", en: "/en/credits/" },
};

/** Chemin d'une page statique dans une langue. `path("contact", "en")` → /en/contact/ */
export function path(key, lang = DEFAULT_LOCALE) {
  const entry = ROUTES[key];
  if (!entry) throw new Error(`Route inconnue : ${key}`);
  return entry[lang] || entry[DEFAULT_LOCALE];
}

/** Les deux chemins d'une page statique — prêt pour `alternates.languages`. */
export const paths = (key) => ({ fr: path(key, "fr"), en: path(key, "en") });

// --- Routes dynamiques ------------------------------------------------------

/** Page d'un métier. Le slug DOIT être celui de la langue demandée. */
export const servicePath = (slug, lang = DEFAULT_LOCALE) =>
  `${path("construction", lang)}${slug}/`;

/** Les deux chemins d'un métier, à partir de sa `key` stable. */
export const servicePaths = (key) => ({
  fr: servicePath(serviceSlugByKey(key, "fr"), "fr"),
  en: servicePath(serviceSlugByKey(key, "en"), "en"),
});

// Les réalisations viennent de MongoDB : leur slug est saisi par le gérant et
// n'existe qu'en une seule version. Le même slug sert donc dans les deux arbres,
// seul le préfixe de rubrique change.
export const projectPath = (slug, lang = DEFAULT_LOCALE) =>
  `${path("realisations", lang)}${slug}/`;

export const projectPaths = (slug) => ({
  fr: projectPath(slug, "fr"),
  en: projectPath(slug, "en"),
});

// ---------------------------------------------------------------------------
// Sélecteur de langue : trouver l'équivalent de la page courante dans l'autre
// langue, à partir du seul chemin (l'en-tête est un composant partagé, il ne
// connaît pas la route qu'il coiffe).
//
// Ordre de résolution : page statique → fiche métier → fiche réalisation →
// repli sur l'accueil de la langue cible. Le repli existe pour qu'un chemin
// inattendu (404, ancienne URL) ne casse jamais le bouton.
// ---------------------------------------------------------------------------
export function switchPath(pathname, toLang) {
  const from = otherLocale(toLang);
  // Next peut donner un chemin sans slash final selon le contexte de rendu.
  const p = pathname?.endsWith("/") ? pathname : `${pathname || "/"}/`;

  // 1) Page statique — correspondance exacte.
  for (const key of Object.keys(ROUTES)) {
    if (ROUTES[key][from] === p) return path(key, toLang);
  }

  // 2) Fiche métier : on passe par la `key` stable pour retrouver le slug cible.
  const consPrefix = path("construction", from);
  if (p.startsWith(consPrefix) && p !== consPrefix) {
    const slug = p.slice(consPrefix.length).replace(/\/$/, "");
    const key = serviceKeyBySlug(slug, from);
    const target = key && serviceSlugByKey(key, toLang);
    if (target) return servicePath(target, toLang);
  }

  // 3) Fiche réalisation : slug commun aux deux langues.
  const realPrefix = path("realisations", from);
  if (p.startsWith(realPrefix) && p !== realPrefix) {
    const slug = p.slice(realPrefix.length).replace(/\/$/, "");
    if (slug) return projectPath(slug, toLang);
  }

  return path("home", toLang);
}

/**
 * Bloc `alternates` complet pour les métadonnées Next.
 * `x-default` pointe sur le français : c'est la langue du marché principal
 * (Maroc) et la version historiquement indexée.
 */
export function alternatesFor(lang, pair) {
  return {
    canonical: pair[lang],
    languages: {
      fr: pair.fr,
      en: pair.en,
      "x-default": pair.fr,
    },
  };
}
