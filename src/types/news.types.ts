
// TypeScript interfaces for news data
export interface NewsResponseDto {
  id: number;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
}

//again just in case  we will add this :

// export interface NewsRequestDto {
//   title: string;
//   content: string;
//   author: string;
//   category?: string;
//   tags?: string[];
//   imageUrl?: string;
// }