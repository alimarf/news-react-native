# Home Feature - News List

## Overview

The Home feature is the main screen of the application that displays a list of news articles. Users can browse through news articles fetched from OpenAPI, view article previews, and navigate to detailed views of individual articles.

## Requirements

1. **Display News List**
   - Show a scrollable list of news articles
   - Display article previews with title, description, image, and publication date
   - Support pull-to-refresh functionality
   - Handle loading states while fetching data
   - Handle error states when API calls fail

2. **News Article Preview**
   - Article title
   - Article description/summary
   - Article thumbnail/image
   - Publication date/time
   - Source information (if available)

3. **Navigation**
   - Navigate to news detail screen when an article is tapped
   - Pass article data to detail screen

4. **Performance**
   - Use FlatList for efficient rendering of long lists
   - Implement proper key extraction for list items
   - Optimize image loading with expo-image
   - Implement pagination or infinite scroll (optional)

## Implementation Details

### Route Structure
- **File**: `app/index.tsx` or `app/home.tsx` (depending on routing structure)
- Use Expo Router for navigation
- Default export for route component

### State Management
- **Zustand Store**: Create a news store for caching news data globally
  - Store location: `stores/newsStore.ts` or `store/newsStore.ts`
  - Store news list data
  - Store loading and error states
  - Store pagination state (if implemented)

- **Custom Hook**: Create `useNewsList` hook for fetching and managing news data
  - Hook location: `hooks/useNewsList.ts`
  - Handle API calls using Axios
  - Manage loading, error, and success states
  - Integrate with Zustand store for caching

### API Integration
- Use Axios to fetch news data from OpenAPI
- Create API service file: `services/newsApi.ts` or `api/newsApi.ts`
- Define TypeScript interfaces for news article data
- Handle API errors gracefully

## Components/Pages

### Main Components

1. **HomeScreen** (`app/index.tsx` or `app/home.tsx`)
   - Main screen component
   - Container for news list
   - Handle navigation to detail screen

2. **NewsCard** (`components/NewsCard.tsx`)
   - Reusable component for displaying individual news article preview
   - Props: article data, onPress handler
   - Display: image, title, description, date
   - Use Pressable for touch interaction

3. **NewsList** (`components/NewsList.tsx`) - Optional
   - Component for rendering the list of news articles
   - Use FlatList for performance
   - Handle pull-to-refresh
   - Handle loading and error states

### Supporting Components

4. **LoadingIndicator** (`components/LoadingIndicator.tsx`) - Optional
   - Loading spinner/indicator component
   - Show while fetching data

5. **ErrorMessage** (`components/ErrorMessage.tsx`) - Optional
   - Error message display component
   - Show when API calls fail
   - Include retry functionality

## API/Data

### Data Source
- **OpenAPI**: Fetch news articles from OpenAPI endpoint
- Use Axios for HTTP requests

### Data Structure
```typescript
interface NewsArticle {
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
```

### API Service
- Create `services/newsApi.ts` or `api/newsApi.ts`
- Function: `fetchNewsList()` - Fetch list of news articles
- Function: `fetchNewsById(id: string)` - Fetch single article (for detail screen)
- Handle API errors and return appropriate error messages

## State Management Structure

### Zustand Store (`stores/newsStore.ts`)
```typescript
interface NewsStore {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  fetchNews: () => Promise<void>;
  clearError: () => void;
}
```

### Custom Hook (`hooks/useNewsList.ts`)
- Fetch news data from API
- Update Zustand store
- Return: { articles, loading, error, refetch }

## Notes

- **Performance**: Use FlatList with proper `keyExtractor` and `getItemLayout` for optimal performance
- **Images**: Use `expo-image` for better performance and caching
- **Safe Areas**: Handle safe areas using `react-native-safe-area-context`
- **Accessibility**: Add proper accessibility labels for screen readers
- **Offline Support**: Consider caching news data for offline viewing
- **Pagination**: Consider implementing pagination or infinite scroll for better UX
- **Pull to Refresh**: Implement pull-to-refresh functionality for manual data refresh
- **Error Handling**: Provide user-friendly error messages and retry options
- **Loading States**: Show appropriate loading indicators during data fetching

