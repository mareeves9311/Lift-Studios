# Lift Studio Signature Rendering Rules

## Why This Exists

The first Gmail outreach batch was sent, but the embedded visual signature did not render correctly.

Gmail signatures behave differently depending on how the email is created:

- Gmail web compose can insert the account's saved signature.
- Gmail/API-created drafts do not reliably inherit the saved Gmail signature.
- Complex HTML signatures can render differently after Gmail sanitizes the message.

Because of this, Lift agents should treat signature rendering as a quality gate, not an assumption.

## Signature Assets

Current assets:

- `assets/lift-studio-gmail-signature.html`
  - More visual version with LS circle, divider, larger brand mark, and nested table layout.
  - Use only after a live test confirms it renders correctly in sent mail.

- `assets/lift-studio-gmail-signature-simple.html`
  - Safer text-first HTML version.
  - Use as the default fallback for API-created drafts until the visual version is fixed and tested.

## Default Rule

For Gmail connector/API-created drafts:

1. Use `assets/lift-studio-gmail-signature-simple.html` by default.
2. Create one test draft to `helloliftstudio@gmail.com` or Megan's preferred test inbox before a full batch.
3. Megan should send/open the test and confirm the signature renders correctly.
4. Only then create the full batch.

Do not use the more visual signature for a large batch until it has passed a send/render test.

## Test Checklist

Before using any signature in a batch, verify:

- Name appears correctly.
- Lift Studio appears clearly.
- Email link works.
- Website link works.
- Spacing is not broken.
- Signature is not oversized.
- Signature does not collapse into strange table columns.
- It looks acceptable in Gmail desktop.
- It looks acceptable in Gmail mobile, if Megan checks mobile.

## Fallback Rule

If the signature fails the test:

Use this simple text signature in the draft body:

```text
Megan Reeves
Lift Studio
Social Strategy · Content Direction · Brand Audits
Content that works harder.
helloliftstudio@gmail.com
https://helloliftstudio.netlify.app/
```

This is less visual, but it is better than sending a broken visual block.

## Agent Instructions

The Email Marketer Agent must:

- Never assume the signature renders correctly just because it appears in the HTML body.
- Test one draft first before creating a full batch when signature HTML changes.
- Use the simple signature by default for API-created drafts.
- Flag to Quality Control if signature rendering cannot be verified.
- Record which signature asset was used in `STATUS.md` after each batch.

The Follow-Up & Pipeline Manager Agent must:

- Use the same tested signature asset for reply/follow-up drafts.
- If replying inside Gmail manually, Megan may use the native Gmail signature instead.

The Orchestrator Agent must:

- Treat signature rendering as a system health check before outreach batches.
- Confirm the selected signature asset before routing work to Email Marketer.

