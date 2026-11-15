/**
 * Vigil leads, a Google Apps Script web app (free).
 * Saves every lead from the website assistant to the "Leads" sheet, adds the
 * full chat when the visitor leaves, and emails support@relyxus.com.
 * Setup steps are in agent/README.md.
 */
const NOTIFY = "support@relyxus.com";
const HEAD = ["Received", "Name", "Work email", "Company", "Sector", "Regulators", "Interest", "Questions", "Page", "Referrer", "Chat"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents || "{}");
    const lead = d.lead || {};
    const email = String(lead.email || "").slice(0, 120);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return out({ ok: false });
    const sh = sheet();
    const clean = (v, n) => String(v || "").replace(/^[=+\-@]/, "'").slice(0, n || 300);
    if (d.kind === "transcript") {
      const rows = sh.getRange(2, 3, Math.max(1, sh.getLastRow() - 1), 1).getValues();
      for (let i = rows.length - 1; i >= 0; i--) {
        if (rows[i][0] === email) { sh.getRange(i + 2, 11).setValue(clean(d.transcript, 40000)); return out({ ok: true }); }
      }
      return out({ ok: false });
    }
    sh.appendRow([new Date(), clean(lead.name, 80), email, clean(lead.company, 120), clean(lead.sector, 80), clean(lead.regulators, 120),
      clean(lead.interest, 200), clean((lead.questions || []).join(" | "), 2000), clean(d.page, 200), clean(d.referrer, 300), clean(d.transcript, 40000)]);
    MailApp.sendEmail({
      to: NOTIFY,
      subject: "New Vigil lead: " + clean(lead.name, 80) + ", " + clean(lead.company, 120),
      body: "Name: " + lead.name + "\nEmail: " + email + "\nCompany: " + lead.company + "\nSector: " + (lead.sector || "") +
        "\nRegulators: " + (lead.regulators || "") + "\nInterested in: " + (lead.interest || "") + "\nPage: " + d.page + "\n\nChat so far:\n" + (d.transcript || ""),
    });
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false });
  } finally {
    lock.releaseLock();
  }
}

function sheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName("Leads");
  if (!sh) { sh = ss.insertSheet("Leads"); sh.appendRow(HEAD); sh.setFrozenRows(1); }
  return sh;
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
