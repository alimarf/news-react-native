export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  imageUrl?: string;
  publishedAt: string;
  source?: string;
  author?: string;
  url?: string;
}

export interface NewsApiResponse {
  articles: NewsArticle[];
  totalResults?: number;
  status?: string;
}

