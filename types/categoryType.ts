import { NewsResponseDto } from "./newsType";

export interface CategoryResponseDto {
  id: number;
  name: string;
}

export interface CategoryNewsResponseDto {
  category: CategoryResponseDto;
  news: NewsResponseDto[];
}
