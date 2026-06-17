/**
 * Lift Brand Pipeline automation.
 *
 * Install:
 * 1. Open the Google Sheet: Lift Brand Pipeline - Lead Tracker.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this file into Code.gs, or add it as a new script file.
 * 4. In Project Settings > Script Properties, add:
 *    - ANTHROPIC_API_KEY = your Claude API key
 *    - Optional: ANTHROPIC_MODEL = claude-sonnet-4-5-20250929
 * 5. Run setupLiftBrandPipelineAutomation once and approve permissions.
 *
 * What it does:
 * - Watches the Brand Pipeline tab.
 * - When you add/edit a business name, website, Instagram, TikTok, category,
 *   location, or notes field, it queues that row for audit.
 * - A time trigger processes queued rows and fills the audit fields.
 * - You can also run the selected row from the custom Lift Pipeline menu.
 */

const LIFT_PIPELINE_CONFIG = {
  spreadsheetId: '1akR5CEjn3qeqRgF6lecbUCMq7wYDhrSSCQ-nX55VbSA',
  legacySpreadsheetId: '1ZUgq7srd2P835fA_Kge80ZpiFJjvUwBR_PXCjZsU688',
  pipelineSheetName: 'Brand Pipeline',
  miniAuditsSheetName: 'Mini Audits',
  maxAuditsPerRun: 2,
  webTextCharLimit: 9000,
  claudeMaxTokens: 2600,
  claudeTemperature: 0.2,
  defaultModel: 'claude-sonnet-4-5-20250929',
  watchedHeaders: [
    'business_name',
    'website',
    'instagram',
    'tiktok',
    'category',
    'location',
    'source',
    'notes'
  ],
  requiredHeaders: [
    'date_added',
    'business_name',
    'website',
    'instagram',
    'tiktok',
    'category',
    'location',
    'source',
    'contact_name',
    'email',
    'pipeline_status',
    'fit_score',
    'priority',
    'offer_angle',
    'website_first_impression',
    'social_first_impression',
    'brand_clarity',
    'content_opportunities',
    'quick_win',
    'why_it_matters',
    'recommended_offer',
    'audit_type',
    'next_step',
    'audit_doc_link',
    'lookbook_sent',
    'last_contacted',
    'follow_up_date',
    'notes',
    'audit_summary',
    'mini_audit',
    'audit_ran_at',
    'audit_error'
  ]
};

function migrateOldLiftTrackerIntoThisSheet() {
  const source = SpreadsheetApp.openById(LIFT_PIPELINE_CONFIG.legacySpreadsheetId);
  const target = SpreadsheetApp.openById(LIFT_PIPELINE_CONFIG.spreadsheetId);
  const placeholder = target.insertSheet('__migration_placeholder__');

  target.getSheets().forEach(sheet => {
    if (sheet.getSheetId() !== placeholder.getSheetId()) {
      target.deleteSheet(sheet);
    }
  });

  source.getSheets().forEach(sourceSheet => {
    const copied = sourceSheet.copyTo(target);
    copied.setName(sourceSheet.getName());
  });

  target.deleteSheet(placeholder);

  const pipeline = target.getSheetByName(LIFT_PIPELINE_CONFIG.pipelineSheetName);
  if (pipeline) {
    ensureLiftPipelineHeaders_(pipeline);
    formatLiftPipelineSheet_(pipeline);
  }

  target.toast('Migration complete. All legacy tracker tabs were copied into this clean Lift-owned file.');
}

function polishLiftBrandPipelineSheet() {
  const ss = SpreadsheetApp.openById(LIFT_PIPELINE_CONFIG.spreadsheetId);
  ensureWorkingTabs_(ss);
  buildLiftCommandCenter_(ss);
  polishLiftPipeline_(ss);
  polishLiftFramework_(ss);
  polishLiftMiniAudits_(ss);
  polishAllLiftSheets_(ss);
  ss.toast('Lift tracker polished: command center rebuilt, key tabs styled, legacy tabs tucked away.');
}

