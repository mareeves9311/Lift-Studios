# Lift Studio Anti-AI Output QA Standard

2026-07-06. Practical, reusable quality gate — not a style guide. Applies to every client-facing or prospect-facing Lift Studio output: outreach emails, follow-ups, audit summaries, visual copy, packet documents, social captions. Does not apply to internal system docs like this one.

## Why this exists

Lift's whole pitch is "we actually looked at your business." Audit-protocol.md already bans fabricated facts (no invented reviews, rankings, claims). This standard bans the other failure mode: **true things said in a hollow, generic, templated way.** A factually accurate email that reads like it was sent to 500 businesses kills the same deal a fabricated claim does — it just fails slower. No output ships until it passes both gates.

## What "AI-sounding" means

Output that could have been sent to any business in any city with zero changes. The tell isn't grammar — it's the absence of anything only true about *this* prospect, plus a specific set of verbal habits that read as inflated or templated the moment a human notices them.

## Banned / red-flag words

Default-reject on sight unless a specific, evidenced reason exists to keep one:

`elevate` · `unlock` · `transform` · `seamless` · `tailored` · `leverage` · `robust` · `dynamic` · `comprehensive` · `game-changing` · `cutting-edge` · `synergy` · `holistic` · `empower` · `revolutionize` · `best-in-class`

If a sentence needs one of these to make its point, the point isn't specific enough yet — rewrite toward the concrete fact instead of reaching for a bigger adjective.

## Weak-pattern catalog

| Pattern | Weak example | Why it fails | Fix |
|---|---|---|---|
| Generic AI phrasing | "I wanted to reach out and share some ideas." | Says nothing a bot couldn't say to anyone | Name the actual thing you saw: "Your HVAC service pages don't mention emergency calls, and that's probably your highest-intent search term." |
| Vague business language | "We help businesses grow their online presence." | Zero commercial content | "Your last blog post is from 14 months ago — that's 14 months of 'near me' searches Google has no reason to show you for." |
| Empty adjectives w/o proof | "Your brand has amazing potential." | Unsupported flattery | Cut the adjective; state the observed gap instead. |
| Repetitive sentence structure | Three sentences in a row starting "We can also…" | Reads as templated/copy-pasted | Vary structure; combine or cut redundant points. |
| Over-explaining | Restating the same finding three different ways "to be clear" | Padding, insults the reader's intelligence | One clear statement per finding, then stop. |
| Corporate filler | "In today's competitive digital landscape…" | Opener that delays the actual point | Delete the whole sentence. Start with the observation. |
| Fake specificity | "Businesses like yours see significant results." | Sounds like a number but isn't one | Either cite a real, verifiable fact or don't imply a stat exists. |
| Unsupported polish claims | "This will transform your bookings." | Guarantee-shaped language with nothing behind it | Describe the mechanism, not the outcome: "A booking CTA above the fold gives mobile visitors one obvious next step instead of three." |
| Em-dash / formulaic transitions overused | Every other sentence uses "—" or "Not just X, but Y." | Recognizable AI cadence | One or the other, sparingly, not as a structural crutch. |
| Bloated intros | Three sentences of throat-clearing before the first real point | Buries the value | Lead with the sharpest observation in sentence one. |
| Unnatural enthusiasm | "I'd LOVE to help you level up!" | Doesn't match a stranger's first cold email | Direct and warm, not performed excitement. |
| Lack of prospect-specific observation | Could be sent to any business in the niche | No proof anyone looked | At least one detail that only applies to this business, named plainly. |
| Lack of commercial point | Describes a "vibe" instead of a business outcome | Doesn't connect to bookings/calls/revenue | Tie every finding to the action it affects: call, book, quote request. |
| Lack of real-world business voice | Reads like a marketing brochure | Doesn't sound like one person talking to another | Write it the way Megan would say it out loud to the owner. |
| Sounding like a template | Placeholder-shaped sentences even with fields filled in | Structure is visible even when content is swapped in | Rewrite the sentence around this prospect's actual fact, not around a slot. |

## Lift Studio Voice Standard

| Trait | Looks like in practice |
|---|---|
| Direct | Say the finding in the first line, not the fourth. |
| Commercially sharp | Every point ties to a call, booking, quote, or purchase — not "engagement" or "presence." |
| Specific to the prospect | At least one detail that proves a human actually looked at this business. |
| Grounded in observed evidence | Only claims what was verified live (see audit-protocol.md); label inference as inference. |
| Low-fluff | If a sentence can be cut without losing information, cut it. |
| Confident but not overhyped | State the opportunity plainly; no guarantees, no "game-changing." |
| Polished but not corporate | Clean grammar, plain words — not agency-speak. |
| Sounds like Megan / Lift Studio | Reads like one person who did the work, not a brand voice template. |

## Required final QA pass

Run all six before any output is considered done. Each is a pass/fail question, not an essay.

1. **Evidence check** — Is every claim something that was actually verified live? Anything unverified labeled as inference/recommendation/concept, per audit-protocol.md?
2. **Specificity check** — Could this exact sentence be sent to a different business with only the name swapped? If yes, it fails.
3. **Anti-AI language check** — Any banned word present? Any pattern from the catalog above present? Cut or rewrite.
4. **Commercial value check** — Does every major point connect to a booking, call, quote, or sale? If a point is just "looks nicer," either tie it to conversion or cut it.
5. **Human voice pass** — Read it out loud. Does it sound like Megan talking to this owner, or like a brochure? If it sounds performed, flatten it.
6. **Final tightening pass** — Cut the intro to one sentence if possible. Cut any sentence that restates a point already made. Cut to the shortest version that keeps every fact.

## Scope boundary

Applies to: outreach emails, follow-ups, audit summaries, visual copy/headlines, packet documents, social captions, any Instagram/website concept text.

Does not apply to: internal `_system/` docs, build tickets, SOPs, or anything Megan reads but a prospect never will. Keep this gate on client-facing output only — don't let it balloon into a company-wide prose style mandate.

## Relationship to existing rules

No-fabrication rules (audit-protocol.md, brand-asset-protocol.md) answer "is it true." This standard answers "does it sound like a human who did the work said it." Both gates must pass before delivery; neither substitutes for the other.

## Recommendation: promote to global AI OS foundation

This gate is written Lift-specific for now (scoped, practical, testable against real Lift outputs first). Once it has been run against a real batch of Lift outputs — recommend a proof bar of the same shape as the audit proof-run, e.g. ≥10 client-facing outputs checked against all six passes — and Megan confirms it's catching real problems without adding meaningful drag, **recommend promoting a generalized version of this standard into the global AI OS foundation** (`FOUNDATION.md` or a new AI-OS-level standards doc) so it applies to all client-facing or public-facing output across every project (AMP3, AdviseHer), not just Lift.

This is a recommendation only. It requires Megan's explicit approval and a separate session scoped to the global foundation repo — nothing in this task touches `FOUNDATION.md` or any file outside Lift Studio.
