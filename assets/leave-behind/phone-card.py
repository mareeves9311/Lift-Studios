#!/usr/bin/env python3
"""
Phone-display contact card, PORTRAIT (1080x1920): Megan pulls it up full screen,
they scan, their phone offers "Add Contact" (name, Lift Studio, email, website).
v2 2026-08-19 on her notes: portrait, logo on it, more elevated.

Reuses build-card.py's fonts/colours and the extracted paper fibre so it reads as
the same family as the print card. The circle mark is rebuilt in LIVE TYPE from
the editable logo reference (forest disc, sage keyline, Newsreader L, cream rule),
never pasted from the small raster logos.

ECC M: a phone screen doesn't get scuffed, and fewer modules scan faster.
"""

import importlib.util
import pathlib
import subprocess
import sys

import numpy as np
import segno
from PIL import Image

HERE = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("bc", HERE / "build-card.py")
bc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bc)

W, H = 1080, 1920

VCARD = "\r\n".join([
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Reeves;Megan;;;",
    "FN:Megan Reeves",
    "ORG:Lift Studio",
    "TITLE:Content & Creative Strategy",
    "EMAIL;TYPE=INTERNET:megan@helloliftstudio.com",
    "URL:https://helloliftstudio.com",
    "END:VCARD",
])


def bake_portrait_ground() -> pathlib.Path:
    """Portrait cream ground from the same fibre as the print card. Vertical
    extension mirror-flips alternate copies so every joint is seamless."""
    out = HERE / "plate" / "phone-ground.png"
    fib = np.asarray(Image.open(HERE / "plate" / "paper-fibre.png").convert("L")).astype(float) - 128.0
    tall = np.vstack([fib if i % 2 == 0 else np.flipud(fib) for i in range(3)])[:H, :W]
    yy, xx = np.mgrid[0:H, 0:W].astype(float)
    d = np.sqrt(((xx / W - 0.5) * 0.9) ** 2 + ((yy / H - 0.18) * 1.1) ** 2)
    light = 1.0 + (0.05 - 0.13 * np.clip(d / 1.1, 0, 1) ** 1.3) * 0.38
    base = np.array([0xFB, 0xFA, 0xF6], float)[None, None, :]
    img = base * light[..., None] + (tall * 0.85)[..., None]
    rng = np.random.default_rng(7)
    img += rng.uniform(-0.5, 0.5, img.shape)
    Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).save(out)
    return out


ground = bake_portrait_ground()

qr = segno.make(VCARD, error="m")
n = qr.symbol_size(scale=1)[0]
svg = qr.svg_inline(dark=bc.FOREST_DEEP, light=None, border=4)
svg = svg.replace(f'<svg width="{n}" height="{n}"',
                  f'<svg viewBox="0 0 {n} {n}" preserveAspectRatio="xMidYMid meet"', 1)
assert "viewBox" in svg

QR_PX = 560

html = f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>
{bc.font_faces()}
*,*::before,*::after {{ box-sizing:border-box; margin:0; padding:0; }}
html,body {{ width:{W}px; height:{H}px; overflow:hidden; }}
body {{ font-family:"Hanken Grotesk",sans-serif; -webkit-font-smoothing:antialiased;
        background-color:{bc.CREAM}; background-image:url('{bc.b64_file(ground)}');
        background-size:cover; color:{bc.INK}; }}
.col {{ position:absolute; inset:90px; display:flex; flex-direction:column;
        align-items:center; justify-content:center; text-align:center; }}
.mark {{ position:relative; width:170px; height:170px; border-radius:50%;
         background:{bc.FOREST_DEEP}; display:flex; flex-direction:column;
         align-items:center; justify-content:center; gap:8px;
         box-shadow:0 18px 40px rgba(40,52,42,.16); }}
.mark::before {{ content:""; position:absolute; inset:14px; border-radius:50%;
                 border:2px solid {bc.SAGE}; opacity:.6; }}
.mark .glyph {{ font-family:"Newsreader",serif; font-weight:300; font-size:92px;
                line-height:.8; color:{bc.CREAM}; }}
.mark .rule {{ width:44px; height:2px; background:{bc.CREAM}; opacity:.9; }}
.who {{ margin-top:64px; font-size:52px; font-weight:600; letter-spacing:.17em;
        color:{bc.INK}; }}
.role {{ font-family:"Newsreader",serif; font-style:italic; font-weight:300;
         font-size:36px; color:{bc.FOREST}; margin-top:18px; }}
.hair {{ width:56px; height:2px; background:{bc.SAGE}; margin:56px 0 64px; }}
.qr {{ width:{QR_PX}px; height:{QR_PX}px; }}
.qr svg {{ width:100%; height:100%; display:block; shape-rendering:crispEdges; }}
.scan {{ margin-top:30px; font-size:24px; font-weight:600; letter-spacing:.22em;
         color:{bc.INK_MUTED}; }}
.contact {{ margin-top:110px; display:flex; flex-direction:column; gap:12px;
            font-size:31px; color:{bc.INK_MUTED}; }}
.contact .site {{ color:{bc.FOREST}; font-weight:600; }}
</style></head><body>
<div class="col">
  <div class="mark"><div class="glyph">L</div><div class="rule"></div></div>
  <div class="who">MEGAN REEVES</div>
  <div class="role">Lift Studio &middot; Content &amp; Creative Strategy</div>
  <div class="hair"></div>
  <div class="qr">{svg}</div>
  <div class="scan">SCAN TO SAVE MY CONTACT</div>
  <div class="contact">
    <div>megan@helloliftstudio.com</div>
    <div class="site">helloliftstudio.com</div>
  </div>
</div>
</body></html>"""

html_path = bc.BUILD / "phone-vcard.html"
html_path.write_text(html)
out = bc.OUT / "lift-contact-card-phone.png"
subprocess.run(
    [bc.CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
     "--force-device-scale-factor=1", f"--window-size={W},{H}",
     f"--screenshot={out}", f"file://{html_path}"],
    check=True, capture_output=True, timeout=120)

import cv2
img = cv2.imread(str(out))
det = cv2.QRCodeDetector()
for name, im in {"full": img,
                 "across-the-table (650px)": cv2.resize(im2 := img, (650, int(650 * img.shape[0] / img.shape[1])))}.items():
    data, *_ = det.detectAndDecode(im)
    ok = data.replace("\n", "\r\n") == VCARD or data == VCARD
    print(f"  {'PASS' if ok else 'FAIL'}  decode @ {name}")
    if not ok:
        sys.exit(f"vCard QR failed verification at {name}: got {data!r}")
print(f"  {n} modules, {QR_PX/n:.1f}px/module -> {out}")
