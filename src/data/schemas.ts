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
    "jobTitle": "Développeur Web Freelance",
    "description": "Développeur web spécialisé dans la création de sites web sur mesure pour artisans, commerçants et petites entreprises",
    "url": business.url,
    "sameAs": [
      "https://www.linkedin.com/in/marcmuller"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Marc M"
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
    "name": business.name,
    "description": business.description,
    "url": business.url,
    "telephone": business.phone,
    "email": business.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": business.address.city,
      "addressRegion": business.address.region,
      "postalCode": business.address.zip,
      "addressCountry": business.address.country
    },
    "areaServed": business.areaServed.map(city => ({
      "@type": "City",
      "name": city
    })),
    "priceRange": business.priceRange,
    "hasOfferingChannel": business.offers.map(offer => ({
      "@type": "Service",
      "name": offer.name,
      "price": String(offer.price),
      "priceCurrency": offer.currency,
      "description": offer.description
    }))
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
      "name": article.author || business.owner
    },
    "publisher": {
      "@type": "Organization",
      "name": business.name,
      "url": business.url
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
