import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Screens from "../screens";
import * as Routes from "../models";
import Footer from '../components/footer'
//import LogoTitle, { SettingIcon, BackIcon } from "../components/customHeader";
import { useNavigation } from "@react-navigation/native";
// import { AppNavigationScreenProps } from "../navigations/types";
//import { DevicePairingStatus, AsyncConst } from "../models";
//import { storage } from "../index";
//import { useAppSelector } from "../redux/hooks";

export type AppStackParamList = {
  [Routes.NAV_SPLASH_SCREEN]: undefined;
  [Routes.NAV_UPDATE_PROFILE_SCREEN]: undefined;
  [Routes.NAV_START_SCREEN]: undefined;
  [Routes.NAV_PAIRING_SCREEN]: undefined;
  [Routes.NAV_ACCOUNT_SCREEN]: undefined;
  [Routes.NAV_LIVE_MOMENT]: { selectedTab: string } | undefined;
  [Routes.NAV_MEDIA_SCREEN]: undefined;
  [Routes.NAV_INVITE_CONTACT_SCREEN]: undefined;
  [Routes.NAV_UPDATE_FIRMWARE]: undefined;
  [Routes.NAV_HELP_SCREEN]: { pageNo: string };
  [Routes.NAV_PROFILE_OTP_SCREEN]: { phoneNumber: string, countryCode: string | any, phone: string | any, email: string | any, name: string | any };
};
const AppStack = createNativeStackNavigator<AppStackParamList>();
const AppNavigation = () => {
  // const navigation = useNavigation<AppNavigationScreenProps>();
  // let tutorialShown = storage.getBoolean(AsyncConst.hasShownTutorial);
  // const pairingStatus: DevicePairingStatus = useAppSelector((state) => state.pairing.status);

  return (
    <AppStack.Navigator
      initialRouteName={Routes.NAV_PAIRING_SCREEN}
      screenOptions={{
        headerShown: false,
        headerBackVisible: false
      }}
    >
      <AppStack.Screen
        name={Routes.NAV_LIVE_MOMENT}
        component={Screens.LiveMomentScreen}
        options={{ title: "" }}
      />

      <AppStack.Screen
        name={Routes.NAV_MEDIA_SCREEN}
        component={Screens.MediaScreen}
        options={{ title: "" }}
      />
      <AppStack.Screen
        name={Routes.NAV_INVITE_CONTACT_SCREEN}
        component={Screens.InviteContactScreen}
        options={{ title: "" }}
      />
      <AppStack.Screen
        name={Routes.NAV_UPDATE_PROFILE_SCREEN}
        component={Screens.UpdateProfileScreen}
        options={{ title: "" }}
      />
      <AppStack.Screen
        name={Routes.NAV_START_SCREEN}
        component={Screens.StartScreen}
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
        name={Routes.NAV_HELP_SCREEN}
        component={Screens.HelpScreen}
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
    </AppStack.Navigator>
  );
};

export default AppNavigation;
