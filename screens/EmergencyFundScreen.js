import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import { colors, spacing } from '../utils/theme';

export default function EmergencyFundScreen() {
  const [expenses, setExpenses] = useState('');

  const formatCurrency = (value) => {
    const amount = Number.isFinite(value) ? value : 0;

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const { target, weekly } = useMemo(() => {
    const value = Number(expenses.replace(/[^0-9.]/g, '')) || 0;
    const targetAmount = value * 3;
    const weeklyAmount = targetAmount / 26;

    return {
      target: targetAmount,
      weekly: weeklyAmount
    };
  }, [expenses]);

  const progressValue = useMemo(() => {
    if (!target) return 0;
    return Math.min(1, (weekly * 26) / target);
  }, [target, weekly]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Your Safety Cushion</Text>
      <Text style={styles.subtitle}>
        Small consistent steps create peace of mind.
      </Text>

      <Card style={styles.section}>
        <Text style={styles.label}>Monthly essential expenses</Text>
        <TextInput
          value={expenses}
          onChangeText={setExpenses}
          placeholder="0"
          keyboardType="numeric"
          style={styles.input}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.label}>Your Cushion Goal</Text>
        <Text style={styles.value}>{formatCurrency(target)}</Text>
        <Text style={styles.helper}>
          Building this cushion helps protect your family during unexpected moments.
        </Text>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.label}>Small Weekly Steps</Text>
        <Text style={styles.value}>{formatCurrency(weekly)}</Text>
        <Text style={styles.helper}>
          Gentle weekly progress. No pressure.
        </Text>

        <View style={styles.progressWrap}>
          <ProgressBar value={progressValue} />
        </View>
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
    fontSize: 28,
    fontWeight: '700'
  },

  subtitle: {
    color: colors.muted,
    fontSize: 15,
    marginTop: spacing.xs
  },

  section: {
    gap: spacing.md
  },

  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '500'
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 16
  },

  value: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700'
  },

  helper: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },

  progressWrap: {
    marginTop: spacing.md
  }
});
