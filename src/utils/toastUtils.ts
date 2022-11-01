import { ToastAndroid, Platform } from "react-native";
import SimpleToast from "react-native-simple-toast";

export function ShowToast(message) {
  if (Platform.OS == "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    SimpleToast.show(message, SimpleToast.SHORT);
  }
}
