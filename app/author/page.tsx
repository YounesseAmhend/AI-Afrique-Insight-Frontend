"use client";

import { useGetAllAuthors } from "@/hooks/useAuthorQuery";
import Link from "next/link";

export default function AuthorPage() {
    const { data: authors = [], isLoading, error } = useGetAllAuthors();
    return (
        <div className='min-h-screen flex flex-col bg-white'>
            <div className='container mx-auto px-4 py-12'>
                <div className='mb-12 text-center'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                        Authors
                    </h1>
                    <p className='text-lg text-gray-600'>
                        The researchers and writers contributing to AI knowledge
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {isLoading && (
                        <>
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className='animate-pulse h-64 bg-gray-100 rounded-xl border border-gray-200'
                                ></div>
                            ))}
                        </>
                    )}
                    {error && (
                        <div className='col-span-full text-center py-6'>
                            <div className='inline-flex items-center px-6 py-3 bg-red-50 border border-red-100 rounded-full text-red-600 animate-shake'>
                                <span>⚠️ Failed to load authors</span>
                            </div>
                        </div>
                    )}
                    {authors.map((author, idx) => (
                        <Link
                            key={author.id}
                            href={`/author/${author.id}`}
                            className='block p-8 bg-white rounded-xl border border-gray-200 hover:border-cyan-300 transition-all duration-300 transform hover:-translate-y-1.5 animate-fade-in-up group shadow-sm hover:shadow-md'
                            style={{ animationDelay: `${idx * 50}ms` }}
                        >
                            <div className='space-y-4'>
                                <h2 className='text-2xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-700 bg-clip-text text-transparent group-hover:from-cyan-500 group-hover:to-cyan-600 transition-all'>
                                    {author.name}
                                </h2>
                                {author.url ? (
                                    <a 
                                        href={author.url} 
                                        onClick={(e) => e.stopPropagation()}
                                        className="relative inline-block overflow-hidden"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="relative text-sm text-gray-600 group-hover:text-cyan-600 transition-all duration-300 line-clamp-1">
                                            {author.url.length > 50 ? `${author.url.slice(0, 50)}...` : author.url}
                                        </span>
                                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </a>
                                ) : (
                                    <p className="relative inline-block overflow-hidden">
                                        <span className="relative text-sm text-gray-600 group-hover:text-cyan-600 transition-all duration-300">
                                            Exploring the AI frontier
                                        </span>
                                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </p>
                                )}
                                <div className='flex justify-end'>
                                    <span className='text-xs text-gray-500 group-hover:text-cyan-600 transition-colors'>
                                        View Profile →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
