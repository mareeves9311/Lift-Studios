#!/usr/bin/env python3
"""
Generate candidate scores and outreach drafts from a lead CSV.

Input CSV columns:
business_name,website,category,city,state,top_issue,secondary_issue,booking_path,credibility_notes,website_notes,email,contact_form,instagram

Output:
lead_tracker_scored.csv with score fields, recommended offer, outreach priority, and a drafted email.
"""

from __future__ import annotations

import argparse
import csv
from pathlib import Path


HIGH_VALUE_CATEGORIES = {
    "med spa",
    "medical spa",
    "aesthetic clinic",
    "aesthetics",
    "esthetician",
    "cosmetic dentist",
    "dentist",
    "interior designer",
    "wedding planner",
    "wedding photographer",
    "wellness clinic",
}

MEDIUM_VALUE_CATEGORIES = {
    "salon",
    "day spa",
    "spa",
    "boutique fitness",
    "photographer",
    "florist",
    "chiropractor",
    "physical therapy",
    "realtor",
    "restaurant",
    "cafe",
    "boutique",
}

WEAKNESS_TERMS = {
    "outdated",
    "dated",
    "confusing",
    "hard to book",
    "buried",
    "generic",
    "mobile",
    "slow",
    "unclear",
    "weak",
    "broken",
    "cluttered",
    "no cta",
    "missing",
}

CREDIBILITY_TERMS = {
    "reviews",
    "instagram",
    "active",
    "premium",
    "team",
    "photos",
    "before",
    "after",
    "testimonials",
    "press",
    "awards",
}


FIELDNAMES = [
    "business_name",
    "website",
    "category",
    "city",
    "state",
    "source",
    "contact_name",
    "email",
    "contact_form",
    "instagram",
    "score",
    "outreach_priority",
    "revenue_potential",
    "website_weakness",
    "conversion_path",
    "business_credibility",
    "personalization_easy",
    "top_issue",
    "secondary_issue",
    "recommended_offer",
    "pitch_angle",
    "draft_email",
    "outreach_status",
    "last_contacted",
    "follow_up_date",
    "response_status",
    "notes",
]


def clean(value: str | None) -> str:
    return (value or "").strip()


def category_score(category: str) -> int:
    category_l = category.lower()
    if any(term in category_l for term in HIGH_VALUE_CATEGORIES):
        return 4
    if any(term in category_l for term in MEDIUM_VALUE_CATEGORIES):
        return 3
    if category_l:
        return 2
    return 0


def weakness_score(notes: str, top_issue: str, secondary_issue: str) -> int:
    text = f"{notes} {top_issue} {secondary_issue}".lower()
    hits = sum(1 for term in WEAKNESS_TERMS if term in text)
    if hits >= 3:
        return 4
    if hits >= 2:
        return 3
    if hits == 1:
        return 2
    return 1 if text.strip() else 0


def conversion_score(booking_path: str, top_issue: str) -> int:
    text = f"{booking_path} {top_issue}".lower()
    if any(term in text for term in ["book", "booking", "schedule", "consult", "call", "inquire", "contact"]):
        if any(term in text for term in ["buried", "hard", "missing", "unclear", "hidden"]):
            return 4
        return 3
    return 2 if text.strip() else 1


def credibility_score(notes: str, instagram: str) -> int:
    text = f"{notes} {instagram}".lower()
    hits = sum(1 for term in CREDIBILITY_TERMS if term in text)
    if hits >= 3:
        return 4
    if hits >= 2:
        return 3
    if hits == 1:
        return 2
    return 1 if text.strip() else 0


def personalization_score(top_issue: str, secondary_issue: str) -> int:
    if top_issue and secondary_issue:
        return 4
    if top_issue:
        return 3
    return 1


def priority(score: int) -> str:
    if score >= 17:
        return "A-list: send personalized audit or Loom"
    if score >= 13:
        return "Good: send personalized cold email"
    if score >= 9:
        return "Maybe: send wide outreach"
    return "Skip"


