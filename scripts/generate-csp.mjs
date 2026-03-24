/**
 * Post-build script: generates _headers with CSP hash-based script-src
 *
 * Scans all HTML files in dist/, extracts inline <script> content
 * (excluding type="application/ld+json"), computes SHA-256 hashes,
 * and writes the _headers file with proper CSP directives.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const DIST_DIR = 'dist';

// Recursively find all HTML files
async function findHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Extract inline script contents from HTML (exclude ld+json and scripts with src)
function extractInlineScripts(html) {
  const scripts = [];
  // Match <script> or <script type="module"> but NOT <script type="application/ld+json"> or <script ... src="...">
  const regex = /<script(?:\s+type="module")?(?:\s[^>]*)?>([^]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const tag = match[0];
    // Skip JSON-LD scripts
    if (tag.includes('type="application/ld+json"')) continue;
    // Skip scripts with src attribute (external scripts)
    if (/\bsrc\s*=/.test(tag.split('>')[0])) continue;
    const content = match[1].trim();
    if (content) {
      scripts.push(content);
    }
  }
  return scripts;
}

// Compute SHA-256 hash in CSP format
function computeHash(content) {
  const hash = createHash('sha256').update(content, 'utf-8').digest('base64');
  return `'sha256-${hash}'`;
}

async function main() {
  console.log('Scanning HTML files for inline scripts...');

  const htmlFiles = await findHtmlFiles(DIST_DIR);
  const hashSet = new Set();

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf-8');
    const scripts = extractInlineScripts(html);
    for (const script of scripts) {
      const hash = computeHash(script);
      hashSet.add(hash);
    }
  }

  const hashes = [...hashSet];
  console.log(`Found ${hashes.length} unique inline script hash(es):`);
  hashes.forEach(h => console.log(`  ${h}`));

  // Build script-src with 'self' + hashes (no unsafe-inline)
  const scriptSrc = ["'self'", ...hashes].join(' ');

  const headers = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=()
  Content-Security-Policy: default-src 'none'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://api.web3forms.com https://cloud.umami.is https://api-gateway.umami.dev; form-action 'self' https://api.web3forms.com; frame-ancestors 'none'; base-uri 'self'; manifest-src 'self'

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/favicon.svg
  Cache-Control: public, max-age=86400

/og-*.png
  Cache-Control: public, max-age=604800
`;

  await writeFile(join(DIST_DIR, '_headers'), headers);
  console.log('Generated dist/_headers with CSP hashes');
}

main().catch(err => {
  console.error('Error generating CSP:', err);
  process.exit(1);
});
