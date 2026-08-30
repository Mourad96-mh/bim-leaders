// Lecture des réalisations — la seule donnée du site qui vit dans MongoDB.
//
// ⚠️ Ce module est SANS « use client » exprès : les pages serveur (sitemap,
// generateStaticParams, JSON-LD) doivent pouvoir appeler snapshot() au build.
// Le rafraîchissement côté navigateur vit dans lib/useRealisations.js, qui est
// le module client. Fusionner les deux casserait le build : un module marqué
// client n'expose au serveur que des références de composants, pas des
// fonctions appelables.
//
// Les projets sont saisis en français dans le dashboard et servis tels quels
// dans les deux langues (cf. content/realisations.js). Seuls les LIBELLÉS
// calculés ici — statut, filtre « Tous » — sont traduits.

import snapshotData from "./realisations.data.json";
import { t } from "./ui";

// L'ordre est calculé ici, et non côté API, pour qu'il soit IDENTIQUE dans le
// HTML statique et après le rafraîchissement client — sinon la grille se
// réorganise visiblement à l'hydratation.
export function sortRealisations(list) {
  return [...list].sort((a, b) => {
    // 1) Les chantiers en cours d'abord : ils prouvent l'activité.
    if (a.statut !== b.statut) return a.statut === "en-cours" ? -1 : 1;
    // 2) Puis l'ordre manuel défini dans le dashboard (petit = haut).
    const ordreA = Number.isFinite(a.ordre) ? a.ordre : 999;
    const ordreB = Number.isFinite(b.ordre) ? b.ordre : 999;
    if (ordreA !== ordreB) return ordreA - ordreB;
    // 3) Puis l'année décroissante.
    return (Number(b.annee) || 0) - (Number(a.annee) || 0);
  });
}

export const snapshot = () => sortRealisations(snapshotData);

export const getRealisation = (slug) => snapshot().find((r) => r.slug === slug);

// Catégories de filtre (§11 « filtres par catégorie »), déduites des projets
// existants : rien à maintenir en double quand un type de projet inédit arrive.
// Les types viennent du dashboard, donc en français dans les deux langues ;
// seule l'entrée « Tous » est traduite.
export function categoriesOf(list, lang = "fr") {
  const types = [...new Set(list.map((r) => r.type).filter(Boolean))];
  return [t(lang).projects.all, ...types.sort((a, b) => a.localeCompare(b, "fr"))];
}

export const STATUTS = ["realise", "en-cours"];

export const statutLabel = (key, lang = "fr") =>
  key === "en-cours" ? t(lang).projects.statusOngoing : t(lang).projects.statusDone;
