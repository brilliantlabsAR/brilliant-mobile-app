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
    LogBox
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

            //setIsShow(true);

        });
        { console.log("HIHIHI") }
    }, []);


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

                            <Text
                                style={styles.signUpTextStyle}
                            >{'Sign up and'}</Text>

                            <Text
                                style={styles.liveStreamingText}
                            >{'Start live streaming'}</Text>
                            <Text
                                style={styles.broadCastText}
                            >{'Broadcast your life as it happens'}</Text>

                        </View>



                        <View style={styles.middleView}>


                            <TouchableOpacity style={styles.signUpTouchableView}
                                onPress={() =>
                                    //this.registerMember()
                                    //showErrorAlert('Register Successfully!')
                                    //this.props.navigation.navigate("HomeScreenPickUp")
                                    console.log("Register", "Hii")

                                    //   this.props.navigation.navigate('SignupScreen')
                                    //  this.props.navigation.navigate('LiveStreamingScreen')
                                }
                            >
                                <Text
                                    style={styles.middleSignUpText}
                                >Sign up</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.signInText}
                                onPress={() =>
                                    navigation.navigate(Routes.NAV_APP)
                                    //this.props.navigation.navigate("HomeScreenPickUp")
                                    //  this.props.navigation.navigate('SigninScreen')
                                    // this.props.navigation.navigate('UserStreamingScreen')
                                }
                            >


                                <Text
                                    style={styles.loginText}
                                >Login</Text>


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





// class SplashScreen extends Component {
//   constructor(props) {
//     super();
//     this.animated = new Animated.Value(0);
//     this.animated2 = new Animated.Value(0);
//     this.animated3 = new Animated.Value(1);

//     this.state = {
//       isShow: false,
//       isLogin: false,
//       token: ''
//     }
//     this.messageListener
//   }


//   async bootstrap() {

//     const initialNotification = await notifee.getInitialNotification();
//     console.log('Good test', initialNotification)
//     if (initialNotification) {
//       console.log('Notification caused application to open', initialNotification.notification);
//       console.log('Press action used to open the app', initialNotification.pressAction);
//     }
//   }

//   componentDidMount() {
//     this.bootstrap()
//       .then(() => console.log('Good'))
//       .catch(console.error);
//     messaging().setBackgroundMessageHandler(message => {
//       console.log('BH: ', message);
//     });

//     this.requestUserPermission();
//     this.getToken();
//     const translateUp =
//       Animated.timing(this.animated, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       })
//     const translateUp2 =
//       Animated.timing(this.animated2, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       })


//     //this.translateUp();
//     Animated.parallel([translateUp, translateUp2]).start(() => {
//       Animated.timing(this.animated3, {
//         toValue: 0,
//         duration: 1000,
//         useNativeDriver: true,
//       }).start();
//       if (this.state.isLogin) {
//         AsyncStorage.getItem('notification').then((notification) => {
//           const parseNotification = JSON.parse(notification);
//           if (notification === null) {
//             this.props.navigation.navigate('LiveglobeScreen');
//           } else {
//             AsyncStorage.setItem('notification', '');
//             AsyncStorage.setItem('fromNoti', 'yes');
//             this.props.navigation.navigate('UserStreamingScreen', {
//               channelName: parseNotification.data.channelName,
//               channelToken: parseNotification.data.token,
//               profileImage: parseNotification.data.profilePicture,
//               userName: parseNotification.data.userName
//             });
//           }
//         })


//       } else {

//         this.setState({ isShow: true });
//       }
//     });
//     // setTimeout(() => {
//     //   this.checkIfLogged();
//     // }, 1000);
//     notifee.onForegroundEvent(({ type, detail }) => {
//       switch (type) {
//         case EventType.DISMISSED:
//           console.log('User dismissed notification', detail.notification);
//           break;
//         case EventType.PRESS:
//           console.log('User pressed notification', detail.notification);
//           console.log('User pressed notification-->', detail);
//           console.log('User pressed notification channel45-->', detail.notification.data.channelName);
//           notifee.cancelAllNotifications();
//           this.props.navigation.navigate('UserStreamingScreen', {
//             channelName: detail.notification.data.channelName,
//             channelToken: detail.notification.data.token,
//             profileImage: detail.notification.data.profilePicture,
//             userName: detail.notification.data.userName
//           });
//           break;
//       }
//     })

