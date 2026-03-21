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
    street: '',
    city: 'Strasbourg',
    zip: '67000',
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

  // Legal (à compléter)
  siret: '', // TODO: ajouter le SIRET
} as const;
