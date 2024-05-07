import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from '../screens/auth/LoginScreen';
import DashboradScreen from '../screens/home/DashboradScreen';
import PendingOrderScreen from '../screens/shipper/PendingOrderScreen';
import CustomDrawerComponent from './CustomDrawerComponent';
import OrderPackedScreen from '../screens/order/OrderPackedScreen';
import OrderPickerScreen from '../screens/order/OrderPickerScreen';
import QrScanner from '../screens/qrscanner/QrScanner';
import OrderShippedScreen from '../screens/order/OrderShippedScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import AllBoxesScreen from '../screens/boxs/AllBoxesScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerHeaderComponent = (props) => (
  <CustomDrawerComponent {...props} />
);

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
        backgroundColor: '#2591CA',
        width: 310,
        },
      }}
      drawerContent={(props) => (
        <CustomDrawerHeaderComponent {...props} />
      )}>
      <Drawer.Screen
        name="DashboradScreen"
        component={DashboradScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
};

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="DashboradScreen" component={DrawerNavigator} />
      <Stack.Screen name="OrderPickerScreen" component={OrderPickerScreen} />
      <Stack.Screen name="OrderPackedScreen" component={OrderPackedScreen} />
      <Stack.Screen name="PendingOrderScreen" component={PendingOrderScreen} />
      <Stack.Screen name="OrderShippedScreen" component={OrderShippedScreen} />
      <Stack.Screen name="QrScanner" component={QrScanner} />
      <Stack.Screen name="AllBoxesScreen" component={AllBoxesScreen} />
    </Stack.Navigator>
  );
};