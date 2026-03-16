import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const LANG = 'fr';
const LOCALE_MAP = { fr: 'fr-FR' };

export default defineConfig({
  site: 'https://marcmuller-site.pages.dev',
  output: 'static',
  compressHTML: true,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: LANG,
        locales: { [LANG]: LOCALE_MAP[LANG] },
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
