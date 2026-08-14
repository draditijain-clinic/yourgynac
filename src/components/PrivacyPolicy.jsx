import React from 'react';
import { API_CONFIG } from '../config';

export default function PrivacyPolicy() {
  return (
    <section className="privacy-page-section">
      <div className="container policy-container fade-in-down">
        <h2>Privacy Policy</h2>
        <span className="last-updated">Last Updated: August 2026</span>
        
        <p className="lead-txt">Dr. Aditi Jain – Women’s Clinic is committed to protecting the privacy and security of our patients' personal and medical records. This Privacy Policy explains how we handle your information when you schedule consultations through our online platform.</p>

        <div className="policy-block">
          <h3>1. Information We Collect</h3>
          <p>When booking a consultation, we require specific details to facilitate patient scheduling and care:</p>
          <ul>
            <li>Patient Full Name and Age (for clinical records identification)</li>
            <li>Mobile Phone Number (for coordinator confirmations and schedule verification)</li>
            <li>Email Address (for Google Calendar invites and automated confirmations)</li>
            <li>Consultation Type (Online Video Consultation)</li>
            <li>Optional details, such as previous medical patient status and clinical notes</li>
          </ul>
          <p>We do NOT collect or store highly sensitive medical logs or records on this web server. All scheduled consultation details are recorded in our secure private clinic database backed by Google Sheets.</p>
        </div>

        <div className="policy-block">
          <h3>2. How We Use Your Information</h3>
          <p>Your details are used strictly for clinical coordination and scheduling purposes:</p>
          <ul>
            <li>Verifying schedule slots and generating unique appointment tracking IDs.</li>
            <li>Generating Google Calendar schedules and secure Google Meet video invitation links.</li>
            <li>Sending automated email receipts summarizing booking parameters.</li>
            <li>Enabling coordinator communications via email for slot adjustments.</li>
          </ul>
        </div>

        <div className="policy-block">
          <h3>3. Data Security</h3>
          <p>We implement professional security measures to keep patient information protected:</p>
          <ul>
            <li>Our frontend platform uses HTTPS encryption to protect details in transit.</li>
            <li>All backend operations are routed privately via secure Google Apps Script services.</li>
            <li>The Google Sheet serving as the database is protected behind Google credentials and is never made public.</li>
            <li>No details are shared with third-party marketers or other practitioners without explicit clinical consent.</li>
          </ul>
        </div>

        <div className="policy-block">
          <h3>4. Access and Corrections</h3>
          <p>If you need to update, reschedule, or cancel your scheduled appointment, please refer to your confirmation email or get in touch with the clinic team via email (${API_CONFIG.EMAIL}) using your Reference ID.</p>
        </div>

      </div>

      <style>{`
        .privacy-page-section {
          padding: 80px 0;
          background-color: var(--bg-color);
          text-align: left;
        }

        .policy-container {
          max-width: 800px;
          margin: 0 auto;
          background-color: var(--white);
          padding: 50px 40px;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
          border: 1px solid #f1ece1;
        }

        .policy-container h2 {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 5px;
        }

        .last-updated {
          font-size: 0.85rem;
          color: var(--text-light);
          display: block;
          margin-bottom: 30px;
          font-weight: 500;
        }

        .lead-txt {
          font-size: 1.05rem;
          color: var(--text-color);
          line-height: 1.7;
          margin-bottom: 35px;
        }

        .policy-block {
          margin-bottom: 35px;
        }

        .policy-block h3 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--primary-color);
          margin-bottom: 15px;
          font-weight: 600;
        }

        .policy-block p {
          font-size: 0.95rem;
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 15px;
        }

        .policy-block ul {
          list-style: none;
          padding: 0;
          margin-bottom: 15px;
        }

        .policy-block li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 8px;
          font-size: 0.95rem;
          color: var(--text-light);
        }

        .policy-block li::before {
          content: "•";
          color: var(--accent-color);
          position: absolute;
          left: 0;
          font-size: 1.2rem;
          top: -2px;
        }
      `}</style>
    </section>
  );
}
