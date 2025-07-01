"use client";

import { useGetPaginatedNews } from "@/hooks/useNewsQuery";
import { useGetAllCategories } from "@/hooks/useCategoryQuery";
import NewsGrid from "./NewsGrid";
import { useState, useCallback, useMemo } from "react";
import { Page, NewsResponseDto } from "@/types/newsType";


export function NewsPageGrid() {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedCategoryName, setSelectedCategoryName] = useState("All");
    
    // Fetch all categories
    const { data: categories, isLoading: categoriesLoading } = useGetAllCategories();
    
    // Find the selected category ID
    const selectedCategoryId = useMemo(() => {
        if (selectedCategoryName === "All" || !categories) return undefined;
        const category = categories.find(cat => cat.name === selectedCategoryName);
        return category?.id;
    }, [selectedCategoryName, categories]);
    
    console.log("📊 NewsPageGrid - Current State:", { 
        currentPage, 
        selectedCategoryName, 
        selectedCategoryId,
        availableCategories: categories?.map(c => ({ id: c.id, name: c.name }))
    });
    
    const { data, isLoading, error } = useGetPaginatedNews(currentPage, 12, selectedCategoryId);
    
    // Type the data properly
    const pageData = data as Page<NewsResponseDto> | undefined;
    
    const handleCategoryChange = useCallback((categoryName: string) => {
        console.log("🔄 Category changed from", selectedCategoryName, "to", categoryName);
        setSelectedCategoryName(categoryName);
        setCurrentPage(0); // Reset to first page when category changes
    }, [selectedCategoryName]);
    
    const handlePageChange = useCallback((page: number) => {
        console.log("📄 Page changed to:", page);
        setCurrentPage(page);
    }, []);
    
    // Create category options for the dropdown
    const categoryOptions = useMemo(() => {
        const options = ["All"];
        if (categories) {
            options.push(...categories.map(cat => cat.name));
        }
        return options;
    }, [categories]);
    
    return (
        <NewsGrid 
            items={pageData?.content || []} 
            isLoading={isLoading || categoriesLoading}
            error={error}
            currentPage={currentPage}
            totalPages={pageData?.totalPages || 0}
            onPageChange={handlePageChange}
            activeCategory={selectedCategoryName}
            onCategoryChange={handleCategoryChange}
            showCategoryFilter={true}
            showPagination={true}
            title="Latest AI News"
            categoryOptions={categoryOptions}
        />
    );
} 