function ensureWorkingTabs_(ss) {
  const pipeline = ss.getSheetByName(LIFT_PIPELINE_CONFIG.pipelineSheetName);
  if (!pipeline) {
    throw new Error(`Missing ${LIFT_PIPELINE_CONFIG.pipelineSheetName}. Run migrateOldLiftTrackerIntoThisSheet first.`);
  }

  let dashboard = ss.getSheetByName('Command Center') || ss.getSheetByName('Dashboard');
  if (!dashboard) dashboard = ss.insertSheet('Command Center', 0);
  dashboard.setName('Command Center');
  ss.setActiveSheet(dashboard);
  ss.moveActiveSheet(1);

  const orderedTabs = [
    'Command Center',
    'Brand Pipeline',
    'Brand Audit Framework',
    'Mini Audits',
    'Follow Ups',
    'Revenue'
  ];

  orderedTabs.forEach((name, index) => {
    const sheet = ss.getSheetByName(name);
    if (!sheet) return;
    ss.setActiveSheet(sheet);
    ss.moveActiveSheet(index + 1);
  });

  const tabColors = {
    'Command Center': '#1f1f1f',
    'Brand Pipeline': '#B98272',
    'Brand Audit Framework': '#A9B2A4',
    'Mini Audits': '#5D514B',
    'Follow Ups': '#C7A27C',
    'Revenue': '#2F6F73'
  };

  Object.keys(tabColors).forEach(name => {
    const sheet = ss.getSheetByName(name);
    if (sheet) sheet.setTabColor(tabColors[name]);
  });

  [
    'Leads',
    'Outreach Queue',
    'Batch 1 Send Plan',
    'Automated Workflow',
    'Audit Quality Checklist',
    'Search Queries',
    'Niches And Areas'
  ].forEach(name => {
    const sheet = ss.getSheetByName(name);
    if (sheet) sheet.hideSheet();
  });
}

function buildLiftCommandCenter_(ss) {
  const sheet = ss.getSheetByName('Command Center');
  sheet.clear();
  sheet.setHiddenGridlines(true);
  sheet.setFrozenRows(0);

  sheet.getRange('A1:H1').merge()
    .setValue('Lift Brand Pipeline')
    .setFontSize(24)
    .setFontWeight('bold')
    .setFontColor('#1F1F1F')
    .setBackground('#F8F4EF');

  sheet.getRange('A2:H2').merge()
    .setValue('A clean operating hub for prospect audits, content opportunities, and outreach readiness.')
    .setFontSize(11)
    .setFontColor('#5D514B')
    .setBackground('#F8F4EF');

  const metrics = [
    ['Total Prospects', '=COUNTA(\'Brand Pipeline\'!B2:B)'],
    ['A - High Fit', '=COUNTIF(\'Brand Pipeline\'!M:M,"A - high fit")'],
    ['Queued Audits', '=COUNTIF(\'Brand Pipeline\'!K:K,"Audit queued")'],
    ['Completed Audits', '=COUNTIF(\'Brand Pipeline\'!K:K,"Audit complete")'],
    ['Ready To Send', '=COUNTIF(\'Brand Pipeline\'!K:K,"Ready to send")'],
    ['Sent', '=COUNTIF(\'Brand Pipeline\'!K:K,"Sent")']
  ];

  sheet.getRange(4, 1, 1, 2).setValues([['Metric', 'Value']]);
  sheet.getRange(5, 1, metrics.length, 2).setValues(metrics);

  sheet.getRange('D4:H4').merge().setValue('Today\'s Workflow');
  sheet.getRange('D5:H10').setValues([
    ['1. Add new brands to Brand Pipeline', '', '', '', ''],
    ['2. Add website, Instagram, category, location, and notes', '', '', '', ''],
    ['3. Confirm rows move to Audit queued', '', '', '', ''],
    ['4. Review mini_audit before sending', '', '', '', ''],
    ['5. Mark Ready to send only after human review', '', '', '', ''],
    ['6. Track outreach and follow-up dates', '', '', '', '']
  ]);

  sheet.getRange('A13:H13').merge().setValue('Priority View');
  sheet.getRange('A14:H14').setValues([[
    'Business',
    'Priority',
    'Status',
    'Recommended Offer',
    'Next Step',
    'Audit Ran At',
    'Lookbook Sent',
    'Notes'
  ]]);
  sheet.getRange('A15').setFormula(
    '=IFERROR(QUERY(\'Brand Pipeline\'!B2:AF,' +
    '"select B,M,K,U,W,AE,Y,AB where B is not null order by M asc, K asc limit 12",0),' +
    '"No pipeline rows yet")'
  );

  sheet.getRangeList(['A4:B4', 'D4:H4', 'A13:H14'])
    .setBackground('#1F1F1F')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold');

  sheet.getRange('A5:B10')
    .setBackground('#F8F4EF')
    .setFontColor('#1F1F1F')
    .setBorder(true, true, true, true, true, true, '#E6DED5', SpreadsheetApp.BorderStyle.SOLID);

  sheet.getRange('D5:H10')
    .setBackground('#F8F4EF')
    .setFontColor('#5D514B')
    .setBorder(true, true, true, true, true, true, '#E6DED5', SpreadsheetApp.BorderStyle.SOLID);

  sheet.getRange('A14:H30')
    .setWrap(true)
    .setVerticalAlignment('top')
    .setBorder(true, true, true, true, true, true, '#E6DED5', SpreadsheetApp.BorderStyle.SOLID);

  sheet.setColumnWidths(1, 1, 180);
  sheet.setColumnWidths(2, 1, 110);
  sheet.setColumnWidths(3, 1, 145);
  sheet.setColumnWidths(4, 1, 220);
  sheet.setColumnWidths(5, 1, 280);
  sheet.setColumnWidths(6, 1, 140);
  sheet.setColumnWidths(7, 1, 120);
  sheet.setColumnWidths(8, 1, 260);
  sheet.setRowHeights(1, 2, 34);
  sheet.setRowHeights(14, 16, 42);
}

