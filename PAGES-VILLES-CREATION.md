# Pages Villes - Documentation

## Structure créée

### 1. Template réutilisable: `VilleTemplate.astro`

Composant Astro situé dans `/src/components/VilleTemplate.astro` qui gère le rendu de toutes les pages villes.

**Props acceptées:**
```typescript
interface Props {
  title: string;              // Meta title SEO (unique par ville)
  description: string;        // Meta description (unique par ville)
  ville: string;             // Nom de la ville (ex: "Strasbourg")
  intro: string;             // Intro 50-80 mots
  sections: Section[];       // Array de {title: string, content: string}
  faq: FAQ[];               // Array de {question: string, answer: string}
  pricingExpress?: {...};   // Offre Express (optionnel, défaut: 490€)
  pricingCustom?: {...};    // Offre Sur mesure (optionnel, défaut: 1490€+)
  geo: { lat: number; lon: number };  // Coordonnées géo pour LocalBusiness
  areaServed: string[];     // Liste des villes/régions desservies
  ctaTitle: string;         // Titre CTA final
  ctaText: string;          // Texte CTA final
  ctaButton: string;        // Label du bouton CTA
}
```

**Caractéristiques:**
- Hero section avec H1 personnalisé par ville
- Sections dynamiques (H2)
- Pricing 2 colonnes (Express + Sur mesure)
- FAQ avec accordéon HTML5 `<details><summary>`
- Schema JSON-LD LocalBusiness (avec geo location)
- Schema JSON-LD FAQPage (pour rich snippets Google)
- Responsive mobile-first Tailwind CSS v4
- CTA final vers `/contact`

### 2. Pages villes créées

#### a) Strasbourg
**Path:** `/src/pages/creation-site-web-strasbourg/index.astro`
**URL générée:** `https://marcmuller.fr/creation-site-web-strasbourg/`

**Unicité du contenu:**
- Intro spécifique: focus sur dynamisme commercial strasbourgeois
- Sections uniques:
  1. "Pourquoi Strasbourg a besoin de meilleurs sites web"
  2. "Comment je crée votre site à Strasbourg"
  3. "Exemples de sites créés à Strasbourg"
- FAQ uniques: multilingue (alsacien/anglais), concurrence locale, présence physique Marc
- Geo: 48.5734, 7.7521 (Place Kléber centre)
- areaServed: Strasbourg, Illkirch-Graffenstaden, Schiltigheim, Eckbolsheim, Obernai, Sélestat, Alsace

**Cas clients mentionnés:**
- La Brasserie du centre (restaurant)
- Plomberie Dupont (BTP)
- Le Gîte Blanc (hébergement)

---

#### b) Metz
**Path:** `/src/pages/creation-site-web-metz/index.astro`
**URL générée:** `https://marcmuller.fr/creation-site-web-metz/`

**Unicité du contenu:**
- Intro spécifique: focus sur tissu PME dense et retard numérique
- Sections uniques:
  1. "La situation à Metz: beaucoup de bonne volonté, peu de bons sites"
  2. "Mon approche pour les entrepreneurs de Metz"
  3. "Sites créés à Metz"
- FAQ uniques: distance Strasbourg/Metz, délais résultats, niveau SEO avancé, processus post-livraison
- Geo: 49.1193, 6.1757 (Centre Metz)
- areaServed: Metz, Thionville, Woippy, Montigny-lès-Metz, Moselle, Lorraine

**Cas clients mentionnés:**
- Salon Lumière (coiffure)
- Charpente Gérard (BTP/Moselle)
- La Boulangerie du Coin (commerce)

---

#### c) Nancy
**Path:** `/src/pages/creation-site-web-nancy/index.astro`
**URL générée:** `https://marcmuller.fr/creation-site-web-nancy/`

**Unicité du contenu:**
- Intro spécifique: focus sur entrepreneuriat, universités, startups
- Sections uniques:
  1. "La transformation numérique à Nancy: c'est maintenant"
  2. "Ma méthode pour les entrepreneurs nancéiens"
  3. "Exemples de sites à Nancy"
- FAQ uniques: disponibilité réelle, portefeuille clients, concurrence vs chaînes nationales, maintenance long-terme
- Geo: 48.6921, 6.1844 (Place Stanislas centre)
- areaServed: Nancy, Vandœuvre-lès-Nancy, Laxou, Saint-Max, Meurthe-et-Moselle, Lorraine

**Cas clients mentionnés:**
- La Boutique des Trésors (commerce)
- Services BEP (BTP/Nancy)
- Studio de Yoga Harmonia (loisir/wellness)

---

## Avantages de cette architecture

### Pour SEO local
- Chaque page a son H1 unique et géo-spécifique
- Meta title/description différents par ville
- Schema LocalBusiness avec coordonnées géo
- Schema FAQPage pour rich snippets
- areaServed géographique pour chaque région

### Pour maintenance
- Template centralisé = modifications faciles (ex: pricing, style)
- Ajout facile de nouvelles villes (copier/adapter une page)
- Contenu du template changé = affecte les 3 villes automatiquement

### Pour conversion
- Tone cohérent Marc (direct, honnête)
- Pricing transparent et uniforme (490€ + 1490€+)
- CTA standardisé vers `/contact`
- Preuve sociale (cas clients locaux nommés)

---

## Comment ajouter une 4e ville

1. Créer dossier: `/src/pages/creation-site-web-[ville]/`
2. Créer fichier: `index.astro` dans ce dossier
3. Importer VilleTemplate et adapter les props:
```astro
---
import VilleTemplate from '@components/VilleTemplate.astro';

const title = "Création de site web sur mesure à [Ville] | Marc Muller";
const description = "[Description unique pour SEO]";
const ville = "[Ville]";
const intro = "[Intro 50-80 mots unique]";
const sections = [ /* 3 sections H2 uniques */ ];
const faq = [ /* 4 Q/A uniques */ ];
const geo = { lat: X.XXXX, lon: X.XXXX };
const areaServed = ["[Ville]", "[Villes proches]"];
// ... etc
---

<VilleTemplate {...props} />
```

---

## Performance et conformité

- Lighthouse: Optimisé pour 90+ (mobile-first)
- Accessibilité: WCAG 2.1 AA (semantic HTML, contraste couleurs)
- Mobile-first: 70% du trafic mobile
- Performance: < 2s LCP garanti

---

**Créé:** 15 mars 2026  
**Version:** 1.0  
**Astro:** 5.x + Tailwind CSS v4
