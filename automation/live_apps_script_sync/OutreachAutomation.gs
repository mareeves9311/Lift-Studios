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
  // Google Drive file ID for the PDF attached to every outreach draft.
  // Get a file ID from the Drive URL: drive.google.com/file/d/FILE_ID/view
  // The Lift Studio website is linked in the email body; do not attach the old brand book.
  serviceMenuPdfFileId: '1jvKBJo3l1i7HJ9vUi_8pV9-G7EJrfSJx',
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
    .addItem('Install/Repair Full Automation', 'installLiftStudioFullAutomation')
    .addItem('Run Full Lift Studio System Now', 'runLiftStudioDailySystem')
    .addItem('Verify Automation Health', 'verifyLiftStudioAutomationHealth')
    .addItem('Create Gmail Drafts', 'createOutreachDrafts')
    .addItem('Refresh Existing Drafts', 'refreshExistingOutreachDrafts')
    .addItem('Create Due Follow-Up Drafts', 'createDueFollowUpDrafts')
    .addItem('Test Service Menu Attachment', 'testServiceMenuAttachment')
    .addItem('Create Signature Test Draft', 'createSignatureTestDraft')
    .addItem('Refresh Sent + Replies', 'refreshSentAndReplies')
    .addItem('Clean Up Inbox Now', 'runInboxHygiene')
    .addItem('Install Full Schedule (run once)', 'installOutreachAutomation')
    .addToUi();
}

function installLiftStudioFullAutomation() {
  if (typeof setupLiftBrandPipelineAutomation === 'function') {
    setupLiftBrandPipelineAutomation();
  }
  installOutreachAutomation();
  verifyLiftStudioAutomationHealth();
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
  deleteExistingTriggers_('runLiftStudioDailySystem');
  deleteExistingTriggers_('refreshSentAndReplies');
  deleteExistingTriggers_('createOutreachDrafts');

  // Morning orchestrator: audits queued rows, reconciles sheet state,
  // creates drafts, scans sent/replies, and applies inbox hygiene.
  ScriptApp.newTrigger('runLiftStudioDailySystem')
    .timeBased()
    .atHour(7)
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
    '• Full system orchestration runs daily at ~7 AM\n' +
    '• Drafts created daily at ~8 AM and ~1 PM\n' +
    '• Sent mail + replies checked hourly\n\n' +
    'IMPORTANT: Go to Apps Script > Project Settings and verify your timezone is correct.'
  );
}

function runLiftStudioDailySystem() {
  const started = new Date();
  const steps = [];

  ensureAutomationColumns_();
  steps.push('automation columns checked');

  if (typeof reconcileLiftNextActions === 'function') {
    reconcileLiftNextActions();
    steps.push('next actions reconciled');
  }

  if (typeof runQueuedLiftBrandAudits === 'function') {
    runQueuedLiftBrandAudits();
    steps.push('queued audits processed');
  }

  createOutreachDrafts();
  steps.push('draft queue processed');

  refreshSentAndReplies();
  steps.push('sent/replies/inbox hygiene processed');

  createDueFollowUpDrafts();
  steps.push('due follow-up drafts processed');

  if (typeof reconcileLiftNextActions === 'function') {
    reconcileLiftNextActions();
    steps.push('next actions reconciled again');
  }

  SpreadsheetApp.getActive().toast(
    `Lift Studio system run complete (${Utilities.formatDate(started, Session.getScriptTimeZone(), 'MMM d h:mm a')}): ${steps.join(', ')}.`
  );
}

function verifyLiftStudioAutomationHealth() {
  const triggerHandlers = ScriptApp.getProjectTriggers().map(trigger => trigger.getHandlerFunction());
  const required = [
    'runLiftStudioDailySystem',
    'refreshSentAndReplies',
    'createOutreachDrafts',
    'runQueuedLiftBrandAudits',
    'handleLiftBrandPipelineEdit',
  ];
  const missing = required.filter(handler => !triggerHandlers.includes(handler));
  const attachments = getLiftStudioAttachments_();
  const hasAttachment = attachments.length > 0;
  const message = missing.length
    ? `Missing trigger(s): ${missing.join(', ')}. Service menu: ${hasAttachment ? 'OK' : 'missing'}.`
    : `Automation health OK. Triggers active. Service menu: ${hasAttachment ? 'OK' : 'missing'}.`;
  SpreadsheetApp.getActive().toast(message);
  return { missingTriggers: missing, serviceMenuAvailable: hasAttachment };
}

