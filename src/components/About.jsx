import React from 'react';
import { API_CONFIG } from '../config';
import SEO from './SEO';

export default function About({ setPage }) {
  return (
    <section className="about-section">
      <SEO 
        title="About Dr. Aditi Jain | MBBS, MS OBGY | Jaipur"
        description="Dr. Aditi Jain is a gynaecologist in Jaipur with an MBBS and MS OBGY qualification from SMS Medical College, Jaipur. Her practice focuses on personalised women's healthcare."
        path="/about"
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Dr. Aditi Jain",
          "jobTitle": "Consultant Obstetrician & Gynaecologist",
          "alumniOf": "SMS Medical College, Jaipur",
          "url": "https://yourgynac.vercel.app/about",
          "image": "https://yourgynac.vercel.app/images/p2.png",
          "knowsAbout": ["Gynaecology", "Obstetrics", "High-Risk Pregnancy", "PCOS/PCOD", "Laparoscopic Surgery"]
        }}
      />
      <div className="container">
        
        {/* Editorial Profile Header */}
        <div className="profile-header fade-in-down">
          <div className="profile-photo-frame">
            <img src="/images/p2.png" alt="Dr. Aditi Jain gynaecologist in Jaipur" />
          </div>
          <div className="profile-intro-details">
            <span className="profile-eyebrow">SMS MEDICAL COLLEGE ALUMNA</span>
            <h2>Meet Dr. Aditi Jain</h2>
            <p className="profile-credentials">MBBS · MS OBGY (SMS Medical College, Jaipur)</p>
            <p className="profile-spec">Gynaecologist & Laparoscopic Gynaecological Surgeon</p>
            <p className="profile-tagline">Providing private, patient-centred medical consultations built on clear communication and clinical evidence.</p>
            <button className="btn btn-primary" onClick={() => setPage('appointment')} style={{ marginTop: '20px' }}>
              BOOK A CONSULTATION
            </button>
          </div>
        </div>

        {/* Editorial Layout Columns */}
        <div className="profile-sections-grid">
          
          <div className="profile-col-left">
            <div className="profile-block">
              <h3>About Dr. Aditi Jain</h3>
              <p>Dr. Aditi Jain is a gynaecologist in Jaipur with an MBBS and MS OBGY qualification from SMS Medical College, Jaipur. Her practice focuses on personalised women's healthcare, clear communication and helping patients understand their concerns and treatment options.</p>
            </div>

            <div className="profile-block">
              <h3>Qualifications</h3>
              <ul className="details-bullet-list">
                <li><strong>Master of Surgery (MS)</strong> in Obstetrics & Gynaecology, SMS Medical College, Jaipur</li>
                <li><strong>Bachelor of Medicine, Bachelor of Surgery (MBBS)</strong>, SMS Medical College, Jaipur</li>
                <li>Certified in Advanced Gynaecological Endoscopic Procedures</li>
                <li>Registered Practitioner with Rajasthan Medical Council</li>
              </ul>
            </div>

            <div className="profile-block">
              <h3>Approach to Patient Care</h3>
              <p>We prioritize listening above all. A clinical consultation should be a collaborative discussion where medical findings are explained simply, options are evaluated transparently, and decisions are reached together. We strive to provide a safe, respectful, and completely private clinical environment.</p>
            </div>
          </div>

          <div className="profile-col-right">
            <div className="profile-block">
              <h3>Areas of Care</h3>
              <ul className="details-bullet-list">
                <li>Pre-pregnancy counseling & preconception checks</li>
                <li>High-risk pregnancy management & maternal diagnostics</li>
                <li>Polycystic Ovarian Syndrome (PCOS/PCOD) management</li>
                <li>Hormonal imbalances & menstrual health counseling</li>
                <li>Infertility solutions & ovulation induction</li>
                <li>Preventive women's healthcare & cervical screenings</li>
              </ul>
            </div>

            <div className="profile-block">
              <h3>Clinical Interests</h3>
              <p>Dr. Aditi's key clinical interests include adolescent health guidance, menopause transitioning management, reproductive health education, and evidence-based PCOS correction protocols. She is active in clinical research and educational publishing.</p>
            </div>

            <div className="profile-block">
              <h3>At a Glance</h3>
              <ul className="details-bullet-list">
                <li><strong>Location:</strong> Jaipur, Rajasthan, India</li>
                <li><strong>Clinic:</strong> Basement C, 99 Shivaji Marg, Tilak Nagar, Jaipur</li>
                <li><strong>Consultation:</strong> In-person & Online Video Consultations</li>
                <li><strong>Languages:</strong> English, Hindi</li>
                <li><strong>Specialty:</strong> Obstetrics & Gynaecology</li>
              </ul>
            </div>



          </div>

        </div>

      </div>

      <style>{`
        .about-section {
          padding: 80px 0;
          background-color: var(--bg-color);
          text-align: left;
        }

        .profile-header {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
          padding-bottom: 60px;
          border-bottom: 1px solid #f1ece1;
          margin-bottom: 60px;
        }

        .profile-photo-frame {
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(92, 29, 36, 0.05);
        }

        .profile-photo-frame img {
          width: 100%;
          display: block;
          object-fit: cover;
        }

        .profile-intro-details {
          display: flex;
          flex-direction: column;
        }

        .profile-eyebrow {
          font-size: 0.8rem;
          color: var(--accent-color);
          letter-spacing: 2px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .profile-intro-details h2 {
          font-family: var(--font-serif);
          font-size: 3rem;
          color: var(--primary-color);
          line-height: 1.15;
          margin-bottom: 10px;
        }

        .profile-credentials {
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--primary-color);
          margin-bottom: 5px;
        }

        .profile-spec {
          font-size: 1.05rem;
          color: var(--text-light);
          margin-bottom: 20px;
          font-weight: 500;
        }

        .profile-tagline {
          font-size: 1.1rem;
          color: var(--text-light);
          line-height: 1.6;
        }

        /* Columns layout */
        .profile-sections-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
        }

        .profile-block {
          margin-bottom: 40px;
        }

        .profile-block h3 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--primary-color);
          margin-bottom: 15px;
          border-bottom: 1px solid rgba(92, 29, 36, 0.08);
          padding-bottom: 8px;
        }

        .profile-block p {
          font-size: 1rem;
          color: var(--text-light);
          line-height: 1.7;
        }

        .details-bullet-list {
          list-style: none;
          padding: 0;
        }

        .details-bullet-list li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 10px;
          color: var(--text-light);
          font-size: 0.95rem;
        }

        .details-bullet-list li::before {
          content: "•";
          color: var(--accent-color);
          position: absolute;
          left: 0;
          font-weight: bold;
          font-size: 1.25rem;
          top: -2px;
        }

        /* Experience Info Table */
        .info-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .info-table th {
          font-size: 0.95rem;
          color: var(--primary-color);
          padding: 12px 10px;
          border-bottom: 1px solid #f1ece1;
          font-weight: 600;
          width: 40%;
        }

        .info-table td {
          font-size: 0.95rem;
          color: var(--text-light);
          padding: 12px 10px;
          border-bottom: 1px solid #f1ece1;
        }

        @media (max-width: 992px) {
          .profile-sections-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .profile-header {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }
          .profile-photo-frame {
            max-width: 320px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
