import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft, Check, Sparkles, Video, Mail } from 'lucide-react';
import { API_CONFIG } from '../config';

export default function AppointmentForm({ setPage, setReservationData }) {
  const [step, setStep] = useState(1); // Steps: 1 (Date), 2 (Details), 3 (Confirm), 4 (Success)
  
  // Date selection state
  const [selectedDate, setSelectedDate] = useState('');
  const [checkingSlots, setCheckingSlots] = useState(false);
  const [holidayMessage, setHolidayMessage] = useState('');

  // Patient Details state
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [prevPatient, setPrevPatient] = useState('No');
  const [reason, setReason] = useState('');
  const [consentDisclaimer, setConsentDisclaimer] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);

  // Booking result states
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [bookingResult, setBookingResult] = useState(null);

  const todayStr = new Date().toLocaleDateString('en-CA');

  // Verify date availability (checking holidays) when date changes
  useEffect(() => {
    if (!selectedDate) return;
    verifyDateAvailability(selectedDate);
  }, [selectedDate]);

  const verifyDateAvailability = async (dateVal) => {
    setCheckingSlots(true);
    setError('');
    setHolidayMessage('');

    try {
      const response = await fetch(`${API_CONFIG.SCRIPT_URL}?action=getHolidays`);
      const result = await response.json();
      
      let isHoliday = false;
      let holidayReason = "";

      if (result.success && Array.isArray(result.data)) {
        const match = result.data.find(holiday => {
          const from = holiday.dateFrom || holiday.date || holiday.from;
          const to = holiday.dateTo || from;
          return dateVal >= from && dateVal <= to;
        });
        if (match) {
          isHoliday = true;
          holidayReason = match.reason || "Clinic Closed";
        }
      }

      if (isHoliday) {
        setHolidayMessage(`⚠️ The clinic is closed on ${dateVal} (${holidayReason}). Booking is not possible on this date. Please select another date.`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingSlots(false);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedDate) {
        setError('Please select an appointment date.');
        return;
      }
      if (holidayMessage) {
        setError(holidayMessage);
        return;
      }
      setError('');
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2) {
      if (!fullName.trim() || !age || !phone.trim() || !email.trim()) {
        setError('Please fill in all required patient fields.');
        return;
      }
      if (!consentDisclaimer || !consentPrivacy) {
        setError('You must agree to the medical disclaimer and privacy policy.');
        return;
      }
      setError('');
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBookingConfirm = async () => {
    if (submitting) return;
    
    // Check if this specific booking was already submitted recently
    const idempotencyKey = `booking_${phone.trim()}_${selectedDate}`;
    if (sessionStorage.getItem(idempotencyKey) === 'submitted') {
      setError('You have already submitted a request for this date. Please wait for confirmation.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(API_CONFIG.SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'createBooking',
          intentId: idempotencyKey, // Used by server for deduplication
          patientName: fullName.trim(),
          age: parseInt(age),
          phone: phone.trim(),
          email: email.trim(),
          service: prevPatient === 'Yes' ? 'Follow-up Consultation' : 'New Patient Consultation',
          requestedDate: selectedDate,
          requestedTime: "Flexible/TBD", 
          consultationType: "Online Consultation", 
          message: reason.trim(),
          city: city.trim()
        })
      });

      const result = await response.json();

      if (result.success) {
        sessionStorage.setItem(idempotencyKey, 'submitted');
        setBookingResult(result);
        setReservationData(result);
        setStep(4);
      } else {
        setError(result.message || 'We could not complete your booking. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Your online consultation has not been confirmed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStepClass = (stepNum) => {
    if (step === stepNum) return 'indicator-step active';
    if (step > stepNum || step === 4) return 'indicator-step done';
    return 'indicator-step';
  };

  return (
    <section className="booking-page-section">
      <div className="container">
        
        {/* Step Stepper Indicator */}
        <div className="stepper-indicator">
          <div className={getStepClass(1)}>
            <span className="step-badge">01</span>
            <span className="step-label">Select Date</span>
          </div>
          <div className="step-line"></div>
          <div className={getStepClass(2)}>
            <span className="step-badge">02</span>
            <span className="step-label">Patient Details</span>
          </div>
          <div className="step-line"></div>
          <div className={getStepClass(3)}>
            <span className="step-badge">03</span>
            <span className="step-label">Confirm</span>
          </div>
          <div className="step-line"></div>
          <div className={getStepClass(4)}>
            <span className="step-badge">04</span>
            <span className="step-label">Success</span>
          </div>
        </div>

        {error && <div className="error-alert fade-in-down" style={{ maxWidth: '580px', margin: '0 auto 20px' }}>{error}</div>}

        {/* STEP 1: DATE SELECTOR */}
        {step === 1 && (
          <div className="form-container fade-in-down">
            <div className="form-header">
              <h1>Select Consultation Date</h1>
              <p>Consultations are conducted exclusively via secure Google Meet video calls.</p>
            </div>

            <div className="form-group">
              <label htmlFor="appt-date">Preferred Date</label>
              <input 
                type="date" 
                id="appt-date" 
                min={todayStr}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {checkingSlots && <p className="status-txt">Checking calendar availability...</p>}
            {holidayMessage && <p className="holiday-alert-txt">{holidayMessage}</p>}

            <div className="step-navigation-actions" style={{ justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={handleNextStep} disabled={checkingSlots || !!holidayMessage}>
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PATIENT DETAILS */}
        {step === 2 && (
          <div className="form-container fade-in-down">
            <div className="form-header">
              <h1>Patient Information</h1>
              <p>Please enter the patient's credentials below.</p>
            </div>

            <div className="form-group">
              <label htmlFor="p-name">Full Name *</label>
              <input 
                type="text" 
                id="p-name" 
                placeholder="Patient's legal name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="p-age">Age (Years) *</label>
              <input 
                type="number" 
                id="p-age" 
                placeholder="e.g. 28"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="p-phone">Phone Number (WhatsApp) *</label>
              <input 
                type="tel" 
                id="p-phone" 
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="p-email">Email Address *</label>
              <input 
                type="email" 
                id="p-email" 
                placeholder="yourname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="p-city">City</label>
              <input 
                type="text" 
                id="p-city" 
                placeholder="e.g. Jaipur"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Have you consulted Dr. Aditi Jain before?</label>
              <div className="radio-group-horizontal">
                <label className="radio-box">
                  <input 
                    type="radio" 
                    name="prev-p" 
                    value="No" 
                    checked={prevPatient === 'No'} 
                    onChange={() => setPrevPatient('No')}
                  /> No, this is my first visit
                </label>
                <label className="radio-box">
                  <input 
                    type="radio" 
                    name="prev-p" 
                    value="Yes"
                    checked={prevPatient === 'Yes'}
                    onChange={() => setPrevPatient('Yes')}
                  /> Yes, I am follow-up patient
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="p-reason">Message / Reason for Consultation</label>
              <textarea 
                id="p-reason" 
                rows="3" 
                placeholder="Brief symptoms or question (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginTop: '30px' }}>
              <label className="checkbox-group">
                <input 
                  type="checkbox" 
                  checked={consentDisclaimer}
                  onChange={(e) => setConsentDisclaimer(e.target.checked)}
                />
                <span>I understand that this booking request is for a video consultation and does not constitute emergency medical care. *</span>
              </label>

              <label className="checkbox-group">
                <input 
                  type="checkbox" 
                  checked={consentPrivacy}
                  onChange={(e) => setConsentPrivacy(e.target.checked)}
                />
                <span>I agree to the clinic's privacy policy. *</span>
              </label>
            </div>

            <div className="step-navigation-actions">
              <button className="btn btn-outline" onClick={handlePrevStep}>
                <ChevronLeft size={16} /> Back
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleNextStep}
                disabled={!consentDisclaimer || !consentPrivacy}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUMMARY & VERIFICATION */}
        {step === 3 && (
          <div className="form-container fade-in-down" style={{ maxWidth: '620px' }}>
            <div className="form-header">
              <h1>Verify Details</h1>
              <p>Review details before scheduling your online video consultation.</p>
            </div>

            <div className="summary-list">
              <div className="summary-row">
                <span className="summary-label">Doctor</span>
                <span className="summary-value">{API_CONFIG.DOCTOR_NAME}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Consultation Type</span>
                <span className="summary-value"><strong>Online Video Consultation</strong></span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Appointment Date</span>
                <span className="summary-value"><strong>{selectedDate}</strong></span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Patient Name</span>
                <span className="summary-value">{fullName} ({age} YRS)</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Mobile Number</span>
                <span className="summary-value">{phone}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Email Address</span>
                <span className="summary-value">{email}</span>
              </div>
            </div>

            <div className="step-navigation-actions" style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={handlePrevStep} disabled={submitting}>
                <ChevronLeft size={16} /> Back
              </button>
              <button className="btn btn-primary" onClick={handleBookingConfirm} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Confirm Video Appointment'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS RECEIPT */}
        {step === 4 && bookingResult && (
          <div className="form-container fade-in-down success-container" style={{ maxWidth: '620px', textAlign: 'center' }}>
            <div className="success-icon-badge">
              <Check size={40} color="var(--white)" />
            </div>
            <h2>Video Session Scheduled</h2>
            <p className="success-lead">We have sent your Google Meet consultation link to your email at <strong>{email}</strong>.</p>
            
            <div className="receipt-box">
              <div className="receipt-ref-id">
                Booking ID: {bookingResult.bookingId || bookingResult.appointmentId}
              </div>
              
              <div className="receipt-row">
                <span className="receipt-label">Doctor</span>
                <span className="receipt-value">{API_CONFIG.DOCTOR_NAME}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Type</span>
                <span className="receipt-value">Online Video Consultation</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Date</span>
                <span className="receipt-value">{selectedDate}</span>
              </div>

              {bookingResult.meetUrl && (
                <div className="meet-url-box" style={{ marginTop: '25px' }}>
                  <h5>Google Meet Link</h5>
                  <p>Your secure virtual consult channel is active:</p>
                  <a href={bookingResult.meetUrl} target="_blank" rel="noopener noreferrer" className="meet-link-btn">
                    Join Video Consultation
                  </a>
                </div>
              )}
            </div>

            <div className="success-cta-box" style={{ marginTop: '30px' }}>
              <button onClick={() => setPage('home')} className="btn btn-primary" style={{ width: '100%' }}>
                Back to Home
              </button>
            </div>
          </div>
        )}

      </div>

      {submitting && (
        <div className="global-preloader">
          <div className="loader-pulse"></div>
          <p style={{ marginTop: '20px', fontWeight: '600', color: 'var(--text-color)', fontFamily: 'var(--font-sans)', zIndex: 10 }}>Booking your appointment...</p>
        </div>
      )}

      <style>{`
        .booking-page-section {
          padding: 80px 0;
          background-color: var(--bg-color);
        }

        .stepper-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 680px;
          margin: 0 auto 50px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .indicator-step {
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0.4;
          transition: var(--transition-smooth);
        }

        .indicator-step.active {
          opacity: 1;
        }

        .indicator-step.done {
          opacity: 0.8;
          color: var(--accent-color);
        }

        .step-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid var(--text-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .indicator-step.active .step-badge {
          background-color: var(--primary-color);
          color: var(--white);
          border-color: var(--primary-color);
        }

        .indicator-step.done .step-badge {
          background-color: var(--accent-color);
          color: var(--white);
          border-color: var(--accent-color);
        }

        .step-label {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .step-line {
          width: 40px;
          height: 1px;
          background-color: rgba(92, 29, 36, 0.15);
        }

        .status-txt {
          padding: 15px 0;
          color: var(--text-light);
          font-size: 0.9rem;
          font-style: italic;
        }

        .holiday-alert-txt {
          padding: 15px;
          color: #d63031;
          background-color: #fdeded;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .radio-group-horizontal {
          display: flex;
          gap: 20px;
          margin-top: 5px;
        }

        .radio-box {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .radio-box input {
          cursor: pointer;
        }

        .step-navigation-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 35px;
          border-top: 1px solid #f1ece1;
          padding-top: 25px;
        }

        .summary-list {
          background-color: var(--bg-color);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #f1ece1;
          text-align: left;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #f5efeb;
          font-size: 0.95rem;
          gap: 15px;
        }

        .summary-row:last-child {
          border-bottom: none;
        }

        .summary-label {
          color: var(--text-light);
        }

        .summary-value {
          color: var(--text-color);
          font-weight: 500;
          text-align: right;
          word-break: break-word;
        }

        .success-icon-badge {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: #2ecc71;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .success-container h2 {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          color: var(--primary-color);
          margin-bottom: 10px;
        }

        .success-lead {
          font-size: 1rem;
          color: var(--text-light);
          margin-bottom: 30px;
        }

        .receipt-box {
          background-color: #faf9f6;
          border: 1px solid #f1ece1;
          border-radius: 12px;
          padding: 24px;
          text-align: left;
        }

        .receipt-ref-id {
          font-family: monospace;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--primary-color);
          text-align: center;
          padding-bottom: 15px;
          border-bottom: 1px dashed #e5e0d8;
          margin-bottom: 15px;
        }

        .receipt-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 0.95rem;
          gap: 15px;
        }

        .receipt-label {
          color: var(--text-light);
        }

        .receipt-value {
          color: var(--text-color);
          font-weight: 500;
          text-align: right;
          word-break: break-word;
        }

        .meet-url-box h5 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 4px;
        }

        .meet-url-box p {
          font-size: 0.8rem;
          color: var(--text-light);
          margin-bottom: 12px;
        }

        .meet-link-btn {
          display: inline-block;
          background-color: var(--primary-color);
          color: var(--white);
          text-decoration: none;
          padding: 10px 24px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 600;
          transition: var(--transition-smooth);
        }

        .meet-link-btn:hover {
          background-color: var(--primary-dark);
        }

        /* Hide number input spinners & disable accidental mousewheel scrolling */
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        input[type=number] {
          -moz-appearance: textfield;
        }

        @media (max-width: 768px) {
          .stepper-indicator {
            gap: 5px;
          }
          .step-line {
            width: 15px;
          }
        }
      `}</style>
    </section>
  );
}
