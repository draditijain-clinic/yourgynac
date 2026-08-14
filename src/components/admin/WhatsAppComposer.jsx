import React, { useState, useEffect } from 'react';
import { Send, Copy, X } from 'lucide-react';
import { API_CONFIG } from '../../config';

export default function WhatsAppComposer({ appointment, onClose }) {
  const [template, setTemplate] = useState('request_received');
  const [message, setMessage] = useState('');

  useEffect(() => {
    generateMessage(template);
  }, [template, appointment]);

  const generateMessage = (tmpl) => {
    let msg = '';
    const pName = appointment['Patient Name'] || '[Patient Name]';
    const reqDate = appointment['Requested Date'] || '[Date]';
    const reqTime = appointment['Requested Time'] || '[Time]';
    const confDate = appointment['Confirmed Date'] || '[Date]';
    const confTime = appointment['Confirmed Time'] || '[Time]';
    const service = appointment['Service'] || '[Service]';
    const consultType = appointment['Consultation Type'] || '[Consultation Type]';
    const bId = appointment['Booking ID'] || '[Booking ID]';
    const meetUrl = appointment['Meet URL'] || '[Meet URL]';

    switch(tmpl) {
      case 'request_received':
        msg = `Hello ${pName}, this is Dr. Aditi Jain's clinic.\n\nWe have received your appointment request for ${reqDate} at ${reqTime}.\n\nYour request is currently under review. We will confirm the appointment shortly.\n\nThank you for reaching out to us.\n\nDr. Aditi Jain\nMBBS, MS OBGY\nGynaecologist\nLaparoscopic Gynaecological Surgeon`;
        break;
      case 'confirmed':
        msg = `Hello ${pName}, this is Dr. Aditi Jain's clinic.\n\nYour consultation has been accepted.\n\nDate: ${confDate}\nTime: ${confTime} IST\nConsultation: ${consultType}\nService: ${service}\n\n`;
        if (consultType === 'Online Consultation' && meetUrl && meetUrl !== '[Meet URL]') {
          msg += `Google Meet Link:\n${meetUrl}\n\nPlease join 5 minutes before your appointment.\n\n`;
        } else if (consultType === 'Online Consultation') {
          msg += `Note: The Google Meet link and other details will be shared before the meeting and have also been auto-mailed to you.\n\n`;
        } else {
          msg += `Note: The consultation details have been auto-mailed to you.\n\n`;
        }
        msg += `Booking ID:\n${bId}\n\nIf you have any questions, please feel free to reply here.\n\nDr. Aditi Jain\nMBBS, MS OBGY\nGynaecologist\nLaparoscopic Gynaecological Surgeon`;
        break;
      case 'reminder':
        msg = `Hello ${pName}, a gentle reminder from Dr. Aditi Jain's clinic.\n\nYour appointment is scheduled for:\n${confDate}\n${confTime} IST\n\n`;
        if (consultType === 'Online Consultation') {
          msg += `Google Meet:\n${meetUrl}\n\nPlease join around 5 minutes before your appointment.\n\n`;
        }
        msg += `We look forward to speaking with you.`;
        break;
      case 'custom':
        msg = `Hello ${pName},\n\n\n\nDr. Aditi Jain Clinic`;
        break;
      default:
        msg = '';
    }
    setMessage(msg);
  };

  const handleOpenWhatsApp = () => {
    let phone = appointment['Phone'] || API_CONFIG.WHATSAPP;
    // Strip non-numeric chars
    phone = phone.replace(/[^0-9]/g, '');
    if (!phone.startsWith('91') && phone.length === 10) {
      phone = '91' + phone;
    }
    const encodedMsg = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMsg}`;
    window.open(url, '_blank');
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    alert("Message copied to clipboard!");
  };

  return (
    <div className="wa-modal-overlay">
      <div className="wa-modal-content">
        <div className="wa-header">
          <h3>Message Patient on WhatsApp</h3>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="wa-body">
          <p className="wa-patient">To: <strong>{appointment['Patient Name']}</strong> ({appointment['Phone']})</p>
          
          <div className="wa-form-group">
            <label>Template</label>
            <select value={template} onChange={(e) => setTemplate(e.target.value)}>
              <option value="request_received">Request Received</option>
              <option value="confirmed">Appointment Confirmed</option>
              <option value="reminder">Appointment Reminder</option>
              <option value="custom">Custom Message</option>
            </select>
          </div>

          <div className="wa-form-group">
            <label>Message Content</label>
            <textarea 
              className="wa-textarea" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              rows={12}
            />
          </div>
        </div>

        <div className="wa-footer">
          <button className="btn btn-outline" onClick={handleCopy}>
            <Copy size={16} style={{marginRight: '6px'}} /> COPY MESSAGE
          </button>
          <button className="btn wa-btn" onClick={handleOpenWhatsApp}>
            <Send size={16} style={{marginRight: '6px'}} /> OPEN WHATSAPP
          </button>
        </div>
      </div>

      <style>{`
        .wa-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2500;
        }

        .wa-modal-content {
          background-color: #ffffff;
          border-radius: 12px;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
        }

        .wa-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #25D366;
          color: white;
          padding: 20px 24px;
        }

        .wa-header h3 { margin: 0; font-size: 1.2rem; }

        .close-btn {
          background: none; border: none; color: white; cursor: pointer;
        }

        .wa-body {
          padding: 24px;
        }

        .wa-patient {
          margin: 0 0 20px 0;
          font-size: 0.95rem;
          color: var(--text-color);
        }

        .wa-form-group {
          margin-bottom: 20px;
        }

        .wa-form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-color);
        }

        .wa-form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.95rem;
        }

        .wa-textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.95rem;
          font-family: inherit;
          resize: vertical;
          line-height: 1.5;
        }

        .wa-footer {
          padding: 20px 24px;
          background-color: #f8fafc;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .wa-btn {
          background-color: #25D366;
          color: white;
          border: none;
        }
        .wa-btn:hover {
          background-color: #128C7E;
        }
      `}</style>
    </div>
  );
}
