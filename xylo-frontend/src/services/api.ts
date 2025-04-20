import axios from 'axios';

const API_URL = 'https://app-ntsxhmlq.fly.dev';

console.log('Using API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const authService = {
  login: async (email: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('username', email); // FastAPI OAuth expects 'username'
    formData.append('password', password);
    
    console.log('Login request payload:', { username: email, password: password });
    
    const response = await api.post('/api/auth/token', formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    console.log('Login response:', response.data);
    
    if (response.data.access_token) {
      console.log('Setting token in localStorage:', response.data.access_token);
      localStorage.setItem('token', response.data.access_token);
      console.log('Token after setting:', localStorage.getItem('token'));
    }
    
    return response.data;
  },
  
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/api/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  getCurrentUser: async () => {
    return api.get('/api/users/me');
  },
};

export const featureService = {
  getFeatures: async () => {
    return api.get('/api/features');
  },
};

export default api;
