import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { colors, spacing, typography } from '../utils/theme';

const QUICK_WINS = {
  'Groceries': [
    { tip: 'Shop Aldi or Walmart for basics', savings: '$40-60/week', difficulty: 'Easy' },
    { tip: 'Buy store brands instead of name brands', savings: '$25-35/week', difficulty: 'Easy' },
    { tip: 'Meal plan before shopping', savings: '$30-50/week', difficulty: 'Easy' },
    { tip: 'Use cash-back apps (Ibotta, Fetch)', savings: '$10-20/week', difficulty: 'Easy' },
    { tip: 'Buy frozen fruits/veggies (same nutrition, 50% less)', savings: '$15-25/week', difficulty: 'Easy' },
    { tip: 'Shop Wednesday mornings for markdowns', savings: '$20-30/week', difficulty: 'Easy' },
    { tip: 'Batch cook on Sundays', savings: '$100+/week', difficulty: 'Medium' }
  ],
  'Utilities': [
    { tip: 'LED bulbs in every socket', savings: '$15-20/month', difficulty: 'Easy' },
    { tip: 'Programmable thermostat (68°F winter, 78°F summer)', savings: '$30-50/month', difficulty: 'Easy' },
    { tip: 'Unplug devices when not in use', savings: '$10-15/month', difficulty: 'Easy' },
    { tip: 'Wash clothes in cold water', savings: '$8-12/month', difficulty: 'Easy' },
    { tip: 'Air dry dishes instead of heat dry', savings: '$5-8/month', difficulty: 'Easy' },
    { tip: 'Install low-flow showerheads', savings: '$15-25/month', difficulty: 'Easy' },
    { tip: 'Seal windows and doors', savings: '$20-40/month', difficulty: 'Medium' }
  ],
  'Subscriptions': [
    { tip: 'Cancel unused streaming services', savings: '$15-30/month', difficulty: 'Easy' },
    { tip: 'Share family plans (Netflix, Spotify)', savings: '$20-40/month', difficulty: 'Easy' },
    { tip: 'Review bank fees, switch to free checking', savings: '$12-25/month', difficulty: 'Easy' },
    { tip: 'Cancel gym membership, use YouTube workouts', savings: '$40-80/month', difficulty: 'Easy' },
    { tip: 'Library instead of Kindle Unlimited', savings: '$10/month', difficulty: 'Easy' },
    { tip: 'Call insurance for better rates annually', savings: '$30-75/month', difficulty: 'Medium' }
  ],
  'Kids': [
    { tip: 'Buy kids clothes at thrift stores', savings: '$50-80/month', difficulty: 'Easy' },
    { tip: 'Library story time instead of paid classes', savings: '$30-60/month', difficulty: 'Easy' },
    { tip: 'Swap toys with other mums', savings: '$20-40/month', difficulty: 'Easy' },
    { tip: 'Free museum days (check local schedules)', savings: '$30-50/month', difficulty: 'Easy' },
    { tip: 'Pack lunches 4 days/week', savings: '$60-100/month', difficulty: 'Easy' },
    { tip: 'DIY birthday parties at home', savings: '$150-300/party', difficulty: 'Medium' }
  ],
  'Transportation': [
    { tip: 'Combine errands into one trip', savings: '$20-35/month', difficulty: 'Easy' },
    { tip: 'Use GasBuddy app for cheapest fuel', savings: '$10-20/month', difficulty: 'Easy' },
    { tip: 'Check tire pressure monthly (improves MPG)', savings: '$15-25/month', difficulty: 'Easy' },
    { tip: 'Walk for trips under 1 mile', savings: '$10-15/month', difficulty: 'Easy' },
    { tip: 'Car pool school runs with neighbors', savings: '$25-40/month', difficulty: 'Medium' },
    { tip: 'DIY car wash at home', savings: '$20-35/month', difficulty: 'Easy' }
  ],
  'Entertainment': [
    { tip: 'Free local events (parks, festivals)', savings: '$40-80/month', difficulty: 'Easy' },
    { tip: 'Potluck dinners instead of restaurants', savings: '$60-100/month', difficulty: 'Easy' },
    { tip: 'Matinee movies instead of evening', savings: '$15-25/outing', difficulty: 'Easy' },
    { tip: 'Parks pass instead of theme parks', savings: '$100-200/month', difficulty: 'Easy' },
    { tip: 'Game nights at home', savings: '$50-80/month', difficulty: 'Easy' },
    { tip: 'Free trials (remember to cancel!)', savings: '$20-40/month', difficulty: 'Easy' }
  ]
};

