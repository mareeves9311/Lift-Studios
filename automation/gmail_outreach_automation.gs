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
 * - Set CONFIG.serviceMenuPdfFileId to your Drive file ID.
 * - Run installOutreachAutomation() once and approve permissions.
 */

const CONFIG = {
  spreadsheetId: '1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8',
  leadsSheetName: 'Pipeline',
  senderName: 'Megan Reeves',
  senderEmail: 'helloliftstudio@gmail.com',
  businessName: 'Lift Studio',
  notifyEmail: 'helloliftstudio@gmail.com',
  // Google Drive file ID for the PDF attached to every outreach draft.
  // Get a file ID from the Drive URL: drive.google.com/file/d/FILE_ID/view
  // The Lift Studio website is linked in the email body; do not attach the old brand book.
  serviceMenuPdfFileId: '1XIz82HCquuLY7GzL4u5QUKr3vaHWhvh-',
  defaultFollowUpDays: 3,
  maxDraftsPerRun: 10,
};

const LEAD_SEARCH_CONFIG = {
  maxLeadsPerRun: 8,
  businessTypes: [
    'med spa',
    'boutique salon or hair studio',
    'wellness or esthetics studio',
    'skincare clinic or facial bar',
    'pizza shop or Italian restaurant',
    'sit-down restaurant or cafe',
    'specialty retail shop',
    'nail salon or nail spa',
    'real estate agent or real estate team',
    'chiropractor or physical therapy clinic',
  ],
  locations: [
    'Hershey PA',
    'Hummelstown PA',
    'Palmyra PA',
    'Harrisburg PA',
    'Camp Hill PA',
    'Mechanicsburg PA',
    'Carlisle PA',
    'Middletown PA',
    'Elizabethtown PA',
    'Lebanon PA',
    'Annville PA',
    'Linglestown PA',
  ],
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
  'Email Opened',
  'Email Clicked',
  'Open Count',
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
  snov_email_opened: ['Email Opened', 'Snov Opened', 'snov_email_opened'],
  snov_email_clicked: ['Email Clicked', 'Snov Clicked', 'snov_email_clicked'],
  snov_open_count: ['Open Count', 'Snov Open Count', 'snov_open_count'],
};

function onOpen() {
  addOutreachAutomationMenu_();
  if (typeof addLiftPipelineMenu_ === 'function') addLiftPipelineMenu_();
}

function addOutreachAutomationMenu_() {
  SpreadsheetApp.getUi()
    .createMenu('Outreach Automation')
    .addItem('Find New Leads Now', 'findNewLeads')
    .addItem('Create Gmail Drafts', 'createOutreachDrafts')
    .addItem('Refresh Existing Drafts', 'refreshExistingOutreachDrafts')
    .addItem('Refresh Sent + Replies', 'refreshSentAndReplies')
    .addItem('Classify Replies + Draft Responses', 'classifyAndDraftReplies')
    .addItem('Sync Snov.io Open/Click Tracking', 'syncSnovTrackingData')
    .addItem('Clean Up Inbox Now', 'runInboxHygiene')
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
  deleteExistingTriggers_('findNewLeads');

  // 7 AM: find new leads (runs before 8 AM drafts so audits have time to complete)
  ScriptApp.newTrigger('findNewLeads')
    .timeBased()
    .atHour(7)
    .everyDays(1)
    .create();

  // 12 PM: find another batch of leads before the 1 PM draft run
  ScriptApp.newTrigger('findNewLeads')
    .timeBased()
    .atHour(12)
    .everyDays(1)
    .create();

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
    '• New leads found daily at ~7 AM and ~12 PM\n' +
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
  const draftedBusinesses = [];

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
      next_step: 'Review Gmail draft with service menu attachment and send manually.',
      automation_notes: 'Draft created automatically with Lift Studio service menu attached. Not sent.',
    });

    draftedBusinesses.push(business);
    created += 1;
  });

  if (created > 0) {
    const list = draftedBusinesses.map(b => `• ${b}`).join('\n');
    GmailApp.sendEmail(
      CONFIG.notifyEmail,
      `Lift Studio: ${created} outreach draft${created > 1 ? 's' : ''} ready to review`,
      `Hi Megan,\n\n${created} Gmail draft${created > 1 ? 's are' : ' is'} ready for your review:\n\n${list}\n\nOpen Gmail → Drafts to review and send.\n\n— Lift Studio Automation`
    );
  }

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
        next_step: 'Review refreshed Gmail draft with service menu attachment and send manually.',
        automation_notes: 'Gmail draft refreshed with latest copy and Lift Studio service menu attached.',
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

  syncSnovTrackingData_();
  classifyAndDraftReplies();
  applyInboxLabels_();
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
  if (!CONFIG.serviceMenuPdfFileId) return [];
  return [
    DriveApp.getFileById(CONFIG.serviceMenuPdfFileId)
      .getBlob()
      .setName('Lift Studio Service Menu.pdf')
  ];
}

