import React from "react";
import { useGetAllNews } from "../../hooks/useNewsQuery";
import { useNewsState } from "../../state/newsState";
import { ErrorMessage } from "../common/ErrorMessage";
import { Loading } from "../common/Loading";
import { NewsItem } from "./newsItem";

export const NewsList: React.FC = () => {
    // Get filter values from store
    const searchTerm = useNewsState((state) => state.searchTerm);
    const selectedCategory = useNewsState((state) => state.selectedCategory);

    // Fetch news data
    const { data: news, error, isLoading, refetch } = useGetAllNews();

    // Filter news based on search term and category
    const filteredNews = React.useMemo(() => {
        if (!news) return [];

        return news.filter((item) => {
            const matchesSearch = searchTerm
                ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.content.toLowerCase().includes(searchTerm.toLowerCase())
                : true;

            const matchesCategory = selectedCategory
                ? item.category === selectedCategory
                : true;

            return matchesSearch && matchesCategory;
        });
    }, [news, searchTerm, selectedCategory]);

    if (isLoading) return <Loading />;

    if (error)
        return (
            <ErrorMessage
                message='Failed to load news articles'
                retry={() => refetch()}
            />
        );

    if (filteredNews.length === 0) {
        return <p>No news articles found matching your criteria.</p>;
    }

    return (
        <div className='news-list'>
            {filteredNews.map((newsItem) => (
                <NewsItem key={newsItem.id} news={newsItem} />
            ))}
        </div>
    );
};
