import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Old posts and articles, kept at their original URLs. `entry.id` is the slug.
const archive = defineCollection({
  loader: glob({ base: './src/content/archive', pattern: '*.md' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    lang: z.enum(['en', 'fr']),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    kind: z.enum(['post', 'article']),
    /** Canonical legacy path, for example `/blog/<slug>` or `/<slug>.html`. */
    permalink: z.string().regex(/^\/[a-z0-9/-]+(\.html)?$/),
    /** Older root-level paths that redirect to `permalink`. */
    redirectFrom: z.array(z.string().regex(/^\/[a-z0-9-]+\.html$/)).default([]),
    type: z.string().optional(),
    tagline: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { archive };
