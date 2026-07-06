# Claude / Codex Handoff

Project: Lift Studio

Read `/Users/meganreeves/Documents/Projects/FOUNDATION.md` first for identity rules, tool routing, and the cross-agent handoff protocol.

## Identity

- Account for everything here: **helloliftstudio@gmail.com** (Gmail, Sheets, Drive). Canva: mareeves93@gmail.com Canva. GitHub: **mareeves9311/Lift-Studios**. Website: helloliftstudio.com.
- If a connected account does not match, stop and tell Megan to switch before touching Gmail, the pipeline sheet, or Drive.
- Before editing shared files, read the Session Lock at the top of `STATUS.md` and update it when you finish (protocol in FOUNDATION.md).

Use this repository as the single source of truth for Lift Studio work.

Read `ACTIVE_INSTRUCTIONS.md` first. It defines the current source-of-truth files, current outreach attachment rule, active sheet/dashboard contract, and archive policy.

The brand was previously called Web Refresh Co. and MR Studio in older files. Old instruction packs have been moved under `_archive/` and are reference-only. Do not use archived files as active instructions, prompt sources, script sources, attachment rules, or outreach templates unless Megan explicitly asks to recover something from archive.

## Do Not Mix

AdviseHer is a separate project and should not be added to this repo.

AdviseHer-related material has previously lived under paths like:

- `/Users/meganreeves/Desktop/Projects/recommendation-intel/`
- `/Users/meganreeves/Desktop/Projects/adviseher-upgraded.html`
- `/Users/meganreeves/Desktop/AdviseHer_Investor_Deck.pptx`

## Current Priorities

See `STATUS.md` at the repo root for current operating state, open decisions, and next recommended action.

- Read `ACTIVE_INSTRUCTIONS.md` before doing any Lift Studio work — it defines the CURRENT simplified manual-first workflow (tracker + manual audits via `$liftaudit` + human-approved outreach only).
- The multi-agent outbound engine (`agents/OPERATING_SYSTEM.md`, orchestrator, new_business_auditor, email_marketer, follow_up_pipeline_manager) and the Apps Script automation are **LEGACY / V2 CANDIDATE — CONNECTED BUT NOT RECONCILED — DO NOT RUN** (see `automation/LEGACY_README.md`). Old live triggers were found and manually deleted on 2026-07-06 from Script ID `1g_9-U-01qaFBzzMtZwNEEWM9bdr6AUBsGFxHVfey_U6o9q-nHPGVa9Su` ("Lift Studio Legacy Outreach Engine - Clasp Connected - DO NOT RUN"). Do not coordinate, extend, execute, or revive them unless Megan explicitly approves a simplified V2 rebuild.
- Keep current scripts, prompts, audit templates, and outreach copy in this repo.
- Prefer updating existing files over creating duplicate versions.
- If a Google Sheet or Drive file is updated, note the URL and date in the relevant repo file.

## Loops (see _system/LOOP_LIBRARY.md at Projects root)

- **L4 outreach pipeline:** runs MANUALLY on request — Megan picks prospects, `$liftaudit` audits, drafts are human-approved, sheet updated. The automated version is LEGACY / V2 CANDIDATE. Discovery, when agent-assisted, is judgment-led, never HTML scraping (locked June 2026).
- **L3 ship content:** draft → review → attachment/signature check → Megan approves → Megan sends.

Agent role files in `agents/` are LEGACY / V2 CANDIDATE reference, not active roles (see ACTIVE_INSTRUCTIONS.md and `automation/LEGACY_README.md`). FOUNDATION.md rules override where they conflict.

## Blocked / never automate

- Sending email — all sends are Megan's click, permanently.
- Deleting drafts or sheet rows without a Megan-approved itemized list.
- Clipboard Apps Script deploys — clasp/repo only (_system/CLASP_SETUP_PLAN.md).
- Re-enabling scrape-led auto-discovery (`enableAutoDiscovery` stays false).
- Any Gmail/Sheets operation while a non-Lift Google account is connected.
