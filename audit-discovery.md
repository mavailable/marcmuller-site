# Audit Discovery — marcmuller.fr (MM Agency)

**Date** : 2026-03-16
**URL** : https://marcmuller.fr
**Objectif** : Amélioration globale (audit complet)
**État du site** : En maintenance (non accessible en ligne — audit basé sur le code source)

---

## Informations de base

| Donnée | Valeur |
|--------|--------|
| Langue | fr |
| Pays cible | FR (Grand Est, Strasbourg) |
| Type de client | freelance-consultant (propre site vitrine) |
| Framework | Astro 5.7.0 |
| CSS | Tailwind CSS 4.0.0 (v4 avec `@theme`) |
| Hébergement | Cloudflare Pages |
| TypeScript | Oui (strict) |
| Build | Vite (via Astro) |
| Output | Static (`output: 'static'`) |
| Domaine | marcmuller.fr |
| Email | marc@muller.im |

---

## Structure du projet

### Pages

| Route | Fichier | H1 | Meta description |
|-------|---------|-----|-----------------|
| `/` | src/pages/index.astro | ✅ "Le site que vous auriez fait si vous saviez coder." | ✅ Présente |
| `/realisations` | src/pages/realisations.astro | ✅ "Mes réalisations" | ✅ Présente |
| `/offre` | src/pages/offre.astro | ✅ Présent | ✅ Présente |
| `/contact` | src/pages/contact.astro | ✅ "Parlons de votre projet" | ✅ Présente |
| `/qui-suis-je` | src/pages/qui-suis-je.astro | ✅ "Marc Muller — créateur de sites web sur mesure" | ✅ Présente |
| `/mentions-legales` | src/pages/mentions-legales.astro | ✅ "Mentions légales" | ✅ Présente |
| `/politique-confidentialite` | src/pages/politique-confidentialite.astro | ✅ "Politique de confidentialité" | ✅ Présente |
| `/404` | src/pages/404.astro | ✅ "Oups, cette page n'existe pas" | ✅ Présente |
| `/merci` | src/pages/merci.astro | ✅ "Message reçu !" | ✅ Présente |
| `/journal` | ❌ N'EXISTE PAS | — | — |
| `/ville/*` | ❌ Aucune page locale | — | — |

### Composants

| Composant | Fichier | Utilisé dans |
|-----------|---------|-------------|
| BaseLayout | src/layouts/BaseLayout.astro | Toutes les pages |
| Header | src/components/Header.astro | BaseLayout |
| Footer | src/components/Footer.astro | BaseLayout |
| Button | src/components/Button.astro | index, merci, qui-suis-je |
| SectionTitle | src/components/SectionTitle.astro | index, qui-suis-je |

### Assets

| Type | Nombre | Taille totale | Problèmes |
|------|--------|---------------|-----------|
| Images projets | 9 PNG | ~5.7 Mo | la-grange-aux-fees.png = 2.2 Mo (trop lourd), toutes en PNG (pas de WebP/AVIF) |
| Polices | 0 fichiers | 0 Ko | ❌ Dossier vide (seulement README.md) — Satoshi-Variable.woff2 MANQUANT |
| Favicon | 1 SVG (255 o) | ✅ | OK |
| OG Image | ❌ MANQUANT | — | og-default.png référencé dans BaseLayout mais n'existe pas |
| Fichiers parasites | 1 | — | test.txt dans public/images/projects/ |

### Données et configuration

| Fichier | État | Notes |
|---------|------|-------|
| astro.config.mjs | ✅ | Sitemap intégré, site: marcmuller.fr |
| tsconfig.json | ✅ | Strict |
| package.json | ✅ | Astro 5.7.0, Tailwind 4.0.0 |
| robots.txt | ✅ | Autorise GPTBot, ClaudeBot, PerplexityBot. Bloque MJ12bot, AhrefsBot, SemrushBot |
| llms.txt | ⚠️ | Existe mais contenu OBSOLÈTE (pricing 2-tier, email incorrect) |
| sitemap | ✅ | Via @astrojs/sitemap |
| .env | Aucun | Pas de variables d'environnement |
| wrangler.toml | Aucun | Pas de config Cloudflare spécifique |
| site-config.json | ✅ | Données business de base |

---

## État actuel par domaine

### SEO

