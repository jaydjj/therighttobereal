/**
 * The Right to Be Real: pledge counter (Google Apps Script).
 *
 * Paste this into a Google Sheet: Extensions → Apps Script. Then Deploy → New deployment →
 * type "Web app", Execute as "Me", Who has access "Anyone". Copy the web app URL into
 * `pledge_endpoint` in _config.yml.
 *
 * "Pledges" tab: one row per pledge with a random device id, the time and the poll answer
 * (day or month). No personal data.
 * "Emails" tab: only people who typed an email and pressed "Sign up" in the site footer (the opt-in). Keeps the time and
 * the exact consent wording (proof of consent under Canada's anti-spam law). Import this tab
 * into Kit when you're ready to send.
 *
 * After changing this script: Deploy → Manage deployments → Edit (pencil) → Version: New version
 * → Deploy. That keeps the same web app URL.
 */
const EMAIL_SHEET = 'Emails';
const CONSENT_TEXT = 'Opted in by entering their email and pressing "Sign up" under: Emails and reminders. Beauty Blackout reminders and news from The Right to Be Real. Unsubscribe any time.';
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

function emailSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(EMAIL_SHEET);
  if (!sh) {
    sh = ss.insertSheet(EMAIL_SHEET);
    sh.appendRow(['Email', 'Consented at', 'Consent wording', 'Poll', 'Device id']);
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

// POST action=pledge&id=...  |  action=poll&id=...&choice=day|month
//      action=email&id=...&email=...&consent=yes
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
    if (p.action === 'email') {
      const email = String(p.email || '').trim().toLowerCase().slice(0, 254);
      if (p.consent !== 'yes' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json_({ ok: false, error: 'email and consent required', count: count_(sh) });
      }
      const es = emailSheet_();
      const emails = es.getLastRow() > 1 ? es.getRange(2, 1, es.getLastRow() - 1, 1).getValues().map(r => r[0]) : [];
      const poll = row === -1 ? '' : sh.getRange(row + 2, 3).getValue();
      if (emails.indexOf(email) === -1) es.appendRow([email, new Date(), CONSENT_TEXT, poll, id]);
    }
    return json_({ ok: true, count: count_(sh) });
  } finally {
    lock.releaseLock();
  }
}
