# Lift Audit Production System

2026-07-06. The system that turns a URL into a finished audit packet. Synthesizes the existing `skills/liftaudit/` skill (audit-protocol, brand-asset-protocol, website/instagram/seo-geo-audit references) and the extraction doc (`LIFT_AUDIT_ASSISTANT_EXTRACTION.md`) into the 13-step pipeline below, with automation potential and quality bars made explicit for each step.

## Foundation change recommended: two audit depths, not one

Today the `$liftaudit` skill runs one depth: full research, verified asset pack, concept briefs, chat-visual-handoff bundle, outreach email — for every invocation. That's the right depth for a paid $250 Mini-Audit or a prospect who has already replied. It is **too much Megan-equivalent time to spend on every cold prospect before any signal they're interested**, which directly works against "maximum profit, minimum repeated manual effort."

Recommend two depths going forward:

- **Audit-lite** (cold outreach, the free hook): live site + social skim, 1–2 specific named observations, no full asset pack, no concept briefs. Target: 15–20 minutes equivalent.
- **Full `$liftaudit`** (paid Mini-Audit, or any prospect who replied): the existing full pipeline, unchanged.

The 13 steps below apply in full to full-depth audits; audit-lite uses steps 1, 2, 4/5/6 (skimmed), 7, and 10 only — the rest are skipped until a prospect earns full depth by paying or replying.

## The 13 steps

### 1. Audit intake
- **Current manual:** Megan or the skill accepts brand name, URL, and any known channels; confirms project root and reads `ACTIVE_INSTRUCTIONS.md`/`CLAUDE.md` per skill's Start Here.
- **Ideal agent-assisted:** intake form/prompt auto-discovers other public channels (Instagram, blog) from the URL when not supplied.
- **Automation potential:** High (bucket 1 — local, no live-system write).
- **Risks:** Wrong business matched (name collision) — low but real for common business names.
- **Required source material:** URL at minimum; name, category, target market if known.
- **Output format:** Intake note (brand, URL, known channels, category).
- **Quality bar:** Confirmed as the correct live business before any research begins.
- **Failure modes:** Auditing the wrong "Joe's Plumbing."
- **Must check before client-facing use:** N/A (internal step, not client-facing).

### 2. Public research
- **Current manual:** Live review of website, Google Business Profile, and public presence per `audit-protocol.md`.
- **Ideal agent-assisted:** Research pass drafted by the audit skill, Megan spot-checks.
- **Automation potential:** Medium (bucket 2 — agent-assist, human approval).
- **Risks:** Stale or cached search results presented as current state.
- **Required source material:** Live website, GBP, visible reviews.
- **Output format:** `01-research/live-site-audit.md`, `01-research/source-links.md`.
- **Quality bar:** Every fact traceable to a live source link.
- **Failure modes:** Treating a search snippet as verified current content.
- **Must check before client-facing use:** No fact used downstream that isn't in the source-links file.

### 3. Asset verification
- **Current manual:** Build the asset pack per `brand-asset-protocol.md` — official logo, imagery, colors — before any design.
- **Ideal agent-assisted:** `download_site_assets.py` / `build_asset_manifest.py` / `extract_brand_palette.py` run the mechanical capture; Megan verifies official vs. reference vs. generated.
- **Automation potential:** High (bucket 1 — local scripts, already safe today).
- **Risks:** Wrong logo used, third-party photo treated as official — the "no-fabrication firewall" per the extraction doc.
- **Required source material:** Live site imagery, favicon, social profile images.
- **Output format:** `02-assets/asset-manifest.csv`, `02-assets/source-manifest.md`, `02-assets/brand-snapshot.md`.
- **Quality bar:** Every asset labeled official / reference / user-supplied / generated — no ambiguity.
- **Failure modes:** Silently substituting or approximating the logo (explicitly banned).
- **Must check before client-facing use:** Logo is the exact official file, unchanged, before it appears in any visual.

### 4. Website evaluation
- **Current manual:** `website-audit.md` checklist — homepage, nav, footer, services, contact/booking paths, trust signals, mobile presentation.
- **Ideal agent-assisted:** Structured checklist output drafted by the skill; Megan confirms conversion-path judgment calls.
- **Automation potential:** Medium (bucket 2 — proven, low risk, refine via skill).
- **Risks:** Missing a mobile-specific issue if only desktop is reviewed.
- **Required source material:** Live site, desktop + mobile screenshots (`capture_site.py`).
- **Output format:** `03-strategy/[brand]-website-audit.md`.
- **Quality bar:** Covers homepage, conversion path, and at least one mobile-specific note.
- **Failure modes:** Generic "improve your website" findings with no specific page/section named.
- **Must check before client-facing use:** Anti-AI QA — every finding names a specific page/element, not a vague impression.

