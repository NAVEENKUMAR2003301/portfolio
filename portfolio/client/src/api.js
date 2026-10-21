import axios from 'axios';

const SERVER = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || `${SERVER}/api`
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const resolveImg = (url) => {
  if (!url) return '';
  return url.startsWith('http') ? url : `${SERVER}${url}`;
};

export default api;