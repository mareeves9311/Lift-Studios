#!/usr/bin/env python3
"""Run the full scoring, mini-audit, and follow-up pipeline for one lead batch."""

from __future__ import annotations

import argparse
import subprocess
from datetime import date
from pathlib import Path


def run(command: list[str]) -> None:
    print(" ".join(command))
    subprocess.run(command, check=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Process one MR lead batch.")
    parser.add_argument("input_csv", type=Path)
    parser.add_argument("--start-date", default=date.today().isoformat())
    parser.add_argument("--mini-audit-min-score", type=int, default=13)
    parser.add_argument("--followup-min-score", type=int, default=9)
    args = parser.parse_args()

    stem = args.input_csv.stem
    scored = Path(f"{stem}_scored.csv")
    audits = Path(f"{stem}_mini_audits.csv")
    followups = Path(f"{stem}_followups.csv")

    run(["python3", "lead_audit_generator.py", str(args.input_csv), "-o", str(scored)])
    run(
        [
            "python3",
            "mini_audit_generator.py",
            str(scored),
            "-o",
            str(audits),
            "--min-score",
            str(args.mini_audit_min_score),
        ]
    )
    run(
        [
            "python3",
            "followup_scheduler.py",
            str(scored),
            "-o",
            str(followups),
            "--start-date",
            args.start_date,
            "--min-score",
            str(args.followup_min_score),
        ]
    )

    print("\nDone.")
    print(f"Scored leads: {scored}")
    print(f"Mini-audits: {audits}")
    print(f"Follow-ups: {followups}")


if __name__ == "__main__":
    main()
