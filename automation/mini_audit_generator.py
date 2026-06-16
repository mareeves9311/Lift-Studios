#!/usr/bin/env python3
"""Create useful, sendable mini-audits from scored website-refresh leads.

The goal is to give each prospect one genuinely helpful diagnosis before
pitching a small paid cleanup. These are still first-pass audits, but they
should feel specific enough to earn a reply.
"""

from __future__ import annotations

import argparse
import csv
from pathlib import Path


OUTPUT_FIELDS = [
    "business_name",
    "website",
    "category",
    "city",
    "state",
    "score",
    "outreach_priority",
    "recommended_offer",
    "audit_quality_score",
    "specific_observation",
    "business_impact",
    "quick_win",
    "mini_audit",
    "paid_offer",
    "send_readiness",
]


def clean(value: str | None) -> str:
    return (value or "").strip()


def action_for_category(category: str) -> str:
    category_l = category.lower()
    if any(term in category_l for term in ["med spa", "aesthetic", "salon", "spa", "esthetician", "dentist", "chiropractor"]):
        return "book or request a consultation"
    if any(term in category_l for term in ["wedding", "photographer", "interior"]):
        return "submit an inquiry"
    if any(term in category_l for term in ["restaurant", "cafe"]):
        return "call, reserve, or place an order"
    return "take the next step"


def outcome_for_category(category: str) -> str:
    category_l = category.lower()
    if any(term in category_l for term in ["med spa", "aesthetic", "esthetician"]):
        return "turn more curious visitors into booked consults"
    if any(term in category_l for term in ["salon", "spa", "nail"]):
        return "turn more local browsers into booked appointments"
    if "dentist" in category_l:
        return "make higher-value cosmetic consults feel easier to request"
    if "interior" in category_l:
        return "turn portfolio interest into qualified project inquiries"
    if any(term in category_l for term in ["wedding", "photographer"]):
        return "turn portfolio views into wedding or session inquiries"
    return "turn more visitors into real inquiries"


def proof_point_for_category(category: str) -> str:
    category_l = category.lower()
    if any(term in category_l for term in ["med spa", "aesthetic", "esthetician", "dentist"]):
        return "provider credentials, treatment results, client reviews, and clear appointment language"
    if any(term in category_l for term in ["salon", "spa", "nail"]):
        return "service photos, clear pricing or service menus, reviews, and an easy booking path"
    if "interior" in category_l:
        return "portfolio proof, before-and-after context, project types, and a clear consultation path"
    if any(term in category_l for term in ["wedding", "photographer"]):
        return "portfolio examples, package direction, testimonials, and a clear inquiry path"
    return "trust proof, offer clarity, and a clear next step"


def quick_win_for(row: dict[str, str]) -> str:
    category = clean(row.get("category")) or "business"
    issue = clean(row.get("top_issue")) or "the homepage could make the next step clearer"
    action = action_for_category(category)
    proof = proof_point_for_category(category)

    return (
        f"Rewrite the first screen so it answers three things in under 5 seconds: "
        f"what you offer, why someone should trust you, and how to {action}. "
        f"Then support that with {proof}."
    )


def audit_quality_score(row: dict[str, str]) -> str:
    score = 0
    if clean(row.get("top_issue")):
        score += 2
    if clean(row.get("secondary_issue")):
        score += 2
    if clean(row.get("recommended_offer")):
        score += 1
    if clean(row.get("website")):
        score += 1
    if clean(row.get("category")):
        score += 1
    return f"{score}/7"


def send_readiness(row: dict[str, str]) -> str:
    quality = audit_quality_score(row)
    if quality == "7/7":
        return "Ready to send"
    return "Review once before sending"


