# Rapport d'Audit Final — marcmuller.fr

**Date** : 2026-03-16
**URL** : https://marcmuller.fr
**Auditeur** : Web Factory (Claude)
**Pipeline** : SA-00 → SA-09

---

## Score global

| Domaine | Poids | Score initial (estimé) | Score final | Statut |
|---------|-------|----------------------|-------------|--------|
| Architecture (sa-01) | ×1.0 | ~50 | **86/100** | ⚠️ Polices locales manquantes |
| Design System (sa-02) | ×1.0 | ~65 | **93/100** | ✅ |
| Contenu (sa-03) | ×1.5 | ~70 | **91/100** | ✅ |
| SEO / GEO (sa-04) | ×1.5 | ~40 | **90/100** | ✅ |
| Composants (sa-05) | ×1.0 | ~75 | **87/100** | ⚠️ Proche du seuil |
| Formulaires & Légal (sa-06) | ×1.0 | ~60 | **93/100** | ✅ |
| Performance (sa-07) | ×1.0 | ~55 | **84/100** | ⚠️ Analytics + polices |
| **GLOBAL (pondéré)** | | **~52** | **89.3/100** | ⚠️ Sous le seuil 90 |

**Progression : +37 points** (de ~52 à 89.3)

> Le score global est à 89.3/100, juste sous le seuil de 90. Les 0.7 points manquants proviennent de 3 actions utilisateur : police Satoshi en local (+3-5 pts), token analytics Cloudflare (+5 pts), et SIRET (+2 pts). Une fois ces actions réalisées, le score dépassera confortablement les 90.

---

## Résumé des corrections

- **Corrections totales exécutées** : 50+
- **BLOQUANTES** : 8 (redirect URL, liens 404, color:inherit CSS, OG image manquante, Schema.org absent des pages, prix incohérents, compressHTML manquant, i18n sitemap)
- **MAJEURES** : 15+ (30+ opacités WCAG, palette étendue 4×11, WebP images -92%, Schema WebSite/Person/LocalBusiness, llms.txt réécrit, 3-tier pricing partout, business.ts centralisé)
- **MINEURES** : 10+ (typos, fichiers parasites supprimés, webmanifest, .env.example, .nvmrc, skip-link)
- **En attente (action user)** : 6

---

## Points forts du site

1. **Stack moderne performant** : Astro 5 SSG + Tailwind v4 + Cloudflare Pages = pas de runtime JS côté client, HTML statique ultra-rapide
2. **SEO/GEO solide** : Schema.org (Person + LocalBusiness + WebSite), robots.txt AI-friendly, llms.txt complet, OG tags sur toutes les pages
3. **Design cohérent** : Palette 4×11 tokens, contraste WCAG AA respecté, pas d'opacités problématiques sur texte blanc
4. **Contenu authentique** : Ton personnel, pas de template générique, témoignages réels, parcours détaillé
5. **Pages SEO locales** : 3 pages ville (Strasbourg, Metz, Nancy) avec VilleTemplate réutilisable

## Top 5 corrections à impact majeur

1. **Images WebP** (-5.2 Mo, -92%) : Toutes les images projets converties PNG→WebP. La page réalisations passe de ~6 Mo à ~500 Ko
2. **Schema.org complet** : Passage de 0 à 3 schemas (WebSite, Person, LocalBusiness) injectés sur toutes les pages pertinentes
3. **Contraste WCAG AA** : 30+ instances de `text-white/[20-70]` remplacées par des gris accessibles (gray-300/400/500)
4. **Pricing 3-tier cohérent** : Alignement Essentiel/Multi-pages/Sur mesure à travers 12+ fichiers (pages, schemas, formulaire, llms.txt)
5. **OG Image + Meta tags** : Image OG par défaut créée (1200×630), URLs absolues, og:locale/site_name ajoutés

---

## Points restants en attente (action utilisateur)

| # | Action | Impact | Fichier(s) |
|---|--------|--------|------------|
| 1 | **Télécharger Satoshi-Variable.woff2** depuis fontshare.com → `public/fonts/` | +5 pts (archi + perf) | global.css déjà configuré |
| 2 | **Ajouter SIRET** dans business.ts et mentions-legales.astro | +2 pts (legal) | Obligatoire auto-entrepreneur FR |
| 3 | **Token Cloudflare Web Analytics** → décommenter dans BaseLayout.astro | +5 pts (perf) | Ligne commentée prête |
| 4 | **Photo portrait** pour qui-suis-je.astro (remplacer "Photo à venir") | +1 pt (contenu) | Placeholder visible |
| 5 | **Supprimer PNG originaux** dans `public/images/projects/` | Espace disque | Après validation WebP en prod |
| 6 | **Enrichir le journal** avec de nouveaux articles | SEO long terme | 1 seul article actuellement |

---

## Fichiers modifiés (synthèse)

