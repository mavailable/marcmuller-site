---
name: wf-assets-facebook
description: "Génère la page HTML d'assets Facebook pour un site client créé par l'agence Marc M. Produit 5 formats aux bonnes dimensions 2026 (couverture 1640×624, photo de profil 400×400, post portrait 1080×1350, post lien 1200×630, story 1080×1920) avec boutons de téléchargement PNG intégrés. Utilise tous les assets existants du projet (photos, OG images, screenshots, logo, favicon) encodés en base64 pour un fichier HTML autonome. Déclencher quand on dit 'assets Facebook', 'visuels Facebook', 'pack Facebook', 'images Facebook pour [client]', 'préparer le Facebook du client', 'créer les visuels Facebook', ou après la livraison d'un site client."
---

# WF-ASSETS-FACEBOOK — Générateur de visuels Facebook

> **Input** : Projet Astro d'un site client (chemin du dossier)
> **Output** : Fichier HTML autonome `facebook-assets.html` avec 5 formats + boutons de téléchargement

---

## Objectif

Générer un fichier HTML prêt à l'emploi que le client peut ouvrir dans Chrome et dont il peut télécharger chaque visuel en un clic. Les visuels utilisent la vraie charte graphique du site et les vraies photos/images du projet.

---

## Étape 1 — Lire le projet client

Même procédure que les autres skills assets :

### 1a — Données métier
- `src/data/business.ts` → nom, slogan, URL, téléphone, secteur, highlights
- `brief.md` (racine ou `docs/`) → contexte, proposition de valeur, cibles, ton
- `src/content/business.ts` ou `src/data/content.ts` en fallback

### 1b — Design system (couleurs)
- `src/styles/global.css` → `@theme {}` avec `--color-accent-*`, `--color-primary-*`
- `tailwind.config.*` → palette custom
- Fallback : classes Tailwind dans les composants

