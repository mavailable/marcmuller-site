/**
 * /api/onboarding-approve — approbation en deux temps (confirmation POST).
 * GET  ?slug&exp&sig : verifie la signature et AFFICHE une page de confirmation
 *      (un GET — scanner d'email, prefetch — ne mute JAMAIS la queue).
 * POST (form slug/exp/sig) : re-verifie, flip queue recu -> approuve (idempotent),
 *      puis declenche le provisioning (wf-provision) en waitUntil.
 * sig = HMAC-SHA256(ONBOARDING_SIGNING_KEY, "<slug>.<exp>").
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

function page(status, title, message, extraHtml = '') {
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
<body><main><h1>${title}</h1><p>${message}</p>${extraHtml}</main></body>
</html>`;
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function checkEnv(env) {
  for (const k of ['GITHUB_TOKEN', 'LEADS_REPO', 'LEADS_BRANCH', 'ONBOARDING_SIGNING_KEY']) {
    if (!env[k]) {
      console.error('onboarding approve config', k);
      return page(500, 'Configuration incomplete', 'Contactez le webmaster.');
    }
  }
  return null;
}

async function checkParams(env, slug, exp, sig) {
  if (!slug || !/^\d+$/.test(exp) || !sig) {
    return page(400, 'Lien invalide', 'Parametres manquants ou malformes.');
  }
  if (!(await hmacVerify(env.ONBOARDING_SIGNING_KEY, `${slug}.${exp}`, sig))) {
    return page(403, 'Lien invalide', 'Signature incorrecte.');
  }
  if (Number(exp) * 1000 < Date.now()) {
    return page(410, 'Lien expire', 'Ce lien a expire (7 jours). Approuvez le dossier depuis le hub.');
  }
  return null;
}

/** Appel wf-provision, fire-and-forget via waitUntil (le run n'attend pas la reponse). */
function triggerProvision(context, slug) {
  const { env } = context;
  if (!env.PROVISION_URL || !env.PROVISION_TOKEN) {
    console.error('onboarding approve config', 'PROVISION_URL/PROVISION_TOKEN');
    return;
  }
  const work = fetch(`${env.PROVISION_URL}/provision`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.PROVISION_TOKEN}` },
    body: JSON.stringify({ slug }),
    signal: AbortSignal.timeout(25000),
  }).then(async (r) => {
    if (!r.ok) console.error('provision call', r.status, await r.text());
  }).catch((e) => console.error('provision call', e));
  if (typeof context.waitUntil === 'function') context.waitUntil(work);
}

export async function onRequestGet({ request, env }) {
  const envErr = checkEnv(env);
  if (envErr) return envErr;
  const u = new URL(request.url);
  const slug = u.searchParams.get('slug') || '';
  const exp = u.searchParams.get('exp') || '';
  const sig = u.searchParams.get('sig') || '';
  const paramErr = await checkParams(env, slug, exp, sig);
  if (paramErr) return paramErr;
  const form = `<form method="POST" action="/api/onboarding-approve" style="margin-top:20px">
<input type="hidden" name="slug" value="${esc(slug)}">
<input type="hidden" name="exp" value="${esc(exp)}">
<input type="hidden" name="sig" value="${esc(sig)}">
<button type="submit" style="background:#E86C47;color:#fff;border:0;border-radius:10px;padding:12px 24px;font-size:1rem;cursor:pointer">Approuver le dossier</button>
</form>`;
  return page(200, "Confirmer l'approbation",
    `Dossier « ${esc(slug)} » : l'approbation lancera le provisioning puis le run self-service au prochain poll.`, form);
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const envErr = checkEnv(env);
  if (envErr) return envErr;
  let form;
  try {
    form = await request.formData();
  } catch {
    return page(400, 'Requete invalide', 'Formulaire attendu.');
  }
  const slug = String(form.get('slug') || '');
  const exp = String(form.get('exp') || '');
  const sig = String(form.get('sig') || '');
  const paramErr = await checkParams(env, slug, exp, sig);
  if (paramErr) return paramErr;

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
        // Idempotent — et si le provisioning avait echoue (pas de champ repo), le re-clic le relance.
        if (!res.entry.repo) {
          triggerProvision(context, slug);
          return page(200, 'Deja approuve', `Le dossier « ${esc(slug)} » etait deja approuve — provisioning relance.`);
        }
        return page(200, 'Deja approuve', `Le dossier « ${esc(slug)} » etait deja approuve. Rien a faire.`);
      }
      try {
        await githubPutFileAt(env, QUEUE_PATH, queue, sha, `onboarding: approve ${slug}`);
        triggerProvision(context, slug);
        return page(200, 'Dossier approuve', `Le dossier « ${esc(slug)} » est approuve. Provisioning lance, run au prochain poll (~1 h). Vous recevrez une notification.`);
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

export async function onRequest(context) {
  const { request } = context;
  if (request.method === 'GET') return onRequestGet(context);
  if (request.method === 'POST') return onRequestPost(context);
  return page(405, 'Methode non autorisee', 'GET ou POST uniquement.');
}
