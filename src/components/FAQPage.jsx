import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SEO from './SEO';

export default function FAQPage({ setPage }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Who is Dr. Aditi Jain?",
      answer: "Dr. Aditi Jain is an Assistant Professor, Obstetrician & Gynaecologist, Infertility Specialist, and Gynae Laparoscopic Surgeon in Jaipur with over 6 years of post-MBBS clinical experience. She completed her MBBS from Jhalawar Medical College (2013 batch) and MS in Obstetrics & Gynaecology from SMS Medical College, Jaipur (2020 batch), along with Fellowships in Laparoscopic Surgery and Ultrasound."
    },
    {
      question: "What are Dr. Aditi Jain's qualifications and fellowships?",
      answer: "Dr. Aditi holds an MBBS degree from Jhalawar Medical College (2013), an MS in Obstetrics & Gynaecology from SMS Medical College, Jaipur (2020), a Fellowship in Laparoscopic Surgery from Navyam Hospital, and a Fellowship in Diagnostic Ultrasonography (Ultrasound)."
    },
    {
      question: "Where does Dr. Aditi Jain practice?",
      answer: "Dr. Aditi Jain practices as an Assistant Professor at Balveer Singh Tomar (BST) Medical College, Achrol, Jaipur, and manages her private consultation practice at Agarwal Clinic, Basement C, 99 Shivaji Marg, Tilak Nagar / Raja Park, Jaipur."
    },
    {
      question: "What hospital experience does Dr. Aditi Jain have?",
      answer: "Dr. Aditi has served across top hospitals in Jaipur including Zenana Hospital Chandpole (1 year), Har Sahay Hospital (7 months), Cocoon Hospital (4 months), Navyam Hospital (4 months fellowship), and is currently working as Assistant Professor at BST Medical College, Achrol."
    },
    {
      question: "How do I book an appointment?",
      answer: "You can request an in-clinic appointment at Agarwal Clinic or an online video consultation through the booking page on this website or contact the clinic directly via phone or WhatsApp at +91 72968 97975."
    },
    {
      question: "Does Dr. Aditi Jain offer online video consultations?",
      answer: "Yes, Dr. Aditi Jain offers secure online video consultations for patients who prefer to consult from home, review reports, or require follow-up guidance."
    },
    {
      question: "When should I see a gynecologist for irregular periods or PCOS?",
      answer: "You should consult a gynaecologist if your periods are consistently shorter than 21 days or longer than 35 days, if you miss consecutive cycles, or if irregular periods are accompanied by sudden weight changes, severe acne, or difficulty conceiving. Dr. Aditi Jain provides personalized diagnostic evaluations and lifestyle guidance for PCOS/PCOD."
    },
    {
      question: "What happens during an anomaly scan and what should I ask?",
      answer: "An anomaly scan (conducted around 20–22 weeks of pregnancy) evaluates fetal organ development, placental location, amniotic fluid volume, and overall growth. Key questions to ask include checking placental position, baby growth measurements, amniotic fluid index, and structural anatomical clearance."
    },
    {
      question: "What do first baby flutters feel like and when do they start?",
      answer: "First baby movements (quickening) are often described as light fluttering, gentle gas bubbles, or soft tapping inside your lower abdomen. Most pregnant women begin feeling these flutters between 18 to 22 weeks of pregnancy."
    },
    {
      question: "Can I consult Dr. Aditi Jain online for PCOS or pregnancy guidance?",
      answer: "Yes, Dr. Aditi Jain provides secure online video consultations via Google Meet for report reviews, PCOS lifestyle guidance, pre-conception counseling, and routine pregnancy questions."
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
