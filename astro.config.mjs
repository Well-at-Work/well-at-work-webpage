// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Production domain. Firebase Hosting serves the same build on wa-w-test-bizrfn.web.app, so
  // canonical, hreflang and Open Graph URLs must always point at the custom domain.
  site: process.env.PUBLIC_SITE_URL || 'https://www.bewellatwork.dk',
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      // The cinematic prototype is noindexed and the 404 page is not a destination.
      filter: page => !/\/(cinematic|404)$/.test(page),
    }),
  ],
});
