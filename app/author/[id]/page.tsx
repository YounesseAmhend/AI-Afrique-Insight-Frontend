"use client"

import NewsGrid from "@/app/news/components/NewsGrid";
import { useGetAuthorById } from "@/hooks/useAuthorQuery";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AuthorDetailPage() {
    const params = useParams();
    const authorId = parseInt(params.id as string);
    const { data, isLoading, error } = useGetAuthorById(authorId);

    if (error) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
                    <div className="inline-flex items-center px-6 py-3 bg-red-50 border border-red-100 rounded-full text-red-600 animate-shake">
                        <span className="text-sm font-medium">⚠️ Failed to load author</span>
                    </div>
                    <p className="mt-4 text-muted-foreground text-sm">
                        Please try refreshing the page or check back later.
                    </p>
                    <Link
                        href="/author"
                        className="mt-6 text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1"
                    >
                        &larr; Back to authors
                    </Link>
                </div>
            </div>
        );
    }

    const { author, news } = data || {};

    return (
        <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950'>
            <div className='container mx-auto px-4 py-6'>
                <Link
                    href='/author'
                    className='text-sm text-muted-foreground hover:text-primary mb-4 inline-block'
                >
                    &larr; Back to authors
                </Link>
                {isLoading ? (
                    <div className="space-y-4 mb-8">
                        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse w-1/2"></div>
                        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse w-1/3"></div>
                    </div>
                ) : (
                    <div className='mb-8'>
                        <h1 className='text-3xl md:text-4xl font-bold mb-2'>
                            {author?.name || 'Loading...'}
                        </h1>
                        {author?.url ? (
                            <a
                                href={author.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                            >
                                <span>Visit profile</span>
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        ) : (
                            <p className="text-muted-foreground">No profile URL available.</p>
                        )}
                    </div>
                )}
                <div className='mb-6'>
                    <NewsGrid 
                        title={`Latest news by ${author?.name || 'this author'}`} 
                        items={news || []} 
                        isLoading={isLoading} 
                        error={error} 
                    />
                </div>
            </div>
        </div>
    );
}
