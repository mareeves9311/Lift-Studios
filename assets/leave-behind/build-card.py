#!/usr/bin/env python3
"""
Lift Studio — in-person leave-behind card.
THE ONLY BUILD PATH. Never hand-edit the files in out/; edit this script and re-run.

Built 2026-08-19 for Megan walking into local businesses: hand it over, they scan,
they land on helloliftstudio.com.

Method (CREATIVE_PROTOCOL Pt 1): plate + live type, assembled in HTML/CSS and
rendered by headless Chrome. PIL is never the assembly layer here; it is used only
to prepare the generated texture plate.

Geometry (recorded so no later session re-derives it):
  trim        3.5 x 2.0 in   = 1050 x 600 px @ 300dpi
  bleed       0.125 in all round
  full canvas 3.75 x 2.25 in = 1125 x 675 px @ 300dpi
  safe inset  0.125 in inside trim -> 0.25 in from canvas edge = 75 px

QR: https://helloliftstudio.com, ECC level H (30% damage tolerance, because a card
lives in a pocket). Dark forest modules on cream ONLY. An inverted QR (light on
dark) fails on a large share of scanners, which is why the QR is on the cream face
and never on the green one.
"""

import base64
import mimetypes
import re
import pathlib
import shutil
import subprocess
import sys

import segno

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE / "out"
QR_DIR = HERE / "qr"
PLATE_DIR = HERE / "plate"
BUILD = HERE / "build"
FONT_DIR = HERE.parent.parent / "Lift Studio Brand Kit" / "Fonts"

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# ── Canon values. Sampled from site/index.html design tokens, never named from memory.
FOREST_DEEP = "#2E4435"   # --green-forest  : front ground, QR modules
FOREST = "#3B5742"        # --green-pine    : key marks on light
SAGE = "#9DB29F"          # --green-sage    : secondary accent, rules
CREAM = "#FBFAF6"         # --cream         : back ground, ink on green
CREAM_ON_DARK = "#EDEBE2" # --on-dark       : text on forest
INK = "#20241F"           # --ink
INK_BODY = "#3D423A"      # --ink-body
INK_MUTED = "#5F635A"     # --ink-muted
INK_FAINT = "#9A9C92"     # --ink-faint

URL = "https://helloliftstudio.com"
EMAIL = "megan@helloliftstudio.com"
DOMAIN_LABEL = "helloliftstudio.com"

W, H = 1125, 675          # full canvas incl. bleed
SAFE = 75                 # px from canvas edge to safe area
QR_PX = 296               # rendered QR edge; the print-floor check below reads THIS,
                          # so the gate can never drift from what is actually drawn


