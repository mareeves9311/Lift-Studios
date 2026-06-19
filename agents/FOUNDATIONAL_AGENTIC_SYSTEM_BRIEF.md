# Lift Studio Foundational Agentic System Brief

This is the grounding document for the Lift Studio agent system. It defines the agents, the automation layers, the sheet/Gmail handoffs, and the intended closed-loop operating model.

Use this file before changing any agent, Apps Script automation, dashboard logic, or outreach workflow.

## Core Principle

The Lift Studio system is not a set of independent assistants. It is a staged outbound operating system.

Each agent owns a specific job. The Google Sheet is the shared state layer. Apps Script is the reliable background executor. Claude/Codex sessions and scheduled routines provide judgment, strategy, writing, research, and repair.

The system should reduce Megan's manual role to:

- choosing strategy and target direction,
- reviewing/sending outbound emails,
- responding to genuinely judgment-heavy flags,
- approving major system changes,
- and handling relationship moments that should stay human.

The system should not require Megan to babysit routine state reconciliation, draft creation, status updates, inbox labeling, or next-action logic.

## Source-Of-Truth Architecture

### Repository

Local repo:

`/Users/meganreeves/Documents/Projects/Lift Studio`

GitHub repo:

`https://github.com/mareeves9311/Lift-Studios`

The repo stores:

- active agent instructions,
- production Apps Script source,
- dashboard/source website files,
- system documentation,
- service menu source PDF,
- project notes and backlog.

### Google Sheet

Active spreadsheet:

`https://docs.google.com/spreadsheets/d/1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8/edit`

Important tabs:

- `Pipeline`: backend/source-of-truth tab for automation and dashboard.
- `Working Pipeline`: human-facing simplified view.
- `Outreach Drafts`: copy review surface.
- `Follow Up Schedule`: support/reporting tab.
- `Mini Audits Archive`: audit history.
- `Research Queries`: lead-search planning/support.

Verified current sheet tabs as of 2026-06-18: `Working Pipeline`, `Pipeline`, `Outreach Drafts`, `Research Queries`, `Dashboard`, `Start Here`, `Follow Up Schedule`, `Mini Audits Archive`, `System Links`, and `Cleanup Map`. Some support tabs are hidden, but they exist.

Do not rename or remove `Pipeline`. It is the contract between agents, Apps Script, and the Netlify dashboard.

### Gmail

Active outreach account:

`helloliftstudio@gmail.com`

Rules:

- Drafts may be created automatically.
- Emails are never sent automatically.
- Megan manually reviews and sends.
- Sent mail and replies should be reconciled automatically.
- Tracked outreach should receive Gmail labels such as `LS/Outreach`, `LS/Replied`, `LS/Warm`, `LS/Bounced`, and `LS/Follow Up`.

### Website And Dashboard

Website:

`https://helloliftstudio.netlify.app/`

Dashboard:

`https://liftstudiosdashboard.netlify.app/`

The website is the broader brand/studio proof. Outreach should link to it. Do not attach the old About/brand-book PDF by default.

### Attachment Rule

Default outreach attaches only:

`site/_lift-brand/Lift Studio Service Menu.pdf`

Production Apps Script cannot read local files at runtime, so the live Gmail draft attachment uses the Google Drive file ID in:

`automation/live_apps_script_sync/OutreachAutomation.gs`

Do not attach `About Lift Studio.pdf` or old brand-book files unless Megan explicitly asks.

## Automation Layers

There are two kinds of automation. Keep them distinct.

### Layer 1: Google Apps Script

This is the dependable cloud executor. It runs even when Codex/Claude are not open, once triggers are installed.

Production source lives in:

`automation/live_apps_script_sync/`

Core functions:

- `installLiftStudioFullAutomation()`: installs/repairs all production automation.
- `runLiftStudioDailySystem()`: morning orchestrator-style run.
- `verifyLiftStudioAutomationHealth()`: checks triggers and service menu access.
- `runQueuedLiftBrandAudits()`: processes queued audit rows.
- `createOutreachDrafts()`: creates Gmail drafts from sheet copy, with service menu and signature.
- `refreshExistingOutreachDrafts()`: repairs/refreshes existing drafts.
- `refreshSentAndReplies()`: reconciles sent folder and detects replies.
- `createDueFollowUpDrafts()`: creates review-ready follow-up drafts for overdue sent/no-response rows.
- `runInboxHygiene()`: labels tracked Gmail threads and archives closed/bounced threads.
- `handleLiftBrandPipelineEdit()`: sheet edit trigger for re-queueing rows and next-action updates.

