# Lift Studio Operating Status

Last updated: 2026-07-06

## Session Lock
- Agent: Codex
- Date: 2026-07-09 17:24 ET
- State: Desktop Lift-relevant files imported into the local project: audit images organized under `audits/<prospect>/`, visual QA examples under `audits/_visual-reference/`, Lift audit GPT pack extracted under `chatgpt-knowledge/`, protocol markdown placed under `skills/liftaudit/references/imported-2026-07-09/`, raw ZIPs/duplicate service menu stored under `_local_exports/desktop-import-2026-07-09/`. No live systems touched.
- In progress / not finished: R3 (fail-open web app endpoint) **RESOLVED 2026-07-09** — all Web app deployments on the `Lift Studio Pipeline Endpoint` script archived (verified by Megan in the Apps Script UI); the "access: Anyone" surface no longer exists. R5 (local↔live drift) still unresolved; legacy archive hardening (ticket T1) pending. Existing local edits to `CLAUDE.md` and `_system/LIFT_OUTREACH_AND_FOLLOWUP_SYSTEM.md` predated this import and were not changed by Codex.
- Next step: review the imported ChatGPT/protocol markdown and decide whether to promote any of it into the active `$liftaudit` references; manual $liftaudit proof-run still continues the manual-proof clock.

## Current Source Of Truth

- Active instruction entrypoint: `ACTIVE_INSTRUCTIONS.md`
- Local workspace: `/Users/meganreeves/Documents/Projects/Lift Studio`
- GitHub repo: `https://github.com/mareeves9311/Lift-Studios`
- Website: `https://helloliftstudio.com/`
- Dashboard: `https://liftstudiosdashboard.netlify.app/`
- Google Sheet: `https://docs.google.com/spreadsheets/d/1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8/edit`

## Active System (simplified manual-first, since 2026-07-02)

- `Pipeline` is the Google Sheet backend/source-of-truth tab; `Working Pipeline` is the human view; the Netlify dashboard reads the published CSV from `Pipeline`.
- Prospect selection is manual. Audits run via `$liftaudit` in chat, on request.
- Megan writes/approves and sends all outreach herself. No auto-send, no automated draft creation.
- The Apps Script outbound engine is **LEGACY / V2 CANDIDATE — CONNECTED BUT NOT RECONCILED — DO NOT RUN** (`automation/LEGACY_README.md`). Old live triggers were found and manually deleted on 2026-07-06. Web app endpoint: **UNSAFE UNTIL REVIEWED — FAIL-CLOSED REQUIREMENT NOT VERIFIED**. No scheduled Lift automation is currently approved.

## Outreach Rule

Current default outreach:

- Link to the Lift Studio website for broader studio/brand context.
- Attach only `site/_lift-brand/Lift Studio Service Menu.pdf`.
- Do not attach `About Lift Studio.pdf` or any old brand book unless Megan explicitly asks.

If a future simplified V2 is explicitly approved, any Gmail draft automation would need a Google Drive copy of the service menu PDF via `CONFIG.serviceMenuPdfFileId`; Apps Script cannot read local project files at runtime. This is historical/V2 planning only, not permission to run the legacy engine.

## Active Files

- Manual audit workflow: `skills/liftaudit/SKILL.md`
- Legacy agent references: `agents/OPERATING_SYSTEM.md`, `agents/email_marketer.md`, `agents/follow_up_pipeline_manager.md`, `agents/new_business_auditor.md`, `agents/orchestrator.md` — reference-only unless Megan explicitly approves a simplified V2 redesign.
- Legacy Apps Script reference: `automation/live_apps_script_sync/`
  - `OutreachAutomation.gs` — historical Gmail drafts, sent/reply reconciliation, inbox hygiene
  - `LiftPipelineAutomation.gs` — historical brand audits, pipeline management, doPost web app endpoint
- Gmail signature rules: `agents/SIGNATURE_RENDERING_RULES.md`

## Archive Policy

