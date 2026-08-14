import React from 'react';
import { Video, ShieldCheck, Laptop, Calendar } from 'lucide-react';

export default function OnlineConsultation({ setPage }) {
  const steps = [
    {
      num: "01",
      title: "Choose Appointment",
      desc: "Enter the online booking interface and select your preferred consultation date."
    },
    {
      num: "02",
      title: "Patient Details",
      desc: "Fill in the short information form. Your records are saved securely in our sheet register."
    },
    {
      num: "03",
      title: "Receive Confirmation",
      desc: "An automated confirmation mail containing the Google Calendar event details is sent to you instantly."
    },
    {
      num: "04",
      title: "Join Google Meet",
      desc: "At the scheduled time, click the custom Google Meet link to launch your private consultation."
    }
  ];

  return (
    <section className="consult-page-section">
      <div className="container">
        
        {/* Editorial Hero */}
        <div className="consult-hero fade-in-down">
          <div className="consult-hero-content">
            <span className="eyebrow">VIDEO CONSULTATIONS</span>
            <h2>Speak with your doctor from wherever you are</h2>
            <p>We provide secure, private, and convenient telemedicine consultations for follow-ups, initial counseling, and health discussions.</p>
            <button className="btn btn-primary" onClick={() => setPage('appointment')} style={{ marginTop: '20px' }}>
              <Video size={16} /> Book Online Consultation
            </button>
          </div>
          <div className="consult-hero-icon-block">
            <div className="icon-badge">
              <Video size={80} color="var(--primary-color)" strokeWidth={1} />
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="consult-steps-section">
          <div className="section-header" style={{ marginBottom: '50px' }}>
            <span className="tagline">Process</span>
            <h2>Four simple steps</h2>
          </div>
          <div className="steps-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="step-card">
                <span className="step-number">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements & Privacy Grid */}
        <div className="consult-details-grid">
          
          <div className="detail-panel">
            <div className="panel-header">
              <Laptop size={22} color="var(--primary-color)" />
              <h4>Device Requirements</h4>
            </div>
            <ul className="panel-list">
              <li>A modern smartphone, tablet, or laptop computer.</li>
              <li>A stable internet connection (WiFi or 4G LTE/5G).</li>
              <li>A functional camera and microphone enabled in your browser permissions.</li>
              <li>A quiet, well-lit, and private space for the duration of the call.</li>
            </ul>
          </div>

          <div className="detail-panel">
            <div className="panel-header">
              <ShieldCheck size={22} color="var(--primary-color)" />
              <h4>Telehealth Privacy</h4>
            </div>
            <p className="panel-desc">All online consultations are completed using secure Google Meet video channels. The video connection is encrypted end-to-end. We do not record any video or audio consultations, protecting your clinical confidentiality fully.</p>
            <p className="panel-desc" style={{ marginTop: '15px' }}>Clinical documents or prescriptions generated during the call will be emailed to your registered address in password-protected PDF formats.</p>
          </div>

        </div>

      </div>

      <style>{`
        .consult-page-section {
          padding: 80px 0;
          background-color: var(--bg-color);
          text-align: left;
        }

        .consult-hero {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
          background-color: var(--white);
          padding: 60px;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
          border: 1px solid #f1ece1;
          margin-bottom: 80px;
        }

        .consult-hero .eyebrow {
          font-size: 0.8rem;
          color: var(--accent-color);
          font-weight: 600;
          letter-spacing: 2px;
          margin-bottom: 12px;
          display: block;
        }

        .consult-hero h2 {
          font-family: var(--font-serif);
          font-size: 2.8rem;
          color: var(--primary-color);
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .consult-hero p {
          font-size: 1.05rem;
          color: var(--text-light);
          line-height: 1.6;
        }

        .consult-hero-icon-block {
          display: flex;
          justify-content: center;
        }

        .icon-badge {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background-color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(92, 29, 36, 0.05);
        }

        /* Steps cards styling */
        .consult-steps-section {
          margin-bottom: 80px;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 30px;
        }

        .step-card {
          background-color: var(--white);
          padding: 35px 25px;
          border-radius: var(--border-radius);
          border: 1px solid #f1ece1;
          position: relative;
        }

        .step-number {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          color: var(--accent-color);
          font-weight: 600;
          display: block;
          margin-bottom: 15px;
          line-height: 1;
        }

        .step-card h3 {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: var(--primary-color);
          font-weight: 600;
          margin-bottom: 10px;
        }

        .step-card p {
          font-size: 0.9rem;
          color: var(--text-light);
          line-height: 1.6;
        }

        /* Requirements and Privacy Panels */
        .consult-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .detail-panel {
          background-color: var(--white);
          padding: 40px;
          border-radius: var(--border-radius);
          border: 1px solid #f1ece1;
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          border-bottom: 1px solid #f5efeb;
          padding-bottom: 12px;
        }

        .panel-header h4 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--primary-color);
          font-weight: 600;
        }

        .panel-list {
          list-style: none;
          padding: 0;
        }

        .panel-list li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 12px;
          font-size: 0.95rem;
          color: var(--text-light);
          line-height: 1.5;
        }

        .panel-list li::before {
          content: "•";
          color: var(--accent-color);
          position: absolute;
          left: 0;
          font-size: 1.25rem;
          top: -2px;
        }

        .panel-desc {
          font-size: 0.95rem;
          color: var(--text-light);
          line-height: 1.7;
        }

        @media (max-width: 992px) {
          .consult-hero {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 40px;
          }
          .consult-hero-icon-block {
            display: none;
          }
          .consult-details-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>
    </section>
  );
}
