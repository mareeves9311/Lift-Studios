# Lift Studio — Operating Status

Last updated: 2026-06-16 (updated with live URL)

---

## 1. Current Repo State

- Canonical workspace: `/Users/meganreeves/Documents/Projects/Lift Studio`
- Branch: `main`
- Working tree is clean as of commit `9803528`

**Commits completed today:**

| Commit | SHA | What changed |
|---|---|---|
| Repo cleanup | `7ad3459` | Removed 4 old-named duplicate folders and stale zip; moved 2 stray scripts to `automation/`; archived old Kit 1 meta files |
| Add STATUS.md | `4c498bc` | Created this file; added pointer to it in `CLAUDE.md` |
| File rename | `b023b01` | Renamed `mr_studio_outreach_attachment_v2_copy.md` → `lift_studio_outreach_attachment_v2_copy.md` |
| Brand identity | `3012de8` | Updated `naming_and_positioning.md`, `README.md`, `revised_service_menu_for_brand_book.md`, `service_pricing_overview.md`, and the renamed outreach attachment to Lift Studio |
| Handoff briefs | `d440ab4` | Updated `claude_code_handoff_brief.md`, `codex_handoff_brief.md`, `system_flow.md`, `audit_to_design_prompt.md` to Lift Studio; retained "formerly MR Studio" provenance in handoff briefs |
| Client deliverables | `9803528` | Updated Lift Studio attribution in Knock Knock Boutique and Morning Fuel audit, design brief, audit prompt, and workflow files |

## 2. Current Operating Priorities

In order:

1. **Live website URL confirmed** — `https://helloliftstudio.netlify.app/`
2. **First Gmail outreach batch drafted** — 29 revised drafts created in `helloliftstudio@gmail.com` from the pipeline/outreach list using the subject format `One thing I noticed about [Brand]`; each draft includes a specific hook, two audit-style observations, the live Lift Studio hyperlink, and the Lift Studio service menu PDF
3. **Gmail signature asset added** — use `assets/lift-studio-gmail-signature.html` for future Lift outreach drafts; append only the signature table block, not the full HTML document wrapper
4. **Email marketer agent added** — use `agents/email_marketer.md` for Lift outbound draft workflow, including template, signature, attachment, verification, and caveat rules
5. **New business auditor agent added** — use `agents/new_business_auditor.md` for local prospect research, audit scoring, lead qualification, and master sheet population before outreach
6. **Follow-up pipeline manager agent added** — use `agents/follow_up_pipeline_manager.md` for reply monitoring, response classification, follow-up drafts, bounce handling, and pipeline hygiene
7. **Agent operating system added** — use `agents/OPERATING_SYSTEM.md` to coordinate the full workflow across prospecting, drafting, review/send, reply monitoring, and escalation
8. **Orchestrator agent added** — use `agents/orchestrator.md` to manage agent routing, handoffs, system checks, bottlenecks, and next-best actions
9. **Content bank added** — general Lift visual assets live under `content-bank/images/` rather than the repo root
10. **Resolve held MR Studio items** — four items from the brand cleanup pass were intentionally deferred (see Section 3)

## 3. Known Open Decisions

| Decision | Status |
|---|---|
| Live website URL | https://helloliftstudio.netlify.app/ — confirmed |
| `brand-images/` vs `site/lift-studio-images/` duplication (same 7 PNGs) | Flagged; do not resolve yet |
| Git/email identity for Lift Studio commits | `helloliftstudio@gmail.com` |
| Outreach batch 1 send date | Not scheduled |

**Held MR Studio cleanup items (from brand cleanup pass, 2026-06-16):**

| Item | File | Decision needed |
|---|---|---|
| A | `content-growth-kit/drive_links_manifest.md` | References MR Studio-named Google Drive files — update text now, or wait until Drive files are also renamed? |
| B | `content-growth-kit/lift_brand_audit_system_v2.md` line 32 | Stale Desktop path to `About MR Studio.pdf` — update to `site/_lift-brand/About Lift Studio.pdf`? |
| C | `claude-cowork-upload/mr-before-after/index.html` | Demo page still branded "MR Studio · Before & After Study" — rebrand to Lift Studio or leave as historical snapshot? |
| D | `claude-cowork-upload/mr-before-after/` folder name | Rename to `lift-before-after/` or leave as-is? |

## 4. Do-Not-Touch Warnings

- **Do not add AdviseHer files here.** AdviseHer lives at `/Users/meganreeves/Documents/Projects/AdviseHer`. It is a separate project.
- **Do not add AMP3 files here.** Lift Studio is its own workspace.
- **Do not delete `brand-images/` or `site/lift-studio-images/`** until the duplication question is resolved and you have confirmed which location is canonical.
- **Do not send outreach drafts automatically.** Drafts should be reviewed in Gmail before sending.
- **Do not edit `claude-cowork-upload/` or `claude-cowork-upload-2/`** without explicit approval — these are historical snapshots. Held items C and D above are the only pending exceptions.
- **Do not merge old MR Studio / Web Refresh Co. files without checking** whether an updated Lift Studio version already exists in `content-growth-kit/` or `automation/`.

## 5. Next Recommended Action

**Review Gmail drafts for outreach batch 1.**

The live URL is confirmed and should be used anywhere the old placeholder appeared:

`https://helloliftstudio.netlify.app/`

Drafts include the Lift Studio service menu PDF from `site/_lift-brand/`. Rows without public email addresses still need contact-form or manual outreach.
