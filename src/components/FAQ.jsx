import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { API_CONFIG } from '../config';

export default function FAQ() {
  const faqs = [
    {
      q: "How do I book an appointment?",
      a: `You can schedule an appointment by navigating to the "Book Appointment" tab, selecting your preferred date, and providing your details. All consultations are held via secure video calls.`
    },
    {
      q: "Can I book an online consultation?",
      a: "Yes. Dr. Aditi Jain offers secure online video consultations exclusively. You will receive a secure Google Meet conference link directly upon booking."
    },
    {
      q: "How do I receive the Google Meet link?",
      a: "The Google Meet link is generated automatically by our calendar system and is shown immediately on the booking success page. It is also included in your confirmation email."
    },
    {
      q: "Can I reschedule?",
      a: `Yes. To reschedule your booking, please get in touch with the clinic team directly via email (${API_CONFIG.EMAIL}) with your Booking Reference ID, and we will update your date details.`
    },
    {
      q: "Can I cancel my appointment?",
      a: "Yes. Cancellations must be requested at least 24 hours prior to the date. You can request cancellation through the secure cancellation link provided in your confirmation email."
    },
    {
      q: "What happens if I miss my consultation?",
      a: `If you miss your scheduled consult, please contact the clinic via email (${API_CONFIG.EMAIL}) as soon as possible to book an alternative date.`
    },
    {
      q: "What should I prepare before an online consultation?",
      a: "Please ensure you have a smartphone or laptop with a stable internet connection, functional camera, and microphone. Place yourself in a private, quiet room. Have any recent prescription sheets or lab records handy."
    },
    {
      q: "Where is the clinic?",
      a: `Our administrative office is located at: ${API_CONFIG.CLINIC_FACILITY}, ${API_CONFIG.CLINIC_ADDRESS}. Please note that all patient consultations are conducted remotely online via secure video conferencing.`
    },
    {
      q: "What should I do in an emergency?",
      a: "This website and scheduling portal do NOT handle emergency medical situations. If you are experiencing a medical emergency, please call your local emergency number or proceed immediately to the nearest hospital emergency ward."
    }
  ];

  const [activeIdx, setActiveIdx] = useState(null);

  const toggleFaq = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header">
          <span className="tagline">Got Questions?</span>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button 
                  className="faq-question" 
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <Plus className="faq-icon" size={18} />
                </button>
                <div 
                  className="faq-answer"
                  style={{ maxHeight: isOpen ? '250px' : '0px' }}
                >
                  <div className="faq-answer-inner">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-section {
          padding: 80px 0;
          background-color: var(--white);
          text-align: center;
        }

        .faq-list {
          max-width: 800px;
          margin: 40px auto 0;
          display: flex;
          flex-direction: column;
          gap: 15px;
          text-align: left;
        }

        .faq-item {
          border: 1px solid rgba(92, 29, 36, 0.06);
          border-radius: var(--border-radius);
          background-color: var(--white);
          overflow: hidden;
          transition: var(--transition-smooth);
        }

        .faq-item:hover {
          border-color: var(--primary-color);
          box-shadow: var(--shadow-sm);
        }

        .faq-question {
          width: 100%;
          border: none;
          background: transparent;
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 1.05rem;
          color: var(--text-color);
          user-select: none;
          text-align: left;
        }

        .faq-answer {
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          padding: 0 24px;
          color: var(--text-light);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .faq-answer-inner {
          padding-bottom: 24px;
        }

        .faq-icon {
          transition: transform 0.3s ease;
          color: var(--text-light);
          flex-shrink: 0;
        }

        .faq-item.active .faq-icon {
          transform: rotate(45deg);
          color: var(--primary-color);
        }

        .faq-item.active {
          border-color: var(--primary-color);
          background-color: var(--primary-light);
        }
      `}</style>
    </section>
  );
}
