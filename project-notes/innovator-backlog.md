# Lift Studio Innovator Backlog

Running log of all opportunity briefs surfaced by the Innovator agent. Updated after each observation pass or trigger event.

Status labels: `Open` / `In progress` / `Accepted` / `Declined` / `Revisit later`

See `agents/innovator.md` for the brief format, scoring rubric, and observation cadence.

---

## Open Opportunities

### INN-001 — Google Apps Script time triggers
**Date:** 2026-06-17
**Category:** Tool unlock
**Priority score:** 11/12
**Status:** Accepted

**Opportunity:** The system previously depended on the Mac being on for scheduled batch runs via LaunchAgent. Google Apps Script time-based triggers now run the core scheduled work in Google's cloud.

**Evidence:** Confirmed current active scripts are `automation/live_apps_script_sync/` and `automation/gmail_outreach_automation.gs`; the old LaunchAgent path is no longer the source of truth. (Validated)

**What changes:** Batches run on schedule regardless of whether the Mac is on. Megan does not need to be home or have her laptop awake for the system to process leads and create drafts.

**What it takes:** Done for the core schedule. Remaining maintenance should use the current sheet ID: `1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8`.

**Recommended next step:** Keep triggers monitored from Apps Script. Do not restore the archived LaunchAgent workflow unless explicitly needed.

---

### INN-002 — Canva MCP for proof-of-work assets
**Date:** 2026-06-17
**Category:** Tool unlock
**Priority score:** 10/12
**Status:** Open

**Opportunity:** Warm leads who ask "what would you specifically do for us?" currently require manual proof-of-work production. The Canva MCP is available and unused in the environment. A one-page visual mini-audit template in Canva, auto-populated from the New Business Auditor's notes, would turn a 45-minute manual response into a 5-minute automated asset.

**Evidence:** Tool capability confirmed (Canva MCP is in the available tools list). Pipeline behavior is hypothesis — based on the expected warm-lead pattern, not yet validated by actual replies. (Pattern / Hypothesis)

**What changes:** Warm-lead responses go from "we'll send you something" to delivering a polished one-pager in the same session. Higher conversion likelihood at the reply stage.

**What it takes:** Medium. One Canva template needs to be created and approved. Then an agent (or the Proof-of-Work Builder when it exists) can call the Canva MCP to populate it from audit notes. Brand kit setup in Canva is a prerequisite.

**Recommended next step:** Review whether Lift Studio has a Canva brand kit set up. If not, set one up first. Then design a one-page audit template with placeholders matching the audit note fields (website observation, Instagram observation, recommended offer, quick win).

---

### INN-003 — Proof-of-Work Builder agent
**Date:** 2026-06-17
**Category:** New agent
**Priority score:** 10/12
**Status:** Open

**Opportunity:** Warm leads asking for specific ideas represent the highest-conversion moment in the pipeline. No agent currently owns this step. A Proof-of-Work Builder agent — even a minimal version that generates a structured brief from audit notes and formats it as a one-pager prompt for Canva or Gamma — would capture this moment without adding Megan's time.

**Evidence:** Proof-of-work is already listed as a future agent in `agents/orchestrator.md`. The Orchestrator currently handles this manually when the agent doesn't exist. (Pattern — confirmed by reviewing agent architecture)

**What changes:** Warm lead requests get an automated response path. Megan reviews a finished asset rather than producing one.

**What it takes:** Medium. A new agent spec (`agents/proof_of_work_builder.md`), triggered by the Follow-Up Manager when a lead is classified as `Replied - interested`. The agent uses audit notes + Canva or Gamma MCP to produce an asset draft. Megan reviews before sending.

**Recommended next step:** Draft `agents/proof_of_work_builder.md` when the first warm lead comes in that would benefit from a custom asset. Use that first real case to define the template.

---

### INN-004 — Faceless content for inbound leads
**Date:** 2026-06-17
**Category:** New channel
**Priority score:** 9/12
**Status:** Open

**Opportunity:** Cold outbound email is the only current lead channel. A faceless short-form content account showing before/after website and content audits for local businesses would generate inbound interest from exactly the right audience — business owners who see the content and want the same thing done for their brand. HIggsfield and Runway are available for video generation.