Old Claude cowork packs, duplicate Apps Script variants, and historical handoff docs now live under:

`_archive/old-instructions-2026-06-17/`

Archived files are reference-only. Do not use them as active instructions, prompt sources, script sources, attachment rules, or outreach templates unless Megan explicitly asks.

## Completed Setup

- ✅ Service menu PDF uploaded to Google Drive. File ID `1jvKBJo3l1i7HJ9vUi_8pV9-G7EJrfSJx` is live in `CONFIG.serviceMenuPdfFileId` in OutreachAutomation.gs.
- ⚠️ Historical Apps Script web app endpoint deployed (2026-06-23, new Web App deployment — `Lift Studio Pipeline Endpoint`, access: Anyone). Endpoint: `https://script.google.com/macros/s/AKfycbwAH7TozxFdUSk5dOM6_sX5nFdn62MOCDKZMGwaugL1vj42nHR21evVATnE_qAapV68/exec`. This endpoint is now **UNSAFE UNTIL REVIEWED — FAIL-CLOSED REQUIREMENT NOT VERIFIED** and must not be called until explicitly reapproved and patched.
- ⚠️ Historical Apps Script endpoint and signature/attachment draft path were manually tested in June; those tests do not make the legacy engine active or approved now.
- ✅ Apps Script and Google Sheet timezones are both set to `America/New_York`.
- ✅ Cloud agent routines (Morning + Midday Orchestrator) — R2, resolved 2026-07-06: Megan manually checked Claude/Anthropic Routines and paused/deleted both if found. Local repo cannot independently verify cloud state; not treated as a health-check target. R3 (the fail-open web app endpoint, still deployed "access: Anyone") is the last open live surface — see `_system/LIFT_LEGACY_AUTOMATION_AUDIT.md`.
- ✅ `enableAutoDiscovery: false` — DuckDuckGo/Apps Script scrape-based discovery is permanently off (2026-06-22, version 24). It was the primary source of junk rows. Current lead discovery is manual/chat-based and judgment-led. Apps Script structured execution is legacy/V2-candidate only. Do not re-enable scrape-based discovery.
- ✅ Google Sheet `Pipeline` tab cleaned (2026-06-22): removed junk/search-result rows (e.g. `Hair Salons near Hershey PA`, Yelp search result rows, generic `Services`/`About` page rows, duplicate rows). `Youveau Aesthetics Medspa & Wellness` normalized as a real prospect row with full contact details. `Working Pipeline` no longer contains obvious junk rows after row 39.
- ✅ Auto-discovery guard logic tightened (commit `e00e654`): now rejects search-result/page-pool titles, "near [city/state/zip]" category rows, generic page titles (`Services`, `About`, `Contact`, `Home`, `Welcome`), category-location phrases pretending to be businesses, and query-title matches where result title equals the search query.
- ✅ Uncommitted local draft-audit experiment removed from `OutreachAutomation.gs` before deployment — it was never pushed live.
- ✅ Audit writeback now includes public contact discovery fields (`Email`, `Contact Form`, `Phone`, `Instagram`) when Claude can verify them.
- ✅ No-email rows with Instagram now route `Next Action` to `NO EMAIL FOUND - check Instagram mobile Contact button.`
- ✅ Follow-up Gmail drafts use the same service menu attachment and inline signature image handling as first-touch drafts.
- ✅ Sent/reply reconciliation uses the newest sent message in a thread and clears stale Gmail draft IDs after Megan sends a pending draft.
- ✅ Sent/reply reconciliation and due follow-up draft creation are row-safe: one bad row logs an error instead of killing the whole run.
- ✅ Pipeline Stage and Response Status dropdown validation now includes all statuses the automation writes (`Bounced`, `Hold`, `Paused`, `Closed`) and is repaired before draft/reply runs.
- ⚠️ Historical note: `Outreach Automation > Create Health Snapshot` can write a local Apps Script health report to `System Log`, but it is an Apps Script function and must not be run without explicit reapproval.
- ⚠️ If Claude Code Routines reports egress blocking, allowlist the real Apps Script endpoint, not a Gmail-wrapped `google.com/url?...` redirect.
- ✅ Drive MCP write limitation documented — it is structural and cannot be fixed by reconnecting. The old doPost write path is now blocked/unsafe until reviewed; manual sheet edits or a rebuilt simplified V2 are the current path.