| Élément | État | Détails |
|---------|------|---------|
| Meta title | ✅ | Présent sur toutes les pages |
| Meta description | ✅ | Présente sur toutes les pages |
| Schema JSON-LD | ❌ ABSENT | Aucun composant SchemaOrg, aucun fichier schemas.ts, aucune donnée structurée |
| OG tags | ⚠️ | Tags présents dans BaseLayout mais og:image pointe vers fichier inexistant |
| Twitter cards | ⚠️ | Tags présents mais image manquante |
| sitemap.xml | ✅ | Généré automatiquement par @astrojs/sitemap |
| robots.txt | ✅ | Bien configuré avec bots IA autorisés |
| llms.txt | ⚠️ | Existe mais pricing obsolète (2-tier au lieu de 3-tier Essentiel/Multi-pages/Sur mesure) et email incorrect (contact@marcmuller.fr au lieu de marc@muller.im) |
| Canonical | ✅ | Généré dynamiquement dans BaseLayout |
| lang="fr" | ✅ | Correct |
| Pages ville SEO local | ❌ | Aucune page /ville/strasbourg etc. |

### Design & Accessibilité

| Élément | État | Détails |
|---------|------|---------|
| Responsive | ✅ | viewport meta présent, classes responsive Tailwind |
| Contraste WCAG AA | ⚠️ À vérifier | text-white/50 sur fond sombre (hero index) peut être insuffisant |
| Skip-to-content | ✅ | .skip-link dans BaseLayout |
| Alt-text images | ✅ | Toutes les images ont un alt descriptif |
| Focus visible | ✅ | Styles :focus-visible définis dans global.css |
| Touch targets 44px | ⚠️ | Certains liens dans le footer semblent petits |
| Polices | ⚠️ | Satoshi chargée via CDN Fontshare (backup) mais @font-face locale pointe vers fichier inexistant |

### Legal & RGPD

| Élément | État | Détails |
|---------|------|---------|
| Mentions légales | ⚠️ | Page présente mais SIRET/SIREN manquant |
| Politique confidentialité | ✅ | Complète et détaillée, droits RGPD listés |
| Bannière cookies | ✅ Non nécessaire | Pas de cookies de tracking (Cloudflare Analytics = cookieless) |
| RGPD mention formulaire | ✅ | Case à cocher consentement présente |
| Typo | ⚠️ | "banneau" au lieu de "bannière" dans politique-confidentialite |

### Formulaire de contact

| Élément | État | Détails |
|---------|------|---------|
| Formulaire présent | ✅ | Web3Forms intégré |
| Anti-spam (honeypot) | ✅ | Champ botcheck caché |
| Champs requis | ✅ | Prénom, email, activité, message (required) |
| Validation client | ✅ | minlength=20 sur message |
| URL de redirection | ❌ INCORRECT | Pointe vers `https://marcmuller.im/merci` au lieu de `https://marcmuller.fr/merci` |
| Options formule | ❌ OBSOLÈTE | "Site Express (490€)" et "Sur mesure (À partir de 1 490€)" au lieu de Essentiel/Multi-pages/Sur mesure |
| Page /merci | ✅ | Présente avec CTA de redirection |

### Performance

| Élément | État | Détails |
|---------|------|---------|
| Analytics | ❌ Commenté | Cloudflare Web Analytics dans BaseLayout mais commenté (ligne 44-45) |
| Polices locales | ❌ | Fichier .woff2 manquant — fallback CDN uniquement |
| Images optimisées | ❌ | Toutes en PNG, pas de WebP/AVIF. la-grange-aux-fees.png = 2.2 Mo |
| CSS minifié | ✅ | Via Tailwind/Vite build |
| HTML compressé | ✅ | Via Astro build |
| Preconnect | ✅ | Fontshare CDN |

---

## Problèmes détectés

### Critiques (bloquants)

1. **Pas de Schema.org JSON-LD** — Aucune donnée structurée sur le site. Pas de composant SchemaOrg, pas de fichier schemas.ts. Impact SEO majeur.
2. **OG image manquante** — `/og-default.png` référencé dans BaseLayout mais le fichier n'existe pas. Partage social cassé.
3. **URL de redirection formulaire incorrecte** — Le formulaire redirige vers `marcmuller.im/merci` au lieu de `marcmuller.fr/merci`. Les soumissions de formulaire aboutissent à une erreur 404.
4. **Fichiers de police manquants** — `public/fonts/Satoshi-Variable.woff2` n'existe pas. Le CSS `@font-face` référence un fichier vide. Dépendance totale au CDN Fontshare (point de défaillance unique).

### Majeurs

