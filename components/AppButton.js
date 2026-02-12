import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radii, spacing, typography } from '../utils/theme';

export default function AppButton({ title, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.full,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }]
  },
  text: {
    color: '#FFFFFF',
    ...typography.body,
    fontWeight: '700',
    letterSpacing: 0.5
  }
});
