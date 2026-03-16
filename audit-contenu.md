# Audit Contenu — marcmuller.fr

**Date** : 2026-03-16
**Langue** : fr
**Référence** : Standards wf-03-contenu

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| Cohérence linguistique | 18 | /20 | ✅ Tout en français, aucun résidu anglais dans le contenu |
| Qualité rédactionnelle | 17 | /20 | ✅ Ton direct, pas de template creux. Tutoiement/vouvoiement mixte noté |
| SEO contenu | 13 | /15 | ✅ Mots-clés bien placés, hiérarchie H1-H2-H3 correcte |
| Contenu adapté (freelance-consultant) | 9 | /10 | ✅ Services détaillés, parcours, témoignages, tarification |
| Éléments de réassurance (≥3) | 9 | /10 | ✅ Témoignages, chiffres, timeline parcours, Lighthouse scores |
| contenu.md synchronisé | 10 | /10 | ✅ Créé avec état actuel |
| Corrections appliquées | 15 | /15 | ✅ Pricing 3-tier, redirect URL, typo bannière |
| **TOTAL** | **91** | **/100** | ✅ |

## Corrections effectuées

### Pricing mis à jour (12 fichiers)
- contact.astro : options formulaire Express/Sur mesure → Essentiel/Multi-pages/Sur mesure
- contact.astro : redirect URL marcmuller.im → marcmuller.fr
- merci.astro : "Site Express ou Sur mesure" → "Essentiel, Multi-pages ou Sur mesure"
- index.astro : CTA "Site Express ou un projet sur mesure" → "site Essentiel, Multi-pages ou sur mesure"
- qui-suis-je.astro : "Site Express" → "site Essentiel"
- schemas.ts : services 2-tier → 3-tier avec bons prix
- VilleTemplate.astro : "Site Express" → "Essentiel"
- 3 pages ville (Strasbourg, Metz, Nancy) : "Site Express" → "Essentiel"

### Typo corrigée
- politique-confidentialite.astro : "banneau" → "bannière"

### Non modifié (volontaire)
- journal/combien-coute-un-site-web.astro : article daté, pricing historique conservé
- Tutoiement dans qui-suis-je "Ce en quoi je crois" : choix stylistique assumé (proximité)

## Points d'attention

1. **Tutoiement/vouvoiement** : La page qui-suis-je mélange tu (section Convictions) et vous (reste du site). C'est un choix stylistique qui crée de la proximité dans cette section personnelle — acceptable.
2. **Photo placeholder** : "Photo à venir" sur qui-suis-je — contenu manquant (user action).
3. **Blog** : Un seul article dans le journal. Contenu suffisant pour le lancement mais à enrichir.

---

**Score : 91/100** — Seuil 90 atteint ✅

**→ Prêt pour sa-04-seo**
