import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Send, Video, ArrowRight, Instagram, MapPin, Navigation, ChevronRight, X } from 'lucide-react';
import { API_CONFIG } from './config';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import FAQPage from './components/FAQPage';
import About from './components/About';
import Services from './components/Services';
import OnlineConsultation from './components/OnlineConsultation';
import HealthLibrary from './components/HealthLibrary';
import Contact from './components/Contact';
import AppointmentForm from './components/AppointmentForm';
import Confirmation from './components/Confirmation';
import AdminRoot from './components/admin/AdminRoot';
import PrivacyPolicy from './components/PrivacyPolicy';
import MedicalDisclaimer from './components/MedicalDisclaimer';
import ClinicIntro from './components/ClinicIntro';
import SEO from './components/SEO';

import { ToastProvider } from './components/ToastNotification';

export default function App() {
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem('app_page');
    return (saved && saved !== 'admin') ? saved : 'home';
  });
  const [reservationData, setReservationData] = useState(() => {
    try {
      const saved = localStorage.getItem('reservation_data');
      return saved ? JSON.parse(saved) : null;
    } catch (_) { return null; }
  });
  const [appLoading, setAppLoading] = useState(true);
  const [showStickyBar, setShowStickyBar] = useState(true);

  // Save reservationData when updated
  useEffect(() => {
    if (reservationData) {
      localStorage.setItem('reservation_data', JSON.stringify(reservationData));
    }
  }, [reservationData]);

  // Initialize page route based on URL pathname (e.g. /admin)
  useEffect(() => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    if (path === 'admin') {
      setPage('admin');
    } else if (path) {
      setPage(path);
    } else {
      setPage('home');
    }
  }, []);

  // Listen to popstate for browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      setPage(path === 'admin' ? 'admin' : (path || 'home'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigate helper function with history push state
  const navigateTo = (newPage) => {
    setPage(newPage);
    const newPath = newPage === 'home' ? '/' : `/${newPage}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // App Initialization Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1500); // 1.5 seconds loading animation
    return () => clearTimeout(timer);
  }, []);

  // Update browser tab title dynamically based on active page
  useEffect(() => {
    const pageTitles = {
      home: "Dr. Aditi Jain | Gynaecologist & Obstetrician Consultant | Jaipur",
      about: "About Dr. Aditi Jain | MS Obstetrics & Gynaecology Consultant",
      services: "Gynaecology, Maternity & Fertility Services | Dr. Aditi Jain",
      consultation: "Secure Online Video Consultation | Dr. Aditi Jain",
      library: "Women's Health Library & Education | Dr. Aditi Jain",
      faq: "Frequently Asked Questions | Dr. Aditi Jain Clinic",
      contact: "Clinic Location & Timings | Agarwal Clinic Jaipur",
      appointment: "Book Consultation Appointment | Dr. Aditi Jain",
      confirmation: "Appointment Registration Successful | Dr. Aditi Jain",
      privacy: "Privacy Policy | Dr. Aditi Jain – Women’s Clinic",
      disclaimer: "Medical Disclaimer | Dr. Aditi Jain – Women’s Clinic",
      admin: "Clinic Coordinator Portal | Dr. Aditi Jain"
    };
    document.title = pageTitles[page] || "Dr. Aditi Jain – Women’s Clinic";
  }, [page]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page !== 'admin') {
      localStorage.setItem('app_page', page);
    } else {
      localStorage.removeItem('app_page');
    }
  }, [page]);

  const handleMobileBookClick = () => {
    navigateTo('appointment');
  };

  const renderHomeContent = () => (
    <>
      <SEO 
        title="Dr. Aditi Jain | Gynaecologist in Jaipur | Women's Health"
        description="Dedicated, evidence-based, and private women's healthcare by Dr. Aditi Jain. Consultant Gynaecologist & Obstetrician near SMS Medical College area, Jaipur."
        schema={{
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "Physician", "MedicalClinic"],
          "name": "Dr. Aditi Jain Clinic",
          "image": "https://bookmyslotclinic.com/images/p1.png",
          "url": "https://bookmyslotclinic.com/",
          "telephone": "+919999999999",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Basement C, 99 Shivaji Marg, Tilak Nagar",
            "addressLocality": "Jaipur",
            "addressRegion": "Rajasthan",
            "postalCode": "302004",
            "addressCountry": "IN"
          }
        }}
      />
      <Hero setPage={navigateTo} />
      <ClinicIntro setPage={navigateTo} />
      <Features />

      {/* HOME SECTION 3: Educational Preview */}
      <section className="home-edu-preview">
        <div className="container">
          <div className="section-header">
            <span className="tagline">Education Library</span>
            <h2>Women's health, explained simply</h2>
            <p>Read early guides on cycle management, prenatal pathways, and metabolic health.</p>
          </div>

          <div className="edu-cards-grid">
            <div className="edu-preview-card" onClick={() => navigateTo('library')}>
              <span className="card-cat">PCOS</span>
              <h3>Understanding PCOS & Insulin Resistance</h3>
              <p>How Polycystic Ovary Syndrome influences hormones, cycles, and lifestyle indicators.</p>
              <span className="read-more-link">Read Guide <ArrowRight size={14} /></span>
            </div>

            <div className="edu-preview-card" onClick={() => navigateTo('library')}>
              <span className="card-cat">Periods</span>
              <h3>Managing Painful Cycles & Cramps</h3>
              <p>Understanding dysmenorrhea indicators, lifestyle therapies, and clinical screenings.</p>
              <span className="read-more-link">Read Guide <ArrowRight size={14} /></span>
            </div>

            <div className="edu-preview-card" onClick={() => navigateTo('library')}>
              <span className="card-cat">Pregnancy</span>
              <h3>First Trimester Guidelines & Care</h3>
              <p>Essential prenatal vitamins, milestones, and initial booking checks in early weeks.</p>
              <span className="read-more-link">Read Guide <ArrowRight size={14} /></span>
            </div>
          </div>
        </div>
        <style>{`
          .home-edu-preview {
            background-color: var(--accent-light);
            padding: 100px 0;
          }
          .edu-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-top: 50px;
          }
          .edu-preview-card {
            background-color: var(--white);
            padding: 40px 30px;
            border-radius: var(--border-radius);
            border: 1px solid #e9e3d9;
            cursor: pointer;
            text-align: left;
            transition: var(--transition-smooth);
            display: flex;
            flex-direction: column;
          }
          .edu-preview-card:hover {
            transform: translateY(-4px);
            border-color: var(--primary-color);
            box-shadow: var(--shadow-md);
          }
          .card-cat {
            font-size: 0.75rem;
            color: var(--accent-color);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 12px;
            display: block;
          }
          .edu-preview-card h3 {
            font-family: var(--font-serif);
            font-size: 1.3rem;
            color: var(--primary-color);
            margin-bottom: 12px;
            line-height: 1.3;
          }
          .edu-preview-card p {
            font-size: 0.9rem;
            color: var(--text-light);
            line-height: 1.6;
            margin-bottom: 20px;
            flex-grow: 1;
          }
          .read-more-link {
            font-size: 0.85rem;
            color: var(--primary-color);
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            margin-top: auto;
          }
        `}</style>
      </section>

      {/* HOME SECTION 4: Services Preview */}
      <section className="home-services-preview">
        <div className="container">
          <div className="section-header">
            <span className="tagline">Care Scopes</span>
            <h2>Ovarian & Maternal Care Services</h2>
            <p>We provide compassionate, evidence-based diagnostic and treatment directories.</p>
          </div>

          <div className="preview-services-grid">
            <div className="service-preview-box">
              <h4>Pregnancy Care</h4>
              <p>Full maternal care including high-risk pregnancy management, regular scans, and blood pressure diagnostics.</p>
              <button className="btn-text" onClick={() => { setPage('services'); window.scrollTo({ top: 0 }); }}>
                View Prenatal Details
              </button>
            </div>
            
            <div className="service-preview-box">
              <h4>Advanced Gynaecology</h4>
              <p>Assessments and treatments for PCOS/PCOD, fibroids, irregular cycles, and laparoscopic screenings.</p>
              <button className="btn-text" onClick={() => { setPage('services'); window.scrollTo({ top: 0 }); }}>
                View Gynaecology Details
              </button>
            </div>

            <div className="service-preview-box">
              <h4>Fertility Solutions</h4>
              <p>Initial reproductive tests, follicular monitoring, ovulation induction, and family planning guidelines.</p>
              <button className="btn-text" onClick={() => { setPage('services'); window.scrollTo({ top: 0 }); }}>
                View Fertility Details
              </button>
            </div>
          </div>
        </div>
        <style>{`
          .home-services-preview {
            background-color: var(--white);
            padding: 100px 0;
            text-align: center;
          }
          .preview-services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-top: 50px;
          }
          .service-preview-box {
            background-color: var(--bg-color);
            padding: 35px;
            border-radius: var(--border-radius);
            border: 1px solid #f1ece1;
            text-align: left;
            transition: var(--transition-smooth);
          }
          .service-preview-box:hover {
            border-color: var(--primary-color);
          }
          .service-preview-box h4 {
            font-family: var(--font-serif);
            font-size: 1.35rem;
            color: var(--primary-color);
            margin-bottom: 12px;
            font-weight: 600;
          }
          .service-preview-box p {
            font-size: 0.9rem;
            color: var(--text-light);
            line-height: 1.6;
            margin-bottom: 20px;
          }
        `}</style>
      </section>

      {/* HOME SECTION 5: Online Consultation Preview */}
      <section className="home-online-consult">
        <div className="container consult-container-grid">
          <div className="consult-desc-panel">
            <span className="tagline">Telemedicine Care</span>
            <h2>Care from wherever you are</h2>
            <p>Consult with Dr. Aditi Jain securely from home or work. Ideal for regular follow-up charts, medical reports review, and initial health counseling.</p>
            <button className="btn btn-primary mt-20" onClick={() => { setPage('consultation'); window.scrollTo({ top: 0 }); }}>
              Book Online Consultation
            </button>
          </div>
          
          <div className="consult-flow-panel">
            <div className="vertical-timeline">
              <div className="timeline-step">
                <div className="step-marker">1</div>
                <div className="step-content">
                  <h4>Select slot</h4>
                  <p>Choose a convenient time.</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-marker">2</div>
                <div className="step-content">
                  <h4>Enter details</h4>
                  <p>Provide brief medical history.</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-marker">3</div>
                <div className="step-content">
                  <h4>Receive mail</h4>
                  <p>Get confirmation & Meet link.</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-marker">4</div>
                <div className="step-content">
                  <h4>Join consultation</h4>
                  <p>Connect securely with Dr. Aditi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .home-online-consult {
            background-color: var(--bg-color);
            border-top: 1px solid #f1ece1;
            border-bottom: 1px solid #f1ece1;
            padding: 100px 0;
          }
          .consult-container-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
            text-align: left;
          }
          .mt-20 { margin-top: 20px; }
          
          .consult-flow-panel {
            background: var(--white);
            padding: 40px;
            border-radius: 24px;
            border: 1px solid #f1ece1;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          }

          .vertical-timeline {
            display: flex;
            flex-direction: column;
            gap: 25px;
            position: relative;
          }

          .vertical-timeline::before {
            content: '';
            position: absolute;
            left: 20px;
            top: 10px;
            bottom: 10px;
            width: 2px;
            background: #f1ece1;
            z-index: 0;
          }

          .timeline-step {
            display: flex;
            gap: 20px;
            position: relative;
            z-index: 1;
            align-items: flex-start;
          }

          .step-marker {
            width: 42px;
            height: 42px;
            min-width: 42px;
            background-color: var(--bg-color);
            border: 2px solid var(--accent-color);
            color: var(--primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.1rem;
            box-shadow: 0 0 0 6px var(--white);
          }

          .step-content h4 {
            font-size: 1.1rem;
            color: var(--primary-color);
            margin: 4px 0 4px 0;
            font-weight: 600;
          }

          .step-content p {
            font-size: 0.9rem;
            color: var(--text-light);
            margin: 0;
            line-height: 1.4;
          }

          @media (max-width: 992px) {
            .consult-container-grid {
              gap: 40px;
            }
          }

          @media (max-width: 768px) {
            .consult-container-grid {
              grid-template-columns: 1fr;
              text-align: center;
            }
            .consult-flow-panel {
              text-align: left;
              padding: 30px 20px;
            }
          }
        `}</style>
      </section>

      {/* HOME SECTION 6: Doctor Bio Intro */}
      <section className="home-doc-intro">
        <div className="container intro-grid">
          <div className="intro-image-frame">
            <img src="/images/p2.png" alt="Dr. Aditi Jain portrait" />
          </div>
          <div className="intro-content">
            <span className="tagline">Consultant Profile</span>
            <h2>{API_CONFIG.DOCTOR_NAME}</h2>
            <p className="credentials-subtitle">{API_CONFIG.QUALIFICATIONS} | SMS Medical College Alumna</p>
            <p className="bio-summary">
              Dr. Aditi Jain is a specialized Consultant Obstetrician and Gynaecologist. Educated at the prestigious SMS Medical College in Jaipur, her clinical methodology centers around patient-focused decisions, rigorous clinical evidence, and complete diagnostic privacy.
            </p>
            <button className="btn btn-primary" onClick={() => { setPage('about'); window.scrollTo({ top: 0 }); }} style={{ marginTop: '20px' }}>
              Meet the Doctor
            </button>
          </div>
        </div>
        <style>{`
          .home-doc-intro {
            background-color: var(--white);
            padding: 100px 0;
            text-align: left;
          }
          .intro-grid {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 60px;
            align-items: center;
          }
          .intro-image-frame {
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: var(--shadow-lg);
            border: 1px solid rgba(92, 29, 36, 0.05);
          }
          .intro-image-frame img {
            width: 100%;
            display: block;
            object-fit: cover;
          }
          .credentials-subtitle {
            font-size: 1.05rem;
            color: var(--primary-color);
            font-weight: 600;
            margin-bottom: 15px;
          }
          .bio-summary {
            font-size: 1rem;
            color: var(--text-light);
            line-height: 1.7;
          }
          @media (max-width: 768px) {
            .intro-grid {
              grid-template-columns: 1fr;
              gap: 40px;
              text-align: center;
            }
            .intro-image-frame {
              max-width: 320px;
              margin: 0 auto;
            }
          }
        `}</style>
      </section>

      {/* HOME SECTION 7: Instagram Education Strip */}
      <section className="home-instagram-education">
        <div className="container insta-container">
          <Instagram size={36} color="var(--primary-color)" style={{ marginBottom: '20px' }} />
          <h3>Follow for women's health explained simply</h3>
          <p>Get reliable, physician-reviewed medical guidelines and cycle tips directly on your social feed.</p>
          <a href={API_CONFIG.INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '20px' }}>
            Follow @draditi_explains_women
          </a>
        </div>
        <style>{`
          .home-instagram-education {
            background-color: var(--accent-light);
            padding: 80px 0;
            text-align: center;
          }
          .insta-container {
            max-width: 600px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .home-instagram-education h3 {
            font-family: var(--font-serif);
            font-size: 1.8rem;
            color: var(--primary-color);
            margin-bottom: 12px;
          }
          .home-instagram-education p {
            font-size: 1rem;
            color: var(--text-light);
            line-height: 1.6;
          }
        `}</style>
      </section>

      {/* HOME SECTION 8: Clinic Location Map Block */}
      <section className="home-clinic-location">
        <div className="container location-grid-home">
          <div className="location-info-home">
            <span className="tagline">Facility Details</span>
            <h2>Visit Agarwal Clinic</h2>
            <p>Our consulting facility is fully accessible, private, and located in Suraj Nagar area of Tilak Nagar, Jaipur.</p>
            
            <div className="address-card-home">
              <MapPin size={20} color="var(--primary-color)" />
              <div>
                <h5>Address Details</h5>
                <p>
                  <strong>{API_CONFIG.CLINIC_FACILITY}</strong><br />
                  Basement C, 99 Shivaji Marg,<br />
                  Tilak Nagar, Jaipur, Rajasthan 302004
                </p>
              </div>
            </div>

            <div className="location-timings-home">
              <h5>Consultation Timings</h5>
              <p>{API_CONFIG.TIMINGS}</p>
            </div>

            <a href={API_CONFIG.MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ marginTop: '15px' }}>
              <Navigation size={16} /> Get Directions
            </a>
          </div>

          <div className="location-map-home">
            <iframe 
              src={API_CONFIG.MAPS_EMBED_URL} 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '350px', borderRadius: '12px' }} 
              allowFullScreen="" 
              loading="lazy" 
              title="Dr. Aditi Jain Clinic Location Map"
            />
          </div>
        </div>
        <style>{`
          .home-clinic-location {
            background-color: var(--white);
            padding: 100px 0;
            text-align: left;
          }
          .location-grid-home {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 50px;
            align-items: start;
          }
          .location-info-home {
            display: flex;
            flex-direction: column;
          }
          .location-info-home h2 {
            font-family: var(--font-serif);
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-bottom: 20px;
          }
          .address-card-home {
            display: flex;
            gap: 12px;
            background-color: var(--bg-color);
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #f1ece1;
            margin: 25px 0;
          }
          .address-card-home h5 {
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 5px;
          }
          .address-card-home p {
            font-size: 0.9rem;
            color: var(--text-light);
            line-height: 1.5;
          }
          .location-timings-home h5 {
            font-size: 0.95rem;
            color: var(--accent-color);
            margin-bottom: 5px;
            font-weight: 600;
          }
          .location-timings-home p {
            font-size: 0.9rem;
            color: var(--text-color);
            font-weight: 500;
          }
          @media (max-width: 768px) {
            .location-grid-home {
              grid-template-columns: 1fr;
              gap: 40px;
            }
          }
        `}</style>
      </section>

      <Reviews setPage={navigateTo} />

      {/* HOME SECTION 9: Final Conversion CTA */}
      <section className="home-final-cta">
        <div className="container cta-block-home">
          <h2>Your health deserves time, attention and care.</h2>
          <p>Book a detailed, private gynaecological consultation with Dr. Aditi Jain today.</p>
          <div className="cta-actions-home">
            <button className="btn btn-primary" onClick={() => navigateTo('appointment')}>
              Book an Appointment
            </button>
            <a href={`mailto:${API_CONFIG.EMAIL}`} className="btn btn-outline" style={{ border: '1px solid var(--primary-color)', color: 'var(--primary-color)' }}>
              Email the Clinic
            </a>
          </div>
        </div>
        <style>{`
          .home-final-cta {
            background-color: var(--bg-color);
            border-top: 1px solid #f1ece1;
            padding: 100px 0;
            text-align: center;
          }
          .cta-block-home {
            max-width: 700px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .home-final-cta h2 {
            font-family: var(--font-serif);
            font-size: 2.6rem;
            color: var(--primary-color);
            margin-bottom: 15px;
            line-height: 1.25;
          }
          .home-final-cta p {
            font-size: 1.05rem;
            color: var(--text-light);
            margin-bottom: 35px;
          }
          .cta-actions-home {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            justify-content: center;
          }
        `}</style>
      </section>

      <FAQ />
    </>
  );

  // Render current active page template
  const renderContent = () => {
    switch (page) {
      case 'home':
        return renderHomeContent();
      case 'about':
        return <About setPage={navigateTo} />;
      case 'services':
        return <Services setPage={navigateTo} />;
      case 'consultation':
        return <OnlineConsultation setPage={navigateTo} />;
      case 'library':
        return <HealthLibrary setPage={navigateTo} />;
      case 'faq':
        return <FAQPage setPage={navigateTo} />;
      case 'contact':
        return <Contact setPage={navigateTo} />;
      case 'appointment':
        return (
          <AppointmentForm 
            setPage={navigateTo} 
            setReservationData={setReservationData} 
          />
        );
      case 'confirmation':
        return (
          <Confirmation 
            reservationData={reservationData} 
            setPage={navigateTo} 
          />
        );
      case 'privacy':
        return <PrivacyPolicy />;
      case 'disclaimer':
        return <MedicalDisclaimer />;
      case 'admin':
        return <AdminRoot setPage={navigateTo} />;
      default:
        return (
          <div style={{ padding: '100px 0', textAlign: 'center' }}>
            <h2 className="serif-heading" style={{ fontSize: '2rem' }}>Page Not Found</h2>
            <button onClick={() => navigateTo('home')} className="btn btn-primary" style={{ marginTop: '20px' }}>
              Back to Home
            </button>
          </div>
        );
    }
  };

  if (appLoading) {
    return (
      <div className="global-preloader">
        <div className="loader-pulse"></div>
        <div className="loader-text">Dr. Aditi Jain</div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        {page !== 'admin' && <Header currentPage={page} setPage={navigateTo} />}
        
        <main style={{ flex: '1 0 auto' }}>
          {renderContent()}
        </main>
        
        {page !== 'admin' && <Footer setPage={navigateTo} />}

        {/* Mobile Sticky Bottom Bar (BOOK APPOINTMENT) */}
        {showStickyBar && page !== 'admin' && page !== 'appointment' && (
          <div className="mobile-sticky-bottom-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
              <button onClick={handleMobileBookClick} className="mobile-sticky-btn book" style={{ flex: 1 }}>
                <Calendar size={15} style={{ marginRight: '6px' }} /> Book Now
              </button>
              <button 
                onClick={() => setShowStickyBar(false)} 
                className="close-sticky-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#f1ece1',
                  border: 'none',
                  color: 'var(--primary-color)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background-color 0.2s'
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </ToastProvider>
  );
}
