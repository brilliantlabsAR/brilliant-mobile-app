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
  [Routes.NAV_LOGIN_SCREEN]: undefined;
  [Routes.NAV_LOGIN_VERIFY_SCREEN]: { phoneNumber: string, screen: string };
  [Routes.NAV_SIGNUP_SCREEN]: undefined;
  [Routes.NAV_SUCCESS_LOGIN]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={Routes.NAV_APP}>
        <RootStack.Screen
          name={Routes.NAV_SPLASH_SCREEN}
          component={screens.SplashScreen}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name={Routes.NAV_LOGIN_SCREEN}
          component={screens.LoginScreen}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name={Routes.NAV_LOGIN_VERIFY_SCREEN}
          component={screens.LoginOtpVerify}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={Routes.NAV_SUCCESS_LOGIN}
          component={screens.SuccessLogin}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={Routes.NAV_SIGNUP_SCREEN}
          component={screens.SignUpScreen}
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
