// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Failed to parse stored user data:", e);
        localStorage.removeItem("currentUser");
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@example.com" && password === "password") {
          const demoUser = {
            id: 1,
            name: "Demo User",
            email: email,
            role: "student", // Add full mock data details for Demo User
            profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
            college: "IIT Bombay",
            state: "Maharashtra",
            branch: "CSE",
            skills: ["Frontend", "React", "Node.js", "UI/UX"],
            achievements: "Simulated Achievement 1; Simulated Achievement 2",
            bio: "This is a simulated bio for the logged-in demo user.",
            status: "available",
            socialLinks: {
              linkedin: "https://linkedin.com/in/demolinkedin",
              github: "https://github.com/demogithub",
            },
          };
          setUser(demoUser);
          setIsLoggedIn(true);
          localStorage.setItem("currentUser", JSON.stringify(demoUser));
          setLoading(false);
          resolve(demoUser);
        } else {
          setLoading(false);
          reject(new Error("Invalid credentials."));
        }
      }, 500);
    });
  };

  const signup = (name, email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          name,
          email,
          role: "student", // Add default full mock data for new signup
          profilePicture: "https://via.placeholder.com/150?text=New",
          college: "New College",
          state: "New State",
          branch: "New Branch",
          skills: ["New Skill"],
          achievements: "New Achievement",
          bio: "New Bio",
          status: "available",
          socialLinks: {},
        };
        console.log("Simulated signup for:", newUser);
        setLoading(false);
        resolve(newUser);
      }, 500);
    });
  };

  const logout = () => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("currentUser");
        setLoading(false);
        resolve();
      }, 300);
    });
  };

  // NEW: Function to update the user object in context
  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("currentUser", JSON.stringify(newUserData)); // Keep local storage in sync
  };

  const authContextValue = {
    user,
    isLoggedIn,
    loading,
    login,
    logout,
    signup,
    updateUser, // NEW: Add updateUser to context value
  };

  if (loading) {
    return (
      <div
        className="app-loading-screen flex-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--bg-light)",
          color: "var(--text-dark)",
        }}
      >
        Loading app...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
