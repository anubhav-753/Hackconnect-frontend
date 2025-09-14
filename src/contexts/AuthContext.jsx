// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
// After the fix
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
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await loginUser({ email, password });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
  };

  const signup = async (name, email, password) => {
    const { data } = await registerUser({ name, email, password });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  // NEW: Add the updateUser function to the context
  const updateUser = async (userData) => {
    const { data } = await updateUserProfile(userData);
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
    return data; // Return the updated user data
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