function createOutreachDrafts() {
  const sheet = getLeadsSheet_();
  ensureAutomationColumns_();
  const data = getSheetData_(sheet);
  const headers = data.headers;
  const rows = data.rows;
  const today = new Date();
  let created = 0;
  let missingEmail = 0;
  let missingCopy = 0;
  let alreadySentOrClosed = 0;
  let alreadyHasDraft = 0;
  let draftedMissingId = 0;
  let notReady = 0;

  rows.forEach((row, rowIndex) => {
    if (created >= CONFIG.maxDraftsPerRun) return;

    const business = value_(row, headers, 'business_name');
    const email = value_(row, headers, 'email');
    const draftEmail = value_(row, headers, 'draft_email');
    const status = value_(row, headers, 'pipeline_stage').toLowerCase();
    const existingDraftId = value_(row, headers, 'gmail_draft_id');
    const rowNumber = rowIndex + 2;

    if (!business) return;
    if (isTerminalPipelineStatus_(status)) {
      alreadySentOrClosed += 1;
      return;
    }
    if (existingDraftId) {
      alreadyHasDraft += 1;
      return;
    }
    if (status === 'drafted' && !existingDraftId) {
      draftedMissingId += 1;
    } else if (!isDraftReadyStatus_(status)) {
      notReady += 1;
      return;
    }

    if (!email) {
      writeLeadUpdates_(sheet, headers, rowNumber, {
        next_step: nextManualStep_(row, headers),
        automation_notes: 'No email available. Use form, Instagram, or phone.',
      });
      missingEmail += 1;
      return;
    }

    if (!draftEmail) {
      writeLeadUpdates_(sheet, headers, rowNumber, {
        next_step: 'Write outreach copy before creating a Gmail draft.',
        automation_notes: 'No outreach draft copy found.',
      });
      missingCopy += 1;
      return;
    }

    const subject = value_(row, headers, 'subject') || `One thing I noticed about ${business}`;
    if (status === 'drafted' && !existingDraftId) {
      const existingDraft = findDraft_('', email, subject);
      if (existingDraft) {
        writeLeadUpdates_(sheet, headers, rowNumber, {
          gmail_draft_id: existingDraft.getId(),
          gmail_last_checked: today,
          next_step: 'Review Gmail draft with service menu attachment and send manually.',
          automation_notes: 'Recovered missing Gmail Draft ID by matching recipient and subject.',
        });
        alreadyHasDraft += 1;
        return;
      }
    }

    const normalizedDraftEmail = normalizeOutreachCopy_(draftEmail);
    const body = buildDraftBody_(business, normalizedDraftEmail);
    const htmlBody = buildHtmlBody_(business, normalizedDraftEmail);
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

    created += 1;
  });

  SpreadsheetApp.getActive().toast(
    `Created ${created} draft(s). Missing email: ${missingEmail}. Missing copy: ${missingCopy}. Existing draft: ${alreadyHasDraft}. Drafted/no ID: ${draftedMissingId}. Sent/closed: ${alreadySentOrClosed}. Not ready: ${notReady}.`
  );
}

function testServiceMenuAttachment() {
  const attachments = getLiftStudioAttachments_();
  if (!attachments.length) {
    throw new Error('No service menu PDF file ID is configured.');
  }

  const attachment = attachments[0];
  SpreadsheetApp.getActive().toast(
    `Service menu attachment is accessible: ${attachment.getName()} (${Math.round(attachment.getBytes().length / 1024)} KB).`
  );
}

function createSignatureTestDraft() {
  const business = 'Lift Studio Signature Test';
  const subject = `Lift Studio signature test - ${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm')}`;
  let attachments = [];
  let attachmentStatus = 'Service menu attachment: attached successfully.';

  try {
    attachments = getLiftStudioAttachments_();
    if (!attachments.length) attachmentStatus = 'Service menu attachment: not attached because no Drive file ID is configured.';
  } catch (error) {
    attachmentStatus = `Service menu attachment: FAILED - ${error.message}`;
  }

  const draftEmail = [
    'Hi Megan,',
    '',
    'This is a production-path signature test draft.',
    '',
    'It uses the same Apps Script builder that creates Lift Studio outreach drafts, including the linked Lift Studio website, the simple tested HTML signature, and the service menu PDF attachment.',
    '',
    `Drive file ID tested: ${CONFIG.serviceMenuPdfFileId || '[blank]'}`,
    '',
    attachmentStatus,
    '',
    'Please inspect this draft in Gmail desktop and mobile before sending a full batch.',
    '',
    'Best,',
    'Megan',
  ].join('\n');
  const body = buildDraftBody_(business, draftEmail);
  const htmlBody = buildHtmlBody_(business, draftEmail);
  const draft = GmailApp.createDraft(CONFIG.senderEmail, subject, body, {
    name: CONFIG.senderName,
    htmlBody: htmlBody,
    attachments: attachments,
  });

  SpreadsheetApp.getActive().toast(
    `Signature test draft created in Gmail Drafts. Draft ID: ${draft.getId()}`
  );
  return draft.getId();
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
    const normalizedDraftEmail = normalizeOutreachCopy_(draftEmail);
    const body = buildDraftBody_(business, normalizedDraftEmail);
    const htmlBody = buildHtmlBody_(business, normalizedDraftEmail);
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
      updates.response_status = 'No Response';
      updates.next_step = 'Wait for reply or follow up on follow-up date.';
    }

    writeLeadUpdates_(sheet, headers, rowNumber, updates);
  });

  runInboxHygiene_(false);
  createDueFollowUpDrafts();
}

