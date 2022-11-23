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

  // [Routes.NAV_BLUETOOTH_PAIRING]: undefined;
  // [Routes.NAV_TUTORIALS]: undefined;
  // [Routes.NAV_DASHBOARD]: undefined;
  // [Routes.NAV_SETTINGS]: undefined;
  // [Routes.NAV_UPDATE_FIRMWARE]: undefined;
  // [Routes.NAV_UPDATE_FPGA]: undefined;
  // [Routes.NAV_FIRMWARE_PROGRESS]: { file: any };
  // [Routes.NAV_SINGLE_MEDIA_VIEW]: { assetItem: any };
};
const AppStack = createNativeStackNavigator<AppStackParamList>();
const AppNavigation = () => {
  // const navigation = useNavigation<AppNavigationScreenProps>();
  // let tutorialShown = storage.getBoolean(AsyncConst.hasShownTutorial);
  // const pairingStatus: DevicePairingStatus = useAppSelector((state) => state.pairing.status);

  return (
    <AppStack.Navigator
      initialRouteName={Routes.NAV_MEDIA_SCREEN}
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
      {/* <AppStack.Screen
        name={Routes.NAV_BLUETOOTH_PAIRING}
        component={Screens.BluetoothPairing}
        options={{ title: "" }}
      />
      <AppStack.Screen
        name={Routes.NAV_TUTORIALS}
        component={Screens.Tutorials}
        options={{ title: "" }}
      />
      <AppStack.Screen
        name={Routes.NAV_DASHBOARD}
        component={Screens.Dashboard}
        options={{ title: "", headerRight: () => <SettingIcon /> }}
      />
      <AppStack.Screen
        name={Routes.NAV_SETTINGS}
        component={Screens.Settings}
        options={{
          title: "",
          headerLeft: () => (
            <BackIcon
              navigateTo={() => navigation.navigate(Routes.NAV_DASHBOARD)}
            />
          ),
        }}
      />
      <AppStack.Screen
        name={Routes.NAV_UPDATE_FIRMWARE}
        component={Screens.UpdateFirmware}
        options={{ title: "", headerLeft: () => <BackIcon /> }}
      />
      <AppStack.Screen
        name={Routes.NAV_UPDATE_FPGA}
        component={Screens.UpdateFpga}
        options={{ title: "", headerLeft: () => <BackIcon /> }}
      />
      <AppStack.Screen
        name={Routes.NAV_FIRMWARE_PROGRESS}
        component={Screens.FirmwareProgress}
        options={{ title: "" }}
      />
      <AppStack.Screen
        name={Routes.NAV_SINGLE_MEDIA_VIEW}
        component={Screens.SingleMediaView}
        options={{ title: "", headerLeft: () => <BackIcon /> }}
      /> */}
    </AppStack.Navigator>
  );
};

export default AppNavigation;
