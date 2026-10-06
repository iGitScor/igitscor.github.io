import { z } from 'astro/zod';
import type { Locale } from '../data/site';
import en from '../data/resume.en.json';
import fr from '../data/resume.fr.json';

const schema = z.object({
  basics: z.object({
    name: z.string().min(1),
    label: z.string().min(1),
    summary: z.string().min(1),
    profiles: z.array(z.object({ network: z.string(), url: z.string() })),
  }),
  work: z.array(
    z.object({
      name: z.string().nullable(),
      position: z.string().min(1),
      startDate: z.string().min(4),
      endDate: z.string().nullable(),
      location: z.string().nullable(),
      summary: z.string().nullable(),
    }),
  ),
});

export type Resume = z.infer<typeof schema>;

const resumes: Record<Locale, Resume> = { en: schema.parse(en), fr: schema.parse(fr) };

// The two files are edited by hand in the resume repository; a position added
// to one language only must stop the build.
if (resumes.en.work.length !== resumes.fr.work.length) {
  throw new Error('Resume snapshots differ: en and fr do not list the same number of positions');
}

export function getResume(locale: Locale): Resume {
  return resumes[locale];
}

/** `2025-01` and `2010-06-20` both display as their year. */
export function yearOf(date: string): string {
  return date.slice(0, 4);
}
