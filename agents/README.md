# Lift Studio Agents

Reusable agent specs for Lift Studio workflows.

Before using any agent, read `../ACTIVE_INSTRUCTIONS.md`. Archived instruction packs are reference-only and should not override files in this folder.

Start with `FOUNDATIONAL_AGENTIC_SYSTEM_BRIEF.md` for the full agent roster, automation-layer split, handoff rules, closed-loop operating model, and known gaps.

## Available Agents

- `FOUNDATIONAL_AGENTIC_SYSTEM_BRIEF.md` - grounding brief for the full Lift Studio agentic system.
- `orchestrator.md` - manages the full Lift outbound system, routes tasks to specialist agents, verifies handoffs, and recommends next actions.
- `new_business_auditor.md` - owns top-of-funnel prospect research, local brand audits, lead scoring, and sheet population before outreach.
- `email_marketer.md` - owns outbound email strategy and personalized first-touch copy; Apps Script owns Gmail draft creation, signature, and attachment execution.
- `follow_up_pipeline_manager.md` - owns reply monitoring, response classification, follow-up drafts, bounce handling, and pipeline hygiene after outreach.
- `quality_control.md` - the confidence layer for the whole system. Any agent that is uncertain routes here. Packages flags clearly for Megan, tracks resolutions, and reports patterns so the system improves over time.
- `innovator.md` - the growth and optimization layer. Observes the pipeline, clients, tools, platforms, and agent architecture. Surfaces scored opportunity briefs for automating more, adding revenue, and reducing Megan's time. Does not execute — proposes. Briefs live in `project-notes/innovator-backlog.md`.

## System Map

See `FOUNDATIONAL_AGENTIC_SYSTEM_BRIEF.md` first, then `OPERATING_SYSTEM.md` for a shorter map of how the agents work together from prospect research through follow-up.

## Future Agents

See `FUTURE_AGENT_ROADMAP.md` for the planned client-delivery, contracting, finance, QA, and retention agents to build once Lift starts converting clients.

## Rendering Rules

See `SIGNATURE_RENDERING_RULES.md` before creating Gmail drafts. Gmail/API-created drafts do not reliably inherit or preserve complex visual signatures, so signature rendering must be tested before each new batch template.
