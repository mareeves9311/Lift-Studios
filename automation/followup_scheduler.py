#!/usr/bin/env python3
"""Create follow-up dates for outreach leads."""

from __future__ import annotations

import argparse
import csv
from datetime import date, datetime, timedelta
from pathlib import Path


OUTPUT_FIELDS = [
    "business_name",
    "website",
    "category",
    "city",
    "state",
    "email",
    "contact_form",
    "instagram",
    "score",
    "outreach_priority",
    "outreach_status",
    "initial_outreach_date",
    "follow_up_1_date",
    "follow_up_2_date",
    "recycle_date",
    "response_status",
    "notes",
]


def clean(value: str | None) -> str:
    return (value or "").strip()


def parse_date(value: str | None, fallback: date) -> date:
    value = clean(value)
    if not value:
        return fallback
    for fmt in ("%Y-%m-%d", "%m/%d/%Y", "%m/%d/%y"):
        try:
            return datetime.strptime(value, fmt).date()
        except ValueError:
            continue
    return fallback


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate follow-up schedule from scored leads.")
    parser.add_argument("scored_csv", type=Path)
    parser.add_argument("-o", "--output", type=Path, default=Path("followup_schedule.csv"))
    parser.add_argument("--start-date", help="Initial outreach date, YYYY-MM-DD. Defaults to today.")
    parser.add_argument("--min-score", type=int, default=9)
    args = parser.parse_args()

    start = parse_date(args.start_date, date.today())

    with args.scored_csv.open(newline="", encoding="utf-8-sig") as source:
        rows = list(csv.DictReader(source))

    scheduled = []
    for row in rows:
        try:
            score = int(clean(row.get("score")) or 0)
        except ValueError:
            score = 0
        if score < args.min_score:
            continue
        scheduled.append(
            {
                "business_name": clean(row.get("business_name")),
                "website": clean(row.get("website")),
                "category": clean(row.get("category")),
                "city": clean(row.get("city")),
                "state": clean(row.get("state")),
                "email": clean(row.get("email")),
                "contact_form": clean(row.get("contact_form")),
                "instagram": clean(row.get("instagram")),
                "score": str(score),
                "outreach_priority": clean(row.get("outreach_priority")),
                "outreach_status": "Ready",
                "initial_outreach_date": start.isoformat(),
                "follow_up_1_date": (start + timedelta(days=3)).isoformat(),
                "follow_up_2_date": (start + timedelta(days=7)).isoformat(),
                "recycle_date": (start + timedelta(days=21)).isoformat(),
                "response_status": "",
                "notes": clean(row.get("notes")),
            }
        )

    with args.output.open("w", newline="", encoding="utf-8") as target:
        writer = csv.DictWriter(target, fieldnames=OUTPUT_FIELDS)
        writer.writeheader()
        writer.writerows(scheduled)

    print(f"Wrote {len(scheduled)} scheduled leads to {args.output}")


if __name__ == "__main__":
    main()
