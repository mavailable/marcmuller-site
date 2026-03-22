---
name: wf-assets-linkedin
description: "Génère la page HTML d'assets LinkedIn pour un site client créé par l'agence Marc M. Produit 5 formats aux bonnes dimensions 2026 (bannière 1584×396, photo de profil 400×400, post paysage 1200×627, post carré 1080×1080, post portrait 1080×1350) avec boutons de téléchargement PNG intégrés. Utilise tous les assets existants du projet (photos, OG images, screenshots, logo, favicon) encodés en base64 pour un fichier HTML autonome. Déclencher quand on dit 'assets LinkedIn', 'visuels LinkedIn', 'pack LinkedIn', 'images LinkedIn pour [client]', 'préparer le LinkedIn du client', 'créer les visuels LinkedIn', ou après la livraison d'un site client."
---

# WF-ASSETS-LINKEDIN — Générateur de visuels LinkedIn

> **Input** : Projet Astro d'un site client (chemin du dossier)
> **Output** : Fichier HTML autonome `linkedin-assets.html` avec 5 formats + boutons de téléchargement

---

## Objectif

Générer un fichier HTML prêt à l'emploi que le client peut ouvrir dans Chrome et dont il peut télécharger chaque visuel en un clic. Les visuels utilisent la vraie charte graphique du site et les vraies photos/images du projet.

---

## Étape 1 — Lire le projet client

