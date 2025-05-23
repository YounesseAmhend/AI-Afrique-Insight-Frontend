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

    // Create a new news item (for future use) maybe but we will try to handle it or have a clear way of handling it
    //   createNews: async (newsData: NewsRequestDto): Promise<NewsResponseDto> => {
    //     const response = await api.post<NewsResponseDto>('/news/featured', newsData);
    //     return response.data;
    //   },

    // Update a news item (for future use)  same bulshit
    //   updateNews: async (id: number, newsData: NewsRequestDto): Promise<NewsResponseDto> => {
    //     const response = await api.put<NewsResponseDto>(`/news/${id}`, newsData);
    //     return response.data;
    //   },

    //   // Delete a news item (for future use)  same bulshit but we probably will not alow to delete . we will just sell the cow in the front end
    //   deleteNews: async (id: number): Promise<void> => {
    //     await api.delete(`/news/${id}`);
    //   }
};
