# Lift Studio Active Instructions

This file is the first stop for Claude, Codex, Fable, or any other agent working in this repo.
Status updated 2026-07-06 after adversarial audit: the automated outbound engine is **LEGACY / V2 CANDIDATE — DO NOT RUN**. The current workflow is simplified and manual-first.

## Source Of Truth

- Current project root: `/Users/meganreeves/Documents/Projects/Lift Studio`
- Current website: `https://helloliftstudio.com/`
- Current dashboard: `https://liftstudiosdashboard.netlify.app/`
- Current Google Sheet: `https://docs.google.com/spreadsheets/d/1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8/edit`
- Current GitHub repo: `https://github.com/mareeves9311/Lift-Studios`
- System-wide rules: `/Users/meganreeves/Documents/Projects/FOUNDATION.md`

## CURRENT ACTIVE WORKFLOW (simplified, manual-first — since 2026-07-02)

1. **Business/category tracker:** the Pipeline sheet is a tracker, organized by category. `Pipeline` tab = source of truth; `Working Pipeline` = human view.
2. **Manual prospect selection:** Megan (or an agent on request, with judgment) picks who to pursue. No automated discovery.
3. **Manual/chat-based audits:** `$liftaudit` (`skills/liftaudit/SKILL.md`) is the proven audit workflow. Run it in chat, on request only.
4. **Human-approved outreach only:** Megan writes/approves and sends every email herself. Follow-up drafting rules (reply-in-thread etc.) live in the global `follow-up-draft` skill for when she asks for a draft.
5. **Gmail sent-folder cross-reference:** possible future supervised/read-only workflow (pipeline-sync skill) — not scheduled, run only on request with the helloliftstudio@gmail.com connector verified.

## NOT ACTIVE unless Megan explicitly reapproves

Automated discovery · automated scoring/priority fields · recommended-offer machinery · automated audit generation · automated Gmail draft creation · automatic follow-up machinery · draft deletion · trigger-based daily runs (8am/1pm/hourly) · Apps Script web app writes · Gmail label/archive modifications · sheet mutations beyond approved supervised sync.

## LEGACY / V2 CANDIDATE — the automated outbound engine

Everything below is preserved for reference and possible V2 revival. **CONNECTED BUT NOT RECONCILED — DO NOT RUN.**

- Script ID: `1g_9-U-01qaFBzzMtZwNEEWM9bdr6AUBsGFxHVfey_U6o9q-nHPGVa9Su`
- Script name: "Lift Studio Legacy Outreach Engine - Clasp Connected - DO NOT RUN"
- Old live triggers were found and manually deleted on 2026-07-06. No scheduled Lift automation is currently approved.
- Agent profiles: `agents/` (orchestrator, new_business_auditor, email_marketer, follow_up_pipeline_manager, quality_control, innovator) + `agents/FOUNDATIONAL_AGENTIC_SYSTEM_BRIEF.md`, `agents/OPERATING_SYSTEM.md`
- Apps Script: `automation/live_apps_script_sync/OutreachAutomation.gs` + `LiftPipelineAutomation.gs` — see `automation/LEGACY_README.md` for the safety findings (fail-open secret check; trigger installers; draft creators)
- Batch prompts: `automation/daily_8am_outreach_prompt.md`, `automation/scheduled_routines.md`
- Do NOT use the sheet's `Outreach Automation` / `Lift Pipeline` menus — several items install triggers or create drafts (`Install/Repair Full Automation`, `Run Full Lift Studio System Now`, `Create Gmail Drafts`).
- The live Apps Script web app endpoint is **UNSAFE UNTIL REVIEWED — FAIL-CLOSED REQUIREMENT NOT VERIFIED**: the secret check is fail-open if `LIFT_WEB_APP_SECRET` is missing (verified in code, LiftPipelineAutomation.gs `doPost`). No web-app calls until a fail-closed patch is reviewed and approved.
- Do not run clasp pull, clasp push, Apps Script functions, trigger installers, or scheduled routines. Any future automation must be rebuilt as simplified V2, not revived from this old engine.
- Locked lesson that carries into any V2: discovery is judgment-led by an AI agent, never HTML scraping; `enableAutoDiscovery` stays `false`.

## Still-valid reference material (usable for manual audits + outreach)

- **Attachment rule:** outreach links to the website and attaches only `site/_lift-brand/Lift Studio Service Menu.pdf` (copy source: `site/_lift-brand/LIFT_SERVICES_REFERENCE_V3.md`; Canva design: `https://www.canva.com/design/DAHONAVSJIw/FUReYDpLrfT9CIT85pe_hg/edit`). Never attach the old brand book. "Lift Studio" renders in brand green, bold, linked, in HTML drafts. Drive copy of the menu (for any future automation): file ID `1jvKBJo3l1i7HJ9vUi_8pV9-G7EJrfSJx`.
- **Lead strategy:** home services and practical local businesses are the priority lane (pest control, fencing, pools, pressure washing, dumpster rental, roofing, electrical, HVAC, plumbing, concrete, septic, tree, landscaping, automotive/repair/detailing/tires, commercial cleaning/janitorial/specialty contractors, facility services). Real estate is a strong expansion lane. Beauty/wellness/restaurants/retail valid but secondary.
- **Audit angle for blue-collar:** practical revenue leaks — weak local SEO, no quote path, unused review strength, before/after work not turned into content, buried guarantees. Lead with the SEO/GEO blog package (one optimized blog/week) framed as local-search support.
- **No-email conventions:** never invent/scrape private emails; never type "form" in the Email column (leave blank, URL in `Contact Form`). `Next Action` labels: `USE CONTACT FORM - submit manually, then mark Sent.` / `NO EMAIL FOUND - check IG mobile Contact button.` / `NO EMAIL FOUND - call/text for best email.` / `NO EMAIL FOUND - check Facebook About/contact.` / `NO CONTACT PATH FOUND - manual research needed.`
- **Sheet contract:** do not rename/remove the `Pipeline` tab (feeds the Netlify dashboard). `Research Queries` tab contains pasted junk — use `automation/niches_and_areas.md` as the clean niche/geo source.
- **Signature:** `agents/SIGNATURE_RENDERING_RULES.md` still applies to any HTML draft.

## Archive Rule

Files under `_archive/` are reference-only. Do not use them as active instructions, prompt sources, script sources, attachment rules, or outreach templates unless Megan explicitly asks to recover something.

## Before Editing

1. Read this file. 2. Read `CLAUDE.md` + check `STATUS.md` Session Lock. 3. Read the relevant active file. 4. Ignore `_archive/` and LEGACY items unless explicitly asked.
