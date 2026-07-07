# Lift Agent Orchestration Blueprint

2026-07-06 (Fable 5). Future agent system design. **None built now.** Every agent is suggest-only or read-only until its proof gate clears. No agent sends, publishes, or writes a live sheet unattended — ever. This replaces the old 6-persona auto-orchestrator (which is LEGACY) with a flat, human-gated roster.

Core principle: **agents propose, Megan disposes.** The old engine failed because agents acted on each other's unverified output through Apps Script. New model: each agent produces a REPORT or DRAFT; Megan (or a human-approval gate) is the only path to any external effect.

| Agent | Purpose | Autonomous | Needs Megan | Never | Risk | Proof before build | Tool | Form | Build when |
|---|---|---|---|---|---|---|---|---|---|
| Prospect Finder | propose candidate businesses from niches/geos | web search, draft list | approve list into tracker | write tracker; scrape junk | Med | 10 manual picks convert | ChatGPT/Claude Code | supervised workflow | month 2 |
| Prospect Scoring | apply scoring rubric | compute scores in a report | accept/override | auto-advance stage | Low | rubric stable ×10 | Claude Code | skill | month 2 |
| Website Audit | live-site audit | full audit in chat | — (output is advisory) | fabricate | Low | proven ($liftaudit) | ChatGPT | skill (exists) | now (refine) |
| SEO/GEO Audit | search-visibility audit + blog-package angle | audit + read-only connector data | — | invent rankings | Low-Med | 5 SEO audits | ChatGPT | skill | now (refine) |
| Instagram/Social Audit | profile/grid audit | audit | — | invent engagement | Low | proven | ChatGPT | skill | now (refine) |
| Competitor Scan | public competitor read | report | — | fabricate | Low | 5 audits | ChatGPT | supervised | month 2 |
| Brand-Asset Verification | confirm exact logo/colors/facts before visuals | run validate script, report gaps | approve gate clear | pass unverified assets | Med (wrong logo) | 5 audits | Claude Code | skill+checklist | month 1–2 |
| Visual Brand Audit | notes on visual state | notes | — | — | Low | proven | ChatGPT | skill | now |
| Visual QA | check visual vs quality rules + Good-Examples | flag issues | approve/reject final | present known-bad as final | **High (quality)** | 5 visuals | ChatGPT + Megan | skill+checklist | month 1–2 |
| Opportunity Prioritizer | suggest the two opportunities | suggestion only | **pick (sales taste)** | decide | Low | never fully | AI-suggest | prompt | keep human |
| Outreach Drafting | draft email per rules | draft only | edit + send | send; auto-draft to Gmail (until Phase 6) | Med | rules proven | ChatGPT/Claude Code | skill (exists) | now (refine) |
| QA/Evidence Checker | verify no fabricated claims in output | scan + flag | — | approve claims | Low | — | Codex-style/Claude Code | agent | month 2 |
| Tracker Update Assistant | validate tracker vs schema | read-only report | approve writes | unattended write | Med | 4-wk streak | Claude Code | supervised | month 2–3 |
| Sent-Folder Reconciliation | Gmail sent vs tracker | **read-only report** | approve per-row writes | write unattended; touch drafts | Med | 4-wk streak + connector verified | Claude Code + connector | read-only assist | month 3 |
| Reply Triage | classify replies | suggestion | confirm action | act on reply | High (misread) | 3 replies manual | ChatGPT | supervised | month 3 |
| Pipeline Manager | recommend stage updates | recommend | approve | auto-advance | Med | tracker streak | Claude Code | supervised | month 3 |
| Offer/Package Recommendation | match audit → package | suggest | **decide + price (sales)** | commit price | Low | never fully | AI-suggest | prompt | keep human |

## Orchestration pattern (V2, replaces auto-relay)
Loop L4 (manual): Megan picks prospect → Audit agents produce audit (chat) → Brand-Asset + Visual QA gates → Outreach Drafting produces packet → **Megan approves + sends** → later: Reconciliation agent reports sent-vs-tracker → Megan approves tracker writes. No agent hands to another agent through code; the human is the bus. Codex audits any agent that reads Gmail or writes a sheet, before first supervised run. Fable re-enters only to design the reconciliation write-path gate (the one genuinely risky piece) if/when proofs clear.