def build_mini_audit(row: dict[str, str]) -> str:
    business = clean(row.get("business_name")) or "the business"
    category = clean(row.get("category")) or "local business"
    top_issue = clean(row.get("top_issue")) or "the homepage could make the next step clearer"
    secondary_issue = clean(row.get("secondary_issue")) or "the service or offer structure could be easier to scan"
    offer = clean(row.get("recommended_offer")) or "Homepage Refresh"
    action = action_for_category(category)
    outcome = outcome_for_category(category)
    proof = proof_point_for_category(category)
    quick_win = quick_win_for(row)

    return (
        f"Mini Website Audit: {business}\n\n"
        f"1. What is already working\n"
        f"- You already have the core pieces a new visitor needs: a defined service category, a live website, and enough credibility to build from.\n\n"
        f"2. Main conversion issue\n"
        f"- {top_issue.capitalize()}.\n"
        f"- Why this matters: if a visitor has to work too hard to understand the best next step, they are more likely to bounce, compare options, or put off reaching out.\n\n"
        f"3. Secondary trust or clarity issue\n"
        f"- {secondary_issue.capitalize()}.\n"
        f"- The page should make {proof} easier to notice before someone decides whether to {action}.\n\n"
        f"4. Quick win\n"
        f"- {quick_win}\n\n"
        f"5. Recommended first fix\n"
        f"- Start with a focused {offer.lower()} aimed at one outcome: {outcome}. "
        f"This is better than a full redesign right away because it is faster, more affordable, and easier to measure."
    )


def build_paid_offer(row: dict[str, str]) -> str:
    offer = clean(row.get("recommended_offer")) or "Homepage Refresh"
    category = clean(row.get("category")) or "business"
    action = action_for_category(category)
    return (
        f"Recommended paid offer: {offer}\n\n"
        f"What I would clean up:\n"
        f"- Clearer homepage headline and opening section\n"
        f"- Stronger call-to-action so visitors know how to {action}\n"
        f"- Cleaner service positioning and page hierarchy\n"
        f"- Trust proof placed closer to the decision point\n"
        f"- Mobile-first layout recommendations\n"
        f"- Basic SEO title and meta description cleanup\n\n"
        f"Starting price: $650\n"
        f"Estimated turnaround: 3-5 business days\n"
        f"Best next step: send a short Loom-style walkthrough or 3-point written audit before offering the paid cleanup."
    )


def should_include(row: dict[str, str], min_score: int) -> bool:
    try:
        return int(clean(row.get("score")) or 0) >= min_score
    except ValueError:
        return False


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate mini-audits from scored lead CSV.")
    parser.add_argument("scored_csv", type=Path)
    parser.add_argument("-o", "--output", type=Path, default=Path("mini_audits.csv"))
    parser.add_argument("--min-score", type=int, default=13)
    args = parser.parse_args()

    with args.scored_csv.open(newline="", encoding="utf-8-sig") as source:
        rows = [row for row in csv.DictReader(source) if should_include(row, args.min_score)]

    output_rows = []
    for row in rows:
        output_rows.append(
            {
                "business_name": clean(row.get("business_name")),
                "website": clean(row.get("website")),
                "category": clean(row.get("category")),
                "city": clean(row.get("city")),
                "state": clean(row.get("state")),
                "score": clean(row.get("score")),
                "outreach_priority": clean(row.get("outreach_priority")),
                "recommended_offer": clean(row.get("recommended_offer")),
                "audit_quality_score": audit_quality_score(row),
                "specific_observation": clean(row.get("top_issue")),
                "business_impact": outcome_for_category(clean(row.get("category"))),
                "quick_win": quick_win_for(row),
                "mini_audit": build_mini_audit(row),
                "paid_offer": build_paid_offer(row),
                "send_readiness": send_readiness(row),
            }
        )

    with args.output.open("w", newline="", encoding="utf-8") as target:
        writer = csv.DictWriter(target, fieldnames=OUTPUT_FIELDS)
        writer.writeheader()
        writer.writerows(output_rows)

    print(f"Wrote {len(output_rows)} mini-audits to {args.output}")


if __name__ == "__main__":
    main()
