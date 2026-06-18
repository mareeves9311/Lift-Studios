/**
 * Lift Studio Pipeline automation.
 *
 * Install:
 * 1. Open the Google Sheet: Lift Studio Master Pipeline.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this file into Code.gs, or add it as a new script file.
 * 4. In Project Settings > Script Properties, add:
 *    - ANTHROPIC_API_KEY = your Claude API key
 *    - Optional: ANTHROPIC_MODEL = claude-sonnet-4-6
 * 5. Run setupLiftBrandPipelineAutomation once and approve permissions.
 *
 * What it does:
 * - Watches the Pipeline tab.
 * - When you add/edit a business name, website, Instagram, TikTok, category,
 *   location, or notes field, it queues that row for audit.
 * - A time trigger processes queued rows and fills the audit fields.
 * - You can also run the selected row from the custom Lift Pipeline menu.
 */

const LIFT_PIPELINE_CONFIG = {
  spreadsheetId: '1N7ZhHE1pzKsNVd130FDcFy0huA1YrLO6yrsuTh9vGE8',
  pipelineSheetName: 'Pipeline',
  miniAuditsSheetName: 'Mini Audits Archive',
  maxAuditsPerRun: 2,
  webTextCharLimit: 9000,
  claudeMaxTokens: 2600,
  claudeTemperature: 0.2,
  defaultModel: 'claude-sonnet-4-6',
  watchedHeaders: [
    'business_name',
    'website',
    'instagram',
    'category',
    'city',
    'state',
    'notes'
  ],
  requiredHeaders: [
    'business_name',
    'website',
    'instagram',
    'category',
    'city',
    'state',
    'contact_name',
    'email',
    'pipeline_status',
    'fit_score',
    'priority',
    'recommended_offer',
    'primary_opportunity',
    'secondary_opportunity',
    'pitch_angle',
    'specific_observation',
    'business_impact',
    'quick_win',
    'subject',
    'draft_email',
    'notes',
    'next_step',
    'automation_notes'
  ]
};

const LIFT_HEADER_ALIASES = {
  business_name: ['Brand', 'Business Name', 'business_name'],
  website: ['Website', 'website'],
  instagram: ['Instagram', 'instagram'],
  category: ['Category', 'category'],
  city: ['City', 'city'],
  state: ['State', 'state'],
  location: ['Location', 'location'],
  contact_name: ['Contact Name', 'contact_name'],
  email: ['Email', 'email'],
  phone: ['Phone', 'phone'],
  contact_form: ['Contact Form', 'contact_form'],
  pipeline_status: ['Pipeline Stage', 'Outreach Status', 'pipeline_status', 'outreach_status'],
  last_contacted: ['Last Contacted', 'last_contacted'],
  follow_up_date: ['Follow-Up Date', 'Follow-Up 1', 'follow_up_date'],
  response_status: ['Response Status', 'response_status'],
  fit_score: ['Score', 'Fit Score', 'fit_score'],
  priority: ['Priority', 'priority'],
  recommended_offer: ['Recommended Offer', 'recommended_offer'],
  primary_opportunity: ['Primary Opportunity', 'primary_opportunity', 'top_issue'],
  secondary_opportunity: ['Secondary Opportunity', 'secondary_opportunity', 'secondary_issue'],
  pitch_angle: ['Pitch Angle', 'pitch_angle', 'offer_angle'],
  specific_observation: ['Specific Observation', 'specific_observation', 'website_first_impression'],
  business_impact: ['Business Impact', 'business_impact', 'why_it_matters'],
  quick_win: ['Quick Win', 'quick_win'],
  subject: ['Subject', 'subject'],
  draft_email: ['Outreach Draft', 'Draft Email', 'draft_email'],
  notes: ['Notes', 'notes'],
  next_step: ['Next Action', 'Next Step', 'next_step'],
  automation_notes: ['Automation Notes', 'automation_notes', 'audit_error'],
  gmail_draft_id: ['Gmail Draft ID', 'gmail_draft_id'],
};

