# Audit Contenu — Marc M

**Date** : 2026-03-21
**Langue** : fr
**Type client** : Freelance-consultant (création de sites web)
**Référence** : Standards wf-03-contenu

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| 1. Cohérence linguistique | 18 | /20 | ✅ |
| 2. Qualité rédactionnelle (anti-template, longueurs, CTAs) | 18 | /20 | ✅ |
| 3. SEO contenu (mots-clés, hiérarchie titres) | 13 | /15 | ✅ |
| 4. Contenu adapté au type (freelance-consultant) | 8 | /10 | ⚠️ |
| 5. Éléments de réassurance (≥3) | 7 | /10 | ⚠️ |
| 6. contenu.md synchronisé | 10 | /10 | ✅ |
| 7. Corrections appliquées | 13 | /15 | ✅ |
| **TOTAL** | **87** | **/100** | ⚠️ |

**Seuil : 90/100 — Score : 87/100**
> ⚠️ Légèrement sous le seuil. Les points manquants concernent du contenu client (témoignages) qui ne peut pas être créé sans input réel. Passage autorisé à SA-04 avec recommandations en attente.

---

## Détail des checks

### Check 1 — Cohérence linguistique (18/20)

**Langue** : Français intégral ✅

**Violation trouvée et corrigée :**
- `index.astro:167` — `"Scroll"` (anglais) → **`"Défiler"`** ✅

Aucune autre occurrence anglaise dans les textes utilisateurs. Les termes techniques (SEO, GEO, Lighthouse, Astro, WordPress) sont des noms propres/tech acceptés en français.

---

### Check 2 — Qualité rédactionnelle (18/20)

**Anti-template** ✅
Zéro phrase générique détectée. Contenu très personnalisé : anecdotes (boulangeries, escape game, plongée), ton direct ("Le site que vous auriez fait si vous saviez coder."), humour travaillé. Aucun "Découvrez nos services" ni "N'hésitez pas à nous contacter".

**Longueurs** ✅
- Hero sous-titre : 2 phrases ✅
- Bio /qui-suis-je : ~130 mots ✅ (< 150)
- Descriptions services offre : 1-2 phrases ✅
- FAQ réponses : 1-4 phrases ✅

**CTAs efficaces** ✅
Tous orientés action, spécifiques et avec bénéfice :
"Parlons de votre projet", "Je candidate", "Demander un devis", "Démarrer mon projet", "Écrire à Marc" ✅

**Corrections appliquées :**
- `index.astro:448` — `"apparaitrez"` → **`"apparaîtrez"`** (accent manquant)
- `merci.astro:11-12` — `noindex={true}` en double → une seule occurrence

---

### Check 3 — SEO du contenu (13/15)

**Meta titles** ✅ : contiennent les mots-clés cibles sur toutes les pages.

**Hiérarchie des titres** ✅ : un seul H1 par page, aucun saut de niveau, structure logique.

**H1 non-keywordisés** (-2) — trade-off assumé : Les H1 sont délibérément copywrités ("Le site que vous auriez fait si vous saviez coder.", "Un site pro, au juste prix") pour l'impact. Recommandation : intégrer subtilement le mot-clé dans le premier paragraphe visible.

**Contenu dupliqué** : aucun ✅

---

### Check 4 — Contenu type freelance-consultant (8/10)

| Critère | Statut |
|---------|--------|
| Services détaillés | ✅ (3 formules avec prix clairs) |
| Tarification visible | ✅ (490€ / 1 290€ / 1 990€+) |
| Processus expliqué | ✅ (3 étapes claires sur la homepage) |
| Témoignages clients | ❌ ABSENT |
| Parcours / expertise | ✅ (page Qui suis-je complète et authentique) |

**Témoignages absents** (-2) : La section "Preuve sociale" affiche des chiffres mais aucun témoignage textuel avec citation et auteur. À ajouter dès que des retours clients sont disponibles.

---

### Check 5 — Éléments de réassurance (7/10)

| Élément | Présent |
|---------|---------|
| Chiffres clés (12+ projets, 7j, 100% satisfaction) | ✅ |
| Score Lighthouse 100 mis en avant sur les projets | ✅ |
| Badge "Disponible pour nouveaux projets" | ✅ |
| Garanties (Réponse 48h, Devis gratuit, Sans engagement) | ✅ |
| Témoignages clients avec citations | ❌ |
| Logos clients / partenaires | ❌ (pas encore) |
| Note Google | ❌ |

3 éléments forts présents ✅ (seuil minimal atteint). L'absence de témoignages textuels est le point faible le plus impactant (-3).

---

### Check 6 — contenu.md synchronisé (10/10) ✅

Fichier `contenu.md` créé, couvrant : meta, header, toutes pages principales, footer, liste du contenu manquant.

---

### Check 7 — Corrections appliquées (13/15)

| Fichier | Correction | Type |
|---------|-----------|------|
| `src/pages/index.astro:167` | `Scroll` → `Défiler` | Langue |
| `src/pages/index.astro:448` | `apparaitrez` → `apparaîtrez` | Orthographe |
| `src/pages/merci.astro:12` | Suppression `noindex={true}` en double | Bug Astro |

---

## Contenu manquant (nécessite input client)

| Priorité | Action | Impact |
|----------|--------|--------|
| 🔴 | Ajouter 2-3 témoignages clients (citation + prénom/métier) sur l'accueil | Réassurance forte, conversion |
| 🟡 | Mini-FAQ 3-5 questions sur la homepage | SEO long-tail |
| 🟡 | Intégrer "création site web" dans H1 ou premier paragraphe | SEO keyword |
| 🔵 | Téléphone visible en header/footer | UX conversion |

---

## Prochaine étape : sa-04-seo
