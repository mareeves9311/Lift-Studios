#!/usr/bin/env python3
"""
Phone-display contact card: Megan shows this image on her phone, they scan it,
their phone offers "Add Contact" with name, Lift Studio, email, and the website.
Built 2026-08-19 in a hurry (Tang dinner). Reuses build-card.py's fonts, colours
and baked paper ground so it reads as the same card family.

ECC M, not H: a phone screen doesn't get scuffed, and fewer modules scan faster.
"""

import importlib.util
import pathlib
import subprocess
import sys

import segno

HERE = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("bc", HERE / "build-card.py")
bc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bc)

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

qr = segno.make(VCARD, error="m")
n = qr.symbol_size(scale=1)[0]
svg = qr.svg_inline(dark=bc.FOREST_DEEP, light=None, border=4)
svg = svg.replace(f'<svg width="{n}" height="{n}"',
                  f'<svg viewBox="0 0 {n} {n}" preserveAspectRatio="xMidYMid meet"', 1)
assert "viewBox" in svg

QR_PX = 430
css = f"""
.card {{ {bc.ground_css("back", bc.CREAM)} color:{bc.INK}; }}
.inner {{ position:absolute; inset:60px 75px; display:flex; align-items:center;
          justify-content:space-between; }}
.left {{ display:flex; flex-direction:column; justify-content:center; gap:0; }}
.who {{ font-size:40px; font-weight:600; letter-spacing:.14em; color:{bc.INK}; }}
.role {{ font-family:"Newsreader",serif; font-style:italic; font-weight:300;
         font-size:30px; color:{bc.FOREST}; margin-top:10px; }}
.hair {{ width:52px; height:2px; background:{bc.SAGE}; margin:26px 0; }}
.contact {{ display:flex; flex-direction:column; gap:10px; font-size:27px;
            color:{bc.INK_MUTED}; }}
.contact .site {{ color:{bc.FOREST}; font-weight:600; }}
.right {{ display:flex; flex-direction:column; align-items:center; gap:14px; }}
.qr {{ width:{QR_PX}px; height:{QR_PX}px; }}
.qr svg {{ width:100%; height:100%; display:block; shape-rendering:crispEdges; }}
.scan {{ font-size:20px; font-weight:600; letter-spacing:.18em; color:{bc.INK_MUTED}; }}
"""

body = f"""<div class="card"><div class="inner">
  <div class="left">
    <div>
      <div class="who">MEGAN REEVES</div>
      <div class="role">Lift Studio &middot; Content &amp; Creative Strategy</div>
    </div>
    <div class="hair"></div>
    <div class="contact">
      <div>megan@helloliftstudio.com</div>
      <div class="site">helloliftstudio.com</div>
    </div>
  </div>
  <div class="right">
    <div class="qr">{svg}</div>
    <div class="scan">SCAN TO SAVE MY CONTACT</div>
  </div>
</div></div>"""

html_path = bc.BUILD / "phone-vcard.html"
html_path.write_text(bc.page(body, css))
out = bc.OUT / "lift-contact-card-phone.png"
bc.render(html_path, out)

# Verify: the scanned payload must be the exact vCard, at full size and small.
import cv2
img = cv2.imread(str(out))
det = cv2.QRCodeDetector()
for name, im in {"full": img,
                 "small (650px)": cv2.resize(img, (650, int(650 * img.shape[0] / img.shape[1])))}.items():
    data, *_ = det.detectAndDecode(im)
    ok = data.replace("\n", "\r\n") == VCARD or data == VCARD
    print(f"  {'PASS' if ok else 'FAIL'}  decode @ {name}")
    if not ok:
        sys.exit(f"vCard QR failed verification at {name}: got {data!r}")
print(f"  {n} modules, {QR_PX/n:.1f}px/module -> {out}")
