// §8 du cahier des charges — rubrique BIM.
//
// ⚠️ Positionnement imposé par le client (§2.2) : le BIM doit être présenté
// comme une VALEUR AJOUTÉE À LA CONSTRUCTION, jamais comme une activité
// indépendante déconnectée du chantier. Toute la rédaction ci-dessous part donc
// du chantier et revient au chantier. Ne pas réécrire ces textes en « agence
// BIM » : ce serait contraire au brief. La version anglaise suit exactement la
// même contrainte — « in the service of construction », pas « BIM consultancy ».

const FR = {
  pageEyebrow: "La valeur ajoutée technologique",
  title: "Le BIM au service de la construction",
  intro:
    "Le BIM — Building Information Modeling — consiste à construire d'abord le bâtiment en numérique, avant de le construire en réel. Chez BIM Leaders, ce modèle n'est pas un livrable de plus : c'est l'outil qui nous sert à mieux préparer, coordonner et maîtriser nos propres chantiers.",
  // §8.1 — ce que le visiteur doit avoir compris en quittant la page.
  takeaway:
    "Le BIM permet à BIM Leaders de mieux préparer et maîtriser les projets de construction.",

  // §6.4 — la chaîne affichée en schéma sur l'accueil et en tête de la page BIM.
  chain: [
    "Conception",
    "Modélisation",
    "Coordination",
    "Quantification",
    "Planification",
    "Construction",
    "Suivi",
  ],

  // §8.2 — les cinq valeurs apportées par le BIM, dans l'ordre du cahier.
  valuesHead: {
    eyebrow: "Ce que le BIM apporte",
    title: "Cinq bénéfices concrets sur le chantier",
    text: "Le modèle numérique n'est pas un livrable décoratif : il sert à préparer, coordonner et suivre l'exécution.",
  },
  values: [
    {
      key: "visualisation",
      title: "Visualisation",
      icon: "eye",
      text: "Permettre au client de mieux comprendre son projet grâce à la modélisation. Voir le bâtiment avant qu'il existe évite les mauvaises surprises et les décisions prises trop tard.",
    },
    {
      key: "coordination",
      title: "Coordination",
      icon: "layers",
      text: "Faciliter la coordination entre architecture, structure, électricité, plomberie, climatisation et autres corps d'état, en confrontant tous les lots dans un seul modèle.",
    },
    {
      key: "anticipation",
      title: "Anticipation",
      icon: "alert",
      text: "Identifier en amont certaines incompatibilités pouvant apparaître pendant l'exécution. Une gaine qui traverse une poutre se corrige en quelques minutes sur le modèle, en plusieurs jours sur le chantier.",
    },
    {
      key: "quantification",
      title: "Quantification",
      icon: "calculator",
      text: "Exploiter les données du modèle afin de faciliter la préparation des quantités. Le métré devient une extraction, plus une estimation.",
    },
    {
      key: "maitrise",
      title: "Maîtrise",
      icon: "target",
      text: "Améliorer la préparation, le suivi et la coordination du projet. Le modèle sert de référence commune à toutes les équipes, du bureau d'étude au chef de chantier.",
    },
  ],

  // Sous-rubriques listées dans l'arborescence (§5). Sections ancrées de la page.
  // ⚠️ `id` sert d'ancre dans l'URL : il reste identique dans les deux langues
  // pour qu'un lien profond (#coordination) fonctionne des deux côtés.
  sections: [
    {
      id: "approche",
      title: "Notre approche BIM",
      text: "Nous ne vendons pas du BIM : nous construisons avec. Le modèle est produit par notre bureau d'étude interne pour servir l'exécution, et il évolue avec le chantier plutôt que de rester figé à la phase études.",
    },
    {
      id: "modelisation",
      title: "Modélisation",
      text: "Modélisation du projet à partir des plans d'architecte et des plans de BET : structure, enveloppe, lots techniques. Le niveau de détail est calé sur l'usage réel qui sera fait du modèle, pas sur un standard théorique.",
    },
    {
      id: "coordination",
      title: "Coordination",
      text: "Synthèse des plans de l'architecte avec ceux du BET pour assurer leur complémentarité et éviter tout dysfonctionnement dans le déroulement normal des travaux. Les conflits détectés sont arbitrés avant d'arriver sur site.",
    },
    {
      id: "quantites-estimation",
      title: "Quantités & estimation",
      text: "Extraction des quantités depuis le modèle pour préparer les commandes, fiabiliser le budget et suivre les consommations réelles au fil de l'avancement.",
    },
    {
      id: "suivi-de-projet",
      title: "Suivi de projet",
      text: "Le modèle sert de support au suivi d'exécution : planification des phases, comparaison entre le prévu et le réalisé, et mise à jour au fur et à mesure de l'avancement du chantier.",
    },
  ],

  // Formulation reprise de l'Offre de service (§7 « Veille technique »).
  note: "BIM Leaders peut générer, à la demande du client, le modèle numérique du projet.",

  // Rattachement explicite au chantier : la page BIM ne doit jamais se lire
  // comme une offre indépendante (§2.2).
  tradesHead: {
    eyebrow: "Sur le terrain",
    title: "Le BIM, lot par lot",
    text: "Chaque métier a sa page : vous y trouverez ce que la modélisation change concrètement sur ce lot précis.",
  },

  finalCta: {
    title: "Voir votre projet avant de le construire",
    text: "Présentez-nous votre projet : nous vous dirons ce que la modélisation peut y apporter, et à quel moment.",
    cta: "Parlons de votre projet",
  },

  metaTitle: "Le BIM au service de la construction — BIM Leaders",
  metaDescription:
    "Comment BIM Leaders utilise le BIM pour mieux concevoir, coordonner, anticiper et maîtriser ses chantiers : visualisation, coordination des lots, détection d'incompatibilités, quantités.",
};

