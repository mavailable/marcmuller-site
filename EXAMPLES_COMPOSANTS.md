# Exemples d'utilisation - Composants refactorisés

## Button.astro

### Variante Primary (par défaut)
```astro
import Button from '@/components/Button.astro';

<Button href="/contact" variant="primary" size="md">
  Démarrer un projet
</Button>
```

### Variante Ghost
```astro
<Button href="/journal" variant="ghost" size="md">
  Lire les articles
</Button>
```

### Variante avec Arrow
```astro
<Button href="/offre" variant="primary" size="lg" arrow>
  Découvrir l'offre
</Button>
```

### Variante Outline
```astro
<Button href="#" variant="outline" size="sm">
  Annuler
</Button>
```

---

## Card.astro

### Card avec SVG icon minimaliste

```astro
import Card from '@/components/Card.astro';

const designIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5a2 2 0 00-1 3.75A4 4 0 0023 12" />
</svg>`;

<Card
  title="Design personnalisé"
  description="Chaque site est pensé pour votre métier, votre identité, vos objectifs."
  iconSvg={designIcon}
  variant="default"
/>
```

### Card highlight (variant="highlight")
```astro
<Card
  title="Support inclus"
  description="Maintenance, mises à jour, support technique illimité pendant 1 an."
  iconSvg={supportIcon}
  variant="highlight"
/>
```

### Card comme lien (href)
```astro
<Card
  title="Réalisation 1"
  description="Agrandissement d'une PME grâce à un site web optimisé."
  href="/realisation-1"
  variant="default"
/>
```

---

## SectionTitle.astro

### Avec badge
```astro
import SectionTitle from '@/components/SectionTitle.astro';

<SectionTitle
  badge="Notre offre"
  title="Trois formules adaptées"
  subtitle="Du site vitrine au e-commerce, trouvez la formule qui correspond à vos besoins."
  tag="h2"
  align="center"
/>
```

### Simple, aligné à gauche
```astro
<SectionTitle
  title="Vos réalisations"
  subtitle="Les projets sur lesquels j'ai travaillé."
  align="left"
/>
```

### Avec h3
```astro
<SectionTitle
  title="Une question ?"
  tag="h3"
  align="center"
/>
```

---

## CTASection.astro

### Variante Default (crème)
```astro
import CTASection from '@/components/CTASection.astro';

<CTASection
  title="Prêt à transformer votre présence en ligne ?"
  text="Je créerai un site web qui vous ressemble, qui vend et qui dure."
  buttonText="Commencer maintenant"
  buttonLink="/#contact"
  variant="default"
  reassurance="Réponse sous 48h"
/>
```

### Variante Dark (charbon)
```astro
<CTASection
  title="Parlons de votre projet"
  text="Que ce soit un site vitrine, e-commerce ou web app, je suis là pour concrétiser votre idée."
  buttonText="Écrire à Marc"
  buttonLink="mailto:marc@muller.im"
  variant="dark"
  reassurance="Disponible du lundi au vendredi"
/>
```

### Variante Accent (orange)
```astro
<CTASection
  title="Vous avez trouvé votre agence"
  text="Je suis spécialisé dans la création de sites web sur mesure pour PME et artisans."
  buttonText="Démarrer maintenant"
  buttonLink="/#contact"
  variant="accent"
/>
```

---

## Header.astro

Le header est un composant système et doit être utilisé dans le layout principal:

```astro
// Dans src/layouts/BaseLayout.astro
import Header from '@/components/Header.astro';

<Header />
```

Les animations sont entièrement automatiques:
- Logo avec trait qui slide au hover
- Nav links avec underline animation
- CTA avec micro-animation et scale
- Mobile menu avec slide-in
- Scroll effect avec backdrop blur

---

## Footer.astro

Le footer doit aussi être dans le layout:

```astro
// Dans src/layouts/BaseLayout.astro
import Footer from '@/components/Footer.astro';

<Footer />
```

Le copyright se met à jour automatiquement avec l'année courante (JavaScript inline).

---

## MobileCallButton.astro

Ajouter dans le layout pour que le bouton d'appel apparaisse:

```astro
// Dans src/layouts/BaseLayout.astro
import MobileCallButton from '@/components/MobileCallButton.astro';

