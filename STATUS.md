# Lift Studio Operating Status

Last updated: 2026-06-17

## Current Source Of Truth

- Active instruction entrypoint: `ACTIVE_INSTRUCTIONS.md`
- Local workspace: `/Users/meganreeves/Documents/Projects/Lift Studio`
- GitHub repo: `https://github.com/mareeves9311/Lift-Studios`
- Website: `https://helloliftstudio.netlify.app/`
- Dashboard: `https://liftstudiosdashboard.netlify.app/`
- Google Sheet: `https://docs.google.com/spreadsheets/d/1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8/edit`

## Active System

- `Pipeline` is the Google Sheet backend/source-of-truth tab.
- `Working Pipeline` is the cleaner human-facing sheet view.
- The Netlify dashboard reads the published CSV from `Pipeline`.
- Apps Script creates Gmail drafts, attaches the service menu, embeds the HTML signature, and writes Gmail draft IDs back to the sheet.
- Megan reviews and sends manually. No auto-send.

## Outreach Rule

Current default outreach:

- Link to the Lift Studio website for broader studio/brand context.
- Attach only `site/_lift-brand/Lift Studio Service Menu.pdf`.
- Do not attach `About Lift Studio.pdf` or any old brand book unless Megan explicitly asks.

For scheduled Gmail draft automation, Apps Script must use a Google Drive copy of the service menu PDF via `CONFIG.serviceMenuPdfFileId`; Apps Script cannot read local project files at runtime.

## Active Files

- Agent operating system: `agents/OPERATING_SYSTEM.md`
- Email marketer: `agents/email_marketer.md`
- Follow-up manager: `agents/follow_up_pipeline_manager.md`
- New business auditor: `agents/new_business_auditor.md`
- Orchestrator: `agents/orchestrator.md`
- Current Apps Script source: `automation/live_apps_script_sync/`
- Current Apps Script mirror: `automation/gmail_outreach_automation.gs`
- Gmail signature rules: `agents/SIGNATURE_RENDERING_RULES.md`

## Archive Policy

Old Claude cowork packs, duplicate Apps Script variants, and historical handoff docs now live under:

`_archive/old-instructions-2026-06-17/`

Archived files are reference-only. Do not use them as active instructions, prompt sources, script sources, attachment rules, or outreach templates unless Megan explicitly asks.

## Open Setup Item

Upload `site/_lift-brand/Lift Studio Service Menu.pdf` to Google Drive once and paste its Drive file ID into `CONFIG.serviceMenuPdfFileId` in the live Apps Script project.

## Do Not Touch Without Approval

- Do not add AdviseHer or AMP3 files to this repo.
- Do not rename/remove the Google Sheet `Pipeline` tab.
- Do not delete `brand-images/` or `site/lift-studio-images/` until the image duplication question is resolved.
- Do not restore archived MR Studio/Web Refresh/Claude cowork instruction packs into the active path.
