// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // NEW: Import useNavigate
import "./AuthPage.css";
import { useAuth } from "../contexts/AuthContext"; // NEW: Import useAuth

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For displaying feedback
  const { login } = useAuth(); // NEW: Get login function from context
  const navigate = useNavigate(); // NEW: Get navigate function

  const handleSubmit = async (e) => {
    // Made async to await login
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    try {
      // Call the login function from AuthContext
      await login(email, password); // Await the simulated async login
      setMessage("Login successful! Redirecting...");
      // Redirect to homepage after successful login
      setTimeout(() => {
        // Small delay for message to be seen
        navigate("/");
      }, 1000);
    } catch (err) {
      setMessage(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="page-section auth-page flex-center">
      <div className="auth-card shadow-md rounded-md">
        <h1 className="auth-title">Login to HackConnect</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <p
              className={`auth-message ${
                message.includes("successful") ||
                message.includes("Login attempt in console")
                  ? "success"
                  : "error"
              }`}
            >
              {message}
            </p>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="primary-btn form-submit-btn transition-ease"
            >
              Login
            </button>
          </div>
        </form>
        <p className="auth-switch-text">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-switch-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