// ============================================================
// INBOX HYGIENE
// Runs automatically at the end of every refreshSentAndReplies().
// Also available manually: Outreach Automation > Clean Up Inbox Now.
// ============================================================

function runInboxHygiene() {
  applyInboxLabels_();
  SpreadsheetApp.getActive().toast('Inbox hygiene complete — labels applied and closed threads archived.');
}

function applyInboxLabels_() {
  const sheet = getLeadsSheet_();
  const data = getSheetData_(sheet);
  const headers = data.headers;
  const rows = data.rows;
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const lsOutreach = getOrCreateLabel_('LS/Outreach');
  const lsReplied  = getOrCreateLabel_('LS/Replied');
  const lsWarm     = getOrCreateLabel_('LS/Warm');
  const lsBounced  = getOrCreateLabel_('LS/Bounced');
  const lsFollowUp = getOrCreateLabel_('LS/Follow Up');

  rows.forEach(row => {
    const threadId = value_(row, headers, 'gmail_thread_id');
    if (!threadId) return;

    let thread;
    try { thread = GmailApp.getThreadById(threadId); } catch (e) { return; }
    if (!thread) return;

    const stage          = value_(row, headers, 'pipeline_stage').toLowerCase();
    const responseStatus = value_(row, headers, 'response_status').toLowerCase();
    const followUpRaw    = value_(row, headers, 'follow_up_date');

    // Every tracked outreach thread gets the base label
    thread.addLabel(lsOutreach);

    // Reply received
    if (/replied|warm|interested|needs.?review/i.test(stage) || /needs.?review/i.test(responseStatus)) {
      thread.addLabel(lsReplied);
    }

    // Warm / interested
    if (/warm|interested/i.test(stage)) {
      thread.addLabel(lsWarm);
    }

    // Bounce
    if (/bounce/i.test(stage)) {
      thread.addLabel(lsBounced);
    }

    // Follow-up overdue on a sent-but-unreplied thread
    if (followUpRaw && /^sent$/i.test(stage)) {
      const fuDate = new Date(followUpRaw); fuDate.setHours(0, 0, 0, 0);
      if (!isNaN(fuDate) && fuDate <= today) thread.addLabel(lsFollowUp);
    }

    // Archive closed threads — not a fit or bounced with no path forward
    if (/not.?a.?fit/i.test(stage) || /bounce/i.test(stage)) {
      if (thread.isInInbox()) thread.moveToArchive();
    }
  });
}

function getOrCreateLabel_(name) {
  return GmailApp.getUserLabelByName(name) || GmailApp.createLabel(name);
}

// ============================================================
// REPLY CLASSIFIER + DRAFT GENERATOR
// Runs automatically at end of every refreshSentAndReplies().
// Also available manually: Outreach Automation > Classify Replies + Draft Responses.
// Requires ANTHROPIC_API_KEY in Script Properties. Skips silently if not set.
// ============================================================

