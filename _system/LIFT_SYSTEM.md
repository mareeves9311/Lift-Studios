# LIFT SYSTEM — The Operating Doc

**Created:** 2026-07-09 (Fable 5, Architect-mode consolidation). This file replaces twenty `_system/LIFT_*` planning documents (deleted this session; all recoverable via git history, consolidation commit). It is the single description of how Lift Studio acquires clients.

**Rule of this file:** if a future insight can't be expressed as a patch to this doc, the QA standard, or the build queue, it doesn't get written down — it gets executed. `_system/` holds exactly five files: this one, `LIFT_ANTI_AI_OUTPUT_QA_STANDARD.md`, `LIFT_LEGACY_AUTOMATION_AUDIT.md`, `LIFT_BUILD_QUEUE.md`, and `LIFT_AUDIT_ASSISTANT_REFERENCE.md` (external GPT config snapshot, reference-only). A sixth file requires deleting one of these.

---

## 0. The one-line system

Ten QA-passed, observation-led emails a week — five to visual businesses offering a content lift they can see, five to trades/local services offering a search finding they can check — each leaving one thing to want, every claim carrying a fetched source, tracked in the Sheet the same session, with a written decision date for which lane wins.

---

## 1. Decisions — locked 2026-07-09, by Megan

These were decided, not defaulted. Do not reopen them without her.

1. **Two lanes, deliberately, as a test.** Megan's words: *"I want to see who bites... I don't want to go all in on one because I don't know enough yet."* Lane V (visual) and Lane S (SEO/trades) run side by side under the test protocol in §7 — with a decision checkpoint, so "both" is a data-gathering phase, not a permanent hedge.
2. **The SEO-blog lane survives as co-lead** (not demoted, not killed).
3. **The proof line:** the free hook is exactly **one** remade piece of *their existing* content (Lane V) or **one** specific named finding (Lane S). New concepts, plans, calendars, full diagnoses — never free. A paid audit may include up to 3 remakes. The loop stays open: the hook proves capability and implies more; it never delivers the complete answer. (The 55 zero-reply sends delivered the complete answer.)
4. **The live website's invented case studies come down before Monday.** Replaced by real, clearly-labeled unsolicited concept work: Morning Fuel (real, already built) plus 1–2 new drag-to-reveal remakes of businesses **not** currently being pitched. Never anonymized-fake, never generated.
5. **Price lives in the service menu** (`site/_lift-brand/LIFT_SERVICES_REFERENCE_V3.md` → the menu PDF), nowhere else. Every proposal and deck quotes the menu line verbatim. Work with no menu line does not get scoped — add the line (Megan sets the number) or cut the scope. This kills the menu↔proposal circular reference found in the Witmer deck.

**Settled earlier (2026-07-09 handoff, §7) — equally closed:** three-bucket audit (social / website-visual / website-SEO) · Lift provides direction and copy, the client's team implements · every factual claim in a client artifact carries a fetched, openable source; unsourced claims are deleted, not flagged · critic verdicts are `{sourced, unsourced}`, never `{true, false}` · three critic stages (§5) · never generate a client's product — enhance their real assets only · no auto-send, ever.

---

## 2. The two lanes

| | **Lane V — Visual** | **Lane S — Search** |
|---|---|---|
| Who | Image-driven local businesses: bakeries, food, medspas, aesthetics, salons, wellness, boutiques | Trades & local services: HVAC, plumbing, roofing, landscaping, electrical, local practices |
| The evidence so far | Every likely-human opener from the 55 sends (bakery ×8 opens, medspa ×5, aesthetics, prosthodontist) | Zero human engagement from ~6 sends — small sample, unproven either way |
| Free hook | One of **their own** posts/photos, lifted (standard retouching: relight, color, background cleanup, crop — never generated content), shown as a drag-to-reveal before/after link | One specific, named, checkable search finding ("your last blog post is from 14 months ago — that's 14 months of 'near me' searches with no reason to show you") |
| Product | Monthly content batch from their real photos, AI-enhanced, **Megan-curated** — menu rungs: Starter Content Kit / Content Bank, Instagram Refresh add-on | Blog & SEO Foundation (one-time) → Blog Essentials / Blog Growth retainer — menu rungs, prices per menu |
| Proof speed | Instant — they see their own photo lifted | Slow — rankings take months; sell the *finding* and the plan, promise no timeline |
| Never | Generate food/products/people they don't have; fabricate before/afters | Ranking guarantees, traffic numbers without a fetched source, invented stats |

