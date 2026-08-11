/**
 * Cloudflare Pages Middleware — détection de langue + Content Security Policy
 * - Redirige les visiteurs non-francophones vers l'équivalent /en/
 * - Injecte le header CSP (trop long pour le fichier _headers, limité à 2000 chars)
 */
// Import namespace (pas d'import nommé direct) : si un _csp-value.js périmé
// (généré avant l'ajout du cockpit /admin) ne contient pas CSP_ADMIN_VALUE,
// on retombe sur la CSP publique au lieu de casser le bundle des functions.
import * as csp from './_csp-value.js';

const CSP_VALUE = csp.CSP_VALUE;
const CSP_ADMIN_VALUE = csp.CSP_ADMIN_VALUE || csp.CSP_VALUE;

// Table de correspondance FR → EN (pages ayant un équivalent traduit)
const FR_TO_EN = {
  '/': '/en/',
  '/contact': '/en/contact',
  '/qui-suis-je': '/en/about',
  '/realisations': '/en/portfolio',
  '/offre': '/en/services',
  '/mentions-legales': '/en/legal-notice',
  '/politique-confidentialite': '/en/privacy-policy',
  '/merci': '/en/thank-you',
  // NB : la page EN de formation est /en/training. L'ancien slug /en/course a ete
  // renomme en /en/become-free le 26/06/2026 (79acf3b, parodie 1er avril deplacee),
  // et la vraie page formation EN creee sous /en/training (5b2c99d). Ne jamais
  // repointer vers /en/course (404) ni vers /en/become-free (page parodie noindex).
  '/formation': '/en/training',
  '/graphistes': '/en/designers',
  // Pages ville
  '/creation-site-web-metz': '/en/web-design-metz',
  '/creation-site-web-nancy': '/en/web-design-nancy',
  '/creation-site-web-strasbourg': '/en/web-design-strasbourg',
  // Blog
  '/journal': '/en/blog',
  '/journal/3-actions-gratuites-visibilite': '/en/blog/3-free-actions-visibility',
  '/journal/5-erreurs-site-web-artisan': '/en/blog/5-website-mistakes-craftspeople',
  '/journal/avis-google-artisans': '/en/blog/google-reviews-craftspeople',
  '/journal/bouche-a-oreille-ne-suffit-plus': '/en/blog/word-of-mouth-not-enough',
  '/journal/combien-coute-un-site-web': '/en/blog/how-much-does-a-website-cost',
  '/journal/echo-outil-audit-visiteurs': '/en/blog/echo-website-visitor-audit-tool',
  '/journal/faut-il-un-blog': '/en/blog/do-you-need-a-blog',
  '/journal/mobile-clients-telephone': '/en/blog/mobile-7-out-of-10-clients',
  '/journal/photos-chantier-argument-commercial': '/en/blog/worksite-photos-best-sales-tool',
  '/journal/pourquoi-votre-site-est-lent': '/en/blog/why-your-website-is-slow',
  '/journal/seo-local-artisans': '/en/blog/local-seo-craftspeople',
};

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/$/, '') || '/';

  // Redirection langue : visiteurs non-francophones → /en/
  // Skip si le visiteur a explicitement choisi une langue (cookie)
  const cookies = request.headers.get('Cookie') || '';
  const prefersLangFR = cookies.includes('lang=fr');
  const prefersLangEN = cookies.includes('lang=en');

  const enTarget = FR_TO_EN[pathname];
  if (enTarget && !pathname.startsWith('/en/') && !prefersLangFR) {
    // Cible avec slash final (trailingSlash: 'always') : evite le hop 302 -> 308
    const enUrl = new URL(enTarget.endsWith('/') ? enTarget : `${enTarget}/`, url).toString();

    // Si l'utilisateur a explicitement choisi EN via le toggle, rediriger
    if (prefersLangEN) {
      return Response.redirect(enUrl, 302);
    }

    // Crawlers : JAMAIS de redirection langue. Googlebot crawle sans Accept-Language,
    // le rediriger sert l'EN sur les URLs FR (cannibalisation constatee juil. 2026,
    // audit-marketing-2026-07.md D15). Les bots decouvrent /en/ via les hreflang.
    const ua = request.headers.get('User-Agent') || '';
    const isBot = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|lighthouse/i.test(ua);

    // Sinon, détecter la langue du navigateur
    const acceptLanguage = request.headers.get('Accept-Language') || '';
    const prefersFrench = acceptLanguage
      .split(',')
      .some((lang) => lang.trim().toLowerCase().startsWith('fr'));

    if (!isBot && !prefersFrench) {
      return Response.redirect(enUrl, 302);
    }
  }

  // Servir la page avec les headers de sécurité.
  // /admin (cockpit CMS) : CSP dédiée relâchée (island React, previews blob:)
  // + noindex dur. La CSP stricte du site public reste inchangée partout ailleurs.
  // NB : pathname est déjà normalisé sans slash final ('/admin/' → '/admin').
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');
  const response = await next();
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('Content-Security-Policy', isAdmin ? CSP_ADMIN_VALUE : CSP_VALUE);
  newResponse.headers.set('X-Content-Type-Options', 'nosniff');
  newResponse.headers.set('X-Frame-Options', 'DENY');
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newResponse.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (isAdmin) newResponse.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return newResponse;
}
