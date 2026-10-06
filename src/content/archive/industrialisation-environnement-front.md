---
title: "Industrialisation de l'environnement front"
type: Article pro
tagline: "Keep it smart !"
description: >
  Présentation du projet Kickstarter,
  premier pas de l'industrialisation des projets dans l'équipe technique de 1001pharmacies
lang: fr
date: 2016-01-05
kind: article
permalink: /industrialisation-environnement-front.html
tags: [tech, gulp, symfony2, industrialisation, quality]
---
## Contexte du projet

**Le développement front et l'intégration sont de plus en plus complexes avec des [Stacks trop importantes][overdosejs].**

À 1001pharmacies, nous n'échappons pas à cette règle. Le développement back est fait avec le framework PHP Symfony 2.
Celui-ci est contraignant pour la gestion des ressources front.

Dans le cadre de ces projets, nous étions souvent amenés à exécuter très fréquemment des tâches répétitives pour le développement front.
Nous avons donc très vite vu l'importance d'industrialiser des processus de développement.

* Compilation de fichiers de style
* Compilation de script
* Optimisation d'images

Le choix de *Gulp* plutôt que *Grunt*, *npm* ou *Broccoli* s'est fait naturellement. En effet, la logique de programmation de gulp, une approche Event semblable à *Node.js* et également une décision arbitraire.

## Objectifs

Obtenir un environnement de développement propre et fonctionnel. Il permettra la création de landing pages.

<figure>
  <img src="/assets/images/kickstarter/landings.jpg" alt="Landing pages" width="700" height="196" loading="lazy" />
  <figcaption>Figure 1: Landing pages</figcaption>
</figure>

### Prérequis

* Symfony2, Jekyll, AngularJS, projets Starter Kit (bootstrap, foundation)
* Gestion des dépendances Bower

### Qualité

Parce que la qualité du code est nécessaire pour rendre les projets maintenables, il a d'abord fallu rendre le kickstarter lui-même testé et maintenable. Un outil de qualité pour faire du travail de qualité.

L'outil Kickstarter est testé par **karma** (encore lui), **mocha** et **chai** pour la gestion des asserts. Les tests portent sur l'assistant de configuration et non sur les plugins gulp tiers.

La qualité est mise en avant également par des tâches *gulp* avec l'intégration de linters (HTML, CSS, Javascript)

## Développement

Nous avons travaillé de manière itérative pour réaliser ce projet qui est toujours en amélioration continue.

### Sources

Afin de mener à bien ce projet et comprendre complètement la logique gulp et node, nous avons étudié le core de différents outils déjà grandement présents dans l'écosystème à savoir karma, gulp lui-même pour la plus grande partie.

### Fonctionnalités

Pour voir la liste exhaustive des fonctionnalités proposées par le Kickstarter, rendez-vous sur le [dépôt Github][kickstarter].

* Compilateur CSS (Compass, Sass, Less)
* Compression Javascript
* Optimisation images (*.png*, *.jpg*)
* Lint de la syntaxe
* Compression twig (avec filter trans)
* Création micro server pour développer (avec livereload)

## Utilisation

```sh
$ Kickstarter --help
$ Kickstarter init
$ Kickstarter start --open
```

### Démonstration

<figure>
  <img src="/assets/images/kickstarter/kickstarter_launch.gif" alt="Démonstration kickstarter" width="469" height="442" loading="lazy" />
  <figcaption>Figure 2: Démonstration kickstarter</figcaption>
</figure>

Dans ce projet nous avons de multiples sous-projets avec un core commun. Il est donc facile de switcher de sous-projets :

* `Kickstarter start src/{projetA}/kickstarter.conf.js --port=3000`
* `Kickstarter start src/{projetB}/kickstarter.conf.js --port=4000`

<small>Cela permet aussi l'interaction et des configurations spécifiques.</small>

Voir la [documentation du kickstarter][kickstarter] pour plus d'informations.

### Slides

[Voir les slides](/slides/kickstarter.html)

## Liens externes

* Gulp : [Site officiel][gulpjs]
* Karma : [Dépôt Github][karma]

[kickstarter]:      https://github.com/1001Pharmacies/kickstarter
[overdosejs]:       https://github.com/naholyr/blendwebmix-js-stack-overdose
[gulpjs]:           http://gulpjs.com/
[karma]:            https://github.com/karma-runner/karma
