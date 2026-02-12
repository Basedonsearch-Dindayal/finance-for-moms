import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { colors, spacing, typography } from '../utils/theme';

const STEPS = [
  {
    number: 1,
    title: 'Build Your Safety Net First',
    icon: '🛡️',
    description: 'Before investing, save 3-6 months of expenses in an emergency fund. This protects you from having to sell investments at a bad time.',
    details: [
      'Keep in high-yield savings account (currently 4-5% APY)',
      'Ally Bank, Marcus, or Discover for best rates',
      'Should be easily accessible',
      'Not subject to market fluctuations'
    ],
    example: 'If monthly expenses are $3,000, save $9,000-$18,000 first.'
  },
  {
    number: 2,
    title: 'Understand the Basics',
    icon: '📚',
    description: 'Investing isn\'t gambling - it\'s participating in business growth over time. Here are the fundamentals:',
    details: [
      'Stocks = Owning tiny pieces of companies',
      'Bonds = Lending money to companies/government',
      'Index Funds = Baskets of many stocks (safer)',
      'Compound Interest = Your money makes money'
    ],
    example: '$100/month for 30 years at 7% = $122,708 (you invested only $36,000!)'
  },
  {
    number: 3,
    title: 'Choose Your Account Type',
    icon: '🏦',
    description: 'Where you invest matters for taxes and access:',
    details: [
      'Roth IRA: Tax-free growth, $6,500/year limit, for retirement',
      '401(k): Through employer, often with free matching $ ',
      'Taxable Brokerage: No limits, withdraw anytime, pay taxes on gains',
      'Start with 401(k) if employer matches - free money!'
    ],
    example: 'Employer matches 3%? If you make $50k, that\'s free $1,500/year!'
  },
  {
    number: 4,
    title: 'Pick Simple Investments',
    icon: '📊',
    description: 'Don\'t pick individual stocks. Choose low-cost index funds instead:',
    details: [
      'Target Date Funds: Auto-adjusts as you age (easiest)',
      'S&P 500 Index: 500 largest US companies (VTI, VOO)',
      'Total Market Index: Entire US stock market',
      'Keep fees under 0.2% - high fees eat returns'
    ],
    example: 'VTSAX (Vanguard Total Market) or VOO (S&P 500) are great starts.'
  },
  {
    number: 5,
    title: 'Start Small & Automate',
    icon: '⚡',
    description: 'You don\'t need thousands to start. Begin with what you can afford:',
    details: [
      'Many brokers allow $1 minimums now',
      'Start with $25-50 per paycheck',
      'Set up automatic transfers - don\'t rely on willpower',
      'Increase by $10/month when you can'
    ],
    example: '$50/month may seem small, but in 20 years at 7% = $26,000!'
  },
  {
    number: 6,
    title: 'Never Touch It (Seriously)',
    icon: '🔒',
    description: 'The secret to wealth is time in the market, not timing the market:',
    details: [
      'Don\'t panic sell when market drops (it always recovers)',
      'Don\'t try to "time" the market (impossible)',
      'Ignore daily news - focus on 10+ year timeline',
      'Market crashes are buying opportunities'
    ],
    example: '$10k invested in 2009 crash = $70k+ today if you held.'
  }
];

const PLATFORMS = [
  { name: 'Vanguard', minInvest: '$0', fees: '0.04%', best: 'Long-term index investing', rating: '⭐⭐⭐⭐⭐' },
  { name: 'Fidelity', minInvest: '$0', fees: '0%', best: 'Beginner friendly, great tools', rating: '⭐⭐⭐⭐⭐' },
  { name: 'Schwab', minInvest: '$0', fees: '0%', best: 'Customer service', rating: '⭐⭐⭐⭐⭐' },
  { name: 'Robinhood', minInvest: '$1', fees: '0%', best: 'Simple app, fractional shares', rating: '⭐⭐⭐⭐' },
  { name: 'Acorns', minInvest: '$5', fees: '$3/mo', best: 'Auto-invest spare change', rating: '⭐⭐⭐' }
];

