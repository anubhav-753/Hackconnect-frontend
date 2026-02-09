import api from './api';

// Get all conversations for the current user
export const getMyChats = async () => {
    const { data } = await api.get('/chats');
    return data;
};

// Get messages for a specific chat
export const getChatMessages = async (chatId) => {
    const { data } = await api.get(`/messages/${chatId}`);
    return data;
};

// Create a new chat or get existing one with a user
export const accessChat = async (userId) => {
    const { data } = await api.post('/chats', { userId });
    return data;
};

// Send a message
export const sendMessage = async (chatId, content) => {
    const { data } = await api.post('/messages', { chatId, content });
    return data;
};

// Create a group chat
export const createGroupChat = async (name, users) => {
    const { data } = await api.post('/chats/group', {
        name,
        users: JSON.stringify(users.map((u) => u._id)),
    });
    return data;
};

// Rename group
export const renameGroup = async (chatId, chatName) => {
    const { data } = await api.put('/chats/rename', { chatId, chatName });
    return data;
};

// Add user to group
export const addToGroup = async (chatId, userId) => {
    const { data } = await api.put('/chats/groupadd', { chatId, userId });
    return data;
};

// Remove user from group
export const removeFromGroup = async (chatId, userId) => {
    const { data } = await api.put('/chats/groupremove', { chatId, userId });
    return data;
};
