# Website Facelift — Client Onboarding Guide

Last updated: 2026-06-23

---

## Discovery Call Questions

### Platform
- What platform is your site on? (Squarespace, WordPress, Webflow, Wix, Showit, custom/coded, other)
- Who built it originally — you, a freelancer, an agency?
- Do you have admin login access to the site right now?
- Is the site connected to a GitHub repo or deployed through Netlify/Vercel?

### Goals
- What's the #1 thing your website isn't doing well right now?
- What do you want visitors to do when they land on your homepage?
- Are there specific pages you know need the most work, or is it the whole site?
- Are you happy with your current branding (logo, colors, fonts), or is that on the table too?

### Content
- Do you have a blog or news section? Is it being used actively?
- Who writes copy for your site currently — you, a team member, no one?
- Do you have a library of brand photography, or do you rely on stock images?
- Are there products, services, or offerings on the site that are out of date?

### Business context
- Who is your target customer? Are they finding you through search, social, word of mouth, referrals?
- Do you have any SEO goals — specific keywords you want to rank for?
- Are there competitors whose websites you admire or are trying to outperform?
- Is there an upcoming launch, event, or season driving urgency on this?

### Technical
- Do you have Google Analytics or any tracking installed?
- Do you have a domain registrar separate from the site host?
- Are there third-party tools embedded in the site (booking, e-commerce, newsletter, chat)?

---

## What You Need From Them Before Starting

| Item | Why |
|---|---|
| Admin login to their CMS | Required for implementation on Squarespace/Wix/WordPress |
| GitHub repo access (if applicable) | Required for static site or Webflow-connected deployments |
| Webflow API token (if Webflow) | Required for API-based content updates |
| WordPress API credentials (if WordPress) | Required for REST API content edits |
| Brand asset folder | Logo files, fonts, color codes, existing photography |
| Copy of current sitemap or page list | Scope definition — what pages are in scope |
| Any existing style guide or brand guidelines | Avoid conflicts with established identity |

---

## Implementation Path by Platform

### Static site (GitHub + Netlify or Vercel)
**Full implementation.** Claude Code edits HTML/CSS/copy files directly, pushes to GitHub, site auto-deploys. No developer partner needed. Fastest and cleanest delivery path.

### Webflow
**Full implementation.** Use Webflow CMS API to update content, copy, and page structure. Requires their API token. Theme/CSS changes may require Webflow Designer access.

### WordPress
**Strong implementation.** REST API + auth token handles page and post content updates. CSS/theme changes require SFTP or a GitHub-connected theme repo. Works well for copy-layer facelifts.

### Squarespace
**Limited implementation.** No meaningful content API. Options:
- Their login + browser automation (Playwright) — possible but not the cleanest
- Deliver audit + copy doc + Canva mockup → coach them through edits in their own admin
- Recommend migration to a better stack if they're open to it

### Wix
**Limited implementation.** Same situation as Squarespace — closed platform, no real content API.

### Showit
**Direction only.** No API. Deliver copy + mockup, client or their designer implements in Showit.

### Custom / coded site
**Case by case.** Ask what language/framework. If it's on GitHub, full implementation is likely possible.

---

## Deliverables by Tier

### Tier 1 — Audit + Direction ($)
- Written website audit (copy, navigation, hierarchy, SEO gaps, imagery)
- Prioritized recommendations doc
- Canva mockup showing homepage concept
- Rewritten homepage copy
- Client implements or takes to their own developer

### Tier 2 — Audit + Copy + Implementation ($$)
- Everything in Tier 1
- Full copy rewrite: homepage, key landing pages, navigation labels, CTAs
- Direct implementation in their CMS (platform-dependent)
- One round of revisions

### Tier 3 — Full Facelift + Content Program ($$$)
- Everything in Tier 2
- Ongoing SEO/GEO blog content on a monthly cadence
- Internal linking strategy
- Google Analytics setup or audit
- Quarterly content review

---

## Platform Question to Ask Early

**"What platform is your site on?"** — ask this before scoping anything. It determines:
- Whether you can offer full implementation or direction only
- What access you'll need
- How long delivery will take
- Whether the project is even feasible within Lift's current stack

If they don't know: ask them to log into their site's backend and tell you what they see, or share the site URL so you can check the source (Squarespace and Webflow leave fingerprints in page source).

---

## Detecting Platform Without Asking

If the client doesn't know their platform, check:

- Right-click → View Page Source on their site
- Look for `cdn.squarespace.com` → Squarespace
- Look for `static.wixstatic.com` → Wix
- Look for `assets.webflow.com` → Webflow
- Look for `wp-content/` → WordPress
- Look for clean HTML with no CMS fingerprint → likely static or custom

---

## Red Flags to Catch Early

- Client doesn't have login access to their own site (previous agency holds it)
- Site is on a proprietary platform built by a local agency with no API or CMS access
- Client expects a full redesign but budget/scope is for a copy refresh
- Client has no brand photography — stock images will limit how good any facelift looks
- No clear goal for the site (hard to write copy without knowing what action visitors should take)
