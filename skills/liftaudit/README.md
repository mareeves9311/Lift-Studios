# liftaudit

`liftaudit` is the reusable Lift Studio brand-audit skill for verified prospect audits.

Invoke it with:

```text
$liftaudit Audit https://www.example.com/

Priority: SEO and local lead generation.

Run Phases 1-3 only.
Do not create visuals until I approve:

* the written audit
* asset manifest
* brand snapshot
* selected channels
```

Continue after approval with:

```text
Continue $liftaudit with the approved audit.

Create:
1. The selected standalone audit deliverables
2. An editable HTML/CSS homepage concept if Website was selected
3. Separate desktop and mobile screenshots
4. The tailored follow-up outreach email

Save everything under:
audits/[Brand Slug]/
```

## Expected Inputs

- Brand name
- Website URL
- Instagram URL when available
- Blog URL when separate
- Screenshots supplied by Megan
- Priority instructions such as SEO, website conversion, Instagram, local visibility, or outreach
- Optional business category and target market

## Workflow Phases

1. Verify and audit the live brand before design.
2. Build a verified official brand-asset pack.
3. Define the real brand system and visual rules.
4. Select the two strongest opportunities from Website, Instagram, and Blog/SEO/GEO.
5. Create separate standalone deliverables for selected channels.
6. Stop if assets are insufficient.
7. Draft the tailored outreach email.

## Deliverables

- Written factual audit
- Channel comparison and selected-channel rationale
- Asset manifest
- Source manifest
- Brand snapshot
- Standalone website, Instagram, and/or SEO/GEO deliverables
- ChatGPT visual handoff bundle for polished mockups
- Editable HTML/CSS homepage concept only when Megan explicitly asks after the ChatGPT visual direction is approved
- Tailored follow-up outreach email that references the attached Lift Studio service menu and includes `https://helloliftstudio.com/`

## Folder Structure

```text
audits/[Brand Slug]/
├── 01-research/
├── 02-assets/
├── 03-strategy/
├── 04-concepts/
└── 05-outreach/
```

## Dependencies

Optional helper scripts may use:

- Python 3.10+
- `playwright`
- `beautifulsoup4`
- `requests`
- `Pillow`

Install only after approval:

```bash
python3 -m pip install playwright beautifulsoup4 requests Pillow
python3 -m playwright install chromium
```

## Safety Rules

Never fabricate brand details, visuals, screenshots, reviews, rankings, statistics, logos, addresses, services, vehicles, uniforms, or current profile data. Use the official logo unchanged unless Megan explicitly requests redesign.

If Codex cannot reliably inspect something, it should keep working on the parts it can verify and flag the blocked piece as `Needs ChatGPT or Megan review`. Bring that flagged item to ChatGPT or send screenshots back into Codex.

## Visual Handoff

Default visual flow:

1. Codex creates audit, asset pack, brand snapshot, selected-channel docs, and strategy.
2. Codex creates `04-concepts/chat-visual-handoff/`.
3. Megan uploads the listed files and prompt to ChatGPT for polished visual generation.
4. Codex only creates coded HTML/CSS or final assembly if Megan asks after visual direction is approved.
