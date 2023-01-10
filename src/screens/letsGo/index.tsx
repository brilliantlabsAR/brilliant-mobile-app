import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Linking,
} from "react-native";
import notifee, { EventType } from '@notifee/react-native';
import { styles } from "./styles";
import { STRINGS } from "../../models/constants";
import * as Routes from "../../models/routes";
import { LetsGoNavigationProps } from "../../navigations/types";
import { useAppDispatch } from "../../redux/hooks";
import { resetLogin } from "../../redux/authSlices/loginSlice";
import { resetOTPData } from "../../redux/authSlices/otpVerifySlice";
import { resetResendData } from "../../redux/authSlices/otpResendSlice";
import { resetSignUpData } from "../../redux/authSlices/signupSlice";
import BleManager from 'react-native-ble-manager';

const windowHeight = Dimensions.get('window').height;

const LetsGoScreen = ({ navigation }: LetsGoNavigationProps) => {
  const dispatch = useAppDispatch();
  const [isShow] = useState<boolean>(false);
  const animated = useRef(new Animated.Value(0)).current;
  const animated2 = useRef(new Animated.Value(0)).current;
  const animated3 = useRef(new Animated.Value(1)).current;

  const translateY = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -(windowHeight / 2 - 75)],
    extrapolate: 'clamp',
  })
  const scale = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.577],
    extrapolate: 'clamp',
  })
  const transform = [{
    translateY: translateY,
  }, {
    scale: scale
  }]

  const fadeInValue = animated3.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })


  /** REQUEST PERMISSION FOR BLUETOOTH SCAN AND CONNECT **/
  const blePermission = () => {
    if (Platform.OS == 'android') {
      try {
        PermissionsAndroid.requestMultiple(
          [PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT]
        ).then((result) => {
          if (result['android.permission.BLUETOOTH_SCAN']
            && result['android.permission.BLUETOOTH_CONNECT'] === 'granted') {
            console.log('You can use the bluetooth');
            BleManager.enableBluetooth()
              .then(() => {
                // Success code
                console.log("The bluetooth is already enabled or the user confirm");
              })
              .catch((error) => {
                // Failure code
                console.log("The user refuse to enable bluetooth");
              });
          } else {
            console.log('Permission denied');
            return;
          }
        });

      } catch (err) {
        console.warn(err)
      }

    }
    BleManager.enableBluetooth()
      .then(() => {
        // Success code
        console.log("The bluetooth is already enabled or the user confirm");
      })
      .catch((error) => {
        // Failure code
        console.log("The user refuse to enable bluetooth");
      });
  }


  useEffect(() => {
    blePermission();
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(resetLogin());
      dispatch(resetOTPData());
      dispatch(resetResendData());
      dispatch(resetSignUpData());
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  useEffect(() => {
    const translateUp =
      Animated.timing(animated, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    const translateUp2 =
      Animated.timing(animated2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    Animated.parallel([translateUp, translateUp2]).start(() => {
      { console.log("Ho12", isShow) }

      Animated.timing(animated3, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();

    });
  }, []);


  return (
    <SafeAreaView
      style={styles.bodyContainer}>

      <View style={styles.topView}>
        <Animated.View style={[
          styles.animatedView,
          {
            opacity: fadeInValue
          }
        ]}>
          <View>
            <Text style={styles.signUpTextStyle}>{STRINGS.LETS_GO_HEADING}</Text>
            <Text style={styles.broadCastText}>{STRINGS.LETS_GO_TITLE}</Text>

          </View>
          <View style={styles.middleView}>
            <TouchableOpacity style={styles.signUpTouchableView}
              onPress={() =>
                navigation.navigate(Routes.NAV_SIGNUP_SCREEN)
              }
            >
              <Text style={styles.middleSignUpText}>{STRINGS.SIGNUP}</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.signInText}
              onPress={() =>
                navigation.navigate(Routes.NAV_LOGIN_SCREEN)

              }
            >
              <Text style={styles.loginText}>{STRINGS.LOGIN}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}
              onPress={() => { Linking.openURL('http://brilliantmonocle.com/terms') }
              }>
              <Text style={styles.termsText}>{STRINGS.TERMS_CONDITIONS}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

      </View>

    </SafeAreaView >
  );
};
export default LetsGoScreen;