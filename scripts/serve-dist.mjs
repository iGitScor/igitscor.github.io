// Serves dist/ the way GitHub Pages does, for the browser tests:
// `/x` answers with x.html, a directory without its slash redirects, and
// unknown paths get 404.html.
// usage: node scripts/serve-dist.mjs [port]
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist', import.meta.url));
const port = Number(process.argv[2] ?? 4322);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const isFile = (path) => existsSync(path) && statSync(path).isFile();

createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const target = join(dist, normalize(urlPath));
  if (!target.startsWith(dist)) {
    response.writeHead(403).end();
    return;
  }

  let file;
  let status = 200;
  if (urlPath.endsWith('/')) {
    file = join(target, 'index.html');
  } else if (isFile(target)) {
    file = target;
  } else if (isFile(`${target}.html`)) {
    file = `${target}.html`;
  } else if (isFile(join(target, 'index.html'))) {
    response.writeHead(301, { Location: `${urlPath}/` }).end();
    return;
  }
  if (!file || !isFile(file)) {
    file = join(dist, '404.html');
    status = 404;
  }

  response.writeHead(status, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(response);
}).listen(port, () => console.log(`dist/ served at http://localhost:${port}`));
