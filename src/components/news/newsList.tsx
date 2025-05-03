import React from "react";
import { useGetAllNews } from "../../hooks/useNewsQuery";
import { useNewsState } from "../../state/newsState";
import { ErrorMessage } from "../common/ErrorMessage";
import { Loading } from "../common/Loading";
import { NewsItem } from "./NewsItem";

export const NewsList: React.FC = () => {
    // Get filter values from store
    const searchTerm = useNewsState((state) => state.searchTerm);
    const selectedCategory = useNewsState((state) => state.selectedCategory);

    // Fetch news data
    const { data: news, error, isLoading, refetch } = useGetAllNews();

    // Filter news based on search term and category
    const filteredNews = React.useMemo(() => {
        if (!news) return [];
    }, [news, searchTerm, selectedCategory]);

    if (isLoading) return <Loading />;

    if (error)
        return (
            <ErrorMessage
                message='Failed to load news articles'
                retry={() => refetch()}
            />
        );

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
            {news?.map((newsItem) => (
                <NewsItem key={newsItem.id} news={newsItem} />
            )) ?? null}
        </div>
    );
};
