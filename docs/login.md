# Login Feature

## Overview

The Login feature provides user authentication functionality. Users can log in with their credentials, and the authentication state is stored in local storage. The app uses React Context for managing authentication state across the application.

## Requirements

1. **Login Screen**
   - Email/username input field
   - Password input field
   - Login button
   - Handle form validation
   - Display error messages for invalid credentials
   - Show loading state during authentication

2. **Authentication State Management**
   - Use React Context for authentication state
   - Store authentication data in local storage (AsyncStorage or SecureStore)
   - Manage user session
   - Provide authentication state to all components

3. **Navigation**
   - Navigate to home screen after successful login
   - Handle authentication state on app startup
   - Redirect to login if user is not authenticated (optional)

4. **Data Storage**
   - Store user credentials/token in local storage
   - Store user profile data in local storage
   - Persist authentication state across app restarts

5. **User Experience**
   - Form validation with error messages
   - Loading indicator during login process
   - Error handling for failed login attempts
   - Display common error message: "Invalid email or password" for incorrect credentials
   - Secure password input (masked)

## Implementation Details

### Route Structure
- **File**: `app/login.tsx`
- Use Expo Router for navigation
- Default export for route component

### State Management
- **React Context**: Create `AuthContext` for authentication state
  - Context location: `contexts/AuthContext.tsx` or `providers/AuthContext.tsx`
  - Provide authentication state, login function, logout function
  - Create custom hook `useAuth()` for consuming context

- **Local Storage**: Use AsyncStorage for storing authentication data
  - Store user profile data
  - Store authentication state flag
  - Handle data persistence
  - Note: No bearer tokens needed for this demo project

### Authentication Context Structure
```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
```

### User Interface
```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user fields as needed
}
```

### Dummy User Data
```typescript
const DUMMY_USER = {
  id: '1',
  email: 'user@mail.com',
  name: 'User',
  // Add other user fields as needed
};

const VALID_CREDENTIALS = {
  email: 'user@mail.com',
  password: 'user123456',
};
```

## Components/Pages

### Main Components

1. **LoginScreen** (`screens/LoginScreen.tsx`)
   - Main login screen component
   - Form with email and password inputs
   - Login button
   - Error message display
   - Loading state handling

2. **Input** (`components/inputs/Input.tsx`) - Optional
   - Reusable input component
   - Support for different input types (text, email, password)
   - Error state display
   - Label and placeholder support

3. **Button** (`components/buttons/Button.tsx`) - Optional
   - Reusable button component
   - Loading state support
   - Disabled state support
   - Variant support (primary, secondary, etc.)

### Supporting Components

4. **LoadingIndicator** (`components/ui/LoadingIndicator.tsx`) - Optional
   - Loading spinner component

5. **ErrorMessage** (`components/ui/ErrorMessage.tsx`) - Optional
   - Error message display component

## API/Data

### Data Source
- **Local Storage**: Store authentication data and user profile
  - Use `@react-native-async-storage/async-storage` for all data storage
  - Store user ID and user profile data
  - Handle data retrieval and storage
  - Note: This is a demo project, no bearer tokens needed

### Dummy User Credentials
For testing and demo purposes, use the following credentials:
- **Email**: `user@mail.com`
- **Password**: `user123456`

### Authentication Flow
1. User enters email and password
2. Validate form inputs (email format, password not empty)
3. Check credentials against dummy user:
   - If credentials match: `user@mail.com` / `user123456`
     - Store user data in local storage
     - Set authentication state in context
     - Navigate to home screen
   - If credentials don't match:
     - Display common error message: "Invalid email or password"
     - Do not navigate
4. Handle loading state during authentication check

### Local Storage Keys
- `@user_data` - User profile data (stored as JSON string)
- `@is_authenticated` - Authentication state flag (stored as boolean string)

## State Management Structure

### AuthContext (`contexts/AuthContext.tsx`)
- Provide authentication state
- Login function
- Logout function
- Check authentication on app startup
- Custom hook: `useAuth()`

### Custom Hook (`hooks/useAuth.ts`) - Optional
- Wrapper hook for consuming AuthContext
- Return: { user, isAuthenticated, isLoading, login, logout }

## Notes

- **Dummy Authentication**: Use hardcoded credentials for demo purposes
  - Valid email: `user@mail.com`
  - Valid password: `user123456`
  - Show error message "Invalid email or password" for any other credentials
- **Storage**: Use AsyncStorage for all data storage (no bearer tokens needed for demo)
  - Store user data and authentication state in AsyncStorage
  - Simple key-value storage for demo purposes
- **Form Validation**: Validate email format and password requirements
- **Error Handling**: 
  - Show common error message "Invalid email or password" for incorrect credentials
  - Do not specify which field is incorrect (email or password)
  - Clear error message when user starts typing again
- **Loading States**: Show loading indicators during authentication
- **Navigation**: Handle navigation after successful login
- **Session Management**: Check authentication state on app startup
- **Accessibility**: Add proper accessibility labels for form inputs
- **Safe Areas**: Handle safe areas using react-native-safe-area-context
- **Keyboard**: Handle keyboard with KeyboardAvoidingView
- **Password Masking**: Use secureTextEntry for password input
- **Remember Me**: Optional feature to persist login state

## Implementation Flow

1. Create AuthContext with authentication state management
2. Create LoginScreen component with form
3. Create Input component (if not exists)
4. Create Button component (if not exists)
5. Implement local storage for authentication data
6. Handle navigation after successful login
7. Check authentication state on app startup
8. Update app routing to handle authentication state

