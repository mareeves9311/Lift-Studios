# Lift 90-Day Revenue Plan

2026-07-06. Grounded in the actual current state: 3 completed audits (joy-daniels, shaffer-landscapes, witmer-group), 0 recorded paid closes, 0-week tracker streak. The proof-run gate (`LIFT_PROFIT_ENGINE_WORKFLOW.md`) requires ≥10 audits, ≥10 reviewed sends, a 4-consecutive-week same-session tracker streak, ≥3 manually-handled replies, and 0 identity mishaps before any P2 automation becomes buildable. This plan is built to reach that gate, not around it — automation timing follows the proof gate, not the calendar.

## Days 1–14 — Proof-run and offer sharpening

- **Goal:** move toward the ≥10-audit / ≥10-send proof gate using Tier A verticals only; learn whether the Mini-Audit/Blog pitch resonates at all.
- **Exact actions:** score and add 15–20 Tier A prospects (PA core geo) to the tracker using the rubric in `LIFT_PROSPECTING_AND_SCORING_SYSTEM.md`; run audit-lite depth on each (see `LIFT_AUDIT_PRODUCTION_SYSTEM.md`); send first-touch emails referencing 1–2 specific findings; run every send through the Anti-AI Output QA Standard first; update the tracker same-session, every time.
- **Audits:** ~7 more audit-lite passes (to reach 10 cumulative); full `$liftaudit` depth only if a prospect replies positive.
- **Prospects sourced/scored:** 15–20.
- **Outreach emails:** 10–15 first-touch sends.
- **What to measure:** score distribution (too early for correlation, but start the record), time per audit-lite, time per email, Anti-AI QA pass rate (are drafts passing clean or needing multiple rewrites — signal for whether the Human Voice QA checklist is worth building immediately).
- **What to automate:** nothing beyond what's already safe today — local asset-gathering scripts (bucket 1) if used at all.
- **What not to automate:** everything else. This phase exists to gather proof, not to skip gathering it.
- **Expected learning:** which specific-issue types get replies; rough sense of whether score correlates with response at all.
- **Success criteria:** 10 cumulative audits, 10 cumulative reviewed sends, same-session tracker updates every send (week 1 of the eventual 4-week streak).
- **Stop conditions:** any identity mismatch — halt immediately, per every existing safety doc. Zero replies across 15 sends by day 14 — pause volume and revisit targeting/copy before sending more of the same pitch.

## Days 15–30 — Outreach volume and response learning