**Evidence:** Hypothesis based on tool availability and content category fit. Not yet validated by audience testing. (Hypothesis)

**What changes:** Inbound leads arrive without outbound effort. Over time, this channel could reduce the batch volume required from cold outreach.

**What it takes:** High initially. Requires: channel strategy decision (which platforms), content format decisions (before/after format, voiceover or not), a posting cadence, and at least 3–5 test pieces to see if the format resonates. HIggsfield/Runway can generate video assets from text prompts but creative direction is still manual.

**Recommended next step:** Treat as a test — pick one lead from the pipeline that had strong before/after audit notes, produce one short video showing the problem and the fix (30–45 seconds), post once, and observe. Do not commit to a channel strategy until the test produces signal.

---

### INN-005 — Automated daily run reports committed to repo
**Date:** 2026-06-17
**Category:** Automate
**Priority score:** 9/12
**Status:** Open

**Opportunity:** Batch run reports are currently only committed to the repo when the Mac is available. A GitHub Actions workflow triggered by a webhook from Google Apps Script would commit daily run reports automatically, keeping the repo current as a system-of-record regardless of the Mac state.

**Evidence:** Tool capability confirmed (GitHub Actions is available for this repo). Current run report path `automation/daily-runs/` exists as the target. (Pattern)

**What changes:** The repo always reflects what the system actually ran. Audit trail is automatic. Megan can check the repo from anywhere to see what happened.

**What it takes:** Medium. A simple GitHub Actions workflow file (`.github/workflows/commit-run-report.yml`) triggered by a repository dispatch event. The Apps Script `onComplete` function would call the GitHub API to fire the dispatch. This requires adding a GitHub personal access token to Apps Script properties.

**Recommended next step:** Implement INN-001 first (Apps Script triggers). Then add the GitHub dispatch call to the existing scripts' run-report output blocks.

---

### INN-006 — Vibiz MCP: fully untapped outreach and research platform
**Date:** 2026-06-17
**Category:** Tool unlock
**Priority score:** 10/12
**Status:** Open

**Opportunity:** A comprehensive B2B outreach and marketing platform is available via MCP but currently completely unused. Vibiz includes: lead finding (`vibiz_find_leads`), lead enrichment (`vibiz_enrich_lead`), account research (`vibiz_research_account`), outreach drafting (`vibiz_draft_outreach`), ICP generation (`vibiz_generate_icps`), competitor finding (`vibiz_find_competitors`), social analytics (`vibiz_analytics_daily_metrics`, `vibiz_analytics_top_posts`), social publishing (`vibiz_social_publish`), inbox management for replies and DMs, and ad campaign management across Meta, TikTok, LinkedIn, and more.

**Evidence:** Tool availability confirmed via MCP tool list. None of these tools appear in any current agent file or workflow. (Validated — tool exists, usage is zero)

**What changes:** Depending on which subset is adopted: (1) `vibiz_find_leads` + `vibiz_enrich_lead` could supplement or replace the New Business Auditor's manual web search process. (2) `vibiz_research_account` could deepen audit notes automatically. (3) `vibiz_draft_outreach` could assist the Email Marketer with personalized draft generation. (4) `vibiz_social_publish` could automate the faceless content channel (INN-004). (5) `vibiz_analytics_top_posts` could surface what content is working for target clients, improving audit hooks.

**What it takes:** Low to medium, depending on scope. The first unlock — testing `vibiz_find_leads` and `vibiz_enrich_lead` for one city/category — is a single session with no build required.

**Recommended next step:** Top up credits in the Vibiz account (approximately 1 credit per 10 leads). The Lift Studio workspace has been created (`lift-studio-1781702506739235514`) and the first search is configured: Med Spas in Pennsylvania, validated emails, owner/founder/director titles, 1–50 employees, 50 leads. Run it as soon as credits are available and compare output quality against the auditor's current manual process.

---

## Resolved Opportunities

None yet.

---

## Declined Opportunities

None yet.

---

## Revisit Later

None yet.
