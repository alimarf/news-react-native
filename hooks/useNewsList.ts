import { useNewsStore } from '@/stores/newsStore';
import { useEffect } from 'react';

export function useNewsList() {
  const { articles, loading, error, fetchNews, clearError } = useNewsStore();

  useEffect(() => {
    if (articles.length === 0 && !loading) {
      fetchNews();
    }
  }, [articles.length, loading, fetchNews]);

  const refetch = () => {
    clearError();
    fetchNews();
  };

  return {
    articles,
    loading,
    error,
    refetch,
  };
}

