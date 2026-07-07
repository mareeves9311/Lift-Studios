# Lift Agent Runtime Model

2026-07-06. Architecture pattern borrowed from managed multi-agent platforms (the MaxClaw/KimiClaw/OpenClaw family of systems) and applied to Lift Studio's own agent design. **Inspiration only.** Do not adopt any of those platforms. Do not connect messaging apps. Do not build live/always-on agents. Every "agent" named in this doc is still a manually-invoked chat skill, exactly as today — this doc gives that existing reality a clearer architecture vocabulary and names the two pieces (a skill library table, a future dashboard view) that don't formally exist yet.

## Why borrow this pattern at all

Managed agent platforms separate a system into recognizable layers: persistent agents, a skill library, a memory/knowledge layer, a managed runtime, a channel layer, approval gates, status/logging, tool permissions, and a promotion model for graduating a skill into wider use. Lift already has informal versions of seven of these nine layers, scattered across `_system/` docs. Naming them explicitly makes gaps visible (the two that don't exist yet) without requiring any new infrastructure to be built.

## The nine layers, mapped to what Lift actually has

| Platform pattern | What it means generically | Lift's version today | Status |
|---|---|---|---|
| Persistent agents | A stable, named role invoked the same way every time, not reinvented per session | `skills/liftaudit/SKILL.md` and the global `follow-up-draft` skill are already this — a fixed definition invoked on demand | Exists (partial — most agents in `LIFT_REVENUE_AGENT_SYSTEM.md` are still prompt-level, not yet skill files) |
| Skill library | A registry of what reusable capabilities exist | Informal — skills live in `skills/liftaudit/`, `~/.claude/skills/follow-up-draft/`, referenced across docs | **Gap — formalized below** |
| Memory/knowledge layer | What an agent needs to know without re-deriving it each time | `automation/niches_and_areas.md`, `candidate_scoring_rubric.md`, `site/_lift-brand/LIFT_SERVICES_REFERENCE_V3.md`, `_system/LIFT_ANTI_AI_OUTPUT_QA_STANDARD.md`, past `audits/` as precedent | Exists |
| Managed runtime | The supervisor that invokes agents and watches what they do | **Megan, permanently** — no scheduler, no auto-invocation, by design (no-trigger default) | Exists, intentionally human |
| Channel layer | How an agent is reached / reaches the world | Claude/ChatGPT chat sessions only. No messaging-app connectors, none planned | Exists, deliberately single-channel |
| Human approval gates | Where a human must sign off before an effect happens | Sends, tracker writes, opportunity selection, visual QA, price/package decisions, Anti-AI QA acceptance — all already documented across `LIFT_AUTOMATION_OPPORTUNITY_MAP.md` and this doc set | Exists |
| Status/logging | A record of what ran and what happened | `STATUS.md` Session Lock, `audits/[brand]/` folders as per-audit logs | Exists informally; KPI tracker (build ticket) formalizes it |
| Safe tool permissions | What an agent is allowed to touch | The existing 6-bucket classification in `LIFT_AUTOMATION_OPPORTUNITY_MAP.md` — this **is** Lift's permission model, not a new scheme | Exists — just needs naming |
| Skill promotion model | How a capability graduates from experimental to trusted | The "Form" column already used throughout (prompt → skill → agent → supervised workflow → automation), gated by the P1/P2/P3 proof ladder in `LIFT_V2_BUILD_TICKETS.md` | Exists — just needs naming |

Two rows are real gaps. The rest of this doc formalizes them.

## Skill Library (the registry that doesn't formally exist yet)

| Skill | Purpose | Inputs | Outputs | Status |
|---|---|---|---|---|
| `$liftaudit` | Website/Instagram/SEO-GEO audit, asset verification, concept briefs | URL, known channels | Full audit packet | Built, proven (3 audits) |
| `follow-up-draft` (global) | Draft follow-up emails on locked rules | Tracker due-list or Megan-supplied list | Draft email | Built, proven |
| Prospect scoring | Apply the rubric (+ proposed Content/SEO Gap category) | Candidate list | Scored report | Proposed — ticket in build queue |
| Human Voice QA / Anti-AI Output Editor | Flag generic/AI-sounding copy, suggest rewrites | Any client-facing draft | Flagged issues + suggestions | Proposed — buildable now, no gate |
| Audit packet assembler | Assemble summary + email + checklist into one doc | Completed audit outputs | Packet document (not a Gmail draft) | Proposed — maps to existing ticket T6 |
| Visual QA checklist | Check a visual against `visual-quality-rules.md` and Good-Examples benchmark | Draft visual | Pass/fail + notes | Proposed — ticket in build queue |

This table is the "skill library" artifact. Keep it updated here as skills move from proposed to built — don't stand up a separate database or tool for it; a markdown table is the right size for Lift's current scale.

## Agent Readiness Card — the 11-field schema

Every agent or skill, before it's trusted with real prospect data, should be describable on these 11 fields. Two worked examples below; the full roster's revenue-specific fields (inputs/outputs/autonomy/risk/proof/build-priority) already live in `LIFT_REVENUE_AGENT_SYSTEM.md` — this schema adds the four fields that table doesn't carry (memory/knowledge required, channels allowed, logs, status) on top of it, rather than duplicating the whole table a third time.

### Worked example 1 — Human Voice QA / Anti-AI Output Editor
- **Role:** Catch generic/AI-sounding language in client-facing drafts before delivery.
- **Inputs:** Any draft (audit summary, outreach email, follow-up, visual copy).
- **Outputs:** Flagged issues + suggested rewrites, mapped to the six passes in `LIFT_ANTI_AI_OUTPUT_QA_STANDARD.md`.
- **Memory/knowledge required:** The Anti-AI Output QA Standard's banned-word list and weak-pattern catalog.
- **Tools allowed:** Text read/analysis only. No web access needed, no connector access.
- **Channels allowed:** Chat only (ChatGPT or Claude Code).
- **Permissions (bucket):** Bucket 1 — automate soon / low risk. Zero live-system touch.
- **Approval gates:** Megan accepts or edits every suggested rewrite; the agent never finalizes its own output.
- **Logs:** Which drafts were checked, what was flagged, what was accepted vs. overridden (feeds a future "QA pass rate" KPI).
- **Failure modes:** False positive (flags fine copy — low cost, just re-review); false negative (misses a generic phrase — caught at the human voice pass anyway since Megan reads everything before send).
- **Status:** Proposed, not yet built. No proof gate blocks starting — this is the safest possible first build.

### Worked example 2 — SEO/GEO Opportunity Agent (part of `$liftaudit`)
- **Role:** Evaluate a prospect's search/content visibility and frame the wedge-offer opportunity.
- **Inputs:** Blog/content state, visible keyword targeting, service-area pages.
- **Outputs:** SEO/GEO findings section of the audit, framework selection (Search-to-Service/Sale/Deal/Booking/Product).
- **Memory/knowledge required:** `seo-geo-audit.md`, `home-services-seo.md`, the framework definitions.
- **Tools allowed:** Live web read, read-only search/connector data (e.g., Ahrefs) when available.
- **Channels allowed:** Chat only.
- **Permissions (bucket):** Bucket 2 — agent-assist, human approval on the findings before they reach a prospect.
- **Approval gates:** Megan confirms the two-opportunity selection includes or excludes this channel (sales taste, per `LIFT_AUDIT_PRODUCTION_SYSTEM.md` step 7).
- **Logs:** Which audits used this evaluation, stored per-audit under `audits/[brand]/03-strategy/`.
- **Failure modes:** Implying a ranking/traffic number without a citable source (explicitly banned).
- **Status:** Built, proven — refine only.

### Roster-wide summary (permission + status only — full detail in `LIFT_REVENUE_AGENT_SYSTEM.md`)

| Agent/skill | Channels allowed | Permission (bucket) | Status |
|---|---|---|---|
| Vertical Selector | Chat/report | 3 (read-only) | Proposed, month 2–3 |
| Prospect Finder | Chat | 4 (later, after proof) | Proposed, month 2 |
| Prospect Scoring | Chat | 2 (agent-assist) | Proposed, month 2 |
| Audit Research / Website Clarity / SEO-GEO Opportunity / Social Presence | Chat | 2 (agent-assist) | Built, proven |
| Asset Verification | Chat + local scripts | 1–2 | Built (scripts) / proven (checklist) |
| Visual Concept | Chat | 2 | Built, proven |
| Audit Packet Assembler | Chat | 2 | Proposed, month 2 (ticket T6) |
| Outreach Personalization / Follow-Up Recommender | Chat | 2 | Built, proven |
| Reply Triage | Chat | 4 (High risk) | Proposed, month 3 |
| Package Recommendation | Chat | 6 (keep human-owned) | N/A — never automated |
| Pipeline Manager | Chat | 4 | Proposed, month 2–3 |
| QA/Evidence Checker | Chat | 2 | Proposed, month 2 |
| Human Voice QA / Anti-AI Output Editor | Chat | 1 (zero live-system touch) | Proposed, buildable now |

## Future dashboard view (design only — not built)

A local-only, doc/read-only dashboard concept — **not to be confused with the live Netlify dashboard**, which shows client pipeline data, not agent/skill status. This would be a separate, purely internal view. Mockup below uses Lift's **real current state**, not placeholder data, to keep the concept concrete:

| Agent/Skill | Active workflow | Blocked? | Permission level | Last run/tested | Next safe action |
|---|---|---|---|---|---|
| `$liftaudit` (Audit Research/Clarity/SEO-GEO/Social) | Audit production (Days 1–14 of the 90-day plan) | No | Bucket 2 | 3 audits completed: joy-daniels, shaffer-landscapes, witmer-group | Continue audit-lite batch |
| Outreach Personalization | First-touch + follow-up drafting | No | Bucket 2 | Rules proven; 0 recorded sends yet | Send first real batch this week |
| Human Voice QA / Anti-AI Output Editor | — | No (no gate blocks it) | Bucket 1 | Not yet built | Build checklist this week |
| Prospect Scoring | — | No | Bucket 2 | Rubric defined; not yet run ×10 | Score first 15–20 prospect batch |
| Asset Verification | Asset pack step of audits | No | Bucket 1–2 | Used in all 3 existing audits | Continue as-is |
| Sent-Folder Reconciliation | — | **Yes** | Bucket 3 (read-only target) | N/A — not built | Blocked until 4-week tracker streak + connector verified |
| Reply Triage | — | **Yes** | Bucket 4 | N/A | Blocked until 3 replies handled manually |
| Vertical Selector | — | **Yes** | Bucket 3 | N/A | Blocked until KPI tracker has weeks of real data |

This view is a design target for a future doc/local-only build ticket (see `LIFT_MONEY_MACHINE_BUILD_QUEUE.md`), not a live system. It would read from the tracker export and this doc's tables — no new connector, no scheduler, no messaging channel.

## Explicit boundaries (repeating on purpose)

Do not adopt MaxClaw, KimiClaw, OpenClaw, or any equivalent managed-agent platform. Do not connect Slack, SMS, or any messaging channel to Lift. Do not build a live, scheduled, or always-on agent from this doc. Every layer above describes Lift's *existing* manual, chat-invoked, human-gated way of working, given clearer names — it is not a build plan for autonomy.
