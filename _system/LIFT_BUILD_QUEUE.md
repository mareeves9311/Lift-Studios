# Lift Build Queue

**Created:** 2026-07-09 (Fable consolidation). Replaces `LIFT_V2_BUILD_TICKETS.md` and `LIFT_MONEY_MACHINE_BUILD_QUEUE.md` — the surviving tickets keep their old T-numbers so history stays legible; everything not listed here was deliberately dropped (frozen agents, gated automation ladder, KPI scaffolds, dashboards — see `LIFT_SYSTEM.md` §9). Nothing here blocks Monday: outreach runs on checklists until these ship.

Every item: doc/local-only unless stated. No Gmail/Sheets/Apps Script execution. Megan approves anything client-facing before first use.

## In order

**1. Critic pipeline skill (`skills/lift-critic/`) — the flagship build.**
Implements `LIFT_SYSTEM.md` §5 as a runnable skill: Stage 1 claim cop (every research assertion → fetch the cited URL, confirm it contains the claim; unsourced → delete, output the surviving verified-facts file) · Stage 2 fidelity critic (every verified finding present in the deliverable at full specificity; flag launderings) · Stage 3 pre-send (Anti-AI six-pass + unresolved-gate check + **mechanical numbers diff** — a script, not a model: every phone/price/address/stat in the deliverable must appear verbatim in the verified-facts file). Test set: the Witmer research file + deck — the skill must catch the lorem-ipsum laundering, `717.65.1428`, "Witman," and the missing price, or it isn't done.

**2. T22 — Anti-AI QA as an enforced gate.** Turn `LIFT_ANTI_AI_OUTPUT_QA_STANDARD.md` into a runnable checklist/skill (text-in/text-out, zero live-system touch). Test against 5 real drafts (the sent June emails are a ready-made corpus — several would fail today, which is the point). Becomes Stage 3's first component.

**3. The Lift Creative Agent (`skills/lift-creative/`) — Lane V's engine, and the successor to the deleted Visual Concept / content-lane agent rows.** Requested by Megan 2026-07-09: the agent that does the creating side of lead generation. Two modes, built in order:
- **Hook mode (build now, ship by Tue 2026-07-14):** input = a prospect's public photos/posts (gathered via the existing `download_site_assets.py` / `extract_brand_palette.py` scripts). Output = ONE lifted piece (standard retouching only — relight, color, background cleanup, crop; the imported asset-verification protocol is binding: never generated food/people/work) + a deployed drag-to-reveal before/after microsite generalized from the Morning Fuel template (`lift-morning-fuel-audit-693.netlify.app`), on a helloliftstudio.com path or clean subdomain — never a bare `.netlify.app` link. Target: ≤10 minutes of Megan-time per prospect, and every output goes through her eye before it's ever linked in an email.
- **Batch mode (build only after the first Lane V client pays):** same pipeline at volume — ingest → batch enhance → Canva brand-template dataset → caption drafts → Megan culls and curates. Her curation is ~20% of the time and 100% of the product.
This is where the deleted agent-roster ambition lives now: as one working, sophisticated skill with a proof standard, instead of seventeen table rows.

**4. T23 — stale template sweep.** `automation/outreach_templates.md` still quotes a dead $650 starter project and the old boilerplate line. Rewrite to match `LIFT_SYSTEM.md` §2/§4 (two lanes, new positioning line, no-attachment rule, menu-on-reply). Megan approves wording before first live use.

**5. T14 — pre-send checklist (`docs/OUTREACH_APPROVAL_CHECKLIST.md`).** One page: hook link fetched and opens · helloliftstudio.com links only · no attachments · no pixel/wrap · recipient address verified + not previously contacted (check the Sheet) · Anti-AI pass done · lane + hook format logged · Sheet row ready. This is the manual stand-in for critic Stage 3 until #1 ships.

**6. T24-lite — one-page "if someone says yes" sheet.** Not the full fulfillment SOP: payment confirmed before work starts (tool: Megan's choice) · written scope = the menu line, verbatim · what Lane V month-1 delivery contains · one revision round included · client approves everything before publish. Expand into a real SOP only after the first real client stress-tests it.

**7. Kill the fail-open branch.** Delete/neuter the fail-open `doPost` secret check in the **repo copy** of `automation/live_apps_script_sync/LiftPipelineAutomation.gs` (replace with fail-closed: `if (!secret || payload.secret !== secret) reject`) plus a `// LEGACY — DO NOT RUN` banner (old T9). Repo-only — no clasp, no deploy. Removes R3's copy-paste revival risk; the live un-deploy stays a NEEDS-HUMAN item for Megan in the Apps Script editor.

**8. Content-batch pipeline (after first Lane V client, not before).** Asset ingest (`download_site_assets.py`, `extract_brand_palette.py` exist) → batch enhance → Canva brand-template dataset → caption drafts. Culling and QA stay Megan — her eye is ~20% of the time and 100% of why anyone pays.

## Megan's items (not Claude Code's)

Turn off Snov.io tracking/wrapping · take invented case studies off the live site · fix the audit GPT's netlify.app link in GPT Builder · stand up `megan@helloliftstudio.com` + warmup (FOUNDATION amendment already applied) · confirm Witmer's web team exists before that deck ships · ~~check whether Tang actually has an Instagram before any Tang plan~~ **CLOSED 2026-08-19: yes, @tangdumpling2026, 2 posts / 84 followers / 1 following, dormant. Evidence in `audits/tang/RESUME.md`** · set menu prices for any Witmer-style scope she intends to keep selling.
