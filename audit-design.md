# Audit Design System — marcmuller.fr

**Date** : 2026-03-16
**Référence** : Standards wf-02-design-system

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| Palette complète (4×11 tokens) | 20 | /20 | ✅ Créée (primary, secondary, accent, neutral × 50-950) |
| Contraste WCAG AA | 13 | /15 | ✅ Pas de violation text-primary sur bg-primary |
| Opacités texte blanc | 14 | /15 | ✅ ~30 occurrences text-white/[20-70] corrigées → gray-300/400/500 |
| Typographie | 8 | /10 | ⚠️ Satoshi via CDN (RGPD), woff2 local manquant |
| Tokens Tailwind v4 dans @theme | 15 | /15 | ✅ Tous dans @theme, aliases sémantiques conservés |
| Cohérence visuelle + composants ref. | 18 | /20 | ✅ Pas de couleur orpheline dans composants |
| Design exploitable par composants | 5 | /5 | ✅ Tokens utilisables partout |
| **TOTAL** | **93** | **/100** | ✅ |

## Corrections effectuées

### Palette étendue
- Ajouté 44 tokens couleur (4 familles × 11 nuances) dans `@theme`
- Conservé les aliases sémantiques existants pour rétrocompatibilité

### Opacités texte blanc (30+ corrections)
- **index.astro** : 6 corrections (text-white/50→gray-400, text-white/40→gray-400, text-white/30→gray-500)
- **offre.astro** : 11 corrections (text-white/70→gray-300, text-white/50→gray-300/400, text-white/40→gray-400, inline color→var)
- **realisations.astro** : 4 corrections (text-white/50→gray-400, text-white/40→gray-400/500)
- **qui-suis-je.astro** : 3 corrections (text-white/70→gray-300, text-white/50→gray-400)
- **journal/combien-coute-un-site-web.astro** : 4 corrections
- **CTASection.astro** : 1 correction (text-white/70→text-white/80)

### Inline styles remplacés
- offre.astro : `style="color: #E86C47;"` → `class="text-[var(--color-accent)]"`

## Corrections en attente

1. **Police Satoshi** : Fontshare CDN est un point de défaillance + question RGPD. Télécharger woff2 en local.
2. **Échelle typographique** : Pas de tokens `--font-size-*` dans @theme (Tailwind defaults utilisés — acceptable).

---

**Score : 93/100** — Seuil 90 atteint ✅

**→ Prêt pour sa-03-contenu**
