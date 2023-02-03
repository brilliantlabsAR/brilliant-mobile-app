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
export type PairingNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "PairingScreen"
>;
export type UpdateProfileNavigationProps = NativeStackScreenProps<
  AppStackParamList,
  "UpdateProfileScreen"
>;
export type TopBarNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "TerminalScreen"
>;
export type TerminalScreenNavigationProps = NativeStackScreenProps<
  AppStackParamList,
  "TerminalScreen"
>;
export type AccountNavigationProps = NativeStackScreenProps<
  AppStackParamList,
  "MyAccountScreen"
>;
export type UpdateProfileVerifyNavigationProps = NativeStackScreenProps<
  AppStackParamList,
  "ProfileOtpVerifyScreen"
>;
export type UpdateFirmwareNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "UpdateFirmware"
>;
