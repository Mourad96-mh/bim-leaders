import { COMPANY, telHref } from "@/lib/company";
import { SERVICES } from "@/content/services";
import { HOME } from "@/content/home";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";

const SITE = COMPANY.siteUrl;

// Données structurées (§17 « données structurées pertinentes »).
// `GeneralContractor` est le type schema.org exact d'un entrepreneur de
// bâtiment : plus précis que LocalBusiness, dont il hérite de toute façon.
// Déclaré ici, donc présent sur toutes les pages VITRINE, et absent du
// dashboard — qui n'a rien à dire à Google.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${SITE}/#business`,
  name: COMPANY.legalName,
  alternateName: COMPANY.name,
  url: SITE,
  email: COMPANY.email,
  telephone: telHref(),
  image: `${SITE}/og.jpg`,
  logo: `${SITE}/logo.png`,
  slogan: COMPANY.slogan,
  description:
    "Entreprise marocaine de bâtiment et travaux publics à Rabat : gros œuvre, second œuvre, électricité, plomberie, climatisation, désenfumage, aménagement extérieur, assainissement et voirie. Approche BIM et accompagnement des projets immobiliers.",
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
  areaServed: COMPANY.areaServed.map((name) => ({ "@type": "City", name })),
  founder: { "@type": "Person", name: COMPANY.director },
  knowsLanguage: ["fr", "ar"],
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
      availableLanguage: ["fr", "ar"],
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Construction & services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.short,
        url: `${SITE}/construction/${s.slug}/`,
      },
    })),
  },
};

export const metadata = {
  alternates: { canonical: "/" },
  keywords: [
    "BIM Leaders",
    "entreprise de construction Rabat",
    "entreprise BTP Maroc",
    "travaux de bâtiment Rabat",
    "gros œuvre Rabat",
    "second œuvre",
    "électricité plomberie bâtiment",
    "climatisation désenfumage",
    "assainissement voirie VRD",
    "BIM Maroc",
    "construction maison Maroc",
    "construction immeuble Rabat",
    "étude de terrain avant achat",
    "potentiel constructible terrain",
    "projet immobilier investisseur Maroc",
    "développement immobilier Rabat",
  ],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "/",
    siteName: COMPANY.name,
    title: HOME.metaTitle,
    description: HOME.metaDescription,
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "BIM Leaders — construction, BTP et BIM au Maroc" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME.metaTitle,
    description: HOME.metaDescription,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function SiteLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyBar />
    </>
  );
}
