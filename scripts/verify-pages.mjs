import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

// Audit the actual output, including the independently authored Kage document.
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
      if (url === "' + c.toDataURL('image/png') + '") continue; // Runtime-generated grain texture.
      await verify(url, file);
    }
  }
  // Vite's generated JS includes lazy chunks and imported binary assets.
  if (file.endsWith('.js') && !file.includes('/kage/')) {
    for (const match of source.matchAll(/["']((?:\/tanvir-portfolio\/|\.\/|assets\/)[^"']+\.(?:js|css|webp|png|jpg|pdf|woff2?))["']/g)) {
      const url = match[1].startsWith('assets/') ? base + match[1] : match[1];
      await verify(url, file);
    }
    assert(!source.includes('portfolio-backend-s06z'), `Backend dependency in ${file}`);
  }
}
assert(files.filter(f => f.endsWith('.webp') && f.includes('/kage/')).length === 14, 'Kage needs all 14 scene images');
assert(files.some(f => f.endsWith('/kage/secret-pathways-assets/three.min.js')), 'Missing Three.js');
assert((await readFile(path.join(root, 'kage/secret-pathways-assets/fonts.css'), 'utf8')).includes('data:font/woff2;base64,'), 'Missing embedded Kage fonts');
assert(files.some(f => f.endsWith('.woff2') && f.includes('/assets/')), 'Missing portfolio fonts');
console.log(`Pages audit passed: ${files.length} files; ${checked} asset references; Kage images, fonts and Three.js included.`);
