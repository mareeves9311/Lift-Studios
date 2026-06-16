# Lift Studio — Operating Status

Last updated: 2026-06-16

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

1. **Confirm live website URL** — `site/index.html` exists but no deployment is confirmed; the placeholder `[Lift Studio website link]` appears in all outreach drafts and must be filled before sending
2. **Send first outreach batch** — drafts are ready in `automation/lift_studio_wide_outreach_drafts_2026-06-16.md`; do not send until website URL is confirmed
3. **Resolve held MR Studio items** — four items from the brand cleanup pass were intentionally deferred (see Section 3)

## 3. Known Open Decisions

| Decision | Status |
|---|---|
| Live website URL / deployment target | Not confirmed |
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

- **Do not add AdviseHer files here.** AdviseHer lives at `/Users/meganreeves/Desktop/Projects/recommendation-intel/` and related Desktop paths. It is a separate project.
- **Do not add AMP3 files here.** Lift Studio is its own workspace.
- **Do not delete `brand-images/` or `site/lift-studio-images/`** until the duplication question is resolved and you have confirmed which location is canonical.
- **Do not send outreach drafts** until `[Lift Studio website link]` placeholders are replaced with the confirmed live URL.
- **Do not edit `claude-cowork-upload/` or `claude-cowork-upload-2/`** without explicit approval — these are historical snapshots. Held items C and D above are the only pending exceptions.
- **Do not merge old MR Studio / Web Refresh Co. files without checking** whether an updated Lift Studio version already exists in `content-growth-kit/` or `automation/`.

## 5. Next Recommended Action

**Confirm the live Lift Studio website URL.**

Once the URL is confirmed:
1. Do a single find-and-replace of `[Lift Studio website link]` in `automation/lift_studio_wide_outreach_drafts_2026-06-16.md` and `automation/outreach_templates.md`
2. Add the URL to `README.md`
3. Update this file
4. Outreach batch 1 is then ready to send

If the site is not yet deployed, the deployment target decision (Netlify, GitHub Pages, custom domain) should be made first — the old Netlify site ID `c48dcab0-f87c-4474-a69b-b923730473ce` is archived in `_archive/cowork-upload-kit1-meta/` if needed for reference.
