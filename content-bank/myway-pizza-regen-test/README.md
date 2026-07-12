# My Way Pizza — Ideogram Regeneration Test (2026-07-11)

Continuation of the 2026-07-10 Runway gen-4 vs nano-banana-pro test. Source: real
@mywaypizza Instagram post (June 12, "Pizza, Popsicles & Team USA" — World Cup
watch-party post). Tool under test: **Ideogram (claude.ai connector, v4 default
model)**, chosen for its claimed best-in-class logo/text accuracy.

Fidelity rules applied (memory: `feedback_visual-regeneration-fidelity-line`):
food stays pixel-true; props/styling/composition fully reimaginable; grounding
in real brand register (fast, casual, wood-fired, Hummelstown PA) and real
occasion (World Cup, not July 4th).

## Files

| File | What it is | Verdict |
|---|---|---|
| 00 | Source photo (IG screenshot, UI cropped) | ground truth |
| 01–02 | `remix_image`, weight 55, 2 vars | Jerseys/crest crisp ✅ · cheese reinvented as fresh-mozz blobs ❌ |
| 03–04 | `remix_image`, weight 85 | Food faithful ✅ (03 best) · but reads as "source, tidied" — low elevation |
| 05 | `edit_image`, scene transform | Big creative elevation, food held ✅ · invented "Pizza Shop Est. 1980" sign ❌ |
| 06 | `edit_image`, sign text specified | "MY WAY PIZZA & GRILL" rendered letter-perfect; jersey/crest/10 crisp; freeze pops stay sealed tubes; pizza holds real cheese character through full scene change |
| 07 | `edit_image`, editorial-craft prompt | **Current best.** Midjourney's camera language (low 3/4 angle, rule of thirds, shallow DOF, directional light) + Ideogram's fidelity: thin crust, mottled cheese, sealed tube pops, crisp jersey, no fabricated text |
| 90 | Megan's Midjourney reference (same brief) | Best photographic craft of the night, but redesigned the pizza (thick puffy crust, creamy uniform cheese) and turned freeze pops into bomb pops — fidelity fail. Kept as the craft benchmark |

## Findings

0. **Photographic craft is a third axis** (Megan, via the Midjourney comparison):
   food fidelity + brand grounding aren't enough — the shot must read as "a
   professional camera by somebody with an eye for content." Rule of thirds,
   subject large in sharp foreground, low 3/4 angle, shallow DOF, warm
   directional light. Never prompt "phone-photo realism"; specify the camera
   craft explicitly. Midjourney = best photographer, worst fact-keeper; the
   target is fidelity-model facts + Midjourney camera language (file 07).

1. **Ideogram passes the logo/text test** that gen-4 and nano-banana-pro failed —
   jersey graphics, USA crest, and real brand-name signage all render clean.
   Spell out any real text explicitly in the prompt ("a sign reads exactly …,
   no other readable text") or it fabricates ("Est. 1980").
2. **Remix weight matters:** 55 lets the food drift; 85 holds it but barely
   elevates. `edit_image` (prompt-guided, no mask) gave the best
   elevation-with-fidelity trade.
3. **Still not send-ready:** the shop interior in 05/06 is invented — real
   brand register requires Megan's real interior photos before anything is
   client-facing. The sign in 06 is correct text but not their actual round
   flame logo.

Generated via claude.ai Ideogram connector; permalinks in session transcript
(request IDs: v_WAf0_QQ0mJ2OxGQW3z-Q, knNgnKUoR1GpRGL0Y41lzQ,
i68DTpFETzy64MiUI-IyYA, AL36l_7vSsakRXOUz2Ghsg).
