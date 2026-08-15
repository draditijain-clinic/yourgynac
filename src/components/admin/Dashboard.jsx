import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, Video, Clock, 
  MapPin, Video as VideoIcon, Check, 
  MessageSquare, Edit2, X, ArrowRight, Link, RefreshCw,
  Play, Bell, AlertTriangle
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { useToast } from '../ToastNotification';

export default function Dashboard({ setActiveTab }) {
  const { showToast } = useToast() || {};
  const [data, setData] = useState({
    stats: { pending: 0, today: 0, online: 0, upcoming: 0 },
    todaySchedule: []
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Modals / Actions state
  const [selectedApt, setSelectedApt] = useState(null);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);

  // Reschedule Form state
  const [reschedDate, setReschedDate] = useState('');
  const [reschedTime, setReschedTime] = useState('');
  const [reschedMeetUrl, setReschedMeetUrl] = useState('');

  // WhatsApp Composer state
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [includeMeetUrl, setIncludeMeetUrl] = useState(false);
  const [generatedMeetUrl, setGeneratedMeetUrl] = useState('');

  useEffect(() => {
    loadDashboardData();
    // Refresh every 60 seconds
    const interval = setInterval(loadDashboardData, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const result = await adminApi.getDashboardData();
      setData(result);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper: Format time nicely in 12-hour format
  const formatTime12Hour = (time24) => {
    if (!time24) return '';
    const str = String(time24).trim();
    
    // ISO format or full date-time string
    if (str.includes('T') || str.includes(' ')) {
      try {
        const d = new Date(str);
        if (!isNaN(d.getTime())) {
          let hh = d.getHours();
          const mm = String(d.getMinutes()).padStart(2, '0');
          const ampm = hh >= 12 ? 'PM' : 'AM';
          hh = hh % 12 || 12;
          return `${hh}:${mm} ${ampm}`;
        }
      } catch (_) {}
    }
    
    const parts = str.split(':');
    if (parts.length < 2) return str;
    
    let hourPart = parts[0];
    if (hourPart.includes('T')) {
      hourPart = hourPart.split('T')[1];
    } else if (hourPart.includes(' ')) {
      hourPart = hourPart.split(' ')[1];
    }
    
    let hh = parseInt(hourPart, 10);
    const mm = parts[1].substring(0, 2);
    if (isNaN(hh)) return str;
    
    const ampm = hh >= 12 ? 'PM' : 'AM';
    hh = hh % 12 || 12;
    return `${hh}:${mm} ${ampm}`;
  };

  // Helper: Add minutes to time (24-hour HH:MM format)
  const addMinutesToTime = (timeStr, mins) => {
    if (!timeStr) return '09:00';
    const parts = timeStr.split(':');
    const h = parts.length > 0 ? parseInt(parts[0], 10) : 9;
    const m = parts.length > 1 ? parseInt(parts[1], 10) : 0;
    
    const date = new Date();
    date.setHours(h, m + mins, 0, 0);
    
    const newH = String(date.getHours()).padStart(2, '0');
    const newM = String(date.getMinutes()).padStart(2, '0');
    return `${newH}:${newM}`;
  };

  // Helper: Calculate meeting status relative to current time
  const getMeetingStatus = (timeStr) => {
    if (!timeStr) return 'UPCOMING';
    const parts = timeStr.split(':');
    const h = parts.length > 0 ? parseInt(parts[0], 10) : 0;
    const m = parts.length > 1 ? parseInt(parts[1], 10) : 0;
    
    const now = new Date();
    const meetingStart = new Date();
    meetingStart.setHours(h, m, 0, 0);
    
    // Assuming default 30 mins duration
    const meetingEnd = new Date(meetingStart.getTime() + 30 * 60000);
    
    if (now > meetingEnd) {
      return 'COMPLETED';
    } else if (now >= meetingStart && now <= meetingEnd) {
      return 'NOW';
    } else {
      return 'UPCOMING';
    }
  };

  // Generate Google Meet Link (realistic pattern)
  const generateMeetLink = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const r = (len) => Array.from({length: len}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const link = `https://meet.google.com/${r(3)}-${r(4)}-${r(3)}`;
    setGeneratedMeetUrl(link);
    return link;
  };

  // Handle quick delay update
  const handleQuickDelay = async (apt, mins) => {
    if (submitting) return;
    setSubmitting(true);
    
    const currentConfirmedTime = apt['Confirmed Time'] || apt['Requested Time'] || '09:00';
    const newTime = addMinutesToTime(currentConfirmedTime, mins);
    const date = apt['Confirmed Date'] || apt['Requested Date'] || new Date().toISOString().split('T')[0];
    const bId = apt['Booking ID'];
    const meetUrl = apt['Meet URL'] || '';
    
    try {
      await adminApi.rescheduleBooking(bId, date, newTime, meetUrl);
      if (showToast) showToast(`Delayed appointment by ${mins} mins!`, "success");
      await loadDashboardData();
      
      // Auto-open WhatsApp Composer prefilled with delay message
      const pName = apt['Patient Name'] || 'Patient';
      const formattedNewTime = formatTime12Hour(newTime);
      const delayMsg = `Hello ${pName}, this is Dr. Aditi Jain's clinic. We are running about ${mins} minutes behind schedule today. Your updated consultation is scheduled for today at ${formattedNewTime}. Thank you for your understanding!`;
      
      setSelectedApt({ ...apt, 'Confirmed Time': newTime });
      setWhatsappMessage(delayMsg);
      setWhatsappModalOpen(true);
    } catch (err) {
      if (showToast) showToast("Failed to reschedule: " + err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Open custom Reschedule Modal
  const openRescheduleModal = (apt) => {
    setSelectedApt(apt);
    setReschedDate(apt['Confirmed Date'] || apt['Requested Date'] || '');
    setReschedTime(apt['Confirmed Time'] || apt['Requested Time'] || '');
    setReschedMeetUrl(apt['Meet URL'] || '');
    setRescheduleModalOpen(true);
  };

  // Submit custom rescheduling
  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      await adminApi.rescheduleBooking(selectedApt['Booking ID'], reschedDate, reschedTime, reschedMeetUrl);
      if (showToast) showToast("Appointment rescheduled successfully!", "success");
      setRescheduleModalOpen(false);
      await loadDashboardData();

      // Trigger WhatsApp Composer modal with rescheduled details
      const pName = selectedApt['Patient Name'] || 'Patient';
      const formattedTime = formatTime12Hour(reschedTime);
      const d = new Date(reschedDate);
      const formattedDate = isNaN(d.getTime()) ? reschedDate : d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      
      let rescheduleMsg = `Hello ${pName}, this is Dr. Aditi Jain's clinic. Your appointment has been rescheduled to ${formattedDate} at ${formattedTime} IST.`;
      if (reschedMeetUrl) {
        rescheduleMsg += `\n\nGoogle Meet Link: ${reschedMeetUrl}`;
      }
      rescheduleMsg += `\n\nSee you soon!`;

      setWhatsappMessage(rescheduleMsg);
      setWhatsappModalOpen(true);
    } catch (err) {
      if (showToast) showToast("Rescheduling failed: " + err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Open Messaging Modal
  const openMessagingModal = (apt) => {
    setSelectedApt(apt);
    const pName = apt['Patient Name'] || 'Patient';
    const time = formatTime12Hour(apt['Confirmed Time'] || apt['Requested Time']);
    const meetLink = apt['Meet URL'] || '';
    
    let defaultMsg = `Hello ${pName}, this is Dr. Aditi Jain's clinic. Your appointment is confirmed for today at ${time}.`;
    if (meetLink) {
      defaultMsg += `\n\nGoogle Meet: ${meetLink}`;
    }
    
    setWhatsappMessage(defaultMsg);
    setIncludeMeetUrl(!!meetLink);
    setGeneratedMeetUrl(meetLink);
    setWhatsappModalOpen(true);
  };

  // Send message on WhatsApp Web
  const sendWhatsAppMessage = async () => {
    let finalMsg = whatsappMessage;
    
    // If include meet link was checked and we generated/pasted a new one
    if (includeMeetUrl && generatedMeetUrl && !whatsappMessage.includes(generatedMeetUrl)) {
      finalMsg += `\n\nGoogle Meet Link: ${generatedMeetUrl}`;
      
      // Update meet link in sheet in background
      try {
        const date = selectedApt['Confirmed Date'] || selectedApt['Requested Date'];
        const time = selectedApt['Confirmed Time'] || selectedApt['Requested Time'];
        await adminApi.rescheduleBooking(selectedApt['Booking ID'], date, time, generatedMeetUrl);
        loadDashboardData();
      } catch (e) {
        console.warn("Failed to auto-update Meet URL on sheet:", e);
      }
    }

    let phone = selectedApt['Phone'] || '';
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }
    
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMsg)}`;
    window.open(waUrl, '_blank');
    setWhatsappModalOpen(false);
  };

  if (loading) {
    return (
      <div className="loading-state-container">
        <div className="loading-state-card">
          <RefreshCw className="spinner-icon" size={32} />
          <p>Syncing database connection...</p>
        </div>
      </div>
    );
  }

  const { stats, todaySchedule } = data;

  // Chronologically sort today's schedule
  const getAptTime = (apt) => apt['Confirmed Time'] || apt['Requested Time'] || '00:00';
  
  const sortedSchedule = [...todaySchedule].sort((a, b) => {
    return getAptTime(a).localeCompare(getAptTime(b));
  });

  // Categorize schedule
  let foundNext = false;
  const processedSchedule = sortedSchedule.map(apt => {
    const time = getAptTime(apt);
    const status = getMeetingStatus(time);
    let timelineStatus = status; // COMPLETED, NOW, or UPCOMING
    
    if (status === 'UPCOMING' && !foundNext) {
      timelineStatus = 'NEXT';
      foundNext = true;
    }
    
    return { ...apt, timelineStatus };
  });

  return (
    <div className="dashboard-view fade-in-up">
      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => setActiveTab('appointments')}>
          <div className="stat-icon pending-icon">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Pending Requests</p>
            <h3 className="stat-value">{stats.pending}</h3>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveTab('appointments')}>
          <div className="stat-icon today-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Today's Appointments</p>
            <h3 className="stat-value">{stats.today}</h3>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveTab('appointments')}>
          <div className="stat-icon online-icon">
            <Video size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Online Consultations</p>
            <h3 className="stat-value">{stats.online}</h3>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveTab('appointments')}>
          <div className="stat-icon upcoming-icon">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Upcoming</p>
            <h3 className="stat-value">{stats.upcoming}</h3>
          </div>
        </div>
      </div>

      {/* Today's Schedule Timeline */}
      <div className="dashboard-section">
        <div className="section-header-row">
          <h3>TODAY'S SCHEDULE</h3>
          <button className="btn-text flex-align" onClick={loadDashboardData} style={{ display:'flex', gap:'5px', alignItems:'center' }}>
            <RefreshCw size={14} /> REFRESH
          </button>
        </div>

        <div className="timeline-container">
          {processedSchedule.length === 0 ? (
            <div className="empty-state">
              <p>No appointments scheduled for today.</p>
            </div>
          ) : (
            processedSchedule.map((apt, index) => {
              const isOnline = apt['Consultation Type'] === 'Online Consultation';
              const time = getAptTime(apt);
              const formattedTime = formatTime12Hour(time);
              const isCompleted = apt.timelineStatus === 'COMPLETED';
              const isNow = apt.timelineStatus === 'NOW';
              const isNext = apt.timelineStatus === 'NEXT';

              return (
                <div key={index} className={`timeline-item ${isCompleted ? 'completed-item' : ''} ${isNow ? 'active-item' : ''}`}>
                  <div className="timeline-time">
                    <span className="time-text">{formattedTime}</span>
                    {isNow && <span className="live-indicator">LIVE</span>}
                  </div>
                  
                  <div className={`timeline-card status-${apt.timelineStatus.toLowerCase()}`}>
                    <div className="apt-header">
                      <div className="patient-info">
                        <h4>{apt['Patient Name']}</h4>
                        <span className="apt-service">{apt['Service']}</span>
                      </div>
                      
                      <div className="status-badges">
                        {isCompleted && <span className="timeline-status completed"><Check size={12} style={{marginRight:'4px'}}/> Done</span>}
                        {isNow && <span className="timeline-status now"><span className="pulse-dot"></span> NOW</span>}
                        {isNext && <span className="timeline-status next">NEXT UP</span>}
                        {!isCompleted && !isNow && !isNext && <span className="timeline-status upcoming">UPCOMING</span>}
                      </div>
                    </div>

                    <div className="apt-meta-info" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '10px' }}>
                      {isOnline ? (
                        <span className="type-badge online">
                          <VideoIcon size={14} /> Online
                        </span>
                      ) : (
                        <span className="type-badge clinic">
                          <MapPin size={14} /> In-Clinic
                        </span>
                      )}
                      
                      <span className="info-text" style={{ fontWeight: '600' }}>{apt['Phone']}</span>
                    </div>

                    {/* Rich Details Grid */}
                    <div className="apt-details-subgrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', padding: '10px', background: '#f8fafc', borderRadius: '6px', marginBottom: '15px', border: '1px solid #e2e8f0', fontSize: '0.8rem' }}>
                      <div><span style={{ color: '#64748b', fontWeight: '500' }}>Booking ID:</span> <span style={{ fontFamily: 'monospace', color: 'var(--primary-color)', fontWeight: '600' }}>{apt['Booking ID'] || apt.bookingId}</span></div>
                      {apt['Age'] && <div><span style={{ color: '#64748b', fontWeight: '500' }}>Age:</span> <span style={{ fontWeight: '600' }}>{apt['Age'] || apt.age} years</span></div>}
                      {apt['Email'] && <div style={{ gridColumn: 'span 1' }}><span style={{ color: '#64748b', fontWeight: '500' }}>Email:</span> <span style={{ fontWeight: '600' }}>{apt['Email'] || apt.email}</span></div>}
                      {apt['Admin Note'] && <div style={{ gridColumn: '1 / -1', borderTop: '1px dashed #e2e8f0', paddingTop: '6px', marginTop: '2px' }}><span style={{ color: '#64748b', fontWeight: '500' }}>Coordinator Note:</span> <span style={{ fontWeight: '600', color: '#1e293b' }}>{apt['Admin Note'] || apt.adminNote}</span></div>}
                    </div>

                    {/* Quick Reschedule & Messaging Actions */}
                    <div className="timeline-actions-row">
                      <div className="quick-delays">
                        <span className="delay-label">Delay:</span>
                        <button className="btn btn-delay" onClick={() => handleQuickDelay(apt, 10)} disabled={submitting}>+10m</button>
                        <button className="btn btn-delay" onClick={() => handleQuickDelay(apt, 15)} disabled={submitting}>+15m</button>
                        <button className="btn btn-delay" onClick={() => handleQuickDelay(apt, 30)} disabled={submitting}>+30m</button>
                      </div>

                      <div className="footer-actions">
                        <button className="btn btn-outline btn-sm flex-align" onClick={() => openRescheduleModal(apt)} style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                          <Edit2 size={12} /> Reschedule
                        </button>
                        
                        <button className="btn btn-outline btn-sm flex-align" onClick={() => openMessagingModal(apt)} style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                          <MessageSquare size={12} /> Send Message
                        </button>

                        {isOnline && apt['Meet URL'] && !isCompleted && (
                          <a href={apt['Meet URL']} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                            JOIN MEET
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleModalOpen && selectedApt && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Reschedule Appointment</h3>
              <button className="btn-icon" onClick={() => setRescheduleModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="modal-form">
              <div className="form-group">
                <label>Confirmed Date</label>
                <input 
                  type="date" 
                  value={reschedDate} 
                  onChange={(e) => setReschedDate(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Confirmed Time</label>
                <input 
                  type="time" 
                  value={reschedTime} 
                  onChange={(e) => setReschedTime(e.target.value)} 
                  required 
                />
              </div>

              {selectedApt['Consultation Type'] === 'Online Consultation' && (
                <div className="form-group">
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Google Meet URL
                    <button 
                      type="button" 
                      onClick={() => setReschedMeetUrl(generateMeetLink())}
                      style={{ fontSize: '0.78rem', color: 'var(--primary-color)', background: '#faf6ee', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                    >
                      + Generate Link
                    </button>
                  </label>
                  <input 
                    type="url" 
                    value={reschedMeetUrl} 
                    onChange={(e) => setReschedMeetUrl(e.target.value)} 
                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  />
                </div>
              )}

              <div className="modal-actions" style={{ marginTop: '25px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setRescheduleModalOpen(false)} disabled={submitting}>
                  CANCEL
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'UPDATING...' : 'SAVE & RESCHEDULE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WhatsApp Message Composer Modal */}
      {whatsappModalOpen && selectedApt && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '550px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Message Patient via WhatsApp</h3>
              <button className="btn-icon" onClick={() => setWhatsappModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-form">
              <div className="quick-templates" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Quick Templates</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    className="btn btn-outline btn-xs flex-align"
                    style={{ fontSize: '0.75rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => {
                      const pName = selectedApt['Patient Name'] || 'Patient';
                      setWhatsappMessage(`Hello ${pName}, this is Dr. Aditi Jain's clinic. Your appointment is starting now. Please click this Google Meet link to join.`);
                      setIncludeMeetUrl(true);
                      if (!generatedMeetUrl) generateMeetLink();
                    }}
                  >
                    <Play size={12} /> Start Session
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline btn-xs flex-align"
                    style={{ fontSize: '0.75rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => {
                      const pName = selectedApt['Patient Name'] || 'Patient';
                      setWhatsappMessage(`Hello ${pName}, this is Dr. Aditi Jain's clinic. We are running about 15 minutes behind schedule today. Sorry for the delay!`);
                    }}
                  >
                    <Clock size={12} /> Delay 15m
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline btn-xs flex-align"
                    style={{ fontSize: '0.75rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => {
                      const pName = selectedApt['Patient Name'] || 'Patient';
                      setWhatsappMessage(`Hello ${pName}, this is Dr. Aditi Jain's clinic. We are running about 30 minutes behind schedule today. Sorry for the delay!`);
                    }}
                  >
                    <Clock size={12} /> Delay 30m
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline btn-xs flex-align"
                    style={{ fontSize: '0.75rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => {
                      const pName = selectedApt['Patient Name'] || 'Patient';
                      setWhatsappMessage(`Hello ${pName}, this is a gentle reminder for your scheduled appointment today with Dr. Aditi Jain.`);
                    }}
                  >
                    <Bell size={12} /> Remind Patient
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline btn-xs flex-align"
                    style={{ fontSize: '0.75rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => {
                      const pName = selectedApt['Patient Name'] || 'Patient';
                      setWhatsappMessage(`Hello ${pName}, this is Dr. Aditi Jain's clinic. We need to reschedule your appointment today. Please let us know when you would be available.`);
                    }}
                  >
                    <Calendar size={12} /> Reschedule Req
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline btn-xs flex-align"
                    style={{ fontSize: '0.75rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => {
                      const pName = selectedApt['Patient Name'] || 'Patient';
                      setWhatsappMessage(`Hello ${pName}, this is Dr. Aditi Jain's clinic. The doctor is delayed due to an emergency. We will share a new time with you shortly.`);
                    }}
                  >
                    <AlertTriangle size={12} /> Doctor Delayed
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Compose Message</label>
                <textarea 
                  value={whatsappMessage} 
                  onChange={(e) => setWhatsappMessage(e.target.value)} 
                  rows="5"
                  style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical' }}
                  required
                />
              </div>

              {selectedApt['Consultation Type'] === 'Online Consultation' && (
                <div className="form-group" style={{ backgroundColor: '#faf6ee', padding: '15px', borderRadius: '8px', border: '1px solid #f1ece1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label className="custom-checkbox">
                      <input 
                        type="checkbox" 
                        checked={includeMeetUrl} 
                        onChange={(e) => setIncludeMeetUrl(e.target.checked)} 
                      />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">Include Google Meet URL</span>
                    </label>
                    <button 
                      type="button"
                      onClick={() => generateMeetLink()}
                      style={{ fontSize: '0.78rem', color: 'var(--primary-color)', background: '#ffffff', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Regenerate
                    </button>
                  </div>
                  {includeMeetUrl && (
                    <input 
                      type="text" 
                      value={generatedMeetUrl}
                      onChange={(e) => setGeneratedMeetUrl(e.target.value)}
                      placeholder="https://meet.google.com/xxx-xxxx-xxx"
                      style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                    />
                  )}
                </div>
              )}

              <div className="modal-actions" style={{ marginTop: '25px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setWhatsappModalOpen(false)}>
                  CANCEL
                </button>
                <button type="button" className="btn btn-primary" onClick={sendWhatsAppMessage}>
                  OPEN WHATSAPP & SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .loading-state-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          width: 100%;
        }
        
        .loading-state-card {
          background: #ffffff;
          padding: 40px 60px;
          border-radius: 16px;
          border: 1px solid #f1ece1;
          box-shadow: 0 10px 25px rgba(92, 29, 36, 0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        
        .loading-state-card p {
          margin: 0;
          color: var(--text-light);
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.2px;
        }
        
        .spinner-icon {
          color: var(--primary-color);
          animation: spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .stat-card {
          background-color: #ffffff;
          border: 1px solid rgba(241, 236, 225, 0.6);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .stat-icon {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .pending-icon { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color: #d97706; }
        .today-icon { background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); color: #4338ca; }
        .online-icon { background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); color: #059669; }
        .upcoming-icon { background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); color: #7e22ce; }

        .stat-label {
          margin: 0 0 6px 0;
          font-size: 0.85rem;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 1.2px;
          font-weight: 700;
        }

        .stat-value {
          margin: 0;
          font-size: 2.2rem;
          color: var(--text-color);
          font-family: var(--font-serif);
          line-height: 1;
        }

        .dashboard-section {
          background-color: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(241, 236, 225, 0.6);
          padding: 35px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 1px solid #f1ece1;
          padding-bottom: 20px;
        }

        .section-header-row h3 {
          margin: 0;
          font-family: var(--font-serif);
          color: var(--primary-color);
          font-size: 1.3rem;
          letter-spacing: 1px;
          font-weight: 700;
        }

        .btn-text {
          background: none;
          border: none;
          color: var(--accent-color);
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          letter-spacing: 1.5px;
          transition: color 0.2s;
        }

        .btn-text:hover {
          color: var(--primary-color);
        }

        /* Enhanced Timeline Styles */
        .timeline-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
          position: relative;
        }
        
        .timeline-container::before {
          content: '';
          position: absolute;
          left: 105px;
          top: 15px;
          bottom: 15px;
          width: 2px;
          background-color: #f1ece1;
          z-index: 1;
        }

        .timeline-item {
          display: flex;
          gap: 30px;
          position: relative;
          z-index: 2;
        }

        .timeline-time {
          width: 90px;
          flex-shrink: 0;
          text-align: right;
          padding-top: 18px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
        }

        .time-text {
          font-weight: 700;
          color: var(--primary-color);
          font-size: 0.95rem;
        }
        
        .live-indicator {
          font-size: 0.65rem;
          font-weight: 800;
          color: #ffffff;
          background-color: #ef4444;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 1px;
          animation: pulse 1.5s infinite;
        }

        .timeline-card {
          flex: 1;
          background-color: #faf9f6;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
          transition: all 0.3s ease;
          border: 1px solid #f1ece1;
          border-left: 5px solid #d1d5db;
        }
        
        /* Status styling on timeline cards */
        .timeline-card.status-completed {
          border-left-color: #9ca3af;
          background-color: #fcfcfc;
          opacity: 0.8;
        }
        .timeline-card.status-now {
          border-left-color: #10b981;
          background-color: #f0fdf4;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.08);
          border-color: #bbf7d0;
        }
        .timeline-card.status-next {
          border-left-color: #3b82f6;
          background-color: #eff6ff;
          border-color: #bfdbfe;
        }
        .timeline-card.status-upcoming {
          border-left-color: #f59e0b;
        }

        .timeline-card:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .apt-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .patient-info h4 {
          margin: 0 0 4px 0;
          font-size: 1.15rem;
          color: var(--text-color);
          font-weight: 700;
        }

        .apt-service {
          font-size: 0.9rem;
          color: var(--text-light);
          font-weight: 500;
        }

        .timeline-status {
          font-size: 0.7rem;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .timeline-status.completed { background-color: #f3f4f6; color: #4b5563; display: flex; align-items: center; }
        .timeline-status.now { background-color: #d1fae5; color: #065f46; display: flex; align-items: center; gap: 4px; }
        .timeline-status.next { background-color: #dbeafe; color: #1e40af; }
        .timeline-status.upcoming { background-color: #fef3c7; color: #92400e; }
        
        .pulse-dot {
          width: 6px;
          height: 6px;
          background-color: #10b981;
          border-radius: 50%;
          display: inline-block;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.8; }
        }

        .info-text {
          font-size: 0.85rem;
          color: var(--text-light);
          font-weight: 500;
          display: flex;
          align-items: center;
        }

        .type-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 600;
        }
        .type-badge.online { background-color: #e0e7ff; color: #3730a3; }
        .type-badge.clinic { background-color: #f1f5f9; color: #475569; }

        .timeline-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          border-top: 1px solid rgba(241, 236, 225, 0.6);
          padding-top: 15px;
        }
        
        .quick-delays {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .quick-delays .delay-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-light);
          margin-right: 4px;
        }
        
        .btn-delay {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 4px 8px;
          font-size: 0.78rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          color: var(--text-color);
          transition: all 0.2s;
        }
        .btn-delay:hover:not(:disabled) {
          background-color: #faf6ee;
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        .footer-actions {
          display: flex;
          gap: 10px;
        }
        
        .btn-sm {
          padding: 8px 16px;
          font-size: 0.8rem;
          border-radius: 6px;
          font-weight: 600;
        }

        .empty-state {
          text-align: center;
          padding: 50px;
          color: var(--text-light);
          background-color: #faf9f6;
          border-radius: 12px;
          border: 2px dashed #e2e8f0;
          font-weight: 500;
        }

        /* Modals and Forms */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 16px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .modal-content h3 {
          margin: 0;
          color: var(--primary-color);
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 700;
        }

        .modal-form .form-group {
          margin-bottom: 16px;
        }

        .modal-form label {
          display: block;
          margin-bottom: 6px;
          font-size: 0.85rem;
          color: var(--text-color);
          font-weight: 600;
        }

        .modal-form input:not([type="checkbox"]), .modal-form select {
          width: 100%;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.95rem;
          background-color: #ffffff;
        }
        
        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          user-select: none;
          margin: 0;
        }
        
        .checkbox-container input[type="checkbox"] {
          width: 18px;
          height: 18px;
          margin: 0 10px 0 0 !important;
          cursor: pointer;
          accent-color: var(--primary-color);
          flex-shrink: 0;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        
        .btn-xs {
          padding: 6px 12px;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 4px;
        }
        
        .btn-icon {
          background: transparent !important;
          border: none !important;
          outline: none !important;
          color: var(--text-light);
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: none !important;
        }
        .btn-icon:hover {
          background-color: #f1ece1 !important;
          color: var(--primary-color) !important;
        }

        /* Premium Custom Checkbox */
        .custom-checkbox {
          display: flex;
          align-items: center;
          position: relative;
          padding-left: 28px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          user-select: none;
          margin: 0;
          height: 24px;
        }
        .custom-checkbox input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0; width: 0;
        }
        .checkmark {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          height: 18px;
          width: 18px;
          background-color: #ffffff;
          border: 2px solid #cbd5e1;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .custom-checkbox:hover input ~ .checkmark {
          border-color: var(--primary-color);
        }
        .custom-checkbox input:checked ~ .checkmark {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }
        .custom-checkbox input:checked ~ .checkmark:after {
          display: block;
        }
        .custom-checkbox .checkmark:after {
          left: 5px;
          top: 1px;
          width: 4px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .checkbox-text {
          margin-left: 4px;
        }

        @media (max-width: 768px) {
          .timeline-container::before {
            display: none;
          }
          .timeline-item {
            flex-direction: column;
            gap: 8px;
          }
          .timeline-time {
            text-align: left;
            width: 100%;
            align-items: flex-start;
            padding-top: 0;
          }
          .timeline-card {
            border-left: 4px solid #d1d5db;
            border-radius: 12px;
          }
        }
      `}</style>
    </div>
  );
}