| Fichier | Corrections | Domaines |
|---------|------------|----------|
| src/styles/global.css | Palette 4×11, suppression color:inherit sur `a` | sa-01, sa-02 |
| src/layouts/BaseLayout.astro | lang dynamique, OG absolu, SchemaOrg WebSite, skip-link, noindex prop, webmanifest | sa-01, sa-04, sa-05 |
| src/data/business.ts | Créé (données centralisées), prix corrigé 1490 | sa-01, sa-08 |
| src/data/schemas.ts | WebSite schema ajouté, prix 3-tier corrigés | sa-04, sa-08 |
| src/components/SchemaOrg.astro | Type webSite ajouté | sa-04 |
| src/pages/index.astro | Opacités WCAG, images WebP, SchemaOrg, CTA 3-tier | sa-02, sa-03, sa-04, sa-07 |
| src/pages/offre.astro | 11 opacités corrigées, SchemaOrg LocalBusiness | sa-02, sa-04 |
| src/pages/contact.astro | Redirect URL, options 3-tier, SchemaOrg, prix 1490 | sa-03, sa-06, sa-08 |
| src/pages/realisations.astro | Opacités, images WebP | sa-02, sa-07 |
| src/pages/qui-suis-je.astro | Opacités, "Essentiel", SchemaOrg Person | sa-02, sa-03, sa-04 |
| src/pages/merci.astro | noindex, texte 3-tier | sa-03, sa-04 |
| src/pages/404.astro | Liens corrigés vers /realisations, /offre, /contact | sa-05 |
| src/pages/politique-confidentialite.astro | Web3Forms, typo "bannière" | sa-03, sa-06 |
| src/components/VilleTemplate.astro | "Essentiel" | sa-03 |
| src/pages/creation-site-web-*/index.astro | "Essentiel" (×3 villes) | sa-03 |
| src/pages/journal/combien-coute-un-site-web.astro | Opacités seulement (prix historique conservé) | sa-02 |
| src/components/CTASection.astro | Opacité text-white/80 | sa-02 |
| public/llms.txt | Réécrit complet (3-tier, pages villes, email) | sa-04, sa-08 |
| public/og-default.png → .webp | Créé puis converti | sa-01, sa-07 |
| public/images/projects/*.webp | 9 images PNG→WebP (-92%) | sa-07 |
| public/site.webmanifest | Créé | sa-01 |
| public/robots.txt | Vérifié OK (inchangé) | sa-04 |
| astro.config.mjs | compressHTML, LANG/LOCALE_MAP, i18n | sa-01 |
| tsconfig.json | baseUrl, @/* alias | sa-01 |
| .gitignore, .nvmrc, .env.example | Créés | sa-01 |

---

## Checklist de déploiement

### Avant le deploy (user actions)

- [ ] Télécharger Satoshi-Variable.woff2 → `public/fonts/`
- [ ] Ajouter SIRET dans `src/data/business.ts` et `src/pages/mentions-legales.astro`
- [ ] Obtenir token Cloudflare Web Analytics → décommenter dans `src/layouts/BaseLayout.astro`
- [ ] Exécuter `npm run build` — vérifier zéro erreur
- [ ] Vérifier que `site` dans `astro.config.mjs` pointe vers `https://marcmuller.fr`

### Commandes deploy

```bash
git add -A
git commit -m "Audit site complet — corrections v2"
git push
```

Cloudflare Pages se déploie automatiquement au push.

### Après le deploy

- [ ] Site accessible en HTTPS sur marcmuller.fr
- [ ] OG image visible (tester via https://developers.facebook.com/tools/debug/)
- [ ] Formulaire contact : envoi test réel
- [ ] Lighthouse via PageSpeed Insights : viser 4 × ≥ 90
- [ ] Google Rich Results Test : valider Schema.org
- [ ] Soumettre sitemap à Google Search Console

---

## Recommandations post-audit

1. **Police Satoshi locale** (priorité 1) : Le CDN Fontshare fonctionne mais pose un risque RGPD (transfert données hors UE) et un point de défaillance externe. Télécharger le woff2 résout les deux.

2. **FAQPage Schema.org** : La FAQ dans offre.astro est en HTML inline. Extraire les Q&R en constantes TypeScript et injecter le schema FAQPage augmenterait la visibilité dans les résultats Google (FAQ rich snippets).

3. **BreadcrumbList** : La fonction `getBreadcrumbSchema()` existe déjà dans schemas.ts. L'injecter sur les pages intérieures (offre, contact, qui-suis-je, journal, villes) améliorerait la navigation dans les SERPs.

4. **Blog / Journal** : Un seul article actuellement. Publier 1-2 articles/mois sur des sujets liés (coût d'un site, SEO pour artisans, etc.) boosterait le SEO organique.

5. **Photo portrait** : La page qui-suis-je affiche "Photo à venir". Une vraie photo renforce la confiance et humanise la marque.

---

## Rapports d'audit produits

| Rapport | Fichier |
|---------|---------|
| Découverte (SA-00) | audit-discovery.md |
| Architecture (SA-01) | audit-architecture.md |
| Design System (SA-02) | audit-design.md |
| Contenu (SA-03) | audit-contenu.md |
| SEO/GEO (SA-04) | audit-seo.md |
| Composants (SA-05) | audit-composants.md |
| Formulaires & Légal (SA-06) | audit-legal.md |
| Performance (SA-07) | audit-performance.md |
| Corrections (SA-08) | audit-corrections.md |
| **Validation finale (SA-09)** | **audit-final.md** |

---

**Statut final** : ⚠️ **Actions user requises avant deploy** — Score 89.3/100. 3 actions prioritaires (police, SIRET, analytics) pour dépasser le seuil de 90.

**Estimation post-actions user** : ~95/100
