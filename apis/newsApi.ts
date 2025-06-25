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

};
