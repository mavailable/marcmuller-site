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

  // Modules moteur + module LOCAL cockpit (defaultRoute #/crm + hidesTabs).
  modules: ['crm', 'board', './cms-modules/cockpit'],

  site: {
    webmasterName: 'Marc',
    helpUrl: 'https://marcm.fr/aide/web3forms/',
    email: 'marc@muller.im',
    siteUrl: 'https://marcm.fr',
    previewUrl: 'https://marcmuller-site.pages.dev',
    clientType: 'freelance-consultant',
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
