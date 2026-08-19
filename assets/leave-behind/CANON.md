# Lift walk-in card — canon

Built 2026-08-19 (MIRA / Fable 5). Durable home for every decision in this build, per GV-16.
The plain-English version for Megan is `HOW_TO_USE.md`. This file is for whoever builds next.

## What it is

A double-sided 3.5 x 2 in business card Megan hands to a local business owner in person.
Green face = identity. Cream face = promise, contact, and a QR to `https://helloliftstudio.com`.

Build path: `prepare-plate.py` (once, texture prep) then `build-card.py` (everything else).
**Never hand-edit anything in `out/`.** Both scripts are idempotent and rebuild from source.

## Frozen decisions

| Decision | Value | Why |
| --- | --- | --- |
| Trim | 3.5 x 2 in | The format a shop owner keeps in a pocket or by a register |
| Canvas | 1125 x 675 px @300dpi | Trim + 0.125in bleed all round = 3.75 x 2.25 in |
| Safe inset | 75px from canvas edge | 0.125in inside trim, the standard every printer expects |
| QR target | `https://helloliftstudio.com` | Verified HTTP 200 on 2026-08-19. Scheme included, no trailing slash, no UTM |
| QR error correction | H (30%) | A card lives in a pocket and gets scuffed |
| QR size | 296px = 0.99in, 41 modules, 7.2px/module (0.61mm) | Print floor is 0.40mm/module; the build fails loudly below it |
| Email | `megan@helloliftstudio.com` | The live domain address per STATUS 8/6, monitored by `google-liftmail`. NOT the gmail |
| Fonts | Newsreader + Hanken Grotesk, local variable TTFs from her brand kit, base64-embedded | Real brand faces, never a system fallback; the build exits if a font file is missing |
| Colours | Forest `#2E4435`, Pine `#3B5742`, Sage `#9DB29F`, Cream `#FBFAF6` | Sampled from `site/index.html` design tokens, never named from memory |

## Standing constraints on the copy

1. **No free-audit claim, ever.** `LIFT_SERVICES_REFERENCE_V3.md` prices the Mini-Audit at $250, and
   the system's "proof line" limits the free hook to ONE remade piece or ONE named finding. A card
   promising a free audit undercuts the priced product and repeats the failure that produced 55
   zero-reply sends.
2. **No em dashes.** House law and Lift §voice.
3. **Nothing unverified goes on it.** No phone number and no Instagram handle appear, because neither
   exists verified anywhere in the repo. If Megan supplies either, add it and rebuild. Do not guess.
4. Voice is her own: short declaratives. The promise line is verbatim house copy from
   `LIFT_BRAND_REFERENCE.md`.

## Two QR laws that decided the layout

- **Dark modules on a light ground only.** An inverted QR (light on dark) fails on a large share of
  scanners. This is the entire reason the QR is on the cream face and not the green one. Do not
  "balance the design" by moving it.
- **The quiet zone is functional, not margin.** border=4 modules is baked into every exported asset.
  Never crop the QR files, and never set type against their edge.

## The generated plate, and why it is not used as a plate

Runway / nano-banana-pro, 2026-08-19, two candidates. Both were correct as MATERIAL: real cotton
fibre tooth, text-free, object-free, no seam, no horizon. Both were wrong as GROUNDS: measured block-mean
luminance spread of 107 and 82 across the frame against a target under ~15, from a dramatic macro
lighting scheme the prompt's "no dramatic lighting" did not suppress. A hot bloom behind a logo eats
legibility.

Resolution, and the reasoning matters more than the result: **the lighting in those frames is not
texture, it is composition, and composition belongs to the layout layer.** So the high-frequency fibre
is kept, the low-frequency lighting is discarded with one global high-pass (no masks, no surgery), and
CSS-free float compositing in `prepare-plate.py` lights the single ground per CREATIVE_PROTOCOL 7b.
Block spread after: 0.4. Both faces carry the SAME extracted fibre, so the card reads as one sheet of stock.

Source candidates are kept at `plate/cand_a.png` and `plate/cand_b.png`. `cand_a` is the one in use.

## The round-1 lesson, promoted to house law the same session

**Judge print creative at PHYSICAL SIZE before judging it at all.**

Round 1's texture was called felt-like and nearly re-rolled three times chasing a finer grain.
Rendering three grain scales side by side at actual print size (a 3.75in card shown at 3.75in, ~412px
on a 110dpi screen) reversed the verdict completely: the coarse grain reads as clean paper in the hand,
and the FINE grains are the broken ones, because a small tile must repeat so often that its mirror
seams become a visible grid. The "felt" impression was an artifact of judging a 3.5in card at roughly
10in on screen.

Promoted to `~/.claude/CREATIVE_PROTOCOL.md` Part 1 and registered as an amendment to GV-19.

## Gates that must keep passing

`build-card.py` fails the build, loudly, rather than shipping, if:
- a brand font file is missing (no silent system-font fallback),
- the QR module size falls under the 0.40mm print floor (the check reads the SAME `QR_PX` constant the
  CSS renders, so the gate cannot drift from the artwork),
- the QR does not decode back to the exact URL off the finished card at four degradation levels: full
  300dpi, 900px, 450px, and JPEG q40.

The decode check is the important one. Acceptance is measured, not argued.

## Known soft spots

- The mirror-tiled texture has one seam at x=620, y=372. Deliberately off-centre so it is not a
  symmetric butterfly down the middle. Invisible at print size; if the texture amplitude is ever
  raised, re-check it.
- The "L" is live Newsreader, not a trace of her drawn mark. It is very close and stays crisp at any
  size. If she wants the exact drawn L, it needs a real vector from the source brand files, not a key
  from the raster lockups (keying marks off raster is a known-failed method, PART 3).

## Open, needs Megan

- Phone number: include or not.
- Whether she wants the 4x6 counter version with a before/after built off the same files.
