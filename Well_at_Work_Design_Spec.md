# Well at Work — Design Specification for Cursor Build

---

## COLOR PALETTE (extracted from current bewellatwork.dk)

### Primary Colors

```
--navy:           #2f2f55;   /* Primary text color — headings, body, large numbers */
--navy-dark:      #2d2e5a;   /* CTA buttons, strong emphasis */
--steel-blue:     #7f96cc;   /* Section backgrounds (stats, differentiators, testimonial cards) */
--warm-beige:     #ebe6e2;   /* Page background, alternating sections */
--white:          #ffffff;   /* Clean section backgrounds */
```

### Secondary / Accent Colors

```
--forest-green:   #404f3c;   /* Card heading text (stakeholder section) */
--blush:          #fff3f3;   /* Card backgrounds (subtle warm pink-white) */
--lavender:       #b0a9b9;   /* Accent bars, decorative elements, dividers */
--plum:           #5c3048;   /* Logo brand mark — deep mauve/plum */
--plum-light:     #ffe9f1;   /* Logo icon halo / light accent from brand mark */
```

### Utility

```
--text-on-blue:   #f0f0f8;   /* White text on steel-blue backgrounds */
--text-muted:     #6b6b7f;   /* Captions, sources, secondary text */
--border-light:   #d9d4cf;   /* Subtle borders on beige backgrounds */
```

### Summary Swatch

| Role | Hex | Usage |
|------|-----|-------|
| Navy | #2f2f55 | Headlines, body text, numbers |
| Navy Dark | #2d2e5a | CTA buttons, hover states |
| Steel Blue | #7f96cc | Accent section backgrounds |
| Warm Beige | #ebe6e2 | Page background, alternating sections |
| White | #ffffff | Clean sections |
| Forest Green | #404f3c | Card headings |
| Blush | #fff3f3 | Card backgrounds |
| Lavender | #b0a9b9 | Decorative bars, dividers |
| Plum | #5c3048 | Brand accent (sparingly) |

---

## TYPOGRAPHY

The current site uses a serif-forward approach for headings. Recommendations:

```
--font-heading:   'DM Serif Display', 'Georgia', serif;
--font-body:      'Inter', 'Helvetica Neue', sans-serif;
--font-mono:      'JetBrains Mono', monospace;  /* for stats/numbers if desired */
```

Alternatively, keep it cleaner with one sans-serif family:

```
--font-heading:   'Inter', sans-serif;  /* weight 600-700 */
--font-body:      'Inter', sans-serif;  /* weight 400-500 */
```

### Size Scale

```
--text-hero:      clamp(2.5rem, 5vw, 4rem);      /* Hero headline */
--text-h1:        clamp(2rem, 4vw, 3rem);          /* Section headlines */
--text-h2:        clamp(1.5rem, 3vw, 2rem);        /* Sub-headlines */
--text-h3:        clamp(1.1rem, 2vw, 1.4rem);      /* Card titles */
--text-body:      1rem / 1.1rem;                    /* Body text */
--text-small:     0.875rem;                         /* Captions, sources */
--text-stat:      clamp(3rem, 6vw, 5rem);           /* Large stat numbers */
```

---

## LAYOUT PRINCIPLES

### Spacing

```
--section-padding:    clamp(4rem, 8vw, 8rem) 0;
--container-max:      1200px;
--container-padding:  clamp(1rem, 4vw, 2rem);
--card-gap:           2rem;
--element-gap:        1.5rem;
```

### Section Rhythm

Alternate backgrounds to create visual rhythm without hard borders:

```
Section 1 (Hero):       --warm-beige background
Section 2 (Problem):    --white background
Section 3 (Cost):       --warm-beige background
Section 4 (Approach):   --white background
Section 5 (Audiences):  --warm-beige background
Section 6 (Proof):      --white background
Section 7 (Contact):    --navy-dark background, white text
```

