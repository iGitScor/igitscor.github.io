import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The archive stays reachable at its old URLs but is kept out of the sitemap.
const hubPaths = new Set(['/', '/projects', '/about', '/fr', '/fr/projects', '/fr/about']);
const isHubUrl = (page) => hubPaths.has(new URL(page).pathname.replace(/(.)\/$/, '$1'));
// GitHub Pages answers /fr with a redirect, so the sitemap lists /fr/.
const withSlash = (url) => url.replace(/([^/])$/, '$1/');

export default defineConfig({
  site: 'https://iscor.me',
  output: 'static',
  trailingSlash: 'ignore',
  // 'preserve' emits blog/<slug>.html and about/index.html side by side,
  // which is what the legacy URLs need on GitHub Pages.
  build: { format: 'preserve' },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: isHubUrl,
      serialize: (item) => ({
        ...item,
        url: withSlash(item.url),
        links: item.links?.map((link) => ({ ...link, url: withSlash(link.url) })),
      }),
      i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } },
    }),
  ],
});
