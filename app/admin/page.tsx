"use client";

import { FC } from 'react';
import { AdminGatekeeper } from '@/components/auth/AdminGatekeeper';
import { SourcesTable } from './components/SourcesTable'; // Assuming it's moved
import { AddSourceForm } from './components/AddSourceForm';
import { ScrapeButton } from './components/ScrapeButton';
import { TooltipProvider } from '@/components/ui/tooltip';

// The actual page content, rendered only if authenticated
const SourceAdminPageContent: FC = () => {
    return (
        <TooltipProvider>
            <div className='w-[80vw] max-w-10xl mx-auto p-6 space-y-8'>
                <h1 className='text-3xl font-bold mb-4 text-cyan-700 dark:text-cyan-300'>Source Management</h1>
                <AddSourceForm />
                <ScrapeButton />
                <SourcesTable />
            </div>
        </TooltipProvider>
    );
};

// The default export for the /admin route
export default function SourceAdminPage() {
    return (
        <AdminGatekeeper>
            <SourceAdminPageContent />
        </AdminGatekeeper>
    );
}