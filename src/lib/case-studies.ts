import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../data/site';
import { getProjects, type Project } from './projects';
import { assertTwins, inLocale, slugOf } from './twins';
import { localizePath } from './urls';

export interface CaseStudyProps {
  study: CollectionEntry<'caseStudies'>;
  project: Project;
}

async function studiesFor(locale: Locale): Promise<Map<string, CaseStudyProps>> {
  const [studies, projects] = await Promise.all([getCollection('caseStudies'), getProjects()]);
  assertTwins(studies, 'Case study');

  return new Map(
    inLocale(studies, locale).map((study) => {
      const slug = slugOf(study.id);
      const project = projects.find(({ id }) => id === slug);
      if (!project) throw new Error(`Case study "${study.id}" matches no project`);
      return [slug, { study, project }];
    }),
  );
}

export async function caseStudyPaths(locale: Locale) {
  return [...(await studiesFor(locale))].map(([slug, props]) => ({ params: { slug }, props }));
}

/** Project id to the URL of its case study, for the cards. */
export async function caseStudyUrls(locale: Locale): Promise<Map<string, string>> {
  return new Map([...(await studiesFor(locale)).keys()].map((slug) => [slug, localizePath(`/projects/${slug}/`, locale)]));
}
