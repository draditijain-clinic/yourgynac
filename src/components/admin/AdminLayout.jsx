import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, History, 
  Palmtree, MessageSquare, Settings, LogOut, Menu, X, ChevronLeft, ChevronRight, Stethoscope, Video, Clock, ExternalLink, FileSpreadsheet
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';

export default function AdminLayout({ children, activeTab, setActiveTab, setPage }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('admin_sidebar_collapsed') === 'true');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [greeting, setGreeting] = useState('Welcome');
  
  useEffect(() => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
    
    // Hourly Greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Real-time Clock
    const updateTime = () => {
      const timeOpts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setCurrentTime(new Date().toLocaleTimeString('en-US', timeOpts));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('admin_sidebar_collapsed', String(next));
      return next;
    });
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Today & Pending', icon: Calendar },
    { id: 'history', label: 'History & All Bookings', icon: History },
    { id: 'library', label: 'Health Library', icon: Video },
    { id: 'holidays', label: 'Holidays', icon: Palmtree },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleLogout = () => {
    adminApi.logout();
    setPage('home'); // Redirect to public home
  };

  const handleOpenSheet = async () => {
    try {
      const res = await adminApi.getSheetUrl();
      if (res && res.url) {
        window.open(res.url, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      console.error('Failed to get sheet URL:', err);
      alert('Could not open Google Sheet. Please check your connection.');
    }
  };

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className={`admin-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      
      {/* Desktop Sidebar */}
      <aside className={`admin-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-brand-box">
            <img src="/images/logos.png" alt="Logo" className="admin-logo-img" style={{ height: '36px', width: '36px', objectFit: 'contain', borderRadius: '50%', background: 'rgba(92,29,36,0.05)', padding: '2px', flexShrink: 0 }} />
            {!isCollapsed && (
              <div className="brand-text-box">
                <h3>DR. ADITI JAIN</h3>
                <p>Clinic Administration</p>
              </div>
            )}
          </div>

          <button className="collapse-toggle-btn" onClick={toggleCollapse} title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          <button className="mobile-close" onClick={() => setIsMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              title={isCollapsed ? item.label : ''}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          {!isCollapsed && (
            <div className="clinic-info">
              <p className="clinic-name">Agarwal Clinic</p>
              <p className="clinic-location" style={{ fontSize: '0.78rem', color: '#9ca3af', margin: '2px 0 4px' }}>Jaipur, Rajasthan</p>
              <p className="clinic-status">● Online</p>
            </div>
          )}
          <button 
            className="nav-btn google-sheet-btn" 
            onClick={handleOpenSheet} 
            title="Open Google Sheet"
            style={{ 
              display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
              padding: isCollapsed ? '10px' : '10px 14px', marginBottom: '6px',
              background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: '8px',
              color: '#2e7d32', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer',
              transition: 'all 0.2s ease', justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}
          >
            <FileSpreadsheet size={18} />
            {!isCollapsed && <span>Open Google Sheet</span>}
            {!isCollapsed && <ExternalLink size={13} style={{ marginLeft: 'auto', opacity: 0.6 }} />}
          </button>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <LogOut size={16} /> {!isCollapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Top Header */}
        <header className="admin-topbar">
          <button className="mobile-menu-btn" onClick={() => setIsMobileOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="topbar-content">
            <div className="greeting">
              <h2>{greeting}, Dr. Aditi</h2>
              <p>{currentDate}. Here's what's happening with your clinic today.</p>
            </div>
            <div className="topbar-actions">
              <div className="live-clock-card" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: '#fef2f2', border: '1px solid rgba(92,29,36,0.15)', borderRadius: '20px', color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.9rem', boxShadow: '0 2px 8px rgba(92,29,36,0.04)' }}>
                <Clock size={16} style={{ strokeWidth: '2.5px' }} />
                <span>{currentTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="admin-content-wrapper">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={() => setIsMobileOpen(false)}></div>
      )}

      <style>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
          background-color: #f3f4f6; /* slightly darker off-white for contrast against cards */
          font-family: var(--font-sans);
        }

        /* Sidebar Styling */
        .admin-sidebar {
          width: 280px;
          background-color: #ffffff;
          border-right: 1px solid rgba(241, 236, 225, 0.8);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 1000;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease;
          box-shadow: 4px 0 15px rgba(0,0,0,0.02);
        }

        .sidebar-collapsed .admin-sidebar {
          width: 80px;
        }

        .sidebar-header {
          padding: 24px 20px;
          border-bottom: 1px solid rgba(241, 236, 225, 0.6);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .logo-brand-box {
          display: flex;
          align-items: center;
          gap: 14px;
          overflow: hidden;
        }

        .admin-logo-img {
          height: 44px;
          width: auto;
          object-fit: contain;
          flex-shrink: 0;
          border-radius: 8px;
          padding: 4px;
          background: #faf9f6;
          border: 1px solid #f1ece1;
        }

        .brand-text-box h3 {
          font-family: var(--font-serif);
          color: var(--primary-color);
          font-size: 1.15rem;
          margin: 0 0 2px 0;
          white-space: nowrap;
          font-weight: 700;
        }

        .brand-text-box p {
          color: var(--text-light);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0;
          white-space: nowrap;
          font-weight: 600;
        }

        .collapse-toggle-btn {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--primary-color);
          flex-shrink: 0;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .collapse-toggle-btn:hover {
          background: var(--primary-color);
          color: #ffffff;
          border-color: var(--primary-color);
          transform: scale(1.05);
        }

        .mobile-close {
          display: none;
          background: none;
          border: none;
          color: var(--text-light);
          cursor: pointer;
          padding: 4px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 24px 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-btn {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 14px 16px;
          background: transparent;
          border: none;
          border-radius: 8px;
          text-align: left;
          color: var(--text-light);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sidebar-collapsed .nav-btn {
          justify-content: center;
          padding: 16px 0;
        }

        .nav-btn:hover {
          background-color: #faf9f6;
          color: var(--primary-color);
          transform: translateX(2px);
        }

        .nav-btn.active {
          background-color: var(--accent-light);
          color: var(--primary-color);
          box-shadow: inset 3px 0 0 var(--accent-color);
        }

        .nav-btn span {
          margin-left: 14px;
          white-space: nowrap;
        }

        .sidebar-footer {
          padding: 24px 20px;
          border-top: 1px solid rgba(241, 236, 225, 0.6);
          background-color: #ffffff;
        }

        .sidebar-collapsed .sidebar-footer {
          padding: 20px 12px;
        }

        .clinic-info {
          margin-bottom: 16px;
        }

        .clinic-name {
          font-weight: 700;
          color: var(--text-color);
          font-size: 0.9rem;
          margin: 0 0 4px 0;
        }

        .clinic-status {
          color: #10b981;
          font-size: 0.75rem;
          margin: 0;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          color: #64748b;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background-color: #fee2e2;
          color: #ef4444;
          border-color: #fca5a5;
        }

        /* Main Content Styling */
        .admin-main {
          flex: 1;
          margin-left: 280px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar-collapsed .admin-main {
          margin-left: 80px;
        }

        .admin-topbar {
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          padding: 20px 48px;
          border-bottom: 1px solid rgba(241, 236, 225, 0.6);
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 900;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--primary-color);
          cursor: pointer;
          margin-right: 20px;
          padding: 8px;
        }

        .topbar-content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .greeting h2 {
          font-family: var(--font-serif);
          color: var(--primary-color);
          font-size: 1.8rem;
          margin: 0 0 4px 0;
          font-weight: 700;
        }

        .greeting p {
          color: var(--text-light);
          font-size: 0.95rem;
          margin: 0;
          font-weight: 500;
        }

        .admin-content-wrapper {
          flex: 1;
          padding: 48px;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .sidebar-overlay {
          display: none;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .admin-topbar {
            padding: 20px 24px;
          }
          .admin-content-wrapper {
            padding: 24px;
          }
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            transform: translateX(-100%);
            width: 300px;
            box-shadow: 10px 0 30px rgba(0,0,0,0.1);
          }
          
          .admin-sidebar.mobile-open {
            transform: translateX(0);
          }
          
          .admin-main {
            margin-left: 0;
          }
          
          .mobile-menu-btn {
            display: block;
          }
          
          .mobile-close {
            display: block;
          }

          .sidebar-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            z-index: 999;
            transition: opacity 0.3s;
          }
          
          .greeting h2 {
            font-size: 1.4rem;
          }
          .greeting p {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
