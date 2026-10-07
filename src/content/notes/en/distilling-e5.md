---
title: Distilling multilingual-e5 into 9 MB
description: How a 140 MB embedding model became a 9 MB static one for Bucket List, and what that cost in accuracy.
date: 2026-10-07
draft: true
project: bucket-list
---
Bucket List sorts an imported list into themed islands, in the browser. The obvious model for the job is multilingual-e5-small: it understands French and English and produces good sentence embeddings. It is also about 140 MB to download and takes seconds to minutes to run on a phone. Nobody waits that long to see a list.

So the app has three tiers: a keyword lexicon, a light model, and the full e5. This note is about the middle one.

## The recipe

The light model follows Model2Vec. Instead of running a transformer at inference time, you run it once, ahead of time, over a vocabulary, and keep a static vector for each word piece. At inference a sentence is just the weighted mean of its pieces' vectors: a table lookup and an average.

The script, `distill-m2v.py`, does five things:

1. Streams about 6 million tokens per language from French and English Wikipedia.
2. Keeps the word pieces that cover 99.5% of that text, plus every piece of the texts the app itself classifies: 30,286 in all.
3. Embeds each piece with the teacher, multilingual-e5-small at a pinned revision.
4. Reduces the vectors to 256 dimensions with PCA, which keeps 91.0% of the variance, weights rare pieces higher, and stores them as int8.
5. Fits a linear map from those 256 dimensions back to the teacher's 384, on 150,000 snippets per language, so the light model's output lives in the same space as the full model's.

The map fits with a cosine of 0.903. The file is 8.66 MB, small enough to ship with the site. The whole run takes about 15 minutes on a laptop CPU.

## What it costs

A model is only as good as its evaluation. On 757 items the light model never saw:

| Tier | Agrees with the full model | Matches the hand-sorted list |
|---|---|---|
| Keywords | 72.0% | 78.2% |
| Light model | 77.5% | 79.5% |
| Full model | — | 86.0% |

Two readings of the same table. The light model beats keywords, but not by much on hand-sorted labels: 1.3 points. And it sits 6.5 points under the full model. For a first answer that arrives in milliseconds, that is a good trade; for the final answer, it is not, which is why the full model still downloads in the background when the device can afford it.

## What I would tell myself before starting

- **Evaluate against people, not only against the teacher.** Agreement with the full model flatters the student; the hand-sorted column is the one users feel.
- **Keywords are a strong baseline.** On short list items, a good lexicon is within two points of a learned model. Measure it before building anything heavier.
- **Pin the teacher.** The revision hash is part of the model file's name. A silent upstream update would make the student and the full model disagree for no visible reason.
- **Distillation is cheap enough to repeat.** Fifteen minutes on a laptop means trying a different vocabulary size or corpus is an afternoon, not a project.
