
import React from "react";
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  Platform,
  LogBox,
} from "react-native";
import { LoginNavigationProps } from "../../navigations/types";

const LoginScreen = (props: LoginNavigationProps) => {
  const { navigation } = props;
  return (
    <View>
      <Text>HIiii</Text>
    </View>
  );
}


export default LoginScreen;