Identifier le chemin du projet (fourni par l'utilisateur ou déductible du contexte). Lire dans cet ordre :

### 1a — Données métier (priorité haute)
- `src/data/business.ts` → nom, slogan, URL, téléphone, secteur, highlights
- `brief.md` (racine ou `docs/brief.md`) → contexte, proposition de valeur, cibles, ton
- `src/content/business.ts` si `src/data/business.ts` absent
- `src/data/content.ts` en fallback

### 1b — Design system (couleurs)
- `src/styles/global.css` → variables CSS dans `@theme {}` : `--color-accent-*`, `--color-primary-*`
- `tailwind.config.*` → palette custom
- Si absent : extraire les couleurs des composants Astro (classes `bg-[#xxx]`)

### 1c — Assets disponibles (inventaire exhaustif)
Scanner `public/` pour identifier :
```
public/
  images/
    hero.webp / hero.jpg       → image principale
    *.webp / *.png / *.jpg     → portrait, photos métier, galerie
    projects/*.webp            → screenshots de réalisations
    og-*.png / og-*.webp       → images Open Graph
  favicon.svg / favicon.png / favicon-512.png → icônes
  og-default.png              → OG par défaut
```

Sélectionner :
- **Image principale** : OG image > hero > screenshot le plus impactant
- **Logo/marque** : logo > favicon SVG > favicon-512.png > initiales colorées
- **Portrait** : photo du dirigeant si disponible
- **Screenshots** : pour visuels "portfolio" ou "résultats"

### 1d — Encoder les images en base64

```bash
# Environnement Linux (Cowork) — toujours -w 0 :
base64 -w 0 public/images/og-default.png
```

MIME : `.png` → `image/png` · `.webp` → `image/webp` · `.jpg` → `image/jpeg` · `.svg` → `image/svg+xml`

Si >500KB base64 : `from PIL import Image; img = Image.open("x.webp"); img.thumbnail((1200, 800)); img.save("/tmp/r.webp", "WEBP", quality=85)`

---

## Étape 2 — Définir les variables du visuel

```
businessName, tagline, sector, accentColor, accentHover, bgColor, textOnBg,
siteUrl, highlight1/2/3, cta, deliveryLine
```

Adapter les highlights au secteur. Pour les sites Marc M : inclure "100 Lighthouse" et "0€/mois".

---

## Étape 3 — Générer le fichier HTML

### Dimensions exactes (specs LinkedIn mars 2026)

| # | Visuel | ID HTML | Taille DOM | Rendu PNG @2x | Ratio |
|---|--------|---------|------------|---------------|-------|
| ① | Bannière profil | `banner` | 1584×396px | 3168×792px | 4:1 |
| ② | Photo de profil | `profile` | 400×400px | 800×800px | 1:1 cercle |
| ③ | Post paysage | `post-wide` | 1200×627px | 2400×1254px | 1.91:1 |
| ④ | Post carré | `post-sq` | 540×540px | 1080×1080px | 1:1 |
| ⑤ | Post portrait | `post-portrait` | 540×675px | 1080×1350px | 4:5 |

> **Safe zone bannière** : contenu essentiel dans les **1350×220 px centraux** — bords rognés sur mobile.

### Structure HTML

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>LinkedIn — Visuels [businessName]</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <style>/* Reset + body + Inter + UI chrome + visuels */</style>
</head>
<body>
  <!-- ① Bannière profil 1584×396 -->
  <!-- ② Photo de profil 400×400 (+ prévisualisation cercle) -->
  <!-- ③ Post paysage 1200×627 -->
  <!-- ④ Post carré 540×540 (rendu 1080×1080 @2x) -->
  <!-- ⑤ Post portrait 540×675 (rendu 1080×1350 @2x) -->
  <!-- Bouton "Tout télécharger (5 PNG)" -->
  <script>/* download(), downloadAll() */</script>
</body>
</html>
```

### Nommage des fichiers

```
[slug]-linkedin-banniere.png
[slug]-linkedin-profil.png
[slug]-linkedin-post-large.png
[slug]-linkedin-post-carre.png
[slug]-linkedin-post-portrait.png
```

---

## Étape 4 — Contenu de chaque visuel

### ① Bannière profil (1584×396) — 3 colonnes

```
[Col gauche ~420px]         [Col centre ~flex]           [Col droite ~280px]
Logo/nom + badge secteur    Headline (≥28px)             3-4 stats verticales
tagline                     2-3 pills de valeur          (valeur en accentColor)
```

- Portrait en fond col gauche avec overlay sombre (opacity 0.12) si disponible
- Fond : `bgColor` + grille de points (opacity 5-7%) + halo accentColor coin haut-droit
- **Headline ≥28px** minimum — bannière souvent vue petite
- **Safe zone** : rien d'essentiel dans les 120px latéraux

### ② Photo de profil (400×400) — Cercle

Priorité : portrait > logo > favicon > initiales. Afficher carré + prévisualisation cercle côte à côte.

### ③ Post paysage (1200×627) — Split 60/40

Gauche : badge secteur + titre + description + CTA. Droite : screenshot/OG image (rotation 2-3°, shadow). Overlay dégradé sur bord gauche image.

### ④ Post carré (540×540 → 1080×1080)

Option A stats (chiffre central géant) · Option B citation · Option C visuel plein fond.

### ⑤ Post portrait (540×675 → 1080×1350) — Meilleur reach organique

```
[En-tête]  Logo + nom + URL
[Corps]    Badge · Titre (≥24px) · Description · Séparateur · 3-4 bullets
[Pied]     Avatar + nom + rôle  |  Flèche CTA
```

---

## Étape 5 — JavaScript

```javascript
const VISUALS = [
  { id: 'banner',        filename: '[slug]-linkedin-banniere.png' },
  { id: 'profile',       filename: '[slug]-linkedin-profil.png' },
  { id: 'post-wide',     filename: '[slug]-linkedin-post-large.png' },
  { id: 'post-sq',       filename: '[slug]-linkedin-post-carre.png' },
  { id: 'post-portrait', filename: '[slug]-linkedin-post-portrait.png' },
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
    alert('Erreur. Vérifie zoom 100% (Cmd+0 / Ctrl+0).'); console.error(e);
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

Label + badge dimension avant chaque visuel. Photo profil : carré + cercle côte à côte. Bas de page : "Télécharger tout (5 PNG)".

---

## Règles qualité

- **Police** : Inter (Google Fonts, 400–900). Fallback `system-ui, sans-serif`
- **Fond** : préférer sombre (#0D0D0D ou bgColor)
- **Contraste** : WCAG AA minimum. Jamais gris clair sur gris clair
- **Cohérence** : `accentColor` uniforme (badges, stats, CTA, traits, halos)
- **Auto-contenu** : HTML autonome, ouvrable en file://, sans serveur
- **Pas de lorem ipsum** : texte réel adapté au métier
- **Images base64** : jamais de chemin relatif
- **Safe zone** : 1350×220px centraux pour la bannière
- **Police min** : 12px ; headline bannière ≥28px
- **Bouton loading** : sauvegarder/restaurer texte original

---

## Output

Sauvegarder `linkedin-assets.html` à la racine du projet. Confirmer : "✅ `linkedin-assets.html` — [N] assets utilisés. 5 formats prêts."
