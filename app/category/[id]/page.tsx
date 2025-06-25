"use client"

import NewsGrid from "@/app/news/components/NewsGrid";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCategoryColor } from "@/lib/categoryColors";
import { useGetCategoryById } from "@/hooks/useCategoryQuery";

export default function CategoryDetailPage() {
    const params = useParams();
    const categoryId = parseInt(params.id as string);
    const { data, isLoading, error } = useGetCategoryById(categoryId);

    if (error) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
                    <div className="inline-flex items-center px-6 py-3 bg-red-50 border border-red-100 rounded-full text-red-600 animate-shake">
                        <span className="text-sm font-medium">⚠️ Failed to load category</span>
                    </div>
                    <p className="mt-4 text-muted-foreground text-sm">
                        Please try refreshing the page or check back later.
                    </p>
                    <Link
                        href="/category"
                        className="mt-6 text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1"
                    >
                        &larr; Back to categories
                    </Link>
                </div>
            </div>
        );
    }

    const color = data ? getCategoryColor(data.category.name) : '#ffffff';

    return (
        <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950'>
            <div className='container mx-auto px-4 py-6'>
                <Link
                    href='/category'
                    className='text-sm text-muted-foreground hover:text-primary mb-4 inline-block'
                >
                    &larr; Back to categories
                </Link>
                <div
                    className='mb-8 rounded-lg p-6'
                    style={{ background: color, color: "#fff" }}
                >
                    {isLoading ? (
                        <div className="space-y-4">
                            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse w-1/2"></div>
                        </div>
                    ) : (
                        <h1 className='text-3xl md:text-4xl font-bold'>
                            {data?.category.name || 'Loading...'}
                        </h1>
                    )}
                </div>
                <div className='mb-6'>
                    <NewsGrid 
                        title={`News in ${data?.category.name || 'this category'}`} 
                        items={data?.news || []} 
                        isLoading={isLoading} 
                        error={error} 
                    />
                </div>
            </div>
        </div>
    );
}