function classifyAndDraftReplies() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');
  if (!apiKey) return;

  const sheet = getLeadsSheet_();
  const data = getSheetData_(sheet);
  const headers = data.headers;
  const rows = data.rows;
  const senderEmail = CONFIG.senderEmail.toLowerCase();
  const senderName = CONFIG.senderName.toLowerCase();
  let processed = 0;

  rows.forEach((row, rowIndex) => {
    if (processed >= 5) return;
    const responseStatus = value_(row, headers, 'response_status').toLowerCase();
    const threadId = value_(row, headers, 'gmail_thread_id');
    const business = value_(row, headers, 'business_name');
    const rowNumber = rowIndex + 2;

    if (!business || !threadId) return;
    if (responseStatus !== 'needs review') return;

    let thread;
    try { thread = GmailApp.getThreadById(threadId); } catch (e) { return; }
    if (!thread) return;

    const messages = thread.getMessages();
    const replyMessage = messages.find(m => {
      const from = m.getFrom().toLowerCase();
      return !from.includes(senderEmail) && !from.includes(senderName);
    });
    if (!replyMessage) return;

    const replyText = replyMessage.getPlainBody().slice(0, 3000);
    const result = callClaudeReplyClassifier_(apiKey, business, replyText);
    if (!result) return;

    writeLeadUpdates_(sheet, headers, rowNumber, {
      pipeline_stage: result.pipeline_stage,
      response_status: result.classification,
      next_step: result.next_step,
      automation_notes: `Auto-classified: ${result.classification}. Draft reply created for Megan review.`,
    });

    if (result.draft_reply) {
      const origSubject = thread.getFirstMessageSubject();
      const replySubject = origSubject.startsWith('Re:') ? origSubject : `Re: ${origSubject}`;
      GmailApp.createDraft(
        replyMessage.getReplyTo() || replyMessage.getFrom(),
        replySubject,
        result.draft_reply + '\n\n' + signature_(),
        { name: CONFIG.senderName }
      );
    }

    try {
      thread.addLabel(getOrCreateLabel_('LS/Replied'));
      if (/warm|interested/i.test(result.pipeline_stage)) {
        thread.addLabel(getOrCreateLabel_('LS/Warm'));
      }
    } catch (e) {}

    processed++;
  });

  if (processed) {
    SpreadsheetApp.getActive().toast(`Classified ${processed} replies — draft responses created for Megan review.`);
  }
}

