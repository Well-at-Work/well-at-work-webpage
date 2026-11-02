# Product and copy evidence — redesign, 2026-09-17

Reviewed local implementation under `/Users/kimmouridsen/WaW/well-at-work-app`. Code presence establishes an implementation reference, not a production deployment or outcome claim.

| Website capability | Local evidence | Presentation |
| --- | --- | --- |
| Personalized 14-day tracks | `lib/services/program_service.dart`: assessment session, track assignment, personalization, daily completion; `lib/models/program_content.dart`: Danish Stabil vækst, Ankerøvelse, Energiregnskab, Mikro-pause | Describe a track after individual assessment; actual exercise examples, simplified and labelled illustrations |
| Leadership coaching with team context | `lib/services/team_coaching_service.dart`; `supabase/functions/team-coaching/index.ts`: leader scores, aggregated team scores, minimum-five handling | Illustrative conversation, not a claim that the displayed exchange is an actual product transcript |
| APV rounds and results | `lib/services/apv/`; `lib/ui/screens/apv/create_round/`; `lib/ui/screens/apv/round_detail/`; existing APV screenshot | Administration, responses, results, and follow-up basis; no automatic legal-compliance promise |
| Organization reporting | `lib/ui/screens/hr/hr_reports_screen.dart`; existing `org-overblik.webp` and `sammensatte-maal.webp` | Aggregate patterns and development; no causal ROI claim or invented intervention analytics |
| Customer references | Existing `src/pages/resultater.astro` and named portraits | Preserve supplied quotations; label organization strip as customers and partners |
| Contact | Only existing business mail address found; contact form previously posted to `#` | Real mailto links clearly labelled as email; no fake submission success |
| Brand | App `lib/ui/theme/well_colors.dart`, `well_typography.dart`, `assets/logo_icon.png`, `assets/fonts/DMSans-Regular.ttf` | Original plum mark; white site canvas; plum, bronze and green accents; self-hosted font |

Research page references:
- WHO, 2022: https://www.who.int/publications/i/item/9789240053052
- Bakker & Demerouti, 2017: https://pubmed.ncbi.nlm.nih.gov/27732008/
- Liston, McEwen & Casey, 2009: https://pmc.ncbi.nlm.nih.gov/articles/PMC2621252/

General research is explicitly distinguished from product-effect validation. Removed broad competitor comparisons, guaranteed early detection, unsupported ROI statements, and placeholder research graphics from the rebuilt pages. Existing customer quotes remain attributed. Archived videos and the separate cinematic route remain available but are not promoted as the main positioning.

## Learning positioning — 2026-09-18

- The shared-foundation figure makes the intervention layer prominent and adds a quiet return arrow from reporting to support.
- Current source review confirms assessment-based track assignment, stored exercise responses/completion, and organization reporting. `ProgramService.completeDay` advances the program; this is not evidence of automatic outcome-based intervention selection.
- Automatic learning from intervention outcomes has not been established by this bounded review. Public wording therefore identifies it as an ambition: “Vores ambition: Støtte, der lærer, hvad der hjælper jer.” The platform reporting section explains the direction without presenting it as a shipped feature.
- The existing hero and intervention-first narrative are preserved. Follow-up copy describes people using experience to inform next steps. No claim of unique technology, proven causal effect, or an already-operational self-improving recommendation engine is added.

## Leadership motivation and research — 2026-11-02

- The leadership page now links the Jobindex/Megafon job-change finding to practical support for leaders: 19% cite dissatisfaction with their immediate manager, compared with 17% citing pay. This describes reported reasons for changing jobs, not an annual resignation rate or a causal effect of coaching. Source: https://nyheder.tv2.dk/business/2026-10-30-danske-arbejdspladser-dumper-i-ledelse (read 2026-11-02).
- Leadership/wellbeing associations: Montano, Schleu & Hüffmeier (2023), https://doi.org/10.1177/15480518221114854. Correlational evidence is described as associations.
- Leadership development design: Lacerenza et al. (2017), https://pubmed.ncbi.nlm.nih.gov/28749153/. Practice, feedback and needs assessment inform the rationale; the research also supports facilitated face-to-face delivery and does not validate automated coaching.
- Coaching outcomes: De Haan & Nilsson (2023), https://doi.org/10.5465/amle.2022.0107. The research page reports the moderate pooled effect with publication-bias and self-report qualifications.
- AI-specific evidence is presented as mixed, with both Terblanche et al. (2022), https://pubmed.ncbi.nlm.nih.gov/35727801/, and De Haan, Terblanche & Nowack (2026), https://doi.org/10.1080/13678868.2026.2633990. Neither establishes outcomes for Well at Work. No product-specific retention, wellbeing or ROI claim is added.
- Danish copy and corresponding English translations are updated together.
