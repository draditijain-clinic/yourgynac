import React from 'react';
import { MapPin, Phone, MessageSquare, Instagram, Mail, Calendar, Navigation, Clock } from 'lucide-react';
import { API_CONFIG } from '../config';
import SEO from './SEO';

export default function Contact({ setPage }) {
  return (
    <section className="contact-page-section">
      <SEO 
        title="Contact Dr. Aditi Jain | Clinic Location & Appointment Booking"
        description={`Book an appointment with Dr. Aditi Jain at ${API_CONFIG.CLINIC_FACILITY}, Jaipur. View our location, contact details, and clinic timings.`}
      />
      <div className="container contact-grid fade-in-down">
        
        {/* Contact info details */}
        <div className="contact-info-panel">
          <span className="eyebrow">GET IN TOUCH</span>
          <h2>Clinic Location & Timings</h2>
          <p className="contact-desc">Please feel free to connect with our coordinator via email or Instagram. Walk-ins are accepted during slot timings, but online appointments are prioritized.</p>

          <div className="info-list">
            
            <div className="info-item">
              <div className="icon-box">
                <MapPin size={18} color="var(--primary-color)" />
              </div>
              <div>
                <h5>Clinic Address</h5>
                <p>
                  <strong>{API_CONFIG.CLINIC_FACILITY}</strong><br />
                  {API_CONFIG.CLINIC_ADDRESS}
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box">
                <Clock size={18} color="var(--primary-color)" />
              </div>
              <div>
                <h5>Consultation Timings</h5>
                <p>{API_CONFIG.TIMINGS}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box">
                <Phone size={18} color="var(--primary-color)" />
              </div>
              <div>
                <h5>Phone Contact</h5>
                <p>
                  <a href={`tel:${API_CONFIG.PHONE.replace(/\s+/g, '')}`} style={{ color: 'var(--text-color)', fontWeight: 500 }}>
                    {API_CONFIG.PHONE}
                  </a>
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box">
                <Mail size={18} color="var(--primary-color)" />
              </div>
              <div>
                <h5>Email Contact</h5>
                <p>
                  <a href={`mailto:${API_CONFIG.EMAIL}`} style={{ color: 'var(--text-color)', fontWeight: 500 }}>
                    {API_CONFIG.EMAIL}
                  </a>
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box">
                <Instagram size={18} color="var(--primary-color)" />
              </div>
              <div>
                <h5>Instagram Education</h5>
                <p>
                  <a href={API_CONFIG.INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-color)', fontWeight: 500 }}>
                    {API_CONFIG.INSTAGRAM_HANDLE}
                  </a>
                </p>
              </div>
            </div>

          </div>

          <div className="contact-actions">
            <button className="btn btn-primary" onClick={() => setPage('appointment')}>
              <Calendar size={16} /> Book Appointment
            </button>
            <a href={API_CONFIG.MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <Navigation size={16} /> Get Directions
            </a>
          </div>
        </div>

        {/* Map panel */}
        <div className="contact-map-panel">
          <div className="map-frame" style={{ position: 'relative' }}>
            <iframe 
              src={API_CONFIG.MAPS_EMBED_URL} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Agarwal Clinic Jaipur Google Map"
            />
            <div className="map-overlay">
              <a 
                href={API_CONFIG.MAPS_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary map-overlay-btn"
              >
                <Navigation size={14} style={{ marginRight: '6px' }} /> View Larger Map / Directions ↗
              </a>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .contact-page-section {
          padding: 80px 0;
          background-color: var(--bg-color);
          text-align: left;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .contact-info-panel {
          display: flex;
          flex-direction: column;
        }

        .contact-info-panel .eyebrow {
          font-size: 0.8rem;
          color: var(--accent-color);
          font-weight: 600;
          letter-spacing: 2px;
          display: block;
          margin-bottom: 12px;
        }

        .contact-info-panel h2 {
          font-family: var(--font-serif);
          font-size: 2.8rem;
          color: var(--primary-color);
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .contact-desc {
          font-size: 1rem;
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 35px;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin-bottom: 35px;
        }

        .info-item {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .icon-box {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-item h5 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 4px;
        }

        .info-item p {
          font-size: 0.95rem;
          color: var(--text-light);
          line-height: 1.5;
        }

        .timing-summary-box {
          background-color: var(--accent-light);
          border-left: 4px solid var(--accent-color);
          padding: 20px 24px;
          border-radius: 12px;
          margin-bottom: 40px;
        }

        .timing-summary-box h5 {
          font-size: 1rem;
          color: var(--accent-color);
          font-weight: 600;
          margin-bottom: 8px;
        }

        .timing-summary-box p {
          font-size: 0.95rem;
          color: var(--text-color);
          font-weight: 500;
        }

        .contact-actions {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        /* Map styling */
        .contact-map-panel {
          height: 100%;
          min-height: 500px;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(92, 29, 36, 0.05);
        }

        .map-frame {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 500px;
        }

        .map-overlay {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .map-overlay-btn {
          box-shadow: 0 4px 12px rgba(92, 29, 36, 0.25);
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          white-space: nowrap;
          display: flex;
          align-items: center;
          padding: 12px 24px;
          border-radius: 30px;
          text-decoration: none;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .contact-map-panel {
            min-height: 400px;
          }
          .map-frame {
            min-height: 400px;
          }
        }
      `}</style>
    </section>
  );
}
