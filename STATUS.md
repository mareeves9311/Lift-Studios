# Lift Studio Operating Status

Last updated: 2026-07-14

## Session Lock
- Agent: Claude Code (MIRA, Fable 5)
- Date: 2026-07-14 22:15 ET
- State: **Wednesday's first send is built and QA-passed.** Megan blessed the two Generations in Bloom finals tonight ("both, yes" — studio spray 01 + vase bouquet 06). Shipped (commit `562e20b`): the Lane V drag-to-reveal hook page (`site/reveal/generations-in-bloom/`, Lift palette/type, screenshot-verified desktop+phone) + the first-touch email draft with all six QA passes recorded (`content-bank/generations-in-bloom-regen-test/FIRST_TOUCH_DRAFT.md`). Prospect row added to the Pipeline sheet (row 93; never contacted — verified via Gmail search + sheet). Observed opener verified live: their site's social buttons still point to the old Usztics accounts.
- In progress / not finished: (1) **the reveal page is NOT deployed** — helloliftstudio.com is Netlify but no deploy config lives in this repo; deploy before sending or the link 404s. (2) **No public email exists for the shop** (site ×4 pages, Yahoo Local, Zola checked; WeddingWire 403) — send via their contact form or an address Megan holds privately. (3) This is 1 send of the planned 10 (5/lane) — the other 9 picks/hooks never happened (Mon/Tue got consumed by AI-OS work); Wednesday realistically = this send + the Monday reply-probe 5, not a 10-send day.
- Next step (Megan, in order): **deploy = drag the `site-live/` folder** into Netlify (app.netlify.com → the helloliftstudio site → Deploys → drag the folder). That ONE deploy ships: the reveal page (/reveal/generations-in-bloom/, now side-by-side layout + hi-res before) + the site email fix (megan@helloliftstudio.com in CTA/footer) + the footer wordmark box fix (chrome-sweep gradient now hover-only). Then open Gmail Drafts (ready: → Generationsinbloom509@outlook.com) → SEND → mark sent in the Pipeline sheet. NOTE: the live site's true source was never in this repo — it's a client-side JSX bundle; `site-live/` is the reconstructed+fixed deploy copy (vendor js + assets downloaded from prod 2026-07-14); `site/index.html` is an older static version, not what's live. Signatures: `assets/lift-studio-gmail-signature*.html` rebuilt on current brand with megan@ — paste into the new Gmail (Settings → General → Signature). Late additions all in: hi-res bouquet before (no fake blur), Facebook-already-rebranded opener fix, pitch essence + calendar + services line, "Your photo"→"Lifted" labels.

## Previous Session Lock (2026-07-12, preserved)
## Previous Session Lock (Opus regen R&D, preserved)
- Agent: Claude Code (Fable 5 → switched to Opus 4.8 mid-session)
- Date: 2026-07-11 23:03 ET
- State: **Lane V content-regeneration recipe is now locked and proven across two brands.** Established the process live and committed it. The recipe: regenerate a client's real photo keeping the **product pixel-true**, freely reimagine props/composition/environment, **invent no unverifiable specifics** about their premises, sanity-check physics (raw food ≠ steam), and **self-audit every image for AI-tells before showing Megan** (realism/restraint > polish; over-styling/glow/creamy-bokeh = the tell). Vibe is dialable studio-editorial ↔ warm-approachable-workshop; match to the client's price positioning or show the range as the pitch.
  - **Tooling proven:** nano-banana-pro (via Runway) = default for photo regen that must hold the real product; Ideogram v4 `edit_image` = lead when the image carries logos/signage/text (spell real text out exactly). Ideogram hit a daily free-tier limit mid-session → Runway is the reliable path tonight.
  - **My Way Pizza** (`content-bank/myway-pizza-regen-test/`, 8 files + README): hero cheese-pizza game-day shot + full raw-pizza-kitchen batch; landed the low-close + no-invented-oven + no-steam version.
  - **Generations in Bloom** (`content-bank/generations-in-bloom-regen-test/`, source + 7 finals + this recipe): standing spray in studio-editorial AND warm-workshop vibes, plus the summer bouquet restaged hand→vase. Megan's favorites: studio spray 01, vase bouquet 06.
  - **Protocol amended:** `_system/LIFT_ANTI_AI_OUTPUT_QA_STANDARD.md` now covers generated imagery (three gates: fidelity · play-safe-on-specifics · does-not-read-as-AI), extending it from copy-only.
  - **Memory captured (3 durable rules):** `feedback_visual-regeneration-fidelity-line`, `feedback_regen-play-safe-on-unverified-specifics`, `feedback_regen-must-not-read-as-ai`.
