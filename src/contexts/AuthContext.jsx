// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  loginUser,
  registerUser,
  updateUserProfile,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.warn("Failed to parse userInfo from localStorage:", error);
      localStorage.removeItem("userInfo"); // clean invalid entry
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    setUser(data); // authService already persists to localStorage
  };

  const signup = async (name, email, password) => {
    const data = await registerUser({ name, email, password });
    setUser(data); // authService already persists
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  const updateUser = async (userData) => {
    const data = await updateUserProfile(userData);
    setUser(data); // authService already persists
    return data;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loading, updateUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
