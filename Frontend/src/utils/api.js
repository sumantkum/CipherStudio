import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
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

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => 
    api.post('/api/auth/login', { email, password }),
  
  register: (username, email, password) => 
    api.post('/api/auth/register', { username, email, password }),
  
  getMe: () => 
    api.get('/api/auth/me'),
};

// Projects API
export const projectsAPI = {
  getProjects: () => 
    api.get('/api/projects'),
  
  createProject: (name) => 
    api.post('/api/projects', { name }),
  
  getProject: (projectId) => 
    api.get(`/api/projects/${projectId}`),
  
  updateProject: (projectId, data) => 
    api.put(`/api/projects/${projectId}`, data),
  
  deleteProject: (projectId) => 
    api.delete(`/api/projects/${projectId}`),
};

export default api;