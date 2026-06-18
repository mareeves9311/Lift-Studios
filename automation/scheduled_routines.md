# Lift Studio Scheduled Cloud Agent Routines

Last updated: 2026-06-17

These are the live Claude Code cloud agent routines that run the Lift Studio automated agent system. They fire on a cron schedule in Anthropic's cloud — no Mac required, no session open.

---

## Active Routines

| Routine | ID | Schedule | Next Run |
|---|---|---|---|
| Morning Orchestrator | `trig_01XBAmYLBHjv4kzcBr8rRLFU` | Daily 7am ET (11am UTC) | Every day |
| Midday Orchestrator | `trig_01P8apy2dZsMAuBHxz1N4m5G` | Daily 12pm ET (4pm UTC) | Every day |

**Manage routines:** https://claude.ai/code/routines

---

## What Each Routine Does

Both routines run the same relay in sequence:

1. **New Business Auditor** — always fires every cycle. Finds new leads via web search, dedupes against the Pipeline sheet, audits candidates, marks strong ones Ready to Draft.
2. **Email Marketer** — fires when Ready to Draft rows exist. Writes personalized outreach content into the Outreach Draft column. The Apps Script then creates the Gmail draft.
3. **Follow-Up Pipeline Manager** — fires when sent mail or replies need processing. Reconciles sent status, classifies replies, drafts follow-ups, applies Gmail labels.
4. **Quality Control** — fires at any uncertainty from any agent. Packages flags for Orchestrator assessment or Megan escalation.
5. **Innovator** — fires after every batch. Runs post-batch observation pass. Full weekly pass on Mondays. High-score briefs included in status email.

Weekly Innovator passes must explicitly revisit `INN-006 — Vibiz MCP` until it is activated, declined, or moved to `Revisit later`.

The Orchestrator sends a plain-text status report to `helloliftstudio@gmail.com` after every run.

---

## How Agent Files Are Loaded

The cloud agent **does not clone the repo** — it fetches agent files directly from GitHub raw URLs at runtime. This means:

- The repo must remain **public** on GitHub for the routines to work.
- Any update to an agent `.md` file in the repo takes effect on the next scheduled run automatically — no routine update needed.
- If you add a new agent file to `agents/`, update the file list in the routine prompt (see below).

**Raw URL pattern:**
```
https://raw.githubusercontent.com/mareeves9311/Lift-Studios/main/agents/[filename].md
```

---

## Files Loaded Each Run

```
agents/OPERATING_SYSTEM.md
agents/FOUNDATIONAL_AGENTIC_SYSTEM_BRIEF.md
agents/orchestrator.md
agents/new_business_auditor.md
agents/email_marketer.md
agents/follow_up_pipeline_manager.md
agents/quality_control.md
agents/innovator.md
agents/SIGNATURE_RENDERING_RULES.md
automation/niches_and_areas.md
project-notes/innovator-backlog.md
project-notes/qc-flag-log.md
STATUS.md
```

---

## MCP Connectors Attached

| Connector | Purpose | Limitation |
|---|---|---|
| Google Drive (`9351e6d4-6804-4999-af1a-545e030ff1d0`) | Read Pipeline sheet, read files | **READ ONLY** — cannot write to sheet cells. This is structural, not an auth issue. |
| Gmail (`e4bce37c-2aea-4407-848b-e6eadd899562`) | Read threads, check replies, draft verification | Connected to `helloliftstudio@gmail.com`. Do not create Gmail drafts directly — Apps Script handles that with proper attachment + signature. |

**Critical:** The Drive MCP can never write to Google Sheets. All sheet writes from the cloud agent must go through the Apps Script web app endpoint (see below).

## Apps Script Web App Endpoint (Sheet Write Path)

The only way for the cloud agent to write data to the Pipeline sheet is via the `doPost` web app endpoint deployed from `LiftPipelineAutomation.gs`.

**Endpoint status:** DEPLOYED (2026-06-18). URL and secret are live in both routine prompts.

**Deployment reference (completed):**
1. ✅ `doPost` function in `LiftPipelineAutomation.gs`
2. ✅ Deployed as Web app — Execute as: Me | Access: Anyone
3. ✅ Script Property `LIFT_WEB_APP_SECRET` = `LiftStudio2026!`
4. ✅ Both Morning and Midday Orchestrator routine prompts updated with URL and secret via RemoteTrigger

**Once deployed, cloud agent uses:**

```
POST [WEB_APP_URL]
Content-Type: application/json

{
  "secret": "[LIFT_WEB_APP_SECRET]",
  "action": "addLeads",
  "leads": [{ "business_name": "...", "email": "...", ... }]
}
```

Actions available: `addLeads`, `updateRows`, `getStatus`

---

## Adding a New Agent

1. Create the agent spec at `agents/[agent_name].md` in this repo.
2. Push to `main`.
3. Add the raw URL to the file list in both routine prompts via the RemoteTrigger update action.
4. The next scheduled run will load and follow the new agent.

The routine prompt instructs the Orchestrator to route to the new agent per the rules defined in `orchestrator.md` — update that file's routing rules to include the new agent.

---

## Key Resources

- Pipeline sheet: https://docs.google.com/spreadsheets/d/1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8/edit
- Dashboard: https://liftstudiosdashboard.netlify.app/
- Gmail: helloliftstudio@gmail.com
- GitHub repo: https://github.com/mareeves9311/Lift-Studios (must remain public)
- Routines management: https://claude.ai/code/routines

---

## Apps Script Automation (separate layer)

These run independently in Google's cloud and complement the Claude routines:

| Trigger | Function | Schedule |
|---|---|---|
| Create outreach drafts | `createOutreachDrafts()` | Daily 8am ET + 1pm ET |
| Reconcile sent + replies | `refreshSentAndReplies()` | Hourly |
| Audit new leads | `runQueuedLiftBrandAudits()` | Every 5 minutes |

The Claude routines write content to the sheet; the Apps Script handles Gmail mechanics.

---

## If a Routine Fails

Check `helloliftstudio@gmail.com` — the Orchestrator sends a status email every run. If no email arrives, check the routine at https://claude.ai/code/routines for error details.

Common issues:
- **Repo not public** — the routine cannot fetch agent files. Keep the repo public.
- **"Drive MCP write access unavailable"** — this is NOT an auth error. The Drive MCP is structurally read-only and cannot write to Sheets. The fix is the web app endpoint (see above). Do not reconnect the Drive MCP to solve this.
- **Gmail MCP connected to wrong account** — must be `helloliftstudio@gmail.com`. If emails appear in a wrong account's drafts, disconnect and reconnect the Gmail MCP at claude.ai/code/routines.
- **Web app endpoint 401 / Unauthorized** — the `LIFT_WEB_APP_SECRET` in the POST body doesn't match the Script Property. Verify both match.
