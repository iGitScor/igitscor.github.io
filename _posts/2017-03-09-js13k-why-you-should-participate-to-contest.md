---
layout: post
type: Contest
title:  "JS13k - Why you sould participate to game contest ?"
tagline: "All in 13kb"
description: >
  Explaination about why frontend developer should make indie game contest
categories: [contest]
tags: [javascript, indiedev, gamedev, web performance, css]
author: iScor
image: ux.svg
location: sfo
redirect_from: "/js13k-why-you-should-participate-to-contest"
---
# JS13kgames - a javascript game contest

Independent video game development is the video game development process of creating indie games; these are video games, commonly created by individual or small teams of video game developers and usually without significant financial support of a video game publisher or other outside source. These games may take years to be built from the ground up or can be completed in a matter of days or even hours depending on complexity, participants, and design goal.

Development of indie games is the process of creating games which are not affiliated with production groups (as in cinema), generally created by a single person or a group of enthusiasts of development and video games, without financial input from institution composed of publisher or any other professional entity. These games can take years to conceive due to their complexity and / or their graphic appearance, or a couple of weeks in some cases, for example in contests and that's one of those I'm going to tell you about.

## Introduction

A few years ago, I started web development in a professional way, but for me I missed something, an objective, a challenge, a story to tell. Luckily I has help from friends who introduced me the concept of development competition.

## First contest

The first contest was JS1K. **Javascript, performance, limits!** I finally found my challenge ... yes but here, I had not enough confidence in myself and especially too little experience in the development to begin this project. The second contest was JS13k. Always Javascript, less limit and an opportunity to create a video game with a small team. The first attempt was not successful, we were so busy by our work (the paid one) that we could not carry out this project. That was in 2014.

<center>
  <p>
    <img src="/assets/images/js1k-logo.png" alt="js1k" class="img-fluid" />
  </p>
</center>

## Second contest

The crew behind this contest is friendly with a respectful jury. A bargain to progress, to learn, to be known and above all to have fun! So I tried the adventure in 2015, solo, proposing a game filled with personal references (Mario, Harry Potter, Memento ... all more or less well hidden). The lack of time, again it, forced me not to propose my initial idea but I was proud to finish a micro game. Not enough to make addictive its players.

In 2016, the contest was an opportunity for me to take a new direction with this competition. And this direction is the subject of this article.

<center>
  <p>
    <img src="/assets/images/js13k-logo.png" alt="js13k" class="img-fluid" />
  </p>
</center>

## Why should a front-end integrator / developer participate in these contests?

I will not debate about the difference between an integrator and a front developer, it depends on the culture of the person / group to which you are asking this question.

> Integrator? Frontend developer? Let's talk about anyone whom develops in CSS3, with noJS logic and accessibility in line of sight!

My idea was to submit a game exclusively realized in CSS and HTML ... idea apparently contrary to the concept of the contest, the creation of a game in Javascript. Yes but after having the confirmation of the team, I began the integration of a game. The integration ... of a game.

> Is it possible to submit an entry without Javascript? #JavaScript game without Javascript

### Synopsis of the game

Rewrite History with a text-based game (question / answer). Create an [alternate history][Uchronie].

During centuries, human has always wanted to travel in time with Javascript, to correct his mistakes ... without success. However, you are a robot, maybe you will have more luck, with only CSS?

For example, if the city of [Lublin][Lublin map] (in Poland) had never been founded, the contest's creator would never have been born (or at least would have had a different life). Therefore the developed game could never have been done. It is therefore a temporal anomaly.

![Lublin](/assets/images/lublin.jpg){: .center-block .img-fluid}

The concept of the game is neither revolutionary nor addictive, perhaps a bit cute when seeing the little robot. No. The game was primarily intended as a proof of concept, a POC. I wanted to develop a game with a complex HTML page and advanced CSS concepts. To simplify, when the player answers, it activates the next question, and a checkbox system (yes, like in a form) "stored" the logic of the game and thus the user's answers. So yes, of course, when you look at the page itself, the code is just illegible.

![Game](/assets/images/js13k.jpg){: .center-block .img-fluid}

## So, why?

For all the reasons mentioned in this article, namely:

- Always think a website without Javascript
- Improve or revise your CSS
- Is there really only a good reason?

## Going further

<center>
  https://twitter.com/algolia/status/849540613267574784
  <cite>CSS API by Algolia</cite>
</center>

A few months after submitting my game, I came across an article in the Algolia solution, which featured a CSS API (without Javascript). Intrigued, I took a look at what they meant by API CSS. Using Algolia with 1001pharmacies, and being satisfied and impressed by their libraries, I had to break through the secret. And what I discovered was simply that they use the same technique as for my game.

![CSS API demo](/assets/images/algolia-css-client.png){: .center-block .img-fluid}

Here, in this screenshot, we can see that each chip (e.g Sales, Engineering, ...) is a label and linked (in HTML) to a radio button. These radio buttons display or hide elements in the list. In other terms, each person in the list is attached to a job and if the job is selected, the information are readable... by human.

The main problem of this approach is that the component is not accessible. When a person with a disability try to use or read the content of your web page, they can have surprises.

### Demo

![CSS API demo](/assets/images/algolia-css-client.gif){: .center-block .img-fluid}

## Links

[Game demo](http://iscor.me/js13k-2016)

[Uchronie]: https://en.wikipedia.org/wiki/Alternate_history
[Lublin map]: https://www.google.fr/maps?q=lublin&um=1&ie=UTF-8&sa=X&ved=0ahUKEwixiILS4IPUAhUCORoKHX5tBCMQ_AUICygC
