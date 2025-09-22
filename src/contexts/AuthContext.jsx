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

  // Load userInfo from localStorage at startup
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Error parsing userInfo:", err);
      localStorage.removeItem("userInfo");
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
  };

  const signup = async (name, email, password) => {
    const data = await registerUser({ name, email, password });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  const updateUser = async (userData) => {
    const data = await updateUserProfile(userData);
    localStorage.setItem("userInfo", JSON.stringify(data)); // 🔑 Enforce store sync
    setUser(data);
    return data;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateUser, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
