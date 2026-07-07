# Lift V2 Build Tickets

2026-07-06 (Fable 5). Claude Code tickets — NOT implemented. Priority: P1 = safe + valuable now (doc/local-only, no proof gate); P2 = after some proof; P3 = deferred/gated. "Proof" = the profit-engine proof-run requirements.

## P1 — safe now (doc/local-only, no proof gate)

**T1 Archive hardening** — move `automation/*.py`, batch CSVs, `mr_automation_lead_tracker.xlsx`, `daily-runs/`, `DAILY_8AM_SETUP.md`, `run_daily_8am_outreach.sh`, `launchd/` (repo copy), both root `.gs` variants into `automation/_LEGACY_QUARANTINE/` with a README at the old path. Allowed: file moves within Lift repo, new README. Forbidden: deleting anything, touching live_apps_script_sync, running anything. Test: nothing outside `automation/` moves; git tracks as renames. Gate: Megan approves the move (violates no-move default). Codex: yes (post-move no-revival sweep). Fable: no. **Prereq: none.**

**T9 Legacy deprecation banners** — add a `// LEGACY — DO NOT RUN — see automation/LEGACY_README.md` header comment to the top of the 4 `.gs` files. Allowed: comment-only edits to .gs (no logic change). Forbidden: any logic edit, clasp, run. Test: diff shows only added comment lines. Gate: Megan approves (touches .gs text). Codex: yes. Fable: no. **Prereq: none.**

**T11 Lift audit SOP extraction** — turn `LIFT_AUDIT_ASSISTANT_EXTRACTION.md` findings into `skills/liftaudit/references/audit-session-sop.md` (preflight + asset gate + visual QA gate as a runnable checklist). Doc-only. Test: SOP covers all extracted gates. Gate: Megan confirms. Codex: no. Fable: no. **Prereq: none.**

**T12 $liftaudit skill refinement** — fix the URL conflict (netlify.app → helloliftstudio.com) across skill refs/templates; confirm parity with GPT ref. Allowed: edits within `skills/liftaudit/`. Test: grep shows no netlify.app in active outreach templates. Gate: Megan. Codex: yes (URL sweep). Fable: no. **Prereq: none.**

**T14 Outreach approval checklist** — `docs/OUTREACH_APPROVAL_CHECKLIST.md` (audit link, menu attached, signature, brand green, reply-in-thread, recipient verified, tracker updated). Doc-only. Gate: none. Codex: no. Fable: no. **Prereq: none.**

**T15 Asset verification checklist** · **T16 Visual QA checklist** — doc checklists from extraction. Doc-only. Gate: none. Codex: no. Fable: no. **Prereq: none.**

**T17 Profit-engine KPI tracker** — `_system/LIFT_KPI_TRACKER.md` scaffold + optional local `kpi.csv` (manual entry). Doc/local-only. Gate: none. Codex: no. Fable: no. **Prereq: none.**

**T18 Agent orchestration registry entries** — add Lift agents (proposed status) to the global `AI_OS_REGISTRY.yaml` + md. Doc-only, global repo. Gate: none. Codex: yes (registry truth). Fable: no. **Prereq: none.**

**T7 Tracker schema cleanup (doc)** — document the V2 field list (blueprint §tracker), mark dropped fields. Doc-only; NO sheet writes. Gate: Megan approves field list. Codex: no. Fable: no. **Prereq: none.**

## P2 — after partial proof / local dry-run only

**T4 Local dry-run queue simulator** — script that reads a FIXTURE tracker + simulates what a reconciliation/packet run WOULD propose, writes nothing live. Allowed: new script under `automation/_v2/`, operates on test-fixtures only. Forbidden: real Gmail/sheet/network. Test: runs on fixtures, zero live calls (grep). Gate: Megan. Codex: yes. Fable: no. **Prereq: none (fixtures only) but sequence after P1.**

**T6 Audit-to-outreach packet generator** — assembles audit summary + draft email + checklist into a DOC (not a Gmail draft). Allowed: read audits/, write a packet .md. Forbidden: Gmail, send, draft. Test: produces packet from an existing audit dir. Gate: Megan reviews packet. Codex: yes. Fable: no. **Prereq: 5 manual audits (pattern known).**

**T13 Prospect scoring assistant** — apply candidate_scoring_rubric to a candidate list → report. Read-only. Gate: Megan overrides. Codex: yes. Fable: no. **Prereq: rubric stable ×10.**

**T8 V2 safety test harness** — greps any V2 artifact for GmailApp/sendEmail/newTrigger/UrlFetch/network → must be zero for local assists; part of every P2+ ticket's test. Allowed: new `automation/_v2/safety_check.sh`. Gate: none. Codex: yes. Fable: no. **Prereq: none — build alongside first P2.**

**T10 Codex no-revival audit** — the LIFT_LEGACY_AUTOMATION_AUDIT §17-style checklist as a runnable Codex prompt, quarterly + before any P3. Doc + Codex. Gate: none. Fable: no. **Prereq: none.**

## P3 — gated, needs full proof + likely Fable design pass

**T5 Read-only sent-folder reconciliation spec → supervised run** — report-only, connector verified, no writes on first run. Allowed: spec doc now; supervised run later. Forbidden: writes until per-row approval proven. Gate: connector verified + Megan watching + 4-wk streak. Codex: yes. **Fable: yes** (design the write-path gate). **Prereq: full proof-run.**

**T2 Fail-closed web app patch DESIGN** — design only, the one-line fix + deploy-via-clasp plan. Allowed: design doc. Forbidden: editing/deploying the live .gs, clasp. Gate: Megan approves before any future implementation. Codex: yes. **Fable: yes** (it's a security-boundary change). **Prereq: decision to ever use an endpoint again (may be never).**

**T3 Trigger installer quarantine (code)** — if T1 archive isn't enough, neuter installer functions in quarantined files (comment-out bodies). Allowed: edits to quarantined .gs only. Gate: Megan. Codex: yes. Fable: no. **Prereq: T1 done.**
