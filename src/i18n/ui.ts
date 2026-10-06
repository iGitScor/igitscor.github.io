import type { Locale } from '../data/site';

const en = {
  'meta.description':
    'Sébastien Correaud, staff engineer: resume, projects, personal projects, and AI and ML work.',
  'nav.home': 'Home',
  'lang.label': 'Language',
  'hero.eyebrow': 'Staff Engineer',
  'hero.title.before': 'I build things to make life ',
  'hero.title.mark': 'easier',
  'hero.title.after': '.',
  'hero.lead':
    'Staff engineer with a background in data analysis. This is where my resume, my projects and my experiments live.',
  'hero.cta.work': 'See what I build',
  'hero.cta.resume': 'Read my resume',
  'work.eyebrow': 'On this site',
  'work.title': 'Five places to start',
  'work.resume.title': 'Resume',
  'work.resume.text': 'Experience and skills, in English and French.',
  'work.resume.more': 'cv.iscor.me',
  'work.projects.title': 'Projects',
  'work.projects.text': 'Products I build and maintain, such as Myna.',
  'work.personal.title': 'Personal projects',
  'work.personal.text': 'Small apps and games made for fun.',
  'work.ai.title': 'AI',
  'work.ai.text': 'Tools for AI agents, such as a KYB workbench served over MCP.',
  'work.ml.title': 'ML and modernised',
  'work.ml.text': 'Models that run in the browser, and old projects rebuilt.',
  'work.soon': 'Coming soon',
  'footer.rights': 'Sébastien Correaud',
} as const;

type Key = keyof typeof en;

const fr: Record<Key, string> = {
  'meta.description':
    'Sébastien Correaud, staff engineer : CV, projets, projets personnels, et travaux en IA et en ML.',
  'nav.home': 'Accueil',
  'lang.label': 'Langue',
  'hero.eyebrow': 'Staff Engineer',
  'hero.title.before': 'Je construis des outils qui rendent la vie plus ',
  'hero.title.mark': 'simple',
  'hero.title.after': '.',
  'hero.lead':
    'Staff engineer, avec une solide expérience en analyse de données. Vous trouverez ici mon CV, mes projets et mes expérimentations.',
  'hero.cta.work': 'Voir ce que je construis',
  'hero.cta.resume': 'Lire mon CV',
  'work.eyebrow': 'Sur ce site',
  'work.title': 'Cinq points d’entrée',
  'work.resume.title': 'CV',
  'work.resume.text': 'Expérience et compétences, en français et en anglais.',
  'work.resume.more': 'cv.iscor.me',
  'work.projects.title': 'Projets',
  'work.projects.text': 'Les produits que je conçois et maintiens, comme Myna.',
  'work.personal.title': 'Projets personnels',
  'work.personal.text': 'De petites applications et des jeux faits pour le plaisir.',
  'work.ai.title': 'IA',
  'work.ai.text': 'Des outils pour agents IA, comme un atelier KYB exposé via MCP.',
  'work.ml.title': 'ML et projets modernisés',
  'work.ml.text': 'Des modèles qui tournent dans le navigateur, et d’anciens projets reconstruits.',
  'work.soon': 'Bientôt',
  'footer.rights': 'Sébastien Correaud',
};

const ui: Record<Locale, Record<Key, string>> = { en, fr };

// A French string left empty must stop the build, not ship a blank label.
for (const [locale, strings] of Object.entries(ui)) {
  for (const [key, value] of Object.entries(strings)) {
    if (value.trim() === '') throw new Error(`Empty UI string "${key}" for locale "${locale}"`);
  }
}

export function useTranslations(locale: Locale) {
  return (key: Key): string => ui[locale][key];
}
