import { StyleSheet, View } from 'react-native';
import { colors, radii } from '../utils/theme';

export default function ProgressBar({ value = 0 }) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    backgroundColor: colors.primarySoft,
    borderRadius: radii.sm,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radii.sm
  }
});
