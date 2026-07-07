# Lift Audit Assistant — Extraction

2026-07-06 (Fable 5). Extracts reusable logic from `LIFT_AUDIT_ASSISTANT_REFERENCE.md` (the custom-GPT config). Treated as workflow reference, NOT source of truth — repo files + AI OS safety rules win. Cross-checked against `skills/liftaudit/` which already implements most of this locally.

## Already implemented locally (GPT ref confirms, doesn't add)
`skills/liftaudit/` already contains: `references/` (audit-protocol, seo-geo-audit, instagram-audit, website-audit, brand-asset-protocol, visual-quality-rules, home-services-seo, outreach-email), `templates/` (full-audit, brand-snapshot, outreach-email, seo-content-plan, instagram-plan, chat-visual-handoff, website-concept-brief), `scripts/` (capture_site, download_site_assets, extract_brand_palette, build_asset_manifest, validate_audit_assets), `test-fixtures/`. **The GPT is largely a hosted mirror of this skill.** Extraction value = confirming parity + surfacing the few rules worth hardening into SOPs.

## Core audit rules (extracted → destination)
- Audit the REAL business before creating anything; accuracy > polish → **SOP** (preflight gate).
- Two highest-impact opportunities, don't default to redesign → **skill logic** (exists in audit-protocol).
- Source public first-party assets before asking; ask only when blocked → **skill**.
- Verify assets/facts before any visual → **asset gate SOP** (hard preflight).
- One image = one deliverable; never combine channels → **skill rule** (visual-quality-rules).

## Asset gate rules → SOP (`asset verification checklist`, ticket T15)
Exact verified logo · official/labeled imagery · verified contact/facts · no generated people · no invented claims. Gate clears once per conversation, then reuse (state-reuse rule). **This is the no-fabrication firewall — highest-value SOP to formalize.**

## Visual QA rules → checklist (ticket T16)
Reject: wrong/distorted logo, misspelled brand, fake facts/people/reviews/awards, combined deliverables, unreadable text, layout collisions, broken footer, template fragments, placeholder-as-final, generic-Canva look, mismatched channel, anything worse than Good-Examples benchmark. Major issue → restart from new brief, don't patch. **This is the quality-collapse-prevention control — critical as volume scales.**

## Outreach email rules → skill (extends follow-up-draft)
Prospect-specific opener · name what works · two opportunities · reference attached visuals · exact boilerplate line ("I run Lift Studio, a boutique brand and content studio…") · "Lift Studio" hyperlinked · service menu attached · low-pressure close · sign "Best, Megan" · tailor every one. **CONFLICT FLAG:** GPT ref hyperlinks to `helloliftstudio.netlify.app`; current source of truth is **helloliftstudio.com** (STATUS.md). → repo wins; fix in any skill build.

## State-reuse rules → skill behavior
Don't re-request cleared assets / re-run full audit unless facts conflict, brand changed, or asset missing. Move straight to requested deliverable using verified state. → efficiency logic for the audit skill.

## SEO/GEO logic → skill (exists, seo-geo-audit.md)
Framework selection (Search-to-Sale/Service/Deal/Booking/Product); high-intent → content → trust → page → conversion; blog assessment dims; monthly SEO-blog package mention. **This is the wedge offer — worth its own prominence in the profit-engine workflow.**

## Automation opportunities the GPT ref implies
Asset sourcing (scriptable — bucket 1) · audit structure (skill — done) · scoring (skill candidate) · visual QA (checklist/skill) · outreach drafting (skill). None imply auto-send or auto-publish.

## Agent candidates surfaced
Website Audit, SEO/GEO Audit, Instagram Audit, Brand-Asset-Verification, Visual QA, Outreach Drafting — all map to the orchestration blueprint. All AI-suggest / Megan-approve.

## Conflicts with current safety rules (repo wins)
1. **URL drift:** netlify.app in GPT ref vs helloliftstudio.com in repo → use repo.
2. GPT ref mentions "Ahrefs/connectors when helpful" → allowed only as read-only, identity-verified, never assumed available.
3. GPT ref is Fable-flagged as reference-only by its own author note (lines 302–320) → honored.
4. No conflict on safety posture — GPT ref itself states "old automation is dead, ambition is not."

## Should become
- **SOP:** preflight/asset gate; visual QA gate; single-deliverable rule.
- **Skill:** $liftaudit (exists — refine, fix URL); outreach draft (extend follow-up-draft); prospect scoring.
- **Agent (later):** the six audit-channel agents, all suggest-only.
- **Automation candidate:** asset gathering (local scripts, safe now).
- **Keep human-owned:** two-opportunity pick, visual selection, final visual QA sign-off, package rec, all sends.
