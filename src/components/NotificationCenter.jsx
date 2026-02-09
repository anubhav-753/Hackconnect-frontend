import React, { useEffect, useState, useRef } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { acceptRequest, rejectRequest } from "../services/authService";
import {
  FaBell,
  FaUserPlus,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes
} from "react-icons/fa";
import "./NotificationCenter.css";

const NotificationCenter = () => {
  const { user, socket } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 1. Fetch old notifications from Database
  useEffect(() => {
    const fetchExistingNotifications = async () => {
      if (user) {
        try {
          const { data } = await api.get("/notifications");
          // Ensure data is an array
          const notifs = Array.isArray(data) ? data : [];
          setNotifications(notifs);
          setUnreadCount(notifs.filter((n) => !n.isRead).length);
        } catch (error) {
          console.error("Error fetching notifications:", error);
          setNotifications([]);
        }
      }
    };
    fetchExistingNotifications();
  }, [user]);

  // 2. Listen for Real-Time Socket Events
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (newNotif) => {
      setNotifications((prev) => [newNotif, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    socket.on("newNotification", handleNewNotification);

    return () => {
      socket.off("newNotification", handleNewNotification);
    };
  }, [socket]);

  const markAsRead = async () => {
    if (!isOpen && unreadCount > 0) {
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

  const handleAccept = async (e, notif) => {
    e.stopPropagation(); // Prevent closing dropdown or other clicks
    const senderId = notif.sender?._id || notif.relatedUser || notif.sender; // Handle various backend population scenarios
    if (!senderId) {
        console.error("Sender ID missing", notif); 
        return;
    }

    try {
      await acceptRequest(senderId);
      // Remove notification or update it
      setNotifications((prev) => prev.filter((n) => n._id !== notif._id));
      // Ideally, the backend should emit a 'request_accepted' event, but we optimistically update UI
    } catch (error) {
      console.error("Failed to accept connection request", error);
    }
  };

  const handleReject = async (e, notif) => {
    e.stopPropagation();
    const senderId = notif.sender?._id || notif.relatedUser || notif.sender;
    if (!senderId) return;

    try {
      await rejectRequest(senderId);
      setNotifications((prev) => prev.filter((n) => n._id !== notif._id));
    } catch (error) {
      console.error("Failed to reject connection request", error);
    }
  };

  const handleDelete = async (e, notifId) => {
    e.stopPropagation();
    try {
        // Optimistically remove
        setNotifications((prev) => prev.filter((n) => n._id !== notifId));
        // If there is an endpoint, call it. If not, this is just local cleanup.
        // await api.delete(`/notifications/${notifId}`); 
    } catch (error) {
        console.error("Failed to delete notification", error);
    }
  };

  return (
    <div className="notification-container" ref={dropdownRef}>
      <div className="notification-icon" onClick={markAsRead}>
        <FaBell size={22} />
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </div>

      {isOpen && (
        <div className="notification-dropdown">
          <h3>
            Notifications
            {notifications.some(n => !n.isRead) && (
             <span className="text-xs text-blue-500 cursor-pointer font-normal" onClick={markAsRead}>Mark all read</span>
            )}
          </h3>
          
          {notifications.length === 0 ? (
            <div className="no-notif">
                <FaBell size={40} style={{ opacity: 0.2, marginBottom: 10 }} />
                <p>No new notifications</p>
            </div>
          ) : (
            <ul>
              {notifications.map((notif) => (
                <li key={notif._id || Math.random()} className={notif.isRead ? "read" : "unread"}>
                  <button 
                    className="notif-close-btn"
                    onClick={(e) => handleDelete(e, notif._id)}
                    title="Remove notification"
                  >
                    <FaTimes size={12} />
                  </button>

                  <div className="notif-icon">
                    {notif.type === "connection_request" ? (
                      <FaUserPlus className="text-blue-500" />
                    ) : notif.type === "connection_accepted" ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaExclamationCircle className="text-yellow-500" />
                    )}
                  </div>
                  
                  <div className="notif-content">
                    <p>{notif.message}</p>
                    <span className="notif-time">
                      {new Date(notif.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                    {notif.type === "connection_request" && (
                      <div className="notif-actions">
                        <button 
                          className="btn-accept" 
                          onClick={(e) => handleAccept(e, notif)}
                        >
                          Accept
                        </button>
                        <button 
                          className="btn-reject" 
                          onClick={(e) => handleReject(e, notif)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
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
