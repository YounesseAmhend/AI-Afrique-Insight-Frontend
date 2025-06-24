"use client"

import NewsGrid from "@/app/news/components/NewsGrid";
import { useGetAuthorById } from "@/hooks/useAuthorQuery";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AuthorDetailPage() {
    const params = useParams();
    const authorId = parseInt(params.id as string);
    const { data, isLoading, error } = useGetAuthorById(authorId);

    if (error || !data) {
        return (
            <div className='container mx-auto px-4 py-6'>
                Failed to load author.
            </div>
        );
    }

    const { author, news } = data;

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
                    <div className="space-y-4">
                        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse w-1/2"></div>
                        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse w-1/3"></div>
                    </div>
                ) : (
                    <div className='mb-8'>
                        <h1 className='text-3xl md:text-4xl font-bold mb-2'>
                            {author.name}
                        </h1>
                        <p className='text-muted-foreground'>
                            {author.url || "No profile URL available."}
                        </p>
                    </div>
                )}
                <div className='mb-6'>
                 
                    <NewsGrid title={`Latest news by ${author.name}`} items={news} isLoading={isLoading} error={error} />
                </div>
            </div>
        </div>
    );
}
