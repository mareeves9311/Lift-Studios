#!/usr/bin/env python3
"""
Turn the generated green-paper photographs into a reusable paper-fibre TEXTURE.

Why this step exists (recorded so a later session does not re-roll the generator
chasing a flatter photo):

Runway/nano-banana-pro returned two genuinely correct MATERIALS on 2026-08-19:
real cotton fibre tooth, text-free, object-free, no seams, no horizon. What they
also carried was a dramatic macro lighting scheme, measured at a block-mean
luminance spread of 107 (cand_a) and 82 (cand_b) across the frame, against a
target under ~15 for a card ground. A hot bloom in one corner behind a logo eats
legibility and reads as a moody photo rather than as card stock.

CREATIVE_PROTOCOL Pt 1 law 3 says generated art is for TEXTURE only, and law 7b
says depth comes from LIGHTING the single ground. The lighting in these frames is
not texture, it is composition, and composition belongs to the layout layer. So:
keep the high-frequency fibre, discard the low-frequency lighting drift, and let
CSS light the ground.

This is not surgery on a rejected candidate. The candidate is accepted as the
material it was asked for; only the part that was never wanted is removed, with
one global operation and no masks.

Output: plate/paper-fibre.png, a neutral grey field (mean 128) carrying only the
paper tooth. It is used on BOTH faces of the card, so both sides are literally the
same stock.
"""

import pathlib
import sys

import numpy as np
from PIL import Image, ImageFilter

HERE = pathlib.Path(__file__).resolve().parent
PLATE = HERE / "plate"

W, H = 1125, 675          # final card canvas incl. bleed

# GRAIN SCALE — settled 2026-08-19 by a physical-size test, not by eyeballing a
# magnified render. Recorded because the first read was WRONG in an instructive way.
#
# Round 1 looked like felt on screen, so the instinct was to make the grain much
# finer. Rendering three tile scales side by side AT ACTUAL PRINT SIZE (a 3.75in
# card shown at 3.75in, ~412px on a 110dpi screen) reversed the call: the coarse
# tile reads as clean paper in the hand, and the FINE tiles are the broken ones,
# because a small tile has to repeat so often that the mirror seams become a
# visible grid. The "felt" impression was an artifact of judging a 3.5in card at
# roughly 10in on screen.
#
# Tile is deliberately just over half the canvas so the single mirror seam lands
# off-centre (x=620 of 1125) instead of running down the dead centre, where a
# symmetric noise axis reads as a butterfly.
TILE_W, TILE_H = 620, 372   # mirror -> 1240x744, cropped to the canvas
LOWPASS_SIGMA = 15          # broader than this is "lighting", not "tooth" (tile scale)
TARGET_STD = 6.0            # residual amplitude; paper tooth, not noise