Do NOT use the steel-blue (#7f96cc) as a full section background the way the current site does — the low contrast with white text is the site's biggest readability problem. Instead, use steel-blue for:
- Card backgrounds (with navy text)
- Accent elements (tags, badges, small blocks)
- Decorative borders or top-bars on cards
- Hover states

### Grid

Three-column grid for cards (collapses to single column on mobile):

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--card-gap);
}
```

---

## SECTION-BY-SECTION DESIGN NOTES

### 1. HERO

**Layout:** Full-width, vertically centered text on warm-beige background. No hero image — or if using one, a subtle, low-opacity brand illustration (not a stock photo).

**Headline:** Navy (#2f2f55), hero font size, max-width ~800px centered.

**Subtext:** Navy at lighter weight, text-body size, max-width ~700px.

**CTA buttons:**
- Primary: "Book demo" — navy-dark (#2d2e5a) background, white text, rounded corners (8px), padding 16px 32px.
- Secondary: "Se hvordan" — transparent background, navy border, navy text. Scrolls to section 2.

**Logo strip:** Row of client logos underneath the CTAs. Grayscale by default, subtle opacity (0.6), spaced evenly. Logos include: Tandlægeforeningen, Colosseum Dental, Moderaterne, PS Contact, Stiesdal, Velliv.

```
| [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] |
```

**What to fix from current site:** Remove the stock conference room photo. Remove the frosted-glass overlay — it muddies the text. Let the headline do the work against a clean background.

---

### 2. DET SKJULTE PROBLEM

**Layout:** White background. Section headline centered in navy. Three cards in a row below.

**Cards:**
- Background: blush (#fff3f3)
- Thin top border or accent bar: lavender (#b0a9b9), 4px
- Title: forest-green (#404f3c), font-weight 600
- Body text: navy (#2f2f55), normal weight
- No sources visible on cards — keep it clean

```
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ ▬▬▬▬ lavender    │ │ ▬▬▬▬ lavender    │ │ ▬▬▬▬ lavender    │
│                  │ │                  │ │                  │
│  Card Title      │ │  Card Title      │ │  Card Title      │
│                  │ │                  │ │                  │
│  Body text...    │ │  Body text...    │ │  Body text...    │
│                  │ │                  │ │                  │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

**What to fix from current site:** The current stats section uses white text on steel-blue background with poor contrast. Move to blush cards with navy text instead. Much more readable.

---

### 3. HVAD DET KOSTER — OG HVAD DET KUNNE GIVE

**Layout:** Warm-beige background. Two-column layout.

