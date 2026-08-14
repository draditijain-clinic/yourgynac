import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast-banner toast-${t.type} fade-in-down`}>
            <span>{t.message}</span>
            <button className="toast-close" onClick={() => setToasts(prev => prev.filter(item => item.id !== t.id))}>×</button>
          </div>
        ))}
      </div>
      <style>{`
        .toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 400px;
          width: calc(100% - 40px);
        }
        .toast-banner {
          padding: 14px 20px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.9rem;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--primary-color, #5c1d24);
        }
        .toast-success { background-color: #15803d; }
        .toast-error { background-color: #b91c1c; }
        .toast-info { background-color: #1d4ed8; }
        .toast-close {
          background: none;
          border: none;
          color: #ffffff;
          font-size: 1.2rem;
          cursor: pointer;
          margin-left: 12px;
          opacity: 0.8;
        }
        .toast-close:hover { opacity: 1; }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
