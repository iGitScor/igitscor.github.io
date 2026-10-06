export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const site = {
  name: 'Sebastien Correaud',
  url: 'https://iscor.me',
  resume: {
    en: 'https://cv.iscor.me/',
    fr: 'https://cv.iscor.me/fr/',
  },
  profiles: [
    { name: 'GitHub', url: 'https://github.com/iGitScor' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sebastiencorreaud/' },
  ],
} as const;
