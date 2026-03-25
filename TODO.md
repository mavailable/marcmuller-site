# TODO -- marcm.fr

> Audit complet (pipeline SA-00 a SA-07) du 2026-03-25 -- Score : 93/100

## Corrections appliquees dans cet audit

- [x] **P1** VilleTemplate : suppression double Header/Footer (deja inclus par BaseLayout)
- [x] **P1** VilleTemplate : suppression double `<main>` (BaseLayout fournit deja `<main id="main">`)
- [x] **P1** VilleTemplate hero : texte illisible (text-muted sur bg-dark) -- refait en dark hero coherent
- [x] **P1** VilleTemplate CTA : texte blanc sur fond clair (contraste WCAG fail) -- fond sombre uniforme
- [x] **P2** Typo Nancy : "vous gereurs seuls" corrige en "vous gerez seuls"
- [x] **P2** Header : lien "100 Vitrines" ouvrait en new tab (target="_blank") -- c'est un lien interne, corrige
- [x] **P2** Page 404 : title/description en anglais alors que lang=fr par defaut -- corrige en francais
- [x] **P2** BaseLayout : ajout `<meta name="author">` manquant (SEO)
- [x] **P3** Header : ajout `aria-hidden="true"` sur SVG hamburger/close (accessibilite)
- [x] **P3** Footer : ajout `aria-hidden="true"` sur SVG LinkedIn decoratif
- [x] **P3** Header mobile : ajout `aria-hidden="true"` sur SVG lien externe

## P1 -- Haute priorite

_Aucun probleme critique restant._

## P2 -- Moyenne priorite

- [ ] **Perf** Compresser `og-default.png` (267 Ko -> cible < 100 Ko) -- outil externe requis (squoosh, tinypng)
- [ ] **SEO** Verifier le numero de telephone affiche (+33 6 88 77 66 48) sur tous les canaux
- [ ] **Contenu** Enrichir les temoignages clients (2 avis Google actuellement, viser 5+)
- [ ] **SEO** Configurer Google Search Console et Bing Webmaster Tools
- [ ] **SEO** Ajouter des pages ville pour Colmar et Mulhouse (declares dans `areaServed` de business.ts)
- [ ] **Contenu** Pages ville Nancy/Strasbourg : les exemples clients semblent fictifs -- a remplacer par des cas reels ou a supprimer
- [ ] **Legal** Ajouter mention CNIL (droit de reclamation aupres de la CNIL) dans la politique de confidentialite

## P3 -- Basse priorite

- [ ] **A11y** Audit axe DevTools complet sur toutes les pages
- [ ] **Design** Considerer l'ajout d'un dark mode (Tailwind le supporte nativement)
- [ ] **Perf** Envisager le lazy loading des images du hero carousel (deja en `loading="lazy"` -- OK)
- [ ] **SEO** Ajouter un BreadcrumbList schema sur les pages du journal/blog
- [ ] **UX** Header language switcher : le dark pill (bg-neutral-800/50) est peu visible sur fond clair avant scroll -- envisager un style adaptatif

## Notes d'audit

### SA-00 Discovery
- Stack : Astro 5 + Tailwind CSS v4 + TypeScript strict + Cloudflare Pages
- 39 pages generees (FR + EN bilingue complet)
- Polices : Satoshi Variable (local, RGPD-safe)
- Analytics : Umami (self-hosted, sans cookie)
- Formulaires : Web3Forms (avec honeypot anti-spam)
- CSP : genere automatiquement avec hashes SHA-256

### SA-01 Architecture
- Structure propre : components/, layouts/, data/, pages/, styles/
- business.ts = source unique de verite (SSOT) -- bien
- Aliases TypeScript configures (@components, @layouts, @data, @styles)
- BaseLayout solide avec OG, Twitter Cards, hreflang, preload fonts

### SA-02 Design
- Palette 4 familles (Primary, Secondary, Accent, Neutral) x 11 nuances -- coherente
- Tokens semantiques (--color-accent, --color-bg, etc.) -- bien
- Echelle typographique complete (xs a 6xl)
- Contraste : OK sur fond clair, attention aux textes blanc/opacity sur fond sombre
- `prefers-reduced-motion` pris en charge -- excellent
- Print styles presents

### SA-03 Contenu
- Homepage : hero percutant, pain points, methode, FAQ, CTA -- bon tunnel de conversion
- 5 articles de blog de qualite (SEO, prix, erreurs, WordPress, blog)
- Pages ville (Nancy, Strasbourg, Metz) avec FAQ et schema LocalBusiness
- Page 100 Vitrines : landing page dediee, bien structuree
- Ton editorial : direct, authentique, bien adapte a la cible artisans/TPE

### SA-04 SEO
- Schema.org : WebSite (global), Person, LocalBusiness, FAQPage, Article, BreadcrumbList
- OG + Twitter Cards sur toutes les pages
- Sitemap auto avec i18n (fr/en) et exclusions (/merci, /thank-you, /graphistes, /designers)
- robots.txt : AI bots autorises (GPTBot, ClaudeBot, PerplexityBot), spam bots bloques
- llms.txt : present et bien structure
- hreflang : liens FR/EN avec x-default
- Canonical URLs : presentes

### SA-05 Composants
- Header : sticky, blur on scroll, mobile fullscreen menu, language switcher, a11y
- Footer : nav, social, mini CTA, legal links, copyright dynamique
- CTASection : 3 variantes (default, dark, accent), pattern decoratif
- Button : 4 variantes x 4 tailles, arrow option
- Card : 2 variantes, lien optionnel
- SectionTitle : badge, underline animation, h2/h3 configurable
- MobileCallButton : pulse animation, masque pres du footer
- VilleTemplate : template reutilisable pour pages geo-ciblees

### SA-06 Legal
- Mentions legales : editeur, directeur publication, hebergeur, SIRET, PI, responsabilite
- Politique de confidentialite : RGPD, durees de conservation, droits, cookies, tiers
- Formulaire : honeypot, checkbox RGPD obligatoire, base legale art. 6.1.a
- Page /merci : confirmation, prochaines etapes, contact direct
- Page 404 : bilingue (JS detect), liens utiles, tracking Umami

### SA-07 Performance
- Astro SSG : 0 JS par defaut, hydratation minimale
- Tailwind v4 : CSS minimal, tree-shaking
- Fonts : Satoshi Variable woff2 (preload)
- Images : toutes en WebP, tailles raisonnables (23-133 Ko sauf og-default.png)
- CSP strict avec hash SHA-256 (pas de unsafe-inline pour scripts)
- Security headers : HSTS, X-Frame-Options DENY, nosniff, Permissions-Policy
- Cache-Control : immutable sur /_astro/*, 1 jour favicon, 7 jours OG
- CompressHTML active dans Astro config
