/**
 * Helpers partages du flux onboarding (upload, lead-inbound, approve).
 * Fichier prefixe `_` : non route par CF Pages (meme convention que _middleware).
 * JS pur + JSDoc uniquement — jamais de .ts sous functions/ (deploy CF plante).
 * Logique pure testable via `node --test tests/` (node >= 22, zero dependance).
 */

// ------- slug / noms de fichiers -------

export function slugify(s) {
  return (s || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Nettoie un nom de fichier utilisateur : slug + extension alphanumerique, <= 90 chars. */
export function safeFilename(name) {
  const raw = (name || '').toString();
  const dot = raw.lastIndexOf('.');
  const base = dot > 0 ? raw.slice(0, dot) : raw;
  const ext = dot > 0 ? raw.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, '') : '';
  const slug = (slugify(base) || 'fichier').slice(0, 80);
  return ext ? `${slug}.${ext.slice(0, 8)}` : slug;
}

// ------- validation upload -------

export const UPLOAD_MAX_BYTES = 5 * 1024 * 1024;
export const UPLOAD_MAX_FILES = 15;
export const UPLOAD_ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'image/svg+xml',
];

/** @param {{size:number,type:string}} meta */
export function validateUploadMeta({ size, type }) {
  if (!UPLOAD_ALLOWED_TYPES.includes(type)) {
    return { ok: false, status: 415, error: `type non autorise: ${type || 'inconnu'}` };
  }
  if (!size || size > UPLOAD_MAX_BYTES) {
    return { ok: false, status: 413, error: 'fichier vide ou trop lourd (max 5 Mo)' };
  }
  return { ok: true };
}

// ------- HMAC (lien d'approbation) -------

export async function hmacSign(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function hmacVerify(secret, message, sigHex) {
  const expected = await hmacSign(secret, message);
  const given = String(sigHex || '');
  if (expected.length !== given.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i += 1) diff |= expected.charCodeAt(i) ^ given.charCodeAt(i);
  return diff === 0;
}

// ------- queue (prospection/onboarding/queue.json) -------
// Statuts : recu -> approuve -> en_cours -> livre | erreur.
// Ce chantier n'ecrit que recu (upsert) et approuve (flip).

export function emptyQueue() {
  return { version: 1, entries: [] };
}

/**
 * Nouvelle soumission : met a jour l'entree `recu` du meme slug (resoumission),
 * sinon cree une nouvelle entree en tete.
 */
export function upsertQueueEntry(queue, { slug, email, nom, activite, recu_at }) {
  const q = queue && Array.isArray(queue.entries) ? queue : emptyQueue();
  const existing = q.entries.find((e) => e.slug === slug && e.statut === 'recu');
  if (existing) {
    Object.assign(existing, { email, nom, activite, recu_at });
    return { queue: q, action: 'updated' };
  }
  q.entries.unshift({ slug, email, nom, activite, statut: 'recu', recu_at });
  return { queue: q, action: 'created' };
}

export function approveQueueEntry(queue, slug, approuveAt) {
  const q = queue && Array.isArray(queue.entries) ? queue : emptyQueue();
  const entry = q.entries.find((e) => e.slug === slug);
  if (!entry) return { ok: false, reason: 'not_found' };
  if (entry.statut === 'approuve') return { ok: true, already: true, entry };
  if (entry.statut !== 'recu') return { ok: false, reason: `statut ${entry.statut}` };
  entry.statut = 'approuve';
  entry.approuve_at = approuveAt;
  return { ok: true, already: false, entry };
}

// ------- payload onboarding -------

/** r2_keys arrive en JSON string depuis le formulaire ; ne garder que le prefixe onboarding/. */
export function parseR2Keys(value) {
  try {
    const arr = JSON.parse(value || '[]');
    if (!Array.isArray(arr)) return [];
    return arr.filter((k) => typeof k === 'string' && k.startsWith('onboarding/'));
  } catch {
    return [];
  }
}

/** Recap texte pour /notify-marc. Champs vides omis. Pas de em dash (contenu mail). */
export function buildNotifyNote(p, approveUrl) {
  const lines = ['Nouveau dossier onboarding recu.', ''];
  const rows = [
    ['Nom', p.nom],
    ['Activite', p.activite],
    ['Type', p.type],
    ['Ville', p.ville],
    ['Pays', p.pays],
    ['Objectif', p.objectif],
    ['Budget', p.budget],
    ['Fichiers', p.nbFichiers ? String(p.nbFichiers) : ''],
  ];
  for (const [label, val] of rows) {
    if (val) lines.push(`${label} : ${val}`);
  }
  lines.push('', 'Approuver le dossier (lien valable 7 jours) :', approveUrl);
  return lines.join('\n');
}
