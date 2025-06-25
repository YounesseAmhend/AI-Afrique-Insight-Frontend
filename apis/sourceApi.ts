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

  // Trigger scraping of sources
  scrapeSources: async (): Promise<{ message: string }> => {
    const response = await api.get<{ message: string }>("/admin/scrape");
    return response.data;
  },
}; 