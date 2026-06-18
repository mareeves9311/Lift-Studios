# Lift Studio Active Instructions

This file is the first stop for Claude, Codex, or any other agent working in this repo.

## Source Of Truth

- Current project root: `/Users/meganreeves/Documents/Projects/Lift Studio`
- Current website: `https://helloliftstudio.netlify.app/`
- Current dashboard: `https://liftstudiosdashboard.netlify.app/`
- Current Google Sheet: `https://docs.google.com/spreadsheets/d/1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8/edit`
- Current GitHub repo: `https://github.com/mareeves9311/Lift-Studios`

## Active Instruction Files

Use these files for current behavior:

- `agents/OPERATING_SYSTEM.md`
- `agents/orchestrator.md`
- `agents/new_business_auditor.md`
- `agents/email_marketer.md`
- `agents/follow_up_pipeline_manager.md`
- `agents/quality_control.md`
- `agents/innovator.md`
- `agents/SIGNATURE_RENDERING_RULES.md`
- `automation/live_apps_script_sync/OutreachAutomation.gs`
- `automation/live_apps_script_sync/LiftPipelineAutomation.gs`
- `automation/gmail_outreach_automation.gs`
- `automation/daily_8am_outreach_prompt.md`
- `automation/scheduled_routines.md`

## Archive Rule

Files under `_archive/` are reference-only. Do not use them as active instructions, prompt sources, script sources, attachment rules, or outreach templates unless Megan explicitly asks to recover something from archive.

## Outreach Attachment Rule

Default outreach uses:

- Link to the Lift Studio website for broader brand/studio context.
- Attach only `site/_lift-brand/Lift Studio Service Menu.pdf`.

Do not attach `About Lift Studio.pdf` or any old brand book unless Megan explicitly asks.

For scheduled Gmail draft automation, Apps Script cannot access local files directly. The local PDF is the source copy; the production attachment must be a Google Drive copy referenced by `CONFIG.serviceMenuPdfFileId`.

## Agent And Automation Split

- Agents write strategy, audit notes, email copy, status decisions, and sheet updates.
- Apps Script creates Gmail drafts, attaches the service menu, embeds the HTML signature, and writes Gmail draft IDs back to the sheet.
- Megan reviews and sends manually. Nothing auto-sends.
- Gmail draft creation only runs for leads with `Pipeline Stage` set to `Ready to Draft`, `Ready`, or `Draft Ready`, with an email address, outreach copy, and no existing Gmail draft ID.
- Use `Outreach Automation > Test Service Menu Attachment` in the Google Sheet to verify the Drive PDF is accessible without needing a draftable lead.
- If Megan manually adds an email address to a qualified lead, the sheet edit trigger re-queues that row for outreach: existing outreach copy goes to Gmail draft generation, and missing outreach copy goes to `Email Marketer: draft first-touch outreach`.
- Do not type `form` into the `Email` column. If outreach happens through a website form, keep `Email` blank, keep the URL in `Contact Form`, then use `Lift Pipeline > Mark selected row as form submitted` after submitting it.

## Sheet Contract

Do not rename or remove the `Pipeline` tab. It powers the Netlify dashboard and the Apps Script automations.

`Working Pipeline` is the human-friendly view. `Pipeline` is the backend/source-of-truth tab.

## Before Editing

1. Read this file.
2. Read `CLAUDE.md`.
3. Read the relevant active agent/script file.
4. Ignore archived instruction packs unless specifically asked.
