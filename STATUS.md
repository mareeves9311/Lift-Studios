# Lift Studio Operating Status

Last updated: 2026-06-22

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
  - `OutreachAutomation.gs` — Gmail drafts, sent/reply reconciliation, inbox hygiene
  - `LiftPipelineAutomation.gs` — brand audits, pipeline management, doPost web app endpoint
- Gmail signature rules: `agents/SIGNATURE_RENDERING_RULES.md`

## Archive Policy

Old Claude cowork packs, duplicate Apps Script variants, and historical handoff docs now live under:

`_archive/old-instructions-2026-06-17/`

Archived files are reference-only. Do not use them as active instructions, prompt sources, script sources, attachment rules, or outreach templates unless Megan explicitly asks.

## Completed Setup

- ✅ Service menu PDF uploaded to Google Drive. File ID `1jvKBJo3l1i7HJ9vUi_8pV9-G7EJrfSJx` is live in `CONFIG.serviceMenuPdfFileId` in OutreachAutomation.gs.
- ✅ Apps Script web app endpoint deployed (2026-06-22, **version 19** — `Harden audit JSON retry and Ready to Draft email gate 2026-06-22`). Endpoint: `https://script.google.com/macros/s/AKfycbwbfgFcX1PJBXt3YTMN0fmGqhLQZybDSTPFgUtqu43Z6Ot28okgM8eSYhnODwTcgKoJ/exec`
- ✅ Apps Script endpoint manually verified with `getStatus`; signature/attachment draft path manually tested.
- ✅ Apps Script and Google Sheet timezones are both set to `America/New_York`.
- ⚠️ Cloud agent routines (Morning + Midday Orchestrator) are documented/configured, but status-email delivery/run history still needs verification in Claude Code Routines before they are treated as healthy.
- ✅ Auto-discovery is active with `enableAutoDiscovery: true`. Discovery now uses stronger filters to reject directories, search-result pages, and non-business result pages before adding leads. It runs lightweight batches of up to 3 direct-business candidates per full-system run so Apps Script does not time out.
- ✅ Google Sheet `Pipeline` tab cleaned (2026-06-22): removed junk/search-result rows (e.g. `Hair Salons near Hershey PA`, Yelp search result rows, generic `Services`/`About` page rows, duplicate rows). `Youveau Aesthetics Medspa & Wellness` normalized as a real prospect row with full contact details. `Working Pipeline` no longer contains obvious junk rows after row 39.
- ✅ Auto-discovery guard logic tightened (commit `e00e654`): now rejects search-result/page-pool titles, "near [city/state/zip]" category rows, generic page titles (`Services`, `About`, `Contact`, `Home`, `Welcome`), category-location phrases pretending to be businesses, and query-title matches where result title equals the search query.
- ✅ Uncommitted local draft-audit experiment removed from `OutreachAutomation.gs` before deployment — it was never pushed live.
- ✅ Audit writeback now includes public contact discovery fields (`Email`, `Contact Form`, `Phone`, `Instagram`) when Claude can verify them.
- ✅ No-email rows with Instagram now route `Next Action` to `NO EMAIL FOUND - check Instagram mobile Contact button.`
- ✅ Follow-up Gmail drafts use the same service menu attachment and inline signature image handling as first-touch drafts.
- ✅ Sent/reply reconciliation uses the newest sent message in a thread and clears stale Gmail draft IDs after Megan sends a pending draft.
- ✅ Sent/reply reconciliation and due follow-up draft creation are row-safe: one bad row logs an error instead of killing the whole run.
- ✅ Pipeline Stage and Response Status dropdown validation now includes all statuses the automation writes (`Bounced`, `Hold`, `Paused`, `Closed`) and is repaired before draft/reply runs.
- ✅ `Outreach Automation > Create Health Snapshot` writes a local Apps Script health report to `System Log`, so system checks can run without Claude cloud tokens.
- ⚠️ If Claude Code Routines reports egress blocking, allowlist the real Apps Script endpoint, not a Gmail-wrapped `google.com/url?...` redirect.
- ✅ Drive MCP write limitation documented — it is structural and cannot be fixed by reconnecting. All cloud agent sheet writes use the doPost endpoint.

## Open Follow-Up Items (from Codex handoff 2026-06-22)

Priority order — items 1–3 are the active next work block:

1. ~~**Audit JSON parse errors need hardening**~~ ✅ **Done (2026-06-22, commit `4683798`, version 19)** — `callLiftClaudeAudit_` now retries once with a repair prompt on JSON parse failure; raw failures log to `System Log`; failed rows get `Auditing Failed` stage (not `New Lead`) so they're visually distinct.

2. ~~**`Ready to Draft` rows missing email are a UX problem**~~ ✅ **Done (2026-06-22, commit `4683798`, version 19)** — `determineAuditPipelineStatus_` now requires a confirmed email before setting `Ready to Draft`; no-email rows fall back to `New Lead`.

3. **Contact discovery systematic pass needed** — rows with no email should consistently have `Next Action` set to `NO EMAIL FOUND - check Facebook and IG mobile Contact button.` or `USE CONTACT FORM - mark as Sent after manual form submission.` Standardize these labels across all no-email rows.

4. **Follow-up draft backlog needs Gmail review** — a batch of follow-up drafts exists. Review Gmail drafts and delete any stale/internal/test drafts. The draft-vs-sent audit tool was stopped and not deployed; if rebuilt, start with a read-only report before adding any write operations.

5. **Dashboard refresh check** — rows were deleted from `Pipeline`; confirm Netlify dashboard reflects cleaned counts and is not caching old row data.

6. **Discovery source is still DuckDuckGo HTML** — filters are better but fragile. Long-term options: structured lead source via Vibiz, known business URL directories, or a manual "Lead Intake" tab where Megan pastes raw candidates and the auditor validates one at a time.

7. **Git untracked files** — intentionally untracked: `.github/`, `Lift Studio.html`, `assets/Lift Studio Brand Guidelines.pdf`, `assets/Lift Studio Logo - Circle.png`, `automation/launchd/`, `automation/run_daily_8am_outreach.sh`. Leave these alone unless Megan explicitly decides to track or ignore them.

## Do Not Touch Without Approval

- Do not add AdviseHer or AMP3 files to this repo.
- Do not rename/remove the Google Sheet `Pipeline` tab.
- Do not delete `brand-images/` or `site/lift-studio-images/` until the image duplication question is resolved.
- Do not restore archived MR Studio/Web Refresh/Claude cowork instruction packs into the active path.
