/**
 * POST /api/onboarding-upload — upload same-origin des fichiers du formulaire
 * /onboarding vers R2 (binding VOCAUX, bucket vocaux-clients), prefixe
 * onboarding/<slug>/. Fichiers prives, jamais servis en public (lecture cote
 * agence via l'API R2 uniquement).
 *
 * multipart/form-data : file (File), slug_hint (string), botcheck (honeypot).
 * Reponse : { ok: true, key } | { ok: false, error } (400/413/415/500).
 *
 * Garde-fous : whitelist MIME + 5 Mo (validateUploadMeta), max 15 objets par
 * prefixe slug, honeypot (reponse 200 factice, rien d'ecrit).
 */

import {
  slugify,
  safeFilename,
  validateUploadMeta,
  UPLOAD_MAX_FILES,
} from './_onboarding-lib.js';

// Un POST multipart est une "simple request" : sans ce check, n'importe quel
// site tiers peut faire uploader les visiteurs a leur insu.
const ALLOWED_ORIGINS = ['https://marcm.fr', 'https://www.marcm.fr'];
const ALLOWED_ORIGIN_PATTERNS = [/^https:\/\/[a-z0-9-]+\.marcmuller-site\.pages\.dev$/];

function originAllowed(origin) {
  if (!origin) return true; // pas de header Origin (curl, outils) : on laisse passer, les gardes contenu s'appliquent
  return ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(origin));
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost({ request, env }) {
  if (!originAllowed(request.headers.get('Origin') || '')) {
    return json(403, { ok: false, error: 'origin non autorisee' });
  }
  if (!env.VOCAUX) return json(500, { ok: false, error: 'binding VOCAUX manquant' });

  const ct = (request.headers.get('Content-Type') || '').toLowerCase();
  if (!ct.includes('multipart/form-data')) {
    return json(400, { ok: false, error: 'multipart/form-data attendu' });
  }

  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared > 6 * 1024 * 1024) {
    return json(413, { ok: false, error: 'fichier trop lourd (max 5 Mo)' });
  }

  let form;
  try {
    form = await request.formData();
  } catch (e) {
    return json(400, { ok: false, error: `body illisible: ${e.message}` });
  }

  // honeypot : succes factice, rien d'ecrit
  if (String(form.get('botcheck') || '').trim() !== '') {
    return json(200, { ok: true, key: 'onboarding/ignored' });
  }

  const file = form.get('file');
  if (!(file instanceof File)) return json(400, { ok: false, error: 'champ file manquant' });

  const slug = slugify(String(form.get('slug_hint') || ''));
  if (!slug) return json(400, { ok: false, error: 'slug_hint manquant' });

  const v = validateUploadMeta({ size: file.size, type: file.type });
  if (!v.ok) return json(v.status, { ok: false, error: v.error });

  const prefix = `onboarding/${slug}/`;
  try {
    const listed = await env.VOCAUX.list({ prefix, limit: UPLOAD_MAX_FILES + 1 });
    if (listed.objects.length >= UPLOAD_MAX_FILES) {
      return json(413, { ok: false, error: `quota fichiers atteint (${UPLOAD_MAX_FILES})` });
    }
    const key = `${prefix}${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeFilename(file.name)}`;
    await env.VOCAUX.put(key, file, {
      httpMetadata: { contentType: file.type },
    });
    return json(200, { ok: true, key });
  } catch (e) {
    console.error('onboarding upload', e);
    return json(500, { ok: false, error: 'stockage indisponible' });
  }
}

export async function onRequest({ request, env }) {
  if (request.method === 'POST') return onRequestPost({ request, env });
  return json(405, { ok: false, error: 'method not allowed' });
}
