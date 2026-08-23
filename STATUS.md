# Lift Studio Operating Status

Last updated: 2026-08-20 (meeting went well — final combined Tang + A Soul proposal is the next build)

## Session Lock

### ▶ 2026-08-23 ~15:30 ET · **PROPOSAL RECONCILED ON DISK and staged on the Lift domain (draft). Live artifact left as-is (publish tool absent on the phone line). ONE blocker stands: her yes on $1,600.** (MIRA, from the phone via Remote Control)

- **Her ask from the phone:** "wrap up the proposals for Tang and ASOL." Running in the Mac-side Remote Control session (root lock 15:10).
- **Reconcile done the reproducible way:** the cloud version cannot be fetched headlessly (content loads behind her login; frame host 404s), and the quarantined branches carry no HTML. So the three defects it fixed were re-fixed from source by a staff agent, crops only: (1) Tang room tile `t3-siumai.jpg` + `hero-room.jpg` re-cropped from `02-assets/cropped/14_interior-birdcage_RebeccaPavlick_5days.png` box (90,44,530,484), reviewer name / X / chevrons gone; (2) `a-ba1-before.jpg` (strawberry drinks) chevrons cropped out, box (34,76,518,560); `a-ba4-before.jpg` 11px black screenshot edge trimmed; (3) **A Soul logo is now their REAL lockup** ("ASOUL [seal] RAMEN 一魂たましい"), cropped from `audits/asoul-ramen/01-source/src-06-web-home-hero.png` box (222,44,702,172), padded square on the card's own white. The 17:45 "needs her eye" on the logo crop is closed. `.av` now clips to a circle. **Sliders NOT carried** (side-by-side "Your photo / Lifted" kept, the house label law); cheap to add if she wants them.
- **Brand-kit version is the one true version:** `audits/tang-asoul-proposal/build_artifact.py` + `artifact.html` (1.81 MB) rebuilt 15:23. Both palettes, real room photo, real logos, 30-photo pricing, video as add-on.
- **Staged on her domain, unlisted draft, noindex:** https://6a8b48e0a6e73c64eb19c9c0--helloliftstudio.netlify.app/tang-asoul/ (page file `site-live/tang-asoul/index.html`). Verified 200 / 1.9 MB; cold render check by a staff agent: avatars round and readable, no blank tiles, fonts loaded, no overlays left in any photo. Apparent right-edge clipping was the headless-Chrome minimum window (the live 8/19 `/tang/proposal/` clips identically), not the page. **NOT promoted to prod** (`helloliftstudio.com/tang-asoul/` would be public-unlinked; her click, after pricing).
- **The `claude.ai/code/artifact/fd6b…` link still shows the blind cloud version.** The Artifact tool is not available in Remote Control sessions; republish from a Mac session with `Artifact(file_path=audits/tang-asoul-proposal/artifact.html)` or retire that link in favour of the domain URL. The 8/19 Tang-only `/tang/proposal/` is superseded by this page once it ships.
- **15:35 ET, PRICING APPROVED: "that fee works for me." $1,600/month for both is canon (PRICING_RATIONALE.md status line updated). Concession ladder stands: month one to $800 if needed, recurring never below $1,500.**
- **15:35 ET, her first note on the page: the Tang room tile "looks out of place... not a professional photo, lighting and coloring lackluster."** Fix before anything ships; see the next entry.
- **15:45 ET, ROOM TILE REGRADED, rough on her phone in ~8 min (fast lane).** Her complaint was right for a measurable reason: the tile was a 656px Google-review screenshot upscaled, flat and pink. Fix = shot swap + photographer's grade, NO generator: source `02-assets/ref-crops/room-birdcage-straight_REF.png` (3114x3714, the real room, verified overlay-free), crop y 450..3564 full width, OpenCV grade (bilateral denoise, WB R1.02/G1.02/B0.92, dehaze .22, black point .048, S-curve .30, highlight knee .86, red vibrance 1.28, blue sat x.5, green x.3, local contrast sigma 90 @ .28, vignette 13%). Receipt vs palette: ink 18%->39% (target 40), red pixels purer (134/32/23 vs pinkish 153/44/40), incidental blue 11%->0 (no mural in frame), gold underglow strip not in this angle. Script + 1200px master banked at `audits/tang/04-concepts/round4-brand/tang-room-grade.py` / `tang-room-graded-1200.jpg`. Known: diagonal lens flare in the original remains (colour-neutralised, reads as light rays); removing it would need a generator, which is her call. Tighter crop = more red if she wants 26%.
- Draft redeployed: https://6a8b4bfac923eaa366ae99c0--helloliftstudio.netlify.app/tang-asoul/ (hero strip tile 1 + Tang grid slot 2).
- **Law candidate (not promoted, corpus frozen): "a room is not lifted and not left either; it gets a photographer's grade from the best real source."** Reconciles 17:45's "crop it and leave it" with today's "lackluster": both were about the same tile; the miss was the SOURCE (screenshot) not the rule.
- **16:00 ET, HER REVERSAL AND THE FIX: "we're not just changing the lighting... it needs some aspect regeneration, like we do with all of our other stuff."** She rejected BOTH the screenshot tile and my colour grade. She is right and the 17:45 law was over-broad: her earlier kill was of an INVENTED room, not of restaging. **Law amended (project canon, not promoted mid-task): a room is never re-imagined, but it IS restaged — their exact geometry, re-photographed. "Crop it and leave it" applies to a room shot that is already photographically good; a 656px review screenshot never was.**
- **Round 5 fired, restage, edit-in-place on their own photographs.** Carrier Runway (authenticated), refs hosted on the unlisted draft then DELETED after the fire (verified 404). Pre-flight receipt written (GV-18) at `audits/tang/04-concepts/round5-room/PREFLIGHT.md` + session receipt. Three rolls in one batch: R1 nano-banana-2 pod-in-the-room, R2 nano-banana-pro night-light, R3 nano-banana-2 inside-the-booth. Prompts carry the protected list (pod slats, drum crown, red circular banquette, red pendant lantern, gold LED underglow ring, concrete wall, bonsai, wood floor, black table) + tang.yaml standing negatives + no-invented-architecture.
- **Measured, share of pixels (ink / red / amber):** OLD 18/16/34 · R1 31/23/13 · R2 40/17/10 · R3 50/28/7. R3 is the reddest and deepest; R1 keeps the most amber underglow.
- **Shown to her as ROUGH** (contact sheet `round5-room/round5-sheet.jpg`, opened in Chrome ~16:02, fast lane satisfied) AND placed in the page so she sees them in context: **R3 = Tang grid slot 2, R1 = hero strip tile 1.** Draft: https://6a8b4f753c117a3355ed4022--helloliftstudio.netlify.app/tang-asoul/
- **Not yet done:** cold verifier pass (DESIGN_CANON #7) before this goes to the manager — required, since a restaged room IS client-facing at send time. Her pick first.
- **16:35 ET, PROPOSAL v2 REBUILT to her structure ask.** Live draft: https://6a8b54fedb143e54db06997f--helloliftstudio.netlify.app/tang-asoul/ (opened in Chrome for her). Changes: BOTH client logos in the masthead over "A proposal for both restaurants"; the four-photo hero band split into two LABELLED pairs (A Soul 1,886/2 · Tang 86/2) so no photo is ambiguous; each restaurant now owns a three-beat section (STEP ONE the brand + palette card · STEP TWO the feed it produces · STEP THREE where those came from), A Soul first because 1,886 followers is the hook; the combined brand-kit section dissolved into those two; NEW "Six fixes to the two profiles" section in the Creation Cakes pattern (a "what is there right now" panel per restaurant + ranked fixes with WRITTEN suggested bio and name-field copy for each) carrying the handle change, which moved out of the top of Tang's section. Restaged room: R3 in the Tang grid, R1 in the hero band. Backup of v1 at `build_artifact.py.bak-v1`. Zero em dashes (verified).
- **Cold check by a staff agent found 8 things; 3 fixed, re-verified PASS by a second agent:** (1) the price line said "$1,900 if run separately · $800 per restaurant", which reads as a contradiction since 800x2=1600 — now "That is $800 per restaurant. Run separately they are $950 each, $1,900 the pair."; (2) the two mock feeds disagreed, 8 posts vs 12, both captioned "six of a twelve tile plan" — both now 12; (3) Tang's avatar was illegible at 78px because the logo file carried the tagline — re-cropped from the official 800px `tang-logo-primary.webp` to the 湯 + TANG mark only.
- **Left alone, named for her:** Tang has 2 before/after pairs to A Soul's 4 (only two Tang restages exist; more is a shoot, not an edit). The A Soul wordmark drifts slightly in some already-approved lifted frames (bowl reads ASOUL RAMEN without 一魂) — a re-roll of approved tiles, her call. Tang's TANG wordmark sits a touch tight to the circle rim.
- **17:05 ET, PROPOSAL v3 on her 10-item feedback list. Live: https://6a8b6378ddd480b61e396fe6--helloliftstudio.netlify.app/tang-asoul/** All ten applied and verified by a staff agent (8/8 text checks + slider interaction driven for real over CDP: press/drag/release/clamp/arrow keys, 0 JS errors):
  1. **"Asoul" is ONE WORD** everywhere including the <title>. Zero "A Soul" left. THIS IS CLIENT CANON NOW.
  2. Assistant-manager quote cut. 3. Both "six of a twelve tile plan" captions cut. 4. Step three renamed **"lifted up close"**, both sections. 5. **Real draggable before/after sliders** (Creation Cakes pattern: `.ba2`, clip-path on `var(--cut)`, handle + knob, "Your photo" / "Lifted" tags, pointer + keyboard). 6. Brand cards rewritten SHORT and plain: "Pulled from the branding already present in your restaurant"; killed "one light", "a lit set", "already solved it", "a red banquette inside a black timber cage". 7. Profile section no longer hands over the deliverable: the written bios and name-field copy are OUT, replaced by what we would address. 8. Pricing headline "the second restaurant does not cost what the first one does" replaced by **"Both restaurants, one price."** 9. Em dashes still zero. 10. "How it works" left as-is (her line was a list item with no instruction; asked her).
- **CAUGHT BY THE COLD PASS AND ACTED ON: two Asoul before/after pairs contradicted the "your food is never redrawn" promise and were PULLED from the proposal.** The matcha pair (before = 2 drinks on a table; lifted = 4 drinks in hands in SAKURA MATCHA branded cups that are not theirs) and the ramen pair (before = beef/corn/spinach bowl; lifted = chashu pork, no corn or spinach, plus an added milk tea). Both are earlier approved tiles, so this is a real defect in the frames, not in today's edit. Asoul now shows 2 sliders, matching Tang's 2. Drinks (2 to 1) and wontons (2 to 3) were kept: count and staging are composition, which her regen-fidelity line permits; a changed dish and invented branding are not. **Her call: re-roll those two, swap in different dishes, or leave Asoul at two pairs.**
- Captions rewritten to claim only what the picture shows ("Your drinks, restaged in the pod hall"), because the old ones asserted "same plate" and "the drink never changes".
- Backups: `build_artifact.py.bak-v1` (pre-restructure), `.bak-v2` (pre-feedback).
- **17:35 ET, PUBLISHED. https://helloliftstudio.com/tang-asoul/ is LIVE** (her "yep, published it" was the go; prod was still 404 when checked, so MIRA ran the promote). Unlisted, `noindex, nofollow`, nothing on the site links to it. Post-deploy verification: homepage 200, /tang 200, /tang/proposal 200, /creation-cakes 200, so `--dir=site-live` replaced nothing. 0 files changed on upload beyond the page itself.
- **SAKURA MATCHA PAIR RESTORED and a correction on the record.** Megan: *"that is what's on the original photo... they have that pink Sakura Matcha sticker on them in the screenshot photos too."* She is right. Verified: the badge reads 櫻 / SAKURA MATCHA / さくらコンテスト on BOTH the customer's original and the lifted frame, same wording, colour, placement, relative size; and `toolbox/shoot/recipes/soul-ramen/round7/PREFLIGHT.md` already listed it under Protected features. MIRA had written the false claim into `audits/asoul-ramen/CLIENT_CANON.md` on a cold reviewer's word; that line is now struck with the evidence and the lesson: **a cold reviewer who has not read the client's protected-features list will call real client branding fake. Read the recipe before pulling a frame.** Asoul is back to 3 sliders, Tang 2. The ramen pair (dish changed) stays out; she did not ask for it back.
- **DM DRAFTED for both accounts** at `audits/tang-asoul-proposal/DM_DRAFT.md`, v2 carrying her four additions (owner-may-not-know hedge · "for potential social media and content support" · "entirely from the photos you already have" · the expertise line "built from simple photos and a suite of tools that take them to the next level", her Creation Cakes note). 126 words, a 104-word cut beside it, zero em dashes. **She sends it, never MIRA.**
- **Open and flagged, never guessed: the assistant manager's NAME is nowhere in the repo.** Using it would sharpen the opener.
- **17:50 ET, her catch: the birdcage frame at the TOP was not the one in the Tang feed.** Correct, and she named the better one. R1 (`round5-room/R1-pod-nb2.png`, the pod as an object in the room with the gold underglow ring) now fills BOTH the hero band and Tang grid slot 2; **R3 (inside the booth) is retired from the proposal** and stays banked in round5-room. Verified on the live page by hashing every inline image: the hero "Tang's birdcage dining room" and the grid "The dining room" are now byte-identical, which is the same pattern Tang's boba pour and Asoul's logos already follow. **Republished to PROD** (helloliftstudio.com/tang-asoul 200 / 1.85 MB; homepage and /creation-cakes still 200, 1 file uploaded).
- **Room frame verdict, settled:** R1 is Tang's room shot. The keep/kill question from 16:00 is closed.
- **17:58 ET, her catch: the footer carried helloliftstudio@gmail.com.** Corrected to **megan@helloliftstudio.com** (now a mailto link) plus helloliftstudio.com above it, matching the format on `/tang/proposal`. Swept the rest of the live site: this page was the ONLY one with the gmail address; homepage (2), /tang/proposal (1) already used megan@. Republished to prod, verified live: 2 hits for megan@, 0 for the gmail. **Client-facing contact for Lift is megan@helloliftstudio.com; the gmail is the account login, never the address on a deliverable.**
- **Still open, in order, one at a time:** (0) her read on v3; then which room frame wins, R1 / R2 / R3; (1) ~~her yes on the $1,600 bundled rate~~ APPROVED (PRICING_RATIONALE.md; concede month one to $800, never the recurring); (2) promote to prod and retire the artifact link; (3) send to the manager; (4) JT room photo to disk; (5) Tang's four food tiles short on red (not blocking the send).


### ▶ 2026-08-23 ~14:35 ET · **THE "OTHER SESSION" IDENTIFIED: a cloud session on Megan's phone, running off a July-12 clone of ~/.claude (GitHub repo `mira-global-toolkit`), republished the proposal blind. Its branch is QUARANTINED, not merged.** (MIRA)

- **What overwrote the artifact** (version `1787508111-448c`, ~14:22 ET): cloud session on branch `claude/asol-tang-proposal-g0cmuf` of `mira-global-toolkit`. It had no Lift folder, no `PALETTE_LOCKED` / `TANG_PALETTE` / `TANG_ART_DIRECTION`, no brand-kit section, no "crop the room and leave it" law, no pricing revision. Its own lock says what it did: A Soul first, draggable before/after sliders (4 A Soul, 2 Tang), about a third of the copy cut, three image defects fixed (a reviewer's name burned into the Tang room shot, carousel arrows in an A Soul customer photo, a "wordmark" that was a crop of a wooden rail). It kept Tang's birdcage tile as the raw photo.
- It also generated **three Runway room renders** of the birdcage (nano-banana-pro; task IDs sit in that branch's STATUS.md) and asked a local session to fetch and show them. **Dead on arrival:** Megan killed generated room tiles at ~13:45 ET today. Do not fetch, do not show.
- **Clock correction:** the three entries below this one carry UTC written as ET (18:15 = 14:15 ET); the commits (13:27, 13:32, 14:02) are the true clock. Sequence: local brand-kit republish ~14:02 ET, cloud republish ~14:22 ET.
- **Reconcile before any republish.** Live = cloud version (sliders + defect fixes, no brand kit, old pricing). Disk `audits/tang-asoul-proposal/artifact.html` + `build_artifact.py` = brand-kit version (both real palettes, real room photo, real logos, 30-photo pricing). Worth carrying from the cloud copy: the three defect fixes, possibly the sliders. Resume shape: fresh thread, a subagent fetches the live version (1.6 MB of inlined images, never the main thread), merge into `build_artifact.py`, republish with `url` set. The decision on this reaches Megan AFTER the phone-session fix (root lock, 8/23 14:35).
- "Mira, pick up the proposal" still works; read this entry first.

### ▶ 2026-08-23 ~18:15 ET · **STOP: the proposal artifact was republished by ANOTHER session. This thread's copy is stale. Do not republish from here.** (MIRA)

- The artifact at https://claude.ai/code/artifact/fd6b7242-9641-43c1-b17e-42d87e0a9886 is now version `1787508111-448c`, published by a session that is not this one. The local file at `audits/tang-asoul-proposal/artifact.html` and this thread's build script no longer match what is live.
- **Publishing from this thread would overwrite that other session's work.** Not doing it. Any further edit must start by reading the live version.
- **This was NOT Megan.** No input from her since the brand-kit section landed; this is a background notification only.
- **The safe resume:** in a fresh thread, WebFetch the live artifact first, reconcile it against `build_artifact.py`, then edit. Fetching it here is the wrong move because this thread is already past 8MB and the page carries about 1.6MB of inlined images.
- Everything else in the entry below this one still stands.

### ▶ 2026-08-23 ~18:05 ET · **Brand-kit section added to the proposal, showing BOTH real palettes. The kit stops being a promise and becomes the proof.** (MIRA)

**Resume phrase: "Mira, pick up the proposal."**

- **Her ask:** *"include how we create the branding kit, like how we did that for creation cakes. The first thing I would do for each brand is develop the branding for it so that there is harmony in the social account... I can show a sample brand kit recommendation for both brands."*
- **Built as PROOF rather than description**, because both kits already exist from today's work. The section sits BEFORE the two client sections (it is the first thing done, so it reads first) and shows each palette as a real swatch bar plus its one-line thesis:
  - **A Soul, "one light":** ink · the five-value amber ramp · seal red · sakura. *Your bowl already solved it. A warm photographic world, with black and red as the seal on top of it, never as the field.*
  - **Tang, "a lit set":** two inks · three reds · wood · gold · neon blue. *Your birdcage already solved it. Black builds it. Red fills it. Gold and blue only ever come from a light.*
- **The closing line is the real sales argument and it is true:** two restaurants, two deliberately different worlds, which is why the two feeds will never look like the same agency made them. That claim is defensible because the palettes were measured off each room, not chosen.
- **Also carried:** A Soul's logo red note ("your logo red turned out to be the same red as the room, so there was nothing to reconcile") is Tang's, and it is a genuine finding from the measurement, not flattery.
- **Proposal republished, same URL:** https://claude.ai/code/artifact/fd6b7242-9641-43c1-b17e-42d87e0a9886
- **Still open and unchanged:** her yes on the $1,600 · the A Soul logo crop needs her eye (no logo file on disk) · the JT room photo owed to disk · the two A Soul roll-picks · Tang's four remaining food tiles still short on red.
- **PAYLOAD: thread is past 8MB.** Canon is swept and current through this entry. A fresh thread resumes cleanly from this lock plus `TANG_PALETTE.md`, `TANG_ART_DIRECTION.md`, `PALETTE_LOCKED.md`, `soul-ramen.yaml` and `PRICING_RATIONALE.md`.

### ▶ 2026-08-23 ~17:45 ET · **She killed the generated room tile. New law: a room does not need lifting, crop it and leave it. Pricing revised photo-heavy. Real logos in.** (MIRA)

**Resume phrase: "Mira, pick up the proposal."**

- **KILLED: `round4-brand/tang-room-pro.png`.** Her words: *"that's not what the restaurant looks like. You took a little too much creative freedom."* Replaced with their REAL photograph, `02-assets/cropped/14_interior-birdcage_RebeccaPavlick_5days.png`, centre-cropped square and nothing else done to it.
- **THE LAW THIS PRODUCES, and it is the most transferable thing from today: A ROOM DOES NOT NEED LIFTING. CROP IT AND LEAVE IT.** The Lift promise is a dish photographed badly in a good room, moved to a better setting. A room has no such gap: it already looks how it looks, so a generator has nothing to anchor to and produces a plausible restaurant that is not theirs. **Before generating anything, ask whether the subject has a gap between how it looks and how it photographs. Food does. Product does. A designed interior does not.**
- **Her four designated reference photos** (sent 2026-08-23) are now the only truth for that room: Rebecca Pavlick (birdcage pods, red circular banquettes inside), Theodore C (aisle, blue mural windows), Tang official (wide aisle), JT (red booths, bamboo dividers). Three are on disk as `14_`, `11_`, `07_`/`10_`. **The JT frame is NOT on disk and is owed there under GV-16.**
- **PRICING REVISED on her direction** (*"more photo-heavy for sure, maybe like 30 photos, with an option if video is of interest"*): the bundle now leads with **30 finished photographs per restaurant per month**, video pulled out of the bundle entirely and offered as a separately priced add-on (10 concepts per restaurant, filmed on a phone by whoever is on shift). Lighter tier is 15 photos each; single restaurant is 30 photos. **The $1,600 number has NOT moved and is still unapproved.**
- **REAL LOGOS IN THE PROFILE MOCKS**, replacing the CSS placeholder circles. Tang's is the real file (`02-assets/official/tang-logo-primary.webp`). **A Soul's is a crop off their website hero and needs her eye** — there is no standalone A Soul logo file on disk, and I did not want to fake their mark. If the crop is off, the fix is her dropping the file in.
- **Proposal republished, same URL:** https://claude.ai/code/artifact/fd6b7242-9641-43c1-b17e-42d87e0a9886
- **PAYLOAD: this thread is at ~8MB and errors have been measured from ~7MB up on this machine.** Canon is swept and current as of this entry. A fresh thread is the right next move; everything needed to resume is in this lock plus `TANG_PALETTE.md`, `TANG_ART_DIRECTION.md`, `PALETTE_LOCKED.md` and `soul-ramen.yaml`.

### ▶ 2026-08-23 ~17:25 ET · **REAL PROFILE NUMBERS IN AT LAST (she sent both screenshots). Proposal restructured visuals-first, Tang room tile shot. A SOUL HAS 1,886 FOLLOWERS AND 2 POSTS.** (MIRA)

**Resume phrase: "Mira, pick up the proposal."**

- **VERIFIED FROM HER SCREENSHOTS, 2026-08-23 ~13:09.** The 403 blocker is closed.
  - **@asoulramen** "Asoul Ramen": **2 posts · 1,886 followers · 2 following.** Bio is the street address only (3735 Capital City Mall Drive, Camp Hill, PA). Name field says nothing searchable. Two posts are a sakura reel and the logo card.
  - **@tangdumpling2026** "TANG Dumpling": **2 posts · 86 followers · 1 following** (was 84 on 8/19). Bio "Not Just Dumpling". Both posts are reels with baked-in text overlays.
- **THE HOOK IS NOW A NUMBER, NOT AN ARGUMENT: A Soul has 1,886 followers and has shown them two posts.** Those people already opted in. That single fact does more selling than any paragraph, and it went to the top.
- **Restructured on her direction** (*"visuals at the very top, too much text, get right into the visuals, no fluff, this is going to the manager"*): full-bleed four-image band before any copy · masthead cut to one line · the three numbers as the hook · the AM quote and the customer-post evidence trimmed to one short block · **Tang's handle recommendation moved to the TOP of its section as the opening ask**, since @tang_dumpling is free and 86 followers means nothing to lose.
- **TANG ROOM TILE SHOT** (`audits/tang/04-concepts/round4-brand/tang-room-pro.png`), her ask for "one shot of the space, lighting high, professional look." Built from `room-birdcage-straight_REF.png`, normal lens, straight on, verticals parallel, with the 8/20 0.5x-warp rejection guarded explicitly in the prompt. **It measures 22% red where the five food tiles average 3%.** One room frame carries more of Tang's brand colour than the entire food set, which is the grid-red fix arriving as a by-product of what she asked for on instinct.
- **Tang grid now:** dumplings · ROOM · ramen steam / boba pour · crepe cake · potstickers. The room sits at position 2 to break the food run; the two dark anchors (room, pour) fall on a diagonal. Siu mai dropped, dim sum already covered by the dumplings tile.
- **Proposal republished, same URL:** https://claude.ai/code/artifact/fd6b7242-9641-43c1-b17e-42d87e0a9886
- **Note:** her message carried a Wispr Flow referral line and a fragment ("By the way, Mira, Lift") that were dictation noise, not instructions. Not acted on.
- **Still the one blocker:** her yes on the $1,600 bundled rate. Also open: the two A Soul roll-picks, the JT red-booth photo to disk, and the four remaining Tang food tiles still needing red.

### ▶ 2026-08-23 ~16:55 ET · **CLOSED. A Soul feed final at 6 tiles, combined proposal built and live, Tang brand kit measured. ONE thing blocks shipping: her yes on the bundled rate.** (MIRA)

**Resume phrase: "Mira, pick up Asoul" or "Mira, put the red back in Tang."**

**Two links on her phone, both private, both current:**
- Proposal (Tang + A Soul, one scroll, DM-ready) https://claude.ai/code/artifact/fd6b7242-9641-43c1-b17e-42d87e0a9886
- Tang brand kit https://claude.ai/code/artifact/4b4227bf-b9b8-4c88-96e0-b2d401b6a808

**Done today, all approved by her:** K2 regraded to 2700K amber (`K2-amber-b`) · the raised backlit drink shot new (`N2-raised`) · the ramen tile combed, re-grounded and revised to her midpoint with the tall glass (`D9-ink-v2`) · the flower wontons shot at last (`W1-low`) · A Soul feed finalised at 3x2 · combined proposal built · Tang palette measured and ratios corrected by her · Tang boba swapped to the neon pour.

**THE ONE BLOCKER: the $1,600/month bundled rate is MIRA's recommendation, not canon.** §1.5 says a number MIRA proposes stays a proposal until Megan signs it. Nothing goes to the client until she does. Reasoning + what to concede on the call: `audits/tang-asoul-proposal/PRICING_RATIONALE.md`. Short version: discount the FIRST MONTH ($800), never the recurring rate.

**Queued behind it, none of it needing generation:** her @asoulramen screenshot (counts are blank, IG and Yelp 403 from here) · two A Soul roll-picks (G2-ink a/b, page still open in a tab; L1a-honey a/b) · the JT red-booth reference photo saved to disk · Tang's five drifted tiles need red put back (grid average red is 3% against a room at 26%).

**NOT swept, and saying so rather than doing it silently:** the Projects root still has ~68 uncommitted files older than 3 days, flagged at boot. Megan called time; a 68-file sweep is its own session and would have been unasked work at the end of a long one. It carries to the next session.

**Session note:** this ran long, and the last stretch was me debugging a gate after she asked a clarifying question. The fix was real and is committed (`4478c17`), but it was not what she asked for at that moment.

### ▶ 2026-08-23 ~16:30 ET · **Tang boba swapped twice on her call (condensation, then the neon pour). GRID-LEVEL AUDIT FOUND THE REAL DISEASE: Tang's feed has almost no red.** (MIRA)

**Resume phrase: "Mira, put the red back in Tang."**

- **Her two calls, both actioned:** (1) *"we did iterations of the boba that were a lot more elevated, with condensation on the outside"* and (2) *"let's do the neon pour in the feed."* The pour is now the feed tile; the condensation frame is banked at `audits/tang/04-concepts/round4-brand/boba-neon-condensation.png` and is available as a second drinks tile or a before/after.
- **The condensation route, worth reusing:** the frame she remembered the condensation on was `brand_red_pair`, which is the frame FURTHEST from her corrected palette (flat red field, no black structure, distance 124). So rather than use it, its one good property was moved onto the frame that already fit: one edit-in-place on `neon_pair`, "add condensation, change nothing else." Score improved 35 to 33, lids stayed plain (the round-2 invented lid logo was named as a negative), the TEA mark held. **Law: when a rejected frame has one good property, port the property, do not resurrect the frame.**
- **THE GRID-LEVEL AUDIT, and it is the real finding.** Scored all six Tang tiles as they sit in the feed: grid average **ink 42** (room is 40, correct) but **red 3%** against a room that runs **26%**, with five of six tiles at 0 to 4%. **Tang's second lead colour is effectively absent from Tang's feed.** No per-tile score surfaced this; only the grid average did. The neon pour is the reddest tile in the set at 12% and the darkest at 72% ink, so it works as the grid's dramatic anchor rather than as a typical tile.
- **One number deliberately NOT chased:** wood at 4% against 22%. Wood in this room is the plank floor, and a tabletop food close-up will never contain a floor. Room-level shares apply to room frames. Chasing it would repeat this morning's 70%-ink overshoot on A Soul.
- **So the re-grounding job is narrow: put red back.** Red here is booths, lanterns and the ceiling cove, all of which can legitimately sit behind a plated dish. It is the one missing element a food tile can actually carry.
- **Both artifacts republished, same URLs.** Proposal https://claude.ai/code/artifact/fd6b7242-9641-43c1-b17e-42d87e0a9886 · Tang brand kit https://claude.ai/code/artifact/4b4227bf-b9b8-4c88-96e0-b2d401b6a808
- **Note on my own verification:** the image-read budget was spent, so the condensation check and the boba comparison were both done on screen-sized copies rather than full-res files. Nothing pixel-level was judged from them.
- **Still owed:** her lock on the Tang palette, her yes on the $1,600 bundle, her @asoulramen screenshot, the JT red-booth reference photo saved to disk, and the two open A Soul roll-picks.

### ▶ 2026-08-23 ~12:35 ET · **TANG RATIOS CORRECTED BY MEGAN, and the re-measure proved her right. Two measurement errors of mine named and fixed. Board republished.** (MIRA)

**Resume phrase: "Mira, lock the Tang palette."**

- **Her call, from two whole-room photos she sent:** *"blue and yellow should be much more like accents, and red and black should be more like the main colors."* Correct on both counts.
- **ERROR ONE, mine: I averaged food close-ups into a room palette.** Food is warm by nature. Measured apart, the food frames run gold 14.2% / red 3.7%; the room frames run red 13.7% / gold 5.9%. Mixing them dragged the read toward amber and buried the red. **A room palette is measured from room frames. The food is the subject, not the ground.**
- **ERROR TWO, mine, and the more useful one: share-of-saturated pixels is structurally blind to black.** Black cannot be saturated, so that measure cannot see it at all. For a brand whose entire ground is black it is the wrong instrument, not a rounding error. **Measure share of ALL pixels whenever the ground is achromatic.** Re-measured across 13 room-only frames: black 24.5% · red 13.7% · warm wood 12.9% · blue 9.4% · gold 5.9%.
- **AND ONE THING ARITHMETIC STILL GOT WRONG THAT HER EYE CAUGHT:** blue measures 9.4% of the room but every bit of it is the backlit mural panels. That is one object, not a ground. **Area is not emphasis.** A large single feature still reads as a note. Worth carrying to every palette job.
- **PRESCRIBED RATIO NOW:** Ink 40% (the structure) · Lacquer red 26% (the brand, a field) · Warm wood 22% (the body, neutral, never a brand colour) · Gold light 8% (accent, the underglow) · Neon blue 4% (accent, the mural only). Red and black carry two thirds; gold and blue together are one eighth.
- **THESIS REWRITTEN** from "black is the structure, red is the glow, blue is the air, gold is the fixture" (which overweighted blue) to **"Black builds it. Red fills it. Gold and blue only ever come from a light."**
- **Board republished, same URL:** https://claude.ai/code/artifact/4b4227bf-b9b8-4c88-96e0-b2d401b6a808 — now carries a dedicated correction section naming both errors. Canon updated at `audits/tang/TANG_PALETTE.md`.
- **OWED, small:** her two reference photos are not on disk (they came through chat, and nothing new landed on her Desktop today). The 7-months-ago official interior is almost certainly already `02-assets/cropped/07` or `10`; the JT 4-weeks-ago red-booth frame looks new and should be saved into `02-assets/cropped/` under GV-16 so the corrected ratio has its source on disk.
- **Next:** her lock on the palette, then re-ground the five drifted tiles by edit-in-place. Do not touch the boba tile.

### ▶ 2026-08-23 ~12:10 ET · **TANG BRAND KIT BUILT, measured the same way A Soul's was. Diagnosis: the Tang tiles are in A SOUL'S palette, which is why she said Tang stopped looking good. Her lock owed on the palette.** (MIRA)

**Resume phrase: "Mira, lock the Tang palette" or "Mira, re-ground the Tang tiles."**

- **Her trigger:** looked at the combined proposal on her phone and said *"love it but now tang doesn't look as good lol."* Then, unprompted and correctly: *"I think we need to make a brand kit for Tang like we did with A-Soul."*
- **ON HER PHONE:** brand kit board at **https://claude.ai/code/artifact/4b4227bf-b9b8-4c88-96e0-b2d401b6a808** (built in Tang's own palette so it argues for itself). Combined proposal from earlier at https://claude.ai/code/artifact/fd6b7242-9641-43c1-b17e-42d87e0a9886
- **Canon on disk:** `audits/tang/TANG_PALETTE.md` (measured, marked PROPOSAL pending her lock) and `audits/tang/TANG_ART_DIRECTION.md` (the argument, the audit table, the fix). `audits/` is gitignored, so these live on disk only, same as A Soul's.
- **THE DIAGNOSIS, measured, share of saturated pixels.** Their room: red 17% / amber 56% / blue 12% / ink 15%. Four of the six proposal tiles are 82 to 96% amber with 0 to 2% blue and almost no red. **They are A Soul's book wearing Tang's name.** The one tile that passes is `boba-lifted-r1` (red 23 / amber 37 / blue 17) and it is the only one staged with the room reference in frame.
- **THE REAL LESSON, and it generalizes past both clients:** an image model left unprompted lights food in warm neutral amber, because that is what most food photography looks like. **A Soul's book happens to agree with that default, which is why A Soul landed fast. Tang's book disagrees with it.** Any client whose palette is not generic-food-amber must name its colours out loud in every prompt or the frames drift back to the default. This is why "it looked fine on its own" and "it looks weak next to the other client" can both be true.
- **THE RESOLUTION (Tang's version of "the bowl already solved it"):** the birdcage booth. A warm red glow held inside a black cage, in a cold blue room, under a gold fan neon. **Black is the structure, red is the glow, blue is the air, gold is the fixture.** A Soul is one light; Tang is a lit set. Six laws written, the sharpest being that A Soul has NO cool tone and Tang MUST have one, and it only ever comes from a light source.
- **Palette:** Ink `#0D0B0B`/`#151515`/`#1C1B1F` · Lacquer red `#5E0D11`/`#8B0F07`/`#A41A0C`/`#C9162B` · Burnt gold `#553B1E`/`#AA5114`/`#9E8135`/`#C4BCAC` · Neon blue `#343E4F`/`#4066A5`/`#82A6BE`/`#AABFE8` · Fan yellow `#D1BE5B`/`#F0CF40`. **Their logo red `#B8140C` sits inside the measured room-red ramp: the logo red IS the room red.**
- **A NEAR MISS WORTH KEEPING.** My first sample ran over 156 files from her 8/20 Desktop drop and returned "blue 36.5%". That folder mixes Brahmin work and an unrelated venue walkthrough in with the Tang material. Caught it, re-derived from 34 curated frames only. **A brand book built on the first pass would have been confidently, measurably false.** Law: derive a palette only from a curated, named set, never from a whole drop folder.
- **Next, and it is cheap:** re-ground the five drifted tiles by edit-in-place, roughly 90 seconds each, per the method proven on A Soul today. Do NOT touch the boba tile. Do NOT push red to a percentage; it is a glow from a practical source, and flooding a frame red is the same error as the 70% ink overshoot on A Soul's ramen.
- **Also still owed:** her yes on the $1,600 bundle, her @asoulramen screenshot, the two open A Soul roll-picks, and the two Tang tiles rejected 8/20 (0.5x-warp room, same-table ramen) which are not in the proposal.

### ▶ 2026-08-23 ~11:35 ET · **A SOUL grid finalised at 3x2, and THE COMBINED TANG + A SOUL PROPOSAL IS BUILT. One link, two sections, bundle priced. Her sign-off owed on the rate before it goes anywhere.** (MIRA)

**Resume phrase: "Mira, pick up the proposal."**

- **THE PROPOSAL:** `audits/tang-asoul-proposal/index.html` (+ `img/`, 24 assets, 2.2MB). Phone-first, single scroll, built for IG DM delivery per her 8/20 direction. Sections: the shared argument · Tang · A Soul · how it works · the bundle. Opened in Chrome 11:34 ET. **ROUGH round 1.**
- **PRICING IS MY RECOMMENDATION, NOT CANON.** Full reasoning in `audits/tang-asoul-proposal/PRICING_RATIONALE.md`. Printed: **$1,600/month for both** against $1,900 run separately, framed as $800 per restaurant, profile setup for both included ($500 one-time given away deliberately, because a one-time giveaway does not reset the recurring anchor). Fallbacks shown: $1,100 lighter tier for both, $950 single. **§1.5 says a number MIRA proposes is a proposal until Megan signs it. The link does not go to a client until she does.**
- **Her call concession, advised:** discount the FIRST MONTH ($800, half), never the recurring rate. Dropping to $1,400 feels similar in the moment, costs $2,400 a year forever, and can never be walked back up. $1,500 is the floor if she insists on a recurring cut. Free third lever: start immediately rather than at the top of a month.
- **A SOUL GRID FINAL, 3x2 six tiles:** pull · wontons · desserts · lineup(a) · rolls(a) · raised drink. Only one ramen so nothing doubles; the two drink tiles sit at 4 and 6 with the rolls between; the two lightest frames sit on a diagonal so brightness is spread, not banded.
- **Her rulings on my four grid findings, recorded so they are not re-raised:** cool shovel spoons KEEP ("that's what the color shovels are") · light sushi tile KEEP ("it adds some lightness") · double matcha and sakura-over-budget both fixed by dropping G1b from the feed. G1b and D9-ink-v2 are not killed, they moved into the proposal as before-and-afters.
- **LAW she proved by editing:** a grid finding is only as good as the grid it was measured against. My "the light tile is an outlier" call was right at eight tiles and wrong at six. Re-check grid findings after any change to set size before acting on them.
- **WHAT IS UNVERIFIED IN THE PROPOSAL AND MUST STAY THAT WAY:** A Soul follower and following counts are blank (IG and Yelp both 403 from here) and need her screenshot before this ships. Tang's "2 posts, 84 followers, follows 1" carries over from the proposal the AM already saw, so it is verified. The four customer-post credits (1 day, 5 days, 3 weeks, 2 months) come from the dated filenames in `tang/02-assets/customer-photos/`.
- **One honesty flag:** the six Tang tiles are pulled from her approved 8/20 twelve-tile lineup, excluding the two she rejected (the 0.5x-warp room and the same-table ramen). I did NOT re-verify them by eye this session, image-read budget was spent. She is the judge on those.
- **Owed:** her yes on the bundled rate, her @asoulramen screenshot, and the two open roll-picks (G2-ink a/b, L1a-honey a/b) which are showing roll a in both the grid and the proposal.

### ▶ 2026-08-23 ~11:15 ET · **A SOUL: D9 v2 APPROVED ("perfect, that's the one"). Grid mockup built and it caught four faults no single frame showed. Her call owed on the light tile.** (MIRA)

**Resume phrase: "Mira, pick up Asoul."**

- **APPROVED, FINAL:** `round17-ramen-ink/D9-ink-v2.png`. Her words: *"Perfect, that's the one."* Staged at `04-concepts/tiles/t-ramen.jpg`. Its 35% ink / #5C381B mean is now the working target for any Asoul interior tile.
- **What she is looking at:** `audits/asoul-ramen/asoul-grid.html`, Chrome. Phone-frame IG profile, 3-wide, eight approved tiles squared the way IG squares them, posts at full height below. Slot 9 left visibly empty.
- **THE GRID CAUGHT FOUR THINGS EIGHTEEN ROUNDS OF SINGLE-FRAME REVIEW DID NOT:**
  1. **Tile 7, the rolls, is the only light tile among eight.** Seven are ink-grounded; that one sits on pale honey and at thumbnail size reads as the odd one out rather than as variety. Round 14 nudged it cream to honey blond, correct against the palette *in isolation*. **LAW: a per-tile palette check is not a grid check. A tile can pass the book alone and still break the set.**
  2. **Tiles 6 and 8 are the same product twice, in the same row** (both sakura matcha, lineup vs four-hands). Two compositions, one product, two of nine slots. **Count products across a grid, not just compositions.**
  3. **Sakura is exceeding "once per nine"** — pink cups on 6 and 8, petals on 6, and the signature sakura tile is not even shot. The rule was written about the tree and is being silently spent by drinks packaging.
  4. **The dessert tile holds the only cool note in eight tiles**, the blue and grey shovel spoons. They are her own M1a law so they stay unless she says otherwise.
- **METHOD, for every client:** build the grid mockup BEFORE the set is finished, not after. Four real faults in one look.
- **Owed from her:** what to do about the light tile (re-ground it onto ink, or keep one light tile as a deliberate breather). Then the three roll-picks, none of which need generating, and the sakura for slot 9.

### ▶ 2026-08-23 ~10:55 ET · **A SOUL: wontons approved (W1), ramen tile revised to her midpoint with the tall glass. Two laws corrected by her, both now binding. Verdict owed on D9 v2.** (MIRA)

**Resume phrase: "Mira, pick up Asoul."**

- **APPROVED, FINAL:** `round18-wontons/W1-low.png`, the low raking wontons. Staged at `04-concepts/tiles/t-wontons.jpg`. W2 (overhead, five) killed, and her reason is the law below. She did not dispute the green sauce, so it stays as shot; do not raise it again unprompted.
- **PORTION-COUNT LAW (Megan, 2026-08-23), every client:** *"I don't think the dish is served with 5. Just for reality's sake."* The number of pieces in a frame is a factual claim about the menu, not a compositional choice. If the dish is served as 3, the frame shows 3, even when 5 composes better. Confirm the served count off a real source before any multi-piece plating shot; if it cannot be confirmed, match the client's own photo.
- **THE GLASS IS TALL, and this voids an old waiver.** Her words: *"the glass needs to be tall. There are no short ASOUL glasses."* Round 5 had already caught this, called tall the canon, then waived it as "not a kill either way at feed size." That waiver is now void and the line is struck in place in `soul-ramen.yaml`. Short glass is a kill. Every drink frame passes `refs/drink-glass-6x.jpg` as a shape reference and says "tall" in the prompt, because the generator defaults to short.
- **THE INK LAW, corrected by her:** v1 pushed ink to 70% and lost the room. The book's 15-21% is a RANGE, not a floor to beat. Ink anchors a room that is still visible; it never replaces it. An interior frame that goes fully black stops being an interior frame, and the honeycomb is the single most distinctive thing Asoul owns. **Generalizes: overshooting a compliance number is still a miss, and it reads to a client as "you deleted my restaurant" rather than as a technical fault.**
- **Her revision, one edit-in-place call:** `round17-ramen-ink/D9-ink-v2.png`. Ink 2% to 70% to **35%**, mean tone #A78157 to #35200F to **#5C381B**, both landing between the two. Cool 0% throughout. Tall glass in, Thai iced tea contents held, both printed wordmarks correct, pod wall and LED strip legible again, caddy still gone. On her screen at `audits/asoul-ramen/D9-v2.html`.
- **Prompt discipline worth reusing:** when a reference is passed for SHAPE ONLY, name what must not come across. The glass ref carried a red drink; the line "only the glass shape and height come from @glass, the drink inside stays the iced tea already in the picture" is what stopped it bleeding.
- **Owed:** her yes on D9 v2. Then the three older roll-picks, none of which need generating (G2-ink a/b, page open in a tab · G1b-ink a/b · L1a-honey a/b).

### ▶ 2026-08-23 ~10:40 ET · **A SOUL: the ramen tile was NOT compliant after all (ink 2% vs the book's 15-21%), now re-grounded; and the flower wontons are shot at last. Two verdicts owed.** (MIRA)

**Resume phrase: "Mira, pick up Asoul."**

- **What she is looking at:** `audits/asoul-ramen/comb-and-wontons.html`, Chrome. Section 1 is D9 before and after; section 2 is wontons W1 and W2. Labelled rough.
- **THE COMB-THROUGH FOUND A REAL MISS, and this file was the thing that was wrong.** `soul-ramen.yaml` said twice that D9 was "already compliant, shot in their real 2700K room." Measured: hue 31.3 pass, cool 0% pass, **ink 2% fail** against the book's 15-21% of every interior frame. All blond table, blond banquette, pale wall. Warm, on hue, and with no ground at all.
- **Fixed:** `round17-ramen-ink/D9-ink.png`, ink 2% to 70%. Edit-in-place, food and both printed wordmarks held, condiment caddy removed because its red bottle caps were a third red thing alongside the broth and the iced tea where the book allows one. Minor accepted drift: chopsticks sit a touch further forward, glass moved in slightly.
- **THE PATTERN, now twice in one morning:** "shot in their real room so it is fine" has been wrong on K2 and on D9, in opposite directions. K2 had a ground and no light; D9 had the light and no ground. The two-question audit is not optional even for frames staged in the real room.
- **A metric of mine turned out to be conditional, and I would rather say so than have it quoted at a client.** Median hue is a valid brand check only while the room is visible. Past roughly 50% ink the surviving saturated pixels are the food (broth about H22, fried crust about H26), so the number drops below the book's H28-H45 band and reads as a fail when nothing is wrong. D9-ink reads 22.5 for exactly that reason. **The cool-pixel test is the one that generalizes at any ink level.**
- **The wontons are shot:** `round18-wontons/W1-low.png` (three, low and raking, the flower stands up) and `W2-overhead.png` (five, straight down, long side shadows, graphic). Built on their own dish, verified against `refs/inspo/n6.png` before prompting. W1 cool 1% ink 69%, W2 cool 0% ink 37%.
- **Why this concept was the cheapest on the account:** the dish already IS the locked palette. Golden wrapper is the amber ramp, black slate is ink, tobiko is the seal-red punctuation. Nothing had to be invented or corrected. Worth carrying to other clients: shoot the dish whose own plating already matches the book first.
- **OPEN AND DELIBERATELY NOT RESOLVED:** their real sauce is pale yellow-green and it sits on the plate in both wonton rolls, most visible as the long diagonal in W2. She locked "green is OUT completely", but that lock was about the kelly wall as a brand colour, and "do not clean up the food" says a real sauce stays. Kept, kept small, and put to her. Do not resolve silently.
- **Two verdicts owed:** the D9 ink re-ground (keep or not), and W1 vs W2. Plus the three older roll-picks still queued (G2-ink a/b, page open in a tab · G1b-ink a/b · L1a-honey a/b).

### ▶ 2026-08-23 ~10:30 ET · **A SOUL: THE RAISED DRINK IS APPROVED ("N2"). Seven of nine concepts exist. What is left is three roll-picks and two never-shot concepts.** (MIRA)

**Resume phrase: "Mira, pick up Asoul." The next thing needs no shooting, only her eye.**

- **APPROVED, FINAL:** `toolbox/shoot/recipes/soul-ramen/round16-drink-honeycomb/N2-raised.png`. Megan, ~10:2x: *"N2."* Staged for the grid at `audits/asoul-ramen/04-concepts/tiles/t-drink.jpg`. N1 is killed as the direction but the frame is sound; banked, do not re-roll.
- **She was told about the oversized lime wheel before she picked and picked N2 anyway.** That is a verdict on the frame as it stands. Do not "fix" the lime unprompted.
- **CONCEPT LAW, new, and it generalizes:** raised and backlit beats held-out-flat for any drink tile on this account. A glass is a translucent hero, so putting the light BEHIND it is what makes it read expensive; lighting it from the front just lights a hand. Applies to any glass, bottle, or broth-on-a-spoon shot, any client.

- **What she is looking at:** `audits/asoul-ramen/drink-honeycomb-round1.html`, Chrome. N1 held out at chest height with the pods and staircase melted behind; N2 raised and backlit with the hexes large and graphic. Labelled rough. Files in `toolbox/shoot/recipes/soul-ramen/round16-drink-honeycomb/`.
- **Her brief, verbatim:** *"a photo like this where the honeycomb's in the background, but they're holding the drink. The honeycomb, let's elevate that at the background and make it look a lot more professional, high-quality photo. Just one glass is going to be held."*
- **Both her reference screenshots were already on disk.** Drinks = `refs/sr19.png`, honeycomb = `01-source/src-10`. Nothing needed re-sending. Built from real Asoul pixels: @glass is an sr19 crop at Lanczos 6x, @room is src-10 at 4x.
- **Measured:** N1 median hue 28.1 / N2 26.9, both inside the locked H28-H45 band, zero cool pixels in either. The drink's own red is the one red thing per frame.
- **THE TUMBLER PRINT HELD, first time in one pass.** The round-6 law records NB2 stacking the glass wordmark 2 of 3 times. Both rolls came back correct: one line "ASOUL·RAMEN" plus one kana row, red dot intact. The fix was stating the LAYOUT as a rule and naming the failure modes ("never stack, never repeat, never wrap twice"), not just quoting the words. Reusable for any client product carrying printed text.
- **Faults I can see at round 1, before her verdict:** N1 has a bright pale blown band of ceiling light crossing the mid-background that competes with the glass. N2's lime wheel sits high and reads oversized. Neither may bother her.
- **NEEDS FIXING, found this session: `01-source/SOURCES.md` is mislabelled.** It calls src-08 "inside a pod, LED seams blazing" (it is a sushi web-gallery tile on a blue/cream diagonal) and src-10 "the branded chopstick sleeve" (it is the wide honeycomb hall). Matters because SOURCES.md credits src-07/src-08 as the provenance of the honey blond `#E2D5BE` step in the locked palette. The hexes were measured and are not in doubt; which file they came off is.
- **Queue behind this, unchanged:** three roll-picks with nothing to shoot (G2-ink a/b, page already open at `audits/asoul-ramen/G2-ink-pick.html` · G1b-ink a/b · L1a-honey a/b) · one screenshot of the top of @asoulramen · the bundled rate · the flowery wontons (refs/inspo/n6, never shot) · round7 E1/E2 never verdicted · the grid rebuild.

### ▶ 2026-08-23 ~10:15 ET · **A SOUL K2 DONE AND APPROVED: "I love B. Amber." Five of nine tiles now on the locked palette. Three roll-picks are all that stand between here and the grid rebuild.** (MIRA)

**Resume phrase: "Mira, pick up Asoul" — the next thing is three roll-picks, nothing needs shooting.**

- **K2 IS CLOSED.** Megan, 2026-08-23 ~10:1x: *"I love B. Amber."* One word settled both open questions on this tile: the noodle variant is B, and the 2700K amber grade is the shipping look. FINAL FILE: `toolbox/shoot/recipes/soul-ramen/round15-K2-amber/K2-amber-b.png`. Staged for the grid at `audits/asoul-ramen/04-concepts/tiles/t-k2.jpg` (1045x1400, 3:4). K2-amber-a and both round11 noodle drafts are superseded; do not re-roll this concept.
- **One thing deliberately NOT guessed:** the section's existing tiles are 1080x1080 squares and K2 is 3:4. Square centre-crop vs 4:5 portrait is a GRID decision, not a tile decision, so the full frame is staged faithfully and the crop question belongs to the grid rebuild.

- **What she is looking at:** `audits/asoul-ramen/K2-amber-compare.html`, opened in Chrome 10:09 ET. Four up: A before | A amber | B before | B amber, on ink, with the locked swatch strip and the measurement table.
- **What was done:** K2 was the last approved tile not on the locked palette. It has no ground to swap (the white tee fills all four edges), so the rebrand was a LIGHT question: neutral daylight out, single hard 2700K tungsten in, shirt reads as warm ivory lit by their room. Edit-in-place, nano-banana-2 on Runway, 3:4 @2K, source geometry 1792x2400 preserved. Files: `toolbox/shoot/recipes/soul-ramen/round15-K2-amber/K2-amber-a.png` and `-b.png`.
- **Fired on BOTH variants deliberately.** The a/b noodle question was left open from 8/22 and the lock said "ask first". Rather than stall her for an answer and then run the edit, the same grade went on both, so her one pick closes the a/b AND the rebrand together.
- **Evidence, measured off the files:** median hue 35.7 -> 29.2 (a), 36.0 -> 28.7 (b), both inside the book's H28-H45 amber band. Cool pixels (H180-270) 39% -> 0% on both. Mean tone #B7A59D -> #BA8F68 / #B38A66. The "no cool tone in this brand" law is now literally true of this frame.
- **NEW, and it generalizes past this client:** a frame with no ground still has a rebrand cost, and it is the light. Round 14 logged "K2 needs no ground work" — right about the ground, wrong about the tile. A neutral-daylight frame in a feed where every other tile is 2700K breaks the grid even when its palette contains no banned colour. So the rebrand audit asks TWO questions per tile: what is the ground, and what is the light. Cheap test for the second: measure the share of cool pixels. Written into `soul-ramen.yaml` round-15 block.
- **Still open, unchanged from last night, in rough priority:** verdicts on G1b-ink a/b and L1a-honey a/b · one screenshot of the top of @asoulramen (IG and Yelp both 403 from here, so the profile header and finding 04 stay blank) · the bundled rate for the pricing section · the flowery wontons concept (refs staged at `soul-ramen/refs/inspo/n6`, never shot) · round7 E1/E2 never verdicted · rebuild the grid in `audits/asoul-ramen/04-concepts/asoul-section.html` with the locked-palette tiles.
- **Grid count:** five of nine tiles approved, and with K2 settled all five will be on the locked palette.

### ▶ 2026-08-22 ~23:30 ET · **A SOUL, CLOSED FOR THE NIGHT. Palette locked, every approved tile re-grounded onto it. NEXT SESSION: rebrand the white-tee ramen frame (K2).** (MIRA)

**Resume phrase: "Mira, pick up Asoul K2."**

- **THE NEXT JOB, her words:** "rebranding the one of the person in the t-shirt with the ramen bowl, just to make sure that aligns with the new branding." That frame is `toolbox/shoot/recipes/soul-ramen/round11/K2.png` plus its noodle revision (`K2-noodles-a.png` / `-b.png`, **and which of a/b she meant is still open, ask first**).
- **The actual design problem in K2, stated so the next session does not rediscover it:** K2 has NO ground to swap. A plain white t-shirt fills all four edges, which is what she asked for and approved. So the rebrand is a LIGHT question, not a colour-swap: the frame is currently lit by hard neutral daylight, and the locked book says every frame is amber, there is no cool tone in this brand, and never key on white. The likely move is a 2700K amber grade on the same frame (edit-in-place, "change only the light temperature and the shadow warmth") so the shirt reads as warm ivory lit by the room rather than studio white. A second option, if she wants it further on-brand, is swapping the tee for one of the amber-ramp values. Her call, one edit either way.
- **Palette is LOCKED** (her board, 23:15): `audits/asoul-ramen/PALETTE_LOCKED.md` is authoritative. Ink `#0C0C0D` 28% is the ground · honeycomb amber 65% at five values (`#E2D5BE` `#EBB543` `#C58734` `#966933` `#634320`) · seal red `#A23640` punctuation only · sakura dusty `#C38C84` once per nine. **Green is out completely** and the site vermillion `#D24E2A` is not a brand colour. `ART_DIRECTION.md`'s stale "awaiting Megan's call on the green" header now points at the locked file.
- **Tiles on the locked palette** (all in `round14-brand/`): G2-ink (approved) · M-ink-b (approved) · G1b-ink a/b and L1a-honey a/b, both **awaiting her verdict**. K2 needs light work only; D9 and the round-7 aerial were shot in their real 2700K room and are already compliant.
- **Method proven tonight, generalizes to every client:** a rebrand of an approved frame is an edit-in-place ground-and-light swap, roughly 90 seconds per tile. Composition, props, printed labels and pixel-true food all survive. Never re-shoot a frame the client already approved because the palette moved.
- **Still open, in rough priority:** her a/b on the K2 noodle edit · verdicts on G1b-ink and L1a-honey · one screenshot of the top of @asoulramen (IG and Yelp both 403 from here, so the profile header and finding 04 of the section stay blank) · the bundled rate for the pricing section · the flowery wontons concept (refs staged at `soul-ramen/refs/inspo/n6`, never shot) · round7 E1/E2 never verdicted · rebuild the grid in `audits/asoul-ramen/04-concepts/asoul-section.html` with the locked-palette tiles.
- **Known gap to fix, not cosmetic:** MIRA's own QC went blind mid-session when the GV-23 six-image cap hit and the `imgbudget-off` override was denied by the permission classifier. Two real defects were caught by looking (two arms on one cup in G1a, three hands in 3 of 3 frames in round 9) and everything from round 10 on reached Megan unchecked. The cap and creative QC need reconciling before the next long shoot.

### ▶ 2026-08-22 ~22:45 ET · **A SOUL: BRAND KIT LANDED ELSEWHERE AND IS NOT ON DISK. Six tiles approved tonight; the colour-ground ones are now provisional until the kit is written down.** (MIRA)

- Megan, 22:4x: "we just solidified the concept for the Asoul branding kit... everything that we've created that I've landed on is going to have to be redone through the branding that we just solidified. Some of these recent mock-ups, like some of the background colors, aren't going to work."
- **The kit is NOT in the repo.** Searched `sponsor-brand-kits/`, every `*brand*kit*` path in Lift Studio, the whole Projects tree for `*asoul*`, and everything created since 8/22 noon. The only Asoul brand document on disk is `toolbox/shoot/recipes/soul-ramen/BRAND_READ.md`, which reads the RESTAURANT's existing identity off their photos and is not the designed kit. GV-16 says this gets written down before it dies with the thread that made it. **That is the one thing owed by Megan.**
- **Also approved tonight, after the earlier entry:** `round13/M1a-pastel.png` (all three real desserts, two of each, on pastel plates on a sampled blue, shovel spoons scattered on the ground). Her reason is the reusable law: the shovels read as a scatter on the table, never as place settings on each plate.
- **Rebrand cost, assessed:** ground-dependent and needing a re-run = G2, G1b, L1a, M1a and the banked L2 pair. Ground-free and safe = K2 + its noodle edit (the white shirt fills the frame), D9, round7 E1. The fix is an edit-in-place ground swap on each approved frame, roughly 90 seconds per tile, not a re-shoot: composition, pose, props, crops and the pixel-true food all carry.
- Everything below still stands.

### ▶ 2026-08-22 ~22:35 ET · **A SOUL: SECTION BUILT + FOUR TILES APPROVED IN ONE EVENING (rounds 7-12). Grid is half-populated; her a/b on the K2 noodle edit is the only thing owed.** (MIRA)

- **Approved by Megan tonight:** `round8/G2.png` (matcha lineup, no hands, ground #DAABC3 sampled off her own inspo) · `round8/G1b.png` (matcha, four hands, "I love") · `round11/K2.png` + its noodle edit (the chopstick pull: white tee, standing, hard shadow across the shirt; "K2, it is love") · `round12/L1a-cream.png` (California rolls, cream #EAD8BB, hand-laid grid, parallel shadows). With D9 from 8/21 that is FIVE of the nine tiles the client grid needs.
- **Banked, liked but not chosen:** L1b, L2a, L2b (rolls, coral ground + hand). Not killed, not to be re-rolled.
- **Never verdicted:** round7 E1a/E1b (the styled aerial that replaced the "boring" middle tile) and E2a/E2b (the sakura flat lay, Sakura Matcha with the lid off). Both are built and waiting on her look.
- **Section:** `audits/asoul-ramen/04-concepts/asoul-section.html` (+ tiles/). Handle verified @asoulramen. Profile counts/bio still blank pending one screenshot from her: IG and Yelp both 403.
- **Laws this evening produced, all in `toolbox/shoot/recipes/soul-ramen.yaml`:** LIMB ACCOUNTING (she caught two arms on one cup in G1a; NB2 then put three hands in 3/3 frames of the next round and only "exactly TWO arms and TWO hands exist, because there is one person" held it) · the pull concept lives on ANGLE + SHADOW, not the pull (straight-on, seated, symmetrical is dead) · colour grounds are SAMPLED off her inspo, never eyeballed · never copy an inspo's dish (their rolls are rice-outside California, the inspo was salmon-wrapped: copying would invent a menu item).
- **Not done, stated to her:** MIRA's own QC went blind after the house image gate hit its 6-read cap and the override was denied by the permission classifier. G1a's two-arm error and round 9's three hands were both caught by looking; everything from round 10 onward she saw first. Worth raising the cap or fixing the override path for creative sessions.
- **Next, in order:** her a/b on the K2 noodle edit · the flowery wontons on colour (refs/inspo/n6) · mini desserts on little plates (n4/n5/sr12) · then the grid rebuild in the section, then the bundled rate.

### ▶ 2026-08-22 ~21:05 ET · **A SOUL SECTION BUILT (rough) — copy + IG grid mock on her screen; profile facts deliberately blank, waiting on one screenshot** (MIRA)

- File: `audits/asoul-ramen/04-concepts/asoul-section.html` (+ `tiles/`), opened in Chrome 21:05 ET. `audits/` is gitignored by design, so the section lives on disk only, same as Tang's.
- Built to her 8/20 direction: mirrors the Creation Cakes shape (profile header + full grid mock), NO bio-fix section, NO sliders, light-touch identity, effortless as the spine, the AM's "it kind of falls off" line quoted back as the section's hinge. Two supply modes presented (the bank / monthly + calendar).
- Handle VERIFIED tonight: **@asoulramen**, 3735 Capital City Mall Dr, Camp Hill. Direction item 8 ("handle unverified") is closed.
- Post / follower / following counts, bio and name field are NOT verified — Instagram 403s and Yelp 403s from here. Left visibly blank in the stat row and finding 04 flagged "needs your screenshot" rather than invented (§1.5 / verify-before-claims).
- Grid carries 3 built tiles (D9, D13a glass-repair, D3 overhead, square-cropped bottom-anchored so the rim mark survives) and 3 marked slots. Client version needs nine: katsu, sakura tree room, rolls close, a drink, pod from outside, one overhead group.
- Open, one at a time: (1) one screenshot of the top of @asoulramen; (2) keep/kill on D13a, still open from 8/21; (3) bundled rate for the pricing section (not in this file).

### ▶ 2026-08-21 ~12:50 ET · **A SOUL imagery: D11-D13 judged (all killed single-shot), masked glass repair on D13a PASSED and shown to Megan ~13:00; full ledger lives in the ROOT lock (`Projects/STATUS.md`) and `toolbox/shoot/recipes/soul-ramen.yaml`** (MIRA)

- Working prompts now on disk at `toolbox/shoot/recipes/soul-ramen/prompts/D8..D13.txt`. Verified tableware sheet v3 (no caddy). Judge's call: single-shot NB2 at its ceiling for the pod frame; last props by subtraction, then masked repair on the best frame. Megan's one decision, when she surfaces: send one phone photo of the real condiment caddy, or the caddy stays out of the frames.
- Everything in the 8/20 19:15 entry below is unchanged (fast-lane approval, lineup verdict, bundled rate still open).

### ▶ CURRENT — HER CHATGPT SHOTS WON THE ROOM, THE SCOUT REWROTE THE METHOD, ONE YES WAITS ON HER (2026-08-20 ~19:15 ET, MIRA)

**Resume phrase: "Mira, pick up Tang and A Soul."** (Prior thread died at payload ceiling — everything below is durable.)

**What happened after round 4 closed:** Megan fed her raw nest/booth photos to ChatGPT and got
three high-end restages in ~30s each; called the process gap unacceptable, live. She is right and
the evidence is in the repo: `audits/tang/02-assets/chatgpt-2026-08-20/` (3 shots + her BEFORE).
Two are IN the grid board now (nest = room tile, booth room tile); MIRA's verifier-clean
room-lifted-v4 moved to the bench. Known defect in both nest shots, zoom-confirmed: the floor
decal regenerated as gibberish — paint out or crop BEFORE the client page, it's in the board legend.

**Scout verdict (GV-22 dispatch, findings in `mira-brain/LEARNING/AI_RADAR_LOG.md` 8/20 evening,
stamps touched):** method gap, not model gap. Interiors/rooms = EDIT-IN-PLACE on her full photo
(gpt-image-2 first, NB2 second — both reachable via the Runway connector, so Higgsfield's 0
credits is moot). Food lifts = edit-in-place FIRST roll (NB2), escalate to rebuild-from-crops only
on drift. Rebuild-from-crops survives only for new-world composites/cut-outs. Real signage =
never a generator, mask/recomposite real pixels. Working rounds: photo → one edit call → her, ~2
min, no hosting step, no per-roll verifier; cold verifier runs ONCE at ship time on survivors.

**THE ONE DECISION WAITING ON MEGAN:** approve the fast lane (edit-in-place default + QC once at **RESOLVED 2026-08-21 ~13:15 ET: "yes." Gate GV-25 + CREATIVE_PROTOCOL Part 0 #9.**
ship). One yes also unlocks the staged CREATIVE_PROTOCOL Part 2 amendment + toolbox row updates
(staged in the scout's AI_RADAR_LOG entry, deliberately not written without her).

**Also still open:** her lineup verdict on the board · bundled rate + her 8/19 photo(s) for the
combined Tang + A Soul page · A Soul source mining (MIRA's job) · Tang round-4 ship list is
verifier-clean in RESUME "FINAL VERIFIER VERDICT".

---

### ▶ PREVIOUS — ROUND 4 DONE: ALL 8 GENERATED TILES VERIFIER-CLEAN FOR THE FIRST TIME (2026-08-20 ~18:55 ET, MIRA)

**Resume phrase: "Mira, pick up Tang and A Soul."**

**State:** her three 8/20 tile notes are built AND the cold fresh-eyes verifier (the debt
carried since round 1) ran on every generated tile — it failed 3 of 8 on the first pass
(melted XLB pleats on the round-1 dumplings, invented lantern fretwork, composited steam
plume), all three were re-rolled with the findings as prompt constraints, and the final set
is clean. Ship list in `audits/tang/RESUME.md` "FINAL VERIFIER VERDICT": dumplings-v6,
crepecake-v3, potsticker, scallion, siumai-v4, room-v4, ramen-steam-v2, table-aerial-v2.
Grid v2 board (`04-concepts/grid-v2-board/`) carries exactly these, opened for her in Chrome.
Three new client laws written to the RESUME (pleat-knot, fretwork-repeat, steam-physics);
friction strikes logged per GV-22. Dumplings took 3 rolls (count drift), room took 3 (the
silhouette tactic finally beat the fretwork problem) — both tactics noted in RESUME for a
future closeout promotion review, deliberately NOT promoted mid-stream.

**Engine:** Higgsfield hit 0 credits (free plan) — nano_banana_2 ran via the Runway connector
instead (same model, verified). One fallback step, circuit breaker respected. Megan decides:
top up Higgsfield or let Runway carry the default.
  DECIDED 2026-08-21 (Megan, AI OS thread): Runway carries the default. No Higgsfield top-up. Canon in memory reference_image-generator-fallback-chain.md + toolbox/shoot/HOW_TO_USE.md.

**WAITING ON MEGAN, one thing: her lineup verdict on the updated board.** Then the combined
Tang + A Soul proposal build, which still waits on (1) the bundled rate, (2) her 8/19
restaurant photo(s). A Soul source mining is MIRA's job, not started.

---

### ▶ PREVIOUS — MEETING WON. NEXT BUILD: ONE COMBINED TANG + A SOUL RAMEN PROPOSAL LINK (2026-08-20, MIRA)

**Resume phrase: "Mira, pick up Tang and A Soul."**

**State:** Megan showed `/tang` to the assistant manager in person 8/19 evening; the AM was
impressed and told her to DM both the Tang and A Soul Ramen IG accounts. Full direction for the
final deliverable is captured in `audits/tang/RESUME.md` under "2026-08-20 — THE MEETING
HAPPENED" (one link, section per restaurant + bundle rate, effortless/done-for-you as the core
message, CC-mirrored grid mockups WITHOUT the free profile-fix section, no sliders, light-touch
brand identity, aerial tile re-rolled tighter).

**Waiting on Megan before the build:** (1) the bundled rate — not in LIFT_SERVICES_REFERENCE_V3,
§1.5 forbids inventing it; (2) the photo(s) she took at the restaurant 8/19 evening. A Soul
Ramen has ZERO assets in the repo — source mining (IG/Google/Yelp) is MIRA's job, not hers.

**Same evening:** her 139 Desktop screenshots secured to
`audits/tang/02-assets/megan-desktop-2026-08-20/`; rough 12-tile grid v2 concept board built
(no generator) at `audits/tang/04-concepts/grid-v2-board/index.html`. Handle recommendation
locked: **@tang_dumpling** (she verified it available). **Her verdict: lineup APPROVED; two
tiles rejected with named laws (0.5x-warp on the birdcage, same-table-monotony on the ramen)
— see RESUME.** Next session = generation round: those two + the tighter table aerial, canon
pre-flight first, then the cold verifier debt (never run on any generated Tang tile).

**Still owed by MIRA, carried from round 3:** cold fresh-eyes verifier has never run on the
generated Tang tiles.

---

### ▶ PREVIOUS — TANG ROUND 3 IS LIVE. THE INTERIORS MOVED INTO THE FEED MOCK (2026-08-19 ~18:45 ET, MIRA)

**Resume phrase: "Mira, pick up Tang."**

**State:** `helloliftstudio.com/tang` rebuilt and deployed (draft checked, then prod, five routes
200, firewall verified). Commit `7ed4100`. Megan killed the standalone interior band and asked
for the room to appear inside the Instagram grid instead, off two references she named on her own
Desktop: `t.png` (Yelp birdcage booth) and `y.png` (black table, red banquettes).

Six tiles now: soup dumplings, **the birdcage booth re-shot straight on**, crepe cake /
**an overhead of their own table** carrying the potstickers and scallion pancake, **the ramen
re-shot low on the ingredients**, siu mai. Grid checked both directions, nothing repeats.

**Two new laws in the Tang RESUME, both worth reading before the next generation:** (1) for a ROOM
the room itself is the protected subject, so only camera and light may change, which is what stops
"improve the POV" turning into inventing them a restaurant; (2) Tang's real tableware is branded,
so every reference crop drags that mark in and the generator garbles it. The first overhead came
back with mangled pseudo-Chinese seals on the plate rim and sauce dish and was re-rolled. Standing
prompt language for it is in the RESUME.

**Still owed by MIRA, not by her:** the cold fresh-eyes verifier has still never run on any of the
generated tiles. Round 3 was checked by the building session only, including zooms on the plate
rims and both lanterns.

Full detail in `audits/tang/RESUME.md`. `audits/` is gitignored by design; the built page is what
is tracked.

---

### ▶ PREVIOUS — TANG ROUND 2 IS LIVE. FIVE OF HER SIX NOTES BUILT, ONE SHE CANCELLED, ONE CALL WAITS ON HER (2026-08-19 ~18:25 ET, MIRA)

**Resume phrase: "Mira, pick up Tang — I'll rule on the interior shot."**

**State:** `helloliftstudio.com/tang` rebuilt and deployed (draft checked, then prod, all four
routes 200, firewall verified helloliftstudio@gmail.com). Commit `1e6022d`. Hero is now
"Tang, Lifted / Same food. New setting.", pair tags read Before and Lifted, the feed grid is
full-bleed and is the biggest thing on the page, copy is cut to one method line, and two real
interior photographs were added.

**Her note #5 (full width) is CANCELLED and settled:** *"I forgot I told you I'm showing this on
my phone, so it's fine that it's built for mobile, that it's skinnier."* The 620px column stays.
Do not widen it in a later round.

**WAITING ON MEGAN, one thing:** her #7, the before/lifted pair on a restaurant shot. Not built
on purpose. An interior's subject is their actual room, so restaging it means showing Tang a
dining room that does not exist. Three options laid out in the Tang RESUME under "THE ONE OPEN
CALL". Everything else from her list shipped.

**Still owed by MIRA, not by her:** the cold fresh-eyes verifier has never run on the four newer
images (siu mai v4, scallion, potsticker, ramen). Round 2 was checked by the building session
only, at true 390px phone width.

Full detail, including the interior asset provenance and the headless-render trap that cost time
twice, is in `audits/tang/RESUME.md`. Note `audits/` is gitignored by design, so the build script
and assets are on disk only; the built page is what is tracked.

---

### ▶ PREVIOUS — TANG VISUAL PAGE LIVE. MEGAN GAVE 6 CHANGES FOR ROUND 2. **THREAD RETIRED AT ~16MB, START FRESH.** (2026-08-19 ~18:10 ET, MIRA)

**Resume phrase: "Mira, pick up Tang — round 2 of the visual page, her notes are in the RESUME."**

**State:** `helloliftstudio.com/tang` (visual hook) and `/tang/proposal` (full write-up) are both
live and verified 200. Megan saw the visual page and said *"okay, it looks pretty good."* She is
going to dinner at Tang tonight and can show what is live right now if she wants to. Nothing is
broken and nothing is blocking her.

**Round 2 is a REDESIGN of the visual page only, and her six notes are written verbatim in
`audits/tang/RESUME.md` under "NEXT ROUND, HER EXACT DIRECTION".** Headlines: kill the "Your food,
shot properly" hero for "Tang, Lifted / Same food. New setting."; retag pairs to "Before" and
"Lifted"; make the feed grid bigger; add an interior shot of food on their own restaurant table;
**stop being a skinny mobile column and use the full browser width** (`.wrap{max-width:620px}` is
the culprit); and cut the copy hard.

**Her interior screenshots are safe.** 19 screenshots she took 8/19 between 4:12 and 4:36 PM were
copied off her Desktop into `audits/tang/02-assets/megan-desktop-2026-08-19/` this session, so the
interior source cannot go missing when her Desktop gets cleaned.

**One judgment call flagged for the next session, do not resolve it silently:** an interior is not
food. The fidelity line protects the subject, and for a room shot the subject is their actual
restaurant, so rebuilding the setting around it would mean fabricating their space. Restage the
FOOD on their real table, or keep the interior as a straight crop, and ask her.

**Still open:** cold fresh-eyes verifier has never run on the four new images (canon #7, and it
caught a 0-for-3 failure earlier today); crepe-cake sugar dusting; customer-photo rights call;
unconfirmed `tanghershey1134@gmail.com`; §1.3 one-piece rule, now three prospects deep.

**Uncommitted:** `build-visual.py` (new), `build-deliverable.py`, `HOW_TO_USE_TONIGHT.md`,
`RESUME.md`, the new lifts and before-crops, and the Desktop screenshot set. Nothing is committed
yet because Megan has not approved round 2.

### ▶ TANG SPLIT INTO A SHOW-IT PAGE AND A SEND-IT PAGE. BOTH LIVE. (2026-08-19 ~18:00 ET, MIRA)

**Resume phrase: "Mira, pick up Tang — she's back from dinner."**

**The pivot (Megan, 17:35, before leaving):** *"today I'm going to the restaurant for dinner, so I
just want to have something more visual to show them... a bunch of snapshots of visually what I
can do... then I can follow up with 'I'll send you the full proposal.'"* So the deliverable split
in two, and this is now the pattern for any walk-in prospect:
- **`helloliftstudio.com/tang`** = THE HOOK she shows at the table. Pictures, almost no words, no
  gesture to fumble. Three before/after pairs plus a mock six-post Instagram grid. 1.98MB, dark,
  built by `audits/tang/build-visual.py`.
- **`helloliftstudio.com/tang/proposal`** = THE SEND. Diagnosis, stat block, pricing, services.
  1.15MB, built by `build-deliverable.py`, output path moved, content otherwise unchanged.

**Her three rejections at 17:35, all fixed and written as laws in `audits/tang/RESUME.md`:** the
siu mai was "lackluster and boring... the POV angle is weird" (re-rolled at a low three-quarter
angle with a styled slate ground and props, v4); the before frame is a customer's photo, not
Tang's (now tagged THEIR PHOTO everywhere, including the spoken script); and it was "cut off at
the top" (before frames are now letterboxed, contain never cover, AND two of them still had
Google review chrome baked in, re-cut from source).

**Three new restaged dishes** for the grid: scallion pancake, potstickers, ramen bowl. The
single-hero rule caught a real error pre-generation: the wonton source was a multi-item spread and
was re-cropped to the potstickers alone.

**Also corrected this session, both stale against the restage:** `HOW_TO_USE_TONIGHT.md` was
scripting Megan to tell the owner "nothing was faked, it is the same picture with the light
fixed", which is false of a restaged frame. Rewritten twice, now matches the two-link flow. And
the proposal page's own slider heading said "Same photograph. Same food." It now reads "Same food.
New setting."

**Deployed by CLI, draft then prod, all five routes re-checked 200** (`/`, `/tang`,
`/tang/proposal`, `/creation-cakes`, `/reveal/generations-in-bloom`). Netlify auth firewall-verified
on helloliftstudio@gmail.com. Zero em dashes, zero stale facts on the live pages.

**OPEN, and Megan knows:** the cold fresh-eyes verifier has NOT run on the four new images. Canon
#7 requires it before client-facing work and it caught a 0-for-3 failure earlier today. This round
had the building session's own audit only (contact sheet plus headless render at 485). Everything
else open is unchanged from the 17:15 lock: crepe-cake sugar dusting, customer-photo rights call,
unconfirmed `tanghershey1134@gmail.com`, and the §1.3 one-piece rule.

### ▶ CURRENT — TANG REBUILT THE RIGHT WAY AND LIVE. THE GRADE-ONLY LIFT IS DEAD, LAW WRITTEN. (2026-08-19 ~17:15 ET, MIRA)

**Resume phrase: "Mira, pick up Tang — the restaged page is live, she saw it after dinner."**

**What happened, short:** the 16:30 build's "lifts" were colour-grade passes on tiny customer
screenshots. Megan rejected them furious, and she was right: the house method (CREATIVE_PROTOCOL
Part 2, the Creation Cakes bars) is pixel-true product RESTAGED in a rebuilt setting, never a
filter. Root cause + the doc-conflict that enabled it are written in `audits/tang/RESUME.md` and
memory `feedback_lift-means-restage-never-regrade`. Her spec, now canon: LONG deliverable = CC
full audit; SHORT = three lifted before/after examples. Tang got the short version.

**Rebuilt via the CC pipeline** (ref crops 6x → Higgsfield hosting → Runway nano-banana-pro 2K
tagged refs). Round 1 of the restage FAILED the cold verifier 0-for-3 for food idealization;
re-rolled with the food's imperfections as protected prompt features; round 2 = SHIP on all
three, 7/7 defects confirmed fixed. **The cold-verifier gate before Megan sees anything is now
mandatory and it caught what my own contact-sheet pass missed.**

**LIVE, re-verified 17:15:** `/tang` carries the three restaged sliders (coloured soup dumplings
/ siu mai close / creme brulee crepe cake), honest method copy, correct facts, 0 em dashes;
`/`, `/creation-cakes`, `/reveal/...` all 200. 1.15MB page.

**Open:** (1) Megan reacts after dinner; (2) her photos from the table tonight = second-touch
material; (3) crepe-cake sugar dusting touch-up if she wants it; (4) customer-photo rights call
and unconfirmed tanghershey1134@gmail.com still stand from the 16:30 lock; (5) §1.3 one-piece
rule still undecided, now three prospects deep.

**This thread retired at its payload ceiling (~17MB) immediately after this lock.**


### ▶ CURRENT — TANG DUMPLINGS REBUILT AND LIVE AT `helloliftstudio.com/tang` (2026-08-19 ~16:30 ET, Opus 5)

Megan is going to Tang for dinner tonight and wanted the old proposal re-jiggered to the Creation
Cakes standard. She chose "live page on my phone + link to leave." Built, verified, deployed.

**The old 7/9 proposal was not fit to hand over and was NOT printed.** Two flat PNGs carrying the
wrong address (1205 vs **1134 Mae Street**), the wrong phone ((717) 298-0888 vs **223-900-5066**),
the wrong Friday/Saturday closing time, a 2025 copyright, **entirely generated food photography**
(LIFT_SYSTEM §2/§10 violation), and their logo silently redrawn from **湯** to **唐**, a different
character. It also gave away the whole $250 Instagram Refresh free, against §3 DIAGNOSIS SELLS.
Kept as the audit trail, never to be sent. Full table in `audits/tang/RESUME.md`.

**The new page:** their real 湯 mark, a five-finding diagnosis that names problems and withholds
every fix, a black "2 posts" stat block, cost-first how-it-works, **three before/Lifted sliders on
real photographs graded only, nothing generated**, direction framing, and four services quoted
verbatim from the menu per §1.5. 1.31MB, phone-first, light-locked, `noindex`. Verified: 3 sliders
painting and dragging, both brand fonts loading, zero horizontal overflow at 485 and 741, zero em
dashes, and the wrong address/phone appear zero times on the live page.

**Deployed by CLI, draft then prod, all four routes re-checked 200** (`/`, `/tang`,
`/creation-cakes`, `/reveal/generations-in-bloom`). Netlify auth firewall-verified on
helloliftstudio@gmail.com first.

**`LIFT_BUILD_QUEUE.md` item CLOSED:** Tang does have an Instagram. `@tangdumpling2026`, bio "Not
Just Dumpling", **2 posts, 84 followers, 1 following**, no link in bio. Dormant, and it is the
spine of the pitch.

**Megan has `audits/tang/HOW_TO_USE_TONIGHT.md`** — what to say, what the three sliders do, and
the three things not to promise (above all: do not hand over the bio rewrite in the room, it is
the $250).

**OPEN, HER CALL:** (1) the two customer photos are credited and the page is noindex, but they
belong to reviewers, not Tang — swapping them for Tang-owned assets is a one-line change;
(2) `tanghershey1134@gmail.com` came from a search summary and is NOT confirmed on their own site,
so it does not ship until verified; (3) §1.3 "exactly ONE remade piece" is at three lifts again,
the same question Creation Cakes left open on 8/6.


### ▶ CURRENT — GENERATIONS IN BLOOM V2: VISUAL EMAIL + REAL-LOGO SIGNATURE, STAGED (2026-08-19 PM, Fable 5, MIRA)

Megan's notes on the morning draft: signature not high caliber (wants the real logo), way too many words, needs visual taste. V2 built and staged same session:

- **SEND THIS ONE: draft `r-7277568749847968987`** (v4) in megan@helloliftstudio.com — the NEWEST in Drafts. All earlier drafts superseded.
- **V4 = her restructure:** gotcha opening replaced with a soft observational one, positioning line moved ABOVE the visual, the Instagram-button fault demoted to a free gift after the image, button honestly named "See both, side by side" (the destination is a two-slider reveal page, not a proposal). Structure + newly dictated positioning line both written into LIFT_SYSTEM §2.
- **⚠️ OPEN, HER CALL, BEFORE SEND: the reveal page contradicts the email.** `helloliftstudio.com/reveal/generations-in-bloom` still says *"your real work untouched"* and *"Your flowers are never altered, only the world around them"* — the exact claim the verifier made us retire from the email, because the restage rearranged stems. The email now says "restaged" and the page it links to says "untouched." One small copy edit + redeploy fixes it; the page copy was approved 7/14 so it is not being changed unilaterally.
- **POSITIONING LINE RE-LOCKED BY MEGAN 8/19** — the old one was AI-written in the 7/9 `_system` consolidation (`a446d88`), tagged "Megan may rewrite," never run past her, and rode into three drafts before she caught it. New locked line, her pick from her own homepage copy: *"I run Lift Studio. I work with businesses doing excellent work that their website and social don't reflect yet."* Written into `_system/LIFT_SYSTEM.md` §2 with a standing rule: **never invent copy that speaks AS Megan while her published words exist; an unblessed placeholder gets flagged, not carried.** This also closes the old em-dash conflict — the new line has none. Body ~65 words + before/after teaser (site's own wipe component frozen mid-drag, spray pair 00→01, Your photo/Lifted tags) + forest button, both linking to the reveal page + signature with the real circle mark. Morning draft `r-3880128668317725072` SUPERSEDED (not deleted).
- **Email assets hosted on prod** (Gmail strips embedded images): `/assets/email/lift-teaser-bloom-1120.png` + `/assets/email/lift-mark-circle-152.png`, deployed draft→verify→prod, all existing routes re-checked 200.
- **Signature v2 for Gmail Settings:** `assets/lift-studio-gmail-signature-v2.html` — Megan pastes once into megan@helloliftstudio.com settings and every hand-written email matches.
- **Fresh-eyes verifier caught, all applied:** "your flowers untouched" RETIRED (restage rearranged stems; the florist would spot it — new law: never claim untouched about a generated restaging); "these two" now matches by framing the image "Here's the first"; positioning-line em-dash swapped for a colon.
- **OPEN, Megan's call:** (1) positioning line dash-free version vs LIFT_SYSTEM §2 verbatim lock — bless "I run Lift Studio: I find..." as the new locked standard? (2) greeting "Hi Azlynn" vs the "Lindsey Ramm" IG name. (3) Delete the two superseded drafts (itemized: morning liftmail `r-3880128668317725072`; 7/14 gmail.com `r-7510003638149931172`)?

### ▶ SUPERSEDED SAME DAY — GENERATIONS IN BLOOM DRAFT REFRESHED, RE-VERIFIED, AND STAGED IN THE RIGHT INBOX (2026-08-19 AM, Fable 5, MIRA)

Megan asked to send "the Lift Studio Outreach email" from the new address. What happened:

1. **Sender settled: megan@helloliftstudio.com** (Megan's pick, and the LIFT_SYSTEM warmup rule agrees). `google-liftmail` verified live. `google-lift` (the gmail.com account) is `invalid_grant` again — 7-day External-client expiry, by design; re-mint only when the Sheet/old threads are needed (`toolbox/google-mcp/SETUP.md`).
2. **The 7/14 draft had gone stale.** Re-verified 8/19: they launched a NEW site (`uszticsflowershop.com` → `generationsinbloompa.com`); it still links the old social handles; the Instagram now presents as "Lindsey Ramm (@uszticsflowershop)", not "Usztics' Flower Shop". Copy rewritten to today's facts, Facebook claim dropped (unverifiable today), "websites" dropped from the service list. Warm check run: Megan confirmed COLD. Never contacted from liftmail (searched, 0 hits). Reveal page 200.
3. **NEW DRAFT `r-3880128668317725072` in megan@helloliftstudio.com Drafts**, signature baked in, no attachments, one link. The old gmail.com draft `r-7510003638149931172` is SUPERSEDED, not deleted.
4. **Megan's ONE action: open the draft and click Send.** Sends are hers, permanently.
5. **After the send (MIRA's job, needs the `lift` re-mint):** mark row 93 in the Pipeline sheet (it lives in the gmail.com account). Open flag: greeting is "Hi Azlynn" (Zola, 7/14); the "Lindsey Ramm" IG name hints at possible staff change — Megan may swap the greeting first.

Full record + refreshed copy: `content-bank/generations-in-bloom-regen-test/FIRST_TOUCH_DRAFT.md` (8/19 block at top).

### ▶ CURRENT — SENT, DEPLOYED, AND LIFT IS NOW A TWO-INBOX WORLD (2026-08-06 ~17:35 ET, Opus 5)

Three things closed in one session: the page went live, Megan sent, and the second Lift inbox got authorized.

**1. `helloliftstudio.com/creation-cakes` is LIVE** (see the deploy entry below — CLI only, drag-and-drop is dead).

**2. Megan sent 8/6 4:53pm ET — but NOT the drafted email, and she was right.** She sent her own warm note (subject `Social Media Support`, thread `19fd8d38302657b4`, from **megan@helloliftstudio.com**, link live, no attachments, full signature). **Creation Cakes is a WARM contact:** she DMs Viviane on Instagram and was picking up a cake from her on 8/7. The six-pass-QA'd cold open was the wrong instrument, and the tracker had actively misled by showing `Sent / No Response` against a wrong email (`customorders.sbarb@gmail.com`) and an Illinois phone number. **Full send record + the lesson at the top of `content-bank/creation-cakes-and-desserts/FIRST_TOUCH_DRAFT.md`; new standing rule in memory `feedback_ask-if-warm-before-drafting-outreach` — ask whether she already knows them BEFORE drafting anything.**
- **Brand Tracker row 6 updated:** contact corrected to Viviane / viviane@creationcakesanddesserts.com / (717) 298-6361, Response Status `Awaiting Reply`, Last Contacted 8/6, **Next Action: in person 8/7 at the cake pickup** (email follow-up only if that doesn't happen).

**3. `google-liftmail` is BUILT and LIVE → megan@helloliftstudio.com.** Verified end to end: firewall confirms the account, Gmail and Drive both answering. Built on its **own Internal OAuth client** (Cloud project `mira-liftmail`), so **its token does not expire every 7 days** the way `google-lift` does. Chrome Profile 6. Steps + rationale in `toolbox/google-mcp/SETUP.md`; FOUNDATION.md identity map amended.
- **THE TRAP, name it before it bites: a send from one Lift account is invisible to the other.** Megan's real send read as "never sent" until the right inbox was searched. Outbound + new threads = `google-liftmail`. Sheet, Drive, Netlify, Apps Script, all pre-August threads = `google-lift`. **Search both.**
- `google-lift` still runs on the External client and still dies every 7 days (its token was last re-minted 8/6 16:11). Internal isn't available to a plain @gmail.com; publishing the External app is the only lever and is **a proposal for Megan, not a settled fix** — it requests a restricted scope. Her call.

**Open, unchanged, needs her call:** the optional "five day-of posts a month" tier; the beach-cake slider defaulting to Sugar Rush; asking the client for their real logo vector; whether LIFT_SYSTEM §1.3 gets amended or this page is a deliberate one-off. **New:** whether §1.3's cold-open machinery should carry an explicit warm-contact branch now that one has come up.

Canon sweep for this session: `~/.claude/state/canonsweep/0b689984-4695-4c28-9ce9-f142056f4f27.md`.

### ▶ CURRENT — CREATION CAKES IS DEPLOYED. `helloliftstudio.com/creation-cakes` IS LIVE. (2026-08-06 ~17:30 ET, Opus 5)

Megan: "pick up Cake Creations... I have to go to Netlify, right?" She tried the documented drag-and-drop and Netlify refused it: **browser uploads cap zips at 10MB and this site is 17MB** (the proposal page alone is 8.6MB of base64-inlined images). **The drag instruction that was in this lock and in RESUME.md was wrong; it is now corrected in both.**

- **Deployed by CLI instead, and verified.** Draft first, checked `/`, `/creation-cakes`, and `/reveal/generations-in-bloom` all 200 with the right title and full 9.05MB payload, then promoted to prod and re-verified live. Netlify uploaded only 2 changed files, which confirms `site-live/` was a true copy of production and nothing was wiped.
- **The deploy command, auth, and site ID are in `audits/creation-cakes-and-desserts/RESUME.md` blocker #2** and in memory `reference_netlify-deploy-lift-site`. Auth already on disk under **helloliftstudio@gmail.com** (firewall verified before deploying). **Megan never needs to touch Netlify again — this is MIRA's job now.**
- **Blockers remaining, in order:** (1) **the send itself** — the email is written and QA'd at `content-bank/creation-cakes-and-desserts/FIRST_TOUCH_DRAFT.md`, recipient `viviane@creationcakesanddesserts.com`, and its link now resolves; (2) `google-lift` MCP still dead (`invalid_grant`), so the Gmail draft cannot be created from here — fix in `toolbox/google-mcp/SETUP.md`, or Megan pastes the draft herself.
- **Still open, unchanged, needs her call:** the optional "five day-of posts a month" tier; the beach-cake slider defaulting to Sugar Rush; asking the client for their real logo vector; and whether LIFT_SYSTEM §1.3 gets amended or this page is a deliberate one-off.

Canon sweep for this session: `~/.claude/state/canonsweep/0b689984-4695-4c28-9ce9-f142056f4f27.md`.

### ▶ CURRENT — CREATION CAKES: THE PROPOSAL PAGE IS DONE. TWO THINGS BLOCK THE SEND. (2026-08-06 ~17:05 ET, Opus 5)

Thread retired at ~9MB, image-heavy, by agreement. **Everything is in `audits/creation-cakes-and-desserts/RESUME.md` — read its top three sections before touching this.** Canon sweep for that session: `~/.claude/state/canonsweep/809b6221-3197-40ec-976a-f38a6735dc29.md`.

**What the deliverable IS:** `helloliftstudio.com/creation-cakes`. Not a file, not the Claude link. The page is 9.05MB, fully self-contained (zero external refs), phone-responsive, light-mode locked.
- **Megan's ONE action to ship it: drag `site-live/` into Netlify** (app.netlify.com → helloliftstudio site → Deploys). 17MB, contains the whole site, nothing gets wiped. `build-deliverable.py` rewrites `site-live/creation-cakes/index.html` on every run, so it is always current.
- Working preview only, never send this: `https://claude.ai/code/artifact/621eedee-5054-4ce9-8627-a946857ecea3` (private).
- **Never regenerate by hand.** `audits/creation-cakes-and-desserts/build-deliverable.py` is the only build path. Copy edits go in the source HTML; the proposal header, the how-it-works section and the sliders live in the build script because they depend on the inlined-image CSS vars.

**Three rounds done today, all Megan-directed:** (1) packaged 104MB of loose PNGs into one portable phone-ready page; (2) added the "how this actually works" section with two before/Lifted sliders ported from the live Generations in Bloom reveal; (3) twelve copy edits including a proposal title block with the client's own logo, a cost-first headline, a brand-identity framing for the three directions, a Services heading, and a budget note. Six cross-account lessons promoted to `~/.claude/CREATIVE_PROTOCOL.md` PART 3.

**BLOCKERS, in order:**
1. **No contact email for the shop.** Unchanged from the earlier session. Megan opens facebook.com/creationcakesanddesserts/about. Do not guess a local part.
2. **Not deployed.** Until she drags the folder, `helloliftstudio.com/creation-cakes` 404s and the email's only link is dead.
3. `google-lift` MCP is dead (`invalid_grant`), so the Gmail draft cannot be created. Fix in `toolbox/google-mcp/SETUP.md`.

**Open, not built, needs her call:** an optional "five day-of posts a month" tier she floated while correcting the turnaround language; the beach-cake slider defaulting to Sugar Rush instead of Sunday Best (measured, it aligns better); asking the client for their real logo vector.

### ▶ PRIOR — CREATION CAKES: THE EMAIL IS WRITTEN, THE PAGE IS STAGED, ONE THING MISSING (2026-08-06 PM, Opus 5)

Megan: "pick up Creation Cakes." Picked up at the point the 17.2MB thread died, which was the first-contact email. **Full detail in `audits/creation-cakes-and-desserts/RESUME.md` (top section) and the draft itself.**

- **The email:** `content-bank/creation-cakes-and-desserts/FIRST_TOUCH_DRAFT.md`. Git-tracked on purpose (audits/ is gitignored; a send record should outlive the folder). Six-pass QA'd, zero em dashes, zero banned words, one link, 209 words. Opens on the dead-loop domain, names two of their own desserts, and holds back the four other profile findings per DIAGNOSIS SELLS.
- **Two divergences from LIFT_SYSTEM, both recorded not hidden:** the close asks to connect (§4 prefers "the notes behind it," but her verbatim instruction was *"we should connect after"*), and the positioning line is rendered dash-free, which §2 allows her to lock once. **If she blesses the dash-free line it goes into §2 as the standard.**
- **Recipient: `viviane@creationcakesanddesserts.com`** (Megan, off their Facebook About panel, after eleven directories plus Facebook and Yelp all 403'd automated fetches). The address also confirmed the baker's name and spelling, **Viviane**, which search had only produced unsourced; greeting updated. §3 is vindicated: Facebook About is where the local-business email lives, and when the fetch wall blocks it the answer is one human glance, never a guessed local part.
- **Staged for the send:** the standalone page is at `site-live/creation-cakes/index.html`, so one Netlify drag gives `helloliftstudio.com/creation-cakes` and the send obeys §4's Lift-domain rule. Private artifact link is the no-deploy fallback.
- **`google-lift` MCP is returning `invalid_grant`** (known 7-day refresh-token expiry). Blocks the Gmail draft and the "never contacted before" check. Band-aid re-mint, or publish the OAuth consent screen once (`toolbox/google-mcp/SETUP.md`).
- **Flagged for her decision, not blocking:** this page is 18 images plus a five-point diagnosis, well past §1.3's "exactly ONE remade piece." Either §1.3 gets amended or this is a deliberate one-off; the next prospect asks the same question.
- **Housekeeping:** two identical artifact URLs now exist for the same page (a parallel session published at 15:40, this one again at 15:52). Canon is `621eedee-5054-4ce9-8627-a946857ecea3`; the other is flagged "do not send" in RESUME.

### ▶ CURRENT — THREE DIRECTIONS SPECIFIED + CREATIVE PROTOCOL PROMOTED HOUSE-WIDE (2026-08-05 ~19:30 ET)

Megan approved the rebuilt variety set ("this is really great... awesome job") and gave two new orders.

**1. Present the client THREE aesthetics, not one.** Defined as canon in `audits/creation-cakes-and-desserts/03-strategy/three-directions.md`, with a Lift-branded direction board built and headless-verified at `04-concepts/instagram/three-directions.html`:
- **A "Sunday Best"** — BUILT (the current 12-tile feed). Warm heritage: clay/plum/ochre, linen with the fold, brass, script type. Sells weddings and the custom-cake side.
- **B "Marble & Milk"** — her named ask. Cool modern patisserie: honed white marble, no fabric anywhere, one accent per post pulled from the dessert itself, harder shadow edge, no script type. Sells modern weddings, corporate, luxury.
- **C "Sugar Rush"** — dealer's choice. Saturated colour-blocked play (never pastel-washed). Sells birthdays, cake pops, walk-in impulse — the half of her book neither A nor B speaks to.

**Megan then said: "I like all these directions. Go ahead and execute for the feed for each one."** Executed as far as the tooling allows:

- ✅ **BUILT — the menu tile in all three directions.** `cc-menu-grid.png` (A) · `cc-menu-grid-B.png` (Marble & Milk: matte white seamless, harder shadow edge, Hanken caps letterspaced, no script) · `cc-menu-grid-C.png` (Sugar Rush: raspberry colour field with real light fall-off, Hanken Bold, cream labels). All headless-verified. This tile needed **no generator** — cut-outs are ground-independent, which is why it was possible at all. The three side by side are the proof the direction system works: identical six desserts, three genuinely different personalities.
- ✅ **BUILT — complete prompt kits for all 10 remaining photographs**, in `03-strategy/three-directions.md` → APPENDIX. Each carries the direction's surface/light/palette plus the shared negative-constraint block and the two never-optional structural rules. Paste-and-go.
- ⚠️ **NOT BUILT — the 10 photographs.** The Runway, Higgsfield, Vibiz and Gamma connectors all dropped mid-session (they were working earlier — this is a disconnect, not an auth failure; ToolSearch confirms no image-generation tool is reachable). **Nothing was faked or substituted.** The CSS grounds on the B and C menu tiles are marked PROVISIONAL in their source comments and should be swapped for generated marble / colour-sweep plates when generation returns.

**Megan approved the raspberry and said execute across all tiles for both brandings.** Generation was re-checked three ways and is still down (ToolSearch twice, plus a search for any local API credential — Runway here is an OAuth connector with nothing reusable on disk). The 10 photographs remain outstanding. **Deliberately did NOT manufacture filler tiles** — padding B and C with extra designed tiles would have let a tooling outage reshape the product away from the photograph-led feed A proved.

**GV-16 SAVE this round:** the reference crops — the fidelity anchor for every Creation Cakes image ever made — were living **only in the session scratchpad**. Now durable at `02-assets/reference-crops/` (11 native-res crops + 12 upscaled + a README with the crop/upscale/host procedure and tag map). Hosted URLs are deliberately not recorded: their JWTs expire in ~24h and would rot into false canon; re-host from the files instead.

**NEXT SESSION, in order:** (1) fire the 10 prompts from the `three-directions.md` appendix, re-hosting from `02-assets/reference-crops/`; (2) crop and host a cake reference for the B6/C6 cake-on-stand tiles (the only one missing); (3) swap the PROVISIONAL CSS grounds under the B and C menu tiles for generated marble / colour-sweep plates; (4) build the three-up client page — that page is the pitch, not the individual images.

**2. This method is now the protocol for ALL creative, every project** (her words: *"across the board for all of our projects across AMP3, Lift Studio, AdviseHer, and everything"*). `~/.claude/CREATIVE_PROTOCOL.md` restructured into Part 1 assembly (unchanged) + Part 2 generated client imagery (new): fidelity line, single-hero rule, reference pipeline, prompt construction, composition law, cut-out tooling, audit loop, and the compounding rule that every rejection becomes a named law the same session. Registry **GV-19** added, GV-13 amended, `build-data.py` run (88 items), plain-language layer and memory updated.

### Previous — VARIETY SET REBUILT AFTER MEGAN'S REVIEW (2026-08-05 ~18:40 ET, MIRA/Opus 5)

She reviewed round 1 and rejected four of six. **Her notes produced four composition laws that now outrank fresh judgment on this account — all written to the audit `RESUME.md`:**

1. **No-horizon rule** — never split the frame into a table band and a wall band ("half the background is the table, the other half is the wall. I really want to avoid that"). Shoot straight down, or fill the frame against one continuous seamless ground.
2. **Studio, not kitchen counter** — a single hero dessert never sits on woven fabric; it read to her as "sitting on a couch." Singles go on a clean seamless ground.
3. **The move she loves** — aerial + real linen with one fold left in the corner + crumbs where they fell. `v-blueberry-flatlay.png` is the named reference standard; variety comes from rotating palette and props inside that formula.
4. **Props must be physically honest** — "cake pops don't go in ramekins like that." Never invent a presentation the food wouldn't really have.

**Rebuilt:** mille-feuille (seamless plum, fills frame, layers read, one dessert only) · toasted coconut (clean studio seamless, sage plate, no fabric) · cheesecake (aerial on clay linen, fork, crumbs) · cake pops (aerial, laid flat, sticks fanned on ochre linen). **Cut entirely:** the bourbon/Blanton's drip cake — "doesn't look like it belongs, cut off at the bottom, really really bad." Deleted from the folder, do not re-add.

**Menu tile rebuilt from scratch.** Round 1 used circular crops that each carried their own background — she read that instantly ("they all look like just cropped images"). Now six true cut-outs on one paper ground, one shared shadow, one label style, per idea2. Getting there produced durable tooling canon: white-on-white keying destroys her white frosting and white cake pops, so cut-outs are generated on a vivid-blue chroma ground and keyed with documented thresholds + spill suppression; and the generator will re-shape a dessert if the prompt names only a category (asked for "pastry" it returned a round key lime pie instead of her rectangular napoleon). Both recorded in RESUME.

`feed.html` reflowed to 12 tiles, checked for repeats in both directions (the floral cake was appearing twice; swapped for the two-tier). Headless-verified.

### Previous — round 1 of the same session (superseded above where they conflict)

**Built and self-audited; needs Megan's eyes. Open `audits/creation-cakes-and-desserts/04-concepts/instagram/feed.html` in Chrome.**

Six new pieces, each a different shot type, every dessert held pixel-true: mille-feuille side/eye-level (plum) · cake pops hero in a crock (ochre) · toasted-coconut macro (sage) · blueberry overhead flatlay (blush) · cheesecake styled table (clay) · `cc-menu-grid.png`, the idea2 labeled tile built plate+type (her six real desserts as colour discs on generated text-free paper, live Caveat labels). Plus both Desktop cakes folded in on the **real-photo track** (crop + warm grade, no generator): the 7-cupcake board, and the bourbon drip cake — that one by law, since its Blanton's bottle toppers are branded text and generators garble text. `feed.html` reflowed to 12 tiles, ordered so no two neighbours share a shot type and the palette rotates row to row.

**Two things were rejected mid-build and are now recorded as method canon in the audit RESUME:** (1) a generated restage of her cupcake board **failed the count check — 6 rendered vs her real 7** — confirming that multi-item tableaux belong on the real-photo track, never through a generator; (2) a mirror-patch to remove an Instagram carousel arrow **grafted a visible duplicate cupcake** — cropping the UI chrome out is the fix, blind patching over content is a dead end. Also fixed a real GV-16 gap: last session proved the single-hero crop path but never wrote the crop coordinates down, so this session re-derived all of them. They are now canon in `RESUME.md`.

**Flagged honestly for her:** `v-cakepops-hero.png` is the weakest of the six — the pops read rounder and glossier than her hand-dipped ones and the pink is more raspberry than her bubblegum. Look hardest there. Flavour labels: Fruit Tart / Key Lime / Cheesecake / Cake Pops are verified off her own case signs; Toasted Coconut / Blueberry are descriptive and need her confirm; header copy is placeholder.

Still owed by Megan (only she can shoot): a real cut cross-section and a bite-on-a-fork of an actual cake interior — those are the two shot types the kit is still missing, and they cannot be fabricated. Also still the watermark-free original of the Alice pair; cc1 upload remains blocked by the local safety classifier (tooling, not licensing).

Next after her verdict: the "Your photo → Lifted" drag-reveal + captions/posting calendar.

### Previous Session Lock (2026-08-05 midday, preserved)
- Agent: Claude Code (MIRA, Opus 4.8)
- Date: 2026-08-05 ~12:30 ET
- State: **Creation Cakes — session CLOSED to shed image weight (recurring API error = too many full-res references held in context; nothing lost, RESUME is the record).** Two things settled this session: (1) the "Case, Three Ways" round-2 pieces (labeled grid, menu tile, counter-tower) were **REJECTED by Megan — "hard no across the board for Lift"** — fidelity failure, and it's a METHOD failure: reconstructing a whole case of many small pastries makes the generator redraw every one, so they read AI. (2) **Fidelity path now PROVEN** — Megan pushed back ("can't you pull the desserts from the case shot?"), she was right; a single dessert cropped from `cc2.png` at native res + upscale holds real detail, and she confirmed the fruit-tart single-hero restage "much better." The winning rule: elevate case desserts ONE HERO AT A TIME, never the whole tableau. Full detail + the fourth-axis fidelity law now in memory `feedback_visual-regeneration-fidelity-line` and the audit RESUME.
- **NEXT (approved by Megan): build the VARIETY SET.** Current feed reads monotonous — one shot type with cosmetic swaps. Render the tart + 3–4 other real case desserts each held pixel-true, across shot types (aerial · side · macro · cross-section · bite-on-a-fork), ONE labeled-grid tile per `idea2.png`, fold in the CC3 bars + Desktop cakes `~/Desktop/1.png`/`2.png`, reflow `feed.html` so rhythm varies. Reference map + crop coords + shot-type kit are in `audits/creation-cakes-and-desserts/RESUME.md` (audits/ gitignored → RESUME is the record). Self-audit fidelity + AI-tells + coherence before Megan sees anything.
- Still owed by Megan (only she can shoot): a real cut cross-section + a bite-on-a-fork of an actual cake interior (can't fabricate a cake inside); the original Alice-pair photo (watermark-free). cc1 upload still blocked by the local safety classifier (tooling, not licensing — settled in her favor); graded real-photo `cc1-lifted.png` holds the slot.
- After the variety set: the "Your photo → Lifted" drag-reveal + captions/posting calendar (the client-facing pitch).

## Previous Session Lock (2026-07-14, preserved)
- Agent: Claude Code (MIRA, Fable 5)
- Date: 2026-07-14 22:15 ET
- State: **Wednesday's first send is built and QA-passed.** Megan blessed the two Generations in Bloom finals tonight ("both, yes" — studio spray 01 + vase bouquet 06). Shipped (commit `562e20b`): the Lane V drag-to-reveal hook page (`site/reveal/generations-in-bloom/`, Lift palette/type, screenshot-verified desktop+phone) + the first-touch email draft with all six QA passes recorded (`content-bank/generations-in-bloom-regen-test/FIRST_TOUCH_DRAFT.md`). Prospect row added to the Pipeline sheet (row 93; never contacted — verified via Gmail search + sheet). Observed opener verified live: their site's social buttons still point to the old Usztics accounts.
- In progress / not finished: (1) **the reveal page is NOT deployed** — helloliftstudio.com is Netlify but no deploy config lives in this repo; deploy before sending or the link 404s. (2) **No public email exists for the shop** (site ×4 pages, Yahoo Local, Zola checked; WeddingWire 403) — send via their contact form or an address Megan holds privately. (3) This is 1 send of the planned 10 (5/lane) — the other 9 picks/hooks never happened (Mon/Tue got consumed by AI-OS work); Wednesday realistically = this send + the Monday reply-probe 5, not a 10-send day.
- New-address status (tested 2026-07-14 ~22:50): megan@helloliftstudio.com's FIRST-ever send (subject "test", empty body) went to mareeves93 spam. DNS is COMPLETE (SPF+DKIM+DMARC all verified live via dig) — cause = zero domain reputation + spam-shaped test, not broken auth. Warmup = real human emails at low volume for 2-3 weeks; she marked/marks it Not Spam. Daytime check queued: Google Admin console → Gmail → Authenticate email → confirm signing toggle is ON. Tomorrow's Generations send is unaffected (goes from helloliftstudio@gmail.com). Signature: rebuilt on current brand, she has the paste path.
- Next step (Megan, in order): **deploy = drag the `site-live/` folder** into Netlify (app.netlify.com → the helloliftstudio site → Deploys → drag the folder). That ONE deploy ships: the reveal page (/reveal/generations-in-bloom/, now side-by-side layout + hi-res before) + the site email fix (megan@helloliftstudio.com in CTA/footer) + the footer wordmark box fix (chrome-sweep gradient now hover-only). Then open Gmail Drafts (ready: → Generationsinbloom509@outlook.com) → SEND → mark sent in the Pipeline sheet. NOTE: the live site's true source was never in this repo — it's a client-side JSX bundle; `site-live/` is the reconstructed+fixed deploy copy (vendor js + assets downloaded from prod 2026-07-14); `site/index.html` is an older static version, not what's live. Signatures: `assets/lift-studio-gmail-signature*.html` rebuilt on current brand with megan@ — paste into the new Gmail (Settings → General → Signature). Late additions all in: hi-res bouquet before (no fake blur), Facebook-already-rebranded opener fix, pitch essence + calendar + services line, "Your photo"→"Lifted" labels.

## Previous Session Lock (2026-07-12, preserved)
## Previous Session Lock (Opus regen R&D, preserved)
- Agent: Claude Code (Fable 5 → switched to Opus 4.8 mid-session)
- Date: 2026-07-11 23:03 ET
- State: **Lane V content-regeneration recipe is now locked and proven across two brands.** Established the process live and committed it. The recipe: regenerate a client's real photo keeping the **product pixel-true**, freely reimagine props/composition/environment, **invent no unverifiable specifics** about their premises, sanity-check physics (raw food ≠ steam), and **self-audit every image for AI-tells before showing Megan** (realism/restraint > polish; over-styling/glow/creamy-bokeh = the tell). Vibe is dialable studio-editorial ↔ warm-approachable-workshop; match to the client's price positioning or show the range as the pitch.
  - **Tooling proven:** nano-banana-pro (via Runway) = default for photo regen that must hold the real product; Ideogram v4 `edit_image` = lead when the image carries logos/signage/text (spell real text out exactly). Ideogram hit a daily free-tier limit mid-session → Runway is the reliable path tonight.
  - **My Way Pizza** (`content-bank/myway-pizza-regen-test/`, 8 files + README): hero cheese-pizza game-day shot + full raw-pizza-kitchen batch; landed the low-close + no-invented-oven + no-steam version.
  - **Generations in Bloom** (`content-bank/generations-in-bloom-regen-test/`, source + 7 finals + this recipe): standing spray in studio-editorial AND warm-workshop vibes, plus the summer bouquet restaged hand→vase. Megan's favorites: studio spray 01, vase bouquet 06.
  - **Protocol amended:** `_system/LIFT_ANTI_AI_OUTPUT_QA_STANDARD.md` now covers generated imagery (three gates: fidelity · play-safe-on-specifics · does-not-read-as-AI), extending it from copy-only.
  - **Memory captured (3 durable rules):** `feedback_visual-regeneration-fidelity-line`, `feedback_regen-play-safe-on-unverified-specifics`, `feedback_regen-must-not-read-as-ai`.
- Dropped for now (Megan's call): med spas / hair / anything before-after-driven — that's a social-media-strategy problem (frame the untouched clinical image + coach capture), not a regeneration problem. Youveau Aesthetics flagged as a strong *future outreach* target (content so bad the upside is obvious) but bad fit for the regen recipe.
- Flag still open (unchanged): `IMG_6490.PNG` untracked in repo root — left uncommitted, still need Megan's confirm on keep vs clean up.
- Next step: pick final hero images per brand → write the Generations in Bloom first-touch outreach (rebrand angle + "here's your content, elevated") to convert this batch into an actual send. Wednesday 2026-07-15 first-sends date and Fable's dress-rehearsal queue remain the primary outreach path, untouched by tonight's R&D.

## Previous Session Lock (Fable 5 open, superseded by close above)
- Agent: Claude Code (Fable 5)
- Date: 2026-07-11 20:17 ET
- State: session open — fresh session per previous lock's next step; Ideogram connector tools now discoverable; goal = retry My Way Pizza hero shot via Ideogram vs nano-banana-pro, pending Megan's real interior photos.

## Previous Session Lock (Sonnet 5, 2026-07-11 — visual-regen R&D, preserved)
- Agent: Claude Code (Sonnet 5)
- Date: 2026-07-11 20:14 ET
- State: Ran a live visual-regeneration tool test for the Lane V content-bank pipeline (parallel R&D, not part of Fable's dress rehearsal below) against a real My Way Pizza & Grill Instagram photo. Compared Runway `gen-4` (failed food-identity twice — invented popsicle shape, then invented a mozzarella-pool cheese pattern despite explicit "do not alter the pizza" instructions) against Runway `nano-banana-pro` (held food identity correctly on both tries). Two rules came out of it, validated live: **(1)** food/product must stay pixel-true; props, styling, composition are fully reimaginable — don't preserve literal decor, elevate it. **(2)** regeneration must be grounded in real brand register and real occasion, not inferred — first nano-banana-pro pass styled My Way (a quick-service wood-fired shop) as an elegant country-kitchen July 4th picnic; corrected version fixed both once Megan named the actual brand facts (Hummelstown PA, wood-burning oven, any toppings, ready in minutes) and the real occasion (World Cup watch party, not a holiday). Both memorialized in `~/.claude/projects/.../memory/feedback_visual-regeneration-fidelity-line.md`. Final corrected image still read as "too AI" per Megan, specifically on rendered logos/patterns (soccer ball, jersey) — researched current tools, found **Ideogram v3** is named best-in-class for exactly that (95%+ logo/text accuracy vs <70% for Flux/Midjourney/DALL-E in 2026 comparisons), plus **Nightjar**/**Claid.ai** as purpose-built "preserve product, reimagine environment, avoid visual drift across a batch" tools worth evaluating — neither tried yet.
- In progress / not finished: Ideogram added two ways — a local `claude mcp add` registration (`ideogram`, never authenticated, redundant, removed this session) and a `claude.ai Ideogram` connector that IS authenticated per `claude mcp list` but whose tools never became discoverable via ToolSearch in this session — needs a fresh session to sync, which is why this session is closing. Still waiting on real My Way Pizza interior photos from Megan (has screenshots, not yet sent; the Google Business Profile photos link doesn't render via fetch — JS wall, same as Instagram). No image from tonight is send-ready. `nano-banana-pro` is the validated interim default for food-fidelity regeneration until Ideogram is actually tested.
- Flag, not resolved: `IMG_6490.PNG` (My Way Pizza screenshot) sits untracked in the repo root, byte-identical to a copy in `~/Downloads`. Not moved or deleted — unclear if Megan placed it there on purpose or it landed via some sync. Confirm before treating it as either "keep" or "clean up."
- Next step: **new session** → confirm Ideogram's tools are now discoverable (`ToolSearch` for "ideogram") → if yes, retry the My Way Pizza hero shot through Ideogram and compare against the nano-banana-pro result (currently only in the ephemeral session scratchpad — save durably if it's worth keeping past this session) → get the real interior photos from Megan and re-ground the shot in reality rather than inferred "wood-fired shop" styling. This is separate from Fable's dress-rehearsal queue below, which remains the primary path to Wednesday's sends.

---

## Previous Session Lock (Fable 5, preserved for continuity)
- Agent: Fable 5 (Architect mode)
- Date: 2026-07-09 23:55 ET
- State: **Consolidation landed.** `_system/` reduced from 25 files to 5; `_system/LIFT_SYSTEM.md` is now the single client-acquisition operating doc, `_system/LIFT_BUILD_QUEUE.md` the single build queue. Megan locked the open decisions live this session: **two co-lead lanes as a timed test** (Lane V visual / Lane S search, decision checkpoint 2026-08-07), SEO lane survives as co-lead, free hook = one remade piece only, invented website case studies come down and get replaced with real labeled spec work, price lives in the menu only. FOUNDATION.md Identity Map amended (second Lift sending address, accepted by Fable). `skills/liftaudit/SKILL.md` now loads the imported 990-line asset-verification protocol on every run. Local CSV tracker deleted — the Google Sheet `Pipeline` tab is the only tracker. Outreach resumes **Monday 2026-07-13** per `LIFT_SYSTEM.md` §6.
- Nothing shipped: no sends, no drafts, no sheet writes, no Apps Script, no push. All changes are local commits on `repo-consolidation-2026-07-02`.
- In progress / not finished: Claude Code build queue items 1–7 (`_system/LIFT_BUILD_QUEUE.md`) — critic pipeline skill first. Megan's pre-Monday items: Snov tracking off, invented case studies down, GPT netlify link fixed, megan@helloliftstudio.com stood up, Witmer web-team + Tang Instagram verified.
- Next step (revised same session, Megan's call): **Dress rehearsal first, before Monday** — a Claude Code session runs `LIFT_SYSTEM.md` stages 1–4 on two REAL Wednesday-batch prospects (one per lane): pick → hook-lite (20-min cap enforced) → hook build (this forces Creative Agent hook mode, build queue #3, into existence against real photos) → draft + full QA gates → **STOP at the send gate, nothing sent**. Report stage timings vs. targets (≤10 min Megan-time/hook, ~15/email) and anything the QA gates caught or missed. Rehearsal output = 2 of Wednesday's 10 hooks, kept. Then: Monday 2026-07-13 = reply-probe + site cleanup + remaining 8 picks; **first sends Wednesday 2026-07-15** (hard date). Claude Code queue after rehearsal: #1/#2/#4/#5. Warm replies may be offered a 15-min call (closing tool only — LIFT_SYSTEM.md §4).

## Current Source Of Truth

- **Operating doc: `_system/LIFT_SYSTEM.md`** (audit, offers, outreach, critic pipeline, tracker, two-lane test)
- Build queue: `_system/LIFT_BUILD_QUEUE.md` · QA gate: `_system/LIFT_ANTI_AI_OUTPUT_QA_STANDARD.md` · Legacy safety record: `_system/LIFT_LEGACY_AUTOMATION_AUDIT.md`
- Entry point: `ACTIVE_INSTRUCTIONS.md` · Local workspace: `/Users/meganreeves/Documents/Projects/Lift Studio`
- GitHub: `https://github.com/mareeves9311/Lift-Studios` (branch `repo-consolidation-2026-07-02`, local commits unpushed)
- Website: `https://helloliftstudio.com/` · Dashboard: `https://liftstudiosdashboard.netlify.app/`
- Google Sheet (the only tracker): `https://docs.google.com/spreadsheets/d/1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8/edit` — `Pipeline` tab is source of truth; do not rename/remove it (feeds the Netlify dashboard).

## Ground truth (established 2026-07-09, do not let docs drift from it)

72 sent threads (~55 businesses, Jun 11–Jul 2) · **zero prospect replies ever** · ~5 bounces · 0 clients · $0 revenue · every likely-human opener was a visual business. The full evidence base and killed hypotheses live in `_system/LIFT_SYSTEM.md` §9 (graveyard) and in git history (`_system/LIFT_FABLE_HANDOFF_2026-07-09.md`, deleted at consolidation per its own instruction).

## Active System

Manual-first, per `LIFT_SYSTEM.md`: Megan picks prospects (5/lane/week) → hook-lite → QA-passed observation-led email, no attachments, real-domain links only → Megan sends → Sheet updated same session → FU1 day 4–5, FU2 day 10–12, stop. Full `$liftaudit` depth only for paid or replied prospects. Every send is Megan's click, permanently.

## Legacy (unchanged)

The Apps Script outbound engine remains **LEGACY — DO NOT RUN** (`_system/LIFT_LEGACY_AUTOMATION_AUDIT.md` holds the risk register, decommission log, and reapproval rules). Open items: R3 (fail-open doPost — live un-deploy NEEDS HUMAN; repo-copy fix is build queue #7), R4 (sendEmail-capable variant un-quarantined), R5 (local↔live drift unverifiable without approved clasp). `enableAutoDiscovery` stays false forever.

## Do Not Touch Without Approval

- No AdviseHer or AMP3 files in this repo.
- Do not rename/remove the Google Sheet `Pipeline` tab.
- Do not delete `brand-images/` or `site/lift-studio-images/` until the image duplication question is resolved.
- Do not restore archived instruction packs, or the deleted `_system` planning docs, into the active path.
