# Audit Formulaires & Légal — marcm.fr

**Date** : 2026-03-23
**Pays** : France | **Langue** : FR + EN
**Référence** : Standards wf-07-formulaires-legal

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| Formulaire FR (champs, accessibilité, spam, RGPD) | 14 | /15 | ✅ Complet |
| Formulaire EN (champs, accessibilité, spam, RGPD) | 12 | /15 | ⚠️ Checkbox GDPR manquante → corrigé |
| Page /merci (Header/Footer, noindex, CTA) | 10 | /10 | ✅ |
| Page 404 (Header/Footer, liens, CTA) | 5 | /5 | ✅ |
| Mentions légales (complètes selon pays) | 10 | /10 | ✅ SIRET, Cloudflare, droit français |
| Politique confidentialité (RGPD) | 9 | /10 | ✅ Durée EN corrigée (3→2 ans) |
| Bannière cookies (si nécessaire) | 10 | /10 | ✅ Non nécessaire (Umami seul) |
| Footer (liens légaux, copyright) | 5 | /5 | ✅ |
| Numéros de téléphone cohérents | 3 | /5 | ⚠️ CRITIQUE — incohérence display/href |
| Build réussi | 5 | /5 | ✅ Site live |
| **TOTAL** | **83** | **/90** → **92/100** normalisé | ✅ |

---

## Check 1 — Formulaire de contact FR — 14/15 ✅

### Champs

| Champ | Type | Required | Label for= | Statut |
|-------|------|----------|------------|--------|
| Prénom | text | ✅ | ✅ for="first_name" | ✅ |
| Email | email | ✅ | ✅ for="email" | ✅ |
| Téléphone | tel | ❌ (optionnel) | ✅ for="phone" | ✅ |
| Activité / Secteur | text | ✅ | ✅ for="activity" | ✅ |
| Formule envisagée | select | ❌ (optionnel) | ✅ for="formule" | ✅ |
| Message | textarea | ✅ minlength=20 | ✅ for="message" | ✅ |
| Consentement RGPD | checkbox | ✅ | ✅ for="privacy" | ✅ |

**Nombre de champs** : 6 + 1 checkbox → acceptable (≤ 7)

### Accessibilité

| Critère | Statut |
|---------|--------|
| `<label for="">` sur chaque champ | ✅ |
| `required` sur les champs obligatoires | ✅ |
| `type="email"` sur le champ email | ✅ |
| `aria-live="polite"` + `aria-atomic="true"` pour form-status | ✅ |
| Champs requis signalés par * + couleur accent | ✅ |
| Focus ring visible | ✅ `focus:ring-2 focus:ring-[var(--color-accent)]` |

### Service d'envoi

| Config | Valeur | Statut |
|--------|--------|--------|
| Service | Web3Forms | ✅ |
| access_key | `dccda1f5-...` (configuré) | ✅ |
| redirect | `https://marcm.fr/merci` | ✅ |
| Honeypot | `name="botcheck"` hidden | ✅ |
| Méthode | POST | ✅ |

### Mention RGPD

- ✅ Checkbox obligatoire avec texte complet : « J'accepte que mes données soient traitées sur la base de mon consentement (art. 6.1.a RGPD)... »
- ✅ Lien vers `/politique-confidentialite` (target="_blank", rel="noopener")
- ✅ Texte visible, lisible (pas en text-xs gris clair)

---

## Check 1b — Formulaire de contact EN — 12/15 ⚠️→✅

### Problème CRITIQUE identifié et corrigé

**Avant** : Aucune checkbox GDPR / consentement avant le bouton submit.

**Après** : Checkbox GDPR ajoutée avec texte « I consent to my data being processed under Art. 6(1)(a) GDPR... » et lien vers `/en/privacy-policy`.

### Autres corrections EN

| Correction | Avant | Après |
|------------|-------|-------|
| Checkbox GDPR | Absente | Ajoutée (required) |
| Téléphone sidebar | Hardcodé `+33688766648` | Dynamique `business.phone` |
| WhatsApp | Hardcodé | Dynamique `business.whatsapp` |

### Différences FR/EN acceptables

