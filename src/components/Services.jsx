import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import SEO from './SEO';

export default function Services({ setPage }) {
  const services = [
    {
      id: "menstrual",
      title: "Menstrual Health",
      brief: "Guidance and treatment plans for painful, heavy, or irregular cycles to restore comfort and hormonal balance.",
      whatItIs: "Menstrual health consultations address irregular bleeding, severe cramps (dysmenorrhea), heavy flows (menorrhagia), and premenstrual syndrome (PMS) using medical therapies and lifestyle tracking.",
      whenToConsider: [
        "Your cycles are consistently shorter than 21 days or longer than 35 days",
        "You experience debilitating pain that interferes with daily tasks",
        "Bleeding lasts longer than 7 days or is unusually heavy",
        "You miss multiple cycles consecutively"
      ],
      includes: [
        "Detailed review of your cycle history and symptoms",
        "Physical assessment and recommendation for pelvic ultrasound if indicated",
        "Hormonal panel evaluations if necessary",
        "Individually tailored pharmacological or lifestyle correction plan"
      ],
      prepare: "Note down the dates of your last three cycles, track any symptoms (cramping, mood changes), and compile list of current supplements."
    },
    {
      id: "pcos",
      title: "PCOS/PCOD Care",
      desc: "Evidence-based management strategies for Polycystic Ovary Syndrome addressing metabolic and ovulation symptoms.",
      brief: "Tailored management for Polycystic Ovary Syndrome, focusing on metabolic tracking, cycle regulation, and ovulation support.",
      whatItIs: "Polycystic Ovary Syndrome (PCOS) is a common endocrine challenge. We focus on evidence-based strategies to address insulin sensitivity, cycle regularity, acne/hirsutism, and fertility planning.",
      whenToConsider: [
        "Irregular, skipped, or highly delayed periods",
        "Difficulty conceiving after regular trying",
        "Sudden acne flareups, weight gains, or thinning hair",
        "Family history of insulin resistance or PCOS"
      ],
      includes: [
        "Metabolic health review (glucose, insulin, lipid panels)",
        "Ovulation tracking and cycle regulation strategies",
        "Weight management guidance aligned with hormone health",
        "Fertility planning for ovulation induction if desired"
      ],
      prepare: "Bring copies of any past hormone blood reports, lipid profile tests, or pelvic ultrasound reports."
    },
    {
      id: "pregnancy",
      title: "Pregnancy Care",
      brief: "Antenatal screening, maternal support, and high-risk pregnancy diagnostics for a safe transition.",
      whatItIs: " Antenatal care involves continuous tracking of maternal and fetal well-being. We coordinate routine screening schedules, high-risk diagnostics, and safe delivery planning.",
      whenToConsider: [
        "You have confirmed a pregnancy with a home test or lab test",
        "You are planning a pregnancy and require pre-conception checks",
        "You have a history of gestational hypertension, diabetes, or recurrent loss"
      ],
      includes: [
        "Regular clinical examinations and fetal growth monitoring",
        "Coordination of genetic screenings and anomaly scans",
        "Gestational diabetes and blood pressure controls",
        "Delivery planning and postpartum recovery consultations"
      ],
      prepare: "Bring your pregnancy test details, list of all daily medications, and previous obstetric records if any."
    },
    {
      id: "fertility",
      title: "Fertility Guidance",
      brief: "Diagnostic screening, ovulation checks, and initial reproductive pathways for family planning.",
      whatItIs: "Infertility assessments help couples trace ovulation, hormonal, or structural factors limiting conception, establishing initial pathways like ovulation induction and follicular tracking.",
      whenToConsider: [
        "Unable to conceive after 12 months of regular, unprotected trying (6 months if age is over 35)",
        "History of irregular cycles alongside trying to conceive",
        "Previous diagnoses of tubal or pelvic challenges"
      ],
      includes: [
        "Ovarian reserve testing and ovulation documentation",
        "Coordination of semen analysis and tubal patency tests (HSG)",
        "Follicular monitoring via pelvic scans",
        "Ovulation induction medication plans"
      ],
      prepare: "Both partners should attend the initial consult. Bring all past reproductive health records and menstrual tracking calendars."
    },
    {
      id: "hormonal",
      title: "Hormonal Health",
      brief: "Management of thyroid variations, pre-menopause cycles, and metabolic hormone adjustments.",
      whatItIs: "Hormonal health addresses variations in thyroid function, prolactin levels, and sex hormones (estrogen, progesterone) that impact energy, mood, cycles, and bone health.",
      whenToConsider: [
        "Unexplained fatigue, weight shifts, or temperature sensitivities",
        "Hot flashes, night sweats, or mood swings during pre-menopause years",
        "Unexpected breast discharge or skin changes"
      ],
      includes: [
        "Comprehensive endocrine blood panel analysis",
        "Symptomatic management of perimenopause transition",
        "Thyroid health adjustment strategies",
        "Dietary and metabolic support recommendations"
      ],
      prepare: "List your symptoms with details on when they started and how severely they impact your daily routine."
    },
    {
      id: "preventive",
      title: "Women's Preventive Health",
      brief: "Cervical screenings (Pap test), breast exams, and risk factor checks for overall wellness.",
      whatItIs: "Preventive health aims to screen for risks before symptoms arise. It focuses on cancer screenings, vaccine updates, and basic cardiovascular/bone health tracking.",
      whenToConsider: [
        "You are due for your routine Pap smear (typically every 3 years)",
        "You want to discuss HPV vaccination updates",
        "You require clinical breast examinations or mammography referrals"
      ],
      includes: [
        "Clinical breast exam and self-exam training",
        "Pap smear collection & HPV co-testing coordination",
        "Bone density risk evaluation & lipid checks",
        "General health counseling for cardiovascular wellness"
      ],
      prepare: "Schedule this consult when you are NOT on your period for accurate screening results."
    },
    {
      id: "adolescent",
      title: "Adolescent Women's Health",
      brief: "Support for irregular early periods, pain management, and reproductive health education.",
      whatItIs: "Adolescent gynaecology provides gentle care for teens navigating their first period, severe cramps, irregular cycles, or initial hormone variations in a reassuring environment.",
      whenToConsider: [
        "Periods have not started by age 15",
        "Severe cramps that cause school absences",
        "Irregular periods lasting more than 2 years after starting"
      ],
      includes: [
        "Gentle, non-invasive assessment of young patient concerns",
        "Education on cycle tracking and anatomy",
        "Safe pharmacological relief for severe pain",
        "Counseling for healthy cycle habits"
      ],
      prepare: "Parental attendance is welcome. Write down any questions the teenager has so she feels comfortable asking."
    },
    {
      id: "sexual",
      title: "Sexual & Reproductive Health",
      brief: "Contraceptive options counseling, infection screening (STI), and pelvic health wellness.",
      whatItIs: "This service addresses contraception planning, pelvic pain diagnostics, vaginal health/infections, and STI screening with total confidentiality.",
      whenToConsider: [
        "You want to discuss family planning and birth control options",
        "You experience pelvic pain or discomfort during intercourse",
        "You have symptoms of unusual discharge, itching, or irritation"
      ],
      includes: [
        "Contraceptive methods counseling (pills, IUDs, barriers)",
        "Confidential screening and treatment for pelvic infections",
        "STI screening and prevention education",
        "Vaginal health and microbiome support guidance"
      ],
      prepare: "Write down your questions about birth control or symptoms. You can share this in complete confidence."
    }
  ];

  const [selectedService, setSelectedService] = useState(null);

  const handleBookService = (serviceTitle) => {
    setSelectedService(null);
    setPage('appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="services-section">
      <SEO 
        title="Gynaecology & Women's Health Services in Jaipur | Dr. Aditi Jain"
        description="Explore women's health and gynaecological consultation areas offered by Dr. Aditi Jain in Jaipur, including pregnancy, PCOS, menstrual and hormonal concerns."
        path="/services"
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalSpecialty",
          "name": "Obstetrics and Gynaecology Services in Jaipur",
          "url": "https://yourgynac.vercel.app/services"
        }}
      />
      <div className="container">
        
        <div className="section-header fade-in-down">
          <span className="tagline">JAIPUR CLINIC CONSULTATIONS</span>
          <h2>Gynaecology & Women's Health Services in Jaipur</h2>
          <p>Evidence-based diagnostic and treatment services suited for every stage of a woman's life.</p>
        </div>

        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={service.id} className="service-card slide-in-right" style={{ animationDelay: `${idx * 0.05}s` }}>
              <h3>{service.title}</h3>
              <p>{service.brief}</p>
              <div className="card-actions">
                <button 
                  className="btn-text" 
                  onClick={() => setSelectedService(service)}
                >
                  Learn Details
                </button>
                <button 
                  className="btn btn-outline card-btn"
                  onClick={() => handleBookService(service.title)}
                >
                  Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detailed View Panel */}
        {selectedService && (
          <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
            <div className="service-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedService(null)} aria-label="Close modal">
                <X size={20} />
              </button>
              
              <div className="modal-body">
                <span className="modal-eyebrow">SERVICES INFORMATION</span>
                <h2>{selectedService.title}</h2>
                
                <div className="modal-section">
                  <h4>What It Is</h4>
                  <p>{selectedService.whatItIs}</p>
                </div>

                <div className="modal-section">
                  <h4>When to Consider a Consultation</h4>
                  <ul>
                    {selectedService.whenToConsider.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h4>What the Consultation May Include</h4>
                  <ul>
                    {selectedService.includes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h4>What to Prepare</h4>
                  <p>{selectedService.prepare}</p>
                </div>

                <div className="modal-footer-actions">
                  <button className="btn btn-primary" onClick={() => handleBookService(selectedService.title)}>
                    <Calendar size={16} /> Book Appointment
                  </button>
                  <button className="btn btn-outline" onClick={() => setSelectedService(null)}>
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .services-section {
          padding: 80px 0;
          background-color: var(--white);
          text-align: left;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }

        .service-card {
          background-color: var(--white);
          padding: 40px;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
          border: 1px solid #f1ece1;
          display: flex;
          flex-direction: column;
          transition: var(--transition-smooth);
        }

        .service-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary-color);
          box-shadow: var(--shadow-md);
        }

        .service-card h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--primary-color);
          margin-bottom: 12px;
          font-weight: 600;
        }

        .service-card p {
          font-size: 0.95rem;
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 25px;
          flex-grow: 1;
        }

        .card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
          gap: 15px;
          width: 100%;
        }

        .card-btn {
          padding: 10px 22px;
          font-size: 0.85rem;
          border-radius: 30px;
          border: 1px solid var(--primary-color) !important;
          background-color: transparent !important;
          color: var(--primary-color) !important;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .card-btn:hover {
          background-color: var(--primary-color) !important;
          color: var(--white) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        
        .btn-text {
          background: transparent !important;
          border: none !important;
          outline: none !important;
          cursor: pointer;
          font-size: 0.9rem;
          color: var(--primary-color);
          font-weight: 600;
          padding: 8px 0;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: var(--transition-smooth);
        }

        .btn-text:hover {
          color: var(--primary-dark);
          text-underline-offset: 6px;
        }

        /* Modal Layout */
        .service-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(44, 44, 44, 0.45);
          backdrop-filter: blur(2px);
          z-index: 10000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .service-modal-content {
          background: var(--white);
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: var(--border-radius);
          padding: 40px;
          position: relative;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(92, 29, 36, 0.05);
          text-align: left;
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--text-light);
          padding: 5px;
          transition: var(--transition-smooth);
        }

        .modal-close:hover {
          color: var(--primary-color);
        }

        .modal-eyebrow {
          font-size: 0.75rem;
          color: var(--accent-color);
          font-weight: 600;
          letter-spacing: 2px;
          display: block;
          margin-bottom: 10px;
        }

        .modal-body h2 {
          font-family: var(--font-serif);
          font-size: 2.4rem;
          color: var(--primary-color);
          margin-bottom: 25px;
          line-height: 1.2;
        }

        .modal-section {
          margin-bottom: 25px;
        }

        .modal-section h4 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--primary-color);
          margin-bottom: 10px;
          font-weight: 600;
        }

        .modal-section p {
          font-size: 0.95rem;
          color: var(--text-light);
          line-height: 1.6;
        }

        .modal-section ul {
          list-style: none;
          padding: 0;
        }

        .modal-section li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 8px;
          font-size: 0.95rem;
          color: var(--text-light);
          line-height: 1.5;
        }

        .modal-section li::before {
          content: "✓";
          color: var(--accent-color);
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .modal-footer-actions {
          display: flex;
          gap: 15px;
          margin-top: 35px;
          border-top: 1px solid #f1ece1;
          padding-top: 25px;
        }

        @media (max-width: 576px) {
          .service-modal-content {
            padding: 30px 20px;
          }
          .modal-footer-actions {
            flex-direction: column;
            gap: 10px;
          }
          .modal-footer-actions button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
