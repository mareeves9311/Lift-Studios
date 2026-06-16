# Lift Studio: Brand Audit + Content Growth System

## The One Command

To run a full audit, say this to Claude Code:

> **"Run audit for [Business Name] — [website URL] — [Instagram handle]"**

Claude Code researches the business, writes the audit, identifies the 2 best proof-of-work exhibits, generates the Claude Design brief, and writes the Midjourney prompts. You take those outputs and build the visual showcase.

Gold standard output: https://mr-morning-fuel-audit.netlify.app/

---

## The Core Loop

Every prospect follows the same five-step flow:

1. **Add to Pipeline** — add the brand to the `Brand Pipeline` tab in the live tracker
2. **Research** — review website, social, reviews, competitors, and public profiles
3. **Audit + Offer Fit** — write the mini-audit and choose the smallest logical Lift offer
4. **Exhibit Selection** — decide whether the prospect needs a written audit only, a lookbook, or custom mockups
5. **Deliverable** — send the mini-audit, optional showcase, and concise outreach message

---

## Step 0: Add to Pipeline

Live tracker:
https://docs.google.com/spreadsheets/d/1ZUgq7srd2P835fA_Kge80ZpiFJjvUwBR_PXCjZsU688/edit

Add new prospects to the `Brand Pipeline` tab.

Required fields:
- business_name
- website
- instagram
- category
- location
- source
- pipeline_status
- priority
- offer_angle
- next_step

Use `Needs Instagram review` if the pitch depends on social/content/branding and Instagram has not been manually checked yet.

## Step 1: Research

Before writing anything, gather:
- Website URL — review homepage, services page, booking flow, mobile experience
- Instagram handle — posting frequency, content types, engagement, hooks, bio, highlights
- Google Business Profile — rating, review count, photos, hours, CTA button
- 1-2 direct local competitors — what are they doing better or worse?
- Any unique differentiators — specialty product, location story, niche audience

Tools:
- claude.ai with web search — browse all of the above in one session
- Screenshot anything worth referencing in the audit

---

## Step 2: Audit

Produce a prospect-specific audit using the audit_template.md structure.

Rules:
- Every observation must reference something specific and real
- Every quick win must include an example of what the fix looks like
- No generic advice that could apply to any business
- The audit should read like you spent hours on their business specifically — because you did
- Tone: collaborative, knowledgeable, not critical
- If the pitch mentions Instagram/social/content, the social profile must be manually reviewed first

Output: a completed markdown audit document saved as:
`[business_name]_audit.md`

Reference example: `morning_fuel_mechanicsburg_mini_audit.md`

---

## Step 3: Offer Fit

Pick the smallest logical next step:

- Mini-Audit
- Starter Content Kit
- Growth Content Kit
- Content Bank + Brand/Social Direction
- Website + Brand Refresh Add-On
- Growth Content Kit + Brand/Social Direction

Do not default every lead to a website refresh. If the website is strong but social or brand consistency is weak, lead with content/brand direction.

---

## Step 4: Design Brief

Only generate a Claude Design prompt when mockups will help sell the opportunity. Use audit_to_design_prompt.md as the template.

The brief tells Claude Design:
- The business's brand colors, fonts, and visual direction (extracted from their current assets or recommended based on the audit)
- The specific content areas to mock up (social posts, homepage hero, brand direction)
- The tone and aesthetic direction
- What image slots to leave for Midjourney-generated photos

Output: a Claude Design prompt ready to paste

---

## Step 5: Deliverable

Paste the Claude Design prompt into Claude Design.
Generate Midjourney images using the client-specific style string and batch prompts.
Drop Midjourney images into Claude Design slots.
Export as PDF.

Final send package:
- The audit document (PDF or Google Doc)
- The sample work / mockup PDF (from Claude Design)
- A short outreach message (see outreach_messages.md)

---

## Reference Files

| File | Purpose |
|---|---|
| `morning_fuel_mechanicsburg_mini_audit.md` | Gold standard audit example |
| `lift_brand_audit_system_v2.md` | Current V2 pipeline and audit workflow |
| `audit_template.md` | Blank audit structure for new prospects |
| `audit_to_design_prompt.md` | Converts any audit into a Claude Design brief |
| `pricing.md` | Current service tiers and pricing |
| `outreach_messages.md` | Outreach message templates |
| `codex_handoff_brief.md` | Full project context for Codex/ChatGPT |

---

## Scaling the System

Once Morning Fuel is complete and the flow is validated:

1. Morning Fuel audit + mockups become the reference example for cafe/brunch pitches
2. Each new prospect starts in `Brand Pipeline`
3. Build niche-specific variants as needed:
   - Cafe / brunch (Morning Fuel template)
   - Skin studio / med spa (Juniper template)
   - Salon / beauty service
   - Fitness studio
   - Boutique retail
4. Upload all reference files to the MR Studio claude.ai project as permanent project knowledge
