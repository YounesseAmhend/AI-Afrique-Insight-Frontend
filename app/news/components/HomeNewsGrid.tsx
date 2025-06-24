"use client";

import { useGetAllNews } from "@/hooks/useNewsQuery";
import NewsGrid from "./NewsGrid";

export function HomeNewsGrid() {
    const { data: items = [], isLoading, error } = useGetAllNews();
    return <NewsGrid items={items} isLoading={isLoading} error={error} />;
}
