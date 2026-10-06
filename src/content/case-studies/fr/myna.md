---
title: "Myna : un studio de podcast qui parle avec votre voix"
description: Comment Myna transforme un script écrit en épisode de podcast masterisé, avec une voix neuronale qui tourne entièrement dans le navigateur.
---
## Le problème

Transformer un script en épisode fini oblige d’ordinaire à l’enregistrer soi-même, ou à envoyer le texte, et parfois des enregistrements de sa voix, à un service en ligne.

Myna se donne deux contraintes. Rien ne quitte l’appareil : pas d’envoi, pas de compte, et tout fonctionne hors ligne. Et parce qu’une voix est une chose puissante à copier, aucune voix ne peut être utilisée sans le consentement enregistré de la personne qui parle.

## Ce que j’ai construit

- **Myna**, une application web installable où l’on écrit le script, le fait lire, masterise l’audio et exporte un MP3 chapitré, avec ce qu’il faut pour publier le flux.
- **Myna Atelier**, une application de bureau pour Mac, Windows et Linux qui entraîne votre propre voix à partir de 30 à 60 minutes d’enregistrements, sur votre machine.
- **voicelab**, l’outil en ligne de commande que pilote Atelier : il vérifie le jeu de données, affine la voix et l’exporte dans un fichier `.voice` unique.
- **Des schémas partagés** pour tous les fichiers que ces briques échangent.

## Comment ça marche

**La synthèse dans un Web Worker.** Les modèles Piper VITS tournent avec ONNX Runtime Web, et espeak-ng, compilé en WebAssembly, produit les phonèmes. Sur un Mac de série M, le rendu est 15 à 20 fois plus rapide que le temps réel. Le détail est dans la page [architecture TTS](https://podcast.iscor.me/docs/architecture/tts).

**Un traitement audio de niveau broadcast, en TypeScript.** Le volume est mesuré selon la norme EBU R128, puis un compresseur, un limiteur et l’atténuation de la musique sous la voix produisent le mixage final, encodé en MP3 avec des chapitres ID3. Voir le [pipeline audio](https://podcast.iscor.me/docs/architecture/audio-pipeline).

**Un consentement vérifié à partir de l’audio.** Chaque voix contient un enregistrement de la personne lisant une phrase de consentement avec un code aléatoire. Whisper et une empreinte vocale le vérifient avant l’entraînement, et l’application refuse une voix qui n’en a pas. Voir [consentement et provenance](https://podcast.iscor.me/docs/architecture/consent).

**Un stockage local d’abord.** Les épisodes sont conservés dans IndexedDB et dans l’Origin Private File System, et un service worker garde le moteur vocal disponible hors ligne.

**Un contrat, quatre lecteurs.** Les formats de fichiers sont des JSON Schemas, vérifiés avec les mêmes jeux d’essai par l’application web, l’entraîneur Python, l’application Mac et l’application Windows et Linux.

## Ce que j’ai appris

- Faire tourner le modèle dans le navigateur déplace la difficulté des serveurs vers le packaging : le multithreading exige l’isolation cross-origin, et le hors-ligne suppose de mettre en cache environ 33 Mo.
- Un format partagé par quatre bases de code ne reste fiable que si chaque lecteur est testé avec les mêmes jeux d’essai.
- Le consentement doit être vérifié dans l’enregistrement lui-même : des métadonnées se modifient.
- Les tests de bout en bout peuvent exécuter le vrai pipeline quand le modèle est minuscule : une voix de substitution de 1 Ko leur évite le réseau et un téléchargement de 63 Mo.
