import { RouterConfigOptions } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AppStackParamList } from "./appNavigation";
import { RootStackParamList } from "./index";

export type LoginNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "LoginScreen"
>;
export type LetsGoNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "LetsGoScreen"
>;
export type LoginVerifyNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "LoginVerifyScreen"
>;
export type SignUpNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "SignUpScreen"
>;
export type SuccessLoginNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "SuccessLoginScreen"
>;
export type UpdateProfileNavigationProps = NativeStackScreenProps<
  AppStackParamList,
  "UpdateProfileScreen"
>;
export type FooterNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "LiveMomentScreen"
>;
export type LiveMomentNavigationProps = NativeStackScreenProps<
  AppStackParamList,
  "LiveMomentScreen"
>;
export type MediaScreenNavigationProps = NativeStackScreenProps<
  AppStackParamList,
  "MediaScreen"
>;
export type InviteContactScreenNavigationProps = NativeStackScreenProps<
  AppStackParamList,
  "InviteContactScreen"
>;
export type StartNavigationProps = NativeStackScreenProps<
  AppStackParamList,
  "StartScreen"
>;
export type PairingNavigationProps = NativeStackScreenProps<
  AppStackParamList,
  "PairingScreen"
>;
export type AccountNavigationProps = NativeStackScreenProps<
  AppStackParamList,
  "MyAccountScreen"
>;
export type UpdateProfileVerifyNavigationProps = NativeStackScreenProps<
  AppStackParamList,
  "ProfileOtpVerifyScreen"
>;
export type HelpNavigationProps = NativeStackScreenProps<
  AppStackParamList,
  "HelpScreen"
>;
export type UpdateFirmwareNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "UpdateFirmware"
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
// export type SingleMediaViewNavigationProps = NativeStackScreenProps<
//   AppStackParamList,
//   "SingleMediaView"
// >;
