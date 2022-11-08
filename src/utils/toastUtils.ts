import { ToastAndroid, Platform } from "react-native";
import SimpleToast from "react-native-simple-toast";

export function ShowToast(message: any) {
  if (Platform.OS == "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    SimpleToast.show(message, SimpleToast.SHORT);
  }
}
export function ShowToastLong(message: string) {
  if (Platform.OS == "android") {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    SimpleToast.show(message, SimpleToast.LONG);
  }
}
