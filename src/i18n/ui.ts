import type { Locale } from '../data/site';

const en = {
  'meta.description': 'Sebastien Correaud: resume, projects, personal projects, and AI and ML work.',
  'skip.label': 'Skip to content',
  'nav.label': 'Main',
  'nav.home': 'Home',
  'nav.projects': 'Projects',
  'nav.about': 'About',
  'lang.label': 'Language',

  'hero.title.before': 'I build things to make life ',
  'hero.title.mark': 'easier',
  'hero.title.after': '.',
  'hero.lead': 'This is where my resume, my projects and my experiments live.',
  'hero.cta.work': 'See what I build',
  'hero.cta.about': 'About me',

  'home.featured.eyebrow': 'Selected work',
  'home.featured.title': 'What I am building',
  'home.featured.all': 'All projects',
  'home.explore.eyebrow': 'On this site',
  'home.explore.title': 'Where to start',
  'home.resume.eyebrow': 'Resume',
  'home.resume.more': 'Experience and background',

  'projects.title': 'Projects',
  'projects.lead': 'Products I maintain, things I make for fun, and experiments with AI and machine learning.',
  'section.projects.title': 'Projects',
  'section.projects.lead': 'Products I build and maintain.',
  'section.ai.title': 'AI',
  'section.ai.lead': 'Tools built for AI agents.',
  'section.personal.title': 'Personal projects',
  'section.personal.lead': 'Small apps and games made for fun.',
  'section.ml.title': 'Machine learning',
  'section.ml.lead': 'Where models do the work, most of them running in the browser.',
  'section.modernised.title': 'Modernised',
  'section.modernised.lead': 'Old projects, rebuilt with what I know now.',
  'section.earlier.title': 'Earlier work',
  'section.earlier.lead': 'Dated pieces, shown as they were.',

  'card.visit': 'Visit',
  'card.play': 'Play',
  'card.source': 'Source code',
  'card.details': 'Details',
  'status.source': 'Code only',
  'status.archived': 'Archived',

  'about.title': 'About',
  'about.experience': 'Experience',
  'about.present': 'today',
  'about.resume.title': 'Full resume',
  'about.resume.text': 'Skills, education and the complete history are on the resume site.',
  'about.resume.this': 'Read it in English',
  'about.resume.other': 'Read it in French',
  'about.elsewhere': 'Elsewhere',

  'notfound.title': 'Page not found',
  'notfound.text': 'This page does not exist, or it has moved.',
  'notfound.home': 'Go to the home page',

  'archive.label': 'Archive',
  'archive.published': 'Published in',
  'archive.note': 'Kept as it was published; it may be out of date.',
  'archive.back': 'Back to the home page',
  'archive.index.title': 'Archive',
  'archive.index.lead': 'Posts and articles written between 2015 and 2017, kept as they were published.',
} as const;

export type UiKey = keyof typeof en;

const fr: Record<UiKey, string> = {
  'meta.description': 'Sebastien Correaud : CV, projets, projets personnels, et travaux en IA et en ML.',
  'skip.label': 'Aller au contenu',
  'nav.label': 'Principale',
  'nav.home': 'Accueil',
  'nav.projects': 'Projets',
  'nav.about': 'À propos',
  'lang.label': 'Langue',

  'hero.title.before': 'Je construis des outils qui rendent la vie plus ',
  'hero.title.mark': 'simple',
  'hero.title.after': '.',
  'hero.lead': 'Vous trouverez ici mon CV, mes projets et mes expérimentations.',
  'hero.cta.work': 'Voir ce que je construis',
  'hero.cta.about': 'À propos de moi',

  'home.featured.eyebrow': 'Sélection',
  'home.featured.title': 'Ce que je construis',
  'home.featured.all': 'Tous les projets',
  'home.explore.eyebrow': 'Sur ce site',
  'home.explore.title': 'Par où commencer',
  'home.resume.eyebrow': 'CV',
  'home.resume.more': 'Expérience et parcours',

  'projects.title': 'Projets',
  'projects.lead':
    'Les produits que je maintiens, ce que je fabrique pour le plaisir, et mes expérimentations en IA et en machine learning.',
  'section.projects.title': 'Projets',
  'section.projects.lead': 'Les produits que je conçois et maintiens.',
  'section.ai.title': 'IA',
  'section.ai.lead': 'Des outils conçus pour les agents IA.',
  'section.personal.title': 'Projets personnels',
  'section.personal.lead': 'De petites applications et des jeux faits pour le plaisir.',
  'section.ml.title': 'Machine learning',
  'section.ml.lead': 'Là où des modèles font le travail, le plus souvent dans le navigateur.',
  'section.modernised.title': 'Modernisés',
  'section.modernised.lead': 'D’anciens projets, reconstruits avec ce que je sais aujourd’hui.',
  'section.earlier.title': 'Travaux plus anciens',
  'section.earlier.lead': 'Des réalisations datées, montrées telles quelles.',

  'card.visit': 'Visiter',
  'card.play': 'Jouer',
  'card.source': 'Code source',
  'card.details': 'Détails',
  'status.source': 'Code uniquement',
  'status.archived': 'Archivé',

  'about.title': 'À propos',
  'about.experience': 'Expérience',
  'about.present': 'aujourd’hui',
  'about.resume.title': 'CV complet',
  'about.resume.text': 'Les compétences, la formation et le parcours complet sont sur le site du CV.',
  'about.resume.this': 'Le lire en français',
  'about.resume.other': 'Le lire en anglais',
  'about.elsewhere': 'Ailleurs',

  'notfound.title': 'Page introuvable',
  'notfound.text': 'Cette page n’existe pas, ou elle a été déplacée.',
  'notfound.home': 'Aller à l’accueil',

  'archive.label': 'Archive',
  'archive.published': 'Publié en',
  'archive.note': 'Conservé tel que publié ; il peut être dépassé.',
  'archive.back': 'Retour à l’accueil',
  'archive.index.title': 'Archives',
  'archive.index.lead': 'Billets et articles écrits entre 2015 et 2017, conservés tels que publiés.',
};

const ui: Record<Locale, Record<UiKey, string>> = { en, fr };

// A string left empty must stop the build, not ship a blank label.
for (const [locale, strings] of Object.entries(ui)) {
  for (const [key, value] of Object.entries(strings)) {
    if (value.trim() === '') throw new Error(`Empty UI string "${key}" for locale "${locale}"`);
  }
}

export function useTranslations(locale: Locale) {
  return (key: UiKey): string => ui[locale][key];
}
