// Source unique de vérité pour tous les projets du site.
// Chaque projet déclare dans quels carousels il apparaît via le champ `carousels`.
//
// Carousels disponibles :
//   - 'homepage'        → carousel hero de la page d'accueil FR
//   - 'realisations'    → page /realisations (liste complète)
//   - 'portfolio'       → page /en/portfolio (version EN)
//   - '100-sites'       → page /100-sites-artisans
//   - 'graphistes'      → page /graphistes
//
// Pour ajouter un projet à un carousel, ajoutez simplement son tag.

export interface Project {
  id: string;
  title: string;
  /** Titre EN (pour /en/portfolio) */
  titleEn?: string;
  sector: string;
  sectorEn?: string;
  sectorColor: string;
  type: string;
  typeEn?: string;
  offer: 'Site Vitrine' | 'Projet Sur Mesure';
  description: string;
  descriptionEn?: string;
  url: string;
  /** CSS gradient pour les cartes détaillées (format Tailwind: 'from-[#xxx] to-[#yyy]') */
  gradient: string;
  /** Couleur hex de début du gradient (pour le carousel compact) */
  gradientFrom: string;
  /** Couleur hex de fin du gradient (pour le carousel compact) */
  gradientTo: string;
  screenshot: string;
  features: string[];
  featuresEn?: string[];
  highlights: { label: string; value: string }[];
  highlightsEn?: { label: string; value: string }[];
  stack?: string[];
  hidden?: boolean;
  /** Projet en cours de création — publié mais pas mis en avant, pas de bouton "Voir le site" ni Lighthouse */
  wip?: boolean;
  review?: {
    text: string;
    author: string;
    role: string;
    googleUrl: string;
  };
  /** Projet exemple (pas un vrai client) */
  sample?: boolean;
  /** Dans quels carousels/pages ce projet apparaît */
  carousels: string[];
}

