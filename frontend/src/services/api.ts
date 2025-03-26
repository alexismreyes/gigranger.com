import axios from 'axios';

//THIS FILE INTENTS TO AVOID THE USAGE OF TOKEN ON EACH API REQUEST,
// THIS WAY WE CENTRALIZE THE USAGE OF THE TOKEN FOR EVERY API REQUEST

const API = `${import.meta.env.VITE_API_URL}`;

const api = axios.create({
  baseURL: API,
});

//attach the token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); //retrieve the token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
