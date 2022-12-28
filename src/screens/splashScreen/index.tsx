import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
  LogBox,
  Platform,
  PermissionsAndroid,
  Image
} from "react-native";
// import Color from '../themes/Colors';
// import Dimension from "../utils/Dimension";
// import WelcomeScreen from "./WelcomeScreen";
// import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'
import notifee, { EventType } from '@notifee/react-native';
import GetLocation from "react-native-get-location";
import { styles } from "./styles";
import { STRINGS } from "../../models/constants";
import { RootStackParamList } from "../../navigations";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Routes from "../../models/routes";
import * as mainDao from '../../database';
import { startImage } from "../../assets";

const windowHeight = Dimensions.get('window').height;


type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SplashScreen"
>;

const SplashScreen = ({ navigation }: SplashScreenProps) => {

  const [isShow, setIsShow] = useState<boolean>(false);
  //var isShow:boolean=false;
  const animated = useRef(new Animated.Value(0)).current;
  const animated2 = useRef(new Animated.Value(0)).current;
  const animated3 = useRef(new Animated.Value(1)).current;

  // const translateY = animated.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [1, -(windowHeight / 2 - 75)],
  //   extrapolate: 'clamp',
  // })
  // const scale = animated.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [1, 0.577],
  //   extrapolate: 'clamp',
  // })
  // const transform = [{
  //   translateY: translateY,
  // }, {
  //   scale: scale
  // }]

  // const fadeInValue = animated3.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [1, 0],
  //   extrapolate: 'clamp',
  // })

  useEffect(() => {
    if (Platform.OS == 'android') {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
          if (result) {
            console.log("ACCESS_FINE_LOCATION Permission is OK");
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
              if (result) {
                console.log("ACCESS_FINE_LOCATION User accept");
              } else {
                console.log("User refuse");
              }
            });
          }
        });

      }
    }
  })

  useEffect(() => {
    mainDao.connectDatabase();
    mainDao.executeSql(mainDao.createAssetsTableQuery, []);
    console.log('Use effect');
    AsyncStorage.getItem('userId').then((userId) => {
      if (userId === null) {
        console.log('Use effect nulol');
        setTimeout(() => {
          navigation.replace(Routes.NAV_LETS_GO_SCREEN)
        }, 4000);
      } else {
        console.log('Use effect true');
        setTimeout(() => {
          navigation.replace(Routes.NAV_APP)
        }, 4000);
      }
    })
  }, [])



  useEffect(() => {
    // console.log('Use effect 2');

    // const translateUp =
    //   Animated.timing(animated, {
    //     toValue: 1,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   })
    // const translateUp2 =
    //   Animated.timing(animated2, {
    //     toValue: 1,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   })
    // //this.translateUp();
    // Animated.parallel([translateUp, translateUp2]).start(() => {
    //   { console.log("Ho12", isShow) }

    //   Animated.timing(animated3, {
    //     toValue: 0,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   }).start();

    // });
    // { console.log("HIHIHI") }
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
        if (result) {
          console.log("ACCESS_FINE_LOCATION Permission is OK");
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
            if (result) {
              console.log("ACCESS_FINE_LOCATION User accept");
            } else {
              console.log("User refuse");
            }
          });
        }
      });
    }
    getLocation();
  }, []);
  async function getLocation() {

    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log('Location', location);

      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }

  return (
    <SafeAreaView
      style={styles.bodyContainer}>
      <View style={styles.textWrapper}>
        <Text style={styles.welcomeTextStyle}>{STRINGS.WELCOME}</Text>
        <Text style={styles.broadCastText}>{STRINGS.WELCOME_TEXT}</Text>
      </View>
      <Image source={startImage} style={styles.monocleImage} />
      {/* <View style={styles.topView}>
        {isShow === true ?

          <Animated.View style={[
            styles.animatedView,
            {
              opacity: fadeInValue
            }
          ]}>
            <View>
              <Text style={styles.signUpTextStyle}>{STRINGS.SIGNUP_AND}</Text>
              <Text style={styles.liveStreamingText}>{STRINGS.START_LIVE_STREAMING}</Text>
              <Text style={styles.broadCastText}>{STRINGS.BROADCAST_YOUR_LIFE}</Text>

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
            </View>
          </Animated.View>
          :
          null
        } */}
      {/* <Animated.Text
          style={[
            {
              transform: transform
            }, styles.brillientTextBig
          ]}>BRILLIANT</Animated.Text> */}
      {/* </View> */}

    </SafeAreaView >
  );
};
export default SplashScreen;