def recommended_offer(category: str, top_issue: str) -> str:
    text = f"{category} {top_issue}".lower()
    if "shopify" in text or "boutique" in text:
        return "Product Page / Homepage Refresh"
    if "service" in text or "med spa" in text or "salon" in text or "esthetician" in text:
        return "Homepage + Service Page Refresh"
    if "wedding" in text or "photographer" in text:
        return "Homepage + Inquiry Flow Refresh"
    return "Homepage Refresh"


def pitch_angle(row: dict[str, str], offer: str) -> str:
    category = clean(row.get("category")).lower() or "business"
    issue = clean(row.get("top_issue")) or "the homepage could be clearer"
    action = conversion_action(row)
    return f"{offer} for a {category} site, focused on fixing: {issue}, so more visitors {action}."


def conversion_action(row: dict[str, str]) -> str:
    category = clean(row.get("category")).lower()
    booking_path = clean(row.get("booking_path")).lower()
    if any(term in f"{category} {booking_path}" for term in ["med spa", "salon", "spa", "esthetician", "wellness", "dentist", "chiropractor"]):
        return "book or request a consult"
    if any(term in category for term in ["wedding", "photographer", "interior"]):
        return "inquire"
    if any(term in category for term in ["restaurant", "cafe"]):
        return "call, reserve, or order"
    return "take the next step"


def draft_email(row: dict[str, str], offer: str) -> str:
    business = clean(row.get("business_name")) or "your business"
    name = clean(row.get("contact_name")) or "there"
    top_issue = clean(row.get("top_issue")) or "the homepage could make the next step clearer"
    secondary_issue = clean(row.get("secondary_issue")) or "the mobile experience could feel more polished"
    action = conversion_action(row)
    examples = improvement_examples(row)
    opener = opener_for(row)

    return (
        f"Subject: Quick website note for {business}\n\n"
        f"Hi {name},\n\n"
        f"{opener}\n\n"
        f"The main opportunity I noticed: {top_issue}. I also think {secondary_issue}.\n\n"
        f"A few specific things I would look at:\n"
        f"- {examples[0]}\n"
        f"- {examples[1]}\n"
        f"- {examples[2]}\n\n"
        f"I run Lift Studio, a boutique brand and content studio for local businesses. "
        f"The work is focused on practical clarity: stronger first impressions, clearer service positioning, "
        f"content direction, and a smoother path for visitors to {action}.\n\n"
        f"Would you be open to me sending over a short 3-point mini audit for {business}? "
        f"No pressure either way - I just noticed a few things that could be useful.\n\n"
        f"Best,\n"
        f"Megan"
    )


def opener_for(row: dict[str, str]) -> str:
    business = clean(row.get("business_name")) or "your business"
    category = clean(row.get("category")).lower()
    if any(term in category for term in ["med spa", "aesthetic", "esthetician"]):
        return f"I was looking at {business}'s site and can see there is already a strong base for consult-driven services."
    if any(term in category for term in ["salon", "spa", "nail"]):
        return f"I was looking at {business}'s site and can see there is already a clear local service/booking foundation."
    if "dentist" in category:
        return f"I was looking at {business}'s site and can see there is a good foundation for cosmetic or consult-based services."
    if "interior" in category:
        return f"I was looking at {business}'s site and can see there is a solid visual-service foundation to build from."
    if "wedding" in category or "photographer" in category:
        return f"I was looking at {business}'s site and can see there is already strong visual work to point people toward."
    return f"I was looking at {business}'s site and noticed a few areas where a focused refresh could make the next step clearer."