function createDueFollowUpDrafts() {
  const sheet = getLeadsSheet_();
  ensureAutomationColumns_();
  const data = getSheetData_(sheet);
  const headers = data.headers;
  const rows = data.rows;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let created = 0;
  let skipped = 0;

  rows.forEach((row, rowIndex) => {
    if (created >= CONFIG.maxDraftsPerRun) return;

    const business = value_(row, headers, 'business_name');
    const email = value_(row, headers, 'email');
    const stage = value_(row, headers, 'pipeline_stage').toLowerCase();
    const responseStatus = value_(row, headers, 'response_status').toLowerCase();
    const followUpRaw = value_(row, headers, 'follow_up_date');
    const existingDraftId = value_(row, headers, 'gmail_draft_id');
    const rowNumber = rowIndex + 2;

    if (!business || !email || existingDraftId) {
      skipped += 1;
      return;
    }

    if (stage !== 'sent' || responseStatus !== 'no response' || !followUpRaw) {
      skipped += 1;
      return;
    }

    const followUpDate = new Date(followUpRaw);
    followUpDate.setHours(0, 0, 0, 0);
    if (Number.isNaN(followUpDate.getTime()) || followUpDate > today) {
      skipped += 1;
      return;
    }

    const originalSubject = value_(row, headers, 'subject') || `Quick thought for ${business}`;
    const subject = /^re:/i.test(originalSubject) ? originalSubject : `Re: ${originalSubject}`;
    const draftEmail = buildFollowUpCopy_(business, row, headers);
    const body = buildDraftBody_(business, draftEmail);
    const htmlBody = buildHtmlBody_(business, draftEmail);
    let draft;

    try {
      const threadId = value_(row, headers, 'gmail_thread_id');
      const thread = threadId ? GmailApp.getThreadById(threadId) : null;
      const messages = thread ? thread.getMessages() : [];
      const latestMessage = messages.length ? messages[messages.length - 1] : null;
      draft = latestMessage
        ? latestMessage.createDraftReply(body, { htmlBody: htmlBody, name: CONFIG.senderName })
        : GmailApp.createDraft(email, subject, body, { htmlBody: htmlBody, name: CONFIG.senderName });
    } catch (error) {
      draft = GmailApp.createDraft(email, subject, body, { htmlBody: htmlBody, name: CONFIG.senderName });
    }

    writeLeadUpdates_(sheet, headers, rowNumber, {
      gmail_draft_id: draft.getId(),
      gmail_last_checked: new Date(),
      next_step: 'Review/send Gmail follow-up draft.',
      automation_notes: `Follow-up draft created automatically ${new Date().toISOString()}.`,
    });

    created += 1;
  });

  SpreadsheetApp.getActive().toast(`Created ${created} due follow-up draft(s). Skipped ${skipped}.`);
}

function buildFollowUpCopy_(business, row, headers) {
  const opportunity = value_(row, headers, 'primary_opportunity') || value_(row, headers, 'specific_observation');
  const quickWin = value_(row, headers, 'quick_win');
  const outcome = value_(row, headers, 'business_impact') || 'make the next step easier for the right customers';
  const lines = [
    'Hi there,',
    '',
    'Wanted to put this back near the top of your inbox.',
    '',
  ];

  if (opportunity) {
    lines.push(`The piece I keep coming back to for ${business} is ${opportunity}.`);
  } else {
    lines.push(`The piece I keep coming back to for ${business} is making the first impression clearer and easier to act on.`);
  }

  if (quickWin) {
    lines.push(`Even a small move like ${quickWin} could help ${outcome}.`);
  } else {
    lines.push(`Even a small cleanup to the first screen, service language, or booking path could help ${outcome}.`);
  }

  lines.push(
    '',
    'Happy to send over 2-3 specific ideas if useful.',
    '',
    'Best,',
    'Megan'
  );

  return lines.join('\n');
}