### 1c — Assets (inventaire exhaustif de `public/`)
- Images : hero, portrait, logo, projects/*.webp, og-*.png
- Icônes : favicon.svg, favicon-512.png
- Sélection : couverture (hero/OG) · profil (logo/favicon/portrait) · post (OG/screenshot) · story (portrait/hero)

### 1d — Encoder en base64

```bash
base64 -w 0 public/images/og-default.png  # Linux (Cowork)
```

MIME : `.png` → `image/png` · `.webp` → `image/webp` · `.jpg` → `image/jpeg` · `.svg` → `image/svg+xml`

Si >500KB : redimensionner avec PIL avant encodage.

---

## Étape 2 — Variables du visuel

```
businessName, tagline, sector, accentColor, accentHover, bgColor,
siteUrl, phone, highlight1/2/3, cta, deliveryLine
```

Adapter au secteur (artisan, resto, sécurité, pro libéral, tech…).

---

## Étape 3 — Générer le fichier HTML

### Dimensions exactes (specs Facebook mars 2026)

| # | Visuel | ID HTML | Taille DOM | Rendu PNG | Ratio | Note |
|---|--------|---------|------------|-----------|-------|------|
| ① | Couverture | `cover` | 1640×624px | 3280×1248px @2x | 2.63:1 | Affiché 820×312 desktop |
| ② | Photo de profil | `profile` | 400×400px | 800×800px @2x | 1:1 | Affiché en cercle |
| ③ | Post portrait | `post-portrait` | 540×675px | 1080×1350px @2x | 4:5 | **Format organique recommandé** |
| ④ | Post lien/pub | `post-link` | 1200×630px | 2400×1260px @2x | 1.91:1 | Format link preview & ads |
| ⑤ | Story | `story` | 1080×1920px | 1080×1920px @1x | 9:16 | DOM réduit via transform |

> **Changement 2026** : le format organique recommandé est passé de 1200×630 à **1080×1350 portrait** (ou 1080×1080 carré). Le 1200×630 reste optimal pour les aperçus de lien et les publicités.

### Affichage de la Story dans la page

La story fait 1080×1920px (trop grand pour la page). Technique :
```html
<div class="story-wrapper" style="width:405px;height:720px;overflow:hidden;position:relative;">
  <div id="story" style="width:1080px;height:1920px;transform:scale(0.375);transform-origin:top left;">
    <!-- Contenu pleine taille 1080×1920 -->
  </div>
</div>
```
**Capture** : capturer `#story` (pas le wrapper) avec `html2canvas scale: 1` → sortie 1080×1920px exacte.

### Nommage des fichiers

```
[slug]-facebook-couverture.png
[slug]-facebook-profil.png
[slug]-facebook-post-portrait.png
[slug]-facebook-post-lien.png
[slug]-facebook-story.png
```

---

## Étape 4 — Contenu de chaque visuel

### ① Photo de couverture (1640×624)

Format panoramique. Tronqué sur mobile → **contenu essentiel dans les 820px centraux**.

```
[Fond : hero/OG image + overlay dégradé, ou gradient accentColor → bgColor + grille]
[Contenu centré ou gauche, dans les 820px centraux :]
  Badge secteur (petit)
  businessName (très grande typo, ≥60px)
  tagline (≤18px, opacity 0.75)
  siteUrl (discret, bas-droit)
[Pills de valeur en bas-gauche]
```

### ② Photo de profil (400×400) — Cercle

Priorité : portrait > logo > favicon > initiales. Afficher carré + prévisualisation cercle côte à côte.

### ③ Post portrait (540×675 DOM → 1080×1350) — **Format organique principal**

Meilleur format pour le reach organique Facebook en 2026. Occupe plus de place dans le feed.

```
[En-tête]    Logo + nom + URL
[Corps]      Badge secteur
             Titre accrocheur (3-4 lignes, ≥24px)
             Description courte
             Séparateur coloré
             3-4 bullet points (dots accentColor)
[Pied]       Avatar + nom + rôle  |  CTA flèche
```

### ④ Post lien/publicité (1200×630) — Format link preview

Optimal pour partager un lien (l'aperçu Facebook utilise ce ratio). Layout split :

```
[Gauche 55%]                     [Droite 45%]
Badge secteur                    Screenshot ou OG image
Titre (2-3 lignes)               (rotation 2°, shadow)
Description
CTA + siteUrl
```

Si l'OG image du projet est aux bonnes dimensions → l'utiliser directement.

### ⑤ Story (1080×1920, affiché 405×720)

Structure 3 zones verticales :

```
[Zone haut — 30% = 576px]
  Portrait/hero en fond + overlay dégradé vers le bas
  Logo + businessName en overlay (en dehors de la zone UI 250px haut)

[Zone milieu — 40%]
  Fond sombre (bgColor)
  Accroche (font-size: 64px, bold)
  3 highlight cards (stat + label)

[Zone bas — 30% = 576px]
  CTA bouton (accentColor, pleine largeur)
  deliveryLine + siteUrl
  (en dehors de la zone UI 250px bas)
```

**Zones de sécurité** : pas de texte dans les 250px du haut ni 250px du bas (UI Facebook les recouvre).

---

## Étape 5 — JavaScript

```javascript
const VISUALS = [
  { id: 'cover',          filename: '[slug]-facebook-couverture.png',      scale: 2 },
  { id: 'profile',        filename: '[slug]-facebook-profil.png',          scale: 2 },
  { id: 'post-portrait',  filename: '[slug]-facebook-post-portrait.png',   scale: 2 },
  { id: 'post-link',      filename: '[slug]-facebook-post-lien.png',       scale: 2 },
  { id: 'story',          filename: '[slug]-facebook-story.png',           scale: 1 },
];

async function download(id, filename, scale) {
  const el = document.getElementById(id);
  const btn = document.querySelector('[onclick*="' + id + '"]');
  const originalText = btn ? btn.textContent : '';
  if (btn) { btn.classList.add('loading'); btn.textContent = 'Génération…'; }
  try {
    await document.fonts.ready;
    const opts = {
      scale: scale || 2,
      useCORS: true, allowTaint: false, backgroundColor: null, logging: false,
    };
    // Story : forcer la taille exacte
    if (id === 'story') { opts.width = 1080; opts.height = 1920; opts.backgroundColor = '#0D0D0D'; }
    const canvas = await html2canvas(el, opts);
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
    const v = VISUALS[i];
    try { await download(v.id, v.filename, v.scale); }
    catch(e) { console.error(v.id, e); }
    if (i < VISUALS.length - 1) await new Promise(r => setTimeout(r, 400));
  }
  if (btn) { btn.classList.remove('loading'); btn.textContent = originalText; }
}
```

---

## Étape 6 — UI Chrome

Label + badge dimension avant chaque visuel. Profil : carré + cercle côte à côte. Story : mention "⚠️ Affichée réduite (37.5%) — le PNG téléchargé est en pleine résolution 1080×1920." Bas de page : "Télécharger tout (5 PNG)".

---

## Règles qualité

- **Police** : Inter (Google Fonts, 400–900). Fallback `system-ui, sans-serif`
- **Fond** : sombre (#0D0D0D) par défaut sauf site explicitement clair
- **Contraste** : WCAG AA. Texte blanc sur sombre, dark sur clair
- **Images base64** : obligatoire, jamais de chemin relatif
- **Zone de sécurité couverture** : 820px centraux
- **Zone de sécurité story** : pas de texte dans les 250px haut et bas
- **Pas de lorem ipsum** : texte réel adapté au client
- **Logo Facebook** : ne JAMAIS inclure le logo/F de Facebook (violation guidelines)
- **Bouton loading** : sauvegarder/restaurer texte original

---

## Output

Sauvegarder `facebook-assets.html` à la racine du projet. Confirmer : "✅ `facebook-assets.html` — [N] assets utilisés. 5 formats prêts."
