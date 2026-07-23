# Audit marketing marcm.fr · juillet 2026

> Analyse seule, aucune modification du site. Auteur : expert-marcm.
> Données réelles au 2026-07-23. Sources : Umami Cloud (site Marc M, id `0e4930eb`), Google Search Console (`sc-domain:marcm.fr`), inventaire du repo post-bascule « zéro tarif » (commits 8ab9ed0 + 0e11f25) et funnel /onboarding (commit e6f2da8).

## Chiffres de cadrage (à garder en tête pour tout le rapport)

| Indicateur | Valeur réelle | Source | Fenêtre |
|---|---|---|---|
| Visiteurs | 305 | Umami | 90 j |
| Pages vues | 510 | Umami | 90 j |
| Taux de rebond | 82,7 % (316/382 visites) | Umami | 90 j |
| Durée moyenne / visite | ~35 s | Umami | 90 j |
| Clics organiques Google | 6 | GSC | 90 j |
| Impressions Google | 4 034 | GSC | 90 j |
| CTR organique | 0,15 % | GSC | 90 j |
| Position moyenne | 19,5 (page 2) | GSC | 90 j |
| Soumissions de formulaire | 3 `form-submit` + 1 `en-contact-form-submit` = 4 | Umami | 90 j |

Lecture d'ensemble : le site reçoit environ 3 à 4 visiteurs humains réels par jour et convertit une poignée de formulaires par trimestre. On n'est pas sur un problème d'optimisation fine, on est sur un problème de volume ET de clarté. Les deux se traitent, mais il faut nommer la réalité : aujourd'hui marcm.fr n'est pas un canal d'acquisition, c'est une carte de visite que presque personne ne trouve.

Réserve méthodo importante : une grande partie du trafic Umami est du bruit non qualifié. La page la plus vue sur 90 j est `/en/` (143 vues) alors que la home FR `/` n'en fait que 23, avec des référents exotiques (chat.zalo.me, huishang.trinapower.com) et l'essentiel du trafic en direct/none. Pour une agence qui vise les indépendants du Grand Est, ce trafic anglophone/asiatique n'est pas la cible. Les chiffres de conversion réels sont donc encore plus faibles que la moyenne brute ne le suggère.

---

## A. Cohérence : le site raconte-t-il une seule histoire ?

Verdict : le repositionnement « bras droit des indépendants » est bien passé dans le contenu on-page (hero, /offre, /methode, /qui-suis-je), mais il n'a pas atteint trois couches critiques, et la bascule « zéro tarif » de cette semaine a laissé des références orphelines. Résultat : trois versions de Marc coexistent selon où on regarde.

### A1. Le repositionnement est on-page mais pas dans les métadonnées (incohérence n°1)

Le `business.ts` est à jour : `jobTitle: 'Le bras droit des indépendants'`, tagline « Tu n'as pas besoin d'un site. Tu as besoin de clients. », description « comme un associé qui met les mains dedans ». Le hero home dit exactement ça. Bien.

Mais ce que Google affiche (et ce que lisent les IA) raconte l'ancienne histoire :
- Title home : « Création site internet artisan et PME, livré en 7 jours | Marc M »
- Description home : « Sites web sur mesure... 30+ sites livrés. Devis gratuit en 24h. »
- `llms.txt` : « Marc Muller, développeur web basé à Montigny-lès-Metz... Je crée des sites web sur mesure » + « 3 formules (Essentiel, Multi-pages, Sur mesure) ».

Donc le snippet de recherche, la balise que partagent les réseaux et le fichier destiné aux IA vendent encore « créateur de sites », pas « bras droit ». C'est l'incohérence la plus coûteuse : elle sabote le SEO (on se positionne sur « création site » au lieu de la nouvelle catégorie) ET la mémoire des IA, alors même que Marc a un article entier sur « être cité par ChatGPT ». Son propre llms.txt le décrit avec le positionnement qu'il vient d'abandonner.

