// src/services/api.js
import axios from 'axios';

// Create axios instance with baseURL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});

// Add a request interceptor to always include JWT if it exists
api.interceptors.request.use(
  (config) => {
    // Assuming user info is stored in localStorage after login/register
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo?.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;