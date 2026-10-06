import { getCollection, type CollectionEntry } from 'astro:content';
import { projectSections, type ProjectSection } from '../data/sections';

export type Project = CollectionEntry<'projects'>;

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  const rank = ({ data }: Project) => projectSections.indexOf(data.section) * 100 + data.order;
  return projects.sort((a, b) => rank(a) - rank(b));
}

/** Projects of a section. The ML section also lists every project tagged `ml`. */
export function inSection(projects: Project[], section: ProjectSection): Project[] {
  return projects.filter(
    ({ data }) => data.section === section || (section === 'ml' && data.tags.includes('ml')),
  );
}
