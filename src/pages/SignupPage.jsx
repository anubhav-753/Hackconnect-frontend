// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // NEW: Import useNavigate
import "./AuthPage.css";
import { useAuth } from "../contexts/AuthContext"; // NEW: Import useAuth

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { signup } = useAuth(); // NEW: Get signup function from context
  const navigate = useNavigate(); // NEW: Get navigate function

  const handleSubmit = async (e) => {
    // Made async
    e.preventDefault();
    setMessage("");

    if (!name || !email || !password || !confirmPassword) {
      setMessage("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      await signup(name, email, password); // Call signup function from context
      setMessage("Account created successfully! Redirecting to login...");
      // Redirect to login page after successful signup
      setTimeout(() => {
        // Small delay for message to be seen
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="page-section auth-page flex-center">
      <div className="auth-card shadow-md rounded-md">
        <h1 className="auth-title">Create Your HackConnect Account</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <p
              className={`auth-message ${
                message.includes("successfully") ? "success" : "error"
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
              Sign Up
            </button>
          </div>
        </form>
        <p className="auth-switch-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-switch-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
