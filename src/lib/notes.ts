import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../data/site';
import { getProjects } from './projects';
import { assertTwins, inLocale, slugOf } from './twins';
import { localizePath } from './urls';

export type Note = CollectionEntry<'notes'>;

export interface NoteProps {
  note: Note;
}

async function allNotes(): Promise<Note[]> {
  const [notes, projects] = await Promise.all([getCollection('notes'), getProjects()]);
  assertTwins(notes, 'Note');

  for (const note of inLocale(notes, 'en')) {
    const twin = notes.find(({ id }) => id === `fr/${slugOf(note.id)}`)!;
    // Twins go live together, so a published page always has its translation.
    if (twin.data.draft !== note.data.draft) throw new Error(`Note "${slugOf(note.id)}" is a draft in one language only`);
    if (twin.data.date.valueOf() !== note.data.date.valueOf()) throw new Error(`Note "${slugOf(note.id)}" has two dates`);
  }
  for (const { id, data } of notes) {
    if (data.project && !projects.some((project) => project.id === data.project)) {
      throw new Error(`Note "${id}" names an unknown project "${data.project}"`);
    }
  }

  // Drafts are visible in `npm run dev` only.
  return notes.filter(({ data }) => import.meta.env.DEV || !data.draft);
}

/** Notes in one language, newest first. */
export async function getNotes(locale: Locale): Promise<Note[]> {
  return inLocale(await allNotes(), locale).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function notePaths(locale: Locale) {
  return (await getNotes(locale)).map((note) => ({ params: { slug: slugOf(note.id) }, props: { note } }));
}

export const noteUrl = (note: Note, locale: Locale) => localizePath(`/notes/${slugOf(note.id)}/`, locale);

/** Notes about a project, for its case study. */
export async function notesAbout(projectId: string, locale: Locale): Promise<Note[]> {
  return (await getNotes(locale)).filter(({ data }) => data.project === projectId);
}
