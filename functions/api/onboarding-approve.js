/**
 * GET /api/onboarding-approve?slug=<slug>&exp=<unix>&sig=<hex>
 * Lien 1-clic depuis l'email de notification : flip queue recu -> approuve.
 * sig = HMAC-SHA256(ONBOARDING_SIGNING_KEY, "<slug>.<exp>"). Idempotent.
 * Reponse : petite page HTML (noindex, aucun secret).
 */

import {
  hmacVerify,
  approveQueueEntry,
  emptyQueue,
  githubGetFileAt,
  githubPutFileAt,
} from './_onboarding-lib.js';

const QUEUE_PATH = 'prospection/onboarding/queue.json';

function nowISO() {
  return new Date().toISOString().slice(0, 19);
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function page(status, title, message) {
  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${title}</title>
<style>
  body { font-family: -apple-system, system-ui, sans-serif; background: #FAFAF8; color: #1A1A1A;
         display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 24px; }
  main { max-width: 28rem; background: #fff; border: 1px solid #E5E2DC; border-radius: 16px;
         padding: 32px; text-align: center; }
  h1 { font-size: 1.25rem; margin: 0 0 12px; }
  p { margin: 0; color: #525252; line-height: 1.5; }
</style>
</head>
<body><main><h1>${title}</h1><p>${message}</p></main></body>
</html>`;
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function onRequestGet({ request, env }) {
  for (const k of ['GITHUB_TOKEN', 'LEADS_REPO', 'LEADS_BRANCH', 'ONBOARDING_SIGNING_KEY']) {
    if (!env[k]) {
      console.error('onboarding approve config', k);
      return page(500, 'Configuration incomplete', 'Contactez le webmaster.');
    }
  }

  const u = new URL(request.url);
  const slug = u.searchParams.get('slug') || '';
  const exp = u.searchParams.get('exp') || '';
  const sig = u.searchParams.get('sig') || '';

  if (!slug || !/^\d+$/.test(exp) || !sig) {
    return page(400, 'Lien invalide', 'Parametres manquants ou malformes.');
  }
  if (!(await hmacVerify(env.ONBOARDING_SIGNING_KEY, `${slug}.${exp}`, sig))) {
    return page(403, 'Lien invalide', 'Signature incorrecte.');
  }
  if (Number(exp) * 1000 < Date.now()) {
    return page(410, 'Lien expire', 'Ce lien a expire (7 jours). Approuvez le dossier depuis le hub.');
  }

  try {
    // read-modify-write, un retry si conflit sha
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const { json: queue, sha } = await githubGetFileAt(env, QUEUE_PATH);
      const res = approveQueueEntry(queue || emptyQueue(), slug, nowISO());
      if (!res.ok) {
        if (res.reason === 'not_found') {
          return page(404, 'Dossier introuvable', `Aucune entree de queue pour « ${esc(slug)} ».`);
        }
        return page(200, 'Deja traite', `Le dossier « ${esc(slug)} » est deja passe en ${res.reason.replace('statut ', 'statut « ') + ' »'}.`);
      }
      if (res.already) {
        return page(200, 'Deja approuve', `Le dossier « ${esc(slug)} » etait deja approuve. Rien a faire.`);
      }
      try {
        await githubPutFileAt(env, QUEUE_PATH, queue, sha, `onboarding: approve ${slug}`);
        return page(200, 'Dossier approuve', `Le dossier « ${esc(slug)} » est passe en statut « approuve ». Le runner peut le prendre en charge.`);
      } catch (e) {
        if (attempt === 0 && e.status === 409) continue;
        throw e;
      }
    }
    return page(500, 'Erreur', 'Conflit repete sur la queue, reessayez.');
  } catch (e) {
    console.error('onboarding approve', e);
    return page(500, 'Erreur', 'Echec de la mise a jour, reessayez.');
  }
}

export async function onRequest({ request, env }) {
  if (request.method === 'GET') return onRequestGet({ request, env });
  return page(405, 'Methode non autorisee', 'GET uniquement.');
}
