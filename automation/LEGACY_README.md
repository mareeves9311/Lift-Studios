# LEGACY / V2 CANDIDATE — DO NOT RUN

Status set 2026-07-06 after adversarial audit. Everything in `automation/` (including `live_apps_script_sync/`) is the retired automated outbound engine: **CONNECTED BUT NOT RECONCILED — DO NOT RUN.** Preserved for reference and possible V2 revival with Megan's explicit reapproval. Do not delete; do not treat as active instructions.

## Apps Script Project Identity

**Script ID:** `1g_9-U-01qaFBzzMtZwNEEWM9bdr6AUBsGFxHVfey_U6o9q-nHPGVa9Su`
**Project Name:** "Lift Studio Legacy Outreach Engine - Clasp Connected - DO NOT RUN"
**Connected via:** clasp (not reconciled since 2026-06-23)
**Clasp config:** `automation/live_apps_script_sync/.clasp.json`

## Trigger Decommission (2026-07-06)

All time-based triggers were manually deleted on 2026-07-06 from the live Apps Script project. The following triggers were removed:
- `refreshSentAndReplies` (hourly scan)
- `runLiftStudioDailySystem` (daily run at 8am)
- `createOutreachDrafts` (1pm run)
- `runQueuedLiftBrandAudits` (queued audit handler)
- `handleLiftBrandPipelineEdit` (sheet edit trigger)

The script remains connected via clasp but no reconciliation (clasp pull/diff/push) has been attempted. Repo copies in `live_apps_script_sync/` may not reflect live deployment state.

## Verified safety findings (code-inspected 2026-07-06, read-only)

1. **Fail-open secret check** — `LiftPipelineAutomation.gs` `doPost` (~line 1345):
   `if (secret && payload.secret !== secret) { ...Unauthorized... }`
   If the `LIFT_WEB_APP_SECRET` Script Property is missing, `secret` is falsy and the check is skipped — **all requests are allowed**. Required V2 fix (do not apply without approval, then deploy via clasp only):
   `if (!secret || payload.secret !== secret) { return liftJsonResponse_({ ok:false, error:'Unauthorized' }); }`
   Until this is patched in the LIVE deployment and verified, the web app endpoint is **UNSAFE UNTIL REVIEWED**.
2. **Trigger installers present** — `OutreachAutomation.gs` (~lines 141–168: daily run, hourly scan, 8am/1pm draft creation) and `LiftPipelineAutomation.gs` (~lines 198–203: edit handler, queued audits). Sheet menu items `Install/Repair Full Automation` and `Run Full Lift Studio System Now` execute these. **Never run them** without explicit reapproval.
3. **Gmail writers present** — `GmailApp.createDraft` in three places in `OutreachAutomation.gs`; inbox hygiene functions label/archive threads. None of this is approved to run.
4. **Live vs repo drift is unverified** since 2026-06-23. clasp is wired (`live_apps_script_sync/.clasp.json`) but no pull/diff/reconcile has happened. Repo copies here may not match what is deployed.

## What Megan should do if any live triggers still exist

Open the Apps Script project (as helloliftstudio@gmail.com) → Triggers (clock icon) → review → delete any time-based triggers for `runLiftStudioDailySystem`, `refreshSentAndReplies`, `createOutreachDrafts`, `runQueuedLiftBrandAudits`. This cannot be done from this machine — NEEDS HUMAN. Until checked, assume old triggers may still fire.

## V2 revival conditions

Only with Megan's explicit reapproval, and only after: fail-closed secret patch deployed via clasp and verified · live/repo reconciled · trigger inventory clean · each function supervised-tested. The division of labor lesson carries forward: AI judgment for discovery, structured execution for mechanics, no HTML scraping, nothing auto-sends.
