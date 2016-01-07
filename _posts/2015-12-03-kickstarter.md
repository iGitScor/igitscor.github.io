---
layout: post
type: Article externe
title:  "Industrialisation de l'environnement front"
tagline: "Keep it smart !"
description: >
  Présentation du projet Kickstarter,
  premier pas de l'industrialisation des projets dans l'équipe technique de 1001pharmacies
categories: [technique, industrialisation]
tags: [tech, gulp, symfony2, industrialisation, quality]
fullview: true
author: iScor
image: workflow.jpg
---

## Contexte du projet

**Le développement front et l'intégration sont de plus en plus complexes avec des [Stacks trop importantes][overdosejs]{:target="_blank"}.**

À 1001pharmacies, nous n'échappons pas à cette règle. Le développement back est fait avec le framework PHP Symfony 2.
Celui-ci est contraignant pour la gestion des ressources front.

Dans le cadre de ces projets, nous étions souvent amenés à exécuter très fréquemment des tâches répétitives pour le développement front.
Nous avons donc très vite vu l'importance d'industrialiser des processus de développement.

* Compilation de fichiers de style
* Compilation de script
* Optimisation d'images
<br /><br />

Le choix de *Gulp* plutôt que *Grunt*, *npm* ou *Broccoli* s'est fait naturellement. En effet, la logique de programmation de gulp, une approche Event semblable à *Node.js* et également une décision arbitraire.

<div class="line"></div>

## Objectifs

Obtenir un environnement de développement propre et fonctionnel. Il permettra la création de landing pages.

![landing pages](/assets/images/kickstarter/landings.jpg){: .img-responsive}

### Prérequis

* Symfony2, Jekyll, AngularJS, projets Starter Kit (bootstrap, foundation)
* Gestion des dépendances Bower
<br /><br />

### Qualité

Parce que la qualité du code est nécessaire pour rendre les projets maintenables, il a d'abord fallu rendre le kickstarter lui-même testé et maintenable. Un outil de qualité pour faire du travail de qualité.

L'outil Kickstarter est testé par **karma** (encore lui), **mocha** et **chai** pour la gestion des asserts. Les tests portent sur l'assistant de configuration et non sur les plugins gulp tiers.

La qualité est mise en avant également par des tâches *gulp* avec l'intégration de linters (HTML, CSS, Javascript)

<div class="line"></div>

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

<div class="line"></div>

## Utilisation

{% highlight sh %}
$ Kickstarter --help
$ Kickstarter init
$ Kickstarter start --open
{% endhighlight %}

### Démonstration

![demo kickstarter](/assets/images/kickstarter/kickstarter_launch.gif)

Dans ce projet nous avons de multiples sous-projets avec un core commun. Il est donc facile de switcher de sous-projets :

* `Kickstarter start src/{projetA}/kickstarter.conf.js --port=3000`
* `Kickstarter start src/{projetB}/kickstarter.conf.js --port=4000`

<small>Cela permet aussi l'interaction et des configurations spécifiques.</small>

Voir la [documentation du kickstarter][kickstarter]{:target="_blank"} pour plus d'informations.

### Slides

<a class="btn btn-primary" href="slides/kickstarter.html">Voir les slides</a>

## Liens externes

* Gulp : [Site officiel][gulpjs]{:target="_blank"}
* Karma : [Dépôt Github][karma]{:target="_blank"}

[kickstarter]:      https://github.com/1001Pharmacies/kickstarter
[overdosejs]:       https://github.com/naholyr/blendwebmix-js-stack-overdose
[gulpjs]:           http://gulpjs.com/
[karma]:            https://github.com/karma-runner/karma
