---
title: How to migrate front technologies
layout: post
type: Technical
tagline: Direction Webpack
description: |
  Sometimes you have to migrate front architecture, especially when you want to optimize web performance or to create a new brand image.
categories:
- technical
tags:
- front
- migration
- webpack
- web performance
author: iScor
image: webpack.svg
location: sfo
---
# Study case

There were no huge specifications for this project because it was an iterative project using the Scrum method. The need of the site was reduced to a small site, but very inviting with the logic LEAN UX, including search, listings and product sheets. Plus the fact to keep in mind that the site will be expanded at a later stage. The site had to be mobile friendly.

The main complex problem was to include a sub module (the checkout) into the new site. The fact is, the two projects didn't have the same tech stack.

## Details

Here are the migration technologies details.
The submodule has the following stack :

* Bootstrap
* Symfony
* Less
* Selenium IDE functional tests

And the new website is developed with these technology choices :

* ITCSS with Bootstrap 4 grid
* Symfony
* Sass
* Nightwatch.js automated testing

## Migration

### Template migration

First of all migrations, the template was the first thing to migrate. Even if the two environments are coded in Twig,
the principal problem was the CSS framework change. Even if the grid is the same component (the bootstrap one), some utility classes are different.

### Style migration

The second big impact was the change of the preprocessor. I use SCSS which is compiled with node-sass, the compilation will be described later in the webpack part. In the submodule, all the style is written in less.

#### The new project architecture

My SCSS is split up in different files or so called Sass partials. Working with Sass partials makes it more flexible and easier to maintain. Working like this is a way to keep a good overview on things which makes it more efficient to maintain.

I split things up like this :

![ITCSS structure](/assets/images/itcss.png){:aria-label="Assets + Scripts, Settings, Tools, Generic, Elements, Objects, Components and Trumps"}{: .center-block .img-fluid}

My `main` CSS file is `styles.scss`. The only lines of code, in this file, imports the other files. Example :

{% highlight sass %}

/*------------------------------------*\
    #SETTINGS
\*------------------------------------*/

@import '01-Settings/colors';
@import '01-Settings/typography';
@import '01-Settings/spacing';
@import '01-Settings/responsive';

/*------------------------------------*\
    #TOOLS
\*------------------------------------*/

@import '02-Tools/mixins';
@import '02-Tools/functions';
@import '02-Tools/responsive';
@import '02-Tools/images';
@import '02-Tools/animations';
@import '02-Tools/transitions';

{% endhighlight %}

I've chosen the **7-1 pattern** approach, but I include manually all the parts because some of them are environment-dependencies.

#### The old project approach

I won't describe the old structure, but how I migrate less components in the sass structure.

The first step was to extract the leanest part of the sass-framework to include it in the submodule. After that, the approach was to integrate less part as a component or trump in the new sass style for the submodule.

{% highlight sass %}
/*------------------------------------*\
    #COMPONENTS
\*------------------------------------*/

@import '06-Components/payment-block';
{% endhighlight %}

**The main reason for success is to not stop at the first failure display, due to pixel-perfect design !**

The success has been achieved especially since the main core, namely the grid, is the same. This is the bootstrap grid, which has been simplified to keep only the necessary but the consistency remains unchanged.

### Bundle webpack

Creation of a webpack bundle permits to migrate step by step.

The main files are located in the `00-Assets` folder.

{% highlight js %}
// Load internationalization library
var I18N = require('./i18n').default;

// Instanciate translator
var translator = new I18N();

// Translate the document
translator.translate(I18N.french);
{% endhighlight %}

With *webpack-loader*, the migration is easier to do. In fact, I used less-loader and sass-loader to combine old and new components. At the end of the migration, I removed useless loaders.

After style migration, the javascript logic was all integrated in the webpack flow, step by step (or component by component). Plus the fact that the webpack tests code quality, I also fixed some code styling and not optimized code.

### Functional tests

Another big change was to migrate from *Selenium static tests* to an automated test process (with Nightwatch.js)

I used a [node module](https://github.com/timjrobinson/seleniumide2nightwatch) to convert static Selenium test case to javascript test case. I adapted them to load common configuration and not repeat behavior. The generated code is not perfect but the cleaning does not take too many time (switching from xpath to css selector for example)

## Environments

In webpack, one of the most important problem is to have multiple environments. I split the configuration into 3 parts :

### Common environment

In the common part, we can retrieve common webpack plugins and specific configuration (shared between environments)

### Production environment

In this case, I minify assets, compress and upload them to an Amazon S3 instance.

### Development environment

In this case, I don't minify assets and use the dev version of the webpack bundle asset. I also add watch mode (for Docker or Vagrant issue) to be focused on the code.

I also generate automatically a styleguide directly with dev source code.

![Styleguide menu](/assets/images/styleguide_index.png)
![Styleguide example](/assets/images/styleguide_example.png)

## Github

Go to the demonstration repo for a code example. All of them will be updated all along my researches so you can use them as project dependencies.

<a class="btn btn-link btn-block" href="https://github.com/iGitScor/how-to-migrate-front" rel="nofollow" target="_blank" title="Fork it">
    <i class="fa fa-github"></i> Fork it
  </a>

You can also contribute to it by **forking the project** and make a pull request ;-)

## Going further

In the next article, I'll present the design migration and I'll specify migration tools
