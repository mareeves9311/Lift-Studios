# Twice-Daily Outreach Schedule

## What the schedule produces

Two batches per day, every day, without Megan's Mac needing to be on:

| Time | What runs | What you see |
|---|---|---|
| **8:00 AM** | `createOutreachDrafts()` | New Gmail drafts for any audited-but-un-drafted leads in the sheet |
| **Continuous (every 5 min)** | `runQueuedLiftBrandAudits()` | New leads added to the sheet get audited by Claude as they queue |
| **1:00 PM** | `createOutreachDrafts()` | Second batch of Gmail drafts for leads audited since 8 AM |
| **Hourly** | `refreshSentAndReplies()` | Sheet updated when emails are confirmed sent; replies and bounces tracked |

**Daily target:** Up to 20 new Gmail drafts (10 at 8 AM, 10 at 1 PM), with matching audits continuously queued by the Pipeline audit script.

Megan reviews and sends. The automation never sends email automatically.

---

## How to activate — one-time setup

Both scripts must be open and authorized in the `helloliftstudio@gmail.com` Google account (not your personal Gmail).

### Step 1: Open the automation scripts

1. Open the Lift Studio Google Sheet.
2. Go to **Extensions > Apps Script**.
3. You should see two script files: `gmail_outreach_automation.gs` and `lift_brand_pipeline_automation.gs`.
   - If they are not there, copy the contents of each file from this repo into the script editor.

### Step 2: Set the timezone

1. In Apps Script, click the gear icon (**Project Settings**).
2. Set **Time zone** to `America/New_York` (or your local timezone).
3. Click **Save**.

This ensures the 8 AM trigger actually fires at 8 AM your time, not UTC.

### Step 3: Install triggers

**For Gmail drafts and sent-mail monitoring** (`gmail_outreach_automation.gs`):

1. Open the Google Sheet.
2. Reload the page. A new menu **Outreach Automation** will appear.
3. Click **Outreach Automation > Install Full Schedule (run once)**.
4. Approve the permissions prompt — this requires access to Gmail and Google Sheets.
5. You'll see a toast: "Full outreach schedule installed."

**For brand auditing** (`lift_brand_pipeline_automation.gs`):

1. The 5-minute audit trigger is installed by **Lift Pipeline > Install automation**.
2. This also requires an `ANTHROPIC_API_KEY` in Script Properties:
   - Apps Script > Project Settings > Script Properties > Add property
   - Key: `ANTHROPIC_API_KEY`
   - Value: your Claude API key from console.anthropic.com

### Step 4: Verify triggers are active

In Apps Script, click the clock icon (**Triggers**) in the left sidebar. You should see:

| Function | Event source | Type |
|---|---|---|
| `createOutreachDrafts` | Time-driven | Day timer, 8 AM–9 AM |
| `createOutreachDrafts` | Time-driven | Day timer, 1 PM–2 PM |
| `refreshSentAndReplies` | Time-driven | Hour timer, every 1 hour |
| `runQueuedLiftBrandAudits` | Time-driven | Minutes timer, every 5 min |
| `handleLiftBrandPipelineEdit` | From spreadsheet | On edit |

---

## What about the LaunchAgent?

The macOS LaunchAgent (`automation/launchd/com.liftstudio.daily-outreach.plist`) was the original scheduling approach. It has a known problem: it requires the shell script `automation/run_daily_8am_outreach.sh` which was never created, so it currently **does nothing**.

Once the Google Apps Script triggers above are active, the LaunchAgent can be decommissioned — the Apps Script runs in the cloud without needing the Mac to be on.

To disable the LaunchAgent:

```zsh
launchctl bootout "gui/$(id -u)" "$HOME/Library/LaunchAgents/com.liftstudio.daily-outreach.plist"
```

---

## Human Review

The schedule never sends email. Megan still reviews drafts in Gmail and sends manually.

At the end of each batch, the **Orchestrator Agent** confirms what ran and notifies Megan. Run reports are written to `automation/daily-runs/YYYY-MM-DD-morning.md` and `automation/daily-runs/YYYY-MM-DD-midday.md`.
