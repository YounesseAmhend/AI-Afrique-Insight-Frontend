"use client";

import { useGetPaginatedNews } from "@/hooks/useNewsQuery";
import NewsGrid from "./NewsGrid";
import { Page, NewsResponseDto } from "@/types/newsType";

export function HomeNewsGrid() {
    const { data, isLoading, error } = useGetPaginatedNews(0, 9, undefined);  // undefined means "All" categories
    
    // Type the data properly
    const pageData = data as Page<NewsResponseDto> | undefined;
    
    return (
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
        />
    );
}
