# Lift Studio Operating Status

Last updated: 2026-07-09

## Session Lock
- Agent: Fable 5 (Architect mode)
- Date: 2026-07-09 23:55 ET
- State: **Consolidation landed.** `_system/` reduced from 25 files to 5; `_system/LIFT_SYSTEM.md` is now the single client-acquisition operating doc, `_system/LIFT_BUILD_QUEUE.md` the single build queue. Megan locked the open decisions live this session: **two co-lead lanes as a timed test** (Lane V visual / Lane S search, decision checkpoint 2026-08-07), SEO lane survives as co-lead, free hook = one remade piece only, invented website case studies come down and get replaced with real labeled spec work, price lives in the menu only. FOUNDATION.md Identity Map amended (second Lift sending address, accepted by Fable). `skills/liftaudit/SKILL.md` now loads the imported 990-line asset-verification protocol on every run. Local CSV tracker deleted — the Google Sheet `Pipeline` tab is the only tracker. Outreach resumes **Monday 2026-07-13** per `LIFT_SYSTEM.md` §6.
- Nothing shipped: no sends, no drafts, no sheet writes, no Apps Script, no push. All changes are local commits on `repo-consolidation-2026-07-02`.
- In progress / not finished: Claude Code build queue items 1–7 (`_system/LIFT_BUILD_QUEUE.md`) — critic pipeline skill first. Megan's pre-Monday items: Snov tracking off, invented case studies down, GPT netlify link fixed, megan@helloliftstudio.com stood up, Witmer web-team + Tang Instagram verified.
- Next step (revised same session, Megan's call): **Dress rehearsal first, before Monday** — a Claude Code session runs `LIFT_SYSTEM.md` stages 1–4 on two REAL Wednesday-batch prospects (one per lane): pick → hook-lite (20-min cap enforced) → hook build (this forces Creative Agent hook mode, build queue #3, into existence against real photos) → draft + full QA gates → **STOP at the send gate, nothing sent**. Report stage timings vs. targets (≤10 min Megan-time/hook, ~15/email) and anything the QA gates caught or missed. Rehearsal output = 2 of Wednesday's 10 hooks, kept. Then: Monday 2026-07-13 = reply-probe + site cleanup + remaining 8 picks; **first sends Wednesday 2026-07-15** (hard date). Claude Code queue after rehearsal: #1/#2/#4/#5. Warm replies may be offered a 15-min call (closing tool only — LIFT_SYSTEM.md §4).

## Current Source Of Truth

- **Operating doc: `_system/LIFT_SYSTEM.md`** (audit, offers, outreach, critic pipeline, tracker, two-lane test)
- Build queue: `_system/LIFT_BUILD_QUEUE.md` · QA gate: `_system/LIFT_ANTI_AI_OUTPUT_QA_STANDARD.md` · Legacy safety record: `_system/LIFT_LEGACY_AUTOMATION_AUDIT.md`
- Entry point: `ACTIVE_INSTRUCTIONS.md` · Local workspace: `/Users/meganreeves/Documents/Projects/Lift Studio`
- GitHub: `https://github.com/mareeves9311/Lift-Studios` (branch `repo-consolidation-2026-07-02`, local commits unpushed)
- Website: `https://helloliftstudio.com/` · Dashboard: `https://liftstudiosdashboard.netlify.app/`
- Google Sheet (the only tracker): `https://docs.google.com/spreadsheets/d/1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8/edit` — `Pipeline` tab is source of truth; do not rename/remove it (feeds the Netlify dashboard).

## Ground truth (established 2026-07-09, do not let docs drift from it)

72 sent threads (~55 businesses, Jun 11–Jul 2) · **zero prospect replies ever** · ~5 bounces · 0 clients · $0 revenue · every likely-human opener was a visual business. The full evidence base and killed hypotheses live in `_system/LIFT_SYSTEM.md` §9 (graveyard) and in git history (`_system/LIFT_FABLE_HANDOFF_2026-07-09.md`, deleted at consolidation per its own instruction).

## Active System

Manual-first, per `LIFT_SYSTEM.md`: Megan picks prospects (5/lane/week) → hook-lite → QA-passed observation-led email, no attachments, real-domain links only → Megan sends → Sheet updated same session → FU1 day 4–5, FU2 day 10–12, stop. Full `$liftaudit` depth only for paid or replied prospects. Every send is Megan's click, permanently.

## Legacy (unchanged)

The Apps Script outbound engine remains **LEGACY — DO NOT RUN** (`_system/LIFT_LEGACY_AUTOMATION_AUDIT.md` holds the risk register, decommission log, and reapproval rules). Open items: R3 (fail-open doPost — live un-deploy NEEDS HUMAN; repo-copy fix is build queue #7), R4 (sendEmail-capable variant un-quarantined), R5 (local↔live drift unverifiable without approved clasp). `enableAutoDiscovery` stays false forever.

## Do Not Touch Without Approval

- No AdviseHer or AMP3 files in this repo.
- Do not rename/remove the Google Sheet `Pipeline` tab.
- Do not delete `brand-images/` or `site/lift-studio-images/` until the image duplication question is resolved.
- Do not restore archived instruction packs, or the deleted `_system` planning docs, into the active path.
