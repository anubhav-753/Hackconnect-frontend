// src/services/authService.js
import api from './api';

/**
 * Sends a login request to the API.
 * @param {object} credentials - User's email and password.
 * @returns {Promise} - The axios promise.
 */
export const loginUser = (credentials) => {
  return api.post('/users/login', credentials);
};

/**
 * Sends a registration request to the API.
 * @param {object} userData - User's name, email, and password.
 * @returns {Promise} - The axios promise.
 */
export const registerUser = (userData) => {
  return api.post('/users/register', userData);
};

/**
 * Sends a request to update the user's profile.
 * @param {object} userData - The updated user data.
 * @returns {Promise} - The axios promise.
 */
export const updateUserProfile = (userData) => {
    // The user's ID is not needed here because the backend can identify
    // the user from the JWT token sent in the Authorization header.
    return api.put('/users/profile', userData);
};