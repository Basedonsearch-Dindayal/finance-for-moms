import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../utils/theme';
import InvestmentGuideScreen from './InvestmentGuideScreen';
import InvestmentSimulatorScreen from './InvestmentSimulatorScreen';

const Stack = createNativeStackNavigator();

function GrowHome({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Grow Your Money</Text>
      <Text style={styles.subtitle}>Learn how small contributions can build wealth over time.</Text>

      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('InvestmentSimulator')}
      >
        <View style={styles.cardIcon}>
          <Text style={styles.cardEmoji}>📈</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Investment Growth Simulator</Text>
          <Text style={styles.cardDesc}>See how steady contributions grow with compound returns</Text>
        </View>
      </Pressable>

      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('InvestmentGuide')}
      >
        <View style={styles.cardIcon}>
          <Text style={styles.cardEmoji}>🎓</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Investment Starter Guide</Text>
          <Text style={styles.cardDesc}>Learn to invest step-by-step (no jargon!)</Text>
        </View>
      </Pressable>

      <View style={styles.infoCard}>
        <Text style={styles.infoEmoji}>💡</Text>
        <Text style={styles.infoTitle}>Why Invest?</Text>
        <Text style={styles.infoText}>
          Even small amounts invested regularly can grow significantly over time. Our guides show realistic projections based on historical market returns and teach you how to get started safely.
        </Text>
      </View>
    </ScrollView>
  );
}

export default function GrowScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600' },
        headerShadowVisible: false
      }}
    >
      <Stack.Screen 
        name="GrowHome" 
        component={GrowHome} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="InvestmentSimulator" 
        component={InvestmentSimulatorScreen}
        options={{ title: 'Investment Simulator' }}
      />
      <Stack.Screen 
        name="InvestmentGuide" 
        component={InvestmentGuideScreen}
        options={{ title: 'Investment Guide' }}
      />
    </Stack.Navigator>
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
  card: {
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
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }]
  },
  cardIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.primarySoft,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardEmoji: {
    fontSize: 24
  },
  cardContent: {
    flex: 1,
    gap: spacing.xs
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  cardDesc: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  infoCard: {
    backgroundColor: colors.primarySoft,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary + '30',
    gap: spacing.sm
  },
  infoEmoji: {
    fontSize: 28
  },
  infoTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  infoText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  }
});