- **Goal:** build toward the 4-week same-session tracker streak; get first replies; learn what copy/angle actually converts.
- **Exact actions:** keep sourcing 10–15 new Tier A/B prospects per week; send Follow-Up 1 to the day 1–14 batch that hasn't replied (per the cadence in `LIFT_OUTREACH_AND_FOLLOWUP_SYSTEM.md`); introduce Tier B verticals as a deliberate comparison against Tier A response rate.
- **Audits:** ~10–15 more, mostly audit-lite; full depth only on replies.
- **Prospects sourced/scored:** 20–30 more.
- **Outreach emails:** 15–25 first-touch + 8–10 Follow-Up 1 sends.
- **What to measure:** reply rate by vertical, reply rate by specific-issue type named, whether Follow-Up 1 lifts response at all over first-touch alone.
- **What to automate:** still nothing beyond bucket 1. Reconciliation stays read-only-only-if-built; the connector/streak proof isn't there yet.
- **What not to automate:** reply triage stays 100% manual — flagged High risk in the agent system for a reason.
- **Expected learning:** which vertical/geo combination is actually replying (feeds the Vertical Selector agent's eventual first real data); whether leading with the Mini-Audit or leading straight into the Blog package framing converts better.
- **Success criteria:** ≥3 replies handled manually (a hard proof-gate requirement), 2–3 consecutive weeks of same-session tracker updates, at least one qualified sales conversation booked.
- **Stop conditions:** 0 replies across 25+ cumulative sends by day 30 — stop and revisit vertical/copy before continuing into day 31. Any identity mismatch halts immediately.

## Days 31–60 — First paid clients / package refinement

- **Goal:** close the first paying client(s); reach the first **$1,000**.
- **Exact actions:** convert warm replies to a Mini-Audit ($250) or a direct package pitch where the fit is obvious; run full `$liftaudit` depth on every replied/paying prospect; deliver the first paid engagement(s) fully manually, end to end; keep background prospecting at ~10/week so the pipeline doesn't dry up while fulfilling.
- **Audits:** full depth on demand (replied/paying leads); ~10/week audit-lite continues for new prospecting.
- **Prospects sourced/scored:** ~10/week background rate.
- **Outreach emails:** ~10/week first-touch + ongoing Follow-Up 1/2 on the aging batch.
- **What to measure:** close rate (replies → paid), average deal size, real time-to-deliver per paid engagement, and — most important — **actual Megan-hours per close**, which turns every price in `LIFT_OFFER_LADDER.md` from hypothesis into fact.
- **What to automate:** likely nothing new yet, but the manual-proof gate may clear mid-phase — only then do doc/local P1 tools (already buildable, see build queue) get joined by the P2 tier (T13 prospect scoring assistant, T6 audit packet assembler), and only as Claude Code local tools, never live-system automation.
- **What not to automate:** delivery/fulfillment of the first paid packages — do these fully manually to learn the real time cost before ever templating them. Final Anti-AI QA acceptance stays Megan's call even after the flagging checklist exists.
- **Expected learning:** the real hourly economics of a Mini-Audit and a Blog package cycle — this is the number that decides whether current pricing is right.
- **Success criteria:** first $1,000 in signed/paid revenue; at least one recurring Blog package client, or two Mini-Audits plus one one-time package.
- **Stop conditions:** 0% close rate after 5+ qualified sales conversations — stop scaling volume and fix the offer/pricing/positioning before day 61, don't just keep sending more emails at the same pitch.

### Minimum viable path to first $1,000
2 Mini-Audits ($500) + 1 Blog & SEO Foundation at the low end ($600) ≈ $1,100. Equally valid: 1 Mini-Audit ($250) + first month of a Blog Essentials retainer ($500) + one more small close. Achievable from as few as 3 closes if Tier A response holds anywhere near typical cold-outreach rates.

### Minimum viable path to first $5,000
Framed as a **run-rate crossing, not a one-time stack** — the actual goal is a repeatable engine, not one big invoice. Example shape: 3–5 Blog Essentials/Growth retainers running (~$700/mo average = $2,100–$3,500/mo) plus 2–3 Mini-Audits and one Brand Foundation or add-on close filling the gap to $5k cumulative across the 90 days. If recurring run-rate alone reaches ~$3.5–4k/mo by day 90, that's the more meaningful number than the cumulative total.

## Days 61–90 — Repeatable workflow + first safe automation assists

- **Goal:** lock in the weekly operator routine (`LIFT_WEEKLY_OPERATOR_ROUTINE.md`); ship the first genuinely safe automation assists.
- **Exact actions:** formalize the weekly rhythm; have Claude Code build 1–2 P1 build-queue tickets (SOP, checklist, KPI tracker — all doc/local-only, zero live-system risk); keep closing and delivering; consider a Tier E vertical experiment (med spas etc.) only if Tier A/B pipeline is healthy, as portfolio diversification, not a pivot.
- **Audits / prospects / emails:** steady-state weekly rate, as defined in `LIFT_WEEKLY_OPERATOR_ROUTINE.md`.
- **What to measure:** the full KPI set from `LIFT_PROFIT_ENGINE_WORKFLOW.md` — candidates/wk, audits/wk, sends/wk, reply rate, reply→call rate, close rate, avg deal size, revenue/mo, audit time, Megan-hours/close, visual QA pass rate, and now Anti-AI QA pass rate.
- **What to automate:** P1-bucket doc/local tools only (full list in `LIFT_MONEY_MACHINE_BUILD_QUEUE.md`). Reconciliation/tracker-write automation still requires the 4-week streak plus verified connector regardless of what day it is — automate on the proof gate, not the calendar.
- **What not to automate:** sends, opportunity selection, visual QA sign-off, package/price decisions, final Anti-AI voice-QA acceptance — permanently human-owned regardless of phase.
- **Expected learning:** whether the business is sustainable at its current real time cost — this is the point where Megan decides whether Lift scales, holds steady, or narrows further.
- **Success criteria:** a repeatable week that doesn't require redeciding the process each time; ≥$1,000 cumulative proven (ideally further); the weekly routine actually followed for 2+ consecutive weeks.
- **Stop conditions:** any safety incident (identity mismatch, fabrication, unattended write/send) halts automation expansion immediately regardless of phase, and that workflow area falls back to fully manual until re-verified — per the existing V2 blueprint's stop conditions, unchanged here.
