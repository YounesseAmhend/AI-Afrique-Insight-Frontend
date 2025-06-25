import api from "../lib/axios";
import { CategoryNewsResponseDto, CategoryResponseDto } from "../types/categoryType";

export const categoryApi = {
  getAllCategories: async (): Promise<CategoryResponseDto[]> => {
    const response = await api.get<CategoryResponseDto[]>("/category");
    return response.data;
  },
  getCategoryById: async (id: number): Promise<CategoryNewsResponseDto> => {
    const response = await api.get<CategoryNewsResponseDto>(`/category/${id}`);
    return response.data;
  }
}; 