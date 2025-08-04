// src/pages/ContactPage.jsx
import React from "react";
import "./ContactPage.css"; // Create this CSS file next

function ContactPage() {
  return (
    <div className="page-section contact-page">
      <div className="container contact-container">
        <h1 className="page-title">Contact Us</h1>
        <p className="contact-description">
          We'd love to hear from you! Whether you have a question, feedback, or
          need assistance, our team is here to help.
        </p>

        <div className="contact-info-grid">
          <div className="contact-info-card shadow-md rounded-md">
            <h3>General Inquiries</h3>
            <p>
              Email:{" "}
              <a href="mailto:info@hackconnect.com">info@hackconnect.com</a>
            </p>
          </div>
          <div className="contact-info-card shadow-md rounded-md">
            <h3>Support</h3>
            <p>
              Email:{" "}
              <a href="mailto:support@hackconnect.com">
                support@hackconnect.com
              </a>
            </p>
            <p>Live Chat: Available Mon-Fri, 9 AM - 5 PM IST</p>
          </div>
          <div className="contact-info-card shadow-md rounded-md">
            <h3>Partnerships</h3>
            <p>
              Email:{" "}
              <a href="mailto:partnerships@hackconnect.com">
                partnerships@hackconnect.com
              </a>
            </p>
          </div>
        </div>

        <div className="contact-form-section shadow-md rounded-md">
          <h2>Send Us a Message</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Your Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Your Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-input"
                placeholder="Subject of your message"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                className="form-input"
                rows="5"
                placeholder="Your message"
                required
              ></textarea>
            </div>
            <div className="form-actions">
              <button
                type="submit"
                className="primary-btn form-submit-btn transition-ease"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
