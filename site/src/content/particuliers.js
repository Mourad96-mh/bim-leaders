// §9 du cahier des charges — rubrique Particuliers.
// Le produit d'appel : l'étude préliminaire AVANT l'achat d'un terrain.
//
// ⚠️ MENTION OBLIGATOIRE (§9.2, dernier paragraphe) : le cahier impose de
// préciser que cette prestation est une étude préliminaire d'aide à la décision
// et qu'elle NE REMPLACE PAS les études réglementaires, architecturales,
// techniques et administratives requises pour le projet définitif.
// Le champ `disclaimer` ci-dessous répond à cette exigence — ne pas le retirer
// de la page, c'est une protection juridique autant qu'une clause du contrat.
// ⚠️ Cela vaut AUSSI pour la version anglaise : la page /en/individuals/ porte
//    la même mention, traduite. Ne jamais publier l'une sans l'autre.

const FR = {
  hero: {
    eyebrow: "Particuliers",
    title: "Vous envisagez d'acheter un terrain ?",
    text: "Avant de vous engager, BIM Leaders vous accompagne dans l'étude préliminaire du potentiel de votre terrain et vous aide à visualiser votre futur projet.",
  },

  // §9.1 — à qui s'adresse la rubrique.
  positioning:
    "Cette offre s'adresse aux particuliers souhaitant construire leur propre maison ou leur propre immeuble. Elle cible notamment les projets sur des terrains R+2, R+3, R+4 et autres configurations, selon les règles d'urbanisme applicables.",

  // §9.2 — le processus en 7 étapes, dans l'ordre exact du cahier des charges.
  processHead: {
    eyebrow: "Le processus",
    title: "De la parcelle à la décision, en sept étapes",
    text: "Une étude préliminaire courte, pensée pour vous donner de quoi décider — pas un dossier que vous n'aurez pas le temps de lire.",
  },
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

  // §29 — parcours client « Particulier ».
  journeyHead: {
    eyebrow: "Et ensuite ?",
    title: "Votre parcours, de bout en bout",
    text: "Si le terrain vous convient, nous pouvons enchaîner : BIM Leaders reste votre interlocuteur jusqu'à la livraison.",
  },
  journey: [
    "Terrain",
    "Analyse",
    "Conception préliminaire",
    "Potentiel constructible",
    "Budget",
    "Décision",
    "Construction",
  ],

  // §9.2 — message commercial et appel à l'action, repris tels quels du cahier.
  pitch: "Avant d'acheter votre terrain, découvrez son potentiel.",
  finalText:
    "Envoyez-nous la localisation et la superficie du terrain que vous visez. Nous vous dirons ce qu'il est possible d'y envisager.",
  cta: "Demander une étude",
  heroCta: "Étudier mon terrain",

  // Mention légale imposée — voir l'avertissement en tête de fichier.
  disclaimer:
    "Cette prestation constitue une étude préliminaire d'aide à la décision. Elle ne remplace pas les études réglementaires, architecturales, techniques et administratives requises pour le projet définitif.",

  metaTitle: "Étude de terrain avant achat — construire au Maroc | BIM Leaders",
  metaDescription:
    "Avant d'acheter votre terrain, découvrez son potentiel : analyse, potentiel constructible, conception préliminaire, configurations R+2/R+3/R+4, surfaces et budget indicatif.",

  // Intitulés du JSON-LD Service de la page.
  ldName: "Étude de terrain avant achat",
  ldType: "Étude préliminaire de potentiel constructible",
  ldAudience: "Particuliers",
};

const EN = {
  hero: {
    eyebrow: "Individuals",
    title: "Thinking of buying a plot?",
    text: "Before you commit, BIM Leaders carries out a preliminary study of what your plot could support, and helps you picture the building you could put on it.",
  },

  positioning:
    "This service is for private clients who want to build their own house or their own apartment building. It is aimed in particular at plots suited to three, four or five storeys — and other configurations, subject to the planning rules that apply.",

  processHead: {
    eyebrow: "The process",
    title: "From plot to decision, in seven steps",
    text: "A short preliminary study, designed to give you enough to decide on — not a report you will never find time to read.",
  },
  process: [
    {
      n: 1,
      title: "Plot analysis",
      text: "Preliminary study of the area, shape and known characteristics of the plot.",
    },
    {
      n: 2,
      title: "Development potential",
      text: "Preliminary assessment of what could be envisaged on the plot, subject to the planning rules that apply.",
    },
    {
      n: 3,
      title: "Preliminary design",
      text: "A first proposal for how the project could be laid out.",
    },
    {
      n: 4,
      title: "Configuration study",
      text: "Review of the options — ground plus two, three or four storeys, or other configurations permitted by the applicable regulations.",
    },
    {
      n: 5,
      title: "Floor area estimate",
      text: "A first estimate of floor areas and of how the building would be organised.",
    },
    {
      n: 6,
      title: "Budget estimate",
      text: "Preliminary assessment of the budget the project would require.",
    },
    {
      n: 7,
      title: "Decision support",
      text: "You are left with a first, concrete view of the project before committing to the purchase or the investment.",
    },
  ],

  configurations: ["G+2", "G+3", "G+4"],
  configurationsNote: "and other configurations, subject to the applicable regulations",

  journeyHead: {
    eyebrow: "And then?",
    title: "Your journey, end to end",
    text: "If the plot stacks up, we can carry straight on: BIM Leaders stays your single point of contact through to handover.",
  },
  journey: [
    "Plot",
    "Analysis",
    "Preliminary design",
    "Development potential",
    "Budget",
    "Decision",
    "Construction",
  ],

  pitch: "Before you buy the plot, find out what it can carry.",
  finalText:
    "Send us the location and the area of the plot you have in mind. We'll tell you what could realistically be built on it.",
  cta: "Request a study",
  heroCta: "Study my plot",

  disclaimer:
    "This service is a preliminary study intended to support your decision. It does not replace the regulatory, architectural, technical and administrative studies required for the final project.",

  metaTitle: "Plot study before you buy — building in Morocco | BIM Leaders",
  metaDescription:
    "Before you buy your plot, find out its potential: site analysis, development potential, preliminary design, storey configurations, floor areas and an indicative budget.",

  ldName: "Plot study before purchase",
  ldType: "Preliminary development potential study",
  ldAudience: "Private clients",
};

const BY_LOCALE = { fr: FR, en: EN };

export const getParticuliers = (lang = "fr") => BY_LOCALE[lang] || FR;
