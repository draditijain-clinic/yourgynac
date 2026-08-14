import React from 'react';
import { CheckCircle2, Calendar, MapPin, Navigation } from 'lucide-react';
import { API_CONFIG } from '../config';

export default function Confirmation({ reservationData, setPage }) {
  const data = reservationData || JSON.parse(sessionStorage.getItem('lastReservation')) || {
    bookingId: '---',
    name: '---',
    date: '---',
    time: '---',
    consultationType: 'Online Video Consultation'
  };

  const handleHomeRedirect = () => {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="confirmation-page-section">
      <div className="container">
        <div className="confirmation-receipt-card fade-in-down">
          <div className="success-icon-badge">
            <CheckCircle2 size={44} color="#2ecc71" />
          </div>
          <h2>Booking Registered</h2>
          <p className="success-subtitle">Your video consultation has been added to our scheduling register.</p>

          <div className="receipt-ref-id">
            Reference ID: #{data.bookingId || data.appointmentId}
          </div>

          <div className="details-list">
            <div className="details-row">
              <span className="details-label">Patient Name</span>
              <span className="details-value">{data.name}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Appointment Date</span>
              <span className="details-value">{data.date}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Consultation Type</span>
              <span className="details-value">{data.consultationType || 'Online Video Consultation'}</span>
            </div>
          </div>

          {data.meetUrl && (
            <div className="google-meet-box">
              <h5>Virtual Consult Link</h5>
              <p>Your secure Google Meet video consult is ready:</p>
              <a href={data.meetUrl} target="_blank" rel="noopener noreferrer" className="meet-btn">
                Launch Google Meet
              </a>
            </div>
          )}

          <div className="action-buttons-box">
            <button onClick={handleHomeRedirect} className="btn btn-primary" style={{ width: '100%' }}>
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .confirmation-page-section {
          padding: 80px 0;
          background-color: var(--bg-color);
        }

        .confirmation-receipt-card {
          max-width: 580px;
          margin: 0 auto;
          background-color: var(--white);
          padding: 50px 40px;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-lg);
          border: 1px solid #f1ece1;
          text-align: center;
        }

        .success-icon-badge {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .confirmation-receipt-card h2 {
          font-family: var(--font-serif);
          font-size: 2.4rem;
          color: var(--primary-color);
          margin-bottom: 8px;
        }

        .success-subtitle {
          font-size: 0.95rem;
          color: var(--text-light);
          margin-bottom: 30px;
        }

        .receipt-ref-id {
          background-color: var(--accent-light);
          padding: 12px 24px;
          border-radius: 12px;
          display: inline-block;
          font-weight: 700;
          font-size: 1.05rem;
          margin-bottom: 30px;
          border: 1px dashed var(--accent-color);
          color: var(--primary-color);
          font-family: monospace;
        }

        .details-list {
          text-align: left;
          background-color: #faf9f6;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #f1ece1;
          margin-bottom: 30px;
        }

        .details-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #f5efeb;
          font-size: 0.95rem;
        }

        .details-row:last-child {
          border-bottom: none;
        }

        .details-label {
          color: var(--text-light);
        }

        .details-value {
          color: var(--text-color);
          font-weight: 500;
        }

        .google-meet-box {
          background-color: #f0f3ef;
          border-radius: 12px;
          padding: 20px;
          text-align: left;
          margin-bottom: 30px;
          border: 1px solid rgba(107, 122, 103, 0.15);
        }

        .google-meet-box h5 {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--accent-color);
          margin-bottom: 5px;
          font-weight: 600;
        }

        .google-meet-box p {
          font-size: 0.85rem;
          color: var(--text-light);
          margin-bottom: 15px;
        }

        .meet-btn {
          display: inline-block;
          background-color: var(--accent-color);
          color: var(--white);
          text-decoration: none;
          padding: 10px 24px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 600;
          transition: var(--transition-smooth);
        }

        .meet-btn:hover {
          background-color: #556252;
        }

        .action-buttons-box {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        @media (max-width: 576px) {
          .confirmation-receipt-card {
            padding: 30px 20px;
          }
          .action-buttons-box {
            flex-direction: column;
            gap: 10px;
          }
          .action-buttons-box button,
          .action-buttons-box a {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