**Left column — "Omkostningen":**
- Large stat numbers: navy (#2f2f55), text-stat size (very large, bold)
- Description text: navy, normal size
- Subtle red/warm undertone if desired — but don't overdo it. The numbers themselves create urgency.

**Right column — "Potentialet":**
- Body text: navy, slightly larger than normal (1.1rem)
- Consider a subtle green or positive indicator (small icon or colored accent)

**Optional ROI callout box:**
- Blush background (#fff3f3), navy text
- Light lavender border
- Set as a distinct block below the two columns

```
┌─────────────────────────────┬─────────────────────────────┐
│         OMKOSTNINGEN         │          POTENTIALET         │
│                             │                             │
│  56 mia. kr.                │  De faktorer der forebygger  │
│  Stress koster dansk...     │  stress er de SAMME der     │
│                             │  driver engagement og       │
│  70%                        │  performance.               │
│  Flere sygedage...          │                             │
│                             │  Organisationer der handler  │
│  30-100% af en årsløn       │  tidligt undgår ikke kun    │
│  Omkostningen ved at...     │  omkostninger — de frigør   │
│                             │  potentiale.                │
└─────────────────────────────┴─────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│  💡 ROI-eksempel: En virksomhed med 200 medarbejdere...   │
└───────────────────────────────────────────────────────────┘
```

**What to fix from current site:** The current stats section scatters numbers randomly on a blue background. The new version pairs each number with its explanation, gives them proper hierarchy, and adds the "unlock" column that makes this an investment argument rather than a fear argument.

---

### 4. EN ANDEN TILGANG

**Layout:** White background. Section headline + intro text left-aligned or centered. Four-step horizontal flow below. App mockup screenshots alongside or beneath.

**Four-step flow:**
Use a horizontal connected pipeline or timeline visual. Each step gets:
- A step number or icon
- Bold title in forest-green
- 1-2 line description in navy

```
   [ Mål ]  ——→  [ Forstå ]  ——→  [ Handl ]  ——→  [ Følg op ]
```

Steps connected by lines, arrows, or a subtle progress bar in lavender or steel-blue.

**App mockups:** Reuse the three phone screenshots from the current site (brain character, questionnaire, emotion recognition). These are strong. Place them in a row below the pipeline, or float them alongside the intro text.

**Key line underneath the pipeline:**
Set apart as a pull-quote or highlight block:
> "Vi giver medarbejderen indsigt og konkrete øvelser. Og vi giver ledelsen det overblik og de anbefalinger, der gør det muligt at handle på det, der tæller mest."

Style: slightly larger text, navy, optional left border in plum or lavender.

---

### 5. INDSIGT TILPASSET HVERT NIVEAU

**Layout:** Warm-beige background. Three compact cards.

**Cards:**
- Same style as section 2 (blush background, lavender top bar)
- Title: forest-green, bold — "Ledelsen" / "HR" / "Medarbejderen"
- One line of description text each: navy
- Keep extremely tight — this is a bridge section, not a feature section

---

### 6. SOCIAL PROOF

**Layout:** White background. Two testimonial cards + logo bar.

**Testimonial cards:**
- DO NOT use the steel-blue as card background (current site's approach — hard to read)
- Instead: white card with left border in plum (#5c3048) or steel-blue, navy text
- Photo: small circular headshot (64px), top of card or left-aligned
- Quote text: navy, italic or regular weight
- Attribution: text-muted color, smaller size

```
┌──┬────────────────────────────────────────────┐
│  │                                            │
│🟣│  "Quote text here..."                      │
│  │                                            │
│  │  — Name, Title, Company                    │
└──┴────────────────────────────────────────────┘
```

**Logo bar:**
Below testimonials. Grayscale logos, evenly spaced, subtle opacity.

---

### 7. KONTAKT (Footer CTA)

**Layout:** Navy-dark (#2d2e5a) background, full-width. White text.

**Headline:** White, large. "Lad os starte med en samtale"
**Sub:** White, normal weight.

**Form:**
- Input fields: semi-transparent white background, white border, white placeholder text
- Submit button: white background, navy text. Or inverted: blush background, navy text.
- Fields: Navn, Virksomhed, Email, Antal medarbejdere, Besked (optional)

**Direct contact info:** Email + phone, visible below or beside the form.

---

## NAVIGATION BAR

**Fixed/sticky at top.** Warm-beige or white background with subtle shadow on scroll.

**Left:** Logo (plum wave icon + brown/navy logotype)
**Center/Right:** Links in navy text — Platform · Forskning · Resultater · Om os · Priser
**Far right:** "Book demo" CTA button (navy-dark background, white text, small rounded)

On mobile: hamburger menu.

---

## GLOBAL DESIGN RULES

### Contrast
- **Never:** white/light text on steel-blue background (#7f96cc). Current site's biggest problem. Fails WCAG AA.
- **Always:** navy text on white, beige, or blush backgrounds. White text on navy-dark backgrounds only.

### Cards
- Consistent card style throughout: blush background, lavender top accent bar, forest-green titles, navy body text.
- Rounded corners: 8-12px.
- Subtle box-shadow: `0 2px 8px rgba(47, 47, 85, 0.06)`.

### Buttons
- Primary: navy-dark background, white text, 8px radius, 16px 32px padding.
- Secondary: transparent, navy border, navy text.
- Hover: darken 10% or add subtle shadow.

### Stat Numbers
- Very large (3-5rem), navy, font-weight 700.
- Paired directly with their explanation — never floating.

### Whitespace
- Current site has too much dead space in some sections (the "Hvorfor well at work?" section especially). Use consistent section padding (4-8rem vertical) but fill the horizontal space purposefully.
- Max content width: 1200px, centered.

### Responsiveness
- Cards: 3-col → 2-col → 1-col
- Two-column layouts (cost section): side-by-side → stacked
- Pipeline (4-step flow): horizontal → vertical on mobile
- Nav: full → hamburger

---

## ASSETS TO PREPARE

1. **Logo files** — SVG of the Well at Work logo (wave icon + logotype)
2. **App mockups** — The three phone screenshots (brain character, questionnaire, emotion recognition). Already on current site.
3. **Client logos** — Tandlægeforeningen, Colosseum Dental, Moderaterne, PS Contact, Stiesdal, Velliv. Grayscale SVGs ideal.
4. **Headshots** — Testimonial photos for Helge Larsen and Noa Jankovic (from current site). Higher resolution if available.
5. **Favicon** — Plum wave icon from logo.

---

## WHAT TO DROP FROM THE CURRENT SITE

| Current Element | Decision | Reason |
|---|---|---|
| Stock conference room hero image | **Remove** | Generic, competes with text |
| Frosted-glass text overlay on hero | **Remove** | Muddies readability |
| Steel-blue full-section backgrounds with white text | **Remove** | Poor contrast, fails WCAG |
| "Hvorfor Well at Work" section with scattered layout | **Replace** | Dead whitespace, unfocused |
| "Hvordan vi adskiller os" generic differentiator bullets | **Remove** | Self-referential — the entire page should show differentiation |
| 3-step process (too compressed) | **Expand** | Replace with 4-step pipeline that shows full depth |
| All testimonials on front page | **Reduce to 2** | Keep Helge + Noa, move rest to /resultater |
| White-on-blue stat numbers | **Restyle** | Move to navy-on-blush cards with paired explanations |
