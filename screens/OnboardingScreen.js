import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import Card from '../components/Card';
import { colors, radii, spacing, typography } from '../utils/theme';

export default function OnboardingScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [familySize, setFamilySize] = useState('4');
  const [weeklyGroceries, setWeeklyGroceries] = useState('$200-300');
  const [eatsOut, setEatsOut] = useState('2-3 times');
  const [hasEmergencyFund, setHasEmergencyFund] = useState('No');
  const [goal, setGoal] = useState('Save $500/month');

  const savePreferencesAndContinue = () => {
    // Preferences saved - could integrate with AsyncStorage or backend later
    navigation.replace('Tabs');
  };

  // Calculate estimated savings
  const getEstimatedSavings = () => {
    let grocerySavings = 0;
    let mealPrepSavings = 0;
    let totalSavings = 0;

    // Grocery savings based on smart shopping
    if (weeklyGroceries === '$150-200') grocerySavings = 35;
    else if (weeklyGroceries === '$200-300') grocerySavings = 55;
    else if (weeklyGroceries === '$300-400') grocerySavings = 75;
    else if (weeklyGroceries === '$400+') grocerySavings = 95;

    // Eating out savings
    if (eatsOut === '1-2 times') mealPrepSavings = 120;
    else if (eatsOut === '2-3 times') mealPrepSavings = 180;
    else if (eatsOut === '3-4 times') mealPrepSavings = 240;
    else if (eatsOut === '4+ times') mealPrepSavings = 300;

    totalSavings = grocerySavings + mealPrepSavings;
    
    return {
      grocery: grocerySavings,
      mealPrep: mealPrepSavings,
      total: totalSavings,
      yearly: totalSavings * 12
    };
  };

  const savings = getEstimatedSavings();

  if (step === 1) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>👋 Welcome to ThriveMum!</Text>
          <Text style={styles.subtitle}>Let's personalize your money-saving plan</Text>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <Card style={styles.section}>
            <Text style={styles.question}>👨‍👩‍👧‍👦 Family size?</Text>
            <View style={styles.optionsGrid}>
              {['2', '3', '4', '5', '6+'].map((size) => (
                <Pressable
                  key={size}
                  onPress={() => setFamilySize(size)}
                  style={[styles.option, familySize === size && styles.optionActive]}
                >
                  <Text style={[styles.optionText, familySize === size && styles.optionTextActive]}>
                    {size}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Card>

          <Card style={styles.section}>
            <Text style={styles.question}>🛒 Weekly grocery spend?</Text>
            <View style={styles.optionsColumn}>
              {['$100-150', '$150-200', '$200-300', '$300-400', '$400+'].map((amount) => (
                <Pressable
                  key={amount}
                  onPress={() => setWeeklyGroceries(amount)}
                  style={[styles.optionWide, weeklyGroceries === amount && styles.optionActive]}
                >
                  <Text style={[styles.optionText, weeklyGroceries === amount && styles.optionTextActive]}>
                    {amount}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Card>

          <Card style={styles.section}>
            <Text style={styles.question}>🍔 How often do you eat out/order delivery?</Text>
            <View style={styles.optionsColumn}>
              {['Rarely', '1-2 times', '2-3 times', '3-4 times', '4+ times'].map((freq) => (
                <Pressable
                  key={freq}
                  onPress={() => setEatsOut(freq)}
                  style={[styles.optionWide, eatsOut === freq && styles.optionActive]}
                >
                  <Text style={[styles.optionText, eatsOut === freq && styles.optionTextActive]}>
                    {freq} per week
                  </Text>
                </Pressable>
              ))}
            </View>
          </Card>
        </ScrollView>

        <AppButton title="Next →" onPress={() => setStep(2)} style={styles.cta} />
      </View>
    );
  }

  // Step 2: Goals and Savings Estimate
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📊 Your Savings Potential</Text>
        <Text style={styles.subtitle}>Based on your answers, here's what you could save</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Estimated Savings */}
        <Card style={styles.savingsCard}>
          <Text style={styles.bigNumber}>${savings.total}</Text>
          <Text style={styles.savingsLabel}>Potential Monthly Savings</Text>
          <View style={styles.savingsBreakdown}>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownAmount}>🛒 ${savings.grocery}</Text>
              <Text style={styles.breakdownLabel}>Smart Shopping</Text>
            </View>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownAmount}>🍳 ${savings.mealPrep}</Text>
              <Text style={styles.breakdownLabel}>Meal Planning</Text>
            </View>
          </View>
          <View style={styles.yearlyBox}>
            <Text style={styles.yearlyText}>
              That's <Text style={styles.yearlyBold}>${savings.yearly.toLocaleString()}</Text> per year! 🎉
            </Text>
          </View>
        </Card>

        {/* Emergency Fund */}
        <Card style={styles.section}>
          <Text style={styles.question}>💰 Do you have an emergency fund?</Text>
          <Text style={styles.hint}>(3-6 months of expenses saved)</Text>
          <View style={styles.optionsRow}>
            {['Yes', 'Partially', 'No'].map((answer) => (
              <Pressable
                key={answer}
                onPress={() => setHasEmergencyFund(answer)}
                style={[styles.option, hasEmergencyFund === answer && styles.optionActive]}
              >
                <Text style={[styles.optionText, hasEmergencyFund === answer && styles.optionTextActive]}>
                  {answer}
                </Text>
              </Pressable>
            ))}
          </View>
        </Card>

        {/* Primary Goal */}
        <Card style={styles.section}>
          <Text style={styles.question}>🎯 Your main goal?</Text>
          <View style={styles.optionsColumn}>
            {[
              'Save $500/month',
              'Build emergency fund',
              'Pay off debt',
              'Start investing',
              'Save for kids education'
            ].map((g) => (
              <Pressable
                key={g}
                onPress={() => setGoal(g)}
                style={[styles.optionWide, goal === g && styles.optionActive]}
              >
                <Text style={[styles.optionText, goal === g && styles.optionTextActive]}>
                  {g}
                </Text>
              </Pressable>
            ))}
          </View>
        </Card>

        {/* What They'll Get */}
        <Card style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>✨ You'll get personalized:</Text>
          <View style={styles.featuresList}>
            <Text style={styles.feature}>📍 Store price comparisons in your area</Text>
            <Text style={styles.feature}>🍽️ Weekly meal plans (family of {familySize})</Text>
            <Text style={styles.feature}>💡 Budget tips based on your spending</Text>
            <Text style={styles.feature}>📈 Investment guidance for beginners</Text>
            <Text style={styles.feature}>🤖 AI assistant for money questions</Text>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <Pressable onPress={() => setStep(1)} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <AppButton 
          title="Start Saving!" 
          onPress={savePreferencesAndContinue} 
          style={styles.startButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.xs
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: 0,
    gap: spacing.lg,
    paddingBottom: spacing.xxl
  },
  title: {
    color: colors.text,
    ...typography.title,
    fontSize: 28
  },
  subtitle: {
    color: colors.muted,
    ...typography.body,
    fontSize: 16
  },
  section: {
    gap: spacing.md
  },
  question: {
    color: colors.text,
    ...typography.subtitle,
    fontSize: 18,
    fontWeight: '600'
  },
  hint: {
    color: colors.muted,
    ...typography.caption,
    fontSize: 13,
    marginTop: -spacing.xs
  },
  optionsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap'
  },
  optionsRow: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  optionsColumn: {
    gap: spacing.sm
  },
  option: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    minWidth: 70
  },
  optionWide: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center'
  },
  optionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  optionText: {
    color: colors.text,
    ...typography.body,
    fontWeight: '500'
  },
  optionTextActive: {
    color: '#fff',
    fontWeight: '600'
  },
  savingsCard: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary + '60',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl
  },
  bigNumber: {
    color: colors.primary,
    fontSize: 56,
    fontWeight: '700',
    lineHeight: 64
  },
  savingsLabel: {
    color: colors.text,
    ...typography.body,
    fontWeight: '600',
    fontSize: 16
  },
  savingsBreakdown: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: spacing.md
  },
  breakdownItem: {
    alignItems: 'center',
    gap: spacing.xs
  },
  breakdownAmount: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600'
  },
  breakdownLabel: {
    color: colors.muted,
    ...typography.caption,
    fontSize: 13
  },
  yearlyBox: {
    backgroundColor: colors.primary + '20',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.full,
    marginTop: spacing.md
  },
  yearlyText: {
    color: colors.text,
    ...typography.body,
    fontSize: 15
  },
  yearlyBold: {
    fontWeight: '700',
    color: colors.primary
  },
  featuresCard: {
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderColor: colors.border
  },
  featuresTitle: {
    color: colors.text,
    ...typography.subtitle,
    fontSize: 18,
    fontWeight: '600'
  },
  featuresList: {
    gap: spacing.sm
  },
  feature: {
    color: colors.text,
    ...typography.body,
    fontSize: 15,
    lineHeight: 22
  },
  cta: {
    margin: spacing.lg,
    marginBottom: spacing.xxl
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.background
  },
  backButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center'
  },
  backText: {
    color: colors.text,
    ...typography.body,
    fontWeight: '500'
  },
  startButton: {
    flex: 1
  }
});