- EN utilise "Budget range" (select) au lieu de "Formule envisagée"
- EN utilise "Full name" au lieu de "Prénom"
- EN a un champ `subject` explicite : "New contact from marcm.fr/en"

---

## Check 2 — Page /merci — 10/10 ✅

| Élément | Statut |
|---------|--------|
| BaseLayout (Header + Footer) | ✅ |
| `noindex={true}` | ✅ |
| Message de confirmation FR | ✅ « Message reçu ! » |
| Email verification notice | ✅ « Vérifiez votre email... » |
| CTA secondaires (3 cards) | ✅ Voir formules, Me connaître, Retour accueil |
| Contact direct WhatsApp + email | ✅ |
| Bouton retour accueil | ✅ |
| Umami event email-click | ✅ |
| Checkmark visuel SVG | ✅ |

---

## Check 3 — Page 404 — 5/5 ✅

| Élément | Statut |
|---------|--------|
| BaseLayout (Header + Footer) | ✅ |
| `noindex={true}` | ✅ |
| Message humain/amical | ✅ « Oups, cette page n'existe pas » |
| Sous-titre rassurant | ✅ « Pas de panique... » |
| Liens vers pages principales | ✅ 4 liens (Accueil, Réalisations, Offre, Contact) |
| CTA retour accueil | ✅ Bouton accent |
| Bilingue (JS détection URL /en/) | ✅ |
| Umami 404_error tracking | ✅ `umami.track('404_error', { url })` |
| Background décoratif "404" | ✅ |

---

## Check 4 — Mentions légales — 10/10 ✅

| Section | Contenu | Statut |
|---------|---------|--------|
| Éditeur | Marc M, création de sites web | ✅ |
| SIRET | 505 045 450 00069 (via business.siret) | ✅ |
| Adresse | 13 Rue des Peupliers, 57950 Montigny-lès-Metz | ✅ |
| Téléphone | Dynamique (business.phone) | ✅ |
| Email | marc@muller.im (business.email) | ✅ |
| Directeur publication | Marc Muller | ✅ |
| Hébergeur | Cloudflare Inc., 101 Townsend St, SF, CA 94107 | ✅ |
| Propriété intellectuelle | Section complète | ✅ |
| Données personnelles | Renvoi vers politique confidentialité | ✅ |
| Limitation responsabilité | 4 cas listés | ✅ |
| Droit applicable | Droit français, tribunaux de Metz | ✅ |
| Date mise à jour | 15 mars 2026 | ✅ |

**Version EN** (`/en/legal-notice`) : ✅ Existe, version condensée mais complète.

---

## Check 5 — Politique de confidentialité — 9/10 ✅

| Section RGPD | Contenu | Statut |
|--------------|---------|--------|
| Responsable du traitement | Marc Muller / Marc M, Montigny-lès-Metz | ✅ |
| Données collectées | Prénom, email, tél (opt), message, activité | ✅ |
| Analytics Umami | Pages, pays, appareil, source (anonymisés) | ✅ |
| Finalité | Répondre aux demandes, contact projet | ✅ |
| Base légale | Art. 6.1.a RGPD — Consentement | ✅ |
| Durée conservation formulaires | 2 ans | ✅ |
| Durée conservation analytics | 6 mois | ✅ |
| Durée projets validés | Collaboration + 1 an | ✅ |
| Droit d'accès | ✅ | ✅ |
| Droit de rectification | ✅ | ✅ |
| Droit à l'oubli | ✅ | ✅ |
| Droit à la portabilité | ✅ | ✅ |
| Droit d'opposition | ✅ | ✅ |
| Limitation du traitement | ✅ | ✅ |
| Contact exercice droits | marc@muller.im | ✅ |
| Cookies | « Aucun cookie » — explicitement déclaré | ✅ |
| Services tiers | Cloudflare, Umami, Web3Forms | ✅ |
| Mention « Pas de GA, pas de FB Pixel » | ✅ | ✅ |
| Sécurité (HTTPS/SSL) | ✅ | ✅ |
| Date mise à jour | 15 mars 2026 | ✅ |

### Correction effectuée

| Fichier | Avant | Après | Raison |
|---------|-------|-------|--------|
| en/privacy-policy.astro | « 3 years » | « 2 years » | Incohérence avec version FR (2 ans) |

