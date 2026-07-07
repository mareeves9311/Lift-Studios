# Lift Pipeline Week Board View

2026-07-07. A Kanban-style reading of `templates/LIFT_PIPELINE_WEEK_TRACKER.csv` — same data, grouped by `Status` instead of listed flat. Not a new tool: open the CSV in any spreadsheet app, group/sort by `Status`, and each group below is one board column. No app is built or needed.

## Board columns

One column per status value. A prospect is one card (one CSV row), shown in whichever column matches its current `Status`:

`Prospect Found` → `Scored` → `Selected` → `Audit-Lite In Progress` → `Audit-Lite Complete` → `Email Drafted` → `QA Passed` → `Sent` → `Follow-Up Due` → `Replied` → `Opportunity`, with `Not a Fit` reachable from any column.

## Status values — what each means, entry, exit

| Status | Meaning | Enters when | Exits when |
|---|---|---|---|
| **Prospect Found** | Sourced from the niches file/geo search, added to the tracker | Manual sourcing pass | Field scorecard filled in → **Scored** |
| **Scored** | All four field-scorecard categories + `Total Score` filled in | Scoring pass complete | Megan picks it into the batch → **Selected**; or it scores low / trips a disqualifier → **Not a Fit** |
| **Selected** | Committed into this batch's working set | Megan's pick (taste + score) | Audit-lite work begins → **Audit-Lite In Progress** |
| **Audit-Lite In Progress** | Live site/social skim underway | Work started | Findings recorded → **Audit-Lite Complete**; or the skim surfaces a disqualifier not visible at scoring → **Not a Fit** |
| **Audit-Lite Complete** | `Best Observation` / `What Is Working` / `Opportunity Angle` / `Offer Fit` all filled in | Findings recorded | Draft written → **Email Drafted** |
| **Email Drafted** | First-touch email written per `LIFT_OUTREACH_AND_FOLLOWUP_SYSTEM.md`'s formula | Draft exists | Human Voice QA six-pass check clean → **QA Passed** |
| **QA Passed** | Draft cleared the Anti-AI Output QA Standard, ready to send | QA clean (revised until clean) | Megan's manual send → **Sent** |
| **Sent** | Megan has sent it; `Sent Date` filled in, mirrored to the live Sheet | Manual send | Cadence date arrives with no reply → **Follow-Up Due**; or a reply arrives first → **Replied** |
| **Follow-Up Due** | A cadence date (Day 4–5 FU1, Day 10–12 FU2) has arrived with no reply | Cadence date reached | Reply arrives → **Replied**; FU1 sent, re-enters this same status for the FU2 date (log which follow-up number in `Notes`); FU2 passes with no reply → **Not a Fit** (no FU3, per the outreach system's cadence) |
| **Replied** | Prospect responded | Reply received | Manual triage decides → **Opportunity** (warm) or → **Not a Fit** (explicit no / unqualified) |
| **Opportunity** | Warm, moving toward a paid-offer conversation | Positive reply triaged | Outside this board's scope — feeds the sales conversation and, once built, the fulfillment SOP (ticket T24) |
| **Not a Fit** | Disqualified | A red flag at any stage, or explicit "not interested"/bounce/unsubscribe | Terminal — stays here, reason logged in `Notes` |

## How a prospect moves through the board

Mostly linear, top to bottom, through the 11 forward stages. Two exceptions worth naming: **Not a Fit** is reachable from every stage, not only from Replied — a disqualifier can surface at any point, not just at the end. **Follow-Up Due** isn't strictly one-and-done — a prospect can pass through it twice (once for FU1, once for FU2) before either replying or landing on Not a Fit.

## What should trigger Megan review

Every transition, since nothing here is automated — but these specifically are judgment calls, not mechanical facts, and deserve a deliberate pause rather than a quick click:

- **Scored → Selected** — which 10 make the batch.
- **Audit-Lite Complete** — `Opportunity Angle` / `Offer Fit` selection (channel/offer choice is taste, same rule as the two-opportunity pick everywhere else in this doc set).
- **QA Passed** — accepting or overriding the Human Voice QA suggestions.
- **Replied** — reply triage.
- Any move to **Not a Fit** — a disqualification call, logged with a reason.

## What should never auto-trigger

No status ever advances itself. Nothing reads `Total Score` and auto-sets `Selected`. Nothing reads `QA Passed` and auto-sends. Nothing reads `Follow-Up Due` and auto-drafts or auto-sends a follow-up. Nothing reads `Reply Status` and auto-advances to `Opportunity` or `Not a Fit`. This is a durable rule for any future tooling built around this board, not just a description of today's manual state — if this board is ever wired to a live connector, every transition above still requires Megan's click.
