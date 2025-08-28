// hackconnect-frontend/src/services/api.js (Corrected Version)

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});

// 👇 Add this interceptor
api.interceptors.request.use(
  (config) => {
    // 1. Get the user info from local storage
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      // 2. Parse the userInfo and get the token
      const token = JSON.parse(userInfo).token;
      
      // 3. If a token exists, add it to the Authorization header
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config; // Important: return the config
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;