//     notifee.onBackgroundEvent(({ type, detail }) => {
//       switch (type) {
//         case EventType.DISMISSED:
//           console.log('User dismissed notification', detail.notification);
//           break;
//         case EventType.ACTION_PRESS:
//           console.log('User pressed notification', detail.notification);
//           console.log('User pressed notification-->', detail);
//           console.log('User pressed notification channelBACK-->', detail.notification.data.channelName);
//           this.props.navigation.navigate('UserStreamingScreen', {
//             channelName: detail.notification.data.channelName,
//             channelToken: detail.notification.data.token,
//             profileImage: detail.notification.data.profilePicture,
//             userName: detail.notification.data.userName
//           });
//           break;
//       }
//     })
//     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
//     messaging().onNotificationOpenedApp(
//       remoteMessage => {
//         console.log(
//           'Notification caused app to open from background state:',
//           remoteMessage,
//         );
//         this.props.navigation.navigate('UserStreamingScreen', {
//           channelName: remoteMessage.data.channelName,
//           channelToken: remoteMessage.data.token,
//           profileImage: remoteMessage.data.profilePicture,
//           userName: remoteMessage.data.userName
//         });
//       },
//     );
//     console.log('In Component', 'Hello23');
//     this._unsubscrib = messaging().onMessage(async remoteMessage => {
//       console.log('Message', remoteMessage);
//       console.log('Channel Name---->', remoteMessage.data.channelName);
//       console.log('Channel token---->', remoteMessage.data.token);
//       const channelId = await notifee.createChannel({
//         id: "default",
//         name: "Default Channel",
//       });
//       await notifee.displayNotification({
//         title: remoteMessage.notification.title,
//         body: remoteMessage.notification.body,
//         android: {
//           channelId,
//           // Reference the name created (Optional, defaults to 'ic_launcher')
//           smallIcon: 'ic_noti',
//           color: '#ffffff',
//           timestamp: Date.now(),
//           showTimestamp: true,
//           onlyAlertOnce: true
//         },
//         data: remoteMessage.data,

//       });

//     })

//     this.getLocation();
//   }


//   async getLocation() {

//     await GetLocation.getCurrentPosition({
//       enableHighAccuracy: true,
//       timeout: 15000,
//     })
//       .then(location => {
//         console.log('Location', location);
//         AsyncStorage.setItem('latitude', (location.latitude).toString());
//         AsyncStorage.setItem('longitude', (location.longitude).toString());
//         AsyncStorage.setItem('locationTime', (location.time).toString());
//       })
//       .catch(error => {
//         const { code, message } = error;
//         console.warn(code, message);
//       })
//   }

//   async getToken() {

//     await AsyncStorage.getItem('accessToken').then((accessToken) => {
//       console.log("loklo", accessToken);
//       if (accessToken === null) {
//         this.setState({ isLogin: false })
//       } else {
//         this.setState({ isLogin: true })
//         this.setState({ token: accessToken })
//       }
//     })

//   }




//   async requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//       this.getFcmToken();
//     }
//   }

//   getFcmToken() {
//     try {
//       messaging()
//         .getToken()
//         .then(fcmToken => {
//           if (fcmToken) {
//             console.log(fcmToken);
//             AsyncStorage.setItem('fcmToken', fcmToken);
//           } else {
//             console.log('No FCM token found');
//           }
//         });




//     } catch (e) {
//       console.log(e);
//     }

//   }



//   componentWillUnmount() {
//     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
//     this._unsubscrib();
//   }


//   handleBackButton = () => {
//     BackHandler.exitApp();
//     return true;
//   }


//   checkIfLogged() {
//     var data = '';
//     if (data == '' || data == null) {
//       if (Platform.OS === 'ios') {
//         setTimeout(() => {
//           this.props.navigation.navigate('WelcomeScreen');
//           console.log("In Login");
//         }, 3000);
//       } else {
//         // ANDROID

//         setTimeout(() => {
//           this.props.navigation.navigate('WelcomeScreen');
//           console.log("In Login");
//         }, 3000);

//       }
//     } else {
//       console.log("In Home");

//       setTimeout(() => {
//       }, 3000);
//     }
//   }

//   render() {
//     const translateY = this.animated.interpolate({
//       inputRange: [0, 1],
//       outputRange: [1, -(windowHeight / 2 - 75)],
//       extrapolate: 'clamp',
//     })
//     const scale = this.animated.interpolate({
//       inputRange: [0, 1],
//       outputRange: [1, 0.577],
//       extrapolate: 'clamp',
//     })
//     const transform = [{
//       translateY: translateY,
//     }, {
//       scale: scale
//     }]

//     const fadeInValue = this.animated3.interpolate({
//       inputRange: [0, 1],
//       outputRange: [1, 0],
//       extrapolate: 'clamp',
//     })

//     return (
//       <SafeAreaView
//         style={styles.bodyContainer}>
//         <StatusBar barStyle="dark-content" backgroundColor={Color.White} />
//         <View style={{
//           flex: 1,
//           justifyContent: 'center',
//           backgroundColor: Color.White
//         }}>




