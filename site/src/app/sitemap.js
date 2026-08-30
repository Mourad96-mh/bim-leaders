import { COMPANY } from "@/lib/company";
import { getServices } from "@/content/services";
import { snapshot } from "@/lib/realisations";
import { LOCALES, paths, servicePaths, projectPaths } from "@/lib/i18n";

// Requis par `output: "export"` — génère un sitemap.xml statique au build.
export const dynamic = "force-static";

const BASE = COMPANY.siteUrl;

// Sitemap auto-alimenté : un métier ajouté dans content/services.js ou une
// réalisation publiée depuis le dashboard (donc présente dans le snapshot au
// prochain build) y apparaissent sans intervention.
//
// SITE BILINGUE — chaque page est déclarée UNE FOIS PAR LANGUE, et chaque
// entrée porte les `alternates` des deux versions. C'est la façon dont Google
// veut recevoir un site multilingue : sans ces alternates, il traiterait
// /contact/ et /en/contact/ comme deux pages concurrentes sur le même sujet.
//
// Les URLs sont produites par lib/i18n.js, jamais écrites en dur : ajouter une
// route dans ROUTES suffit à la faire apparaître ici dans les deux langues.
export default function sitemap() {
  const now = new Date();

  // Une paire { fr, en } → une entrée de sitemap par langue.
  const entry = (pair, priority, changeFrequency) =>
    LOCALES.map((lang) => ({
      url: `${BASE}${pair[lang]}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          fr: `${BASE}${pair.fr}`,
          en: `${BASE}${pair.en}`,
          "x-default": `${BASE}${pair.fr}`,
        },
      },
    }));

  return [
    ...entry(paths("home"), 1.0, "weekly"),
    ...entry(paths("construction"), 0.9, "monthly"),
    // Les six métiers : la `key` est stable, les deux slugs en découlent.
    ...getServices("fr").flatMap((s) => entry(servicePaths(s.key), 0.8, "monthly")),
    ...entry(paths("bim"), 0.9, "monthly"),
    ...entry(paths("particuliers"), 0.9, "monthly"),
    ...entry(paths("investisseurs"), 0.9, "monthly"),
    ...entry(paths("opportunites"), 0.7, "weekly"),
    ...entry(paths("dossier"), 0.5, "yearly"),
    ...entry(paths("realisations"), 0.9, "weekly"),
    // Les réalisations partagent leur slug entre les deux langues.
    ...snapshot().flatMap((p) => entry(projectPaths(p.slug), 0.7, "monthly")),
    ...entry(paths("apropos"), 0.7, "yearly"),
    ...entry(paths("contact"), 0.8, "yearly"),
    // /credits/ est volontairement absent : la page est en noindex (obligation
    // de licence, pas de référencement).
  ];
}
