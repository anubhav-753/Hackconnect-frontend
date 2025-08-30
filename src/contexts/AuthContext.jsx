// src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

// Export AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/users/me");
        setUser(data);
      } catch (error) {
        // If the token is invalid/expired, remove it
        localStorage.removeItem("authToken");
        setUser(null);
        console.error("User session invalid. Token removed.");
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/users/login", { email, password });
    localStorage.setItem("authToken", data.token);
    const { token, ...userData } = data;
    setUser(userData);
    navigate("/hackathons");
  };

  const signup = async (name, email, password) => {
    const { data } = await api.post("/users/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("authToken", data.token);
    const { token, ...userData } = data;
    setUser(userData);
    navigate("/hackathons");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
  };

  const updateUser = async (profileData) => {
    const { data } = await api.put("/users/me", profileData);
    setUser(data);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export the custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
