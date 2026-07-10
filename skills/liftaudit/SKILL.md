---
name: liftaudit
description: Run Lift Studio brand audits when Megan invokes $liftaudit or asks for a verified Website, Instagram, and Blog/SEO/GEO audit system with official asset capture, channel selection, standalone deliverables, editable website concepts, SEO/GEO plans, Instagram strategy, and tailored outreach. Use for high-ROI local service brand audits where accuracy, live verification, and no-fabrication rules matter.
metadata:
  short-description: Verified Lift Studio brand audit workflow
---

# Lift Audit

Use this skill only when Megan explicitly invokes `$liftaudit` or asks for a Lift Studio brand audit. Do not run it for casual website feedback.

## Start Here

1. Confirm the project root is `/Users/meganreeves/Documents/Projects/Lift Studio`.
2. Read `ACTIVE_INSTRUCTIONS.md`, `CLAUDE.md`, and this file.
3. Create all audit outputs under `audits/[brand-slug]/`.
4. Verify the live brand before making conclusions or creating concepts.
5. Audit Website, Instagram, and Blog/SEO/GEO internally, then select only the two strongest opportunities unless Megan requests all three.
6. Do not create polished visual mockups in Codex by default. After the audit, asset pack, brand snapshot, and selected-channel rationale are complete, create a `chat-visual-handoff/` bundle for ChatGPT visual generation.
7. Only create an editable HTML/CSS concept in Codex when Megan explicitly asks for a coded prototype after seeing or approving the ChatGPT visual direction.
8. End with a tailored outreach email after the selected deliverables.
9. Run with everything Codex can reliably access. If a task is better suited for ChatGPT, browser-based visual review, or Megan-supplied screenshots, flag it clearly and tell Megan what to bring over rather than guessing.

## Inputs

Accept brand name, website URL, Instagram URL, blog URL, screenshots supplied by Megan, priority instructions, business category, and target market. If only a website URL is supplied, discover other public channels when reasonably possible.

## Required Reference Loading

Read only what the task needs:

- Always read `references/audit-protocol.md` and `references/brand-asset-protocol.md`.
- Before any visual is produced or any brand asset is used, read `references/imported-2026-07-09/Lift_Audit_Brand_Asset_Verification_Protocol.md` — it is the binding asset-verification standard (no fabricated testimonials, no AI-generated people, no invented before/afters) and wins over the shorter brand-asset-protocol where they differ.
- If a visual deliverable is being designed, also read `references/imported-2026-07-09/08_Lift_Studio_Visual_Branding_Protocol.md`.
- If Website is selected or likely, read `references/website-audit.md` and `references/visual-quality-rules.md`.
- If Instagram is selected or likely, read `references/instagram-audit.md`.
- If Blog/SEO/GEO is selected or likely, read `references/seo-geo-audit.md`; for home services and local lead-gen categories also read `references/home-services-seo.md`.
- Before writing outreach, read `references/outreach-email.md`.

## Workflow

### Phase 1: Verify and audit before design

Review the live website, public Instagram when available, and blog/content/search structure. Write factual findings first. Never invent profile data, rankings, reviews, service areas, offers, addresses, or current-state screenshots.

Required research files:

- `01-research/live-site-audit.md`
- `01-research/channel-comparison.md`
- `01-research/source-links.md`
- `01-research/screenshots/` when screenshots are available or captured

### Phase 2: Build the verified asset pack

Collect only public, official, first-party assets when possible. Clearly separate official assets, third-party reference material, user-supplied assets, and generated/conceptual assets.

Required asset files:

- `02-assets/official/`
- `02-assets/references/`
- `02-assets/asset-manifest.csv`
- `02-assets/source-manifest.md`
- `02-assets/brand-snapshot.md`

### Phase 3: Define visual rules

Document the real logo, colors, type direction, photography style, icon style, layout patterns, tone, preserved elements, dated/inconsistent elements, and concept constraints. Keep the official logo unchanged unless Megan explicitly requests logo redesign.

### Phase 4: Select channels

Evaluate Website, Instagram, and Blog/SEO/GEO. Choose the two with the clearest visible weakness, strongest business upside, and best outreach value. Document why the third was deprioritized.

Required strategy file:

- `03-strategy/selected-channels.md`

### Phase 5: Create standalone deliverables

Keep each selected channel in its own file/folder. Do not combine Website, Instagram, and SEO into one board unless Megan asks.

Website deliverables when selected:

- `03-strategy/[brand]-website-audit.md`
- `04-concepts/website/[brand]-website-concept-brief.md`
- `04-concepts/chat-visual-handoff/[brand]-chat-visual-handoff.md`
- `04-concepts/chat-visual-handoff/assets-to-upload.md`
- `04-concepts/chat-visual-handoff/chatgpt-visual-prompt.md`
- optional editable HTML/CSS prototype only if Megan explicitly asks after ChatGPT visual direction is approved

Instagram deliverables when selected:

- `03-strategy/[brand]-instagram-audit.md`
- `04-concepts/instagram/[brand]-instagram-plan.md`
- `04-concepts/chat-visual-handoff/[brand]-chat-visual-handoff.md` if a feed/profile mockup is desired in ChatGPT

Blog/SEO/GEO deliverables when selected:

- `03-strategy/[brand]-seo-geo-audit.md`
- `04-concepts/seo-content/[brand]-seo-content-plan.md`
- optional standalone visual only if it tells one clear story

Outreach deliverable:

- `05-outreach/[brand]-outreach-email.md`
- The draft must mention the attached Lift Studio service menu and include `https://helloliftstudio.com/`.

### Phase 6: Visual handoff and stop rule

If official logo, screenshots, or photography are missing or too weak for a polished visual, stop before visual creation and ask Megan for source assets. A lower-fidelity wireframe is acceptable only when clearly labeled.

Also flag any blocked or low-confidence task that is better suited for ChatGPT or manual visual review, especially Instagram grids/Reels/highlights, Google Business Profile details, mobile-only social profile contact buttons, blocked pages, or current-state visuals Codex cannot inspect directly. Continue with the parts Codex can complete, but mark those items as `Needs ChatGPT or Megan review`.

For polished visuals, stop at a ChatGPT handoff bundle unless Megan explicitly asks Codex to make the visual. The bundle should include:

- exact ChatGPT prompt
- official logo path
- official imagery paths
- current screenshots
- selected-channel summary
- top visual opportunities
- verified colors/type notes
- factual proof points allowed in visuals
- strict do-not-invent rules

### Phase 7: Validate

Before final delivery, run the asset validator and any relevant syntax checks. For website concepts, verify desktop and mobile rendering when practical.

## Scripts

Use bundled helper scripts from `scripts/`:

- `capture_site.py`: captures desktop/mobile screenshots with Playwright.
- `download_site_assets.py`: downloads first-party image assets and source metadata.
- `extract_brand_palette.py`: drafts a palette from logo or screenshots for human verification.
- `build_asset_manifest.py`: builds a CSV asset inventory.
- `validate_audit_assets.py`: checks readiness before concepts.

Do not install dependencies without Megan's permission. Document missing dependency commands instead.
