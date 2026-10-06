// Captures the landing screen of each live project as its card cover.
// Run by hand when a project's look changes; the build never calls it.
// usage: node scripts/capture-screenshots.mjs [id ...]
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const targets = {
  'bucket-list': 'https://list.iscor.me',
  'qui-porte': 'https://mental-load.iscor.me',
  invaders: 'https://invaders.iscor.me',
};
const out = fileURLToPath(new URL('../src/assets/projects/', import.meta.url));
const wanted = process.argv.slice(2);

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
  colorScheme: 'light',
  locale: 'en-GB',
});
// Bucket List fetches a large model in the background; a screenshot does not need it.
await context.route(/huggingface\.co|cdn\.jsdelivr\.net/, (route) => route.abort());

for (const [id, url] of Object.entries(targets)) {
  if (wanted.length > 0 && !wanted.includes(id)) continue;
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 }).catch(() => page.waitForTimeout(3_000));
  await page.waitForTimeout(1_500);
  await page.screenshot({ path: `${out}${id}.jpg`, type: 'jpeg', quality: 86 });
  console.log(`${id}: ${await page.title()}`);
  await page.close();
}
await browser.close();
