import { NewsArticle } from '@/types/news';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface NewsCardProps {
  article: NewsArticle;
  onPress: (article: NewsArticle) => void;
}

export function NewsCard({ article, onPress }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(article)}
      accessibilityRole="button"
      accessibilityLabel={`Read article: ${article.title}`}
      accessibilityHint="Double tap to read the full article"
    >
      {article.imageUrl && (
        <Image
          source={{ uri: article.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={200}
          placeholder={{ blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        {article.description && (
          <Text style={styles.description} numberOfLines={3}>
            {article.description}
          </Text>
        )}
        <View style={styles.footer}>
          {article.source && (
            <Text style={styles.source}>{article.source}</Text>
          )}
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});

