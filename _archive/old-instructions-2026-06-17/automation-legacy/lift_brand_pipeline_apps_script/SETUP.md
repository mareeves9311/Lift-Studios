# Lift Brand Pipeline Apps Script Setup

Script project:
https://script.google.com/d/1RYqIc4r6Yw0eCgr3FiVADq9r1xFInBd_jXfyw5wYaw3au4JokJKvJqId/edit

Tracker:
https://docs.google.com/spreadsheets/d/1ZUgq7srd2P835fA_Kge80ZpiFJjvUwBR_PXCjZsU688/edit

## One-Time Setup

1. Open the script project.
2. Go to Project Settings.
3. Under Script Properties, add:
   - `ANTHROPIC_API_KEY` = your Claude API key
   - Optional: `ANTHROPIC_MODEL` = `claude-sonnet-4-5-20250929`
4. Return to the editor.
5. In the function dropdown, choose `setupLiftBrandPipelineAutomation`.
6. Click Run and approve permissions.

## What Happens After Setup

- Editing a watched field in `Brand Pipeline` queues the row as `Audit queued`.
- Watched fields include business name, website, Instagram, TikTok, category, location, source, and notes.
- Every 5 minutes, queued rows are processed.
- The script fills:
  - `audit_summary`
  - `mini_audit`
  - `audit_ran_at`
  - `audit_error`
  - core pipeline scoring/offer fields

## Manual Controls

After setup, the script menu may appear in the script host sheet, but the main reliable controls are:

- Run `runQueuedLiftBrandAudits` from Apps Script to process queued rows immediately.
- Run `auditSelectedLiftBrandRow` only if the active spreadsheet context is the tracker.

## Local Clasp Project

Local folder:
`/Users/meganreeves/Desktop/Non-Recap Projects/MR Automation/lift_brand_pipeline_apps_script`

Push updates:

```bash
clasp push -f
```
