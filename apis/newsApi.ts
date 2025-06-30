import { NewsResponseDto } from "../types/newsType";
import api from "../lib/axios";

// API functions for news endpoints
export const newsApi = {
    // Get all news
    getAllNews: async (): Promise<NewsResponseDto[]> => {
        try {
            const response = await api.get<NewsResponseDto[]>("/news");
            console.log("News API Response:", response);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch news:", error);
            throw new Error("Failed to load news articles. Please try again later.");
        }
    },

    // Get a single news item by ID
    getNewsById: async (id: number): Promise<NewsResponseDto> => {
        const response = await api.get<NewsResponseDto>(`/news/${id}`);
        return response.data;
    },

    // Get trending news
    getTrendingNews: async (): Promise<NewsResponseDto[]> => {
        try {
            const response = await api.get<NewsResponseDto[]>("/news/trending");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch trending news:", error);
            throw new Error("Failed to load trending news. Please try again later.");
        }
    },
    downloadNewsAsCsv: async (): Promise<void> => {
        try {
            const response = await api.get('/download/news.csv', {
                responseType: 'blob', 
            });
            const blob = new Blob([response.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'news_export.csv'); //suggested filename can be chnged if needed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Failed to download CSV file:", error);
            throw new Error("Could not download the file. Please try again.");
        }
    }
}
