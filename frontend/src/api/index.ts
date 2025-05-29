
// src/api/index.ts
import axios from 'axios';
import type { AxiosInstance } from 'axios';
// import type { BaseResponse } from '../types/api';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

// Request Interceptor (can add token, etc.)
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (Uniformly processes code!) The logic of == 200
instance.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || '请求失败'));
    }

    return res.data; 
  },
  (error) => {
    return Promise.reject(error);
  }
);



export default instance;

