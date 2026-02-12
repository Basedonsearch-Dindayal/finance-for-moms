import Slider from '@react-native-community/slider';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import Card from '../components/Card';
import { colors, radii, spacing, typography } from '../utils/theme';

export default function InvestmentSimulatorScreen() {
  const [monthly, setMonthly] = useState('');
  const [years, setYears] = useState(5);

  const formatCurrency = (value) => {
    const amount = Number.isFinite(value) ? value : 0;
    return `$${amount.toFixed(2)}`;
  };

  const projected = useMemo(() => {
    const contribution = Number(monthly.replace(/[^0-9.]/g, '')) || 0;
    const monthlyRate = 0.07 / 12;
    const months = years * 12;
    if (!contribution || !months) return 0;
    return contribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }, [monthly, years]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Investment Simulator</Text>
      <Text style={styles.subtitle}>See how steady contributions can grow.</Text>

      <Card style={styles.section}>
        <Text style={styles.label}>Monthly contribution</Text>
        <TextInput
          value={monthly}
          onChangeText={setMonthly}
          placeholder="0"
          keyboardType="numeric"
          style={styles.input}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.label}>Years: {years}</Text>
        <Slider
          value={years}
          minimumValue={1}
          maximumValue={10}
          step={1}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
          onValueChange={setYears}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.label}>Projected total value</Text>
        <Text style={styles.value}>{formatCurrency(projected)}</Text>
        <Text style={styles.helper}>Assumes 7% annual return.</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md
  },
  title: {
    color: colors.text,
    ...typography.title
  },
  subtitle: {
    color: colors.muted,
    ...typography.body,
    marginBottom: spacing.sm
  },
  section: {
    gap: spacing.md
  },
  label: {
    color: colors.text,
    ...typography.caption
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    color: colors.text,
    ...typography.body
  },
  value: {
    color: colors.text,
    ...typography.h2
  },
  helper: {
    color: colors.muted,
    ...typography.caption
  }
});
