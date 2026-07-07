# Lift Prospecting and Scoring System

2026-07-06. Operationalizes the existing niches file and scoring rubric (`automation/niches_and_areas.md`, `automation/candidate_scoring_rubric.md`) into a full prospecting workflow. Does not replace either file — both stay the source of truth for their content; this doc adds workflow, tracker schema, and a proposed rubric refinement around them.

## Target verticals

Full tier breakdown lives in `_system/LIFT_MONEY_MACHINE_BLUEPRINT.md` and `automation/niches_and_areas.md`. Summary for prospecting purposes: **start in Tier A (HVAC, plumbing, electrical, roofing, pest control) inside the PA core geos** (Hershey, Harrisburg, Camp Hill, Mechanicsburg, Hummelstown, Carlisle, Lancaster, York, Lebanon) before expanding geo or vertical. Search pattern: `[niche] + [city]` per the niches file's wide-outreach method.

## Scoring criteria — the active model

The live rubric (`automation/candidate_scoring_rubric.md`) is already in use and already gates outreach priority. Do not replace it. It scores 0–20 across five categories, each 0–4:

1. Revenue potential
2. Website weakness
3. Conversion path
4. Business credibility
5. Ease of personalization

Priority bands: **17–20 A-list** (personalized audit or Loom), **13–16 good** (personalized cold email), **9–12 maybe** (lower-effort outreach only), **0–8 skip.**

## Proposed refinement — add one category, don't replace the model

The prompt behind this system asked for an 11-category model (website clarity, local SEO opportunity, visual polish gap, conversion friction, business budget likelihood, urgency, competitive pressure, owner/operator visibility, outreach angle strength, likelihood to respond, likely package fit). Adopting all 11 now would throw away a rubric that's already validated and already has a working cutoff, before any evidence says the current one is wrong — that contradicts this repo's own proof-first principle.

**Sharper fix:** the current 5-category rubric has no dedicated score for content/SEO gap — despite the SEO/GEO blog package being Lift's actual wedge offer (per the profit-engine workflow doc). A business can score low on "website weakness" (decent site) while still being a perfect SEO/content prospect (no blog at all). That's a real blind spot.

**Recommendation:** add a sixth category rather than rebuilding the rubric:

> **6. Content/SEO Gap: 0–4** — 4: no blog/FAQ/resource content despite clear local search demand; 3: thin or stale content (12+ months old); 2: some content but unfocused/no local targeting; 1: reasonable content, minor gaps; 0: strong, current, locally-targeted content already in place.

New scale becomes 0–24; recommend re-baselining priority bands proportionally (e.g., 20–24 A-list, 15–19 good, 11–14 maybe, 0–10 skip) once a handful of real candidates have been scored both ways. Do not adopt the full 11-category model until the current rubric (plus this one addition) has been run against enough prospects to know if it's actually under-discriminating — that's the same proof-first bar the rest of this repo already holds itself to.

## Disqualifiers (red flags — from the live rubric, unchanged)

No website · Facebook-only presence · very old business with no digital activity · no clear booking/inquiry path · already polished agency-built site · corporate/franchise brand with centralized marketing · business appears closed or inactive.

## Green flags (easy wins — from the live rubric, unchanged)

Expensive service menu · booking link exists but buried · Instagram looks better than the website · strong reviews but weak website · good photos, poor layout · clear niche but generic homepage copy · obvious mobile issues · valuable services that are hard to understand · clear local search demand but no blog/FAQ content · seasonal/emergency services where weekly SEO/GEO content could capture customer questions · strong project proof that could become recurring content.

## Prospect data fields — tracker schema

The core manual tracker schema is carried forward from the existing V2 design (`_system/LIFT_V2_SAFE_AUTOMATION_BLUEPRINT.md`): `company, category, website, instagram, email, contact_form_url, audit_status, outreach_status, audit_link, first_sent_date, last_touch_date, reply_state, next_action, notes`. Deliberately dropped: `score/priority/recommended_offer/draft_id/automation_notes` — V1 automation-machinery fields with no place in a manual/human-gated system.

**Two additional fields are proposed** on top of that unchanged core, for the scoring refinement above: `score_total` (numeric, 0–24 once the sixth category is adopted) and `score_notes` (short note on which categories drove the score). These are new **learning/analysis fields only** — recorded so the "why did this convert or not" question is answerable later (feeds the Vertical Selector agent and the 90-day plan's learning loop). They are not a revival of the dropped V1 `score/priority` fields: nothing reads `score_total` or `score_notes` to trigger a send, a draft, a stage advance, or any other automated action. They are descriptive data Megan and future reporting look at, never a control input. Any future ticket that would make either field drive an automated action is out of scope here and requires its own separate, explicit approval.

## Public signals to review

Live website (desktop + mobile), Google Business Profile presence/reviews, Instagram (bio, grid, highlights, cadence), blog/resources section (exists? how stale?), visible service area and booking/quote path, obvious signs of ad spend (a "financing available" banner, a booking widget, a review-platform badge) as a budget-likelihood proxy.

## How to rank prospects

Score every candidate against the rubric (plus the Content/SEO Gap addition) before adding to the tracker. Sort the week's batch by score descending. Work top-down. Do not skip ahead to "interesting" low-scored businesses out of curiosity — this is exactly the drift the old HTML-scrape discovery produced junk rows from, and the discipline that replaced it is judgment-led, rubric-scored selection.

## How to avoid wasting time

Cap personalization effort to what the rubric's "ease of personalization" category already implies: if a specific fix can't be named in about 30 seconds of looking at the homepage, the prospect scores low on that axis for a reason — don't force a deep dive to manufacture an angle that isn't there. Skip disqualifiers immediately; don't audit a business to find out it should have been skipped.

## Prospecting workflow

**Now (manual):** Megan picks candidates from the niches file's vertical/geo combinations, scores by hand, adds qualifying candidates (13+, or 20+ once the six-category scale is adopted) to the tracker.

**Month 2 (agent-assisted, per `LIFT_AGENT_ORCHESTRATION_BLUEPRINT.md`):** a Prospect Finder agent proposes a candidate list from niches/geos for Megan to approve into the tracker; a Prospect Scoring agent computes scores in a report for Megan to accept or override. Neither agent writes the tracker unattended. Build gate: 10 manual picks that convert to audits (Prospect Finder), rubric stable across 10 scored prospects (Prospect Scoring) — both per the existing orchestration blueprint's proof requirements.

## Agent-assist and automation opportunities

Both already classified in `_system/LIFT_AUTOMATION_OPPORTUNITY_MAP.md`: prospect sourcing is bucket 4 (later, after manual proof), prospect scoring is bucket 2 (agent-assist soon, human approval). This doc doesn't change either classification — it just gives the scoring model itself a sharper edge to assist with once the gate opens.

## Manual proof requirements

10 manual candidate picks that convert to actual audits, and the rubric (plus the Content/SEO Gap addition) holding up across 10 scored prospects without needing hand-adjustment, before any scoring or sourcing agent moves from "report" to anything resembling default trust.