def b64_file(path: pathlib.Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"


def build_qr() -> tuple[str, int]:
    """Write the standalone QR assets and return (inline svg markup, module count)."""
    QR_DIR.mkdir(parents=True, exist_ok=True)
    qr = segno.make(URL, error="h")

    qr.save(QR_DIR / "lift-qr-forest-on-cream.svg", scale=10,
            dark=FOREST_DEEP, light=CREAM, border=4)
    qr.save(QR_DIR / "lift-qr-forest-on-cream.png", scale=24,
            dark=FOREST_DEEP, light=CREAM, border=4)
    # Transparent-ground variant so she can drop it onto any light surface.
    qr.save(QR_DIR / "lift-qr-forest-transparent.png", scale=24,
            dark=FOREST_DEEP, light=None, border=4)
    # Pure black on white, the safest possible version for a third-party printer.
    qr.save(QR_DIR / "lift-qr-black-on-white.svg", scale=10,
            dark="#000000", light="#FFFFFF", border=4)

    # segno's inline SVG carries width/height in MODULE units and no viewBox, so
    # dropped into a sized box it renders 41px in the corner instead of scaling.
    # Swap the fixed size for a viewBox and let the CSS box drive it.
    n = qr.symbol_size(scale=1)[0]
    inline = qr.svg_inline(dark=FOREST_DEEP, light=None, border=4)
    inline = inline.replace(
        f'<svg width="{n}" height="{n}"',
        f'<svg viewBox="0 0 {n} {n}" preserveAspectRatio="xMidYMid meet"', 1)
    if "viewBox" not in inline:
        sys.exit("segno inline SVG shape changed; the viewBox patch missed. "
                 "Check the <svg> tag before trusting the render.")
    return inline, n


def font_faces() -> str:
    hanken = FONT_DIR / "Hanken Grotesk" / "HankenGrotesk-Variable.ttf"
    news = FONT_DIR / "Newsreader" / "Newsreader-Variable.ttf"
    news_it = FONT_DIR / "Newsreader" / "Newsreader-Italic-Variable.ttf"
    for f in (hanken, news, news_it):
        if not f.exists():
            sys.exit(f"MISSING BRAND FONT: {f}\nThe card must not fall back to a system face.")
    return f"""
@font-face {{ font-family:"Hanken Grotesk"; src:url("{b64_file(hanken)}") format("truetype");
             font-weight:100 900; font-style:normal; }}
@font-face {{ font-family:"Newsreader"; src:url("{b64_file(news)}") format("truetype");
             font-weight:200 800; font-style:normal; }}
@font-face {{ font-family:"Newsreader"; src:url("{b64_file(news_it)}") format("truetype");
             font-weight:200 800; font-style:italic; }}
"""


def ground_css(face: str, fallback: str) -> str:
    """The baked ground for a face: brand hex + real lighting falloff + paper tooth,
    composited in float by prepare-plate.py.

    ONE ground, edge to edge, depth from lighting it (CREATIVE_PROTOCOL 7b). Both
    faces carry the SAME extracted fibre, so the card reads as one sheet of stock.
    If the ground is missing the card still builds, flat, and says so loudly rather
    than shipping flat in silence.
    """
    g = PLATE_DIR / f"{face}-ground.png"
    if g.exists():
        return (f"background-color:{fallback};"
                f"background-image:url('{b64_file(g)}');"
                f"background-size:cover;background-position:center;")
    print(f"  ! plate/{face}-ground.png missing — run prepare-plate.py. "
          f"Building FLAT.", file=sys.stderr)
    return f"background-color:{fallback};"


# At 300dpi one point is 300/72 px. Print's practical floor for tracked caps is
# ~6pt; body text wants 7pt+. This is the corollary of the physical-size law:
# type that looks comfortable on an enlarged render can be unreadable in the hand.
PT = 300 / 72
MIN_PT = 6.0


def page(body: str, css: str) -> str:
    """The measuring script runs in every render. It writes computed type sizes and
    bounding boxes into a hidden node, which --dump-dom reads back, so 'does this
    print' is a number rather than an opinion. Hidden, so it never affects pixels."""
    probe = """
<div id="mira-metrics" style="display:none"></div>
<script>
(function(){
  var out=[];
  document.querySelectorAll('.card *').forEach(function(el){
    if(el.id==='mira-metrics') return;
    var txt=(el.innerText||'').trim();
    if(!txt || el.children.length) return;
    var cs=getComputedStyle(el), r=el.getBoundingClientRect();
    out.push({t:txt.slice(0,44), px:parseFloat(cs.fontSize),
              l:Math.round(r.left), rt:Math.round(r.right),
              tp:Math.round(r.top), b:Math.round(r.bottom)});
  });
  document.getElementById('mira-metrics').textContent=JSON.stringify(out);
})();
</script>"""
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>
{font_faces()}
@page {{ size:3.75in 2.25in; margin:0; }}
*,*::before,*::after {{ box-sizing:border-box; margin:0; padding:0; }}
html,body {{ width:{W}px; height:{H}px; overflow:hidden; }}
body {{ font-family:"Hanken Grotesk",sans-serif; -webkit-font-smoothing:antialiased; }}
.card {{ position:relative; width:{W}px; height:{H}px; overflow:hidden; }}
{css}
</style></head><body>{body}{probe}</body></html>"""


# ── FRONT ────────────────────────────────────────────────────────────────────
# Her real on-dark lockup, rebuilt as live type from Lift Studio Editable Logo
# Reference.svg: swash "L" + rule, vertical divider, LIFT / STUDIO at wide
# tracking, italic descriptor. Centred, with the service line held at the foot.
FRONT_CSS = f"""
.card {{ {ground_css("front", FOREST_DEEP)} color:{CREAM_ON_DARK}; }}
.lockup {{ position:absolute; left:50%; top:44.5%; transform:translate(-50%,-50%);
           display:flex; align-items:center; gap:38px; }}
.mark {{ display:flex; flex-direction:column; align-items:center; gap:10px; }}
.mark .glyph {{ font-family:"Newsreader",serif; font-weight:300; font-size:172px;
                line-height:.78; color:{CREAM}; }}
.mark .rule {{ width:84px; height:2.5px; background:{CREAM}; opacity:.92; }}
.divider {{ width:1.5px; height:150px; background:{SAGE}; opacity:.55; }}
.words {{ display:flex; flex-direction:column; gap:4px; }}
.words .name {{ font-weight:600; font-size:59px; line-height:1.06;
                letter-spacing:.19em; color:{CREAM}; }}
.words .desc {{ font-family:"Newsreader",serif; font-style:italic; font-weight:300;
                font-size:34px; line-height:1.28; color:{SAGE}; margin-top:11px;
                letter-spacing:.005em; }}
/* 25px = 6.0pt, the print floor. Tracking pulled back from .30em to .16em to buy
   the width the larger size costs; opacity kept OFF, because dimming small tracked
   type is what makes it vanish on paper. */
.services {{ position:absolute; left:{SAFE}px; right:{SAFE}px; bottom:{SAFE}px;
             text-align:center; font-size:25px; font-weight:500;
             letter-spacing:.16em; color:{SAGE}; }}
"""

FRONT_BODY = f"""<div class="card">
  <div class="lockup">
    <div class="mark"><div class="glyph">L</div><div class="rule"></div></div>
    <div class="divider"></div>
    <div class="words">
      <div class="name">LIFT</div>
      <div class="name">STUDIO</div>
      <div class="desc">Content &amp; Creative Strategy</div>
    </div>
  </div>
  <div class="services">AUDITS &nbsp;·&nbsp; BRAND IDENTITY &nbsp;·&nbsp; SOCIAL CONTENT &nbsp;·&nbsp; LOCAL SEO</div>
</div>"""


# ── BACK ─────────────────────────────────────────────────────────────────────
# One cream ground, lit. Left column carries the person and the promise; the QR
# holds the right. Her core promise verbatim from LIFT_BRAND_REFERENCE.md.
BACK_CSS = f"""
.card {{ {ground_css("back", CREAM)} color:{INK}; }}
/* Two masses, not three floaters. Round 1 spread name / promise / contact evenly
   down the column and the name read as orphaned. The promise now leads and the
   identity block closes, so the eye has two places to land instead of three. */
.inner {{ position:absolute; inset:{SAFE}px; display:flex; align-items:stretch;
          justify-content:space-between; }}
.col {{ display:flex; flex-direction:column; height:100%; }}
/* The promise is centred on the SAME axis as the QR so the two halves of the card
   read as one line of thought, and the identity block is pinned to the foot. */
.left {{ justify-content:center; flex:1; padding-right:34px; position:relative; }}
.promise {{ font-family:"Newsreader",serif; font-weight:300; font-size:46px;
            line-height:1.28; color:{FOREST}; letter-spacing:-.004em;
            margin-top:-38px; }}
.ident {{ display:flex; flex-direction:column; position:absolute; left:0; bottom:0; }}
/* 31px = 7.4pt name, 30px = 7.2pt contact. Business-card body text is 7-9pt; the
   round-3 values (5.3pt and 5.0pt) were below the readable floor in the hand. */
.who {{ font-size:31px; font-weight:600; letter-spacing:.20em; color:{INK}; }}
.hair {{ width:46px; height:1.5px; background:{SAGE}; margin:14px 0 15px; }}
.contact {{ display:flex; flex-direction:column; gap:7px; font-size:30px;
            font-weight:400; color:{INK_MUTED}; letter-spacing:.008em; }}
.contact .site {{ color:{FOREST}; font-weight:500; }}
.right {{ align-items:center; justify-content:center; gap:15px; }}
.qr {{ width:{QR_PX}px; height:{QR_PX}px; display:block; }}
.qr svg {{ width:100%; height:100%; display:block; shape-rendering:crispEdges; }}
.scan {{ font-size:25px; font-weight:600; letter-spacing:.18em; color:{INK_MUTED};
         text-align:center; }}
"""


def back_body(qr_svg: str) -> str:
    return f"""<div class="card"><div class="inner">
  <div class="col left">
    <div class="promise">Easier to understand.<br>Easier to trust.<br>Easier to find.</div>
    <div class="ident">
      <div class="who">MEGAN REEVES</div>
      <div class="hair"></div>
      <div class="contact">
        <div>{EMAIL}</div>
        <div class="site">{DOMAIN_LABEL}</div>
      </div>
    </div>
  </div>
  <div class="col right">
    <div class="qr">{qr_svg}</div>
    <div class="scan">SEE THE WORK</div>
  </div>
</div></div>"""


def render(html_path: pathlib.Path, png_path: pathlib.Path) -> None:
    subprocess.run(
        [CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
         "--force-device-scale-factor=1", "--default-background-color=00000000",
         f"--window-size={W},{H}", f"--screenshot={png_path}", f"file://{html_path}"],
        check=True, capture_output=True, timeout=120)


def render_pdf(html_paths: list[pathlib.Path], pdf_path: pathlib.Path) -> None:
    """Vector PDF per side: real embedded fonts, vector QR, raster only in the plate."""
    for hp in html_paths:
        subprocess.run(
            [CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
             f"--print-to-pdf={pdf_path.parent / (hp.stem + '.pdf')}", f"file://{hp}"],
            check=True, capture_output=True, timeout=120)


def verify_type(html_path: pathlib.Path, label: str) -> list[str]:
    """Read the measuring probe back out of the rendered DOM and gate on it:
    nothing below the print floor, nothing outside the safe area. Measured, not
    argued, and re-measured on every build so it cannot silently regress."""
    import json

    dom = subprocess.run(
        [CHROME, "--headless", "--disable-gpu", "--virtual-time-budget=3000",
         "--dump-dom", f"file://{html_path}"],
        check=True, capture_output=True, timeout=120).stdout.decode("utf-8", "replace")

    m = re.search(r'id="mira-metrics"[^>]*>(.*?)</div>', dom, re.S)
    if not m or not m.group(1).strip():
        sys.exit(f"{label}: measuring probe returned nothing. "
                 "A gate that cannot read the page is not a gate.")

    problems = []
    for el in json.loads(html_unescape(m.group(1))):
        pt = el["px"] / PT
        flag = ""
        if pt < MIN_PT:
            flag = f"BELOW {MIN_PT}pt PRINT FLOOR"
            problems.append(f"{label}: {pt:.1f}pt  {el['t']!r}  ({flag})")
        if el["l"] < SAFE - 1 or el["rt"] > W - SAFE + 1 or \
           el["tp"] < SAFE - 1 or el["b"] > H - SAFE + 1:
            over = (f"l={el['l']} r={el['rt']} t={el['tp']} b={el['b']} "
                    f"vs safe box [{SAFE},{SAFE},{W-SAFE},{H-SAFE}]")
            problems.append(f"{label}: {el['t']!r} breaks the safe area ({over})")
        print(f"    {pt:5.1f}pt  {'!' if flag else ' '} {el['t'][:40]!r}")
    return problems


def html_unescape(s: str) -> str:
    import html
    return html.unescape(s)


def proof_sheet() -> None:
    """A guides proof: bleed / trim / safe drawn over both faces, so the cut can be
    checked before money is spent on a print run. NOT a print file."""
    from PIL import Image, ImageDraw

    bleed = 37.5   # canvas edge -> trim
    safe = SAFE    # canvas edge -> safe
    faces = [Image.open(OUT / f"lift-card-{s}.png").convert("RGB") for s in ("front", "back")]
    gap = 40
    sheet = Image.new("RGB", (W + gap * 2, H * 2 + gap * 3), (228, 226, 220))
    d = ImageDraw.Draw(sheet)
    for i, face in enumerate(faces):
        oy = gap + i * (H + gap)
        sheet.paste(face, (gap, oy))
        d.rectangle([gap, oy, gap + W - 1, oy + H - 1], outline=(200, 60, 60), width=2)
        d.rectangle([gap + bleed, oy + bleed, gap + W - bleed, oy + H - bleed],
                    outline=(30, 110, 200), width=2)
        d.rectangle([gap + safe, oy + safe, gap + W - safe, oy + H - safe],
                    outline=(40, 160, 90), width=2)
    d.text((gap, 12), "RED = bleed edge (3.75x2.25in)   BLUE = trim / where it cuts "
                      "(3.5x2in)   GREEN = safe area. Proof only, do not send to print.",
           fill=(30, 30, 30))
    sheet.save(OUT / "PROOF-guides.png")


def verify_qr(png_path: pathlib.Path) -> None:
    """Acceptance is MEASURED, not argued. Decode the QR back off the finished card,
    including from degraded copies, or the build fails loudly."""
    import cv2
    import numpy as np

    img = cv2.imread(str(png_path))
    det = cv2.QRCodeDetector()
    checks = {
        "full 300dpi render": img,
        "phone-camera scale (900px wide)": cv2.resize(img, (900, int(900 * img.shape[0] / img.shape[1]))),
        "small/far scan (450px wide)": cv2.resize(img, (450, int(450 * img.shape[0] / img.shape[1]))),
    }
    ok, degraded = cv2.imencode(".jpg", img, [cv2.IMWRITE_JPEG_QUALITY, 40])
    if ok:
        checks["JPEG q40 (print + rescan noise)"] = cv2.imdecode(degraded, cv2.IMREAD_COLOR)

    failures = []
    for name, im in checks.items():
        data, *_ = det.detectAndDecode(im)
        status = "PASS" if data == URL else f"FAIL (got {data!r})"
        print(f"    {status:<28} {name}")
        if data != URL:
            failures.append(name)
    if failures:
        sys.exit(f"QR VERIFICATION FAILED on: {', '.join(failures)}. Card not shipped.")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    BUILD.mkdir(parents=True, exist_ok=True)

    print("  building QR ...")
    qr_svg, modules = build_qr()
    module_px = QR_PX / modules
    print(f"    {modules} modules across {QR_PX}px  =  {module_px:.1f}px/module "
          f"({module_px / 300 * 25.4:.2f}mm, print floor is 0.40mm)")
    if module_px / 300 * 25.4 < 0.40:
        sys.exit("QR modules below the 0.40mm print floor. Enlarge the QR.")

    front_html = BUILD / "lift-card-front.html"
    back_html = BUILD / "lift-card-back.html"
    front_html.write_text(page(FRONT_BODY, FRONT_CSS))
    back_html.write_text(page(back_body(qr_svg), BACK_CSS))

    print("  rendering ...")
    render(front_html, OUT / "lift-card-front.png")
    render(back_html, OUT / "lift-card-back.png")
    render_pdf([front_html, back_html], OUT / "x.pdf")

    proof_sheet()

    print("  measuring type against the print floor and the safe area ...")
    problems = verify_type(front_html, "front") + verify_type(back_html, "back")
    if problems:
        print()
        for p in problems:
            print(f"    {p}")
        sys.exit("\nTYPE GATE FAILED. Card not shipped.")

    print("  verifying the QR off the finished card ...")
    verify_qr(OUT / "lift-card-back.png")

    for junk in OUT.glob("x.pdf"):
        junk.unlink()
    print(f"\n  done -> {OUT}")


if __name__ == "__main__":
    if not pathlib.Path(CHROME).exists():
        sys.exit(f"Chrome not found at {CHROME}")
    main()
