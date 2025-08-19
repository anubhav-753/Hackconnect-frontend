import React, { useState } from "react";
import { Link } from "react-router-dom"; // useNavigate has been removed
import { useAuth } from "../contexts/AuthContext";
import "./AuthPage.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { signup } = useAuth();
  // The unused navigate variable has been removed

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await signup(name, email, password);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Signup failed. Please try again.";
      setMessage(errorMessage);
    }
  };

  return (
    // ... JSX remains the same
    <div className="page-section auth-page flex-center">
      <div className="auth-card shadow-md rounded-md">
        <h1 className="auth-title">Create Your Account</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && <p className="auth-message error">{message}</p>}
          <div className="form-actions">
            <button type="submit" className="primary-btn form-submit-btn">
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
