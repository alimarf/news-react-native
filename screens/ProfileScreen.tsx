import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ProfileScreen() {
  const router = useRouter();
  const { user, logout, updateProfile, isLoading, isAuthenticated } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      await updateProfile(name.trim());
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setIsEditing(false);
    setError(null);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
            </Pressable>
            <Text style={styles.headerTitle}>Profile</Text>
            <View style={styles.headerSpacer} />
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!user || !isAuthenticated) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
            </Pressable>
            <Text style={styles.headerTitle}>Profile</Text>
            <View style={styles.headerSpacer} />
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>No user data available</Text>
          <Button
            title="Go to Login"
            onPress={() => router.replace('/login')}
            style={styles.loginButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
          </Pressable>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <Avatar name={user.name} email={user.email} size={100} />
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Name</Text>
              {isEditing ? (
                <Input
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    setError(null);
                  }}
                  placeholder="Enter your name"
                  error={error || undefined}
                  style={styles.nameInput}
                  autoFocus
                />
              ) : (
                <Text style={styles.infoValue}>{user.name || 'Not set'}</Text>
              )}
            </View>

            {error && !isEditing && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {isEditing ? (
              <View style={styles.editActions}>
                <Button
                  title="Save"
                  onPress={handleSave}
                  loading={isSaving}
                  disabled={isSaving}
                  style={styles.saveButton}
                />
                <Button
                  title="Cancel"
                  onPress={handleCancel}
                  disabled={isSaving}
                  variant="secondary"
                  style={styles.cancelButton}
                />
              </View>
            ) : (
              <Button
                title="Edit Profile"
                onPress={() => setIsEditing(true)}
                style={styles.editButton}
              />
            )}

            <View style={styles.logoutSection}>
              <Button
                title="Logout"
                onPress={handleLogout}
                variant="secondary"
                style={styles.logoutButton}
                textStyle={styles.logoutButtonText}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  content: {
    padding: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  infoSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
  },
  infoItem: {
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  nameInput: {
    marginTop: 0,
    marginBottom: 0,
  },
  errorContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d32f2f',
  },
  errorText: {
    fontSize: 14,
    color: '#d32f2f',
    textAlign: 'center',
  },
  editActions: {
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: -6,
  },
  saveButton: {
    flex: 1,
    marginRight: 6,
  },
  cancelButton: {
    flex: 1,
    marginLeft: 6,
  },
  editButton: {
    marginTop: 8,
  },
  logoutSection: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    borderColor: '#d32f2f',
  },
  logoutButtonText: {
    color: '#d32f2f',
  },
  loadingContainer: {
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
  loginButton: {
    marginTop: 24,
  },
});