export default function QuickWinsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Groceries');
  const [expandedTips, setExpandedTips] = useState(new Set());

  const categories = Object.keys(QUICK_WINS);
  const currentTips = QUICK_WINS[selectedCategory];

  const getTotalSavings = (category) => {
    const tips = QUICK_WINS[category];
    let min = 0, max = 0;
    
    tips.forEach(tip => {
      const matches = tip.savings.match(/\$?(\d+)-?(\d+)?/g);
      if (matches) {
        matches.forEach(match => {
          const nums = match.replace('$', '').split('-');
          min += parseInt(nums[0]);
          max += parseInt(nums[nums.length - 1]);
        });
      }
    });
    
    return { min, max };
  };

  const allCategorySavings = categories.map(cat => {
    const { min, max } = getTotalSavings(cat);
    return { category: cat, min, max };
  });

  const grandTotal = allCategorySavings.reduce((sum, cat) => sum + cat.max, 0);

  const toggleTip = (index) => {
    const newSet = new Set(expandedTips);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedTips(newSet);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Quick Wins Library</Text>
      <Text style={styles.subtitle}>Actionable tips that save money today</Text>

      {/* Total Potential Savings */}
      <Card style={styles.totalCard}>
        <Text style={styles.totalTitle}>💰 Combined Savings Potential</Text>
        <Text style={styles.totalAmount}>${grandTotal.toLocaleString()}+</Text>
        <Text style={styles.totalLabel}>per month across all categories</Text>
        <Text style={styles.totalNote}>That's ${(grandTotal * 12).toLocaleString()}+ per year!</Text>
      </Card>

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
        <View style={styles.tabs}>
          {categories.map((category) => (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[styles.tab, selectedCategory === category && styles.tabActive]}
            >
              <Text style={[styles.tabText, selectedCategory === category && styles.tabTextActive]}>
                {category}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Category Savings Overview */}
      <Card style={styles.categoryOverview}>
        <Text style={styles.categoryTitle}>{selectedCategory} Savings</Text>
        <Text style={styles.categorySavings}>
          Up to ${getTotalSavings(selectedCategory).max}+ per month
        </Text>
        <Text style={styles.categoryNote}>
          {currentTips.length} quick wins in this category
        </Text>
      </Card>

      {/* Tips List */}
      {currentTips.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => toggleTip(index)}
        >
          <Card style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <View style={styles.tipContent}>
                <Text style={styles.tipText}>{item.tip}</Text>
                <View style={styles.tipMeta}>
                  <Text style={styles.savingsText}>{item.savings}</Text>
                  <View style={[
                    styles.difficultyBadge,
                    item.difficulty === 'Easy' && styles.difficultyEasy
                  ]}>
                    <Text style={styles.difficultyText}>{item.difficulty}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.expandIcon}>
                {expandedTips.has(index) ? '▼' : '▶'}
              </Text>
            </View>

            {expandedTips.has(index) && (
              <View style={styles.expandedContent}>
                <Text style={styles.actionTitle}>✅ Action Steps:</Text>
                <Text style={styles.actionText}>
                  {getActionSteps(item.tip)}
                </Text>
              </View>
            )}
          </Card>
        </Pressable>
      ))}

      {/* Implementation Tip */}
      <Card style={styles.implementCard}>
        <Text style={styles.implementTitle}>🎯 Start Small</Text>
        <Text style={styles.implementText}>
          Pick 3 easy wins from different categories this week. Once they become habits, add more. Small changes compound into big savings!
        </Text>
      </Card>

      {/* Quick Wins Checklist */}
      <Card style={styles.checklistCard}>
        <Text style={styles.checklistTitle}>📋 This Week's Challenge</Text>
        <View style={styles.checklistItems}>
          <Text style={styles.checklistItem}>□ Pick 1 tip from Groceries</Text>
          <Text style={styles.checklistItem}>□ Pick 1 tip from Utilities</Text>
          <Text style={styles.checklistItem}>□ Cancel 1 unused subscription</Text>
          <Text style={styles.checklistItem}>□ Track your savings for 7 days</Text>
        </View>
        <Text style={styles.checklistReward}>
          Complete all 4 = Potential $100+ saved this month! 🎉
        </Text>
      </Card>
    </ScrollView>
  );
}