const LIFT_DISPLAY_HEADERS = {
  business_name: 'Brand',
  website: 'Website',
  instagram: 'Instagram',
  category: 'Category',
  city: 'City',
  state: 'State',
  contact_name: 'Contact Name',
  email: 'Email',
  pipeline_status: 'Pipeline Stage',
  fit_score: 'Score',
  priority: 'Priority',
  recommended_offer: 'Recommended Offer',
  primary_opportunity: 'Primary Opportunity',
  secondary_opportunity: 'Secondary Opportunity',
  pitch_angle: 'Pitch Angle',
  specific_observation: 'Specific Observation',
  business_impact: 'Business Impact',
  quick_win: 'Quick Win',
  subject: 'Subject',
  draft_email: 'Outreach Draft',
  notes: 'Notes',
  next_step: 'Next Action',
  automation_notes: 'Automation Notes',
};

function addLiftPipelineMenu_() {
  SpreadsheetApp.getUi()
    .createMenu('Lift Pipeline')
    .addItem('Install automation', 'setupLiftBrandPipelineAutomation')
    .addItem('Run queued audits now', 'runQueuedLiftBrandAudits')
    .addItem('Audit selected row now', 'auditSelectedLiftBrandRow')
    .addItem('Mark selected row as form submitted', 'markSelectedLiftFormSubmitted')
    .addItem('Reconcile next actions', 'reconcileLiftNextActions')
    .addItem('Sort pipeline by action', 'sortLiftPipelineByAction')
    .addItem('Test Claude connection', 'testLiftClaudeConnection')
    .addToUi();
}

function setupLiftBrandPipelineAutomation() {
  const ss = SpreadsheetApp.openById(LIFT_PIPELINE_CONFIG.spreadsheetId);
  const sheet = getLiftPipelineSheet_(ss);
  ensureLiftPipelineHeaders_(sheet);
  formatLiftPipelineSheet_(sheet);

  ScriptApp.getProjectTriggers()
    .filter(trigger => [
      'handleLiftBrandPipelineEdit',
      'runQueuedLiftBrandAudits'
    ].includes(trigger.getHandlerFunction()))
    .forEach(trigger => ScriptApp.deleteTrigger(trigger));

  ScriptApp.newTrigger('handleLiftBrandPipelineEdit')
    .forSpreadsheet(LIFT_PIPELINE_CONFIG.spreadsheetId)
    .onEdit()
    .create();

  ScriptApp.newTrigger('runQueuedLiftBrandAudits')
    .timeBased()
    .everyMinutes(5)
    .create();

  ss.toast('Lift Studio Pipeline automation installed. New/edited brand links will queue for audit.');
}

function handleLiftBrandPipelineEdit(e) {
  if (!e || !e.range) return;

  const sheet = e.range.getSheet();
  if (sheet.getName() !== LIFT_PIPELINE_CONFIG.pipelineSheetName) return;
  if (e.range.getRow() < 2) return;

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return;

  try {
    ensureLiftPipelineHeaders_(sheet);
    const headers = getLiftHeaderMap_(sheet);
    const watchedCols = LIFT_PIPELINE_CONFIG.watchedHeaders
      .map(header => headers[header])
      .filter(Boolean);
    const editedCols = getLiftColumnsInRange_(e.range);
    const touchedEmailField = headers.email && editedCols.includes(headers.email);
    const actionCols = [
      headers.email,
      headers.contact_form,
      headers.instagram,
      headers.phone,
      headers.pipeline_status,
      headers.response_status,
      headers.draft_email,
      headers.gmail_draft_id,
      headers.follow_up_date
    ].filter(Boolean);
    const touchedActionField = editedCols.some(col => actionCols.includes(col));

    if (touchedEmailField) {
      const startRow = e.range.getRow();
      const numRows = e.range.getNumRows();
      for (let row = startRow; row < startRow + numRows; row++) {
        queueManualEmailForDraft_(sheet, row, headers);
      }
    }

    if (touchedActionField) {
      const startRow = e.range.getRow();
      const numRows = e.range.getNumRows();
      for (let row = startRow; row < startRow + numRows; row++) {
        reconcileLiftNextActionForRow_(sheet, row, headers);
      }
    }

    const touchedWatchedField = editedCols.some(col => watchedCols.includes(col));
    if (!touchedWatchedField) return;

    const startRow = e.range.getRow();
    const numRows = e.range.getNumRows();
    for (let row = startRow; row < startRow + numRows; row++) {
      queueLiftAuditForRow_(sheet, row, headers);
    }
  } finally {
    lock.releaseLock();
  }
}

