// Données centralisées de l'entreprise — source unique de vérité
// Utilisé par BaseLayout, SchemaOrg, Footer, mentions-legales, etc.

export const business = {
  // Identité
  name: 'Marc M',
  legalName: 'Marc M — Marc Muller',
  owner: 'Marc Muller',
  jobTitle: 'Développeur Web Freelance',

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
  description: 'Création de sites web sur mesure pour artisans, commerçants et petites entreprises du Grand Est.',
  priceRange: '490€+',
  areaServed: ['Strasbourg', 'Metz', 'Nancy', 'Colmar', 'Mulhouse'],

  // Offres (2 niveaux : produit + service)
  offers: [
    {
      name: 'Site Vitrine',
      price: 490,
      currency: 'EUR',
      description: 'Site professionnel sur mesure, référencé Google & IA, Lighthouse 100, livré en 7 jours.',
    },
    {
      name: 'Projet Sur Mesure',
      price: null, // sur devis
      currency: 'EUR',
      description: 'Multi-pages, blog, fonctionnalités métier, stratégie SEO — devis gratuit sous 48h.',
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
  ],

  // Accompagnement post-livraison
  accompagnement: [
    {
      name: 'Autonomie',
      price: 0,
      period: null,
      description: 'Votre site tourne tout seul. Vous gérez en toute indépendance.',
    },
    {
      name: 'Accompagnement',
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

  // Vitrines Mystères — produit d'analyse UX par personas IA
  visiteMystere: {
    name: 'Vitrines Mystères',
    tagline: '20 prospects IA visitent votre site et vous disent pourquoi ils n\'appellent pas.',
    tiers: [
      { name: 'Gratuit', price: 0, personas: 5, description: '5 visiteurs simulés, résumé + 1 recommandation, par email.' },
      { name: 'Complet', price: 90, personas: 20, description: '20 visiteurs simulés, rapport interactif, audit technique, recommandations priorisées, page dédiée.' },
      { name: 'Pro', price: 250, personas: 100, description: '100 visiteurs simulés, analyse par canal et maturité, score par profil client, appel de 30 min.' },
    ],
    rapportsGeneres: 26,
  },

  // 100 Vitrines — 🔧 MISE À JOUR ICI pour changer le compteur partout
  sitesRealises: 11,
  sitesTotal: 100,

  // Géolocalisation (Schema.org)
  geo: {
    lat: 49.0948,
    lon: 6.1521,
  },

  // Legal
  siret: '505 045 450 00069',
} as const;
