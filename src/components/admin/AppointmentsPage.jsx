import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import { 
  Check, X, Calendar as CalendarIcon, Clock, MessageSquare, 
  Search, Filter, MapPin, Video, Eye
} from 'lucide-react';
import WhatsAppComposer from './WhatsAppComposer';
import { useToast } from '../ToastNotification';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('PENDING'); // 'ALL', 'PENDING', 'CONFIRMED', 'COMPLETED'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [selectedApt, setSelectedApt] = useState(null);
  
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  
  // Accept Modal date/time proposed state
  const [acceptDate, setAcceptDate] = useState('');
  const [acceptTime, setAcceptTime] = useState('');
  const [proposedMeetUrl, setProposedMeetUrl] = useState('');

  const generateRandomMeetUrl = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const rPart = (len) => Array.from({length: len}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `https://meet.google.com/${rPart(3)}-${rPart(4)}-${rPart(3)}`;
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getBookings();
      setAppointments(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptClick = (apt) => {
    setSelectedApt(apt);
    setAcceptDate(apt['Requested Date'] || '');
    setAcceptTime(apt['Requested Time'] || '');
    if (String(apt['Consultation Type'] || '').toLowerCase().includes('online')) {
      setProposedMeetUrl(generateRandomMeetUrl());
    } else {
      setProposedMeetUrl('');
    }
    setAcceptModalOpen(true);
  };

  const handleWhatsappClick = (apt) => {
    setSelectedApt(apt);
    setWhatsappModalOpen(true);
  };

  const handleViewDetailsClick = (apt) => {
    setSelectedApt(apt);
    setDetailsModalOpen(true);
  };

  const { showToast } = useToast() || {};
  const [processing, setProcessing] = useState(false);

  const handleConfirmAccept = async (e) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);

    const formData = new FormData(e.target);
    const date = formData.get('date');
    const time = formData.get('time');
    const duration = formData.get('duration');
    const meetUrl = (formData.get('meetUrl') || '').trim();
    
    const pName = selectedApt['Patient Name'] || 'Patient';
    let phone = selectedApt['Phone'] || '';
    const bId = selectedApt['Booking ID'];
    const service = selectedApt['Service'] || 'Consultation';
    const cType = selectedApt['Consultation Type'] || 'General';
    const isOnline = cType.toLowerCase().includes('online');

    // Helper to format date nicely
    const formatDateStr = (str) => {
      if (!str) return '';
      const d = new Date(str);
      if (isNaN(d.getTime())) return str;
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    // Helper to format time nicely
    const formatTimeStr = (str) => {
      if (!str) return '';
      const parts = str.split(':');
      if (parts.length < 2) return str;
      const hh = parseInt(parts[0], 10);
      const mm = parts[1];
      const ampm = hh >= 12 ? 'PM' : 'AM';
      const displayHour = hh % 12 || 12;
      return `${displayHour}:${mm} ${ampm}`;
    };

    const formattedDate = formatDateStr(date);
    const formattedTime = formatTimeStr(time);

    let whatsappMsg = `Hello ${pName}, this is Dr. Aditi Jain's clinic.\n\nYour consultation has been accepted.\n\nDate: ${formattedDate}\nTime: ${formattedTime} IST\nConsultation: ${cType}\nService: ${service}\n\n`;
    if (isOnline && meetUrl) {
      whatsappMsg += `Google Meet Link:\n${meetUrl}\n\nPlease join 5 minutes before your appointment.\n\n`;
    } else if (isOnline) {
      whatsappMsg += `Note: The Google Meet link and other details will be shared before the meeting and have also been auto-mailed to you.\n\n`;
    } else {
      whatsappMsg += `Note: The consultation details have been auto-mailed to you.\n\n`;
    }
    whatsappMsg += `Booking ID: ${bId}\n\nIf you have any questions, please reply here.\n\nDr. Aditi Jain\nMBBS, MS OBGY`;

    // Clean phone number
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }
    
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`;
    
    // Open WhatsApp synchronously to bypass browser popup blockers
    window.open(whatsappUrl, '_blank');

    // Close the accept modal window immediately
    setAcceptModalOpen(false);

    try {
      await adminApi.acceptBooking(selectedApt['Booking ID'], date, time, duration, 'Admin', meetUrl);
      if (showToast) showToast("✓ Appointment confirmed successfully & WhatsApp opened!", "success");
      loadAppointments(); // refresh
    } catch (err) {
      if (showToast) showToast("Failed to confirm appointment: " + err.message, "error");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (apt) => {
    if (processing) return;
    if (window.confirm("Are you sure you want to reject this request?")) {
      setProcessing(true);
      try {
        await adminApi.rejectBooking(apt['Booking ID'], 'Admin');
        if (showToast) showToast("✓ Appointment request rejected.", "info");
        loadAppointments();
      } catch (err) {
        if (showToast) showToast("Failed to reject: " + err.message, "error");
      } finally {
        setProcessing(false);
      }
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter !== 'ALL') {
      if (filter === 'CONFIRMED') {
        if (apt.Status !== 'CONFIRMED' && apt.Status !== 'ACCEPTED') return false;
      } else {
        if (apt.Status !== filter) return false;
      }
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        apt['Patient Name']?.toLowerCase().includes(term) ||
        apt['Booking ID']?.toLowerCase().includes(term) ||
        apt['Phone']?.includes(term)
      );
    }
    return true;
  });

  return (
    <div className="appointments-page fade-in-up">
      <div className="page-header">
        <h2>{filter === 'PENDING' ? 'Pending Appointment Requests' : 'Appointments Manager'}</h2>
        
        <div className="controls-row">
          <div className="search-bar">
            <Search size={18} color="var(--text-light)" />
            <input 
              type="text" 
              placeholder="Search patients, ID, phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <Filter size={18} color="var(--text-light)" style={{marginRight: '8px'}} />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="PENDING">Pending Requests</option>
              <option value="CONFIRMED">Accepted</option>
              <option value="COMPLETED">Completed</option>
              <option value="ALL">All Appointments</option>
            </select>
          </div>
          
          <button className="btn btn-outline" onClick={loadAppointments}>
            REFRESH
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Loading appointments...</div>
      ) : (
        <div className="appointments-list">
          {filteredAppointments.length === 0 ? (
            <div className="empty-state">
              <p>No {filter.toLowerCase()} appointments found.</p>
            </div>
          ) : (
            filteredAppointments.map(apt => (
              <div key={apt['Booking ID']} className="appointment-card">
                <div className="apt-card-header">
                  <div>
                    <h3 className="patient-name">{apt['Patient Name']}</h3>
                    <div className="patient-meta">
                      <span>{apt['Phone']}</span>
                      <span>•</span>
                      <span>{apt['Email']}</span>
                    </div>
                  </div>
                  <div className="status-container">
                    <span className={`status-badge ${apt.Status.toLowerCase()}`}>
                      {apt.Status}
                    </span>
                    <p className="booking-id">ID: {apt['Booking ID']}</p>
                  </div>
                </div>

                <div className="apt-card-body">
                  <div className="detail-col">
                    <span className="detail-label">Requested Service</span>
                    <p className="detail-value">{apt['Service']}</p>
                  </div>
                  <div className="detail-col">
                    <span className="detail-label">Consultation Type</span>
                    <p className="detail-value flex-align">
                      {apt['Consultation Type'] === 'Online Consultation' ? <Video size={14}/> : <MapPin size={14}/>}
                      {apt['Consultation Type']}
                    </p>
                  </div>
                  <div className="detail-col">
                    <span className="detail-label">
                      {apt.Status === 'CONFIRMED' || apt.Status === 'ACCEPTED' || apt.Status === 'COMPLETED' ? 'Meeting Time' : 'Requested Time'}
                    </span>
                    <p className="detail-value flex-align" style={{ whiteSpace: 'nowrap' }}>
                      <CalendarIcon size={14} style={{ flexShrink: 0 }} /> 
                      {apt.Status === 'CONFIRMED' || apt.Status === 'ACCEPTED' || apt.Status === 'COMPLETED' ? apt['Confirmed Date'] : apt['Requested Date']}
                    </p>
                    <p className="detail-value flex-align" style={{ whiteSpace: 'nowrap', marginTop: '4px' }}>
                      <Clock size={14} style={{ flexShrink: 0 }} /> 
                      {apt.Status === 'CONFIRMED' || apt.Status === 'ACCEPTED' || apt.Status === 'COMPLETED' ? apt['Confirmed Time'] : apt['Requested Time']}
                    </p>
                  </div>
                  <div className="detail-col">
                    <span className="detail-label">Submitted</span>
                    <p className="detail-value">{new Date(apt['Created At']).toLocaleString()}</p>
                  </div>
                </div>

                <div className="apt-card-footer">
                  <div className="footer-actions-left">
                    <button className="btn-icon" onClick={() => handleWhatsappClick(apt)}>
                      <MessageSquare size={16} /> MESSAGE ON WHATSAPP
                    </button>
                    <button className="btn-icon" onClick={() => handleViewDetailsClick(apt)}>
                      <Eye size={16} /> VIEW DETAILS
                    </button>
                  </div>
                  
                  <div className="footer-actions-right">
                    {apt.Status === 'PENDING' && (
                      <>
                        <button className="btn btn-outline btn-sm" onClick={() => handleReject(apt)} disabled={processing}>
                          REJECT
                        </button>
                        <button className="btn btn-primary btn-sm" onClick={() => handleAcceptClick(apt)} disabled={processing}>
                          ACCEPT
                        </button>
                      </>
                    )}
                    {(apt.Status === 'CONFIRMED' || apt.Status === 'ACCEPTED') && (
                      <>
                        {apt['Consultation Type'] === 'Online Consultation' && (
                          <a href={apt['Meet URL']} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                            JOIN MEET
                          </a>
                        )}
                        <button className="btn btn-outline btn-sm" onClick={() => adminApi.markCompleted(apt['Booking ID'], 'Admin').then(loadAppointments)}>
                          MARK COMPLETED
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Accept Appointment Modal */}
      {acceptModalOpen && selectedApt && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Appointment</h3>
            <p className="modal-subtitle">Verify the details before confirming. The patient will receive an email.</p>
            
            <div className="modal-summary">
              <p><strong>Patient:</strong> {selectedApt['Patient Name']}</p>
              <p><strong>Service:</strong> {selectedApt['Service']} ({selectedApt['Consultation Type']})</p>
            </div>

            <form onSubmit={handleConfirmAccept} className="modal-form">
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  name="date" 
                  value={acceptDate} 
                  onChange={(e) => setAcceptDate(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Time</label>
                <input 
                  type="time" 
                  name="time" 
                  value={acceptTime} 
                  onChange={(e) => setAcceptTime(e.target.value)} 
                  required 
                />
              </div>

              {(() => {
                const conflictingApt = appointments.find(apt => {
                  if (!selectedApt || apt['Booking ID'] === selectedApt['Booking ID']) return false;
                  const status = String(apt.Status).toUpperCase();
                  if (status !== 'ACCEPTED' && status !== 'CONFIRMED') return false;
                  
                  const aptDate = apt['Confirmed Date'] || apt['Requested Date'];
                  const aptTime = apt['Confirmed Time'] || apt['Requested Time'];
                  return aptDate === acceptDate && aptTime === acceptTime;
                });
                
                if (conflictingApt) {
                  return (
                    <div style={{
                      backgroundColor: '#fee2e2',
                      borderLeft: '4px solid #ef4444',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      color: '#991b1b',
                      marginBottom: '15px'
                    }}>
                      ⚠️ <strong>Time Conflict:</strong> You already have a confirmed booking with <strong>{conflictingApt['Patient Name']}</strong> at this time.
                    </div>
                  );
                }
                return null;
              })()}

              <div className="form-group">
                <label>Duration (minutes)</label>
                <select name="duration" defaultValue="30">
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>

              {selectedApt['Consultation Type'] === 'Online Consultation' && (
                <div className="form-group">
                  <label style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    Google Meet Link
                    <a
                      href="https://meet.new"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{fontSize:'0.78rem', color:'var(--primary-color)', fontWeight:600, textDecoration:'none', background:'#f1ece1', padding:'2px 8px', borderRadius:'4px'}}
                    >
                      + Create Meet Link ↗
                    </a>
                  </label>
                  <input
                    type="url"
                    name="meetUrl"
                    value={proposedMeetUrl}
                    onChange={(e) => setProposedMeetUrl(e.target.value)}
                    placeholder="Paste Google Meet URL here (e.g. https://meet.google.com/xxx-xxxx-xxx)"
                    style={{fontFamily:'monospace'}}
                  />
                  <small style={{color:'var(--text-light)', fontSize:'0.78rem', marginTop:'4px', display:'block'}}>Click the link above to open Google Meet, create a session, copy the URL and paste it here.</small>
                </div>
              )}

              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setAcceptModalOpen(false)} disabled={processing}>
                  CANCEL
                </button>
                <button type="submit" className="btn btn-primary" disabled={processing}>
                  {processing ? 'CONFIRMING...' : 'CONFIRM & SEND MESSAGE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {detailsModalOpen && selectedApt && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3>Appointment Details</h3>
              <button className="btn-icon" onClick={() => setDetailsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="details-grid">
              <div className="details-section">
                <h4>Patient Information</h4>
                <p><strong>Name:</strong> {selectedApt['Patient Name']}</p>
                <p><strong>Age:</strong> {selectedApt['Age']}</p>
                <p><strong>Phone:</strong> {selectedApt['Phone']}</p>
                <p><strong>Email:</strong> {selectedApt['Email']}</p>
              </div>
              
              <div className="details-section">
                <h4>Booking Information</h4>
                <p><strong>Booking ID:</strong> {selectedApt['Booking ID']}</p>
                <p><strong>Status:</strong> <span className={`status-badge ${selectedApt.Status.toLowerCase()}`}>{selectedApt.Status}</span></p>
                <p><strong>Submitted On:</strong> {new Date(selectedApt['Created At']).toLocaleString()}</p>
                <p><strong>Last Updated:</strong> {selectedApt['Updated At'] ? new Date(selectedApt['Updated At']).toLocaleString() : 'N/A'}</p>
              </div>
              
              <div className="details-section" style={{ gridColumn: '1 / -1' }}>
                <h4>Consultation Details</h4>
                <p><strong>Service:</strong> {selectedApt['Service']}</p>
                <p><strong>Type:</strong> {selectedApt['Consultation Type']}</p>
                <div style={{ display: 'flex', gap: '30px', marginTop: '10px' }}>
                  <div>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '4px' }}>Requested</p>
                    <p><strong>Date:</strong> {selectedApt['Requested Date']}</p>
                    <p><strong>Time:</strong> {selectedApt['Requested Time']}</p>
                  </div>
                  {selectedApt.Status !== 'PENDING' && selectedApt.Status !== 'REJECTED' && (
                    <div>
                      <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '4px' }}>Confirmed</p>
                      <p><strong>Date:</strong> {selectedApt['Confirmed Date']}</p>
                      <p><strong>Time:</strong> {selectedApt['Confirmed Time']}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedApt['Meet URL'] && (
                <div className="details-section" style={{ gridColumn: '1 / -1' }}>
                  <h4>Meeting Link</h4>
                  <a href={selectedApt['Meet URL']} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', wordBreak: 'break-all' }}>
                    {selectedApt['Meet URL']}
                  </a>
                </div>
              )}
              
              {selectedApt['Admin Note'] && (
                <div className="details-section" style={{ gridColumn: '1 / -1' }}>
                  <h4>Admin Note</h4>
                  <p style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px', borderLeft: '3px solid var(--primary-color)' }}>
                    {selectedApt['Admin Note']}
                  </p>
                </div>
              )}
            </div>
            
            <div className="modal-actions" style={{ marginTop: '30px' }}>
              <button type="button" className="btn btn-outline" onClick={() => setDetailsModalOpen(false)}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Composer */}
      {whatsappModalOpen && selectedApt && (
        <WhatsAppComposer 
          appointment={selectedApt} 
          onClose={() => setWhatsappModalOpen(false)} 
        />
      )}

      <style>{`
        .appointments-page {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .page-header h2 {
          font-family: var(--font-serif);
          color: var(--primary-color);
          margin: 0;
          font-size: 1.8rem;
        }

        .controls-row {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 0 12px;
          min-width: 250px;
        }

        .search-bar input {
          border: none;
          padding: 10px;
          outline: none;
          width: 100%;
          font-size: 0.9rem;
        }

        .filter-group {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 0 12px;
        }

        .filter-group select {
          border: none;
          padding: 10px 0;
          outline: none;
          background: transparent;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .appointments-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .appointment-card {
          background-color: #ffffff;
          border: 1px solid #f1ece1;
          border-radius: var(--border-radius);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }

        .apt-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid #f1ece1;
          padding-bottom: 15px;
          margin-bottom: 20px;
        }

        .patient-name {
          margin: 0 0 5px 0;
          font-size: 1.2rem;
          color: var(--primary-color);
        }

        .patient-meta {
          display: flex;
          gap: 10px;
          color: var(--text-light);
          font-size: 0.9rem;
        }

        .status-container {
          text-align: right;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .status-badge.pending { background-color: #fef3c7; color: #d97706; }
        .status-badge.confirmed, .status-badge.accepted { background-color: #dcfce7; color: #166534; }
        .status-badge.completed { background-color: #f1f5f9; color: #475569; }
        .status-badge.rejected { background-color: #fee2e2; color: #b91c1c; }

        .booking-id {
          margin: 5px 0 0 0;
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .apt-card-body {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .detail-label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }

        .detail-value {
          margin: 0;
          font-size: 0.95rem;
          color: var(--text-color);
          font-weight: 500;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .apt-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 15px;
          border-top: 1px solid #f1ece1;
          flex-wrap: wrap;
          gap: 15px;
        }

        .footer-actions-left {
          display: flex;
          gap: 15px;
        }

        .footer-actions-right {
          display: flex;
          gap: 10px;
        }

        .btn-icon {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: var(--primary-color);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          padding: 5px;
        }
        .btn-icon:hover {
          color: var(--accent-color);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .modal-content {
          background-color: #ffffff;
          padding: 30px;
          border-radius: var(--border-radius);
          width: 100%;
          max-width: 500px;
          box-shadow: var(--shadow-lg);
        }

        .modal-content h3 {
          margin: 0 0 5px 0;
          color: var(--primary-color);
          font-family: var(--font-serif);
          font-size: 1.5rem;
        }

        .modal-subtitle {
          color: var(--text-light);
          margin-bottom: 20px;
          font-size: 0.9rem;
        }

        .modal-summary {
          background-color: #fcfcf9;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 20px;
          border: 1px solid #f1ece1;
        }

        .modal-summary p { margin: 5px 0; font-size: 0.95rem; }

        .modal-form .form-group {
          margin-bottom: 15px;
        }

        .modal-form label {
          display: block;
          margin-bottom: 5px;
          font-size: 0.85rem;
          color: var(--text-color);
          font-weight: 600;
        }

        .modal-form input, .modal-form select {
          width: 100%;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.95rem;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 25px;
        }
        
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .details-section h4 {
          margin: 0 0 10px 0;
          color: var(--primary-color);
          font-size: 1rem;
          border-bottom: 1px solid #f1ece1;
          padding-bottom: 5px;
        }
        
        .details-section p {
          margin: 5px 0;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
}
