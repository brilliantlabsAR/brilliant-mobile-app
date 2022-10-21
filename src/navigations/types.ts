import { RouterConfigOptions } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AppStackParamList } from "./appNavigation";

export type LoginNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "LoginScreen"
>;

// export type AppNavigationScreenProps = NativeStackNavigationProp<
//   AppStackParamList,
//   "Settings"
// >;
// export type BluetoothPairingNavigationProps = NativeStackScreenProps<
//   AppStackParamList,
//   "BluetoothPairing"
// >;
// export type FirmwareProgressNavigationProps = NativeStackScreenProps<
//   AppStackParamList,
//   "FirmwareProgress"
// >;
// export type TutorialsNavigationProps = NativeStackScreenProps<
//   AppStackParamList,
//   "Tutorials"
// >;
// export type DashboardNavigationProps = NativeStackScreenProps<
//   AppStackParamList,
//   "Dashboard"
// >;
// export type SettingsNavigationProps = NativeStackScreenProps<
//   AppStackParamList,
//   "Settings"
// >;
// export type TutorialsComponentNavigationProps = NativeStackNavigationProp<
//   AppStackParamList,
//   "Tutorials"
// >;
// export type UpdateFirmwareNavigationProps = NativeStackNavigationProp<
//   AppStackParamList,
//   "UpdateFirmware"
// >;
// export type SingleMediaViewNavigationProps = NativeStackScreenProps<
//   AppStackParamList,
//   "SingleMediaView"
// >;
