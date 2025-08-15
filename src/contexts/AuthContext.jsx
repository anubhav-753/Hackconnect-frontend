import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

// Create the context
const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To check initial auth status

  // This effect runs on initial app load to check for an existing token
  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // The interceptor in api.js will automatically add the token to this request
          const { data: userData } = await api.get("/users/me");
          setUser(userData);
        } catch (error) {
          console.error(
            "Session expired or token is invalid. Please log in again."
          );
          // If token is invalid, clear it
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    loadUserFromToken();
  }, []);

  // Login function
  const login = async (email, password) => {
    const { data } = await api.post("/users/login", { email, password });
    localStorage.setItem("token", data.token);
    // After setting token, get user data
    const { data: userData } = await api.get("/users/me");
    setUser(userData);
  };

  // Signup function
  const signup = async (name, email, password) => {
    const { data } = await api.post("/users/signup", { name, email, password });
    localStorage.setItem("token", data.token);
    const { data: userData } = await api.get("/users/me");
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // The value provided to consuming components
  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext easily in other components
export const useAuth = () => {
  return useContext(AuthContext);
};
