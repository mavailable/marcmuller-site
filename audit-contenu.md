# Audit Contenu — marcm.fr

**Date** : 2026-03-23
**Langue** : FR (+ mirror EN)
**Type** : freelance-consultant
**Référence** : Standards wf-03-contenu

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| Cohérence linguistique | 19 | /20 | ✅ (404 meta EN — noindex, non bloquant) |
| Qualité rédactionnelle (anti-template, longueurs, CTAs) | 18 | /20 | ✅ Excellent |
| SEO contenu (mots-clés, hiérarchie titres) | 14 | /15 | ✅ |
| Contenu adapté au type freelance-consultant | 9 | /10 | ✅ |
| Éléments de réassurance (≥3) | 10 | /10 | ✅ 9 éléments identifiés |
| contenu.md synchronisé | 10 | /10 | ✅ Mis à jour 2026-03-23 |
| Corrections appliquées | 13 | /15 | ✅ (inline rgba notées pour sa-05) |
| **TOTAL** | **93** | **/100** | ✅ |

---

## Détail des vérifications

### 1. Cohérence linguistique — 19/20 ✅

**Aucun mélange de langues détecté** sur les pages FR et EN.

- Tous les H1-H3 en français sur pages FR, anglais sur pages EN
- Navigation, boutons, labels de formulaire : cohérents
- Footer, mentions légales, politique de confidentialité : tout en français
- Skip-to-content link : localisé (FR/EN)

**Point mineur** : La page 404 (unique, partagée FR/EN) a son `title` et `description` dans le `<head>` en anglais uniquement ("Page not found — Marc M"). Le contenu visible est bilingue via JavaScript. Non bloquant car `noindex={true}`.

---

### 2. Qualité rédactionnelle — 18/20 ✅

**Anti-template** : ✅ Aucun texte générique détecté. Tous les textes sont spécifiques au métier et au positionnement de Marc.

**Longueurs** :
| Section | Mots | Limite | Statut |
|---------|------|--------|--------|
| Hero sous-titre | ~25 mots | ≤2 phrases | ✅ |
| Bio (qui-suis-je) | ~200 mots | Page dédiée | ✅ Approprié |
| Descriptions projets | 2 phrases | ≤2 phrases | ✅ |
| Témoignages | 2-3 phrases | ≤3 phrases | ✅ |
| FAQ réponses | 2-3 phrases | ≤4 phrases | ✅ |

**CTAs** — Tous orientés action et spécifiques :
| CTA | Page | Qualité |
|-----|------|---------|
| Parlons de votre projet | Hero | ✅ Excellent |
| Voir mes réalisations | Hero | ✅ Spécifique |
| Écrire à Marc | CTA final | ✅ Personnel |
| Demander un devis | Offre | ✅ Action claire |
| Je candidate | 100 artisans | ✅ Engageant |
| Me contacter | Qui suis-je | ✅ Direct |
| Envoyer le message | Contact | ✅ Standard approprié |
| Réserver un créneau sur Calendly | Contact | ✅ Spécifique |

**Point d'amélioration** : Quelques opacités inline `rgba(255,255,255,0.5-0.6)` sur texte réduisent légèrement la lisibilité perçue (cosmétique, reporté en sa-05).

---

### 3. SEO contenu — 14/15 ✅

**Mots-clés** :
- Mot-clé principal "sites web sur mesure artisans" visible dans : H1 ✅, premier paragraphe ✅, meta description ✅
- Variantes : "sites web performants", "artisans", "petits commerces", "Grand Est"

**Hiérarchie des titres** :
- ✅ Un seul H1 par page (vérifié sur toutes les pages)
- ✅ Aucun saut de niveau (H1 → H2 → H3 cohérent)
- ✅ H2 présents et descriptifs sur chaque page

**Meta descriptions** — Toutes présentes et spécifiques :
| Page | Meta description | Statut |
|------|-----------------|--------|
| index | Créateur de sites web performants... | ✅ Avec mot-clé |
| offre | 3 formules claires : Essentiel 490€... | ✅ Avec prix |
| realisations | Découvrez les sites web... | ✅ |
| qui-suis-je | Marc, 40 ans, Messin... | ✅ Personnel |
| contact | Parlons de votre projet... | ✅ |
| journal | Réflexions sur le web... | ✅ |
| 100-sites-artisans | Je crée gratuitement 100 sites... | ✅ |
| mentions-legales | Informations légales... | ✅ |
| politique-confidentialite | Politique RGPD... | ✅ |
| merci | Merci pour votre message... | ✅ |
| 404 | EN only (noindex) | ⚠️ Mineur |

**Contenu dupliqué** : ✅ Aucun bloc copié-collé entre sections.

---

### 4. Contenu adapté au type freelance-consultant — 9/10 ✅

| Critère | Statut |
|---------|--------|
| Services détaillés avec tarification | ✅ 3 formules avec prix, features, délais |
| Processus/méthode de travail | ✅ 3 étapes clairement décrites |
| Témoignages clients | ✅ 2 avis Google vérifiés + avis projet |
| Parcours / expertise | ✅ Page dédiée "Qui suis-je" |
| Portfolio / réalisations | ✅ 10 projets détaillés avec URLs |
| Contact multiple | ✅ Formulaire + tél + WhatsApp + Calendly + email |

**Point d'amélioration** : Pas de section "Processus de travail détaillé" sur la page Offre (existe sur la homepage mais pas sur offre.astro). Mineur.

---

### 5. Éléments de réassurance — 10/10 ✅

**9 éléments identifiés** (minimum requis : 3) :

1. ✅ **Témoignages** : 2 avis Google vérifiés (David Merly 5★, Jennifer De Groeve 5★)
2. ✅ **Chiffres clés** : 12+ projets, 7j délai, 100% satisfaction, 20 ans entrepreneuriat
3. ✅ **Performance** : Lighthouse 100 affiché sur chaque projet
4. ✅ **Garanties** : Devis gratuit, sans engagement, réponse sous 48h
5. ✅ **Transparence prix** : 3 formules claires avec prix affichés
6. ✅ **Paiement flexible** : Paiement en plusieurs fois
7. ✅ **Propriété** : "Le site vous appartient"
8. ✅ **Stack technique** : Mise en avant (Astro, Cloudflare, pas WordPress)
9. ✅ **Initiative sociale** : 100 sites gratuits pour artisans

---

### 6. contenu.md synchronisé — 10/10 ✅

Le fichier `contenu.md` a été mis à jour le 2026-03-23 avec l'intégralité du contenu extrait de toutes les pages et composants.

---

### 7. Corrections appliquées — 13/15 ✅

**Correction effectuée** :
| Fichier | Avant | Après | Raison |
|---------|-------|-------|--------|
| qui-suis-je.astro (CTA final) | `rgba(255,255,255,0.6)` | `rgba(255,255,255,0.7)` | Cohérence avec la correction d'opacités sa-02 |

**Reporté pour sa-05/sa-08** :
- ~30 instances de `rgba(255,255,255,0.3-0.55)` dans 100-sites-artisans.astro (labels de formulaire, texte décoratif, sous-textes)
- ~6 instances de `rgba(255,255,255,0.5-0.6)` dans index.astro et en/index.astro (badges hero, sous-textes)
- ~3 instances dans graphistes.astro

Ces opacités inline n'ont pas été traitées en sa-02 (qui ciblait les classes Tailwind `text-white/XX`). Elles nécessitent une revue visuelle en contexte pour distinguer le texte informatif du texte décoratif.

---

## Score final : 93/100 ✅

**Seuil de passage : ≥ 90/100 → PASSÉ**

Prochaine étape : **sa-04-seo**