5. **llms.txt obsolète** — Pricing 2-tier (Express 490€ / Sur mesure 1490€) au lieu de 3-tier (Essentiel / Multi-pages / Sur mesure). Email incorrect : `contact@marcmuller.fr` au lieu de `marc@muller.im`.
6. **Options formulaire contact obsolètes** — Le select "Formule envisagée" propose Express/Sur mesure au lieu du nouveau modèle 3-tier.
7. **Textes index.astro obsolètes** — CTA final dit "Site Express ou un projet sur mesure" — ne reflète pas les 3 offres actuelles.
8. **Textes merci.astro obsolètes** — Mentionne "Site Express ou Sur mesure".
9. **Page /journal inexistante** — Lien dans Header et Footer pointe vers une page qui n'existe pas → 404.
10. **Image la-grange-aux-fees.png = 2.2 Mo** — Beaucoup trop lourde. Devrait être < 300 Ko en WebP.
11. **Toutes les images en PNG** — Aucune optimisation WebP/AVIF. Total ~5.7 Mo pour 9 images.
12. **Analytics commenté** — Cloudflare Web Analytics est dans le code mais commenté. Aucun tracking actif.
13. **Photo qui-suis-je manquante** — Placeholder "Photo à venir" au lieu d'une vraie photo.
14. **404 page liens cassés** — Les liens pointent vers `/#realisations`, `/#offre`, `/#contact` (ancres sur index) au lieu des vraies pages `/realisations`, `/offre`, `/contact`.
15. **Politique confidentialité incohérence** — Mentionne Web3Forms pour le formulaire mais dit "stockés chez Cloudflare" pour les données formulaire.

### Mineurs

16. **Pas de webmanifest** — Pas de `site.webmanifest` ni de lien dans le `<head>`.
17. **Pas de pages ville SEO local** — Aucune page `/ville/strasbourg`, `/ville/colmar` etc. pour le SEO local.
18. **Typo politique-confidentialite** — "banneau" au lieu de "bannière" (ligne 186).
19. **Fichier test.txt parasite** — `public/images/projects/test.txt` à supprimer.
20. **Mentions légales incomplètes** — SIRET/SIREN non mentionné (obligatoire pour un auto-entrepreneur en France).
21. **Pas de `theme-color` dans webmanifest** — Présent dans meta mais pas de manifest.
22. **public/fonts/README.md** — Fichier placeholder inutile.
23. **Qui-suis-je cohérence tutoiement/vouvoiement** — Mélange tu/vous dans la section "Convictions" (ex: "Je te dis les prix" vs vouvoiement ailleurs).

---

## Prochaines étapes recommandées

| Étape | Skill | Estimation | Priorité |
|-------|-------|------------|----------|
| Architecture | sa-01-architecture | 6 points à corriger (polices, config, fichiers parasites) | Haute |
| Design | sa-02-design | 3 points (contraste text-white/50, opacités, touch targets) | Moyenne |
| Contenu | sa-03-contenu | 8 points (textes obsolètes pricing, cohérence tu/vous, typos, page journal) | Haute |
| SEO | sa-04-seo | 7 points (Schema.org complet, OG image, llms.txt, pages ville) | Critique |
| Composants | sa-05-composants | 4 points (404 liens, images optimisation, photo qui-suis-je) | Moyenne |
| Legal | sa-06-legal | 5 points (SIRET, redirect formulaire, options formulaire, incohérence politique) | Haute |
| Performance | sa-07-performance | 5 points (images WebP, polices locales, analytics, preload) | Haute |

---

## Score initial estimé

| Domaine | Score | Max |
|---------|-------|-----|
| Architecture & config | 7 | 15 |
| Design & accessibilité | 11 | 15 |
| Contenu | 8 | 15 |
| SEO & données structurées | 5 | 20 |
| Legal & RGPD | 10 | 15 |
| Performance | 6 | 10 |
| Formulaire & conversion | 5 | 10 |
| **TOTAL** | **~52** | **100** |

**Score cible : ≥ 90/100**

---

## Audit Gate — Score /50

| Critère | Points | Vérification |
|---------|--------|-------------|
| Tech stack identifié (framework, CSS, hébergement) | 10/10 | Astro 5.7.0, Tailwind v4, Cloudflare Pages, TypeScript ✅ |
| Structure complète (pages, composants, assets) | 10/10 | 9 pages, 5 composants, 9 images, configs documentés ✅ |
| État SEO documenté (meta, Schema, OG, sitemap) | 10/10 | Chaque item ✅ ou ❌ documenté ✅ |
| État legal/RGPD documenté | 5/5 | Mentions, politique, cookies, formulaire vérifiés ✅ |
| Problèmes classés par criticité | 10/10 | 4 critiques, 11 majeurs, 8 mineurs ✅ |
| Prochaines étapes estimées | 5/5 | Chaque skill sa-01→07 avec estimation ✅ |
| **TOTAL** | **50/50** | **Seuil atteint ✅** |

**→ Prêt pour sa-01-architecture**
