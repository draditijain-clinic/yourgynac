# 🩺 Dr. Aditi Jain – Women’s Clinic & Booking Portal

A premium, medical-grade online booking and clinic administration platform customized for **Dr. Aditi Jain** (Consultant Obstetrician & Gynaecologist, Tilak Nagar, Jaipur, Rajasthan). The system provides a seamless, mobile-optimized booking experience for patients and an intuitive, real-time schedule coordinator panel for clinic administrators.

---

## 🛠️ Technology Stack & Badges

| Category | Technologies Used | Badges |
| :--- | :--- | :--- |
| **Frontend Core** | React 19, Vite 8 | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) |
| **Analytics & SEO** | Vercel Analytics, React Helmet | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |
| **Languages** | JavaScript (ES6+), HTML5, CSS3 | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) |
| **Backend & Database** | Google Apps Script, Google Sheets | ![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white) ![Google Sheets](https://img.shields.io/badge/Google%20Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white) |
| **Icons & Motion** | Lucide React, Framer Motion | ![Lucide](https://img.shields.io/badge/Lucide-F87171?style=for-the-badge&logo=lucide&logoColor=white) |

---

## 🛡️ Key Features

### 👩‍⚕️ Patient Web Portal
* **Step-by-Step Booking Wizard**: 4-step intake form for date selection, patient details, symptoms, and consent.
* **Sticky Mobile CTA Conversion Bar**: Bottom navigation bar with quick appointment booking actions.
* **Local & GEO Search Optimized**: Embedded Google Maps location to Agarwal Clinic in Jaipur with schema metadata.
* **Health Education Library**: Video guides with question-based AI search summaries and physician attribution.

### 📋 Clinic Coordinator Admin Panel
* **Real-time Day Timeline**: Interactive timeline tracking meetings by appointment time.
* **Status Badging**: `LIVE / NOW`, `NEXT UP`, `COMPLETED`, and `UPCOMING` indicators.
* **Quick Delays & Auto Google Meet**: Delay tools and automated Google Meet link generation.
* **Telegram & Email Alerts**: Real-time notification hooks for new booking requests.

---

## 🚀 Setup & Local Execution

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
4. Run local development server:
   ```bash
   npm run dev
   ```
5. Build production bundle:
   ```bash
   npm run build
   ```

---

## 👨‍💻 Developer

Developed and maintained by **Tushar Jain**:
- **GitHub**: [tusharjain-19](https://github.com/tusharjain-19)
- **Portfolio**: [tusharjain.in](https://tusharjain.in)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
