import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface AvatarProps {
  name?: string;
  email?: string;
  size?: number;
  style?: ViewStyle;
}

export function Avatar({ name, email, size = 40, style }: AvatarProps) {
  const getInitials = (name?: string, email?: string): string => {
    if (name) {
      const parts = name.trim().split(' ');
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return name[0].toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };

  const initials = getInitials(name, email);

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }, style]}>
      {name || email ? (
        <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{initials}</Text>
      ) : (
        <Ionicons name="person" size={size * 0.6} color="#ffffff" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  initials: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

