import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Your pre-configured axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await api.get("/users/me");
        setUser(data);
      } catch (error) {
        // No user logged in or token is invalid
        console.log("No user session found.");
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/users/login", { email, password });
    // Save the token to local storage
    localStorage.setItem("authToken", data.token);
    // Set the user state (excluding the token)
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
    // --- THIS IS THE FIX ---
    // 1. Save the token to local storage after signup
    localStorage.setItem("authToken", data.token);

    // 2. Set the user state from the response (excluding the token)
    const { token, ...userData } = data;
    setUser(userData);
    // ----------------------
    navigate("/hackathons");
  };

  const logout = () => {
    // Clear the token from local storage on logout
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
  };

  const updateUser = async (profileData) => {
    try {
      const { data } = await api.put("/users/me", profileData);
      setUser(data);
    } catch (error) {
      console.error("Error updating profile in context:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