// Helper function to generate action steps
function getActionSteps(tip) {
  const steps = {
    'Shop Aldi or Walmart for basics': '1. Make a list of your staples\n2. Compare prices at both stores\n3. Switch for your next shop\n4. Track savings for a month',
    'Buy store brands': '1. Try store brand of one item this week\n2. Do a blind taste test with family\n3. Notice the price difference\n4. Gradually switch more items',
    'LED bulbs': '1. Replace 5 most-used bulbs first\n2. Wait for current bulbs to burn out for others\n3. Track electric bill change\n4. LEDs last 10+ years',
    'Cancel unused streaming': '1. Check last login dates on all services\n2. Cancel anything unused in 2+ months\n3. Can always re-subscribe for specific shows\n4. Rotate services monthly',
    'Pack lunches': '1. Make extra dinner for next day\'s lunch\n2. Prep 5 portions Sunday night\n3. Invest in good lunch containers\n4. Start with 2 days/week, build up'
  };

  for (const [key, value] of Object.entries(steps)) {
    if (tip.includes(key)) return value;
  }

  return '1. Research best approach for your situation\n2. Start with a test week\n3. Track results\n4. Adjust and scale up';
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
  totalCard: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary + '40',
    alignItems: 'center',
    gap: spacing.xs
  },
  totalTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  totalAmount: {
    color: colors.primary,
    fontSize: 36,
    fontWeight: '700'
  },
  totalLabel: {
    color: colors.muted,
    fontSize: 13
  },
  totalNote: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginTop: spacing.xs
  },
  tabsScroll: {
    marginHorizontal: -spacing.xl
  },
  tabs: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl
  },
  tab: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface
  },
  tabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  tabText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600'
  },
  tabTextActive: {
    color: '#FFFFFF'
  },
  categoryOverview: {
    gap: spacing.xs
  },
  categoryTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600'
  },
  categorySavings: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '700'
  },
  categoryNote: {
    color: colors.muted,
    fontSize: 13
  },
  tipCard: {
    gap: spacing.sm
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md
  },
  tipContent: {
    flex: 1,
    gap: spacing.sm
  },
  tipText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20
  },
  tipMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md
  },
  savingsText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '700'
  },
  difficultyBadge: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 6
  },
  difficultyEasy: {
    backgroundColor: '#86EFAC'
  },
  difficultyText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '600'
  },
  expandIcon: {
    color: colors.muted,
    fontSize: 12
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    gap: spacing.sm
  },
  actionTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600'
  },
  actionText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  implementCard: {
    backgroundColor: '#E0F2FE',
    borderColor: '#0EA5E9',
    gap: spacing.sm
  },
  implementTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  implementText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  },
  checklistCard: {
    gap: spacing.md
  },
  checklistTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  checklistItems: {
    gap: spacing.sm
  },
  checklistItem: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22
  },
  checklistReward: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: spacing.xs
  }
});
