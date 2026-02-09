import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getMyChats, getChatMessages, sendMessage, accessChat } from "../services/chatService";
import { searchUsers } from "../services/authService"; // Import search
import "./ChatPage.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaPaperPlane, FaArrowLeft, FaSearch, FaCommentDots, FaUserPlus } from "react-icons/fa";

const ChatPage = () => {
  const { user, socket } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);



  // 1. Fetch all conversations on mount
  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const data = await getMyChats();
        setChats(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load chats", error);
        setChats([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchChats();
    }
  }, [user]);

  // 2. Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleMessageReceived = (newMessageReceived) => {
      // If the message belongs to the currently selected chat
      if (
        selectedChat &&
        selectedChat._id === newMessageReceived.chat._id
      ) {
        setMessages((prev) => [...prev, newMessageReceived]);
      }

      // Update the chat list (latest message)
      setChats((prevChats) => {
          const updatedChats = prevChats.map(c => 
            c._id === newMessageReceived.chat._id 
              ? { ...c, latestMessage: newMessageReceived } 
              : c
          );
          // If not in list, maybe fetch new chat? For now just update existing.
          const existing = prevChats.find(c => c._id === newMessageReceived.chat._id);
          if (!existing) {
             // Optionally fetch the new chat details here
             // fetchChats();
          }
          
          return updatedChats.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      });
    };

    socket.on("message received", handleMessageReceived);

    return () => {
      socket.off("message received", handleMessageReceived);
    };
  }, [socket, selectedChat]);

  // 3. Fetch messages when a chat is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      setLoadingMessages(true);
      try {
        const data = await getChatMessages(selectedChat._id);
        const msgs = Array.isArray(data) ? data : [];
        setMessages(msgs);
        // Join the chat room
        if(socket) socket.emit("join chat", selectedChat._id);
      } catch (error) {
        console.error("Failed to load messages", error);
        setMessages([]);
      } finally {
        setLoadingMessages(false);
        scrollToBottom();
      }
    };

    fetchMessages();
  }, [selectedChat, socket]);

  // Handle Search
  useEffect(() => {
    const timer = setTimeout(async () => {
        if (searchQuery.trim()) {
            setLoadingSearch(true);
            try {
                const data = await searchUsers(searchQuery);
                setSearchResults(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to search users", error);
                setSearchResults([]);
            } finally {
                setLoadingSearch(false);
            }
        } else {
            setSearchResults([]);
        }
    }, 500); // Debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);


  // Create or Access Chat
  const handleAccessChat = async (userId) => {
      try {
          const data = await accessChat(userId);
          // Add to chats if not already there
          if (!chats.find(c => c._id === data._id)) {
              setChats([data, ...chats]);
          }
          setSelectedChat(data);
          setSearchQuery(""); // Clear search
          setSearchResults([]);
      } catch (error) {
          console.error("Failed to access chat", error);
      }
  };


  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      setNewMessage(""); // Optimistic clear
      const data = await sendMessage(selectedChat._id, newMessage);
      setMessages((prev) => [...prev, data]);
      setChats((prev) => {
          const updated = prev.map(c => c._id === selectedChat._id ? { ...c, latestMessage: data } : c);
           // Move to top
           const chat = updated.find(c => c._id === selectedChat._id);
           const others = updated.filter(c => c._id !== selectedChat._id);
           return [chat, ...others];
      });
      
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const getSenderName = (chat) => {
    if (!user || !chat.users) return "Unknown";
    if (chat.isGroupChat) return chat.chatName;
    const sender = chat.users.find(u => u._id !== user._id);
    return sender ? sender.name : "Unknown User";
  };

  const getSenderAvatar = (chat) => {
      if (!user) return "";
      if (chat.isGroupChat) return "https://ui-avatars.com/api/?name=" + chat.chatName;
      const sender = chat.users?.find(u => u._id !== user._id);
      return sender?.avatar || "https://ui-avatars.com/api/?name=" + (sender?.name || "User");
  };

  if (!user) return <LoadingSpinner />;

  return (
    <div className="chat-page">
      <div className="chat-container">
        {/* SIDEBAR */}
        <div className={`chat-sidebar ${selectedChat ? "hidden-mobile" : ""}`}>
          <div className="sidebar-header">
            <h2>Chats</h2>
            {/* Can add a toggle for Group Chat creation later */}
          </div>
          
          <div className="search-bar-container">
            <div style={{ position: 'relative' }}>
                <FaSearch style={{ position: 'absolute', left: 10, top: 12, color: '#9ca3af' }} />
                <input 
                    type="text" 
                    placeholder="Search users to chat..." 
                    className="search-bar" 
                    style={{ paddingLeft: 35 }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          </div>

          <div className="chat-list">
            {searchQuery ? (
                // SEARCH RESULTS
                loadingSearch ? (
                    <div style={{ padding: 20, textAlign: 'center' }}>Searching...</div>
                ) : searchResults.length === 0 ? (
                    <div style={{ padding: 20, textAlign: 'center', color: '#6b7280' }}>No users found</div>
                ) : (
                    searchResults.map((u) => (
                        <div
                            key={u._id}
                            onClick={() => handleAccessChat(u._id)}
                            className="chat-item"
                        >
                            <img 
                                src={u.avatar || "https://ui-avatars.com/api/?name=" + u.name} 
                                alt="avatar" 
                                className="avatar" 
                            />
                            <div className="chat-info">
                                <h4 className="chat-name">{u.name}</h4>
                                <p className="chat-last-msg">Click to start chat</p>
                            </div>
                        </div>
                    ))
                )
            ) : (
                // EXISTING CHATS
                loading ? (
                    <div style={{ padding: 20, textAlign: 'center' }}>Loading chats...</div>
                ) : chats.length === 0 ? (
                    <div style={{ padding: 20, textAlign: 'center', color: '#6b7280' }}>No chats yet. Search for a user to start chatting!</div>
                ) : (
                    chats.map((chat) => (
                    <div
                        key={chat._id}
                        onClick={() => setSelectedChat(chat)}
                        className={`chat-item ${selectedChat?._id === chat._id ? "active" : ""}`}
                    >
                        <img 
                            src={getSenderAvatar(chat)} 
                            alt="avatar" 
                            className="avatar" 
                        />
                        <div className="chat-info">
                            <h4 className="chat-name">{getSenderName(chat)}</h4>
                            <p className="chat-last-msg">
                                {chat.latestMessage ? (
                                    <>
                                        {chat.latestMessage.sender._id === user._id ? "You: " : ""}
                                        {chat.latestMessage.content}
                                    </>
                                ) : (
                                    "Start a conversation"
                                )}
                            </p>
                        </div>
                    </div>
                    ))
                )
            )}
          </div>
        </div>

        {/* CHAT AREA */}
        <div className={`chat-area ${selectedChat ? "active" : ""}`}>
          {selectedChat ? (
            <>
              <div className="chat-header">
                <div className="header-user-info">
                  <button className="back-button" onClick={() => setSelectedChat(null)}>
                    <FaArrowLeft />
                  </button>
                  <img
                    src={getSenderAvatar(selectedChat)}
                    alt="Current user"
                    className="header-avatar"
                  />
                  <div className="header-details">
                    <h3>{getSenderName(selectedChat)}</h3>
                    {/* Placeholder status */}
                    <span className="header-status">Online</span> 
                  </div>
                </div>
              </div>

              <div className="messages-wrapper">
                {loadingMessages ? (
                   <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}><LoadingSpinner /></div>
                ) : (
                    messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`message ${
                            (msg.sender?._id || msg.sender) === user._id ? "sent" : "received"
                            }`}
                        >
                            <span className="msg-content">{msg.content}</span>
                            <span className="msg-meta">
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className="chat-input-area" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="chat-input"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
                  <FaPaperPlane />
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="empty-illustration">💬</div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: 10 }}>Select a chat to start messaging</h2>
              <p>Choose from your existing conversations or search to find friends.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