function callClaudeReplyClassifier_(apiKey, businessName, replyText) {
  const model = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_MODEL') || 'claude-sonnet-4-6';

  const prompt = [
    'You are managing cold outreach replies for Lift Studio, a boutique brand and content studio.',
    `Megan sent a cold outreach email to ${businessName}. They replied. Classify the reply and draft a short response.`,
    '',
    'Reply received:',
    '"""',
    replyText,
    '"""',
    '',
    'Return ONLY valid compact JSON, no markdown, no explanation:',
    JSON.stringify({
      classification: 'Interested | Maybe Later | Not a Fit | Bounced | Auto-Reply | Needs More Info',
      pipeline_stage: 'Replied - Interested | Replied - Maybe Later | Closed - Not a Fit | Bounced | Replied - Auto-Reply | Replied - Needs More Info',
      next_step: 'one sentence — what Megan should do next',
      draft_reply: 'short email body from Megan, no subject line — empty string if Not a Fit / Bounced / Auto-Reply',
    }),
    '',
    'Classification rules:',
    '- Interested: asks for more info, pricing, a call, examples, says yes or maybe',
    '- Maybe Later: positive but not now, follow up later',
    '- Not a Fit: declines, not interested, already covered',
    '- Bounced: delivery failure / out of service',
    '- Auto-Reply: automated out-of-office only',
    '- Needs More Info: asks what Lift would specifically do for them',
    '',
    'Draft reply rules:',
    '- 3–5 sentences max, warm and direct, sounds like Megan wrote it personally',
    '- Interested: acknowledge interest, offer a 15-min call or 3 specific ideas',
    '- Maybe Later: acknowledge timing, confirm when to reconnect',
    '- Needs More Info: offer to send a short note with 2–3 specific observations for their business',
    '- Leave draft_reply as empty string for Not a Fit, Bounced, Auto-Reply',
  ].join('\n');

  try {
    const response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
      method: 'post',
      muteHttpExceptions: true,
      contentType: 'application/json',
      headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      payload: JSON.stringify({
        model,
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (response.getResponseCode() < 200 || response.getResponseCode() >= 300) return null;
    const text = (JSON.parse(response.getContentText()).content || [])
      .filter(p => p.type === 'text').map(p => p.text).join('').trim();
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    return JSON.parse(match[0]);
  } catch (e) { return null; }
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

// ============================================================
// LEAD SCOUT
// Searches for new independent local businesses in Central PA and adds them
// to the Pipeline sheet with Pipeline Stage = 'New Lead'.
// The brand auditor trigger then picks them up within 5 minutes and audits them.
// The 8 AM / 1 PM draft triggers then create Gmail drafts for audited leads.
//
// Runs automatically at 7 AM and 12 PM daily.
// Also available manually: Outreach Automation > Find New Leads Now.
// Requires ANTHROPIC_API_KEY in Script Properties.
// ============================================================

function findNewLeads() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');
  if (!apiKey) {
    SpreadsheetApp.getActive().toast('ANTHROPIC_API_KEY not set — add it in Apps Script Project Settings.');
    return;
  }

  const sheet = getLeadsSheet_();
  const data = getSheetData_(sheet);
  const headers = data.headers;

  const existingBrands = new Set(
    data.rows
      .map(row => value_(row, headers, 'business_name').toLowerCase().trim())
      .filter(Boolean)
  );

  const leads = callClaudeLeadFinder_(apiKey, existingBrands);
  if (!leads || !leads.length) {
    SpreadsheetApp.getActive().toast('Lead Scout: no new leads found this run.');
    return;
  }

  let nextRow = sheet.getLastRow() + 1;
  let added = 0;

  leads.forEach(lead => {
    const name = (lead.business_name || '').trim();
    if (!name || existingBrands.has(name.toLowerCase())) return;

    writeLeadUpdates_(sheet, headers, nextRow, {
      business_name: name,
      pipeline_stage: 'New Lead',
      instagram: lead.instagram || '',
      contact_form: lead.website || '',
      automation_notes: `Auto-found by Lead Scout. Category: ${lead.category || ''}. City: ${lead.city || ''}.`,
      next_step: 'Audit queued — brand auditor will run within 5 minutes.',
    });

    existingBrands.add(name.toLowerCase());
    nextRow++;
    added++;
  });

  if (added) {
    SpreadsheetApp.getActive().toast(`Lead Scout found ${added} new potential leads — audits starting shortly.`);
    GmailApp.sendEmail(
      CONFIG.notifyEmail,
      `Lift Studio: ${added} new lead${added > 1 ? 's' : ''} added to pipeline`,
      `Hi Megan,\n\nThe Lead Scout found ${added} new potential lead${added > 1 ? 's' : ''} in Central PA and added ${added > 1 ? 'them' : 'it'} to the Pipeline sheet.\n\nThe Brand Auditor will run mini-audits within the next few minutes. Once audited, Gmail drafts will be created at the next scheduled draft run.\n\n— Lift Studio Automation`
    );
  }
}

function callClaudeLeadFinder_(apiKey, existingBrands) {
  const model = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_MODEL') || 'claude-sonnet-4-6';
  const config = LEAD_SEARCH_CONFIG;

  const existingList = Array.from(existingBrands).slice(0, 60).join(', ');
  const typeList = config.businessTypes.map(t => `- ${t}`).join('\n');
  const locationList = config.locations.map(l => `- ${l}`).join('\n');

  const prompt = [
    'You are a lead scout for Lift Studio, a boutique brand and content studio based in Central Pennsylvania.',
    'Lift Studio helps independent local businesses with: brand clarity, website first impressions, content direction, and social media quick wins.',
    '',
    `Search for exactly ${config.maxLeadsPerRun} independent local businesses in Central PA that would benefit from these services.`,
    '',
    'Target business types (pick a variety):',
    typeList,
    '',
    'Target locations (search across several of these):',
    locationList,
    '',
    'Criteria for a strong lead:',
    '- Independent / owner-operated — NOT a chain, franchise, or corporate location',
    '- Has a website but it looks dated, generic, or is missing key brand personality',
    '- Active on Instagram or clearly trying to build a following but not doing it well',
    '- Established business (open at least 1 year)',
    '- Local, approachable — the kind of business where the owner likely reads their own email',
    '',
    'Do NOT include any of these (already in pipeline):',
    existingList ? existingList.slice(0, 600) : '(none yet)',
    '',
    'Use web search to find real, specific businesses with real websites. Do not make up businesses.',
    '',
    `Return ONLY a valid compact JSON array of exactly ${config.maxLeadsPerRun} businesses. No markdown, no explanation, no code block:`,
    '[{"business_name":"Exact Name","website":"https://...","instagram":"@handle or empty","city":"City","category":"type"}]',
  ].join('\n');

  try {
    const response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
      method: 'post',
      muteHttpExceptions: true,
      contentType: 'application/json',
      headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      payload: JSON.stringify({
        model,
        max_tokens: 2000,
        tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 6 }],
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (response.getResponseCode() < 200 || response.getResponseCode() >= 300) return null;

    const body = JSON.parse(response.getContentText());
    const text = (body.content || [])
      .filter(p => p.type === 'text')
      .map(p => p.text)
      .join('')
      .trim();

    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return null;
    return JSON.parse(match[0]);
  } catch (e) { return null; }
}

// ============================================================
// SNOV.IO EMAIL TRACKING SYNC
// Reads open/click data from Snov.io Email Tracker API and
// writes it back to the Pipeline sheet columns:
//   Email Opened | Email Clicked | Open Count
//
// Required Script Properties (add in Apps Script > Project Settings):
//   SNOV_CLIENT_ID     — from snov.io → Account → API
//   SNOV_CLIENT_SECRET — from snov.io → Account → API
//
// Runs automatically every hour as part of refreshSentAndReplies().
// Also available manually: Outreach Automation > Sync Snov.io Open/Click Tracking.
// Skips silently if credentials are not set.
// ============================================================

function syncSnovTrackingData() {
  syncSnovTrackingData_();
  SpreadsheetApp.getActive().toast('Snov.io tracking data synced.');
}

function syncSnovTrackingData_() {
  const props = PropertiesService.getScriptProperties();
  const clientId = props.getProperty('SNOV_CLIENT_ID');
  const clientSecret = props.getProperty('SNOV_CLIENT_SECRET');
  if (!clientId || !clientSecret) return;

  const token = getSnovAccessToken_(clientId, clientSecret);
  if (!token) return;

  const tracked = getSnovTrackedEmails_(token);
  if (!tracked || !tracked.length) return;

  // Build lookup: recipient email (lowercase) → tracking data
  const trackingByEmail = {};
  tracked.forEach(item => {
    const addr = (item.recipient_email || item.email || '').toLowerCase().trim();
    if (!addr) return;
    if (!trackingByEmail[addr]) {
      trackingByEmail[addr] = { opened: false, clicked: false, open_count: 0 };
    }
    const entry = trackingByEmail[addr];
    if (item.opened || item.is_opened || item.open_count > 0) entry.opened = true;
    if (item.clicked || item.is_clicked || item.click_count > 0) entry.clicked = true;
    entry.open_count += parseInt(item.open_count || 0, 10);
  });

  const sheet = getLeadsSheet_();
  const data = getSheetData_(sheet);
  const headers = data.headers;

  data.rows.forEach((row, rowIndex) => {
    const email = value_(row, headers, 'email').toLowerCase().trim();
    if (!email || !trackingByEmail[email]) return;
    const t = trackingByEmail[email];
    writeLeadUpdates_(sheet, headers, rowIndex + 2, {
      snov_email_opened: t.opened ? 'Yes' : '',
      snov_email_clicked: t.clicked ? 'Yes' : '',
      snov_open_count: t.open_count > 0 ? String(t.open_count) : '',
    });
  });
}

function getSnovAccessToken_(clientId, clientSecret) {
  try {
    const resp = UrlFetchApp.fetch('https://api.snov.io/v1/oauth/access_token', {
      method: 'post',
      muteHttpExceptions: true,
      contentType: 'application/x-www-form-urlencoded',
      payload: `grant_type=client_credentials&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}`,
    });
    if (resp.getResponseCode() !== 200) return null;
    return JSON.parse(resp.getContentText()).access_token || null;
  } catch (e) { return null; }
}

function getSnovTrackedEmails_(token) {
  // Snov.io Email Tracker API — returns list of tracked emails with open/click events.
  // Endpoint may vary by account plan. If this returns empty, check your Snov.io
  // account at app.snov.io → Email Tracker to confirm tracked emails exist,
  // then update the URL to match the correct endpoint for your plan.
  try {
    const resp = UrlFetchApp.fetch('https://api.snov.io/v1/email-tracker/emails?limit=200', {
      method: 'get',
      muteHttpExceptions: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (resp.getResponseCode() !== 200) return [];
    const body = JSON.parse(resp.getContentText());
    // Handle different response shapes: { data: [...] } or [...] directly
    return Array.isArray(body) ? body : (body.data || body.emails || body.items || []);
  } catch (e) { return []; }
}