function polishLiftPipeline_(ss) {
  const sheet = ss.getSheetByName(LIFT_PIPELINE_CONFIG.pipelineSheetName);
  ensureLiftPipelineHeaders_(sheet);
  formatLiftPipelineSheet_(sheet);
  sheet.setHiddenGridlines(true);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);

  const headers = getLiftHeaderMap_(sheet);
  const lastRow = Math.max(sheet.getMaxRows(), 500);
  const lastCol = sheet.getLastColumn();

  sheet.getRange(1, 1, 1, lastCol)
    .setBackground('#1F1F1F')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);

  if (lastRow > 1) {
    sheet.getBandings().forEach(banding => banding.remove());
    sheet.getRange(2, 1, lastRow - 1, lastCol)
      .setVerticalAlignment('top')
      .setWrap(true)
      .setFontColor('#1F1F1F');
    sheet.getRange(2, 1, lastRow - 1, lastCol)
      .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);
  }

  const widths = {
    date_added: 105,
    business_name: 210,
    website: 260,
    instagram: 260,
    category: 160,
    location: 160,
    pipeline_status: 145,
    priority: 130,
    offer_angle: 250,
    website_first_impression: 280,
    social_first_impression: 280,
    brand_clarity: 240,
    content_opportunities: 300,
    quick_win: 300,
    why_it_matters: 280,
    recommended_offer: 220,
    audit_type: 170,
    next_step: 300,
    notes: 300,
    audit_summary: 340,
    mini_audit: 420,
    audit_ran_at: 145,
    audit_error: 280
  };

  Object.keys(widths).forEach(header => {
    if (headers[header]) sheet.setColumnWidth(headers[header], widths[header]);
  });

  ['website', 'instagram', 'tiktok', 'contact_name', 'email', 'audit_doc_link', 'last_contacted', 'follow_up_date'].forEach(header => {
    if (headers[header]) sheet.getRange(1, headers[header], sheet.getMaxRows()).setBackground('#FAFAFA');
  });

  ['website_first_impression', 'social_first_impression', 'brand_clarity', 'content_opportunities', 'quick_win', 'why_it_matters', 'audit_summary', 'mini_audit'].forEach(header => {
    if (headers[header]) sheet.getRange(1, headers[header], sheet.getMaxRows()).setBackground('#F8F4EF');
  });

  const statusCol = headers.pipeline_status;
  if (statusCol) {
    const rules = sheet.getConditionalFormatRules().filter(rule => {
      const ranges = rule.getRanges();
      return !ranges.some(range => range.getColumn() === statusCol);
    });
    const statusRange = sheet.getRange(2, statusCol, sheet.getMaxRows() - 1, 1);
    [
      ['Audit queued', '#FFF2CC'],
      ['Audit running', '#D9EAF7'],
      ['Audit complete', '#D9EAD3'],
      ['Audit error', '#F4CCCC'],
      ['Ready to send', '#D9EAD3'],
      ['Sent', '#D9D2E9']
    ].forEach(([text, color]) => {
      rules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo(text)
        .setBackground(color)
        .setRanges([statusRange])
        .build());
    });
    sheet.setConditionalFormatRules(rules);
  }

  const existingFilter = sheet.getFilter();
  if (existingFilter) existingFilter.remove();
  sheet.getDataRange().createFilter();
}

