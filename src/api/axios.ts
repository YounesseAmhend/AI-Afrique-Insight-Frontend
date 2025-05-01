import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 1000,
    //this might not be needed but laho a3lame
    headers: {
        'Content-Type':'application/json'
    },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response);
    return Promise.reject(error);
  }
);

export default api;

// Add request interceptor for auth tokens (if needed in the future) we probably will add it next
// api.interceptors.request.use(
//   (config) => {
//     // You can add auth token here when you implement authentication
//     // const token = localStorage.getItem('token');
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );