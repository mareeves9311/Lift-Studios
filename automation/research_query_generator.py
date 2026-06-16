#!/usr/bin/env python3
"""Generate search queries for lead research batches."""

from __future__ import annotations

import argparse
import csv
from pathlib import Path
from urllib.parse import quote_plus


DEFAULT_NICHES = [
    "med spa",
    "esthetician",
    "salon",
    "day spa",
    "cosmetic dentist",
    "interior designer",
    "wedding photographer",
    "wedding planner",
    "boutique fitness studio",
    "chiropractor",
]

DEFAULT_AREAS = [
    "Hershey PA",
    "Harrisburg PA",
    "Camp Hill PA",
    "Mechanicsburg PA",
    "Lancaster PA",
    "York PA",
    "Lebanon PA",
    "Carlisle PA",
]


def build_queries(niches: list[str], areas: list[str]) -> list[dict[str, str]]:
    rows = []
    for area in areas:
        for niche in niches:
            query = f"{niche} {area} website book online"
            rows.append(
                {
                    "niche": niche,
                    "area": area,
                    "query": query,
                    "google_search_url": f"https://www.google.com/search?q={quote_plus(query)}",
                }
            )
    return rows


def load_lines(path: Path | None, fallback: list[str]) -> list[str]:
    if not path:
        return fallback
    return [line.strip() for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate niche/city lead research search URLs.")
    parser.add_argument("-n", "--niches", type=Path, help="Optional newline-delimited niche file.")
    parser.add_argument("-a", "--areas", type=Path, help="Optional newline-delimited area file.")
    parser.add_argument("-o", "--output", type=Path, default=Path("research_queries.csv"))
    args = parser.parse_args()

    niches = load_lines(args.niches, DEFAULT_NICHES)
    areas = load_lines(args.areas, DEFAULT_AREAS)
    rows = build_queries(niches, areas)

    with args.output.open("w", newline="", encoding="utf-8") as target:
        writer = csv.DictWriter(target, fieldnames=["niche", "area", "query", "google_search_url"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"Wrote {len(rows)} search queries to {args.output}")


if __name__ == "__main__":
    main()