### 5. SEO/GEO evaluation
- **Current manual:** `seo-geo-audit.md` + `home-services-seo.md` — framework selection (Search-to-Service etc.), blog cadence/topic/intent review.
- **Ideal agent-assisted:** Read-only connector data (Ahrefs) assists where available; skill drafts the framework-fit narrative.
- **Automation potential:** Medium-High (bucket 2 — the wedge offer's core evaluation).
- **Risks:** Implying a ranking or traffic number without evidence — banned by audit-protocol.
- **Required source material:** Blog/content section (or its absence), visible keyword targeting, service-area pages.
- **Output format:** Folded into `03-strategy/[brand]-seo-geo-audit.md` when SEO/GEO is a selected channel.
- **Quality bar:** States clearly whether a real blog exists; if not, frames it as a launch opportunity, not a critique of a nonexistent thing.
- **Failure modes:** Vague "improve your SEO" language with no framework or specific term named.
- **Must check before client-facing use:** No ranking/traffic claim without a cited source; framework (Search-to-Service/Sale/Deal/Booking/Product) explicitly named.

### 6. Instagram/social evaluation
- **Current manual:** `instagram-audit.md` — profile, bio, link, highlights, grid, cadence, CTAs.
- **Ideal agent-assisted:** Skill drafts findings; flags to ChatGPT/browser review when Codex-equivalent access can't inspect Reels/highlights directly.
- **Automation potential:** Medium (bucket 2 — proven).
- **Risks:** Inventing engagement data that isn't visible.
- **Required source material:** Public Instagram profile.
- **Output format:** `03-strategy/[brand]-instagram-audit.md`.
- **Quality bar:** No invented follower/engagement numbers; only what's publicly visible.
- **Failure modes:** Treating a blocked/limited view as "no activity" instead of flagging `Needs ChatGPT or Megan review`.
- **Must check before client-facing use:** Every claim about the profile is something a prospect could verify by looking at their own Instagram.

### 7. Opportunity selection (the two strongest channels)
- **Current manual:** Megan picks, informed by AI-drafted comparison — explicitly sales taste.
- **Ideal agent-assisted:** AI suggests a ranked comparison; Megan decides. **Never fully automated** — flagged "keep human-owned" in the Automation Opportunity Map and this doc agrees.
- **Automation potential:** None (bucket 6).
- **Risks:** Picking the "easy to produce" channel over the highest-business-upside one.
- **Required source material:** Steps 4–6 findings.
- **Output format:** `03-strategy/selected-channels.md`, stating why the third channel was deprioritized.
- **Quality bar:** Reasoning ties to business upside (bookings/calls/quotes), not just visible weakness.
- **Failure modes:** Selecting a channel because it's more visually interesting to produce, not because it's the strongest lever.
- **Must check before client-facing use:** Reasoning is written down, not just implied.

### 8. Visual deliverable decision
- **Current manual:** Megan decides which channel(s) get a polished visual — also sales taste.
- **Ideal agent-assisted:** AI suggests; Megan decides. **Never fully automated** (bucket 6), same as step 7.
- **Automation potential:** None.
- **Risks:** Forcing a facelift on a site that's already effective (explicitly warned against in the GPT reference).
- **Required source material:** Verified asset pack (step 3), selected channels (step 7).
- **Output format:** Decision noted in the strategy file; no separate artifact required.
- **Quality bar:** A facelift is only produced when the current state genuinely underperforms.
- **Failure modes:** Producing a visual because it's expected, not because it's warranted.
- **Must check before client-facing use:** Visual gate checklist cleared (asset verified, one deliverable only, no invented claims) per `brand-asset-protocol.md`.

### 9. Client-facing summary
- **Current manual:** Written verdict — what's working, weaknesses, two opportunities, recommended deliverables.
- **Ideal agent-assisted:** Skill drafts the summary from steps 2–7; Megan edits for voice and accuracy.
- **Automation potential:** Medium (bucket 2).
- **Risks:** Reading as generic/templated — this is the single most exposed step for Anti-AI QA failure, since it's the first thing a prospect actually reads in depth.
- **Required source material:** All prior step outputs.
- **Output format:** Audit summary section of the packet, plain language, no jargon.
- **Quality bar:** Passes all six Anti-AI Output QA passes (`LIFT_ANTI_AI_OUTPUT_QA_STANDARD.md`) — evidence, specificity, anti-AI language, commercial value, human voice, final tightening.
- **Failure modes:** Every weak pattern in the Anti-AI catalog — vague language, empty adjectives, bloated intro, sounds like a template.
- **Must check before client-facing use:** Full Anti-AI QA pass, not optional, before this leaves Megan's hands.

### 10. Outreach email
- **Current manual:** Drafted per `outreach-email.md` after deliverables are ready — see `_system/LIFT_OUTREACH_AND_FOLLOWUP_SYSTEM.md` for full detail.
- **Ideal agent-assisted:** Skill/ChatGPT drafts; Megan edits and sends.
- **Automation potential:** Medium (bucket 2 — core, voice/claims risk keeps it human-edited).
- **Risks:** Sounding like a mail-merge — the exact failure mode this whole Money Machine effort is trying to avoid.
- **Required source material:** Client-facing summary (step 9), service menu.
- **Output format:** `05-outreach/[brand]-outreach-email.md`.
- **Quality bar:** Anti-AI QA pass, plus the mechanical requirements in `outreach-email.md` (service menu attached, website linked, no guarantees).
- **Failure modes:** Same as step 9, plus over-attaching (full brand book instead of just the service menu).
- **Must check before client-facing use:** Anti-AI QA pass + attachment/link checklist from `_system/LIFT_OUTREACH_AND_FOLLOWUP_SYSTEM.md`.

### 11. QA
- **Current manual:** Visual QA against `visual-quality-rules.md` (no-fabrication, layout, brand-match); now paired with Anti-AI Output QA for all written copy.
- **Ideal agent-assisted:** A Human Voice QA / Anti-AI Output Editor agent flags issues and suggests rewrites (see `_system/LIFT_REVENUE_AGENT_SYSTEM.md`); a QA/Evidence Checker agent scans for unsupported claims.
- **Automation potential:** Medium-High for the flagging step; final accept/reject stays human (bucket 2, sign-off is bucket 6).
- **Risks:** Presenting a known-bad output as final under time pressure.
- **Required source material:** The full draft packet (summary + visuals + email).
- **Output format:** QA notes appended to the packet, or a clean pass with no notes.
- **Quality bar:** Zero visual-quality-rules violations, zero Anti-AI Output QA violations.
- **Failure modes:** Patching a major issue instead of restarting from a new brief (visual-quality-rules explicitly requires a restart for major issues).
- **Must check before client-facing use:** Both QA passes (visual + Anti-AI) explicitly completed, not assumed.

### 12. Approval
- **Current manual:** Megan reviews and approves the full packet before anything is sent.
- **Ideal agent-assisted:** Checklist-assisted (see `LIFT_OUTREACH_AND_FOLLOWUP_SYSTEM.md`'s approval checklist); decision stays Megan's.
- **Automation potential:** None (bucket 6 — the gate itself).
- **Risks:** Rubber-stamping because QA already ran — approval is a distinct step, not a formality.
- **Required source material:** QA'd packet (step 11).
- **Output format:** Approval noted (tracker `outreach_status` field).
- **Quality bar:** Megan has actually read the final version being sent, not an earlier draft.
- **Failure modes:** Approving a version that differs from what QA actually checked.
- **Must check before client-facing use:** The approved version and the sent version are the same file.

### 13. Tracker update
- **Current manual:** Megan updates the Pipeline sheet by hand after send.
- **Ideal agent-assisted:** Read-only validation report checks tracker consistency; per-row-approved writes only after the 4-week proof streak (`LIFT_V2_SAFE_AUTOMATION_BLUEPRINT.md`).
- **Automation potential:** Read-only now (bucket 3); approved-write later, gated.
- **Risks:** Unattended sheet writes — explicitly never allowed before the proof gate.
- **Required source material:** Send confirmation, audit link.
- **Output format:** Updated Pipeline row (`audit_status`, `outreach_status`, `first_sent_date`, `next_action`).
- **Quality bar:** Same-session update — this is literally what the 4-week streak measures.
- **Failure modes:** Falling behind on updates, breaking the streak the proof-run gate depends on.
- **Must check before client-facing use:** N/A (internal step, but same-session discipline is itself a proof-run requirement).

## Cross-cutting: what must never happen at any step

No fabricated fact, logo, review, ranking, or claim (`audit-protocol.md`, `brand-asset-protocol.md`) · no combined-channel deliverables (`visual-quality-rules.md`) · no client-facing copy that fails the Anti-AI Output QA Standard · no sheet write without approval · no send without Megan's click.
