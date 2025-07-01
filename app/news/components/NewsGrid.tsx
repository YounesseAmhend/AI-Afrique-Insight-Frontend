"use client";

import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/Pagination";

import { NewsResponseDto } from "@/types/newsType";
import { ChevronDown, Newspaper } from "lucide-react";



// Helper function to format date to relative time
const getRelativeTime = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return "Just now";
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;
        return date.toLocaleDateString();
    } catch {
        return "Recently";
    }
};

interface Props {
  items: NewsResponseDto[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  showCategoryFilter?: boolean;
  showPagination?: boolean;
  title?: string;
  categoryOptions?: string[];
}

export default function NewsGrid({ 
  items, 
  isLoading, 
  error, 
  currentPage, 
  totalPages, 
  onPageChange, 
  activeCategory, 
  onCategoryChange, 
  title, 
  showCategoryFilter,
  showPagination,
  categoryOptions
}: Props) {
  const gridTitle = title || "Latest AI News";
  
  // Use provided category options or fallback to default
  const defaultCategories: string[] = ['All', "Research", "AI Tools", "Industry", "Startups", "Regulation", "Ethics", "Health", "Robotics", "NLP", "Computer Vision", "AI Art", "Opinion", "Uncategorized"];
  const categories = categoryOptions || defaultCategories;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value);
    onPageChange(0); // Reset to first page when category changes
  };

  if (isLoading) {
    return (
      <section className='space-y-6'>
        <h2 className='text-2xl font-bold flex items-center gap-2'>
          <Newspaper className='h-5 w-5 text-primary' />
          Loading AI News...
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, index) => (
            <div key={index} className='animate-pulse'>
              <div className='bg-gray-200 dark:bg-gray-800 h-[180px] rounded-t-md' />
              <div className='p-4 border border-gray-200 dark:border-gray-800 rounded-b-md'>
                <div className='flex justify-between mb-2'>
                  <div className='h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4' />
                  <div className='h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4' />
                </div>
                <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2' />
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1' />
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4' />
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3' />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='space-y-6'>
        <h2 className='text-2xl font-bold flex items-center gap-2'>
          <Newspaper className='h-5 w-5 text-primary' />
          {gridTitle}
        </h2>
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <Newspaper className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-medium mb-2'>Failed to load news</h3>
          <p className='text-muted-foreground'>
            {error instanceof Error ? error.message : "An unexpected error occurred."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className='space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <h2 className='text-2xl font-bold flex items-center gap-2'>
          <Newspaper className='h-5 w-5 text-primary' />
          {gridTitle}
        </h2>
        {(showCategoryFilter !== false) && (
          <div className='relative'>
            <select
              value={activeCategory}
              onChange={handleCategoryChange}
              className='flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors appearance-none bg-gray-50 dark:bg-gray-900 text-sm font-medium cursor-pointer focus:ring-2 focus:ring-primary focus:outline-none w-48'
            >
                             {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-3 flex items-center'>
              <ChevronDown className='h-4 w-4 text-gray-400 dark:text-gray-500' />
            </div>
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {items.map((item) => {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = item.body;
          const plainTextBody = tempDiv.textContent || tempDiv.innerText || "";
          return (
            <NewsCard
              key={item.id}
              description={plainTextBody}
              image={item.imageUrl || "/placeholder.svg?height=300&width=500"}
              item={item}
              category={item.category || "Uncategorized"}
              time={getRelativeTime(item.postDate)}
              url={`/news/${item.id}`}
              externalUrl={item.url}
            />
          );
        })}
      </div>

      {showPagination !== false && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      {items.length === 0 && !isLoading && (
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <Newspaper className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-medium mb-2'>No articles found</h3>
          <p className='text-muted-foreground'>
            There are no articles in this category yet.
          </p>
        </div>
      )}
    </section>
  );
}