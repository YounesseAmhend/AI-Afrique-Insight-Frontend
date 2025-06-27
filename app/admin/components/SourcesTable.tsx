"use client";
import Link from "@/components/link";
import { useGetSources } from "@/hooks/useSourceQuery";
import { ArrowUpRight, Check, Loader2, X } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

function formatDate(dateString?: string | null) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date
        .toLocaleString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
        .replace(",", "");
}

export function SourcesTable() {
    const { data: sources, isLoading, isError, error } = useGetSources();

    return (
        <div className='overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'>
            <table className='min-w-full rounded-xl overflow-hidden'>
                <thead className='bg-cyan-600'>
                    <tr>
                        <th className='px-6 py-4 text-left text-white font-medium'>
                            URL
                        </th>
                        <th className='px-6 py-4 text-center text-white font-medium'>
                            AI
                        </th>
                        <th className='px-6 py-4 text-center text-white font-medium'>
                            Africa
                        </th>
                        <th className='px-6 py-4 text-center text-white font-medium'>
                            Status
                        </th>
                        <th className='px-6 py-4 text-center text-white font-medium'>
                            Created At
                        </th>
                        <th className='px-6 py-4 text-center text-white font-medium'>
                            Updated At
                        </th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-100 dark:divide-gray-800'>
                    {isLoading ? (
                        <tr>
                            <td colSpan={6} className='px-6 py-8 text-center'>
                                <div className='flex justify-center'>
                                    <Loader2 className='animate-spin w-8 h-8 text-gray-500' />
                                </div>
                            </td>
                        </tr>
                    ) : isError ? (
                        <tr>
                            <td
                                colSpan={6}
                                className='px-6 py-8 text-center text-red-600'
                            >
                                <div className='flex items-center gap-2'>
                                    <X className='w-5 h-5' />
                                    {(error as any)?.message ||
                                        "Failed to load sources."}
                                </div>
                            </td>
                        </tr>
                    ) : sources && sources.length > 0 ? (
                        sources.map((source) => (
                            <tr key={source.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <td className='px-6 py-4 max-w-[260px]'>
                                    <Link
                                        href={source.url}
                                        className='inline-flex items-center gap-2 text-cyan-700 dark:text-cyan-300 font-medium hover:underline whitespace-nowrap overflow-hidden text-ellipsis max-w-full'
                                        style={{
                                            display: "inline-flex",
                                            maxWidth: "220px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            verticalAlign: "middle",
                                        }}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        title={source.url}
                                    >
                                        <ArrowUpRight className='w-4 h-4 flex-shrink-0' />
                                        {source.url}
                                    </Link>
                                </td>
                                <td className='px-6 py-4 text-center'>
                                    {source.triggerAi ? (
                                        <Check className='w-5 h-5 text-green-600' />
                                    ) : (
                                        <X className='w-5 h-5 text-red-600' />
                                    )}
                                </td>
                                <td className='px-6 py-4 flex justify-center text-center items-center'>
                                    {source.triggerAfrica ? (
                                        <Check className='w-5 h-5 text-green-600' />
                                    ) : (
                                        <X className='w-5 h-5 text-red-600' />
                                    )}
                                </td>
                                <td className='px-6 py-4 text-center'>
                                    <StatusBadge status={source.status} />
                                </td>
                                <td className='px-6 py-4 text-center'>
                                    {formatDate(source.createdAt)}
                                </td>
                                <td className='px-6 py-4 text-center'>
                                    {formatDate(source.updatedAt)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className='text-center py-4'>
                                No sources found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
