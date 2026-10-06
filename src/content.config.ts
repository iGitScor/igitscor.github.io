import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import publicRepos from './data/public-repos.json';
import { projectSections } from './data/sections';

// Every text shown on a hub page exists in both languages; a missing or empty
// translation fails the build here.
const localized = z.object({ en: z.string().min(1), fr: z.string().min(1) }).strict();

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*.yaml' }),
  schema: ({ image }) =>
    z
      .object({
        name: z.string().min(1),
        section: z.enum(projectSections),
        order: z.number().int(),
        featured: z.boolean().default(false),
        tagline: localized,
        summary: localized,
        /** `live` has a public URL, `source` is code only, `archived` is dated work shown unchanged. */
        status: z.enum(['live', 'source', 'archived']),
        period: z.string().optional(),
        url: z.url().optional(),
        /** `owner/name` on GitHub. Private repositories are never linked. */
        repo: z
          .string()
          .refine((repo) => publicRepos.includes(repo), { message: 'repo is not listed in src/data/public-repos.json' })
          .optional(),
        stack: z.array(z.string()).default([]),
        tags: z.array(z.enum(['ai', 'ml'])).default([]),
        /** What the ML part does; shown in the ML section for entries tagged `ml`. */
        mlNote: localized.optional(),
        cover: image().optional(),
        coverAlt: localized.optional(),
        items: z
          .array(
            z.object({
              name: z.string().min(1),
              blurb: localized,
              url: z.url(),
              cover: image(),
            }),
          )
          .default([]),
      })
      .strict()
      .refine((project) => !project.cover || project.coverAlt, { message: 'cover needs coverAlt' })
      .refine((project) => !project.tags.includes('ml') || project.mlNote, { message: 'the ml tag needs mlNote' })
      .refine((project) => project.url || project.repo, { message: 'a project needs a url or a public repo' }),
});

// Long-form pages about a project, one file per language: `en/<project id>.md`
// and `fr/<project id>.md`. src/lib/case-studies.ts checks that both exist.
const caseStudies = defineCollection({
  loader: glob({ base: './src/content/case-studies', pattern: '{en,fr}/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
});

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

export const collections = { projects, caseStudies, archive };
