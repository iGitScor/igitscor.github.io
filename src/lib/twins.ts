import { locales, type Locale } from '../data/site';

/** Entry ids of a per-language collection are `<locale>/<slug>`. */
export const slugOf = (id: string) => id.slice(id.indexOf('/') + 1);

export const inLocale = <T extends { id: string }>(entries: T[], locale: Locale) =>
  entries.filter(({ id }) => id.startsWith(`${locale}/`));

/** Stops the build when an entry is written in one language only. */
export function assertTwins(entries: { id: string }[], kind: string) {
  for (const target of locales) {
    const other = locales.find((candidate) => candidate !== target)!;
    const slugs = new Set(inLocale(entries, other).map(({ id }) => slugOf(id)));
    for (const { id } of inLocale(entries, target)) {
      if (!slugs.has(slugOf(id))) throw new Error(`${kind} "${id}" has no translation`);
    }
  }
}
