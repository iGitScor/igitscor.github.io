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
| Projects | `src/content/projects/*.yaml`, one file per project, every text in `en` and `fr`. A project whose code sits in a private repository sets `privateSource: true`: its card says so and offers a walkthrough instead of a source link (refused alongside a public `repo`) |
| Case studies | `src/content/case-studies/{en,fr}/<project id>.mdx`, one file per language |
| Notes | `src/content/notes/{en,fr}/<slug>.mdx`, one file per language; `draft: true` (the default) builds them in `npm run dev` only, and both languages go live together |
| Explainers and diagrams | `<Callout>`, `<Flow>`, `<Bars>` and `<TwoOpt>` from `src/components/prose/`, usable in any case study or note without an import; their text is written in each language's file |
| Archived posts and articles | `src/content/archive/*.md` |
| What I'm up to (home page) | `src/data/now.ts`: project ids to link and what I'm learning; change `updated` with the content |
| Interface strings | `src/i18n/ui.ts` |
| Resume block | `src/data/resume.{en,fr}.json`, refreshed with `npm run sync:resume` from a checkout of the [resume repository](https://github.com/iGitScor/resume) next to this one |

A missing translation fails the build.

## Images

Run these by hand when their source changes; the build never calls them.

| Script | What it writes |
|---|---|
| `node scripts/capture-screenshots.mjs` | Project covers in `src/assets/projects/`, captured from the live sites |
| `node scripts/build-icons.mjs` | `favicon.ico` and `apple-touch-icon.png`, from `public/favicon.svg` |
| `node scripts/build-og.mjs` | `public/og.{en,fr}.png`, the share images, from the built home page (build first, then build again) |

## What the build verifies

`scripts/check-dist.mjs` runs at the end of `npm run build` and fails it when:

- a URL listed in `tests/legacy-urls.json` no longer resolves the way GitHub Pages serves it;
- an internal link needs a redirect, or a redirect stub points nowhere;
- a page would shadow one of the project pages served under the same domain (`src/data/reserved-paths.json`);
- a link points to a GitHub repository that is not listed in `src/data/public-repos.json`;
- an image has no width and height;
- a hub page lacks its twin in the other language, or ships an executable script.

## Routes to leave alone

Other repositories of the account are published under `iscor.me/<repository>/`. Never create a top-level page named after one of the entries in `src/data/reserved-paths.json`.

The old blog is unlinked and marked `noindex`, but its URLs must keep working: `/blog/<slug>`, the root-level `/<slug>.html` redirects, the two French articles at the root, `/slides/*.html` and `/feed.xml`.

## Deploy

Pushing to `main` builds and deploys through `.github/workflows/deploy.yml`. The repository's Pages source must be set to "GitHub Actions". After a deploy, `scripts/smoke.sh https://iscor.me` checks the live domain.

## Licence

Code under the [MIT licence](LICENSE). Content available under [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
