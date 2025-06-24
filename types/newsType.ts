
// TypeScript interfaces for news data
export interface NewsResponseDto {
  id: string;
  title: string;
  body: string;
  author: string;
  postDate: string;
  imageUrl: string | null;
  url: string;
  createdAt: null;
  category?: string;
}

// again just in case we will add this :  //* probably never // True.

// export interface NewsRequestDto {
//   title: string;
//   content: string;
//   author: string;
//   category?: string;
//   tags?: string[];
//   imageUrl?: string;
// }