# Lift Money Machine Build Queue

2026-07-06. Build queue for Claude Code and Codex, in the priority order Megan specified. Maps to existing tickets in `LIFT_V2_BUILD_TICKETS.md` (T1–T18) wherever one already exists rather than renumbering; three new tickets (T19–T21) fill genuine gaps, plus one new high-priority ticket (T22) for the Anti-AI Output QA system. Nothing in this queue is implemented by this task — doc-only, per this task's own hard limits.

## 1. Prospect scoring system

- **Existing ticket:** T13 (Prospect scoring assistant) — apply the rubric to a candidate list, return a report. **Still gated:** prereq is "rubric stable ×10," not yet met.
- **New, unblocked companion — T19: Scoring rubric v1.1 (add Content/SEO Gap category)**
  - **Objective:** Add the sixth scoring category proposed in `LIFT_PROSPECTING_AND_SCORING_SYSTEM.md` to the live rubric; re-baseline the priority bands proportionally.
  - **Files involved:** `automation/candidate_scoring_rubric.md`.
  - **Allowed:** doc edit only — add one category, adjust band thresholds.
  - **Forbidden:** touching the tracker, touching any candidate's existing recorded score.
  - **Manual proof required:** none to make the edit; the new category itself gets proof (score ≥5 real candidates on it) before being trusted as load-bearing.
  - **Tests:** N/A (doc-only).
  - **Approval gate:** Megan approves the new category wording and band thresholds.
  - **Expected output:** Updated rubric file, 0–24 scale.
  - **Codex audit:** No.
  - **Fable/Opus:** No.

## 2. Audit packet SOP

- **Existing ticket:** T11 (Lift audit SOP extraction) — turn the extraction doc's gates into `skills/liftaudit/references/audit-session-sop.md` as a runnable checklist. **Not yet built** — this task's `LIFT_AUDIT_PRODUCTION_SYSTEM.md` covers the same ground at the `_system/` strategy level but T11's deliverable is the skill-folder checklist itself.
  - **Files involved:** new `skills/liftaudit/references/audit-session-sop.md`.
  - **Allowed:** doc-only, within `skills/liftaudit/references/`.
  - **Forbidden:** editing audit-protocol.md's substance, only reformatting into checklist form; no script/code changes.
  - **Manual proof required:** none to build; validate against the 3 existing audits' actual output next time one runs.
  - **Tests:** SOP covers every gate named in `LIFT_AUDIT_ASSISTANT_EXTRACTION.md` (preflight, asset gate, visual QA gate, single-deliverable rule) plus the audit-lite/full-depth split from `LIFT_AUDIT_PRODUCTION_SYSTEM.md`.
  - **Approval gate:** Megan confirms.
  - **Expected output:** One runnable checklist file.
  - **Codex audit:** No.
  - **Fable/Opus:** No.
- **Supporting ticket — T6 (existing): Audit-to-outreach packet generator.** Assembles summary + draft email + checklist into a DOC (never a Gmail draft). Prereq: 5 manual audits (pattern known) — 2 more needed past the current 3. Codex: yes. Fable: no.

## 3. Outreach approval checklist

- **Existing ticket:** T14 — `docs/OUTREACH_APPROVAL_CHECKLIST.md` (audit link, menu attached, signature, brand green, reply-in-thread, recipient verified, tracker updated). **Not yet built.**
  - **Addition from this task:** the checklist must also include the Anti-AI Output QA six-pass confirmation (`LIFT_ANTI_AI_OUTPUT_QA_STANDARD.md`) and the follow-up cadence confirmation from `LIFT_OUTREACH_AND_FOLLOWUP_SYSTEM.md` — both are new since T14 was originally scoped.
  - **Files involved:** new `docs/OUTREACH_APPROVAL_CHECKLIST.md`.
  - **Allowed:** doc-only.
  - **Forbidden:** any Gmail/Sheets touch.
  - **Manual proof required:** none to build.
  - **Tests:** checklist covers all items above.
  - **Approval gate:** none required to build; Megan uses it going forward.
  - **Expected output:** One checklist file, used before every send.
  - **Codex audit:** No.
  - **Fable/Opus:** No.

## 4. Tracker schema cleanup

