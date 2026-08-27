// §12 du cahier des charges — rubrique À propos.
// Les six valeurs et l'organisation d'équipe proviennent de l'Offre de service
// officielle de BIM LEADERS (§2 « Nos valeurs » et §6 « Moyens humains et
// techniques ») — ce sont les formulations du client, pas des inventions.

export const APROPOS = {
  hero: {
    eyebrow: "À propos",
    title: "Construire avec vision",
    text: "BIM Leaders est une entreprise marocaine de bâtiment et travaux publics qui associe l'expertise de la construction à une approche BIM et à l'accompagnement des porteurs de projets immobiliers.",
  },

  mission:
    "Réaliser des projets de construction maîtrisés — techniquement, économiquement et opérationnellement — en intervenant depuis l'étude préliminaire jusqu'à la livraison.",
  vision:
    "Devenir le partenaire de confiance des particuliers, investisseurs et promoteurs qui veulent voir et comprendre leur projet avant de le construire.",

  // Offre de service §2 — les six valeurs fondamentales, dans l'ordre du document.
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
    title: "Un bureau d'étude interne",
    text: "Via son bureau d'étude interne, BIM Leaders établit la synthèse des plans de l'architecte avec les plans de BET pour assurer leur complémentarité et éviter tout dysfonctionnement dans le déroulement normal des travaux. Il produit également les plans d'exécution des lots techniques et architecturaux.",
    livrables: [
      "Plans d'exécution électricité",
      "Plans d'exécution plomberie",
      "Plans d'exécution climatisation",
      "Plans d'exécution désenfumage",
      "Plans d'exécution des lots architecturaux : revêtements, menuiseries, peinture, faux plafond, lustrerie, accessoires sanitaires",
    ],
  },

  // Offre de service §5 — méthodologie d'exécution.
  engagements: [
    { title: "Planification rigoureuse", text: "Chaque phase est préparée avant d'être lancée." },
    { title: "Suivi permanent du chantier", text: "Présence continue de l'encadrement sur site." },
    { title: "Contrôle qualité continu", text: "La qualité se vérifie en cours d'exécution, pas à la réception." },
    { title: "Normes techniques et de sécurité", text: "Respect des normes techniques et de sécurité exigées." },
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

  metaTitle: "À propos — entreprise de construction & BIM à Rabat",
  metaDescription:
    "BIM Leaders, entreprise marocaine de bâtiment et travaux publics à Rabat : mission, valeurs, encadrement technique, bureau d'étude interne et approche BIM.",
};
