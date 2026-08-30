// §11 du cahier des charges — rubrique Réalisations.
//
// ⚠️ Ce fichier ne porte QUE l'habillage éditorial de la rubrique. Les projets
// eux-mêmes viennent de MongoDB, saisis par le gérant depuis le dashboard : ils
// n'existent donc qu'EN FRANÇAIS, et c'est assumé. Sur /en/projects/, le nom, la
// localisation et la description d'un chantier restent tels qu'ils ont été
// saisis ; seul ce qui les entoure (titres, intitulés de fiche, boutons) est
// traduit. Traduire automatiquement des noms de projets réels serait pire que
// de les laisser tels quels.

const FR = {
  eyebrow: "Notre portfolio",
  title: "Réalisations",
  text: "Les projets que nous avons livrés et ceux que nous construisons en ce moment. Chaque fiche détaille la nature du projet, les prestations réalisées et les photos de chantier.",

  // Grille vide (aucun projet publié).
  emptyTitle: "Nos réalisations arrivent",
  emptyText:
    "Les projets livrés et les chantiers en cours seront publiés ici prochainement, avec photos et fiches détaillées. En attendant, parlez-nous de votre projet : nous vous présenterons des références comparables.",
  emptyCta: "Parlons de votre projet",

  finalCta: {
    title: "Votre projet a sa place ici",
    text: "Parlez-nous de ce que vous voulez construire : nous étudions la faisabilité et revenons vers vous avec une première lecture technique et budgétaire.",
    cta: "Demander un devis",
  },

  // Page sentinelle : catalogue encore vide (cf. le commentaire de la route).
  sentinelTitle: "Cette réalisation n'est pas encore publiée",
  sentinelEmptyTitle: "Aucune fiche à afficher",
  sentinelEmptyText:
    "Nos réalisations sont en cours de publication. Parlez-nous de votre projet : nous vous présenterons des références comparables.",
  sentinelMetaTitle: "Réalisation à venir",
  sentinelMetaDescription: "Cette réalisation n'est pas encore publiée.",

  metaTitle: "Réalisations — projets livrés et chantiers en cours",
  metaDescription:
    "Le portfolio de BIM Leaders : projets de construction réalisés et chantiers en cours à Rabat et au Maroc. Photos, caractéristiques et prestations réalisées pour chaque projet.",

  ldName: "Réalisations de BIM Leaders",
  // Repli de description d'une fiche, quand le gérant n'en a pas saisi.
  fallbackType: "projet de construction",
  inLocation: (lieu) => ` à ${lieu}`,
  fallbackDescription: (nom, type, lieu) =>
    `${nom} : ${type} réalisé par BIM Leaders${lieu}.`,
  videoTitle: (nom) => `Vidéo — ${nom}`,
};

const EN = {
  eyebrow: "Our portfolio",
  title: "Projects",
  text: "The buildings we have delivered and the sites we are working on right now. Each entry sets out the nature of the project, the works carried out and photographs from site.",

  emptyTitle: "Our projects are on their way",
  emptyText:
    "Completed buildings and sites under construction will be published here shortly, with photographs and full details. In the meantime, tell us about your project and we'll show you comparable references.",
  emptyCta: "Tell us about your project",

  finalCta: {
    title: "Your project belongs here",
    text: "Tell us what you want to build: we'll look at feasibility and come back to you with an initial technical and budget read.",
    cta: "Request a quote",
  },

  sentinelTitle: "This project has not been published yet",
  sentinelEmptyTitle: "Nothing to show here yet",
  sentinelEmptyText:
    "Our projects are in the process of being published. Tell us about yours and we'll show you comparable references.",
  sentinelMetaTitle: "Project coming soon",
  sentinelMetaDescription: "This project has not been published yet.",

  metaTitle: "Projects — completed buildings and sites under way",
  metaDescription:
    "The BIM Leaders portfolio: completed construction projects and sites under way in Rabat and across Morocco. Photographs, key facts and works carried out on each project.",

  ldName: "BIM Leaders projects",
  fallbackType: "construction project",
  inLocation: (lieu) => ` in ${lieu}`,
  fallbackDescription: (nom, type, lieu) =>
    `${nom}: ${type} delivered by BIM Leaders${lieu}.`,
  videoTitle: (nom) => `Video — ${nom}`,
};

const BY_LOCALE = { fr: FR, en: EN };
export const getRealisationsPage = (lang = "fr") => BY_LOCALE[lang] || FR;
