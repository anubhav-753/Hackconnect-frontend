import api from './api';

export const loginUser = async (credentials) => {
  const { data } = await api.post('/users/login', credentials);
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await api.post('/users/register', userData);
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
};

export const updateUserProfile = async (userData) => {
  const { data } = await api.put('/users/profile', userData);
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
};

// Recommendations + Requests
export const getRecommendedStudents = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const { data } = await api.get(`/users/recommendations?${params}`);
  return data;
};

export const sendConnectionRequest = async (userId) => {
  const { data } = await api.post(`/users/${userId}/request`);
  return data;
};

export const getIncomingRequests = async () => {
  const { data } = await api.get('/users/requests');
  return data;
};

export const acceptRequest = async (userId) => {
  const { data } = await api.post(`/users/requests/${userId}/accept`);
  return data;
};

export const rejectRequest = async (userId) => {
  const { data } = await api.post(`/users/requests/${userId}/reject`);
  return data;
};