// ============================================================
// INBOX HYGIENE
// Runs automatically at the end of refreshSentAndReplies().
// Also available manually: Outreach Automation > Clean Up Inbox Now.
// ============================================================

function runInboxHygiene() {
  runInboxHygiene_(true);
}

function runInboxHygiene_(showToast) {
  const result = applyInboxLabels_();
  if (showToast) {
    SpreadsheetApp.getActive().toast(
      `Inbox hygiene complete. Labeled ${result.labeled} thread(s); archived ${result.archived} closed/bounced thread(s).`
    );
  }
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
  let labeled = 0;
  let archived = 0;

  rows.forEach(row => {
    const threadId = value_(row, headers, 'gmail_thread_id');
    if (!threadId) return;

    let thread;
    try { thread = GmailApp.getThreadById(threadId); } catch (e) { return; }
    if (!thread) return;

    const stage = value_(row, headers, 'pipeline_stage').toLowerCase();
    const responseStatus = value_(row, headers, 'response_status').toLowerCase();
    const followUpRaw = value_(row, headers, 'follow_up_date');

    thread.addLabel(lsOutreach);
    labeled += 1;

    if (/replied|warm|interested|needs.?review/i.test(stage) || /needs.?review|interested/i.test(responseStatus)) {
      thread.addLabel(lsReplied);
    }

    if (/warm|interested/i.test(stage) || /interested/i.test(responseStatus)) {
      thread.addLabel(lsWarm);
    }

    if (/bounce/i.test(stage) || /bounce/i.test(responseStatus)) {
      thread.addLabel(lsBounced);
    }

    if (followUpRaw && /^sent$/i.test(stage) && /^no response$/i.test(responseStatus)) {
      const fuDate = new Date(followUpRaw);
      fuDate.setHours(0, 0, 0, 0);
      if (!isNaN(fuDate) && fuDate <= today) thread.addLabel(lsFollowUp);
    }

    if (/not.?a.?fit/i.test(stage) || /bounce/i.test(stage) || /bounce/i.test(responseStatus)) {
      if (thread.isInInbox()) {
        thread.moveToArchive();
        archived += 1;
      }
    }
  });

  return { labeled, archived };
}

function getOrCreateLabel_(name) {
  return GmailApp.getUserLabelByName(name) || GmailApp.createLabel(name);
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

function isTerminalPipelineStatus_(status) {
  return ['sent', 'replied', 'warm', 'won', 'not a fit', 'closed', 'archived'].includes(String(status || '').toLowerCase());
}

function isDraftReadyStatus_(status) {
  return ['ready to draft', 'ready', 'draft ready'].includes(String(status || '').toLowerCase());
}

function normalizeOutreachCopy_(draftEmail) {
  return String(draftEmail || '')
    .replace(
      /I am also attaching the Lift Studio brand book and service menu so you can get a feel for the approach\./gi,
      'I am linking the Lift Studio site so you can get a feel for the approach, and attaching the service menu for a quick overview.'
    )
    .replace(
      /I am attaching the Lift Studio brand book and service menu so you can get a feel for the approach\./gi,
      'I am linking the Lift Studio site so you can get a feel for the approach, and attaching the service menu for a quick overview.'
    )
    .replace(
      /brand book and service menu/gi,
      'website and service menu'
    );
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

const LIFT_STUDIO_HTML_SIGNATURE_ = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; font-family:Arial, Helvetica, sans-serif; color:#242424;">
  <tr>
    <td style="font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:20px; color:#242424; padding:0;">
      <strong style="font-size:15px; color:#0f3f35;">Megan Reeves</strong><br>
      <span style="font-weight:700; color:#0f3f35; letter-spacing:1px;">LIFT STUDIO</span><br>
      <span style="color:#686861;">Social Strategy &middot; Content Direction &middot; Brand Audits</span><br>
      <span style="color:#686861;">Content that works harder.</span><br>
      <a href="mailto:helloliftstudio@gmail.com" style="color:#0f3f35; text-decoration:none;">helloliftstudio@gmail.com</a>
      <span style="color:#d86f3f;"> | </span>
      <a href="https://helloliftstudio.netlify.app/" style="color:#0f3f35; text-decoration:none;">helloliftstudio.netlify.app</a>
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

function nextManualStep_(row, headers) {
  if (value_(row, headers, 'instagram')) return 'NO EMAIL FOUND - check Facebook and IG mobile Contact button.';
  if (value_(row, headers, 'contact_form')) return 'NO EMAIL FOUND - use contact form manually.';
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
