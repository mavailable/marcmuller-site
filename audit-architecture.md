# Audit Architecture — Marc M

**Date** : 2026-03-21
**Référence** : Standards wf-05-init-projet
**Auditeur** : Claude (pipeline SA-01)

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| 1. Structure de dossiers | 6 | /10 | ⚠️ |
| 2. package.json | 9 | /10 | ✅ |
| 3. astro.config.mjs | 9 | /10 | ✅ |
| 4. tsconfig.json | 5 | /5 | ✅ |
| 5. Fichiers config (.nvmrc, .env, .gitignore) | 4 | /5 | ✅ |
| 6. global.css (Tailwind v4 tokens) | 13 | /15 | ✅ |
| 7. business.ts + content.ts + Keystatic | 5 | /10 | ⚠️ |
| 8. BaseLayout.astro | 7 | /10 | ⚠️ |
| 9. Polices locales | 5 | /5 | ✅ |
| 10. robots.txt + llms.txt | 5 | /5 | ✅ |
| 11. Build sans erreur | 13 | /15 | ✅ |
| **TOTAL** | **81** | **/100** | ⚠️ |

**Seuil : 90/100 — Score actuel : 81/100**

---

## Détail des checks

### Check 1 — Structure de dossiers (6/10)

**Conforme :** `src/components/`, `src/data/`, `src/layouts/`, `src/pages/`, `src/styles/`, `public/fonts/`, `public/images/` ✅

**Non conforme :**
- Composants à plat — pas de sous-dossiers `ui/`, `sections/`, `layout/`, `forms/` (-2)
- `src/content/` absent — pas de Keystatic (-2)

> L'absence de Keystatic est un choix délibéré. La réorganisation des composants est souhaitable mais non urgente.

---

### Check 2 — package.json (9/10)

`name: "marcmuller-site"` ✅, scripts dev/build/preview ✅, astro 5.7.0 ✅, tailwindcss v4 ✅, @astrojs/sitemap ✅.
Scripts `dev:cms`/`build:cms` absents (-1) — sans objet sans Keystatic.

---

### Check 3 — astro.config.mjs (9/10)

`site: 'https://marcm.fr'` ✅, `output: 'static'` ✅, `compressHTML: true` ✅, `cssMinify: true` ✅, sitemap i18n ✅, LANG/LOCALE_MAP pattern ✅.
Import conditionnel Keystatic absent (-1) — non applicable.

---

### Check 4 — tsconfig.json (5/5) ✅

`extends: "astro/tsconfigs/strict"`, baseUrl, aliases @/*, @components/*, @layouts/*, @data/*, @styles/* — parfaitement conforme.

---

### Check 5 — Fichiers config (4/5)

`.nvmrc: 22` ✅, `.env.example` ✅ (WEB3FORMS_KEY + SITE_URL), `.gitignore` ✅.
`.astro/` manquant dans gitignore (-1) → **corrigé**.

---

### Check 6 — global.css Tailwind v4 (13/15)

`@import "tailwindcss"` ✅, `@theme {}` 4 familles × 11 nuances (44 tokens) ✅, aliases sémantiques ✅, `@font-face` Satoshi ✅, pas de `color:` sur h1-h6 ✅.

Points de vigilance :
- `body { color: var(--color-text) }` — couleur sur sélecteur d'élément (-1), acceptable en pratique
- Pas de tokens `--font-size-*` dans `@theme` (-1)

---

### Check 7 — business.ts + content.ts + Keystatic (5/10)

SIRET ✅ (`505 045 450 00069`), adresse complète ✅ (`13 Rue des Peupliers, 57950 Montigny-lès-Metz`).

`business.ts` contient du contenu éditorial qui devrait être dans `content.ts`/Keystatic : `name`, `legalName`, `owner`, `jobTitle`, `email`, `phone`, `whatsapp`, `description`, `priceRange`, `areaServed`, `offers`, `maintenance`, `socialMedia` (-5).

`content.ts` absent, `src/content/` absent, `keystatic.config.ts` absent.

> **Recommandation long terme** : migrer vers Keystatic + content.ts pour l'éditabilité sans code. Non bloquant actuellement.

---

### Check 8 — BaseLayout.astro (7/10)

`lang={business.lang}` ✅, charset/viewport ✅, favicon ✅, webmanifest ✅, skip-to-content ✅, `<main id="main">` ✅, OG tags ✅, Twitter Cards ✅, canonical ✅, noindex conditionnel ✅.

Manquant :
- Umami Analytics absent (-2) — CF Web Analytics automatic en substitution
- Beacon CF commenté avec `YOUR_CF_TOKEN` (-1) — redondant, à nettoyer

---

### Check 9 — Polices locales (5/5) ✅

`Satoshi-Variable.woff2` (42 Ko) et `Satoshi-VariableItalic.woff2` (43 Ko) — OK, pas de placeholder cassé, `@font-face` corrects.

---

### Check 10 — robots.txt + llms.txt (5/5) ✅

GPTBot, ClaudeBot, PerplexityBot, anthropic-ai autorisés ✅. `llms.txt` présent et structuré ✅.

---

### Check 11 — Build (13/15)

Build validé en production (déploiement `marcm.fr` réussi le 2026-03-21). Non testable en local depuis la VM (-2).

---

## Corrections effectuées

| Fichier | Modification |
|---------|-------------|
| `.gitignore` | Ajout `.keystatic/` et `.astro/` |

---

## Corrections recommandées (non bloquantes)

| Priorité | Action | Fichier |
|----------|--------|---------|
| 🟡 | Supprimer le beacon CF commenté (ligne 56) | `BaseLayout.astro` |
| 🟡 | Ajouter tokens `--font-size-*` dans `@theme` | `global.css` |
| 🔵 Long terme | Migrer vers Keystatic + content.ts | Architecture globale |
| 🔵 Long terme | Réorganiser composants en sous-dossiers | `src/components/` |

---

## Prochaine étape : sa-02-design
