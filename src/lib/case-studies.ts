import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, type Locale } from '../data/site';
import { getProjects, type Project } from './projects';
import { localizePath } from './urls';

export interface CaseStudyProps {
  study: CollectionEntry<'caseStudies'>;
  project: Project;
}

/** Entry ids are `<locale>/<project id>`. */
const slugOf = (id: string) => id.slice(id.indexOf('/') + 1);

async function studiesFor(locale: Locale): Promise<Map<string, CaseStudyProps>> {
  const [studies, projects] = await Promise.all([getCollection('caseStudies'), getProjects()]);
  const byLocale = (target: Locale) => studies.filter(({ id }) => id.startsWith(`${target}/`));

  // A case study written in one language only must stop the build.
  for (const target of locales) {
    const other = new Set(byLocale(locales.find((candidate) => candidate !== target)!).map(({ id }) => slugOf(id)));
    for (const { id } of byLocale(target)) {
      if (!other.has(slugOf(id))) throw new Error(`Case study "${id}" has no translation`);
    }
  }

  return new Map(
    byLocale(locale).map((study) => {
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
