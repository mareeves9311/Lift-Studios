#!/usr/bin/env python3
"""Extract a draft color palette from supplied local images.

Dependency:
  python3 -m pip install Pillow
"""

from __future__ import annotations

import argparse
from collections import Counter
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Extract a draft palette from images.")
    parser.add_argument("images", nargs="+", help="Image paths.")
    parser.add_argument("--colors", type=int, default=8, help="Number of colors to output.")
    parser.add_argument("--preview", help="Optional HTML preview path.")
    return parser.parse_args()


def to_hex(rgb: tuple[int, int, int]) -> str:
    return "#{:02x}{:02x}{:02x}".format(*rgb)


def extract_palette(paths: list[Path], color_count: int) -> list[str]:
    try:
        from PIL import Image
    except ImportError as exc:
        raise SystemExit("Missing dependency: install `Pillow`.") from exc

    counter: Counter[tuple[int, int, int]] = Counter()
    for path in paths:
        if not path.exists():
            raise SystemExit(f"Image not found: {path}")
        with Image.open(path) as image:
            image = image.convert("RGB")
            image.thumbnail((240, 240))
            quantized = image.quantize(colors=max(color_count, 2), method=Image.Quantize.MEDIANCUT)
            palette = quantized.convert("RGB")
            counter.update(palette.getdata())
    return [to_hex(color) for color, _ in counter.most_common(color_count)]


def write_preview(colors: list[str], path: Path) -> None:
    swatches = "\n".join(
        f'<div class="swatch"><span style="background:{color}"></span><code>{color}</code></div>'
        for color in colors
    )
    html = f"""<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>Draft Palette</title>
<style>
body {{ font-family: system-ui, sans-serif; padding: 32px; }}
.swatch {{ display: flex; align-items: center; gap: 12px; margin: 10px 0; }}
.swatch span {{ display: block; width: 72px; height: 48px; border: 1px solid #ddd; }}
</style>
<h1>Draft Palette - Requires Human Verification</h1>
{swatches}
</html>
"""
    path.write_text(html, encoding="utf-8")


def main() -> None:
    args = parse_args()
    palette = extract_palette([Path(item) for item in args.images], args.colors)
    print("Draft palette. Verify against official brand sources before use.")
    for color in palette:
        print(color)
    if args.preview:
        write_preview(palette, Path(args.preview))
        print(f"Wrote {args.preview}")


if __name__ == "__main__":
    main()
