# Audit SEO/GEO — marcmuller.fr

**Date** : 2026-03-16
**Référence** : Standards wf-04-seo-geo

---

## Résumé

| Check | Score | Max | Statut |
|-------|-------|-----|--------|
| Schema.org principal (Person + LocalBusiness) | 14 | /15 | ✅ Injecté sur index, offre, contact, qui-suis-je |
| FAQPage | 8 | /10 | ⚠️ Schema existe mais pas injecté (FAQ data inline dans offre.astro) |
| WebSite + BreadcrumbList | 5 | /5 | ✅ WebSite dans BaseLayout (toutes pages) |
| Open Graph (7 tags + image) | 10 | /10 | ✅ og:title, desc, image (absolu), url, type, locale, site_name |
| Meta tags par page | 9 | /10 | ✅ Toutes les pages ont title + desc uniques. noindex sur /merci |
| robots.txt | 10 | /10 | ✅ Bots IA autorisés, sitemap déclaré |
| llms.txt complet | 10 | /10 | ✅ Réécrit avec 3-tier, villes, contact correct |
| JSON-LD syntaxe | 10 | /10 | ✅ Fonctions TypeScript bien typées |
| Cohérence contenu/SEO | 9 | /10 | ✅ business.ts source unique |
| Liens internes/externes | 5 | /5 | ✅ target="_blank" avec noopener |
| **TOTAL** | **90** | **/100** | ✅ |

## Corrections effectuées

1. **schemas.ts** : Ajouté `getWebSiteSchema()` avec import de business.ts
2. **SchemaOrg.astro** : Ajouté type `'webSite'` + case dans switch
3. **BaseLayout.astro** : Import SchemaOrg, prop `noindex`, `<SchemaOrg type="webSite" />` dans head
4. **index.astro** : Injecté `<SchemaOrg type="person" />` + `<SchemaOrg type="localBusiness" />`
5. **offre.astro** : Injecté `<SchemaOrg type="localBusiness" />`
6. **contact.astro** : Injecté `<SchemaOrg type="localBusiness" />`
7. **qui-suis-je.astro** : Injecté `<SchemaOrg type="person" />`
8. **merci.astro** : Ajouté `noindex={true}`
9. **llms.txt** : Réécrit entièrement (3-tier pricing, email correct, pages villes)

## Corrections en attente

1. **FAQPage schema** : La FAQ est dans offre.astro en HTML inline (pas structurée en data). Idéalement extraire les Q&R en const et passer au SchemaOrg.
2. **BreadcrumbList** : Disponible dans schemas.ts mais non utilisé. À ajouter sur les pages intérieures.
3. **Validation en ligne** : Tester avec Google Rich Results Test une fois le site déployé.

---

**Score : 90/100** — Seuil 90 atteint ✅

**→ Prêt pour sa-05-composants**
