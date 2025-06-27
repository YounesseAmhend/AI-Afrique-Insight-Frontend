import api from "../lib/axios";
import { Source } from "../types/sourceType";

export const sourceApi = {
  // Get all sources
  getAllSources: async (): Promise<Source[]> => {
    const response = await api.get<Source[]>("/admin/source");
    return response.data;
  },

  // Add a new source
  addSource: async (data: {
    url: string;
    containsAiContent: boolean;
    containsAfricaContent: boolean;
  }): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>("/admin/source", data);
    return response.data;
  },

  // Update source URL
  updateSourceUrl: async (id: number, newUrl: string): Promise<Source> => {
    const response = await api.patch<Source>(`/admin/source/${id}`, newUrl);
    return response.data;
  },

  // Delete a source
  deleteSource: async (id: number): Promise<void> => {
    await api.delete(`/admin/source/${id}`);
  },

  // Trigger scraping of sources
  scrapeSources: async (): Promise<{ message: string }> => {
    const response = await api.get<{ message: string }>("/admin/scrape");
    return response.data;
  },
};