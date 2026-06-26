import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://marcm.fr',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) =>
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
