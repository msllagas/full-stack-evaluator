import axios from 'axios';
import axiosLib from 'axios';
const api = axiosLib.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  return config;
})
export default api;
