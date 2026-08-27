// §8 du cahier des charges — rubrique BIM.
//
// ⚠️ Positionnement imposé par le client (§2.2) : le BIM doit être présenté
// comme une VALEUR AJOUTÉE À LA CONSTRUCTION, jamais comme une activité
// indépendante déconnectée du chantier. Toute la rédaction ci-dessous part donc
// du chantier et revient au chantier. Ne pas réécrire ces textes en « agence
// BIM » : ce serait contraire au brief.

export const BIM = {
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
  note:
    "BIM Leaders peut générer, à la demande du client, le modèle numérique du projet.",

  cta: { label: "Parlons de votre projet", href: "/contact/" },

  metaTitle: "Le BIM au service de la construction — BIM Leaders",
  metaDescription:
    "Comment BIM Leaders utilise le BIM pour mieux concevoir, coordonner, anticiper et maîtriser ses chantiers : visualisation, coordination des lots, détection d'incompatibilités, quantités.",
};