Installed trigger target state:

- Daily full-system run around 7 AM ET.
- Draft creation around 8 AM ET.
- Draft creation around 1 PM ET.
- Sent/reply/inbox hygiene scan hourly.
- Queued audit processing every 5 minutes.
- Sheet edit trigger for pipeline updates.

Apps Script owns:

- time-based execution,
- Gmail draft objects,
- PDF attachment,
- simple tested HTML signature,
- Gmail draft IDs/thread IDs,
- sent/reply mechanical reconciliation,
- due follow-up draft creation,
- inbox labels,
- routine row-state updates.

Apps Script does not own:

- final email sending,
- strategic decisions,
- pricing/client commitments,
- ambiguous reply judgment,
- high-touch proof-of-work deliverables,
- major sheet restructuring.

### Layer 2: Claude/Codex Agent Sessions And Scheduled Routines

These are judgment and repair layers. They may run manually, through scheduled Claude Code routines, or inside Codex sessions.

They own:

- deeper research,
- higher-quality lead finding,
- structured lead/enrichment tools such as Vibiz when credits/access are active,
- strategy,
- writing standards,
- ambiguous classification,
- QC resolution,
- repo/documentation updates,
- system repair,
- dashboard/source-code changes,
- innovation/backlog review.

If scheduled Claude Code routines are active, they should fetch current agent files from the repo and operate through the Google Sheet/Gmail connectors. If they are not active or fail, Apps Script should still keep the mechanical loop alive. The sheet is the bridge between the layers.

## Agent Roster

### 1. Orchestrator

Source:

`agents/orchestrator.md`

Primary job:

Coordinate the system. It decides what agent should act next, verifies handoffs, detects broken loops, and keeps the operating picture clean.

Inputs:

- `STATUS.md`
- `ACTIVE_INSTRUCTIONS.md`
- Google Sheet stage counts
- Gmail draft/sent/reply state
- QC flag log
- agent outputs
- automation health checks

Outputs:

- next-agent routing decisions,
- system status updates,
- operating summaries,
- documented fixes,
- escalation summaries for Megan,
- repo commits for changed docs/source.

Owns:

- identifying bottlenecks,
- checking whether sheet state and Gmail state agree,
- confirming trigger health,
- deciding when QC can resolve vs. when Megan must decide,
- prioritizing the next best action,
- keeping source-of-truth docs current.

Does not own:

- lead research itself,
- writing full outreach batches itself,
- sending emails,
- making final human relationship decisions,
- executing proof-of-work assets unless the Proof-of-Work Builder does not exist yet and Megan asks.

Healthy handoff examples:

- `Ready to Draft` rows exist but no drafts: route to Email Marketer/Apps Script draft creation.
- Emails have been sent: route to Follow-Up Pipeline Manager.
- Reply is ambiguous: route to QC, then Orchestrator decides whether to resolve or escalate.
- Warm lead asks for ideas: route to Follow-Up Manager, then Proof-of-Work Builder once available.

### 2. New Business Auditor

Source:

`agents/new_business_auditor.md`

Primary job:

Find, qualify, and audit new prospective Lift Studio leads.

Inputs:

- search/category/city direction,
- existing Pipeline rows,
- websites,
- public Instagram/Facebook/contact pages,
- Google/Maps/public web context,
- Lift audit framework.

Outputs:

- new Pipeline rows,
- fit score,
- priority,
- category/city/contact fields,
- specific audit notes,
- recommended offer,
- subject line and outreach draft when automated audit is available,
- `Pipeline Stage = Ready to Draft` for qualified leads,
- clear no-email/contact-form/manual-contact flags.

Owns:

- prospect discovery,
- dedupe before adding,
- public contact discovery,
- audit specificity,
- lead scoring,
- deciding whether a lead is worth outreach.

Does not own:

- Gmail draft creation,
- final sending,
- reply handling,
- proof-of-work asset creation,
- inventing private contact data.

Contact discovery rule:

If no public email is visible, check website contact page, Facebook contact details, and Instagram mobile/app `Contact` button when relevant. If still missing, leave `Email` blank and use `Contact Form`, `Instagram`, or `Phone` fields plus a clear `Next Action`.

### 3. Email Marketer

Source:

`agents/email_marketer.md`

Primary job:

Write strategic, personalized first-touch outreach copy from qualified leads.

Inputs:

