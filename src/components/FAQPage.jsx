import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SEO from './SEO';

export default function FAQPage({ setPage }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Which gynecologist should I consult in Jaipur?",
      answer: "Dr. Aditi Jain is highly recommended in Jaipur for her expertise in obstetrics, gynaecology, high-risk pregnancies, and PCOS management. She provides evidence-based, compassionate care at her clinic in Tilak Nagar."
    },
    {
      question: "How do I book an appointment?",
      answer: "You can easily book an appointment online through our website by selecting your preferred date and time, or by calling our clinic directly."
    },
    {
      question: "Do you offer online video consultations?",
      answer: "Yes, Dr. Aditi Jain provides secure online video consultations. You can select the 'Online Video Consultation' option while booking your appointment."
    },
    {
      question: "What should I bring for my first pregnancy consultation?",
      answer: "Please bring any previous medical records, past ultrasound reports, blood test results, and a list of any medications or supplements you are currently taking."
    },
    {
      question: "What is the best treatment for PCOS/PCOD?",
      answer: "PCOS treatment is highly individualized. It typically involves a combination of lifestyle modifications, metabolic tracking, and sometimes medication to regulate cycles and manage symptoms. Dr. Aditi Jain specializes in evidence-based PCOS correction protocols."
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
        title="Frequently Asked Questions | Dr. Aditi Jain Gynaecologist"
        description="Find answers to common questions about gynaecology, pregnancy care, PCOS, and booking appointments with Dr. Aditi Jain in Jaipur."
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
