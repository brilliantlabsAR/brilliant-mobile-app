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
    PermissionsAndroid
} from "react-native";
import { connect } from "react-redux";


// import Color from '../themes/Colors';
// import Dimension from "../utils/Dimension";
// import WelcomeScreen from "./WelcomeScreen";
// import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'
import notifee, { EventType } from '@notifee/react-native';
import GetLocation from "react-native-get-location";
import { styles } from "./styles";
import { Theme } from "../../models/themes";
import {SIGNUP_AND, START_LIVE_STREAMING, BROADCAST_YOUR_LIFE,LOGIN,SIGNUP} from "../../models/constants";
import { RootStackParamList } from "../../navigations";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Routes from "../../models/routes";
const windowHeight = Dimensions.get('window').height;


// import React, { useEffect } from "react";

// import { Wrapper, TitleFont } from "./styles";
// import { DevicePairingStatus, FirmwareProgressStatus } from "../../../models";
// import { AsyncConst } from "../../../models";
// import * as mainDao from '../../../database'

type SplashScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "SplashScreen"
>;

const SplashScreen = ({ navigation }: SplashScreenProps) => {

    const [isShow, setIsShow] = useState<boolean>(false);
    //var isShow:boolean=false;
    const [isLogin, setIsLogin] = useState<boolean>(false);
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
        //this.translateUp();
        Animated.parallel([translateUp, translateUp2]).start(() => {
            { console.log("Ho12", isShow) }

            Animated.timing(animated3, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start();

            if (isLogin) {
                // setIsShow(false);
            } else {
                setIsShow(true);
                { console.log("Ho", isShow) }


            }
        });
        { console.log("HIHIHI") }
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
    async  function getLocation() {

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
            <View style={styles.topView}>
                {isShow == true ?

                    <Animated.View style={[
                        styles.animatedView,
                        {
                            opacity: fadeInValue
                        }

                    ]}>

                        <View>

                            <Text style={styles.signUpTextStyle}>{SIGNUP_AND}</Text>
                            <Text style={styles.liveStreamingText}>{START_LIVE_STREAMING}</Text>
                            <Text style={styles.broadCastText}>{BROADCAST_YOUR_LIFE}</Text>

                        </View>



                        <View style={styles.middleView}>


                            <TouchableOpacity style={styles.signUpTouchableView}
                                onPress={() =>
                                    navigation.navigate(Routes.NAV_SIGNUP_SCREEN)
                                }
                            >
                                <Text style={styles.middleSignUpText}>{SIGNUP}</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.signInText}
                                onPress={() =>
                                    navigation.navigate(Routes.NAV_LOGIN_SCREEN)
                                   
                                }
                            >


                                <Text style={styles.loginText}>{LOGIN}</Text>


                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    :
                    null
                }


                {/* <Text
                    style={styles.brilliantTextSmall}
                >{'BRILLIANT'}</Text> */}
                <Animated.Text
                    style={[
                        {
                            transform: transform
                        }, styles.brillientTextBig
                    ]}>BRILLIANT</Animated.Text>



            </View>

        </SafeAreaView >
    );
};
export default SplashScreen;


