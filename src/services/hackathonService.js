// src/services/hackathonService.js
import api from './api';

export const getAllHackathons = () => {
  return api.get('/hackathons');
};

export const getHackathonById = (id) => {
  return api.get(`/hackathons/${id}`);
};

export const createHackathon = (hackathonData) => {
  return api.post('/hackathons', hackathonData);
};

export const updateHackathon = (id, hackathonData) => {
  return api.put(`/hackathons/${id}`, hackathonData);
};

export const deleteHackathon = (id) => {
  return api.delete(`/hackathons/${id}`);
};