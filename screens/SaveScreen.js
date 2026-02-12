import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../utils/theme';
import BatchCookingScreen from './BatchCookingScreen';
import EmergencyFundScreen from './EmergencyFundScreen';
import GrocerySavingsScreen from './GrocerySavingsScreen';
import HomeSavingsScreen from './HomeSavingsScreen';
import QuickWinsScreen from './QuickWinsScreen';
import SmartShoppingScreen from './SmartShoppingScreen';

const Stack = createNativeStackNavigator();

function SaveHome({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Save Smart</Text>
      <Text style={styles.subtitle}>Small changes add up to big wins.</Text>

      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('GrocerySavings')}
      >
        <View style={styles.cardIcon}>
          <Text style={styles.cardEmoji}>🛒</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Grocery Savings Calculator</Text>
          <Text style={styles.cardDesc}>Find out how much you can save on weekly shopping</Text>
        </View>
      </Pressable>

      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('EmergencyFund')}
      >
        <View style={styles.cardIcon}>
          <Text style={styles.cardEmoji}>🛡️</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Emergency Fund Builder</Text>
          <Text style={styles.cardDesc}>Build your safety cushion step by step</Text>
        </View>
      </Pressable>

      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('SmartShopping')}
      >
        <View style={styles.cardIcon}>
          <Text style={styles.cardEmoji}>🏪</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Smart Shopping Guide</Text>
          <Text style={styles.cardDesc}>Compare stores and save $40-60/week</Text>
        </View>
      </Pressable>

      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('BatchCooking')}
      >
        <View style={styles.cardIcon}>
          <Text style={styles.cardEmoji}>🍳</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Batch Cooking Planner</Text>
          <Text style={styles.cardDesc}>7-day meal plans that save $100+/week</Text>
        </View>
      </Pressable>

      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('HomeSavings')}
      >
        <View style={styles.cardIcon}>
          <Text style={styles.cardEmoji}>🏠</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Home DIY Savings</Text>
          <Text style={styles.cardDesc}>DIY projects that save thousands</Text>
        </View>
      </Pressable>

      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('QuickWins')}
      >
        <View style={styles.cardIcon}>
          <Text style={styles.cardEmoji}>⚡</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Quick Wins Library</Text>
          <Text style={styles.cardDesc}>50+ instant money-saving tips</Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}

export default function SaveScreen() {
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
        name="SaveHome" 
        component={SaveHome} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="GrocerySavings" 
        component={GrocerySavingsScreen}
        options={{ title: 'Grocery Savings' }}
      />
      <Stack.Screen 
        name="EmergencyFund" 
        component={EmergencyFundScreen}
        options={{ title: 'Emergency Fund' }}
      />
      <Stack.Screen 
        name="SmartShopping" 
        component={SmartShoppingScreen}
        options={{ title: 'Smart Shopping' }}
      />
      <Stack.Screen 
        name="BatchCooking" 
        component={BatchCookingScreen}
        options={{ title: 'Batch Cooking' }}
      />
      <Stack.Screen 
        name="HomeSavings" 
        component={HomeSavingsScreen}
        options={{ title: 'Home Savings' }}
      />
      <Stack.Screen 
        name="QuickWins" 
        component={QuickWinsScreen}
        options={{ title: 'Quick Wins' }}
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
    marginTop: spacing.xs,
    marginBottom: spacing.sm
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
  }
});
