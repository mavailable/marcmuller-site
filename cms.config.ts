import type { CmsConfig } from '@marc/cms-engine/types';

// ============================================================
// Configuration CMS — marcm.fr (COCKPIT BUSINESS, pas d'édition du site)
// ============================================================
// /admin = cockpit interne de Marc : CRM clients (funnel agence) +
// devis/factures PDF (billing on, einvoice off) + kanban « Mes tâches ».
// Le site public marcm.fr n'est PAS édité via ce CMS : aucune collection,
// aucun singleton de site. Le module LOCAL ./cms-modules/cockpit force
// l'atterrissage sur #/crm et masque les onglets d'édition de site.
//
// Persistance :
//   - CRM + facturation : D1 (binding DB) + R2 (binding VOCAUX, PDF archivés
//     sous marcm/documents/) — rien dans le repo git.
//   - Kanban « Mes tâches » : preset git-JSON (src/content/tasks/index.json,
//     seed committé). PAS déclaré dans un content.config → jamais servi
//     publiquement. ⚠ chaque sauvegarde du board = commit sur CMS_BRANCH
//     (master = prod sur ce repo) → redeploy CF (contenu public identique).
// ============================================================

const cmsConfig: CmsConfig = {
  repo: 'mavailable/marcmuller-site',
  branch: 'master', // pas de branche dev sur ce repo : master = prod
  siteName: 'Marc Muller',
  locale: 'fr',
  // Pas de siteLogo : marcm.fr n'a pas de wordmark exploitable (favicons seuls).
  // Fallback texte siteName en Satoshi (règle wf-00-cms §5).

  // Branding admin — variante CLAIRE fidèle à l'identité marcm.fr (global.css :
  // primary charcoal, secondary crème chaude, accent terracotta/coral #E86C47 ;
  // font Satoshi variable). L'accent admin est le terracotta contrast-safe #B5472B
  // (= le propre --color-accent-text du site ; l'accent display #E86C47 échoue le
  // contraste sur blanc). Gate admin-theme-validate.py OK. Contrastes WCAG :
  //   accent 5.38 / accentDeep sur accentSoft 6.10 / ink 17.4 / inkSoft 10.86 /
  //   muted 7.81 / muted2 5.33 sur blanc (muted3 3.54 WARN).
  adminTheme: {
    accent: '#B5472B',        // terracotta (boutons, liens, onglet actif)
    accentDeep: '#933A25',    // terracotta foncé (texte sur pastille accentSoft, badges)
    accentSoft: '#F5E8E3',    // rosé très pâle (pastilles) = --color-accent-light du site
    accentBorder: '#FACBB8',  // corail clair (bordures accent)
    ink: '#1A1A1A',           // charcoal encre (titres)
    inkSoft: '#3D3D3D',       // charcoal secondaire (labels)
    muted: '#525252',         // gris chaud (paragraphes)
    muted2: '#6B6B6B',        // gris (méta, contacts)
    muted3: '#888888',        // gris clair (hints, dates)
    line: '#F0EEEB',          // ligne crème (bordures de cartes)
    lineSoft: '#F5F3EF',      // séparateur crème très doux
    borderInput: '#E5E2DC',   // bordure crème des champs
    surface: '#ffffff',       // fond des cartes
    bg: '#FAFAF8',            // crème chaude (fond de l'espace)
    fontBody: "'Satoshi', system-ui, sans-serif",     // même corps que le site
    fontHeading: "'Satoshi', system-ui, sans-serif",  // même titrage que le site
  },

  // Modules moteur + module LOCAL cockpit (defaultRoute #/crm + hidesTabs).
  modules: ['crm', 'board', 'marketing', './cms-modules/cockpit'],

  site: {
    webmasterName: 'Marc',
    helpUrl: 'https://marcm.fr/aide/web3forms/',
    email: 'marc@muller.im',
    siteUrl: 'https://marcm.fr',
    previewUrl: 'https://marcmuller-site.pages.dev',
    clientType: 'freelance-consultant',
    // Onglet Statistiques (AnalyticsTab cœur) : iframe Umami Cloud via share
    // link. Nécessite frame-src https://cloud.umami.is dans la CSP admin
    // (scripts/generate-csp.mjs → CSP_ADMIN_VALUE).
    umamiShareUrl: 'https://cloud.umami.is/share/PQwpWjdhsSJGd5k6/marcm.fr',
    contactMarc: {
      phone: '06 88 76 66 48',
      whatsapp: '33688766648',
      email: 'marc@muller.im',
    },
  },

  // Cockpit only : aucun contenu de site géré par le CMS.
  singletons: {},
  collections: {},

  // Kanban « Mes tâches » — preset mono-board (BoardTab, storage figé
  // src/content/tasks/index.json, enveloppe { tasks: [...] }).
  kanban: { enabled: true },

  // Module marketing — onglets Marketing (plan de publication) + Carrousels.
  // Aucune donnée seedée : les deux tabs ont un empty-state propre sans
  // fichier /marketing-data/*. `trimesters` volontairement OMIS tant qu'aucun
  // plan-YYYY-QN.json n'existe (sinon le tab fetche le fichier et affiche un
  // toast « Plan introuvable »). PAS de bloc gbp : GbpPostsTab utilise des
  // fixtures hardcodées jd-zoo (MOCK_ARTICLES) — à ne pas activer sur marcm.
  marketing: {
    enabled: true,
    carrousels: { enabled: true },
  },

  // Mini-CRM « Clients » — funnel agence 5 colonnes + facturation.
  crm: {
    enabled: true,
    label: 'Clients',
    itemLabel: 'client',
    // billing: true par défaut (devis/factures PDF actifs).
    einvoice: false, // surfaces ⚡ facture électronique masquées pour l'instant
    columns: [
      { status: 'nouveau', label: 'Nouveau', hint: 'À traiter', dot: '#94a3b8' },
      { status: 'echange', label: 'Échange', hint: 'En discussion', dot: '#3b82f6' },
      { status: 'devis', label: 'Devis envoyé', hint: 'Proposition faite', dot: '#f59e0b' },
      { status: 'gagne', label: 'Gagné', hint: 'Conclu', dot: '#16a34a' },
      { status: 'perdu', label: 'Perdu', hint: 'Sans suite', dot: '#cbd5e1' },
    ],
  },
};

export default cmsConfig;