<MobileCallButton />
```

Fonctionnalités automatiques:
- Pulsation continue (animation customisée)
- Disparaît automatiquement près du footer
- Sur mobile seulement (hidden md:flex)
- Accessible avec aria-label

---

## Exemple complet de page

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import SectionTitle from '@/components/SectionTitle.astro';
import Card from '@/components/Card.astro';
import CTASection from '@/components/CTASection.astro';
import Button from '@/components/Button.astro';

const designIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16m10-16v16m-7-10h6m-6 4h6" />
</svg>`;

const speedIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
</svg>`;
---

<BaseLayout title="Offre">
  <main id="main">
    <!-- Hero Section -->
    <section class="py-20 md:py-32">
      <div class="mx-auto max-w-6xl px-6 md:px-8">
        <SectionTitle
          title="Mon offre"
          subtitle="Des solutions web adaptées à votre PME ou commerce artisanal"
          align="center"
        />
      </div>
    </section>

    <!-- Services -->
    <section class="py-20 md:py-32 bg-[var(--color-bg-alt)]">
      <div class="mx-auto max-w-6xl px-6 md:px-8">
        <div class="grid md:grid-cols-3 gap-8">
          <Card
            title="Design personnalisé"
            description="Chaque site est unique et pensé pour votre identité."
            iconSvg={designIcon}
            variant="default"
          />
          <Card
            title="Performance"
            description="Sites rapides, optimisés, prêts pour le SEO."
            iconSvg={speedIcon}
            variant="highlight"
          />
          <Card
            title="Support inclus"
            description="Maintenance et support 1 an inclus."
            iconSvg={supportIcon}
            variant="default"
          />
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <CTASection
      title="Commencez votre transformation digital"
      text="Ensemble, créons un site qui représente vraiment votre métier."
      buttonText="Prendre RDV"
      buttonLink="/#contact"
      variant="default"
      reassurance="Consultation gratuite - 30 minutes"
    />
  </main>
</BaseLayout>
```

---

## Animations & Transitions

### Utiliser les classes d'animation globales:

```astro
<div class="animate-fade-in">
  Contenu qui apparaît en douceur
</div>

<div class="animate-slide-up">
  Contenu qui glisse vers le haut
</div>

<div class="animate-pulse-custom">
  Contenu qui pulse
</div>
```

### Variables CSS pour transitions:

```css
transition-all duration-300;  /* utilise --transition-normal */
transition-all duration-150;  /* utilise --transition-fast */
transition-all duration-500;  /* utilise --transition-slow */
```

---

## Personnalisation couleurs

Toutes les couleurs sont dans `src/styles/global.css` dans le `@theme`:

```css
--color-accent: #E86C47;           /* Orange signature */
--color-accent-hover: #D55A36;     /* Orange plus foncé au hover */
--color-accent-light: #F5E8E3;     /* Orange très clair pour backgrounds */
--color-bg: #FAFAF8;               /* Blanc chaud */
--color-bg-alt: #F0EEEB;           /* Gris très clair */
--color-bg-dark: #1A1A1A;          /* Charbon */
--color-text: #1A1A1A;             /* Texte foncé */
--color-text-muted: #6B6B6B;       /* Texte grisé */
```

Pour changer une couleur globalement, modifier dans le `@theme`.

---

## Notes d'accessibilité

Tous les composants incluent:
- ✓ aria-labels en français
- ✓ aria-expanded pour menus
- ✓ Focus-visible styles
- ✓ Semantic HTML (h2, h3, button, a)
- ✓ Contraste de couleurs WCAG AA

Ne pas enlever les focus-visible styles pour garder l'accessibilité!

---

## Performance Tips

1. **Images** - Optimiser avant upload (WebP si possible)
2. **Fonts** - Satoshi est en format WOFF2 (optimal)
3. **CSS** - Minifié automatiquement par Astro build
4. **Animations** - Utilisent transform/opacity (GPU-accelerated)

---

## Support

En cas de question sur les composants:
- Vérifier la définition dans le dossier `src/components/`
- Consulter `REFONTE_VISUELLE.md` pour détails techniques
- Les animations sont en CSS/vanilla JS (pas de dépendances)
