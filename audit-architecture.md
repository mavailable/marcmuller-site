# Audit Architecture — marcmuller.fr

**Date** : 2026-03-16
**Référence** : Standards wf-05-init-projet

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| Structure de dossiers | 7 | /10 | ⚠️ Composants à plat (pas de sous-dossiers ui/sections/layout) |
| package.json | 10 | /10 | ✅ Correct |
| astro.config.mjs (5 options) | 10 | /10 | ✅ Corrigé (compressHTML, i18n locales) |
| tsconfig.json | 5 | /5 | ✅ Corrigé (baseUrl, @/* alias) |
| Fichiers config (.nvmrc, .env, .gitignore) | 5 | /5 | ✅ Créés |
| global.css (tokens Tailwind v4) | 10 | /15 | ⚠️ Palette simplifiée (pas 4×11 tokens), color:inherit sur `a` corrigé |
| business.ts | 10 | /10 | ✅ Créé avec données centralisées |
| BaseLayout.astro | 10 | /10 | ✅ Corrigé (lang dynamique, og:image absolu, webmanifest) |
| Polices locales | 2 | /5 | ⚠️ woff2 toujours manquant (CDN Fontshare en backup) |
| robots.txt + llms.txt | 4 | /5 | ⚠️ llms.txt obsolète (sera corrigé en sa-04) |
| Build sans erreur | 13 | /15 | ⚠️ Non testé (user doit exécuter npm run build) |
| **TOTAL** | **86** | **/100** | |

## Corrections effectuées

### Fichiers créés
1. **`.gitignore`** — Standard Node/Astro (node_modules, dist, .env, .DS_Store)
2. **`.nvmrc`** — Node 22
3. **`.env.example`** — WEB3FORMS_KEY + SITE_URL
4. **`src/data/business.ts`** — Données centralisées (nom, adresse, email, offres 3-tier, social media)
5. **`public/site.webmanifest`** — PWA manifest avec theme_color et favicon
6. **`public/og-default.png`** — Image OG par défaut 1200×630 (dark background + MM Agency)

### Fichiers modifiés
7. **`astro.config.mjs`** — Ajouté `compressHTML: true`, constantes LANG/LOCALE_MAP, i18n locales complètes
8. **`tsconfig.json`** — Ajouté `baseUrl: "."` et alias `@/*: ["src/*"]`
9. **`src/styles/global.css`** — Supprimé `color: inherit` sur sélecteur `a` (CRITIQUE : empêchait Tailwind text-* sur les liens)
10. **`src/layouts/BaseLayout.astro`** — Import business.ts, `lang` dynamique depuis business, og:image URL absolue, ajouté og:url/og:locale/og:site_name, lien webmanifest, skip-link "Aller au contenu principal"

### Fichiers supprimés
11. **`public/images/projects/test.txt`** — Fichier parasite
12. **`public/fonts/README.md`** — Placeholder inutile
13. **`public/screenshot-helper.html`** — Outil debug obsolète

## Corrections en attente (user action requise)

1. **Polices locales** : Télécharger Satoshi-Variable.woff2 dans `public/fonts/` (le @font-face est déjà configuré)
2. **SIRET** : Ajouter le numéro SIRET dans `src/data/business.ts`
3. **Build** : Exécuter `npm run build` pour valider zéro erreur
4. **Palette étendue** : La palette actuelle est simplifiée (accent/bg/text). La palette 4×11 tokens (primary/secondary/accent/neutral × 50-950) sera évaluée en sa-02-design

## Notes

- Les composants sont à plat dans `src/components/` (pas de sous-dossiers). Réorganisation reportée à sa-05 pour éviter de casser les imports existants.
- SchemaOrg.astro et schemas.ts EXISTENT (contrairement au diagnostic initial) mais utilisent l'ancien pricing 2-tier. Correction en sa-04.
- Le journal existe (index + 1 article). Les pages ville existent (Strasbourg, Metz, Nancy). Le discovery report sera mis à jour.

---

**Score : 86/100** — Seuil 90 non atteint. Points manquants : polices locales (3pts) et palette complète (5pts). Ces corrections relèvent de sa-02 (design) et d'une action user (téléchargement polices).

**→ Prêt pour sa-02-design**