export const projects: Project[] = [
  // ── P'Accord Piano ───────────────────────────────────────────────────────
  {
    id: 'paccord-piano',
    title: "P'Accord Piano",
    titleEn: "P'Accord Piano",
    wip: true,
    sector: 'Artisanat',
    sectorEn: 'Crafts',
    sectorColor: 'border-yellow-400/30 bg-yellow-400/10 text-yellow-400',
    type: 'Site vitrine multi-pages',
    typeEn: 'Multi-page portfolio site',
    offer: 'Projet Sur Mesure',
    description: "Accordeur et technicien piano à Chartres. Site sur mesure avec calculateur de tarif par code postal, page pianos d'occasion, et réservation en ligne. Design noir et or fidèle à l'univers du piano.",
    descriptionEn: "Piano tuner and technician in Chartres. Custom site with postcode-based price calculator, second-hand pianos page, and online booking. Black and gold design true to the piano world.",
    url: 'https://paccord-piano.fr',
    gradient: 'from-[#0d0d0d] to-[#1a1a1a]',
    gradientFrom: '#0d0d0d',
    gradientTo: '#1a1a1a',
    screenshot: '/images/projects/paccord-piano.webp',
    features: ['Calculateur de tarif', 'Pianos d\'occasion', 'Réservation en ligne', 'SEO local', 'Keystatic CMS', 'Schema.org'],
    featuresEn: ['Price calculator', 'Second-hand pianos', 'Online booking', 'Local SEO', 'Keystatic CMS', 'Schema.org'],
    highlights: [
      { label: 'Vitesse', value: '100' },
      { label: 'Livré en', value: '10 jours' },
    ],
    highlightsEn: [
      { label: 'Speed', value: '100' },
      { label: 'Delivered in', value: '10 days' },
    ],
    stack: ['Astro', 'Tailwind', 'Cloudflare', 'Keystatic'],
    carousels: ['realisations', 'portfolio', 'homepage', '100-sites', 'graphistes'],
  },

  // ── DMulti Services ──────────────────────────────────────────────────────
  {
    id: 'dmultiservices',
    title: 'DMulti Services',
    titleEn: 'DMulti Services',
    sector: 'Bâtiment',
    sectorEn: 'Construction',
    sectorColor: 'border-orange-400/30 bg-orange-400/10 text-orange-400',
    type: 'Site vitrine multi-pages',
    typeEn: 'Multi-page portfolio site',
    offer: 'Projet Sur Mesure',
    description: "Entreprise de menuiserie et rénovation intérieure/extérieure dans les Hautes-Pyrénées. Galerie par catégorie (cuisines, terrasses, sols…), CMS Keystatic pour gestion autonome, et SEO local optimisé.",
    descriptionEn: "Woodworking and renovation company in the Hautes-Pyrénées. Category-based gallery (kitchens, terraces, floors…), Keystatic CMS for self-management, and optimised local SEO.",
    url: 'https://dmultiservices.fr',
    gradient: 'from-[#2D3748] to-[#4A3728]',
    gradientFrom: '#2D3748',
    gradientTo: '#4A3728',
    screenshot: '/images/projects/dmultiservices-og.webp',
    features: ['Galerie par catégorie', 'Keystatic CMS', 'SEO local', 'Devis en ligne', 'FAQ', 'Schema.org'],
    featuresEn: ['Category gallery', 'Keystatic CMS', 'Local SEO', 'Online quote', 'FAQ', 'Schema.org'],
    highlights: [
      { label: 'Vitesse', value: '100' },
      { label: 'Livré en', value: '10 jours' },
    ],
    highlightsEn: [
      { label: 'Speed', value: '100' },
      { label: 'Delivered in', value: '10 days' },
    ],
    stack: ['Astro', 'Tailwind', 'Cloudflare', 'Keystatic'],
    carousels: ['realisations', 'portfolio', 'homepage', '100-sites', 'graphistes'],
  },

  // ── JD Zoothérapie ───────────────────────────────────────────────────────
  {
    id: 'jd-zootherapeute',
    title: 'JD Zoothérapie',
    titleEn: 'JD Animal Therapy',
    sector: 'Bien-être',
    sectorEn: 'Wellness',
    sectorColor: 'border-teal-400/30 bg-teal-400/10 text-teal-400',
    type: 'Site vitrine multi-pages',
    typeEn: 'Multi-page portfolio site',
    offer: 'Projet Sur Mesure',
    description: "Zoothérapeute en Moselle proposant des séances de médiation animale. Site multi-pages avec présentation des animaux, ateliers, tarifs et blog. Ton chaleureux, palette nature.",
    descriptionEn: "Animal therapist in Moselle offering animal-assisted therapy sessions. Multi-page site with animal profiles, workshops, pricing and blog. Warm tone, nature palette.",
    url: 'https://jdzootherapeute.fr',
    gradient: 'from-[#162829] to-[#3F8589]',
    gradientFrom: '#162829',
    gradientTo: '#3F8589',
    screenshot: '/images/projects/jd-zootherapeute.webp',
    features: ['Profils animaux', 'Ateliers & Tarifs', 'Keystatic CMS', 'SEO local', 'FAQ', 'Schema.org'],
    featuresEn: ['Animal profiles', 'Workshops & Pricing', 'Keystatic CMS', 'Local SEO', 'FAQ', 'Schema.org'],
    highlights: [
      { label: 'Vitesse', value: '100' },
      { label: 'Livré en', value: '10 jours' },
    ],
    highlightsEn: [
      { label: 'Speed', value: '100' },
      { label: 'Delivered in', value: '10 days' },
    ],
    stack: ['Astro', 'Tailwind', 'Cloudflare', 'Keystatic'],
    carousels: ['realisations', 'portfolio', 'homepage', '100-sites', 'graphistes'],
  },

  // ── Le Refuge ────────────────────────────────────────────────────────────
  {
    id: 'refuge-biollet',
    title: 'Le Refuge',
    titleEn: 'Le Refuge',
    wip: true,
    sector: 'Restauration',
    sectorEn: 'Hospitality',
    sectorColor: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
    type: 'Site vitrine',
    typeEn: 'Portfolio site',
    offer: 'Site Vitrine',
    description: "Restaurant gastronomique et maison d'hôtes au cœur des Combrailles, Auvergne. Menu du marché, chambres d'hôtes, galerie de plats maison. Palette verte et terracotta, typographie élégante.",
    descriptionEn: "Gastronomic restaurant and guesthouse in the heart of the Combrailles, Auvergne. Market menu, guest rooms, homemade dishes gallery. Green and terracotta palette, elegant typography.",
    url: 'https://www.lerefuge63.fr',
    gradient: 'from-[#0C2118] to-[#2E150C]',
    gradientFrom: '#0C2118',
    gradientTo: '#2E150C',
    screenshot: '/images/projects/refuge-biollet.jpg',
    features: ['Menu & Tarifs', 'Chambres d\'hôtes', 'Galerie photos', 'SEO local', 'FAQ', 'Formulaire contact'],
    featuresEn: ['Menu & Pricing', 'Guest rooms', 'Photo gallery', 'Local SEO', 'FAQ', 'Contact form'],
    highlights: [
      { label: 'Vitesse', value: '100' },
      { label: 'Livré en', value: '7 jours' },
    ],
    highlightsEn: [
      { label: 'Speed', value: '100' },
      { label: 'Delivered in', value: '7 days' },
    ],
    stack: ['Astro', 'Tailwind', 'Cloudflare', 'Keystatic'],
    carousels: ['realisations', 'portfolio', 'homepage', '100-sites', 'graphistes'],
  },

  // ── AM Électricité ───────────────────────────────────────────────────────
  {
    id: 'am-electricite',
    title: 'AM Électricité',
    titleEn: 'AM Électricité',
    sector: 'Bâtiment',
    sectorEn: 'Construction',
    sectorColor: 'border-orange-400/30 bg-orange-400/10 text-orange-400',
    type: 'Site vitrine',
    typeEn: 'Portfolio site',
    offer: 'Site Vitrine',
    description: "Électricien qualifié à Grenoble et Nord-Isère, 12 ans d'expérience. Installation, rénovation de tableaux, climatisation, courant faible. Triple CTA : téléphone, WhatsApp et formulaire.",
    descriptionEn: "Qualified electrician in Grenoble and North Isère, 12 years of experience. Installation, panel renovation, HVAC, low-current systems. Triple CTA: phone, WhatsApp and form.",
    url: 'https://am-electricite.fr',
    gradient: 'from-[#0A2610] to-[#1C1E20]',
    gradientFrom: '#0A2610',
    gradientTo: '#1C1E20',
    screenshot: '/images/projects/am-electricite.jpg',
    features: ['Triple CTA', 'Galerie avant/après', 'SEO local', 'FAQ', 'WhatsApp', 'Schema.org'],
    featuresEn: ['Triple CTA', 'Before/after gallery', 'Local SEO', 'FAQ', 'WhatsApp', 'Schema.org'],
    highlights: [
      { label: 'Vitesse', value: '100' },
      { label: 'Livré en', value: '7 jours' },
    ],
    highlightsEn: [
      { label: 'Speed', value: '100' },
      { label: 'Delivered in', value: '7 days' },
    ],
    stack: ['Astro', 'Tailwind', 'Cloudflare', 'Keystatic'],
    carousels: ['realisations', 'portfolio', 'homepage', '100-sites', 'graphistes'],
  },

  // ── Angelo Grossi ────────────────────────────────────────────────────────
  {
    id: 'angelo-grossi',
    title: 'Angelo Grossi',
    titleEn: 'Angelo Grossi',
    sector: 'Bien-être',
    sectorEn: 'Wellness',
    sectorColor: 'border-teal-400/30 bg-teal-400/10 text-teal-400',
    type: 'Site vitrine',
    typeEn: 'Portfolio site',
    offer: 'Site Vitrine',
    description: "Coach en prise de parole en public en Île-de-France. 25 ans en entreprise, 15 ans d'improvisation théâtrale. Méthode H2S unique, prise de rendez-vous Calendly intégrée. Design bordeaux et or.",
    descriptionEn: "Public speaking coach in Paris region. 25 years in corporate, 15 years of theatrical improvisation. Unique H2S method, integrated Calendly booking. Burgundy and gold design.",
    url: 'https://angelogrossi.com',
    gradient: 'from-[#1e1e28] to-[#41111f]',
    gradientFrom: '#1e1e28',
    gradientTo: '#41111f',
    screenshot: '/images/projects/angelo-grossi.webp',
    features: ['Calendly intégré', 'Méthode H2S', 'Témoignages', 'SEO local', 'FAQ', 'Schema.org'],
    featuresEn: ['Calendly booking', 'H2S Method', 'Testimonials', 'Local SEO', 'FAQ', 'Schema.org'],
    highlights: [
      { label: 'Vitesse', value: '100' },
      { label: 'Livré en', value: '7 jours' },
    ],
    highlightsEn: [
      { label: 'Speed', value: '100' },
      { label: 'Delivered in', value: '7 days' },
    ],
    stack: ['Astro', 'Tailwind', 'Cloudflare', 'Keystatic'],
    carousels: ['realisations', 'portfolio', 'homepage', '100-sites', 'graphistes'],
  },

  // ── Occi'Volt ────────────────────────────────────────────────────────────
  {
    id: 'occivolt',
    title: "Occi'Volt Électricité",
    titleEn: "Occi'Volt Electrical",
    sector: 'Bâtiment',
    sectorEn: 'Construction',
    sectorColor: 'border-orange-400/30 bg-orange-400/10 text-orange-400',
    type: 'Site vitrine',
    typeEn: 'Portfolio site',
    offer: 'Site Vitrine',
    description: "Électricien en Lauragais (Haute-Garonne). Installation, rénovation, dépannage. Galerie de réalisations, devis gratuit, zone d'intervention 30-50 km. Palette verte électrique sur fond sombre.",
    descriptionEn: "Electrician in Lauragais (Haute-Garonne). Installation, renovation, repairs. Project gallery, free quote, 30-50 km coverage area. Electric green palette on dark background.",
    url: 'https://occivolt.fr',
    gradient: 'from-[#0F2E1A] to-[#1A1A1A]',
    gradientFrom: '#0F2E1A',
    gradientTo: '#1A1A1A',
    screenshot: '/images/projects/occivolt.webp',
    features: ['Galerie travaux', 'Devis gratuit', 'Keystatic CMS', 'SEO local', 'FAQ', 'Schema.org'],
    featuresEn: ['Project gallery', 'Free quote', 'Keystatic CMS', 'Local SEO', 'FAQ', 'Schema.org'],
    highlights: [
      { label: 'Vitesse', value: '100' },
      { label: 'Livré en', value: '7 jours' },
    ],
    highlightsEn: [
      { label: 'Speed', value: '100' },
      { label: 'Delivered in', value: '7 days' },
    ],
    stack: ['Astro', 'Tailwind', 'Cloudflare', 'Keystatic'],
    carousels: ['realisations', 'portfolio', 'homepage', '100-sites', 'graphistes'],
  },

  // ── MM Sécurité ──────────────────────────────────────────────────────────
  {
    id: 'mm-securite',
    title: 'MM Sécurité',
    titleEn: 'MM Security',
    sector: 'Bâtiment',
    sectorEn: 'Construction',
    sectorColor: 'border-orange-400/30 bg-orange-400/10 text-orange-400',
    type: 'Site vitrine multi-pages + blog',
    typeEn: 'Multi-page site + blog',
    offer: 'Projet Sur Mesure',
    description: "Systèmes de sécurité à Metz : alarme intrusion, vidéosurveillance, contrôle d'accès, mise en conformité ERP. Site multi-pages avec blog SEO (11 articles), pages par ville et par service.",
    descriptionEn: "Security systems in Metz: intrusion alarms, CCTV, access control, ERP compliance. Multi-page site with SEO blog (11 articles), city and service landing pages.",
    url: 'https://mm-securite.fr',
    gradient: 'from-[#071527] to-[#1A1A2E]',
    gradientFrom: '#071527',
    gradientTo: '#1A1A2E',
    screenshot: '/images/projects/mm-securite.webp',
    features: ['Blog SEO', 'Pages par ville', 'Pages par service', 'Devis gratuit', 'FAQ', 'Schema.org'],
    featuresEn: ['SEO Blog', 'City pages', 'Service pages', 'Free quote', 'FAQ', 'Schema.org'],
    highlights: [
      { label: 'Vitesse', value: '100' },
      { label: '11', value: 'articles blog' },
    ],
    highlightsEn: [
      { label: 'Speed', value: '100' },
      { label: '11', value: 'blog posts' },
    ],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    carousels: ['realisations', 'portfolio', 'homepage', '100-sites', 'graphistes'],
  },

  // ── La Grange aux Fées ──────────────────────────────────────────────────
  {
    id: 'la-grange-aux-fees',
    title: 'La Grange aux Fées',
    titleEn: 'La Grange aux Fées',
    wip: true,
    sector: 'Tourisme',
    sectorEn: 'Tourism',
    sectorColor: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
    type: 'Site de réservation',
    typeEn: 'Booking site',
    offer: 'Projet Sur Mesure',
    description: "6 gîtes de charme près d'Amnéville (Moselle). Carousel de chambres, galerie, avis clients, FAQ, blog touristique. Images Cloudinary, palette cuivrée chaleureuse.",
    descriptionEn: "6 charming holiday rentals near Amnéville (Moselle). Room carousel, gallery, reviews, FAQ, tourism blog. Cloudinary images, warm copper palette.",
    url: 'https://lagrangeauxfees.fr',
    gradient: 'from-[#3E2218] to-[#C67B4B]',
    gradientFrom: '#3E2218',
    gradientTo: '#C67B4B',
    screenshot: '/images/projects/la-grange-aux-fees.webp',
    features: ['Carousel chambres', 'Blog tourisme', 'Avis clients', 'FAQ', 'Formulaire contact', 'Schema.org'],
    featuresEn: ['Room carousel', 'Tourism blog', 'Reviews', 'FAQ', 'Contact form', 'Schema.org'],
    highlights: [
      { label: 'Vitesse', value: '100' },
      { label: '6', value: 'gîtes' },
    ],
    highlightsEn: [
      { label: 'Speed', value: '100' },
      { label: '6', value: 'rentals' },
    ],
    stack: ['Astro', 'Cloudinary', 'Cloudflare'],
    carousels: ['realisations', 'portfolio', 'homepage', '100-sites', 'graphistes'],
  },

  // ── Roma Laudarium ───────────────────────────────────────────────────────
  {
    id: 'roma-laudarium',
    title: 'Roma Laudarium',
    titleEn: 'Roma Laudarium',
    wip: true,
    sector: 'Créatif',
    sectorEn: 'Creative',
    sectorColor: 'border-violet-400/30 bg-violet-400/10 text-violet-400',
    type: 'Site vitrine',
    typeEn: 'Portfolio site',
    offer: 'Site Vitrine',
    description: "Conteuse et metteuse en scène de spectacles pour le jeune public. Site one-page poétique avec présentation du spectacle, univers littéraire et formulaire de programmation. Palette nuit enchantée et or.",
    descriptionEn: "Storyteller and director of children's performances. Poetic one-page site showcasing the show, literary world and booking form. Enchanted night and gold palette.",
    url: 'https://roma-laudarium.pages.dev',
    gradient: 'from-[#1A1530] to-[#3F1B06]',
    gradientFrom: '#1A1530',
    gradientTo: '#3F1B06',
    screenshot: '/images/projects/roma-laudarium.webp',
    features: ['Design poétique', 'Spectacle', 'Univers littéraire', 'Formulaire programmation', 'FAQ', 'Schema.org'],
    featuresEn: ['Poetic design', 'Show showcase', 'Literary world', 'Booking form', 'FAQ', 'Schema.org'],
    highlights: [
      { label: 'Vitesse', value: '100' },
      { label: 'Livré en', value: '5 jours' },
    ],
    highlightsEn: [
      { label: 'Speed', value: '100' },
      { label: 'Delivered in', value: '5 days' },
    ],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    carousels: ['realisations', 'portfolio', 'homepage', '100-sites', 'graphistes'],
  },

  // ── Kor ──────────────────────────────────────────────────────────────────
  {
    id: 'kor',
    title: 'Kor',
    titleEn: 'Kor',
    sector: 'Créatif',
    sectorEn: 'Creative',
    sectorColor: 'border-violet-400/30 bg-violet-400/10 text-violet-400',
    type: 'Landing page',
    typeEn: 'Landing page',
    offer: 'Site Vitrine',
    description: "Landing page pour un assistant IA de gestion d'entreprise. Waitlist avec stockage Cloudflare KV, design dark/purple, animations au scroll. Conversion optimisée.",
    descriptionEn: "Landing page for an AI business management assistant. Waitlist with Cloudflare KV storage, dark/purple design, scroll animations. Conversion-optimised.",
    url: 'https://kor.marcm.fr',
    gradient: 'from-[#09090b] to-[#7c3aed]',
    gradientFrom: '#09090b',
    gradientTo: '#7c3aed',
    screenshot: '/images/projects/kor.webp',
    features: ['Waitlist', 'Cloudflare KV', 'Animations scroll', 'Design dark', 'CTA conversion', 'Open Graph'],
    featuresEn: ['Waitlist', 'Cloudflare KV', 'Scroll animations', 'Dark design', 'Conversion CTA', 'Open Graph'],
    highlights: [
      { label: 'Vitesse', value: '100' },
      { label: 'Livré en', value: '3 jours' },
    ],
    highlightsEn: [
      { label: 'Speed', value: '100' },
      { label: 'Delivered in', value: '3 days' },
    ],
    stack: ['HTML', 'CSS', 'Cloudflare KV'],
    carousels: ['realisations', 'portfolio', 'homepage'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EXEMPLES PAR SECTEUR (sample: true)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Salon Emma ─────────────────────────────────────────────────────────
  {
    id: 'salon-emma',
    title: 'Salon Emma',
    sector: 'Coiffure',
    sectorColor: 'border-pink-400/30 bg-pink-400/10 text-pink-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Salon de coiffure à Nancy. Colorations naturelles, galerie avant/après, ambiance végétale.',
    url: '/exemples/salon-emma/',
    gradient: 'from-[#2D1B2E] to-[#1A1A1A]',
    gradientFrom: '#2D1B2E',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/salon-emma/images/01-hero-interieur-du-salon.webp',
    features: ['Galerie avant/après', 'Colorations naturelles', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Ostéo Reinhardt ────────────────────────────────────────────────────
  {
    id: 'osteo-reinhardt',
    title: 'Ostéo Reinhardt',
    sector: 'Santé',
    sectorColor: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Ostéopathe à Haguenau. Prise de RDV Doctolib, contraintes déontologiques ROF respectées.',
    url: '/exemples/osteo-reinhardt/',
    gradient: 'from-[#0F2B2B] to-[#1A1A1A]',
    gradientFrom: '#0F2B2B',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/osteo-reinhardt/images/01-hero-mains-d-osteopathe-au-travail.webp',
    features: ['Prise de RDV Doctolib', 'Contraintes ROF', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Atelier Terre ──────────────────────────────────────────────────────
  {
    id: 'atelier-terre',
    title: 'Atelier Terre',
    sector: 'Artisanat',
    sectorColor: 'border-yellow-400/30 bg-yellow-400/10 text-yellow-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Céramiste à Saverne. Galerie par collection, esthétique wabi-sabi, commande personnalisée.',
    url: '/exemples/atelier-terre/',
    gradient: 'from-[#2B1F14] to-[#1A1A1A]',
    gradientFrom: '#2B1F14',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/atelier-terre/images/01-hero-mains-au-tour-de-potier.webp',
    features: ['Galerie par collection', 'Commande personnalisée', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Encre Noire ────────────────────────────────────────────────────────
  {
    id: 'encre-noire',
    title: 'Encre Noire',
    sector: 'Créatif',
    sectorColor: 'border-violet-400/30 bg-violet-400/10 text-violet-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Studio de tatouage à Metz. Design full dark, galerie plein écran par style.',
    url: '/exemples/encre-noire/',
    gradient: 'from-[#0D0D0D] to-[#1A1A2E]',
    gradientFrom: '#0D0D0D',
    gradientTo: '#1A1A2E',
    screenshot: '/exemples/encre-noire/images/01-hero-machine-a-tatouer-en-action-gros-plan.webp',
    features: ['Design full dark', 'Galerie par style', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Bistrot Moselle ────────────────────────────────────────────────────
  {
    id: 'bistrot-moselle',
    title: 'Bistrot Moselle',
    sector: 'Restauration',
    sectorColor: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Bistrot traditionnel à Sarreguemines. Carte complète, horaires, ambiance zinc.',
    url: '/exemples/bistrot-moselle/',
    gradient: 'from-[#1A1508] to-[#1A1A1A]',
    gradientFrom: '#1A1508',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/bistrot-moselle/images/01-hero-interieur-du-bistrot-en-ambiance-soir.webp',
    features: ['Carte complète', 'Horaires', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Boulangerie Pétrin ─────────────────────────────────────────────────
  {
    id: 'boulangerie-petrin',
    title: 'Boulangerie Pétrin',
    sector: 'Restauration',
    sectorColor: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Boulangerie artisanale à Metz. Pain au levain, viennoiseries, ambiance tradition.',
    url: '/exemples/boulangerie-petrin/',
    gradient: 'from-[#2B1F0A] to-[#1A1A1A]',
    gradientFrom: '#2B1F0A',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/boulangerie-petrin/images/01-hero-pain-au-levain-en-gros-plan.webp',
    features: ['Pain au levain', 'Viennoiseries', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Studio Lumière ─────────────────────────────────────────────────────
  {
    id: 'studio-lumiere',
    title: 'Studio Lumière',
    sector: 'Créatif',
    sectorColor: 'border-violet-400/30 bg-violet-400/10 text-violet-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Photographe à Colmar. Portfolio par catégorie, galerie masonry.',
    url: '/exemples/studio-lumiere/',
    gradient: 'from-[#1A1A2E] to-[#2E1A2E]',
    gradientFrom: '#1A1A2E',
    gradientTo: '#2E1A2E',
    screenshot: '/exemples/studio-lumiere/images/01-hero-mariage-en-lumiere-naturelle.webp',
    features: ['Portfolio par catégorie', 'Galerie masonry', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Asso Couleurs ──────────────────────────────────────────────────────
  {
    id: 'asso-couleurs',
    title: 'Asso Couleurs',
    sector: 'Association',
    sectorColor: 'border-sky-400/30 bg-sky-400/10 text-sky-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Association culturelle à Épinal. Ateliers peinture, planning, inscription.',
    url: '/exemples/asso-couleurs/',
    gradient: 'from-[#0A1A2E] to-[#1A1A1A]',
    gradientFrom: '#0A1A2E',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/asso-couleurs/images/01-hero-atelier-en-cours.webp',
    features: ['Planning ateliers', 'Inscription en ligne', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Cabinet RH Conseil ─────────────────────────────────────────────────
  {
    id: 'cabinet-rh-conseil',
    title: 'Cabinet RH Conseil',
    sector: 'Conseil',
    sectorColor: 'border-slate-400/30 bg-slate-400/10 text-slate-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Consultante RH à Mulhouse. Site B2B corporate, services, témoignages.',
    url: '/exemples/cabinet-rh-conseil/',
    gradient: 'from-[#1A1A2E] to-[#0D1B2E]',
    gradientFrom: '#1A1A2E',
    gradientTo: '#0D1B2E',
    screenshot: '/exemples/cabinet-rh-conseil/images/01-hero-nathalie-en-reunion.webp',
    features: ['Site B2B', 'Services détaillés', 'Témoignages'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Savons Nature ──────────────────────────────────────────────────────
  {
    id: 'savons-nature',
    title: 'Savons Nature',
    sector: 'E-commerce',
    sectorColor: 'border-lime-400/30 bg-lime-400/10 text-lime-400',
    type: 'Boutique en ligne',
    offer: 'Projet Sur Mesure',
    description: 'Savonnerie bio à Nancy. Boutique en ligne, catalogue 14 produits, CGV.',
    url: '/exemples/savons-nature/',
    gradient: 'from-[#0F2B14] to-[#1A1A1A]',
    gradientFrom: '#0F2B14',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/savons-nature/images/01-hero-savons-en-composition.webp',
    features: ['Boutique en ligne', 'Catalogue produits', 'CGV'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Fleurs Forbach ─────────────────────────────────────────────────────
  {
    id: 'fleurs-forbach',
    title: 'Fleurs Forbach',
    sector: 'Commerce',
    sectorColor: 'border-rose-400/30 bg-rose-400/10 text-rose-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Fleuriste à Forbach. Galerie créations, formulaire événementiel.',
    url: '/exemples/fleurs-forbach/',
    gradient: 'from-[#2E0A1A] to-[#1A1A1A]',
    gradientFrom: '#2E0A1A',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/fleurs-forbach/images/01-hero-bouquet-somptueux-en-lumiere-naturelle.webp',
    features: ['Galerie créations', 'Formulaire événementiel', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Coach Max ──────────────────────────────────────────────────────────
  {
    id: 'coach-max',
    title: 'Coach Max',
    sector: 'Sport',
    sectorColor: 'border-orange-400/30 bg-orange-400/10 text-orange-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Coach sportif à Thionville. Planning cours, tarifs, design dynamique noir/orange.',
    url: '/exemples/coach-max/',
    gradient: 'from-[#1A0A00] to-[#2E1A00]',
    gradientFrom: '#1A0A00',
    gradientTo: '#2E1A00',
    screenshot: '/exemples/coach-max/images/01-hero-entrainement-en-exterieur-ambiance-urbaine.webp',
    features: ['Planning cours', 'Tarifs', 'Design dynamique'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Yoga Sarah ─────────────────────────────────────────────────────────
  {
    id: 'yoga-sarah',
    title: 'Yoga Sarah',
    sector: 'Bien-être',
    sectorColor: 'border-teal-400/30 bg-teal-400/10 text-teal-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Yoga bilingue FR/EN à Strasbourg. Planning, retraites, i18n complet.',
    url: '/exemples/yoga-sarah/',
    gradient: 'from-[#0A2B2B] to-[#1A1A1A]',
    gradientFrom: '#0A2B2B',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/yoga-sarah/images/01-hero-yoga-au-lever-du-soleil-avec-vue-sur-strasbou.webp',
    features: ['Bilingue FR/EN', 'Planning retraites', 'i18n complet'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Plomberie Alsace ───────────────────────────────────────────────────
  {
    id: 'plomberie-alsace',
    title: 'Plomberie Alsace',
    sector: 'Bâtiment',
    sectorColor: 'border-orange-400/30 bg-orange-400/10 text-orange-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Plombier à Strasbourg. Bouton urgence flottant, certifications RGE.',
    url: '/exemples/plomberie-alsace/',
    gradient: 'from-[#0A1A2E] to-[#1A1A1A]',
    gradientFrom: '#0A1A2E',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/plomberie-alsace/images/01-hero-plombier-au-travail.webp',
    features: ['Bouton urgence', 'Certifications RGE', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Pâtisserie Suzanne ─────────────────────────────────────────────────
  {
    id: 'patisserie-suzanne',
    title: 'Pâtisserie Suzanne',
    sector: 'Restauration',
    sectorColor: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Pâtisserie fine à Metz. Galerie entremets, commande sur mesure.',
    url: '/exemples/patisserie-suzanne/',
    gradient: 'from-[#2E1A1A] to-[#1A1A1A]',
    gradientFrom: '#2E1A1A',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/patisserie-suzanne/images/01-hero-entremets-signature.webp',
    features: ['Galerie entremets', 'Commande sur mesure', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Menuiserie Artisan ─────────────────────────────────────────────────
  {
    id: 'menuiserie-artisan',
    title: 'Menuiserie Artisan',
    sector: 'Artisanat',
    sectorColor: 'border-yellow-400/30 bg-yellow-400/10 text-yellow-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Menuisier ébéniste à Lunéville. Galerie par type, page essences de bois.',
    url: '/exemples/menuiserie-artisan/',
    gradient: 'from-[#2B1F14] to-[#1A1A1A]',
    gradientFrom: '#2B1F14',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/menuiserie-artisan/images/01-hero-l-atelier.webp',
    features: ['Galerie par type', 'Page essences de bois', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Cabinet Fischer ────────────────────────────────────────────────────
  {
    id: 'cabinet-fischer',
    title: 'Cabinet Fischer',
    sector: 'Conseil',
    sectorColor: 'border-slate-400/30 bg-slate-400/10 text-slate-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Expert-comptable à Metz. Contraintes Ordre EC, design institutionnel.',
    url: '/exemples/cabinet-fischer/',
    gradient: 'from-[#0D1B2E] to-[#1A1A1A]',
    gradientFrom: '#0D1B2E',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/cabinet-fischer/images/01-hero-facade-de-cabinet-d-expertise-comptable.webp',
    features: ['Contraintes Ordre EC', 'Design institutionnel', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Immo Lorraine ──────────────────────────────────────────────────────
  {
    id: 'immo-lorraine',
    title: 'Immo Lorraine',
    sector: 'Immobilier',
    sectorColor: 'border-indigo-400/30 bg-indigo-400/10 text-indigo-400',
    type: 'Site vitrine',
    offer: 'Projet Sur Mesure',
    description: 'Agent immobilier à Nancy. Galerie biens filtrable, estimation en ligne.',
    url: '/exemples/immo-lorraine/',
    gradient: 'from-[#0D0D2E] to-[#1A1A1A]',
    gradientFrom: '#0D0D2E',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/immo-lorraine/images/01-hero-place-stanislas-au-crepuscule.webp',
    features: ['Galerie biens filtrable', 'Estimation en ligne', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Avocate Droit ──────────────────────────────────────────────────────
  {
    id: 'avocate-droit',
    title: 'Avocate Droit',
    sector: 'Juridique',
    sectorColor: 'border-neutral-400/30 bg-neutral-400/10 text-neutral-400',
    type: 'Site vitrine',
    offer: 'Site Vitrine',
    description: 'Avocate à Strasbourg. Contraintes RIN, page honoraires.',
    url: '/exemples/avocate-droit/',
    gradient: 'from-[#1A1A1A] to-[#0D0D0D]',
    gradientFrom: '#1A1A1A',
    gradientTo: '#0D0D0D',
    screenshot: '/exemples/avocate-droit/images/01-hero-cabinet-sobre.webp',
    features: ['Contraintes RIN', 'Page honoraires', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },

  // ── Gîte Vosges ────────────────────────────────────────────────────────
  {
    id: 'gite-vosges',
    title: 'Gîte Vosges',
    sector: 'Tourisme',
    sectorColor: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
    type: 'Site de réservation',
    offer: 'Projet Sur Mesure',
    description: 'Gîtes de charme à La Bresse. 3 fiches hébergement, réservation directe.',
    url: '/exemples/gite-vosges/',
    gradient: 'from-[#0A2B14] to-[#1A1A1A]',
    gradientFrom: '#0A2B14',
    gradientTo: '#1A1A1A',
    screenshot: '/exemples/gite-vosges/images/01-hero-vue-montagne-hiver.webp',
    features: ['3 fiches hébergement', 'Réservation directe', 'SEO local'],
    highlights: [{ label: 'Vitesse', value: '100' }],
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    sample: true,
    wip: false,
    carousels: ['realisations'],
  },
];

/** Récupère les projets pour un carousel donné.
 *  Les projets wip sont toujours triés en dernier. */
export function getProjectsForCarousel(carouselId: string): Project[] {
  return projects
    .filter(p => !p.hidden && p.carousels.includes(carouselId))
    .sort((a, b) => (a.wip ? 1 : 0) - (b.wip ? 1 : 0));
}

/** Tous les projets visibles (non hidden) */
export function getVisibleProjects(): Project[] {
  return projects.filter(p => !p.hidden);
}

/** Projets clients réels pour la page réalisations */
export function getClientProjects(): Project[] {
  return projects.filter(p => !p.hidden && !p.sample && p.carousels.includes('realisations'));
}

/** Projets exemples pour la page réalisations */
export function getSampleProjects(): Project[] {
  return projects.filter(p => !p.hidden && p.sample && p.carousels.includes('realisations'));
}
