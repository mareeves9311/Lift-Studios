#!/usr/bin/env python3
"""Capture desktop and mobile screenshots for a public webpage.

Dependencies:
  python3 -m pip install playwright
  python3 -m playwright install chromium
"""

from __future__ import annotations

import argparse
import asyncio
from pathlib import Path
from typing import Iterable


VIEWPORTS = {
    "desktop": {"width": 1440, "height": 1200},
    "mobile": {"width": 390, "height": 844, "is_mobile": True},
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Capture desktop and mobile screenshots.")
    parser.add_argument("url", help="Public URL to capture.")
    parser.add_argument("output_dir", help="Directory for screenshots.")
    parser.add_argument("--wait-ms", type=int, default=1500, help="Extra wait time after load.")
    parser.add_argument("--full-page", action="store_true", help="Capture full-page screenshots.")
    return parser.parse_args()


async def capture(url: str, output_dir: Path, wait_ms: int, full_page: bool) -> None:
    try:
        from playwright.async_api import async_playwright
    except ImportError as exc:
        raise SystemExit(
            "Missing dependency: playwright. Install with "
            "`python3 -m pip install playwright` and `python3 -m playwright install chromium`."
        ) from exc

    output_dir.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        try:
            for name, viewport in VIEWPORTS.items():
                context = await browser.new_context(viewport=viewport)
                page = await context.new_page()
                try:
                    await page.goto(url, wait_until="networkidle", timeout=45000)
                    await page.wait_for_timeout(wait_ms)
                    target = output_dir / f"{name}.png"
                    await page.screenshot(path=str(target), full_page=full_page)
                    print(f"Captured {target}")
                finally:
                    await context.close()
        finally:
            await browser.close()


def main() -> None:
    args = parse_args()
    if not args.url.startswith(("http://", "https://")):
        raise SystemExit("URL must start with http:// or https://")
    asyncio.run(capture(args.url, Path(args.output_dir), args.wait_ms, args.full_page))


if __name__ == "__main__":
    main()
