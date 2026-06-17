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
 * - Set CONFIG.aboutPdfFileId and CONFIG.serviceMenuPdfFileId to your Drive file IDs.
 * - Run installOutreachAutomation() once and approve permissions.
 */

const CONFIG = {
  spreadsheetId: '1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8',
  leadsSheetName: 'Pipeline',
  senderName: 'Megan Reeves',
  senderEmail: 'helloliftstudio@gmail.com',
  businessName: 'Lift Studio',
  // Google Drive file IDs for PDFs attached to every outreach draft.
  // Get a file ID from the Drive URL: drive.google.com/file/d/FILE_ID/view
  // Leave as empty string ('') to skip that attachment.
  aboutPdfFileId: '',
  serviceMenuPdfFileId: '',
  defaultFollowUpDays: 3,
  maxDraftsPerRun: 10,
};

const REQUIRED_HEADERS = [
  'Brand',
  'Email',
  'Contact Form',
  'Instagram',
  'Phone',
  'Subject',
  'Outreach Draft',
  'Pipeline Stage',
  'Last Contacted',
  'Follow-Up Date',
  'Response Status',
  'Gmail Draft ID',
  'Gmail Thread ID',
  'Gmail Last Checked',
  'Next Action',
  'Automation Notes',
];

const HEADER_ALIASES = {
  business_name: ['Brand', 'Business Name', 'business_name'],
  email: ['Email', 'email'],
  contact_form: ['Contact Form', 'contact_form'],
  instagram: ['Instagram', 'instagram'],
  phone: ['Phone', 'phone'],
  subject: ['Subject', 'subject'],
  draft_email: ['Outreach Draft', 'Draft Email', 'draft_email'],
  pipeline_stage: ['Pipeline Stage', 'Outreach Status', 'pipeline_stage', 'outreach_status'],
  last_contacted: ['Last Contacted', 'last_contacted'],
  follow_up_date: ['Follow-Up Date', 'Follow-Up 1', 'follow_up_date'],
  response_status: ['Response Status', 'response_status'],
  gmail_draft_id: ['Gmail Draft ID', 'gmail_draft_id'],
  gmail_thread_id: ['Gmail Thread ID', 'gmail_thread_id'],
  gmail_last_checked: ['Gmail Last Checked', 'gmail_last_checked'],
  next_step: ['Next Action', 'Next Step', 'next_step'],
  automation_notes: ['Automation Notes', 'automation_notes'],
};

function onOpen() {
  addOutreachAutomationMenu_();
  if (typeof addLiftPipelineMenu_ === 'function') addLiftPipelineMenu_();
}

