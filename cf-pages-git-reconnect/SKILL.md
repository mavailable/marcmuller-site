---
name: cf-pages-git-reconnect
description: "Reconnecte un projet Cloudflare Pages (Direct Upload) à GitHub pour activer le déploiement automatique via git push. Supprime l'ancien projet, recrée un vrai projet Pages connecté au repo GitHub, configure le build (Astro, Next.js, etc.), réattache les domaines personnalisés, et vérifie le déploiement. IMPORTANT : utilise le flow Pages spécifique, PAS le flow Worker par défaut. Déclencher quand on dit 'reconnecter GitHub', 'No Git connection', 'connecter git à Cloudflare', 'passer en déploiement automatique', 'Direct Upload vers Git', 'activer les déploiements auto', ou quand un projet Cloudflare Pages affiche 'No Git connection' dans les settings."
---

# Reconnexion Cloudflare Pages → GitHub

> **Objectif** : Transformer un projet Cloudflare Pages créé en "Direct Upload" (sans Git) en un projet Pages connecté à un repo GitHub, avec déploiement automatique à chaque `git push`.

---

## Contexte et piège principal

Cloudflare Pages propose deux modes de création :
1. **Direct Upload** : upload manuel des fichiers statiques — pas de Git, pas de CI/CD
2. **Git connected** : connecté à GitHub/GitLab — build et deploy automatiques à chaque push

**Un projet créé en Direct Upload ne peut PAS être connecté à Git après coup.** Il n'y a aucune option dans les settings pour ajouter une connexion Git. La seule solution est de supprimer le projet et d'en recréer un nouveau connecté à Git.

### Piège Workers vs Pages

Depuis la fusion Workers & Pages dans le dashboard Cloudflare (2025+), le bouton "Create application" → "Continue with GitHub" crée un **Worker** par défaut, PAS un projet Pages. Les Workers utilisent `npx wrangler deploy` qui ne fonctionne pas pour les sites statiques.

**La bonne procédure** : utiliser le lien **"Looking to deploy Pages? Get started"** visible en bas du dialogue de création, qui ouvre le flow Pages classique avec les 3 étapes (Select repository → Set up builds → Deploy site).

---

## Prérequis

Avant de commencer, vérifier :

1. **Le code source est dans un repo GitHub** (ou GitLab)
   - Si non : initialiser Git, créer le repo, et pousser le code d'abord
   - Vérifier la branche (`master` ou `main`)

2. **Les domaines personnalisés sont identifiés**
   - Lister tous les domaines custom du projet actuel (ex: `monsite.fr`, `www.monsite.fr`)
   - Ils seront temporairement offline pendant la migration

3. **L'accès au dashboard Cloudflare** est disponible (navigateur connecté)

4. **Le compte GitHub est connecté à Cloudflare Pages**
   - Vérifiable dans le flow de création Pages → onglet GitHub

---

## Process étape par étape

### Étape 1 — Inventaire de l'existant

Aller dans le dashboard Cloudflare → Workers & Pages → projet existant → Settings.

Relever :
- **Nom du projet** (ex: `marcmuller-site`)
- **Domaines personnalisés** (Custom domains) — noter chacun
- **URL pages.dev** (ex: `marcmuller-site.pages.dev`)
- **Type de projet** : vérifier si c'est bien du Direct Upload (absence de section "Git repository" dans Build)

### Étape 2 — Supprimer les domaines personnalisés

Dans l'onglet **Custom domains** du projet :
1. Pour chaque domaine custom → cliquer sur les `...` → **Remove domain**
2. Confirmer la suppression

> **Le site sera temporairement offline** pendant la migration. Prévenir le client si nécessaire.

### Étape 3 — Supprimer l'ancien projet

Dans Settings → section **General** (tout en bas) :
1. Cliquer sur **Delete**
2. Taper le nom du projet pour confirmer (ex: `marcmuller-site`)
3. Confirmer la suppression

Le nom du projet est maintenant libéré pour réutilisation.

### Étape 4 — Créer le nouveau projet Pages (⚠️ étape critique)

Depuis Workers & Pages → **Create application** :

