import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On initial app load, check localStorage for existing user session
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      // Set the auth token for all future requests with this api instance
      api.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Make API call to the backend login route
      const { data } = await api.post("/api/users/login", { email, password });
      // Store user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      // Set the auth token for subsequent API calls
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      // Update the user state
      setUser(data);
      return data;
    } catch (error) {
      // Throw the error so the component can catch it and display a message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      throw new Error(message);
    }
  };

  // Logout function
  const logout = () => {
    // Remove user from localStorage and state
    localStorage.removeItem("userInfo");
    setUser(null);
    // Remove the auth header from the api instance
    delete api.defaults.headers.common["Authorization"];
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
