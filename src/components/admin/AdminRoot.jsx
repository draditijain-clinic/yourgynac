import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';
import AppointmentsPage from './AppointmentsPage';
import CalendarView from './CalendarView';
import AvailabilityHolidays from './AvailabilityHolidays';
import Patients from './Patients';
import Messages from './Messages';
import Settings from './Settings';
import AdminReviews from './AdminReviews';
import { adminApi } from '../../services/adminApi';

import HistoryPage from './HistoryPage';

export default function AdminRoot({ setPage }) {
  const [isAuthenticated, setIsAuthenticated] = useState(adminApi.isAuthenticated());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const success = await adminApi.login(email, password);
      if (success) {
        setIsAuthenticated(true);
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <h2>Dr. Aditi Jain</h2>
          <p style={{ fontWeight: 600, color: 'var(--primary-color)', marginBottom: '5px' }}>Clinic Administration</p>
          <p>Please enter your credentials to access the admin portal.</p>
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Authenticating...' : 'LOGIN'}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => setPage('home')} style={{ marginTop: '10px' }}>
              Return to Website
            </button>
          </form>
        </div>
        <style>{`
          .admin-login-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--bg-color);
            padding: 20px;
          }
          .admin-login-card {
            background-color: #ffffff;
            padding: 40px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            width: 100%;
            max-width: 400px;
            text-align: center;
          }
          .admin-login-card h2 {
            color: var(--primary-color);
            font-family: var(--font-serif);
            margin-bottom: 10px;
          }
          .admin-login-card p {
            color: var(--text-light);
            margin-bottom: 25px;
            font-size: 0.95rem;
          }
          .admin-login-card input {
            width: 100%;
            padding: 12px;
            margin-bottom: 15px;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            font-size: 0.95rem;
            text-align: left;
          }
          .admin-login-card .btn {
            width: 100%;
          }
          .error-text {
            color: #ef4444;
            font-size: 0.85rem;
            margin-bottom: 15px;
          }
        `}</style>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'history':
        return <HistoryPage />;
      case 'holidays':
        return <AvailabilityHolidays activeView="holidays" />;
      case 'templates':
        return <Messages />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} setPage={setPage}>
      {renderTabContent()}
    </AdminLayout>
  );
}
