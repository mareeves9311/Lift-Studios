# Lift Legacy Automation Audit

Read-only static audit, 2026-07-06 (Fable 5, audit mode). No code run, no clasp, no Gmail/Drive/connectors, no live-system contact. Every finding cites its evidence.

## Headline finding

**The old engine had FOUR scheduler layers.** As of 2026-07-06, layers 1–3 (the active schedulers) are decommissioned. Layer 4 (the passive endpoint) remains deployed but is not driven by any live scheduler.

| Layer | Status | Evidence |
|---|---|---|
| 1. Apps Script time triggers | ✅ deleted by Megan 2026-07-06 | LEGACY_README.md decommission log |
| 2. macOS launchd `com.liftstudio.daily-outreach` | ✅ **REMOVED by Megan 2026-07-06.** Job unloaded (`launchctl remove`) and `~/Library/LaunchAgents/com.liftstudio.daily-outreach.plist` deleted if present. Re-verification returned: "No Lift launchd jobs loaded / No Lift launchd plist found." | Megan's manual removal + verification 2026-07-06 (originally: `launchctl list` showed job present, plist 5:30/10:30) |
| 3. Anthropic cloud routines ×2 — Morning `trig_01XBAmYLBHjv4kzcBr8rRLFU` (7am ET), Midday `trig_01P8apy2dZsMAuBHxz1N4m5G` (12pm ET) | ✅ **CHECKED by Megan 2026-07-06** in Claude/Anthropic Routines; paused/deleted if found | Megan's manual check 2026-07-06 (originally documented in `automation/scheduled_routines.md` lines 15–16) |
| 4. Web app endpoint (doPost) | 🔴 deployed, passive, **fail-open auth** — no longer driven by any live scheduler (layers 1–3 down), but still deployed "access: Anyone" | STATUS.md (deployment URL, access: Anyone); code at LiftPipelineAutomation.gs:1341 |

**Update 2026-07-06:** the two critical live-scheduler risks (R1 launchd, R2 cloud routines) were addressed by Megan the same day this audit was produced — see risk register. Layer 4 remains the one open item: the endpoint is still deployed with fail-open auth, but with no live scheduler calling it, its exposure is reduced from "actively driven" to "publicly reachable but idle." Un-deploying it (NEEDS HUMAN, next time Megan is in the Apps Script editor) closes the last live surface. **With layers 1–3 down, "the engine is no longer running" is now a true statement; "the engine cannot be reached at all" is not yet true (layer 4).**

## Inventory (all inspected statically)

**Apps Script — current-generation pair (`automation/live_apps_script_sync/`):**
- `OutreachAutomation.gs` (1453 lines) — 5 trigger installers (`installFullAutomation` family: daily run, hourly scan, 8am/1pm draft creation), 11 GmailApp calls: `createDraft` ×3, draft getters, sent-search, label/archive hygiene. **No `sendEmail` — draft-only, verified.** Queue processors driven by Pipeline-tab stages (`Ready to Draft` etc.). Classification: **LEGACY / DO NOT RUN; V2 concept reference.**
- `LiftPipelineAutomation.gs` (1513 lines) — 2 trigger installers (sheet-edit handler, queued audits); `doPost` at line 1341 with **fail-open secret check** (`if (secret && payload.secret !== secret)` — missing Script Property = all requests authorized); 3 UrlFetchApp calls (Claude API for audits). Supported doPost actions include sheet writes (addLeads/updateRows). Classification: **LEGACY / DO NOT RUN; endpoint UNSAFE UNTIL REVIEWED.**
- `appsscript.json`, `.clasp.json` (scriptId `1g_9-U-01qaFBzzMtZwNEEWM9bdr6AUBsGFxHVfey_U6o9q-nHPGVa9Su`) — **connected, unreconciled since 2026-06-23; local ≠ live is unverifiable without an approved clasp pull.** Classification: unknown/requires live verification later.

**Apps Script — older root-level variants (`automation/`):**
- `gmail_outreach_automation.gs` (1100 lines) — 5 trigger installers, 10 Gmail calls including **`GmailApp.sendEmail` at lines 284 and 936 — THIS VARIANT CAN SEND EMAIL AUTONOMOUSLY.** 4 UrlFetch. Most dangerous file in the repo. Never referenced by active docs but sits un-quarantined next to active files. Classification: **archive candidate (priority), never revive; candidate for eventual deletion after archive.**
- `lift_brand_pipeline_automation.gs` (598 lines) — 2 trigger installers, 2 UrlFetch, predecessor of LiftPipelineAutomation. Classification: **archive candidate, never revive.**

**Local scheduler chain:**
- `automation/launchd/com.liftstudio.daily-outreach.plist` — repo copy; **a loaded copy exists in launchd** (location to confirm: `~/Library/LaunchAgents/`). Classification: repo copy = archive candidate; loaded job = **NEEDS HUMAN removal.**
- `automation/run_daily_8am_outreach.sh` — invokes Codex CLI with `--sandbox danger-full-access --ask-for-approval never` against `daily_8am_outreach_prompt.md`, expects "10 additional drafts ready" per run. Classification: **LEGACY / DO NOT RUN / archive candidate.** The full-access-no-approval pattern must never be reused.
- `automation/daily_8am_outreach_prompt.md`, `automation/DAILY_8AM_SETUP.md`, `automation/logs/`, `automation/daily-runs/` — evidence/reference. Classification: archive candidates.

**Cloud routine layer:** `automation/scheduled_routines.md` (correctly banner-marked LEGACY 2026-07-06) — documents the two routines above. Classification: safe reference; the LIVE routines are **unknown/NEEDS HUMAN.**

