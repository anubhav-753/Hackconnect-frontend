// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});

// 👇 This interceptor is now corrected
api.interceptors.request.use(
  (config) => {
    // 1. Get the token from local storage using the correct key: 'authToken'
    const token = localStorage.getItem('authToken');

    // 2. If a token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config; // Important: return the config
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;