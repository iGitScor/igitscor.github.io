---
title: "Flash Invaders Tracker: planning a hunt on foot"
description: How Flash Invaders Tracker finds the invaders you walked past and plans a walking route to the ones you are missing, entirely in the browser.
---
## The problem

Flash Invaders is a game where players photograph the mosaics that the street artist Invader has placed in cities around the world. The official app shows what you have flashed, but not what you missed, nor how to get to it.

The tracker answers two questions: which invaders did I walk right past, and what is the best walk to collect the ones I am missing?

## What I built

- **A gallery against the map**: your flashes, loaded by player id, shown over a map of 4,415 invaders in 89 cities.
- **Missed invaders**: import a GPX track from Strava or an Apple Health export, and see every invader you came within 50 metres of without flashing it.
- **A route planner** that picks the invaders worth a detour within a distance budget, orders them, and exports the walk as a GPX file or a Google Maps link.
- **A hunt generator** that turns a set of invaders into a puzzle trail with riddles drawn from the neighbourhood.

There is no backend: the app is a static site, and your tracks and settings stay in the browser.

## How it works

**A grid instead of every pair.** Comparing every point of a long walk with every invader is slow. Invaders are bucketed into a grid of cells about 111 metres wide, so each track point only checks the cells around it.

**Choose first, then order.** Google Maps accepts at most 8 waypoints, so the planner first chooses which invaders to visit: unflashed ones within 80% of the distance budget, nearest first, plus any that cost a detour of less than 150 metres. It then orders them by cheapest insertion and improves the order with 2-opt and Or-opt passes. Walking directions come from OSRM.

**Puzzles from open data.** The hunt generator describes each location with Nominatim, Overpass, Wikidata and Wikipedia, and picks from more than 40 puzzle types. A five-invader hunt takes 30 to 50 seconds the first time and under 2 seconds once the place data is cached.

**Community data, kept in sync.** The invader list comes from a community-maintained dataset and metro stations from OpenStreetMap, each refreshed by a script.

## What I learned

- Real constraints pick the algorithm: an 8-waypoint limit turns "solve the route" into "choose, then order".
- At this size, cheap local search is enough: cheapest insertion plus 2-opt and Or-opt gives good walks.
- A spatial grid turns a quadratic comparison into near-constant lookups, with a few lines of code.
- With free public APIs, rate limits set the pace, so caching and fallbacks matter more than the algorithm.
- Building on community data means owning the sync: the update scripts are part of the product.
