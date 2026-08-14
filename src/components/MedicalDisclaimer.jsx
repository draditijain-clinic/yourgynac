import React from 'react';
import { API_CONFIG } from '../config';

export default function MedicalDisclaimer() {
  return (
    <section className="disclaimer-page-section">
      <div className="container disclaimer-container fade-in-down">
        <h2>Medical Disclaimer</h2>
        <span className="last-updated">Last Updated: August 2026</span>

        <div className="disclaimer-critical-box">
          <p><strong>CRITICAL NOTICE:</strong> THIS PLATFORM AND SCHEDULING PORTAL ARE NOT EQUIPPED TO PROVIDE EMERGENCY MEDICAL SERVICES. IF YOU ARE EXPERIENCING A MEDICAL EMERGENCY (SUCH AS ACTIVE SEVERE BLEEDING, ACUTE LOWER ABDOMINAL PAIN, FLUID LEAKAGE DURING PREGNANCY, OR SUSPECTED LABOR CONTRACTS), PLEASE CALL YOUR LOCAL EMERGENCY SERVICES IMMEDIATELY OR PROCEED TO THE NEAREST HOSPITAL EMERGENCY WARD.</p>
        </div>

        <div className="disclaimer-block">
          <h3>1. Educational Information Only</h3>
          <p>The health library articles, FAQ replies, and service brief guidelines published on this platform represent general educational references. They are not intended as personal medical diagnoses, clinical prescriptions, or treatment guidelines. Reading the materials published here does not establish a doctor-patient relationship.</p>
        </div>

        <div className="disclaimer-block">
          <h3>2. Consultation Scheduling Only</h3>
          <p>The online booking forms and slot options are for scheduling standard medical consultations with Dr. Aditi Jain. A booking reservation is pending confirmation until reviewed by the clinic coordinator. No medical advice will be delivered prior to your confirmed in-person or video consultation.</p>
        </div>

        <div className="disclaimer-block">
          <h3>3. Limitation of Liability</h3>
          <p>Dr. Aditi Jain – Women’s Clinic, its coordinators, and the platform developers are not liable for any actions taken or decisions made based on the educational materials on this website. For any medical symptoms or conditions, always consult with a certified physician or qualified healthcare provider directly.</p>
        </div>

      </div>

      <style>{`
        .disclaimer-page-section {
          padding: 80px 0;
          background-color: var(--bg-color);
          text-align: left;
        }

        .disclaimer-container {
          max-width: 800px;
          margin: 0 auto;
          background-color: var(--white);
          padding: 50px 40px;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
          border: 1px solid #f1ece1;
        }

        .disclaimer-container h2 {
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

        .disclaimer-critical-box {
          background-color: var(--primary-light);
          border-left: 4px solid var(--primary-color);
          padding: 20px 24px;
          border-radius: 12px;
          margin-bottom: 35px;
        }

        .disclaimer-critical-box p {
          font-size: 0.95rem;
          color: var(--primary-color);
          line-height: 1.6;
          font-weight: 600;
        }

        .disclaimer-block {
          margin-bottom: 35px;
        }

        .disclaimer-block h3 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--primary-color);
          margin-bottom: 15px;
          font-weight: 600;
        }

        .disclaimer-block p {
          font-size: 0.95rem;
          color: var(--text-light);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
