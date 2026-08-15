import React from 'react';
import { API_CONFIG } from '../config';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export default function Footer({ setPage }) {
  const currentYear = new Date().getFullYear();

  const handleLink = (e, pageId) => {
    e.preventDefault();
    setPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      {/* Main footer body */}
      <div className="footer-body">
        <div className="container footer-inner">

          {/* Brand column */}
          <div className="f-col f-brand">
            <div className="f-logo-wrap">
              <img src="/images/logos.png" alt="Dr. Aditi Jain Logo" className="f-logo-img" />
              <div className="f-logo-text">
                <span className="f-doc-name">{API_CONFIG.DOCTOR_NAME}</span>
                <span className="f-doc-qual">Assistant Professor | MBBS, MS OBGY</span>
              </div>
            </div>
            <p className="f-desc">
              Assistant Professor (OBGY), Infertility Specialist & Gynae Laparoscopic Surgeon with 6+ years experience. Dedicated to patient-first, evidence-based care.
            </p>
            <div className="f-contact-chips">
              <a href={`tel:${API_CONFIG.PHONE}`} className="f-chip">
                <Phone size={13} /> {API_CONFIG.PHONE}
              </a>
              <a href={`mailto:${API_CONFIG.EMAIL}`} className="f-chip">
                <Mail size={13} /> {API_CONFIG.EMAIL}
              </a>
            </div>
          </div>

          {/* Location column */}
          <div className="f-col">
            <h5 className="f-heading">Clinic</h5>
            <div className="f-address">
              <MapPin size={14} className="f-addr-icon" />
              <p>
                {API_CONFIG.CLINIC_FACILITY}<br />
                Basement C, 99 Shivaji Marg,<br />
                Tilak Nagar, Jaipur,<br />
                Rajasthan 302004
              </p>
            </div>
            <a
              href={API_CONFIG.MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="f-map-link"
            >
              Get Directions <ExternalLink size={12} />
            </a>
          </div>

          {/* Quick Nav column */}
          <div className="f-col">
            <h5 className="f-heading">Quick Links</h5>
            <ul className="f-links">
              <li><a href="#about" onClick={(e) => handleLink(e, 'about')}>About the Doctor</a></li>
              <li><a href="#services" onClick={(e) => handleLink(e, 'services')}>Gynaecology Services</a></li>
              <li><a href="#book" onClick={(e) => handleLink(e, 'book')}>Book Appointment</a></li>
              <li><a href="#library" onClick={(e) => handleLink(e, 'library')}>Health Library</a></li>
              <li><a href="#privacy" onClick={(e) => handleLink(e, 'privacy')}>Privacy Policy</a></li>
              <li><a href="#disclaimer" onClick={(e) => handleLink(e, 'disclaimer')}>Medical Disclaimer</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="footer-sub-wrap">
        <div className="container footer-sub">
          <p className="f-copy">
            &copy; {currentYear} {API_CONFIG.CLINIC_NAME} • Jaipur, Rajasthan, India. All rights reserved.
          </p>
          <p className="f-built">
            Designed &amp; Built by&nbsp;
            <a
              href="https://tusharjain.in"
              target="_blank"
              rel="noopener noreferrer"
              className="f-dev-link"
            >
              Tushar Jain
            </a>
          </p>
        </div>
      </div>

      <style>{`
        /* ── Footer Shell ── */
        footer {
          background: #f7f5f0;
          color: var(--text-color);
          margin-top: auto;
          width: 100%;
          font-family: var(--font-sans);
          border-top: 1px solid #f1ece1;
        }

        /* ── Main Body ── */
        .footer-body {
          padding: 72px 0 56px;
          border-bottom: 1px solid #e8e2d5;
        }

        .footer-inner {
          display: grid;
          grid-template-columns: 1.5fr 1.1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        /* ── Brand Column ── */
        .f-logo-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .f-logo-img {
          height: 72px;
          width: 72px;
          object-fit: contain;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 4px 10px rgba(92, 29, 36, 0.05);
          padding: 4px;
          flex-shrink: 0;
          border: 1.5px solid #f1ece1;
        }

        .f-logo-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .f-doc-name {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-color);
          letter-spacing: 0.2px;
          line-height: 1.2;
        }

        .f-doc-qual {
          font-size: 0.75rem;
          color: var(--text-light);
          letter-spacing: 0.6px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .f-desc {
          font-size: 0.9rem;
          color: var(--text-light);
          line-height: 1.7;
          max-width: 300px;
          margin-bottom: 24px;
        }

        .f-contact-chips {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .f-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-light);
          text-decoration: none;
          transition: color 0.2s;
        }

        .f-chip:hover { color: var(--primary-color); }

        /* ── Column Headings ── */
        .f-heading {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--primary-color);
          letter-spacing: 0.3px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e8e2d5;
        }

        /* ── Address ── */
        .f-address {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          margin-bottom: 14px;
        }

        .f-addr-icon {
          color: var(--primary-color);
          margin-top: 3px;
          flex-shrink: 0;
        }

        .f-address p {
          font-size: 0.9rem;
          color: var(--text-light);
          line-height: 1.75;
          margin: 0;
        }

        .f-map-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-color);
          text-decoration: none;
          transition: all 0.2s;
          border: 1px solid #e8e2d5;
          padding: 6px 14px;
          border-radius: 20px;
          margin-top: 4px;
          background: #ffffff;
        }

        .f-map-link:hover {
          color: var(--white);
          border-color: var(--primary-color);
          background: var(--primary-color);
        }

        /* ── Links List ── */
        .f-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .f-links li a {
          font-size: 0.9rem;
          color: var(--text-light);
          text-decoration: none;
          transition: color 0.2s, padding-left 0.2s;
          display: block;
        }

        .f-links li a:hover {
          color: var(--primary-color);
          padding-left: 4px;
        }

        /* ── Security badge ── */
        .f-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 24px;
          font-size: 0.75rem;
          color: #15803d;
          font-weight: 600;
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          padding: 5px 12px;
          border-radius: 20px;
        }

        .f-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #15803d;
          display: inline-block;
          animation: pulse-badge 2s infinite;
        }

        @keyframes pulse-badge {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* ── Sub-footer ── */
        .footer-sub-wrap {
          padding: 20px 0;
          background: #f1ede4;
        }

        .footer-sub {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        .f-copy {
          font-size: 0.8rem;
          color: var(--text-light);
          margin: 0;
        }

        .f-built {
          font-size: 0.8rem;
          color: var(--text-light);
          margin: 0;
        }

        .f-dev-link {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .f-dev-link:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .footer-inner {
            grid-template-columns: 1.4fr 1fr 1fr;
            gap: 36px;
          }
          .f-brand {
            grid-column: 1 / -1;
          }
          .f-desc { max-width: 100%; }
          .f-contact-chips { flex-direction: row; flex-wrap: wrap; }
        }

        @media (max-width: 768px) {
          .footer-body { padding: 50px 0 40px; }
          .footer-inner {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
          .f-brand { grid-column: 1 / -1; }
          .footer-sub {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
        }

        @media (max-width: 480px) {
          .footer-inner { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
