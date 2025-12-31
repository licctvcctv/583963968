import axios from 'axios';

const API_BASE_URL = 'http://localhost:8003';

// 创建 axios 实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token 等认证信息
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// 认证相关 API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

// 维护评估相关 API
export const maintenanceAPI = {
  getAssessmentData: (params) => api.get('/maintenance/assessment', { params }),
  submitAssessment: (data) => api.post('/maintenance/assessment', data),
  getMaintenanceHistory: (params) => api.get('/maintenance/history', { params }),
  getPredictions: (params) => api.get('/maintenance/predictions', { params }),
};

export default api;