// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./AuthPage.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ use `register` (the function that actually exists in AuthContext)
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ pass an object, since AuthContext.register expects formData
      await register({ name, email, password });
      navigate("/profile");
    } catch (err) {
      console.error("Signup error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Signup failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-wrapper">
        <div className="auth-branding">
          <h1>Join HackConnect</h1>
          <p>Find your team and bring your ideas to life.</p>
        </div>

        <div className="auth-form-container">
          <form onSubmit={handleSubmit}>
            <h2>Create Your Account</h2>
            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                placeholder="Your Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
