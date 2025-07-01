import axios from 'axios';
import { Page, NewsResponseDto } from '@/types/newsType';

// This function will be used by TanStack Query
export const fetchNews = async (page: number, category: string): Promise<Page<NewsResponseDto>> => {
  const params = {
    page,
    size: 6,
    // Send category only if it's not 'All'
    category: category !== 'All' ? category : undefined,
  };

  const { data } = await axios.get<Page<NewsResponseDto>>('/api/news', { params });
  return data;
};