//           {this.state.isShow ?
//             <Animated.View style={[
//               {
//                 flex: 1,
//                 marginHorizontal: Dimension(25),
//                 justifyContent: 'center',
//                 alignContent: 'center'
//               },
//               {
//                 opacity: fadeInValue
//               }

//             ]}>

//               <View style={{

//               }}>

//                 <Text
//                   style={{
//                     fontSize: Dimension(15),
//                     marginStart: Dimension(5),
//                     color: Color.Black,
//                     fontSize: Dimension(30),
//                     fontStyle: 'normal',
//                     flexDirection: 'row',
//                     fontFamily: 'Apercu Pro Bold'

//                   }}
//                 >{'Sign up and'}</Text>

//                 <Text
//                   style={{
//                     fontSize: 15,
//                     marginStart: 5,
//                     color: Color.Black,
//                     fontSize: 30,
//                     fontStyle: 'normal',
//                     flexDirection: 'row',
//                     fontFamily: 'Apercu Pro Bold'

//                   }}
//                 >{'Start live streaming'}</Text>
//                 <Text
//                   style={{
//                     fontSize: 15,
//                     marginStart: 5,
//                     marginTop: 20,
//                     color: Color.Black,
//                     fontSize: 15,
//                     fontStyle: 'normal',
//                     flexDirection: 'row',
//                     fontFamily: 'Apercu Pro Regular'
//                   }}
//                 >{'Broadcast your life as it happens'}</Text>

//               </View>



//               <View style={{
//                 marginTop: 30,
//               }}>


//                 <TouchableOpacity style={{
//                   borderRadius: 100,
//                   backgroundColor: '#000000',
//                   height: 50,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   activeOpacity: 0.6
//                 }}
//                   onPress={() =>
//                     //this.registerMember()
//                     //showErrorAlert('Register Successfully!')
//                     //this.props.navigation.navigate("HomeScreenPickUp")
//                     //console.log("Register", "Hii")

//                     this.props.navigation.navigate('SignupScreen')
//                     //  this.props.navigation.navigate('LiveStreamingScreen')
//                   }
//                 >
//                   <Text
//                     style={{
//                       fontSize: 16,
//                       color: Color.White,
//                       fontStyle: 'normal',
//                       borderRadius: 25,
//                       fontFamily: 'Apercu Pro Light'

//                     }}
//                   >Sign up</Text>
//                 </TouchableOpacity>


//                 <TouchableOpacity style={{
//                   marginTop: 5,
//                   alignContent: 'center',
//                   alignItems: 'center',
//                   borderRadius: 100,
//                   backgroundColor: '#FFFFFF',
//                   borderColor: '#000000',
//                   borderWidth: 2,
//                   height: 50,
//                   justifyContent: 'center',
//                   activeOpacity: 0.6
//                 }}
//                   onPress={() =>
//                     //this.registerMember()
//                     //showErrorAlert('Register Successfully!')
//                     //this.props.navigation.navigate("HomeScreenPickUp")
//                     this.props.navigation.navigate('SigninScreen')
//                     // this.props.navigation.navigate('UserStreamingScreen')
//                   }
//                 >


//                   <Text
//                     style={{
//                       fontSize: 16,
//                       color: Color.Black,
//                       fontStyle: 'normal',
//                       borderRadius: 25,
//                       fontFamily: 'Apercu Pro Light'

//                     }}
//                   >Login</Text>


//                 </TouchableOpacity>
//               </View>
//             </Animated.View>
//             :
//             null
//           }

//           {/* <Text
//             style={{
//               fontSize: 15,
//               flex: 1,
//               position: 'absolute',
//               color: Color.White,
//               alignSelf: 'center',
//               backgroundColor: Color.DeepBlue
//             }}
//           >{'BRILLIANT'}</Text> */}
//           <Animated.Text
//             style={[
//               {
//                 transform: transform
//               }, { color: Color.Black, fontSize: Dimension(25), letterSpacing: 10, position: 'absolute', alignSelf: 'center' }
//             ]}>BRILLIANT</Animated.Text>


//         </View>
//       </SafeAreaView>
//     )
//   }
// }
// const styles = StyleSheet.create({
//   bodyContainer: {
//     backgroundColor: Color.White,
//     flex: 1,
//     flexDirection: 'column'
//   }, homeMenu: {
//     width: 25,
//     height: 25,
//   },
//   textInputOutlineStyle: {
//     colors: {
//       placeholder: 'gray',
//       text: '#000000', primary: 'gray',
//       underlineColor: 'transparent',
//       background: 'white'
//     }
//   }
// })

// const mapStateToProps = ({ auth }) => {
//   return { auth };
// };
// export default connect(mapStateToProps, {})(SplashScreen)