// Aucune collection Astro : le site public marcm.fr n'est pas édité via le CMS.
// src/content/tasks/index.json (kanban « Mes tâches » du cockpit /admin) est lu
// et écrit via l'API GitHub par @marc/cms-engine — il ne doit JAMAIS être déclaré
// ici, sinon il deviendrait requêtable par le site (doctrine board, wf-00-cms §8-ter).
export const collections = {};
