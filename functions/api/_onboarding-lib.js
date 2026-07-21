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
  'image/svg+xml', // un SVG peut contenir du script : ces fichiers ne doivent JAMAIS etre servis inline sur l'origin (prives R2 only)
];

/** @param {{size:number,type:string}} meta */
export function validateUploadMeta({ size, type }) {
  if (!UPLOAD_ALLOWED_TYPES.includes(type)) {
    return { ok: false, status: 415, error: `type non autorise: ${type || 'inconnu'}` };
  }
  if (!Number.isFinite(size) || size <= 0 || size > UPLOAD_MAX_BYTES) {
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
 * Mute la queue en place quand elle est valide ; toujours utiliser la valeur retournee (queue null/invalide -> nouvel objet).
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

/**
 * Mute la queue en place quand elle est valide ; toujours utiliser la valeur retournee (queue null/invalide -> nouvel objet).
 */
export function approveQueueEntry(queue, slug, approuveAt) {
  const q = queue && Array.isArray(queue.entries) ? queue : emptyQueue();
  // invariant: l'upsert insere les entrees recu en tete, donc la 1re occurrence du slug est la plus recente
  const entry = q.entries.find((e) => e.slug === slug);
  if (!entry) return { ok: false, reason: 'not_found' };
  if (entry.statut === 'approuve') return { ok: true, already: true, entry };
  if (entry.statut !== 'recu') return { ok: false, reason: `statut ${entry.statut}` };
  entry.statut = 'approuve';
  entry.approuve_at = approuveAt;
  return { ok: true, already: false, entry };
}

// ------- payload onboarding -------

/**
 * r2_keys arrive en JSON string depuis le formulaire (entree non fiable).
 * Filtre strict : forme exacte onboarding/<slug>/<fichier> produite par
 * l'upload (pas de traversal, pas de segment vide), cap a UPLOAD_MAX_FILES.
 */
export function parseR2Keys(value) {
  try {
    const arr = JSON.parse(value || '[]');
    if (!Array.isArray(arr)) return [];
    return arr
      .filter((k) => typeof k === 'string' && /^onboarding\/[a-z0-9-]+\/[a-z0-9][a-z0-9.-]*$/.test(k))
      .slice(0, UPLOAD_MAX_FILES);
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

// ------- GitHub contents API (generalisation des helpers lead-inbound) -------

function ghHeaders(env, accept) {
  return {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    'User-Agent': 'marcm-lead-inbound',
    'X-GitHub-Api-Version': '2022-11-28',
    Accept: accept,
  };
}

/**
 * Lit un fichier du repo hub. Retourne { json, sha } ; { json: null, sha: null } si 404.
 * 2 appels (object media type pour le sha, raw pour le contenu) : leads-master
 * pese ~3 MB et l'API contents ne renvoie pas `content` au-dessus de 1 MB.
 * @param {object} env  @param {string} path  @param {typeof fetch} [fetchFn]
 */
export async function githubGetFileAt(env, path, fetchFn = fetch) {
  const base = `https://api.github.com/repos/${env.LEADS_REPO}/contents/${path}?ref=${env.LEADS_BRANCH}`;
  const metaResp = await fetchFn(base, { headers: ghHeaders(env, 'application/vnd.github.object+json') });
  if (metaResp.status === 404) return { json: null, sha: null };
  if (!metaResp.ok) {
    throw new Error(`github meta failed ${metaResp.status}: ${await metaResp.text()}`);
  }
  const meta = await metaResp.json();
  if (!meta.sha) throw new Error('github meta missing sha');
  const rawResp = await fetchFn(base, { headers: ghHeaders(env, 'application/vnd.github.raw') });
  if (!rawResp.ok) {
    throw new Error(`github raw failed ${rawResp.status}: ${await rawResp.text()}`);
  }
  return { json: JSON.parse(await rawResp.text()), sha: meta.sha };
}

/**
 * Ecrit un objet JSON (pretty + newline final). sha null = creation.
 * @param {object} env  @param {string} path  @param {object} json
 * @param {string|null} sha  @param {string} commitMessage  @param {typeof fetch} [fetchFn]
 */
export async function githubPutFileAt(env, path, json, sha, commitMessage, fetchFn = fetch) {
  const text = JSON.stringify(json, null, 2) + '\n';
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  const body = {
    message: commitMessage,
    content: btoa(binary),
    branch: env.LEADS_BRANCH,
    committer: { name: 'marcm-lead-inbound', email: 'marc@muller.im' },
  };
  if (sha) body.sha = sha;
  const resp = await fetchFn(`https://api.github.com/repos/${env.LEADS_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { ...ghHeaders(env, 'application/vnd.github+json'), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    throw new Error(`github put failed ${resp.status}: ${await resp.text()}`);
  }
  return await resp.json();
}

/**
 * Read-modify-write avec un unique retry si conflit sha (409 GitHub).
 * mutate(jsonOrNull) doit RETOURNER l'objet a ecrire.
 */
export async function githubUpdateJsonAt(env, path, mutate, commitMessage, fetchFn = fetch) {
  const attempt = async () => {
    const { json, sha } = await githubGetFileAt(env, path, fetchFn);
    return githubPutFileAt(env, path, mutate(json), sha, commitMessage, fetchFn);
  };
  try {
    return await attempt();
  } catch (e) {
    if (String(e.message).includes('409')) return await attempt();
    throw e;
  }
}

/**
 * Slug d'archive : reutilise le slug si le dossier existant a le meme email
 * (resoumission -> overwrite avec sha), sinon suffixe -2, -3... (collision).
 */
export async function resolveArchiveSlug(env, baseSlug, email, fetchFn = fetch) {
  const base = baseSlug || 'sans-nom';
  for (let i = 0; i < 5; i += 1) {
    const candidate = i === 0 ? base : `${base}-${i + 1}`;
    const { json, sha } = await githubGetFileAt(env, `prospection/onboarding/${candidate}.json`, fetchFn);
    if (!json) return { slug: candidate, sha: null };
    const archivedEmail = (((json || {}).payload || {}).email || '').toLowerCase();
    if (archivedEmail === (email || '').toLowerCase()) return { slug: candidate, sha };
  }
  return { slug: `${base}-${Date.now()}`, sha: null };
}
