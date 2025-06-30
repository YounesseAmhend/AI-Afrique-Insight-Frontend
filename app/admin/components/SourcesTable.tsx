"use client";
import Link from "@/components/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    useDeleteSource,
    useGetSources,
    useUpdateSourceUrl,
} from "@/hooks/useSourceQuery";
import { ArrowUpRight, Check, Edit, Loader2, Trash, X } from "lucide-react";
import { useState } from "react";
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
    const deleteSourceMutation = useDeleteSource();
    const updateSourceUrlMutation = useUpdateSourceUrl();
    const [editingSourceId, setEditingSourceId] = useState<number | null>(null);
    const [newUrl, setNewUrl] = useState("");
    const [newContainsAiContent, setNewContainsAiContent] = useState(false);
    const [newContainsAfricaContent, setNewContainsAfricaContent] =
        useState(false);

    const handleDelete = async (id: number) => {
        try {
            await deleteSourceMutation.mutateAsync(id);
        } catch (error) {
            console.error("Failed to delete source:", error);
        }
    };

    const handleUpdateUrl = async (id: number) => {
        try {
            await updateSourceUrlMutation.mutateAsync({
                id,
                url: newUrl,
                containsAiContent: newContainsAiContent,
                containsAfricaContent: newContainsAfricaContent,
            });
            setEditingSourceId(null);
            setNewUrl("");
            setNewContainsAiContent(false);
            setNewContainsAfricaContent(false);
        } catch (error) {
            console.error("Failed to update source URL:", error);
        }
    };

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
                        <th className='px-6 py-4 text-center text-white font-medium'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-100 dark:divide-gray-800'>
                    {isLoading ? (
                        <tr>
                            <td colSpan={7} className='px-6 py-8 text-center'>
                                <div className='flex justify-center'>
                                    <Loader2 className='animate-spin w-8 h-8 text-gray-500' />
                                </div>
                            </td>
                        </tr>
                    ) : isError ? (
                        <tr>
                            <td
                                colSpan={7}
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
                            <tr
                                key={source.id}
                                className='hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                            >
                                <td className='px-6 py-4 max-w-[260px]'>
                                    {editingSourceId === source.id ? (
                                        <div className='flex flex-col gap-2'>
                                            <Input
                                                value={newUrl}
                                                onChange={(e) =>
                                                    setNewUrl(e.target.value)
                                                }
                                                placeholder='Enter new URL'
                                            />
                                            <div className='flex gap-4'>
                                                <label className='flex items-center gap-2'>
                                                    <input
                                                        type='checkbox'
                                                        checked={
                                                            newContainsAiContent
                                                        }
                                                        onChange={(e) =>
                                                            setNewContainsAiContent(
                                                                e.target
                                                                    .checked,
                                                            )
                                                        }
                                                    />
                                                    <span>
                                                        Contains AI Content
                                                    </span>
                                                </label>
                                                <label className='flex items-center gap-2'>
                                                    <input
                                                        type='checkbox'
                                                        checked={
                                                            newContainsAfricaContent
                                                        }
                                                        onChange={(e) =>
                                                            setNewContainsAfricaContent(
                                                                e.target
                                                                    .checked,
                                                            )
                                                        }
                                                    />
                                                    <span>
                                                        Contains Africa Content
                                                    </span>
                                                </label>
                                            </div>
                                            <Button
                                                size='sm'
                                                onClick={() =>
                                                    handleUpdateUrl(source.id)
                                                }
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    ) : (
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
                                    )}
                                </td>
                                <td className='px-6 py-4 text-center'>
                                    {!source.triggerAi ? (
                                        <Check className='w-5 h-5 text-green-600' />
                                    ) : (
                                        <X className='w-5 h-5 text-red-600' />
                                    )}
                                </td>
                                <td className='px-6 py-4 flex justify-center text-center items-center'>
                                    {!source.triggerAfrica ? (
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
                                <td className='px-6 py-4 text-center'>
                                    <div className='flex gap-2 justify-center'>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={() => {
                                                setEditingSourceId(source.id);
                                                setNewUrl(source.url);
                                                setNewContainsAiContent(
                                                    !source.triggerAi,
                                                );
                                                setNewContainsAfricaContent(
                                                    !source.triggerAfrica,
                                                );
                                            }}
                                        >
                                            <Edit className='w-4 h-4' />
                                        </Button>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={() =>
                                                handleDelete(source.id)
                                            }
                                        >
                                            <Trash className='w-4 h-4 text-red-600' />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className='text-center py-4'>
                                No sources found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
