/**
 * POST /api/lead-inbound
 *
 * Reçoit les soumissions des formulaires marcm.fr (via Web3Forms webhook OU
 * directement) et les enregistre dans prospection/leads-master.json du repo
 * web-factory-hub via l'API GitHub.
 *
 * Flux :
 *   [formulaire marcm.fr] --POST--> [api.web3forms.com/submit]
 *                                        |
 *                                        +-- email a Marc (natif W3F)
 *                                        +-- webhook JSON --> /api/lead-inbound (cette fonction)
 *                                                                 |
 *                                                                 v
 *                                                      GitHub PUT contents
 *                                                      prospection/leads-master.json
 *
 * Compatible schema wf-crm :
 *   - contact flat (pas de nesting)
 *   - _stats regenere (total, par_type, par_statut_outreach, par_statut_funnel,
 *     par_campagne, par_departement)
 *   - contacts tries par priorite (voir wf-crm SKILL.md)
 *   - dedupe par email case-insensitive
 *
 * Env vars CF Pages requises (a configurer via dashboard CF, pas wrangler) :
 *   - GITHUB_TOKEN : PAT classique avec scope `repo` sur mavailable/web-factory-hub
 *   - LEADS_REPO   : "mavailable/web-factory-hub"
 *   - LEADS_PATH   : "prospection/leads-master.json"
 *   - LEADS_BRANCH : "master"
 *
 * Retourne toujours 200 OK si possible (Web3Forms timeout 30s, on ne veut pas
 * bloquer le flux email). Log les erreurs dans la reponse pour debug.
 */

import {
  slugify,
  githubGetFileAt,
  githubPutFileAt,
  githubUpdateJsonAt,
  resolveArchiveSlug,
  parseR2Keys,
  upsertQueueEntry,
  hmacSign,
  buildNotifyNote,
} from './_onboarding-lib.js';

const ALLOWED_ORIGINS = [
  'https://marcm.fr',
  'https://www.marcm.fr',
];

const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/[a-z0-9-]+\.marcmuller-site\.pages\.dev$/,
];

const FORM_SOURCE_META = {
  contact:            { campagne: 'site-contact',         from_page: '/contact/' },
  echo:               { campagne: 'site-echo',            from_page: '/echo/' },
  commander:          { campagne: 'site-commander',       from_page: '/commander/' },
  'audit-gratuit':    { campagne: 'site-audit-gratuit',   from_page: '/audit-gratuit/' },
  'contact-en':       { campagne: 'site-contact-en',      from_page: '/en/contact/' },
  'free-audit-en':    { campagne: 'site-audit-gratuit-en',from_page: '/en/free-audit/' },
};

function corsHeaders(origin) {
  const allowed =
    ALLOWED_ORIGINS.includes(origin) ||
    ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(origin || ''));
  return {
    'Access-Control-Allow-Origin': allowed ? origin : 'https://marcm.fr',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function json(status, body, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin),
    },
  });
}

// ------- normalisation -------

