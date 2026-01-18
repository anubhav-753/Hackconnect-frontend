import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth
import {
  FaBell,
  FaUserPlus,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import "./NotificationCenter.css";

const NotificationCenter = () => {
  const { user, socket } = useAuth(); // Get socket from context
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // 1. Fetch old notifications from Database
  useEffect(() => {
    const fetchExistingNotifications = async () => {
      if (user) {
        try {
          const { data } = await api.get("/notifications");
          setNotifications(data);
          setUnreadCount(data.filter((n) => !n.isRead).length);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };
    fetchExistingNotifications();
  }, [user]);

  // 2. Listen for Real-Time Socket Events
  useEffect(() => {
    if (!socket) return;

    // Listen for 'newNotification' event from backend
    socket.on("newNotification", (newNotif) => {
      // Add new notification to list
      setNotifications((prev) => [newNotif, ...prev]);
      // Increase badge count
      setUnreadCount((prev) => prev + 1);
    });

    // Cleanup listener on unmount
    return () => {
      socket.off("newNotification");
    };
  }, [socket]);

  const markAsRead = async () => {
    if (unreadCount > 0) {
      try {
        await api.put("/notifications/mark-read");
        setUnreadCount(0);
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      } catch (error) {
        console.error("Failed to mark notifications as read");
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-container">
      <div className="notification-icon" onClick={markAsRead}>
        <FaBell size={24} />
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </div>

      {isOpen && (
        <div className="notification-dropdown">
          <h3>Notifications</h3>
          {notifications.length === 0 ? (
            <p className="no-notif">No notifications yet.</p>
          ) : (
            <ul>
              {notifications.map((notif, index) => (
                <li key={index} className={notif.isRead ? "read" : "unread"}>
                  <span className="notif-icon">
                    {notif.type === "connection_request" ? (
                      <FaUserPlus className="text-blue-500" />
                    ) : notif.type === "connection_accepted" ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaExclamationCircle className="text-yellow-500" />
                    )}
                  </span>
                  <div className="notif-content">
                    <p>{notif.message}</p>
                    <span className="notif-time">
                      {new Date(notif.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
