import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '../apis/categoryApi';
import { CategoryNewsResponseDto } from '../types/categoryType';

export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: () => [...categoryKeys.lists()] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: number) => [...categoryKeys.details(), id] as const,
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: categoryApi.getAllCategories,
  });
};

export const useGetCategoryById = (id: number) => {
  return useQuery<CategoryNewsResponseDto, Error>({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoryApi.getCategoryById(id),
    enabled: !!id,
  });
}; 