Positioning line (both lanes, replaces the old boilerplate that failed our own QA standard): *"I run Lift Studio — I find the specific things costing a local business customers, show the fix, and deliver it done."* Megan may rewrite; whatever she locks goes in every send identically.

**Lane V pitch essence (Megan, dictated 2026-07-14 — every Lane V send leans into this):** content is everything for a visual local business; customers choose from a photo, so the imagery has to do the product justice and create the first impression. The offer is a partnership, not a service drop: the OWNER names where the brand is headed and how they want customers to feel ("What do you want? How do you want to come across? What is the essence?"), then any quick photo they take becomes brand-true content through Lift's tools — a content bank that portrays the product at its best while staying true to them. Sell the system (direction → quick photos → brand-carrying content bank), not individual retouches. The deliverable frame is the **fully built monthly calendar**: content + captions + copywriting done, guesswork removed, so the owner can actually stay consistent — and consistency/regular posting is the crucial business behavior the service buys them (Megan, 2026-07-14). Wording note: carry these ideas within the QA gate — "elevated"/"incredible" are banned-or-hollow words; say the concrete thing instead.


---

## 3. The audit

Three buckets, always: **social · website-visual · website-SEO**. Two depths:

- **Contact discovery (Megan's protocol, repeated 2026-07-14 — do not miss again): check the FACEBOOK page first.** Local businesses list their email in the Facebook About/intro section far more often than on their website. Order: Facebook About → website contact/footer → listings (Zola/WeddingWire/Yahoo). Automated fetches hit Facebook's JS wall, so if tools can't read it, say so and ask Megan to click the page rather than declaring "no public email exists."
- **Hook-lite (free, cold):** 15–20 minutes hard cap. Enough live looking to produce ONE sharp lane-appropriate hook and confirm the business is real and reachable. No asset pack, no concept brief, no full writeup. If nothing specific surfaces in 20 minutes, skip the prospect — don't manufacture an angle.
- **Full `$liftaudit` (paid, or any prospect who replied):** the existing skill pipeline, all three buckets, verified asset pack, concept briefs. The deliverable ends at **findings + up to 3 remakes + the priced next step from the menu**. Roadmaps, implementation sequences, scopes of work are the paid engagement, not the audit. (The Witmer deck gave the scope of work away free and included no findings — exactly backwards.)

Audit mechanics live in `skills/liftaudit/` (now wired to the imported 990-line asset-verification protocol — every run loads it).

---

## 4. Outreach

**First touch:** subject specific, not clickbait. Body: (1) one-line prospect-specific opener — the thing actually observed; (2) name what's genuinely working; (3) the hook (§2) with its link; (4) positioning line; (5) low-pressure, low-friction close — "Want me to send the notes behind it?" beats "Worth a call?"; (6) "Best, Megan." Every send passes `LIFT_ANTI_AI_OUTPUT_QA_STANDARD.md` first.

**Infrastructure rules (fix the faults found in all 72 sent threads):**
- Every link points to **helloliftstudio.com** or a Lift microsite — never a `.netlify.app` staging URL. (The live ChatGPT audit GPT still links netlify — Megan fixes its config; repo files are already clean.)
- **No Snov.io pixel, no link-wrapping.** Cancelled/off before Monday. We measure replies, not opens — replies are the only signal that ever mattered and the only one that's real.
- **No attachments on first touch.** One clean link. The menu PDF goes in the *reply* to an interested prospect (this changes the old attach-the-menu rule, deliberately: attachments from a stranger are a spam signal and the menu is a price list nobody asked for yet).
- Sends continue from `helloliftstudio@gmail.com` at ≤10/week until `megan@helloliftstudio.com` (Workspace/Zoho + MX/SPF/DKIM/DMARC) finishes its 2–3-week warmup — that workstream runs in parallel and switches over when warm. FOUNDATION.md Identity Map amendment applied 2026-07-09.
- One prospect, one address, once — check the Sheet before sending (Royer's got 3 emails at 2 addresses; Denim got the hiring@ inbox).

**Follow-up cadence (locked):** Day 4–5 FU1 (reply in-thread, restate the strongest original observation, refreshed subject allowed) · Day 10–12 FU2 (last note, lowest pressure) · then stop. No FU3. Immediate stop on bounce or "not interested."

**Replies and calls (added 2026-07-09, Megan's call):** cold prospecting stays digital — that's the business. But a warm reply may be offered a 15-minute call, and Megan is willing to take/make that call to close. Calls are a closing tool for people already interested, never a prospecting tool. This is the difference between "hustling cold calling" (out, permanently) and "picking up the phone for someone who raised their hand" (in).

---

## 5. The critic pipeline (three stages, every client-facing artifact)

Verdict space is always `{sourced, unsourced}` — a critic cannot manufacture ground truth, but it can demand a retrievable source. A citation asserted by a model is worthless; the URL must be **fetched and confirmed to contain the claim**.

1. **Post-research — the claim cop.** Every assertion in the research file carries a fetched, openable source. Unsourced → deleted. *Where hallucinated facts die.*
2. **Research → deliverable — the fidelity critic.** Every verified finding appears in the deliverable **at full specificity**. "The award-winning Benton case study is published at a lorem-ipsum URL" must never become "project proof not converted into conversion paths." *The polish is the bug; this stage catches the laundering.*
3. **Pre-send.** Anti-AI QA six-pass (the standard doc) + unresolved-gate check (does anything reference an unconfirmed fact?) + **a mechanical script diff of every number (phones, prices, addresses, stats) in the deliverable against the verified-facts file.** `717.65.1428` dies here, by script, not by model.

Until Claude Code ships this as a skill (build queue #1), the three stages run as a manual checklist — they are process, not software.

---

## 6. The week

**Steady rhythm (~5 hrs):** Mon 1h — pick 10 prospects (5/lane), hook-lite each; Tue/Wed 1.5h — build the 10 hooks (Lane V lifts + drag-to-reveal links, Lane S findings); Thu 1h — draft 10 emails, QA-pass, **send** (Megan's click), Sheet updated same session; Fri 30m — due follow-ups, log replies, one two-line learning note in the Sheet. Busy week: halve everything; never skip the Sheet update or QA.

**Week of 2026-07-13 specifically** (Megan relaxed the Monday-strict date on 2026-07-09 — the slack buys hook quality, not drift):
- **Monday:** (1) reply-in-thread probe to the five likely-human openers (Revived Medical Aesthetics, Moore Desserts, Always Plumbing, Cosmetic & Plastic Surgery of Central PA, Dr. Gordner): *"I noticed you took a look at what I sent a while back — was there something that didn't land? No pitch, genuinely curious."* Five sends, cheapest information in the whole system — zero replies currently means zero data about willingness to buy. (2) Invented case studies off the live site. (3) Snov pixel/wrap off. (4) Pick the week's 10 (5/lane), hook-lite each.
- **Tuesday:** Claude Code ships the Lift Creative Agent's hook mode (build queue #3); Megan builds/curates the five Lane V lifts and five Lane S findings.
- **Wednesday 2026-07-15 — first new-lane sends.** All 10 (or 5 Wed / 5 Thu), each QA-passed, Sheet updated same session. This date is the hard one.
- Friday: log replies, due follow-ups on the Monday probe, two-line learning note.
- **Cut from this week, deliberately:** the critic pipeline as software (checklist instead) · content-*batch* automation (hook mode only — batch mode waits for a paying client) · full fulfillment SOP (one-page provisional in the build queue) · new website spec pieces beyond taking the fake ones down (build during week) · Witmer deck rework (her call on timing; it's Lane S's warmest lead and the deck needs before-evidence + a menu price before it ever ships).

---

## 7. The two-lane test protocol

The reason "both" works as a decision instead of a hedge: it ends.

- **Volume:** 5 first-touch/lane/week, identical effort per lane.
- **Tracked per send (Sheet columns):** lane, vertical, hook format, sent date, reply (Y/N + quality), what the reply engaged with.
- **Decision checkpoint: Friday 2026-08-07** (four send-weeks, ~20 sends/lane). The winning lane — by replies and real conversations, opens don't count — becomes the lead offer; the other demotes to inbound-only. If both are near zero, the problem is pitch or format, not lane: run one format experiment (text-only vs. visual-led hook) for two more weeks, then decide anyway — **no later than 2026-08-21.**
- This checkpoint is an appointment with a decision, not a review meeting. A future session that reaches the date must force the choice, not extend the test.

---

## 8. Tracker — one, not three

**The Google Sheet `Pipeline` tab is the only tracker.** The local CSV week-tracker and its two companion docs are deleted (header-only, never used — four weeks of planning docs described a streak that never began). No parallel schemas. Megan updates the Sheet same-session after every send/reply — by hand, or via the supervised `pipeline-sync` reconciliation on request. The Netlify dashboard keeps reading the published CSV; don't rename/remove the `Pipeline` tab.

---

## 9. Graveyard — do not re-derive (each of these was asserted confidently and killed by evidence)

| Dead idea | Why it's dead |
|---|---|
| "Nothing was sent; the tracker is empty because there's no activity" | 72 threads, ~55 businesses sent. The tracker was empty because nothing was recorded. |
| "Zero replies = spam/deliverability problem" | ~63% tracked opens (inflated by Apple MPP, but directionally real). They arrived and were read. Deliverability is secondary. |
| "The repeat clickers are warm leads" | Both were `info@` mail-security scanners fetching redirect links. Real click rate ≈ 0. |
| "Sell the $250 Mini-Audit cold as a tripwire" | Nobody buys a diagnosis from a stranger. Rejected by Megan. |
| "She promised a gift and asked for a purchase" | Wrong. She delivered real value — the *complete* answer, leaving nothing to want. Fix is §1.3, not less generosity. |
| "Build a verification layer" | She already built one, fail-closed, before being told to (Witmer verified-facts gate). Systematize, don't invent. |
| "Adversarial agents can't catch hallucinations — models concur" | Forced refutation works. The real constraint is the verdict space: `{sourced, unsourced}`, never `{true, false}`. |
| "Just add a price to the deck" | The menu delegated scope to the proposal, the proposal delegated price to the menu. §1.5 breaks the cycle. |
| "Buy Ahrefs/Semrush" | Free tier + manual SERP checks produced the best number in the Witmer audit. GSC/AWT are free the moment a client signs. Buy tools with client revenue. |
| "Give Tang ten finished posts free" | Gives away the product (§1.3) and was built on an unverified premise — Tang may not have an Instagram at all. |
| The 17-agent roster, proof-gate ladder, 90-day plan, weekly-routine doc, pipeline-week CSV system | A manufacturing system for a factory with no orders. 24 docs agreed with each other and not with reality. Rebuild *from revenue*, not ahead of it. |
| Phone-first outreach for trades | Contradicts the digital-first business Megan is deliberately building. Her call, made. |

**Verify before building on (still unverified):** whether Tang has an Instagram at all · whether Witmer has a web team (boyfriend can answer in seconds — required before that deck ships) · true open rate (Apple MPP inflation) · whether any opener would ever pay (the Monday probe is the test).

---

## 10. Boundaries (permanent)

No auto-send — every send is Megan's click. No generated client product — their real assets, standard retouching only. No unsourced claim survives into a client artifact. No guarantee language, no invented stats or timelines. No sheet writes without approval. The legacy Apps Script engine stays **DO NOT RUN** (`LIFT_LEGACY_AUTOMATION_AUDIT.md` — R3 fail-open endpoint and R4 sendEmail-capable variant are the open items; the build queue includes killing the fail-open branch in the repo copy). Identity: all Lift operations on Lift accounts only, per FOUNDATION.md.
