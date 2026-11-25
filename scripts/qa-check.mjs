import { readdirSync, readFileSync, statSync, existsSync } from 'fs';
import { resolve, relative } from 'path';

const DIST = resolve(process.cwd(), 'dist');

function walkHtml(dir, list = []) {
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    if (statSync(full).isDirectory()) walkHtml(full, list);
    else if (entry.endsWith('.html')) list.push(full);
  }
  return list;
}

const htmlFiles = walkHtml(DIST);
const titles = new Map();
const descriptions = new Map();
const errors = [];
let totalLinksChecked = 0;
let totalImagesChecked = 0;
let totalSchemasChecked = 0;

function routeExistsInDist(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return existsSync(resolve(DIST, 'index.html'));
  const rel = clean.replace(/^\/+/, '');
  return (
    existsSync(resolve(DIST, rel)) ||
    existsSync(resolve(DIST, `${rel}.html`)) ||
    existsSync(resolve(DIST, rel, 'index.html'))
  );
}

for (const file of htmlFiles) {
  const relFile = relative(DIST, file).replace(/\\/g, '/');
  const html = readFileSync(file, 'utf8');

  // 1. Title & Meta Description uniqueness
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) errors.push(`${relFile}: missing <title>`);
  else {
    const t = titleMatch[1].trim();
    if (titles.has(t)) errors.push(`${relFile}: duplicate title with ${titles.get(t)} -> "${t}"`);
    titles.set(t, relFile);
  }

  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (!descMatch) errors.push(`${relFile}: missing meta description`);
  else {
    const d = descMatch[1].trim();
    if (descriptions.has(d)) errors.push(`${relFile}: duplicate meta description with ${descriptions.get(d)}`);
    descriptions.set(d, relFile);
  }

  if (!/<link\s+rel="canonical"\s+href="https:\/\/www\.mvapex\.com\.ng/i.test(html)) {
    errors.push(`${relFile}: missing or invalid canonical URL`);
  }

  if (!/<h1[\s>]/i.test(html)) {
    errors.push(`${relFile}: missing <h1>`);
  }

  // 2. JSON-LD validation
  const schemaMatches = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (schemaMatches.length === 0) errors.push(`${relFile}: missing JSON-LD structured data`);
  for (const m of schemaMatches) {
    totalSchemasChecked++;
    try {
      JSON.parse(m[1]);
    } catch (e) {
      errors.push(`${relFile}: invalid JSON-LD (${e.message})`);
    }
  }

  // 3. Internal link validation
  const hrefMatches = [...html.matchAll(/href="(\/[^"]*)"/gi)];
  for (const m of hrefMatches) {
    const href = m[1];
    if (href.startsWith('/assets/')) continue;
    totalLinksChecked++;
    if (!routeExistsInDist(href)) {
      errors.push(`${relFile}: broken internal link -> ${href}`);
    }
  }

  // 4. Image existence validation
  const imgMatches = [...html.matchAll(/<img[^>]+src="([^"]+)"/gi)];
  for (const m of imgMatches) {
    const src = m[1];
    if (src.startsWith('http')) continue;
    totalImagesChecked++;
    const relImg = src.replace(/^\/+/, '');
    if (!existsSync(resolve(DIST, relImg))) {
      errors.push(`${relFile}: missing image asset -> ${src}`);
    }
  }
}

for (const techFile of ['robots.txt', 'sitemap.xml', 'llms.txt']) {
  if (!existsSync(resolve(DIST, techFile))) {
    errors.push(`Missing technical file in dist/: ${techFile}`);
  }
}

console.log(`QA Audit Summary:`);
console.log(`- HTML pages audited: ${htmlFiles.length}`);
console.log(`- Internal links verified: ${totalLinksChecked}`);
console.log(`- Images verified: ${totalImagesChecked}`);
console.log(`- JSON-LD blocks validated: ${totalSchemasChecked}`);
console.log(`- Errors found: ${errors.length}`);

if (errors.length) {
  console.error('\nErrors:');
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}
