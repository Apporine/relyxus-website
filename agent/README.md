# Vigil, the Relyxus website assistant

Vigil is the Halo in the bottom right corner of every page. Visitors type or
talk to it. It answers from what Relyxus has published, shows real product
screens beside the chat, asks a few qualifying questions, and takes name, work
email and company when someone wants a demo, a replay, a quote or a person.

Everything runs free.

| Part | Where it runs | Cost |
|---|---|---|
| Chat, answers, questions, lead capture | The visitor's browser (`src/scripts/assistant`) | Free |
| Live voice calls | Gemini Live through `api/vigil-token.ts` on Vercel: both sides talk at once, the visitor can interrupt, natural voice | Free tier, or about 2p a minute on the paid tier |
| Backup voice | The browser's own speech recognition and voices, used only if Gemini Live is not set up | Free |
| Saving leads and chats | A Google Sheet, through Google Apps Script (`agent/apps-script`) | Free |
| Email alert for each lead | Apps Script MailApp, to support@relyxus.com | Free, up to 100 a day |
| Answers to questions outside the published facts | Cloudflare Workers AI (`agent/worker`), optional | Free up to 10,000 Neurons a day, roughly 150 questions |
| Booking | A Google Calendar appointment schedule, or any booking link | Free |
| Demo requests and replay files | The same Apps Script: demo requests become rows, replay files go to a private Drive folder | Free |

With nothing set up, Vigil still works: it answers from its built in knowledge
and keeps the conversation in the visitor's browser only.

## Step 0. Live voice (Gemini Live)

This one key powers both Vigil's typed answers and her live voice. Without it, Vigil uses the simple built in backup, which only matches keywords.

How visitors use it, like New Relic's assistant: **Speaker** on and Vigil greets them out loud; **Mic** on and they talk to her live (the mic is off until they switch it on); typing works at any time and she answers by voice while the speaker is on.

1. Go to aistudio.google.com and sign in with the Apporine Google account.
2. Click Get API key, then Create API key. Choose or create a project called `Relyxus website`.
3. Copy the key. It starts with `AIza`. Never put it in the code or send it in chat.
4. In Vercel, open relyxus-website, then Settings, then Environment Variables.
5. Add `GEMINI_API_KEY` with the key, for Production and Preview.
6. Optional: add `VIGIL_CHAT_MODEL` for typed chat (default `gemini-flash-latest`), `VIGIL_VOICE` to change the voice (default `Sulafat`, warm), `VIGIL_LIVE_MODEL` to change the model (default `gemini-3.8-live`; if it is not available on your key, use `gemini-3.1-flash-live-preview`), and `VIGIL_CALL_MINUTES` for the longest call (default 10).
7. Redeploy. Open the site, click Ask Vigil, then Talk live with Vigil, and allow the microphone.

To hear the voices before choosing, open aistudio.google.com, choose Stream, and switch voices in the settings. Good matches for a warm, pleasant assistant: Sulafat (warm), Achird (friendly), Despina (smooth), Aoede (breezy).

**Free or paid tier.** The free tier costs nothing, but Google may use free tier conversations to improve its products. For a website that talks to banks, turn on billing for the project in AI Studio: calls then cost about 2p a minute (audio in $0.005, audio out $0.018 per minute) and are not used for training. Set a monthly budget alert in Google Cloud billing.

**Safety.** The browser never sees the real key. Each call gets a one use key that expires, with Vigil's instructions, tools and voice locked in. Only relyxus.com and the project's Vercel previews can ask for one, at most six calls per visitor every 30 minutes.

**What Vigil knows on calls** is generated from `src/scripts/assistant/knowledge.ts` and `prompt.ts` into `api/_vigil-config.js` on every build (`npm run vigil:config`).

## Step 1. The Google Sheet for leads

1. Sign in to Google with the account that should own the leads.
2. Create a new Google Sheet. Name it `Relyxus Vigil leads`.
3. In the sheet, open Extensions, then Apps Script.
4. Delete the sample code. Paste everything from `agent/apps-script/Code.gs`. Save.
5. Click Deploy, then New deployment.
6. Click the gear next to Select type, choose Web app.
7. Set Description to `Vigil leads`, Execute as to `Me`, Who has access to `Anyone`.
8. Click Deploy. Approve the permissions Google asks for. The script writes to this sheet, sends email as you, and saves replay files into a private Google Drive folder called `Relyxus replays` that only you can open.
9. Copy the Web app URL. It ends in `/exec`.

The first lead creates a `Leads` tab with these columns: Received, Name, Work
email, Company, Sector, Regulators, Interest, Questions, Page, Referrer, Chat.

## Step 2. The booking link (optional)

1. In Google Calendar, click Create, then Appointment schedule.
2. Name it `Relyxus demo`, set 30 minutes and your available hours, save.
3. Open the schedule, click Share, copy the booking page link.

## Step 3. The AI service (optional)

Vigil answers the common questions without it. Add it so Vigil can handle
unusual questions in its own words, still using only the published facts.

1. Create a free Cloudflare account, then open a terminal in `agent/worker`.
2. Run `npm install`.
3. Run `npx wrangler login` and approve in the browser.
4. Run `npx wrangler kv namespace create LIMIT`. Copy the id it prints into `wrangler.toml`, replacing `REPLACE_WITH_YOUR_KV_ID`.
5. Run `npm run deploy`. Copy the address it prints, for example `https://vigil-ai.<your account>.workers.dev`.

The Worker accepts requests only from relyxus.com and www.relyxus.com, and
allows each visitor 20 questions an hour. To test from a Vercel preview, add
the preview address to `ALLOWED_ORIGINS` in `wrangler.toml` and deploy again.

## Step 4. Connect them to the website

1. In Vercel, open the relyxus-website project, then Settings, then Environment Variables.
2. Add `PUBLIC_VIGIL_LEADS_URL` with the Apps Script URL from step 1.
3. Add `PUBLIC_VIGIL_BOOKING_URL` with the booking link from step 2.
4. Add `PUBLIC_VIGIL_AI_URL` with the Worker address from step 3, if you set it up.
5. Redeploy the site.

## Step 5. Check it

1. Open the site, click Ask Vigil, ask `Book a demo`.
2. Give a test name, a work email and a company.
3. A new row appears in the sheet, and support@relyxus.com gets an email.
4. Close the tab. The Chat column fills in for that row.

## How Vigil behaves

- It answers only from `src/scripts/assistant/knowledge.ts`. To change what it says, edit that file.
- When it does not know, it says so and offers a person.
- After a couple of answers it asks which kind of company the visitor is, then which regulators they report to.
- It asks for a work email and asks once for a work address if someone gives a personal one.
- Visitors can say `Not right now` at any point to stop it asking.
- The conversation follows the visitor from page to page, in that browser tab only.
- The consent line under the chat links to the privacy notice. The privacy notice must say that the assistant keeps names, emails and chats to reply to visitors, and for how long.
