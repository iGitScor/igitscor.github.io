---
title: "Bucket List: sorting any list in the browser"
description: How Bucket List sorts an imported list into themed islands with a 9 MB model distilled for the browser, and upgrades to the full model only when the device can afford it.
---
## The problem

A bucket list is a personal thing, and a long one is hard to read. Sorting it by theme is a job for a language model, but sending the list to a server to get it sorted defeats the point.

Bucket List sets one constraint: the list never leaves the browser. Classification, storage and the story view all run on the device.

## What I built

- **A list-first app**, in French, to filter, explore and track a bucket list. It imports almost anything: JSON, CSV, TSV, Markdown checklists or one item per line. It guesses which column holds the text, the status, the category and the link, and strips markers like `[x]` or ✅.
- **A hidden story view**: a 2D notebook where the list becomes 1 to 8 themed islands, chosen from 14 archetypes, and the sky follows the hour as you scroll through a day from 06:00 to 22:00.
- **A three-tier classifier** that runs in the browser, and the script that distils its middle tier.

## How it works

**Three tiers, cheapest first.** A keyword lexicon answers instantly with no download. A light model shipped with the site, 8.66 MB, answers in milliseconds. The full multilingual-e5-small model, about 140 MB, runs on ONNX and WebAssembly through transformers.js and takes seconds to minutes. Keywords also cover lists that are neither in French nor in English.

**A model distilled for the job.** The light model follows the Model2Vec recipe with multilingual-e5-small as the teacher. It keeps the 30,286 word pieces that cover 99.5% of French and English Wikipedia text, embeds each one, reduces them to 256 dimensions, then fits a linear map back to the teacher's 384. The fit reaches a cosine of 0.903, and the whole run takes about 15 minutes on a laptop CPU.

**Measured, not assumed.** On 757 items the light model never saw during training:

| Tier | Agrees with the full model | Matches the hand-sorted list |
|---|---|---|
| Keywords | 72.0% | 78.2% |
| Light model | 77.5% | 79.5% |
| Full model | — | 86.0% |

**Upgrades only when the device can afford it.** The full model downloads in the background when the browser is idle and online, without Data Saver, on a fast connection, and with more than 400 MB of storage free. Once it is ready, stored lists are sorted again and your own corrections are kept.

**The same result on every device.** A list's id is a SHA-256 of its content and seeds every random choice. Model revisions and runtime versions are pinned, and the full model runs single-threaded on WebAssembly, so two browsers sort the same list the same way. Snapshot tests check it, including files with Windows line endings or a byte-order mark.

**Stored nowhere else.** Lists, corrections and scores live in IndexedDB, in that browser only.

## What I learned

- A progressive design beats a single model: show the cheap answer at once, fetch the heavy model quietly, then upgrade.
- A 9 MB static model came within 6.5 points of the full model on hand-sorted items, and that was enough to make the full model optional.
- In-browser ML needs pinning everywhere: model revision, weights, runtime and thread count, or two devices disagree.
- Hosting limits shape the architecture: the ONNX runtime is larger than the host's 25 MiB per-file limit, so it loads from a CDN.
- Some rules belong in code, not in a model: personal items always go to a locked island, whatever the classifier says.
- Cutting scope is a feature. A first version was a 3D world; the list-first app with a 2D story view replaced it.
