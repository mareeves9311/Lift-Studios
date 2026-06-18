# Lift Studio Agent Operating System

This file is a short map of the Lift Studio agent system.

For the full source of truth, use:

`agents/FOUNDATIONAL_AGENTIC_SYSTEM_BRIEF.md`

That foundational brief owns the detailed definitions for:

- automation layers,
- agent roles and boundaries,
- sheet/Gmail handoffs,
- loop behavior,
- known gaps,
- human approval rules,
- tomorrow-ready checks.

Do not update this file with detailed operating rules. Update the foundational brief instead, then keep this file as a short index.

## System In One Page

Lift Studio runs as a staged outbound operating system.

The shared state layer is the Google Sheet:

`Pipeline` is the backend/source-of-truth tab.

The dependable background executor is Google Apps Script:

`automation/live_apps_script_sync/`

Claude/Codex sessions and scheduled routines provide judgment, research, strategy, writing review, documentation, and repair.

## Agent Relay

1. **Orchestrator**
   - Coordinates the system.
   - Checks bottlenecks, handoffs, trigger health, sheet/Gmail consistency, and escalation needs.

2. **New Business Auditor**
   - Finds and audits prospects.
   - Scores fit, captures contact paths, writes audit notes, and marks qualified leads `Ready to Draft`.

3. **Email Marketer**
   - Owns outreach authorship and copy quality.
   - Writes or quality-checks `Subject` and `Outreach Draft`.
   - Does not create Gmail draft objects; Apps Script does that.

4. **Apps Script Executor**
   - Creates Gmail drafts.
   - Attaches the service menu.
   - Applies the simple tested HTML signature.
   - Writes Gmail draft/thread IDs and routine status updates back to the sheet.

5. **Megan**
   - Reviews and manually sends drafts.
   - Approves human-judgment decisions and major system changes.

6. **Follow-Up Pipeline Manager**
   - Reconciles sent mail, replies, bounces, follow-up dates, labels, and next actions.

7. **Quality Control**
   - Packages uncertainty for Orchestrator review.
   - Logs decisions and repeated flag patterns.

8. **Innovator**
   - Observes the system and proposes improvements, new agents, tool unlocks, and scaling opportunities.

9. **Proof-of-Work Builder**
   - Planned but not yet implemented.
   - Future owner for warm-lead mini-audits, one-pagers, mockup briefs, and proof assets.

## Primary Loop

`New lead -> audit -> Ready to Draft -> Email Marketer copy -> Apps Script Gmail draft -> Megan send -> sent/reply reconciliation -> follow-up/QC/proof-of-work as needed`

## Non-Negotiables

- Emails are never sent automatically.
- `Pipeline` is the backend/source-of-truth sheet tab.
- The website is linked in outreach.
- Only the service menu PDF is attached by default.
- The old About/brand-book PDF is not attached unless Megan explicitly asks.
- Apps Script is the production automation source.
- Old archived instructions are reference-only.
