"use client";
import { AddSourceForm } from "@/app/admin/components/AddSourceForm";
import { ScrapeButton } from "@/app/admin/components/ScrapeButton";
import { SourcesTable } from "@/app/admin/components/SourcesTable";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function SourceAdminPage() {
    return (
        <TooltipProvider>
            <div className='w-[80vw] max-w-10xl mx-auto p-6 space-y-8'>
                <h1 className='text-3xl font-bold mb-4 text-cyan-700 dark:text-cyan-300'>
                    Source Management
                </h1>

                <AddSourceForm />
                <ScrapeButton />
                <SourcesTable />
            </div>
        </TooltipProvider>
    );
}