function polishLiftFramework_(ss) {
  const sheet = ss.getSheetByName('Brand Audit Framework');
  if (!sheet) return;
  sheet.setHiddenGridlines(true);
  sheet.setFrozenRows(1);
  const lastCol = sheet.getLastColumn();
  const lastRow = sheet.getLastRow();
  sheet.getRange(1, 1, 1, lastCol)
    .setBackground('#A9B2A4')
    .setFontColor('#1F1F1F')
    .setFontWeight('bold')
    .setWrap(true);
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, lastCol)
      .setBackground('#F8F4EF')
      .setWrap(true)
      .setVerticalAlignment('top');
  }
  sheet.setColumnWidths(1, lastCol, 210);
  sheet.setColumnWidth(2, 260);
  sheet.setColumnWidth(6, 280);
  sheet.setColumnWidth(7, 260);
}

function polishLiftMiniAudits_(ss) {
  const sheet = ss.getSheetByName('Mini Audits');
  if (!sheet) return;
  sheet.setHiddenGridlines(true);
  sheet.setFrozenRows(1);
  const lastCol = sheet.getLastColumn();
  sheet.getRange(1, 1, 1, lastCol)
    .setBackground('#5D514B')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setWrap(true);
  sheet.getDataRange().setWrap(true).setVerticalAlignment('top');
  sheet.setColumnWidth(1, 220);
  sheet.setColumnWidth(8, 220);
  sheet.setColumnWidth(13, 520);
  sheet.setColumnWidth(14, 360);
  sheet.setColumnWidth(15, 180);
}

function polishAllLiftSheets_(ss) {
  ss.getSheets().forEach(sheet => {
    sheet.getDataRange().setFontFamily('Arial');
    sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), Math.max(sheet.getLastColumn(), 1))
      .setVerticalAlignment('top');
  });
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Lift Pipeline')
    .addItem('Install automation', 'setupLiftBrandPipelineAutomation')
    .addItem('Run queued audits now', 'runQueuedLiftBrandAudits')
    .addItem('Run incomplete newer audits', 'runIncompleteNewerLiftBrandAudits')
    .addItem('Audit selected row now', 'auditSelectedLiftBrandRow')
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

  ss.toast('Lift Brand Pipeline automation installed. New/edited brand links will queue for audit.');
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
      if ((row.values.pipeline_status || '') !== 'Audit queued') return;
      if (!row.values.business_name && !row.values.website && !row.values.instagram && !row.values.tiktok) return;

      processed++;
      runLiftAuditForRow_(sheet, row.rowNumber, headers);
    });

    if (processed) ss.toast(`Lift audit automation processed ${processed} queued row(s).`);
  } finally {
    lock.releaseLock();
  }
}

function runIncompleteNewerLiftBrandAudits() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return;

  try {
    const ss = SpreadsheetApp.openById(LIFT_PIPELINE_CONFIG.spreadsheetId);
    const sheet = getLiftPipelineSheet_(ss);
    ensureLiftPipelineHeaders_(sheet);
    const headers = getLiftHeaderMap_(sheet);
    const rows = readLiftPipelineRows_(sheet, headers);
    let queued = 0;
    let processed = 0;
    const manualLimit = 8;

    rows.forEach(row => {
      const values = row.values;
      const hasBrandInput = values.business_name || values.website || values.instagram || values.tiktok;
      if (!hasBrandInput) return;
      if (values.audit_summary || values.mini_audit || values.audit_ran_at) return;
      if (['Audit running', 'Sent', 'Follow up', 'Paused', 'Not a fit'].includes(values.pipeline_status || '')) return;
      queueLiftAuditForRow_(sheet, row.rowNumber, headers);
      queued++;
    });

    SpreadsheetApp.flush();

    readLiftPipelineRows_(sheet, headers).forEach(row => {
      if (processed >= manualLimit) return;
      if ((row.values.pipeline_status || '') !== 'Audit queued') return;
      processed++;
      runLiftAuditForRow_(sheet, row.rowNumber, headers);
    });

    polishLiftBrandPipelineSheet();
    ss.toast(`Queued ${queued} incomplete row(s) and processed ${processed}. Rerun if more remain.`);
  } finally {
    lock.releaseLock();
  }
}

