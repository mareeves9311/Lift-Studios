#!/usr/bin/env python3
"""Validate that a liftaudit folder is ready for concept generation."""

from __future__ import annotations

import argparse
import csv
from pathlib import Path


REQUIRED_FILES = [
    "01-research/live-site-audit.md",
    "01-research/channel-comparison.md",
    "02-assets/asset-manifest.csv",
    "02-assets/source-manifest.md",
    "02-assets/brand-snapshot.md",
    "03-strategy/selected-channels.md",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate liftaudit readiness.")
    parser.add_argument("audit_dir", help="Audit folder, e.g. audits/brand-slug")
    parser.add_argument("--require-logo", action="store_true", help="Require at least one official logo asset.")
    return parser.parse_args()


def nonempty_file(path: Path) -> bool:
    return path.exists() and path.is_file() and path.stat().st_size > 0


def manifest_has_logo(path: Path) -> bool:
    if not path.exists():
        return False
    with path.open(newline="", encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            text = " ".join(
                [
                    row.get("filename", ""),
                    row.get("asset_type", ""),
                    row.get("status", ""),
                    row.get("notes", ""),
                ]
            ).lower()
            if "logo" in text and ("official" in text or "first-party" in text):
                return True
    return False


def validate(audit_dir: Path, require_logo: bool) -> int:
    missing: list[str] = []
    for rel in REQUIRED_FILES:
        path = audit_dir / rel
        if not nonempty_file(path):
            missing.append(rel)

    screenshots = audit_dir / "01-research" / "screenshots"
    if not screenshots.exists():
        missing.append("01-research/screenshots/")

    official_dir = audit_dir / "02-assets" / "official"
    if not official_dir.exists():
        missing.append("02-assets/official/")

    manifest = audit_dir / "02-assets" / "asset-manifest.csv"
    if require_logo and not manifest_has_logo(manifest):
        missing.append("official logo row in 02-assets/asset-manifest.csv")

    if missing:
        print("NOT READY for polished concept generation.")
        print("Missing or incomplete:")
        for item in missing:
            print(f"- {item}")
        return 1

    print("READY for next phase.")
    print("Required audit, asset, source, brand snapshot, and channel-selection files are present.")
    if not require_logo:
        print("Logo row was not required for this validation. Use --require-logo before polished visuals.")
    return 0


def main() -> None:
    args = parse_args()
    raise SystemExit(validate(Path(args.audit_dir), args.require_logo))


if __name__ == "__main__":
    main()
