import { API_CONFIG } from '../config';

const SCRIPT_URL = API_CONFIG.SCRIPT_URL;

function getAuthToken() {
  return localStorage.getItem('clinic_admin_token');
}

function handleAuthFailure() {
  if (localStorage.getItem('clinic_admin_token')) {
    localStorage.removeItem('clinic_admin_token');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}

/**
 * Generic GET request
 */
async function apiGet(action, retryCount = 0) {
  const token = getAuthToken();
  let url = `${SCRIPT_URL}?action=${action}&_t=${Date.now()}`;
  if (token) {
    url += `&token=${encodeURIComponent(token)}`;
  }
  
  try {
    const response = await fetch(url);
    const text = await response.text();
    
    // Catch default API Gateway text or "Unauthorized" responses
    if (text.includes("API Gateway") || text.includes("Unauthorized")) {
      if (retryCount < 2) {
        console.warn(`Propagation lag detected for GET ${action}. Retrying in 1.2s... (Attempt ${retryCount + 1}/2)`);
        await new Promise(resolve => setTimeout(resolve, 1200));
        return apiGet(action, retryCount + 1);
      }
      handleAuthFailure();
      throw new Error("Session expired. Please log in again.");
    }
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON response:", text);
      throw new Error("Invalid server response. Please try again.");
    }
    
    if (!data.success) {
      const errMsg = data.error || data.message || "API Error";
      if (errMsg.includes("Unauthorized")) {
        if (retryCount < 2) {
          console.warn(`Propagation lag detected for GET ${action}. Retrying in 1.2s... (Attempt ${retryCount + 1}/2)`);
          await new Promise(resolve => setTimeout(resolve, 1200));
          return apiGet(action, retryCount + 1);
        }
        handleAuthFailure();
      }
      throw new Error(errMsg);
    }
    return data.data || data;
  } catch (err) {
    console.error(`API GET Error (${action}):`, err);
    throw err;
  }
}

/**
 * Generic POST request
 */
async function apiPost(payload, retryCount = 0) {
  const token = getAuthToken();
  if (token && !payload.token) {
    payload.token = token;
  }
  
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      }
    });
    
    const text = await response.text();
    
    // Catch default API Gateway text or "Unauthorized" responses
    if (text.includes("API Gateway") || text.includes("Unauthorized")) {
      if (payload.action !== 'login' && retryCount < 2) {
        console.warn(`Propagation lag detected for POST ${payload.action}. Retrying in 1.2s... (Attempt ${retryCount + 1}/2)`);
        await new Promise(resolve => setTimeout(resolve, 1200));
        return apiPost(payload, retryCount + 1);
      }
      handleAuthFailure();
      throw new Error("Session expired. Please log in again.");
    }
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON response:", text);
      throw new Error("Invalid server response. Please try again.");
    }
    
    if (!data.success) {
      const errMsg = typeof data.error === 'object' ? JSON.stringify(data.error) : (data.error || data.message || "API Error");
      if (errMsg.includes("Unauthorized")) {
        if (payload.action !== 'login' && retryCount < 2) {
          console.warn(`Propagation lag detected for POST ${payload.action}. Retrying in 1.2s... (Attempt ${retryCount + 1}/2)`);
          await new Promise(resolve => setTimeout(resolve, 1200));
          return apiPost(payload, retryCount + 1);
        }
        handleAuthFailure();
      }
      throw new Error(errMsg);
    }
    return data;
  } catch (err) {
    console.error(`API POST Error:`, err);
    throw err;
  }
}

export const adminApi = {
  login: async (email, password) => {
    const res = await apiPost({ action: 'login', email, password });
    if (res.success && res.data && res.data.token) {
      localStorage.setItem('clinic_admin_token', res.data.token);
      return true;
    }
    return false;
  },
  
  logout: () => {
    localStorage.removeItem('clinic_admin_token');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('clinic_admin_token');
  },
  
  getDashboardData: () => apiGet('getDashboardData'),
  
  getBookings: () => apiGet('getBookings'),
  
  getSettings: () => apiGet('getSettings'),
  
  saveSettings: (settings) => apiPost({ action: 'saveSettings', settings }),
  
  getSheetUrl: () => apiGet('getSheetUrl'),
  
  acceptBooking: (bookingId, confirmedDate, confirmedTime, duration, adminName, meetUrl) => {
    return apiPost({
      action: 'acceptBooking',
      bookingId,
      confirmedDate,
      confirmedTime,
      duration,
      admin: adminName,
      meetUrl: meetUrl || ''
    });
  },

  rescheduleBooking: (bookingId, newDate, newTime, meetUrl) => {
    return apiPost({
      action: 'rescheduleBooking',
      bookingId,
      newDate,
      newTime,
      meetUrl: meetUrl || ''
    });
  },
  
  rejectBooking: (bookingId, adminName) => {
    return apiPost({
      action: 'rejectBooking',
      bookingId,
      admin: adminName
    });
  },
  
  markCompleted: (bookingId, adminName) => {
    return apiPost({
      action: 'markCompleted',
      bookingId,
      admin: adminName
    });
  },

  getHistory: (payload) => apiPost({ action: 'getHistory', ...payload }).then(res => res.data),

  cancelBooking: (bookingId, reason) => apiPost({ action: 'cancelBooking', bookingId, reason }),

  deleteBooking: (bookingId) => apiPost({ action: 'deleteBooking', bookingId }),

  fixDatabase: () => apiPost({ action: 'fixDatabase' }),

  getHolidays: () => apiPost({ action: 'getHolidays' }).then(res => res.data),

  addHoliday: (payload) => apiPost({ action: 'addHoliday', ...payload }),

  removeHoliday: (payload) => apiPost({ action: 'removeHoliday', ...payload }),

  getTemplates: () => apiPost({ action: 'getTemplates' }).then(res => res.data),

  updateTemplate: (payload) => apiPost({ action: 'updateTemplate', ...payload }),

  createBooking: (payload) => {
    // This doesn't need auth token as it's called from public site
    return apiPost({
      action: 'createBooking',
      ...payload
    });
  }
};
