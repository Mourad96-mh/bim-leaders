// §6 du cahier des charges — page d'accueil.
// Les titres, messages et libellés de boutons ci-dessous sont ceux PROPOSÉS PAR
// LE CLIENT dans le cahier (§6.1 à §6.8). Ils ont été repris à l'identique
// partout où le document en donnait la formulation exacte.

import { COMPANY } from "@/lib/company";

export const HOME = {
  // §6.1 — section hero.
  hero: {
    eyebrow: "Entrepreneur de bâtiments & travaux publics",
    title: "Construire avec vision.",
    subtitle: COMPANY.baseline,
    ctaPrimary: { label: "Demander un devis", href: "/contact/" },
    ctaSecondary: { label: "Découvrir nos réalisations", href: "/realisations/" },
    // Gages de confiance affichés sous les boutons.
    trust: [
      "Tous corps d'état",
      "Bureau d'étude interne",
      "Approche BIM",
    ],
  },

  // §6.2 — présentation courte de l'entreprise.
  intro: {
    title: "Un constructeur qui conçoit avant de bâtir",
    text: "BIM Leaders est une entreprise de bâtiment et travaux publics basée à Rabat. Notre cœur de métier est la construction : gros œuvre, second œuvre, lots techniques et aménagements extérieurs, sur des projets résidentiels, commerciaux et industriels.",
    text2: "Notre particularité est d'intégrer le BIM à notre approche des projets. Le modèle numérique nous sert à mieux concevoir, visualiser, coordonner les corps d'état et anticiper les incompatibilités — avant que les équipes n'arrivent sur le chantier.",
    cta: { label: "En savoir plus sur nous", href: "/a-propos/" },
  },

  // §6.3 — les six domaines d'intervention (rendus depuis content/services.js).
  domaines: {
    eyebrow: "Nos domaines d'intervention",
    title: "Six métiers, une seule responsabilité",
    text: "Du terrassement aux finitions, BIM Leaders prend en charge l'ensemble des lots et en assure la coordination.",
    cta: { label: "Voir tous nos métiers", href: "/construction/" },
  },

  // §6.4 — section BIM (le schéma de la chaîne vient de content/bim.js).
  bim: {
    eyebrow: "La valeur ajoutée technologique",
    title: "Le BIM au service de la construction",
    text: "Nous construisons d'abord le projet en numérique. Cela nous permet de le montrer au client, de confronter les lots entre eux et de régler les conflits sur le modèle plutôt que sur le chantier.",
    cta: { label: "Notre approche BIM", href: "/bim/" },
  },

  // §6.5 — section Particuliers, formulations exactes du cahier.
  particuliers: {
    eyebrow: "Particuliers",
    title: "Vous envisagez d'acheter un terrain ?",
    text: "Avant de vous engager, BIM Leaders vous accompagne dans l'étude préliminaire du potentiel de votre terrain et vous aide à visualiser votre futur projet.",
    cta: { label: "Étudier mon terrain", href: "/particuliers/" },
  },

  // §6.6 — section Investisseurs, formulations exactes du cahier.
  investisseurs: {
    eyebrow: "Investisseurs",
    title: "Vous avez un projet immobilier ?",
    text: "BIM Leaders accompagne les investisseurs dans le développement et la réalisation de projets immobiliers, de l'étude initiale à la livraison.",
    cta: { label: "Présenter mon projet", href: "/investisseurs/" },
  },

  // §6.7 — galerie de réalisations (alimentée par l'API / le snapshot).
  realisations: {
    eyebrow: "Nos réalisations",
    title: "Des projets livrés, des chantiers en cours",
    text: "Découvrez les projets que nous réalisons, du logement individuel à l'immeuble en R+4.",
    cta: { label: "Voir toutes nos réalisations", href: "/realisations/" },
  },

  // §6.8 — appel à l'action final, formulation exacte du cahier.
  finalCta: {
    title: "Vous avez un projet de construction ou d'investissement immobilier ?",
    text: "Parlons-en. Nous étudions votre demande et revenons vers vous avec une première lecture technique et budgétaire.",
    cta: { label: "Parlons de votre projet", href: "/contact/" },
  },

  metaTitle: "BIM Leaders — Construction, BTP & BIM à Rabat | Construire avec vision",
  metaDescription:
    "Entreprise de bâtiment et travaux publics à Rabat : gros œuvre, second œuvre, électricité, plomberie, climatisation, VRD. Approche BIM et accompagnement des projets immobiliers. Devis gratuit.",
};