## Open Follow-Up Items (from Codex handoff 2026-06-22)

Priority order — items 1–3 are the active next work block:

1. ~~**Audit JSON parse errors need hardening**~~ ✅ **Done (2026-06-22, commit `4683798`, version 19)** — `callLiftClaudeAudit_` now retries once with a repair prompt on JSON parse failure; raw failures log to `System Log`; failed rows get `Auditing Failed` stage (not `New Lead`) so they're visually distinct.

2. ~~**`Ready to Draft` rows missing email are a UX problem**~~ ✅ **Done (2026-06-22, commit `4683798`, version 19)** — `determineAuditPipelineStatus_` now requires a confirmed email before setting `Ready to Draft`; no-email rows fall back to `New Lead`.

3. ~~**Contact discovery systematic pass needed**~~ ✅ **Done (2026-06-22, commit `4201bb6`, version 20)** — All three contact-path functions standardized to one priority order and label set: contact form → `USE CONTACT FORM - submit manually, then mark Sent.`; Instagram → `NO EMAIL FOUND - check IG mobile Contact button.`; phone → `NO EMAIL FOUND - call/text for best email.`; website/name only → `NO EMAIL FOUND - check Facebook About/contact.`; nothing → `NO CONTACT PATH FOUND - manual research needed.` `buildPostAuditNextStep_` now delegates to `liftManualContactStep_` — labels defined in one place. `ACTIVE_INSTRUCTIONS.md` updated with canonical label reference.

4. ~~**Follow-up draft backlog needs Gmail review**~~ ✅ **Report ready (2026-06-22, commit `ecef331`, version 21)** — `Outreach Automation > Review Draft Backlog (report only)` generates a `Draft Review` tab in the sheet. Columns: Date, Draft Subject, Recipient, Likely Type, Pipeline Status, Sent Match?, Recommendation, Reason, Draft ID. Color-coded: red = Delete candidate, green = Keep, yellow = Review manually. Nothing is deleted — Megan approves cleanup in one pass.

5. **Dashboard refresh check** — rows were deleted from `Pipeline`; confirm Netlify dashboard reflects cleaned counts and is not caching old row data.

6. **Legacy morning/midday run verification — superseded** — do not run the daily Claude routine, create Gmail drafts, or run a health snapshot under the old engine. Any future version must be redesigned as simplified V2 and explicitly reapproved.

6. **Discovery source is still DuckDuckGo HTML** — filters are better but fragile. Long-term options: structured lead source via Vibiz, known business URL directories, or a manual "Lead Intake" tab where Megan pastes raw candidates and the auditor validates one at a time.

7. **Git untracked files** — intentionally untracked: `.github/`, `Lift Studio.html`, `assets/Lift Studio Brand Guidelines.pdf`, `assets/Lift Studio Logo - Circle.png`, `automation/launchd/`, `automation/run_daily_8am_outreach.sh`. Leave these alone unless Megan explicitly decides to track or ignore them.

8. **Add Weekly SEO/GEO Blog Content to public offer materials** — website and service menu still need an explicit offer/package for one optimized blog per week, especially for home services, trades, automotive, commercial services, and real estate. Active agent instructions can already mention this in outreach when relevant, but the live website and service menu PDF should be updated so prospects see the offer clearly.

## Do Not Touch Without Approval

- Do not add AdviseHer or AMP3 files to this repo.
- Do not rename/remove the Google Sheet `Pipeline` tab.
- Do not delete `brand-images/` or `site/lift-studio-images/` until the image duplication question is resolved.
- Do not restore archived MR Studio/Web Refresh/Claude cowork instruction packs into the active path.
