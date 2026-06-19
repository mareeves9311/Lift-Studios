# Lift Studio Twice-Daily Outreach Batch

You are running the Lift Studio daily outbound workflow unattended.

Canonical repo:

`/Users/meganreeves/Documents/Projects/Lift Studio`

## Goal

This workflow runs twice per day:

- Morning run: prepare a fresh batch for Megan to review by 8:00 a.m. America/New_York.
- Midday run: prepare a second fresh batch for Megan to review by 1:00 p.m. America/New_York.

For the current run, prepare:

1. **10 new audited brands** added or updated in the Lift Studio Master Pipeline.
2. **10 new cold outreach Gmail drafts** ready for Megan to review/send.

The midday run must create 10 additional drafts for different brands than the morning batch. Do not redraft the same prospects unless the earlier draft failed or was explicitly discarded.

Do not send any emails.

## Required Agent Order

1. Read `STATUS.md`.
2. Read `agents/OPERATING_SYSTEM.md`.
3. Use `agents/orchestrator.md` to coordinate.
4. Use `agents/new_business_auditor.md` to find/audit/add 10 brands.
5. Confirm the New Business Auditor marked draftable rows as `Ready to Draft` with `Next Action: Email Marketer: draft first-touch outreach`.
6. Use `agents/email_marketer.md` to consume that ready queue and write/check `Subject` and `Outreach Draft` copy. Do not create Gmail draft objects directly.
7. Verify Apps Script created Gmail drafts and updated rows to `Drafted` with `Next Step: Megan review/send`.
8. Use `agents/SIGNATURE_RENDERING_RULES.md` when verifying the Apps Script-generated Gmail drafts.
9. Use `agents/follow_up_pipeline_manager.md` only to note any obvious reply/bounce monitoring needs; do not run an extended inbox audit unless the lead/draft task is complete.
10. Use `agents/quality_control.md` for uncertainty flags if that file exists.

## Sources And Tools

Use:

- Google Sheets / Drive connector for the Lift Studio Master Pipeline:
  `https://docs.google.com/spreadsheets/d/1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8/edit`
- Gmail connector for `helloliftstudio@gmail.com`.
- Web search for current local prospect discovery and public business details.
- Repo files under `/Users/meganreeves/Documents/Projects/Lift Studio`.

If any connector is unavailable, create a dated report under:

`automation/daily-runs/YYYY-MM-DD-morning.md` or `automation/daily-runs/YYYY-MM-DD-midday.md`

and clearly state what blocked the run.

## Prospecting Targets

Prioritize Central PA:

- Hershey
- Harrisburg
- Palmyra
- Hummelstown
- Middletown
- Mechanicsburg
- Camp Hill
- Elizabethtown
- Lancaster
- York
- Carlisle
- Lebanon
- Annville

Categories to rotate:

- Med spas
- Facial spas / estheticians
- Salons
- Cosmetic dentists
- Wellness providers
- Florists
- Wedding photographers
- Interior designers
- Boutiques / gift shops
- Bakeries / dessert shops
- Coffee shops
- Restaurants with visual/social potential
- Real estate agents and teams
- Home staging / home organization
- Boutique fitness / pilates / yoga

## Audit Requirements For The 10 New Brands

Each added/audited brand should have:

- Business name
- Website if available
- Instagram/social if available
- Category
- City/location
- Source URL or search source
- Contact path: email, contact form, Instagram, or phone
- Priority: A/B/C/Hold
- Pipeline status
- Main opportunity
- SEO/local discovery note
- Website/UX note
- Social/content note if relevant
- Recommended Lift offer
- Draft angle / outreach angle
- Date added or updated

Use column names rather than fixed positions when updating sheets.

Avoid duplicates by checking:

- Business name
- Website domain
- Email
- Instagram handle
- Phone when available

## Copy + Draft Requirements For The 10 Emails

Write/check copy for 10 outreach rows, then verify Apps Script creates the Gmail drafts. Never send.

The Email Marketer should draft from the Auditor's automatic handoff queue first:

- `Pipeline Stage`: `Ready to Draft`
- `Next Action`: `Email Marketer: draft first-touch outreach`
- Priority: `A - High` or `B - Possible`
- Valid email address exists
- Specific audit notes are populated

Copy and draft format:

- Subject: `One thing I noticed about [Brand Name]`
- Body follows `agents/email_marketer.md`
- `Lift Studio` is hyperlinked to `https://helloliftstudio.netlify.app/`
- Apps Script attaches the Google Drive service menu PDF.
- Apps Script embeds the tested `LIFT_STUDIO_HTML_SIGNATURE_` from `automation/live_apps_script_sync/OutreachAutomation.gs`.

Do not create Gmail draft objects directly through the Gmail connector. If the Apps Script signature rendering cannot be verified, use the fallback from `agents/SIGNATURE_RENDERING_RULES.md` and note that in the report.


## Daily Report

Always write a dated report:

`automation/daily-runs/YYYY-MM-DD-morning.md` or `automation/daily-runs/YYYY-MM-DD-midday.md`

Use the scheduled run metadata at the top of the prompt to determine the run slot:

- `morning`
- `midday`

Include:

- Run date and start/end time
- Run slot: `morning` or `midday`
- 10 brands added/audited
- 10 drafts created
- Confirmation that the brands/drafts are unique to this run and not duplicates from the other same-day batch
- Any skipped leads and why
- Any QC flags
- Any connector issues
- Any follow-up/bounce notes noticed
- Next recommended action for Megan

## Notification Owner

The Orchestrator Agent owns the final daily notification.

At the end of the run, the Orchestrator should make the daily report answer these questions clearly:

- Are the 10 drafts ready for Megan to review/send?
- Which 10 brands were newly added or audited?
- Were any brands/drafts blocked or flagged to QC?
- What should Megan do next?

The local scheduler may also show a macOS notification after the run completes, but the Orchestrator is the agent responsible for the actual readiness summary.

## Safety Rules

- Do not send emails.
- Do not delete drafts.
- Do not make legal, financial, or client commitments.
- Do not invent rankings, reviews, awards, names, emails, or metrics.
- Use only public business contact information.
- If uncertain, flag to QC or hold the lead.
- Do not modify unrelated repo files.
