// Ce que les DEUX racines vitrine — (site) en français, (en) en anglais —
// partagent : les métadonnées de base et le JSON-LD de l'entreprise.
//
// Factorisé ici pour qu'une correction (une vérification Search Console, un
// champ schema.org) n'ait pas à être faite deux fois, et surtout pour qu'elle ne
// puisse pas être faite d'un seul côté.

import { COMPANY, telHref, text } from "./company";
import { getServices } from "@/content/services";
import { getHome } from "@/content/home";
import { path, servicePath, OG_LOCALE } from "./i18n";

const SITE = COMPANY.siteUrl;

/** Métadonnées de la racine d'une langue. */
export function rootMetadata(lang) {
  const home = getHome(lang);
  const brand = text(lang);

  return {
    metadataBase: new URL(SITE),
    title: {
      default: home.metaTitle,
      template: "%s | BIM Leaders",
    },
    description: home.metaDescription,
    applicationName: COMPANY.name,
    authors: [{ name: COMPANY.legalName }],
    creator: COMPANY.legalName,
    keywords: brand.keywords,
    alternates: {
      canonical: path("home", lang),
      languages: {
        fr: path("home", "fr"),
        en: path("home", "en"),
        "x-default": path("home", "fr"),
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[lang],
      url: path("home", lang),
      siteName: COMPANY.name,
      title: home.metaTitle,
      description: home.metaDescription,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: brand.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: home.metaTitle,
      description: home.metaDescription,
      images: ["/og.jpg"],
    },
    robots: { index: true, follow: true },
    // Preuve de propriété du site pour Google Search Console. Next la rend en
    // <meta name="google-site-verification">.
    //
    // Déclarée ICI, dans les racines, et non page par page : Google vérifie
    // l'accueil, mais la balise doit survivre à toute page qu'il choisit de
    // visiter. Les pages filles n'ont pas à la redéclarer — Next fusionne
    // `verification` depuis le parent (contrairement à `openGraph`, remplacé
    // segment par segment, cf. lib/seo.js).
    //
    // ⚠️ NE PAS RETIRER une fois la propriété confirmée : Google revérifie
    // périodiquement et révoque l'accès si la balise a disparu.
    verification: { google: "r4ARZn69epDIbacgkgm0sk7-9yNhMnKWeE1GdR7RkQE" },
  };
}

/**
 * Données structurées de l'entreprise (§17 « données structurées pertinentes »).
 *
 * `GeneralContractor` est le type schema.org exact d'un entrepreneur de
 * bâtiment : plus précis que LocalBusiness, dont il hérite de toute façon.
 * Émis sur toutes les pages VITRINE des deux langues, et absent du dashboard —
 * qui n'a rien à dire à Google.
 *
 * L'`@id` est VOLONTAIREMENT identique dans les deux langues : c'est la même
 * entreprise, décrite dans deux langues, pas deux entreprises. Les pages métier
 * y renvoient via `provider: { "@id": … }`.
 */
export function businessLd(lang) {
  const brand = text(lang);

  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE}/#business`,
    name: COMPANY.legalName,
    alternateName: COMPANY.name,
    url: `${SITE}${path("home", lang)}`,
    email: COMPANY.email,
    telephone: telHref(),
    image: `${SITE}/og.jpg`,
    logo: `${SITE}/logo.png`,
    slogan: brand.slogan,
    description: brand.businessDescription,
    priceRange: "$$",
    currenciesAccepted: "MAD",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${COMPANY.address.street}, ${COMPANY.address.district}`,
      addressLocality: COMPANY.address.locality,
      addressRegion: COMPANY.address.region,
      addressCountry: COMPANY.address.country,
    },
    hasMap: COMPANY.mapsUrl,
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.lat,
      longitude: COMPANY.geo.lng,
    },
    areaServed: brand.areaServed.map((name) => ({ "@type": "City", name })),
    founder: { "@type": "Person", name: COMPANY.director },
    // Le site est désormais publié en français et en anglais ; l'arabe reste une
    // langue de travail du bureau, d'où sa présence ici.
    knowsLanguage: ["fr", "en", "ar"],
    openingHoursSpecification: COMPANY.hoursLd.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    // `sameAs` n'est émis que si des profils officiels sont renseignés : mieux
    // vaut un champ absent qu'un tableau vide.
    ...(COMPANY.social.length ? { sameAs: COMPANY.social.map((s) => s.url) } : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: telHref(),
        contactType: "customer service",
        areaServed: "MA",
        availableLanguage: ["fr", "en", "ar"],
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: brand.offerCatalog,
      itemListElement: getServices(lang).map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.short,
          url: `${SITE}${servicePath(s.slug, lang)}`,
        },
      })),
    },
  };
}
