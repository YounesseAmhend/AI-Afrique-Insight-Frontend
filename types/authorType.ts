import { NewsResponseDto } from "./newsType";

export interface Author {
  id: number;
  createdAt: string; // Using string to represent ISO date format
  name: string;
  url: string | null;
}

export interface AuthorResponseDto {
  author: Author;
  news: NewsResponseDto[];
}
