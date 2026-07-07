# Lift Profit Engine Workflow

2026-07-06 (Fable 5). The ideal business flow, stage by stage, with the safest near-term assist for each. Human approval points are non-negotiable where marked.

| Stage | Manual now | Safest near-term assist | Future automation | Human gate | Risk | Time saved | Source of truth | Owner | Measure |
|---|---|---|---|---|---|---|---|---|---|
| Prospect universe | niches_and_areas.md | — | — | — | — | — | niches_and_areas.md | manual | universe size |
| Prospect sourcing | Megan picks | agent proposes list | supervised list gen | approve list | Med | high | niches file | ChatGPT/CC | #candidates/wk |
| Prospect scoring | eyeball | rubric report | assistant scores | override | Low | med | candidate_scoring_rubric.md | Claude Code | score distribution |
| Audit decision | Megan | scoring suggests | — | **decide** | Low | low | rubric | manual | audit yes-rate |
| Website/presence audit | $liftaudit | faster skill | — | — | Low | high | skills/liftaudit | ChatGPT | audit time |
| Two-opportunity rec | Megan picks | AI suggests | — | **decide (taste)** | Low | low | audit-protocol | manual+AI | — |
| Visual deliverable selection | Megan | AI suggests | — | **decide (taste)** | Low | low | visual-quality-rules | manual | — |
| Asset verification | manual+script | validate_audit_assets.py | assisted gate | approve gate | Med | med | brand-asset-protocol | Claude Code | fabrication incidents (target 0) |
| Client-facing visual creation | ChatGPT/Canva | assisted, QA gate | — | **QA sign-off** | High | high | visual-quality-rules + Good Examples | ChatGPT/Canva+Megan | QA pass rate |
| Outreach email | follow-up-draft skill | assisted draft | — | edit+approve | Med | med | outreach-email refs | ChatGPT/CC | reply rate |
| Human approval | Megan reviews | checklist | — | **gate** | — | — | outreach approval checklist | Megan | — |
| Send | Megan in Gmail | — | **NEVER auto** | **send** | — | — | — | Megan | sends/wk |
| Sent-folder reconciliation | manual | read-only report | approved-write batch | approve writes | Med | high | pipeline-sync spec | CC+connector | tracker accuracy |
| Reply triage | manual | AI suggestion | — | confirm | High | med | — | ChatGPT | reply→action time |
| Follow-up rec | manual | follow-up-draft | — | edit+send | Med | med | follow-up-draft | ChatGPT | follow-up rate |
| Sales conversation | Megan | prep notes | — | **owns** | — | — | — | Megan | close rate |
| Package rec | Megan | AI suggests match | — | **decide+price** | Low | low | service menu | manual+AI | avg deal size |
| Client onboarding | manual | website-onboarding-guide.md | assisted checklist | **owns** | Med | med | project-notes/website-onboarding-guide.md | Megan+CC | onboarding time |

## KPIs
Funnel: candidates/wk · audits/wk · sends/wk · reply rate · reply→call rate · close rate · avg deal size · revenue/mo. Efficiency: audit time · Megan-hours/close · quality (visual QA pass rate). Safety: identity incidents (0), fabrication incidents (0), unattended-send incidents (0, permanent).

## Proof-run requirements (V2 gates open at)
≥10 $liftaudits · ≥10 reviewed sends · 4-wk tracker streak · ≥3 manual replies · 0 identity mishaps. Current: ~3 audits (joy-daniels, shaffer-landscapes, witmer-group exist in audits/), 0-wk streak. **~4–6 weeks of boring operation away.**

## Minimum viable service package path
Lead with the SEO/GEO blog package (one optimized post/week) — the extracted wedge offer, best fit for home-services/trades/real-estate priority verticals. Audit finds the gap → visual shows the opportunity → outreach offers the package → close → recurring revenue. This is the fastest path from audit to recurring profit.

## Preventing visual-quality collapse under automation
Quality is the moat; automation is the threat to it. Guards: (1) Visual QA gate stays human-signed-off forever — AI flags, Megan approves. (2) Good Visual Examples benchmark is the pass bar; anything worse is discarded, not shipped. (3) Volume never overrides QA — if a week's throughput would force skipping QA, throughput drops, not QA. (4) Track visual QA pass rate as a KPI; a falling rate halts any automation expansion.
