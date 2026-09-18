# Editorial image trial — 18 September 2026

Two fictional illustrations generated through Higgsfield with `gpt_image_2_5`, added to the local homepage for visual review. These do not depict customers or substantiate testimonials.

| Asset | Higgsfield generation | Placement |
| --- | --- | --- |
| `src/assets/editorial/breathing-room-v2.png` | `aa928aec-bff5-4e72-b946-d680758eebfe` | Everyday support introduction, `#indsatser` |
| `src/assets/editorial/feeling-heard.png` | `b8c92322-1a55-46c6-bc0f-fa56d21ec0fc` | Shared direction example, `#faelles-retning` |

Direction: natural editorial photography, bright daylight, believable texture, quiet optimism, restrained plum and rust clothing. A courtyard break and an attentive conversation. No staged laughter or glossy corporate setting.

The courtyard image was edited from generation `5d16290b-b5ef-46e3-8955-28ea71e56ab7` to correct duplicated door hardware. The revised image has one inward-opening door and a plain timber jamb. The original asset is retained for reference.

Astro creates responsive WebP variants at build time; both images load lazily, reserve their layout space, and include Danish alt text. Visible illustration captions were removed at the user's request. Product graphics and the platform figure retain their existing appearance.

Validation: production build passed; local browser review at 915px and 390px. Published to the existing Firebase Hosting site on 18 September 2026: https://wa-w-test-bizrfn.web.app/.
