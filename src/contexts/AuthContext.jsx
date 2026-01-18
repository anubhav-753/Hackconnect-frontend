// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { loginUser, registerUser, getProfile } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  // Load logged‑in user profile on app start / token change
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const { data } = await getProfile(token); // GET /api/users/profile
          setUser(data);
        } catch (err) {
          console.error("Failed to load user profile", err);
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Initialize Socket.IO when a user is available
  useEffect(() => {
    if (!user) return;

    const socketUrl =
      process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

    const newSocket = io(socketUrl);
    // Join personal room using Mongo _id
    newSocket.emit("join", user._id);

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // Login supports:
  //   login({ email, password })  OR  login(email, password)
  const login = async (emailOrForm, password) => {
    const credentials =
      typeof emailOrForm === "object"
        ? emailOrForm
        : { email: emailOrForm, password };

    const { data } = await loginUser(credentials); // POST /api/users/login
    // data: { _id, name, email, ..., token }

    localStorage.setItem("token", data.token);
    setToken(data.token);

    const { token: _token, ...userWithoutToken } = data;
    setUser(userWithoutToken);

    return data;
  };

  // Register then auto‑login (backend also returns token)
  const register = async (formData) => {
    const { data } = await registerUser(formData); // POST /api/users/register

    // If you want manual login after register, remove these lines:
    localStorage.setItem("token", data.token);
    setToken(data.token);
    const { token: _token, ...userWithoutToken } = data;
    setUser(userWithoutToken);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);

    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  const value = { user, token, login, register, logout, loading, socket };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
