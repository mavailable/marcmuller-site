// Persona data v2 - Buddha View Hostel (Koh Tao, Thailand)
// Echo Pro v2 - 300 visites simulees du NOUVEAU site (100 EN + 100 FR + 100 ES).
// 36 personas representatifs transcrits ici (12 par langue). Rapport en francais.
// Source : drafts/echo/buddhaview-hostel/v2/ (synthese, audit-technique, simulations.json)

export type Decision = 'Convertit' | 'Hesite' | 'Quitte';

export type Persona = {
  id: number;
  code: string;
  name: string;
  age: number;
  emoji: string;
  langue: 'EN' | 'FR' | 'ES';
  langueLabel: string;
  situation: string;
  canal: string;
  canalDetail: string;
  device: string;
  decision: Decision;
  decisionLabel: string;
  histoire: string;
  localisation: string;
  maturite: string;
  segment: string;
  contexte: string;
  impression: string;
  parcours: [string, string][];
  questionCle: string;
  reponse: 'Oui' | 'Partiellement' | 'Non';
  commentReponse: string;
  positifs: string[];
  frictions: string[];
  ceQuiFeraitBasculer: string;
  exp: number;
  conf: number;
  clarte: number;
};

export const personas: Persona[] = [
  {
    "id": 1,
    "code": "EN-02",
    "name": "Sophie",
    "age": 27,
    "emoji": "🤿",
    "langue": "EN",
    "langueLabel": "Anglophone",
    "situation": "Australienne, veut passer son Open Water à Koh Tao",
    "canal": "Hostelworld / Booking",
    "canalDetail": "Booking.com, onglet « site de l'établissement »",
    "device": "Mobile",
    "decision": "Convertit",
    "decisionLabel": "Réserve",
    "histoire": "Elle vérifie le combo dive + stay, tout est confirmé noir sur blanc, elle réserve lit et Open Water dans la foulée.",
    "localisation": "Sydney, départ dans 3 semaines",
    "maturite": "Décision",
    "segment": "Client idéal",
    "contexte": "A presque réservé sur Booking mais veut vérifier le combo dive + stay avant de payer",
    "impression": "En 5 secondes elle voit hostel + plongée au même endroit, exactement ce qu'elle cherchait, le parcours en 3 étapes clarifie tout.",
    "parcours": [
      [
        "Home",
        "Le combo lit + plongée est le message central, elle se sent immédiatement au bon endroit"
      ],
      [
        "Diving, page Open Water",
        "9 500 THB, 3 jours, max 4 par instructeur, transfert gratuit depuis la porte : tout y est"
      ],
      [
        "Rooms",
        "Dortoir femmes à 650 THB avec salle de bain privative, parfait pour dormir avant les plongées"
      ],
      [
        "Formulaire book-diving",
        "Elle envoie sa demande Open Water, la confirmation « sous quelques heures » ne l'arrête pas à 3 semaines du départ"
      ],
      [
        "Cloudbeds",
        "Elle lance la réservation du lit dans la foulée"
      ]
    ],
    "questionCle": "Puis-je dormir et passer mon Open Water au même endroit, avec transport ?",
    "reponse": "Oui",
    "commentReponse": "Même lieu, transfert gratuit vers Tanote Bay depuis la porte du hostel, déroulé et prix noir sur blanc : le combo est limpide.",
    "positifs": [
      "Page Open Water complète : prix, durée, ratio max 4 par instructeur, PADI 5 étoiles",
      "Transfert plongée gratuit depuis la porte du hostel, logistique du combo limpide"
    ],
    "frictions": [
      "Deux démarches séparées (Cloudbeds pour le lit, formulaire pour le cours), elle doit espérer que les deux confirmations s'alignent"
    ],
    "ceQuiFeraitBasculer": "",
    "exp": 9,
    "conf": 9,
    "clarte": 9
  },
  {
    "id": 2,
    "code": "EN-11",
    "name": "Hannah",
    "age": 30,
    "emoji": "✈️",
    "langue": "EN",
    "langueLabel": "Anglophone",
    "situation": "Néo-Zélandaise, voyage longue durée, plongeuse occasionnelle",
    "canal": "Bouche-à-oreille",
    "canalDetail": "Bouche-à-oreille (une amie rencontrée en voyage lui a recommandé)",
    "device": "Mobile",
    "decision": "Convertit",
    "decisionLabel": "Réserve",
    "histoire": "Venue sur la reco d'une amie, elle retrouve tout (prix, calme, plongée) et file sur Cloudbeds réserver sa capsule.",
    "localisation": "Bangkok, planifie la suite",
    "maturite": "Comparaison",
    "segment": "Client recommandé",
    "contexte": "Reco perso, veut confirmer que ça lui plaît",
    "impression": "« Sleep here. Try scuba for free. » et une photo qui respire le calme : elle comprend le concept hostel + plongée immédiatement, ça colle au récit de son amie.",
    "parcours": [
      [
        "Home",
        "l'offre en 3 étapes et le ton calme correspondent à ce que son amie racontait, elle se sent au bon endroit"
      ],
      [
        "Rooms",
        "la capsule sunset à partir de 500 THB avec balcon lui plaît, photos et équipements détaillés par chambre"
      ],
      [
        "Diving",
        "plongeuse occasionnelle, elle note le try-dive océan à partir de 2 000 THB et la navette gratuite vers Tanote Bay"
      ],
      [
        "Practical info",
        "annulation gratuite jusqu'à 24 h, check-in 14 h, rien qui bloque"
      ],
      [
        "Cloudbeds",
        "clique le lien de la capsule pour caler ses dates"
      ]
    ],
    "questionCle": "Est-ce que ça vaut la reco de mon amie ?",
    "reponse": "Oui",
    "commentReponse": "Le site confirme point par point (calme, propreté vantée dans les témoignages, prix affichés, combo plongée), la reco est validée.",
    "positifs": [
      "Prix affichés par chambre sans détour",
      "Parcours en 3 étapes limpide qui matche exactement le bouche-à-oreille"
    ],
    "frictions": [
      "Dispo et prix exacts par date seulement sur Cloudbeds (une deuxième étape)"
    ],
    "ceQuiFeraitBasculer": "",
    "exp": 9,
    "conf": 8,
    "clarte": 9
  },
  {
    "id": 3,
    "code": "EN-39",
    "name": "Dwayne",
    "age": 33,
    "emoji": "🎖️",
    "langue": "EN",
    "langueLabel": "Anglophone",
    "situation": "Américain, vétéran reconverti coach sportif, voyage solo structuré, jamais plongé mais décidé à passer une certification, budget moyen",
    "canal": "Assistant IA",
    "canalDetail": "IA (Claude, « best structured place to learn scuba diving koh tao »)",
    "device": "Mobile",
    "decision": "Convertit",
    "decisionLabel": "Réserve",
    "histoire": "La progression piscine, mer, certification affichée comme un plan le convainc : formulaire envoyé, lit réservé.",
    "localisation": "Ho Chi Minh City, Thaïlande dans 2 semaines",
    "maturite": "Découverte",
    "segment": "Client en découverte",
    "contexte": "Il se fixe un objectif par voyage, celui-ci : la certification Open Water",
    "impression": "La home présente la progression en 3 étapes comme un plan d'entraînement : lit, piscine, puis mer si validé. Structure et discipline, son langage.",
    "parcours": [
      [
        "Home",
        "Le parcours 3 étapes affiché comme une méthode, il adhère immédiatement au cadre"
      ],
      [
        "Pages try-scuba puis Open Water",
        "Progression piscine, mer, certification avec prix posés (gratuit, puis 9 500 THB pour l'OW)"
      ],
      [
        "About",
        "25+ ans, 100 000 certifiés, PADI 5-Star IDC, et max 4 par instructeur : gros volume compensé par un petit ratio, pas une usine"
      ],
      [
        "Formulaire book-diving",
        "Niveau débutant, case dates souples cochée, demande envoyée"
      ],
      [
        "Rooms puis Cloudbeds",
        "Dortoir rez-de-chaussée à 500 THB, pratique et sobre, il réserve"
      ]
    ],
    "questionCle": "Est-ce une école sérieuse et structurée, ou une usine à certifs ?",
    "reponse": "Oui",
    "commentReponse": "Le ratio max 4 par instructeur écarte l'image d'usine malgré les 100 000 certifiés, et la progression par étapes est affichée noir sur blanc.",
    "positifs": [
      "Progression en 3 étapes présentée comme une méthode claire, du test piscine à la certification",
      "Ratio 4 plongeurs par instructeur affiché, la preuve d'encadrement qu'il exigeait"
    ],
    "frictions": [
      "La réservation plongée passe par un formulaire avec confirmation différée, pas de créneau verrouillé en temps réel"
    ],
    "ceQuiFeraitBasculer": "",
    "exp": 9,
    "conf": 9,
    "clarte": 9
  },
  {
    "id": 4,
    "code": "EN-07",
    "name": "Nina",
    "age": 33,
    "emoji": "🧘‍♀️",
    "langue": "EN",
    "langueLabel": "Anglophone",
    "situation": "Allemande anglophone, voyageuse éco-responsable",
    "canal": "Google Maps",
    "canalDetail": "Google Maps (recherche « hostel Mae Haad »)",
    "device": "Mobile",
    "decision": "Convertit",
    "decisionLabel": "Réserve",
    "histoire": "Le duo solaire et eau de pluie sonne concret, l'emplacement est limpide, elle réserve ses 4 nuits en direct.",
    "localisation": "Déjà sur Koh Tao, cherche où loger 4 nuits",
    "maturite": "Comparaison",
    "segment": "Client idéal",
    "contexte": "A vu le pin sur Maps, regarde le site pour valider l'éco et l'emplacement",
    "impression": "Dès la home elle voit un hostel calme et éco, solaire et eau de pluie annoncés, ça sonne concret et pas cosmétique.",
    "parcours": [
      [
        "Home",
        "Panneaux solaires + récupération d'eau de pluie : des dispositifs précis et nommés, pas un simple label vert"
      ],
      [
        "About",
        "25 ans d'ancrage local avec le centre de plongée, ça crédibilise la démarche"
      ],
      [
        "Practical info",
        "Directions détaillées depuis le ferry, carte cliquable, 300 m à plat de l'embarcadère : parfait avec son sac"
      ],
      [
        "Rooms puis Cloudbeds",
        "Dortoir à 500 THB affiché, elle lance la réservation de ses 4 nuits en direct"
      ]
    ],
    "questionCle": "Est-ce vraiment un hébergement éco et bien situé ?",
    "reponse": "Oui",
    "commentReponse": "Solaire et eau de pluie nommés concrètement, emplacement limpide avec directions détaillées et carte cliquable.",
    "positifs": [
      "Démarche éco concrète (solaire, eau de pluie) plutôt qu'un vague discours vert",
      "Localisation limpide : 300 m à plat de l'embarcadère, directions détaillées + carte cliquable"
    ],
    "frictions": [
      "La démarche éco n'est pas détaillée plus loin (part du solaire, gestion des déchets), elle croit sur parole les deux dispositifs cités"
    ],
    "ceQuiFeraitBasculer": "",
    "exp": 9,
    "conf": 8,
    "clarte": 9
  },
  {
    "id": 5,
    "code": "EN-08",
    "name": "Dev",
    "age": 28,
    "emoji": "🤖",
    "langue": "EN",
    "langueLabel": "Anglophone",
    "situation": "Britannique d'origine indienne, planifie via ChatGPT",
    "canal": "Assistant IA",
    "canalDetail": "IA (ChatGPT lui a suggéré Buddha View comme « hostel + plongée »)",
    "device": "Desktop",
    "decision": "Hesite",
    "decisionLabel": "Hésite",
    "histoire": "La reco IA est confirmée point par point, mais sans note externe à recouper il met l'hostel en tête de liste sans réserver.",
    "localisation": "Londres, voyage dans 2 mois",
    "maturite": "Découverte",
    "segment": "Client en découverte",
    "contexte": "Vérifie une reco IA à 2 mois du départ",
    "impression": "La home confirme d'un coup d'oeil ce que ChatGPT annonçait : hostel éco, calme, essai plongée gratuit.",
    "parcours": [
      [
        "Home",
        "Le pitch en 3 étapes (lit, piscine offerte, mer si ça accroche) structure exactement l'offre décrite par l'IA"
      ],
      [
        "Diving",
        "PADI 5 étoiles, max 4 par instructeur, prix en THB affichés : des faits précis qu'il peut noter"
      ],
      [
        "Rooms",
        "Fourchettes nettes du dortoir 500 THB à la Superior 2 500 THB, il cadre le budget"
      ],
      [
        "About",
        "25+ ans, 100 000 plongeurs certifiés : la reco IA est confirmée point par point"
      ],
      [
        "Témoignages",
        "Il cherche une note externe pour recouper, il ne trouve que des citations maison avec prénoms"
      ]
    ],
    "questionCle": "Ce que ChatGPT m'a dit est-il confirmé sur le site officiel ?",
    "reponse": "Oui",
    "commentReponse": "Combo plongée, démarche éco et sérieux du centre sont confirmés, avec des faits structurés et chiffrés faciles à vérifier.",
    "positifs": [
      "Offre résumée en 3 étapes, compréhensible en une minute, idéale pour vérifier une reco IA",
      "Faits vérifiables et chiffrés : PADI 5 étoiles, ratio 4 max, prix en THB, 25+ ans d'expérience"
    ],
    "frictions": [
      "Pas de note agrégée ni lien vers des avis tiers : pour recouper la réputation, il doit sortir du site"
    ],
    "ceQuiFeraitBasculer": "Une note vérifiable liée directement depuis le site, il réserverait sans détour",
    "exp": 8,
    "conf": 7,
    "clarte": 9
  },
  {
    "id": 6,
    "code": "EN-05",
    "name": "Liam & Chloe",
    "age": 29,
    "emoji": "🍻",
    "langue": "EN",
    "langueLabel": "Anglophone",
    "situation": "Couple irlandais, backpackers, veulent une chambre privée pas chère",
    "canal": "Hostelworld / Booking",
    "canalDetail": "Agoda, lien site officiel",
    "device": "Tablette",
    "decision": "Hesite",
    "decisionLabel": "Hésite",
    "histoire": "Le calme et les privées avec balcon leur plaisent, mais le prix exact exige Cloudbeds, ils comparent d'abord avec Agoda.",
    "localisation": "Krabi, remontent vers le golfe",
    "maturite": "Comparaison",
    "segment": "Client adjacent",
    "contexte": "Comparent la chambre privée Agoda vs le direct",
    "impression": "La page respire sur iPad, ils voient vite qu'il existe de vraies chambres privées avec salle de bain et balcon, pas que des dortoirs.",
    "parcours": [
      [
        "Home",
        "Positionnement calme non festif écrit noir sur blanc : bon point, ils craignaient le bruit des dortoirs voisins"
      ],
      [
        "Rooms",
        "Deluxe 2 300 THB et Superior 2 500 THB avec salle de bain et balcon, photos galerie à l'appui"
      ],
      [
        "Practical info",
        "Annulation gratuite jusqu'à 24 h, check-in 14 h : les conditions sont claires"
      ],
      [
        "Cloudbeds",
        "Pour le prix exact à leurs dates il faut ressaisir les dates, ils gardent leur panier Agoda ouvert à côté"
      ]
    ],
    "questionCle": "Les chambres privées sont à quel prix et est-ce calme ?",
    "reponse": "Partiellement",
    "commentReponse": "Le calme est répondu franchement (positionnement assumé, témoignages), le prix est en fourchette : le montant exact à leurs dates exige le passage par Cloudbeds.",
    "positifs": [
      "Positionnement calme assumé, exactement ce qu'ils cherchent pour une privée",
      "Fourchettes des privées affichées avec photos, équipements et salle de bain détaillés"
    ],
    "frictions": [
      "Prix exact par date uniquement via Cloudbeds, une étape de plus face à Agoda qui affiche tout d'un coup",
      "Petit-déjeuner non inclus à ce niveau de prix, ils comparent avec des guesthouses qui l'incluent"
    ],
    "ceQuiFeraitBasculer": "Un prix direct égal ou inférieur à Agoda à leurs dates, ou un avantage résa directe affiché",
    "exp": 7,
    "conf": 8,
    "clarte": 8
  },
  {
    "id": 7,
    "code": "EN-03",
    "name": "Marcus",
    "age": 31,
    "emoji": "💻",
    "langue": "EN",
    "langueLabel": "Anglophone",
    "situation": "Nomade digital canadien, travaille en remote (dev freelance)",
    "canal": "Google Search",
    "canalDetail": "Google Search « hostel Koh Tao wifi »",
    "device": "Desktop",
    "decision": "Hesite",
    "decisionLabel": "Hésite",
    "histoire": "Le Wi-Fi est confirmé partout mais sans débit ni preuve d'usage pro, il garde l'hostel en option et va vérifier ailleurs.",
    "localisation": "Chiang Mai, veut bouger vers une île",
    "maturite": "Comparaison",
    "segment": "Client adjacent",
    "contexte": "Veut un hostel avec espace de travail ET Wi-Fi confirmé pour quelques jours de remote",
    "impression": "Site lisible et net sur grand écran, il repère dès la home « Free Wi-Fi in every room, plus quiet spots to work », premier verrou levé.",
    "parcours": [
      [
        "Home",
        "Wi-Fi gratuit dans chaque chambre + coins calmes pour travailler : ça répond précisément à sa requête"
      ],
      [
        "Practical info",
        "Espaces de travail confirmés, hostel calme non festif : bon environnement pour bosser en journée"
      ],
      [
        "FAQ Wi-Fi",
        "La FAQ dédiée confirme encore, mais aucun débit chiffré, aucune précision sur la stabilité"
      ],
      [
        "Témoignages",
        "Il cherche une mention Wi-Fi d'un télétravailleur parmi les 10 avis, il n'en trouve pas"
      ]
    ],
    "questionCle": "Le Wi-Fi est-il assez fiable pour télétravailler ?",
    "reponse": "Partiellement",
    "commentReponse": "Le Wi-Fi est confirmé noir sur blanc à plusieurs endroits (énorme progrès), mais sans débit mesuré ni retour d'usage pro, il ne peut pas conclure pour des visios.",
    "positifs": [
      "Wi-Fi confirmé explicitement (home, FAQ, infos pratiques) avec espaces de travail dédiés",
      "Positionnement calme assumé : un hostel où l'on peut réellement travailler en journée"
    ],
    "frictions": [
      "Aucun débit ni test de connexion publié, « Free Wi-Fi » reste déclaratif",
      "Aucun témoignage de télétravailleur pour valider l'usage en conditions réelles"
    ],
    "ceQuiFeraitBasculer": "Un débit mesuré affiché ou un avis de remote worker, il réserverait dans l'heure",
    "exp": 7,
    "conf": 7,
    "clarte": 8
  },
  {
    "id": 8,
    "code": "EN-47",
    "name": "Jurgen",
    "age": 58,
    "emoji": "🩺",
    "langue": "EN",
    "langueLabel": "Anglophone",
    "situation": "Allemand, médecin, plongeur confirmé (200+ plongées), 2 semaines avec sa femme elle aussi plongeuse, budget confortable, préfère les structures à taille humaine",
    "canal": "Assistant IA",
    "canalDetail": "IA (Perplexity, « dive and stay koh tao two weeks couple »)",
    "device": "Desktop",
    "decision": "Hesite",
    "decisionLabel": "Hésite",
    "histoire": "Séduit par les instructeurs germanophones, il bute sur l'absence de forfaits fun dives et garde les resorts en lice.",
    "localisation": "Francfort, voyage prévu dans 2 mois",
    "maturite": "Comparaison",
    "segment": "Client adjacent",
    "contexte": "Ils réservent leurs plongées tôt pour garantir les places en haute saison",
    "impression": "Site sérieux, la crédibilité du centre saute aux yeux (PADI 5 étoiles, 25+ ans, 100 000 plongeurs certifiés). Il ouvre méthodiquement la page Rooms pour juger la Superior.",
    "parcours": [
      [
        "Home",
        "hostel calme adossé à un vrai centre de plongée, bon signal pour un couple de plongeurs"
      ],
      [
        "Rooms",
        "Superior 2 500 THB, vue mer, sdb, balcon, ménage quotidien : correct, mais est-ce un confort qui tient 2 semaines ?"
      ],
      [
        "Diving hub",
        "instructeurs germanophones confirmés, max 4 plongeurs par instructeur, transfert gratuit : très bons points"
      ],
      [
        "Recherche fun dives",
        "rien de chiffré pour certifiés, ni prix par plongée ni forfaits, tout est orienté essai et cours débutants"
      ],
      [
        "Practical info",
        "pas de tarif long séjour (« écrivez-nous »), pas de petit-déjeuner : l'addition de 14 nuits reste floue"
      ]
    ],
    "questionCle": "Une chambre Superior d'hostel tient-elle deux semaines de confort pour un couple ?",
    "reponse": "Partiellement",
    "commentReponse": "La chambre coche les cases (vue, sdb, balcon, ménage quotidien), mais rien n'est pensé pour 2 semaines : ni tarif long séjour, ni petit-déj, ni offre fun dives chiffrée pour structurer les journées de plongeurs confirmés.",
    "positifs": [
      "Instructeurs germanophones écrits noir sur blanc, rare et décisif pour plonger en couple dans sa langue",
      "Sérieux du centre étayé par des faits (PADI 5 étoiles, 25 ans, max 4 par instructeur), pas par des slogans"
    ],
    "frictions": [
      "Aucune offre fun dives détaillée pour plongeurs certifiés (pas de prix par plongée ni forfaits), là où les dive resorts concurrents affichent tout",
      "Pas de tarif long séjour affiché, il faudrait écrire pour chiffrer 2 semaines",
      "Pas de petit-déjeuner inclus, détail qui compte sur 14 matins avant plongée"
    ],
    "ceQuiFeraitBasculer": "Une page fun dives avec prix par plongée et forfait 10 plongées, plus un tarif long séjour affiché pour les séjours de 2 semaines",
    "exp": 7,
    "conf": 8,
    "clarte": 7
  },
  {
    "id": 9,
    "code": "EN-10",
    "name": "Brandon",
    "age": 25,
    "emoji": "🏝️",
    "langue": "EN",
    "langueLabel": "Anglophone",
    "situation": "Australien, veut juste la plage et faire la fête, ne plonge pas",
    "canal": "Google Maps",
    "canalDetail": "Google Maps (« hostel near me »)",
    "device": "Mobile",
    "decision": "Quitte",
    "decisionLabel": "Repart",
    "histoire": "Il lit quiet non-party dès la home, comprend en 2 minutes que ce n'est pas pour lui et file chercher un party hostel.",
    "localisation": "Déjà à Koh Tao, cherche un lit pas cher ce soir",
    "maturite": "Décision",
    "segment": "Client hors cible",
    "contexte": "Besoin d'un lit immédiat, ambiance fête recherchée",
    "impression": "En 5 secondes il lit calme, non festif, plongée : tout l'inverse de son programme du soir.",
    "parcours": [
      [
        "Home",
        "« Quiet, non-party hostel » écrit noir sur blanc, le message est immédiat et sans ambiguïté"
      ],
      [
        "Rooms",
        "Dortoir à 500 THB, correct côté prix, mais l'ambiance annoncée ne colle pas du tout à sa soirée"
      ],
      [
        "Retour Maps",
        "Il repart chercher un party hostel côté Sairee sans avoir perdu 2 minutes"
      ]
    ],
    "questionCle": "C'est un hostel fête à côté de la plage, ou juste un truc plongée ?",
    "reponse": "Non",
    "commentReponse": "Pas un hostel fête, et le site le dit franchement dès la home, avec en plus une FAQ dédiée « hostel festif ? » : la clarté est totale.",
    "positifs": [
      "Positionnement assumé qui lui évite une erreur de réservation",
      "Prix affichés, il a l'information sans le moindre effort"
    ],
    "frictions": [],
    "ceQuiFeraitBasculer": "Rien de réaliste : il cherche l'exact inverse du positionnement assumé du lieu",
    "exp": 3,
    "conf": 7,
    "clarte": 10
  },
  {
    "id": 10,
    "code": "EN-25",
    "name": "Tanner",
    "age": 24,
    "emoji": "🍺",
    "langue": "EN",
    "langueLabel": "Anglophone",
    "situation": "Americain, groupe de 6 potes en trip post-college, cherchent un party hostel avec bar, beer pong et pub crawl",
    "canal": "Google Maps",
    "canalDetail": "Google Maps « party hostel koh tao », clic sur la fiche Buddha View",
    "device": "Mobile",
    "decision": "Quitte",
    "decisionLabel": "Repart",
    "histoire": "Cherchait un QG de fete pour 6, lit « quiet, non-party » en 5 secondes et repart : le filtre fonctionne.",
    "localisation": "Deja a Koh Tao, sur la plage de Sairee",
    "maturite": "Décision",
    "segment": "Client hors cible",
    "contexte": "Leur guesthouse actuelle est complete demain, il faut rebooker vite pour 6",
    "impression": "Propre, calme, zero photo de bar ou de soiree : il tique dans les 5 premieres secondes.",
    "parcours": [
      [
        "Home (hero)",
        "il lit « quiet, non-party hostel » des le premier ecran et comprend immediatement que ce n'est pas pour son groupe"
      ],
      [
        "Home (scroll rapide)",
        "aucune mention de bar ni de soirees, que de la plongee, du sommeil et de l'eco : la messe est dite"
      ],
      [
        "Sortie",
        "il referme l'onglet et repart chercher un party hostel du cote de Sairee"
      ]
    ],
    "questionCle": "C'est un hostel ou on peut faire la fete tous les 6 ?",
    "reponse": "Non",
    "commentReponse": "Le site le dit sans aucune ambiguite des le hero : positionnement calme et non festif volontaire, pas un oubli.",
    "positifs": [
      "Le positionnement non festif est affiche dans les 5 premieres secondes : il ne perd pas une minute",
      "Meme en scroll rapide, les prix restent visibles s'il avait voulu comparer"
    ],
    "frictions": [],
    "ceQuiFeraitBasculer": "Rien cote site : il cherche l'exact oppose de ce que l'hostel assume, le perdre vite est le resultat voulu du positionnement.",
    "exp": 7,
    "conf": 8,
    "clarte": 10
  },
  {
    "id": 11,
    "code": "EN-46",
    "name": "Isla",
    "age": 29,
    "emoji": "💳",
    "langue": "EN",
    "langueLabel": "Anglophone",
    "situation": "Écossaise, chargée de marketing, voyage cashless, paie absolument tout par carte, compare 2 hostels sur l'île, budget moyen",
    "canal": "Google Maps",
    "canalDetail": "Google Maps, comparaison des fiches de 2 hostels shortlistés",
    "device": "Mobile",
    "decision": "Quitte",
    "decisionLabel": "Repart",
    "histoire": "Cashless : elle lit les 3,5 % de frais carte, calcule le surcoût et file vers l'hostel qui encaisse sans frais.",
    "localisation": "Déjà à Koh Tao, en café à Mae Haad",
    "maturite": "Décision",
    "segment": "Client hésitant",
    "contexte": "Elle quitte son logement actuel demain matin, la décision se prend aujourd'hui",
    "impression": "Site clair, fourchettes de prix visibles ; elle cherche immédiatement deux choses : le total pour 4 nuits et les modalités de paiement.",
    "parcours": [
      [
        "Rooms",
        "fourchettes « à partir de » claires, mais le prix exact des 4 nuits demande de passer sur Cloudbeds"
      ],
      [
        "Practical info",
        "paiement cash ou carte, avec frais de 3,5 % sur carte : elle tique immédiatement"
      ],
      [
        "Calcul mental",
        "3,5 % sur 4 nuits, un surcoût par principe inacceptable pour une voyageuse 100 % cashless"
      ],
      [
        "Retour sur Maps",
        "l'autre hostel shortlisté encaisse la carte sans frais, la comparaison est pliée"
      ]
    ],
    "questionCle": "Pourquoi payer 3,5 % de plus pour utiliser ma carte ?",
    "reponse": "Non",
    "commentReponse": "Le site affiche les frais honnêtement mais ne les justifie pas et ne propose aucune alternative cashless sans surcoût.",
    "positifs": [
      "Transparence totale : les frais sont écrits noir sur blanc, aucune surprise ne l'attendait au comptoir",
      "Fourchettes de prix et politique d'annulation claires, la comparaison a été rapide et loyale"
    ],
    "frictions": [
      "Frais carte de 3,5 %, rédhibitoires pour une voyageuse qui paie absolument tout par carte",
      "Prix exact des 4 nuits seulement après passage sur Cloudbeds, une étape de plus dans une décision à prendre aujourd'hui"
    ],
    "ceQuiFeraitBasculer": "Le paiement par carte sans frais (ou frais offerts en résa directe), ou un paiement en ligne au prix affiché dès la réservation",
    "exp": 6,
    "conf": 8,
    "clarte": 9
  },
  {
    "id": 12,
    "code": "EN-83",
    "name": "Bartholomew",
    "age": 65,
    "emoji": "🗺️",
    "langue": "EN",
    "langueLabel": "Anglophone",
    "situation": "Géomètre anglais à la retraite, veuf, voyage lent en Asie depuis 6 mois, budget confortable mais habitudes simples, adore marcher",
    "canal": "Google Maps",
    "canalDetail": "Google Maps",
    "device": "Tablette",
    "decision": "Quitte",
    "decisionLabel": "Repart",
    "histoire": "Séduit par la chambre vue mer, il apprend sans détour qu'il n'y a pas de petit-déjeuner et retourne vers une guesthouse.",
    "localisation": "Hua Hin, réfléchit à sa prochaine étape dans le golfe",
    "maturite": "Découverte",
    "segment": "Client en découverte",
    "contexte": "Un couple de Néerlandais croisés à Hua Hin lui a vanté le calme de Koh Tao hors saison, il explore les fiches de Mae Haad le soir.",
    "impression": "Site soigné et très lisible sur tablette, belles chambres avec vue, ambiance jeune tournée plongée.",
    "parcours": [
      [
        "Home",
        "Esthétique agréable, il comprend l'orientation backpackers et plongeurs mais les chambres privées l'invitent à continuer"
      ],
      [
        "Rooms",
        "La Sunset Seaview Superior à 2 500 THB avec balcon et vue mer lui plaît beaucoup"
      ],
      [
        "Practical info",
        "Café offert à la réception, pas de petit-déjeuner, restos à 1 minute : l'information est nette"
      ],
      [
        "FAQ",
        "La question petit-déjeuner confirme, il referme poliment en pensant à une pension avec café en terrasse"
      ]
    ],
    "questionCle": "Où prend-on son petit-déjeuner et son café du matin ici ?",
    "reponse": "Oui",
    "commentReponse": "Réponse nette : pas de petit-déjeuner, café offert à la réception, restos à 1 minute. Le site répond clairement, mais la réponse ne correspond pas à ses habitudes.",
    "positifs": [
      "Information petit-déjeuner limpide (infos pratiques et FAQ), aucune mauvaise surprise possible",
      "Chambres privées avec vue et balcon à prix contenu, la Seaview Superior lui plaisait vraiment"
    ],
    "frictions": [
      "Pas de petit-déjeuner ni de restaurant sur place, café offert à la réception seulement : rédhibitoire pour son rituel du matin"
    ],
    "ceQuiFeraitBasculer": "Un petit-déjeuner ou au moins un vrai café servi en terrasse le matin, façon pension de famille.",
    "exp": 6,
    "conf": 8,
    "clarte": 9
  },
  {
    "id": 13,
    "code": "FR-03",
    "name": "Chloé",
    "age": 21,
    "emoji": "🌴",
    "langue": "FR",
    "langueLabel": "Francophone",
    "situation": "Premier gros voyage backpack, anxieuse sur la logistique, budget serré, jamais plongé",
    "canal": "Hostelworld / Booking",
    "canalDetail": "Booking.com (clic vers le site officiel depuis sa wishlist)",
    "device": "Mobile",
    "decision": "Convertit",
    "decisionLabel": "Réserve",
    "histoire": "Annulation comprise à 100 % et accueil en français promis : l'anxieuse de la logistique réserve sereinement.",
    "localisation": "Bruxelles, Belgique (départ dans 6 semaines)",
    "maturite": "Comparaison",
    "segment": "Client hésitant",
    "contexte": "Veut être sûre de comprendre les conditions d'annulation avant de payer",
    "impression": "Version française d'entrée, ton rassurant, elle comprend chaque mot sans effort et souffle un peu.",
    "parcours": [
      [
        "Home FR",
        "elle comprend tout sans dictionnaire, l'ambiance calme la rassure"
      ],
      [
        "Infos pratiques, bloc annulation",
        "gratuit jusqu'à 24 h avant, ensuite première nuit facturée : simple, clair, en français"
      ],
      [
        "FAQ",
        "10 questions dont l'annulation, le paiement et « jamais plongé ? », elle se sent prise par la main"
      ],
      [
        "Mention staff francophone",
        "on lui parlera français à l'arrivée, sa plus grosse peur tombe"
      ],
      [
        "Résa",
        "elle clique vers Cloudbeds pour son dortoir"
      ]
    ],
    "questionCle": "Je peux annuler gratuitement si mes plans changent ?",
    "reponse": "Oui",
    "commentReponse": "Annulation gratuite jusqu'à 24 h avant l'arrivée, écrite en français clair dans les infos pratiques et reprise en FAQ, bien plus simple que les acomptes non remboursables qu'elle redoutait.",
    "positifs": [
      "Conditions d'annulation limpides et en français (gratuit jusqu'à 24 h avant, no-show = lit libéré)",
      "Staff hostel annoncé francophone : la réassurance qu'elle cherchait pour l'arrivée"
    ],
    "frictions": [
      "Frais de 3,5 % si elle paie par carte, elle devra prévoir du liquide",
      "La fin de résa se joue sur Cloudbeds, une deuxième interface à apprivoiser"
    ],
    "ceQuiFeraitBasculer": "",
    "exp": 9,
    "conf": 8,
    "clarte": 9
  },
  {
    "id": 14,
    "code": "FR-08",
    "name": "Hugo",
    "age": 29,
    "emoji": "🤿",
    "langue": "FR",
    "langueLabel": "Francophone",
    "situation": "Déjà client du Buddha View Dive Centre, on lui a recommandé l'auberge, budget moyen, plongeur en formation",
    "canal": "Bouche-à-oreille",
    "canalDetail": "Bouche-à-oreille / cross-sell dive centre (un membre du staff du centre lui donne l'URL)",
    "device": "Mobile",
    "decision": "Convertit",
    "decisionLabel": "Réserve",
    "histoire": "Recommandé par le centre, il file de la home à Cloudbeds et bloque sa Deluxe pour la formation en cinq minutes.",
    "localisation": "Strasbourg, France (formation prévue le trimestre prochain)",
    "maturite": "Décision",
    "segment": "Client recommandé",
    "contexte": "Recommandation directe, confiance préétablie",
    "impression": "Il reconnaît l'univers Buddha View, site net, bouton de résa visible. Il est là pour aller vite et ça tombe bien.",
    "parcours": [
      [
        "Home",
        "la filiation avec le dive centre (25+ ans, 100 000 plongeurs) est affichée partout, il est au bon endroit"
      ],
      [
        "Chambres",
        "Mountain View Deluxe 2 300 THB, salle de bain, balcon, exactement le confort voulu pour sa formation"
      ],
      [
        "Bouton résa Cloudbeds",
        "lien direct vers le calendrier de sa chambre, il pose ses dates"
      ],
      [
        "Infos pratiques en diagonale",
        "transfert gratuit vers Tanote Bay depuis la porte, parfait avec les journées de formation"
      ]
    ],
    "questionCle": "Je réserve une privée pour la durée de ma formation, c'est rapide ?",
    "reponse": "Oui",
    "commentReponse": "Chaque chambre a son lien de résa direct vers Cloudbeds : il choisit la Deluxe et bloque ses dates en quelques minutes.",
    "positifs": [
      "Lien de résa profond par chambre : parcours ultra court pour quelqu'un de décidé",
      "Transfert gratuit vers le centre depuis la porte du hostel, le détail qui valide la logistique"
    ],
    "frictions": [
      "Le prix exact par date n'apparaît qu'une fois sur Cloudbeds, le site n'affiche que le « à partir de »"
    ],
    "ceQuiFeraitBasculer": "",
    "exp": 9,
    "conf": 9,
    "clarte": 9
  },
  {
    "id": 15,
    "code": "FR-29",
    "name": "Yanis",
    "age": 26,
    "emoji": "👨‍💻",
    "langue": "FR",
    "langueLabel": "Francophone",
    "situation": "Développeur freelance, part 6 semaines, veut télétravailler le matin et passer son Open Water, budget moyen",
    "canal": "Assistant IA",
    "canalDetail": "IA (ChatGPT, \"hostel calme à Koh Tao pour télétravailler et apprendre à plonger, staff francophone si possible\")",
    "device": "Desktop",
    "decision": "Convertit",
    "decisionLabel": "Réserve",
    "histoire": "Tout coche pour télétravail et Open Water, seul l'horaire des cours manque : il réserve et pose la question au passage.",
    "localisation": "Marseille, France",
    "maturite": "Décision",
    "segment": "Client idéal",
    "contexte": "ChatGPT lui sort Buddha View en premier choix, il vérifie tout point par point avant de réserver",
    "impression": "Home alignée avec la reco de ChatGPT : calme, plongée sérieuse, wifi mis en avant, il passe en mode checklist.",
    "parcours": [
      [
        "Home",
        "calme, non festif, adossé à un centre PADI, la reco de l'IA se confirme"
      ],
      [
        "Infos pratiques, wifi",
        "wifi dans chaque chambre et coins calmes pour les visios, coche"
      ],
      [
        "Page Open Water",
        "9 500 THB, 3 jours, instructeurs francophones, max 4 par instructeur, coche"
      ],
      [
        "Book-diving",
        "aucun horaire de cours affiché, il pose la question télétravail matin directement dans le formulaire"
      ],
      [
        "Rooms puis Cloudbeds",
        "il réserve son lit dans la foulée pour caler ses 6 semaines"
      ]
    ],
    "questionCle": "Je peux bosser le matin en visio et plonger l'après-midi sans galérer ?",
    "reponse": "Partiellement",
    "commentReponse": "Wifi, calme, formation sérieuse et instructeurs francophones sont confirmés, mais les horaires des cours ne sont pas détaillés : impossible de valider la compatibilité avec ses visios sans demander.",
    "positifs": [
      "Wifi dans toutes les chambres plus espaces de travail calmes, et calme nocturne assumé",
      "Instructeurs francophones, max 4 élèves par instructeur, prix Open Water affiché"
    ],
    "frictions": [
      "Les horaires des formations ne sont pas indiqués, point bloquant pour caler ses visios",
      "Pas de tarif dégressif affiché pour 6 semaines, il devra négocier par message"
    ],
    "ceQuiFeraitBasculer": "",
    "exp": 9,
    "conf": 9,
    "clarte": 8
  },
  {
    "id": 16,
    "code": "FR-09",
    "name": "Camille",
    "age": 23,
    "emoji": "📱",
    "langue": "FR",
    "langueLabel": "Francophone",
    "situation": "Solo traveler prudente, cherche un hostel sûr et bien situé, budget moyen, curieuse de plongée",
    "canal": "Google Maps",
    "canalDetail": "Google Maps (cherche \"hostel Mae Haad pier Koh Tao\", regarde la fiche puis clique le site)",
    "device": "Mobile",
    "decision": "Convertit",
    "decisionLabel": "Réserve",
    "histoire": "Pier à 300 m, dortoir femmes et CCTV : la voyageuse solo trouve toutes ses réassurances et réserve.",
    "localisation": "Montréal, Québec (arrive dans 2 semaines)",
    "maturite": "Comparaison",
    "segment": "Client idéal",
    "contexte": "Veut un endroit proche du ferry, sûr pour une femme seule",
    "impression": "Localisation annoncée dès le premier écran, 300 m à plat du pier, et de vrais signaux sécurité dès qu'elle scrolle.",
    "parcours": [
      [
        "Home",
        "300 m à plat de l'embarcadère de Mae Haad, encore mieux que les 5 minutes espérées"
      ],
      [
        "Directions + carte",
        "itinéraire détaillé et carte Google Maps cliquable, elle visualise l'arrivée du ferry au lit"
      ],
      [
        "Dortoir femmes",
        "4 lits, salle de bain privative, balcon, 650 THB, l'option qu'elle voulait"
      ],
      [
        "Équipements et règles",
        "casiers, CCTV 24/7, clients enregistrés uniquement : des règles strictes qui, pour elle, rassurent"
      ],
      [
        "Résa",
        "elle part sur Cloudbeds réserver le dortoir femmes"
      ]
    ],
    "questionCle": "C'est vraiment à 5 min du ferry et sûr pour une fille seule ?",
    "reponse": "Oui",
    "commentReponse": "Le site répond aux deux volets : 300 m à plat du pier avec itinéraire détaillé, et dortoir femmes + casiers + CCTV + accès réservé aux clients enregistrés côté sécurité.",
    "positifs": [
      "Directions précises et carte cliquable, l'arrivée en solo se visualise sans stress",
      "Dortoir femmes avec salle de bain privative + casiers + CCTV : des signaux sécurité concrets, pas des slogans"
    ],
    "frictions": [
      "Pas de note agrégée sur le site, elle repasse par la fiche Maps pour valider la réputation"
    ],
    "ceQuiFeraitBasculer": "",
    "exp": 9,
    "conf": 8,
    "clarte": 9
  },
  {
    "id": 17,
    "code": "FR-10",
    "name": "Thomas",
    "age": 28,
    "emoji": "🤖",
    "langue": "FR",
    "langueLabel": "Francophone",
    "situation": "Planifie son trip avec ChatGPT, veut une recommandation argumentée, budget moyen, curieux de plongée",
    "canal": "Assistant IA",
    "canalDetail": "IA (ChatGPT en français, \"meilleur hostel pour plongeurs à Koh Tao\")",
    "device": "Desktop",
    "decision": "Hesite",
    "decisionLabel": "Hésite",
    "histoire": "La reco IA se vérifie point par point, mais fidèle à sa méthode il sort recouper les avis avant de réserver.",
    "localisation": "Bordeaux, France (planifie à 3 mois)",
    "maturite": "Découverte",
    "segment": "Client en découverte",
    "contexte": "Veut vérifier la reco IA sur le site officiel",
    "impression": "Le site colle mot pour mot à la reco de ChatGPT : éco, adossé à un gros centre PADI, offre piscine gratuite bien mise en avant.",
    "parcours": [
      [
        "Home",
        "il retrouve les arguments de l'IA : hostel éco, calme, adossé au Buddha View Dive Centre"
      ],
      [
        "Section éco",
        "solaire et récupération d'eau de pluie : du concret, pas du greenwashing vague"
      ],
      [
        "Pages plongée",
        "25+ ans, 100 000 plongeurs certifiés, max 4 par instructeur : le sérieux annoncé se vérifie"
      ],
      [
        "Chambres et prix",
        "fourchettes affichées, il note les ordres de grandeur pour son comparatif"
      ],
      [
        "Recherche de preuves tierces",
        "pas de note ni de lien d'avis externes : il sort vérifier par lui-même, comme toujours"
      ]
    ],
    "questionCle": "Le site confirme-t-il ce que l'IA m'a dit (éco + plongée sérieuse) ?",
    "reponse": "Oui",
    "commentReponse": "Le site confirme point par point la reco IA : démarche éco concrète (solaire, eau de pluie) et crédentiels plongée solides (PADI 5 étoiles, 25+ ans, max 4 par instructeur).",
    "positifs": [
      "Cohérence totale entre la reco IA et le site : éco détaillé, chiffres du centre, prix affichés",
      "Offre try-scuba gratuite claire avec parcours en 3 étapes, facile à retenir pour son plan de voyage"
    ],
    "frictions": [
      "Aucun lien vers des avis tiers ni note agrégée : la vérification croisée qu'il exige doit se faire hors site",
      "La dispo réelle à 3 mois demande de passer sur Cloudbeds"
    ],
    "ceQuiFeraitBasculer": "Des avis externes sourcés directement sur le site (note + lien) ; par tempérament il ne réserve jamais à la première visite, il reviendra après recoupement.",
    "exp": 8,
    "conf": 7,
    "clarte": 9
  },
  {
    "id": 18,
    "code": "FR-34",
    "name": "Rémi",
    "age": 41,
    "emoji": "🌊",
    "langue": "FR",
    "langueLabel": "Francophone",
    "situation": "Cadre IT en année sabbatique, plongeur confirmé (150+ plongées), cherche une base d'un mois, budget confortable",
    "canal": "Bouche-à-oreille",
    "canalDetail": "Bouche-à-oreille",
    "device": "Desktop",
    "decision": "Hesite",
    "decisionLabel": "Hésite",
    "histoire": "Convaincu par le sérieux du centre mais incapable de chiffrer son mois, il envoie un mail et compare les dive resorts.",
    "localisation": "Lyon, France (déjà en Asie)",
    "maturite": "Décision",
    "segment": "Client adjacent",
    "contexte": "Un binôme de plongée rencontré aux Philippines lui a cité le groupe Buddha View ; il arrive à Koh Tao dans 10 jours et veut poser son sac un mois pour replonger sérieusement.",
    "impression": "Site propre et sérieux, adossé à un centre de 25 ans d'âge : crédible, mais visiblement orienté débutants au premier coup d'œil.",
    "parcours": [
      [
        "Home",
        "Le groupe Buddha View confirmé, PADI 5 étoiles, 100 000 plongeurs certifiés, la reco de son binôme se tient"
      ],
      [
        "Chambres privées",
        "Deluxe à 2 300 THB la nuit, sur 30 nuits ça chiffre, il lui faut un dégressif"
      ],
      [
        "Infos pratiques",
        "Séjours longs : pas de tarif, juste « écrivez-nous », il soupire"
      ],
      [
        "Pages plongée",
        "Try-dive, Open Water, Advanced : rien d'affiché pour un plongeur à 150 plongées"
      ],
      [
        "Contact",
        "Il rédige un mail pour négocier un mensuel et un pack de plongées, et compare les dive resorts en attendant"
      ]
    ],
    "questionCle": "Ça me coûte combien de vivre ici un mois en plongeant 3 fois par semaine ?",
    "reponse": "Partiellement",
    "commentReponse": "Il peut chiffrer la nuitée (prix affichés), mais ni le tarif mensuel ni le prix des plongées loisir pour certifiés : impossible de calculer son mois sans échange mail.",
    "positifs": [
      "Sérieux du centre vérifiable dans le contenu (25 ans, PADI 5 étoiles, max 4 plongeurs par instructeur)",
      "Transfert gratuit vers les sites depuis la porte et positionnement calme, parfait pour une base d'un mois"
    ],
    "frictions": [
      "Pas de tarif long séjour affiché, juste une invitation à écrire",
      "Pas de prix pour les plongées loisir des certifiés, l'offre affichée s'arrête à l'Advanced",
      "Résa plongée par formulaire avec attente de confirmation, pas de dispo temps réel"
    ],
    "ceQuiFeraitBasculer": "Un tarif mensuel affiché et un pack fun dives chiffré, ou une réponse mail rapide et bien placée avant qu'un dive resort ne le capte.",
    "exp": 6,
    "conf": 8,
    "clarte": 7
  },
  {
    "id": 19,
    "code": "FR-19",
    "name": "Océane",
    "age": 24,
    "emoji": "🌍",
    "langue": "FR",
    "langueLabel": "Francophone",
    "situation": "Voyageuse au long cours, lit l'anglais mais préfère le confort du français, budget serré, curieuse de plongée",
    "canal": "Réseaux sociaux",
    "canalDetail": "Réseaux sociaux (TikTok backpacking Koh Tao, lien en bio)",
    "device": "Mobile",
    "decision": "Hesite",
    "decisionLabel": "Hésite",
    "histoire": "En survol TikTok, elle capte le concept en 20 secondes et met l'adresse en haut de shortlist sans réserver encore.",
    "localisation": "Trois-Rivières, Québec (en Asie depuis 4 mois)",
    "maturite": "Découverte",
    "segment": "Client en découverte",
    "contexte": "En mode survol, alimente sa shortlist, ne réserve jamais longtemps à l'avance, itinéraire souple.",
    "impression": "Le message passe vite : calme, éco, essai plongée gratuit en piscine. Elle capte le concept en 20 secondes.",
    "parcours": [
      [
        "Home /fr/",
        "Elle bascule en français et survole : éco, calme, try-scuba gratuit, concept saisi immédiatement"
      ],
      [
        "Photos chambres",
        "Capsules et balcons vue sunset, la vibe lui plaît"
      ],
      [
        "Page chambres",
        "Dortoirs dès 500 THB, un peu au-dessus de son budget serré"
      ],
      [
        "Offre try-scuba",
        "Gratuite pour les clients du hostel : c'est LE truc qui différencie cette adresse des 50 autres vues cette semaine"
      ]
    ],
    "questionCle": "Ça vaut le coup que je creuse cette adresse ?",
    "reponse": "Oui",
    "commentReponse": "L'essai plongée gratuit, le calme et les prix affichés la classent en haut de sa shortlist, mais elle ne réserve jamais si loin de son passage.",
    "positifs": [
      "Différenciateur limpide : try-scuba piscine gratuit pour qui dort là",
      "L'essentiel (prix, vibe, éco) se capte en un seul survol mobile"
    ],
    "frictions": [
      "Prix dortoir au-dessus des adresses les moins chères de l'île pour son budget serré (un témoignage du site l'assume d'ailleurs)"
    ],
    "ceQuiFeraitBasculer": "Être à quelques jours de son passage à Koh Tao avec une dispo confirmée à ses dates.",
    "exp": 8,
    "conf": 7,
    "clarte": 9
  },
  {
    "id": 20,
    "code": "FR-04",
    "name": "Antoine",
    "age": 27,
    "emoji": "💻",
    "langue": "FR",
    "langueLabel": "Francophone",
    "situation": "Nomade digital, reste 2-3 semaines, a besoin de wifi fiable pour bosser, budget moyen, curieux de plongée",
    "canal": "Hostelworld / Booking",
    "canalDetail": "Agoda (clic vers le site officiel)",
    "device": "Desktop",
    "decision": "Hesite",
    "decisionLabel": "Hésite",
    "histoire": "Wifi et calme confirmés mais aucun prix long séjour : il garde l'onglet ouvert et compare avec des colivings.",
    "localisation": "Genève, Suisse (départ flexible)",
    "maturite": "Comparaison",
    "segment": "Client adjacent",
    "contexte": "Besoin de bosser depuis l'auberge",
    "impression": "Site propre et structuré, wifi et espaces de travail mentionnés dès la home, positionnement calme. Bon signe pour bosser.",
    "parcours": [
      [
        "Home",
        "hostel calme non festif avec wifi dans toutes les chambres, le cadre colle à son besoin"
      ],
      [
        "Infos pratiques",
        "wifi gratuit partout + coins calmes pour travailler, confirmés noir sur blanc"
      ],
      [
        "Chambres",
        "privée Deluxe 2 300 THB la nuit, viable quelques nuits mais pas 3 semaines à ce tarif"
      ],
      [
        "Recherche tarif long séjour",
        "rien : « écrivez-nous » pour les séjours longs, aucun chiffre"
      ],
      [
        "Page contact",
        "il hésite à envoyer un mail, garde l'onglet ouvert et retourne comparer"
      ]
    ],
    "questionCle": "Le wifi est-il assez bon pour télétravailler, et y a-t-il un vrai tarif long séjour ?",
    "reponse": "Partiellement",
    "commentReponse": "Le wifi et les espaces de travail sont confirmés explicitement, mais aucun tarif long séjour n'est affiché : il faut écrire et attendre.",
    "positifs": [
      "Wifi dans toutes les chambres + espaces calmes pour travailler, écrits noir sur blanc jusque dans la FAQ",
      "Positionnement calme et non festif, idéal pour des semaines de télétravail"
    ],
    "frictions": [
      "Aucun tarif dégressif semaine ou mois affiché, juste un « écrivez-nous »",
      "Pas de petit-déjeuner inclus, un détail qui pèse sur 3 semaines de routine matinale"
    ],
    "ceQuiFeraitBasculer": "Un tarif long séjour chiffré sur le site, ou une réponse rapide et précise à son mail avec un prix au mois.",
    "exp": 7,
    "conf": 8,
    "clarte": 8
  },
  {
    "id": 21,
    "code": "FR-27",
    "name": "Dylan",
    "age": 21,
    "emoji": "🎉",
    "langue": "FR",
    "langueLabel": "Francophone",
    "situation": "Étudiant, prépare la Full Moon Party à Koh Phangan avec sa bande, budget serré, la plongée ne l'intéresse pas",
    "canal": "Réseaux sociaux",
    "canalDetail": "Réseaux sociaux (TikTok \"Koh Tao nightlife hostel\", lien en bio d'un créateur)",
    "device": "Mobile",
    "decision": "Quitte",
    "decisionLabel": "Repart",
    "histoire": "Il lit quiet non-party en 10 secondes, vérifie les photos et repart chercher un party hostel, sans regret.",
    "localisation": "Toulon, France",
    "maturite": "Découverte",
    "segment": "Client hors cible",
    "contexte": "Sa bande lui a délégué la recherche du prochain spot de fête",
    "impression": "Il lit \"quiet, non-party\" avant même de scroller : pour lui c'est un panneau sens interdit.",
    "parcours": [
      [
        "Home",
        "le positionnement calme et non festif est annoncé d'entrée, mauvais signe pour sa bande"
      ],
      [
        "Photos",
        "espaces propres et calmes, pas un bar ni une soirée en vue"
      ],
      [
        "FAQ \"c'est festif ?\"",
        "la réponse assume le calme noir sur blanc, message reçu, il referme"
      ]
    ],
    "questionCle": "C'est un hostel où on peut faire la fête ou pas ?",
    "reponse": "Oui",
    "commentReponse": "Le site répond clairement, et la réponse est non : hostel calme et non festif, assumé de la home jusqu'à la FAQ. Il n'a pas perdu de temps, c'est un succès de clarté.",
    "positifs": [
      "Le positionnement calme est annoncé dès la home, il ne perd pas dix minutes à chercher",
      "La FAQ assume noir sur blanc que ce n'est pas un hostel festif"
    ],
    "frictions": [],
    "ceQuiFeraitBasculer": "Rien en l'état : il faudrait un bar et des soirées, à l'opposé du positionnement assumé du lieu",
    "exp": 4,
    "conf": 7,
    "clarte": 10
  },
  {
    "id": 22,
    "code": "FR-06",
    "name": "Kevin",
    "age": 22,
    "emoji": "🍺",
    "langue": "FR",
    "langueLabel": "Francophone",
    "situation": "Voyage entre potes, cherche du fun et du pas cher, budget serré, la plongée l'indiffère",
    "canal": "Réseaux sociaux",
    "canalDetail": "Réseaux sociaux (story Instagram d'un pote tagué au Buddha View, lien en bio)",
    "device": "Mobile",
    "decision": "Quitte",
    "decisionLabel": "Repart",
    "histoire": "Venu chercher la fête, il lit « calme, non festif » en une minute et repart : rebond propre, clarté maximale.",
    "localisation": "Lille, France (à Bangkok, décide au jour le jour)",
    "maturite": "Découverte",
    "segment": "Client hors cible",
    "contexte": "\"On dort où à Koh Tao ?\"",
    "impression": "Belles photos mais tout de suite un ton posé, propre, zen. Il flaire que ce n'est pas un hostel à soirées.",
    "parcours": [
      [
        "Home",
        "il scanne les photos : piscine du centre, dortoirs nickel, zéro photo de bar ou de soirée"
      ],
      [
        "Home, positionnement",
        "« calme, non festif » écrit noir sur blanc, le message est sans ambiguïté"
      ],
      [
        "FAQ « c'est festif ? »",
        "confirmation directe : hostel calme pensé pour dormir avant de plonger, il a sa réponse"
      ]
    ],
    "questionCle": "Ça met l'ambiance ou c'est calme ?",
    "reponse": "Oui",
    "commentReponse": "Le site assume son positionnement calme et non festif dès la home et le confirme en FAQ : Kevin sait en moins d'une minute que ce n'est pas pour lui.",
    "positifs": [
      "Positionnement annoncé sans détour, il ne perd pas de temps ni d'argent sur une mauvaise pioche",
      "Prix visibles au passage, il peut comparer vite"
    ],
    "frictions": [
      "Aucun bar ni espace festif, des règles maison strictes : rédhibitoire pour son profil (mais assumé et voulu par le hostel)"
    ],
    "ceQuiFeraitBasculer": "Rien de réaliste sur ce site : il cherche un party hostel, l'exact opposé du positionnement assumé.",
    "exp": 4,
    "conf": 7,
    "clarte": 9
  },
  {
    "id": 23,
    "code": "FR-13",
    "name": "Émilie",
    "age": 22,
    "emoji": "💸",
    "langue": "FR",
    "langueLabel": "Francophone",
    "situation": "Très petit budget, chasse le lit le moins cher de l'île, jamais plongé",
    "canal": "Hostelworld / Booking",
    "canalDetail": "Hostelworld (tri par prix croissant, clique vers le site officiel)",
    "device": "Mobile",
    "decision": "Quitte",
    "decisionLabel": "Repart",
    "histoire": "Le prix s'affiche en 10 secondes mais 500 THB plus 3,5% de frais dépasse son budget, elle repart sans hésiter.",
    "localisation": "Grenoble, France (déjà en Thaïlande, réserve à 2 jours)",
    "maturite": "Décision",
    "segment": "Client adjacent",
    "contexte": "Déjà en Thaïlande, réserve à 2 jours, veut juste le prix le plus bas, point.",
    "impression": "Site propre et soigné, mais elle scanne uniquement les prix : le \"à partir de 500 THB\" apparaît vite, au moins c'est affiché.",
    "parcours": [
      [
        "Home /fr/",
        "Elle zappe l'histoire éco et file vers les chambres"
      ],
      [
        "Page chambres",
        "Dortoir à partir de 500 THB, vu en 10 secondes, transparence appréciée"
      ],
      [
        "Infos pratiques",
        "Frais carte 3,5%, pas de petit-déj inclus : le coût total grimpe encore"
      ],
      [
        "Comparaison mentale",
        "Des lits à 250-300 THB existent ailleurs sur l'île, l'écart est trop grand pour elle"
      ]
    ],
    "questionCle": "C'est combien le lit le moins cher, tout de suite ?",
    "reponse": "Oui",
    "commentReponse": "500 THB affiché immédiatement, la transparence fonctionne parfaitement, mais la réponse la fait sortir : c'est au-dessus de son plancher.",
    "positifs": [
      "Prix visible sans aucun effort, zéro chasse au tarif",
      "Try-scuba piscine gratuit pour les clients, un vrai plus qu'elle note quand même"
    ],
    "frictions": [
      "Prix dortoir au-dessus des adresses les moins chères de l'île pour un profil 100% prix",
      "Frais carte 3,5% qui alourdissent le coût total",
      "Pas de petit-déjeuner inclus (café offert seulement)"
    ],
    "ceQuiFeraitBasculer": "Un lit autour de 300 THB ou une offre basse saison : son critère est uniquement le prix plancher.",
    "exp": 6,
    "conf": 7,
    "clarte": 9
  },
  {
    "id": 24,
    "code": "FR-38",
    "name": "Théo",
    "age": 18,
    "emoji": "🎒",
    "langue": "FR",
    "langueLabel": "Francophone",
    "situation": "Tout juste bachelier, premier voyage seul financé par ses jobs d'été, budget très serré (30 euros par jour tout compris), jamais plongé",
    "canal": "Google Search",
    "canalDetail": "Google Search",
    "device": "Mobile",
    "decision": "Quitte",
    "decisionLabel": "Repart",
    "histoire": "Chasseur de prix plancher, il voit 500 THB en dix secondes, salue la clarté et file vers les dortoirs à 300 THB.",
    "localisation": "Limoges, France",
    "maturite": "Comparaison",
    "segment": "Client adjacent",
    "contexte": "Il part dans 2 semaines, cherche le lit le moins cher de l'île et ouvre plusieurs résultats Google dont le site officiel.",
    "impression": "Site en français, prix visibles direct : dortoir dès 500 THB. Verdict immédiat pour son budget : c'est au-dessus de sa cible.",
    "parcours": [
      [
        "Home FR",
        "Propre, clair, essai plongée gratuit, tentant, mais il est là pour le prix plancher"
      ],
      [
        "Chambres",
        "500 THB le lit le moins cher, il vise les dortoirs à 250-300 THB repérés ailleurs"
      ],
      [
        "Infos pratiques",
        "Frais carte 3,5%, pas de petit-déjeuner : chaque baht compte, il fait le calcul"
      ],
      [
        "Retour Google",
        "L'essai gratuit le fait hésiter deux secondes, mais son plafond quotidien tranche"
      ]
    ],
    "questionCle": "C'est le lit le moins cher que je peux trouver sur l'île ?",
    "reponse": "Oui",
    "commentReponse": "Le site répond en 10 secondes (500 THB affiché d'emblée, en français) : réponse limpide, même si elle ne lui convient pas.",
    "positifs": [
      "Prix affichés dès la page chambres, en français, zéro effort pour son anglais faible",
      "Essai piscine gratuit honnêtement expliqué, il note la vraie valeur de l'offre"
    ],
    "frictions": [
      "Dortoir à 500 THB au-dessus des prix planchers de l'île qu'il vise",
      "Frais carte de 3,5% (le cash évite les frais, mais il compte tout)",
      "Pas de petit-déjeuner inclus, un poste de plus dans son budget"
    ],
    "ceQuiFeraitBasculer": "Un lit autour de 300 THB ou une offre petits budgets ; sinon, de la marge en fin de voyage pour s'offrir la nuit qui donne droit à l'essai plongée gratuit.",
    "exp": 7,
    "conf": 7,
    "clarte": 9
  },
  {
    "id": 25,
    "code": "ES-40",
    "name": "Renata",
    "age": 29,
    "emoji": "🦷",
    "langue": "ES",
    "langueLabel": "Hispanophone",
    "situation": "Dentiste de Querétaro (Mexique), 15 jours de vacances, budget confortable, anglais correct",
    "canal": "Bouche-à-oreille",
    "canalDetail": "Bouche-à-oreille (sa cousine lui a envoyé le lien par WhatsApp avec ses photos)",
    "device": "Mobile",
    "decision": "Convertit",
    "decisionLabel": "Réserve",
    "histoire": "Validée d'avance par sa cousine : FAQ gratuité, dortoir femmes à 650 THB, elle cale 2 lits sur Cloudbeds et réserve.",
    "localisation": "À Querétaro, départ dans 5 semaines avec une amie",
    "maturite": "Décision",
    "segment": "Client recommandé",
    "contexte": "Sa cousine a adoré la séance piscine gratuite et le calme, Renata veut la même expérience",
    "impression": "Lien WhatsApp de la cousine, elle reconnaît le hostel des photos reçues. La confiance est déjà acquise, elle vient vérifier prix et dortoir femmes.",
    "parcours": [
      [
        "Home /es/",
        "elle reconnaît l'endroit des photos de sa cousine, l'offre piscine gratuite est bien là"
      ],
      [
        "Rooms",
        "dortoir femmes 650 THB avec salle de bain privative, parfait pour deux amies"
      ],
      [
        "FAQ gratuité",
        "la piscine est gratuite pour chaque client du hostel, donc pour les deux"
      ],
      [
        "Cloudbeds",
        "elle vérifie 2 lits à leurs dates et réserve"
      ]
    ],
    "questionCle": "On peut être toutes les deux dans le même dortoir femmes et faire la piscine ensemble ?",
    "reponse": "Partiellement",
    "commentReponse": "La gratuité par client couvre les deux amies (FAQ), le même dortoir se vérifie sur Cloudbeds (4 lits), mais la séance piscine à deux n'est pas explicitement traitée.",
    "positifs": [
      "La FAQ verrouille la gratuité de la piscine, l'argument de la cousine tient, aucune dissonance",
      "Réservation directe simple avec lien Cloudbeds par chambre, et WhatsApp affiché pour coordonner le reste"
    ],
    "frictions": [
      "Frais carte 3,5%, détail agaçant pour un paiement à distance depuis le Mexique",
      "La dispo de 2 lits dans le même dortoir ne se vérifie que sur Cloudbeds"
    ],
    "ceQuiFeraitBasculer": "",
    "exp": 9,
    "conf": 9,
    "clarte": 9
  },
  {
    "id": 26,
    "code": "ES-16",
    "name": "Florencia",
    "age": 28,
    "emoji": "🐢",
    "langue": "ES",
    "langueLabel": "Hispanophone",
    "situation": "Biologiste marine junior de Montevideo, congé sabbatique de 3 mois, budget moyen géré serré, anglais professionnel",
    "canal": "Hostelworld / Booking",
    "canalDetail": "Booking",
    "device": "Desktop",
    "decision": "Convertit",
    "decisionLabel": "Réserve",
    "histoire": "Elle vérifie l'éco et le PADI 5-Star, compare l'annulation avec Booking et réserve en direct, dortoir plus Open Water.",
    "localisation": "À Singapour, arrive en Thaïlande la semaine prochaine",
    "maturite": "Décision",
    "segment": "Client idéal",
    "contexte": "Elle veut valider son Open Water pour son futur poste en conservation marine et finalise ses 10 jours à Koh Tao",
    "impression": "Site sobre et sérieux, la démarche éco est annoncée dès la home. Son réflexe de scientifique : vérifier si c'est du concret ou du slogan.",
    "parcours": [
      [
        "About",
        "Solaire et récupération d'eau de pluie, 25 ans du dive centre, 100 000 plongeurs certifiés : des faits, pas des slogans"
      ],
      [
        "Diving puis Open Water",
        "PADI 5-Star IDC, max 4 élèves par instructeur, à partir de 9 500 THB : cohérent avec son projet pro"
      ],
      [
        "Infos pratiques",
        "Annulation gratuite jusqu'à 24 h, plus simple que les conditions de sa fiche Booking"
      ],
      [
        "Rooms",
        "Dortoir femmes à 650 THB avec salle de bain privative"
      ],
      [
        "Cloudbeds plus book-diving",
        "Elle réserve en direct et envoie sa demande Open Water"
      ]
    ],
    "questionCle": "La démarche éco est réelle ou c'est du greenwashing pour backpackers ?",
    "reponse": "Partiellement",
    "commentReponse": "Solaire et eau de pluie sont des engagements concrets et vérifiables sur place, mais il n'y a ni chiffres ni certification pour une scientifique exigeante.",
    "positifs": [
      "Conditions d'annulation en direct claires (24 h) qui gagnent sa comparaison avec Booking",
      "Crédibilité plongée étayée : 25 ans, PADI 5-Star, ratio 4 élèves max par instructeur"
    ],
    "frictions": [
      "Démarche éco sans données chiffrées ni label",
      "Témoignages maison sans note agrégée : elle a gardé Booking ouvert pour recouper les avis"
    ],
    "ceQuiFeraitBasculer": "",
    "exp": 9,
    "conf": 8,
    "clarte": 9
  },
  {
    "id": 27,
    "code": "ES-38",
    "name": "Antonia",
    "age": 21,
    "emoji": "🦋",
    "langue": "ES",
    "langueLabel": "Hispanophone",
    "situation": "Étudiante de Concepción (Chili), voyage sac à dos de 2 mois avec un budget d'étudiante économe, anglais moyen",
    "canal": "Assistant IA",
    "canalDetail": "Claude (« es seguro koh tao para una chica que viaja sola ? donde alojarse »)",
    "device": "Mobile",
    "decision": "Convertit",
    "decisionLabel": "Réserve",
    "histoire": "Venue rassurer sa mère : dortoir femmes, CCTV et 300 m du ferry, elle envoie le lien sur WhatsApp et réserve 3 nuits.",
    "localisation": "À Bangkok depuis 3 jours, construit la suite de son itinéraire",
    "maturite": "Découverte",
    "segment": "Client en découverte",
    "contexte": "Sa mère l'appelle tous les jours, elle veut pouvoir la rassurer avec du concret",
    "impression": "Version espagnole native, elle comprend chaque mot sans effort. Calme non festif et dortoir femmes cochent d'entrée.",
    "parcours": [
      [
        "Home /es/",
        "hostel calme non festif, tout en espagnol, elle souffle : pour une fois elle comprend tout"
      ],
      [
        "Rooms",
        "dortoir femmes 650 THB avec salle de bain privative et balcon, son format exact"
      ],
      [
        "Infos pratiques",
        "CCTV 24/7, casiers, clients enregistrés uniquement, 300 m à plat du ferry : des arguments concrets pour sa mère"
      ],
      [
        "FAQ",
        "dortoir femmes, langues, réponses simples, elle envoie le lien à sa mère sur WhatsApp"
      ],
      [
        "Cloudbeds",
        "elle réserve 3 nuits"
      ]
    ],
    "questionCle": "C'est rassurant pour une fille qui voyage seule et qui arrive de nuit ?",
    "reponse": "Oui",
    "commentReponse": "Dortoir femmes, CCTV 24/7, clients enregistrés uniquement, emplacement central à 300 m à plat du ferry avec directions détaillées : le faisceau est concret et vérifiable.",
    "positifs": [
      "Version espagnole native qui supprime la barrière de la langue pour tout comprendre avant de payer",
      "Faisceau sécurité concret et partageable (dortoir femmes, CCTV, clients enregistrés, 300 m du port)"
    ],
    "frictions": [
      "650 THB, au-dessus de son budget d'étudiante économe, elle arbitre en faveur de la sécurité",
      "Staff hostel anglais/français au comptoir, sur place il faudra repasser à l'anglais"
    ],
    "ceQuiFeraitBasculer": "",
    "exp": 9,
    "conf": 8,
    "clarte": 9
  },
  {
    "id": 28,
    "code": "ES-35",
    "name": "Hugo",
    "age": 28,
    "emoji": "⛷️",
    "langue": "ES",
    "langueLabel": "Hispanophone",
    "situation": "Moniteur de ski de Santander en intersaison, 6 semaines libres, budget moyen, sportif jamais plongé, anglais correct",
    "canal": "Google Maps",
    "canalDetail": "Google Maps (recherche « hostel » autour de sa position à Mae Haad, fiche à 300 m du port)",
    "device": "Mobile",
    "decision": "Convertit",
    "decisionLabel": "Réserve",
    "histoire": "Deux nuits blanches : il lit « quiet, non-party », vérifie un lit ce soir sur Cloudbeds et déménage dans l'heure.",
    "localisation": "À Koh Tao même, arrivé hier dans un autre hostel bruyant, cherche à changer",
    "maturite": "Décision",
    "segment": "Client idéal",
    "contexte": "Deux nuits sans dormir à cause de la musique de son hostel actuel, il veut déménager aujourd'hui",
    "impression": "« Quiet, non-party » en premier écran, le contre-pied exact de ce qu'il fuit. À 300 m du port, il visualise tout de suite où c'est.",
    "parcours": [
      [
        "Fiche Maps puis Home",
        "« quiet, non-party » dès le premier écran, exactement l'inverse de ses deux nuits blanches"
      ],
      [
        "Rooms",
        "Ground Floor Mixed Dorm 500 THB avec AC et rideau d'intimité, il lui faut juste un lit ce soir"
      ],
      [
        "Cloudbeds",
        "le calendrier affiche un lit dispo ce soir avec le prix exact"
      ],
      [
        "Retour Home",
        "la séance piscine try-scuba gratuite est un bonus inespéré, il la demandera à la réception"
      ],
      [
        "Réservation",
        "il réserve depuis la rue et arrive avec son sac dans l'heure"
      ]
    ],
    "questionCle": "Vous avez un lit libre ce soir, et je peux vraiment essayer la plongée gratis ?",
    "reponse": "Partiellement",
    "commentReponse": "La gratuité piscine est verrouillée sur le site (home + FAQ), la dispo du soir demande un clic vers Cloudbeds, qui la lui donne immédiatement.",
    "positifs": [
      "Promesse de calme assumée et répétée, exactement ce qu'il est venu chercher",
      "Lien Cloudbeds par chambre : dispo du soir vérifiée et réservée en deux minutes depuis la rue"
    ],
    "frictions": [
      "La dispo en temps réel n'est visible qu'après le saut vers Cloudbeds, le site n'affiche que les fourchettes"
    ],
    "ceQuiFeraitBasculer": "",
    "exp": 9,
    "conf": 8,
    "clarte": 9
  },
  {
    "id": 29,
    "code": "ES-09",
    "name": "Paula",
    "age": 21,
    "emoji": "🎓",
    "langue": "ES",
    "langueLabel": "Hispanophone",
    "situation": "Étudiante de Saragosse en année de césure, budget serré, voyage solo pour la première fois, anglais correct",
    "canal": "Réseaux sociaux",
    "canalDetail": "Instagram (stories d'une micro-influenceuse voyage espagnole qui a séjourné au hostel)",
    "device": "Mobile",
    "decision": "Hesite",
    "decisionLabel": "Hésite",
    "histoire": "Séduite par la capsule sunset des stories, bloquée par l'absence d'avis vérifiables : elle part trancher sur Hostelworld.",
    "localisation": "À Kuala Lumpur, remonte vers la Thaïlande la semaine prochaine",
    "maturite": "Découverte",
    "segment": "Client hésitant",
    "contexte": "L'influenceuse a montré la vue coucher de soleil du dortoir capsule, ça l'a marquée",
    "impression": "Le site est aussi joli que les stories de l'influenceuse, et c'est bien le problème : elle cherche des preuves qui ne viennent pas du hostel lui-même.",
    "parcours": [
      [
        "Home /es/",
        "Elle retrouve la vue coucher de soleil des stories, l'esthétique confirme Instagram mais ne prouve rien"
      ],
      [
        "Rooms",
        "Capsule sunset 500 THB avec balcon, casiers, dortoir femmes disponible : les bases sécurité sont là"
      ],
      [
        "Témoignages home",
        "10 citations avec prénoms, positives, traduites : mais aucune note agrégée, aucun lien Hostelworld ou Google pour vérifier"
      ],
      [
        "Sortie vers Hostelworld",
        "Elle part chercher les avis indépendants, décision reportée à sa vérification"
      ]
    ],
    "questionCle": "Où sont les vrais avis vérifiables, pas juste les témoignages choisis par le hostel ?",
    "reponse": "Non",
    "commentReponse": "Le site n'affiche ni note agrégée ni lien vers un profil d'avis vérifiable : 10 témoignages maison, crédibles mais invérifiables, exactement ce qui nourrit sa méfiance post-influenceuse.",
    "positifs": [
      "La capsule sunset des stories est bien réelle, avec prix et photos à l'appui",
      "Dortoir femmes + casiers : ses critères sécurité de voyageuse solo sont couverts"
    ],
    "frictions": [
      "Aucune note agrégée ni lien vers des avis vérifiables (Hostelworld, Google)",
      "Frais carte 3,5%, pas anodin pour un budget d'étudiante"
    ],
    "ceQuiFeraitBasculer": "Une note agrégée avec lien direct vers Hostelworld ou Google affichée sur le site, ou une note 9+ trouvée par elle-même en vérifiant.",
    "exp": 6,
    "conf": 4,
    "clarte": 8
  },
  {
    "id": 30,
    "code": "ES-20",
    "name": "Pilar",
    "age": 63,
    "emoji": "🌅",
    "langue": "ES",
    "langueLabel": "Hispanophone",
    "situation": "Retraitée de Madrid, voyage de noces d'or avec son mari, budget confortable, anglais quasi nul",
    "canal": "Google Maps",
    "canalDetail": "Google Maps",
    "device": "Tablette",
    "decision": "Hesite",
    "decisionLabel": "Hésite",
    "histoire": "Le site en espagnol la séduit, la FAQ langues la refroidit : la résa attendra que son fils écrive en anglais.",
    "localisation": "À Madrid, voyage prévu dans 2 mois, premier grand voyage en Asie",
    "maturite": "Comparaison",
    "segment": "Client adjacent",
    "contexte": "Leur fils plongeur leur a conseillé Koh Tao et le coin de Mae Haad, elle cherche un hébergement rassurant proche du ferry",
    "impression": "Soulagée : elle comprend tout, une première depuis le début de ses recherches. La chambre avec balcon près du port lui plaît immédiatement.",
    "parcours": [
      [
        "Home /es/",
        "Tout est en espagnol, elle navigue seule sans demander à son fils"
      ],
      [
        "Rooms",
        "Sunset Seaview Superior à 2 500 THB, salle de bain, balcon, vue mer : le confort qu'ils cherchent"
      ],
      [
        "Infos pratiques",
        "300 m à plat depuis l'embarcadère, parfait avec les valises, mais pas de petit-déjeuner"
      ],
      [
        "FAQ langues",
        "Staff anglais et français : le doute s'installe, personne ne parle espagnol à la réception"
      ],
      [
        "Sortie provisoire",
        "Elle demandera à son fils d'écrire au hostel en anglais avant de décider"
      ]
    ],
    "questionCle": "Comment on va se débrouiller à la réception si personne ne parle espagnol ?",
    "reponse": "Non",
    "commentReponse": "Le site est honnête (staff EN et FR, l'espagnol n'est couvert que par les instructeurs de plongée), mais il ne propose aucune solution à un client hispanophone qui ne plonge pas.",
    "positifs": [
      "Version espagnole intégrale : elle a pu tout comprendre et tout évaluer seule",
      "Accès à plat depuis le ferry détaillé, et la chambre balcon vue mer avec salle de bain qu'elle voulait"
    ],
    "frictions": [
      "Staff hostel sans espagnol alors qu'elle ne parle ni anglais ni français",
      "Pas de petit-déjeuner inclus",
      "Ambiance backpacker qui n'est pas leur univers pour des noces d'or"
    ],
    "ceQuiFeraitBasculer": "Une réponse rassurante en espagnol sur WhatsApp, ou la mention écrite qu'on peut communiquer en espagnol par messages avant et pendant le séjour",
    "exp": 6,
    "conf": 7,
    "clarte": 8
  },
  {
    "id": 31,
    "code": "ES-37",
    "name": "Rafael",
    "age": 55,
    "emoji": "🤿",
    "langue": "ES",
    "langueLabel": "Hispanophone",
    "situation": "Fonctionnaire de Tolède, plongeur certifié dans les années 90 (une centaine de plongées, rien depuis 10 ans), voyage solo, budget moyen-confortable, anglais rouillé",
    "canal": "Google Search",
    "canalDetail": "Google Search « buceo koh tao alojamiento barato cerca escuela »",
    "device": "Desktop",
    "decision": "Hesite",
    "decisionLabel": "Hésite",
    "histoire": "Le dive centre le convainc, la Deluxe le rassure, mais rien sur les refreshers ni les 55 ans et plus, il remet l'email à plus tard.",
    "localisation": "À Tolède, envisage la Thaïlande pour l'automne, rien de réservé",
    "maturite": "Découverte",
    "segment": "Client adjacent",
    "contexte": "Son médecin lui a donné le feu vert pour replonger, il veut s'y remettre avant ses 60 ans",
    "impression": "Il découvre le concept hostel + dive centre. La home parle de backpackers et de try-scuba débutants, il se demande d'emblée si c'est un endroit pour lui.",
    "parcours": [
      [
        "Home /es/",
        "hostel calme adossé à un dive centre de 25 ans, le sérieux du centre le retient sur la page"
      ],
      [
        "Diving",
        "instructeurs hispanophones, max 4 plongeurs par instructeur, 100 000 plongeurs certifiés, la partie plongée le convainc"
      ],
      [
        "About",
        "l'histoire du centre crédibilise, mais rien sur les certifiés qui reviennent après une pause, le mot refresher n'apparaît pas"
      ],
      [
        "Rooms",
        "Mountain View Deluxe 2 300 THB, une vraie chambre d'adulte, il n'est pas obligé de dormir en dortoir"
      ],
      [
        "Hésitation",
        "le format hostel à 55 ans le fait douter, il se dit qu'il écrira peut-être un email plus tard"
      ]
    ],
    "questionCle": "À 55 ans, j'ai ma place dans ce hostel ou je serai le doyen au milieu des gamins ?",
    "reponse": "Partiellement",
    "commentReponse": "Le calme non festif et les chambres privées suggèrent que oui, mais rien ne montre une clientèle d'âges variés et aucune offre retour à la plongée n'est nommée.",
    "positifs": [
      "Crédibilité massive du dive centre : 25 ans, 100 000 certifiés, max 4 par instructeur, instructeurs hispanophones",
      "Chambres privées avec salle de bain qui permettent d'éviter le dortoir"
    ],
    "frictions": [
      "Aucune offre refresher nommée pour les plongeurs certifiés rouillés, il devrait poser la question via le formulaire",
      "Réservation plongée par formulaire sans échange direct immédiat, pesant quand on doute déjà",
      "Rien (témoignage, photo) qui montre que les 50 ans et plus y ont leur place"
    ],
    "ceQuiFeraitBasculer": "Une mention explicite refresher/remise à niveau avec prix, et un signal que les plongeurs plus âgés sont les bienvenus",
    "exp": 6,
    "conf": 7,
    "clarte": 6
  },
  {
    "id": 32,
    "code": "ES-44",
    "name": "Elena",
    "age": 32,
    "emoji": "🔬",
    "langue": "ES",
    "langueLabel": "Hispanophone",
    "situation": "Biologiste de La Corogne, 2 semaines de vacances sur les fêtes de fin d'année, budget moyen-confortable, anglais courant",
    "canal": "Bouche-à-oreille",
    "canalDetail": "Bouche-à-oreille",
    "device": "Desktop",
    "decision": "Hesite",
    "decisionLabel": "Hésite",
    "histoire": "Recommandée et convaincue, elle bute sur les prix du Nouvel An découverts sur Cloudbeds et remet sa décision.",
    "localisation": "À La Corogne, vise Koh Tao pour le Nouvel An (haute saison)",
    "maturite": "Décision",
    "segment": "Client recommandé",
    "contexte": "Ses congés de fin d'année viennent d'être validés",
    "impression": "Le site correspond trait pour trait au récit de son amie : calme, propre, plongée intégrée. Elle arrive confiante et file directement vers les chambres.",
    "parcours": [
      [
        "Home",
        "tout colle au récit de son amie, elle ne perd pas de temps sur la découverte"
      ],
      [
        "Rooms",
        "capsule sunset à partir de 500 THB, c'est celle qu'elle veut pour le Nouvel An"
      ],
      [
        "Cloudbeds",
        "les prix de la semaine du Nouvel An dépassent nettement les « à partir de » du site, la douche est un peu froide"
      ],
      [
        "Infos pratiques",
        "annulation gratuite jusqu'à 24 h avant, ça limite le risque de bloquer les dates en attendant de comparer"
      ]
    ],
    "questionCle": "Les prix affichés tiennent encore pour la semaine du Nouvel An ?",
    "reponse": "Partiellement",
    "commentReponse": "Les « à partir de » sont honnêtes et le lien profond Cloudbeds donne le vrai prix par date, mais rien sur le site ne prévient que la haute saison monte nettement au-dessus des fourchettes.",
    "positifs": [
      "Annulation gratuite jusqu'à 24 h avant, simple et clairement écrite",
      "Lien Cloudbeds par chambre : elle atterrit directement sur la capsule sunset, pas sur un moteur générique"
    ],
    "frictions": [
      "Écart sensible entre les fourchettes affichées et les prix réels du Nouvel An, découvert seulement sur Cloudbeds",
      "Aucune mention de saisonnalité sur la page Rooms"
    ],
    "ceQuiFeraitBasculer": "Une mention de fourchette haute saison sur /rooms, ou la confirmation rapide qu'une capsule est disponible à ses dates avant qu'elle trouve une alternative.",
    "exp": 7,
    "conf": 8,
    "clarte": 7
  },
  {
    "id": 33,
    "code": "ES-04",
    "name": "Íker",
    "age": 22,
    "emoji": "🛹",
    "langue": "ES",
    "langueLabel": "Hispanophone",
    "situation": "Étudiant de Bilbao en semestre sabbatique, budget très serré, voyage entre potes rencontrés en route",
    "canal": "Réseaux sociaux",
    "canalDetail": "TikTok (vidéo « koh tao en 3 días » d'un backpacker espagnol, lien du hostel en commentaire)",
    "device": "Mobile",
    "decision": "Quitte",
    "decisionLabel": "Repart",
    "histoire": "Cherche la fête, lit « no festivo » en 20 secondes et repart : hors cible évacué proprement, la clarté du site fait son travail.",
    "localisation": "À Koh Phangan après la Full Moon Party, hésite entre Koh Tao et rentrer sur le continent",
    "maturite": "Découverte",
    "segment": "Client hors cible",
    "contexte": "Son groupe part à Koh Tao demain, il doit trouver un lit vite",
    "impression": "Premier écran : hostel calme, non festif, pensé pour dormir avant de plonger. En 5 secondes il sait qu'il n'y a ni bar ni beer pong ici.",
    "parcours": [
      [
        "Home /es/",
        "Lit « tranquilo, no festivo » dès le hero, comprend que l'ambiance n'est pas celle qu'il cherche"
      ],
      [
        "Rooms",
        "Vérifie quand même le prix : 500 THB le dortoir, au-dessus des lits les moins chers de l'île"
      ],
      [
        "Retour Google et Hostelworld",
        "Repart chercher un party hostel moins cher, sans avoir perdu de temps"
      ]
    ],
    "questionCle": "Il y a de l'ambiance le soir ou tout le monde dort à 22h ?",
    "reponse": "Oui",
    "commentReponse": "Le site répond très clairement : tout le monde dort, et c'est voulu. La FAQ « c'est festif ? » enfonce le clou. La réponse ne lui convient pas, mais elle est limpide, aucune minute perdue.",
    "positifs": [
      "Positionnement annoncé dès le premier écran, zéro ambiguïté",
      "Prix visibles sans clic, il évacue vite la question budget"
    ],
    "frictions": [
      "Positionnement non festif à l'opposé de ses attentes (choix assumé du hostel)",
      "500 THB au-dessus de son budget de lit, sans petit-déjeuner"
    ],
    "ceQuiFeraitBasculer": "Rien côté site : il cherche un party hostel et ce hostel a choisi exactement l'inverse. Un jour, quand il voudra dormir, peut-être.",
    "exp": 3,
    "conf": 7,
    "clarte": 10
  },
  {
    "id": 34,
    "code": "ES-17",
    "name": "Javi",
    "age": 20,
    "emoji": "🎉",
    "langue": "ES",
    "langueLabel": "Hispanophone",
    "situation": "Étudiant d'Alicante, 3 semaines en Thaïlande avec deux potes, budget serré dédié aux sorties",
    "canal": "Google Search",
    "canalDetail": "Google Search « party hostel koh tao pub crawl »",
    "device": "Mobile",
    "decision": "Quitte",
    "decisionLabel": "Repart",
    "histoire": "20 secondes sur la home, quiet non-party lu et compris, il repart chercher un party hostel : le tri fonctionne.",
    "localisation": "À Bangkok, Khao San Road, descend vers les îles ce week-end",
    "maturite": "Découverte",
    "segment": "Client hors cible",
    "contexte": "Après la Full Moon, le trio veut continuer la fête à Koh Tao, il cherche le hostel le plus festif de l'île",
    "impression": "Premier écran : calme, non festif, pensé pour dormir avant de plonger. Message reçu en 5 secondes.",
    "parcours": [
      [
        "Home",
        "Il lit « quiet, non-party » dès le hero et comprend que c'est l'anti Khao San"
      ],
      [
        "Règles maison",
        "Amende de 2 000 THB par visiteur non déclaré, hostel silencieux : tout confirme"
      ],
      [
        "Retour Google",
        "Il repart chercher un party hostel à Sairee"
      ]
    ],
    "questionCle": "Il y a un bar et de la fête ici ou c'est un monastère ?",
    "reponse": "Oui",
    "commentReponse": "Le site répond clairement : pas de fête. Le positionnement non festif est assumé dès le premier écran et dans la FAQ, aucune ambiguïté possible.",
    "positifs": [
      "Aucune seconde perdue : le positionnement est annoncé immédiatement, le tri se fait tout seul",
      "Prix affichés sans avoir à creuser"
    ],
    "frictions": [],
    "ceQuiFeraitBasculer": "Rien, il cherche exactement l'inverse de ce que le hostel assume",
    "exp": 3,
    "conf": 8,
    "clarte": 10
  },
  {
    "id": 35,
    "code": "ES-89",
    "name": "Elián",
    "age": 20,
    "emoji": "🏊",
    "langue": "ES",
    "langueLabel": "Hispanophone",
    "situation": "Maître-nageur saisonnier à Puntarenas (Costa Rica), rêve de devenir instructeur de plongée, budget actuel quasi nul, excellente aisance aquatique, jamais plongé bouteille.",
    "canal": "Réseaux sociaux",
    "canalDetail": "Réseaux sociaux : TikTok",
    "device": "Mobile",
    "decision": "Quitte",
    "decisionLabel": "Repart",
    "histoire": "Il venait chiffrer son rêve d'instructeur : prix notés, plan Koh Tao validé, il repart économiser pour le billet.",
    "localisation": "À Puntarenas, aucun voyage réservé, horizon 1 à 2 ans",
    "maturite": "Découverte",
    "segment": "Client en découverte",
    "contexte": "Fin de saison au poste de secours, il fait ses comptes et ses plans d'avenir ; il compare les prix de Koh Tao avec le Costa Rica.",
    "impression": "Des prix concrets tout de suite, exactement ce qu'il venait chercher pour chiffrer son rêve d'instructeur.",
    "parcours": [
      [
        "/es/diving",
        "Open Water 9 500 THB, Advanced 9 500 THB : nettement moins cher qu'au Costa Rica, il note tout"
      ],
      [
        "/es/diving (try-scuba)",
        "piscine gratuite pour les clients du hostel : tester l'équipement avant même de payer un cours"
      ],
      [
        "/es/about",
        "PADI 5-Star IDC, 100 000 certifiés en 25 ans : le sérieux qui valide sa future école"
      ],
      [
        "Sortie",
        "captures d'écran des prix, il repart économiser pour le billet"
      ]
    ],
    "questionCle": "L'Open Water à 9 500 THB inclut-il tout, ou il y a des frais de certification en plus ?",
    "reponse": "Partiellement",
    "commentReponse": "Le prix est affiché « à partir de » mais le détail des inclusions (certification, matériel, supports) n'est pas décomposé sur le site.",
    "positifs": [
      "Prix des cours affichés en clair, comparables depuis l'étranger sans écrire à personne",
      "Crédibilité du centre : PADI 5-Star, 25 ans, max 4 plongeurs par instructeur"
    ],
    "frictions": [
      "Prix « à partir de » sans détail des inclusions ni des éventuels frais de certification"
    ],
    "ceQuiFeraitBasculer": "Un billet d'avion financé : le site a déjà fait sa part, son plan Koh Tao est validé.",
    "exp": 8,
    "conf": 8,
    "clarte": 8
  },
  {
    "id": 36,
    "code": "ES-11",
    "name": "Sofía",
    "age": 26,
    "emoji": "🌎",
    "langue": "ES",
    "langueLabel": "Hispanophone",
    "situation": "Serveuse de Córdoba (Argentine), voyage au long cours de 8 mois, budget très serré, compte chaque peso converti",
    "canal": "Hostelworld / Booking",
    "canalDetail": "Hostelworld",
    "device": "Mobile",
    "decision": "Quitte",
    "decisionLabel": "Repart",
    "histoire": "Venue comparer les prix, elle calcule 500 THB plus 3,5% et caution, trop pour son budget, elle repart sur Hostelworld.",
    "localisation": "À Koh Samui, ferry pour Koh Tao dans 2 jours",
    "maturite": "Comparaison",
    "segment": "Client hésitant",
    "contexte": "Elle doit réserver ce soir pour arriver après-demain, elle compare tous les dortoirs de Koh Tao triés par prix",
    "impression": "Site propre, en espagnol natif, prix affichés directement sans avoir à chercher. Mais elle repère aussitôt le « à partir de 500 THB », au-dessus de sa cible.",
    "parcours": [
      [
        "Home ES",
        "Site clair, positionnement calme, elle descend directement chercher les prix"
      ],
      [
        "Rooms",
        "Dortoir à 500 THB minimum, 150 à 200 THB au-dessus des lits qu'elle vise sur l'île"
      ],
      [
        "Infos pratiques",
        "Frais carte 3,5% (elle paie tout par carte), caution serviette 500 THB, pas de petit-déjeuner : le total réel grimpe"
      ],
      [
        "FAQ",
        "Annulation gratuite jusqu'à 24 h, correct, mais ça ne change pas son calcul"
      ],
      [
        "Retour Hostelworld",
        "Elle repart trier les dortoirs par prix croissant"
      ]
    ],
    "questionCle": "Pourquoi payer 500 THB plus 3,5% de frais quand le dortoir d'à côté est à 300 ?",
    "reponse": "Non",
    "commentReponse": "Le site assume un positionnement qualité (un témoignage dit même « pricy but worth it ») mais n'a aucun argument budget pour une voyageuse au long cours, le try-scuba gratuit ne pèse pas assez face à 6 mois d'économies.",
    "positifs": [
      "Prix, frais carte et caution annoncés sans surprise : elle peut calculer son total réel avant de réserver",
      "Annulation gratuite jusqu'à 24 h, simple et lisible"
    ],
    "frictions": [
      "Dortoir à 500 THB minimum quand elle vise 300-350 THB",
      "Frais carte 3,5% alors qu'elle règle tout par carte",
      "Caution serviette 500 THB qui immobilise du cash"
    ],
    "ceQuiFeraitBasculer": "Un lit sous 400 THB ou une offre dédiée aux voyageurs au long cours",
    "exp": 6,
    "conf": 7,
    "clarte": 9
  }
];
