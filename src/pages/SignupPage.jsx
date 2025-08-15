import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./AuthPage.css"; // Assuming you reuse the same CSS as the login page

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await signup(name, email, password);
      // On success, the AuthContext handles the user state and token.
      // We can now redirect to the user's new profile page.
      navigate("/profile");
    } catch (err) {
      // Display the actual error message from the backend API
      const errorMessage =
        err.response?.data?.message || "Signup failed. Please try again.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="page-section auth-page flex-center">
      <div className="auth-card shadow-md rounded-md">
        <h1 className="auth-title">Create Your Account</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="e.g., Sita Devi"
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
              className="form-input"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && <p className="auth-message error">{message}</p>}

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
