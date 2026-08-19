# Your walk-in card — how to use it

Built 2026-08-19. Plain-English version. Nothing here needs a designer.

---

## What this is

A double-sided business card for walking into a local business and offering your services.

**Green side:** the Lift Studio logo and what you do.
**Cream side:** your promise, your name, your email, and a QR code.

They point a phone camera at the QR, it opens **helloliftstudio.com**. No app, no typing. Every phone made in the last several years does this from the normal camera.

---

## Getting them printed

The files a printer needs are in the `out/` folder:

| File | What it is |
| --- | --- |
| `lift-card-front.pdf` | Green side, print-ready |
| `lift-card-back.pdf` | Cream side, print-ready |
| `lift-card-front.png` · `lift-card-back.png` | Same two sides as images, for sites that want images |

Both are built at 3.5 x 2 inches with a 0.125 inch bleed, which is the standard every printer expects. You do not need to change any setting.

**Ordering, step by step:**

1. Go to any card printer. Moo, Vistaprint, or your local print shop all work.
2. Choose **3.5 x 2 in, double sided, standard business card**.
3. Upload `lift-card-front.pdf` as the front and `lift-card-back.pdf` as the back.
4. If it asks about bleed, say **yes, my file includes bleed**.
5. If it offers paper, pick **uncoated or matte**. The card is designed to look like soft uncoated stock. Glossy will fight it, and gloss also makes a QR harder to scan under a shop's lights.

**Before you approve the proof:** scan the QR on the printer's own preview with your phone. If it opens your site, you are good.

---

## Scan it yourself before you order a hundred

Open `out/lift-card-back.png` on your screen and point your phone at it. It should open helloliftstudio.com.

The code has already been machine-tested here at four levels of degradation, including a deliberately blurred and compressed copy, so it is built to survive a pocket. But scan it yourself anyway. It takes five seconds and it is the one thing that would be expensive to get wrong.

---

## The QR on its own

In the `qr/` folder, in case you want it on something other than the card:

| File | Use it for |
| --- | --- |
| `lift-qr-forest-on-cream.png` | Anything. Brand colours, safe default. |
| `lift-qr-forest-on-cream.svg` | Same, but scales to any size with no blurring. Use this for anything large, like a sign. |
| `lift-qr-forest-transparent.png` | Dropping onto your own background, as long as that background is **light**. |
| `lift-qr-black-on-white.svg` | Hand this to a third-party printer who is being fussy. Maximum compatibility. |

**Two rules if you place it yourself:**

1. **Dark code on a light background. Never the reverse.** A light code on a dark background fails on a lot of phones. This is why the QR is on the cream side of the card and not the green side.
2. **Leave a clear margin around it,** about the width of two of its little squares. That margin is part of how a phone finds the code. The files above already include it, so just do not crop them or set anything right up against the edge.

Do not make it smaller than about 0.8 inches on a printed piece.

---

## What I deliberately left off, and why

**No phone number.** I do not have a Lift business number on file and I will not put a guess on something you hand to strangers. If you want one on there, tell me the number and I will rebuild it.

**No Instagram handle.** Same reason. I could not find a verified Lift handle anywhere in your files.

**No "free audit" offer.** Your own services reference says the Mini-Audit is a $250 product and that the free hook is only ever one named finding, never a full diagnosis. A card promising a free audit would undercut the thing you charge for. The card sells the studio and the QR does the rest.

**The email is `megan@helloliftstudio.com`,** not the gmail. It is your domain address, it is live, and replies land in the inbox that gets monitored.

---

## Changing it

Do not edit the images by hand. Everything is rebuilt by one command:

```
cd "Lift Studio/assets/leave-behind"
python3 build-card.py
```

Copy, colours, sizes and layout all live in `build-card.py`. The paper texture is prepared once by `prepare-plate.py` and does not need to be re-run unless the texture itself changes.

`out/PROOF-guides.png` shows the same card with coloured guides on it: red is the outer bleed, blue is where the blade actually cuts, green is the safe zone. It is for checking, never for printing.

---

## If you want a bigger version later

This card is the thing someone puts in a pocket. If you also want something for a counter or a community board, the obvious next step is a 4x6 leave-behind with a before-and-after on it, using the same QR and the same stock. Say the word and I will build it from these same files.