function queueManualEmailForDraft_(sheet, rowNumber, headers) {
  const row = readLiftRowValues_(sheet, rowNumber, headers);
  if (!row.business_name || !row.email) return;

  const status = String(row.pipeline_status || '').trim();
  const terminalStatuses = ['Sent', 'Replied', 'Warm', 'Won', 'Not a Fit'];
  if (terminalStatuses.includes(status) || row.gmail_draft_id) {
    reconcileLiftNextActionForRow_(sheet, rowNumber, headers);
    return;
  }

  if (row.draft_email) {
    setLiftCell_(sheet, rowNumber, headers.pipeline_status, 'Ready to Draft');
    setLiftCell_(sheet, rowNumber, headers.next_step, 'Create Gmail draft from existing outreach copy.');
  } else {
    setLiftCell_(sheet, rowNumber, headers.pipeline_status, 'Ready to Draft');
    setLiftCell_(sheet, rowNumber, headers.next_step, 'Email Marketer: draft first-touch outreach');
  }

  if (headers.automation_notes) {
    setLiftCell_(
      sheet,
      rowNumber,
      headers.automation_notes,
      `Manual email added ${new Date().toISOString()}. Row re-queued for outreach drafting/Gmail draft generation.`
    );
  }
}

function reconcileLiftNextActionForRow_(sheet, rowNumber, headers) {
  if (!headers.next_step) return;
  const row = readLiftRowValues_(sheet, rowNumber, headers);
  if (!row.business_name) return;

  const status = String(row.pipeline_status || '').trim();
  const responseStatus = String(row.response_status || '').trim();
  const followUpDate = formatLiftDateForAction_(row.follow_up_date);
  let nextAction = '';

  if (status === 'Won') {
    nextAction = 'Move to client onboarding.';
  } else if (status === 'Not a Fit') {
    nextAction = 'Closed - no follow-up.';
  } else if (status === 'Warm') {
    nextAction = followUpDate ? `Follow up on ${followUpDate}.` : 'Set a warm follow-up date.';
  } else if (status === 'Replied' || responseStatus === 'Interested' || responseStatus === 'Needs review') {
    nextAction = 'Open Gmail thread, review reply, and decide next action.';
  } else if (status === 'Sent') {
    if (headers.response_status && !responseStatus) {
      setLiftCell_(sheet, rowNumber, headers.response_status, 'No Response');
    }
    nextAction = followUpDate ? `Wait for reply or follow up on ${followUpDate}.` : 'Wait for reply or set follow-up date.';
  } else if (status === 'Drafted' || row.gmail_draft_id) {
    nextAction = 'Megan review/send Gmail draft.';
  } else if (status === 'Ready to Draft') {
    if (!row.email) {
      nextAction = liftManualContactStep_(row);
    } else if (!row.draft_email) {
      nextAction = 'Email Marketer: draft first-touch outreach.';
    } else {
      nextAction = 'Create Gmail draft from existing outreach copy.';
    }
  } else if (!row.email) {
    nextAction = liftManualContactStep_(row);
  } else if (status === 'Auditing') {
    nextAction = 'Auto audit queued. Review output before outreach.';
  } else if (status === 'New Lead') {
    nextAction = 'Run/complete audit before outreach.';
  }

  if (nextAction) setLiftCell_(sheet, rowNumber, headers.next_step, nextAction);
}

