# Audit Legal/RGPD — marcmuller.fr

**Date** : 2026-03-16
**Référence** : Standards wf-07-formulaires-legal

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| Mentions légales complètes | 8 | /10 | ⚠️ SIRET manquant (user action) |
| Politique de confidentialité | 14 | /15 | ✅ Complète, Web3Forms ajouté, typo corrigée |
| Formulaire de contact | 14 | /15 | ✅ Web3Forms, honeypot, RGPD checkbox, redirect corrigé |
| Consentement RGPD | 10 | /10 | ✅ Checkbox obligatoire, texte clair |
| Cookies | 10 | /10 | ✅ Pas de cookies = pas de bannière nécessaire |
| Page /merci | 10 | /10 | ✅ noindex ajouté, contenu utile, liens de redirection |
| Page 404 | 10 | /10 | ✅ Liens corrigés vers /realisations, /offre, /contact |
| Calendly CTA | 8 | /10 | ✅ rel="noopener noreferrer" sur lien externe |
| Accessibilité formulaire | 9 | /10 | ✅ Labels associés, required, minlength |
| **TOTAL** | **93** | **/100** | ✅ |

## Corrections effectuées

1. **politique-confidentialite.astro** : Formulaire stocké "chez Cloudflare" → "par Web3Forms"
2. **politique-confidentialite.astro** : Ajouté Web3Forms dans la section "Services tiers"
3. (Corrections précédentes) : redirect URL, options formulaire 3-tier, noindex /merci, typo bannière

## Corrections en attente (user action)

1. **SIRET** : Ajouter le numéro SIRET dans mentions-legales.astro et business.ts (obligatoire auto-entrepreneur France)

---

**Score : 93/100** — Seuil 90 atteint ✅

**→ Prêt pour sa-07-performance**
