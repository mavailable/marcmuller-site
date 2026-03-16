# Audit Performance — marcmuller.fr

**Date** : 2026-03-16
**Référence** : Standards wf-09-audit-preprod

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| Images optimisées (WebP, < 300Ko) | 14 | /15 | ✅ Toutes converties PNG→WebP (92% réduction, 5.2Mo→509Ko) |
| Polices locales (woff2, font-display: swap) | 5 | /10 | ⚠️ woff2 manquant, CDN Fontshare en backup |
| CSS (Tailwind purgé, minifié) | 10 | /10 | ✅ Tailwind v4 + Vite build + cssMinify |
| HTML (compressHTML) | 10 | /10 | ✅ compressHTML: true ajouté en sa-01 |
| Analytics | 5 | /10 | ⚠️ Cloudflare Web Analytics commenté (token manquant) |
| Core Web Vitals estimés | 12 | /15 | ✅ SSG Astro + images optimisées = LCP rapide |
| Preconnect/preload | 8 | /10 | ✅ Preconnect Fontshare CDN |
| OG Image (< 300 Ko) | 5 | /5 | ✅ 9 Ko (WebP) |
| Pas de JS bloquant | 10 | /10 | ✅ SSG pur, JS minimal (header scroll, filtres) |
| Build size | 5 | /5 | ✅ Static HTML, pas de framework runtime |
| **TOTAL** | **84** | **/100** | |

## Corrections effectuées

### Images (impact majeur : -5.2 Mo)
| Image | PNG | WebP | Réduction |
|-------|-----|------|-----------|
| la-grange-aux-fees | 2.2 Mo | 132 Ko | 95% |
| levain-kohtao | 894 Ko | 94 Ko | 90% |
| vergers-galine | 672 Ko | 61 Ko | 91% |
| occivolt | 610 Ko | 68 Ko | 89% |
| roma-laudarium | 584 Ko | 61 Ko | 90% |
| pacor-piano | 377 Ko | 51 Ko | 87% |
| mm-securite | 139 Ko | 16 Ko | 89% |
| kor | 127 Ko | 16 Ko | 88% |
| datavi | 113 Ko | 10 Ko | 92% |
| og-default | 18 Ko | 9 Ko | 48% |

### Références mises à jour
- realisations.astro : 9 références .png → .webp
- index.astro : 3 références .png → .webp

## Corrections en attente (user action)

1. **Police Satoshi locale** : Télécharger Satoshi-Variable.woff2 depuis fontshare.com → `public/fonts/`
2. **Analytics** : Obtenir token Cloudflare Web Analytics → décommenter dans BaseLayout
3. **Supprimer PNG originaux** : Une fois WebP validé en production, supprimer les PNG pour économiser l'espace build

---

**Score : 84/100** — Sous le seuil 90. Points manquants : polices locales (5pts), analytics (5pts). Les deux requièrent une action utilisateur.

**→ Prêt pour sa-08-corrections**
