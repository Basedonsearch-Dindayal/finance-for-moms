import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Card from '../components/Card';
import { colors, radii, spacing, typography } from '../utils/theme';

const meals = [
  { title: 'Chicken stir-fry', cost: 9.5, alt: 7.2 },
  { title: 'Pasta night', cost: 8.0, alt: 5.6 },
  { title: 'Taco bowls', cost: 10.2, alt: 7.9 }
];

export default function GrocerySavingsScreen() {
  const [budget, setBudget] = useState('');
  const [familySize, setFamilySize] = useState('4');

  const formatCurrency = (value) => {
    const amount = Number.isFinite(value) ? value : 0;
    return `$${amount.toFixed(2)}`;
  };

  const { perPerson, savings } = useMemo(() => {
    const weekly = Number(budget.replace(/[^0-9.]/g, '')) || 0;
    const size = Number(familySize.replace(/[^0-9]/g, '')) || 0;
    const per = size > 0 ? weekly / size : 0;
    return {
      perPerson: per,
      savings: weekly * 0.1
    };
  }, [budget, familySize]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Grocery Savings</Text>
      <Text style={styles.subtitle}>You’ve got this. Small swaps can help.</Text>

      <Card style={styles.section}>
        <Text style={styles.label}>Weekly grocery budget</Text>
        <TextInput
          value={budget}
          onChangeText={setBudget}
          placeholder="0"
          keyboardType="numeric"
          style={styles.input}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.label}>Family size</Text>
        <TextInput
          value={familySize}
          onChangeText={setFamilySize}
          placeholder="0"
          keyboardType="number-pad"
          style={styles.input}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.label}>Budget breakdown</Text>
        <Text style={styles.value}>{formatCurrency(perPerson)} per person</Text>
        <Text style={styles.helper}>Based on your weekly budget.</Text>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.label}>Savings suggestion</Text>
        <Text style={styles.value}>Save about {formatCurrency(savings)} / week</Text>
        <Text style={styles.helper}>That’s a 10% opportunity.</Text>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.label}>Meal comparisons</Text>
        {meals.map((meal) => (
          <View key={meal.title} style={styles.mealRow}>
            <Text style={styles.mealTitle}>{meal.title}</Text>
            <Text style={styles.mealCost}>
              {formatCurrency(meal.cost)} → {formatCurrency(meal.alt)}
            </Text>
          </View>
        ))}
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
  },
  mealRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs
  },
  mealTitle: {
    color: colors.text,
    ...typography.body
  },
  mealCost: {
    color: colors.muted,
    ...typography.caption
  }
});
