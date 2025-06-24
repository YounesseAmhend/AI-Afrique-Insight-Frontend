import { Author, AuthorResponseDto } from "../types/authorType";
import api from "../lib/axios";

// API functions for author endpoints
export const authorApi = {
    // Get all authors
    getAllAuthors: async (): Promise<Author[]> => {
        try {
            const response = await api.get<Author[]>("/author");
            console.log("Author API Response:", response);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch authors:", error);
            throw new Error("Failed to load authors. Please try again later.");
        }
    },

    // Get a single author by ID
    getAuthorById: async (id: number): Promise<AuthorResponseDto> => {
        const response = await api.get<AuthorResponseDto>(`/author/${id}`);
        return response.data;
    }
};
