import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8002',
  timeout: 10000,
});

// 请求拦截器
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

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (username, password) => api.post('/api/auth/login', { username, password }),
  logout: () => api.post('/api/auth/logout'),
};

export const deviceApi = {
  getDevices: () => api.get('/api/devices'),
  getDeviceParams: (deviceId) => api.get(`/api/devices/${deviceId}/parameters`),
  getDeviceData: (deviceId, params) => api.get(`/api/devices/${deviceId}/data`, { params }),
};

export default api;