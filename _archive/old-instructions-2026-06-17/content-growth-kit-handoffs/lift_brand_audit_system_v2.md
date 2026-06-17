# Lift Brand Audit System V2

Last updated: 2026-06-11

## What Changed

The old system was built around website refresh leads. That was useful, but Lift has evolved into a broader first-impression/content growth offer.

The new system audits the full digital presence:

- Website first impression
- Conversion path
- Social first impression
- Brand clarity
- Content pillars
- Trust proof
- Visual / UGC potential
- Offer fit
- Send readiness

The goal is not just to say "your website could be better." The goal is to show a prospect how their brand could become easier to trust, book, visit, or buy from across website, social, and content.

## Live Tracker

Google Sheet:
https://docs.google.com/spreadsheets/d/1ZUgq7srd2P835fA_Kge80ZpiFJjvUwBR_PXCjZsU688/edit

Workbook title:
Lift Brand Pipeline - Lead Tracker

Lift overview PDF location:
`/Users/meganreeves/Desktop/Desktop Organized/Desktop Cleanup 2026-06-11/MR Materials/About MR Studio.pdf`

Primary tabs:

| Tab | Purpose |
|---|---|
| Brand Pipeline | Add and manage new prospects going forward |
| Brand Audit Framework | Scoring framework for website, social, brand, and content opportunity |
| Audit Quality Checklist | Send-readiness rules for mini-audits |
| Leads | Legacy lead database from the website-refresh era |
| Mini Audits | Legacy generated audits and current longer audit copy |

## How To Add Potential Brands

Add every new brand to the `Brand Pipeline` tab first.

Minimum fields:

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

Recommended first status:
`New lead`

If the social angle matters but Instagram has not been reviewed yet, use:
`Needs Instagram review`

Do not mark a lead `Ready to send` until the audit has specific website/social examples.

## Pipeline Status Options

- New lead
- Needs website review
- Needs Instagram review
- Audit drafted
- Ready to send
- Sent
- Follow up
- Paused
- Not a fit

## Priority Options

- A - high fit
- B - possible fit
- C - low fit
- Hold

Use `A - high fit` when the brand has:

- Clear visual/content potential
- A reachable decision maker or contact path
- Obvious website, social, or brand opportunity
- A natural fit for one of Lift's service offers

## Offer Options

Use the smallest logical paid next step:

- Mini-Audit
- Starter Content Kit
- Growth Content Kit
- Content Bank + Brand/Social Direction
- Website + Brand Refresh Add-On
- Growth Content Kit + Brand/Social Direction

Do not default every prospect to website refresh. If the website is fine but social/brand/content is weak, lead with content.

## Audit Types

- Website only
- Social only
- Brand only
- Website + Social
- Website + Social + Brand

Most high-fit prospects should be `Website + Social + Brand`.

## Current Priority Prospects

### Morning Fuel - Mechanicsburg

Best angle:
Website + Social Content Growth Kit

Why:
Strong breakfast/brunch/coffee concept with clear visual content potential. Specialty Guatemalan coffee, menu favorites, and Mechanicsburg local discovery can become a stronger content system.

Next step:
Review Instagram manually, then send the existing mini-audit plus lookbook.

### Model Behavior Beauty Bar

Best angle:
Growth Content Kit + Brand/Social Direction

Why:
Website has service depth and proof, but user flagged Instagram/general branding as needing major work. This is likely a stronger content and brand consistency opportunity than a website problem.

Next step:
Manual Instagram review. Pull specific examples before sending anything.

### Knock Knock Boutique

Best angle:
Content Bank + Brand/Social Direction

Why:
Brand has personality, product concepts, founder story, permanent jewelry, events, reviews, and a style quiz. The opportunity is turning that charm into clear shop paths and repeatable content series.

Next step:
Manual Instagram review. Build audit around Jewel Box personas, permanent jewelry, gifting, events, and store visits.

## Audit Workflow

1. Add the brand to `Brand Pipeline`.
2. Do a quick website review.
3. Do a quick Instagram/social review if pitching any content or brand help.
4. Score the brand using `Brand Audit Framework`.
5. Draft a mini-audit using `audit_template.md`.
6. Pick the strongest offer angle.
7. Decide whether the prospect needs:
   - Written mini-audit only
   - Mini-audit + general Lift overview
   - Mini-audit + custom mockup/lookbook
8. Mark the row `Ready to send` only when examples are specific.

## What A Good Mini-Audit Includes

- What is already working
- One specific website or social friction point
- Why it matters for bookings, visits, orders, inquiries, trust, or sales
- One concrete quick win
- 3-5 content opportunities tied to actual offers/differentiators
- Recommended Lift offer
- Clear next step

## Send Rule

If the audit says anything about Instagram, social content, branding, or visual consistency, the social profile must be manually reviewed first.

No generic "your social needs work" outreach.

## Useful Prompt

Run this in Claude with web access:

```text
Audit [Business Name] for Lift Studio.

Website: [URL]
Instagram: [URL]
Location/category: [details]

Review the website, Instagram, and any obvious public profile/review information. I need a prospect-specific mini-audit that evaluates:

1. What is already working
2. Website first impression
3. Social first impression
4. Brand clarity
5. Content opportunities
6. Trust proof
7. Quick wins
8. Best-fit Lift offer
9. Send-ready outreach angle

Be specific. Use actual pages, posts, visible profile details, service names, product names, or website copy. Do not give generic marketing advice.
```
