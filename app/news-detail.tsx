import { NewsDetailScreen } from '@/screens/NewsDetailScreen';
import { useLocalSearchParams } from 'expo-router';

export default function NewsDetail() {
  const { articleId } = useLocalSearchParams<{ articleId: string }>();

  if (!articleId) {
    return null;
  }

  return <NewsDetailScreen articleId={articleId} />;
}

