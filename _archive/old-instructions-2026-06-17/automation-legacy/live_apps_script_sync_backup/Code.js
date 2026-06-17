/**
 * MR Gmail Outreach Automation
 *
 * What this does:
 * 1. Creates Gmail drafts from the Leads tab for contacts with email addresses.
 * 2. Never sends automatically. Megan reviews and sends drafts manually.
 * 3. Checks Gmail sent mail and marks matching leads as Sent in the tracker.
 * 4. Monitors sent threads for replies and updates response status / next step.
 *
 * Setup:
 * - Open the Google Sheet.
 * - Extensions > Apps Script.
 * - Paste this file into Code.gs.
 * - Update CONFIG.onePagerUrl and CONFIG.senderName if needed.
 * - Run installOutreachAutomation() once and approve permissions.
 */

const CONFIG = {
  spreadsheetId: '1ZUgq7srd2P835fA_Kge80ZpiFJjvUwBR_PXCjZsU688',
  leadsSheetName: 'Leads',
  onePagerUrl: 'https://docs.google.com/document/d/1VHSPjanmsC3cyPxmb0cTvrTBXMEHum3jywj9NvNorZc',
  senderName: 'Megan Reeves',
  senderEmail: 'helloliftstudio@gmail.com',
  businessName: 'Lift Studio',
  defaultFollowUpDays: 3,
  maxDraftsPerRun: 10,
};

const REQUIRED_HEADERS = [
  'business_name',
  'email',
  'contact_form',
  'instagram',
  'phone',
  'draft_email',
  'outreach_status',
  'last_contacted',
  'follow_up_date',
  'response_status',
  'gmail_draft_id',
  'gmail_thread_id',
  'gmail_last_checked',
  'next_step',
  'automation_notes',
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Outreach Automation')
    .addItem('Create Gmail Drafts', 'createOutreachDrafts')
    .addItem('Refresh Existing Drafts', 'refreshExistingOutreachDrafts')
    .addItem('Refresh Sent + Replies', 'refreshSentAndReplies')
    .addItem('Install Full Schedule (run once)', 'installOutreachAutomation')
    .addToUi();
}

/**
 * Master install function. Run this once from the Apps Script UI.
 * Sets up:
 *   - Hourly sent-mail reconciliation + reply monitoring
 *   - Daily draft creation at 8 AM (batch 1)
 *   - Daily draft creation at 1 PM (batch 2)
 *
 * Timezone: uses the project's timezone setting. Set it in
 * Apps Script > Project Settings > Time zone to match your local timezone
 * (e.g. America/New_York) before running this.
 */
function installOutreachAutomation() {
  ensureAutomationColumns_();

  // Remove any existing triggers so this is idempotent
  deleteExistingTriggers_('refreshSentAndReplies');
  deleteExistingTriggers_('createOutreachDrafts');

  // Hourly: scan sent folder and check for replies
  ScriptApp.newTrigger('refreshSentAndReplies')
    .timeBased()
    .everyHours(1)
    .create();

  // 8 AM daily: create drafts from audited leads (batch 1)
  ScriptApp.newTrigger('createOutreachDrafts')
    .timeBased()
    .atHour(8)
    .everyDays(1)
    .create();

  // 1 PM daily: create drafts from any new audited leads (batch 2)
  ScriptApp.newTrigger('createOutreachDrafts')
    .timeBased()
    .atHour(13)
    .everyDays(1)
    .create();

  SpreadsheetApp.getActive().toast(
    'Full outreach schedule installed:\n' +
    '• Drafts created daily at ~8 AM and ~1 PM\n' +
    '• Sent mail + replies checked hourly\n\n' +
    'IMPORTANT: Go to Apps Script > Project Settings and verify your timezone is correct.'
  );
}

