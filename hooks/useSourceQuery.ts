import { sourceApi } from "@/apis/sourceApi";
import { Source } from "@/types/sourceType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch all sources
export function useGetSources() {
  return useQuery<Source[]>({
    queryKey: ["sources"],
    queryFn: sourceApi.getAllSources,
  });
}

// Add a new source
export function useAddSource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sourceApi.addSource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sources"] });
    },
  });
}

// Trigger scraping
export function useScrapeSources() {
  return useMutation({
    mutationFn: sourceApi.scrapeSources,
  });
} 