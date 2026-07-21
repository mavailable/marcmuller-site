// Modele de donnees du formulaire /onboarding — champs et etapes conformes a
// skills/wf-onboarding/SKILL.md. Tous les champs sont des strings plates
// (compatibles FormData / Web3Forms / webhook lead-inbound).

export type ClientType =
  | 'entreprise-locale'
  | 'artiste-createur'
  | 'freelance-consultant'
  | 'association'
  | 'e-commerce';

export interface UploadedFile {
  key: string;
  name: string;
  kind: 'logo' | 'photo' | 'charte';
}

export type Data = Record<string, string>;

export const STEP_TITLES = ['Identité', 'Coordonnées', 'Photos et assets', 'Contexte', 'Récapitulatif'];

export const CLIENT_TYPES: { value: ClientType; label: string }[] = [
  { value: 'entreprise-locale', label: 'Entreprise locale (artisan, commerce, restaurant...)' },
  { value: 'artiste-createur', label: 'Artiste ou créateur' },
  { value: 'freelance-consultant', label: 'Freelance ou consultant' },
  { value: 'association', label: 'Association' },
  { value: 'e-commerce', label: 'Boutique en ligne' },
];

export const DISCIPLINES = ['Musique', 'Arts visuels', 'Artisanat', 'Spectacle', 'Autre'];
export const NB_ADHERENTS = ['Moins de 20', '20 à 100', 'Plus de 100'];
export const NB_PRODUITS = ['1 à 10', '10 à 50', '50 et plus'];
export const PLATEFORMES = ['Aucune', 'Shopify', 'WooCommerce', 'Wix', 'Etsy', 'Autre'];
export const PAIEMENTS = ['Carte bancaire en ligne', 'Virement / sur devis', 'Paiement à la réservation', 'Je ne sais pas'];
export const PAYS = ['France', 'Belgique', 'Suisse', 'Luxembourg', 'Autre'];
export const CANAUX = ['Email', 'WhatsApp', 'Téléphone'];
export const OBJECTIFS = [
  'Être trouvé sur Google (SEO local)',
  'Avoir une vitrine en ligne crédible',
  'Recevoir des demandes de devis ou de contact',
  'Vendre en ligne',
  'Présenter mon portfolio, mon travail',
  'Recruter des adhérents ou des bénévoles',
  'Autre',
];
export const BUDGETS = ['Essentiel (environ 490€ HT)', 'Multi-pages (environ 1290€ HT)', 'Sur mesure (1990€ HT et plus)', 'Je ne sais pas'];
export const DEADLINES = ['Pas pressé', '1 mois', '2 semaines', 'Urgent'];

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Slug cote client pour le prefixe R2 (le serveur re-slugifie de toute facon). */
export function slugifyLite(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

export function validateStep(step: number, d: Data): Record<string, string> {
  const errors: Record<string, string> = {};
  const req = (field: string, msg: string) => {
    if (!(d[field] || '').trim()) errors[field] = msg;
  };
  if (step === 1) {
    req('prenom', 'Votre prénom est requis.');
    req('nom', 'Votre nom est requis.');
    req('activite', "Le nom de votre activité est requis.");
    req('type_client', 'Choisissez le type qui vous correspond.');
  }
  if (step === 2) {
    req('email', 'Votre email est requis.');
    if (d.email && !EMAIL_RE.test(d.email.trim())) errors.email = 'Cet email ne semble pas valide.';
    if (!errors.email && (d.email_confirm || '').trim() !== (d.email || '').trim()) {
      errors.email_confirm = 'Les deux emails ne correspondent pas.';
    }
    req('ville', 'Votre ville est requise.');
    req('pays', 'Votre pays est requis.');
    req('canal_prefere', 'Choisissez un canal de contact.');
  }
  if (step === 4) {
    req('objectif', 'Choisissez votre objectif principal.');
    if (d.objectif === 'Autre') req('objectif_autre', 'Précisez votre objectif.');
  }
  if (step === 5) {
    if (d.rgpd !== 'oui') errors.rgpd = 'Votre accord est nécessaire pour envoyer le dossier.';
  }
  return errors;
}

export function clientTypeLabel(value: string): string {
  return CLIENT_TYPES.find((t) => t.value === value)?.label || value;
}

// Recap : sections par etape, [id de champ, label]. Les champs vides sont omis a l'affichage.
export const RECAP_SECTIONS: { step: number; title: string; fields: [string, string][] }[] = [
  {
    step: 1,
    title: 'Identité',
    fields: [
      ['prenom', 'Prénom'], ['nom', 'Nom'], ['activite', 'Activité'], ['type_client', 'Type'],
      ['siret', 'SIRET'], ['adresse', 'Adresse'], ['zone_intervention', "Zone d'intervention"], ['horaires', 'Horaires'],
      ['discipline', 'Discipline'], ['nom_scene', 'Nom de scène'],
      ['expertise', 'Expertise'], ['certifications', 'Certifications'],
      ['objet_social', 'Objet social'], ['nb_adherents', 'Adhérents'], ['statut_juridique', 'Statut juridique'],
      ['nb_produits', 'Nombre de produits'], ['plateforme_actuelle', 'Plateforme actuelle'], ['paiement', 'Paiement souhaité'],
    ],
  },
  {
    step: 2,
    title: 'Coordonnées',
    fields: [
      ['email', 'Email'], ['telephone', 'Téléphone'], ['ville', 'Ville'], ['pays', 'Pays'], ['canal_prefere', 'Canal préféré'],
    ],
  },
  {
    step: 3,
    title: 'Photos et assets',
    fields: [['couleurs', 'Couleurs préférées'], ['sites_aimes', 'Sites aimés']],
  },
  {
    step: 4,
    title: 'Contexte',
    fields: [
      ['url_site', 'Site actuel'], ['reseaux', 'Réseaux sociaux'], ['fiche_google', 'Fiche Google'],
      ['objectif', 'Objectif'], ['objectif_autre', 'Objectif (précision)'], ['freins', 'Ce qui vous freine'],
      ['budget', 'Budget'], ['deadline', 'Deadline'], ['autre', 'Autre chose'],
      ['avis_google', 'Avis Google'], ['nb_avis', "Nombre d'avis"],
      ['catalogue_pret', 'Catalogue prêt'], ['photos_produits', 'Photos produits'],
      ['book', 'Book en ligne'], ['book_url', 'Lien du book'],
    ],
  },
];
