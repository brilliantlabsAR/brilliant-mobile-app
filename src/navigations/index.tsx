import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Routes from "../models/routes";
import AppNavigation from "./appNavigation";
import screens from "../screens";
import { View, Text } from "react-native";

export type RootStackParamList = {
  [Routes.NAV_SPLASH_SCREEN]: undefined;
  [Routes.NAV_APP]: undefined;
  
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={Routes.NAV_SPLASH_SCREEN}>
        <RootStack.Screen
          name={Routes.NAV_SPLASH_SCREEN}
          component={screens.SplashScreen}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name={Routes.NAV_APP}
          component={AppNavigation}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