### A2. L'offre récurrente (le cœur de gamme) est la moins actionnable du site (incohérence n°2, stratégique)

Le repositionnement dit : le cœur, c'est l'accompagnement récurrent (~500€/mois HT, le « Point Marketing »). Or sur le site :
- « L'accompagnement » existe dans `offers[]` avec `price: null` et se résout par « on en parle » vers /contact. Pas de page dédiée, pas de « voici à quoi ressemble un mois avec moi », pas de parcours propre.
- Le SITE, lui (le produit que Marc dit qu'on n'a PAS besoin en premier), a toute la machinerie : un configurateur complet (/commander), un onboarding 5 étapes (/onboarding), une page /offre détaillée.

Autrement dit, toute l'ingénierie de conversion est branchée sur le produit à faible positionnement (le one-shot à la brique), et le produit à fort positionnement (le récurrent) est un cul-de-sac « écris-moi ». Le site contredit sa propre thèse. Un visiteur convaincu par « j'ai besoin de clients, pas d'un site » n'a nulle part où aller sauf un formulaire de contact générique.

Confusion aggravante : deux choses différentes s'appellent « accompagnement ». Le cœur de gamme (bras droit récurrent) ET les forfaits de maintenance post-livraison (39€/mois « Accompagnement », 99€/mois « Croissance » dans `business.ts`). Même mot, deux produits, deux prix mentaux. À désambiguïser.

### A3. Séquelles de la bascule « zéro tarif » (incohérence n°3, corrigeable vite)

La migration de cette semaine a laissé des promesses de prix qui pointent vers du vide :
- Home, FAQ : « Le tarif est sur la page Offre. » et « Le détail et le tarif sont sur la page Offre. » Or /offre n'affiche plus aucun tarif. Le visiteur clique, cherche un prix, ne le trouve pas : effet « on me balade ».
- /offre garde du vocabulaire de prix orphelin : « le prix reflète l'efficacité de mon processus », « tu paies le travail réel, pas les frais d'une agence », « un prix honnête ». On parle de prix sans jamais en montrer un. C'est l'inconfort classique du « sur devis » mal amené : ça sent l'évasif si rien ne compense (preuve, process, délai).

### A4. Incohérence de délai promis (24h vs 48h)

Le repo contient 10 occurrences de « 24h » (les descriptions home et pages villes : « Devis gratuit en 24h ») contre 6 de « 48h » (/contact, /merci, /audit-gratuit, /onboarding : « je réponds sous 48h »). Deux promesses de réactivité selon la page. Trancher pour une seule (48h est plus tenable et déjà le standard des pages de conversion récentes).

### A5. Trop de portes, dont une à pitch inversé

Cinq points d'entrée coexistent : /contact (form simple), /onboarding (dossier 5 étapes, accessible depuis /contact), /commander (configurateur, depuis /offre), /audit-gratuit (Écho gratuit) et /echo (Écho payant). Chacune capte une partie de l'intention sans hiérarchie claire (détaillé en section C).

Cas /graphistes (noindex) : la page est une offre de sous-traitance B2B aux graphistes, à rebours du reste du site (B2C indépendants). Elle est noindex et hors sitemap, donc sans impact SEO, mais c'est une 6e histoire dans le tiroir. À garder telle quelle tant qu'elle sert de page d'atterrissage pour de la prospi ciblée, sinon à archiver.

---

## B. SEO : ce que disent les vrais chiffres GSC

Sur 90 j : 6 clics, 4 034 impressions, position moyenne 19,5. Google voit le site (57 pages avec des impressions, 111 requêtes distinctes) mais le classe en page 2-3, donc personne ne clique. Le problème n°1 n'est pas l'indexation, c'est le positionnement et l'adéquation requête/page.

### B1. Le paradoxe Mulhouse : 57 % des impressions sur une ville où Marc n'a aucune preuve locale

