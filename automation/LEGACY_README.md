# LEGACY / V2 CANDIDATE — DO NOT RUN

Status set 2026-07-06 after adversarial audit. Everything in `automation/` (including `live_apps_script_sync/`) is the retired automated outbound engine: **LEGACY / V2 CANDIDATE — CONNECTED BUT NOT RECONCILED — DO NOT RUN.** Preserved for reference and possible simplified V2 rebuild with Megan's explicit reapproval. Do not delete; do not treat as active instructions.

## Apps Script Project Identity

**Script ID:** `1g_9-U-01qaFBzzMtZwNEEWM9bdr6AUBsGFxHVfey_U6o9q-nHPGVa9Su`
**Project Name:** "Lift Studio Legacy Outreach Engine - Clasp Connected - DO NOT RUN"
**Connected via:** clasp (not reconciled since 2026-06-23)
**Clasp config:** `automation/live_apps_script_sync/.clasp.json`

## Trigger Decommission (2026-07-06)

Old live triggers were found in the live Apps Script project and manually deleted on 2026-07-06. The following triggers were removed:
- `refreshSentAndReplies` (hourly scan)
- `runLiftStudioDailySystem` (daily run at 8am)
- `createOutreachDrafts` (1pm run)
- `runQueuedLiftBrandAudits` (queued audit handler)
- `handleLiftBrandPipelineEdit` (sheet edit trigger)

The script remains connected via clasp but no reconciliation has been attempted. Repo copies in `live_apps_script_sync/` may not reflect live deployment state. **Do not run clasp pull, clasp push, Apps Script functions, trigger installers, or web-app calls without explicit reapproval.**

## Verified safety findings (code-inspected 2026-07-06, read-only)

1. **Fail-open secret check** — `LiftPipelineAutomation.gs` `doPost` (~line 1345):
   `if (secret && payload.secret !== secret) { ...Unauthorized... }`
   If the `LIFT_WEB_APP_SECRET` Script Property is missing, `secret` is falsy and the check is skipped — **all requests are allowed**. Required V2 fix (do not apply without approval, then deploy via clasp only):
   `if (!secret || payload.secret !== secret) { return liftJsonResponse_({ ok:false, error:'Unauthorized' }); }`
   Until this is patched in the LIVE deployment and verified, the web app endpoint is **UNSAFE UNTIL REVIEWED — FAIL-CLOSED REQUIREMENT NOT VERIFIED**.
2. **Trigger installers present** — `OutreachAutomation.gs` (~lines 141–168: daily run, hourly scan, 8am/1pm draft creation) and `LiftPipelineAutomation.gs` (~lines 198–203: edit handler, queued audits). Sheet menu items `Install/Repair Full Automation` and `Run Full Lift Studio System Now` execute these. **Never run them** without explicit reapproval.
3. **Gmail writers present** — `GmailApp.createDraft` in three places in `OutreachAutomation.gs`; inbox hygiene functions label/archive threads. None of this is approved to run.
4. **Live vs repo drift is unverified** since 2026-06-23. clasp is wired (`live_apps_script_sync/.clasp.json`) but no pull/diff/reconcile has happened. Repo copies here may not match what is deployed.

## If unexpected live triggers reappear

Open the Apps Script project (as helloliftstudio@gmail.com) → Triggers (clock icon) → review → delete any time-based triggers for `runLiftStudioDailySystem`, `refreshSentAndReplies`, `createOutreachDrafts`, `runQueuedLiftBrandAudits`, or `handleLiftBrandPipelineEdit`. Report the exact trigger names and timestamps. Do not install replacements.

## V2 revival conditions

Only with Megan's explicit reapproval, and only as a simplified V2 rebuild — not a direct revival of the old outbound engine. Preconditions: fail-closed secret patch reviewed and deployed through an approved clasp workflow · live/repo drift reconciled · trigger inventory clean · each function supervised-tested · no HTML scraping · nothing auto-sends.
