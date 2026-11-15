/**
 * Relyxus website leads, a Google Apps Script web app (free).
 *
 * Saves every lead from the website (the assistant, the Talk to the team
 * form, the demo booking form and Replay my outage) as a row in the "Leads"
 * tab, adds the whole chat when the visitor leaves, saves replay files to a
 * private Google Drive folder, and emails support@relyxus.com for each lead.
 *
 * First time: choose "setup" in the function list above and press Run.
 * Then: Deploy, New deployment, Web app, Execute as Me, Who has access Anyone.
 */

const NOTIFY = "support@relyxus.com";
const TAB = "Leads";
const REPLAY_FOLDER = "Relyxus replays";
const HEAD = ["Received", "Name", "Work email", "Company", "Country", "Phone", "Sector", "Regulators", "Interested in", "Questions", "Page", "Came from", "Replay files", "Chat", "Status"];
const COL = Object.fromEntries(HEAD.map((h, i) => [h, i + 1]));

/** Run once by hand: creates the Leads tab, its columns and formatting. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(TAB);
  if (!sh) sh = ss.insertSheet(TAB, 0);
  sh.getRange(1, 1, 1, HEAD.length).setValues([HEAD])
    .setFontWeight("bold").setFontColor("#FFFFFF").setBackground("#0A0C10").setVerticalAlignment("middle");
  sh.setFrozenRows(1);
  sh.setRowHeight(1, 34);
  const widths = [150, 160, 220, 180, 130, 140, 160, 170, 220, 320, 160, 200, 200, 420, 120];
  widths.forEach((w, i) => sh.setColumnWidth(i + 1, w));
  sh.getRange(2, COL["Received"], sh.getMaxRows() - 1, 1).setNumberFormat("dd mmm yyyy, hh:mm");
  sh.getRange(2, 1, sh.getMaxRows() - 1, HEAD.length).setWrap(true).setVerticalAlignment("top");
  const status = SpreadsheetApp.newDataValidation().requireValueInList(["New", "Contacted", "Demo booked", "Not a fit"], true).build();
  sh.getRange(2, COL["Status"], sh.getMaxRows() - 1, 1).setDataValidation(status);
  const blank = ss.getSheetByName("Sheet1");
  if (blank && blank.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(blank);
  folderNamed(REPLAY_FOLDER);
  MailApp.getRemainingDailyQuota();
  SpreadsheetApp.getUi().alert("Relyxus leads is ready. Next: Deploy, New deployment, Web app.");
}

/** Opening the web app address in a browser shows that it is working. */
function doGet() {
  return ContentService.createTextOutput("Relyxus leads is ready.");
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const lead = d.lead || {};
    const email = String(lead.email || "").trim().toLowerCase().slice(0, 120);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return out({ ok: false });
    const sh = sheet();
    const clean = (v, n) => String(v == null ? "" : v).replace(/^([=+\-@])/, "'$1").slice(0, n || 300);

    // When the visitor leaves, the whole chat is added to their latest row.
    if (d.kind === "transcript") {
      const last = sh.getLastRow();
      if (last < 2) return out({ ok: false });
      const emails = sh.getRange(2, COL["Work email"], last - 1, 1).getValues();
      for (let i = emails.length - 1; i >= 0; i--) {
        if (String(emails[i][0]).toLowerCase() === email) { sh.getRange(i + 2, COL["Chat"]).setValue(clean(d.transcript, 45000)); return out({ ok: true }); }
      }
      return out({ ok: false });
    }

    // The same person sending twice within two minutes is one lead.
    const cache = CacheService.getScriptCache();
    const key = "lead:" + email + ":" + (d.kind || "lead");
    if (cache.get(key) && d.kind !== "replay") return out({ ok: true, duplicate: true });
    cache.put(key, "1", 120);

    let files = "";
    if (d.kind === "replay" && Array.isArray(d.files) && d.files.length) {
      const f = folderNamed(REPLAY_FOLDER).createFolder(clean(lead.company || email, 80) + ", " + Utilities.formatDate(new Date(), "Europe/London", "yyyy-MM-dd HH:mm"));
      d.files.slice(0, 10).forEach(function (x) {
        const bytes = Utilities.base64Decode(String(x.data || ""));
        if (bytes.length > 0 && bytes.length <= 15 * 1024 * 1024) f.createFile(Utilities.newBlob(bytes, String(x.type || "application/octet-stream"), clean(x.name, 120)));
      });
      files = f.getUrl();
    }

    const row = new Array(HEAD.length).fill("");
    row[COL["Received"] - 1] = new Date();
    row[COL["Name"] - 1] = clean(lead.name, 80);
    row[COL["Work email"] - 1] = email;
    row[COL["Company"] - 1] = clean(lead.company, 120);
    row[COL["Country"] - 1] = clean(lead.country, 80);
    row[COL["Phone"] - 1] = clean(lead.phone, 40);
    row[COL["Sector"] - 1] = clean(lead.sector, 80);
    row[COL["Regulators"] - 1] = clean(lead.regulators, 120);
    row[COL["Interested in"] - 1] = clean(d.kind === "replay" ? "Replay my outage" : lead.interest, 300);
    row[COL["Questions"] - 1] = clean((lead.questions || []).join("\n"), 3000);
    row[COL["Page"] - 1] = clean(d.page, 200);
    row[COL["Came from"] - 1] = clean(d.referrer, 300);
    row[COL["Replay files"] - 1] = files;
    row[COL["Chat"] - 1] = clean(d.transcript, 45000);
    row[COL["Status"] - 1] = "New";
    sh.appendRow(row);

    MailApp.sendEmail({
      to: NOTIFY,
      replyTo: email,
      subject: "New Relyxus lead: " + (lead.name || email) + (lead.company ? ", " + lead.company : ""),
      body: [
        "Name: " + (lead.name || ""), "Email: " + email, "Company: " + (lead.company || ""), "Country: " + (lead.country || ""), "Phone: " + (lead.phone || ""),
        "Sector: " + (lead.sector || ""), "Regulators: " + (lead.regulators || ""), "Interested in: " + row[COL["Interested in"] - 1],
        "Page: " + (d.page || ""), files ? "Replay files: " + files : "", "", "Questions:", (lead.questions || []).join("\n"), "", "Chat so far:", d.transcript || "",
        "", "All leads: " + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
      ].join("\n"),
    });
    return out({ ok: true });
  } catch (err) {
    console.error(err);
    return out({ ok: false });
  } finally {
    lock.releaseLock();
  }
}

function sheet() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TAB);
  if (sh) return sh;
  setupQuiet();
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TAB);
}

function setupQuiet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.insertSheet(TAB, 0);
  sh.getRange(1, 1, 1, HEAD.length).setValues([HEAD]).setFontWeight("bold");
  sh.setFrozenRows(1);
}

// Replay files stay private in the owner's Google Drive.
function folderNamed(name) {
  const it = DriveApp.getFoldersByName(name);
  return it.hasNext() ? it.next() : DriveApp.createFolder(name);
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