La page qui écrase tout le reste en volume est `/creation-site-web-mulhouse/` : 2 321 impressions (57,5 % de TOUTES les impressions du site), position 26,4 (page 3), 0 clic. Elle capte une nuée de requêtes e-commerce Mulhouse :

| Requête | Impressions | Position |
|---|---|---|
| création de site internet mulhouse | 639 | 23,9 |
| création site e-commerce mulhouse | 408 | 28,5 |
| création site web professionnel mulhouse | 122 | 26,8 |
| création site internet et référencement mulhouse | 99 | 25,9 |
| (une douzaine d'autres variantes « ... mulhouse ») | ~600 cumulé | 20-30 |

Or Marc est à Montigny-lès-Metz (Moselle), à ~200 km de Mulhouse (Haut-Rhin). Il n'a aucun signal local là-bas (pas de fiche GBP Mulhouse, pas de réalisation mulhousienne mise en avant). Il ne passera jamais page 1 sur « création site e-commerce mulhouse » face aux agences locales, et même s'il le faisait, ce n'est ni sa cible géo ni son offre (e-commerce). Ces 2 300 impressions sont un mirage : elles gonflent le total et le sentiment de « présence Google » sans aucune valeur commerciale.

Pendant ce temps, son vrai territoire est sous-exploité :
- « agence web moselle » : 45 impressions, position 16,7 (quick win, bas de page 2)
- « référencement metz » : position 8,3 ; « referencement web metz » : position 9,0
- La page `/creation-site-web-metz/` ne remonte quasiment pas dans le top pages.

Recommandation de fond : arrêter d'espérer Mulhouse/Colmar (villes sans ancrage) et concentrer l'autorité on-page + les backlinks + la fiche GBP sur Metz / Moselle / Nancy, là où il y a des réalisations réelles (DMulti, MM Sécurité, JD Zoothérapie, Angelo Grossi sont des clients Grand Est). Ne pas supprimer les pages villes lointaines, mais cesser d'y investir et renforcer massivement Metz/Nancy.

### B2. Les pages EN se classent mieux que les FR sur des requêtes locales, et captent du trafic non-cible

`/en/web-design-nancy/` est en position 7,1 (293 impressions), `/en/web-design-strasbourg/` en 7,8 (194 impressions), et « web agency nancy » est en position 6,5 avec 214 impressions. Ce sont les meilleures positions du site, mais : (a) 0 clic quand même, (b) ce sont des pages anglaises qui remontent sur un marché francophone, donc soit des expats, soit du bruit. Le trafic Umami confirme : `/en/` domine artificiellement (143 vues vs 23 pour `/`). Risque de cannibalisation FR/EN sur les requêtes locales à surveiller (vérifier le hreflang et que la version FR est bien servie aux Français). Ce n'est pas une priorité business, mais ça explique pourquoi les « bonnes positions » ne rapportent rien : elles sont sur la mauvaise langue pour la mauvaise audience.

### B3. Quick wins réalistes (position 8-20, impressions exploitables)

| Requête | Impressions | Position | Action |
|---|---|---|---|
| marc m (marque) | 54 | 8,2 | La requête de marque n'est même pas en position 1. Renforcer le branding (title home, Schema Person, cohérence du nom). Un concurrent ou du bruit occupe le top. |
| agence web moselle | 45 | 16,7 | Requête cible parfaite. Optimiser une page « agence web Moselle/Metz » (title, H1, contenu local, GBP). |
| web agency nancy | 214 | 6,5 | Déjà page 1 mais 0 clic (page EN). Voir si une version FR peut capter l'intention. |
| référencement metz / referencement web metz | 6-8 | 8-9 | Territoire réel, à consolider. |

Le meilleur levier CTR immédiat : la home est à 456 impressions, position 10,3, pour 1 clic. Réécrire son title/description (voir B4) peut débloquer des clics sans bouger la position.

### B4. État on-site post-réécriture

- Titles/descriptions (`src/content/seo/index.json`) : non alignés sur le repositionnement (cf. A1). Ils vendent « création de site 7 jours / 30+ sites / devis 24h ». À réécrire pour porter la promesse « des clients, pas juste un site » sur les pages piliers (/, /offre, /methode) tout en gardant les mots-clés locaux sur les pages villes.
- Maillage interne : la home pousse vers /offre (x3), /audit-gratuit (x2), /realisations (x2), /contact (x2). Correct, mais aucun lien direct home vers le cœur de gamme (l'accompagnement récurrent) ni vers /methode depuis les CTA principaux. Le produit stratégique n'est pas maillé.
- llms.txt / GEO : périmé (cf. A1). À reconstruire sur la nouvelle catégorie et la nouvelle structure d'offre. C'est un chantier à fort ROI GEO vu que Marc mise sur la citation par les IA.
- Blog réécrit sans prix : les articles « combien coûte un site web » et « agence web solo » ont perdu les tarifs Marc mais gardent des fourchettes de marché. Bon compromis : l'article « combien coûte un site web » peut toujours ranker sur cette requête informationnelle avec des fourchettes marché génériques et un CTA vers /onboarding, sans afficher de prix Marc. Le risque n'est pas le prix absent, c'est de perdre l'intention transactionnelle : garder au moins une fourchette marché crédible pour rester pertinent sur la requête.
- Le journal marche modestement : `/journal/refonte-jd-zootherapeute/` est en position 5,5. Les études de cas géolocalisées sont le meilleur actif SEO/preuve du site, à multiplier (une par client Grand Est réel).

---

## C. Conversion : parcours réels et friction des portes

### C1. Le tunnel réel, mesuré (Umami 90 j)

Événements bruts sur la fenêtre : `commander-addon-select` 32, `en-hero-audit-gratuit-click` 15, `en-hero-project-click` 13, `faq-open` 9, `offre-faq-open` 9, puis les conversions : `form-submit` 3, `en-contact-form-submit` 1, `commander-step-2` 1, `hero-cta-click` 1.

Ce que ça raconte :
- Le configurateur /commander attire (32 sélections d'add-ons) mais ne convertit pas : 1 seul passage à l'étape 2, 0 finalisation visible. Les gens jouent avec les options puis partent. Hypothèse forte : depuis la bascule « configurateur sans total », l'utilisateur choisit des options sans jamais voir de montant ni d'engagement clair, donc rien ne le pousse à valider. On a retiré le prix mais on n'a rien mis à la place (pas de « récap de ta demande », pas de « je te chiffre ça sous 48h »). Le configurateur est devenu un jouet sans sortie.
- Les FAQ sont très ouvertes (18 ouvertures cumulées home + offre) : les gens ont des questions non levées avant d'agir. Signal que la promesse/prix reste floue et retient l'action.
- 4 soumissions de formulaire en 90 j, sur ~305 visiteurs bruts (dont beaucoup de bots). Le taux réel est indéterminable proprement mais l'ordre de grandeur est clair : quasi rien.

### C2. Quelle porte pour quoi ? (aujourd'hui : indéfini)

| Porte | Rôle actuel | Problème |
|---|---|---|
| /contact | Form simple, « je réponds sous 48h » | Générique, aucune qualification, ne dit pas ce qui se passe ensuite |
| /onboarding | Dossier projet 5 étapes (nouveau, 22/07) | 3 vues seulement, event `onboarding-cta-contact` pas encore dans les données (posé hier). Trop tôt pour mesurer. Risque : 5 étapes est lourd pour quelqu'un qui n'est pas encore décidé |
| /commander | Configurateur one-shot | Fort dropout (cf. C1), et pousse le produit à faible positionnement |
| /audit-gratuit + /echo | Aimant (Écho gratuit) et produit payant | Bon aimant de haut de tunnel, mais mal relié au reste : un audit gratuit devrait déboucher sur une conversation, pas rester une impasse |

Recommandation de clarification (une intention par porte) :
- /audit-gratuit (Écho) = aimant haut de tunnel, sans engagement. Sa sortie doit être « on en parle 20 min ».
- /contact = la porte par défaut pour « j'hésite / je veux parler ». C'est là que doit atterrir quelqu'un intéressé par l'accompagnement récurrent.
- /onboarding = réservé à un prospect déjà chaud et décidé sur un site (post-échange, ou depuis /commander). Ne pas en faire la porte d'entrée froide : 5 étapes tuent un visiteur tiède. Le CTA « Démarrer mon projet » sur /contact envoie potentiellement des gens tièdes dans un formulaire lourd. Mieux vaut : /contact pour parler, /onboarding proposé APRÈS le premier contact.
- /commander = à réparer (sortie claire) ou à fusionner dans /onboarding.

### C3. Le « sur devis » : où ça aide, où ça fait fuir

Le « sur devis » partout est cohérent avec un positionnement premium/accompagnement (on ne vend pas un prix, on vend une relation). Mais il ne tient que si trois choses compensent, et elles sont aujourd'hui faibles :
1. La preuve. 4 avis GBP réels sont affichés (bien), 30+ réalisations existent, mais le portfolio mélange des clients réels (DMulti, MM Sécurité, JD Zoothérapie, Angelo Grossi, P'Accord Piano) et ce qui ressemble à des exemples génériques (Boulangerie Pétrin, Coach Max, Yoga Sarah, Plomberie Alsace...). Un prospect qui reconnaît des noms « types » sent le remplissage. Mettre en avant en priorité les vrais clients nommés et vérifiables.
2. Le process. « Sur devis » sans process visible = angoisse. Le « je te dis par quoi commencer, sous 48h, sans engagement » doit être omniprésent près de chaque CTA, pas seulement dans une FAQ.
3. Le délai. Aujourd'hui incohérent (24h vs 48h, cf. A4).

Là où le « sur devis » fait fuir : le configurateur /commander. On configure un produit packageable (un site vitrine) : cacher le total le vide de son intérêt. Pour ce produit précis, un ordre de grandeur (« à partir de X », ou au minimum une fourchette) réduit la friction. Le « sur devis » total a du sens pour l'accompagnement récurrent (sur mesure), beaucoup moins pour le site vitrine standardisé.

### C4. Preuve sociale et CTA

- Preuve sociale : présente mais diluée (voir C3). Les avis GBP et les études de cas (journal) sont les meilleurs actifs, à remonter plus haut sur la home et /offre.
- CTA : la home a une hiérarchie lisible (« Voir l'offre » domine), mais le CTA principal envoie vers /offre, pas vers une action. Pour le cœur de gamme, il manque un CTA « On en parle 20 min » qui va droit à la conversation (Cal.com existe déjà, page /aide/cal-com, c'est même la page la mieux convertie du site avec 2 clics GSC et un CTR de 3,1 %). Brancher un lien de prise de RDV direct est probablement le levier de conversion le plus court.

---

## D. Améliorations priorisées

Matrice impact/effort. Impact = effet attendu sur la cohérence, le SEO ou la conversion vu la réalité des chiffres. Effort = charge de mise en œuvre pour Marc.

| # | Recommandation (une phrase actionnable) | Impact | Effort | Axe |
|---|---|---|---|---|
| 1 | Réécrire les titles/descriptions des pages piliers (/, /offre, /methode) pour porter « des clients, pas juste un site » au lieu de « création de site 7 jours ». | Fort | Faible | A/B |
| 2 | Corriger les références de prix orphelines : retirer « le tarif est sur la page Offre » (home FAQ) et le vocabulaire de prix résiduel de /offre. | Fort | Faible | A |
| 3 | Ajouter un CTA « On en parle, 20 min, sans engagement » (lien Cal.com direct) sur home, /offre et fin de /audit-gratuit. | Fort | Faible | C |
| 4 | Reconstruire llms.txt + llms-full.txt sur le positionnement « bras droit » et la nouvelle structure d'offre (levier GEO cohérent avec la thèse de Marc). | Fort | Moyen | A/B |
| 5 | Trancher le délai promis : 48h partout (retirer les « devis 24h » des descriptions home/villes). | Moyen | Faible | A |
| 6 | Créer une page dédiée à l'accompagnement récurrent (« à quoi ressemble un mois avec moi »), le cœur de gamme aujourd'hui sans parcours propre. | Fort | Moyen | A/C |
| 7 | Réparer /commander : ajouter un récap de la demande + « je te chiffre sous 48h » en sortie (ou un ordre de grandeur), sinon 0 finalisation continue. | Fort | Moyen | C |
| 8 | Désambiguïser les deux « accompagnement » (cœur de gamme récurrent vs forfaits maintenance 39/99€) par un renommage. | Moyen | Faible | A |
| 9 | Concentrer l'effort SEO local sur Metz/Moselle/Nancy (contenu, GBP, backlinks) et cesser d'investir sur Mulhouse/Colmar sans ancrage. | Fort | Moyen | B |
| 10 | Nettoyer le portfolio : mettre en avant les clients réels nommés, réduire la visibilité des exemples génériques qui sentent le remplissage. | Moyen | Faible | C |
| 11 | Optimiser une page « agence web Moselle / Metz » sur la requête « agence web moselle » (position 16,7, 45 impressions, cible parfaite). | Moyen | Faible | B |
| 12 | Clarifier le rôle des portes : /onboarding réservé aux prospects chauds (post-échange), pas en entrée froide depuis /contact. | Moyen | Faible | C |
| 13 | Publier une étude de cas géolocalisée par client Grand Est réel dans le journal (meilleur actif SEO + preuve, cf. refonte-jd-zoo en position 5,5). | Moyen | Moyen | B/C |
| 14 | Remonter la preuve sociale (avis GBP + études de cas) plus haut sur home et /offre pour compenser l'absence de prix. | Moyen | Faible | C |
| 15 | Vérifier le hreflang FR/EN et que les pages EN ne captent pas les requêtes locales francophones à la place des FR (cannibalisation). | Faible | Moyen | B |

### Les 3 à faire cette semaine

1. Aligner la couche méta sur le repositionnement (reco 1) ET tuer les références de prix orphelines (reco 2). C'est quasi gratuit, ça arrête l'incohérence la plus visible (le snippet Google contredit la home, et la home promet un prix qui n'existe pas). Effort faible, impact immédiat sur cohérence et CTR.
2. Poser un CTA de prise de RDV direct « On en parle, 20 min » (reco 3) sur home, /offre et sortie d'audit gratuit. C'est le chemin le plus court vers une conversation, et /aide/cal-com prouve déjà que la prise de RDV convertit le mieux du site.
3. Réparer la sortie de /commander (reco 7). 32 personnes ont configuré, 0 ont fini : on saigne des prospects chauds à l'étape finale depuis la bascule sans total. Ajouter un récap + « je te chiffre sous 48h » (ou un ordre de grandeur) rebranche une sortie.

### Note de cadrage honnête

Aucune de ces optimisations ne compensera le fait que le site reçoit ~3-4 visiteurs humains réels par jour. Le vrai goulot est le volume de trafic qualifié, pas le taux de conversion. Ces recommandations rendent le site cohérent et prêt à convertir, mais l'acquisition (LinkedIn, GBP, prospection, bouche-à-oreille) reste le moteur. Cohérence d'abord parce qu'elle est presque gratuite et qu'elle conditionne tout le reste (y compris la citation par les IA) ; volume ensuite, hors périmètre de ce seul site.

---

*Données Umami et GSC vérifiées le 2026-07-23. Là où la donnée manque (event onboarding-cta-contact posé le 22/07, taux de conversion parasité par le trafic bot /en/), c'est signalé dans le corps du rapport. Aucun chiffre n'a été estimé.*
