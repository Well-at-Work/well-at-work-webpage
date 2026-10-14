# Well at Work website

Static marketing site for [bewellatwork.dk](https://www.bewellatwork.dk), built with Astro and hosted on Firebase Hosting (project `wa-w-test-bizrfn`, which despite the name serves production).

## Develop

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # builds Danish and English pages into dist/
npm run check:languages   # validates built pages, metadata and language pairs
```

Danish pages live in `src/pages/`; English pages under `src/pages/en/` reuse them and are translated at build time from `src/i18n/en.json`. See `src/i18n/README.md`.

## Deploy

```sh
npm run build && npm run check:languages && firebase deploy --only hosting
```

`astro.config.mjs` sets the production `site` URL, which drives canonical, hreflang, Open Graph and sitemap URLs. The sitemap is generated at `/sitemap-index.xml` and referenced from `public/robots.txt`. Cache headers for hashed assets, fonts and media are set in `firebase.json`.

After deploying, confirm `https://www.bewellatwork.dk/sitemap-index.xml` resolves and that Google Search Console has the sitemap submitted.