**Version EN** (`/en/privacy-policy`) : ✅ Existe, complète.

---

## Check 6 — Bannière cookies — 10/10 ✅

### Scripts tiers détectés

| Service | Cookie ? | Détecté |
|---------|----------|---------|
| Google Analytics / GTM | ✅ Cookie | ❌ Absent |
| Facebook Pixel | ✅ Cookie | ❌ Absent |
| LinkedIn Tracking | ✅ Cookie | ❌ Absent |
| YouTube embed | ✅ Cookie | ❌ Absent |
| Google Maps | ✅ Cookie | ❌ Absent |
| **Umami Analytics** | **❌ Pas de cookie** | ✅ Seul analytics |

**Conclusion** : Aucune bannière cookies nécessaire. Umami est cookie-free et RGPD-compliant nativement.

La politique de confidentialité le déclare explicitement : « Ce site n'utilise aucun cookie. Aucune bannière de consentement cookie. Aucun traçage. Aucun ciblage publicitaire. »

---

## Check 7 — Footer — 5/5 ✅

| Lien | FR | EN | Statut |
|------|----|----|--------|
| Mentions légales | `/mentions-legales` | `/en/legal-notice` | ✅ |
| Politique confidentialité | `/politique-confidentialite` | `/en/privacy-policy` | ✅ |
| Copyright | © 2026 Marc M (dynamique JS) | © 2026 Marc M | ✅ |
| Gérer les cookies | — | — | ✅ (non nécessaire) |

---

## Check 8 — Versions EN — ✅

| Page FR | Page EN | Existe |
|---------|---------|--------|
| /mentions-legales | /en/legal-notice | ✅ |
| /politique-confidentialite | /en/privacy-policy | ✅ |
| /merci | /en/thank-you | ✅ |
| /contact | /en/contact | ✅ |

---

## ⚠️ PROBLÈME CRITIQUE — Numéros de téléphone incohérents

### Constat

Le numéro **affiché** sur le site est `+33 6 88 77 66 48` (= `+33688776648`).
Le numéro dans les **href** (tel: et wa.me/) et dans `business.ts` est `+33688766648`.

**Ce sont deux numéros différents** (77 vs 76 au milieu).

### Fichiers affectés

| Fichier | Ligne | Problème |
|---------|-------|----------|
| src/data/business.ts | 24-25 | phone: `+33688766648` |
| src/pages/contact.astro | 193, 203, 209 | href=766, display=776 |
| src/components/Footer.astro | 110 | href=766, display=776 |
| src/pages/offre.astro | 520 | href=766 |
| src/pages/merci.astro | 76 | href=766 |
| src/pages/en/contact.astro | 160 | display=776 |

### Action requise

**Marc doit confirmer** quel est le bon numéro :
- `+33 6 88 77 66 48` (776) → le numéro affiché partout
- `+33 6 88 76 66 48` (766) → le numéro dans business.ts et les href

Ensuite corriger business.ts ET toutes les occurrences hardcodées pour utiliser `business.phone` / `business.whatsapp`.

---

## Corrections effectuées

| # | Correction | Fichier | Impact |
|---|------------|---------|--------|
| 1 | Ajout checkbox GDPR consent | src/pages/en/contact.astro | Conformité RGPD formulaire EN |
| 2 | Téléphone dynamique (business.ts) | src/pages/en/contact.astro | Source unique de vérité |
| 3 | WhatsApp dynamique (business.ts) | src/pages/en/contact.astro | Source unique de vérité |
| 4 | Durée conservation 3→2 ans | src/pages/en/privacy-policy.astro | Cohérence FR/EN |

## Corrections en attente (user action / sa-08)

| Point | Priorité | Action |
|-------|----------|--------|
| Confirmer le bon numéro de téléphone (776 ou 766) | **CRITIQUE** | Marc doit confirmer |
| Dynamiser tous les tel:/wa.me/ via business.ts (contact.astro FR, Footer, offre, merci) | Haute | sa-08 après confirmation numéro |

---

## Score final : 92/100 ✅

**Seuil de passage : ≥ 90/100 → PASSÉ**

Prochaine étape : **sa-07-performance**
