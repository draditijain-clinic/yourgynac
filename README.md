# 🩺 Dr. Aditi Jain – Women’s Clinic & Booking Portal

A premium, medical-grade online booking and clinic administration platform customized for **Dr. Aditi Jain** (Consultant Obstetrician & Gynaecologist, Tilak Nagar, Jaipur, Rajasthan). The system provides a seamless, mobile-optimized booking experience for patients and an intuitive, real-time schedule coordinator panel for clinic administrators.

---

## 🛠️ Technology Stack & Brand Logos

The application is built using modern, lightweight, and ultra-fast technologies:

| Category | Technologies Used | Badges |
| :--- | :--- | :--- |
| **Frontend Core** | React 18, Vite | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) |
| **Languages** | JavaScript (ES6+), HTML5, CSS3 | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) |
| **Backend & Database** | Google Apps Script, Google Sheets | ![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white) ![Google Sheets](https://img.shields.io/badge/Google%20Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white) |
| **Messaging & APIs** | Telegram Bot API, WhatsApp Web | ![Telegram Bot](https://img.shields.io/badge/Telegram%20Bot-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white) ![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white) |
| **Asset Icons** | Lucide React | ![Lucide](https://img.shields.io/badge/Lucide-F87171?style=for-the-badge&logo=lucide&logoColor=white) |

---

## 🛡️ Security & Performance Standards

This project has been engineered following strict security and data protection patterns:

1. **Secrets Decoupling**: Decouples Apps Script endpoints and backend webhook credentials using a secure, local `.env` environment variables system, preventing credentials leaks on GitHub.
2. **Strict Repository Exclusions**: Node modules, build artifacts (`/dist`, `/build`), and the local `.env` file are explicitly excluded in `.gitignore`.
3. **Concurrency Control (LockService)**: The Google Apps Script backend uses the `LockService` API. This prevents booking duplicates and race conditions if multiple patients submit appointments at the exact same millisecond.
4. **Cache-Buster GET Interceptors**: All fetch requests append a unique timestamp token (`_t=${Date.now()}`) to prevent browsers and proxies from loading stale database caches.
5. **No Public Admin Links**: The Coordinator Portal is completely isolated from search engine crawlers and patient menus. It is accessible only via direct pathname entry (`/admin`).

---

## ✨ Features Overview

### 👩‍⚕️ Patient Web Portal
*   **Step-by-Step Booking Wizard**: A clean 4-step intake form collecting patient dates, demographics, symptoms/reasons, and consent.
*   **Sticky Mobile CTA Conversion Bar**: Locks a "Call Clinic" and "Book Appointment" navigation bar to the bottom of all mobile screens for maximum patient conversion.
*   **Interactive Maps & Directions**: Features a custom Google Maps card with a location pin to Agarwal Clinic in Jaipur and a click-to-get-directions route overlay.
*   **Native 9:16 Video Reels Player**: Plays clinic reels directly inside the browser using vertical aspect-ratio players, avoiding the need to redirect patients to Instagram.
*   **Amber Viral View Badge**: Highlights viral educational reels with a bright amber pill badge showing real view stats.

### 📋 Clinic Coordinator Admin Panel
*   **Chronological Day Timeline**: Interactive timeline sorting meetings in order of time.
*   **Dynamic Tagging & Live Status Indicators**:
    *   `LIVE / NOW` (Pulsing green indicator dot + time flash)
    *   `NEXT UP` (Pulsing blue highlight border)
    *   `COMPLETED` (Muted gray status with check icon)
    *   `UPCOMING` (Future status badge)
*   **One-click Quick Delays**: Postpones appointments by `+10m`, `+15m`, or `+30m` and instantly opens WhatsApp pre-composed notifications.
*   **WhatsApp Template Composer**: Features customizable notification scripts with an **Auto Google Meet Link Generator**.
*   **Real-time Telegram Alerts**: Pushes a mobile alert to the clinic coordinator's phone the moment a new booking request is registered.
*   **Health Library Stats Console**: Dedicated dashboard tab allowing the admin to update manual views, likes, toggle draft/published status, and select featured reels.

---

## 🚀 Setup & Local Execution

### 1. Frontend Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/draditijain-clinic/yourgynac.git
   cd yourgynac
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   VITE_SCRIPT_URL=https://script.google.com/macros/s/your-google-apps-script-id/exec
   ```
4. Run the local dev server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

### 2. Backend Apps Script Setup
1. Open Google Sheets and create a spreadsheet.
2. In Google Sheets, go to **Extensions > Apps Script**.
3. Copy the contents of the `apps-script/Code.gs` file into the Apps Script editor.
4. Set up the sheets structure (`BOOKINGS`, `HISTORY`, `HOLIDAYS`, `SETTINGS`, `TEMPLATES`, `AUTH`).
5. Deploy the script as a **Web App**:
   *   Execute as: `Me (your google account)`
   *   Who has access: `Anyone`
6. Copy the Web App URL and paste it into your local `.env` file as `VITE_SCRIPT_URL`.

---

## 👨‍💻 About the Developer

This platform was designed, architected, and fully coded by:

### **Tushar Jain**
*Full Stack Developer & Technical Consultant*
📍 **Jaipur, Rajasthan, India**

*   **Specialization**: High-fidelity React apps, Cloud Database Integrations, Serverless Google Workflows (Apps Script/Sheets), and UI/UX Engineering.
*   **Portfolio & Website**: [tusharjain.in](https://tusharjain.in)
*   **Design Philosophy**: Micro-interactions, harmonious color theories, secure data pipes, and editorial typography.

---
*Created for Dr. Aditi Jain – Women’s Clinic.*