def sharpest_crop(img: Image.Image, aspect: float) -> Image.Image:
    """Macro shots fall off in focus across the frame. Find the sharpest band by
    local Laplacian energy and crop the card's aspect from there, rather than
    eyeballing it off a downscaled preview (Pt 2B: measure, never eyeball)."""
    g = np.asarray(img.convert("L")).astype(float)
    lap = np.abs(np.gradient(np.gradient(g, axis=0), axis=0)) + \
          np.abs(np.gradient(np.gradient(g, axis=1), axis=1))

    ch = int(img.width / aspect)
    if ch > img.height:
        ch = img.height
    cw = int(ch * aspect)

    best, best_y, best_x = -1.0, 0, 0
    for y in range(0, img.height - ch + 1, max(1, (img.height - ch) // 8 or 1)):
        for x in range(0, img.width - cw + 1, max(1, (img.width - cw) // 8 or 1)):
            e = lap[y:y + ch, x:x + cw].mean()
            if e > best:
                best, best_y, best_x = e, y, x
    print(f"    sharpest {cw}x{ch} crop at ({best_x},{best_y}), laplacian energy {best:.3f}")
    return img.crop((best_x, best_y, best_x + cw, best_y + ch))


def main() -> None:
    src = PLATE / "cand_a.png"
    if not src.exists():
        sys.exit(f"missing {src} — re-run the Runway generation first")

    img = Image.open(src).convert("RGB")
    print(f"  source {img.size}")

    crop = sharpest_crop(img, W / H)
    tile = crop.resize((TILE_W, TILE_H), Image.LANCZOS)

    # Luminance only. The colour of the ground is Megan's brand hex, not the
    # generator's interpretation of it, so the generated hue is discarded.
    lum = np.asarray(tile.convert("L")).astype(float)

    # High-pass: subtract the broad lighting field, keep the tooth.
    low = np.asarray(Image.fromarray(lum.astype(np.uint8))
                     .filter(ImageFilter.GaussianBlur(LOWPASS_SIGMA))).astype(float)
    resid = lum - low
    print(f"    tile {TILE_W}x{TILE_H}: before std {lum.std():.1f}, "
          f"block spread {block_spread(lum):.1f}")

    resid *= TARGET_STD / resid.std()
    resid = mirror_tile(resid, W, H)

    tex = np.clip(resid + 128.0, 0, 255)
    print(f"    card {W}x{H}: after std {tex.std():.1f}, "
          f"block spread {block_spread(tex):.1f}, "
          f"dominant feature {feature_size(resid):.1f}px  "
          f"(want 1-4px for 300dpi card stock)")

    out = PLATE / "paper-fibre.png"
    Image.fromarray(tex.astype(np.uint8)).save(out)
    print(f"  -> {out}")

    # ── The two grounds. ONE ground per face, edge to edge, lit (Pt 1 law 7b).
    # Baked here in float and dithered, because an 8-bit CSS gradient bands
    # visibly across a large flat dark area in print.
    # light_scale is per face on purpose: an identical falloff reads as a gentle
    # sheen on dark pigment and as a dirty smudge on cream, because the same
    # fractional change is a far larger absolute swing on a bright ground.
    for name, rgb, gain, light_scale in (
            ("front-ground", (0x2E, 0x44, 0x35), 1.00, 1.00),   # forest
            ("back-ground",  (0xFB, 0xFA, 0xF6), 0.85, 0.38)):  # cream
        ground = bake_ground(resid, rgb, gain, light_scale)
        p = PLATE / f"{name}.png"
        ground.save(p)
        a = np.asarray(ground).astype(float)
        print(f"  -> {p.name}: mean RGB {a.reshape(-1,3).mean(0).round(1)}, "
              f"tooth std {a.mean(2).std():.1f}, "
              f"block spread {block_spread(a.mean(2)):.1f}")


def bake_ground(resid: np.ndarray, rgb: tuple[int, int, int], gain: float,
                light_scale: float = 1.0) -> Image.Image:
    """Brand hex + a real lighting falloff + the paper tooth, composited in float.

    The colour is Megan's exact token, never the generator's version of it
    (Pt 2B: sample the artwork, never name a colour from memory, and here do not
    inherit one from a generator either).
    """
    h, w = resid.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    # Light enters upper-left, consistent with the front lockup's reading order.
    d = np.sqrt(((xx / w - 0.24) * 1.05) ** 2 + ((yy / h - 0.14) * 0.80) ** 2)
    light = 1.0 + (0.055 - 0.155 * np.clip(d / 1.02, 0, 1) ** 1.25) * light_scale

    base = np.asarray(rgb, dtype=float)[None, None, :]
    out = base * light[..., None] + (resid * gain)[..., None]

    # Ordered dither at sub-LSB amplitude kills banding without adding visible noise.
    rng = np.random.default_rng(7)
    out += rng.uniform(-0.5, 0.5, out.shape)
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


def mirror_tile(t: np.ndarray, w: int, h: int) -> np.ndarray:
    """Fill the canvas by mirroring the tile rather than repeating it, so no
    translational period exists for the eye to lock onto."""
    top = np.hstack([t, np.fliplr(t)])
    full = np.vstack([top, np.flipud(top)])
    return full[:h, :w]


def feature_size(resid: np.ndarray) -> float:
    """Dominant grain wavelength, measured off the autocorrelation's first zero
    crossing. Measured, not eyeballed: 'looks like felt' was the round-1 defect."""
    row = resid[resid.shape[0] // 2] - resid[resid.shape[0] // 2].mean()
    ac = np.correlate(row, row, mode="full")[len(row) - 1:]
    ac /= ac[0]
    zero = np.argmax(ac < 0) if (ac < 0).any() else len(ac)
    return 2.0 * zero


def block_spread(a: np.ndarray, n: int = 4) -> float:
    h, w = a.shape
    means = [a[j * h // n:(j + 1) * h // n, i * w // n:(i + 1) * w // n].mean()
             for j in range(n) for i in range(n)]
    return max(means) - min(means)


if __name__ == "__main__":
    main()
