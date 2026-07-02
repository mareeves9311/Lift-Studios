# GitHub Cross-Repo Diagnostic

Date: 2026-07-02

Scope:

- Lift Studio
- AdviseHer / Advisor
- GitHub account consolidation from `megan319` to `mareeves9311`

## Current GitHub Auth State

GitHub CLI is still pointed at `megan319`, but the token is invalid.

```text
Failed to log in to github.com account megan319
```

This means private/transferred repos cannot be reliably inspected or pushed from the terminal until GitHub CLI is re-authenticated as `mareeves9311`.

Recommended auth reset:

```bash
gh auth logout -h github.com -u megan319
gh auth login -h github.com
```

During login, use the personal GitHub account associated with `mareeves93@gmail.com`.

## Lift Studio Diagnostic

### Local Repo

Local path:

```text
/Users/meganreeves/Documents/Projects/Lift Studio
```

Current local remote:

```text
origin https://github.com/megan319/Lift-Studios.git
```

Branch:

```text
main
```

Local working tree status:

- 28 modified/deleted tracked files
- 27 top-level untracked groups
- Many generated/export artifacts present locally

### Remote Repo Comparison

Known reachable repos:

- `https://github.com/megan319/Lift-Studios.git`
- `https://github.com/mareeves9311/Lift-Studios.git`

Observed remote heads:

- `megan319/Lift-Studios`: `338ef97`
- `mareeves9311/Lift-Studios`: `122eed0`

Ancestry:

- `mareeves9311/main` is an ancestor of `megan319/main`
- `megan319/main` is not an ancestor of `mareeves9311/main`

Conclusion:

The personal repo is not a conflicting separate project. It is behind the newer Lift Studio history by three commits.

Commits present in `megan319/Lift-Studios` but not currently visible in `mareeves9311/Lift-Studios`:

- `338ef97` update: follow-up drafting protocol, threaded replies + SEO hook
- `70dd158` fix: update GitHub repo URLs from mareeves9311 to megan319
- `7b3d848` fix: update Apps Script endpoint URL in STATUS.md and scheduled_routines.md

### Lift Studio Local Cleanup Findings

Important current local work:

- New domain references: `https://helloliftstudio.com/`
- New Canva v3 menu/service source
- Updated service offer vocabulary
- Updated automation/agent prompts

Generated/local-only artifacts that should not be blindly pushed:

- `Lift Studio Brand Kit/`
- `Lift Studio Brand Kit - archived wrong prompt 20260701-223659/`
- `.tmp_master_upload/`
- `Lift Studio Brand Kit.zip`
- `Lift Studio Brand Kit/Lift Studio Brand Kit - Master Canva Upload.*`
- `Lift-Studio-github-upload-2026-06-17.zip`
- Large generated PDFs/PPTX unless intentionally tracked

Decision needed:

- `audits/`: contains real prospect/client-style audit outputs and screenshots. Recommend Drive/Canva/local archive unless intentionally using GitHub as audit artifact storage.
- `site/_lift-brand/About Lift Studio.pdf`: currently deleted locally. It is a large historical PDF. Recommend keeping it outside GitHub unless an automation still attaches it.

## AdviseHer / Advisor Diagnostic

### Local Repo

Local path:

```text
/Users/meganreeves/Documents/Projects/AdviseHer
```

Current local remote:

```text
origin https://github.com/mareeves9311/AdviseHer.git
```

Branch:

```text
main
```

Local branch status:

```text
main 5a1613f [origin/main] Fix stale repo path in status command
```

Local working tree:

- No modified tracked files
- 3 untracked files

Untracked files:

- `AdviseHer Investor Deck.html` - about 953 KB
- `AdviseHer.pptx` - about 913 KB
- `docs/deck-evolution-design-brief-2026-06-25.md` - about 22 KB

Tracked repo shape:

- 92 tracked files
- Main source-of-truth docs live in `docs/`
- Evidence and source indexes exist
- `docs/source-of-truth-index.md` is well-developed and identifies the canonical repo
- Largest tracked file is about 152 KB, so the committed repo is not bloated

Conclusion:

AdviseHer is already much cleaner than Lift Studio. The local repo appears structurally sound. The only immediate decision is whether the investor deck HTML/PPTX should be committed or stored in Canva/Drive with only the design brief tracked.

## Recommended Consolidation Path

### Step 1: Fix GitHub Auth

Re-authenticate as `mareeves9311` before any push:

```bash
gh auth logout -h github.com -u megan319
gh auth login -h github.com
```

### Step 2: Lift Studio Cleanup Branch

Create a branch before changing remotes:

```bash
cd "/Users/meganreeves/Documents/Projects/Lift Studio"
git switch -c repo-consolidation
```

Add `.gitignore` rules for generated/local-only folders before staging.

Recommended ignore additions:

```gitignore
.tmp_master_upload/
Lift Studio Brand Kit/
Lift Studio Brand Kit - archived wrong prompt */
audits/
*.pptx
*.pdf
*.xlsx
```

Exception: if specific source PDFs or logo assets must be tracked, add them deliberately with `git add -f`.

### Step 3: Stage Lift Studio Source Changes Only

Good candidates to commit:

- `ACTIVE_INSTRUCTIONS.md`
- `README.md`
- `STATUS.md`
- `agents/`
- `automation/`
- `content-growth-kit/`
- `site/_lift-brand/LIFT_BRAND_REFERENCE.md`
- `site/_lift-brand/LIFT_SERVICES_REFERENCE_V3.md`
- `chatgpt-knowledge/`
- `scripts/`
- `skills/`
- `templates/`
- small official logo assets if needed

Do not stage generated brand kit folders, wrong-prompt archives, temp renders, zips, or full audit output folders unless explicitly needed.

### Step 4: Point Lift Studio To Personal Repo

Only after cleanup commit:

```bash
git remote set-url origin https://github.com/mareeves9311/Lift-Studios.git
git push -u origin repo-consolidation
```

Review the PR/branch on GitHub, then merge.

### Step 5: AdviseHer Decision

For AdviseHer:

- Commit `docs/deck-evolution-design-brief-2026-06-25.md`
- Keep `AdviseHer Investor Deck.html` and `AdviseHer.pptx` outside GitHub unless they are required source deliverables
- Optionally add `*.pptx` and generated deck HTML files to `.gitignore`

### Step 6: Update Old URLs After Merge

Once Lift Studio is merged into `mareeves9311`, update any live raw GitHub references in routines/automation from `megan319` to `mareeves9311`.

Do this only after the personal repo has the newer files, or cloud routines may fetch stale instructions.

## High-Level Recommendation

- Treat `mareeves9311` as the canonical account.
- Do not use GitHub transfer for Lift Studio now. The destination repo already exists and is simply behind.
- Push a cleaned consolidation branch from local Lift Studio into `mareeves9311/Lift-Studios`.
- Keep generated creative exports in Canva/Drive, not GitHub.
- Keep AdviseHer mostly as-is, with only a small decision around deck artifacts.