function liftManualContactStep_(row) {
  if (row.instagram) return 'NO EMAIL FOUND - check Facebook and IG mobile Contact button.';
  if (row.contact_form) return 'NO EMAIL FOUND - use contact form manually.';
  if (row.phone) return 'NO EMAIL FOUND - call/text for best email.';
  return 'NO EMAIL FOUND - find contact info before outreach.';
}

function formatLiftDateForAction_(dateValue) {
  if (!dateValue) return '';
  if (Object.prototype.toString.call(dateValue) === '[object Date]' && !Number.isNaN(dateValue.getTime())) {
    return Utilities.formatDate(dateValue, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return String(dateValue).trim();
}

function runQueuedLiftBrandAudits() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return;

  try {
    const ss = SpreadsheetApp.openById(LIFT_PIPELINE_CONFIG.spreadsheetId);
    const sheet = getLiftPipelineSheet_(ss);
    ensureLiftPipelineHeaders_(sheet);
    const headers = getLiftHeaderMap_(sheet);
    const rows = readLiftPipelineRows_(sheet, headers);
    let processed = 0;

    rows.forEach(row => {
      if (processed >= LIFT_PIPELINE_CONFIG.maxAuditsPerRun) return;
      if ((row.values.pipeline_status || '') !== 'Auditing') return;
      if (!row.values.business_name && !row.values.website && !row.values.instagram) return;

      processed++;
      runLiftAuditForRow_(sheet, row.rowNumber, headers);
    });

    if (processed) ss.toast(`Lift audit automation processed ${processed} queued row(s).`);
  } finally {
    lock.releaseLock();
  }
}

function auditSelectedLiftBrandRow() {
  const ss = SpreadsheetApp.openById(LIFT_PIPELINE_CONFIG.spreadsheetId);
  const sheet = getLiftPipelineSheet_(ss);
  const range = sheet.getActiveRange();
  if (!range || range.getRow() < 2) {
    throw new Error('Select a data row in Pipeline before running this.');
  }

  ensureLiftPipelineHeaders_(sheet);
  const headers = getLiftHeaderMap_(sheet);
  runLiftAuditForRow_(sheet, range.getRow(), headers);
  ss.toast(`Audit completed for row ${range.getRow()}.`);
}

function markSelectedLiftFormSubmitted() {
  const ss = SpreadsheetApp.openById(LIFT_PIPELINE_CONFIG.spreadsheetId);
  const sheet = getLiftPipelineSheet_(ss);
  const range = sheet.getActiveRange();
  if (!range || range.getRow() < 2) {
    throw new Error('Select a data row in Pipeline before marking form outreach.');
  }

  ensureLiftPipelineHeaders_(sheet);
  const headers = getLiftHeaderMap_(sheet);
  markLiftFormSubmitted_(sheet, range.getRow(), headers);
  ss.toast(`Marked row ${range.getRow()} as form-submitted outreach.`);
}

function markLiftFormSubmitted_(sheet, rowNumber, headers) {
  const row = readLiftRowValues_(sheet, rowNumber, headers);
  const today = new Date();
  const followUp = new Date(today.getTime());
  followUp.setDate(followUp.getDate() + 5);

  setLiftCell_(sheet, rowNumber, headers.pipeline_status, 'Sent');
  if (headers.last_contacted) setLiftCell_(sheet, rowNumber, headers.last_contacted, today);
  if (headers.follow_up_date) setLiftCell_(sheet, rowNumber, headers.follow_up_date, followUp);
  if (headers.response_status) setLiftCell_(sheet, rowNumber, headers.response_status, 'No Response');
  if (headers.next_step) setLiftCell_(sheet, rowNumber, headers.next_step, 'Wait for reply or follow up after form submission.');
  if (headers.notes) {
    setLiftCell_(
      sheet,
      rowNumber,
      headers.notes,
      appendLiftNote_(row.notes, `Form outreach submitted ${today.toISOString().slice(0, 10)}${row.contact_form ? ` via ${row.contact_form}` : ''}.`)
    );
  }
  if (headers.automation_notes) {
    setLiftCell_(sheet, rowNumber, headers.automation_notes, 'Manual website form submission recorded. No Gmail draft needed.');
  }
}

function reconcileLiftNextActions() {
  const ss = SpreadsheetApp.openById(LIFT_PIPELINE_CONFIG.spreadsheetId);
  const sheet = getLiftPipelineSheet_(ss);
  ensureLiftPipelineHeaders_(sheet);
  const headers = getLiftHeaderMap_(sheet);
  const lastRow = sheet.getLastRow();
  let reconciled = 0;

  for (let rowNumber = 2; rowNumber <= lastRow; rowNumber += 1) {
    reconcileLiftNextActionForRow_(sheet, rowNumber, headers);
    reconciled += 1;
  }

  ss.toast(`Reconciled next actions for ${reconciled} row(s).`);
}

function sortLiftPipelineByAction() {
  const ss = SpreadsheetApp.openById(LIFT_PIPELINE_CONFIG.spreadsheetId);
  const sheet = getLiftPipelineSheet_(ss);
  ensureLiftPipelineHeaders_(sheet);
  const headers = getLiftHeaderMap_(sheet);
  const lastRow = sheet.getLastRow();
  if (lastRow < 3) return;

  const sortCol = sheet.getLastColumn() + 1;
  sheet.getRange(1, sortCol).setValue('Sort Rank');
  sheet.getRange(2, sortCol, lastRow - 1, 1).setFormulas(
    Array.from({ length: lastRow - 1 }, (_, index) => {
      const row = index + 2;
      return [`=SWITCH($V${row},"Ready to Draft",1,"Drafted",2,"Sent",3,"Replied",4,"Warm",5,"New Lead",6,"Auditing",7,"Won",8,"Not a Fit",9,10)`];
    })
  );
  SpreadsheetApp.flush();

  sheet.getRange(2, 1, lastRow - 1, sortCol).sort([
    { column: sortCol, ascending: true },
    { column: headers.follow_up_date || 24, ascending: true },
    { column: headers.priority || 12, ascending: true },
    { column: headers.business_name || 1, ascending: true },
  ]);
  sheet.deleteColumn(sortCol);
  ss.toast('Pipeline sorted by action, follow-up date, priority, and brand.');
}

function runLiftAuditForRow_(sheet, rowNumber, headers) {
  const row = readLiftRowValues_(sheet, rowNumber, headers);
  if (!row.business_name && !row.website && !row.instagram) return;

  setLiftCell_(sheet, rowNumber, headers.pipeline_status, 'Auditing');
  setLiftCell_(sheet, rowNumber, headers.automation_notes, '');
  SpreadsheetApp.flush();

  try {
    const websiteText = row.website ? fetchLiftWebsiteText_(row.website) : '';
    const audit = callLiftClaudeAudit_(row, websiteText);
    writeLiftAuditResult_(sheet, rowNumber, headers, row, audit);
    appendLiftMiniAudit_(row, audit);
  } catch (error) {
    setLiftCell_(sheet, rowNumber, headers.pipeline_status, 'New Lead');
    setLiftCell_(sheet, rowNumber, headers.automation_notes, `Audit error: ${error.message.slice(0, 45000)}`);
  }
}

function queueLiftAuditForRow_(sheet, rowNumber, headers) {
  const row = readLiftRowValues_(sheet, rowNumber, headers);
  if (!row.business_name && !row.website && !row.instagram) return;

  const status = row.pipeline_status || '';
  if (['Auditing', 'Ready to Draft', 'Drafted', 'Sent', 'Replied', 'Warm', 'Won', 'Paused', 'Not a Fit'].includes(status)) {
    return;
  }

  setLiftCell_(sheet, rowNumber, headers.pipeline_status, 'Auditing');
  if (headers.next_step && !row.next_step) {
    setLiftCell_(sheet, rowNumber, headers.next_step, 'Auto audit queued. Review output before sending.');
  }
}

function callLiftClaudeAudit_(row, websiteText) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');
  if (!apiKey) {
    throw new Error('Missing ANTHROPIC_API_KEY in Apps Script Project Settings > Script Properties.');
  }

  const model =
    PropertiesService.getScriptProperties().getProperty('ANTHROPIC_MODEL') ||
    LIFT_PIPELINE_CONFIG.defaultModel;

  const prompt = buildLiftAuditPrompt_(row, websiteText);
  const response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    muteHttpExceptions: true,
    contentType: 'application/json',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    payload: JSON.stringify({
      model,
      max_tokens: LIFT_PIPELINE_CONFIG.claudeMaxTokens,
      temperature: LIFT_PIPELINE_CONFIG.claudeTemperature,
      tools: [
        {
          type: 'web_search_20250305',
          name: 'web_search',
          max_uses: 5
        }
      ],
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  });

  const statusCode = response.getResponseCode();
  const body = response.getContentText();
  if (statusCode < 200 || statusCode >= 300) {
    throw new Error(`Claude API ${statusCode}: ${body.slice(0, 700)}`);
  }

  const data = JSON.parse(body);
  const text = (data.content || [])
    .filter(part => part.type === 'text')
    .map(part => part.text)
    .join('\n')
    .trim();

  if (!text) throw new Error(`Claude returned no text response: ${body.slice(0, 700)}`);
  return JSON.parse(extractLiftJson_(text));
}

