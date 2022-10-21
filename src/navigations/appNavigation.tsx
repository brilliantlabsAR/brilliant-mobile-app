import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Screens from "../screens";
import * as Routes from "../models/routes";
//import LogoTitle, { SettingIcon, BackIcon } from "../components/customHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationScreenProps } from "../navigations/types";
//import { DevicePairingStatus, AsyncConst } from "../models";
//import { storage } from "../index";
//import { useAppSelector } from "../redux/hooks";

export type AppStackParamList = {
  [Routes.NAV_SPLASH_SCREEN]: undefined;
  [Routes.NAV_LOGIN_SCREEN]: undefined;
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
  const navigation = useNavigation<AppNavigationScreenProps>();
  // let tutorialShown = storage.getBoolean(AsyncConst.hasShownTutorial);
  // const pairingStatus: DevicePairingStatus = useAppSelector((state) => state.pairing.status);

  return (
    <AppStack.Navigator
        screenOptions={{
        headerShown: true,
        headerBackVisible: false
      }}
    >
       <AppStack.Screen
        name={Routes.NAV_LOGIN_SCREEN}
        component={Screens.LoginScreen}
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
