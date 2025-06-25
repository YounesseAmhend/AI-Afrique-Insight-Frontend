export interface Source {
  id: number;
  url: string;
  selector: string | null; // JSON string or null
  triggerAfrica: boolean;
  triggerAi: boolean;
  status: 'available' | 'unavailable' | string; // ScrapeStatus enum as string
  createdAt: string; // ISO date string
  updatedAt: string | null; // ISO date string or null
} 