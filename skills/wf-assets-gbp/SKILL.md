---
name: wf-assets-gbp
description: "Génère la page HTML d'assets Google Business Profile (GBP) pour un site client créé par l'agence Marc M. Produit 3 formats aux bonnes dimensions 2026 (photo de couverture 1024×575, logo 720×720, post GBP 1200×900) avec boutons de téléchargement PNG intégrés. Utilise tous les assets existants du projet (photos, OG images, screenshots, logo, favicon) encodés en base64 pour un fichier HTML autonome. Déclencher quand on dit 'assets GBP', 'visuels Google Business', 'pack Google Business Profile', 'images Google Maps', 'photos Google My Business', 'préparer la fiche Google du client', ou après la livraison d'un site client."
---

# WF-ASSETS-GBP — Générateur de visuels Google Business Profile

> **Input** : Projet Astro d'un site client (chemin du dossier)
> **Output** : Fichier HTML autonome `gbp-assets.html` avec 3 formats + boutons de téléchargement

---

## Objectif

Générer un fichier HTML prêt à l'emploi que le client peut ouvrir dans Chrome et dont il peut télécharger chaque visuel en un clic. Les visuels alimentent la fiche Google Business Profile (ex-Google My Business) du client pour Google Maps et la recherche locale.

---

## Étape 1 — Lire le projet client

### 1a — Données métier
- `src/data/business.ts` → nom, slogan, URL, téléphone, secteur, highlights, areaServed
- `brief.md` (racine ou `docs/`) → contexte, proposition de valeur, cibles, ton
- `src/content/business.ts` ou `src/data/content.ts` en fallback

### 1b — Design system (couleurs)
- `src/styles/global.css` → `@theme {}` avec `--color-accent-*`, `--color-primary-*`
- `tailwind.config.*` → palette custom
- Fallback : classes Tailwind dans les composants

### 1c — Assets (inventaire exhaustif de `public/`)
- Images : hero, portrait, logo, projects/*.webp, og-*.png
- Icônes : favicon.svg, favicon-512.png
- Sélection : couverture (hero/OG) · logo (logo/favicon/initiales) · post (screenshot/OG/photo métier)

### 1d — Encoder en base64

```bash
base64 -w 0 public/images/og-default.png  # Linux (Cowork)
```

MIME : `.png` → `image/png` · `.webp` → `image/webp` · `.jpg` → `image/jpeg` · `.svg` → `image/svg+xml`

Si >500KB : redimensionner avec PIL.

---

## Étape 2 — Variables du visuel

```
businessName, tagline, sector, accentColor, bgColor,
siteUrl, phone, areaServed, highlight1/2/3, cta
```

**Adapter les highlights au secteur :**
- Artisan BTP : certifications (RGE, QualiPAC), zone, années d'expérience
- Sécurité/alarme : commerces protégés, délai d'intervention, certifications
- Restauration : spécialité, horaires, livraison
- Pro libéral : spécialité, mode consultation, prise de RDV
- Web/Tech : score perf, délai livraison, tarif

---

## Étape 3 — Générer le fichier HTML

### Dimensions exactes (specs GBP mars 2026)

| # | Visuel | ID HTML | Taille DOM | Rendu PNG @2x | Ratio | Note |
|---|--------|---------|------------|---------------|-------|------|
| ① | Couverture | `cover` | 1024×575px | 2048×1150px | 16:9 | Photo principale de la fiche |
| ② | Logo | `logo` | 720×720px | 1440×1440px | 1:1 | Affiché en miniature ronde sur Maps |
| ③ | Post GBP | `post` | 1200×900px | 2400×1800px | 4:3 | Publications / actualités |

> **⚠️ Post GBP = 4:3 (pas carré)** : Google affiche les posts GBP en 4:3. Un post carré sera recadré. Les images doivent avoir un ratio 4:3. Zone de sécurité : garder le contenu essentiel dans les **900×900px centraux** (le recadrage carré sur mobile coupe les bords).

> **Logo 720×720** : le minimum accepté est 250×250, mais Google recommande 720×720 pour une bonne qualité d'affichage. Affiché en cercle (ou petit carré arrondi) sur Google Maps.

### Structure HTML

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Google Business Profile — Visuels [businessName]</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <style>/* ... */</style>
</head>
<body>
  <!-- ① Photo de couverture 1024×575 -->
  <!-- ② Logo 720×720 (+ prévisualisation cercle) -->
  <!-- ③ Post GBP 1200×900 -->
  <!-- Bouton "Tout télécharger (3 PNG)" -->
  <script>/* download(), downloadAll() */</script>
</body>
</html>
```

### Nommage des fichiers

```
[slug]-gbp-couverture.png
[slug]-gbp-logo.png
[slug]-gbp-post.png
```

---

## Étape 4 — Contenu de chaque visuel

### ① Photo de couverture (1024×575) — 16:9

Première image que voient les visiteurs sur Google Maps et la recherche Google.

```
[Fond : hero image / OG image + overlay dégradé gauche→droite]
[Contenu aligné gauche, centré verticalement :]
  Logo/marque (petit)
  businessName (grande typo, ≥48px, blanche)
  tagline (≤16px, opacity 0.75)
  Zone géographique en badge pill (areaServed)
  siteUrl (discret, bas-droit)
