/**
 * Cloudflare Pages Middleware — détection de langue + Content Security Policy
 * - Redirige les visiteurs non-francophones vers l'équivalent /en/
 * - Injecte le header CSP (trop long pour le fichier _headers, limité à 2000 chars)
 */
import { CSP_VALUE } from './_csp-value.js';

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
  '/formation': '/en/course',
  '/100-sites-artisans': '/en/100-artisan-websites',
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
  const enTarget = FR_TO_EN[pathname];
  if (enTarget && !pathname.startsWith('/en/')) {
    const acceptLanguage = request.headers.get('Accept-Language') || '';
    const prefersFrench = acceptLanguage
      .split(',')
      .some((lang) => lang.trim().toLowerCase().startsWith('fr'));

    if (!prefersFrench) {
      return Response.redirect(new URL(enTarget, url).toString(), 302);
    }
  }

  // Servir la page avec le header CSP injecté
  const response = await next();
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('Content-Security-Policy', CSP_VALUE);
  return newResponse;
}
