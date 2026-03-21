# Audit Discovery — Marc M

**Date** : 2026-03-21
**URL** : https://marcm.fr
**Objectif** : Amélioration globale — audit complet pipeline sa-01 → sa-09
**Auditeur** : Claude (pipeline SA)

---

## Informations de base

| Donnée | Valeur |
|--------|--------|
| Langue | fr |
| Pays cible | FR |
| Type de client | freelance-consultant |
| Framework | Astro 5.7.0 |
| CSS | Tailwind v4 (@tailwindcss/vite) |
| Hébergement | Cloudflare Pages |
| TypeScript | tsconfig.json présent, types `.d.ts` générés par Astro |
| Output | Static (`output: 'static'`) |
| compressHTML | ✅ activé |
| CSS Minify | ✅ activé (`cssMinify: true`) |
| Sitemap | ✅ `@astrojs/sitemap` intégré |

---

## Structure du projet

### Pages (15 routes dans le sitemap)

| Route | Fichier | Observations |
|-------|---------|--------------|
| `/` | `index.astro` | Page principale ✅ |
| `/offre` | `offre.astro` | OG image = og-default.png (pas de OG spécifique) |
| `/realisations` | `realisations.astro` | OG image = og-realisations.png ✅ |
| `/qui-suis-je` | `qui-suis-je.astro` | OG image = og-default.png (pas de OG spécifique) |
| `/contact` | `contact.astro` | Web3Forms token = dccda1f5 ✅ |
| `/merci` | `merci.astro` | ✅ redirect post-form. Indexé dans sitemap ⚠️ |
| `/100-sites-artisans` | `100-sites-artisans.astro` | OG image = og-100-vitrines.png ✅ |
| `/graphistes` | `graphistes.astro` | OG image = og-graphistes.png ✅. Dans sitemap ⚠️ intentionnel ? |
| `/journal` | `journal/index.astro` | — |
| `/journal/combien-coute-un-site-web` | `journal/combien-coute-un-site-web.astro` | — |
| `/mentions-legales` | `mentions-legales.astro` | SIRET dans code mais **non déployé** ⚠️ |
| `/politique-confidentialite` | `politique-confidentialite.astro` | ✅ |
| `/creation-site-web-strasbourg` | `creation-site-web-strasbourg/index.astro` | Pages SEO local |
| `/creation-site-web-metz` | `creation-site-web-metz/index.astro` | Pages SEO local |
| `/creation-site-web-nancy` | `creation-site-web-nancy/index.astro` | Pages SEO local |
| `/404` | `404.astro` | ✅ présente (hors sitemap) |

### Composants

| Composant | Fichier | Rôle |
|-----------|---------|------|
| Header | `src/components/Header.astro` | Navigation, logo, CTA Contact |
| Footer | `src/components/Footer.astro` | Liens, réseaux, legal |
| Button | `src/components/Button.astro` | CTA réutilisable |
| CTASection | `src/components/CTASection.astro` | Section appel à l'action |
| Card | `src/components/Card.astro` | Carte générique |
| MobileCallButton | `src/components/MobileCallButton.astro` | Bouton tel mobile |
| SchemaOrg | `src/components/SchemaOrg.astro` | Injection JSON-LD |
| SectionTitle | `src/components/SectionTitle.astro` | Titre de section |
| VilleTemplate | `src/components/VilleTemplate.astro` | Template pages SEO local |

### Data

| Fichier | Contenu |
|---------|---------|
| `src/data/business.ts` | Source unique de vérité (nom, contact, SIRET, offres, localisation) |
| `src/data/schemas.ts` | Définitions Schema.org |
| `src/data/site-config.json` | Config site (titre, description) |

### Assets

| Type | Fichiers | Taille | État |
|------|----------|--------|------|
| Police | Satoshi-Variable.woff2 | 42 Ko | ✅ locale, non-placeholder |
| Police Italic | Satoshi-VariableItalic.woff2 | 43 Ko | ✅ locale |
| Favicon | favicon.svg | 255 B | ✅ SVG |
| OG Default | og-default.png | 40 Ko | ✅ |
| OG Default (opt) | og-default-opt.png | 18 Ko | ✅ version optimisée |
| OG Réalisations | og-realisations.png | 44 Ko | ✅ |
| OG 100 Vitrines | og-100-vitrines.png | 57 Ko | ✅ |
| OG Graphistes | og-graphistes.png | 52 Ko | ✅ |
| Photo Marc | marc-muller.webp | 26 Ko | ✅ |
| Projets (webp) | 9 images | 28–133 Ko | ⚠️ la-grange-aux-fees.webp = 133 Ko (lourd) |
| Webmanifest | site.webmanifest | — | ⚠️ icons: SVG seulement, pas de PNG 192/512 |

---

## État actuel par domaine

### SEO

| Élément | État | Détail |
|---------|------|--------|
| Meta title | ✅ | "Marc M — Sites web sur mesure pour artisans et petits commerces" |
| Meta description | ✅ | 147 caractères, bien rédigée |
| H1 unique | ✅ | 1 seul H1 sur la homepage |
| H2 structure | ✅ | 7 H2 logiques sur la homepage |
| Schema JSON-LD | ✅ | WebSite + Person (homepage). Autres pages à vérifier par sa-04 |
| OG title | ✅ | Défini par page via BaseLayout |
| OG description | ✅ | Défini par page |
| OG image | ⚠️ | /offre et /qui-suis-je → og-default.png générique |
| OG locale | ✅ | fr_FR |
| Canonical | ✅ | Défini dynamiquement via Astro.url |
| sitemap.xml | ✅ | 15 URLs dans sitemap-0.xml |
| `/merci` dans sitemap | ⚠️ | Page utilitaire indexée, devrait être noindex |
| `/graphistes` dans sitemap | ⚠️ | Vérifier intentionnalité |
| robots.txt | ✅ | Bots IA autorisés (GPTBot, ClaudeBot, PerplexityBot, anthropic-ai) |
| Cloudflare AI Crawl | ✅ | Toggle "Cloudflare managed" = OFF (corrigé 2026-03-21) |
| llms.txt | ✅ | Présent et bien structuré |

