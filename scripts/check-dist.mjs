// Checks the built site against the promises the hub makes: legacy URLs keep
// resolving the way GitHub Pages serves them, internal links are direct,
// reserved project-page paths stay free, and hub pages stay bilingual.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));

const legacyUrls = readJson('tests/legacy-urls.json');
const reservedPaths = readJson('src/data/reserved-paths.json');
const publicRepos = new Set(readJson('src/data/public-repos.json').map((repo) => repo.toLowerCase()));
// SHA-256 of lower-cased terms that must never appear on the site; kept as
// hashes so the terms themselves are not committed.
const forbiddenHashes = new Set([
  '254e38932fdb9fc27f82aac2a5cc6d789664832383e3cf3298f8c120812712db',
  '8cc4fb72ea7462391138bb8e03789d254d81bebe6af7e7bc033c37c263dfb127',
  'b1c3c9e836f4018c020e42016a4fc903c509cc9ca7b7bc7e468b1df05ab71d6b',
]);

if (!existsSync(dist)) {
  console.error('check-dist: dist/ not found, run the build first');
  process.exit(1);
}

const isFile = (path) => existsSync(path) && statSync(path).isFile();

/** How GitHub Pages answers a path, given the files in dist/. */
function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  const target = join(dist, clean);
  if (clean.endsWith('/')) return isFile(join(target, 'index.html')) ? 200 : 404;
  if (isFile(target)) return 200;
  if (isFile(`${target}.html`)) return 200;
  if (isFile(join(target, 'index.html'))) return 301;
  return 404;
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );
}

/** Public URL of a built HTML file: `blog/x.html` is `/blog/x`, `about/index.html` is `/about/`. */
function urlOf(file) {
  const path = `/${relative(dist, file).split(sep).join('/')}`;
  return path.endsWith('/index.html') ? path.slice(0, -'index.html'.length) : path.replace(/\.html$/, '');
}

const failures = [];
const pending = [];
const fail = (message) => failures.push(message);

// 1. Legacy URLs
for (const { path, status, pending: isPending } of legacyUrls) {
  const actual = resolve(path);
  if (actual === status) {
    if (isPending) fail(`${path} now resolves: remove "pending" from tests/legacy-urls.json`);
  } else if (isPending) {
    pending.push(path);
  } else {
    fail(`legacy URL ${path}: expected ${status}, got ${actual}`);
  }
}

// 2. Reserved project-page paths
for (const name of readdirSync(dist)) {
  const base = name.replace(/\.html$/, '');
  if (reservedPaths.includes(base)) fail(`dist/${name} shadows the project page served at /${base}/`);
}

const pages = walk(dist)
  .filter((file) => file.endsWith('.html'))
  .map((file) => ({ file, url: urlOf(file), html: readFileSync(file, 'utf8') }));

for (const { url, html } of pages) {
  // 3. Redirect stubs point at something that exists
  const refresh = html.match(/http-equiv="refresh" content="0; url=([^"]+)"/);
  if (refresh && resolve(refresh[1]) !== 200) fail(`${url}: redirect target ${refresh[1]} does not resolve`);

  // 4. Internal links resolve directly, never through a trailing-slash redirect
  for (const [, attribute, value] of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value) || value === '') continue;
    const target = new URL(value, `https://iscor.me${url}`).pathname;
    const status = resolve(target);
    if (status !== 200) fail(`${url}: ${attribute}="${value}" resolves to ${status}`);
  }

  // 5. Only public repositories are linked
  for (const [, repo] of html.matchAll(/github\.com\/(iGitScor\/[\w.-]+)/gi)) {
    if (!publicRepos.has(repo.toLowerCase())) fail(`${url}: links to ${repo}, which is not in public-repos.json`);
  }

  // 6. Forbidden terms
  const words = html
    .replace(/<[^>]*>/g, ' ')
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
  for (let size = 1; size <= 3; size += 1) {
    for (let index = 0; index + size <= words.length; index += 1) {
      const hash = createHash('sha256').update(words.slice(index, index + size).join(' ')).digest('hex');
      if (forbiddenHashes.has(hash)) fail(`${url}: contains a forbidden term (word ${index + 1})`);
    }
  }
}

// 7. Hub pages: no script, and each has its twin in the other language
const hubPages = pages.filter(({ html }) => /<link rel="alternate" hreflang=/.test(html));
const hubUrls = new Set(hubPages.map(({ url }) => url));
for (const { url, html } of hubPages) {
  if (/<script\b/i.test(html)) fail(`${url}: hub pages must not ship a <script>`);
  const twin = url.startsWith('/fr/') ? url.slice('/fr'.length) : `/fr${url}`;
  if (!hubUrls.has(twin)) fail(`${url}: missing twin page ${twin}`);
  for (const target of [url, twin]) {
    if (!html.includes(`href="https://iscor.me${target}"`)) fail(`${url}: no hreflang link to ${target}`);
  }
}

if (pending.length > 0) {
  console.log(`check-dist: ${pending.length} legacy URL(s) still pending migration`);
  for (const path of pending) console.log(`  pending ${path}`);
}
if (failures.length > 0) {
  console.error(`check-dist: ${failures.length} failure(s)`);
  for (const message of failures) console.error(`  ${message}`);
  process.exit(1);
}
console.log(`check-dist: ${pages.length} pages, ${legacyUrls.length - pending.length} legacy URLs verified`);