- **Existing ticket:** T7 — document the V2 field list, mark dropped fields. **Substantially delivered by this task** — the schema is already restated in `LIFT_PROSPECTING_AND_SCORING_SYSTEM.md` (with the `score_total`/`score_notes` additions). A standalone `_system/` doc isn't strictly needed unless Megan wants the schema to live in its own file rather than inside the prospecting doc.
  - **Remaining action, if wanted:** extract that schema section into its own doc. Optional, low priority now that it's written down somewhere real.
  - **Approval gate:** Megan approves the field list (already shown to her in this task's output).
  - **Codex audit:** No. **Fable/Opus:** No.

## 5. Weekly operator routine

**Delivered by this task** — `_system/LIFT_WEEKLY_OPERATOR_ROUTINE.md`. Not a queued ticket; already exists. No further build action.

## 6. KPI tracker

- **Existing ticket:** T17 — `_system/LIFT_KPI_TRACKER.md` scaffold + optional local `kpi.csv`. **Not yet built.**
  - **Addition from this task:** track Anti-AI QA pass rate and visual QA pass rate alongside the existing KPI set from `LIFT_PROFIT_ENGINE_WORKFLOW.md`, since both are named as measurements in `LIFT_90_DAY_REVENUE_PLAN.md`.
  - **Files involved:** new `_system/LIFT_KPI_TRACKER.md`, optional `kpi.csv`.
  - **Allowed:** doc/local-only.
  - **Forbidden:** any live sheet write — this is a local scaffold, not a Pipeline-tab integration.
  - **Manual proof required:** none to build.
  - **Tests:** N/A.
  - **Approval gate:** none.
  - **Expected output:** A scaffold Megan fills in manually each week.
  - **Codex audit:** No. **Fable/Opus:** No.

## 7. Agent prompts

- **New ticket — T20: Draft agent prompt files for month-2 agents**
  - **Objective:** Turn the Prospect Finder, Prospect Scoring, and Vertical Selector rows in `LIFT_REVENUE_AGENT_SYSTEM.md` into actual reusable prompt text (not yet runnable skills — prompt-level per the promotion ladder in `LIFT_AGENT_RUNTIME_MODEL.md`).
  - **Files involved:** new prompt files, location TBD by Megan (likely `skills/` or a new `_system/prompts/` folder).
  - **Allowed:** doc-only prompt drafting.
  - **Forbidden:** invoking these prompts against live prospect data as anything other than a manual, Megan-supervised test.
  - **Manual proof required:** none to draft; each agent's own proof gate (from `LIFT_REVENUE_AGENT_SYSTEM.md`) still applies before it's trusted with real output.
  - **Tests:** N/A (doc-only).
  - **Approval gate:** Megan reviews each prompt before its first supervised use.
  - **Expected output:** 3 prompt files.
  - **Codex audit:** No. **Fable/Opus:** No.

## 8. Local-only dashboard/report

- **New ticket — T21: Agent/skill status dashboard (local, doc-only)**
  - **Objective:** Build the dashboard concept from `LIFT_AGENT_RUNTIME_MODEL.md` — columns: agent/skill, active workflow, blocked?, permission level, last run/tested, next safe action. **Not the live Netlify dashboard** (that's client-pipeline data, already live) — this is a separate, purely internal view of agent/skill readiness.
  - **Files involved:** new `_system/LIFT_AGENT_STATUS_DASHBOARD.md` (or local script reading a tracker CSV export, Megan's choice).
  - **Allowed:** doc-only or local-script-reading-local-export; no live connector, no scheduler.
  - **Forbidden:** any live Gmail/Sheets read or write; no automatic refresh/trigger.
  - **Manual proof required:** none to build the doc version; a script version would need a dry-run against a fixture export first.
  - **Tests:** if scripted, T8-style safety check (grep for network/send calls, must be zero).
  - **Approval gate:** Megan reviews the first version.
  - **Expected output:** A manually-updated (or fixture-tested local script) status view, matching the mockup already in `LIFT_AGENT_RUNTIME_MODEL.md`.
  - **Codex audit:** Yes, if scripted (safety-relevant surface). No, if doc-only.
  - **Fable/Opus:** No.

## 9. Read-only reconciliation spec

- **Existing ticket:** T5 — spec doc allowed now; supervised run gated on connector verified + Megan watching + full proof-run (4-week streak). **Spec not yet written**, but explicitly buildable now per T5's own terms.
  - **Codex audit:** Yes. **Fable/Opus:** Yes — designs the write-path gate, the one genuinely risky piece.

## 10. Gmail draft assist — only later

**Correctly not yet ticketed.** This is Phase 6 of `LIFT_V2_SAFE_AUTOMATION_BLUEPRINT.md` — explicitly deferred, may never happen, gated on full proof-run plus a separate explicit approval decision. Do not create a ticket for this now; doing so would be exactly the kind of premature building this queue's own ordering is designed to prevent. When/if the gate ever clears, it gets a Fable-designed spec first, same as T5's write-path gate.

## Priority 0 addition: Anti-AI Output QA Checklist / Skill

Not one of Megan's original 10, added this session because it's flagged as a foundation-level requirement and — unlike almost everything else in this queue — has **zero live-system risk**, so it doesn't need to wait for anything.

- **New ticket — T22: Anti-AI Output QA Checklist / Skill**
  - **Objective:** Turn `LIFT_ANTI_AI_OUTPUT_QA_STANDARD.md` into a runnable checklist (and later, skill) that reviews any Lift draft against the six-pass QA and the banned-word/weak-pattern list.
  - **Files involved:** new `skills/lift-voice-qa/` (or a checklist doc under `docs/`, Megan's choice on skill-vs-checklist to start).
  - **Allowed:** doc/skill creation, text-in/text-out only.
  - **Forbidden:** auto-editing or auto-sending anything; no connector, no live-system touch of any kind.
  - **Manual proof required:** test against 5 real drafts — the existing 3 audits' outreach emails plus 2 of the templates in `automation/outreach_templates.md` are a ready-made test set.
  - **Tests:** confirm it catches every word on the banned list and at least half the weak-pattern catalog when deliberately run against a draft seeded with them.
  - **Approval gate:** Megan reviews the checklist once; after that it's a standing pre-send tool, not a per-use approval item.
  - **Expected output:** A checklist or skill Claude Code or ChatGPT can run against any draft before delivery.
  - **Codex audit:** Optional — low value, no safety-critical surface.
  - **Fable/Opus:** No.
  - **Build priority: highest in this queue.** Buildable this week, blocks nothing, unblocked by nothing.

## Queue summary, in build order

1. T22 (Anti-AI QA checklist) and T19 (rubric addition) — both zero-gate, buildable immediately, highest leverage per hour.
2. T11 (audit SOP), T14 (outreach checklist), T17 (KPI tracker) — all P1, doc-only, no gate.
3. T20 (agent prompts), T21 (status dashboard) — doc-only, no gate, slightly more effort.
4. T5 spec (reconciliation) — doc-only now, but its *use* stays gated.
5. T13, T6 — wait on their existing prereqs (rubric ×10; 5 manual audits).
6. Phase 6 (Gmail draft assist) — not ticketed, may never happen.
