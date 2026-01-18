// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Attach token to every request if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.message?.toLowerCase().includes("token")
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ---------- AUTH HELPERS ----------

// POST /api/users/login
export const loginUser = (formData) => api.post("/users/login", formData);

// POST /api/users/register
export const registerUser = (formData) => api.post("/users/register", formData);

// POST /api/users/logout (optional call)
export const logoutUser = () => api.post("/users/logout");

// GET /api/users/profile
// token param is optional; interceptor also handles it
export const getProfile = (token) => {
  const config = {};
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return api.get("/users/profile", config);
};

export default api;