export default function InvestmentGuideScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Investment Starter Guide</Text>
      <Text style={styles.subtitle}>Simple steps to grow your wealth (no jargon!)</Text>

      {/* Quick Facts */}
      <Card style={styles.factsCard}>
        <Text style={styles.factsTitle}>💡 Quick Facts</Text>
        <Text style={styles.factItem}>✓ Average stock market return: 7-10% per year</Text>
        <Text style={styles.factItem}>✓ Savings account: 4-5% (doesn't grow with inflation)</Text>
        <Text style={styles.factItem}>✓ Starting early matters more than starting big</Text>
        <Text style={styles.factItem}>✓ $100/month at 25 = $240k at 65 (you only put in $48k!)</Text>
      </Card>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          {STEPS.map((step, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index <= currentStep && styles.progressDotActive
              ]}
            />
          ))}
        </View>
        <Text style={styles.progressText}>
          Step {currentStep + 1} of {STEPS.length}
        </Text>
      </View>

      {/* Step Navigation */}
      <View style={styles.navButtons}>
        <Pressable
          onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          style={[styles.navBtn, currentStep === 0 && styles.navBtnDisabled]}
        >
          <Text style={styles.navBtnText}>← Previous</Text>
        </Pressable>
        <Pressable
          onPress={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
          disabled={currentStep === STEPS.length - 1}
          style={[styles.navBtn, styles.navBtnPrimary, currentStep === STEPS.length - 1 && styles.navBtnDisabled]}
        >
          <Text style={[styles.navBtnText, styles.navBtnTextPrimary]}>Next →</Text>
        </Pressable>
      </View>

      {/* Current Step */}
      <Card style={styles.stepCard}>
        <View style={styles.stepHeader}>
          <Text style={styles.stepIcon}>{STEPS[currentStep].icon}</Text>
          <View style={styles.stepTitleContainer}>
            <Text style={styles.stepNumber}>Step {STEPS[currentStep].number}</Text>
            <Text style={styles.stepTitle}>{STEPS[currentStep].title}</Text>
          </View>
        </View>

        <Text style={styles.stepDescription}>{STEPS[currentStep].description}</Text>

        <View style={styles.detailsList}>
          {STEPS[currentStep].details.map((detail, index) => (
            <Text key={index} style={styles.detailItem}>• {detail}</Text>
          ))}
        </View>

        <Card style={styles.exampleCard}>
          <Text style={styles.exampleTitle}>💰 Real Example:</Text>
          <Text style={styles.exampleText}>{STEPS[currentStep].example}</Text>
        </Card>
      </Card>

      {/* All Steps Overview (Collapsed) */}
      <Text style={styles.sectionTitle}>📋 All Steps Overview</Text>
      {STEPS.map((step, index) => (
        <Pressable
          key={index}
          onPress={() => setCurrentStep(index)}
        >
          <Card style={[
            styles.miniStepCard,
            index === currentStep && styles.miniStepCardActive
          ]}>
            <View style={styles.miniStepRow}>
              <Text style={styles.miniStepIcon}>{step.icon}</Text>
              <Text style={styles.miniStepTitle}>{step.number}. {step.title}</Text>
              {index === currentStep && <Text style={styles.currentIndicator}>●</Text>}
            </View>
          </Card>
        </Pressable>
      ))}

      {/* Recommended Platforms */}
      <Text style={styles.sectionTitle}>🏦 Where to Open an Account</Text>
      {PLATFORMS.map((platform, index) => (
        <Card key={index} style={styles.platformCard}>
          <View style={styles.platformHeader}>
            <Text style={styles.platformName}>{platform.name}</Text>
            <Text style={styles.platformRating}>{platform.rating}</Text>
          </View>
          <View style={styles.platformDetails}>
            <View style={styles.platformRow}>
              <Text style={styles.platformLabel}>Minimum:</Text>
              <Text style={styles.platformValue}>{platform.minInvest}</Text>
            </View>
            <View style={styles.platformRow}>
              <Text style={styles.platformLabel}>Fees:</Text>
              <Text style={styles.platformValue}>{platform.fees}</Text>
            </View>
            <View style={styles.platformRow}>
              <Text style={styles.platformLabel}>Best for:</Text>
              <Text style={styles.platformValueBest}>{platform.best}</Text>
            </View>
          </View>
        </Card>
      ))}

      {/* Common Mistakes */}
      <Card style={styles.mistakesCard}>
        <Text style={styles.mistakesTitle}>⚠️ Common Mistakes to Avoid</Text>
        <View style={styles.mistakesList}>
          <Text style={styles.mistakeItem}>❌ Investing before building emergency fund</Text>
          <Text style={styles.mistakeItem}>❌ Trying to pick individual stocks</Text>
          <Text style={styles.mistakeItem}>❌ Panic selling when market drops</Text>
          <Text style={styles.mistakeItem}>❌ Waiting for "the perfect time" (start now!)</Text>
          <Text style={styles.mistakeItem}>❌ Paying high fees (&gt;1% is too much)</Text>
          <Text style={styles.mistakeItem}>❌ Checking investments daily (causes anxiety)</Text>
        </View>
      </Card>

      {/* Simple Action Plan */}
      <Card style={styles.actionCard}>
        <Text style={styles.actionTitle}>✅ Your 30-Day Action Plan</Text>
        <View style={styles.actionList}>
          <Text style={styles.actionItem}>Week 1: Build emergency fund to $1,000</Text>
          <Text style={styles.actionItem}>Week 2: Open a Roth IRA or 401(k)</Text>
          <Text style={styles.actionItem}>Week 3: Choose a target date fund</Text>
          <Text style={styles.actionItem}>Week 4: Set up $50 automatic monthly investment</Text>
        </View>
        <Text style={styles.actionFooter}>
          Then increase by $10/month as your budget allows!
        </Text>
      </Card>

      {/* Resources */}
      <Card style={styles.resourcesCard}>
        <Text style={styles.resourcesTitle}>📚 Learn More (Free Resources)</Text>
        <Text style={styles.resourceItem}>• Book: "The Simple Path to Wealth" - JL Collins</Text>
        <Text style={styles.resourceItem}>• Reddit: r/personalfinance wiki</Text>
        <Text style={styles.resourceItem}>• YouTube: "Two Cents" channel</Text>
        <Text style={styles.resourceItem}>• Podcast: "Afford Anything" by Paula Pant</Text>
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
    marginTop: spacing.xs
  },
  factsCard: {
    backgroundColor: '#E0F2FE',
    borderColor: '#0EA5E9',
    gap: spacing.sm
  },
  factsTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs
  },
  factItem: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20
  },
  progressContainer: {
    alignItems: 'center',
    gap: spacing.sm
  },
  progressBar: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center'
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border
  },
  progressDotActive: {
    backgroundColor: colors.primary,
    width: 16,
    height: 16,
    borderRadius: 8
  },
  progressText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600'
  },
  navButtons: {
    flexDirection: 'row',
    gap: spacing.md
  },
  navBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center'
  },
  navBtnPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  navBtnDisabled: {
    opacity: 0.4
  },
  navBtnText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600'
  },
  navBtnTextPrimary: {
    color: '#FFFFFF'
  },
  stepCard: {
    gap: spacing.md
  },
  stepHeader: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center'
  },
  stepIcon: {
    fontSize: 40
  },
  stepTitleContainer: {
    flex: 1,
    gap: spacing.xs
  },
  stepNumber: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  stepTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700'
  },
  stepDescription: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  detailsList: {
    gap: spacing.sm,
    paddingLeft: spacing.md
  },
  detailItem: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  exampleCard: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary + '40',
    gap: spacing.xs
  },
  exampleTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600'
  },
  exampleText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.sm
  },
  miniStepCard: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg
  },
  miniStepCardActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary
  },
  miniStepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md
  },
  miniStepIcon: {
    fontSize: 20
  },
  miniStepTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '500'
  },
  currentIndicator: {
    color: colors.primary,
    fontSize: 16
  },
  platformCard: {
    gap: spacing.md
  },
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  platformName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600'
  },
  platformRating: {
    fontSize: 14
  },
  platformDetails: {
    gap: spacing.sm
  },
  platformRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  platformLabel: {
    color: colors.muted,
    fontSize: 13
  },
  platformValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600'
  },
  platformValueBest: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right'
  },
  mistakesCard: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
    gap: spacing.md
  },
  mistakesTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  mistakesList: {
    gap: spacing.sm
  },
  mistakeItem: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20
  },
  actionCard: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
    gap: spacing.md
  },
  actionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  actionList: {
    gap: spacing.sm
  },
  actionItem: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  },
  actionFooter: {
    color: colors.text,
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  resourcesCard: {
    gap: spacing.sm
  },
  resourcesTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  resourceItem: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20
  }
});
