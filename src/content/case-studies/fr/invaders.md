---
title: "Flash Invaders Tracker : préparer une chasse à pied"
description: Comment Flash Invaders Tracker retrouve les invaders devant lesquels vous êtes passé et planifie un parcours à pied vers ceux qui vous manquent, entièrement dans le navigateur.
---
## Le problème

Flash Invaders est un jeu où l’on photographie les mosaïques que l’artiste de rue Invader a posées dans des villes du monde entier. L’application officielle montre ce que vous avez flashé, mais pas ce que vous avez manqué, ni comment y aller.

Cet outil répond à deux questions : devant quels invaders suis-je passé sans les voir, et quelle est la meilleure balade pour récupérer ceux qui me manquent ?

## Ce que j’ai construit

- **Une galerie face à la carte** : vos flashs, chargés à partir de votre identifiant de joueur, affichés sur une carte de 4 415 invaders dans 89 villes.
- **Les invaders manqués** : importez une trace GPX depuis Strava ou un export Apple Santé, et voyez chaque invader passé à moins de 50 mètres sans être flashé.
- **Un planificateur de parcours** qui choisit les invaders qui valent un détour dans une distance donnée, les ordonne et exporte la balade en fichier GPX ou en lien Google Maps.
- **Un générateur de chasses** qui transforme un ensemble d’invaders en jeu de piste, avec des énigmes tirées du quartier.

Il n’y a pas de serveur applicatif : l’application est un site statique, et vos traces et réglages restent dans le navigateur.

## Comment ça marche

**Une grille plutôt que toutes les paires.** Comparer chaque point d’une longue marche à chaque invader est lent. Les invaders sont répartis dans une grille de cases d’environ 111 mètres de côté : chaque point de la trace ne consulte que les cases voisines.

**Choisir d’abord, ordonner ensuite.** Google Maps accepte au plus 8 étapes : le planificateur choisit donc d’abord les invaders à visiter, ceux non flashés à moins de 80 % de la distance prévue, du plus proche au plus lointain, plus ceux qui coûtent un détour de moins de 150 mètres. Il les ordonne ensuite par insertion au moindre coût, puis améliore l’ordre avec des passes 2-opt et Or-opt. L’itinéraire à pied vient d’OSRM.

**Des énigmes tirées des données ouvertes.** Le générateur de chasses décrit chaque lieu avec Nominatim, Overpass, Wikidata et Wikipédia, et choisit parmi plus de 40 types d’énigmes. Une chasse de cinq invaders prend 30 à 50 secondes la première fois, et moins de 2 secondes une fois les données des lieux en cache.

**Des données communautaires, tenues à jour.** La liste des invaders vient d’un jeu de données maintenu par la communauté, et les stations de métro d’OpenStreetMap ; un script rafraîchit chacune.

## Ce que j’ai appris

- Les contraintes réelles choisissent l’algorithme : une limite de 8 étapes transforme « résoudre le parcours » en « choisir, puis ordonner ».
- À cette échelle, une recherche locale simple suffit : l’insertion au moindre coût suivie de 2-opt et Or-opt donne de bonnes balades.
- Une grille spatiale transforme une comparaison quadratique en recherches quasi constantes, en quelques lignes de code.
- Avec des API publiques gratuites, les limites de débit donnent le rythme : le cache et les solutions de repli comptent plus que l’algorithme.
- S’appuyer sur des données communautaires, c’est assumer leur synchronisation : les scripts de mise à jour font partie du produit.
