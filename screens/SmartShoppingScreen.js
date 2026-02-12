import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { fetchStorePrices } from '../services/mockApi';
import { colors, spacing, typography } from '../utils/theme';

export default function SmartShoppingScreen() {
  const [loading, setLoading] = useState(true);
  const [storeData, setStoreData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [specialDeals, setSpecialDeals] = useState([]);

  useEffect(() => {
    loadStores();
    // Refresh prices every 5 minutes
    const interval = setInterval(loadStores, 300000);
    return () => clearInterval(interval);
  }, []);

  const loadStores = async () => {
    try {
      const data = await fetchStorePrices();
      setStoreData(data.stores);
      setSpecialDeals(data.specialDeals);
      setLastUpdated(new Date(data.timestamp));
    } catch (error) {
      console.error('Error loading store prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBestStore = () => {
    if (!storeData) return { store: 'Loading...', avgPrice: '0.00' };
    
    let best = null;
    let lowestAvg = Infinity;
    
    Object.entries(storeData).forEach(([store, prices]) => {
      const avg = (+prices.grocery + +prices.produce + +prices.meat + +prices.dairy) / 4;
      if (avg < lowestAvg) {
        lowestAvg = avg;
        best = store;
      }
    });
    
    return { store: best, avgPrice: lowestAvg.toFixed(2) };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Fetching latest prices...</Text>
      </View>
    );
  }

  const bestStore = getBestStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Smart Shopping Guide</Text>
          <Text style={styles.subtitle}>Live prices • Updated {lastUpdated?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</Text>
        </View>
      </View>

      {specialDeals.length > 0 && (
        <Card style={styles.dealsCard}>
          <Text style={styles.dealsTitle}>🔥 Today's Special Deals</Text>
          {specialDeals.map((deal, i) => (
            <Text key={i} style={styles.dealText}>• {deal}</Text>
          ))}
        </Card>
      )}

      {/* Best Overall */}
      <Card style={styles.highlightCard}>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>🏆 Best Overall Right Now</Text>
        </View>
        <Text style={styles.storeName}>{bestStore.store}</Text>
        <Text style={styles.avgPrice}>Average: ${bestStore.avgPrice}/item</Text>
        <Text style={styles.savingsText}>
          Save up to {storeData[bestStore.store]?.savings}% vs premium stores
        </Text>
      </Card>

      {/* Store Comparison */}
      <Text style={styles.sectionTitle}>Store Comparison (Live Prices)</Text>
      {Object.entries(storeData).map(([store, data]) => (
        <Card key={store} style={styles.storeCard}>
          <View style={styles.storeHeader}>
            <Text style={styles.storeTitle}>{store}</Text>
            {data.savings > 0 ? (
              <View style={styles.savingsBadge}>
                <Text style={styles.savingsBadgeText}>-{data.savings}%</Text>
              </View>
            ) : (
              <View style={[styles.savingsBadge, styles.premiumBadge]}>
                <Text style={styles.premiumBadgeText}>Premium</Text>
              </View>
            )}
          </View>
          
          <View style={styles.priceGrid}>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Grocery</Text>
              <Text style={styles.priceValue}>${data.grocery}</Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Produce</Text>
              <Text style={styles.priceValue}>${data.produce}</Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Meat</Text>
              <Text style={styles.priceValue}>${data.meat}</Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Dairy</Text>
              <Text style={styles.priceValue}>${data.dairy}</Text>
            </View>
          </View>
        </Card>
      ))}

      {/* Smart Tips */}
      <Card style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>💡 Smart Shopping Tips</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipItem}>• Shop Aldi or Walmart for basics (save 15-22%)</Text>
          <Text style={styles.tipItem}>• Buy store brands - same quality, 30% less</Text>
          <Text style={styles.tipItem}>• Check unit prices, not package prices</Text>
          <Text style={styles.tipItem}>• Shop Wednesday mornings for fresh markdowns</Text>
          <Text style={styles.tipItem}>• Freeze bread, meat when on sale - saves 40%/month</Text>
        </View>
      </Card>

      {/* Weekly Savings Calculator */}
      <Card style={styles.calculatorCard}>
        <Text style={styles.calcTitle}>Your Potential Weekly Savings</Text>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Switch to {bestStore.store}:</Text>
          <Text style={styles.calcAmount}>$45-60/week</Text>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Use store brands:</Text>
          <Text style={styles.calcAmount}>$25-35/week</Text>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Buy on sale + freeze:</Text>
          <Text style={styles.calcAmount}>$30-40/week</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.calcRow}>
          <Text style={styles.totalLabel}>Total Potential Savings:</Text>
          <Text style={styles.totalAmount}>$100-135/week</Text>
        </View>
        <Text style={styles.yearlyText}>That's $5,200-7,020 per year! 🎉</Text>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  dealsCard: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
    gap: spacing.sm
  },
  dealsTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  dealText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20
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
  highlightCard: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary + '40'
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm
  },
  badge: {
    fontSize: 14,
    fontWeight: '600'
  },
  storeName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: spacing.xs
  },
  avgPrice: {
    color: colors.muted,
    fontSize: 16,
    marginBottom: spacing.sm
  },
  savingsText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600'
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.sm
  },
  storeCard: {
    gap: spacing.md
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  storeTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600'
  },
  savingsBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12
  },
  savingsBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600'
  },
  premiumBadge: {
    backgroundColor: colors.accent
  },
  premiumBadgeText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600'
  },
  priceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md
  },
  priceItem: {
    width: '47%',
    gap: spacing.xs
  },
  priceLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '500'
  },
  priceValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600'
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
    fontSize: 14,
    lineHeight: 20
  },
  calculatorCard: {
    gap: spacing.md
  },
  calcTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  calcLabel: {
    color: colors.muted,
    fontSize: 14
  },
  calcAmount: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600'
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs
  },
  totalLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600'
  },
  totalAmount: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700'
  },
  yearlyText: {
    color: colors.text,
    fontSize: 13,
    textAlign: 'center',
    marginTop: spacing.xs
  }
});
