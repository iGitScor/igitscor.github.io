import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const hubPages = ['/', '/projects/', '/projects/myna/', '/projects/kyb-mcp/', '/projects/bucket-list/', '/projects/invaders/', '/projects/remora/', '/notes/', '/notes/distilling-e5/', '/notes/piper-in-the-browser/', '/notes/mcp-beyond-tools/', '/about/'];
const pages = [
  ...hubPages,
  ...hubPages.map((path) => `/fr${path}`),
  '/blog/',
  '/blog/personal-growth-hacking',
  '/blog/how-to-migrate-front-technologies',
  '/angularisation-du-web.html',
  '/404.html',
];
const schemes = ['light', 'dark'] as const;
const widths = { desktop: 1280, phone: 390 };

for (const scheme of schemes) {
  for (const [device, width] of Object.entries(widths)) {
    test.describe(`${scheme}, ${device}`, () => {
      test.use({ colorScheme: scheme, viewport: { width, height: 900 } });

      for (const path of pages) {
        test(path, async ({ page }) => {
          await page.goto(path);

          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
          expect(overflow, 'the page scrolls sideways').toBeLessThanOrEqual(0);

          const { violations } = await new AxeBuilder({ page }).analyze();
          const blocking = violations
            .filter(({ impact }) => impact === 'serious' || impact === 'critical')
            .map(({ id, nodes }) => `${id}: ${nodes.map((node) => node.target.join(' ')).join(' | ')}`);
          expect(blocking, 'accessibility violations').toEqual([]);

          // Kept for a human look at each page in each theme and width.
          const name = path.replace(/^\/|\/$|\.html$/g, '').replace(/\//g, '_') || 'home';
          await page.screenshot({ path: `test-results/screens/${scheme}-${device}/${name}.png`, fullPage: true });
        });
      }
    });
  }
}