function buildLiftAuditPrompt_(row, websiteText) {
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  return [
    'You are running a prospect-specific brand/content audit for Lift Studio.',
    'Lift Studio helps service-based, restaurant, retail, and consumer-facing businesses turn website/social content into a stronger first impression.',
    '',
    'Return ONLY valid compact JSON. No markdown. No explanation outside JSON.',
    'Use null for fields you cannot determine. Do not invent facts.',
    'If Instagram cannot be viewed, say what must be manually checked instead of pretending.',
    '',
    'Required JSON shape:',
    JSON.stringify({
      business_name: 'string',
      category: 'string|null',
      location: 'string|null',
      pipeline_status: 'Ready to Draft',
      fit_score: 'number 1-20',
      priority: 'A - High|B - Possible|C - Low|Hold',
      offer_angle: 'string',
      website_first_impression: 'string',
      social_first_impression: 'string',
      brand_clarity: 'string',
      content_opportunities: 'string',
      quick_win: 'string',
      why_it_matters: 'string',
      recommended_offer: 'Mini-Audit|Starter Content Kit|Growth Content Kit|Content Bank + Brand/Social Direction|Website + Brand Refresh Add-On|Growth Content Kit + Brand/Social Direction',
      audit_type: 'Website only|Social only|Brand only|Website + Social|Website + Social + Brand',
      next_step: 'string',
      notes: 'string',
      audit_summary: 'string',
      mini_audit: 'string'
    }),
    '',
    'Business input:',
    `Date: ${today}`,
    `Business name: ${row.business_name || ''}`,
    `Website: ${row.website || ''}`,
    `Instagram: ${row.instagram || ''}`,
    `Category: ${row.category || ''}`,
    `Location: ${row.location || [row.city, row.state].filter(Boolean).join(', ')}`,
    `User notes: ${row.notes || ''}`,
    '',
    'Audit requirements:',
    '- Lead with what is already working.',
    '- Include one specific website/social/brand friction point.',
    '- Explain why it matters for bookings, visits, orders, inquiries, trust, or sales.',
    '- Include one practical quick win.',
    '- Include 3-5 content opportunities tied to real visible offers, differentiators, products, services, or user notes.',
    '- Recommend the smallest logical Lift offer.',
    '- Keep tone useful, specific, and non-condescending.',
    '- mini_audit should be a sendable 5-section written audit with short headings.',
    '',
    'Website text fetched from the site, if available:',
    websiteText || '[No website text fetched. Use web search if needed.]'
  ].join('\n');
}

