"use client";

import { useState, FC } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAuthStore, AuthCredentials } from '@/store/auth';
import { performLogin } from '@/lib/axios';

interface AdminLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: () => void;
}

export const AdminLoginModal: FC<AdminLoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginAction = useAuthStore((state) => state.login);

    const mutation = useMutation<void, AxiosError, AuthCredentials>({
        mutationFn: performLogin,
        onSuccess: (_, variables) => {
            loginAction({ username: variables.username, password: variables.password });
            onLoginSuccess();
        },
    });

    if (!isOpen) return null;

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({ username, password });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    {mutation.isError && (
                        <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">
                            {mutation.error.response?.status === 401
                                ? 'Invalid username or password.'
                                : 'An error occurred.'}
                        </p>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
                    </div>
                    <button type="submit" disabled={mutation.isPending} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:bg-blue-300">
                        {mutation.isPending ? 'Signing In...' : 'Sign In'}
                    </button>
                    <button type="button" onClick={onClose} className="mt-4 text-center w-full text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                </form>
            </div>
        </div>
    );
};