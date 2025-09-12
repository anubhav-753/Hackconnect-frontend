import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  // Use the environment variable for your backend URL, or a default for development
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;