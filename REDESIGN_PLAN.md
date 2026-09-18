# Well at Work website redesign plan

Date: 2026-09-17
Status: implemented locally; final verification documented in `docs/redesign-validation.md`.

## Objective

Rebuild the website around practical support for employees and leaders, with the connected platform clearly explained. Establish Well at Work as the master brand. Present Atlas Individual and Atlas Teams as products within the platform.

The visitor should quickly understand:

1. Employees receive personalized tracks and leaders receive coaching.
2. APV, individual insight, and team insight provide the context for targeted support.
3. Analytics and reporting help HR and leadership prioritize and follow development.
4. There is a clear way to see the product and arrange a demonstration.

## Working decisions

- Danish is the primary language for this redesign.
- HR and organizational buyers are the primary homepage audience; leaders and employees must recognize their own benefits.
- Lead with wellbeing and leadership development. Explain measurement as the foundation for relevant interventions.
- Use recognizable sector language and original copy informed by the reference sites.
- Keep the whole platform visible while giving coaching and personal tracks the strongest visual prominence.
- Use the existing Astro project and existing routes where practical.
- Deliver and verify the redesign locally at the confirmed Well at Work preview address. Publishing is a separate step.
- Preserve unrelated local work, existing videos, and the cinematic route. Remove obsolete Atlas campaign material from the main visitor journey where it conflicts with the new positioning.

## Phase 1 — Verify the product story and prepare the copy

Read the relevant product screens and supporting material in `/Users/kimmouridsen/WaW/well-at-work-app` and the available APV and leadership material. Treat the app as a reference; this project does not change the app.

Create a compact capability-and-evidence inventory covering:

- APV: what buyers can administer and follow up.
- Atlas Individual: individual insight and how it informs personal tracks.
- Atlas Teams: team insight and how it informs leadership coaching.
- Personalized tracks: concrete examples, duration, activities, and supported personalization.
- Leadership coach: actual interactions, available context, and practical next steps.
- Analytics and reporting: which trends, activities, and outcomes are actually visible.

Distinguish available functionality from planned functionality. Verify personalization and data connections before depicting them. Do not imply that an intervention starts immediately without an assessment if the product requires one.

Inventory customer references, testimonials, research, screenshots, and the existing contact/booking infrastructure. Keep customer evidence separate from founder experience and general research. Use supported privacy wording; distinguish private individual experiences from aggregate organizational views.

Draft the full homepage copy before constructing the sections. Use short, concrete sentences about tasks and benefits. Prefer “personlige forløb”, “coaching”, “konkrete indsatser”, and “opfølgning” in customer copy.

Starting hero draft:

> En samlet platform til trivsel og ledelsesudvikling
>
> Styrk trivslen. Giv jeres ledere støtte til at lykkes.
>
> Giv medarbejderne personlige forløb og lederne en AI-coach med indsigt i deres team. Well at Work samler APV, individ- og teamindsigt, coaching og opfølgning, så I kan sætte målrettet ind og følge udviklingen.
>
> Book en demo · Se platformen

Avoid unsupported comparative claims such as “others stop at measurement”, claims of exclusivity, invented results, and promises of causal impact from trend reporting alone.

Deliverable: homepage copy and a product/evidence inventory that supports every product visual and material claim.

## Phase 2 — Establish the visual system and page composition

Use the app's main `well_colors.dart` and `well_typography.dart` as the reference, noting that older/versioned theme files also exist.

| Element | Direction |
| --- | --- |
| Main canvas | White `#FFFFFF` |
| Brand accent | Plum `#602B49` |
| Primary action | Bronze `#9F5E2B` |
| Support and progress | Green `#3D5138` |
| Secondary surfaces | Very light plum or neutral gray, used selectively |
| Typography | DM Sans, confident headings, readable body weight |
| Layout | Generous spacing, clear alignment, restrained rounded corners |
| Imagery | Readable product details, genuine customer/team photography |

Remove parchment backgrounds, decorative terrain, and map-based storytelling from the redesigned visitor journey. Keep color roles consistent and check contrast before finalizing tokens.

Design the hero with copy on the left and an intervention-focused product composition on the right. Make the leadership coach the largest visual, accompanied by a personal track. Stack the content naturally on mobile without shrinking screenshots into illegible thumbnails.

Use authentic product captures where suitable. If a simplified product illustration communicates better, preserve supported functionality and label sample scenarios. Show a specific coaching exchange and a specific next activity. Avoid making the existing dense organization dashboard the hero image.

Deliverable: implemented design tokens and responsive hero/product composition that establishes the site's visual direction.

## Phase 3 — Rebuild the homepage

| Order | Section | Content and visual treatment |
| --- | --- | --- |
| 1 | Hero | Outcome, concrete product explanation, coach and track visual, two CTAs |
| 2 | Customer proof | Compact verified logo strip and a specific testimonial |
| 3 | Everyday support | Two substantial sections for personal tracks and leadership coaching, with readable product examples |
| 4 | Full platform | All three layers shown together, with interventions visually emphasized |
| 5 | Connected example | One workplace situation carried through support, leadership action, and follow-up |
| 6 | Evidence and trust | Research foundation, customer experience, privacy explanation, links to supporting pages |
| 7 | Closing contact | Clear invitation to see the product and a functioning contact path |

