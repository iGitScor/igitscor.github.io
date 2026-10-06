import { getCollection, type CollectionEntry } from 'astro:content';
import type { ProjectSection } from '../data/sections';

export type Project = CollectionEntry<'projects'>;

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** Projects of a section. The ML section also lists every project tagged `ml`. */
export function inSection(projects: Project[], section: ProjectSection): Project[] {
  return projects.filter(
    ({ data }) => data.section === section || (section === 'ml' && data.tags.includes('ml')),
  );
}
