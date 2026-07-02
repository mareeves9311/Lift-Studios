#!/usr/bin/env python3
"""Download first-party image assets from a public website.

Dependencies:
  python3 -m pip install requests beautifulsoup4
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import mimetypes
import time
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin, urlparse


IMAGE_EXTENSIONS = {".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Download first-party public image assets.")
    parser.add_argument("url", help="Public website URL.")
    parser.add_argument("output_dir", help="Directory for downloaded assets.")
    parser.add_argument("--limit", type=int, default=80, help="Maximum assets to download.")
    parser.add_argument("--delay", type=float, default=0.25, help="Delay between downloads.")
    parser.add_argument("--dry-run", action="store_true", help="List assets without downloading.")
    return parser.parse_args()


def same_site(page_url: str, asset_url: str) -> bool:
    page_host = urlparse(page_url).netloc.lower().removeprefix("www.")
    asset_host = urlparse(asset_url).netloc.lower().removeprefix("www.")
    return not asset_host or asset_host == page_host


def clean_extension(url: str, content_type: str | None = None) -> str:
    suffix = Path(urlparse(url).path).suffix.lower()
    if suffix in IMAGE_EXTENSIONS:
        return suffix
    if content_type:
        guessed = mimetypes.guess_extension(content_type.split(";")[0].strip())
        if guessed in IMAGE_EXTENSIONS:
            return guessed
    return ".img"


def collect_urls(page_url: str) -> list[str]:
    try:
        import requests
        from bs4 import BeautifulSoup
    except ImportError as exc:
        raise SystemExit("Missing dependencies: install `requests beautifulsoup4`.") from exc

    response = requests.get(page_url, timeout=20, headers={"User-Agent": "LiftAudit/1.0"})
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    urls: set[str] = set()

    for tag in soup.find_all(["img", "source"]):
        for attr in ("src", "data-src", "srcset"):
            raw = tag.get(attr)
            if not raw:
                continue
            candidates = [part.strip().split(" ")[0] for part in raw.split(",")]
            for candidate in candidates:
                full = urljoin(page_url, candidate)
                if same_site(page_url, full):
                    urls.add(full)

    for tag in soup.find_all("link"):
        rel = " ".join(tag.get("rel", []))
        href = tag.get("href")
        if href and any(word in rel.lower() for word in ("icon", "apple-touch-icon", "preload")):
            full = urljoin(page_url, href)
            if same_site(page_url, full):
                urls.add(full)

    return sorted(urls)


def download_assets(page_url: str, output_dir: Path, limit: int, delay: float, dry_run: bool) -> None:
    import requests

    output_dir.mkdir(parents=True, exist_ok=True)
    metadata_path = output_dir / "downloaded-assets.csv"
    rows: list[dict[str, str]] = []

    for index, asset_url in enumerate(collect_urls(page_url)[:limit], start=1):
        print(asset_url)
        if dry_run:
            rows.append({"filename": "", "source_url": asset_url, "status": "dry-run"})
            continue

        try:
            response = requests.get(asset_url, timeout=25, headers={"User-Agent": "LiftAudit/1.0"})
            response.raise_for_status()
        except requests.RequestException as exc:
            rows.append({"filename": "", "source_url": asset_url, "status": f"error: {exc}"})
            continue

        digest = hashlib.sha1(response.content).hexdigest()[:12]
        ext = clean_extension(asset_url, response.headers.get("content-type"))
        filename = f"asset-{index:03d}-{digest}{ext}"
        path = output_dir / filename
        if not path.exists():
            path.write_bytes(response.content)
        rows.append({"filename": filename, "source_url": asset_url, "status": "downloaded"})
        time.sleep(delay)

    with metadata_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=["filename", "source_url", "status"])
        writer.writeheader()
        writer.writerows(rows)
    print(f"Wrote {metadata_path}")


def main() -> None:
    args = parse_args()
    if not args.url.startswith(("http://", "https://")):
        raise SystemExit("URL must start with http:// or https://")
    download_assets(args.url, Path(args.output_dir), args.limit, args.delay, args.dry_run)


if __name__ == "__main__":
    main()
