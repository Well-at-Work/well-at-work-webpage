// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Existing Firebase Hosting project; override when using a custom domain.
  site: process.env.PUBLIC_SITE_URL || 'https://wa-w-test-bizrfn.web.app',
  devToolbar: { enabled: false },
});
