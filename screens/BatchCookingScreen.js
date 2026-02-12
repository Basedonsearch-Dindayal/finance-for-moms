import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { fetchMealData } from '../services/mockApi';
import { colors, spacing, typography } from '../utils/theme';

export default function BatchCookingScreen() {
  const [selectedPlan, setSelectedPlan] = useState('4');
  const [loading, setLoading] = useState(true);
  const [mealData, setMealData] = useState(null);

  useEffect(() => {
    loadMealPlan();
  }, [selectedPlan]);

  const loadMealPlan = async () => {
    setLoading(true);
    try {
      const data = await fetchMealData(parseInt(selectedPlan));
      setMealData(data || {});
    } catch (error) {
      console.error('Error loading meal data:', error);
      setMealData({});
    } finally {
      setLoading(false);
    }
  };

  if (loading || !mealData || !mealData.savings) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Creating your meal plan...</Text>
      </View>
    );
  }

  const weeklySavings = parseFloat(mealData.savings || 0);
  const monthlySavings = weeklySavings * 4.3;
  const yearlySavings = weeklySavings * 52;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Batch Cooking Planner</Text>
      <Text style={styles.subtitle}>Cook smart, save time & money</Text>

      {/* Family Size Selector */}
      <View style={styles.selectorRow}>
        {['2', '3', '4', '5'].map((size) => (
          <Pressable
            key={size}
            onPress={() => setSelectedPlan(size)}
            style={[styles.selectorBtn, selectedPlan === size && styles.selectorActive]}
          >
            <Text style={[styles.selectorText, selectedPlan === size && styles.selectorTextActive]}>
              Family of {size}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Savings Overview */}
      <Card style={styles.savingsCard}>
        <Text style={styles.savingsTitle}>💰 Your Savings Potential</Text>
        <View style={styles.savingsGrid}>
          <View style={styles.savingsItem}>
            <Text style={styles.savingsAmount}>${weeklySavings}</Text>
            <Text style={styles.savingsLabel}>per week</Text>
          </View>
          <View style={styles.savingsItem}>
            <Text style={styles.savingsAmount}>${monthlySavings.toFixed(0)}</Text>
            <Text style={styles.savingsLabel}>per month</Text>
          </View>
          <View style={styles.savingsItem}>
            <Text style={styles.savingsAmount}>${yearlySavings.toLocaleString()}</Text>
            <Text style={styles.savingsLabel}>per year</Text>
          </View>
        </View>
        <Text style={styles.savingsNote}>
          vs. ordering takeout - That's almost {Math.round((weeklySavings / parseFloat(mealData.takeoutEquivalent || 1)) * 100)}% savings! 🎉
        </Text>
      </Card>

      {/* 7-Day Meal Plan */}
      <Text style={styles.sectionTitle}>📅 Your 7-Day Plan</Text>
      {(mealData.weeklyPlan || []).map((meal, index) => (
        <Card key={index} style={styles.mealCard}>
          <View style={styles.mealHeader}>
            <View>
              <Text style={styles.dayText}>{meal.day}</Text>
              <Text style={styles.mealName}>{meal.meal || 'Meal'}</Text>
              {meal.prep_time && (
                <Text style={styles.prepTime}>⏱️ {meal.prep_time}</Text>
              )}
            </View>
            <View style={styles.costBadge}>
              <Text style={styles.costText}>${meal.cost || 0}</Text>
            </View>
          </View>
          <View style={styles.itemsList}>
            {meal.items.map((item, i) => (
              <Text key={i} style={styles.itemText}>• {item}</Text>
            ))}
          </View>
        </Card>
      ))}

      {/* Shopping List */}
      <Text style={styles.sectionTitle}>🛒 Shopping List</Text>
      <Card style={styles.shoppingCard}>
        <Text style={styles.shoppingTotal}>Total: ~${mealData.totalCost || 0} for the week</Text>
        <Text style={styles.shoppingNote}>Based on family of {selectedPlan} • Updated with current prices</Text>
        <View style={styles.categorySection}>
          <Text style={styles.categoryName}>📋 All Ingredients</Text>
          {(mealData.weeklyPlan || []).map((meal, index) => (
            <View key={index}>
              {meal.items && meal.items.map((item, i) => (
                <Text key={`${index}-${i}`} style={styles.shoppingItem}>□ {item}</Text>
              ))}
            </View>
          ))}
        </View>
      </Card>

      {/* Batch Cooking Tips */}
      <Card style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>💡 Batch Cooking Pro Tips</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipItem}>🍗 Cook multiple proteins on Sunday (2-3 hours saves 10+ hours/week)</Text>
          <Text style={styles.tipItem}>🥫 Double recipes and freeze half - instant future meals</Text>
          <Text style={styles.tipItem}>🍚 Cook rice/grains in bulk - lasts 5 days refrigerated</Text>
          <Text style={styles.tipItem}>🥕 Prep veggies Sunday night - grab and go all week</Text>
          <Text style={styles.tipItem}>📦 Invest in good containers - keeps food fresh longer</Text>
          <Text style={styles.tipItem}>⏰ Use slow cooker overnight - wake up with dinner ready</Text>
        </View>
      </Card>

      {/* Cost Comparison */}
      <Card style={styles.comparisonCard}>
        <Text style={styles.comparisonTitle}>Cost Comparison</Text>
        <View style={styles.comparisonRow}>
          <Text style={styles.comparisonLabel}>Your meal plan:</Text>
          <Text style={styles.comparisonValue}>${mealData.totalCost || 0}/week</Text>
        </View>
        <View style={styles.comparisonRow}>
          <Text style={styles.comparisonLabel}>Takeout equivalent:</Text>
          <Text style={styles.comparisonDanger}>${mealData.takeoutEquivalent || 0}/week</Text>
        </View>
        <View style={styles.comparisonRow}>
          <Text style={styles.comparisonLabel}>Restaurant meals:</Text>
          <Text style={styles.comparisonDanger}>$320+/week</Text>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md
  },
  loadingText: {
    color: colors.muted,
    fontSize: 14
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
  selectorRow: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  selectorBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center'
  },
  selectorActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary
  },
  selectorText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600'
  },
  selectorTextActive: {
    color: colors.text
  },
  savingsCard: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary + '40'
  },
  savingsTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md
  },
  savingsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md
  },
  savingsItem: {
    alignItems: 'center',
    gap: spacing.xs
  },
  savingsAmount: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '700'
  },
  savingsLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '500'
  },
  savingsNote: {
    color: colors.text,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.sm
  },
  mealCard: {
    gap: spacing.sm
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  dayText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '500'
  },
  mealName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  costBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8
  },
  costText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  itemsList: {
    gap: spacing.xs
  },
  itemText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  shoppingCard: {
    gap: spacing.md
  },
  shoppingTotal: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.sm
  },
  categorySection: {
    gap: spacing.xs
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs
  },
  categoryName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600'
  },
  categoryPrice: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600'
  },
  shoppingItem: {
    color: colors.muted,
    fontSize: 13,
    marginLeft: spacing.sm
  },
  tipsCard: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B'
  },
  tipsTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm
  },
  tipsList: {
    gap: spacing.sm
  },
  tipItem: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20
  },
  comparisonCard: {
    gap: spacing.md
  },
  comparisonTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  comparisonLabel: {
    color: colors.muted,
    fontSize: 14
  },
  comparisonValue: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '700'
  },
  comparisonDanger: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700'
  }
});
