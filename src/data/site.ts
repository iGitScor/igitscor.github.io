export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const site = {
  name: 'Sébastien Correaud',
  url: 'https://iscor.me',
  // The resume site has no HTTPS certificate yet; switch to https:// once it does.
  resume: {
    en: 'http://cv.iscor.me/',
    fr: 'http://cv.iscor.me/fr/',
  },
  profiles: [
    { name: 'GitHub', url: 'https://github.com/iGitScor' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sebastiencorreaud/' },
  ],
} as const;