1. **NE PAS** cliquer sur "Continue with GitHub" (c'est le flow Worker !)
2. Cliquer sur le lien **"Looking to deploy Pages? Get started"** en bas du dialogue
3. Cela ouvre la page "Get started with Pages" avec deux options
4. Cliquer sur **"Import an existing Git repository"** → **Get started**

### Étape 5 — Sélectionner le repository

1. Onglet **GitHub** (ou GitLab)
2. Sélectionner le bon **compte GitHub** dans le dropdown
3. Sélectionner le **repository** (ex: `mavailable/marcmuller-site`)
4. Cliquer **Begin setup**

### Étape 6 — Configurer le build

Sur la page "Set up builds and deployments" :

1. **Project name** : utiliser le même nom que l'ancien projet (ex: `marcmuller-site`) pour conserver la même URL `*.pages.dev`
2. **Production branch** : sélectionner la branche principale (`master` ou `main`)
3. **Framework preset** : sélectionner le framework utilisé

**Presets courants et leurs valeurs :**

| Framework | Build command | Output directory |
|-----------|--------------|-----------------|
| Astro | `npm run build` | `dist` |
| Next.js (static) | `npx next build` | `out` |
| Hugo | `hugo` | `public` |
| Nuxt | `npm run generate` | `dist` |
| Vite / React | `npm run build` | `dist` |
| 11ty | `npx eleventy` | `_site` |
| None (static) | _(vide)_ | `/` |

4. Cliquer **Save and Deploy**

### Étape 7 — Attendre le build

Le premier build peut prendre plusieurs minutes :
- **Initializing build environment** : 2-8 minutes (normal pour un premier build)
- **Cloning git repository** : quelques secondes
- **Building application** : dépend du projet (10s-2min)
- **Deploying to Cloudflare's global network** : quelques secondes

Vérifier que toutes les étapes passent en vert (✅). Si le build échoue, consulter les logs pour diagnostiquer (souvent : mauvaise commande build, dépendances manquantes, version Node.js incompatible).

> **Si le timer du dashboard semble bloqué** (le compteur n'avance plus), rafraîchir la page — le build a peut-être déjà terminé côté serveur. Le dashboard Cloudflare a un bug connu où le timer live se fige.

### Étape 8 — Vérifier le déploiement initial

Après succès du build :
1. Vérifier que l'URL `*.pages.dev` fonctionne (ex: `marcmuller-site.pages.dev`)
2. Vérifier que la page de déploiement affiche bien "Automatic deployments enabled"
3. Confirmer que le commit correct est référencé

### Étape 9 — Réattacher les domaines personnalisés

Dans l'onglet **Custom domains** du nouveau projet :

Pour chaque domaine (commencer par le domaine principal, puis les sous-domaines) :
1. Cliquer **Set up a custom domain**
2. Taper le domaine (ex: `monsite.fr`)
3. Cliquer **Continue**
4. Cloudflare propose un enregistrement DNS (CNAME) — vérifier qu'il pointe vers `nom-projet.pages.dev`
5. Cliquer **Activate domain**
6. Répéter pour les autres domaines (ex: `www.monsite.fr`)

Les domaines passent par ces états :
- **Initializing** → DNS en cours de propagation
- **Active** + **SSL enabled** → tout est opérationnel ✅

> Le domaine principal (apex, ex: `monsite.fr`) s'active généralement en quelques minutes si le DNS est déjà géré par Cloudflare. Le sous-domaine `www` suit peu après.

### Étape 10 — Vérification finale

1. **Ouvrir le site** via le domaine personnalisé (ex: `https://monsite.fr`)
2. Vérifier que toutes les pages se chargent correctement
3. Vérifier le **certificat SSL** (cadenas vert dans le navigateur)
4. Confirmer que les **déploiements automatiques** fonctionnent : le dashboard doit afficher "Automatic deployments enabled" avec le bon repo GitHub

---

## Résumé en 4 actions

Pour rappel rapide lors des prochaines migrations :

```
1. SUPPRIMER : domaines custom → projet ancien
2. CRÉER : Pages (PAS Worker) → "Looking to deploy Pages? Get started" → Git repo
3. CONFIGURER : framework preset + build command + output dir → Save and Deploy
4. RATTACHER : domaines custom → Activate domain → vérifier SSL
```

---

## Dépannage

### "Build failed" après création
- Vérifier la **build command** (ex: `npm run build` pas `npx wrangler deploy`)
- Vérifier le **output directory** (ex: `dist` pour Astro, `out` pour Next.js static)
- Vérifier la **version Node.js** : ajouter `NODE_VERSION=20` dans Environment variables si nécessaire

### Le projet créé est un Worker au lieu de Pages
- Symptôme : la sidebar affiche "Workers" à côté du nom, le deploy command est `npx wrangler deploy`
- Solution : supprimer le Worker et recommencer via le flow Pages ("Looking to deploy Pages? Get started")

### Le timer d'initialisation semble bloqué (>5min)
- Rafraîchir la page (F5) — le build a souvent terminé côté serveur
- Si vraiment bloqué : annuler le déploiement et relancer (Deployments → Retry deployment)

### Domaine reste en "Initializing"
- Vérifier que les DNS pointent correctement (CNAME → `nom-projet.pages.dev`)
- Patienter jusqu'à 48h (rare, généralement quelques minutes si DNS Cloudflare)
- Si DNS externe : ajouter manuellement le CNAME chez le registrar

### Le nom du projet est déjà pris
- Si l'ancien projet n'a pas été supprimé, le supprimer d'abord
- Si un Worker porte le même nom, le supprimer aussi (Workers & Pages → Settings → General → Delete)
