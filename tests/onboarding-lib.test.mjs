import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  slugify,
  safeFilename,
  validateUploadMeta,
  UPLOAD_MAX_BYTES,
  hmacSign,
  hmacVerify,
  emptyQueue,
  upsertQueueEntry,
  approveQueueEntry,
  parseR2Keys,
  buildNotifyNote,
} from '../functions/api/_onboarding-lib.js';

test('slugify normalise accents et espaces', () => {
  assert.equal(slugify('Atelier Lumen — Ébénisterie !'), 'atelier-lumen-ebenisterie');
  assert.equal(slugify(''), '');
});

test('safeFilename nettoie et garde une extension sure', () => {
  assert.equal(safeFilename('Mon Logo Été.PNG'), 'mon-logo-ete.png');
  assert.equal(safeFilename('weird<>.sVg'), 'weird.svg');
  assert.equal(safeFilename(''), 'fichier');
  assert.ok(safeFilename('a'.repeat(200) + '.png').length <= 90);
});

test('validateUploadMeta accepte la whitelist, refuse le reste', () => {
  assert.equal(validateUploadMeta({ size: 1000, type: 'image/png' }).ok, true);
  assert.equal(validateUploadMeta({ size: 1000, type: 'image/svg+xml' }).ok, true);
  assert.equal(validateUploadMeta({ size: 1000, type: 'application/pdf' }).ok, true);
  const badType = validateUploadMeta({ size: 1000, type: 'text/html' });
  assert.deepEqual([badType.ok, badType.status], [false, 415]);
  const tooBig = validateUploadMeta({ size: UPLOAD_MAX_BYTES + 1, type: 'image/png' });
  assert.deepEqual([tooBig.ok, tooBig.status], [false, 413]);
  assert.equal(validateUploadMeta({ size: 0, type: 'image/png' }).ok, false);
});

test('hmacSign vecteur de test RFC + hmacVerify constant-time', async () => {
  const sig = await hmacSign('key', 'The quick brown fox jumps over the lazy dog');
  assert.equal(sig, 'f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8');
  assert.equal(await hmacVerify('key', 'The quick brown fox jumps over the lazy dog', sig), true);
  assert.equal(await hmacVerify('key', 'autre message', sig), false);
  assert.equal(await hmacVerify('key', 'The quick brown fox jumps over the lazy dog', 'abc'), false);
});

test('upsertQueueEntry cree puis met a jour la meme entree recu', () => {
  const base = { slug: 'atelier-test', email: 'a@b.fr', nom: 'Anna B', activite: 'Atelier Test', recu_at: '2026-07-21T10:00:00' };
  const r1 = upsertQueueEntry(null, base);
  assert.equal(r1.action, 'created');
  assert.equal(r1.queue.version, 1);
  assert.equal(r1.queue.entries.length, 1);
  assert.equal(r1.queue.entries[0].statut, 'recu');
  const r2 = upsertQueueEntry(r1.queue, { ...base, email: 'nouveau@b.fr', recu_at: '2026-07-21T11:00:00' });
  assert.equal(r2.action, 'updated');
  assert.equal(r2.queue.entries.length, 1);
  assert.equal(r2.queue.entries[0].email, 'nouveau@b.fr');
});

test('upsertQueueEntry ne touche pas une entree deja approuvee (nouvelle entree)', () => {
  const q = { version: 1, entries: [{ slug: 'atelier-test', email: 'a@b.fr', nom: 'Anna', activite: 'Atelier', statut: 'approuve', recu_at: 'x', approuve_at: 'y' }] };
  const r = upsertQueueEntry(q, { slug: 'atelier-test', email: 'a@b.fr', nom: 'Anna', activite: 'Atelier', recu_at: 'z' });
  assert.equal(r.action, 'created');
  assert.equal(r.queue.entries.length, 2);
  assert.equal(r.queue.entries[0].statut, 'recu');
  assert.equal(r.queue.entries[1].statut, 'approuve');
});

test('approveQueueEntry flip recu -> approuve, idempotent, refuse les autres statuts', () => {
  const q = { version: 1, entries: [{ slug: 's1', statut: 'recu' }, { slug: 's2', statut: 'en_cours' }] };
  const r1 = approveQueueEntry(q, 's1', '2026-07-21T12:00:00');
  assert.deepEqual([r1.ok, r1.already], [true, false]);
  assert.equal(q.entries[0].statut, 'approuve');
  assert.equal(q.entries[0].approuve_at, '2026-07-21T12:00:00');
  const r2 = approveQueueEntry(q, 's1', '2026-07-21T13:00:00');
  assert.deepEqual([r2.ok, r2.already], [true, true]);
  assert.equal(q.entries[0].approuve_at, '2026-07-21T12:00:00');
  const r3 = approveQueueEntry(q, 's2', 'x');
  assert.equal(r3.ok, false);
  assert.match(r3.reason, /en_cours/);
  assert.equal(approveQueueEntry(q, 'inconnu', 'x').reason, 'not_found');
});

test('parseR2Keys filtre le prefixe onboarding/ et le JSON invalide', () => {
  assert.deepEqual(parseR2Keys('["onboarding/a/1.png","vocaux/x.opus",42]'), ['onboarding/a/1.png']);
  assert.deepEqual(parseR2Keys('pas du json'), []);
  assert.deepEqual(parseR2Keys(undefined), []);
});

test('buildNotifyNote omet les champs vides et contient le lien', () => {
  const note = buildNotifyNote(
    { nom: 'Anna B', activite: 'Atelier Test', type: 'entreprise-locale', ville: '', pays: 'France', objectif: 'Etre trouve sur Google', budget: '', nbFichiers: 3 },
    'https://marcm.fr/api/onboarding-approve?slug=s&exp=1&sig=x'
  );
  assert.match(note, /Nom : Anna B/);
  assert.match(note, /Fichiers : 3/);
  assert.ok(!note.includes('Ville :'));
  assert.ok(note.includes('https://marcm.fr/api/onboarding-approve?slug=s&exp=1&sig=x'));
  assert.ok(!note.includes('—'));
});
