# iscor.me

Sebastien Correaud's hub: resume, projects, personal projects, and AI and ML work, in English and French. It also keeps the 2015–2017 blog reachable at its original URLs.

Built with [Astro](https://astro.build) as a static site and served by GitHub Pages at [iscor.me](https://iscor.me).

## Develop

Requires Node 22.12 or later.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type check, build, then verify dist/ (see below)
npm run test:e2e # after a build: accessibility and layout, light and dark, desktop and phone
```

## Content

| What | Where |
|---|---|
| Projects | `src/content/projects/*.yaml`, one file per project, every text in `en` and `fr` |
| Archived posts and articles | `src/content/archive/*.md` |
| Interface strings | `src/i18n/ui.ts` |
| Resume block | `src/data/resume.{en,fr}.json`, refreshed with `npm run sync:resume` from a checkout of the [resume repository](https://github.com/iGitScor/resume) next to this one |

A missing translation fails the build.

## What the build verifies

`scripts/check-dist.mjs` runs at the end of `npm run build` and fails it when:

- a URL listed in `tests/legacy-urls.json` no longer resolves the way GitHub Pages serves it;
- an internal link needs a redirect, or a redirect stub points nowhere;
- a page would shadow one of the project pages served under the same domain (`src/data/reserved-paths.json`);
- a link points to a GitHub repository that is not listed in `src/data/public-repos.json`;
- a hub page lacks its twin in the other language, or ships a script.

## Routes to leave alone

Other repositories of the account are published under `iscor.me/<repository>/`. Never create a top-level page named after one of the entries in `src/data/reserved-paths.json`.

The old blog is unlinked and marked `noindex`, but its URLs must keep working: `/blog/<slug>`, the root-level `/<slug>.html` redirects, the two French articles at the root, `/slides/*.html` and `/feed.xml`.

## Deploy

Pushing to `main` builds and deploys through `.github/workflows/deploy.yml`. The repository's Pages source must be set to "GitHub Actions". After a deploy, `scripts/smoke.sh https://iscor.me` checks the live domain.

## Licence

Code under the [MIT licence](LICENSE). Content available under [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
