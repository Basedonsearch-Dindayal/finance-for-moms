import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import { fetchDailyTips, fetchUserProgress } from '../services/mockApi';
import { colors, spacing, typography } from '../utils/theme';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [monthData, setMonthData] = useState(null);
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [progress, tips] = await Promise.all([
        fetchUserProgress(),
        fetchDailyTips()
      ]);
      
      // Safely unwrap monthly data and merge with achievements
      const monthlyData = progress?.monthly || {};
      setMonthData({
        groceries_saved: monthlyData.groceries_saved || 0,
        emergency_fund: monthlyData.emergency_fund || 0,
        investment_balance: monthlyData.investment_balance || 0,
        total_saved: monthlyData.total_saved || 0,
        goal: monthlyData.goal || 520,
        progress: monthlyData.progress || 0,
        achievements: progress?.achievements || []
      });
      
      // Safely get tip text
      const tipText = tips?.daily_tip?.tip || 'Track spending for a week to find easy savings opportunities!';
      setCurrentTip(tipText);
    } catch (error) {
      console.error('Error loading data:', error);
      // Set fallback data so UI doesn't crash
      setMonthData({
        groceries_saved: 0,
        emergency_fund: 0,
        investment_balance: 0,
        total_saved: 0,
        goal: 520,
        progress: 0,
        achievements: []
      });
      setCurrentTip('Welcome! Start tracking your savings today.');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !monthData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>You're building great habits 💪</Text>
        </View>
        <Text style={styles.dateText}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
      </View>

      {/* Today's Smart Tip */}
      <Card style={styles.tipCard}>
        <Text style={styles.sectionLabel}>💡 Today's Smart Tip</Text>
        <Text style={styles.tipText}>{currentTip}</Text>
      </Card>

      {/* Monthly Progress */}
      <Card style={styles.progressCard}>
        <Text style={styles.sectionLabel}>🎯 This Month's Progress</Text>
        <View style={styles.progressContent}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressAmount}>${monthData.total_saved || 0}</Text>
            <Text style={styles.progressGoal}>/ ${monthData.goal || 520} goal</Text>
          </View>
          <ProgressBar value={Math.min(monthData.progress || 0, 1)} />
          <Text style={styles.progressNote}>
            {Math.round((monthData.progress || 0) * 100)}% of monthly savings goal reached
          </Text>
        </View>
      </Card>

      {/* Monthly Snapshot */}
      <Card style={styles.snapshotCard}>
        <Text style={styles.sectionLabel}>📊 Monthly Snapshot</Text>
        <View style={styles.snapshotGrid}>
          <View style={styles.snapshotItem}>
            <Text style={styles.snapshotValue}>${monthData.groceries_saved || 0}</Text>
            <Text style={styles.snapshotLabel}>Groceries Saved</Text>
          </View>
          <View style={styles.snapshotItem}>
            <Text style={styles.snapshotValue}>${(monthData.emergency_fund || 0).toLocaleString()}</Text>
            <Text style={styles.snapshotLabel}>Emergency Fund</Text>
          </View>
          <View style={styles.snapshotItem}>
            <Text style={styles.snapshotValue}>${monthData.investment_balance || 0}</Text>
            <Text style={styles.snapshotLabel}>Investments</Text>
          </View>
        </View>
        {monthData.achievements && monthData.achievements.length > 0 && (
          <Text style={styles.snapshotFooter}>
            🎉 {monthData.achievements[0]}
          </Text>
        )}
      </Card>

      {/* Quick Actions */}
      <Text style={styles.quickActionsTitle}>Quick Actions</Text>

      <Pressable 
        style={({ pressed }) => [styles.actionCard, pressed && styles.actionPressed]}
        onPress={() => navigation.navigate('Save', { screen: 'GrocerySavings' })}
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionEmoji}>🛒</Text>
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>Grocery Savings Calculator</Text>
          <Text style={styles.actionDesc}>See how much you can save on weekly shopping</Text>
        </View>
      </Pressable>

      <Pressable 
        style={({ pressed }) => [styles.actionCard, pressed && styles.actionPressed]}
        onPress={() => navigation.navigate('Save', { screen: 'EmergencyFund' })}
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionEmoji}>🛡️</Text>
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>Emergency Fund Builder</Text>
          <Text style={styles.actionDesc}>Build your safety cushion with small steps</Text>
        </View>
      </Pressable>

      <Pressable 
        style={({ pressed }) => [styles.actionCard, pressed && styles.actionPressed]}
        onPress={() => navigation.navigate('Grow', { screen: 'InvestmentSimulator' })}
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionEmoji}>📈</Text>
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>Investment Growth Simulator</Text>
          <Text style={styles.actionDesc}>See how steady contributions can grow</Text>
        </View>
      </Pressable>

      <Pressable 
        style={({ pressed }) => [styles.actionCard, pressed && styles.actionPressed]}
        onPress={() => navigation.navigate('Assistant')}
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionEmoji}>💬</Text>
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>AI Assistant</Text>
          <Text style={styles.actionDesc}>Get personalized financial guidance</Text>
        </View>
      </Pressable>

      {/* New Features */}
      <Text style={styles.sectionSubtitle}>💰 Save Money Daily</Text>

      <Pressable 
        style={({ pressed }) => [styles.actionCard, pressed && styles.actionPressed]}
        onPress={() => navigation.navigate('Save', { screen: 'SmartShopping' })}
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionEmoji}>🏪</Text>
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>Smart Shopping Guide</Text>
          <Text style={styles.actionDesc}>Compare stores and save $40-60/week</Text>
        </View>
      </Pressable>

      <Pressable 
        style={({ pressed }) => [styles.actionCard, pressed && styles.actionPressed]}
        onPress={() => navigation.navigate('Save', { screen: 'BatchCooking' })}
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionEmoji}>🍳</Text>
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>Batch Cooking Planner</Text>
          <Text style={styles.actionDesc}>7-day meal plans that save $100+/week</Text>
        </View>
      </Pressable>

      <Pressable 
        style={({ pressed }) => [styles.actionCard, pressed && styles.actionPressed]}
        onPress={() => navigation.navigate('Save', { screen: 'HomeSavings' })}
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionEmoji}>🏠</Text>
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>Home DIY Savings</Text>
          <Text style={styles.actionDesc}>DIY projects that save thousands</Text>
        </View>
      </Pressable>

      <Pressable 
        style={({ pressed }) => [styles.actionCard, pressed && styles.actionPressed]}
        onPress={() => navigation.navigate('Save', { screen: 'QuickWins' })}
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionEmoji}>⚡</Text>
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>Quick Wins Library</Text>
          <Text style={styles.actionDesc}>50+ instant money-saving tips</Text>
        </View>
      </Pressable>

      <Text style={styles.sectionSubtitle}>📈 Grow Your Wealth</Text>

      <Pressable 
        style={({ pressed }) => [styles.actionCard, pressed && styles.actionPressed]}
        onPress={() => navigation.navigate('Grow', { screen: 'InvestmentGuide' })}
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionEmoji}>🎓</Text>
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>Investment Starter Guide</Text>
          <Text style={styles.actionDesc}>Learn to invest step-by-step (no jargon!)</Text>
        </View>
      </Pressable>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm
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
  dateText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  tipCard: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary + '30'
  },
  sectionLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.sm
  },
  tipText: {
    color: colors.text,
    ...typography.body,
    lineHeight: 22
  },
  progressCard: {
    gap: spacing.md
  },
  progressContent: {
    gap: spacing.md
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs
  },
  progressAmount: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: '700'
  },
  progressGoal: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: '500'
  },
  progressNote: {
    color: colors.muted,
    fontSize: 13,
    textAlign: 'center'
  },
  snapshotCard: {
    gap: spacing.md
  },
  snapshotGrid: {
    flexDirection: 'row',
    gap: spacing.lg
  },
  snapshotItem: {
    flex: 1,
    gap: spacing.xs
  },
  snapshotValue: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '700'
  },
  snapshotLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '500'
  },
  snapshotFooter: {
    color: colors.text,
    fontSize: 13,
    textAlign: 'center',
    marginTop: spacing.xs,
    fontWeight: '600'
  },
  quickActionsTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.xs
  },
  actionCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2
  },
  actionPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }]
  },
  actionIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.primarySoft,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionEmoji: {
    fontSize: 24
  },
  actionContent: {
    flex: 1,
    gap: spacing.xs
  },
  actionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  actionDesc: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  }
});
