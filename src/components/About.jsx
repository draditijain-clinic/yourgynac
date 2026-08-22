import React from 'react';
import { API_CONFIG } from '../config';
import SEO from './SEO';
import { GraduationCap, Stethoscope, Award, Building2, MapPin } from 'lucide-react';

export default function About({ setPage }) {
  return (
    <section className="about-section">
      <SEO 
        title="About Dr. Aditi Jain | Best Gynaecologist in Jaipur | Best Gynac Doctor"
        description="Dr. Aditi Jain is the best gynaecologist in Jaipur and a top-rated gynac doctor with 6+ years experience, MBBS from Jhalawar Medical College and MS OBGY from SMS Medical College, Jaipur. Best gynecologist for Infertility, PCOS, Pregnancy & Gynae Laparoscopic Surgery in Jaipur."
        path="/about"
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Dr. Aditi Jain",
          "jobTitle": "Assistant Professor, Obstetrician & Gynaecologist",
          "worksFor": [
            {
              "@type": "MedicalOrganization",
              "name": "Balveer Singh Tomar (BST) Medical College, Achrol, Jaipur"
            },
            {
              "@type": "MedicalClinic",
              "name": "Agarwal Clinic, Raja Park, Jaipur"
            }
          ],
          "alumniOf": [
            "SMS Medical College, Jaipur",
            "Jhalawar Medical College, Rajasthan"
          ],
          "url": "https://yourgynac.vercel.app/about",
          "image": "https://yourgynac.vercel.app/images/p2.png",
          "knowsAbout": ["Infertility Treatment", "Gynae Laparoscopic Surgery", "Obstetrics & Gynaecology", "Ultrasonography", "High-Risk Pregnancy", "PCOS/PCOD"]
        }}
      />
      <div className="container">
        
        {/* Editorial Profile Header */}
        <div className="profile-header fade-in-down">
          <div className="profile-photo-frame">
            <img src="/images/p2.png" alt="Dr. Aditi Jain Assistant Professor Gynaecologist in Jaipur" />
          </div>
          <div className="profile-intro-details">
            <span className="profile-eyebrow">ASSISTANT PROFESSOR · SMS MEDICAL COLLEGE ALUMNA</span>
            <h2>Meet Dr. Aditi Jain</h2>
            <p className="profile-credentials">MBBS (Jhalawar Medical College) · MS OBGY (SMS Medical College, Jaipur)</p>
            <p className="profile-spec">Assistant Professor (OBGY) | Infertility Specialist & Gynae Laparoscopic Surgeon</p>
            <p className="profile-tagline">Providing private, evidence-based women's healthcare built on clinical experience (6+ years post-MBBS), patient empathy, and surgical precision.</p>
            
            <div className="header-badges-row" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
              <span className="info-badge" style={{ background: '#f5eef0', color: 'var(--primary-color)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <GraduationCap size={15} /> Assistant Professor @ BST Medical College
              </span>
              <span className="info-badge" style={{ background: '#f5eef0', color: 'var(--primary-color)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Stethoscope size={15} /> 6+ Years Post-MBBS Clinical Exp.
              </span>
              <span className="info-badge" style={{ background: '#f5eef0', color: 'var(--primary-color)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Award size={15} /> Laparoscopy & Ultrasound Fellow
              </span>
            </div>

            <button className="btn btn-primary" onClick={() => setPage('appointment')} style={{ marginTop: '22px', alignSelf: 'flex-start' }}>
              BOOK A CONSULTATION
            </button>
          </div>
        </div>

        {/* Editorial Layout Columns */}
        <div className="profile-sections-grid">
          
          <div className="profile-col-left">
            <div className="profile-block">
              <h3>About Dr. Aditi Jain</h3>
              <p>Dr. Aditi Jain is an Assistant Professor of Obstetrics & Gynaecology, Infertility Specialist, and Gynae Laparoscopic Surgeon based in Jaipur with over 6 years of clinical experience post-MBBS. Educated at premier medical institutes including Jhalawar Medical College and SMS Medical College Jaipur, she combines academic excellence with compassionate, patient-first care.</p>
              <p style={{ marginTop: '12px' }}>Recognized as one of the <strong>best gynaecologist in Jaipur</strong> and a leading <strong>best gynac in Jaipur</strong>, Dr. Aditi is widely recommended for her thorough clinical approach, empathetic consultations, and advanced surgical expertise. Patients across Jaipur trust her for comprehensive women's healthcare, from routine gynaecological check-ups and PCOS management to complex laparoscopic procedures and high-risk pregnancy care. Whether you are searching for the <strong>best gynaecologist doctor in Jaipur</strong>, a <strong>top gynecologist in Jaipur</strong>, or a trusted <strong>best gynae doctor in Jaipur</strong>, Dr. Aditi Jain delivers evidence-based, personalised care that puts your health and comfort first.</p>
            </div>

            <div className="profile-block">
              <h3>Qualifications & Fellowships</h3>
              <ul className="details-bullet-list">
                <li><strong>Master of Surgery (MS)</strong> in Obstetrics & Gynaecology | SMS Medical College, Jaipur (2020 Batch)</li>
                <li><strong>Bachelor of Medicine, Bachelor of Surgery (MBBS)</strong> | Jhalawar Medical College, Rajasthan (2013 Batch)</li>
                <li><strong>Fellowship in Laparoscopic Surgery</strong> | Navyam Hospital</li>
                <li><strong>Fellowship in Ultrasonography (Ultrasound)</strong> | Specialized Diagnostic Ultrasound Training</li>
                <li>Registered Medical Practitioner with Rajasthan Medical Council</li>
              </ul>
            </div>

            <div className="profile-block">
              <h3>Career & Hospital Experience</h3>
              <p style={{ marginBottom: '12px' }}>Dr. Aditi has served across top tertiary healthcare centers and hospitals in Jaipur:</p>
              <div className="experience-timeline">
                <table className="info-table" style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f1ece1' }}>
                  <thead>
                    <tr style={{ background: 'var(--primary-light)' }}>
                      <th>Hospital / Institution</th>
                      <th>Role & Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Balveer Singh Tomar (BST) Medical College, Achrol, Jaipur</strong></td>
                      <td>Assistant Professor (OBGY)<br /><small style={{ color: 'var(--accent-color)', fontWeight: 600 }}>Jan 2026 – Present</small></td>
                    </tr>
                    <tr>
                      <td><strong>Zenana Hospital, Chandpole, Jaipur</strong></td>
                      <td>Obstetrics & Gynaecology Practitioner<br /><small style={{ color: '#666' }}>1 Year</small></td>
                    </tr>
                    <tr>
                      <td><strong>Har Sahay Hospital, Jaipur</strong></td>
                      <td>Consultant Gynaecologist<br /><small style={{ color: '#666' }}>7 Months</small></td>
                    </tr>
                    <tr>
                      <td><strong>Cocoon Hospital, Jaipur</strong></td>
                      <td>Consultant Gynaecologist<br /><small style={{ color: '#666' }}>4 Months</small></td>
                    </tr>
                    <tr>
                      <td><strong>Navyam Hospital, Jaipur</strong></td>
                      <td>Fellowship in Laparoscopic Surgery<br /><small style={{ color: '#666' }}>4 Months</small></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="profile-block" style={{ backgroundColor: '#faf6ee', padding: '24px', borderRadius: '12px', border: '1px solid #f1ece1', marginTop: '30px' }}>
              <h3 style={{ color: 'var(--primary-color)', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>Choosing a Gynaecologist in Jaipur: Key Considerations for Patients</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-color)', lineHeight: '1.7', marginBottom: '12px' }}>
                Selecting a trusted <strong>gynaecologist in Jaipur</strong> is one of the most important decisions for a woman's reproductive, prenatal, and hormonal health. Whether seeking a <strong>women's health doctor in Jaipur</strong> for routine care, a <strong>PCOS doctor in Jaipur</strong>, or a specialized <strong>pregnancy doctor in Jaipur</strong>, consider the following clinical benchmarks:
              </p>
              <ul className="details-bullet-list" style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>
                <li><strong>Academic Qualifications & Training:</strong> Look for post-graduate degrees (MS or MD in OBGY) from renowned government medical colleges like SMS Medical College Jaipur, backed by specialized fellowships in laparoscopic surgery and diagnostic ultrasound.</li>
                <li><strong>Clinical Experience & Hospital Background:</strong> Academic faculty roles (such as Assistant Professor) and tertiary hospital experience ensure the doctor handles complex cases and high-risk pregnancies with evidence-based protocols.</li>
                <li><strong>Comprehensive Spectrum of Care:</strong> Ensure the doctor provides holistic care ranging from PCOS/PCOD guidance and period regularity to advanced infertility evaluation and minimally invasive gynae laparoscopy.</li>
                <li><strong>Accessible Location & Setup:</strong> Convenience matters. Having a private setup at <strong>Agarwal Clinic in Tilak Nagar / Raja Park, Jaipur</strong> along with secure online video consultation options makes continuous care seamless.</li>
              </ul>
            </div>

            <div className="profile-block">
              <h3>Approach to Patient Care</h3>
              <p>We prioritize listening above all. A clinical consultation should be a collaborative discussion where medical findings are explained simply, options are evaluated transparently, and decisions are reached together. We strive to provide a safe, respectful, and completely private clinical environment.</p>
            </div>
          </div>

          <div className="profile-col-right">
            <div className="profile-block">
              <h3>Specializations & Areas of Expertise</h3>
              <ul className="details-bullet-list">
                <li><strong>Infertility Solutions:</strong> Pre-conception counseling, follicular monitoring, ovulation induction & fertility evaluation.</li>
                <li><strong>Gynae Laparoscopic Surgery:</strong> Minimally invasive procedures for ovarian cysts, fibroids, endometriosis & diagnostic laparoscopy.</li>
                <li><strong>Ultrasonography:</strong> Advanced pelvic & obstetric diagnostic ultrasound scans.</li>
                <li><strong>High-Risk Obstetrics:</strong> Antenatal care, maternal monitoring & pre-eclampsia management.</li>
                <li><strong>PCOS/PCOD & Hormonal Health:</strong> Evidence-based cycle regulation, metabolic management & lifestyle guidance.</li>
                <li><strong>Preventive Healthcare:</strong> Cervical cancer screening (Pap Smear), HPV guidance & wellness checks.</li>
              </ul>
            </div>

            <div className="profile-block">
              <h3>Practice Setup & Clinical Locations</h3>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #f1ece1', marginBottom: '15px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-color)', marginBottom: '6px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={18} color="var(--primary-color)" /> Academic & Hospital Practice
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-color)', margin: 0 }}>
                  <strong>BST Medical College & Hospital, Achrol, Jaipur</strong><br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Working as Assistant Professor in Department of Obstetrics & Gynaecology.</span>
                </p>
              </div>

              <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #f1ece1' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-color)', marginBottom: '6px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={18} color="var(--primary-color)" /> Private Consultation Setup
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-color)', margin: 0 }}>
                  <strong>Agarwal Clinic</strong><br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Basement C, 99 Shivaji Marg, Tilak Nagar / Raja Park, Jaipur</span><br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: 600 }}>Timings: Mon – Sat (5:00 PM – 8:00 PM)</span>
                </p>
              </div>
            </div>

            <div className="profile-block">
              <h3>At a Glance</h3>
              <ul className="details-bullet-list">
                <li><strong>Designation:</strong> Assistant Professor (OBGY)</li>
                <li><strong>Experience:</strong> 6+ Years Post-MBBS Clinical Experience</li>
                <li><strong>MBBS:</strong> Jhalawar Medical College (2013)</li>
                <li><strong>MS OBGY:</strong> SMS Medical College Jaipur (2020)</li>
                <li><strong>Specialties:</strong> Infertility & Laparoscopic Surgery</li>
                <li><strong>Fellowships:</strong> Laparoscopic Surgery & Ultrasound</li>
                <li><strong>Consultation:</strong> In-person (Agarwal Clinic Raja Park) & Online Video Calls</li>
                <li><strong>Languages:</strong> English, Hindi</li>
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