Represent the platform with a simple three-level diagram:

- Top: **Analytics and reporting** — follow development and prioritize the next intervention.
- Middle, emphasized: **Leadership coach and personalized tracks** — concrete support in everyday work.
- Foundation: **APV, Atlas Individual, Atlas Teams** — understand needs across employees, teams, and the workplace.

Introduce interventions before the diagram. The diagram explains the architecture without turning the page into a measurement-first sequence. Make its content readable in a linear mobile layout.

For the connected example, use a team dealing with competing priorities. Show the supported leader interaction, an appropriate employee track, and available aggregate follow-up. Explain how these relate without implying that a manager sees an employee's private results or coaching content. Present the example as illustrative rather than a customer outcome.

Replace the current homepage composition in `src/pages/index.astro`. Rework `Hero`, `Improvement`, `Trust`, and `Contact` as appropriate. Introduce focused platform-overview and scenario components. Stop mounting the map/thesis/redraw/topography sections on the homepage. Retain reusable customer proof and assets after verification.

Deliverable: a complete responsive homepage with final draft copy and product imagery.

## Phase 4 — Align navigation and supporting pages

Navigation: **Platform · Løsninger · Kunder · Forskning · Om os · Book en demo**.

- Platform links to a comprehensive overview with anchors for leadership coaching, personal tracks, APV, Atlas Individual, Atlas Teams, and reporting.
- Løsninger links to the existing HR, leadership, and employee pages.
- Kunder can retain the existing `/resultater` route while its label and framing become more concrete.
- Keep films accessible through relevant product content or the footer when they support the new story. Review their content before promoting them.
- Keep APV easy to find in the Platform menu and overview.

Update the platform page to explain the actual products and their connections. Adjust the introductions, benefit hierarchy, examples, and CTAs on the three audience pages. Align customer, research, and about pages with the new visual system and terminology.

Update `global.css`, `Base.astro`, `Navbar.astro`, and `Footer.astro`. Replace misleading legacy color aliases carefully and inspect every route affected by shared styles. Update page titles, descriptions, and social metadata to reflect Well at Work and the new proposition.

Deliverable: a consistent visitor journey from homepage through product explanation to contact.

## Phase 5 — Complete the contact journey

The existing form in `Contact.astro` posts to `#`; no functioning submission destination is present there.

- Inspect available project configuration for an existing booking or contact service.
- Reuse a configured service if available and appropriate.
- If no service exists, provide a clear email contact path using the existing business address rather than presenting a form that appears to send successfully.
- Any new form service requires its actual destination/configuration before a working form can be delivered; this does not block the rest of the redesign.
- Make every demo CTA reach the correct destination, including CTAs from supporting pages.
- If a form is connected, include real validation, pending, success, and failure states. Check it without sending unsolicited messages.

Deliverable: a truthful, usable demo/contact journey.

## Phase 6 — Verify and deliver the local preview

- Run `npm run build` and address build errors.
- Inspect the homepage and updated routes at desktop, tablet, and mobile sizes, including a narrow 375px viewport.
- Verify that the coach and personal tracks appear before detailed measurement content.
- Check readable product visuals, sensible text wrapping, no horizontal overflow, and stable image layout.
- Check all navigation, product anchors, demo CTAs, and any product-preview controls.
- Check keyboard access, visible focus, mobile navigation behavior, semantic headings, image alternatives, and text/button contrast.
- Respect reduced-motion preferences and avoid animation that delays or hides key content.
- Optimize image assets and avoid loading heavyweight video for the initial page view.
- Confirm the served page title and content identify Well at Work before sharing the local URL.

Deliverable: the running local site, representative desktop/mobile screenshots, and a short account of changes, checks, and any remaining external dependency.

## Completion criteria

- The first screen states the benefit and shows the intervention products.
- Well at Work is the main brand; Atlas product names are used consistently.
- APV, Atlas Individual, Atlas Teams, leadership coaching, personal tracks, and reporting are all discoverable.
- The relationship between the three platform layers is understandable without reading a long explanation.
- White surfaces and app-derived accents replace the dull parchment/terrain identity.
- Product illustrations and claims match the evidence available.
- Supporting pages feel like the same product and reinforce the same positioning.
- The demo/contact path works and the production build passes.

## Reference roles

- AceUp and Cloverleaf: coaching proposition and concrete product use.
- Culture Amp and Workday: platform organization and role-specific business value.
- Woba and Zoios: recognizable HR language and practical examples.
- MMW and naia: ongoing employee support and personal development.

Use these as structural and editorial references, with original Well at Work copy and assets. A visual browser review of the reference sites remains useful during implementation; the initial research covered their published messaging, while browser rendering was unavailable.

## Positioning refinement — 2026-09-18

Adopt the shared-foundation platform figure selected by the user, with raised modules and a subtle feedback arrow. Preserve the intervention-first hero and page order. Introduce learning what helps the person and team as a supporting product direction, not a new dominant narrative. Until outcome-based adaptive selection is verified, distinguish the ambition from available personalization and reporting.
