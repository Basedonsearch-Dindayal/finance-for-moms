import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import AssistantScreen from './screens/AssistantScreen';
import GrowScreen from './screens/GrowScreen';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import SaveScreen from './screens/SaveScreen';
import { colors } from './utils/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 65,
          paddingTop: 8,
          paddingBottom: 8
        },
        tabBarLabelStyle: { 
          fontSize: 11, 
          fontWeight: '600',
          marginTop: -2
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: focused ? 26 : 24, color }}>✨</Text>
          ),
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen 
        name="Save" 
        component={SaveScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: focused ? 26 : 24, color }}>💖</Text>
          ),
          tabBarLabel: 'Save'
        }}
      />
      <Tab.Screen 
        name="Grow" 
        component={GrowScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: focused ? 26 : 24, color }}>🌸</Text>
          ),
          tabBarLabel: 'Grow'
        }}
      />
      <Tab.Screen 
        name="Assistant" 
        component={AssistantScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ fontSize: focused ? 26 : 24, color }}>💬</Text>
          ),
          tabBarLabel: 'Assistant'
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
