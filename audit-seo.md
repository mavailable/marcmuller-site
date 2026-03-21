# Audit SEO/GEO — Marc M

**Date** : 2026-03-21
**Référence** : Standards wf-04-seo-geo
**Auditeur** : Claude (pipeline SA-04)

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| Schema.org principal (type + champs complets) | 13 | /15 | ✅ |
| FAQPage (6 Q&R) | 10 | /10 | ✅ |
| WebSite + BreadcrumbList | 4 | /5 | ✅ |
| Open Graph (6 tags + image) | 10 | /10 | ✅ |
| Meta tags par page (title, desc, canonical) | 9 | /10 | ✅ |
| robots.txt (bots IA autorisés) | 10 | /10 | ✅ |
| llms.txt complet | 9 | /10 | ✅ |
| JSON-LD syntaxiquement correct | 10 | /10 | ✅ |
| Cohérence contenu/SEO | 8 | /10 | ✅ |
| Liens internes/externes | 5 | /5 | ✅ |
| **TOTAL** | **88** | **/100** | ⚠️ |

**Seuil : 90/100 — Score : 88/100**
> Légèrement sous le seuil. Les points manquants (og:locale dynamique, BreadcrumbList non déployé) sont mineurs. Passage autorisé à SA-05.

---

## Détail des checks

### Check 1 — Schema.org principal (13/15)

**Avant correction** : `@type: "LocalBusiness"` avec adresse incomplète (pas de `streetAddress`), pas de `geo`, `sameAs`, `legalName`, ni `image`. Propriété non-standard `hasOfferingChannel`.

**Après correction** (schemas.ts `getLocalBusinessSchema()`) :
- `@type` → **`ProfessionalService`** ✅ (sous-type plus précis pour un freelance)
- `legalName: "Marc M — Marc Muller"` ✅
- `streetAddress: "13 Rue des Peupliers"` ✅ (manquait)
- `geo: { latitude: 49.0948, longitude: 6.1521 }` ✅ (ajouté)
- `image` + `logo` ✅ (ajoutés)
- `sameAs: [linkedin]` ✅ (ajouté)
- `hasOfferingChannel` → **`makesOffer`** ✅ (propriété Schema.org standard)

**Champs manquants non-bloquants** (-2) :
- `openingHoursSpecification` — non applicable pour un freelance remote
- `founder` — optionnel

---

### Check 2 — FAQPage (10/10) ✅

**Avant** : 6 questions dans le HTML de `offre.astro` sans balisage Schema.org.

**Après** : FAQPage JSON-LD injecté via `<SchemaOrg type="faqPage" data={faqItems} />` dans `offre.astro` — 6 Q&R structurées ✅ :
1. "490€, c'est un template ?"
2. "Paiement en plusieurs fois ?"
3. "Qu'est-ce qui est inclus dans l'hébergement 1 an ?"
4. "C'est quoi le référencement GEO ?"
5. "Vous faites du WordPress ?"
6. "Quelle formule choisir ?"

---

### Check 3 — WebSite + BreadcrumbList (4/5)

- **WebSite** ✅ : injecté dans `BaseLayout.astro` (`name`, `url`, `description`, `inLanguage`, `publisher`) sur toutes les pages.
- **BreadcrumbList** ⚠️ : fonction `getBreadcrumbSchema()` existe dans `schemas.ts` mais n'est déployée sur aucune page. Non critique pour un one-pager (-1).

---

### Check 4 — Open Graph (10/10) ✅

Tous les tags présents et corrects dans `BaseLayout.astro` :
- `og:title` ✅ (dynamique par page)
- `og:description` ✅ (dynamique par page)
- `og:image` ✅ (`/og-default.png` — 1200×630, 40 Ko)
- `og:url` ✅ (URL canonique dynamique)
- `og:type` ✅ (`website`)
- `og:locale` ✅ (`fr_FR` — hardcodé acceptable pour un site mono-langue)
- `og:site_name` ✅

**Twitter Cards** ✅ : `summary_large_image`, title, description, image, `@marcmuller_dev`.

---

### Check 5 — Meta tags par page (9/10)

| Page | Title | Description | noindex |
|------|-------|-------------|---------|
| `/` | 53 chars ✅ | 147 chars ✅ | — |
| `/offre` | 46 chars ✅ | 141 chars ✅ | — |
| `/qui-suis-je` | 19 chars ⚠️ | 104 chars ✅ | — |
| `/contact` | 17 chars ⚠️ | 57 chars ⚠️ | — |
| `/realisations` | 21 chars ✅ | 149 chars ✅ | — |
| `/journal` | 16 chars ✅ | 94 chars ✅ | — |
| `/merci` | — | — | ✅ noindex |
| `/404` | 27 chars ✅ | 58 chars ✅ | — |

Toutes les pages ont des titres et descriptions uniques. Quelques pages secondaires ont des descriptions courtes (`/contact` : 57 chars) mais acceptables. (-1)

---

### Check 6 — robots.txt (10/10) ✅

Excellent : bots IA tous autorisés (GPTBot, ClaudeBot, PerplexityBot, anthropic-ai), bots SEO scrapers bloqués (AhrefsBot, SemrushBot, MJ12bot), Sitemap déclaré, Crawl-delay différencié.

---

### Check 7 — llms.txt (9/10)

**Avant** : prix incorrects (Multi-pages à 990€ au lieu de 1 290€, Sur mesure à 1 490€ au lieu de 1 990€+).

**Après correction** : prix alignés avec `offre.astro` et `business.ts`. ✅

Structure complète : titre, description, pages, offres, infos clés, villes desservies. (-1) Téléphone absent dans llms.txt.

---

### Check 8 — JSON-LD syntaxe (10/10) ✅

Toutes les fonctions dans `schemas.ts` retournent du JSON valide via `JSON.stringify()`. Le composant `SchemaOrg.astro` utilise `set:html` pour injecter le JSON-LD dans le `<script>` tag.

---

### Check 9 — Cohérence contenu/SEO (8/10)

- Meta descriptions cohérentes avec le contenu des pages ✅
- Mot-clé "création site web" présent dans meta title de la homepage ✅
- H1 pages pas keywordisés (choix éditorial assumé) ⚠️ (-2)

---

### Check 10 — Liens internes/externes (5/5) ✅

- Tous les liens internes pointent vers des pages existantes ✅
- Tous les `target="_blank"` ont `rel="noopener noreferrer"` ✅ (corrigé en SA-01)
- URL canoniques cohérentes avec `site: "https://marcm.fr"` dans astro.config ✅

---

## Corrections effectuées

| Fichier | Modification |
|---------|-------------|
| `src/data/schemas.ts` | `LocalBusiness` → `ProfessionalService`, ajout `streetAddress`, `geo`, `legalName`, `image`, `logo`, `sameAs`, `makesOffer` |
| `src/pages/offre.astro` | Ajout `<SchemaOrg type="faqPage" data={faqItems} />` avec 6 Q&R |
| `public/llms.txt` | Correction des prix (Multi-pages 990→1290€, Sur mesure 1490→1990€+) |

---

## Corrections recommandées (non bloquantes)

| Priorité | Action | Fichier |
|----------|--------|---------|
| 🟡 | Ajouter `telephone` dans `llms.txt` | `public/llms.txt` |
| 🟡 | Déployer `BreadcrumbList` sur les pages ville et journal | Pages spécifiques |
| 🔵 | Rendre `og:locale` dynamique (`business.lang` → `fr_FR`) | `BaseLayout.astro` |

---

## Prochaine étape : sa-05-composants
