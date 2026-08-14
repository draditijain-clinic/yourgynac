import React from 'react';
import { Users, Search } from 'lucide-react';

export default function Patients() {
  return (
    <div className="patients-view fade-in-up">
      <div className="view-header">
        <h2>Patient Directory</h2>
        <div className="search-bar">
          <Search size={18} color="var(--text-light)" />
          <input type="text" placeholder="Search patients..." />
        </div>
      </div>
      
      <div className="placeholder-content">
        <Users size={48} color="var(--text-light)" />
        <p>Patient Directory is syncing...</p>
        <p className="subtext">This feature will compile patient histories from your bookings.</p>
      </div>

      <style>{`
        .patients-view {
          background-color: #ffffff;
          border-radius: var(--border-radius);
          padding: 30px;
          border: 1px solid #f1ece1;
          min-height: 500px;
        }
        .view-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 1px solid #f1ece1;
          padding-bottom: 15px;
        }
        .view-header h2 { margin: 0; font-family: var(--font-serif); color: var(--primary-color); }
        .search-bar { display: flex; align-items: center; border: 1px solid #e2e8f0; padding: 8px 12px; border-radius: 6px; }
        .search-bar input { border: none; outline: none; margin-left: 8px; }
        .placeholder-content { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; color: var(--text-light); text-align: center; }
        .placeholder-content p { margin: 15px 0 5px 0; font-size: 1.1rem; }
        .placeholder-content .subtext { font-size: 0.9rem; color: #94a3b8; }
      `}</style>
    </div>
  );
}
