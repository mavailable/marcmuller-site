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

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost({ request, env }) {
  if (!env.VOCAUX) return json(500, { ok: false, error: 'binding VOCAUX manquant' });

  const ct = (request.headers.get('Content-Type') || '').toLowerCase();
  if (!ct.includes('multipart/form-data')) {
    return json(400, { ok: false, error: 'multipart/form-data attendu' });
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
    const key = `${prefix}${Date.now()}-${safeFilename(file.name)}`;
    await env.VOCAUX.put(key, file.stream(), {
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
