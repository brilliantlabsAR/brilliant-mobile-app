import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Screens from "../screens";
import * as Routes from "../models";

export type AppStackParamList = {
  [Routes.NAV_SPLASH_SCREEN]: undefined;
  [Routes.NAV_UPDATE_PROFILE_SCREEN]: undefined;
  [Routes.NAV_PAIRING_SCREEN]: undefined;
  [Routes.NAV_ACCOUNT_SCREEN]: undefined;
  [Routes.NAV_MEDIA_SCREEN]: undefined;
  [Routes.NAV_UPDATE_FIRMWARE]: undefined;
  [Routes.NAV_TERMINAL_SCREEN]: undefined;
  [Routes.NAV_PROFILE_OTP_SCREEN]: { phoneNumber: string, countryCode: string | any, phone: string | any, email: string | any, name: string | any };
};
const AppStack = createNativeStackNavigator<AppStackParamList>();
const AppNavigation = () => {
  return (
    <AppStack.Navigator
      initialRouteName={Routes.NAV_PAIRING_SCREEN}
      screenOptions={{
        headerShown: false,
        headerBackVisible: false
      }}
    >
      <AppStack.Screen
        name={Routes.NAV_MEDIA_SCREEN}
        component={Screens.MediaScreen}
        options={{ title: "" }}
      />
      <AppStack.Screen
        name={Routes.NAV_UPDATE_PROFILE_SCREEN}
        component={Screens.UpdateProfileScreen}
        options={{ title: "" }}
      />
      <AppStack.Screen
        name={Routes.NAV_PAIRING_SCREEN}
        component={Screens.PairingScreen}
        options={{ title: "" }}
      />
      <AppStack.Screen
        name={Routes.NAV_ACCOUNT_SCREEN}
        component={Screens.MyAccountScreen}
        options={{ title: "" }}
      />
      <AppStack.Screen
        name={Routes.NAV_PROFILE_OTP_SCREEN}
        component={Screens.ProfileOtpVerify}
        options={{ title: "" }}
      />
      <AppStack.Screen
        name={Routes.NAV_UPDATE_FIRMWARE}
        component={Screens.UpdateFirmwareScreen}
        options={{ title: "" }}
      />
      <AppStack.Screen
        name={Routes.NAV_TERMINAL_SCREEN}
        component={Screens.TerminalScreen}
        options={{ title: "" }}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
