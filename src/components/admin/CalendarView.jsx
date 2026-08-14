import React from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarView() {
  return (
    <div className="calendar-view fade-in-up">
      <div className="calendar-header">
        <h2>Calendar</h2>
        <div className="calendar-controls">
          <button className="btn btn-outline btn-sm"><ChevronLeft size={16}/></button>
          <span className="current-month">August 2026</span>
          <button className="btn btn-outline btn-sm"><ChevronRight size={16}/></button>
        </div>
      </div>
      
      <div className="calendar-placeholder">
        <CalendarIcon size={48} color="var(--text-light)" />
        <p>Full interactive calendar view is coming soon.</p>
        <p className="subtext">Please use the Appointments Manager for now.</p>
      </div>

      <style>{`
        .calendar-view {
          background-color: #ffffff;
          border-radius: var(--border-radius);
          padding: 30px;
          border: 1px solid #f1ece1;
          min-height: 500px;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 1px solid #f1ece1;
          padding-bottom: 15px;
        }

        .calendar-header h2 {
          margin: 0;
          font-family: var(--font-serif);
          color: var(--primary-color);
        }

        .calendar-controls {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .current-month {
          font-weight: 600;
          color: var(--text-color);
        }

        .calendar-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
          color: var(--text-light);
          text-align: center;
        }

        .calendar-placeholder p {
          margin: 15px 0 5px 0;
          font-size: 1.1rem;
        }

        .calendar-placeholder .subtext {
          font-size: 0.9rem;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}
