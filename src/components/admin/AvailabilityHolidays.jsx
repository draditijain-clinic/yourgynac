import React, { useState } from 'react';
import { Palmtree, Clock, Plus, Trash2, Save } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

export default function AvailabilityHolidays({ activeView }) {
  const [view, setView] = useState(activeView || 'holidays');
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newHoliday, setNewHoliday] = useState({ dateFrom: '', dateTo: '', reason: '' });
  
  const defaultSchedule = {
    Monday: { isOpen: true, start: "17:00", end: "20:00" },
    Tuesday: { isOpen: true, start: "17:00", end: "20:00" },
    Wednesday: { isOpen: true, start: "17:00", end: "20:00" },
    Thursday: { isOpen: true, start: "17:00", end: "20:00" },
    Friday: { isOpen: true, start: "17:00", end: "20:00" },
    Saturday: { isOpen: true, start: "17:00", end: "20:00" },
    Sunday: { isOpen: false, start: "10:00", end: "13:00" }
  };
  
  const [schedule, setSchedule] = useState(defaultSchedule);

  React.useEffect(() => {
    loadHolidays();
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await adminApi.getSettings();
      if (res && res.AVAILABILITY_SCHEDULE) {
        setSchedule(JSON.parse(res.AVAILABILITY_SCHEDULE));
      }
    } catch (err) {
      console.error("Failed to load schedule", err);
    }
  };

  const handleSaveSchedule = async () => {
    setSaving(true);
    try {
      await adminApi.saveSettings({ AVAILABILITY_SCHEDULE: JSON.stringify(schedule) });
      alert("Availability schedule saved successfully!");
    } catch (err) {
      alert("Failed to save schedule: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateDaySchedule = (day, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const loadHolidays = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getHolidays();
      setHolidays(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHoliday = async (e) => {
    e.preventDefault();
    if (!newHoliday.dateFrom) return;
    try {
      const payload = {
        dateFrom: newHoliday.dateFrom,
        dateTo: newHoliday.dateTo || newHoliday.dateFrom,
        reason: newHoliday.reason || 'Clinic Closed'
      };
      await adminApi.addHoliday(payload);
      setNewHoliday({ dateFrom: '', dateTo: '', reason: '' });
      loadHolidays();
    } catch (err) {
      alert("Failed to add holiday: " + err.message);
    }
  };

  const handleDeleteHoliday = async (h) => {
    if (window.confirm(`Are you sure you want to delete the holiday for ${h.dateFrom}?`)) {
      try {
        await adminApi.removeHoliday({ dateFrom: h.dateFrom || h.date });
        loadHolidays();
      } catch (err) {
        alert("Failed to delete holiday: " + err.message);
      }
    }
  };

  return (
    <div className="availability-page fade-in-up">
      <div className="view-tabs">
        <button 
          className={`tab-btn ${view === 'holidays' ? 'active' : ''}`}
          onClick={() => setView('holidays')}
        >
          <Palmtree size={16} /> Holidays & Closures
        </button>
        <button 
          className={`tab-btn ${view === 'availability' ? 'active' : ''}`}
          onClick={() => setView('availability')}
        >
          <Clock size={16} /> Availability Hours
        </button>
      </div>

      <div className="tab-content">
        {view === 'availability' && (
          <div className="availability-card">
            <h3>Standard Weekly Availability</h3>
            <p className="subtext">Configure default operating hours. Slots are automatically generated in 30-minute intervals.</p>
            
            <div className="days-list">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className="day-row">
                  <div className="day-name">{day}</div>
                  <div className="day-status">
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={schedule[day].isOpen} 
                        onChange={(e) => updateDaySchedule(day, 'isOpen', e.target.checked)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className={`day-times ${!schedule[day].isOpen ? 'disabled' : ''}`}>
                    <input 
                      type="time" 
                      value={schedule[day].start} 
                      disabled={!schedule[day].isOpen}
                      onChange={(e) => updateDaySchedule(day, 'start', e.target.value)}
                    />
                    <span>to</span>
                    <input 
                      type="time" 
                      value={schedule[day].end} 
                      disabled={!schedule[day].isOpen}
                      onChange={(e) => updateDaySchedule(day, 'end', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary" style={{marginTop: '20px'}} onClick={handleSaveSchedule} disabled={saving}>
              <Save size={16} style={{marginRight: '6px'}} /> {saving ? 'SAVING...' : 'SAVE AVAILABILITY'}
            </button>
          </div>
        )}

        {view === 'holidays' && (
          <div className="holidays-grid">
            <div className="holidays-card">
              <h3>Upcoming Holidays</h3>
              <p className="subtext">Dates when the clinic is closed for bookings.</p>
              
              {loading ? (
                <p>Loading holidays...</p>
              ) : holidays.length === 0 ? (
                <p style={{ color: 'var(--text-light)' }}>No active holidays listed.</p>
              ) : (
                <ul className="holiday-list">
                  {holidays.map((h, i) => (
                    <li key={i} className="holiday-item">
                      <div className="h-info">
                        <strong>
                          {h.dateFrom === h.dateTo || !h.dateTo 
                            ? new Date(h.dateFrom || h.date).toLocaleDateString()
                            : `${new Date(h.dateFrom).toLocaleDateString()} – ${new Date(h.dateTo).toLocaleDateString()}`}
                        </strong>
                        <span>{h.reason || 'Clinic Closed'}</span>
                      </div>
                      <button className="btn-icon danger" title="Delete Holiday" onClick={() => handleDeleteHoliday(h)}>
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="add-holiday-card">
              <h3>Add New Holiday</h3>
              <form onSubmit={handleAddHoliday} className="holiday-form">
                <div className="form-group">
                  <label>Start Date</label>
                  <input 
                    type="date" 
                    required 
                    value={newHoliday.dateFrom}
                    onChange={e => setNewHoliday({...newHoliday, dateFrom: e.target.value, dateTo: newHoliday.dateTo || e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>End Date (Optional for single day)</label>
                  <input 
                    type="date" 
                    value={newHoliday.dateTo}
                    min={newHoliday.dateFrom}
                    onChange={e => setNewHoliday({...newHoliday, dateTo: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Reason / Description</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Public Holiday, Personal Leave" 
                    required 
                    value={newHoliday.reason}
                    onChange={e => setNewHoliday({...newHoliday, reason: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  <Plus size={16} style={{marginRight: '6px'}} /> ADD HOLIDAY
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .availability-page {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .view-tabs {
          display: flex;
          gap: 15px;
          border-bottom: 2px solid #f1ece1;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          padding: 12px 20px;
          font-weight: 600;
          color: var(--text-light);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          font-size: 0.95rem;
        }

        .tab-btn.active {
          color: var(--primary-color);
          border-bottom-color: var(--accent-color);
        }

        .availability-card, .holidays-card, .add-holiday-card {
          background-color: #ffffff;
          border-radius: var(--border-radius);
          padding: 30px;
          border: 1px solid #f1ece1;
          box-shadow: var(--shadow-sm);
        }

        .availability-card h3, .holidays-card h3, .add-holiday-card h3 {
          margin: 0 0 5px 0;
          font-family: var(--font-serif);
          color: var(--primary-color);
          font-size: 1.4rem;
        }

        .subtext {
          color: var(--text-light);
          font-size: 0.9rem;
          margin-bottom: 25px;
        }

        .days-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 600px;
        }

        .day-row {
          display: grid;
          grid-template-columns: 120px 60px 1fr;
          align-items: center;
          background-color: #fcfcf9;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #f1ece1;
        }

        .day-name {
          font-weight: 600;
          color: var(--text-color);
        }

        .day-times {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .day-times input {
          padding: 8px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
        }

        .day-times.disabled {
          opacity: 0.5;
        }

        .holidays-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 30px;
        }

        .holiday-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .holiday-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border: 1px solid #f1ece1;
          border-radius: 8px;
          background-color: #fcfcf9;
        }

        .h-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .h-info strong {
          color: var(--primary-color);
        }

        .h-info span {
          color: var(--text-light);
          font-size: 0.85rem;
        }

        .btn-icon.danger {
          color: #ef4444;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        .btn-icon.danger:hover {
          background-color: #fee2e2;
          border-radius: 4px;
        }

        .holiday-form .form-group {
          margin-bottom: 15px;
        }

        .holiday-form label {
          display: block;
          margin-bottom: 5px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .holiday-form input {
          width: 100%;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
        }

        /* Toggle switch */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .slider {
          position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
          background-color: #cbd5e1; transition: .4s;
        }
        .slider:before {
          position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 4px;
          background-color: white; transition: .4s;
        }
        input:checked + .slider { background-color: var(--accent-color); }
        input:checked + .slider:before { transform: translateX(20px); }
        .slider.round { border-radius: 34px; }
        .slider.round:before { border-radius: 50%; }

        @media (max-width: 992px) {
          .holidays-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