**Python/CSV era (`automation/*.py`, `*.csv`, `*.xlsx`):** lead_audit_generator, mini_audit_generator, followup_scheduler, process_batch, research_query_generator (+requests), add_knockknock_to_tracker (+requests), drive setup scripts, batch CSVs, `mr_automation_lead_tracker.xlsx`. Pre-Apps-Script generation, local-only, no Gmail access. Classification: **archive candidates — harmless but clutter that confuses future sessions.**

**Safe reference (keep active):** `automation/niches_and_areas.md` (canonical niches/geos), `automation/candidate_scoring_rubric.md` (V2-useful scoring logic), `automation/outreach_templates.md` (copy reference), `LEGACY_README.md` (quarantine doc).

## Risk register

| # | Risk | Sev | Where | Failure mode → consequence | Mitigation now | Recommended | Local-fixable? | Codex audit? |
|---|---|---|---|---|---|---|---|---|
| R1 | ~~launchd job still loaded, fires 2×/day~~ **RESOLVED 2026-07-06** | ~~CRITICAL~~ → CLOSED | `com.liftstudio.daily-outreach` | (was) stale Codex path self-heals → resumes full-access no-approval outreach runs | **Megan removed the job (`launchctl remove`) and deleted the plist. Re-verify: "No Lift launchd jobs loaded / No Lift launchd plist found."** Repo copy of plist still exists → archive via T1. | done (job); T1 archives repo copy | ✅ verified gone |
| R2 | ~~Cloud routines possibly still firing daily~~ **RESOLVED 2026-07-06** | ~~CRITICAL~~ → CLOSED | `trig_01XBAm…`, `trig_01P8…` | (was) routine runs → old orchestrator prompts → calls fail-open endpoint | **Megan checked Claude/Anthropic Routines and paused/deleted both if found.** | done | ✅ checked/cleared |
| R3 | Fail-open doPost on a live "access: Anyone" endpoint — **now the top open risk (R1/R2 closed)** | HIGH | LiftPipelineAutomation.gs:1341 + deployed URL in STATUS.md | anyone posts → sheet writes without auth if secret property missing. (R2 no longer a caller — cloud routines cleared) | endpoint documented UNSAFE; no live scheduler drives it now | **un-deploy the web app next time Megan is in the Apps Script editor** (NEEDS HUMAN) — closes the last live surface; if V2 ever needs an endpoint, new script fail-closed from line 1 | un-deploy needs human | design review yes |
| R4 | `sendEmail`-capable legacy variant un-quarantined | **HIGH** | automation/gmail_outreach_automation.gs:284,936 | future session/agent grabs "the outreach script," runs the one that SENDS | none — file sits beside active docs | archive under `automation/_LEGACY_QUARANTINE/` + deprecation banner (ticket T1/T9) | yes | yes (no-revival sweep) |
| R5 | Local ≠ live Apps Script drift | MED | scriptId `1g_9-U…` | reasoning from repo code that doesn't match deployed reality | drift documented | someday: one approved read-only clasp pull as archival snapshot; until then treat live state as unknown | no — needs approved clasp | after pull |
| R6 | Trigger installers one menu-click away | MED | 7 installers across both live-sync files + sheet menus | someone clicks `Install/Repair Full Automation` in the sheet | DO NOT RUN docs | deprecation banners in code comments (doc-edit ticket, needs approval since it touches .gs text) + Codex quarterly no-revival audit | yes (comment-only edit, gated) | yes |
| R7 | Identity: any future Gmail/Sheets touch on wrong account | MED | all connector surfaces | acting on personal/AMP3 account | firewall docs, procedural | V2 design embeds identity self-check as hard precondition (already in V2 blueprint) | design local | yes |
| R8 | Tracker-driven queues re-armed by stage values | LOW-MED | Pipeline stage values (`Ready to Draft` etc.) | restoring old stage vocabulary re-arms queue logic if any engine layer revives | engine layers being killed (R1/R2) | V2 tracker schema drops automation-trigger semantics from stage names (LV2-1) | yes | yes |
| R9 | Duplicate scheduler definitions confuse future cleanup | LOW | plist repo copy, DAILY_8AM_SETUP.md, scheduled_routines.md | future session "restores" a scheduler believing it's config | LEGACY banners partial | archive hardening ticket T1 | yes | yes |

## Unknowns requiring live verification later (all NEEDS HUMAN or gated)
Live Apps Script code vs repo (R5) · web app deployment list + whether secret Script Property currently exists (R3 — un-deploy pending) · whether any Gmail filters/rules were created by old runs.
**Resolved 2026-07-06:** ~~cloud routine run history (R2)~~ checked/cleared by Megan · ~~loaded plist + other lift LaunchAgents (R1)~~ removed + verified ("No Lift launchd jobs loaded / No Lift launchd plist found").

## Classification summary
- **Never revive as running code:** both root-level .gs variants, run_daily_8am shell + plist, danger-full-access pattern, auto-send anything.
- **LEGACY reference (keep, quarantined):** live_apps_script_sync pair, scheduled_routines.md, LEGACY_README.md.
- **V2 concept-only reuse:** draft-only Gmail pattern, stage-driven queue *concept* (rebuilt with dry-run + approval), scoring rubric, niches file, JSON-repair retry pattern, row-safe error isolation pattern.
- **Archive candidates:** python/CSV era files, logs, daily-runs, batch CSVs, old xlsx, DAILY_8AM_SETUP.md.
- **Delete candidates (after archive, Megan approval):** none urgent; `gmail_outreach_automation.gs` is the only file worth eventual deletion because its existence is pure risk (R4).
