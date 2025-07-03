import axios from "axios";
import { useAuthStore, AuthCredentials } from '@/store/auth';

// 1. Create the Axios instance.
// NOTE: CORS headers like 'Access-Control-Allow-Origin' are set by the SERVER, not the client.
// The browser will ignore them if set here. Your Spring Boot backend is already configured for CORS.
export const api = axios.create({
    baseURL: "http://77.37.124.70:3014",
    timeout: 100000000,
    headers: {
        "Content-Type": "application/json",
    },
});

// 2. A single request interceptor to add the auth token.
// This runs for every request made with this Axios instance.
api.interceptors.request.use(
    (config) => {
        // Get the auth token from the Zustand store.
        const { auth } = useAuthStore.getState();
        
        // If a token exists, add it to the Authorization header.
        // This is for all authenticated requests AFTER the user has logged in.
        if (auth) {
            config.headers.Authorization = `Basic ${btoa(`${auth.username}:${auth.password}`)}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors.
        return Promise.reject(error);
    }
);

// 3. A single response interceptor for global error handling.
api.interceptors.response.use(
    (response) => response, // Simply return the successful response.
    (error) => {
        // Log different types of errors for easier debugging.
        if (error.code === "ERR_NETWORK") {
            console.error("Network Error:", "Failed to connect to the server. Is the backend running?");
        } else if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(`API Error: ${error.response.status}`, error.response.data);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Request Error:", error.message);
        }
        return Promise.reject(error);
    },
);


// --- API Functions ---

export interface Source {
    id: number;
    url: string;
}

// This function will automatically use the request interceptor to get the auth header from the store.
export const fetchSources = async (): Promise<Source[]> => {
    const { data } = await api.get('/admin/source');
    return data;
};

// This function is special. It's used to VERIFY credentials before they are stored.
// Therefore, it needs to set the header manually for this one-time check,
// as the interceptor won't have the credentials in the store yet.
export const performLogin = async (credentials: AuthCredentials): Promise<void> => {
    await api.get('/admin/source', {
        headers: {
            Authorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`,
        },
    });
};


// Default export the configured instance for use elsewhere if needed.
export default api;
