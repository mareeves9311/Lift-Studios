#!/usr/bin/env python3
"""Build a multi-tab XLSX workbook for the Google Drive MR hub.

This uses only the Python standard library so the workbook can be generated
without installing spreadsheet packages.
"""

from __future__ import annotations

import csv
import re
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape


ROOT = Path(__file__).resolve().parent
OUT = ROOT / "mr_automation_lead_tracker.xlsx"


def read_csv(path: Path) -> list[list[str]]:
    with path.open(newline="", encoding="utf-8-sig") as source:
        return [list(row) for row in csv.reader(source)]


def col_name(index: int) -> str:
    name = ""
    index += 1
    while index:
        index, remainder = divmod(index - 1, 26)
        name = chr(65 + remainder) + name
    return name


def cell_ref(row: int, col: int) -> str:
    return f"{col_name(col)}{row + 1}"


def safe_sheet_xml_name(name: str) -> str:
    return re.sub(r"[^A-Za-z0-9_]", "_", name)


def value_cell(ref: str, value: str, style: int = 0) -> str:
    if value.startswith("="):
        return f'<c r="{ref}" s="{style}"><f>{escape(value[1:])}</f></c>'
    return (
        f'<c r="{ref}" t="inlineStr" s="{style}">'
        f"<is><t>{escape(value)}</t></is>"
        f"</c>"
    )


def worksheet_xml(rows: list[list[str]], freeze_header: bool = True) -> str:
    sheet_views = ""
    if freeze_header:
        sheet_views = (
            "<sheetViews><sheetView workbookViewId=\"0\">"
            "<pane ySplit=\"1\" topLeftCell=\"A2\" activePane=\"bottomLeft\" state=\"frozen\"/>"
            "</sheetView></sheetViews>"
        )
    row_xml = []
    for r_idx, row in enumerate(rows):
        cells = []
        style = 1 if r_idx == 0 else 0
        for c_idx, value in enumerate(row):
            cells.append(value_cell(cell_ref(r_idx, c_idx), str(value), style))
        row_xml.append(f'<row r="{r_idx + 1}">{"".join(cells)}</row>')
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        f"{sheet_views}<sheetData>{''.join(row_xml)}</sheetData>"
        "</worksheet>"
    )


def workbook_xml(sheet_names: list[str]) -> str:
    sheets = []
    for idx, name in enumerate(sheet_names, start=1):
        sheets.append(f'<sheet name="{escape(name)}" sheetId="{idx}" r:id="rId{idx}"/>')
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        f"<sheets>{''.join(sheets)}</sheets>"
        "</workbook>"
    )


def workbook_rels(sheet_names: list[str]) -> str:
    rels = []
    for idx, name in enumerate(sheet_names, start=1):
        rels.append(
            f'<Relationship Id="rId{idx}" '
            'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" '
            f'Target="worksheets/{safe_sheet_xml_name(name)}.xml"/>'
        )
    rels.append(
        f'<Relationship Id="rId{len(sheet_names) + 1}" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" '
        'Target="styles.xml"/>'
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        f"{''.join(rels)}"
        "</Relationships>"
    )


def root_rels() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" '
        'Target="xl/workbook.xml"/>'
        "</Relationships>"
    )


def content_types(sheet_names: list[str]) -> str:
    overrides = [
        '<Override PartName="/xl/workbook.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>',
        '<Override PartName="/xl/styles.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>',
    ]
    for name in sheet_names:
        overrides.append(
            f'<Override PartName="/xl/worksheets/{safe_sheet_xml_name(name)}.xml" '
            'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        f"{''.join(overrides)}"
        "</Types>"
    )


def styles_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        '<fonts count="2">'
        '<font><sz val="11"/><name val="Arial"/></font>'
        '<font><b/><sz val="11"/><name val="Arial"/></font>'
        '</fonts>'
        '<fills count="3">'
        '<fill><patternFill patternType="none"/></fill>'
        '<fill><patternFill patternType="gray125"/></fill>'
        '<fill><patternFill patternType="solid"><fgColor rgb="FFEDEDED"/><bgColor indexed="64"/></patternFill></fill>'
        '</fills>'
        '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'
        '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
        '<cellXfs count="2">'
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'
        '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>'
        '</cellXfs>'
        "</styleSheet>"
    )


def dashboard_rows() -> list[list[str]]:
    return [
        ["Metric", "Value"],
        ["Total Leads", "=COUNTA(Leads!A2:A)"],
        ["A-list Leads", '=COUNTIF(Leads!L:L,"A-list*")'],
        ["Good Leads", '=COUNTIF(Leads!L:L,"Good*")'],
        ["Maybe Leads", '=COUNTIF(Leads!L:L,"Maybe*")'],
        ["Mini Audits Ready", "=COUNTA('Mini Audits'!A2:A)"],
        ["Follow Ups Scheduled", "=COUNTA('Follow Ups'!A2:A)"],
        ["Outreach Sent", '=COUNTIF(Leads!W:W,"Sent")'],
        ["Interested Replies", '=COUNTIF(Leads!Z:Z,"Interested")'],
        ["Paid Clients", '=COUNTIF(Revenue!E:E,"Paid")'],
        ["Revenue", "=SUM(Revenue!D:D)"],
        ["", ""],
        ["Next Step", "Manually review top-scored leads, verify contact info, then send Version A outreach."],
    ]


def niches_rows() -> list[list[str]]:
    return [
        ["Priority", "Niche", "Why It Works"],
        ["Tier 1", "Med spas", "High value consults; website trust matters"],
        ["Tier 1", "Aesthetic clinics", "High value services; visual polish matters"],
        ["Tier 1", "Estheticians", "Booking-driven; Instagram often stronger than site"],
        ["Tier 1", "Salons / day spas", "Booking-driven; local SEO and service clarity matter"],
        ["Tier 1", "Cosmetic dentists", "High-ticket services; trust and consult flow matter"],
        ["Tier 1", "Interior designers", "High-ticket inquiries; visual brand credibility matters"],
        ["Tier 1", "Wedding vendors", "Inquiry funnel and portfolio clarity matter"],
        ["Tier 2", "Boutique fitness", "Membership and booking funnel"],
        ["Tier 2", "Local boutiques", "Product discovery and local trust"],
        ["Tier 2", "Restaurants / cafes", "Events, catering, ordering, reservations"],
    ]


def revenue_rows() -> list[list[str]]:
    return [
        ["Client", "Project", "Invoice Date", "Amount", "Status", "Notes"],
    ]


def main() -> None:
    sheets = {
        "Dashboard": dashboard_rows(),
        "Leads": read_csv(ROOT / "leads_batch_001_scored.csv"),
        "Mini Audits": read_csv(ROOT / "mini_audits_batch_001_v2.csv"),
        "Follow Ups": read_csv(ROOT / "followup_schedule_batch_001.csv"),
        "Search Queries": read_csv(ROOT / "research_queries.csv"),
        "Niches And Areas": niches_rows(),
        "Revenue": revenue_rows(),
    }

    with zipfile.ZipFile(OUT, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        sheet_names = list(sheets)
        zf.writestr("[Content_Types].xml", content_types(sheet_names))
        zf.writestr("_rels/.rels", root_rels())
        zf.writestr("xl/workbook.xml", workbook_xml(sheet_names))
        zf.writestr("xl/_rels/workbook.xml.rels", workbook_rels(sheet_names))
        zf.writestr("xl/styles.xml", styles_xml())
        for name, rows in sheets.items():
            zf.writestr(f"xl/worksheets/{safe_sheet_xml_name(name)}.xml", worksheet_xml(rows))

    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
