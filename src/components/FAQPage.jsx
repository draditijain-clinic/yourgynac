import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SEO from './SEO';

export default function FAQPage({ setPage }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Who is Dr. Aditi Jain?",
      answer: "Dr. Aditi Jain is a Consultant Obstetrician & Gynaecologist in Jaipur with MBBS and MS OBGY qualifications from SMS Medical College, Jaipur, specializing in women's health, pregnancy care, and laparoscopic gynaecological surgery."
    },
    {
      question: "Where is Dr. Aditi Jain's clinic?",
      answer: "Dr. Aditi Jain consults at Agarwal Clinic, located at Basement C, 99 Shivaji Marg, Tilak Nagar, Jaipur, Rajasthan 302004."
    },
    {
      question: "How do I book an appointment?",
      answer: "You can request an appointment online through the booking page on this website or contact the clinic directly via phone or WhatsApp at +91 72968 97975."
    },
    {
      question: "Does Dr. Aditi Jain offer online consultation?",
      answer: "Yes, Dr. Aditi Jain offers secure online video consultations for patients who prefer to consult from home, review reports, or require follow-ups."
    },
    {
      question: "How does online consultation work?",
      answer: "After requesting an online slot, your request is reviewed by the clinic coordinator. Upon confirmation, you receive confirmation details and a Google Meet link to join the video session at your scheduled time."
    },
    {
      question: "Which women's health concerns can I discuss?",
      answer: "You can consult for PCOS/PCOD management, period and menstrual irregularities, pregnancy and antenatal care, pre-conception planning, hormonal imbalances, pelvic health, menopause transitions, and general gynaecological concerns."
    },
    {
      question: "Where is Agarwal Clinic in Jaipur?",
      answer: "Agarwal Clinic is located in Tilak Nagar (Suraj Nagar area), Jaipur, conveniently accessible via Shivaji Marg."
    },
    {
      question: "How can I contact the clinic?",
      answer: "You can call or WhatsApp the clinic at +91 72968 97975 or email draditijainclinic96@gmail.com."
    },
    {
      question: "Can I request an evening appointment?",
      answer: "Yes, regular clinic consulting hours are Monday through Saturday from 5:00 PM to 8:00 PM."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="faq-page-section">
      <SEO 
        title="Women's Health & Appointment FAQs | Dr. Aditi Jain"
        description="Frequently asked questions about booking consultations, online video calls, clinic location, and services with Dr. Aditi Jain in Jaipur."
        path="/faq"
        schema={schema}
      />
      <div className="container fade-in-down">
        <div className="section-header">
          <span className="tagline">PATIENT GUIDE</span>
          <h2>Frequently Asked Questions</h2>
          <p>Common questions about our clinic, consultations, and treatments.</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`}>
              <div className="faq-header" onClick={() => toggleFaq(index)}>
                <h3>{faq.question}</h3>
                <span className="faq-icon">
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </div>
              <div className="faq-body" style={{ display: openIndex === index ? 'block' : 'none' }}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .faq-page-section {
          padding: 100px 0;
          background-color: var(--white);
          min-height: 80vh;
        }
        .faq-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .faq-item {
          background-color: #fcfcf9;
          border: 1px solid #f1ece1;
          border-radius: var(--border-radius);
          overflow: hidden;
          transition: var(--transition-smooth);
        }
        .faq-item.active {
          border-color: var(--primary-color);
          box-shadow: var(--shadow-sm);
        }
        .faq-header {
          padding: 20px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background-color: #fff;
        }
        .faq-header h3 {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          color: var(--primary-color);
          margin: 0;
          font-weight: 600;
        }
        .faq-icon {
          color: var(--primary-color);
        }
        .faq-body {
          padding: 0 25px 25px 25px;
          background-color: #fff;
        }
        .faq-body p {
          color: var(--text-light);
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
