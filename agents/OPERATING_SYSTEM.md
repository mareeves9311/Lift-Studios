# Lift Studio Agent Operating System

## Overview

Lift Studio now has an orchestrated outbound engine.

1. `orchestrator.md` manages the full system and routes work.
2. `new_business_auditor.md` finds and qualifies prospects.
3. `email_marketer.md` turns qualified prospects into review-ready Gmail drafts.
4. `follow_up_pipeline_manager.md` tracks replies, updates the sheet, and drafts next steps.

The system should run like a relay. Each agent owns one stage and passes clean information to the next.

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
   - It marks strong leads as `Ready to send`.

3. **Draft**
   - Email Marketer pulls `Ready to send` leads.
   - It creates Gmail drafts with the approved first-touch template.
   - It attaches the service menu and appends the HTML signature.

4. **Review & Send**
   - Megan reviews and manually sends drafts.
   - The sheet should be updated to `Sent` once sent.

5. **Monitor**
   - Follow-Up & Pipeline Manager searches Gmail for replies, bounces, and auto-replies.
   - It updates the sheet and drafts replies/follow-ups.

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

## Known System Gaps

These are the next automation opportunities:

- A proof-of-work builder agent for warm leads.
- A sheet dashboard that shows lead and outreach metrics by stage.
- A stronger dedupe script across pipeline, outreach drafts, sent mail, and archived lead lists.
- Automatic alternate-contact research for bounced emails.
- A standard reply/follow-up cadence generator.
