// §9 du cahier des charges — rubrique Particuliers.
// Le produit d'appel : l'étude préliminaire AVANT l'achat d'un terrain.
//
// ⚠️ MENTION OBLIGATOIRE (§9.2, dernier paragraphe) : le cahier impose de
// préciser que cette prestation est une étude préliminaire d'aide à la décision
// et qu'elle NE REMPLACE PAS les études réglementaires, architecturales,
// techniques et administratives requises pour le projet définitif.
// Le champ `disclaimer` ci-dessous répond à cette exigence — ne pas le retirer
// de la page, c'est une protection juridique autant qu'une clause du contrat.

export const PARTICULIERS = {
  hero: {
    eyebrow: "Particuliers",
    title: "Vous envisagez d'acheter un terrain ?",
    text: "Avant de vous engager, BIM Leaders vous accompagne dans l'étude préliminaire du potentiel de votre terrain et vous aide à visualiser votre futur projet.",
    cta: { label: "Étudier mon terrain", href: "/contact/?sujet=etude-terrain" },
  },

  // §9.1 — à qui s'adresse la rubrique.
  positioning:
    "Cette offre s'adresse aux particuliers souhaitant construire leur propre maison ou leur propre immeuble. Elle cible notamment les projets sur des terrains R+2, R+3, R+4 et autres configurations, selon les règles d'urbanisme applicables.",

  // §9.2 — le processus en 7 étapes, dans l'ordre exact du cahier des charges.
  process: [
    {
      n: 1,
      title: "Analyse du terrain",
      text: "Étude préliminaire de la superficie, de la configuration et des caractéristiques connues du terrain.",
    },
    {
      n: 2,
      title: "Analyse du potentiel",
      text: "Évaluation préliminaire de ce qui pourrait être envisagé sur le terrain, sous réserve des règles d'urbanisme applicables.",
    },
    {
      n: 3,
      title: "Conception préliminaire",
      text: "Proposition d'une première organisation du projet.",
    },
    {
      n: 4,
      title: "Étude de configurations",
      text: "Examen des possibilités telles que R+2, R+3, R+4, ou d'autres configurations selon la réglementation applicable.",
    },
    {
      n: 5,
      title: "Estimation des surfaces",
      text: "Première estimation des surfaces et de l'organisation du bâtiment.",
    },
    {
      n: 6,
      title: "Estimation budgétaire",
      text: "Évaluation préliminaire du budget nécessaire à la réalisation.",
    },
    {
      n: 7,
      title: "Accompagnement à la décision",
      text: "Le client dispose ainsi d'une première vision du projet avant de prendre sa décision d'achat ou d'investissement.",
    },
  ],

  // Configurations mises en avant (§9.1 et §9.2 étape 4).
  configurations: ["R+2", "R+3", "R+4"],
  configurationsNote: "et autres configurations selon la réglementation applicable",

  // §9.2 — message commercial et appel à l'action, repris tels quels du cahier.
  pitch: "Avant d'acheter votre terrain, découvrez son potentiel.",
  cta: { label: "Demander une étude", href: "/contact/?sujet=etude-terrain" },

  // Mention légale imposée — voir l'avertissement en tête de fichier.
  disclaimer:
    "Cette prestation constitue une étude préliminaire d'aide à la décision. Elle ne remplace pas les études réglementaires, architecturales, techniques et administratives requises pour le projet définitif.",

  // §29 — parcours client « Particulier ».
  journey: [
    "Terrain",
    "Analyse",
    "Conception préliminaire",
    "Potentiel constructible",
    "Budget",
    "Décision",
    "Construction",
  ],

  metaTitle: "Étude de terrain avant achat — construire au Maroc | BIM Leaders",
  metaDescription:
    "Avant d'acheter votre terrain, découvrez son potentiel : analyse, potentiel constructible, conception préliminaire, configurations R+2/R+3/R+4, surfaces et budget indicatif.",
};