function writeLiftAuditResult_(sheet, rowNumber, headers, previousRow, audit) {
  const valuesByHeader = {
    business_name: audit.business_name || previousRow.business_name,
    category: audit.category || previousRow.category,
    city: parseLiftCity_(audit.location || previousRow.location || [previousRow.city, previousRow.state].filter(Boolean).join(', ')) || previousRow.city,
    state: parseLiftState_(audit.location || previousRow.location || [previousRow.city, previousRow.state].filter(Boolean).join(', ')) || previousRow.state,
    pipeline_status: 'Ready to Draft',
    fit_score: audit.fit_score == null ? '' : String(audit.fit_score),
    priority: audit.priority || '',
    recommended_offer: audit.recommended_offer || '',
    primary_opportunity: audit.website_first_impression || audit.brand_clarity || '',
    secondary_opportunity: audit.social_first_impression || audit.content_opportunities || '',
    pitch_angle: audit.offer_angle || '',
    specific_observation: audit.website_first_impression || audit.social_first_impression || '',
    business_impact: audit.why_it_matters || '',
    quick_win: audit.quick_win || '',
    next_step: 'Email Marketer: draft first-touch outreach',
    notes: appendLiftNote_(previousRow.notes, audit.notes),
    automation_notes: `Audit completed automatically ${new Date().toISOString()}. ${audit.audit_summary || ''}`.trim()
  };

  Object.keys(valuesByHeader).forEach(header => {
    if (headers[header]) setLiftCell_(sheet, rowNumber, headers[header], valuesByHeader[header]);
  });
}

