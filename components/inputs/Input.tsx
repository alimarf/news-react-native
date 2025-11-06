import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: object;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export function Input({ label, error, containerStyle, style, rightIcon, onRightIconPress, ...props }: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            rightIcon ? styles.inputWithIcon : null,
            style,
          ]}
          placeholderTextColor="#999"
          {...props}
        />
        {rightIcon && (
          <Pressable
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            accessibilityRole="button"
            accessibilityLabel="Toggle password visibility"
          >
            {rightIcon}
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
  },
  inputWithIcon: {
    paddingRight: 50,
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  rightIconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 12,
    color: '#d32f2f',
    marginTop: 4,
  },
});

