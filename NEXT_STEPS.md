# Prochaines étapes - Refonte visuelle

## Phase 1: Setup & Build ⚠️ À faire

### 1. Installer la font Satoshi
- [ ] Télécharger `Satoshi-Variable.woff2` depuis https://www.fontshare.com/fonts/satoshi
- [ ] Placer le fichier dans `/public/fonts/`
- [ ] Vérifier que la police se charge correctement sur le site

### 2. Réinstaller les dépendances
```bash
cd "/sessions/bold-exciting-knuth/mnt/web factory/projets/marcmuller-site"
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 3. Vérifier le build
```bash
npm run build
# Vérifier qu'il n'y a pas d'erreurs de compilation
```

### 4. Tester en local
```bash
npm run dev
# Ouvrir http://localhost:3000
# Tester tous les pages
```

---

## Phase 2: Mise à jour des pages ⚠️ À faire

### Pages à vérifier/mettre à jour:

#### 1. Home (`src/pages/index.astro`)
- [ ] Utiliser les nouveau composants Button, Card, SectionTitle, CTASection
- [ ] Ajouter les `badge` props aux SectionTitle
- [ ] Remplacer les emojis par les `iconSvg` dans les Card
- [ ] Tester les animations (scroll effects)

#### 2. Offre (`src/pages/offre.astro`)
- [ ] Utiliser Card avec `variant="highlight"` pour les points clés
- [ ] Ajouter badge "Notre offre" aux SectionTitle
- [ ] Utiliser CTASection avec `variant="accent"` et `reassurance`

#### 3. Réalisations (`src/pages/realisations.astro`)
- [ ] Mettre à jour les cards de projets
- [ ] Ajouter `href` aux Card pour liens vers projets individuels
- [ ] Badge "Réalisations" optionnel

#### 4. Journal (`src/pages/journal/index.astro`)
- [ ] Mettre en place la nouvelle styling
- [ ] Tester les animations sur articles

#### 5. Pages locales (`creation-site-web-*.astro`)
- [ ] Utiliser les nouveaux composants
- [ ] Vérifier l'accessibilité

#### 6. Contact (`src/pages/contact.astro`)
- [ ] Utiliser CTASection avec variant "dark"
- [ ] Tester le formulaire avec les nouveaux styles

#### 7. Pages légales
- [ ] Tester le prose styling (articles longs)
- [ ] Vérifier la readabilité

---

## Phase 3: Optimisation des icons ⚠️ À faire

### Icons SVG à créer pour Card:

```astro
// Exemples à ajouter dans les Card appels

// Icon Design
const designIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5a2 2 0 00-1 3.75A4 4 0 0023 12" />
</svg>`;

// Icon Performance
const performanceIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
</svg>`;

// Icon Maintenance
const maintenanceIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
</svg>`;

// Icon SEO
const seoIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>`;

// Icon Support
const supportIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>`;
```

### Pour chaque page:
- [ ] Créer les icons SVG spécifiques
- [ ] Utiliser la même couleur `currentColor` (accepte text-[var(--color-accent)])
- [ ] S'assurer que les proportions 24x24 sont respectées
- [ ] Tester le rendu sur tous les appareils

---

## Phase 4: Tests & Validation ✓ À commencer

### Tests fonctionnels:
- [ ] Tests sur Chrome, Firefox, Safari, Edge
- [ ] Tests responsifs (mobile, tablette, desktop)
- [ ] Tests des animations (smooth, pas de saccade)
- [ ] Tests des liens (tous les href fonctionnent)

### Tests d'accessibilité:
- [ ] Test au clavier (Tab, Enter)
- [ ] Test des focusables (outline visible)
- [ ] Test de contraste (WCAG AA)
- [ ] Test des screen readers (NVDA, JAWS)

### Tests de performance:
- [ ] Lighthouse score
- [ ] Core Web Vitals
- [ ] LCP (Largest Contentful Paint)
- [ ] CLS (Cumulative Layout Shift)

### Outils:
```bash
# Lighthouse local
npm run build
npm run dev
# Ouvrir DevTools > Lighthouse
```

---

## Phase 5: Ajustements visuels ⚠️ À faire au besoin

### Si besoin d'ajustements:

#### Couleurs
- Modifier dans `src/styles/global.css` @theme
- Recompiler avec `npm run build`

#### Animations
- Modifier les keyframes dans `global.css`
- Ou les transitions dans les composants Astro

#### Spacing
- Variables dans `--spacing-*` du @theme
- Ou utiliser Tailwind classes (px-6, py-8, etc.)

#### Fonts
- Satoshi pour headings + body
- Fallback à system-ui si Satoshi ne charge pas

---

## Phase 6: Déploiement ⚠️ À faire après validation

### Build production:
```bash
npm run build
```

### Vérifier le build output:
```bash
ls -la dist/
# Vérifier que tous les assets sont présents
# Vérifier que /fonts/ contient Satoshi-Variable.woff2
```

### Déployer sur le serveur:
```bash
# Selon votre hosting (Netlify, Vercel, etc.)
# Ou copier le dossier dist/ via FTP/SSH
```

### Post-déploiement:
- [ ] Vérifier le site live
- [ ] Tester les animations au vrai
- [ ] Vérifier la performance (Google PageSpeed)
- [ ] Checker les Core Web Vitals
- [ ] Tester sur appareils réels

---

## Phase 7: Maintenance future ✓ À savoir

### Maintenir la refonte:

1. **Ajouter de nouvelles pages**
   - Importer `BaseLayout.astro` pour header/footer/mobile-call-button
   - Utiliser les composants Button, Card, SectionTitle, CTASection
   - Respecter les couleurs du @theme

2. **Modifier un composant**
   - Faire dans `src/components/*.astro`
   - Recompiler avec `npm run build`
   - Tester les side effects

3. **Ajouter une nouvelle animation**
   - Ajouter le @keyframes dans `global.css`
   - Créer une classe `.animate-*`
   - Utiliser dans les composants

4. **Changer les couleurs globalement**
   - Modifier dans `src/styles/global.css` @theme
   - Toutes les références var(--color-*) se mettront à jour
   - Recompiler

---

## Checklist finale

### Avant go live:
- [ ] Build sans erreurs ✓
- [ ] Tous les liens fonctionnent ✓
- [ ] Animations smooth sur tous les navigateurs ✓
- [ ] Responsive sur mobile/tablet/desktop ✓
- [ ] Tous les composants utilisés correctement ✓
- [ ] Satoshi Variable chargée et visible ✓
- [ ] Accessibility tests passés ✓
- [ ] Performance OK (Lighthouse > 90) ✓
- [ ] SVG icons visibles et bien colorés ✓
- [ ] Mobile call button visible et fonctionnel ✓
- [ ] Footer avec copyright dynamique ✓
- [ ] Header avec animations au scroll ✓

---

## Contacts/Support

- **CSS**: Voir `src/styles/global.css`
- **Composants**: Voir `src/components/`
- **Exemples**: Voir `EXAMPLES_COMPOSANTS.md`
- **Détails techniques**: Voir `REFONTE_VISUELLE.md`

**Bon courage! 🚀**
