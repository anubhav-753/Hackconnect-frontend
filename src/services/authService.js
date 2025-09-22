import api from './api';

/**
 * Login user
 */
export const loginUser = async (credentials) => {
  const { data } = await api.post('/users/login', credentials);
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
};

/**
 * Register user
 */
export const registerUser = async (userData) => {
  const { data } = await api.post('/users/register', userData);
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userData) => {
  const { data } = await api.put('/users/profile', userData);
  localStorage.setItem('userInfo', JSON.stringify(data)); // 🔑 Ensure sync
  return data;
};

// ✅ Get recommended students
export const getRecommendedStudents = async () => {
  const { data } = await api.get('/users/recommendations');
  return data;
};