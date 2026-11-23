/**
 * The Right to Be Real: pledge counter (Google Apps Script).
 *
 * Paste this into a Google Sheet: Extensions → Apps Script. Then Deploy → New deployment →
 * type "Web app", Execute as "Me", Who has access "Anyone". Copy the web app URL into
 * `pledge_endpoint` in _config.yml.
 *
 * Stores no personal data: one row per pledge with a random device id, the time, and the
 * poll answer (day or month). Emails are NOT collected here; they go to Kit later.
 */
const SHEET_NAME = 'Pledges';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Pledged at', 'Device id', 'Poll']);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function count_(sh) {
  return Math.max(sh.getLastRow() - 1, 0);
}

// GET: { count }
function doGet() {
  return json_({ count: count_(sheet_()) });
}

// POST action=pledge&id=...  or  action=poll&id=...&choice=day|month
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = sheet_();
    const p = (e && e.parameter) || {};
    const id = String(p.id || '').slice(0, 64);
    if (!/^[a-z0-9-]{8,64}$/i.test(id)) return json_({ ok: false, error: 'bad id', count: count_(sh) });

    const ids = sh.getLastRow() > 1 ? sh.getRange(2, 2, sh.getLastRow() - 1, 1).getValues().map(r => r[0]) : [];
    let row = ids.indexOf(id);

    if (p.action === 'pledge' && row === -1) {
      sh.appendRow([new Date(), id, '']);
    } else if (p.action === 'poll' && (p.choice === 'day' || p.choice === 'month')) {
      if (row === -1) { sh.appendRow([new Date(), id, p.choice]); }
      else { sh.getRange(row + 2, 3).setValue(p.choice); }
    }
    return json_({ ok: true, count: count_(sh) });
  } finally {
    lock.releaseLock();
  }
}
