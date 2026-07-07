# Lift Outreach and Follow-Up System

2026-07-06. Combines the existing outreach rules (`skills/liftaudit/references/outreach-email.md`, `STATUS.md`'s outreach rule, the global `follow-up-draft` skill's locked rules) into one operating system, with the Anti-AI Output QA Standard added as a mandatory pre-send gate. Every send is Megan's manual click — permanently, no exceptions, per `CLAUDE.md`.

## First email formula

Subject: specific, not clickbait — e.g. "A few ideas for [Business Name]" or "3 quick ideas for [Business Name]" (existing patterns in `automation/outreach_templates.md`).

Body structure:
1. One-line, prospect-specific opener (what was actually observed — never generic).
2. Name what's working (per the GPT reference's rule: recognize the real strength before critiquing).
3. The two selected opportunities, each tied to a business outcome (call, book, quote) — not a vibe.
4. The required boilerplate line: "I run Lift Studio, a boutique brand and content studio that helps local businesses sharpen their messaging, improve their digital presence, and make it easier for the right clients to find them and take action," with "Lift Studio" linked to `https://helloliftstudio.com/`.
5. Note the service menu is attached.
6. Low-pressure close — a question, not a push.
7. Sign "Best, Megan."

Every line above must pass the Anti-AI Output QA Standard before send — this formula gives structure, not permission to fill it with generic phrasing.

## Attachment / visual strategy

Attach **only** the current service menu PDF (`site/_lift-brand/Lift Studio Service Menu.pdf`) — per the active `STATUS.md` outreach rule. Do not attach the full brand book or any archived material unless Megan explicitly asks. Include a visual only when the audit actually produced one for a selected channel — never attach a visual "to seem thorough" if it wasn't part of the selected-channel deliverables.

## Follow-up cadence

No numeric cadence is currently locked anywhere in the repo — the existing `Follow-Up 1` / `Follow-Up 2` templates (`automation/outreach_templates.md`) have no day-counts attached. Recommending one now, grounded in those two existing templates:

- **Day 0:** first-touch email.
- **Day 4–5:** Follow-Up 1 ("just wanted to follow up in case this got buried") — reply in the *same thread*, refreshed subject line allowed.
- **Day 10–12:** Follow-Up 2 ("last note from me") — same thread, lower pressure, offers the short 3-point audit angle.
- **After Follow-Up 2:** stop active cadence. No Follow-Up 3. Move to quarterly/seasonal re-touch only, or drop entirely on an explicit "not interested."

This cadence is a new recommendation, not existing locked policy — flag it to Megan for a one-time confirmation, then treat it as locked going forward (per the `follow-up-draft` skill's own pattern of appending confirmed rules).

## Follow-up angles

**FU1:** restate the single strongest original observation — don't introduce a new one; the goal is visibility, not a second audit.
**FU2:** lower pressure, explicitly offer a short 3-point audit as a low-commitment next step; this is the last active touch.

## Personalization without wasting time

Cap effort at what the scoring rubric's "ease of personalization" category already implies (see `LIFT_PROSPECTING_AND_SCORING_SYSTEM.md`): if a specific issue can't be named in about 30 seconds of looking, don't manufacture one — the prospect probably scored low for a reason, and forced personalization tends to read as fake specificity (an Anti-AI QA failure in its own right).

## How to avoid sounding spammy

One real, specific observation beats any amount of flattery. No fake urgency, no guarantees, no invented metrics or timelines (banned by `audit-protocol.md`). No banned words from the Anti-AI Output QA Standard's list. No enthusiasm that wouldn't sound natural from one person emailing another about their actual business.

## What should be templated vs. customized

**Templated:** structure (opener → strength → two opportunities → boilerplate → close), the boilerplate line itself, the attachment rule, the sign-off.
**Customized every time:** the specific issue(s) named, which two channels were selected, the subject line's specific hook.

## How to handle replies

Manual triage only, for now — classified High risk in the agent orchestration blueprint because a misread reply leads to the wrong next action. A Reply Triage agent (suggestion-only, Megan confirms) is a month-3 build, gated on 3 replies handled manually first.

## How to move from audit to paid offer

Existing pattern (`automation/outreach_templates.md`'s "Reply When They Say Yes" and "Paid Offer Message"): when a prospect says yes, respond with what the audit will look at (homepage clarity: what do you offer, why trust you, what to do next), then propose the paid package. **Flag:** that file's "Paid Offer Message" cites a $650 starter project, which predates and doesn't match the current v3 service menu (Mini-Audit $250 → ladder). Recommend refreshing that template to reference the current Mini-Audit/Blog ladder pricing — logged as a build-queue item (see `LIFT_MONEY_MACHINE_BUILD_QUEUE.md`), not changed in this task since it's outside the docs this task was scoped to create.

## When to stop following up

After Follow-Up 2, per the cadence above. Immediately on any explicit "not interested," bounce, or unsubscribe signal.

## What can be agent-assisted

First-draft generation for first-touch and follow-up emails (existing `follow-up-draft` skill already does this for follow-ups); identifying which tracker rows are due for a follow-up.

## What should never auto-send

Everything. No exceptions, permanently — per `CLAUDE.md` and `LIFT_STUDIO_OPERATING_DASHBOARD.md`. Draft-only, Megan's click required for every send.

## What should be tracked

Per the tracker schema in `LIFT_PROSPECTING_AND_SCORING_SYSTEM.md`: `outreach_status`, `first_sent_date`, `last_touch_date`, `reply_state`, `next_action`. Same-session updates are what the 4-week proof streak measures — see `LIFT_PROFIT_ENGINE_WORKFLOW.md`.

## Pre-send gate (non-negotiable)

Before any send: Anti-AI Output QA Standard's six-pass check complete, service menu attached (and only the service menu), website link present, no guarantee language, tracker row ready to update same-session after send.
