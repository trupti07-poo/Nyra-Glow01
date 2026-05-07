import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('nyraglow_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const signup = (data) => API.post('/api/auth/signup', data);
export const login = (data) => API.post('/api/auth/login', data);
export const getProfile = () => API.get('/api/auth/profile');
export const updateProfile = (data) => API.put('/api/auth/profile', data);

// Services
export const getServices = () => API.get('/api/services');
export const getService = (id) => API.get(`/api/services/${id}`);

// Bookings
export const createBooking = (data) => API.post('/api/bookings', data);
export const getMyBookings = () => API.get('/api/bookings');
export const cancelBooking = (id) => API.put(`/api/bookings/${id}/cancel`);
export const getAvailableSlots = (serviceId, date) =>
  API.get(`/api/bookings/available?serviceId=${serviceId}&date=${date}`);

// Admin
export const adminGetBookings = (params) => API.get('/api/admin/bookings', { params });
export const adminUpdateBooking = (id, data) => API.put(`/api/admin/bookings/${id}`, data);
export const adminGetStats = () => API.get('/api/admin/stats');
export const adminGetUsers = () => API.get('/api/admin/users');
export const adminCreateService = (data) => API.post('/api/services', data);
export const adminUpdateService = (id, data) => API.put(`/api/services/${id}`, data);
export const adminDeleteService = (id) => API.delete(`/api/services/${id}`);

export default API;
