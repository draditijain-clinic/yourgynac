import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { API_CONFIG } from '../config';

export default function Header({ currentPage, setPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'library', label: 'Health Library' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId) => {
    setPage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container header-container">
        <div className="logo" onClick={() => handleNavClick('home')}>
          <img src="/images/logos.png" alt="Dr. Aditi Jain Logo" style={{ height: '48px', marginRight: '10px', objectFit: 'contain' }} />
          <span className="brand-text">{API_CONFIG.DOCTOR_NAME}</span>
        </div>

        <button 
          className="hamburger-btn" 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-link-btn ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="nav-cta-item">
              <button 
                className="btn btn-primary nav-cta-btn"
                onClick={() => handleNavClick('appointment')}
              >
                <Calendar size={15} /> Book Appointment
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <style>{`
        header {
          height: var(--header-height);
          background-color: var(--bg-color);
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid #f1ece1;
          transition: var(--transition-smooth);
          width: 100%;
        }
        
        header.scrolled {
          background-color: rgba(253, 252, 248, 0.98);
          box-shadow: var(--shadow-sm);
          height: 72px;
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .logo {
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .brand-text {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: var(--primary-color);
        }

        .hamburger-btn {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--text-color);
          z-index: 1100;
          padding: 5px;
        }

        .nav-menu ul {
          display: flex;
          list-style: none;
          gap: 15px;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .nav-link-btn {
          background: transparent;
          border: none;
          outline: none;
          text-decoration: none;
          color: var(--text-color);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-smooth);
          padding: 8px 14px;
          border-radius: 20px;
          font-family: var(--font-sans);
        }

        .nav-link-btn:hover {
          color: var(--primary-color);
        }

        .nav-link-btn.active {
          color: var(--primary-color);
          font-weight: 600;
          border: none;
          border-bottom: 2.5px solid var(--primary-color);
          border-radius: 0;
          padding-bottom: 4px;
          outline: none;
        }

        .nav-cta-btn {
          padding: 10px 20px;
          font-size: 0.85rem;
          border-radius: 30px;
        }

        @media (max-width: 992px) {
          .nav-menu ul {
            gap: 5px;
          }
          .nav-link-btn {
            padding: 8px 10px;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 768px) {
          .hamburger-btn {
            display: block;
          }

          .nav-menu {
            position: fixed;
            top: 0;
            right: 0;
            width: 280px;
            height: 100vh;
            background-color: var(--white);
            box-shadow: -10px 0 40px rgba(0, 0, 0, 0.05);
            z-index: 1050;
            transition: var(--transition-smooth);
            padding: 90px 24px 40px;
            transform: translateX(100%);
            visibility: hidden;
          }

          .nav-menu.open {
            transform: translateX(0);
            visibility: visible;
          }

          .nav-menu ul {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .nav-link-btn {
            font-size: 1.05rem;
            width: 100%;
            text-align: left;
            padding: 10px 16px;
          }
          
          .nav-link-btn.active {
            border-bottom: none;
            border-left: 3px solid var(--primary-color);
            padding-left: 13px;
          }

          .nav-cta-item {
            width: 100%;
            margin-top: 15px;
          }
          
          .nav-cta-btn {
            width: 100%;
          }
        }
      `}</style>
    </header>
  );
}
