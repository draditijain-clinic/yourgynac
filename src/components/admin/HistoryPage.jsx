import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Calendar, Trash2, XCircle, 
  CheckCircle, RefreshCw, MessageSquare, Download 
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { useToast } from '../ToastNotification';

export default function HistoryPage() {
  const { showToast } = useToast() || {};
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      // getBookings returns all records from BOOKINGS sheet
      const res = await adminApi.getBookings();
      if (res && res.data) {
        setBookings(res.data);
      }
    } catch (err) {
      if (showToast) showToast("Failed to load history: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm(`Are you sure you want to cancel booking ${bookingId}?`)) return;
    setProcessingId(bookingId);
    try {
      await adminApi.cancelBooking(bookingId, "Cancelled by Admin");
      if (showToast) showToast(`✓ Booking ${bookingId} cancelled.`, "info");
      loadHistory();
    } catch (err) {
      if (showToast) showToast("Failed to cancel: " + err.message, "error");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm(`⚠️ PERMANENT DELETE: Are you sure you want to delete booking ${bookingId} from the database?`)) return;
    setProcessingId(bookingId);
    try {
      await adminApi.deleteBooking(bookingId);
      if (showToast) showToast(`✓ Booking ${bookingId} permanently deleted.`, "success");
      loadHistory();
    } catch (err) {
      if (showToast) showToast("Failed to delete: " + err.message, "error");
    } finally {
      setProcessingId(null);
    }
  };

  const filteredBookings = bookings.filter(b => {
    // Status Filter
    if (statusFilter !== 'ALL' && b.Status !== statusFilter) return false;
    
    // Date Filter
    if (dateFilter) {
      const bDate = b['Confirmed Date'] || b['Requested Date'];
      if (bDate !== dateFilter) return false;
    }

    // Text Search (Name, Phone, Email, ID)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      const name = String(b['Patient Name'] || '').toLowerCase();
      const phone = String(b['Phone'] || '').toLowerCase();
      const email = String(b['Email'] || '').toLowerCase();
      const id = String(b['Booking ID'] || '').toLowerCase();
      if (!name.includes(term) && !phone.includes(term) && !email.includes(term) && !id.includes(term)) {
        return false;
      }
    }
    return true;
  });

  const getStatusBadge = (status) => {
    const s = String(status).toUpperCase();
    if (s === 'CONFIRMED') return <span className="badge badge-success">CONFIRMED</span>;
    if (s === 'PENDING') return <span className="badge badge-warning">PENDING</span>;
    if (s === 'CANCELLED' || s === 'REJECTED') return <span className="badge badge-danger">{s}</span>;
    if (s === 'COMPLETED') return <span className="badge badge-info">COMPLETED</span>;
    return <span className="badge">{s}</span>;
  };

  return (
    <div className="history-page fade-in-up">
      <div className="view-header">
        <div>
          <h2>History & All Reservations</h2>
          <p className="subtext">Search, filter, manage, cancel, or delete past and current patient reservations.</p>
        </div>
        <button className="btn btn-outline" onClick={loadHistory} disabled={loading}>
          <RefreshCw size={16} style={{ marginRight: '6px' }} /> REFRESH
        </button>
      </div>

      {/* Filter Control Bar */}
      <div className="filter-bar">
        <div className="search-input-box">
          <Search size={16} color="var(--text-light)" />
          <input 
            type="text" 
            placeholder="Search by patient name, phone, email, or Booking ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date:</label>
          <input 
            type="date" 
            value={dateFilter} 
            onChange={e => setDateFilter(e.target.value)}
          />
          {dateFilter && (
            <button className="btn-clear-date" onClick={() => setDateFilter('')}>Clear</button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Loading reservations history...</div>
      ) : (
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Patient Name</th>
                <th>Phone / WhatsApp</th>
                <th>Service & Type</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
                    No reservations found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map(b => (
                  <tr key={b['Booking ID']}>
                    <td><strong className="id-txt">{b['Booking ID']}</strong></td>
                    <td>
                      <div className="patient-name-box">
                        <strong>{b['Patient Name']}</strong>
                        <span className="sub-txt">{b['Age']} YRS · {b['Email']}</span>
                      </div>
                    </td>
                    <td>
                      <div className="phone-box">
                        <span>{b['Phone']}</span>
                        <a 
                          href={`https://wa.me/${String(b['Phone'] || '').replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="wa-link-badge"
                        >
                          <MessageSquare size={12} /> WhatsApp
                        </a>
                      </div>
                    </td>
                    <td>
                      <span className="svc-txt">{b['Service']}</span><br />
                      <span className="sub-txt">{b['Consultation Type']}</span>
                    </td>
                    <td>
                      <strong>{b['Confirmed Date'] || b['Requested Date']}</strong><br />
                      <span className="sub-txt">{b['Confirmed Time'] || b['Requested Time']}</span>
                    </td>
                    <td>{getStatusBadge(b['Status'])}</td>
                    <td>
                      <div className="action-buttons">
                        {b['Status'] !== 'CANCELLED' && b['Status'] !== 'REJECTED' && (
                          <button 
                            className="btn-action btn-cancel" 
                            title="Cancel Booking"
                            onClick={() => handleCancel(b['Booking ID'])}
                            disabled={processingId === b['Booking ID']}
                          >
                            <XCircle size={15} /> Cancel
                          </button>
                        )}
                        <button 
                          className="btn-action btn-delete" 
                          title="Delete Booking"
                          onClick={() => handleDelete(b['Booking ID'])}
                          disabled={processingId === b['Booking ID']}
                        >
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .history-page { display: flex; flex-direction: column; gap: 20px; }
        .view-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1ece1; padding-bottom: 15px; }
        .view-header h2 { margin: 0 0 5px 0; font-family: var(--font-serif); color: var(--primary-color); }
        .subtext { margin: 0; color: var(--text-light); font-size: 0.9rem; }
        
        .filter-bar {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          background: #ffffff;
          padding: 18px 24px;
          border-radius: var(--border-radius);
          border: 1px solid #f1ece1;
          align-items: center;
        }
        .search-input-box {
          flex: 1;
          min-width: 280px;
          display: flex;
          align-items: center;
          border: 1px solid #e2e8f0;
          padding: 8px 14px;
          border-radius: 6px;
          background: #faf9f6;
        }
        .search-input-box input {
          border: none;
          outline: none;
          background: transparent;
          margin-left: 8px;
          width: 100%;
          font-size: 0.9rem;
        }
        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-color);
        }
        .filter-group select, .filter-group input {
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.85rem;
          outline: none;
        }
        .btn-clear-date {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          font-size: 0.8rem;
          text-decoration: underline;
        }

        .table-responsive {
          background: #ffffff;
          border-radius: var(--border-radius);
          border: 1px solid #f1ece1;
          overflow-x: auto;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
        }
        .admin-table th {
          background-color: #fdfcf8;
          padding: 14px 18px;
          border-bottom: 1px solid #f1ece1;
          color: var(--primary-color);
          font-weight: 700;
          font-family: var(--font-serif);
        }
        .admin-table td {
          padding: 16px 18px;
          border-bottom: 1px solid #f8fafc;
          vertical-align: middle;
        }
        .admin-table tr:hover {
          background-color: #fcfaf5;
        }
        .id-txt { font-family: monospace; color: var(--primary-color); font-size: 0.95rem; }
        .patient-name-box strong { color: var(--text-color); display: block; }
        .sub-txt { font-size: 0.78rem; color: var(--text-light); }
        .phone-box { display: flex; flex-direction: column; gap: 4px; }
        .wa-link-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          color: #166534;
          background: #dcfce7;
          padding: 2px 6px;
          border-radius: 4px;
          text-decoration: none;
          width: fit-content;
          font-weight: 600;
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .badge-success { background-color: #dcfce7; color: #166534; }
        .badge-warning { background-color: #fef3c7; color: #92400e; }
        .badge-danger { background-color: #fee2e2; color: #991b1b; }
        .badge-info { background-color: #e0f2fe; color: #075985; }

        .action-buttons { display: flex; gap: 8px; }
        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          background: #ffffff;
        }
        .btn-cancel:hover { background: #fff7ed; color: #c2410c; border-color: #fdba74; }
        .btn-delete:hover { background: #fef2f2; color: #b91c1c; border-color: #fca5a5; }
      `}</style>
    </div>
  );
}
