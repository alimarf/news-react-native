import { DUMMY_USER, User, VALID_CREDENTIALS } from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem('@user_data');
      const authState = await AsyncStorage.getItem('@is_authenticated');

      if (userData && authState === 'true') {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Validate credentials against dummy user
      if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
        // Store user data and authentication state
        await AsyncStorage.setItem('@user_data', JSON.stringify(DUMMY_USER));
        await AsyncStorage.setItem('@is_authenticated', 'true');

        setUser(DUMMY_USER);
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@user_data');
      await AsyncStorage.removeItem('@is_authenticated');

      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateProfile = async (name: string) => {
    try {
      if (!user) {
        throw new Error('User not found');
      }

      const updatedUser: User = {
        ...user,
        name: name.trim(),
      };

      // Update AsyncStorage
      await AsyncStorage.setItem('@user_data', JSON.stringify(updatedUser));

      // Update context
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuth,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

