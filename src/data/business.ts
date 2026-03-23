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
  phone: '+33688776648',
  whatsapp: '33688776648', // format sans +, pour wa.me/
  whatsappMessage: 'Bonjour Marc, je souhaite discuter d\'un projet de site web.',
  url: 'https://marcm.fr',

  // Réseaux sociaux
  socialMedia: {
    linkedin: 'https://www.linkedin.com/in/marcmuller',
  },

  // Business
  description: 'Création de sites web sur mesure pour artisans, commerçants et petites entreprises du Grand Est.',
  priceRange: '490€ - 1990€+',
  areaServed: ['Strasbourg', 'Metz', 'Nancy', 'Colmar', 'Mulhouse'],

  // Offres (3-tier actuel)
  offers: [
    {
      name: 'Essentiel',
      price: 490,
      currency: 'EUR',
      description: 'Site vitrine 1-3 pages, design responsive, SEO de base, formulaire de contact.',
    },
    {
      name: 'Multi-pages',
      price: 1290,
      currency: 'EUR',
      description: 'Site multi-pages optimisé SEO, blog intégré, données structurées, formulaire avancé.',
    },
    {
      name: 'Sur mesure',
      price: 1990,
      currency: 'EUR',
      description: 'Architecture personnalisée, fonctionnalités spécifiques, accompagnement complet.',
    },
  ],

  // Maintenance
  maintenance: {
    priceFrom: 100,
    priceTo: 150,
    currency: 'EUR',
    period: 'mois',
  },

  // 100 Vitrines — 🔧 MISE À JOUR ICI pour changer le compteur partout
  sitesRealises: 5,
  sitesTotal: 100,

  // Géolocalisation (Schema.org)
  geo: {
    lat: 49.0948,
    lon: 6.1521,
  },

  // Legal
  siret: '505 045 450 00069',
} as const;
