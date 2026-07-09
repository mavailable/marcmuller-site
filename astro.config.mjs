import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://marcm.fr',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [
    // React : requis par l'island /admin (@marc/cms-engine). Aucun composant
    // React sur le site public — zéro impact sur les pages existantes.
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/merci') &&
        !page.includes('/thank-you') &&
        !page.includes('/graphistes') &&
        !page.includes('/designers') &&
        !page.includes('/supaire') &&
        !page.includes('/audit/') &&
        !page.includes('/echo/') &&
        !page.includes('/aide/') &&
        !page.includes('/en/help/') &&
        !page.includes('/devenir-libre') &&
        !page.includes('/become-free'),
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-FR',
          en: 'en-US',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
});