def improvement_examples(row: dict[str, str]) -> list[str]:
    category = clean(row.get("category")).lower()
    action = conversion_action(row)
    if any(term in category for term in ["med spa", "aesthetic", "esthetician"]):
        return [
            "Make the first screen more consult-focused so visitors know which treatment path to choose.",
            "Move trust signals like provider credentials, results, reviews, or appointment language closer to the booking decision.",
            "Group services in a simpler way so visitors do not have to sort through every option before reaching out.",
        ]
    if any(term in category for term in ["salon", "spa", "nail"]):
        return [
            "Make the booking path more obvious from the homepage and service pages.",
            "Bring service photos, reviews, pricing/menu context, or policies closer to where visitors decide.",
            "Tighten repeated or announcement-style copy so the page feels easier to scan on mobile.",
        ]
    if "dentist" in category:
        return [
            "Make cosmetic or high-value consult options easier to understand before visitors call.",
            "Place trust proof like credentials, reviews, and treatment explanations closer to the action step.",
            "Clarify the appointment request path so visitors know exactly how to start.",
        ]
    if "interior" in category:
        return [
            "Clarify the project types and consultation path earlier on the page.",
            "Use portfolio proof more strategically so visitors quickly understand style, scope, and fit.",
            "Make the inquiry path feel more premium and less buried.",
        ]
    if "wedding" in category or "photographer" in category:
        return [
            "Separate wedding, portrait, and inquiry paths so visitors can self-select faster.",
            "Make portfolio examples, testimonials, and package direction easier to scan.",
            "Make the inquiry call-to-action more visible before visitors leave to compare options.",
        ]
    return [
        f"Clarify the first screen so visitors understand what you offer and how to {action}.",
        "Move trust proof closer to the point where visitors make a decision.",
        "Tighten service or offer structure so the site is easier to scan on mobile.",
    ]


def score_row(row: dict[str, str]) -> dict[str, str]:
    category = clean(row.get("category"))
    top_issue = clean(row.get("top_issue"))
    secondary_issue = clean(row.get("secondary_issue"))
    website_notes = clean(row.get("website_notes"))
    booking_path = clean(row.get("booking_path"))
    credibility_notes = clean(row.get("credibility_notes"))
    instagram = clean(row.get("instagram"))

    revenue = category_score(category)
    weakness = weakness_score(website_notes, top_issue, secondary_issue)
    conversion = conversion_score(booking_path, top_issue)
    credibility = credibility_score(credibility_notes, instagram)
    personalization = personalization_score(top_issue, secondary_issue)
    total = revenue + weakness + conversion + credibility + personalization
    offer = recommended_offer(category, top_issue)

    scored = {field: clean(row.get(field)) for field in FIELDNAMES}
    scored.update(
        {
            "score": str(total),
            "outreach_priority": priority(total),
            "revenue_potential": str(revenue),
            "website_weakness": str(weakness),
            "conversion_path": str(conversion),
            "business_credibility": str(credibility),
            "personalization_easy": str(personalization),
            "recommended_offer": offer,
            "pitch_angle": pitch_angle(row, offer),
            "draft_email": draft_email(row, offer),
            "outreach_status": clean(row.get("outreach_status")) or "Not contacted",
        }
    )
    return scored


def main() -> None:
    parser = argparse.ArgumentParser(description="Score Lift Studio brand and content leads.")
    parser.add_argument("input_csv", type=Path)
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        default=Path("lead_tracker_scored.csv"),
    )
    args = parser.parse_args()

    with args.input_csv.open(newline="", encoding="utf-8-sig") as source:
        rows = list(csv.DictReader(source))

    scored_rows = [score_row(row) for row in rows]
    scored_rows.sort(key=lambda row: int(row["score"] or 0), reverse=True)

    with args.output.open("w", newline="", encoding="utf-8") as target:
        writer = csv.DictWriter(target, fieldnames=FIELDNAMES)
        writer.writeheader()
        writer.writerows(scored_rows)

    print(f"Wrote {len(scored_rows)} scored leads to {args.output}")


if __name__ == "__main__":
    main()
