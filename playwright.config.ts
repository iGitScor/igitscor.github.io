import { defineConfig } from '@playwright/test';

const port = 4322;

// The tests run against the built site, served the way GitHub Pages serves it.
// Run `npm run build` first.
export default defineConfig({
  testDir: 'tests',
  outputDir: 'test-results',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: `http://localhost:${port}` },
  webServer: {
    command: `node scripts/serve-dist.mjs ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  },
});
