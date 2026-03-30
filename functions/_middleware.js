/**
 * Cloudflare Pages Middleware — détection de langue
 * Redirige les visiteurs non-francophones vers /en/ depuis la page d'accueil.
 */
export async function onRequest({ request, next }) {
  const url = new URL(request.url);

  // Uniquement la page d'accueil — laisser passer le reste
  if (url.pathname !== '/') {
    return next();
  }

  const acceptLanguage = request.headers.get('Accept-Language') || '';

  // Vérifie si le français est listé parmi les langues acceptées
  const prefersFrench = acceptLanguage
    .split(',')
    .some((lang) => lang.trim().toLowerCase().startsWith('fr'));

  if (!prefersFrench) {
    return Response.redirect(new URL('/en/', url).toString(), 302);
  }

  return next();
}