- `Ready to Draft` rows,
- audit notes,
- category/business context,
- recommended offer,
- Lift website and service menu rule,
- writing standards.

Outputs:

- `Subject`,
- `Outreach Draft`,
- status/next-action updates when appropriate,
- QC flags for weak/unsupported/sensitive drafts.

Owns:

- email strategy,
- personalization,
- tone,
- subject/body copy,
- making each email specific enough that changing only the brand name would not work.

Does not own:

- Gmail draft object creation,
- attachments,
- signature rendering,
- sending,
- updating sent/reply state.

Important split:

The Email Marketer writes copy into the sheet. Apps Script creates the actual Gmail draft with attachment and signature.

### 4. Follow-Up Pipeline Manager

Source:

`agents/follow_up_pipeline_manager.md`

Primary job:

Own the post-send pipeline: sent reconciliation, replies, bounces, follow-ups, inbox hygiene, and warm-lead next steps.

Inputs:

- Gmail sent folder,
- Gmail inbox/reply threads,
- Pipeline rows,
- follow-up dates,
- response status,
- prior audit/outreach context.

Outputs:

- updated `Pipeline Stage`,
- updated `Response Status`,
- `Last Contacted`,
- `Follow-Up Date`,
- `Gmail Thread ID`,
- reply/follow-up drafts when needed,
- Gmail labels,
- bounce/alternate-contact handoffs,
- proof-of-work handoff when a lead is warm.

Owns:

- sent-folder reconciliation before reply checks,
- classifying replies,
- finding bounces,
- keeping no-response rows accurate,
- labeling Gmail threads,
- drafting follow-up/reply copy for Megan review.

Does not own:

- sending replies,
- deciding major client commitments,
- closing ambiguous warm leads without review,
- building proof-of-work assets once a separate agent exists.

Website form rule:

Website form submissions do not appear in sent mail. Keep `Email` blank, keep the form URL in `Contact Form`, and use `Lift Pipeline > Mark selected row as form submitted` after Megan submits the form.

### 5. Quality Control

Source:

`agents/quality_control.md`

Primary job:

Act as the confidence layer. Package uncertainty so the Orchestrator can resolve it or escalate cleanly.

Inputs:

- uncertain lead/draft/reply/pipeline item,
- originating agent context,
- sheet row,
- Gmail thread if relevant,
- existing rules,
- `project-notes/qc-flag-log.md`.

Outputs:

- standardized QC flag,
- option set,
- recommendation,
- resolution log update after decision,
- rule-update suggestion when a repeated issue appears.

Owns:

- ambiguity packaging,
- context gathering,
- flag logging,
- pattern detection after repeated flags.

Does not own:

- making final strategic decisions,
- sending emails,
- scoring leads from scratch,
- writing normal outreach,
- directly modifying sheet rows except for documented QC logs.

Escalation path:

Specialist agent -> QC -> Orchestrator -> Megan only if needed.

Megan should see fewer questions, not more. QC should make unavoidable questions easy to answer.

### 6. Innovator

Source:

`agents/innovator.md`

Primary job:

Observe the whole system and surface what should be improved, automated, or turned into a new offer.

Inputs:

- pipeline patterns,
- reply patterns,
- QC flag log,
- tool inventory,
- dashboard/system health,
- agent gaps,
- market and AI capability changes.

Outputs:

- scored opportunity briefs,
- backlog updates,
- weekly/monthly observation summaries,
- recommendations for new agents/tools/workflows.

Owns:

- spotting recurring manual work,
- proposing system improvements,
- evaluating underused tools,
- identifying new revenue/service opportunities.

Does not own:

- executing builds,
- modifying active agents directly,
- changing the sheet,
- creating drafts,
- sending emails,
- interrupting active batch execution.

### 7. Proof-of-Work Builder

Status:

Planned / not yet implemented.

Primary future job:

Create specific mini-audits, one-pagers, mockup briefs, or visual proof assets for warm leads that ask, "What would you do for us?"

Expected inputs:

- warm reply,
- audit notes,
- first-touch email,
- website/social screenshots or observations,
- Lift offer menu,
- Canva/Docs/Slides templates if available.

Expected outputs:

- proof-of-work brief,
- mini-audit PDF or one-pager,
- suggested reply draft,
- next-action sheet update.

Until this agent exists, the Follow-Up Manager and Orchestrator must flag warm leads that need custom proof so Megan can decide whether to create it manually.

## End-To-End Agentic Loop

### Normal New-Lead Loop

