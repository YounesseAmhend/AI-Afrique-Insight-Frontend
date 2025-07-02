"use client";

import { useGetPaginatedNews } from "@/hooks/useNewsQuery";
import NewsGrid from "./NewsGrid";
import { Page, NewsResponseDto } from "@/types/newsType";
import Link from "next/link";
import { ArrowUpRight} from "lucide-react";



export function HomeNewsGrid() {
    const { data, isLoading, error } = useGetPaginatedNews(0, 8, undefined);  // undefined means "All" categories
    
    // Type the data properly
    const pageData = data as Page<NewsResponseDto> | undefined;
    
    return (
        <>

            <NewsGrid 
            items={pageData?.content || []} 
            isLoading={isLoading} 
            error={error}
            currentPage={0}
            totalPages={1}
            onPageChange={() => {}} // No-op function since we don't need pagination
            activeCategory="All"
            onCategoryChange={() => {}} // No-op function since we don't need category filtering
            showCategoryFilter={false}
            showPagination={false}
            title="Latest AI News"
            action={
                <Link
                    href='/news'
                    className='text-sm font-medium text-primary hover:underline flex items-center gap-1 group relative overflow-hidden px-4 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300'
                >
                    <span className="relative z-10">View all</span>
                    <ArrowUpRight className='h-3 w-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110' />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
            }
        />
        </>
        
    );
}
