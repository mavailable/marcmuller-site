// Données centralisées de l'entreprise — source unique de vérité
// Utilisé par BaseLayout, SchemaOrg, Footer, mentions-legales, etc.

export const business = {
  // Identité
  name: 'MM Agency',
  legalName: 'MM Agency — Marc Muller',
  owner: 'Marc Muller',
  jobTitle: 'Développeur Web & Fondateur',

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
  phone: '', // Pas de téléphone public
  url: 'https://marcmuller.fr',

  // Réseaux sociaux
  socialMedia: {
    linkedin: 'https://www.linkedin.com/in/marcmuller',
    github: 'https://github.com/marcmuller',
  },

  // Business
  description: 'Création de sites web sur mesure pour artisans, commerçants et petites entreprises du Grand Est.',
  priceRange: '490€ - 2500€+',
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
      price: 990,
      currency: 'EUR',
      description: 'Site multi-pages optimisé SEO, blog intégré, données structurées, formulaire avancé.',
    },
    {
      name: 'Sur mesure',
      price: 1490,
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
