import { newsApi } from '@/services/newsApi';
import { useNewsStore } from '@/stores/newsStore';
import { NewsArticle } from '@/types/news';
import { useEffect, useState } from 'react';

export function useNewsDetail(articleId: string) {
  const { articles } = useNewsStore();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      // First, check if article is in store cache
      const cachedArticle = articles.find((a) => a.id === articleId);
      if (cachedArticle) {
        setArticle(cachedArticle);
        setLoading(false);
        return;
      }

      // If not in cache, fetch from API
      try {
        const fetchedArticle = await newsApi.fetchNewsById(articleId);
        if (fetchedArticle) {
          setArticle(fetchedArticle);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId, articles]);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedArticle = await newsApi.fetchNewsById(articleId);
      if (fetchedArticle) {
        setArticle(fetchedArticle);
      } else {
        setError('Article not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch article');
    } finally {
      setLoading(false);
    }
  };

  return {
    article,
    loading,
    error,
    refetch,
  };
}

