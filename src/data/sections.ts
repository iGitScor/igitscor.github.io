/** Sections of the Projects page, in display order. Each is an anchor: `/projects/#ai`. */
export const projectSections = ['projects', 'ai', 'personal', 'ml', 'modernised', 'earlier'] as const;
export type ProjectSection = (typeof projectSections)[number];
