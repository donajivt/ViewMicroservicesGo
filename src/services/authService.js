import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export const register = async (user) => {
  return axios.post(`${API_URL}/auth/register`, user);
};

export const login = async (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

export const ping = async (token) => {
  return axios.get(`${API_URL}/ping`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
