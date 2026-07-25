// Données centralisées de l'entreprise — source unique de vérité
// Utilisé par BaseLayout, SchemaOrg, Footer, mentions-legales, etc.

export const business = {
  // Identité
  name: 'Marc M',
  legalName: 'Marc M — Marc Muller',
  owner: 'Marc Muller',
  jobTitle: 'Le bras droit des indépendants',
  tagline: "Tu n'as pas besoin d'un site. Tu as besoin de clients.",

  // Localisation
  lang: 'fr',
  country: 'FR',
  address: {
    street: '13 Rue des Peupliers',
    city: 'Montigny-lès-Metz',
    zip: '57950',
    region: 'Grand Est',
    country: 'FR',
  },

  // Contact
  email: 'marc@muller.im',
  phone: '+33688766648',
  whatsapp: '33688766648', // format sans +, pour wa.me/
  whatsappMessage: 'Bonjour Marc, je souhaite discuter d\'un projet de site web.',
  url: 'https://marcm.fr',

  // Réseaux sociaux
  socialMedia: {
    linkedin: 'https://www.linkedin.com/in/marcmuller',
  },

  // Business
  description: "J'aide les indépendants à trouver des clients. Un site qui te ramène des clients, de quoi aller les chercher et savoir quoi leur dire, et les outils qui te font gagner du temps. Comme un associé qui met les mains dedans, sans prendre tes parts.",
  areaServed: ['France', 'Strasbourg', 'Metz', 'Nancy', 'Colmar', 'Mulhouse'],

  // Offres (gamme 3 niveaux : déclic → bras droit → briques)
  // Note : plus AUCUN tarif public n'est affiché sur le site ni indexé dans le
  // Schema.org (décision 2026-07). Les champs `price` restent comme données internes
  // mais ne sont ni rendus par les pages ni émis dans le JSON-LD (cf. schemas.ts).
  // Tout parcours commercial oriente vers l'échange (/contact, /onboarding).
  offers: [
    {
      name: "L'accompagnement",
      price: null, // sans prix public — "on en parle"
      currency: 'EUR',
      description: "On bosse ensemble chaque semaine. Je fais avec toi : le site, les réseaux, la prospection, le mini-CRM, tes devis-factures. Comme un associé qui met les mains dedans, sans prendre tes parts.",
    },
    {
      name: 'Site Vitrine',
      price: 490,
      currency: 'EUR',
      description: 'Un site qui te ramène des clients : sur mesure, référencé Google et IA, Lighthouse 100, livré en 7 jours.',
    },
    {
      name: 'Projet Sur Mesure',
      price: null, // sur devis
      currency: 'EUR',
      description: 'Multi-pages, blog, fonctionnalités métier, stratégie SEO. Devis gratuit sous 48h.',
    },
  ],

  // Add-ons à la carte
  addons: [
    { name: 'Page supplémentaire', price: 120 },
    { name: 'Fiche Google Business', price: 90 },
    { name: 'Pack réseaux sociaux', price: 150 },
    { name: 'Blog SEO (5 articles + CMS)', price: 390 },
    { name: 'Rédaction de contenu', price: 190 },
    { name: 'Prise de RDV en ligne', price: 180 },
    { name: 'Paiement en ligne', price: 250 },
    { name: 'Galerie photos avancée', price: 90 },
    { name: 'Animations au scroll', price: 90 },
    { name: 'Site bilingue FR/DE ou FR/EN', price: 390 },
  ],

  // Forfaits de suivi post-livraison (maintenance technique du site).
  // Distinct de l'accompagnement (le bras droit récurrent, cf. offers[] + /accompagnement).
  // Le mot « accompagnement » est réservé au cœur de gamme ; ici c'est du « suivi ».
  suivi: [
    {
      name: 'Autonomie',
      price: 0,
      period: null,
      description: 'Votre site tourne tout seul. Vous gérez en toute indépendance.',
    },
    {
      name: 'Suivi',
      price: 39,
      period: 'mois',
      description: 'Domaine inclus, support email/WhatsApp, modifications mineures.',
    },
    {
      name: 'Croissance',
      price: 99,
      period: 'mois',
      description: '1 article blog/mois, 2h de modifications, rapport SEO mensuel.',
    },
  ],

  // Écho — produit d'analyse UX par personas IA
  visiteMystere: {
    name: 'Écho',
    tagline: 'L\'écho de vos visiteurs — ce que votre site leur renvoie vraiment.',
    tiers: [
      { name: 'Gratuit', price: 0, personas: 5, description: '5 visiteurs simulés, résumé + 1 recommandation, par email.', stripePaymentLink: '' },
      { name: 'Complet', price: 90, personas: 20, description: '20 visiteurs simulés, rapport interactif, audit technique, recommandations priorisées, page dédiée.', stripePaymentLink: '' },
      { name: 'Pro', price: 250, personas: 100, description: '100 visiteurs simulés, analyse par canal et maturité, score par profil client, appel de 30 min.', stripePaymentLink: '' },
    ],
    rapportsGeneres: 26,
  },

  // Géolocalisation (Schema.org)
  geo: {
    lat: 49.0948,
    lon: 6.1521,
  },

  // Legal
  siret: '505 045 450 00069',
} as const;
