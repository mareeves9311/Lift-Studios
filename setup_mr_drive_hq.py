#!/usr/bin/env python3
from __future__ import annotations

import sys
from pathlib import Path

GOOGLE_SUITE = Path("/Users/meganreeves/Desktop/Desktop Organized/Scripts & Tools/shared_integrations/google_suite")
sys.path.insert(0, str(GOOGLE_SUITE))

from docs import create_doc, replace_doc_text  # noqa: E402
from drive import create_folder, move_file, upload_file  # noqa: E402


ROOT = Path(__file__).resolve().parent / "MR Content Growth Kit"
PARENT_FOLDER_ID = "1WF45mgKymDClCs_rLXjRZzOArscYb63L"
LEAD_TRACKER_ID = "1ZUgq7srd2P835fA_Kge80ZpiFJjvUwBR_PXCjZsU688"


FOLDERS = {
    "tracker": "01 Prospect Tracker + Pipeline",
    "attachments": "02 Client Outreach Attachments",
    "audits": "03 Mini Audits + Prospect-Specific Pitches",
    "samples": "04 Sample Brand + Content Kits",
    "templates": "05 Templates + Scripts",
}

EXISTING_FOLDER_IDS = {
    "tracker": "1bAuLeOCo5GvZ8Uiz0MDJB6tkQk5PYCK5",
    "attachments": "1Q6JcmNgNqOQzvGT5l_IfgIyl15bNQPwS",
    "audits": "1YFjOiKD-Xn1BBhViWG-lp7T1r1OGVD8W",
    "samples": "1QTpi7cXtDvJMIx4d7bpEtgWFQip2vo-L",
    "templates": "1LWiiJT8IW6wBnZGIWOTqX5WTUxoJFh4n",
}


DOCS = [
    ("drive_hq_start_here.md", "00 START HERE - Local Content Growth Kit HQ", "attachments"),
    (
        "outreach_attachment_service_overview_sample_content.md",
        "Reusable Outreach Attachment - Service Overview + Sample Content Examples",
        "attachments",
    ),
    ("service_pricing_overview.md", "Service + Pricing Overview", "attachments"),
    ("morning_fuel_mechanicsburg_mini_audit.md", "Morning Fuel Mechanicsburg - Mini Audit", "audits"),
    ("morning_fuel_mechanicsburg_lookbook_copy.md", "Morning Fuel Mechanicsburg - Lookbook Copy", "audits"),
    ("morning_fuel_mechanicsburg_outreach.md", "Morning Fuel Mechanicsburg - Outreach Drafts", "audits"),
    ("audit_template.md", "Template - Local Business Audit", "templates"),
    ("lookbook_outline.md", "Template - Client Lookbook Outline", "templates"),
    ("sample_content_bucket.md", "Template - Sample Monthly Content Bucket", "templates"),
    ("service_offer.md", "Template - Service Offer", "templates"),
    ("pricing.md", "Template - Pricing", "templates"),
    ("outreach_messages.md", "Template - Outreach Messages", "templates"),
    ("tool_stack.md", "Template - Tool Stack", "templates"),
    ("first_30_day_plan.md", "Template - First 30 Day Plan", "templates"),
    ("example_medspa_mini_audit.md", "Sample - Medspa Mini Audit", "samples"),
]


def create_google_doc(markdown_path: Path, title: str, folder_id: str) -> dict:
    text = markdown_path.read_text(encoding="utf-8")
    created = create_doc(title)
    replace_doc_text(created["documentId"], text)
    moved = move_file(created["documentId"], folder_id)
    return {
        "title": title,
        "id": created["documentId"],
        "url": f"https://docs.google.com/document/d/{created['documentId']}/edit",
        "folder_move": moved.get("webViewLink"),
    }


def main() -> None:
    created_folders = {}
    print("Using/creating subfolders...")
    for key, name in FOLDERS.items():
        if key in EXISTING_FOLDER_IDS:
            created_folders[key] = EXISTING_FOLDER_IDS[key]
            print(f"- {name}: https://drive.google.com/drive/folders/{created_folders[key]}")
        else:
            folder = create_folder(name, PARENT_FOLDER_ID)
            created_folders[key] = folder["id"]
            print(f"- {name}: {folder.get('webViewLink')}")

    print("\nCreating lead tracker reference doc...")
    tracker_text = (
        "# MR Automation - Lead Tracker\n\n"
        "Live tracker:\n"
        f"https://docs.google.com/spreadsheets/d/{LEAD_TRACKER_ID}/edit\n\n"
        "Use this sheet to manage leads, mini audits, outreach status, follow-ups, and revenue.\n\n"
        "Primary tabs:\n"
        "- Dashboard\n"
        "- Leads\n"
        "- Outreach Queue\n"
        "- Mini Audits\n"
        "- Follow Ups\n"
        "- Search Queries\n"
        "- Niches And Areas\n"
        "- Revenue\n"
    )
    tracker_doc = create_doc("Live Link - MR Automation Lead Tracker")
    replace_doc_text(tracker_doc["documentId"], tracker_text)
    move_file(tracker_doc["documentId"], created_folders["tracker"])
    print(f"- Live tracker reference: https://docs.google.com/document/d/{tracker_doc['documentId']}/edit")

    print("\nCreating Google Docs...")
    for filename, title, folder_key in DOCS:
        source = ROOT / filename
        if not source.exists():
            print(f"- SKIP missing: {filename}")
            continue
        doc = create_google_doc(source, title, created_folders[folder_key])
        print(f"- {doc['title']}: {doc['url']}")

    print("\nUploading CSV tracker backup...")
    csv_path = ROOT / "target_list_template.csv"
    uploaded = upload_file(csv_path, created_folders["tracker"], "text/csv")
    print(f"- {uploaded['name']}: {uploaded.get('webViewLink')}")

    print("\nDone.")


if __name__ == "__main__":
    main()
