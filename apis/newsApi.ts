import { NewsResponseDto, Page } from "../types/newsType";
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

    // Get paginated news with optional category filter
    getPaginatedNews: async (page: number = 0, size: number = 6, categoryId?: number): Promise<Page<NewsResponseDto>> => {
        try {
            const params: { page: number; size: number; categoryId?: number } = { page, size };
            if (categoryId && categoryId > 0) {
                params.categoryId = categoryId;
            }
            console.log("🚀 API Request - URL: /news, Params:", params);
            console.log("🚀 API Request - Params type check:", {
                page: typeof params.page,
                size: typeof params.size,
                categoryId: typeof params.categoryId,
                categoryIdValue: params.categoryId
            });
            const response = await api.get<Page<NewsResponseDto>>("/news", { params });
            console.log("✅ API Response:", {
                totalElements: response.data.totalElements,
                totalPages: response.data.totalPages,
                currentPage: response.data.number,
                contentLength: response.data.content.length,
                firstItemCategory: response.data.content[0]?.category?.name
            });
            return response.data;
        } catch (error: unknown) {
            console.error("❌ Failed to fetch paginated news:", error);
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number; data?: unknown }; message?: string };
                console.error("❌ Error details:", {
                    status: axiosError.response?.status,
                    data: axiosError.response?.data,
                    message: axiosError.message
                });
            }
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
