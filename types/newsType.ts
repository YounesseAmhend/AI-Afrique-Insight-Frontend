import { Author } from "./authorType";
import { CategoryResponseDto } from "./categoryType";

// TypeScript interfaces for news data
export interface NewsResponseDto {
  id: string;
  title: string;
  body: string;
  author: Author | null;
  postDate: string;
  imageUrl: string | null;
  url: string;
  viewsCount: number;
  createdAt: string | null; // Corrected from 'null'
  category: CategoryResponseDto;
}


// ✅ ADD THIS GENERIC PAGE INTERFACE
// This matches the structure of a paginated response from Spring Boot.
export interface Page<T> {
  content: T[];          // The list of items for the current page (e.g., NewsResponseDto[])
  totalPages: number;    // The total number of pages available
  totalElements: number; // The total number of items across all pages
  number: number;        // The current page number (zero-indexed)
  size: number;          // The number of items per page
  first: boolean;        // True if this is the first page
  last: boolean;         // True if this is the last page
  empty: boolean;        // True if the content array is empty
}

// Your existing NewsResponseDto interface
export interface NewsResponseDto {
  id: string;
  title: string;
  body: string;
  author: Author | null;
  postDate: string;
  imageUrl: string | null;
  url: string;
  viewsCount: number;
  createdAt: string | null;
  category: CategoryResponseDto;
}