function auditSelectedLiftBrandRow() {
  const ss = SpreadsheetApp.openById(LIFT_PIPELINE_CONFIG.spreadsheetId);
  const sheet = getLiftPipelineSheet_(ss);
  const range = sheet.getActiveRange();
  if (!range || range.getRow() < 2) {
    throw new Error('Select a data row in Brand Pipeline before running this.');
  }

  ensureLiftPipelineHeaders_(sheet);
  const headers = getLiftHeaderMap_(sheet);
  runLiftAuditForRow_(sheet, range.getRow(), headers);
  ss.toast(`Audit completed for row ${range.getRow()}.`);
}

function runLiftAuditForRow_(sheet, rowNumber, headers) {
  const row = readLiftRowValues_(sheet, rowNumber, headers);
  if (!row.business_name && !row.website && !row.instagram && !row.tiktok) return;

  setLiftCell_(sheet, rowNumber, headers.pipeline_status, 'Audit running');
  setLiftCell_(sheet, rowNumber, headers.audit_error, '');
  SpreadsheetApp.flush();

  try {
    const websiteText = row.website ? fetchLiftWebsiteText_(row.website) : '';
    const audit = callLiftClaudeAudit_(row, websiteText);
    writeLiftAuditResult_(sheet, rowNumber, headers, row, audit);
    appendLiftMiniAudit_(row, audit);
  } catch (error) {
    setLiftCell_(sheet, rowNumber, headers.pipeline_status, 'Audit error');
    setLiftCell_(sheet, rowNumber, headers.audit_error, error.message.slice(0, 45000));
  }
}

function queueLiftAuditForRow_(sheet, rowNumber, headers) {
  const row = readLiftRowValues_(sheet, rowNumber, headers);
  if (!row.business_name && !row.website && !row.instagram && !row.tiktok) return;

  if (!row.date_added && headers.date_added) {
    setLiftCell_(sheet, rowNumber, headers.date_added, new Date());
  }

  const status = row.pipeline_status || '';
  if (['Audit running', 'Audit complete', 'Sent', 'Follow up', 'Paused', 'Not a fit'].includes(status)) {
    return;
  }

  setLiftCell_(sheet, rowNumber, headers.pipeline_status, 'Audit queued');
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
      pipeline_status: 'Audit complete',
      fit_score: 'number 1-20',
      priority: 'A - high fit|B - possible fit|C - low fit|Hold',
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
    `TikTok: ${row.tiktok || ''}`,
    `Category: ${row.category || ''}`,
    `Location: ${row.location || ''}`,
    `Source: ${row.source || ''}`,
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
    location: audit.location || previousRow.location,
    pipeline_status: 'Audit complete',
    fit_score: audit.fit_score == null ? '' : String(audit.fit_score),
    priority: audit.priority || '',
    offer_angle: audit.offer_angle || '',
    website_first_impression: audit.website_first_impression || '',
    social_first_impression: audit.social_first_impression || '',
    brand_clarity: audit.brand_clarity || '',
    content_opportunities: audit.content_opportunities || '',
    quick_win: audit.quick_win || '',
    why_it_matters: audit.why_it_matters || '',
    recommended_offer: audit.recommended_offer || '',
    audit_type: audit.audit_type || '',
    next_step: audit.next_step || '',
    notes: appendLiftNote_(previousRow.notes, audit.notes),
    audit_summary: audit.audit_summary || '',
    mini_audit: audit.mini_audit || '',
    audit_ran_at: new Date(),
    audit_error: ''
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
    city: parseLiftCity_(audit.location || row.location || ''),
    state: parseLiftState_(audit.location || row.location || ''),
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
    sheet.getRange(1, nextCol).setValue(header);
    normalized[header] = nextCol;
  });
}

function formatLiftPipelineSheet_(sheet) {
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, sheet.getLastColumn())
    .setFontWeight('bold')
    .setBackground('#1f1f1f')
    .setFontColor('#ffffff')
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
  return String(header || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
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
