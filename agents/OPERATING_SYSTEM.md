# Lift Studio Agent Operating System

## Overview

Lift Studio now has an orchestrated outbound engine.

1. `orchestrator.md` manages the full system and routes work.
2. `new_business_auditor.md` finds and qualifies prospects.
3. `email_marketer.md` turns qualified prospects into review-ready Gmail drafts.
4. `follow_up_pipeline_manager.md` tracks replies, updates the sheet, and drafts next steps.
5. `quality_control.md` acts as the confidence layer — any agent that is uncertain routes to QC before proceeding.
6. `innovator.md` observes the entire system and surfaces scored opportunity briefs for automation, revenue, new channels, and scaling. It runs alongside the pipeline, not inside it.

The system should run like a relay. Each agent owns one stage and passes clean information to the next. QC catches uncertainty and packages it. The Orchestrator assesses it and resolves what it can. Megan only sees what the Orchestrator cannot resolve. She is the last line of defense, not the first escalation point. The Innovator watches everything and keeps asking: what should we build next?

## End-To-End Flow

0. **Orchestrate**
   - Orchestrator checks system state.
   - It decides whether the bottleneck is lead generation, drafting, review/send, follow-up, or proof-of-work.

1. **Find**
   - New Business Auditor searches categories/cities.
   - It removes duplicates and weak fits.
   - It captures public contact paths.

2. **Audit**
   - New Business Auditor reviews website/social/local discovery.
   - It scores fit and writes specific notes.
   - It marks strong leads as `Ready to Draft`.
   - It sets `Next Action` to `Email Marketer: draft first-touch outreach` so the draft queue is automatic.
   - **Uncertain leads → QC packages the flag → Orchestrator assesses → resolves autonomously or escalates to Megan.**

3. **Draft**
   - Email Marketer pulls `Ready to Draft` leads from the Auditor's handoff queue.
   - It creates Gmail drafts with the approved first-touch template.
   - It attaches the service menu and appends the HTML signature.
   - It updates drafted rows to `Drafted` with `Next Action: Megan review/send`.
   - **Uncertain drafts → QC packages the flag → Orchestrator assesses → resolves autonomously or escalates to Megan.**

4. **Review & Send**
   - Megan reviews and manually sends drafts.
   - The sheet should be updated to `Sent` once sent.

5. **Monitor**
   - Follow-Up & Pipeline Manager searches Gmail for replies, bounces, and auto-replies.
   - It updates the sheet and drafts replies/follow-ups.
   - **Ambiguous replies or classifications → QC packages the flag → Orchestrator assesses → resolves autonomously or escalates to Megan.**

6. **Escalate**
   - Warm leads get a deeper proof-of-work asset.
   - Possible future agent: `proof_of_work_builder.md`.

## Recommended Connectors

Core:

- Google Drive / Google Sheets for the Lift Studio Master Pipeline.
- Gmail for drafts, sent mail, replies, bounces, and thread monitoring.
- Web search for current business research, websites, public social pages, Google Business/Profile context, and contact paths.

Useful next:

- Canva for one-pagers, mini-audit PDFs, and simple proof-of-work visuals.
- Claude/Claude Design for deeper brand audit briefs and visual mockup prompts.
- Google Calendar only if discovery calls become frequent enough to automate scheduling.

## Quality Gates

No lead should move to outreach unless:

- It is not a duplicate.
- It has a contact path.
- The audit notes are specific.
- There is a real Lift angle.
- The recommended offer is populated.

No first-touch draft should be considered ready unless:

- The subject follows the approved format.
- The hook is specific.
- It has two useful observations.
- Lift Studio is hyperlinked.
- The service menu is attached.
- The HTML signature is appended.

No follow-up action should be considered complete unless:

- The Gmail thread was reviewed.
- The response was classified.
- The sheet was updated.
- A draft exists when a reply or follow-up is needed.

## Metrics To Track

At minimum:

- Leads found
- Leads added
- A/B/C priority count
- Ready-to-send count
- Drafts created
- Sent count
- Bounce count
- Reply count
- Interested/warm count
- Calls booked
- Clients closed

## Innovation Layer

The Innovator agent runs a parallel observation loop outside the main pipeline:

- **After every batch:** scans for patterns worth acting on
- **Weekly:** full observation pass — QC log, pipeline bottlenecks, warm reply signals, tool inventory, agent health
- **On trigger:** immediate brief when the same problem appears 3+ times, a new tool is available, or a warm lead reveals a repeatable opportunity

Current open opportunity briefs live in `project-notes/innovator-backlog.md`. Top open items as of system creation:

- INN-001: Google Apps Script time triggers (eliminates Mac dependency) — score 11/12
- INN-002: Canva MCP for proof-of-work assets — score 10/12
- INN-003: Proof-of-Work Builder agent — score 10/12
- INN-006: Vibiz MCP — lead finding, enrichment, outreach, social publishing — score 10/12

## Known System Gaps

These are the next automation opportunities, also tracked by the Innovator:

- A proof-of-work builder agent for warm leads.
- A sheet dashboard that shows lead and outreach metrics by stage.
- A stronger dedupe script across pipeline, outreach drafts, sent mail, and archived lead lists.
- Automatic alternate-contact research for bounced emails.
- A standard reply/follow-up cadence generator.
