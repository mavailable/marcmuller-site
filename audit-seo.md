# Audit SEO/GEO — marcm.fr

**Date** : 2026-03-23
**Référence** : Standards wf-04-seo-geo

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| Schema.org principal (ProfessionalService + Person) | 14 | /15 | ✅ Complet |
| FAQPage (6 Q&R) | 10 | /10 | ✅ |
| WebSite + BreadcrumbList | 4 | /5 | ⚠️ Breadcrumb défini mais non utilisé |
| Open Graph (7 tags + Twitter Cards) | 10 | /10 | ✅ |
| Meta tags par page (title, desc, canonical) | 9 | /10 | ✅ Quelques titles courts |
| robots.txt (bots IA autorisés) | 10 | /10 | ✅ |
| llms.txt complet | 10 | /10 | ✅ |
| JSON-LD syntaxiquement correct | 10 | /10 | ✅ Validé live |
| Cohérence contenu/SEO + sitemap | 9 | /10 | ✅ Corrigé (noindex filtrés) |
| Liens internes/externes | 5 | /5 | ✅ Tous sécurisés |
| **TOTAL** | **91** | **/100** | ✅ |

---

## Check 1 — Schema.org JSON-LD — 14/15 ✅

### Schémas présents sur le site live

| Page | Schémas | Statut |
|------|---------|--------|
| / (accueil) | WebSite + Person + ProfessionalService | ✅ |
| /offre | WebSite + ProfessionalService + FAQPage (6 Q&R) | ✅ |
| /contact | WebSite + ProfessionalService | ✅ |
| /100-sites-artisans | WebSite + ProfessionalService | ✅ |
| /journal/* (articles) | WebSite + Article | ✅ |
| /creation-site-web-* | WebSite + ProfessionalService + FAQPage | ✅ |
| /en/* | Mirrors des schémas FR | ✅ |

### ProfessionalService — Champs vérifiés

| Champ | Valeur | Statut |
|-------|--------|--------|
| @type | ProfessionalService | ✅ |
| name | Marc M | ✅ |
| legalName | Marc M | ✅ |
| url | https://marcm.fr | ✅ |
| telephone | +33688776648 | ✅ |
| email | marc@muller.im | ✅ |
| address.streetAddress | 13 Rue des Peupliers | ✅ |
| address.postalCode | 57950 | ✅ |
| address.addressLocality | Montigny-lès-Metz | ✅ |
| address.addressRegion | Grand Est | ✅ |
| address.addressCountry | FR | ✅ ISO |
| geo.latitude | 49.0948 | ✅ Dynamique |
| geo.longitude | 6.1521 | ✅ Dynamique |
| priceRange | 490€ - 1990€+ | ✅ |
| areaServed | 5 villes (Strasbourg, Metz, Nancy, Colmar, Mulhouse) | ✅ |
| makesOffer | 3 offres (Essentiel, Multi-pages, Sur mesure) | ✅ |
| sameAs | LinkedIn | ✅ |

### Person — Champs vérifiés

| Champ | Valeur | Statut |
|-------|--------|--------|
| name | Marc Muller | ✅ |
| jobTitle | Développeur Web Freelance | ✅ |
| url | https://marcm.fr | ✅ |
| sameAs | LinkedIn | ✅ |
| worksFor | Marc M (Organization) | ✅ |
| address | Complet | ✅ |

### FAQPage — 6 questions

Toutes les 6 Q&R de offre.astro sont correctement structurées avec `mainEntity` → `Question` → `acceptedAnswer`.

### BreadcrumbList — Non utilisé ⚠️

La fonction `getBreadcrumbSchema()` existe dans `schemas.ts` mais n'est appelée nulle part. Opportunité d'amélioration pour les articles de blog et les pages imbriquées, mais non bloquant.

### Article (blog)

Les 5 articles FR et 5 articles EN ont chacun un JSON-LD Article inline avec : headline, description, datePublished, dateModified, author, publisher, mainEntityOfPage, articleSection.

---

## Check 2 — Open Graph — 10/10 ✅

### Tags OG (BaseLayout.astro)

| Tag | Implémentation | Statut |
|-----|---------------|--------|
| og:title | Dynamique (prop title) | ✅ |
| og:description | Dynamique (prop description) | ✅ |
| og:image | Dynamique (prop ogImage, fallback og-default.png) | ✅ |
| og:url | Canonical URL auto | ✅ |
| og:type | Dynamique (website/article) | ✅ |
| og:locale | Dynamique (fr_FR/en_US selon lang) | ✅ |
| og:site_name | Marc M (business.name) | ✅ |

### Twitter Cards

| Tag | Valeur | Statut |
|-----|--------|--------|
| twitter:card | summary_large_image | ✅ |
| twitter:site | @marcmuller_dev | ✅ |
| twitter:title | Dynamique | ✅ |
| twitter:description | Dynamique | ✅ |
| twitter:image | Dynamique | ✅ |

### OG Images

| Image | Taille | Statut |
|-------|--------|--------|
| og-default.png | 273 Ko | ✅ (< 300 Ko) |
| og-100-vitrines.png | 57 Ko | ✅ |
| og-graphistes.png | 52 Ko | ✅ |
| og-realisations.png | 44 Ko | ✅ |

---

## Check 3 — Meta tags par page — 9/10 ✅

### Titles et descriptions — Pages FR

| Page | Title | Chars | Description | Chars |
|------|-------|-------|-------------|-------|
| / | Marc M — Sites web sur mesure pour artisans et petits commerces | 62 | Créateur de sites web performants et référencés... | ~155 |
| /offre | Offre & Tarifs — Marc M \| Création de sites web | 48 | 3 formules claires : Essentiel 490€... | ~148 |
| /realisations | Réalisations — Marc M | 21 | Découvrez les sites web que j'ai créés... | ~120 |
| /qui-suis-je | Qui suis-je — Marc M | 20 | Marc, 40 ans, Messin. Entrepreneur... | ~115 |
| /contact | Contact — Marc M | 16 | Parlons de votre projet... | ~75 |
| /100-sites-artisans | 100 Vitrines — Sites web gratuits pour artisans \| Marc M | 55 | Je crée gratuitement 100 sites... | ~140 |
| /journal | Journal — Marc M | 16 | Réflexions sur le web, les prix, le SEO... | ~130 |
| /graphistes | Graphistes : proposez des sites web... | ~55 | Sous-traitance web pour graphistes... | ~115 |
| /merci | Message reçu — Marc M | 21 | Merci pour votre message... (noindex) | ~80 |

**Notes** :
- Certains titles sont courts (contact, journal, qui-suis-je) mais contiennent le brand "Marc M"
- Toutes les descriptions sont uniques et spécifiques
- Canonical automatique via `Astro.url.pathname` + `Astro.site`

### hreflang

| Page FR | Page EN | x-default | Statut |
|---------|---------|-----------|--------|
| / | /en/ | FR | ✅ |
| /offre | /en/services | FR | ✅ |
| /contact | /en/contact | FR | ✅ |
| /realisations | /en/portfolio | FR | ✅ |
| /qui-suis-je | /en/about | FR | ✅ |
| /100-sites-artisans | /en/100-artisan-websites | FR | ✅ |
| /merci | /en/thank-you | FR | ✅ |
| /mentions-legales | /en/legal-notice | FR | ✅ |
| /politique-confidentialite | /en/privacy-policy | FR | ✅ |
| /graphistes | /en/designers | FR | ✅ |
| /journal | /en/blog | FR | ✅ |

### noindex correctement appliqué

- /merci ✅
- /en/thank-you ✅
- /graphistes ✅
- /en/designers ✅
- /404 ✅

---

## Check 4 — sitemap.xml — ✅

### Configuration

- Package : @astrojs/sitemap
- i18n : fr-FR (default), en-US
- 38 URLs générées

### Correction effectuée

**Avant** : 4 pages noindex incluses dans le sitemap (signal contradictoire pour Google).
- /merci/
- /en/thank-you/
- /graphistes/
- /en/designers/

**Après** : Ajout d'un filtre dans `astro.config.mjs` :
```javascript
filter: (page) =>
  !page.includes('/merci') &&
  !page.includes('/thank-you') &&
  !page.includes('/graphistes') &&
  !page.includes('/designers'),
```

→ 34 URLs correctes après rebuild.

---

## Check 5 — robots.txt — 10/10 ✅

| Directive | Statut |
|-----------|--------|
| User-agent: * → Allow: / | ✅ |
| GPTBot → Allow | ✅ |
| ClaudeBot → Allow | ✅ |
| PerplexityBot → Allow | ✅ |
| anthropic-ai → Allow | ✅ |
| Googlebot → Allow | ✅ |
| Bingbot → Allow | ✅ |
| DuckDuckGoBot → Allow | ✅ |
| MJ12bot → Disallow | ✅ (scraper) |
| AhrefsBot → Disallow | ✅ (scraper) |
| SemrushBot → Disallow | ✅ (scraper) |
| Sitemap référencé | ✅ sitemap-index.xml |

---

## Check 6 — llms.txt — 10/10 ✅

Fichier complet avec :
- Titre + description
- Pages principales (6 pages avec URLs)
- Offres détaillées (3 formules + maintenance)
- Informations clés (nom, email, localisation, zone servie, technologies, délai)
- Villes desservies avec URLs des pages géolocalisées

---

## Check 7 — Liens — 5/5 ✅

### Liens externes
- Tous les `target="_blank"` ont `rel="noopener noreferrer"` ✅
- 14 instances vérifiées dans le code source

### Liens internes
- 27 liens uniques identifiés
- Aucun lien cassé détecté
- Cohérence des chemins (pas de trailing slash dans le code, Astro normalise)

---

## Corrections effectuées

| Correction | Fichier | Impact |
|------------|---------|--------|
| Filtre sitemap noindex | astro.config.mjs | Signal Google corrigé |

## Points d'amélioration (non bloquants)

| Point | Priorité | Impact |
|-------|----------|--------|
| BreadcrumbList sur articles de blog | Basse | SEO enrichi (rich snippets) |
| Titles courts sur certaines pages | Basse | Cosmétique SERP |
| og-default.png à 273 Ko | Basse | Optimiser pour < 200 Ko |

---

## Score final : 91/100 ✅

**Seuil de passage : ≥ 90/100 → PASSÉ**

Prochaine étape : **sa-05-composants**
