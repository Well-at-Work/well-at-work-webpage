# Redesign validation — 2026-09-17

Implemented and available locally at http://127.0.0.1:4322/.

## Scope delivered

- Intervention-led homepage with Well at Work as the main brand.
- App-derived plum, bronze, green, original brand mark, and self-hosted DM Sans on a white canvas.
- Coach and personal-track illustrations, with an expandable real exercise example.
- Three-layer platform overview and product sections for every module.
- Updated HR, leadership, employee, customer, research, about, and film pages.
- Responsive, keyboard-accessible navigation and cross-page product anchors.
- Demo CTAs that explicitly open an email request to the existing business address.
- Original social-preview image, page metadata, and brand favicon.

## Verification

- `npm run build`: passes; all 10 routes built, including the preserved cinematic route.
- `git diff --check`: passes.
- Nine redesigned routes checked in Chromium at 1440px, 768px, and 375px: 27 successful route/viewport checks, no horizontal overflow, failed local assets, or page runtime errors.
- Mobile menu open/close and navigation to the APV section: passes.
- Personal exercise expansion and collapse: passes.
- Keyboard dropdown activation and Escape dismissal: passes.
- Reduced-motion behavior: passes.
- Demo email destination: passes; no email sent.
- Built-page checks: one h1 per redesigned page, valid skip targets, valid internal links and anchor targets, images present with alternative text.
- Core text/foreground contrast ratios: body 15.25:1; secondary text 5.98:1; primary button 5.11:1; plum links 10.83:1; green labels 7.66:1; contact body 8.28:1.
- Desktop and mobile homepage/platform screenshots inspected; corrected an inherited image-width rule that enlarged the coach mark.

## Review artifacts

See `previews/home-first-screen.png`, `previews/home-mobile-first-screen.png`, full desktop/mobile homepage and platform captures, and `previews/checks.json`.

## Notes

- The existing form had no submission backend. The delivered email path works through the visitor's mail application. A hosted booking/form service can be added once its destination is available.
- Coaching conversations are labelled illustrative. Exercise content is based on the app's existing program content. Product references and research sources are recorded in `product-evidence.md`.
- Shared-image metadata uses the configured Firebase project's default origin. Set `PUBLIC_SITE_URL` for a future custom domain build.
- Existing video assets and the separate cinematic route were preserved. The older Atlas-concept video is identified as an earlier introduction.
- Browser-plugin initialization failed in this environment. Local Chromium checks were completed using a temporary Playwright installation outside the project; no project dependencies were added.
- Published to the existing Firebase Hosting site on 2026-09-17: https://wa-w-test-bizrfn.web.app/. Deployment completed successfully; the live homepage was fetched and verified against the local production build.

## Platform figure and learning message — 2026-09-18

- Replaced the separate platform panels with the selected shared-foundation figure, raised product modules, and a subtle reporting-to-intervention feedback arrow. Applied on the homepage and platform page through the shared component.
- Preserved the hero, page order, and prominent coaching/personal-track narrative. Refined the connected example's follow-up step and added a short learning-direction explanation under reporting.
- Outcome-driven automatic adaptation remains unverified; visible copy explicitly presents this as an ambition. See `product-evidence.md`.
- Production build and whitespace validation pass. Browser checks pass for the homepage and platform page at 1440, 768, 375, and 320px, with no horizontal overflow, failed images, or runtime errors; five existing interaction checks pass.
- An older development server served stale component styles. Verified the refreshed preview on port 4323, including an explicit computed-style check. Inspected desktop and mobile figure captures in `previews/learning-platform-1440.png` and `previews/learning-platform-375.png`.
- Published to the existing Firebase site; fetched live homepage matches the production build byte for byte.

## Heading spacing correction — 2026-09-18

- Removed excessive negative tracking from the hero, shared section/page titles, and related product/audience headings. A shared heading spacing token now keeps natural DM Sans spacing; brand wordmarks retain their own styling.
- Build and whitespace checks pass. Verified the production build on six routes at 1440, 868, 375, and 320px: 24 checks pass, loaded font confirmed, normal heading spacing confirmed, and no horizontal overflow.
- Inspected heading screenshots at the reported 868px width and at 375px. Both retain clear word/letter separation and clean wrapping.

## Hero product palette refinement — 2026-09-18

- Preserved the approved left-side hero colors and copy. Replaced the hero preview's lilac/mint combination with a charcoal header, white surfaces, neutral gray conversation/background, and restrained bronze rules and icons.
- Removed decorative diamond/sparkle accents from the hero preview and reduced rounding. Scoped the alternative coach appearance to the hero; supporting-page previews retain their existing appearance.
- Production build and whitespace checks pass. Browser checks at 1440, 954, 868, 375, and 320px confirm no overflow or missing images, preserved headline/button colors, and the new header color. Verified the hero variant does not affect the platform page. Inspected desktop/mobile captures in `previews/hero-refined-954.png` and `previews/hero-refined-375.png`.

## Light product previews — 2026-09-18

- Removed the hero's large gray backdrop and restored a white coach header. Reduced preview shadows to a very light edge shadow.
- Unified all coach and personal-track illustrations with white surfaces, neutral conversation/number backgrounds, plum identity marks, and small bronze accents. Removed mint/lilac outer frames on the homepage, platform page, and audience pages.
- Preserved the platform figure exactly, verified by a before/after SHA-256 check, and preserved the left-side hero palette and narrative.
- Build and whitespace checks pass. Browser checks across four affected routes at 1440, 1080, 375, and 320px pass: 16 route/viewport checks, no horizontal overflow or runtime errors. Exercise expand/collapse passes on desktop and mobile. Inspected the hero, track, and coach captures.


## Platform refinement and publication — 2026-09-18

- Separate intervention cards with individual upward reporting connections.
- Measurement pulses arrive independently in a quiet 42-second cycle, with pause controls and reduced-motion support.
- Layer labels: Måling, Indsats, Læring & rapportering. The top card now leads with “Lær, hvad der virker”.
- Desktop and 390px mobile layouts visually checked; build and whitespace checks passed.
- Published the current production build to https://wa-w-test-bizrfn.web.app/.
