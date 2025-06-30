import { create } from 'zustand';

export interface AuthCredentials {
    username: string;
    password: string;
}

interface AuthState {
    auth: AuthCredentials | null;
    login: (credentials: AuthCredentials) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    auth: null,
    login: (credentials) => set({ auth: credentials }),
    logout: () => set({ auth: null }),
}));