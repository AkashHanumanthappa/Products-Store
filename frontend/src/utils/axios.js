import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/user', // Gets forwarded to http://localhost:5000/api/user via Vite proxy
  withCredentials: true,
});

export default instance;