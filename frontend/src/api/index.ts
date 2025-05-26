import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  // withCredentials: true, // 暂时注释掉，确保不误触 CORS 校验
});

export default api;
