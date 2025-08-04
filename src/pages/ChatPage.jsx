// src/pages/ChatPage.jsx
import React from "react";
import "./ChatPage.css"; // Create this CSS file next

function ChatPage() {
  return (
    <div className="page-section chat-page">
      <div className="container chat-container">
        <h1 className="page-title">Real-time Chat</h1>
        <p className="chat-subtitle">
          Connect with your teammates and form groups!
        </p>

        <div className="chat-placeholder-box shadow-md rounded-md">
          <h3>Chat Functionality Coming Soon!</h3>
          <p>
            A fully functional real-time chat requires a backend server and
            database for message storage and WebSockets for instant
            communication.
            <br />
            Once the backend is integrated, you'll be able to:
          </p>
          <ul>
            <li>Chat with accepted teammates.</li>
            <li>Create and join team-specific group chats.</li>
            <li>Send and receive messages in real-time.</li>
          </ul>
          <p className="chat-placeholder-note">Stay tuned for updates!</p>
        </div>

        {/* You would build your actual chat interface here */}
        {/* E.g., Chat list on left, message area on right */}
      </div>
    </div>
  );
}

export default ChatPage;
