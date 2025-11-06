# Profile Feature

## Overview

The Profile feature provides user profile management functionality. Users can view their profile information, edit their profile details, and manage their settings. The profile data is stored in local storage using AsyncStorage, and the authentication context provides access to the current user's profile.

## Requirements

1. **Profile Screen**
   - Display user profile information (name, email)
   - Edit profile functionality
   - Logout button
   - Display user avatar/icon
   - Show user information in a clean, organized layout

2. **Profile Management**
   - View current user profile data
   - Edit user name
   - Update profile information
   - Save changes to local storage
   - Sync with authentication context

3. **Navigation**
   - Navigate from home screen (via avatar icon)
   - Back button to return to home screen
   - Logout functionality that navigates to login screen

4. **Data Storage**
   - Store updated profile data in AsyncStorage
   - Update user data in authentication context
   - Persist profile changes across app restarts

5. **User Experience**
   - Display loading state during profile updates
   - Show success/error messages for profile updates
   - Form validation for profile edits
   - Clean and intuitive UI

## Implementation Details

### Route Structure
- **File**: `app/profile.tsx`
- Use Expo Router for navigation
- Default export for route component

### State Management
- **React Context**: Use existing `AuthContext` for user profile data
  - Access user data from `useAuth()` hook
  - Update user data in context when profile is edited
  - Sync with AsyncStorage

- **Local Storage**: Use AsyncStorage for storing profile data
  - Update `@user_data` key when profile is edited
  - Store updated user information
  - Handle data persistence

### Profile Data Structure
```typescript
interface User {
  id: string;
  email: string;
  name?: string;
}
```

### Profile Update Flow
1. User views profile screen
2. User edits profile information (e.g., name)
3. Validate form inputs
4. Update user data in AsyncStorage
5. Update user data in AuthContext
6. Show success message
7. Persist changes across app restarts

## Components/Pages

### Main Components

1. **ProfileScreen** (`screens/ProfileScreen.tsx`)
   - Main profile screen component
   - Display user information
   - Edit profile form
   - Logout button
   - Avatar/icon display

2. **Input** (`components/inputs/Input.tsx`) - Reuse existing
   - Use existing Input component for profile editing
   - Support for text input fields

3. **Button** (`components/buttons/Button.tsx`) - Reuse existing
   - Use existing Button component
   - Save button for profile updates
   - Logout button

### Supporting Components

4. **Avatar** (`components/ui/Avatar.tsx`) - Optional
   - Circular avatar component
   - Display user initials or icon
   - Reusable for profile display

## API/Data

### Data Source
- **Local Storage**: Store and update user profile data
  - Use `@react-native-async-storage/async-storage`
  - Update `@user_data` key with new profile information
  - Sync with authentication context

### Profile Data
- User ID (read-only, cannot be changed)
- Email (read-only, cannot be changed)
- Name (editable)

### Local Storage Keys
- `@user_data` - User profile data (stored as JSON string)
- Updated when profile is edited

## State Management Structure

### AuthContext Integration
- Use existing `useAuth()` hook to access user data
- Update user data in context when profile is edited
- Sync with AsyncStorage

### Profile Update Function
```typescript
const updateProfile = async (name: string) => {
  // Update AsyncStorage
  // Update AuthContext
  // Show success message
};
```

## Navigation

### From Home Screen
- Navigate to profile screen when avatar icon is tapped
- Route: `/profile`

### From Profile Screen
- Back button to return to home screen
- Logout button to navigate to login screen and clear auth state

## Notes

- **Profile Display**: Show user email and name
- **Editable Fields**: Only name can be edited (email and ID are read-only)
- **Data Sync**: Profile updates should sync with AuthContext and AsyncStorage
- **Logout**: Clear authentication state and navigate to login screen
- **Form Validation**: Validate name field (not empty, reasonable length)
- **Loading States**: Show loading indicators during profile updates
- **Error Handling**: Provide user-friendly error messages
- **Success Feedback**: Show success message when profile is updated
- **Safe Areas**: Handle safe areas using react-native-safe-area-context
- **Accessibility**: Add proper accessibility labels
- **Avatar**: Display user avatar/icon (can use initials or default icon)

## Implementation Flow

1. Create ProfileScreen component with profile display
2. Add edit functionality for user name
3. Implement profile update function
4. Add logout functionality
5. Create profile route (`app/profile.tsx`)
6. Update HomeScreen to navigate to profile on avatar tap
7. Sync profile updates with AuthContext and AsyncStorage
8. Handle navigation and state management

