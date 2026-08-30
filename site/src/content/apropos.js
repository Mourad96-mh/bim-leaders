// §12 du cahier des charges — rubrique À propos.
// Les six valeurs et l'organisation d'équipe proviennent de l'Offre de service
// officielle de BIM LEADERS (§2 « Nos valeurs » et §6 « Moyens humains et
// techniques ») — ce sont les formulations du client, pas des inventions.
// La version anglaise en est la traduction fidèle : ne pas y ajouter de
// promesse que le document du client ne fait pas.

const FR = {
  hero: {
    eyebrow: "À propos",
    title: "Construire avec vision",
    text: "BIM Leaders est une entreprise marocaine de bâtiment et travaux publics qui associe l'expertise de la construction à une approche BIM et à l'accompagnement des porteurs de projets immobiliers.",
  },

  missionTitle: "Notre mission",
  mission:
    "Réaliser des projets de construction maîtrisés — techniquement, économiquement et opérationnellement — en intervenant depuis l'étude préliminaire jusqu'à la livraison.",
  visionTitle: "Notre vision",
  vision:
    "Devenir le partenaire de confiance des particuliers, investisseurs et promoteurs qui veulent voir et comprendre leur projet avant de le construire.",

  // Offre de service §2 — les six valeurs fondamentales, dans l'ordre du document.
  valuesHead: { eyebrow: "Nos valeurs", title: "Six principes qui tiennent nos chantiers" },
  values: [
    {
      title: "Compétence",
      icon: "badge",
      text: "Une équipe hautement qualifiée garantissant expertise et maîtrise technique.",
    },
    {
      title: "Confiance",
      icon: "handshake",
      text: "Des relations durables fondées sur la transparence et le respect des engagements.",
    },
    {
      title: "Innovation",
      icon: "spark",
      text: "Intégration du BIM et des solutions modernes pour optimiser les projets.",
    },
    {
      title: "Qualité – Délais – Coûts",
      icon: "scale",
      text: "Respect des délais, maîtrise des coûts et exigence de qualité grâce à l'expérience.",
    },
    {
      title: "Engagement",
      icon: "team",
      text: "Mobilisation efficace des ressources humaines et techniques pour chaque projet.",
    },
    {
      title: "Professionnalisme",
      icon: "check",
      text: "Même implication et même sérieux pour tous les projets, petits ou grands.",
    },
  ],

  // Offre de service §6 — structure d'encadrement proposée sur un chantier.
  team: {
    eyebrow: "Moyens humains",
    title: "Un encadrement présent sur le chantier",
    intro:
      "BIM Leaders dispose d'un encadrement technique hautement qualifié composé d'un ingénieur directeur technique, de conducteurs de travaux, de chefs de chantier et d'une main d'œuvre qualifiée.",
    roles: [
      {
        title: "Directeur technique",
        text: "Assure le pilotage global de l'opération et procède à des interventions inopinées sur le chantier.",
      },
      {
        title: "Conducteur de travaux",
        text: "Assure le suivi et le contrôle permanent sur chantier, gère l'interface avec le client et coordonne les chefs d'équipes.",
      },
      {
        title: "Chefs d'équipe",
        text: "Chaque chef d'équipe assure le suivi de la partie de chantier qui lui est affectée et coordonne la main d'œuvre qui en relève.",
      },
      {
        title: "Main d'œuvre qualifiée",
        text: "Affectée selon le besoin et le délai prévu pour l'achèvement du projet dans les délais contractuels.",
      },
    ],
  },

  // Offre de service §7 — le bureau d'étude interne, argument différenciant fort.
  bureauEtude: {
    eyebrow: "Veille technique",
    title: "Un bureau d'étude interne",
    text: "Via son bureau d'étude interne, BIM Leaders établit la synthèse des plans de l'architecte avec les plans de BET pour assurer leur complémentarité et éviter tout dysfonctionnement dans le déroulement normal des travaux. Il produit également les plans d'exécution des lots techniques et architecturaux. Il réunit un ingénieur structure, un ingénieur électricité, un ingénieur fluides et des techniciens dessinateurs bâtiment.",
    livrables: [
      "Plans d'exécution électricité",
      "Plans d'exécution plomberie",
      "Plans d'exécution climatisation",
      "Plans d'exécution désenfumage",
      "Plans d'exécution des lots architecturaux : revêtements, menuiseries, peinture, faux plafond, lustrerie, accessoires sanitaires",
    ],
  },

  // Offre de service §5 — méthodologie d'exécution.
  engagementsHead: { eyebrow: "Méthodologie", title: "Nos engagements d'exécution" },
  engagements: [
    { title: "Planification rigoureuse", text: "Chaque phase est préparée avant d'être lancée." },
    { title: "Suivi permanent du chantier", text: "Présence continue de l'encadrement sur site." },
    {
      title: "Contrôle qualité continu",
      text: "La qualité se vérifie en cours d'exécution, pas à la réception.",
    },
    {
      title: "Normes techniques et de sécurité",
      text: "Respect des normes techniques et de sécurité exigées.",
    },
  ],

  // §12 — section « Pourquoi choisir BIM Leaders ? »
  why: {
    title: "Pourquoi choisir BIM Leaders ?",
    points: [
      "Un constructeur, pas un intermédiaire : la construction est notre cœur de métier.",
      "Le BIM en appui du chantier, pour anticiper au lieu de corriger.",
      "Un bureau d'étude interne qui produit les plans d'exécution.",
      "Un accompagnement possible dès l'étude du terrain, avant même l'achat.",
      "Tous les corps d'état sous une seule responsabilité, du gros œuvre aux finitions.",
      "Une intervention sur des projets résidentiels, commerciaux et industriels.",
    ],
  },

  finalCta: {
    title: "Travaillons ensemble",
    text: "Un projet de construction, une étude de terrain ou un programme immobilier : présentez-nous votre besoin.",
    cta: "Parlons de votre projet",
  },

  metaTitle: "À propos — entreprise de construction & BIM à Rabat",
  metaDescription:
    "BIM Leaders, entreprise marocaine de bâtiment et travaux publics à Rabat : mission, valeurs, encadrement technique, bureau d'étude interne et approche BIM.",
};

