import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/update-profile', data),
};

// Schools
export const schoolsAPI = {
  getAll: (params) => api.get('/schools', { params }),
  getById: (id) => api.get(`/schools/${id}`),
  create: (data) => api.post('/schools', data),
  update: (id, data) => api.put(`/schools/${id}`, data),
  getMySchools: () => api.get('/schools/my-schools'),
  addSlot: (id, data) => api.post(`/schools/${id}/slots`, data),
  updateSlot: (schoolId, slotId, data) => api.put(`/schools/${schoolId}/slots/${slotId}`, data),
};

// Applicants
export const applicantsAPI = {
  book: (data) => api.post('/applicants/book', data),
  getById: (id) => api.get(`/applicants/${id}`),
  getByBookingId: (bookingId) => api.get(`/applicants/by-booking/${bookingId}`),
  getSchoolApplicants: (schoolId, params) => api.get(`/applicants/school/${schoolId}`, { params }),
  getSchoolStats: (schoolId) => api.get(`/applicants/school/${schoolId}/stats`),
};

// Payments
export const paymentsAPI = {
  calculateFees: (data) => api.post('/payments/calculate-fees', data),
  initiate: (data) => api.post('/payments/initiate', data),
  verify: (bookingId) => api.get(`/payments/verify/${bookingId}`),
};

// Admin
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getPendingSchools: () => api.get('/admin/schools/pending'),
  approveSchool: (id) => api.post(`/admin/schools/${id}/approve`),
  getUsers: (params) => api.get('/admin/users', { params }),
};

export default api;
