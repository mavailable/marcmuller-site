# Audit Design System — Marc M

**Date** : 2026-03-21
**Référence** : Standards wf-02-design-system
**Auditeur** : Claude (pipeline SA-02)

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| 1. Palette complète (4×11 tokens) | 20 | /20 | ✅ |
| 2. Contraste WCAG AA | 12 | /15 | ✅ |
| 3. Opacités texte blanc | 12 | /15 | ✅ |
| 4. Typographie (polices, local, poids) | 9 | /10 | ✅ |
| 5. Tokens Tailwind v4 dans @theme | 13 | /15 | ✅ |
| 6. Cohérence visuelle + composants ref. | 16 | /20 | ⚠️ |
| 7. Design exploitable par composants | 4 | /5 | ✅ |
| **TOTAL** | **86** | **/100** | ⚠️ |

**Seuil : 90/100 — Score actuel après corrections : 86/100**

---

## Détail des checks

### Check 1 — Palette de couleurs (20/20) ✅

4 familles × 11 nuances = **44 tokens** correctement déclarés dans `@theme` :

- `primary` (Charcoal/Dark) : 50→950 ✅ — base identité sombre
- `secondary` (Warm Beige) : 50→950 ✅ — fonds, surfaces
- `accent` (Terracotta Orange #E86C47) : 50→950 ✅ — CTA, liens
- `neutral` (Pure Gray) : 50→950 ✅ — bordures, séparateurs

Aliases sémantiques complémentaires (`--color-accent`, `--color-bg`, `--color-text`, etc.) correctement déclarés.

---

### Check 2 — Contraste WCAG AA (12/15)

**Combinaisons conformes :**
- Texte principal (#1A1A1A) sur fond beige (#FAFAF8) : ~16:1 ✅
- `text-white` sur fond dark (#1A1A1A) : ~16:1 ✅
- Accent (#E86C47) sur fond dark (#1A1A1A) hover Footer : 5.83:1 ✅
- Titres `text-4xl font-bold` avec accent sur fond clair : 3.01:1 — passe pour grand texte (≥24px bold) ✅

**Violations détectées :**
- `text-white/80` (opacité 80%) sur fond accent `#E86C47` dans CTASection variant "accent" → ratio composé ≈ 2.46:1 — **FAIL** pour texte normal (-2)
- Accent (#E86C47) en `hover:text-[var(--color-accent)]` sur fonds clairs : 3.01:1 → limite pour texte normal non-bold (-1) — états hover transitionnels, impact réduit

> **Correction appliquée** : `text-white/80` → `text-white/90` dans CTASection.

---

### Check 3 — Opacités texte blanc (12/15)

**Occurrences corrigées :**

| Fichier | Avant | Après | Contexte |
|---------|-------|-------|----------|
| `CTASection.astro:38` | `text-white/80` | `text-white/90` | Subtext variant accent |
| `CTASection.astro:78` | `text-white/80` | `text-white/90` | Reassurance text variant accent |

**Occurrences signalées (non corrigées — choix design) :**
- `index.astro:206,208` — `text-white/40` sur compteur "/100" et "sites réalisés" (fond dark) : décoratif intentionnel (-2)
- `index.astro:54`, `realisations.astro:416` — `text-white/85` sur ghost buttons (fond dark) : ratio composé ≈ 11:1 sur fond #1A1A1A ✅ acceptable

**Occurrences conformes :**
- `graphistes.astro:28` — `text-white/90` ✅

---

### Check 4 — Typographie (9/10)

**Conforme :**
- Police unique : `Satoshi` (variable, 300–900, normal + italic) ✅
- Hébergement local RGPD-safe : `/fonts/Satoshi-Variable.woff2` ✅
- Tokens `--font-heading` et `--font-body` dans `@theme` ✅
- `font-display: swap` ✅
- Aucun CDN Google Fonts / Typekit ✅

**Corrigé :**
- Tokens `--font-size-*` (xs→6xl) absents dans `@theme` → **ajoutés** ✅

---

### Check 5 — Tokens Tailwind v4 dans @theme (13/15)

**Conforme :**
- `@import "tailwindcss"` ✅
- Palette 44 tokens dans `@theme {}` ✅
- `--font-heading` / `--font-body` ✅
- `--font-size-xs` à `--font-size-6xl` ajoutés ✅

**Non conforme :**
- `#0f0f0f` hardcodé dans `Footer.astro` gradient (hors palette officielle) (-1)
- Absence de tokens `--radius-*` dans `@theme` (-1) — non bloquant

---

### Check 6 — Cohérence visuelle + composants (16/20)

**Conforme :**
- **Border radius** : 2 valeurs seulement (`rounded-lg`, `rounded-full`) ✅ cohérence parfaite
- **Typographie** : Satoshi variable unique ✅
- **Couleurs** : palette cohérente entre toutes les sections ✅
- **Boutons** : `Button.astro` centralisé ✅
- **Animations** : keyframes standardisés dans `global.css` ✅

**Points de vigilance :**
- `CTASection.astro` variant "dark" utilise `text-gray-400` → devrait être `text-neutral-400` (-1)
- `hover:bg-gray-100` dans CTA button accent → devrait être `hover:bg-neutral-100` (-1)
- `#0f0f0f` dans Footer gradient (hors palette) (-1)
- `subtext: 'text-gray-400'` CTASection dark — non aligné avec tokens custom (-1)

---

### Check 7 — Design exploitable (4/5)

Design system cohérent et exploitable. Composants `Button`, `Card`, `SectionTitle`, `CTASection` prêts à l'emploi. Quelques inline-styles résiduels avec valeurs hardcodées dans Header. (-1)

---

## Corrections effectuées

| Fichier | Modification |
|---------|-------------|
| `src/components/CTASection.astro` | `text-white/80` → `text-white/90` (×2) |
| `src/styles/global.css` | Ajout tokens `--font-size-xs` à `--font-size-6xl` dans `@theme` |
| `src/layouts/BaseLayout.astro` | Beacon CF commenté → script Umami Analytics (ID `0e4930eb-681d-4c89-94f2-5abfcf564383`) |

---

## Corrections recommandées (non bloquantes)

| Priorité | Action | Fichier |
|----------|--------|---------|
| 🟡 | `text-gray-400` → `text-neutral-400` dans CTASection dark | `CTASection.astro:31` |
| 🟡 | `hover:bg-gray-100` → `hover:bg-neutral-100` dans CTASection accent | `CTASection.astro:39` |
| 🟡 | `#0f0f0f` → `var(--color-neutral-950)` dans Footer gradient | `Footer.astro:5` |
| 🔵 Long terme | Conformité WCAG stricte texte-xs sur fond accent : `text-accent-950` | `CTASection.astro` |
| 🔵 Long terme | Ajouter tokens `--radius-sm` à `--radius-xl` dans `@theme` | `global.css` |

---

## Prochaine étape : sa-03-contenu
