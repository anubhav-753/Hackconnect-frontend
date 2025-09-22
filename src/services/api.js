import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});

// Request Interceptor — Always attach token
api.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo?.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
      if (process.env.NODE_ENV === 'development') {
        console.log(">>> Attaching JWT Header →", config.headers.Authorization);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — Auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message &&
      error.response.data.message.toLowerCase().includes("token")
    ) {
      console.warn(">>> 401 Unauthorized - Logging user out");
      localStorage.removeItem("userInfo");
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;