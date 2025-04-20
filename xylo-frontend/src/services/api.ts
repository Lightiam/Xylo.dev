import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://app-ntsxhmlq.fly.dev';
const ENABLE_MOCK_AUTH = import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true';

console.log('Using API URL:', API_URL);
console.log('Mock Auth Enabled:', ENABLE_MOCK_AUTH);

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

interface MockUser {
  id: number;
  name: string;
  email: string;
}

const mockUsers: MockUser[] = [];
const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtb2NrQGV4YW1wbGUuY29tIiwiZXhwIjoxNzQ1MjMyMDU1fQ.mock_signature";

export const authService = {
  login: async (email: string, password: string) => {
    console.log('Login request payload:', { username: email, password: password });
    
    if (ENABLE_MOCK_AUTH) {
      console.log('Using mock authentication for login');
      
      const mockResponse = {
        access_token: mockToken,
        token_type: "bearer"
      };
      
      localStorage.setItem('token', mockResponse.access_token);
      localStorage.setItem('user_email', email);
      
      console.log('Mock login successful:', mockResponse);
      return mockResponse;
    }
    
    const formData = new URLSearchParams();
    formData.append('username', email); // FastAPI OAuth expects 'username'
    formData.append('password', password);
    
    const response = await api.post('/api/auth/token', formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    console.log('Login response:', response.data);
    
    if (response.data.access_token) {
      console.log('Setting token in localStorage:', response.data.access_token);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user_email', email);
      console.log('Token after setting:', localStorage.getItem('token'));
    }
    
    return response.data;
  },
  
  register: async (name: string, email: string, password: string) => {
    if (ENABLE_MOCK_AUTH) {
      console.log('Using mock authentication for registration');
      
      const existingUser = mockUsers.find(user => user.email === email);
      if (existingUser) {
        throw new Error('Email already registered');
      }
      
      const mockUser = {
        id: mockUsers.length + 1,
        name,
        email
      };
      
      mockUsers.push(mockUser);
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
      
      console.log('Mock registration successful:', mockUser);
      return mockUser;
    }
    
    const response = await api.post('/api/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('mock_user');
  },
  
  getCurrentUser: async () => {
    if (ENABLE_MOCK_AUTH) {
      const email = localStorage.getItem('user_email');
      const mockUser = localStorage.getItem('mock_user');
      
      if (mockUser) {
        return { data: JSON.parse(mockUser) };
      }
      
      return { 
        data: { 
          id: 1, 
          name: "Mock User", 
          email: email || "mock@example.com" 
        } 
      };
    }
    
    return api.get('/api/users/me');
  },
};

export const featureService = {
  getFeatures: async () => {
    if (ENABLE_MOCK_AUTH) {
      return {
        data: {
          features: [
            {
              id: "code-assistance",
              name: "Code Assistance",
              description: "Modify code, run commands, and browse the web"
            },
            {
              id: "ai-agents",
              name: "AI Agents",
              description: "Specialized agents for different development tasks"
            },
            {
              id: "microagents",
              name: "Microagents",
              description: "Domain-specific knowledge and task workflows"
            },
            {
              id: "runtime",
              name: "Runtime",
              description: "Secure sandbox for running commands and code"
            }
          ]
        }
      };
    }
    
    return api.get('/api/features');
  },
};

export default api;
