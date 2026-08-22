import React from 'react';
import { Calendar, Video, ExternalLink, MapPin } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { API_CONFIG } from '../config';

export default function Hero({ setPage }) {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Viral Reel Top Badge */}
          <a 
            href="#/health-library/pregnancy-breakfast" 
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#/health-library/pregnancy-breakfast';
              setPage('library');
            }} 
            className="viral-reel-badge"
          >
            <span className="badge-tag">VIRAL REEL</span>
            <span className="badge-text" style={{ display: 'inline-flex', alignItems: 'center' }}>
              1M+ Views: Watch Dr. Aditi's Viral Video <ExternalLink size={12} style={{ marginLeft: '4px' }} />
            </span>
          </a>
          
          <span className="hero-eyebrow">DR. ADITI JAIN · ASSISTANT PROFESSOR · GYNAECOLOGIST IN JAIPUR</span>
          
          <h1 style={{ minHeight: '120px' }}>
            Women's Health, Without the Awkwardness.
          </h1>

          <p className="hero-subtext">
            Expert care from Dr. Aditi Jain (Assistant Professor, MBBS & MS OBGY SMS Medical College Jaipur), a trusted <strong>gynaecologist in Jaipur</strong> and <strong>gynae doctor in Tilak Nagar</strong>. Recognised as one of the <strong>best gynaecologist in Jaipur</strong> and a leading <strong>best gynac in Jaipur</strong>, she specializes as an <strong>infertility specialist</strong>, <strong>pregnancy doctor</strong>, <strong>PCOS specialist</strong>, and <strong>gynae laparoscopic surgeon</strong>. Book your consultation with the <strong>top gynecologist doctor in Jaipur</strong> today.
          </p>
          <div className="hero-actions">
            <button 
              className="btn btn-primary" 
              onClick={() => setPage('appointment')}
            >
              <Calendar size={16} /> BOOK A CONSULTATION
            </button>
            <a 
              href={`https://wa.me/${API_CONFIG.WHATSAPP}?text=Hello%20Dr.%20Aditi%20Jain,%20I%20would%20like%20to%20inquire%20about%20a%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline" 
            >
              <Video size={16} /> WHATSAPP THE CLINIC
            </a>
          </div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="visual-frame">
            <div className="frame-border"></div>
            <div className="image-wrapper">
              <img src="/images/p1.png" alt="Dr. Aditi Jain portrait - Assistant Professor Gynaecologist in Jaipur" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust & Location Banner */}
      <div className="location-trust-banner" style={{ background: '#f5eef0', borderTop: '1px solid #e9dede', borderBottom: '1px solid #e9dede', padding: '12px 0', textAlign: 'center', fontSize: '0.9rem', color: 'var(--primary-dark)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <MapPin size={16} color="var(--primary-color)" /> <strong>Consult Dr. Aditi Jain at Agarwal Clinic, Raja Park (Tilak Nagar), Jaipur • Assistant Professor at BST Medical College Achrol</strong>
        </div>
      </div>

      {/* Trust Strip Container */}
      <div className="trust-strip">
        <div className="container trust-grid">
          <div className="trust-item">
            <span className="trust-label">DESIGNATION</span>
            <span className="trust-value">Assistant Professor (OBGY)</span>
          </div>
          <div className="trust-item">
            <span className="trust-label">QUALIFICATIONS</span>
            <span className="trust-value">MBBS · MS OBGY</span>
          </div>
          <div className="trust-item">
            <span className="trust-label">SPECIALITY</span>
            <span className="trust-value">Infertility & Laparoscopy Surgeon</span>
          </div>
          <div className="trust-item">
            <span className="trust-label">EXPERIENCE</span>
            <span className="trust-value">6+ Years Post-MBBS Exp.</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 80px 0 0 0;
          background-color: var(--bg-color);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          align-items: center;
          gap: 60px;
          padding-bottom: 80px;
          text-align: left;
        }

        .hero-eyebrow {
          font-size: 0.85rem;
          color: var(--accent-color);
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          display: block;
          margin-bottom: 15px;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          line-height: 1.15;
          margin-bottom: 24px;
          font-family: var(--font-serif);
          color: var(--primary-color);
        }

        .hero-subtext {
          font-size: 1.1rem;
          color: var(--text-light);
          margin-bottom: 35px;
          max-width: 520px;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* Editorial Image Treatment */
        .hero-visual {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .visual-frame {
          position: relative;
          width: 100%;
          max-width: 380px;
          padding: 15px;
        }

        .frame-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 90%;
          height: 90%;
          border: 1px solid var(--accent-color);
          border-radius: var(--border-radius);
          z-index: 1;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          background-color: var(--white);
          z-index: 2;
          transform: translate(15px, 15px);
          transition: var(--transition-smooth);
        }

        .image-wrapper:hover {
          transform: translate(8px, 8px);
        }

        .image-wrapper img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        /* Trust Strip below hero */
        .trust-strip {
          background-color: var(--white);
          border-top: 1px solid #f1ece1;
          border-bottom: 1px solid #f1ece1;
          padding: 30px 0;
          width: 100%;
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          text-align: left;
        }

        .trust-item {
          display: flex;
          flex-direction: column;
        }

        .trust-label {
          font-size: 0.75rem;
          color: var(--accent-color);
          font-weight: 600;
          letter-spacing: 2px;
          margin-bottom: 5px;
        }

        .trust-value {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-color);
        }

        /* Viral Reel Top Badge styles */
        .viral-reel-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, rgba(253, 252, 248, 0.7) 0%, rgba(245, 227, 230, 0.4) 100%);
          border: 1px solid rgba(92, 29, 36, 0.12);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 5px 16px 5px 6px;
          border-radius: 40px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-color);
          text-decoration: none;
          margin-bottom: 24px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(92, 29, 36, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.6);
          width: fit-content;
        }
        .viral-reel-badge:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 20px rgba(92, 29, 36, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
          border-color: rgba(92, 29, 36, 0.35);
          background: linear-gradient(135deg, rgba(253, 252, 248, 0.9) 0%, rgba(245, 227, 230, 0.6) 100%);
        }
        .badge-tag {
          background: linear-gradient(135deg, var(--primary-color) 0%, #802c35 100%);
          color: var(--white);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          box-shadow: 0 2px 6px rgba(92, 29, 36, 0.2);
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
        }
        .badge-text {
          font-size: 0.8rem;
          color: var(--primary-dark);
        }

        /* Floating Reel Card styles */
        .viral-reel-card {
          position: absolute;
          bottom: -20px;
          right: -30px;
          background: #ffffff;
          border: 1px solid #f1ece1;
          box-shadow: 0 15px 30px rgba(92, 29, 36, 0.1);
          border-radius: var(--border-radius);
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          max-width: 280px;
          z-index: 10;
          transition: var(--transition-smooth);
        }
        .viral-reel-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(92, 29, 36, 0.15);
          border-color: var(--primary-color);
        }
        .play-icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(92, 29, 36, 0.3);
        }
        .play-triangle {
          width: 0;
          height: 0;
          border-top: 5px solid transparent;
          border-left: 9px solid #ffffff;
          border-bottom: 5px solid transparent;
          margin-left: 2px;
        }
        .reel-card-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }
        .reel-tag {
          font-size: 0.62rem;
          color: var(--accent-color);
          font-weight: 700;
          letter-spacing: 0.8px;
        }
        .reel-title {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-color);
          margin: 0;
          line-height: 1.3;
        }

        @media (max-width: 992px) {
          .hero-content h1 {
            font-size: 2.8rem;
          }
          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
          }
          .viral-reel-card {
            right: 0px;
            bottom: -10px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 40px;
          }
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 50px;
            padding-bottom: 50px;
          }
          .hero-subtext {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
            align-items: center;
            gap: 12px;
          }
          .hero-actions .btn {
            width: 100%;
            max-width: 320px;
            display: flex;
            justify-content: center;
          }
          .viral-reel-badge {
            margin: 0 auto 20px auto;
          }
          .visual-frame {
            max-width: 320px;
          }
          .viral-reel-card {
            position: relative;
            bottom: auto;
            right: auto;
            margin: 30px auto 0 auto;
            box-shadow: 0 10px 25px rgba(92, 29, 36, 0.08);
          }
        }
      `}</style>
    </section>
  );
}