1. New lead is added to the `Pipeline`.
2. Sheet edit trigger queues the row for audit when enough info exists.
3. `runQueuedLiftBrandAudits()` runs every 5 minutes.
4. New Business Auditor logic audits the lead through Apps Script/Claude API or through an agent session.
5. The audit populates fit, priority, recommended offer, observations, quick win, notes, and contact path.
6. Qualified leads are marked `Ready to Draft`.
7. Email Marketer owns outreach authorship. It writes or quality-checks `Subject` and `Outreach Draft` from the audit notes.
   - In the Apps Script path, the Claude audit may generate provisional `Subject` and `Outreach Draft` so the loop can run without waiting for a live agent session.
   - That provisional copy must still meet the Email Marketer standard. If it is weak, generic, unsupported, or sensitive, route to QC or leave the row for Email Marketer review.
8. If email exists and copy exists, `createOutreachDrafts()` creates the Gmail draft.
9. Apps Script attaches the service menu.
10. Apps Script appends the simple tested HTML signature.
11. Apps Script writes `Gmail Draft ID`, stage, and next action back to the sheet.
12. Megan reviews and manually sends.
13. `refreshSentAndReplies()` detects sent mail and updates the row to `Sent` / `No Response`.
14. Follow-up date is set.
15. Hourly scans detect replies/bounces.
16. Follow-Up Manager/Apps Script updates status and labels Gmail thread.
17. If no reply exists and the follow-up date is due, Apps Script creates a review-ready Gmail follow-up draft.
18. If reply is warm or ambiguous, route to QC/Orchestrator.
19. If proof is needed, route to Proof-of-Work Builder once built.
20. Innovator watches for repeated bottlenecks and proposes improvements.

### Manual Email Discovery Loop

1. Megan or an agent finds a missing email.
2. Email is entered into `Email`.
3. Edit trigger re-queues the row:
   - if copy exists: stage becomes `Ready to Draft`;
   - if copy is missing: next action becomes `Email Marketer: draft first-touch outreach`.
4. Apps Script creates or repairs Gmail draft during the next run.

### Contact Form Loop

1. No email is found.
2. `Email` stays blank.
3. `Contact Form` stores the form URL.
4. `Next Action` clearly says form/manual contact is required.
5. Megan submits the form.
6. Megan uses `Lift Pipeline > Mark selected row as form submitted`.
7. The row becomes `Sent`, `No Response`, with a follow-up date.
8. No Gmail draft/thread is expected.

### Sent/Reply Reconciliation Loop

1. `refreshSentAndReplies()` scans Gmail sent mail by recipient email.
2. Sent messages update matching rows to `Sent`.
3. Threads with replies update to `Needs review` or the closest response status.
4. No-reply rows stay `Sent` / `No Response`.
5. Inbox hygiene labels threads.
6. Dashboard metrics update from the sheet.

### QC Loop

1. Any agent encounters uncertainty.
2. Agent creates a QC flag with context, options, and recommendation.
3. Orchestrator checks rules and past QC log.
4. Orchestrator either:
   - resolves autonomously,
   - instructs and proceeds,
   - or escalates to Megan.
5. QC logs the decision.
6. If the same issue recurs, Innovator or QC proposes a rule update.

## Stage Definitions And Meanings

Use current sheet labels unless intentionally changing the sheet contract.

- `New Lead`: lead exists but is not audited.
- `Auditing`: queued/in-progress audit.
- `Ready to Draft`: qualified and ready for outreach copy or Gmail draft creation.
- `Drafted`: Gmail draft exists or should exist.
- `Sent`: Megan sent the email or submitted the form.
- `Replied` / `Needs review`: response exists and needs classification or action.
- `Warm`: interested or promising.
- `Needs proof-of-work`: lead needs custom ideas/sample before next reply.
- `Bounced`: email failed.
- `Not a Fit`: closed/not pursuing.
- `Won`: converted.
- `Paused`: intentionally held.

If sheet labels differ, map to the closest label and document the mapping before changing automation.

## System Health Checks

The Orchestrator should regularly check:

- Required Apps Script triggers exist.
- Service menu Drive attachment is accessible.
- `Ready to Draft` rows have subject/copy/email.
- `Drafted` rows have Gmail Draft ID.
- Gmail drafts exist for stored draft IDs.
- Sent emails are marked `Sent`.
- Sent rows have `Response Status = No Response` unless a real reply exists.
- Follow-up dates exist for sent/no-response rows.
- Overdue sent/no-response rows have either a follow-up draft or a clear blocker note.
- Replies are reflected in the sheet.
- Bounces are marked and handed back for alternate contact research.
- No-email rows are visually obvious.
- Dashboard counts match sheet logic.
- No stale instruction files are being treated as active source.

