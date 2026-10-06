import { defaultLocale, type Locale } from '../data/site';

/** Hub path for a locale: `/about/` stays as is in English and becomes `/fr/about/` in French. */
export function localizePath(path: string, locale: Locale): string {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}
