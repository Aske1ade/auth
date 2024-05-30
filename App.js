import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Businesses from './src/screens/Businesses';
import MapScreen from './src/screens/MapScreen';
import SeatingChart from './src/screens/SeatingChart';
import PaymentScreen from './src/screens/PaymentScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getIconName(route, focused) {
  let iconName;

  switch (route.name) {
    case 'Businesses':
      iconName = focused ? 'business' : 'business-outline';
      break;
    case 'Map':
      iconName = focused ? 'map' : 'map-outline';
      break;
    case 'SeatingChart':
      iconName = focused ? 'ticket' : 'ticket-outline';
      break;
    default:
      iconName = 'help';
      break;
  }

  return iconName;
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Businesses"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getIconName(route, focused);
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: '#ffffff', paddingBottom: 3 },
      })}
    >
      <Tab.Screen name="Businesses" component={Businesses} />
      <Tab.Screen name="Map" component={MapScreen} options={{ tabBarLabel: 'Map' }} />
      <Tab.Screen name="SeatingChart" component={SeatingChart} options={{ tabBarLabel: 'Tickets' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 
