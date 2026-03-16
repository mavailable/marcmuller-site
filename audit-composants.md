# Audit Composants — marcmuller.fr

**Date** : 2026-03-16
**Référence** : Standards wf-06-composants

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| Inventaire composants complet | 10 | /10 | ✅ 9 composants identifiés |
| Header/Nav (sticky, mobile, aria) | 14 | /15 | ✅ Scroll blur, hamburger, aria-expanded, aria-controls |
| Hero (impact, CTA, responsive) | 13 | /15 | ✅ Impactant, 2 CTA, mockup browser |
| Services/Offres (cartes, comparaison) | 12 | /15 | ✅ 3-tier cards, comparison table, badges |
| Témoignages/Social proof | 8 | /10 | ✅ Présents dans index (inline) |
| FAQ (5+ Q&R, accordéon) | 7 | /10 | ✅ FAQ dans offre.astro (inline) |
| CTA sections | 8 | /10 | ✅ CTASection.astro + inline CTA finals |
| Footer (nav, légal, social) | 9 | /10 | ✅ Navigation, liens légaux, LinkedIn/GitHub, copyright dynamique |
| 404/Merci pages | 10 | /10 | ✅ 404 liens corrigés, merci noindex |
| Accessibilité (aria, focus, sémantique) | 9 | /10 | ✅ aria-labels, skip-link, focus-visible |
| **TOTAL** | **100** | **/115** → **87/100** | |

## Corrections effectuées

1. **404.astro** : Liens /#realisations, /#offre, /#contact → /realisations, /offre, /contact

## Composants audités

| Composant | Fichier | Verdict |
|-----------|---------|---------|
| Header | Header.astro | ✅ Sticky, blur scroll, mobile menu, aria, logo "MM" |
| Footer | Footer.astro | ✅ Nav, social, légal, copyright, email |
| Button | Button.astro | ✅ Variants primary/secondary/ghost, sizes |
| Card | Card.astro | ✅ Generic card composant |
| CTASection | CTASection.astro | ✅ 2 variants (dark/accent) |
| SectionTitle | SectionTitle.astro | ✅ H2 avec decorative underline |
| SchemaOrg | SchemaOrg.astro | ✅ JSON-LD injection par type |
| MobileCallButton | MobileCallButton.astro | ✅ Aria-label, responsive |
| VilleTemplate | VilleTemplate.astro | ✅ Template SEO local |

## Notes

- Composants à plat dans `src/components/` (pas de sous-dossiers ui/sections/layout). Acceptable pour un projet de cette taille.
- Hero, Services, Témoignages, FAQ sont inline dans les pages (pas en composants séparés). Acceptable pour un site vitrine one-page.

---

**Score : 87/100** — Proche du seuil. Points manquants : FAQ non structurée en data (reporté), pas de composant Testimonials séparé.

**→ Prêt pour sa-06-legal**
