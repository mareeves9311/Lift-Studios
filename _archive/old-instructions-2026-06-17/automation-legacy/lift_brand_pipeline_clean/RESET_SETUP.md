# Lift Brand Pipeline Clean Reset

Fresh Lift-owned tracker:
https://docs.google.com/spreadsheets/d/1akR5CEjn3qeqRgF6lecbUCMq7wYDhrSSCQ-nX55VbSA/edit

Fresh Lift-owned Apps Script:
https://script.google.com/home/projects/1N6dUiawudfscWVqfd6sc6iufn3AttstKsfTGxlm6uD71zc-KRqY_M2J6/edit

Legacy/source tracker:
https://docs.google.com/spreadsheets/d/1ZUgq7srd2P835fA_Kge80ZpiFJjvUwBR_PXCjZsU688/edit

## Ownership

The fresh tracker is owned only by:
`helloliftstudio@gmail.com`

## One-Time Reset Steps

Open the fresh Apps Script project while signed into `helloliftstudio@gmail.com`.

1. Go to Project Settings.
2. Add Script Property:
   - `ANTHROPIC_API_KEY` = your `sk-ant-...` key
   - Optional: `ANTHROPIC_MODEL` = `claude-sonnet-4-5-20250929`
3. Run `migrateOldLiftTrackerIntoThisSheet`.
   - This copies all tabs from the legacy tracker into the clean Lift-owned tracker.
4. Run `setupLiftBrandPipelineAutomation`.
   - This installs the on-edit trigger and 5-minute queued-audit trigger.
5. Optional immediate test: run `runQueuedLiftBrandAudits`.

## Going Forward

Use only the fresh tracker:
https://docs.google.com/spreadsheets/d/1akR5CEjn3qeqRgF6lecbUCMq7wYDhrSSCQ-nX55VbSA/edit

Add new prospects to `Brand Pipeline`. When you add/edit a brand name, website, Instagram, TikTok, category, location, source, or notes, the row should become `Audit queued`.

Queued rows process every 5 minutes and fill:

- `audit_summary`
- `mini_audit`
- `audit_ran_at`
- `audit_error`
- key fit/offer fields

## Local Clasp Folder

`/Users/meganreeves/Desktop/Non-Recap Projects/MR Automation/lift_brand_pipeline_clean`

Push code updates:

```bash
clasp push -f
```
