// src/services/authService.js
import api from './api';

/**
 * Login user
 * @param {object} credentials - { email, password }
 * @returns {Promise} axios response
 */
export const loginUser = async (credentials) => {
  const { data } = await api.post('/users/login', credentials);
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
};

/**
 * Register user
 * @param {object} userData - { name, email, password }
 * @returns {Promise} axios response
 */
export const registerUser = async (userData) => {
  const { data } = await api.post('/users/register', userData);
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
};

/**
 * Update user profile
 * @param {object} userData - { name, email, status, bio, password }
 * @returns {Promise} axios response
 */
export const updateUserProfile = async (userData) => {
  const { data } = await api.put('/users/profile', userData);
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
};