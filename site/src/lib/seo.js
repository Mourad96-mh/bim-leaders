// Aide au référencement : un seul point d'entrée pour construire les
// métadonnées d'une page (§17 du cahier des charges).
//
// Site monolingue (français) : pas d'alternates hreflang à gérer, seulement le
// canonique. Chaque page DOIT redéclarer son bloc Open Graph — Next remplace
// `openGraph` segment par segment au lieu de le fusionner, donc une page qui
// n'en déclare pas hériterait de l'image et du titre de l'accueil.

import { COMPANY } from "./company";

/**
 * @param {object}  o
 * @param {string}  o.path          chemin canonique, slash final inclus (« /bim/ »)
 * @param {string}  o.title         titre de la page (le gabarit « … | BIM Leaders » s'applique)
 * @param {string}  o.description   meta description
 * @param {string} [o.absoluteTitle] titre complet, sans gabarit (page d'accueil)
 * @param {string} [o.image]        image de partage (défaut : /og.jpg)
 * @param {boolean}[o.noindex]      exclure de l'index (pages utilitaires)
 */
export function buildMetadata({
  path,
  title,
  description,
  absoluteTitle,
  image = "/og.jpg",
  noindex = false,
}) {
  const ogTitle = absoluteTitle || `${title} | BIM Leaders`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      locale: "fr_MA",
      url: path,
      siteName: COMPANY.name,
      title: ogTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
  };
}

/**
 * Fil d'Ariane en données structurées (§17). Google l'utilise pour afficher le
 * chemin de la page à la place de l'URL brute dans les résultats.
 * @param {{name: string, path: string}[]} trail — de la racine à la page courante
 */
export function breadcrumbLd(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: `${COMPANY.siteUrl}${step.path}`,
    })),
  };
}

// Balise <script type="application/ld+json"> prête à insérer dans une page.
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
