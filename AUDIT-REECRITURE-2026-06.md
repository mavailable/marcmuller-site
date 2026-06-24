# Audit de réécriture marcm.fr — nouveau positionnement « bras droit »

> **Date :** 2026-06-24
> **Source de vérité :** `POSITIONNEMENT-2026-06.md` (validé)
> **Nature :** audit + plan de réécriture. Aucun fichier .astro n'est modifié ici, rien n'est déployé.
> **Bascule centrale :** on arrête de se présenter comme « créateur de sites web ». On se présente comme **le bras droit des indépendants qui les aide à trouver des clients.** Le site n'est qu'une brique.
> **Phrase pilier :** « Tu n'as pas besoin d'un site. Tu as besoin de clients. »

---

## Constat global avant le détail page par page

Le site actuel est entièrement construit autour d'**un seul produit : le site vitrine à 490€**, livré en 7 jours. Tout le funnel (hero, méthode, offre, qui-suis-je, pages géo) converge vers « commander un site ». C'est cohérent, bien écrit, mais c'est exactement le positionnement qu'on quitte : le cordonnier qui vend des chaussures alors qu'il devrait vendre « tu vas marcher loin ».

Trois écarts structurels reviennent sur presque toutes les pages :

1. **Le titre, c'est le site.** Partout le H1 parle de « site », « 490€ », « 7 jours ». Le résultat (des clients) et l'identité (le bras droit) n'apparaissent jamais en tête.
2. **Le vouvoiement domine** (index, offre, méthode, qui-suis-je). Le nouveau positionnement impose le **tutoiement**. La page `formation` (poisson d'avril) et la page `methode` sont déjà partiellement en « tu », le reste est en « vous ».
3. **La gamme manque.** Le positionnement définit 3 niveaux (déclic/formation → bras droit ~500€/mois HT → briques). Le site ne montre qu'une brique (le site) + des add-ons. L'accompagnement « bras droit » n'existe nulle part comme offre cœur ; il n'y a que des forfaits de maintenance (39€/99€ par mois) qui ne sont PAS le Point Marketing.

**Garde-fous appliqués dans toutes les recos ci-dessous :**
- Tutoiement, zéro jargon (« je te trouve des clients », pas « système d'acquisition »).
- Pas de tiret cadratin « — » dans le texte prospect.
- Tout prix suivi de « HT ».
- Pas de « site gratuit / offert » (offre 100 Vitrines retirée). On garde distincts : l'audit Echo gratuit, l'hébergement inclus, et le site à 490€ HT.
- Le site reste une brique crédible, pas le titre.

---

## 1. `src/data/business.ts` — la description et l'identité

### Ce que ça dit aujourd'hui
- `jobTitle: 'Développeur Web Freelance'`
- `description: 'Création de sites web sur mesure pour artisans, commerçants et petites entreprises en France.'`
- Pas de tagline globale (seul Écho a une tagline).
- `priceRange: '490€+'`, `offers` = Site Vitrine + Projet Sur Mesure uniquement.

### L'écart
C'est la racine du problème : la donnée centrale qui irrigue Schema.org, l'OG, le footer, dit littéralement « création de sites web » et « développeur web ». Tant que cette source de vérité reste sur « site », chaque page qui l'importe répète l'ancien positionnement. Aucune mention de « trouver des clients », de « bras droit », ni de l'accompagnement cœur.

### Reco de réécriture
- `jobTitle` → **`'Le bras droit des indépendants'`** (ou, si on veut rester lisible par Schema.org pour le SEO : garder un `jobTitle` technique mais ajouter un champ `tagline` global utilisé dans l'UI).
- `description` → **`"J'aide les indépendants à trouver des clients. Un site qui te ramène des clients, de quoi aller les chercher et savoir quoi leur dire, et les outils qui te font gagner du temps. Comme un associé qui met les mains dedans, sans prendre tes parts."`**
- Ajouter une **tagline globale** :
  `tagline: "Tu n'as pas besoin d'un site. Tu as besoin de clients."`
- `offers` : ajouter l'accompagnement cœur comme offre à part entière (le « bras droit » ~500€/mois HT), au-dessus du site. Le site descend au rang de brique parmi les offres.

> Note technique : `business.ts` alimente Schema.org. La modif impacte le SEO (le `description` indexé). À traiter avec soin côté GEO : garder la densité factuelle (France, indépendants, prix). Ne pas hardcoder le siteUrl (déjà OK via `url`).

---

## 2. `src/pages/index.astro` — la home (page la plus importante)

### 2.1 Hero (H1 + sous-titres)

**Ce que ça dit aujourd'hui :**
- H1 : **« Votre site pro, livré en 7 jours. »**
- Sous-titre : « Design sur mesure, visible sur Google et les IA. Je m'occupe de tout — design, textes, mise en ligne. 490€. »
- Ligne : « 100% à distance · Clients partout en France »
- CTA primaire : « Commander 490€ » → `/commander`
- CTA secondaire : « Discuter d'un projet »
- Lien bas : « Pas encore prêt ? Obtenez un audit gratuit de votre visibilité → »

**L'écart :**
C'est le cœur de la bascule manquée. Le H1 vend un site et un délai. Aucun mot sur les clients, sur le « bras droit », sur le contre-pied « pas un site ». Le sous-titre contient même un tiret cadratin (« je m'occupe de tout — design »), interdit en prospect. Le vouvoiement est partout. Le CTA pousse direct vers l'achat du site (la brique), pas vers l'entrée de gamme (le déclic) ni vers l'accompagnement (le cœur).

**Reco de réécriture (voix Marc, tutoiement) :**

- **H1 :** « Tu n'as pas besoin d'un site. Tu as besoin de clients. »
  (variante plus courte si la ligne 2 doit rester accent : « Tu n'as pas besoin d'un site. **Tu as besoin de clients.** »)
- **Sous-titre :** « J'aide les indépendants à en trouver, pour de vrai. Un site qui te ramène des clients, de quoi aller les chercher et savoir quoi leur dire, et les outils qui te font gagner du temps : tes rendez-vous, tes devis, tes factures, tes relances. »
- **Ligne identité (sous le sous-titre) :** « Comme un associé qui met les mains dedans, sans prendre tes parts. Pas un consultant qui te fait un PowerPoint. »
- **Ligne pratique :** « À distance, partout. J'accompagne des indépendants en France et à l'international. »
- **CTA primaire :** « On en parle 20 min » → `/contact` (l'entrée naturelle de l'accompagnement, pas l'achat sec du site).
- **CTA secondaire :** « Voir comment je bosse » → `/methode`
- **Lien bas (garder l'audit Echo, c'est l'audit gratuit, distinct du site gratuit) :** « Tu veux voir ce que ton site renvoie vraiment à tes visiteurs ? Demande un audit gratuit → » → `/audit-gratuit`

> Le showcase de réalisations (coverflow) reste : c'est de la preuve. Mais il devient « la preuve que je sais faire », pas « le produit que je vends ».

### 2.2 Section PROBLÈME (« Vous avez un vrai métier »)

**Ce que ça dit aujourd'hui :**
- Eyebrow « Le constat », H2 « Vous avez un vrai métier. »
- 3 pain points, tous centrés site : « Votre site WordPress rame », « Vous n'avez pas de site et perdez des clients », « Votre site est générique ».
- Punchline : « Et si votre site devenait votre meilleur commercial ? »

**L'écart :**
Les 3 douleurs sont des douleurs de site. Or l'avatar ne se réveille pas en pensant « mon WordPress rame ». Il se réveille en pensant « je galère à avoir des clients et je sais pas par où commencer ». Le vrai pain du positionnement (« j'attends que ça vienne », « personne autour de moi qui a monté une boîte ») est absent.

**Reco de réécriture :**
- Eyebrow : « Le vrai problème »
- H2 : « Ton métier, tu le maîtrises. **Trouver des clients, c'est autre chose.** »
- Sous-titre : « Tu sais faire ton boulot. Personne ne t'a appris à aller chercher des clients. Et autour de toi, pas un seul entrepreneur à qui demander. »
- 3 pain points réécrits (on garde le format cards, on change le fond) :
  1. **« Tu attends que ça vienne. »** « Le bouche-à-oreille tourne au ralenti, et tu n'as pas de plan pour aller chercher des clients toi-même. »
  2. **« Tu es seul à décider. »** « Tes conseils, tu les prends auprès de gens salariés. Du coup tu hésites, tu repousses, tu n'oses pas. »
  3. **« Tu perds du temps sur l'administratif. »** « Devis, factures, relances, rendez-vous. Des heures qui partent dans le vide au lieu d'aller chercher du chiffre. »
- Punchline : « Et si tu avais quelqu'un qui l'a déjà fait, à côté de toi, chaque semaine ? »
- Lien : « Voir comment je bosse » → `#methode` (conserver l'ancre).

### 2.3 Section PREUVE SOCIALE (les chiffres)

**Ce que ça dit aujourd'hui :**
- H2 « Ça marche », « Des chiffres, pas des promesses. »
- 3 stats : `{totalProjects}+` projets livrés, 7j délai moyen, 100% satisfaction.

**L'écart :**
Les chiffres prouvent « je livre des sites vite ». Le positionnement veut prouver « je l'ai fait, je suis entrepreneur, je mets les mains dedans ». Manque le mécanisme différenciant : 8-10 boîtes montées, ~20 entrepreneurs accompagnés.

**Reco de réécriture :**
- Garder le format 3 stats, changer 1 à 2 chiffres pour ancrer le « pourquoi moi » :
  - **« 8 à 10 »** boîtes montées (j'en parle d'expérience, pas de théorie)
  - **« ~20 »** entrepreneurs accompagnés
  - **`{totalProjects}+`** projets web livrés
- Sous-titre : « Je ne suis pas un coach qui parle. J'ai monté des boîtes, et je construis moi-même les outils que je te livre. »
- (Garder « 100% satisfaction » est risqué côté preuve : préférer un chiffre vérifiable.)

### 2.4 Section MÉTHODE (timeline 4 étapes)

**Ce que ça dit aujourd'hui :**
- Eyebrow « La méthode », H2 « Simple, rapide, sans prise de tête. »
- 4 étapes 100% process site : « Vous commandez en ligne » (2 min) → « On fait le point » (15 min) → « Je construis votre site » (7 jours) → « C'est en ligne ».

**L'écart :**
C'est la méthode de fabrication d'un site, pas la méthode de travail du bras droit. Le positionnement décrit un mode opératoire « actions chaque semaine, on regarde les retours, on avance ». Ici on décrit une livraison one-shot.

**Reco de réécriture :**
- Eyebrow : « Comment je bosse »
- H2 : « Des actions concrètes, **chaque semaine.** Pas de réunions pour rien. »
- Sous-titre : « On se cale un point régulier, je fais avec toi, on regarde ce qui rentre, on ajuste. »
- 4 étapes réécrites côté accompagnement :
  1. **« On fait le point sur ta situation »** — « Où tu en es, d'où viennent tes clients aujourd'hui, ce qui bloque. »
  2. **« On choisit les bons leviers »** — « Un site qui ramène des clients, des réseaux, de la prospection, un mini-CRM pour suivre tes prospects. On prend ce dont tu as besoin, dans l'ordre qui compte. »
  3. **« Je mets les mains dedans, chaque semaine »** — « Je construis, j'agis, tu n'es pas seul. Des actions, pas du blabla. »
  4. **« Tu gardes la main »** — « Tout est éditable par toi dans ton admin. L'objectif, c'est que tu continues seul. »

> Note : cette section sur la home renvoie aujourd'hui à `/methode` (qui parle du process site). Si on réécrit `/methode` (voir §4), ce lien reste cohérent.

### 2.5 Section L'OFFRE (Site Vitrine 490€ + add-ons)

**Ce que ça dit aujourd'hui :**
- Eyebrow « Site Vitrine », H2 « Un site pro à 490€ », 7 bullets produit, CTA « Commander 490€ ».
- Colonne add-ons (page suppl. +120€, GBP +90€, etc.).

**L'écart :**
La home consacre une grande section au site comme produit phare. Dans le nouveau positionnement, le site est UNE brique. Il faut le garder (produit d'appel crédible) mais le recadrer en « une des briques de l'accompagnement », et faire remonter l'accompagnement « bras droit » comme l'offre cœur.

**Reco de réécriture :**
- Idéalement : **remplacer cette section par une présentation de la gamme en 3 niveaux** (déclic → bras droit → briques), avec le site présenté DANS les briques.
- Eyebrow : « Comment on bosse ensemble »
- H2 : « Tu entres par où tu veux. »
- 3 blocs :
  1. **Le déclic** — « Tu veux te lancer ou tu ne sais pas par où commencer ? On débloque ça. » (c'est là que vivra la formation)
  2. **Le bras droit** — « On bosse ensemble dans la durée, je fais avec toi, chaque semaine. Environ 500€/mois HT. » (offre cœur, mise en avant)
  3. **Les briques** — « Un site qui te ramène des clients (à partir de 490€ HT), tes réseaux, ta prospection, ton mini-CRM, tes devis-factures. » + lien vers `/offre` pour le détail du site et des add-ons.
- Si on garde la section site telle quelle pour le moment : au minimum changer l'eyebrow de « Site Vitrine » à « Une brique : ton site » et le H2 de « Un site pro à 490€ » à « Un site qui te ramène des clients, à 490€ HT ». Et tutoyer les 7 bullets.

### 2.6 FAQ (13 questions)

**Ce que ça dit aujourd'hui :**
13 questions 100% site/prix/WordPress/SEO, en vouvoiement. Beaucoup contiennent « 490€ » sans « HT ».

**L'écart :**
La FAQ ne répond qu'à des objections de site. Aucune question du type « concrètement tu m'aides à trouver des clients comment ? », « c'est quoi l'accompagnement ? », « ça coûte combien par mois ? ». Vouvoiement à basculer en tutoiement. « 490€ » à suffixer « HT ».

**Reco de réécriture :**
- Basculer toute la FAQ en tutoiement.
- Ajouter « HT » derrière chaque prix nu (« 490€ » → « 490€ HT »).
- Ajouter 3-4 questions « bras droit » en tête :
  - « Concrètement, tu m'aides à trouver des clients comment ? » → réponses avec les briques (site qui ramène, réseaux, prospection, relances).
  - « C'est quoi l'accompagnement ? » → « On bosse ensemble dans la durée, environ 500€/mois HT. Je fais avec toi, chaque semaine. »
  - « Tu es plutôt un coach ou un dev ? » → « Les deux, et surtout un entrepreneur. J'ai monté des boîtes et je construis les outils moi-même. »
  - « Et si je veux juste un site ? » → « Possible aussi. Le site, c'est une brique. 490€ HT, livré en 7 jours, et il est pensé pour te ramener des clients. »
- Garder les questions site existantes (WordPress, modif soi-même, etc.) mais en sous-section « Le site ».

### 2.7 Section ZONES D'INTERVENTION (Grand Est) + CTA final

**Ce que ça dit aujourd'hui :**
- H2 « Création de site web près de chez vous », « Basé à Montigny-lès-Metz, j'interviens dans tout le Grand Est. »
- CTA final : H2 « Prêt à lancer votre site ? », « Commandez votre Site Vitrine à 490€ ou parlons de votre projet sur mesure. »

**L'écart :**
- La section géo dit « création de site web près de chez vous » : pur ancien positionnement, et en tension avec « j'accompagne partout, international en cours ». Elle existe pour le SEO local (pages villes), donc on la garde mais on la recadre.
- Le CTA final est 100% « lance ton site / commande 490€ ». Il faut le passer à « trouve des clients / on en parle ».

**Reco de réécriture :**
- Section géo : garder pour le SEO mais H2 → « Tu es dans le Grand Est ? On peut se voir. » + phrase « Je bosse à distance avec des indépendants partout, mais si tu es près de Metz, Strasbourg, Nancy, on prend un café. » (les liens villes restent pour le SEO).
- CTA final : H2 → « Prêt à avoir des clients qui rentrent ? » ; sous-texte → « On prend 20 minutes, tu me dis où tu en es, je te dis par quoi commencer. Sans engagement. » ; CTA primaire → « On en parle » → `/contact` ; garder le lien audit gratuit Echo.
- Remplacer « 490€ » par « 490€ HT » partout dans cette section.

---

## 3. `src/pages/offre.astro` — la page offre

### Ce que ça dit aujourd'hui
- H1 : **« Un site pro qui vous amène des clients »** (déjà à mi-chemin, mais reste centré « site »).
- Structure : carte produit Site Vitrine 490€ HT (déjà « HT » ici, bien), « comment ça marche » (4 étapes site), add-ons, Projet Sur Mesure, Accompagnement (Autonomie 0€ / Accompagnement 39€/mois / Croissance 99€/mois), FAQ.
- Vouvoiement partout.

### L'écart
- Le H1 est le meilleur de tout le site (« qui vous amène des clients ») mais reste « un site ». La page entière est une page produit-site.
- **Confusion majeure de gamme :** la section « Accompagnement » (39€/99€ par mois) est de la **maintenance de site**, PAS le « bras droit » à ~500€/mois HT. Avec le nouveau positionnement, garder ces deux notions distinctes est critique, sinon « accompagnement » devient ambigu (le prospect croit que le bras droit coûte 39€/mois).
- Vouvoiement à basculer.

### Reco de réécriture
- **H1 :** « Des clients qui rentrent. Pas juste un site. »
  Sous-titre : « Je t'aide à en trouver, pour de vrai. Le site, c'est une des briques. »
- **Restructurer la page autour de la gamme :**
  1. Bloc « Le bras droit » (offre cœur) en haut : « On bosse ensemble dans la durée, je fais avec toi chaque semaine. ~500€/mois HT. » CTA « On en parle ».
  2. Bloc « Les briques » : le site (490€ HT, garder la belle carte produit, juste tutoyer + recadrer « une brique qui te ramène des clients »), les réseaux, la prospection, le mini-CRM, les devis-factures. Les add-ons actuels (GBP, blog, RDV, etc.) se logent ici.
  3. Bloc « Le déclic / formation » : entrée de gamme légère (lien vers une vraie page formation, voir §5).
- **Renommer la section « Accompagnement » actuelle** (39€/99€) en **« Après livraison du site : tu n'es pas lâché »** ou « Suivi de ton site ». Bien la séparer visuellement du « bras droit » cœur. Préciser que ce sont des forfaits de suivi technique du site, distincts de l'accompagnement business.
- Tutoyer toute la page. Suffixer « HT » sur tous les prix mensuels aussi (« 39€/mois » → « 39€/mois HT »).
- FAQ : même traitement qu'en §2.6.

---

## 4. `src/pages/methode.astro` — la page méthode

### Ce que ça dit aujourd'hui
- H1 : **« Un site à 490€. Pas un compromis. »**
- Tout le contenu justifie le **prix du site** : pourquoi 490€ est possible (pas de locaux, pas de commercial, outils modernes), les 4 étapes de fabrication du site, « ce que chaque site inclut ».
- Déjà partiellement en tutoiement dans le hero, mais le corps est en vouvoiement (« je livre », « vos pages »).

### L'écart
La page entière répond à la question « pourquoi ton site est pas cher ? ». C'est une page de défense de prix de site. Dans le nouveau positionnement, la « méthode » doit répondre à « comment tu bosses avec moi pour me trouver des clients ? ». Le mécanisme différenciant (entrepreneur + construit les outils + actions hebdo) n'est pas la colonne vertébrale ici, alors qu'il devrait l'être.

### Reco de réécriture
- **H1 :** « Comment je bosse : **des actions, pas du blabla.** »
  Sous-titre : « Pas de PowerPoint, pas de réunions pour rien. Je fais avec toi, chaque semaine, et on regarde ce qui rentre. »
- **Réorienter le corps éditorial** : remplacer la justification « pourquoi 490€ » (qui peut migrer en bloc plus court sur `/offre` ou dans la FAQ du site) par le mécanisme différenciant :
  - « Je l'ai déjà fait » : 8-10 boîtes montées, ~20 entrepreneurs accompagnés.
  - « Je construis les outils moi-même » : pas un coach qui parle, pas un dev qui n'a jamais entrepris.
  - « On avance par actions concrètes, chaque semaine. »
- **Les 4 étapes** : passer du process de fabrication d'un site au mode de travail du bras droit (cf. §2.4, les 4 étapes accompagnement).
- Garder un encart « le site, voici comment il se fabrique » plus bas, en sous-section, pour ceux qui veulent juste le site (préserve le SEO « méthode création site »).
- Tutoyer tout le corps.

> Note : `methode` n'est PAS dans le menu principal (Header expose Réalisations, Offre, Journal, Qui suis-je, Contact). Elle est atteinte via les liens internes (#methode de la home, FAQ offre). Donc impact SEO direct limité, mais c'est une page de conversion importante via le funnel interne.

---

## 5. `src/pages/formation.astro` — ATTENTION : c'est le poisson d'avril

### Ce que ça dit aujourd'hui
La page `/formation` n'est PAS une page formation. C'est le **poisson d'avril** : une parodie de formation guru (« 50 000€/mois en 30 jours grâce au Vibe Coding », faux témoignages d'Oussama, faux partenaires Forbes/BFM, compte à rebours, reveal « Poisson d'avril ! »). Elle est en `noindex`, autonome (pas de BaseLayout), et renvoie vers « le vrai site » à 490€.

### L'écart — et le conflit à arbitrer
Le nouveau positionnement fait de la **formation** la porte d'entrée de la gamme (« le déclic », futur CPF/Qualiopi). Or l'URL `/formation` est squattée par une blague. C'est un **conflit d'URL frontal** :
- Soit on garde la blague sur `/formation` et la vraie formation prend une autre URL (`/declic`, `/demarrer`, `/se-lancer`).
- Soit la vraie formation récupère `/formation` et le poisson d'avril migre (ex : `/poisson` ou est archivé jusqu'au 1er avril prochain).

C'est une décision Marc, pas une décision d'exécution. Mon avis : **la vraie offre d'entrée de gamme mérite `/formation`** (URL la plus intuitive, et future cible CPF/Qualiopi qui doit être indexable, alors que le poisson reste noindex). Le poisson d'avril peut être ressorti chaque 1er avril sur une URL dédiée.

### Reco
- Décision à prendre : qui occupe `/formation`.
- Si la vraie formation prend `/formation` : créer une vraie page (entrée de gamme « le déclic »), H1 du type « Tu veux te lancer mais tu n'oses pas ? On débloque ça. », contenu sur ce que la personne repart savoir faire (trouver ses premiers clients, savoir quoi dire et à qui), mention « bientôt finançable CPF en France ». Tutoiement, prix en HT.
- **Ne pas supprimer le poisson d'avril** (c'est un bon asset de marque, drôle, et il tape juste sur le créneau guru qu'on méprise). Juste le déplacer.

> Le poisson d'avril contient déjà la punchline qui colle au nouveau positionnement : « Juste un dev web indépendant basé à Metz, un terminal, et du café filtre. » À terme cette phrase pourra évoluer vers « un mec qui aide les indépendants à trouver des clients ».

---

## 6. Pages SEO locales `creation-site-web-*` (Metz, Nancy, Strasbourg, Colmar, Mulhouse)

### Ce que ça dit aujourd'hui (exemple Metz)
- H1/title : « Création site internet à Metz | Livré en 7 jours, dès 490€ ».
- Intro : « je crée des sites custom pour les PME de Metz et Moselle ».
- Tout le contenu est SEO local pur sur la requête « création site web [ville] », vouvoiement, axé site.
- Quelques coquilles existantes (« une vrai histoire », « qui tappe », « just »).

### L'écart vs conflit
Ces pages ciblent volontairement la requête Google **« création site web [ville] »**. C'est un canal d'acquisition SEO réel et rentable. Les passer en « bras droit » casserait le SEO (personne ne tape « bras droit indépendant Metz »).

**Donc : ne PAS réécrire le H1/title de ces pages.** Elles restent sur « création site web [ville] » pour le SEO. Le conflit avec le nouveau positionnement est **acceptable et assumé** : ce sont des portes d'entrée SEO sur la brique « site », qui amènent ensuite le prospect dans le funnel où on lui parle du reste.

### Reco (légère, optionnelle)
- Garder H1/title/intro tels quels (SEO).
- Ajouter en bas de chaque page géo un **bloc de transition vers le positionnement** : « Un site, c'est un bon début. Mais ce qu'il te faut vraiment, ce sont des clients. Je peux aussi t'aider à aller les chercher. → Voir comment je bosse ». Tutoiement.
- Corriger les coquilles au passage (« une vraie histoire », « qui tape », « juste »).
- Suffixer « HT » sur les « 490€ ».

> Priorité basse : ces pages fonctionnent, ne pas les casser. Le bloc de transition est un bonus de cohérence, pas une urgence.

---

## 7. `src/pages/realisations.astro` — le portfolio

### Ce que ça dit aujourd'hui
- H1 : « Mes réalisations ».
- Sous-titre : « Sites sur mesure, Astro + Tailwind. Rapide, bien référencé, pensé pour convertir. »
- Stats : projets / score vitesse / 0€ par mois.

### L'écart
Faible. Le portfolio prouve « je sais faire des sites », ce qui reste vrai et utile comme preuve. Le sous-titre est très technique (« Astro + Tailwind »), ce qui parle plus à un dev qu'à l'avatar. Pas de conflit fort, juste un recadrage de sous-titre possible.

### Reco (légère)
- H1 : garder « Mes réalisations » (ou « Ce que j'ai déjà construit »).
- Sous-titre → « Des sites qui ramènent des clients à des indépendants comme toi. Rapides, bien référencés, faits sur mesure. » (retirer le jargon « Astro + Tailwind » du sous-titre principal, le garder éventuellement en détail plus bas).
- Tutoiement.

> Priorité basse. Le portfolio est de la preuve, il sert le nouveau positionnement sans gros changement.

---

## 8. `src/pages/qui-suis-je.astro` — la page perso

### Ce que ça dit aujourd'hui
- H1 « Marc Muller », sous-titre « 40 ans, Messin. Entrepreneur depuis toujours, développeur par la force des choses. »
- Récit : grandi dans des boulangeries, 10 ans bâtiment/immobilier, 10 ans escape game, « fabriquer mes propres outils ». Galère à faire ses sites. « Aujourd'hui les outils ont rattrapé les gens comme moi, je crée des sites performants. »
- Stats : 20 ans entrepreneuriat, 4 secteurs, projets, Lighthouse 100.
- Section « Ce que je préfère dans ce métier ». Note plongée. CTA « On discute ? » — déjà en tutoiement, déjà chaleureux.

### L'écart
Cette page est **la plus proche du nouveau positionnement** : entrepreneur, mains dedans, fabrique ses outils, 20 ans dans 4 secteurs. C'est exactement le mécanisme « pourquoi moi ». Le seul écart : la chute (« je crée des sites performants ») retombe sur le site, alors que le récit prouve qu'il devrait retomber sur « j'aide les indépendants à trouver des clients ». Le sous-titre « développeur par la force des choses » sous-vend (le positionnement veut « entrepreneur qui met les mains dedans »).

### Reco de réécriture
- Sous-titre H1 → « 40 ans, Messin. Entrepreneur depuis toujours. J'aide les indépendants à trouver des clients, et je construis les outils qui vont avec. »
- Chute du récit (« Aujourd'hui... je crée des sites performants ») → recadrer : « Aujourd'hui, je mets tout ça au service des indépendants. Un site qui ramène des clients, de quoi aller les chercher, les outils qui te font gagner du temps. Comme l'associé que je n'avais pas quand j'ai commencé. »
- Renforcer le chiffre du mécanisme : si « 8-10 boîtes » et « ~20 entrepreneurs accompagnés » sont vrais, les faire apparaître ici (la page actuelle dit « 20 ans / 4 secteurs », on peut ajouter « 8-10 boîtes montées »).
- Le reste (boulangeries, fabriquer ses outils, plongée) : garder tel quel, c'est de l'or en termes d'authenticité.

> Cette page demande le moins de travail : c'est surtout la **chute** et le **sous-titre** à recadrer.

---

## 9. Header / navigation (impact transverse)

Le menu expose : **Réalisations · Offre · Journal · Qui suis-je · Contact.** Pas de « Méthode » ni « Formation » dans le menu.

### Reco
- Si la formation devient la porte d'entrée de gamme, envisager de l'exposer dans le menu (ex : « Se lancer » ou « Formation »).
- Envisager d'ajouter « Méthode » (« Comment je bosse ») au menu une fois réécrite, car c'est la page qui porte le mécanisme différenciant.
- Le libellé « Offre » reste bon (il couvrira la gamme une fois `/offre` restructurée).

---

## Ordre de priorité de réécriture

Du plus fort impact au plus faible. L'idée : changer d'abord ce qui irrigue tout le reste et ce que 100% des visiteurs voient.

| # | Cible | Pourquoi en premier | Effort |
|---|-------|---------------------|--------|
| **1** | `business.ts` (`description`, `jobTitle`, tagline globale, ajout offre « bras droit ») | Source de vérité : irrigue Schema.org, OG, footer. Tant qu'elle dit « création de sites », tout le site répète l'ancien message. | Faible |
| **2** | `index.astro` — **hero (H1 + sous-titres + CTA)** | Première chose vue par 100% des visiteurs. C'est LA bascule. Le H1 doit devenir « Tu n'as pas besoin d'un site. Tu as besoin de clients. » | Moyen |
| **3** | `index.astro` — sections PROBLÈME + MÉTHODE + OFFRE (gamme) + CTA final | Le corps de la home doit raconter le bras droit et la gamme, pas le site. C'est le gros du travail de fond. | Élevé |
| **4** | `offre.astro` — restructurer autour de la gamme + dissocier « bras droit » des forfaits maintenance 39/99€ | Page de conversion clé. Risque de confusion de prix si on ne sépare pas l'accompagnement business des forfaits site. | Élevé |
| **5** | `methode.astro` — passer de « pourquoi 490€ » à « comment je bosse (mécanisme différenciant) » | Porte le « pourquoi moi ». Page de conversion via le funnel interne. | Moyen |
| **6** | `qui-suis-je.astro` — recadrer le sous-titre + la chute | Déjà à 80% bon. Petit effort, gros gain de cohérence. | Faible |
| **7** | `formation.astro` — **décision URL** (poisson d'avril vs vraie formation) puis création de la vraie page d'entrée de gamme | Bloquant pour matérialiser la porte d'entrée de la gamme. Nécessite un arbitrage Marc avant exécution. | Moyen (+ décision) |
| **8** | `realisations.astro` — sous-titre + tutoiement | Cosmétique, le portfolio sert déjà le positionnement comme preuve. | Faible |
| **9** | Pages `creation-site-web-*` — NE PAS toucher le H1/SEO, juste bloc de transition + « HT » + coquilles | SEO local rentable à préserver. Conflit assumé. Bonus de cohérence seulement. | Faible |
| **10** | Header — exposer « Se lancer/Formation » et/ou « Méthode » une fois les pages prêtes | Dépend des décisions #5 et #7. | Faible |

### Rappels d'exécution pour la phase de réécriture (quand elle viendra)
- **Doctrine CMS** : ces pages sont des `.astro` éditées en direct (le site marcm n'est pas en mode contenu-CMS strict pour ces pages structurelles). Vérifier au moment d'exécuter si le contenu vit dans `src/content/*.json` ou en dur dans le `.astro` avant d'éditer, pour ne pas écraser une source.
- **Tutoiement** : passer index/offre/methode/realisations du « vous » au « tu » est un chantier mécanique à faire avec soin (pronoms, possessifs, accords).
- **« HT »** : grep sur « 490€ », « 39€/mois », « 99€/mois », « 90€ », « 120€ », etc. et suffixer « HT ».
- **Tiret cadratin** : grep sur « — » dans le contenu prospect et remplacer (virgule, point, deux-points).
- **Pas de « site gratuit »** : garder distincts audit Echo gratuit / hébergement inclus / site 490€ HT.
- **i18n** : chaque page FR a son équivalent EN (`/en/...`). Toute réécriture FR devra être répercutée côté EN (hors périmètre de cet audit, à planifier).