function appendLiftMiniAudit_(row, audit) {
  const ss = SpreadsheetApp.openById(LIFT_PIPELINE_CONFIG.spreadsheetId);
  const sheet = ss.getSheetByName(LIFT_PIPELINE_CONFIG.miniAuditsSheetName);
  if (!sheet) return;

  const headers = getLiftHeaderMap_(sheet);
  const nextRow = Math.max(sheet.getLastRow() + 1, 2);
  const record = {
    business_name: audit.business_name || row.business_name || '',
    website: row.website || '',
    category: audit.category || row.category || '',
    city: parseLiftCity_(audit.location || row.location || [row.city, row.state].filter(Boolean).join(', ')),
    state: parseLiftState_(audit.location || row.location || [row.city, row.state].filter(Boolean).join(', ')),
    score: audit.fit_score == null ? '' : String(audit.fit_score),
    outreach_priority: audit.priority || '',
    recommended_offer: audit.recommended_offer || '',
    audit_quality_score: 'Auto audit - review before sending',
    specific_observation: audit.website_first_impression || audit.social_first_impression || '',
    business_impact: audit.why_it_matters || '',
    quick_win: audit.quick_win || '',
    mini_audit: audit.mini_audit || '',
    paid_offer: audit.offer_angle || '',
    send_readiness: 'Review before sending'
  };

  Object.keys(record).forEach(header => {
    if (headers[header]) setLiftCell_(sheet, nextRow, headers[header], record[header]);
  });
}

