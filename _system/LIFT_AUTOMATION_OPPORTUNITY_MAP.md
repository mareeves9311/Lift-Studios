# Lift Automation Opportunity Map

2026-07-06 (Fable 5). Classifies every workflow area by how far it can safely move toward automation. Manual-first = proof before automation, not manual forever. Owner tools per FOUNDATION routing.

## Buckets
1. **Automate soon / low risk** — local, no send, no account write
2. **Agent-assist soon / human approval** — AI drafts, Megan decides
3. **Read-only automation candidate** — reads + reports, never writes
4. **Later, after manual proof** — needs proof-run evidence first
5. **Never automate** — irreversible / external / judgment-core
6. **Keep human-owned** — sales taste / relationship

| Workflow area | Bucket | Biz value | Risk | Judgment | Safest first version | Future version | Proof needed | Owner | Becomes |
|---|---|---|---|---|---|---|---|---|---|
| Prospect sourcing | 4 | High (fills funnel) | Med (junk-row history) | Med | manual pick from niches_and_areas | agent proposes list, Megan approves | 10 manual picks that convert to audits | ChatGPT/Claude Code | supervised workflow |
| Prospect scoring | 2 | High | Low | Med | scoring rubric applied by hand | assistant scores, Megan overrides | rubric stable 10 prospects | Claude Code | skill |
| Website audit | 2 | Core | Low | High | $liftaudit in chat | same, faster via skill | (proven) | ChatGPT $liftaudit | skill (exists) |
| SEO/local/GEO review | 2 | High (the wedge offer) | Low | Med-High | $liftaudit seo-geo reference | Ahrefs-connector-assisted read | 5 audits w/ SEO angle | ChatGPT | skill |
| Instagram/social review | 2 | Med | Low | Med | $liftaudit instagram reference | same | (proven) | ChatGPT | skill |
| Competitor scan | 3 | Med | Low | Med | manual/chat | read-only web search report | 5 audits | ChatGPT/Claude Code | supervised |
| Opportunity prioritization | 6 | Core (2-opp pick) | Low | **High — sales taste** | Megan picks from audit | AI suggests, Megan chooses | never fully | manual + AI suggest | keep human-owned |
| Asset gathering | 1 | Med (time sink) | Low | Low | liftaudit scripts (capture_site, download_assets) local | same, batched | (safe now — local) | Claude Code | automate soon |
| Brand asset verification | 2 | High (no-fabrication) | Med (wrong logo = embarrassing) | Med | manual + validate_audit_assets.py | assisted checklist | 5 audits | Claude Code | skill + checklist |
| Visual audit notes | 2 | Med | Low | Med | chat | skill-templated | proven | ChatGPT | skill |
| Visual deliverable selection | 6 | High | Low | **High — taste** | Megan decides | AI suggests | never fully | manual | keep human-owned |
| Visual QA | 2 | **High (quality collapse risk)** | Med | High | visual-quality-rules.md checklist by hand | assisted QA against Good-Examples benchmark | 5 visuals reviewed | ChatGPT + Megan | skill + checklist |
| Audit summary writing | 2 | Med | Low | Med | $liftaudit | skill | proven | ChatGPT | skill |
| Outreach email drafting | 2 | Core | Med (voice/claims) | High | follow-up-draft skill + templates | assisted draft, Megan edits | (rules proven) | ChatGPT/Claude Code | skill (exists) |
| Follow-up drafting | 2 | High | Med | Med | follow-up-draft skill, reply-in-thread | same | 3 follow-ups sent | ChatGPT | skill |
| Tracker updates | 3→2 | High (bookkeeping tax) | Med (sheet writes) | Low | manual; then read-only validation report | assisted per-row-approved write | 4-wk manual streak | Claude Code | supervised workflow |
| Sent-folder reconciliation | 3 | High | Med (Gmail read + sheet write) | Low | **read-only report only** (LV2-4) | per-row-approved write batch | 4-wk streak + connector verified | Claude Code + connector | read-only assist → supervised |
| Reply classification | 4 | Med | Med (misread → wrong action) | High | manual | AI triage suggestion, Megan confirms | 3 replies handled manually | ChatGPT | supervised |
| Pipeline stage updates | 4 | Med | Med | Low-Med | manual | assisted after reconciliation proven | tracker streak | Claude Code | supervised |
| Monthly reporting | 3 | Low-Med | Low | Low | manual KPI note | read-only KPI rollup from tracker | tracker stable | Claude Code | read-only automation |
| Offer/package recommendation | 6 | High (close rate) | Low | **High — sales** | Megan + service menu | AI suggests package match | never fully | manual + AI suggest | keep human-owned |
| Service menu/package matching | 2 | Med | Low | Med | manual | assisted match to audit findings | 5 audits | ChatGPT | skill |
| Client-facing deliverable assembly | 5→2 | Core | Med-High (brand quality) | High | manual assembly in chat/Canva | assisted packet, human QA gate | quality proven ×5 | ChatGPT/Canva + Megan | supervised, never auto-publish |

## Cross-cutting rules
- **Anything that SENDS** = Never automate (bucket 5), permanent.
- **Anything that WRITES a live sheet or Gmail** = read-only report first (bucket 3), then per-row-approved writes only after the 4-week manual tracker streak.
- **Anything requiring sales taste or brand-quality judgment** (opportunity pick, visual selection, package rec, final visual QA) = keep human-owned (bucket 6); AI suggests, never decides.
- **Safe to build right now** (bucket 1, local/doc-only, no proof needed): asset-gathering scripts, SOP/skill docs, dry-run simulators, checklists, KPI-tracker scaffold.