function createOutreachDrafts() {
  const sheet = getLeadsSheet_();
  ensureAutomationColumns_();
  const data = getSheetData_(sheet);
  const headers = data.headers;
  const rows = data.rows;
  const today = new Date();
  let created = 0;
  let skipped = 0;

  rows.forEach((row, rowIndex) => {
    if (created >= CONFIG.maxDraftsPerRun) return;

    const business = value_(row, headers, 'business_name');
    const email = value_(row, headers, 'email');
    const draftEmail = value_(row, headers, 'draft_email');
    const status = value_(row, headers, 'outreach_status').toLowerCase();
    const existingDraftId = value_(row, headers, 'gmail_draft_id');
    const rowNumber = rowIndex + 2;

    if (!business) return;
    if (status === 'sent' || status === 'replied' || status === 'not a fit') return;
    if (existingDraftId) return;

    if (!email) {
      writeLeadUpdates_(sheet, headers, rowNumber, {
        next_step: nextManualStep_(row, headers),
        automation_notes: 'No email available. Use form, Instagram, or phone.',
      });
      skipped += 1;
      return;
    }

    const subject = `Quick website note for ${business}`;
    const body = buildDraftBody_(business, draftEmail);
    const draft = GmailApp.createDraft(email, subject, body, {
      name: CONFIG.senderName,
    });

    writeLeadUpdates_(sheet, headers, rowNumber, {
      outreach_status: 'Drafted',
      gmail_draft_id: draft.getId(),
      gmail_last_checked: today,
      next_step: 'Review Gmail draft and send manually.',
      automation_notes: 'Draft created automatically. Not sent.',
    });

    created += 1;
  });

  SpreadsheetApp.getActive().toast(`Created ${created} draft(s). Skipped ${skipped} lead(s) without email.`);
}

function refreshExistingOutreachDrafts() {
  const sheet = getLeadsSheet_();
  ensureAutomationColumns_();
  const data = getSheetData_(sheet);
  const headers = data.headers;
  const rows = data.rows;
  const today = new Date();
  let refreshed = 0;
  let missing = 0;

  rows.forEach((row, rowIndex) => {
    const business = value_(row, headers, 'business_name');
    const email = value_(row, headers, 'email');
    const draftEmail = value_(row, headers, 'draft_email');
    const draftId = value_(row, headers, 'gmail_draft_id');
    const rowNumber = rowIndex + 2;

    if (!business || !email || !draftId) return;

    const subject = `Quick website note for ${business}`;
    const body = buildDraftBody_(business, draftEmail);

    try {
      const draft = findDraft_(draftId, email, subject);
      if (!draft) throw new Error('No matching Gmail draft found by ID, recipient, or subject.');
      draft.update(email, subject, body, {
        name: CONFIG.senderName,
      });
      writeLeadUpdates_(sheet, headers, rowNumber, {
        gmail_draft_id: draft.getId(),
        gmail_last_checked: today,
        next_step: 'Review refreshed Gmail draft and send manually.',
        automation_notes: 'Existing Gmail draft refreshed with latest tracker copy.',
      });
      refreshed += 1;
    } catch (error) {
      writeLeadUpdates_(sheet, headers, rowNumber, {
        gmail_last_checked: today,
        next_step: 'Draft ID was not found. Clear gmail_draft_id and create a new draft.',
        automation_notes: `Could not refresh draft: ${error.message}`,
      });
      missing += 1;
    }
  });

  SpreadsheetApp.getActive().toast(`Refreshed ${refreshed} draft(s). ${missing} draft(s) need attention.`);
}

function findDraft_(draftId, email, subject) {
  if (draftId) {
    try {
      return GmailApp.getDraft(draftId);
    } catch (error) {
      // Fall through to draft scan. Stored IDs can become stale if drafts were recreated.
    }
  }

  const targetEmail = String(email || '').toLowerCase();
  const targetSubject = String(subject || '').trim();
  const drafts = GmailApp.getDrafts();

  for (let i = 0; i < drafts.length; i += 1) {
    const draft = drafts[i];
    const message = draft.getMessage();
    const to = String(message.getTo() || '').toLowerCase();
    const draftSubject = String(message.getSubject() || '').trim();
    if (to.includes(targetEmail) && draftSubject === targetSubject) {
      return draft;
    }
  }

  return null;
}

function refreshSentAndReplies() {
  const sheet = getLeadsSheet_();
  ensureAutomationColumns_();
  const data = getSheetData_(sheet);
  const headers = data.headers;
  const rows = data.rows;
  const senderEmail = (Session.getActiveUser().getEmail() || '').toLowerCase();
  const today = new Date();

  rows.forEach((row, rowIndex) => {
    const business = value_(row, headers, 'business_name');
    const email = value_(row, headers, 'email');
    const rowNumber = rowIndex + 2;
    if (!business || !email) return;

    // Search by recipient only — catches all subject formats used in Lift Studio outreach
    // (e.g. "One thing I noticed about [Brand]", "Quick website note for [Brand]", follow-up subjects)
    const sentThreads = GmailApp.search(`in:sent to:${email} newer_than:90d`, 0, 5);
    if (!sentThreads.length) {
      writeLeadUpdates_(sheet, headers, rowNumber, {
        gmail_last_checked: today,
      });
      return;
    }

    const thread = sentThreads[0];
    const messages = thread.getMessages();
    const sentMessage = messages.find((message) => {
      return message.getFrom().toLowerCase().includes(senderEmail) || message.getFrom().toLowerCase().includes(CONFIG.senderName.toLowerCase());
    });
    const reply = messages.find((message) => {
      const from = message.getFrom().toLowerCase();
      return !from.includes(senderEmail) && !from.includes(CONFIG.senderName.toLowerCase());
    });

    const updates = {
      outreach_status: 'Sent',
      gmail_thread_id: thread.getId(),
      gmail_last_checked: today,
      automation_notes: 'Sent email detected in Gmail.',
    };

    if (sentMessage) {
      updates.last_contacted = sentMessage.getDate();
      updates.follow_up_date = addDays_(sentMessage.getDate(), CONFIG.defaultFollowUpDays);
    }

    if (reply) {
      updates.response_status = 'Needs review';
      updates.next_step = 'Open Gmail thread, read reply, and decide next action.';
      updates.automation_notes = `Reply detected from ${reply.getFrom()}`;
    } else {
      updates.next_step = 'Wait for reply or follow up on follow-up date.';
    }

    writeLeadUpdates_(sheet, headers, rowNumber, updates);
  });
}

