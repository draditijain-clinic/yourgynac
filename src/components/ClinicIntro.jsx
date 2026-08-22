import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ClinicIntro({ setPage }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="clinic-intro-section">
      <div className="container intro-grid">
        <div className="intro-visual fade-in-up">
          <div className="visual-frame">
            <motion.div style={{ y, width: '100%', height: '100%' }}>
              <img src="/images/pic.png" alt="Agarwal Clinic Facility" />
            </motion.div>
            <div className="accent-box"></div>
          </div>
        </div>
        
        <div className="intro-content slide-in-right">
          <span className="eyebrow">PATIENT-FIRST WOMEN'S CARE</span>
          <h2>A Modern Approach to Women's Healthcare</h2>
          <p className="intro-text">
            Led by <strong>Dr. Aditi Jain</strong> (Assistant Professor, Infertility Specialist & Gynae Laparoscopic Surgeon with 6+ years clinical experience), our clinic provides compassionate, evidence-based care in a private, supportive environment. Whether visiting for fertility guidance, prenatal care, PCOS management, or laparoscopic procedures, you receive complete individual focus. Recognised as one of the <strong>best gynaecologist in Jaipur</strong> and a trusted <strong>gynac doctor in Jaipur</strong>, Dr. Aditi ensures every patient receives thorough diagnostics, clear explanations, and a personalised treatment approach tailored to their unique health needs.
          </p>
          
          <ul className="intro-highlights">
            <li>Specialized Infertility & Laparoscopic Surgery Expertise</li>
            <li>Academic Excellence (Assistant Professor @ BST Medical College)</li>
            <li>Fellowship-trained in Laparoscopy & Diagnostic Ultrasonography</li>
            <li>Comfortable, completely private consultation environment</li>
          </ul>

          <button className="btn btn-outline" onClick={() => setPage('about')} style={{ marginTop: '20px' }}>
            Learn More About Dr. Aditi Jain <ArrowRight size={14} style={{ marginLeft: '6px' }} />
          </button>
        </div>
      </div>

      <style>{`
        .clinic-intro-section {
          padding: 100px 0;
          background-color: var(--white);
          border-bottom: 1px solid #f1ece1;
        }

        .intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: center;
        }

        .intro-visual {
          position: relative;
        }

        .visual-frame {
          position: relative;
          z-index: 2;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .visual-frame img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .visual-frame:hover img {
          transform: scale(1.03);
        }

        .accent-box {
          position: absolute;
          bottom: -20px;
          left: -20px;
          width: 60%;
          height: 60%;
          background-color: var(--primary-light);
          z-index: -1;
          border-radius: var(--border-radius);
        }

        .intro-content {
          text-align: left;
        }

        .eyebrow {
          font-size: 0.8rem;
          color: var(--accent-color);
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: block;
        }

        .intro-content h2 {
          font-family: var(--font-serif);
          font-size: 2.8rem;
          color: var(--primary-color);
          line-height: 1.2;
          margin-bottom: 24px;
        }

        .intro-text {
          font-size: 1.05rem;
          color: var(--text-light);
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .intro-highlights {
          list-style: none;
          padding: 0;
          margin-bottom: 35px;
        }

        .intro-highlights li {
          position: relative;
          padding-left: 25px;
          margin-bottom: 15px;
          font-size: 0.95rem;
          color: var(--text-color);
          font-weight: 500;
        }

        .intro-highlights li::before {
          content: "\\2713";
          position: absolute;
          left: 0;
          color: var(--accent-color);
          font-weight: bold;
        }

        @media (max-width: 992px) {
          .intro-grid {
            gap: 40px;
          }
          .intro-content h2 {
            font-size: 2.4rem;
          }
        }

        @media (max-width: 768px) {
          .clinic-intro-section {
            padding: 70px 0;
          }
          .intro-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .accent-box {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
