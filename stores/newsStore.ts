import { NewsArticle } from '@/types/news';
import { create } from 'zustand';

interface NewsStore {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  fetchNews: () => Promise<void>;
  clearError: () => void;
  setArticles: (articles: NewsArticle[]) => void;
}

export const useNewsStore = create<NewsStore>((set) => ({
  articles: [],
  loading: false,
  error: null,

  fetchNews: async () => {
    set({ loading: true, error: null });
    try {
      const { newsApi } = await import('@/services/newsApi');
      const articles = await newsApi.fetchNewsList();
      set({ articles, loading: false, error: null });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch news',
      });
    }
  },

  clearError: () => set({ error: null }),

  setArticles: (articles: NewsArticle[]) => set({ articles }),
}));

