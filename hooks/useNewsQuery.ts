import { useQuery } from '@tanstack/react-query';
import { newsApi } from '../apis/newsApi';

// Query keys for React Query
export const newsKeys = {
  all: ['news'] as const,
  lists: () => [...newsKeys.all, 'list'] as const,
  list: (filters: string) => [...newsKeys.lists(), { filters }] as const,
  details: () => [...newsKeys.all, 'detail'] as const,
  detail: (id: number) => [...newsKeys.details(), id] as const,
};

// Hook for getting all news
export const useGetAllNews = () => {
  return useQuery({
    queryKey: newsKeys.lists(),
    queryFn: newsApi.getAllNews,
  });
};

// Hook for getting a single news item
export const useGetNewsById = (id: number) => {
  return useQuery({
    queryKey: newsKeys.detail(id),
    queryFn: () => newsApi.getNewsById(id),
    enabled: !!id, // Only run the query if we have an ID
  });
};

// // Hook for creating a news item (for future use)
// export const useCreateNews = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: (newsData: NewsRequestDto) => newsApi.createNews(newsData),
//     onSuccess: () => {
//       // Invalidate and refetch news list
//       queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
//     },
//   });
// };

// // Hook for updating a news item (for future use)
// export const useUpdateNews = (id: number) => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: (newsData: NewsRequestDto) => newsApi.updateNews(id, newsData),
//     onSuccess: () => {
//       // Invalidate and refetch affected queries
//       queryClient.invalidateQueries({ queryKey: newsKeys.detail(id) });
//       queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
//     },
//   });
// };

// Hook for deleting a news item (for future use)
// export const useDeleteNews = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: (id: number) => newsApi.deleteNews(id),
//     onSuccess: () => {
//       // Invalidate and refetch news list
//       queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
//     },
//   });
// };