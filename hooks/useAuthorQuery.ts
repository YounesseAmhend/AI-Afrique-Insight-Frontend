import { useQuery } from '@tanstack/react-query';
import { authorApi } from '../apis/authorApi';

export const authorKeys = {
  all: ['authors'] as const,
  lists: () => [...authorKeys.all, 'list'] as const,
  list: () => [...authorKeys.lists()] as const,
  details: () => [...authorKeys.all, 'detail'] as const,
  detail: (id: number) => [...authorKeys.details(), id] as const,
};

export const useGetAllAuthors = () => {
  return useQuery({
    queryKey: authorKeys.lists(),
    queryFn: authorApi.getAllAuthors,
  });
};

export const useGetAuthorById = (id: number) => {
  return useQuery({
    queryKey: authorKeys.detail(id),
    queryFn: () => authorApi.getAuthorById(id),
    enabled: !!id,
  });
};
