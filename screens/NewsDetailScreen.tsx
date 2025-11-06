import { useNewsDetail } from '@/hooks/useNewsDetail';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NewsDetailScreenProps {
  articleId: string;
}

export function NewsDetailScreen({ articleId }: NewsDetailScreenProps) {
  const router = useRouter();
  const { article, loading, error, refetch } = useNewsDetail(articleId);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
          </Pressable>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading article...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !article) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
          </Pressable>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error || 'Article not found'}</Text>
          <Pressable style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </Pressable>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
          <Text style={styles.title}>{article.title}</Text>
          <View style={styles.metadata}>
            {article.source && (
              <View style={styles.metadataItem}>
                <Ionicons name="newspaper-outline" size={16} color="#666" />
                <Text style={styles.metadataText}>{article.source}</Text>
              </View>
            )}
            {article.author && (
              <View style={styles.metadataItem}>
                <Ionicons name="person-outline" size={16} color="#666" />
                <Text style={styles.metadataText}>{article.author}</Text>
              </View>
            )}
            <View style={styles.metadataItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.metadataText}>{formatDate(article.publishedAt)}</Text>
            </View>
          </View>
          {article.description && (
            <Text style={styles.description}>{article.description}</Text>
          )}
          {article.content && (
            <Text style={styles.contentText}>{article.content}</Text>
          )}
          {article.url && (
            <Pressable
              style={styles.linkButton}
              onPress={() => {
                // Open article URL in browser
                // You can use expo-web-browser or Linking
              }}
            >
              <Text style={styles.linkText}>Read full article</Text>
              <View style={styles.linkIcon}>
                <Ionicons name="open-outline" size={16} color="#007AFF" />
              </View>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
    lineHeight: 32,
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    marginRight: -12,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 8,
  },
  metadataText: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 16,
    lineHeight: 26,
  },
  contentText: {
    fontSize: 16,
    color: '#1a1a1a',
    lineHeight: 24,
    marginBottom: 16,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  linkIcon: {
    marginLeft: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  retryText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
});

