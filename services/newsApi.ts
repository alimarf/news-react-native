import { NewsApiResponse, NewsArticle } from '@/types/news';
import axios from 'axios';

// You can replace this with your actual OpenAPI endpoint
const API_BASE_URL = 'https://newsapi.org/v2';
const API_KEY = '632d517c1d274349bca6cc8c4e6b9241'; // Replace with your actual API key

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add API key to requests
apiClient.interceptors.request.use((config) => {
  if (config.params) {
    config.params.apiKey = API_KEY;
  } else {
    config.params = { apiKey: API_KEY };
  }
  return config;
});

export const newsApi = {
  /**
   * Fetch list of news articles
   * @param page - Page number for pagination (optional)
   * @param pageSize - Number of articles per page (optional)
   * @returns Promise with news articles
   */
  async fetchNewsList(page: number = 1, pageSize: number = 20): Promise<NewsArticle[]> {
    try {
      // Example endpoint - replace with your actual OpenAPI endpoint
      const response = await apiClient.get<NewsApiResponse>('/everything', {
        params: {
          q: 'technology', // Example query - replace with your needs
          page,
          pageSize,
          sortBy: 'publishedAt',
        },
      });

      // Transform API response to match our NewsArticle interface
      // Adjust this based on your actual API response structure
      return response.data.articles.map((article: any) => ({
        id: article.id || article.url || Math.random().toString(),
        title: article.title || '',
        description: article.description || '',
        content: article.content,
        imageUrl: article.urlToImage,
        publishedAt: article.publishedAt || new Date().toISOString(),
        source: article.source?.name || '',
        author: article.author,
        url: article.url,
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch news');
      }
      throw new Error('An unexpected error occurred');
    }
  },

  /**
   * Fetch a single news article by ID
   * @param id - Article ID
   * @returns Promise with news article
   */
  async fetchNewsById(id: string): Promise<NewsArticle | null> {
    try {
      // This is a placeholder - adjust based on your API structure
      const articles = await this.fetchNewsList();
      return articles.find((article) => article.id === id) || null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch article');
      }
      throw new Error('An unexpected error occurred');
    }
  },
};

