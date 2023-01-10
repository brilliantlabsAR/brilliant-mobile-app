import "intl";
import "intl/locale-data/jsonp/en";
import React, { useEffect } from "react";
import {
  StatusBar,
  Platform,
  LogBox,
  Alert,
  BackHandler
} from "react-native";
import RootNavigation from "./navigations";
import { Provider } from 'react-redux';
import store from "./redux/store";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function () {
  useEffect(() => {
    location();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      backHandler.remove();
    }
  });

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  }

  const location = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        console.log(data);
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
      })
      .catch((err) => {
        console.log(err.code);
        if (err.code === "ERR00") {
          Alert.alert(
            'Location Permission',
            'Please turn on the location for pairing the device',
            [
              {
                text: "Cancel",
                onPress: () => handleBackButton(),
                style: "cancel"
              },
              { text: 'OK', onPress: () => { location() } },
            ],
            { cancelable: true, }
          );

        }
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
        // codes :
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        //  - ERR03 : Internal error
      });
  };

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