# News Detail Feature

## Overview

The News Detail feature displays the full content of a selected news article. Users can view the complete article with title, image, content, author, source, and publication date. The screen also includes navigation back to the news list.

## Requirements

1. **Display Full Article**
   - Show article title
   - Display article image (if available)
   - Show full article content/description
   - Display author information
   - Show source information
   - Display publication date

2. **Navigation**
   - Back button to return to news list
   - Handle article ID from route params

3. **Loading & Error States**
   - Show loading indicator while fetching article
   - Display error message if article not found or fetch fails
   - Handle edge cases gracefully

4. **User Experience**
   - Scrollable content for long articles
   - Proper image display with expo-image
   - Format dates in readable format
   - Safe area handling

## Implementation Details

### Route Structure
- **File**: `app/news-detail.tsx`
- Use Expo Router for navigation
- Receive article ID from route params
- Default export for route component

### State Management
- Use Zustand store to get article from cache (if available)
- Create custom hook `useNewsDetail` for fetching article by ID
- Handle loading and error states

### Data Fetching
- Use existing `newsApi.fetchNewsById()` function
- Check store cache first before making API call
- Fallback to API if article not in cache

## Components/Pages

### Main Components

1. **NewsDetailScreen** (`components/screens/NewsDetailScreen.tsx`)
   - Main screen component
   - Display article content
   - Handle loading and error states
   - Scrollable content with ScrollView

2. **ArticleHeader** (`components/cards/ArticleHeader.tsx`) - Optional
   - Component for article header (image, title, metadata)
   - Reusable for article display

### Supporting Components

3. **LoadingIndicator** (`components/ui/LoadingIndicator.tsx`) - Optional
   - Loading spinner component

4. **ErrorMessage** (`components/ui/ErrorMessage.tsx`) - Optional
   - Error message display component

## API/Data

### Data Source
- Use existing `newsApi.fetchNewsById(id: string)` function
- Article data from NewsArticle interface

### Route Params
- `articleId`: string - ID of the article to display

## State Management Structure

### Custom Hook (`hooks/useNewsDetail.ts`)
- Fetch article by ID from API
- Check Zustand store cache first
- Return: { article, loading, error, refetch }

## Notes

- **Performance**: Use expo-image for optimized image loading
- **Safe Areas**: Handle safe areas using react-native-safe-area-context
- **Scrollable Content**: Use ScrollView for long article content
- **Date Formatting**: Format publication date in readable format
- **Error Handling**: Provide user-friendly error messages
- **Back Navigation**: Use router.back() or router.push() to return to list
- **Accessibility**: Add proper accessibility labels for screen readers

