# Lift Studio Operating System — Visual Status Dashboard

Last updated: 2026-07-06 23:45 ET

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    LIFT STUDIO OPERATING SYSTEM                     │
│                     (MANUAL-FIRST WORKFLOW)                         │
└─────────────────────────────────────────────────────────────────────┘

                           MANUAL INPUT LAYER
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
   PROSPECT              AUDIT REQUESTS              OUTREACH
   SELECTION             (via $liftaudit)            APPROVAL
   (Megan picks)         (Claude agent)              (Megan sends)
        │                          │                          │
        └──────────────────────────┼──────────────────────────┘
                                   │
                    SHEET BACKEND (Google Sheets)
                    Pipeline | Working Pipeline
                    Status   | System Log
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
            CLAUDE AUDIT ENGINE         NETLIFY DASHBOARD
            (Read-only queries)         (Published CSV)
                    │                             │
        ┌───────────┴───────────┐                │
        │                       │                │
    Web Search             Contact Form          Live Stats
    Business Data          Verification          Display
    Assessment
```

## Component Status

### 1. Manual Selection Layer ✅ ACTIVE
- **Status:** Operational
- **What:** Megan manually selects prospects from the tracker
- **How:** Human judgment + tracker interface
- **Triggers:** User request in chat

### 2. Audit Layer ✅ ACTIVE
- **Status:** Operational
- **What:** `$liftaudit` command in Claude chat
- **How:** Claude agent (conversation-aware, not email-driven)
- **Triggers:** User request, no automation
- **Output:** Audit results written to sheet via doPost endpoint

### 3. Outreach Layer ✅ MANUAL
- **Status:** Manual (no automation)
- **What:** Megan writes, reviews, and sends all outreach
- **How:** Megan's Gmail inbox + draft approval
- **Triggers:** User click (no auto-send)
- **Blocked:** All auto-draft creation, all scheduled sends

### 4. Sheet Backend ✅ OPERATIONAL
- **Status:** Live
- **Location:** `https://docs.google.com/spreadsheets/d/1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8/edit`
- **Tabs:** Pipeline (source), Working Pipeline (human view), System Log (diagnostics)
- **API:** doPost web app endpoint (fail-open, unsafe until patched)

### 5. Dashboard Layer ✅ OPERATIONAL
- **Status:** Live
- **URL:** `https://liftstudiosdashboard.netlify.app/`
- **Data source:** Published CSV from Pipeline tab
- **Updates:** Manual (read-only, pulls published sheet data)

### 6. Apps Script Engine ❌ DISABLED
- **Status:** LEGACY / V2 CANDIDATE
- **Script ID:** `1g_9-U-01qaFBzzMtZwNEEWM9bdr6AUBsGFxHVfey_U6o9q-nHPGVa9Su`
- **Connection:** clasp (not reconciled)
- **Triggers:** ALL DELETED (2026-07-06)
  - ~~refreshSentAndReplies~~ ✅ DELETED
  - ~~runLiftStudioDailySystem~~ ✅ DELETED
  - ~~createOutreachDrafts~~ ✅ DELETED
  - ~~runQueuedLiftBrandAudits~~ ✅ DELETED
  - ~~handleLiftBrandPipelineEdit~~ ✅ DELETED
- **Functions:** Present but not running (no triggers, safe for now)
- **Web App Endpoint:** UNSAFE UNTIL PATCHED (fail-open secret check)
- **Repo State:** Unreconciled since 2026-06-23

## Data Flow

### During Audit
```
Sheet [New Lead]
       ↓
  $liftaudit
       ↓
Claude Agent
  ├─ Web search
  ├─ Contact verification
  └─ Assessment
       ↓
    doPost
       ↓
Sheet [Ready to Draft / No Email Found / etc.]
```

### During Outreach (Manual)
```
Sheet [Ready to Draft]
       ↓
  Megan reviews
       ↓
  Gmail draft
       ↓
  Megan sends
       ↓
Sheet [Sent / Awaiting Reply / etc.]
```

### Dashboard Updates
```
Sheet [Pipeline tab]
       ↓
  [Manual publish]
       ↓
  Published CSV
       ↓
  Netlify Dashboard
       ↓
  Live display
```

## Safety Status Matrix

| Component | Automated | Scheduled | Auto-Send | Safe |
|-----------|-----------|-----------|-----------|------|
| Prospect Selection | ❌ | ❌ | N/A | ✅ YES |
| Audit Engine | ✅ (AI) | ❌ | N/A | ✅ YES |
| Draft Creation | ❌ | ❌ | N/A | ✅ YES |
| Gmail Sending | ❌ | ❌ | ❌ | ✅ YES |
| Sheet Management | ✅ (doPost) | ❌ | N/A | ⚠️ REVIEW |
| Apps Script Triggers | ❌ | ❌ | ❌ | ✅ YES |
| Web App Endpoint | ✅ | ❌ | N/A | ❌ UNSAFE |

## Known Issues

| Issue | Severity | Status | Fix |
|-------|----------|--------|-----|
| Web app fail-open auth | HIGH | UNPATCHED | Deploy fail-closed secret check via clasp + reapproval |
| Repo/live drift unknown | MEDIUM | UNRECONCILED | clasp pull/diff/reconcile + reapproval |
| Discovery source is HTML-scrape-based | MEDIUM | DISABLED | Structured lead source (Vibiz / manual intake) when V2 revives |
| Morning/Midday reports as drafts | LOW | UNFIXED | Reconfigure cloud routine delivery (not urgent, no automation running) |

## Critical Operational Rules

### DO NOT
- Run Apps Script functions without explicit request
- Install triggers without explicit reapproval
- Deploy changes via clasp without explicit reapproval
- Enable auto-send in any form
- Re-enable HTML-scrape discovery
- Use web app endpoint without fail-closed patch
- Mix Lift Studio operations with other Google accounts

### DO
- Keep all outreach sends as Megan's manual clicks
- Use Claude audit agent for assessment (judgment-led, not scrape-led)
- Update sheet tabs manually or via doPost only
- Monitor System Log for errors
- Report any unexpected automation activity immediately
- Follow division of labor: AI = judgment, Apps Script = structured execution

## Readiness for V2 Revival

**Current readiness level:** 30% (manual-first validated, automation paused, issues identified)

**Requirements for 100%:**
1. ✅ Triggers deleted (done 2026-07-06)
2. ⚠️ Web app fail-closed patch deployed & verified
3. ⚠️ Live/repo drift reconciled via clasp
4. ⚠️ Each function supervised-tested
5. ⚠️ Structured lead source in place (Vibiz / manual intake)
6. ⚠️ Explicit reapproval from Megan

**Current hold:** None — system is stable in manual-first mode indefinitely.

## Emergency Procedures

### If unexpected triggers activate
1. Check Apps Script Triggers page (as helloliftstudio@gmail.com)
2. Review System Log tab for error details
3. Check Gmail drafts folder for unexpected drafts
4. Do NOT delete or modify anything
5. Report to Megan with exact timestamps and function names

### If web app endpoint receives requests
1. Check Sheet → System Log for webhook logs
2. Review the request payload if logged
3. Verify no unauthorized data was processed
4. Report to Megan with request details

### If clasp operations are needed
1. Stop and report to Megan
2. Cannot be done without explicit reapproval
3. Requires re-authentication as helloliftstudio@gmail.com

---

**Last safety review:** 2026-07-06
**Next recommended review:** After any web app endpoint patch deployment
**Emergency contact:** See FOUNDATION.md for escalation procedure