const EN = {
  hero: {
    eyebrow: "About us",
    title: "Building with vision",
    text: "BIM Leaders is a Moroccan building and civil engineering company that pairs hands-on construction expertise with a BIM-led approach and support for property project sponsors.",
  },

  missionTitle: "Our mission",
  mission:
    "To deliver construction projects that stay under control — technically, financially and operationally — from the first preliminary study through to handover.",
  visionTitle: "Our vision",
  vision:
    "To become the trusted partner of the private clients, investors and developers who want to see and understand their project before they build it.",

  valuesHead: { eyebrow: "Our values", title: "Six principles that hold our sites together" },
  values: [
    {
      title: "Competence",
      icon: "badge",
      text: "A highly qualified team, and with it genuine technical command of the work.",
    },
    {
      title: "Trust",
      icon: "handshake",
      text: "Lasting relationships built on transparency and on keeping our commitments.",
    },
    {
      title: "Innovation",
      icon: "spark",
      text: "BIM and modern methods brought in to make projects work better.",
    },
    {
      title: "Quality – Time – Cost",
      icon: "scale",
      text: "Programmes met, costs controlled and quality held to, on the strength of experience.",
    },
    {
      title: "Commitment",
      icon: "team",
      text: "Human and technical resources mobilised properly on every project.",
    },
    {
      title: "Professionalism",
      icon: "check",
      text: "The same involvement and the same rigour on every project, large or small.",
    },
  ],

  team: {
    eyebrow: "Our people",
    title: "Supervision that is actually on site",
    intro:
      "BIM Leaders has a highly qualified technical management team: a chartered technical director, site managers, site foremen and a skilled workforce.",
    roles: [
      {
        title: "Technical director",
        text: "Runs the operation as a whole and carries out unannounced inspections on site.",
      },
      {
        title: "Site manager",
        text: "Provides continuous monitoring and control on site, handles the interface with the client and coordinates the foremen.",
      },
      {
        title: "Foremen",
        text: "Each foreman oversees the part of the works assigned to them and coordinates the crews reporting to them.",
      },
      {
        title: "Skilled workforce",
        text: "Assigned according to need and to the programme required to complete the project on contract time.",
      },
    ],
  },

  bureauEtude: {
    eyebrow: "Technical capability",
    title: "An in-house design office",
    text: "Through its in-house design office, BIM Leaders reconciles the architect's drawings with the engineers' designs so that they work together and nothing disrupts the normal run of the works. The office also produces the shop drawings for the services and architectural packages. It brings together a structural engineer, an electrical engineer, a mechanical engineer and building draughtsmen.",
    livrables: [
      "Electrical shop drawings",
      "Plumbing shop drawings",
      "Air conditioning shop drawings",
      "Smoke extraction shop drawings",
      "Architectural shop drawings: finishes, joinery, painting, suspended ceilings, light fittings, sanitary accessories",
    ],
  },

  engagementsHead: { eyebrow: "Method", title: "How we commit to deliver" },
  engagements: [
    { title: "Rigorous planning", text: "Every phase is prepared before it is started." },
    { title: "Continuous site supervision", text: "Management is present on site throughout." },
    {
      title: "Ongoing quality control",
      text: "Quality is checked as the work proceeds, not at handover.",
    },
    {
      title: "Technical and safety standards",
      text: "Full compliance with the technical and safety standards required.",
    },
  ],

  why: {
    title: "Why choose BIM Leaders?",
    points: [
      "A contractor, not a middleman: construction is our core business.",
      "BIM in support of the site, so we anticipate instead of correcting.",
      "An in-house design office that produces the shop drawings.",
      "Support available from the plot study stage, before you even buy.",
      "Every trade under a single point of responsibility, from structure to final finishes.",
      "Experience across residential, commercial and industrial projects.",
    ],
  },

  finalCta: {
    title: "Let's work together",
    text: "A construction project, a plot study or a property programme: tell us what you need.",
    cta: "Tell us about your project",
  },

  metaTitle: "About — construction & BIM company in Rabat",
  metaDescription:
    "BIM Leaders, a Moroccan building and civil engineering company in Rabat: mission, values, technical management, in-house design office and BIM-led delivery.",
};

const BY_LOCALE = { fr: FR, en: EN };

export const getApropos = (lang = "fr") => BY_LOCALE[lang] || FR;
