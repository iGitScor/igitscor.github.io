---
title: "Bucket List : trier n’importe quelle liste dans le navigateur"
description: Comment Bucket List range une liste importée en îles thématiques avec un modèle de 9 Mo distillé pour le navigateur, et ne passe au modèle complet que si l’appareil peut se le permettre.
---
## Le problème

Une bucket list, c’est personnel, et une longue liste se lit mal. La trier par thème est un travail pour un modèle de langage, mais l’envoyer à un serveur pour la faire trier irait contre l’idée même.

Bucket List se donne une contrainte : la liste ne quitte jamais le navigateur. La classification, le stockage et la vue « histoire » tournent tous sur l’appareil.

## Ce que j’ai construit

- **Une application centrée sur la liste**, en français, pour filtrer, explorer et suivre une bucket list. Elle importe presque tout : JSON, CSV, TSV, listes à cocher Markdown ou un élément par ligne. Elle devine quelle colonne contient le texte, le statut, la catégorie et le lien, et retire les marqueurs comme `[x]` ou ✅.
- **Une vue « histoire » cachée** : un carnet en 2D où la liste devient 1 à 8 îles thématiques, choisies parmi 14 archétypes, et où le ciel suit l’heure au fil d’une journée, de 6 h à 22 h.
- **Un classifieur à trois niveaux** qui tourne dans le navigateur, et le script qui distille son niveau intermédiaire.

## Comment ça marche

**Trois niveaux, du moins coûteux au plus coûteux.** Un lexique de mots-clés répond instantanément, sans téléchargement. Un modèle léger livré avec le site, de 8,66 Mo, répond en quelques millisecondes. Le modèle complet multilingual-e5-small, d’environ 140 Mo, tourne en ONNX et WebAssembly avec transformers.js et prend de quelques secondes à quelques minutes. Les mots-clés couvrent aussi les listes qui ne sont ni en français ni en anglais.

**Un modèle distillé pour la tâche.** Le modèle léger suit la recette Model2Vec, avec multilingual-e5-small comme professeur. Il garde 30 286 fragments de mots, ceux qui couvrent 99,5 % d’un échantillon de Wikipédia en français et en anglais et ceux des textes de l’application, calcule l’embedding de chacun, les réduit à 256 dimensions, puis apprend une projection linéaire vers les 384 du professeur. L’ajustement atteint un cosinus de 0,903, et l’ensemble prend environ 15 minutes sur le processeur d’un ordinateur portable.

**Mesuré, pas supposé.** Sur 757 éléments que le modèle léger n’a jamais vus à l’entraînement :

| Niveau | Accord avec le modèle complet | Accord avec la liste triée à la main |
|---|---|---|
| Mots-clés | 72,0 % | 78,2 % |
| Modèle léger | 77,5 % | 79,5 % |
| Modèle complet | — | 86,0 % |

**Monter en gamme seulement si l’appareil le permet.** Le modèle complet se télécharge en arrière-plan quand le navigateur est inactif et en ligne, sans économiseur de données, avec une connexion rapide et plus de 400 Mo de stockage libre. Une fois prêt, les listes enregistrées sont triées à nouveau et vos corrections sont conservées.

**Le même résultat sur chaque appareil.** L’identifiant d’une liste est un SHA-256 de son contenu, et il sert de graine à chaque choix aléatoire. Les révisions du modèle et les versions du moteur sont figées, et le modèle complet tourne sur un seul thread en WebAssembly : deux navigateurs trient donc la même liste de la même façon. Des tests par instantanés le vérifient, y compris pour des fichiers avec des fins de ligne Windows ou une marque d’ordre des octets.

**Stockée nulle part ailleurs.** Les listes, les corrections et les scores restent dans IndexedDB, dans ce navigateur uniquement.

## Ce que j’ai appris

- Une conception progressive vaut mieux qu’un modèle unique : afficher tout de suite la réponse bon marché, récupérer discrètement le gros modèle, puis monter en gamme.
- Un modèle statique de 9 Mo arrive à 6,5 points du modèle complet sur les éléments triés à la main, et c’est assez pour rendre le modèle complet facultatif.
- Le ML dans le navigateur exige de tout figer : révision du modèle, poids, moteur et nombre de threads, sinon deux appareils ne sont pas d’accord.
- Les limites de l’hébergeur façonnent l’architecture : le moteur ONNX dépasse la limite de 25 Mio par fichier, il se charge donc depuis un CDN.
- Certaines règles relèvent du code, pas du modèle : les éléments personnels vont toujours sur une île verrouillée, quoi qu’en dise le classifieur.
- Réduire le périmètre est une fonctionnalité. Une première version était un monde en 3D ; l’application centrée sur la liste, avec sa vue « histoire » en 2D, l’a remplacée.
