"use client";

import NewsCard from "@/components/news-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryColors, getCategoryColor } from "@/lib/categoryColors";
import { NewsResponseDto } from "@/types/newsType";
import { Filter, Newspaper } from "lucide-react";
import { useState } from "react";

const categories: string[] =  ['All', ...Object.keys(categoryColors)];

// Helper function to format date to relative time
const getRelativeTime = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return "Just now";

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60)
            return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;

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
    title?: String;
}

export default function NewsGrid(props: Props) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleItems, setVisibleItems] = useState(6);

    const { title, items, isLoading, error } = props;
    // Use the custom hook to fetch news data
    const gridTitle = title || "Latest AI News";

    // Filter news items based on active category
    const filteredItems =
        activeCategory === "All"
            ? items
            : items.filter((item) => item.category.name === activeCategory);

    const displayedItems = filteredItems.slice(0, visibleItems);

    const handleLoadMore = () => {
        setVisibleItems((prev) => Math.min(prev + 3, filteredItems.length));
    };

    // Show loading state
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

    // Show error state
    if (error) {
        return (
            <section className='space-y-6'>
                <h2 className='text-2xl font-bold flex items-center gap-2'>
                    <Newspaper className='h-5 w-5 text-primary' />
                    {gridTitle}
                </h2>
                <div className='flex flex-col items-center justify-center py-12 text-center'>
                    <Newspaper className='h-12 w-12 text-muted-foreground mb-4' />
                    <h3 className='text-lg font-medium mb-2'>
                        Failed to load news
                    </h3>
                    <p className='text-muted-foreground'>
                        There was an error loading the news articles. Please try
                        again later.
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

                <div className='flex items-center space-x-1 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar'>
                    <Filter className='h-4 w-4 text-muted-foreground mr-1 flex-shrink-0' />
                    {categories.map((category) => (
                        <Badge
                            key={category}
                            variant={
                                activeCategory === category
                                    ? "default"
                                    : "outline"
                            }
                            className={`cursor-pointer px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                                activeCategory === category
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                    : "hover:bg-secondary/50"
                            }`}
                            onClick={() => {
                                setActiveCategory(category);
                                setVisibleItems(6);
                            }}
                        >
                            {category}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {displayedItems.map((item, index) => {
                    // Remove HTML tags from body
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = item.body;
                    const plainTextBody =
                        tempDiv.textContent || tempDiv.innerText || "";
                    return (
                        <NewsCard
                            key={item.id || index}
                            title={item.title}
                            description={plainTextBody}
                            image={
                                item.imageUrl ||
                                "/placeholder.svg?height=300&width=500"
                            }
                            category={item.category || "Uncategorized"}
                            time={getRelativeTime(item.postDate)}
                            url={`/news/${item.id}`}
                            externalUrl={item.url}
                        />
                    );
                })}
            </div>

            {visibleItems < filteredItems.length && (
                <div className='flex justify-center mt-8'>
                    <Button
                        onClick={handleLoadMore}
                        variant='outline'
                        className='min-w-[200px]'
                    >
                        Load More Articles
                    </Button>
                </div>
            )}

            {filteredItems.length === 0 && (
                <div className='flex flex-col items-center justify-center py-12 text-center'>
                    <Newspaper className='h-12 w-12 text-muted-foreground mb-4' />
                    <h3 className='text-lg font-medium mb-2'>
                        No articles found
                    </h3>
                    <p className='text-muted-foreground'>
                        There are no articles in this category yet.
                    </p>
                </div>
            )}
        </section>
    );
}
