# Lift V2 Safe Automation Blueprint

2026-07-06 (Fable 5). A simplified V2 that does NOT revive the old engine. Supersedes the earlier `_system/AUTOMATION_READINESS.md` root-level `LIFT_V2_WORKFLOW_BLUEPRINT.md` at the global level with Lift-specific depth. Design only — nothing built.

## V2 goals
Maximum SAFE leverage: faster audits, consistent quality, less bookkeeping — with the human on every send and every live write. Measurable time savings + measurable quality consistency.

## V2 non-goals
Auto-send (never) · auto-draft to Gmail (not until Phase 6, if ever) · unattended sheet writes · trigger installation · reviving any V1 code as running code · scraped discovery.

## Profit-engine objective
More qualified prospects → faster polished audits → stronger tailored outreach → higher close rate → repeatable deliverables → more profit per hour of Megan's time. Automation earns its place only by removing drudgery without removing judgment or quality.

## From V1: discard vs reuse-as-idea
**Discard (code):** both root .gs variants, sendEmail paths, launchd chain, danger-full-access shell, auto-relay orchestrator, fail-open doPost, scrape discovery. **Reuse as CONCEPT only:** draft-only Gmail pattern (Phase 6), stage-driven queue *idea* (rebuilt with dry-run+approval), scoring rubric, JSON-repair-retry, row-safe error isolation, the audit skill structure (already local and good).

## Minimum viable V2
Not a system — a set of independent, human-gated assists, each shippable alone: (1) hardened $liftaudit skill, (2) asset-gathering local scripts, (3) audit-to-outreach packet generator (produces a DOC, not a Gmail draft), (4) tracker validation report (read-only), (5) sent-folder reconciliation report (read-only). That's the whole V2 ceiling for now. Phase 6 (gated Gmail drafts) is explicitly deferred and may never happen.

## Tracker / data model
Per the global blueprint §7: company, category, website, instagram, email, contact_form_url, audit_status, outreach_status, audit_link, first_sent_date, last_touch_date, reply_state, next_action, notes. **Dropped:** score/priority/recommended_offer/draft_id/automation_notes (V1 machinery fields). Stage names carry NO automation-trigger semantics.

## Workflows
- **Manual (Phase 0, now):** pick → $liftaudit → packet → Megan sends → manual tracker update.
- **Agent-assisted (Phases 2–3):** audit skill faster; asset scripts gather; packet generator assembles; all output advisory.
- **Read-only reconciliation (Phase 4):** verify connector = helloliftstudio → read sent (90d) → diff tracker → REPORT with evidence column → Megan approves all/some/none → approved writes one logged batch. No deletes, no drafts, no labels.

## Human approval flow
Every external effect passes a gate: sends = Megan in Gmail; tracker writes = per-row approval from a report; new assist into scope = Megan + blueprint update. Dry-run is the default for anything that could write.

## Fail-closed + safety
Any future secret check: `if (!secret || mismatch) reject` — reject on missing, never allow. Identity self-check as hard precondition on every connector touch (abort+log on mismatch). No-trigger default: V2 installs zero triggers; scheduling is a separate, later, gated decision. Reversible ops only; visible queue state (reports show what WOULD happen before it happens). Strong logging: every assist writes a dated log of what it read and proposed.

## Test plan
Each assist: 2 supervised runs on real data, output verified against ground truth Megan already knows, before "usable." Reconciliation additionally: first run writes-disabled entirely. Safety harness (T8) greps built artifacts for send/trigger/network calls → must be zero for local assists.

## Rollout phases (conservative)
0 manual (now) · 1 doc/SOP cleanup (now, safe) · 2 reusable audit/outreach skills (now, local) · 3 local dry-run checker (after §proof) · 4 read-only reconciliation (after 4-wk streak + connector) · 5 supervised approved-packet, not Gmail drafts (after Phase 4 proven) · 6 gated Gmail draft creation ONLY if proven + explicitly approved · **Never: auto-send.**

## Stop conditions
Any identity mismatch · any urge to add "run"/"send" affordance · registry/tracker drift · a phase attempted before its proof · Codex no-revival audit fails.

## Success criteria (measurable)
Audit time ↓ (baseline vs skilled) · quality consistency (visual QA pass rate stays high as volume rises) · tracker accuracy (reconciliation finds fewer mismatches over time) · reply rate ↑ · zero safety incidents · Megan's hours-per-close ↓.

## Proven manually FIRST (gate for Phases 3+)
≥10 completed $liftaudits · ≥10 Megan-reviewed sends · 4 consecutive weeks same-session tracker updates · ≥3 replies handled manually · zero identity mishaps · Megan says "the manual loop is boring now."

## Buildable BEFORE proof (doc/local-only, no gate)
Phase 1 doc/SOP cleanup · Phase 2 skill refinement · asset-gathering scripts · dry-run simulator (operates on fixtures, no live data) · all checklists · KPI tracker scaffold · archive hardening. These carry no live-system risk, so they don't wait.
