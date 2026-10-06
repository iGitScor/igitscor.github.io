// Renders the share images (1200×630, one per language) from the built home
// page, so their title and slogan are the site's own. Run after `npm run build`
// when the title or slogan changes, then build again to publish the new files.
// usage: node scripts/build-og.mjs
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const port = 4323;
const { name } = JSON.parse(readFileSync(`${root}src/data/resume.en.json`, 'utf8')).basics;

// Everything but the mark, the title line and the slogan is hidden, and the
// slogan is enlarged to fill the card.
const css = `
  .skip-link, .site-nav, .lang-switch, .variant-switch, .hero .lead, .hero .now, .hero .actions,
  main > :not(.hero), .site-footer { display: none !important; }
  html { overflow: hidden; }
  .site-header { position: static; border: 0; background: none; backdrop-filter: none; }
  .site-header .wrap { min-height: 0; max-width: none; padding: 56px 72px 0; }
  .brand { font-size: 30px; gap: 14px; }
  .brand-mark { width: 52px; height: 52px; }
  .hero { padding: 0; }
  .hero .wrap { max-width: none; padding: 64px 72px 0; }
  .hero .eyebrow { font-size: 21px; }
  .hero h1 { max-width: none; margin-top: 26px; font-size: var(--og-size, 104px); }
  body::after {
    content: '${name} · iscor.me';
    position: fixed; left: 72px; bottom: 54px;
    color: var(--muted); font-size: 26px; font-weight: 600;
  }
`;

const server = spawn('node', [`${root}scripts/serve-dist.mjs`, String(port)], { stdio: 'ignore' });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: 'light' });
  for (const [locale, path] of [['en', '/'], ['fr', '/fr/']]) {
    for (let attempt = 0; ; attempt += 1) {
      try {
        await page.goto(`http://localhost:${port}${path}`);
        break;
      } catch (error) {
        if (attempt === 20) throw error;
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    }
    await page.addStyleTag({ content: css });
    // Shrink the slogan until it clears the footer line.
    await page.evaluate(async () => {
      await document.fonts.ready;
      const title = document.querySelector('.hero h1');
      for (let size = 104; size >= 56 && title.getBoundingClientRect().bottom > 500; size -= 4) {
        document.documentElement.style.setProperty('--og-size', `${size}px`);
      }
    });
    await page.screenshot({ path: `${root}public/og.${locale}.png` });
    console.log(`public/og.${locale}.png`);
  }
} finally {
  await browser.close();
  server.kill();
}
