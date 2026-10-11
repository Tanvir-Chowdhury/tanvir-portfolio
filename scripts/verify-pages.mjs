import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

// Audit the deployed portfolio, including lazy-loaded scene and asset bundles.
const root = path.resolve('dist');
const base = '/tanvir-portfolio/';
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
const files = await walk(root);
let checked = 0;
async function verify(url, file) {
  if (!url || /^(?:#|data:|blob:|https?:|mailto:|tel:)/.test(url)) return;
  assert(!url.startsWith('/') || url.startsWith(base), `${file}: URL escapes Pages base: ${url}`);
  const clean = decodeURIComponent(url.split(/[?#]/)[0]);
  const target = clean.startsWith(base) ? path.join(root, clean.slice(base.length)) : path.resolve(path.dirname(file), clean);
  assert(target.startsWith(root + '/'), `Asset escapes dist: ${url}`);
  assert((await stat(target).catch(() => null))?.isFile(), `${file}: missing ${url}`);
  checked++;
}
for (const file of files) {
  if (!/\.(html|css|js)$/.test(file)) continue;
  const source = await readFile(file, 'utf8');
  if (/\.(html|css)$/.test(file)) {
    if (file.endsWith('.html')) {
      for (const match of source.matchAll(/(?:src|href)=["']([^"']+)["']/g)) await verify(match[1], file);
    }
    for (const match of source.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)/g)) {
      const url = match[1] ?? match[2] ?? match[3];
      await verify(url, file);
    }
  }
  // Vite's generated JS includes lazy chunks and imported binary assets.
  if (file.endsWith('.js')) {
    for (const match of source.matchAll(/["']((?:\/tanvir-portfolio\/|\.\/|assets\/)[^"']+\.(?:js|css|webp|png|jpg|pdf|woff2?))["']/g)) {
      const url = match[1].startsWith('assets/') ? base + match[1] : match[1];
      await verify(url, file);
    }
    assert(!source.includes('portfolio-backend-s06z'), `Backend dependency in ${file}`);
  }
}
assert(!files.some(f => f.includes('/kage/')), 'The standalone Kage demo must not be deployed');
assert(files.some(f => /three\.module-.*\.js$/.test(f)), 'Missing local Three.js scene runtime');
assert(files.some(f => f.endsWith('.woff2') && f.includes('/assets/')), 'Missing portfolio fonts');
console.log(`Pages audit passed: ${files.length} files; ${checked} asset references; portfolio assets and fonts included.`);
