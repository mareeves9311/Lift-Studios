# Lift Studio Repo Consolidation Audit

Date: 2026-07-02

## Goal

Move Lift Studio repo ownership/use to the personal GitHub account `mareeves9311` and avoid mixing old/generated/export files into the canonical repo.

## Remote Repo Findings

There are two GitHub repos:

- Current local remote: `https://github.com/megan319/Lift-Studios.git`
- Personal account repo: `https://github.com/mareeves9311/Lift-Studios.git`

These are not conflicting forks. The personal repo is behind the work-account repo.

Remote history:

- `megan319/Lift-Studios` HEAD: `338ef97`
- `mareeves9311/Lift-Studios` HEAD: `122eed0`
- `mareeves9311/main` is an ancestor of `megan319/main`
- Commits present only on `megan319/main`:
  - `338ef97` update: follow-up drafting protocol, threaded replies + SEO hook
  - `70dd158` fix: update GitHub repo URLs from mareeves9311 to megan319
  - `7b3d848` fix: update Apps Script endpoint URL in STATUS.md and scheduled_routines.md

Tracked file-tree difference between the two remote repos is small:

- `STATUS.md`
- `agents/follow_up_pipeline_manager.md`
- `automation/scheduled_routines.md`

Conclusion: the GitHub-side consolidation can be done by pushing the newer local history to `mareeves9311/Lift-Studios`. A GitHub ownership transfer is blocked only because the destination repo already exists.

## Local Working Tree Findings

Current local folder has many uncommitted changes:

- 188 tracked files
- 304 untracked files
- Several large generated/export folders

Important tracked change:

- `site/_lift-brand/About Lift Studio.pdf` is deleted locally. It is a large historical PDF in the remote. Decide whether to keep it in GitHub, move it to Drive only, or leave the deletion in the cleanup commit.

Major untracked/generated groups:

- `Lift Studio Brand Kit/` - Canva-ready exports, fonts, PDFs, PPTX, icons
- `Lift Studio Brand Kit - archived wrong prompt 20260701-223659/` - wrong-prompt archive, local-only
- `.tmp_master_upload/` - temporary render assets, should be deleted locally
- `audits/` - generated audit artifacts and client/prospect outputs
- `Lift Studio.html` - standalone exported site bundle
- `assets/Lift Logo*.png`, `assets/Lift Studio *.pdf/png` - official brand source assets, likely keep
- `scripts/` - brand-kit generation scripts, likely keep if exports are generated from source
- `chatgpt-knowledge/`, `skills/`, `templates/` - active operational knowledge/skill scaffolding, likely keep after review
- `Lift-Studio-github-upload-2026-06-17.zip` - old upload bundle, local-only/delete candidate

## Recommended Keep / Ignore / Archive Split

### Keep In GitHub

Keep small source-of-truth and operational files:

- `ACTIVE_INSTRUCTIONS.md`
- `README.md`
- `STATUS.md`
- `agents/`
- `automation/`
- `content-growth-kit/`
- `site/`
- `site/_lift-brand/LIFT_BRAND_REFERENCE.md`
- `site/_lift-brand/LIFT_SERVICES_REFERENCE_V3.md`
- `chatgpt-knowledge/`
- `skills/`
- `templates/`
- `scripts/`
- Official logo/source assets in `assets/`, if small and actively used

### Keep In Drive/Canva Or Local Archive, Not GitHub

- `Lift Studio Brand Kit/` generated exports
- `Lift Studio Brand Kit.zip`
- `Lift Studio Brand Kit - archived wrong prompt 20260701-223659/`
- `.tmp_master_upload/`
- `Lift-Studio-github-upload-2026-06-17.zip`
- Large PDFs/PPTX generated from Canva
- Client/prospect audit exports unless intentionally keeping audit examples in repo

### Needs Decision

- `audits/`: useful working output, but may include client/prospect assets, screenshots, and generated PDFs. Recommend either:
  - keep only markdown/source audit templates and final text outputs, or
  - move full audit artifacts to Drive and ignore `audits/` in GitHub.
- `site/_lift-brand/About Lift Studio.pdf`: historical and large. Recommend Drive/archive only unless a live process still attaches it.

## Recommended Consolidation Sequence

1. Do not transfer repo ownership through GitHub. The destination repo already exists and is simply behind.
2. Create a cleanup branch locally, for example `repo-consolidation`.
3. Update `.gitignore` for generated/local-only folders before staging:
   - `.tmp_master_upload/`
   - `Lift Studio Brand Kit/`
   - `Lift Studio Brand Kit - archived wrong prompt */`
   - `audits/` if artifacts should live outside GitHub
4. Stage only source-of-truth updates and small operational files.
5. Commit the v3 brand/menu/domain updates separately from any cleanup/deletion commit.
6. Re-authenticate GitHub CLI or Git credentials to `mareeves9311`.
7. Update remote:
   - `git remote set-url origin https://github.com/mareeves9311/Lift-Studios.git`
8. Push branch first:
   - `git push -u origin repo-consolidation`
9. Review on GitHub, then merge to `main`.
10. After successful merge, update any raw GitHub URLs in routines/automation from `megan319` to `mareeves9311`.

## Safest Immediate Action

Before pushing anything:

- Keep the current local folder intact.
- Create a branch.
- Add ignore rules for generated exports.
- Commit only the cleaned source files.

This avoids polluting the personal repo with wrong-prompt archives, large local exports, and temporary files.