async function readBody(request) {
  const ct = (request.headers.get('Content-Type') || '').toLowerCase();
  if (ct.includes('application/json')) {
    return await request.json();
  }
  if (ct.includes('application/x-www-form-urlencoded')) {
    const text = await request.text();
    const params = new URLSearchParams(text);
    const obj = {};
    for (const [k, v] of params) obj[k] = v;
    return obj;
  }
  if (ct.includes('multipart/form-data')) {
    const form = await request.formData();
    const obj = {};
    for (const [k, v] of form) obj[k] = typeof v === 'string' ? v : '';
    return obj;
  }
  // fallback
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function pick(obj, keys) {
  for (const k of keys) {
    if (obj[k] != null && String(obj[k]).trim() !== '') return String(obj[k]).trim();
  }
  return '';
}

function normalizeLead(raw) {
  const email = pick(raw, ['email', 'mail', 'e-mail']).toLowerCase();
  const firstName = pick(raw, ['first_name', 'firstname', 'prenom']);
  const lastName = pick(raw, ['last_name', 'lastname', 'nom']);
  const fullName = pick(raw, ['fullname', 'name']);
  const nom = fullName || [firstName, lastName].filter(Boolean).join(' ') || '';

  const phone = pick(raw, ['phone', 'telephone', 'tel']);
  const message = pick(raw, [
    'message',
    'probleme',
    'activite',
    'activity',
    'activity_description',
    'situation',
    'project',
  ]);

  const metier = pick(raw, ['metier', 'activity', 'activite', 'activity_description']);
  const ville = pick(raw, ['ville', 'city']);
  const url_site = pick(raw, ['url_site', 'current_website', 'website', 'site']);
  const company = pick(raw, ['company', 'entreprise', 'societe']);

  const formSource = pick(raw, ['form_source']) || 'unknown';
  const meta = FORM_SOURCE_META[formSource] || {
    campagne: `site-${formSource}`,
    from_page: '/',
  };

  return {
    email,
    nom,
    firstName,
    lastName,
    phone,
    message,
    metier,
    ville,
    url_site,
    company,
    form_source: formSource,
    campagne: meta.campagne,
    from_page: meta.from_page,
  };
}

// ------- stats & tri (copie wf-crm) -------

function recomputeStats(crm) {
  const contacts = crm.contacts || [];
  const stats = {
    total: contacts.length,
    par_type: {},
    par_statut_outreach: {},
    par_statut_funnel: {},
    par_campagne: {},
    par_departement: {},
  };
  for (const c of contacts) {
    if (c.type) stats.par_type[c.type] = (stats.par_type[c.type] || 0) + 1;
    if (c.statut_outreach) stats.par_statut_outreach[c.statut_outreach] = (stats.par_statut_outreach[c.statut_outreach] || 0) + 1;
    const sf = c.statut_funnel || 'inconnu';
    stats.par_statut_funnel[sf] = (stats.par_statut_funnel[sf] || 0) + 1;
    const cp = c.campagne || 'inconnu';
    stats.par_campagne[cp] = (stats.par_campagne[cp] || 0) + 1;
    const dp = c.departement || 'inconnu';
    stats.par_departement[dp] = (stats.par_departement[dp] || 0) + 1;
  }
  // preserver last_runner existant s'il y en a un, sinon tag la Function
  const prev = crm._stats || {};
  if (prev.last_runner) stats.last_runner = prev.last_runner;
  stats.last_writer = {
    name: 'marcm-lead-inbound',
    date: new Date().toISOString().slice(0, 19),
  };
  crm._stats = stats;
}

function priorityBucket(c) {
  const sf = c.statut_funnel;
  const so = c.statut_outreach;
  if (['REPLIED', 'LEAD', 'CONVERTED'].includes(sf)) return 0;
  if (['SENT', 'RELANCE'].includes(sf)) return 1;
  if (so === 'ECHO_PRET' && sf === 'DRAFT') return 2;
  if (so === 'ECHO_PRET') return 3;
  if (so === 'INBOUND') return 4; // nos nouveaux leads inbound, prio haute
  if (!so || so === 'PROSPECT') return 5;
  if (so === 'EXCLURE') return 6;
  if (['REFUSED', 'NO_RESPONSE'].includes(sf)) return 7;
  return 5;
}

function sortContacts(contacts) {
  contacts.sort((a, b) => {
    const pa = priorityBucket(a);
    const pb = priorityBucket(b);
    if (pa !== pb) return pa - pb;
    const da = a.date_ajout || '';
    const db = b.date_ajout || '';
    return db.localeCompare(da);
  });
}

// ------- merge / dedupe -------

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function nowISO() {
  return new Date().toISOString().slice(0, 19);
}

function buildContactId(lead, existingIds) {
  const base =
    slugify(lead.nom || lead.company) ||
    slugify(lead.email.split('@')[0]) ||
    `inbound-${Date.now()}`;
  let id = base;
  let i = 2;
  while (existingIds.has(id)) {
    id = `${base}-${i}`;
    i += 1;
  }
  return id;
}

function appendInboundEvent(contact, lead) {
  const events = contact.inbound_events || [];
  events.push({
    date: nowISO(),
    form: lead.form_source,
    from_page: lead.from_page,
    message: lead.message || undefined,
  });
  contact.inbound_events = events;
  contact.nb_submissions = events.length;
  contact.last_inbound_at = nowISO();
  contact.last_inbound_form = lead.form_source;
}

function mergeOrCreate(crm, lead) {
  const contacts = crm.contacts || (crm.contacts = []);
  const emailLower = lead.email.toLowerCase();

  // dedupe par email (case insensitive)
  const existing = contacts.find(
    (c) => (c.email || '').toLowerCase() === emailLower
  );

  if (existing) {
    // enrichissement soft : on ne remplace PAS les champs existants deja remplis,
    // on ajoute juste les manquants + on log l'event
    if (!existing.nom && lead.nom) existing.nom = lead.nom;
    if (!existing.telephone && lead.phone) existing.telephone = lead.phone;
    if (!existing.ville && lead.ville) existing.ville = lead.ville;
    if (!existing.metier && lead.metier) existing.metier = lead.metier;
    if (!existing.url_site && lead.url_site) existing.url_site = lead.url_site;

    appendInboundEvent(existing, lead);
    existing._maj = todayISO();

    // Un lead inbound (2e soumission) reste prio : si le contact etait
    // PROSPECT ou absent, on ne le degrade pas. S'il etait EXCLURE, on ne
    // le repromeut pas automatiquement -- Marc decide.
    if (!existing.statut_outreach) existing.statut_outreach = 'INBOUND';
    if (!existing.statut_funnel) existing.statut_funnel = 'INBOUND';

    return { action: 'updated', contact: existing };
  }

  const ids = new Set(contacts.map((c) => c.id));
  const id = buildContactId(lead, ids);

  const contact = {
    id,
    type: 'inbound',
    nom: lead.nom || lead.company || lead.email,
    email: lead.email,
    telephone: lead.phone || undefined,
    ville: lead.ville || undefined,
    metier: lead.metier || undefined,
    url_site: lead.url_site || undefined,
    notes: lead.message || undefined,
    campagne: lead.campagne,
    tags: ['inbound', `form-${lead.form_source}`],
    source: 'site-marcm',
    date_ajout: todayISO(),
    statut_outreach: 'INBOUND',
    statut_funnel: 'INBOUND',
    _maj: todayISO(),
  };
  appendInboundEvent(contact, lead);

  // nettoyer undefined
  for (const k of Object.keys(contact)) {
    if (contact[k] === undefined) delete contact[k];
  }

  contacts.unshift(contact);
  return { action: 'created', contact };
}

// ------- handler -------

export async function onRequestOptions({ request }) {
  const origin = request.headers.get('Origin') || '';
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin') || '';

  // env check
  for (const k of ['GITHUB_TOKEN', 'LEADS_REPO', 'LEADS_PATH', 'LEADS_BRANCH']) {
    if (!env[k]) {
      return json(500, { ok: false, error: `missing env ${k}` }, origin);
    }
  }

  let raw;
  try {
    raw = await readBody(request);
  } catch (e) {
    return json(400, { ok: false, error: `bad body: ${e.message}` }, origin);
  }

  // Web3Forms peut wrapper la data dans un champ `data` ou l'envoyer a plat.
  // Normalement Web3Forms envoie a plat avec tous les champs.
  if (raw && raw.data && typeof raw.data === 'object') raw = raw.data;

  const lead = normalizeLead(raw);
  if (!lead.email || !/@/.test(lead.email)) {
    return json(400, { ok: false, error: 'email manquant ou invalide' }, origin);
  }

  // botcheck honeypot (si jamais le POST direct inclut ce champ)
  if (raw.botcheck) {
    return json(200, { ok: true, action: 'ignored', reason: 'honeypot' }, origin);
  }

  try {
    const { json: crm, sha } = await githubGetFileAt(env, env.LEADS_PATH);
    if (!crm) throw new Error('leads-master introuvable');
    const { action, contact } = mergeOrCreate(crm, lead);
    recomputeStats(crm);
    sortContacts(crm.contacts);
    crm._maj = nowISO();

    const commitMessage = `inbound: ${action} lead ${contact.id} via ${lead.form_source}`;
    await githubPutFileAt(env, env.LEADS_PATH, crm, sha, commitMessage);

    return json(200, {
      ok: true,
      action,
      contact_id: contact.id,
      form_source: lead.form_source,
    }, origin);
  } catch (e) {
    // Ne jamais bloquer Web3Forms : renvoyer 200 avec error en body pour que
    // Web3Forms ne retry pas et que l'email a Marc soit bien delivre.
    return json(200, {
      ok: false,
      error: e.message,
      form_source: lead.form_source,
      email: lead.email,
    }, origin);
  }
}

// fallback autres methodes
export async function onRequest({ request }) {
  const origin = request.headers.get('Origin') || '';
  if (request.method === 'POST') return onRequestPost({ request, env: {} });
  if (request.method === 'OPTIONS') return onRequestOptions({ request });
  return json(405, { ok: false, error: 'method not allowed' }, origin);
}