```

- Si image disponible : fond plein + overlay dégradé (gauche 80% opaque → droite 30%)
- Sinon : gradient accentColor → bgColor + grille de points
- **Zone de sécurité** : les 90px du haut et du bas peuvent être tronqués — centrer le contenu
- Texte lisible même réduit : police grande, contraste fort

### ② Logo (720×720) — Miniature ronde

Affiché comme miniature ronde sur Google Maps. Doit être lisible même en 32×32px.

**Priorité des assets :**
1. Logo SVG/PNG du client → centré sur fond uni (accentColor ou blanc)
2. Favicon haute résolution (512 ou 192) → centré avec padding
3. Initiales du businessName en typo massive sur fond accentColor

**Layout :**
```
[Fond uni accentColor ou gradient court]
[Logo ou initiales centré(es)]
```

Pas de texte additionnel — trop petit. Prévisualisation cercle côte à côte.

### ③ Post GBP (1200×900) — Format 4:3

Les posts GBP sont un levier de SEO local puissant. Ils apparaissent dans la fiche et sur Maps.

**Zone de sécurité** : contenu essentiel dans les 900×900px centraux (recadrage carré possible sur mobile).

**Layout "Services/Résultats" (recommandé) :**
```
[En-tête — 15%]
  Logo + businessName + areaServed (en pills)

[Corps — 60%]
  Stat principale ou accroche (font-size très grande, centrée)
  Trait coloré accentColor
  2-3 highlights en cards ou bullets
  Screenshot du site ou photo métier en arrière-plan (overlay 70%) si disponible

[Pied — 25%]
  CTA bouton (fond accentColor, pleine largeur)
  phone + siteUrl
```

**Layout "Présentation" (pour artisans/commerçants) :**
```
[Haut] Badge secteur
[Milieu] businessName (grande typo) + tagline
         Image de fond (hero/OG/screenshot, overlay 70%)
[Bas] Zone géo + CTA + siteUrl
```

---

## Étape 5 — JavaScript

```javascript
const VISUALS = [
  { id: 'cover', filename: '[slug]-gbp-couverture.png' },
  { id: 'logo',  filename: '[slug]-gbp-logo.png' },
  { id: 'post',  filename: '[slug]-gbp-post.png' },
];

async function download(id, filename) {
  const el = document.getElementById(id);
  const btn = document.querySelector('[onclick*="' + id + '"]');
  const originalText = btn ? btn.textContent : '';
  if (btn) { btn.classList.add('loading'); btn.textContent = 'Génération…'; }
  try {
    await document.fonts.ready;
    const canvas = await html2canvas(el, {
      scale: 2, useCORS: true, allowTaint: false, backgroundColor: null, logging: false,
    });
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png', 1.0);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  } catch(e) {
    alert('Erreur. Vérifie zoom 100%.'); console.error(e);
  } finally {
    if (btn) { btn.classList.remove('loading'); btn.textContent = originalText; }
  }
}

async function downloadAll() {
  const btn = document.querySelector('[onclick="downloadAll()"]');
  const originalText = btn ? btn.textContent : '';
  if (btn) { btn.classList.add('loading'); btn.textContent = 'Génération…'; }
  for (let i = 0; i < VISUALS.length; i++) {
    try { await download(VISUALS[i].id, VISUALS[i].filename); }
    catch(e) { console.error(VISUALS[i].id, e); }
    if (i < VISUALS.length - 1) await new Promise(r => setTimeout(r, 400));
  }
  if (btn) { btn.classList.remove('loading'); btn.textContent = originalText; }
}
```

---

## Étape 6 — UI Chrome

Label + badge dimension + ratio avant chaque visuel. Logo : carré + prévisualisation cercle côte à côte. Post : mention "⚠️ Google peut recadrer en carré sur mobile — le contenu essentiel est dans la zone centrale 900×900." Bas de page : "Télécharger tout (3 PNG)".

---

## Règles qualité

- **Police** : Inter (Google Fonts, 400–900). Fallback `system-ui, sans-serif`
- **Fond** : sombre (#0D0D0D) ou hero image pour l'impact
- **Contraste** : WCAG AA. Texte lisible même réduit (visuels GBP souvent petits sur mobile)
- **Images base64** : obligatoire, jamais de chemin relatif
- **Lisibilité** : polices grandes, peu de texte — les visuels GBP sont vus en miniature
- **Pas de lorem ipsum** : texte réel adapté au métier
- **Logo Google** : ne JAMAIS inclure le logo Google ou Google Maps (trademark)
- **Post 4:3** : zone de sécurité 900×900 centraux (recadrage carré mobile)
- **Couverture 16:9** : zone de sécurité hors 90px haut et bas
- **Bouton loading** : sauvegarder/restaurer texte original

---

## Output

Sauvegarder `gbp-assets.html` à la racine du projet. Confirmer : "✅ `gbp-assets.html` — [N] assets utilisés. 3 formats prêts."
