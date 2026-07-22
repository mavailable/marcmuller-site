// src/data/seo.ts — SEO éditable par le client, page par page.
// Source unique : src/content/seo/index.json, écrit par l'écran « SEO » (#/seo)
// du panel /admin. Doctrine : wf-00-cms §7bis.
//
// Les titres sont stockés ENTIERS et rendus tels quels — pas de recomposition
// « titre + séparateur + nom du site ». Le champ « Titre » du panel = exactement
// ce qui s'affiche dans l'onglet du navigateur.
//
// Un champ VIDE retombe sur la valeur passée par la page. Seules les pages
// PROPRES à marcm.fr sont dans le fichier : les articles de journal/blog, les
// rapports Echo (/audit/, /echo/<slug>) et les sites de démo (/exemples/)
// gardent leur SEO dérivé — ils ne sont volontairement pas éditables ici.
// Lecture disque directe : ce projet n'a pas de content collections.
import fs from 'node:fs';
import path from 'node:path';

export interface PageSeo {
  title: string;
  description: string;
  ogImage: string;
  noindex: boolean;
}
export interface SeoGlobal {
  siteName: string;
  separator: string;
  defaultOgImage: string;
}
interface SeoData {
  global?: Partial<SeoGlobal>;
  pages?: Record<string, Partial<PageSeo>>;
}

let cache: SeoData | null | undefined;

function loadSeo(): SeoData | null {
  if (cache !== undefined) return cache;
  try {
    const p = path.join(process.cwd(), 'src', 'content', 'seo', 'index.json');
    cache = JSON.parse(fs.readFileSync(p, 'utf-8')) as SeoData;
  } catch {
    cache = null;
  }
  return cache;
}

/** SEO déclaré pour une route, ou null si la route n'est pas dans seo.json. */
export function getPageSeo(routePath: string): PageSeo | null {
  const data = loadSeo();
  if (!data?.pages) return null;
  const key = routePath === '/' ? '/' : routePath.replace(/\/$/, '');
  const page = data.pages[key];
  if (!page) return null;
  return {
    title: page.title ?? '',
    description: page.description ?? '',
    ogImage: page.ogImage ?? '',
    noindex: page.noindex === true,
  };
}

/** Réglages globaux SEO (image de partage par défaut). */
export function getSeoGlobal(): SeoGlobal | null {
  const data = loadSeo();
  if (!data?.global) return null;
  return {
    siteName: data.global.siteName ?? '',
    separator: data.global.separator ?? '',
    defaultOgImage: data.global.defaultOgImage ?? '',
  };
}
