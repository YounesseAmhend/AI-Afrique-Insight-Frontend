"use client";

import { useState, FC, ReactNode } from 'react';
import { useAuthStore } from '@/store/auth';
import { AdminLoginModal } from './AdminLoginModal';

interface AdminGatekeeperProps {
    children: ReactNode;
}

export const AdminGatekeeper: FC<AdminGatekeeperProps> = ({ children }) => {
    const auth = useAuthStore((state) => state.auth);
    const [isModalOpen, setModalOpen] = useState(false);

    if (auth) {
        return <>{children}</>;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <div className="text-center p-10 border rounded-lg bg-white shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800">Admin Access Required</h2>
                    <p className="text-gray-600 my-4">Please log in to access the source management panel.</p>
                    <button onClick={() => setModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
                        Login
                    </button>
                </div>
            </div>
            <AdminLoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onLoginSuccess={() => setModalOpen(false)} />
        </>
    );
};