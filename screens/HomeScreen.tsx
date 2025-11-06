import { NewsCard } from '@/components/cards/NewsCard';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { useNewsList } from '@/hooks/useNewsList';
import { NewsArticle } from '@/types/news';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function HomeScreen() {
  const router = useRouter();
  const { articles, loading, error, refetch } = useNewsList();
  const { user } = useAuth();

  const handleArticlePress = (article: NewsArticle) => {
    // Navigate to news detail screen
    // You can pass article data via route params or use a store
    router.push({
      pathname: '/news-detail' as any,
      params: { articleId: article.id },
    });
  };

  const renderItem = ({ item }: { item: NewsArticle }) => (
    <NewsCard article={item} onPress={handleArticlePress} />
  );

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.emptyText}>Loading news...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Text style={styles.retryText} onPress={refetch}>
            Tap to retry
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No news articles available</Text>
      </View>
    );
  };

  const handleAvatarPress = () => {
    // Navigate to profile screen
    router.push({
      pathname: '/profile' as any,
    });
  };

  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News</Text>
        <Pressable
          style={styles.avatarContainer}
          onPress={handleAvatarPress}
          accessibilityRole="button"
          accessibilityLabel="Open profile"
        >
          <Avatar name={user?.name} email={user?.email} size={40} />
        </Pressable>
      </View>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  avatarContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 8,
  },
  retryText: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
});

