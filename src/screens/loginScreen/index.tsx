
import React from "react";
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  Platform,
  LogBox,
} from "react-native";

 const LoginScreen=()=> {
  return (
    <>
      <StatusBar
        animated={true}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        showHideTransition={"none"}
        hidden={false}
      />
      
    </>
  );
}


export default LoginScreen;