const EN = {
  pageEyebrow: "The technology edge",
  title: "BIM in the service of construction",
  intro:
    "BIM — Building Information Modeling — means building the project digitally before building it for real. At BIM Leaders the model is not one more deliverable: it is the tool we use to prepare, coordinate and stay in control of our own sites.",
  takeaway:
    "BIM is what lets BIM Leaders prepare construction projects better and keep them under control.",

  chain: [
    "Design",
    "Modelling",
    "Coordination",
    "Quantities",
    "Programme",
    "Construction",
    "Monitoring",
  ],

  valuesHead: {
    eyebrow: "What BIM brings",
    title: "Five concrete gains on site",
    text: "The model is not a decorative deliverable: it is there to prepare, coordinate and track the works.",
  },
  values: [
    {
      key: "visualisation",
      title: "Visualisation",
      icon: "eye",
      text: "Letting the client genuinely understand the project through the model. Seeing the building before it exists heads off unpleasant surprises and decisions taken too late.",
    },
    {
      key: "coordination",
      title: "Coordination",
      icon: "layers",
      text: "Making coordination easier between architecture, structure, electrical, plumbing, HVAC and every other trade, by bringing all packages together in a single model.",
    },
    {
      key: "anticipation",
      title: "Clash detection",
      icon: "alert",
      text: "Catching, early on, the clashes that would otherwise surface during construction. A duct running through a beam takes minutes to fix on the model and days to fix on site.",
    },
    {
      key: "quantification",
      title: "Quantities",
      icon: "calculator",
      text: "Using the model's data to prepare quantities. The take-off becomes an extraction rather than an estimate.",
    },
    {
      key: "maitrise",
      title: "Control",
      icon: "target",
      text: "Better preparation, tracking and coordination across the project. The model is the common reference for every team, from the design office to the site foreman.",
    },
  ],

  sections: [
    {
      id: "approche",
      title: "Our approach to BIM",
      text: "We don't sell BIM — we build with it. The model is produced by our in-house design office to serve construction, and it moves with the site rather than freezing at design stage.",
    },
    {
      id: "modelisation",
      title: "Modelling",
      text: "Modelling the project from the architect's drawings and the engineers' designs: structure, envelope, building services. The level of detail is set by what the model will actually be used for, not by a theoretical standard.",
    },
    {
      id: "coordination",
      title: "Coordination",
      text: "Reconciling the architect's drawings with the engineers' so that they work together and nothing disrupts the normal run of the works. Clashes are settled before they reach site.",
    },
    {
      id: "quantites-estimation",
      title: "Quantities & estimating",
      text: "Extracting quantities from the model to prepare orders, firm up the budget and track actual consumption as the works progress.",
    },
    {
      id: "suivi-de-projet",
      title: "Project monitoring",
      text: "The model underpins delivery monitoring: phase planning, planned-versus-built comparison, and updates as the site advances.",
    },
  ],

  note: "At the client's request, BIM Leaders can produce the digital model of the project.",

  tradesHead: {
    eyebrow: "On the ground",
    title: "BIM, trade by trade",
    text: "Every trade has its own page, setting out what modelling changes for that specific package.",
  },

  finalCta: {
    title: "See your project before you build it",
    text: "Tell us about your project and we'll tell you what modelling can bring to it, and at which stage.",
    cta: "Tell us about your project",
  },

  metaTitle: "BIM in the service of construction — BIM Leaders",
  metaDescription:
    "How BIM Leaders uses BIM to design, coordinate, anticipate and control its sites: visualisation, trade coordination, clash detection and reliable quantities.",
};

const BY_LOCALE = { fr: FR, en: EN };

export const getBim = (lang = "fr") => BY_LOCALE[lang] || FR;