- Dropped for now (Megan's call): med spas / hair / anything before-after-driven — that's a social-media-strategy problem (frame the untouched clinical image + coach capture), not a regeneration problem. Youveau Aesthetics flagged as a strong *future outreach* target (content so bad the upside is obvious) but bad fit for the regen recipe.
- Flag still open (unchanged): `IMG_6490.PNG` untracked in repo root — left uncommitted, still need Megan's confirm on keep vs clean up.
- Next step: pick final hero images per brand → write the Generations in Bloom first-touch outreach (rebrand angle + "here's your content, elevated") to convert this batch into an actual send. Wednesday 2026-07-15 first-sends date and Fable's dress-rehearsal queue remain the primary outreach path, untouched by tonight's R&D.

## Previous Session Lock (Fable 5 open, superseded by close above)
- Agent: Claude Code (Fable 5)
- Date: 2026-07-11 20:17 ET
- State: session open — fresh session per previous lock's next step; Ideogram connector tools now discoverable; goal = retry My Way Pizza hero shot via Ideogram vs nano-banana-pro, pending Megan's real interior photos.

## Previous Session Lock (Sonnet 5, 2026-07-11 — visual-regen R&D, preserved)
- Agent: Claude Code (Sonnet 5)
- Date: 2026-07-11 20:14 ET
- State: Ran a live visual-regeneration tool test for the Lane V content-bank pipeline (parallel R&D, not part of Fable's dress rehearsal below) against a real My Way Pizza & Grill Instagram photo. Compared Runway `gen-4` (failed food-identity twice — invented popsicle shape, then invented a mozzarella-pool cheese pattern despite explicit "do not alter the pizza" instructions) against Runway `nano-banana-pro` (held food identity correctly on both tries). Two rules came out of it, validated live: **(1)** food/product must stay pixel-true; props, styling, composition are fully reimaginable — don't preserve literal decor, elevate it. **(2)** regeneration must be grounded in real brand register and real occasion, not inferred — first nano-banana-pro pass styled My Way (a quick-service wood-fired shop) as an elegant country-kitchen July 4th picnic; corrected version fixed both once Megan named the actual brand facts (Hummelstown PA, wood-burning oven, any toppings, ready in minutes) and the real occasion (World Cup watch party, not a holiday). Both memorialized in `~/.claude/projects/.../memory/feedback_visual-regeneration-fidelity-line.md`. Final corrected image still read as "too AI" per Megan, specifically on rendered logos/patterns (soccer ball, jersey) — researched current tools, found **Ideogram v3** is named best-in-class for exactly that (95%+ logo/text accuracy vs <70% for Flux/Midjourney/DALL-E in 2026 comparisons), plus **Nightjar**/**Claid.ai** as purpose-built "preserve product, reimagine environment, avoid visual drift across a batch" tools worth evaluating — neither tried yet.
- In progress / not finished: Ideogram added two ways — a local `claude mcp add` registration (`ideogram`, never authenticated, redundant, removed this session) and a `claude.ai Ideogram` connector that IS authenticated per `claude mcp list` but whose tools never became discoverable via ToolSearch in this session — needs a fresh session to sync, which is why this session is closing. Still waiting on real My Way Pizza interior photos from Megan (has screenshots, not yet sent; the Google Business Profile photos link doesn't render via fetch — JS wall, same as Instagram). No image from tonight is send-ready. `nano-banana-pro` is the validated interim default for food-fidelity regeneration until Ideogram is actually tested.
- Flag, not resolved: `IMG_6490.PNG` (My Way Pizza screenshot) sits untracked in the repo root, byte-identical to a copy in `~/Downloads`. Not moved or deleted — unclear if Megan placed it there on purpose or it landed via some sync. Confirm before treating it as either "keep" or "clean up."
- Next step: **new session** → confirm Ideogram's tools are now discoverable (`ToolSearch` for "ideogram") → if yes, retry the My Way Pizza hero shot through Ideogram and compare against the nano-banana-pro result (currently only in the ephemeral session scratchpad — save durably if it's worth keeping past this session) → get the real interior photos from Megan and re-ground the shot in reality rather than inferred "wood-fired shop" styling. This is separate from Fable's dress-rehearsal queue below, which remains the primary path to Wednesday's sends.

---

## Previous Session Lock (Fable 5, preserved for continuity)
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
