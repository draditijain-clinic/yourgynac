import React from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import { API_CONFIG } from '../../config';

export default function Settings() {
  return (
    <div className="settings-view fade-in-up">
      <div className="view-header">
        <h2>Clinic Settings</h2>
        <button className="btn btn-primary btn-sm">
          <Save size={16} style={{marginRight: '6px'}} /> SAVE SETTINGS
        </button>
      </div>
      
      <div className="settings-grid">
        <div className="settings-card">
          <h3>Doctor Profile</h3>
          <div className="form-group">
            <label>Name</label>
            <input type="text" defaultValue={API_CONFIG.DOCTOR_NAME} />
          </div>
          <div className="form-group">
            <label>Qualifications</label>
            <input type="text" defaultValue={API_CONFIG.QUALIFICATIONS} />
          </div>
          <div className="form-group">
            <label>Specialty</label>
            <input type="text" defaultValue={API_CONFIG.SPECIALTY} />
          </div>
        </div>

        <div className="settings-card">
          <h3>Contact Details</h3>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" defaultValue={API_CONFIG.PHONE} />
          </div>
          <div className="form-group">
            <label>WhatsApp Number</label>
            <input type="text" defaultValue={API_CONFIG.WHATSAPP} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue={API_CONFIG.EMAIL} />
          </div>
        </div>

        <div className="settings-card full-width">
          <h3>Clinic Location</h3>
          <div className="form-group">
            <label>Facility Name</label>
            <input type="text" defaultValue={API_CONFIG.CLINIC_FACILITY} />
          </div>
          <div className="form-group">
            <label>Full Address</label>
            <textarea rows={3} defaultValue={API_CONFIG.CLINIC_ADDRESS} />
          </div>
          <div className="form-group">
            <label>Google Maps URL</label>
            <input type="text" defaultValue={API_CONFIG.MAPS_URL} />
          </div>
        </div>
      </div>

      <style>{`
        .settings-view {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .view-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f1ece1;
          padding-bottom: 15px;
        }

        .view-header h2 { margin: 0; font-family: var(--font-serif); color: var(--primary-color); }

        .settings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .settings-card {
          background-color: #ffffff;
          border-radius: var(--border-radius);
          padding: 30px;
          border: 1px solid #f1ece1;
          box-shadow: var(--shadow-sm);
        }

        .settings-card.full-width {
          grid-column: 1 / -1;
        }

        .settings-card h3 {
          margin: 0 0 20px 0;
          font-family: var(--font-serif);
          color: var(--primary-color);
          font-size: 1.2rem;
          border-bottom: 1px solid #f1ece1;
          padding-bottom: 10px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-color);
        }

        .form-group input, .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.95rem;
          font-family: inherit;
        }

        @media (max-width: 768px) {
          .settings-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
