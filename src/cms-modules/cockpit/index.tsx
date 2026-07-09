// Module LOCAL marcm — cockpit business : /admin ne sert PAS à éditer le site.
//
// - defaultRoute : atterrissage direct sur le CRM (#/crm). Appliqué par CmsApp
//   une seule fois au mount, et seulement si le hash initial est '#/'.
// - hidesTabs : masque les onglets d'édition de site du cœur — 'site' (Mon
//   site), 'blog', 'stats' (Mon activité). 'analytics' (Statistiques) est
//   RÉACTIVÉ : share URL Umami dans cms.config → site.umamiShareUrl + CSP
//   admin élargie frame-src https://cloud.umami.is. 'account' (Mon compte)
//   est CONSERVÉ : logout + changement de mot de passe.
// - matchRoute('#/') : hidesTabs masque les ONGLETS, pas les ROUTES. Le logo
//   du header reste un lien href="#/" (HomeScreen = éditeur de site) et
//   defaultRoute ne rejoue qu'au mount → on intercepte la route racine et on
//   redirige vers #/crm. Les routes module sont testées AVANT le switch cœur.
//
// Nom d'export IMPOSÉ par le scaffold (camelCase(basename) + 'Module') :
// './cms-modules/cockpit' → cockpitModule.
import { useEffect } from 'react';
import type { CmsModule } from '@marc/cms-engine';

function RedirectToCrm() {
  useEffect(() => {
    window.location.hash = '#/crm';
  }, []);
  return null;
}

export const cockpitModule: CmsModule = {
  id: 'cockpit',
  defaultRoute: () => '#/crm',
  hidesTabs: () => ['site', 'blog', 'stats'],
  matchRoute(hash) {
    if (hash === '#/') return <RedirectToCrm />;
    return null;
  },
};
