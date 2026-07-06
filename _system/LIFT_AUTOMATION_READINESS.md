# Automation Readiness & Safety Status

Last updated: 2026-07-06 23:45 ET

## Current State: MANUAL-FIRST WORKFLOW (Safe to operate)

The Lift Studio system operates in a simplified manual-first mode:

- **Prospect selection:** Manual (Megan picks from tracker)
- **Audits:** On-demand via `$liftaudit` in chat
- **Outreach drafting:** Megan writes/approves and sends herself
- **Automation:** **All scheduled functions are disabled** — no auto-send, no auto-draft creation

## Apps Script Project Status

**Script ID:** `1g_9-U-01qaFBzzMtZwNEEWM9bdr6AUBsGFxHVfey_U6o9q-nHPGVa9Su`
**Project Name:** "Lift Studio Legacy Outreach Engine - Clasp Connected - DO NOT RUN"
**Category:** LEGACY / V2 CANDIDATE
**Connection:** clasp (`automation/live_apps_script_sync/.clasp.json`)
**Reconciliation Status:** Not attempted since 2026-06-23

### Trigger Status
**All triggers removed:** 2026-07-06
- ✅ `refreshSentAndReplies` — DELETED
- ✅ `runLiftStudioDailySystem` — DELETED
- ✅ `createOutreachDrafts` — DELETED
- ✅ `runQueuedLiftBrandAudits` — DELETED
- ✅ `handleLiftBrandPipelineEdit` — DELETED

No time-based or event-based triggers are currently active.

### Known Issues (Do not fix without reapproval)

1. **Fail-open secret check** in `LiftPipelineAutomation.gs` line 1345:
   - Web app endpoint skips authorization if `LIFT_WEB_APP_SECRET` property is missing
   - Endpoint marked **UNSAFE UNTIL REVIEWED** and patched
   - Required fix: `if (!secret || payload.secret !== secret) { return liftJsonResponse_({ ok:false, error:'Unauthorized' }); }`
   - Cannot deploy fix without explicit reapproval + clasp access as helloliftstudio

2. **Gmail writers present** in `OutreachAutomation.gs`:
   - `GmailApp.createDraft()` calls at three locations
   - Inbox hygiene functions (label/archive)
   - None approved to run; all functions are blocked by missing triggers

3. **Repo/live drift unverified**:
   - clasp is wired but has not pulled/pushed since 2026-06-23
   - Deployed script state unknown relative to repo copies

## Safe Operations

### What can run without risk
- Manual sheet edits (Pipeline, Working Pipeline, etc.)
- Manual Gmail drafts via Megan's email client
- Megan's direct user interactions with the website
- Claude chat audits via `$liftaudit`
- Read-only reports (e.g., health snapshot if manually triggered via sheet menu)

### What is blocked
- All automatic discovery (disabled 2026-06-22, `enableAutoDiscovery: false`)
- All scheduled runs (triggers deleted 2026-07-06)
- All auto-send (never enabled, all sends are Megan's click)
- Web app endpoint (unsafe until patched)
- Any Apps Script function execution without explicit request
- Any clasp operations (pull/push/diff) without re-login and explicit reapproval

## Reapproval Required For

1. **Web app endpoint patch** — fail-closed secret check deployment
2. **Trigger installation** — re-enable any scheduled automation
3. **Any Apps Script function execution** — even for testing
4. **Any clasp operations** — pull/diff/push/status
5. **Any changes to automation/live_apps_script_sync/** — repo copies are reference-only until reconciliation is approved

## For V2 Revival

Requires Megan's explicit reapproval AND completion of:
1. Fail-closed secret patch deployed via clasp
2. Web app endpoint verified safe
3. Live/repo drift reconciled via clasp pull/diff
4. Trigger inventory clean (already done)
5. Each function supervised-tested before enabling
6. Explicit division of labor enforced: AI judgment (discovery) + structured execution (mechanics) + no HTML scraping + nothing auto-sends

## Emergency Contact

If Apps Script triggers activate unexpectedly or the web app endpoint receives requests:
1. Check Apps Script Triggers page (as helloliftstudio@gmail.com)
2. Check `System Log` tab in the Google Sheet for error logs
3. Review outreach draft backlog in Gmail
4. Report to Megan — do not attempt to fix without her explicit direction
