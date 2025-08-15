import api from './api';

// Get all active hackathons (Public)
export const getAllHackathons = () => {
  return api.get('/hackathons');
};

// Get a single hackathon by its ID (Public)
export const getHackathonById = (id) => {
  return api.get(`/hackathons/${id}`);
};

// Create a new hackathon (Protected)
export const createHackathon = (data) => {
  return api.post('/hackathons', data);
};

// Update a hackathon (Protected)
export const updateHackathon = (id, data) => {
  return api.put(`/hackathons/${id}`, data);
};

// Delete a hackathon (Protected)
export const deleteHackathon = (id) => {
  return api.delete(`/hackathons/${id}`);
};