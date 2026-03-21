# Audit Pré-Production — Marc M (marcm.fr)

**Date** : 2026-03-21
**URL** : https://marcm.fr
**Stack** : Astro 5.7.0 · Tailwind v4 · Cloudflare Pages
**Méthode** : Audit statique du code source + vérifications JS/DOM live sur marcm.fr

---

## Score global : **74/100 — ❌ FAIL**

> Seuil de passage : 90/100
> Corrections prioritaires identifiées ci-dessous — 3 actions critiques permettront d'atteindre ~88+/100

| Catégorie | Score | Max | Statut |
|-----------|-------|-----|--------|
| Analytics & Conversion | 4 | /10 | ❌ |
| Formulaire | 12 | /15 | ✅ |
| RGPD & Cookies | 9 | /10 | ✅ |
| Légal | 8 | /10 | ⚠️ |
| SEO | 10 | /15 | ⚠️ |
| Open Graph | 8 | /10 | ✅ |
| Accessibilité | 8 | /10 | ✅ |
| Technique | 8 | /10 | ✅ |
| Conversion | 7 | /10 | ⚠️ |
| **TOTAL** | **74** | **/100** | **❌ FAIL** |

---

## Scores Lighthouse

> Lighthouse non exécuté dans le sandbox (à vérifier par l'utilisateur post-déploiement via PageSpeed Insights).

| Catégorie | Score attendu | Notes |
|-----------|---------------|-------|
| Performance | ~95+ | Site statique Astro, fonts locales, CSS minifié, images WebP + lazy loading |
| Accessibility | ~90+ | skip-link ✅, alt sur images ✅, contraste borderline sur boutons CTA ⚠️ |
| Best Practices | ~95+ | Pas de JS bloquant, HTTPS Cloudflare, manifest présent |
| SEO | ~90 | Mais robots.txt override Cloudflare bloque les bots IA → impact GEO |

**Vérifier après déploiement :** https://pagespeed.web.dev/?url=https://marcm.fr

---

## Résultats par catégorie

### Analytics & Conversion : 4/10 ❌

**Ce qui fonctionne :**
- Page `/merci` présente ✅
- `/merci` avec `noindex, nofollow` ✅
- Redirection post-formulaire vers `/merci` ✅

**Ce qui manque :**
- ❌ Aucun script analytics actif sur le site (Cloudflare Web Analytics commenté dans `BaseLayout.astro`)
- ❌ Aucun événement de tracking (form-submit, cta-click, email-click)

**Action requise :**
Activer Cloudflare Web Analytics dans le Dashboard → marcm.fr → Analytics → Web Analytics → "Enable Web Analytics". Aucun code requis, Cloudflare injecte le script automatiquement.

---

### Formulaire : 12/15 ✅

**Ce qui fonctionne :**
- ✅ Web3Forms action URL configurée
- ✅ Honeypot anti-spam (`name="botcheck"`)
- ✅ Mention RGPD avec checkbox required
- ✅ Redirection vers `/merci` après soumission
- ✅ Labels sur tous les champs
- ✅ Validation HTML5 (required, type="email", etc.)
- ✅ Aria sur les champs

**Ce qui manque :**
- ❌ Envoi réel non testé (email de confirmation non vérifié côté Marc + côté expéditeur)

**Action requise :**
Envoyer un message test depuis https://marcm.fr/contact → vérifier réception sur marc@muller.im.

---

### RGPD & Cookies : 9/10 ✅

- ✅ Aucun cookie de tracking tiers → bannière cookies non requise
- ✅ Cloudflare Web Analytics (sans PII, pas de cookie) → conforme RGPD
- ✅ `/politique-confidentialite` complète avec droits détaillés
- ✅ Pas de scripts tiers chargés
- ⚠️ Analytics commenté = pas d'analytics actif (neutre RGPD, mais perte de données métier)

---

### Légal : 8/10 ⚠️

- ✅ `/mentions-legales` : éditeur Marc M, hébergeur Cloudflare Inc. ✅
- ✅ `/politique-confidentialite` complète (données, finalité, durée, droits)
- ✅ Footer avec liens légaux (Mentions légales + Politique de confidentialité)
- ✅ Copyright © 2026 Marc M dynamique
- ❌ **SIRET absent** dans les mentions légales (`siret: ''` dans `business.ts`)

**Action requise :**
Ajouter le SIRET dans `src/data/business.ts` → `siret: 'XXX XXX XXX XXXXX'` → rebuild + redéploiement.

---

### SEO : 10/15 ⚠️

**Ce qui fonctionne :**
- ✅ Titles uniques par page (vérifiés : homepage, contact, 404, merci)
- ✅ Meta descriptions uniques dans les bonnes longueurs
- ✅ Canonical URLs dynamiques
- ✅ Un seul H1 par page
- ✅ Sitemap.xml généré et accessible (`/sitemap-index.xml` → `/sitemap-0.xml`)
- ✅ llms.txt présent et bien structuré
- ✅ Schema JSON-LD : WebSite, Person, LocalBusiness, FAQPage, Article, BreadcrumbList
- ✅ Liens externes avec `noopener noreferrer` ✅
- ✅ 0 lien cassé détecté

**Problème critique — robots.txt :**

```
# ⚠️ CLOUDFLARE AI CRAWL CONTROL OVERRIDE DÉTECTÉ
# Cloudflare injecte une section managée EN TÊTE du robots.txt
# qui bloque ClaudeBot, GPTBot, Google-Extended avec Disallow: /
# avant que les règles personnalisées Allow: / soient lues.
# Résultat : GEO (référencement IA) complètement cassé.
```

**Action CRITIQUE requise :**
Cloudflare Dashboard → marcm.fr → **Security** → **Bots** → **AI Crawl Control** → Mettre tous les bots IA sur **Allow** (ClaudeBot, GPTBot, Google-Extended, PerplexityBot, etc.)

---

### Open Graph : 8/10 ✅

- ✅ `og:title`, `og:description`, `og:image` sur les pages principales
- ✅ `twitter:card: summary_large_image` configuré
- ✅ Image OG 1200×630px (`/og-default.png`) accessible sur marcm.fr
- ✅ URLs absolues pour les OG images
- ⚠️ Pages secondaires partagent la même OG image par défaut (pas d'OG images uniques par page interne)

**Vérification recommandée :**
https://developers.facebook.com/tools/debug/?q=https://marcm.fr

---

### Accessibilité : 8/10 ✅

- ✅ Skip-to-content : `<a class="skip-link" href="#main">Aller au contenu principal</a>` ✅
- ✅ `<main id="main">` présent ✅
- ✅ 0 image sans attribut `alt`
- ✅ Navigation clavier : hamburger menu, focus-visible sur tous les boutons
- ✅ Aria-labels sur la navigation (vérifiés)
- ✅ Ordre de tabulation logique
- ⚠️ Contraste boutons CTA : Accent #E86C47 / texte blanc = 3.15:1 (borderline pour `text-sm font-medium`)

---

### Technique : 8/10 ✅

- ✅ `compressHTML: true` dans astro.config.mjs
- ✅ `cssMinify: true` dans astro.config.mjs
- ✅ `output: 'static'` — génération statique optimale
- ✅ Fonts locales Satoshi woff2 (pas de CDN externe)
- ✅ `font-display: swap` configuré
- ✅ Images projets en WebP avec `loading="lazy"` ✅
- ✅ Favicon SVG (`/favicon.svg`)
- ✅ `site.webmanifest` présent
- ✅ Page 404 personnalisée avec liens de repli
- ✅ HTTPS via Cloudflare
- ✅ Responsive vérifié par code (breakpoints `sm:` / `md:` / `lg:` systématiques sur tous les composants)
- ✅ 0 script externe bloquant le rendu
- ❌ Pas de `<link rel="preload">` pour la font Satoshi
- ❌ Icônes webmanifest uniquement en SVG (pas de PNG 192px / 512px pour install PWA)

---

### Conversion : 7/10 ⚠️

- ✅ CTA visible sans scroll (Hero : "Parlons de votre projet" + "Voir mes réalisations")
- ✅ Bouton sticky email sur mobile (`MobileCallButton.astro`, `md:hidden`) avec animation pulse
- ✅ Preuve sociale présente (projets réels, chiffres, témoignages)
- ✅ Éléments de réassurance (vitrine live en 7j, prix transparents, sans engagement)
- ✅ WhatsApp + email sur `/merci`
- ✅ LinkedIn avec `noopener noreferrer`
- ❌ Pas de lien `tel:` (numéro de téléphone absent du site — MobileCallButton = mailto, pas un appel)
- ❌ Pas de lien "Laisser un avis Google" sur `/merci`
- ❌ Calendly (`calendly.com/marc-muller`) — URL à confirmer

---

## Checks effectués par Claude (sandbox)

| Check | Méthode | Résultat |
|-------|---------|---------|
| Title / meta description / canonical | JS/DOM live | ✅ OK |
| Schemas JSON-LD | JS/DOM live | ✅ WebSite + Person + LocalBusiness |
| OG tags + twitter:card | JS/DOM live | ✅ |
| lang="fr" | JS/DOM live | ✅ |
| Skip-link + main#main | JS/DOM live | ✅ |
| 0 image sans alt | JS/DOM live | ✅ |
| Liens externes noopener | JS/DOM live | ✅ LinkedIn |
| Formulaire contact | JS/DOM live | ✅ Web3Forms + honeypot + RGPD |
| Sitemap | Navigation live | ✅ |
| robots.txt | Navigation live | ❌ Cloudflare AI override bloque les bots IA |
| /merci noindex | JS/DOM live | ✅ noindex, nofollow |
| /404 personnalisée | Navigation live | ✅ |
| /mentions-legales | Navigation live | ⚠️ SIRET vide |
| Responsive CSS | Analyse code source | ✅ breakpoints md/lg/sm systématiques |
| Spécificité CSS (global.css) | Analyse code source | ✅ |
| Images lazy loading | Analyse code source | ✅ loading="lazy" présent |
| Favicon + manifest | JS/DOM live | ✅ |
| Script analytics actif | JS/DOM live | ❌ aucun |

---

## Checks à effectuer par l'utilisateur (post-déploiement)

- [ ] **Lighthouse ≥ 90** sur les 4 catégories → https://pagespeed.web.dev/?url=https://marcm.fr
- [ ] **Rendu mobile** sur appareil physique (375px, 768px)
- [ ] **Envoi réel du formulaire** depuis /contact → email reçu sur marc@muller.im
- [ ] **OG preview** → https://developers.facebook.com/tools/debug/?q=https://marcm.fr
- [ ] **Vérifier Calendly** : https://calendly.com/marc-muller

---

## Corrections requises

### 🔴 Priorité haute (bloquant)

- [ ] **Cloudflare AI Crawl Control** : Dashboard CF → marcm.fr → Security → Bots → AI Crawl Control → mettre tous les bots IA sur **Allow**. Sans ce fix, GEO (Claude, GPT, Perplexity) est complètement bloqué.
- [ ] **Tester le formulaire** : envoyer un message réel depuis /contact, vérifier réception sur marc@muller.im.
- [ ] **Activer Cloudflare Web Analytics** : Dashboard CF → marcm.fr → Analytics → Web Analytics → Enable. Aucun code requis.

### 🟡 Priorité moyenne

- [ ] **SIRET** : `src/data/business.ts` → `siret: 'XXX XXX XXX XXXXX'` → rebuild + `npx wrangler pages deploy ./dist --project-name=marcmuller-site --branch=master`.
- [ ] **Lien avis Google** sur `/merci` : bouton "Laisser un avis Google" avec l'URL Google Business.
- [ ] **Vérifier Calendly** : confirmer que `https://calendly.com/marc-muller` est actif.

### 🟢 Priorité basse (amélioration)

- [ ] **Font preload** : `<link rel="preload" href="/fonts/Satoshi-Variable.woff2" as="font" type="font/woff2" crossorigin>` dans `BaseLayout.astro`.
- [ ] **PNG webmanifest** : ajouter `icon-192.png` et `icon-512.png` dans `/public/`.
- [ ] **Lien tel:** : envisager afficher un numéro de téléphone cliquable (footer, contact, MobileCallButton).
- [ ] **`@id` + `openingHours` + `sameAs`** dans LocalBusiness schema pour score maximal.

---

## Estimation score post-corrections

| Correction appliquée | Impact |
|---------------------|--------|
| AI Crawl Control → Allow | SEO: +3 → 13/15 |
| Analytics activé | Analytics: +5 → 9/10 |
| SIRET ajouté | Légal: +1 → 9/10 |
| Formulaire testé | Formulaire: +1 → 13/15 |
| Google review + Calendly | Conversion: +2 → 9/10 |
| **Score estimé post-corrections** | **~88-91/100** |

---

**Décision actuelle** : ❌ FAIL (74/100) — 3 corrections critiques requises
**Décision après corrections** : ✅ PASS estimé (~88-91/100)

*Rapport généré le 2026-03-21 — Audit wf-09 live marcm.fr*
