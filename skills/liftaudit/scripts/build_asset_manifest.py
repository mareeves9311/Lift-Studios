#!/usr/bin/env python3
"""Build an asset manifest CSV from a local asset folder."""

from __future__ import annotations

import argparse
import csv
import mimetypes
from pathlib import Path


FIELDNAMES = [
    "filename",
    "asset_type",
    "source_url",
    "status",
    "file_format",
    "pixel_dimensions",
    "file_size",
    "intended_use",
    "rights_or_reuse_caution",
    "notes",
]


IMAGE_EXTENSIONS = {".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build asset-manifest.csv from files.")
    parser.add_argument("asset_dir", help="Asset directory to scan.")
    parser.add_argument("output_csv", help="CSV output path.")
    parser.add_argument("--source-metadata", help="Optional downloaded-assets.csv with source URLs.")
    return parser.parse_args()


def load_sources(path: Path | None) -> dict[str, str]:
    if not path or not path.exists():
        return {}
    with path.open(newline="", encoding="utf-8") as handle:
        return {row.get("filename", ""): row.get("source_url", "") for row in csv.DictReader(handle)}


def image_dimensions(path: Path) -> str:
    if path.suffix.lower() == ".svg":
        return "svg"
    try:
        from PIL import Image
    except ImportError:
        return ""
    try:
        with Image.open(path) as image:
            return f"{image.width}x{image.height}"
    except Exception:
        return ""


def infer_type(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix in IMAGE_EXTENSIONS:
        name = path.name.lower()
        if "logo" in name:
            return "logo"
        if "icon" in name or "favicon" in name:
            return "icon"
        return "image"
    return mimetypes.guess_type(path.name)[0] or "file"


def build_manifest(asset_dir: Path, output_csv: Path, source_metadata: Path | None) -> None:
    if not asset_dir.exists():
        raise SystemExit(f"Asset directory not found: {asset_dir}")
    sources = load_sources(source_metadata)
    rows: list[dict[str, str]] = []
    for path in sorted(item for item in asset_dir.rglob("*") if item.is_file()):
        rel = path.relative_to(asset_dir).as_posix()
        rows.append(
            {
                "filename": rel,
                "asset_type": infer_type(path),
                "source_url": sources.get(path.name, ""),
                "status": "needs human classification",
                "file_format": path.suffix.lower().lstrip("."),
                "pixel_dimensions": image_dimensions(path),
                "file_size": str(path.stat().st_size),
                "intended_use": "",
                "rights_or_reuse_caution": "Verify official status and reuse rights before visual use.",
                "notes": "",
            }
        )
    output_csv.parent.mkdir(parents=True, exist_ok=True)
    with output_csv.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELDNAMES)
        writer.writeheader()
        writer.writerows(rows)
    print(f"Wrote {output_csv} with {len(rows)} assets")


def main() -> None:
    args = parse_args()
    source_path = Path(args.source_metadata) if args.source_metadata else None
    build_manifest(Path(args.asset_dir), Path(args.output_csv), source_path)


if __name__ == "__main__":
    main()
