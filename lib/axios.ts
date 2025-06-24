import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Add CORS header
    },
    withCredentials: true, // Enable credentials for CORS
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === "ERR_NETWORK") {
            console.error("Network Error:", "Failed to connect to the server");
        } else {
            console.error("API Error:", error.response?.data || error.message);
        }
        return Promise.reject(error);
    },
);

// Request interceptor to handle CORS preflight
api.interceptors.request.use(
    (config) => {
        if (config.method?.toUpperCase() === "OPTIONS") {
            config.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";
            config.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
        }
        return config;
    },
    (error) => {
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
