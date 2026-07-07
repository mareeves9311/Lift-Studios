# Lift Pipeline Week Dashboard

2026-07-07. Operator dashboard for the first real outreach batch: HVAC/plumbing prospects in Harrisburg, Mechanicsburg, and York — Tier A verticals, PA core geo, per `LIFT_MONEY_MACHINE_BLUEPRINT.md` and `automation/niches_and_areas.md`. This is the concrete first slice of Days 1–14 in `LIFT_90_DAY_REVENUE_PLAN.md`, not a new plan — an execution surface for the existing one.

## Purpose

Give Megan one place to see, at a glance, where every prospect in this batch sits and what today's action is — without needing to re-derive the process from the strategy docs each time.

## Scope note: local working tracker, not the live Sheet

`templates/LIFT_PIPELINE_WEEK_TRACKER.csv` is a **local, repo-only working file** for this batch's mechanics (scoring, audit-lite notes, drafting/QA state). It is not the live Google Sheet Pipeline tab, and nothing here syncs to it automatically — no connector, no automation, per this task's own constraints. The live Sheet stays the source of truth for the profit-engine proof-run streak (`LIFT_PROFIT_ENGINE_WORKFLOW.md`). Megan mirrors `Sent Date` and `Reply Status` into the live Sheet manually, same-session, same discipline as always — this CSV is a richer local staging layer in front of that, not a replacement for it.

## How Megan uses it daily

Open the CSV, sort/filter by `Status`, work whichever rows are at an active stage, update `Status` and the relevant fields before closing the session. `LIFT_PIPELINE_WEEK_BOARD_VIEW.md` is the same data read as a Kanban grouped by status instead of a flat sheet — use whichever view is faster on a given day.

## Pipeline stages

The 12 status values, single source of truth in `LIFT_PIPELINE_WEEK_BOARD_VIEW.md` — don't let this doc and that one drift: Prospect Found → Scored → Selected → Audit-Lite In Progress → Audit-Lite Complete → Email Drafted → QA Passed → Sent → Follow-Up Due → Replied → Opportunity, with Not a Fit reachable as an exit from any stage.

## Dashboard sections

Reading the tracker as a dashboard, four groupings:

- **This batch:** all 12 sourced; which 10 are Selected; which are Not a Fit (and why, in `Notes`).
- **Today's actions:** every row sitting in a mid-pipeline "in progress" or "due" state (Audit-Lite In Progress, a draft awaiting QA, Follow-Up Due) — the working queue for the day.
- **Blocked/waiting:** Sent rows with no `Reply Status` yet, waiting out the cadence.
- **This week's numbers:** count of Sent, count of Replied, count of Opportunity — the raw inputs to the 90-day plan's reply-rate measurement.

## What belongs in ChatGPT vs. Claude Code vs. manual tracker

- **ChatGPT:** the `$liftaudit` audit-lite research pass per prospect; first-touch email drafting; the Human Voice QA pass (ChatGPT or Claude Code both work — pure text review, per `LIFT_REVENUE_AGENT_SYSTEM.md`).
- **Claude Code:** scoring-math consistency (`Total Score` = sum of the four field-scorecard categories), CSV formatting/consistency checks, doc upkeep.
- **Manual, Megan only:** which 10 get Selected (taste), final QA acceptance, every send, every reply read and triaged, every `Status` change that reflects a judgment call rather than a mechanical fact, and mirroring outcomes into the live Sheet.

## What not to automate

Every send — permanent. The Selected pick — taste. `Opportunity Angle` / `Offer Fit` selection — taste, same rule as the two-opportunity pick everywhere else in this doc set. Reply triage — High risk, manual-only until 3 replies have been handled manually (`LIFT_REVENUE_AGENT_SYSTEM.md`). Any write to the live Google Sheet — this CSV is edited locally, by hand or by Claude Code on request, never by anything that also touches Gmail/Sheets/Drive.

## Daily operating rhythm — this batch, one week

- **Day 1:** pull 12 HVAC/plumbing prospects (Harrisburg / Mechanicsburg / York); score all 12 on the field scorecard below; select the best 10.
- **Day 2:** audit-lite notes on all 10 Selected rows.
- **Day 3:** draft observation-led first-touch emails for all 10.
- **Day 4:** Human Voice QA pass on all 10 drafts; revise until clean.
- **Day 5:** send all 10 (Megan's manual click, one at a time); update `Sent Date` same-session; mirror to the live Sheet.
- **Ongoing after Day 5:** work `Follow-Up Due` rows per the cadence in `LIFT_OUTREACH_AND_FOLLOWUP_SYSTEM.md` (Day 4–5 FU1, Day 10–12 FU2, relative to each row's own `Sent Date`).

## Definition of done — first batch

10 prospects scored, selected, and carried through every stage to Sent — or explicitly logged as Not a Fit with a reason if one falls out mid-batch. All 10 have audit-lite notes, a QA-passed draft, and a `Sent Date`. Tracker fully filled same-day at each stage. Zero live-system touches, zero identity mishaps. These 10 sends count toward — not complete — the 10–15 first-touch target in Days 1–14 of `LIFT_90_DAY_REVENUE_PLAN.md`.

## Field scorecard — reconciling with the full rubric

This CSV's four score columns (`Website Clarity Score`, `Local SEO Content Gap Score`, `Trust Signal Score`, `Urgency Opportunity Score` — each 0–4, `Total Score` 0–16) are a **fast field variant** of the full rubric in `LIFT_PROSPECTING_AND_SCORING_SYSTEM.md`, not a competing scoring model:

| CSV column | Maps to (full rubric) |
|---|---|
| Website Clarity Score | Website Weakness |
| Local SEO Content Gap Score | Content/SEO Gap — the 6th category proposed in `LIFT_PROSPECTING_AND_SCORING_SYSTEM.md` (ticket T19); **this batch is its first real use** |
| Trust Signal Score | Business Credibility |
| Urgency Opportunity Score | Revenue Potential, reframed to fold in emergency/seasonal urgency — directly relevant here since HVAC/plumbing are exactly the emergency-service Tier A logic |

**Intentionally dropped for speed:** Conversion Path and Ease of Personalization aren't scored numerically on this sheet — they're captured qualitatively in the `Best Observation` and `Opportunity Angle` free-text columns instead. A deliberate first-batch speed tradeoff, not a replacement of the full rubric, which stays the source of truth for the scoring model itself.

**Proposed priority bands (0–16, proportional to the full rubric's 17–20/13–16/9–12/0–8 bands on its 0–20 scale, unproven until run against real prospects):** 14–16 A-list, 10–13 good, 7–9 maybe, 0–6 skip.

**`Revenue Opportunity` field:** Megan's own judgment note, not an auto-computed or agent-asserted number — no invented dollar figures or guarantees, consistent with `audit-protocol.md` and the Anti-AI Output QA Standard.
