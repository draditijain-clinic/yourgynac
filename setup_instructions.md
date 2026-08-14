# Google Sheets Database & Apps Script Setup Manual

## Pre-Requisites
1. A Google Account (draditijain@gmail.com recommended — this becomes the Calendar owner)
2. Google Calendar access under that account
3. This `script.txt` file from the project directory

---

## Step 1: Open the Google Spreadsheet

The clinic's spreadsheet is already created at:

**https://docs.google.com/spreadsheets/d/1pwpyiAa6ShKAITkq85gLlqQ825tqK-8fj2sYBIttJNY/edit**

Open it while logged into the clinic Google account.

---

## Step 2: Open Apps Script Editor

Inside the spreadsheet:

**Extensions → Apps Script**

Clear any existing code in the editor. You will paste the entire `script.txt` contents here.

---

## Step 3: Paste the Backend Code

1. Open [script.txt](file:///d:/BOOK%20MY%20Slot/book%20my%20clinic/script.txt) from this project.
2. Select all content (Ctrl+A) and copy it.
3. In the Apps Script editor, paste into `Code.gs`.
4. Click the **Save** icon (floppy disk).

---

## Step 4: Enable Google Calendar Advanced API

The backend uses the Calendar Advanced Service to generate Google Meet conference links.

1. In the Apps Script left panel, click **Services** (the + icon).
2. Select **Google Calendar API**.
3. Keep the identifier as `Calendar`.
4. Click **Add**.

---

## Step 5: Set Script Properties (Secrets)

Go to **Project Settings** (gear icon) → **Script Properties** → **Add Property**.

Add these three properties:

| Property          | Value                                          |
|-------------------|------------------------------------------------|
| `ADMIN_PIN`       | Your chosen 6-digit PIN (e.g. `123456`)        |
| `CALENDAR_ID`     | `draditijain@gmail.com` (or your Calendar ID)  |
| `SPREADSHEET_ID`  | `1pwpyiAa6ShKAITkq85gLlqQ825tqK-8fj2sYBIttJNY` |

> ⚠️ Never share these values publicly or put them in the frontend JavaScript.

---

## Step 6: Run setupDatabase()

1. In the Apps Script toolbar, select `setupDatabase` from the function dropdown.
2. Click **Run**.
3. **Authorize** all requested permissions when prompted (Gmail, Calendar, Sheets).

This will automatically create all 17 required sheets:

| Sheet | Purpose |
|-------|---------|
| `AUTH` | Authentication config |
| `ADMINS` | Admin users |
| `BOOKINGS` | Operational appointment records |
| `BOOKING_HISTORY` | Permanent audit trail (append-only) |
| `AVAILABILITY` | Weekly schedule (Mon–Sat 5:00 PM–8:00 PM default) |
| `SPECIAL_AVAILABILITY` | Date-specific overrides |
| `HOLIDAYS` | Clinic closure dates |
| `SERVICES` | 10 default services |
| `SETTINGS` | Clinic configuration key-value |
| `MESSAGE_TEMPLATES` | WhatsApp message templates |
| `EMAIL_LOG` | All email send history |
| `MESSAGE_LOG` | WhatsApp message log |
| `ADMIN_LOG` | Admin action audit log |
| `REMINDERS` | Reminder send tracking |
| `HEALTH_LIBRARY` | Instagram Reels library |
| `PATIENTS` | Patient directory |
| `SYSTEM_LOG` | Technical error log |

---

## Step 7: Run setupTriggers()

Select `setupTriggers` from the function dropdown and click **Run**.

This creates:
- A **30-minute recurring trigger** for `processReminders` (sends 24h and 2h appointment reminders)
- A **daily trigger** for `dailyHealthCheck` (runs at 7 AM)

> The system checks for existing triggers before creating new ones — safe to run multiple times.

---

## Step 8: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon → Select **Web app**
3. Configure:
   - **Description**: `Clinic Booking Portal Web API`
   - **Execute as**: `Me (draditijain@gmail.com)`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. Authorize again if prompted
6. Copy the **Web App URL** — looks like: `https://script.google.com/macros/s/AKfycb.../exec`

---

## Step 9: Update Frontend Configuration

Open [src/config.js](file:///d:/BOOK%20MY%20Slot/book%20my%20clinic/src/config.js) and update:

```javascript
SCRIPT_URL: 'PASTE_YOUR_WEB_APP_URL_HERE',
```

---

## Step 10: Run Test Functions (Recommended)

Run these in the Apps Script editor to verify setup:

| Function | Tests |
|----------|-------|
| `testEmail()` | Sends a test branded email to your own address |
| `testCalendar()` | Confirms Calendar is accessible |
| `testMeet()` | Creates a test Calendar event with Meet link |
| `testBookingFlow()` | Creates a PENDING test booking |
| `testFirstEmptyRow()` | Verifies row-reuse logic |
| `testDuplicateDetection()` | Confirms duplicate prevention |
| `systemHealthCheck()` | Full system status report |

---

## Step 11: End-to-End Verification

1. **Public Booking**: Submit a booking from the website → check BOOKINGS sheet shows PENDING row
2. **Branded Email**: Patient receives the "We've received your request" email
3. **Admin Accept**: Log into `/admin` → Accept the request → CONFIRMED status
4. **Calendar Event**: Check Google Calendar — a new event appears
5. **Meet Link**: Online consultations show a valid `meet.google.com` URL
6. **Confirmation Email**: Patient receives branded confirmation email
7. **WhatsApp Link**: Admin panel generates a prefilled `wa.me` link
8. **Cancellation**: Use the cancel link from the email → CANCELLED status, Calendar event deleted
9. **Holiday Block**: Add a holiday → try to book on that date → CLINIC_CLOSED error
10. **Row Reuse**: Clear a row in BOOKINGS manually → submit a new booking → new booking fills the cleared row

---

## Important Architecture Rules

- **BOOKING_HISTORY, EMAIL_LOG, ADMIN_LOG, SYSTEM_LOG** are append-only. Never delete rows.
- **BOOKINGS** sheet rows are **reused** (first empty row from top). Do NOT use physical row deletion — just clear the contents.
- **WhatsApp messages** are `PREPARED` status. The doctor manually presses Send in WhatsApp. The system never marks them as `SENT`.
- **Google Meet links** require the Calendar Advanced API to be enabled (Step 4). If disabled, `CONFIRMATION_FAILED` status is set and the admin can retry.
- **Secrets** (PIN, Calendar ID) live in PropertiesService only — never in the frontend or visible in any sheet cell.

---

## Required Google Permissions

When you authorize the Apps Script, these permissions are required:

- `https://www.googleapis.com/auth/spreadsheets` — Read/write Google Sheets
- `https://www.googleapis.com/auth/calendar` — Create/delete Calendar events & Meet links
- `https://www.googleapis.com/auth/gmail.send` — Send branded HTML emails
- `https://www.googleapis.com/auth/script.external_request` — (if external APIs used)
- `https://www.googleapis.com/auth/script.scriptapp` — Create time-based triggers

---

## Booking ID Format

All booking IDs follow the format: `AJ-YYYY-XXXXXX`

Example: `AJ-2026-8F29K4`

- Non-sequential (does not reveal booking volume)
- Never reused

---

## Contact

- **Clinic**: Agarwal Clinic, Basement C, 99 Shivaji Marg, Tilak Nagar, Jaipur 302004
- **Doctor**: Dr. Aditi Jain, MBBS, MS OBGY
- **Phone/WhatsApp**: +91 72968 97975
- **Instagram**: [@draditi_explains_women](https://www.instagram.com/draditi_explains_women/)
