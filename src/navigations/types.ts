import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "./index";

export type TopBarNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "TerminalScreen"
>;
export type TerminalScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "TerminalScreen"
>;