## Known Gaps

These are not failures; they are current boundaries.

1. Proof-of-Work Builder does not exist yet.
   - Warm leads that ask for specific ideas still need manual or semi-manual proof.

2. Vibiz lead discovery/enrichment is connected but not active in the production loop.
   - Vibiz is tracked as INN-006 in the Innovator backlog.
   - It has a workspace and first search configured, but is waiting on credits/access before it can replace or supplement manual web-search lead discovery.
   - Once active, Vibiz should support New Business Auditor with structured candidate discovery, enrichment, and account research. It should not bypass dedupe, fit scoring, contact-path rules, or Email Marketer quality standards.

3. Claude/Codex sessions are not the same as Apps Script triggers.
   - Agent files describe behavior. Apps Script triggers execute background mechanics. Do not confuse documentation with running automation.

4. Scheduled Claude Code routines must be verified separately.
   - If they are enabled, they should use this repo and the sheet as source of truth. If they are not enabled, Apps Script remains the dependable automation layer.

5. Signature rendering must be tested.
   - Apps Script uses the safer simple HTML signature. Emergency connector-created drafts may need `Refresh Existing Drafts` to repair signature/attachment.

6. Public-repo constraint must be intentional.
   - If a scheduled routine fetches agent files from GitHub, the repo visibility requirement must be understood and periodically reviewed for privacy/security.

7. Old scheduler files should not be used.
   - Mac LaunchAgent files are legacy unless Megan explicitly reactivates them. The old `run_daily_8am_outreach.sh` script no longer exists and any launchd job pointing to it should be removed.

8. The Google Drive MCP connector cannot write to Google Sheets. This is structural.
   - The Drive MCP only has read tools. It cannot write cell data to spreadsheet tabs. Reconnecting it never fixes this — it is a permanent capability gap in the connector.
   - The correct write path for the cloud agent is the Apps Script web app endpoint (`doPost`), deployed as a web app from `LiftPipelineAutomation.gs`.
   - Once deployed, the cloud agent uses WebFetch to POST to the endpoint with `action=addLeads` or `action=updateRows`.
   - The Apps Script layer continues running independently and keeps the mechanical loop alive.
   - Web app endpoint deployment status: **DEPLOYED** (2026-06-18). The endpoint has been manually verified with `getStatus`. URL/secret configuration for cloud routines is documented in `automation/scheduled_routines.md`, but routine run history and status-email delivery must be verified separately before treating the cloud-agent layer as healthy.

9. The cloud agent cannot commit to the GitHub repo.
   - The cloud agent fetches files from GitHub raw URLs (read-only). It has no git write access.
   - STATUS.md cannot be updated by the cloud agent at runtime. The Orchestrator includes status tracking in the run email instead.
   - Repo doc changes identified during a cloud run should be flagged in the status email and applied in a local Claude Code session.

## Human Approval Rules

Megan must approve or perform:

- sending first-touch emails,
- sending replies,
- making pricing promises,
- scheduling commitments,
- closing ambiguous warm leads,
- deleting drafts,
- major sheet restructuring,
- new service/package decisions,
- privacy/security tradeoffs.

The system may autonomously:

- research public business info,
- add/update leads,
- draft emails,
- create Gmail drafts,
- attach service menu,
- apply signature,
- label Gmail threads,
- reconcile sent/reply state,
- set follow-up dates,
- flag uncertainty,
- update documentation/source files when asked or when needed to preserve the system contract.

## Tomorrow-Ready Definition

The system is ready for the next operating day when:

- `Outreach Automation > Install/Repair Full Automation` has been run successfully.
- `Outreach Automation > Verify Automation Health` reports required triggers and service menu OK.
- `Outreach Automation > Refresh Existing Drafts` has repaired any emergency-created drafts.
- Apps Script timezone is `America/New_York`.
- New queued leads can audit.
- Audited leads can produce subject/copy.
- Draftable rows create Gmail drafts.
- Drafts include the service menu and simple HTML signature.
- Sent mail reconciles hourly.
- Replies/bounces update the sheet.
- Dashboard metrics are based on real response statuses.
- `ACTIVE_INSTRUCTIONS.md` names this file as the primary grounding brief for the full agentic system.
