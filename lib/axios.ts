import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080", //THERe might be a problem in here ???
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response);
        return Promise.reject(error);
    },
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