function fetchLiftWebsiteText_(url) {
  try {
    const response = UrlFetchApp.fetch(url, {
      method: 'get',
      followRedirects: true,
      muteHttpExceptions: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    const statusCode = response.getResponseCode();
    if (statusCode < 200 || statusCode >= 300) return `Website fetch failed: HTTP ${statusCode}`;
    return cleanLiftHtml_(response.getContentText()).slice(0, LIFT_PIPELINE_CONFIG.webTextCharLimit);
  } catch (error) {
    return `Website fetch failed: ${error.message}`;
  }
}

function cleanLiftHtml_(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function testLiftClaudeConnection() {
  const audit = callLiftClaudeAudit_({
    business_name: 'Test Local Cafe',
    website: '',
    instagram: '',
    tiktok: '',
    category: 'Cafe',
    location: 'Harrisburg, PA',
    source: 'Test',
    notes: 'Test only. Do not browse.'
  }, 'Test cafe with breakfast sandwiches, seasonal drinks, online ordering, and local events.');

  SpreadsheetApp.getActive().toast(`Claude connection works: ${audit.recommended_offer || 'audit returned'}`);
}

function getLiftPipelineSheet_(ss) {
  const sheet = ss.getSheetByName(LIFT_PIPELINE_CONFIG.pipelineSheetName);
  if (!sheet) throw new Error(`Missing sheet: ${LIFT_PIPELINE_CONFIG.pipelineSheetName}`);
  return sheet;
}

function ensureLiftPipelineHeaders_(sheet) {
  const currentLastColumn = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, currentLastColumn).getValues()[0].map(String);
  const normalized = {};
  headers.forEach((header, index) => {
    const key = normalizeLiftHeader_(header);
    if (key) normalized[key] = index + 1;
  });

  LIFT_PIPELINE_CONFIG.requiredHeaders.forEach(header => {
    if (normalized[header]) return;
    const nextCol = sheet.getLastColumn() + 1;
    sheet.getRange(1, nextCol).setValue(LIFT_DISPLAY_HEADERS[header] || header);
    normalized[header] = nextCol;
  });
}

function formatLiftPipelineSheet_(sheet) {
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, sheet.getLastColumn())
    .setFontWeight('bold')
    .setBackground('#2E4435')
    .setFontColor('#FBFAF6')
    .setWrap(true);
  sheet.autoResizeColumns(1, Math.min(sheet.getLastColumn(), 32));
}

function readLiftPipelineRows_(sheet, headers) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
  return values.map((rowValues, index) => ({
    rowNumber: index + 2,
    values: rowValuesToLiftObject_(rowValues, headers)
  }));
}

function readLiftRowValues_(sheet, rowNumber, headers) {
  const rowValues = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()).getValues()[0];
  return rowValuesToLiftObject_(rowValues, headers);
}

function rowValuesToLiftObject_(rowValues, headers) {
  const row = {};
  Object.keys(headers).forEach(header => {
    row[header] = rowValues[headers[header] - 1];
  });
  return row;
}

function getLiftHeaderMap_(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const map = {};
  headers.forEach((header, index) => {
    const key = normalizeLiftHeader_(header);
    if (key) map[key] = index + 1;
  });
  return map;
}

function normalizeLiftHeader_(header) {
  const normalized = String(header || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const aliases = Object.keys(LIFT_HEADER_ALIASES);
  for (let i = 0; i < aliases.length; i += 1) {
    const canonical = aliases[i];
    const names = LIFT_HEADER_ALIASES[canonical];
    if (names.some(name => String(name || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') === normalized)) {
      return canonical;
    }
  }
  return normalized;
}

function getLiftColumnsInRange_(range) {
  const cols = [];
  for (let col = range.getColumn(); col < range.getColumn() + range.getNumColumns(); col++) {
    cols.push(col);
  }
  return cols;
}

function setLiftCell_(sheet, row, col, value) {
  if (!col) return;
  sheet.getRange(row, col).setValue(value);
}

function appendLiftNote_(existing, addition) {
  if (!addition) return existing || '';
  if (!existing) return addition;
  if (String(existing).indexOf(addition) !== -1) return existing;
  return `${existing}\n\nAuto audit note: ${addition}`;
}

function parseLiftCity_(location) {
  const parts = String(location || '').split(',').map(part => part.trim()).filter(Boolean);
  return parts[0] || '';
}

function parseLiftState_(location) {
  const parts = String(location || '').split(',').map(part => part.trim()).filter(Boolean);
  return parts[1] || '';
}

function extractLiftJson_(text) {
  const trimmed = String(text || '').trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) return trimmed;

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();

  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) return trimmed.slice(start, end + 1);

  throw new Error(`Claude did not return JSON: ${trimmed.slice(0, 500)}`);
}
