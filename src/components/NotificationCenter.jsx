import React, { useEffect, useState } from "react";
import api from "../services/api";   // ← your axios instance
import { FaBell, FaUserPlus, FaCheckCircle } from "react-icons/fa";
import "./NotificationCenter.css";

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load notifications from backend
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/notifications");
      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      await api.put("/notifications/mark-read");
      fetchNotifications();
    } catch (err) {
      console.error("Error marking read:", err);
    }
  };

  return (
    <div className="notif-wrapper">
      {/* Bell Icon */}
      <button className="notif-icon" onClick={() => setOpen(!open)}>
        <FaBell />
        {/* red dot indicator if unread notifications */}
        {notifications.some((n) => !n.read) && <span className="notif-dot"></span>}
      </button>

      {open && (
        <div className="notif-dropdown">
          <div className="notif-header">
            <h4>Notifications</h4>
            {notifications.length > 0 && (
              <button className="mark-read" onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
          </div>

          {loading && <p className="notif-msg">Loading...</p>}
          {!loading && notifications.length === 0 && (
            <p className="notif-msg">No notifications yet.</p>
          )}

          {notifications.map((n) => (
            <div
              key={n._id}
              className={`notif-item ${n.read ? "read" : "unread"}`}
            >
              <img
                className="notif-avatar"
                src={n.sender?.avatar || "/default-avatar.png"}
                alt={n.sender?.name}
              />
              <div className="notif-text">
                <p>{n.message}</p>
                <small>
                  {new Date(n.createdAt).toLocaleDateString()} • 
                  {new Date(n.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>

              {n.type === "request-sent" && (
                <FaUserPlus color="#2563eb" title="Request Sent" />
              )}
              {n.type === "request-accepted" && (
                <FaCheckCircle color="#16a34a" title="Request Accepted" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;