# Danish and English content

Danish pages remain at their existing URLs. English pages live under `/en/` and import the corresponding Danish Astro page so layouts, interactions and section IDs stay shared. `routes.ts` defines the language pairs and English URL names.

`en.json` contains reviewed English translations keyed by the normalised Danish text. During prerendering (and in the dev server), `src/middleware.ts` translates English responses using a parsed HTML tree. This is build-time translation: Firebase serves complete English HTML, with no translation service or browser-side content swap. Only text nodes, accessible labels and page metadata are translated; scripts, styles, image URLs, IDs and data attributes are preserved. Internal page links are localised. External links and source media are unchanged.

When changing Danish copy, add its English counterpart to `en.json` in the same change. Missing translations fail the build rather than silently showing Danish on an English page. Proper names and text that is identical in both languages are explicit entries. `data-i18n-skip` is reserved for components that already produce locale-aware content, such as the language selector and English-only media notes.

For a new page, add its pair to `routes.ts` and a small wrapper in `src/pages/en/`. Update the expected page count in `scripts/check-languages.mjs`. Text changed by interactive scripts must also respect `document.documentElement.lang`; see the platform diagram's pause control.

Validation:

- `npm run build` checks translation coverage and produces both languages.
- `npm run check:languages` checks built pages, metadata, reciprocal language links, local assets, navigation language and linked section IDs.
- Check English/Danish switching on desktop and mobile, including keyboard use and preservation of the current section.

The screenshot assets and videos currently show the Danish product. English pages identify these as Danish examples; they do not imply that the product itself has been translated.