function ensureAutomationColumns_() {
  const sheet = getLeadsSheet_();
  const data = getSheetData_(sheet);
  const existing = data.headers;
  const missing = REQUIRED_HEADERS.filter((header) => !existing[header]);
  if (!missing.length) return;

  const startCol = sheet.getLastColumn() + 1;
  sheet.getRange(1, startCol, 1, missing.length).setValues([missing]);
  sheet.getRange(1, startCol, 1, missing.length)
    .setFontWeight('bold')
    .setBackground('#1f473d')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center');
}

function getLeadsSheet_() {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  const sheet = spreadsheet.getSheetByName(CONFIG.leadsSheetName);
  if (!sheet) throw new Error(`Sheet not found: ${CONFIG.leadsSheetName}`);
  return sheet;
}

function getSheetData_(sheet) {
  const values = sheet.getDataRange().getValues();
  const headerRow = values[0] || [];
  const headers = {};
  headerRow.forEach((header, index) => {
    const key = String(header || '').trim();
    if (key) headers[key] = index + 1;
  });
  return {
    headers,
    rows: values.slice(1),
  };
}

function value_(row, headers, header) {
  const col = headers[header];
  if (!col) return '';
  return String(row[col - 1] || '').trim();
}

function writeLeadUpdates_(sheet, headers, rowNumber, updates) {
  Object.keys(updates).forEach((header) => {
    const col = headers[header];
    if (!col) return;
    sheet.getRange(rowNumber, col).setValue(updates[header]);
  });
}

function buildDraftBody_(business, draftEmail) {
  const cleanedDraft = stripSubjectLine_(draftEmail);
  const base = cleanedDraft || [
    `Hi there,`,
    ``,
    `I came across ${business} and noticed a few opportunities to make the website, social presence, and content direction feel clearer and easier to act on.`,
    ``,
    `Would it be helpful if I sent over 3 quick recommendations?`,
    ``,
    `Best,`,
    `Megan`,
  ].join('\n');

  return [
    base,
    ``,
    `P.S. I put together a short overview of Lift Studio here:`,
    CONFIG.onePagerUrl,
    ``,
    signature_(),
  ].join('\n');
}

function stripSubjectLine_(draftEmail) {
  const text = String(draftEmail || '').trim();
  if (!text) return '';
  return text.replace(/^Subject:[^\n]*\n+/i, '').trim();
}

function signature_() {
  return [
    `--`,
    `Megan Reeves`,
    `${CONFIG.businessName}`,
    `Boutique brand and content studio for local businesses`,
    `Brand clarity, content direction, website first impressions & social quick wins`,
    ``,
    `Based in PA | Remote-friendly`,
    `${CONFIG.senderEmail}`,
    `Lift Studio Overview: ${CONFIG.onePagerUrl}`,
  ].join('\n');
}

function nextManualStep_(row, headers) {
  if (value_(row, headers, 'contact_form')) return 'Use contact form manually.';
  if (value_(row, headers, 'instagram')) return 'DM on Instagram and ask for best email.';
  if (value_(row, headers, 'phone')) return 'Call or text to ask for best email.';
  return 'Find contact info before outreach.';
}

function addDays_(date, days) {
  const next = new Date(date.getTime());
  next.setDate(next.getDate() + days);
  return next;
}

function escapeQuery_(value) {
  return String(value || '').replace(/"/g, '');
}

function deleteExistingTriggers_(handlerName) {
  ScriptApp.getProjectTriggers().forEach((trigger) => {
    if (trigger.getHandlerFunction() === handlerName) {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}