function addOutreachAutomationMenu_() {
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
    const status = value_(row, headers, 'pipeline_stage').toLowerCase();
    const existingDraftId = value_(row, headers, 'gmail_draft_id');
    const rowNumber = rowIndex + 2;

    if (!business) return;
    if (status === 'sent' || status === 'replied' || status === 'warm' || status === 'won' || status === 'not a fit') return;
    if (existingDraftId) return;

    if (!email) {
      writeLeadUpdates_(sheet, headers, rowNumber, {
        next_step: nextManualStep_(row, headers),
        automation_notes: 'No email available. Use form, Instagram, or phone.',
      });
      skipped += 1;
      return;
    }

    const subject = value_(row, headers, 'subject') || `One thing I noticed about ${business}`;
    const body = buildDraftBody_(business, draftEmail);
    const htmlBody = buildHtmlBody_(business, draftEmail);
    const attachments = getLiftStudioAttachments_();
    const draft = GmailApp.createDraft(email, subject, body, {
      name: CONFIG.senderName,
      htmlBody: htmlBody,
      attachments: attachments,
    });

    writeLeadUpdates_(sheet, headers, rowNumber, {
      pipeline_stage: 'Drafted',
      gmail_draft_id: draft.getId(),
      gmail_last_checked: today,
      next_step: 'Review Gmail draft with attachments and send manually.',
      automation_notes: 'Draft created automatically with Lift Studio PDF attachments. Not sent.',
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

    const subject = value_(row, headers, 'subject') || `One thing I noticed about ${business}`;
    const body = buildDraftBody_(business, draftEmail);
    const htmlBody = buildHtmlBody_(business, draftEmail);
    const attachments = getLiftStudioAttachments_();

    try {
      const draft = findDraft_(draftId, email, subject);
      if (!draft) throw new Error('No matching Gmail draft found by ID, recipient, or subject.');
      draft.update(email, subject, body, {
        name: CONFIG.senderName,
        htmlBody: htmlBody,
        attachments: attachments,
      });
      writeLeadUpdates_(sheet, headers, rowNumber, {
        gmail_draft_id: draft.getId(),
        gmail_last_checked: today,
        next_step: 'Review refreshed Gmail draft with attachments and send manually.',
        automation_notes: 'Gmail draft refreshed with latest copy and Lift Studio PDF attachments.',
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
  const senderEmail = String(CONFIG.senderEmail || '').toLowerCase();
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
      pipeline_stage: 'Sent',
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
  const missing = REQUIRED_HEADERS.filter((header) => !existing[canonicalHeader_(header)]);
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
    const display = String(header || '').trim();
    if (!display) return;
    headers[display] = index + 1;
    headers[canonicalHeader_(display)] = index + 1;
  });
  return {
    headers,
    rows: values.slice(1),
  };
}

function value_(row, headers, header) {
  const col = headers[canonicalHeader_(header)] || headers[header];
  if (!col) return '';
  return String(row[col - 1] || '').trim();
}

function writeLeadUpdates_(sheet, headers, rowNumber, updates) {
  Object.keys(updates).forEach((header) => {
    const col = headers[canonicalHeader_(header)] || headers[header];
    if (!col) return;
    sheet.getRange(rowNumber, col).setValue(updates[header]);
  });
}

function canonicalHeader_(header) {
  const normalized = normalizeHeader_(header);
  const aliases = Object.keys(HEADER_ALIASES);
  for (let i = 0; i < aliases.length; i += 1) {
    const canonical = aliases[i];
    const names = HEADER_ALIASES[canonical];
    if (names.some((name) => normalizeHeader_(name) === normalized)) return canonical;
  }
  return normalized;
}

function normalizeHeader_(header) {
  return String(header || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
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
    ``,
    `Based in PA | Remote-friendly`,
    `${CONFIG.senderEmail}`,
  ].join('\n');
}

const LIFT_STUDIO_HTML_SIGNATURE_ = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; font-family:Arial, Helvetica, sans-serif; color:#242424; max-width:560px;">
  <tr>
    <td valign="middle" style="padding:0 18px 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td align="center" valign="middle" width="84" height="84" style="width:84px; height:84px; background:#0f3f35; border-radius:42px; color:#fff8ea; font-family:Arial, Helvetica, sans-serif; font-size:25px; font-weight:700; letter-spacing:0.8px; line-height:84px;">LS</td>
        </tr>
      </table>
    </td>
    <td valign="middle" style="padding:0 20px 0 0; border-left:4px solid #d86f3f;"></td>
    <td valign="middle" style="padding:0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:28px; line-height:31px; font-weight:700; letter-spacing:6px; color:#0f3f35; padding:0 0 10px 0; white-space:nowrap;">LIFT STUDIO</td>
        </tr>
        <tr>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:20px; font-weight:700; color:#252525; padding:0 0 3px 0;">Megan Reeves</td>
        </tr>
        <tr>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:20px; font-weight:400; color:#686861; padding:0 0 9px 0;">Social Strategy &nbsp;·&nbsp; Content Direction &nbsp;·&nbsp; Brand Audits</td>
        </tr>
        <tr>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:20px; font-weight:400; color:#686861; padding:0 0 5px 0;">Content that works harder.</td>
        </tr>
        <tr>
          <td style="font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:18px; font-weight:400; color:#0f3f35; padding:0;"><a href="mailto:helloliftstudio@gmail.com" style="color:#0f3f35; text-decoration:none; font-weight:600;">helloliftstudio@gmail.com</a></td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

function buildHtmlBody_(business, draftEmail) {
  const cleanedDraft = stripSubjectLine_(draftEmail);
  const textBody = cleanedDraft || [
    `Hi there,`,
    ``,
    `I came across ${business} and noticed a few opportunities to make the website, social presence, and content direction feel clearer and easier to act on.`,
    ``,
    `Would it be helpful if I sent over a few specific ideas?`,
    ``,
    `Best,`,
    `Megan`,
  ].join('\n');

  const paragraphs = textBody.split(/\n\n+/).map((para) => {
    const lines = para.split('\n').join('<br>');
    return `<p style="margin:0 0 14px 0; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:21px; color:#242424;">${lines}</p>`;
  });

  const bodyHtml = paragraphs.join('\n').replace(
    /\bLift Studio\b/g,
    `<a href="https://helloliftstudio.netlify.app/" style="color:#0f3f35; text-decoration:none; font-weight:600;">Lift Studio</a>`
  );

  return `${bodyHtml}\n<br>\n${LIFT_STUDIO_HTML_SIGNATURE_}`;
}

function getLiftStudioAttachments_() {
  const attachments = [];
  if (CONFIG.aboutPdfFileId) {
    attachments.push(
      DriveApp.getFileById(CONFIG.aboutPdfFileId).getBlob().setName('About Lift Studio.pdf')
    );
  }
  if (CONFIG.serviceMenuPdfFileId) {
    attachments.push(
      DriveApp.getFileById(CONFIG.serviceMenuPdfFileId).getBlob().setName('Lift Studio Service Menu.pdf')
    );
  }
  return attachments;
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
