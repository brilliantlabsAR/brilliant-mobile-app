import "intl";
import "intl/locale-data/jsonp/en";
import React from "react";
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  Platform,
  LogBox,
} from "react-native";
import RootNavigation from "./navigations";
import { Provider } from 'react-redux';
import store from "./redux/store";

LogBox.ignoreAllLogs();//Ignore all log notifications

export default function () {
  return (
    <Provider store={store}>
      <StatusBar
        animated={true}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        showHideTransition={"none"}
        hidden={false}
      />

      <RootNavigation />
    </Provider>
  );
}