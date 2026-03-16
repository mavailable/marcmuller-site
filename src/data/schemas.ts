// Schemas JSON-LD pour SEO structuré
import { business } from './business';

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": business.name,
    "url": business.url,
    "description": business.description,
    "inLanguage": business.lang,
    "publisher": {
      "@type": "Person",
      "name": business.owner,
    },
  };
}

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Marc Muller",
    "jobTitle": "Développeur Web & Fondateur MM Agency",
    "description": "Développeur web spécialisé dans la création de sites web sur mesure pour artisans, commerçants et petites entreprises",
    "url": "https://marcmuller.fr",
    "sameAs": [
      "https://www.linkedin.com/in/marcmuller",
      "https://github.com/marcmuller"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "MM Agency"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Strasbourg",
      "addressRegion": "Grand Est",
      "postalCode": "67000",
      "addressCountry": "FR"
    }
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MM Agency",
    "description": "Création de sites web sur mesure pour artisans, commerçants et petites entreprises",
    "url": "https://marcmuller.fr",
    "telephone": "",
    "email": "marc@muller.im",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Strasbourg",
      "addressRegion": "Grand Est",
      "postalCode": "67000",
      "addressCountry": "FR"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Strasbourg"
      },
      {
        "@type": "City",
        "name": "Metz"
      },
      {
        "@type": "City",
        "name": "Nancy"
      },
      {
        "@type": "Country",
        "name": "France"
      }
    ],
    "priceRange": "490€ - 1490€+",
    "hasOfferingChannel": [
      {
        "@type": "Service",
        "name": "Essentiel",
        "price": "490",
        "priceCurrency": "EUR",
        "description": "1 à 5 pages sur mesure, design adapté, responsive mobile-first, SEO LocalBusiness complet, formulaire de contact + bouton d'appel, livraison en 5-7 jours"
      },
      {
        "@type": "Service",
        "name": "Multi-pages",
        "price": "990",
        "priceCurrency": "EUR",
        "description": "Site multi-pages optimisé SEO, blog intégré, données structurées, formulaire avancé"
      },
      {
        "@type": "Service",
        "name": "Sur mesure",
        "price": "1490",
        "priceCurrency": "EUR",
        "description": "Architecture personnalisée, fonctionnalités spécifiques, accompagnement complet, 3 mois de suivi post-lancement"
      }
    ]
  };
}

export function getFAQSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

export function getArticleSchema(article: {
  title: string;
  date: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "url": article.url,
    "datePublished": article.date,
    "dateModified": article.date,
    ...(article.image && { "image": article.image }),
    "author": {
      "@type": "Person",
      "name": article.author || "Marc Muller"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MM Agency",
      "url": "https://marcmuller.fr"
    }
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