### Design & Accessibilité

| Élément | État | Détail |
|---------|------|--------|
| Viewport meta | ✅ | `width=device-width, initial-scale=1` |
| Responsive | ✅ | Tailwind v4, mobile-first |
| Skip-to-content | ✅ | `<a href="#main" class="skip-link">` dans BaseLayout |
| Focus visible | ✅ | `.skip-link:focus` défini dans global.css |
| Alt-text images | ✅ | 0 image sans alt sur homepage |
| Liens `_blank` noopener | ⚠️ | Header.astro : `rel="noopener"` sans `noreferrer` sur 2 liens |
| Contraste WCAG AA | ⚠️ | À vérifier par sa-02 |
| Touch targets 44px | ⚠️ | À vérifier par sa-05 |
| Erreurs JS console | ✅ | Aucune erreur détectée |

### Legal & RGPD

| Élément | État | Détail |
|---------|------|--------|
| Mentions légales | ✅ | Page `/mentions-legales` présente |
| SIRET | ⚠️ | `505 045 450 00069` dans code, **build+deploy requis** pour mise en prod |
| Adresse postale | ⚠️ | `business.street: ''` — rue manquante dans business.ts |
| Politique confidentialité | ✅ | Page présente |
| RGPD mention formulaire | ✅ | Checkbox RGPD dans le formulaire de contact |
| Bannière cookies | ✅ | Pas de cookies invasifs → pas requise |
| Conformité formulaire | ✅ | Web3Forms + honeypot + RGPD checkbox |

### Formulaire

| Élément | État | Détail |
|---------|------|--------|
| Formulaire contact | ✅ | `/contact` opérationnel |
| Service | Web3Forms | Token `dccda1f5-4e63-4b9f-9c66-f5ce76f0dfdd` |
| Anti-spam | ✅ | Honeypot intégré |
| Page /merci | ✅ | Redirect après soumission, page "Message reçu !" |
| Test formulaire | ✅ | Testé le 2026-03-21, redirect /merci confirmé |

### Analytics & Performance

| Élément | État | Détail |
|---------|------|--------|
| Cloudflare HTTP Traffic | ✅ | Actif automatiquement via proxy CF |
| Cloudflare Web Analytics (RUM) | ⚠️ | Beacon commenté dans BaseLayout.astro, token = "YOUR_CF_TOKEN" |
| Activation RUM | ⚠️ | Clic manuel requis dans CF Dashboard → marcm.fr → Analytics → Web analytics |
| Polices locales | ✅ | Satoshi en woff2 local, zéro Google Fonts |
| HTTPS | ✅ | Cloudflare SSL automatique |

---

## Problèmes détectés

### Critiques (bloquants)

_Aucun problème critique bloquant au moment de l'audit._

### Majeurs

1. **SIRET non déployé** — Corrections dans `business.ts` et `mentions-legales.astro` non encore buildées. Action : `npm run build && wrangler pages deploy ./dist --project-name=marcmuller-site --branch=master`
2. **Cloudflare Web Analytics (RUM) inactif** — Beacon commenté avec token placeholder `"YOUR_CF_TOKEN"`. Activer dans CF Dashboard et injecter le vrai token dans BaseLayout.astro
3. **Adresse postale incomplète** — `business.street: ''` → Schema.org `streetAddress` vide, mentions légales sans adresse de rue
4. **Page `/merci` indexée dans sitemap** — Devrait avoir `noindex` et être exclue du sitemap (page utilitaire)
5. **OG images génériques** — `/offre` et `/qui-suis-je` utilisent `og-default.png` au lieu d'images sociales dédiées

### Mineurs

1. **Header.astro** — `rel="noopener"` sans `noreferrer` sur 2 liens `target="_blank"` (fuite de référent)
2. **Webmanifest** — Icônes uniquement en SVG, aucun PNG 192×192 ou 512×512 → install PWA dégradée sur Android
3. **Image lourde** — `la-grange-aux-fees.webp` = 133 Ko (autres projets : 28–70 Ko)
4. **Pas de `twitter:site`** — `<meta name="twitter:site">` absent dans BaseLayout
5. **Page `/graphistes`** — Présente dans sitemap, vérifier si c'est intentionnel

---

## Prochaines étapes recommandées

| Étape | Skill | Priorité | Points estimés |
|-------|-------|----------|----------------|
| Architecture & config | sa-01 | 🟡 Moyenne | ~3 corrections |
| Design system & WCAG | sa-02 | 🟡 Moyenne | Contraste à vérifier |
| Contenu & rédactionnel | sa-03 | 🟡 Moyenne | Cohérence des textes |
| SEO & GEO | sa-04 | 🔴 Haute | OG spécifiques, noindex /merci, Schema adresse |
| Composants & accessibilité | sa-05 | 🟡 Moyenne | noopener, touch targets |
| Legal & RGPD | sa-06 | 🔴 Haute | SIRET deploy, rue business.ts |
| Performance & Lighthouse | sa-07 | 🔴 Haute | RUM activation, image lourde, webmanifest |

**Score initial estimé : ~78/100**
**Score cible : ≥ 90/100**
**Δ estimé après corrections : +12 à +15 points**
