# Lift Studio — Operating Status

Last updated: 2026-06-16

---

## 1. Current Repo State

- Canonical workspace: `/Users/meganreeves/Documents/Projects/Lift Studio`
- Branch: `main`
- Repo is clean as of commit `7ad3459` — duplicate folders (`MR Automation/`, `MR Content Growth Kit/`, old `Claude Cowork Upload - MR Studio Content Growth Kit/` folders) were verified and removed
- Unique meta files from old Kit 1 (`.claude/` session settings, `.netlify/` site state) were archived to `_archive/cowork-upload-kit1-meta/` before removal

## 2. Current Operating Priorities

In order:

1. **Make this repo an operating workspace** — STATUS.md, brand identity cleanup, and outreach-ready files before anything else
2. **Clean MR Studio references** — `content-growth-kit/naming_and_positioning.md` and related files still use "MR Studio" as the recommended brand name; needs to be updated to Lift Studio throughout
3. **Confirm live website URL** — `site/index.html` exists but no deployment is confirmed; the placeholder `[Lift Studio website link]` appears in all outreach drafts and must be filled before sending
4. **Send first outreach batch** — drafts are ready in `automation/lift_studio_wide_outreach_drafts_2026-06-16.md`; do not send until website URL is confirmed and MR Studio references are cleaned

## 3. Known Open Decisions

| Decision | Status |
|---|---|
| Live website URL / deployment target | Not confirmed |
| `brand-images/` vs `site/lift-studio-images/` duplication (same 7 PNGs) | Flagged; do not resolve yet |
| Git/email identity for Lift Studio commits | `helloliftstudio@gmail.com` |
| Outreach batch 1 send date | Not scheduled |

## 4. Do-Not-Touch Warnings

- **Do not add AdviseHer files here.** AdviseHer lives at `/Users/meganreeves/Desktop/Projects/recommendation-intel/` and related Desktop paths. It is a separate project.
- **Do not add AMP3 files here.** Lift Studio is its own workspace.
- **Do not delete `brand-images/` or `site/lift-studio-images/`** until the duplication question is resolved and you have confirmed which location is canonical.
- **Do not send outreach drafts** until `[Lift Studio website link]` placeholders are replaced with the confirmed live URL.
- **Do not merge old MR Studio / Web Refresh Co. files without checking** whether an updated Lift Studio version already exists in `content-growth-kit/` or `automation/`.

## 5. Next Recommended Action

**Clean MR Studio references throughout the repo.**

Primary file: `content-growth-kit/naming_and_positioning.md` — still lists "MR Studio" as the recommended brand name and sign-off. Update to Lift Studio throughout.

Secondary files to check and update in the same pass:
- `content-growth-kit/service_offer.md`
- `content-growth-kit/pricing.md`
- `content-growth-kit/service_pricing_overview.md`
- `content-growth-kit/mr_studio_outreach_attachment_v2_copy.md` (rename + update content)

After that: confirm website deployment target so the outreach placeholder can be filled.
