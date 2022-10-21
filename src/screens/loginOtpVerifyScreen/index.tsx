
import React, { useState, useEffect, useRef } from "react";

import {
    StatusBar,
    View,
    Text,
    SafeAreaView,
    Platform,
    LogBox,
    TouchableOpacity,
    Image,
    BackHandler,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { Theme } from "../../models";
import { LoginVerifyNavigationProps } from "../../navigations/types";
import { ILoginVerification } from "../../types";
import { leftarrow,smartphone } from "../../assets"; 

import { styles } from "./styles";
import OTPContainer from "../../components/otpContainer";

type Props = ILoginVerification & LoginVerifyNavigationProps

const LoginOtpVerify = (props: Props) => {
    const { navigation, route } = props;

    const [phoneNumber] = useState<string>(route.params.phoneNumber);

    useEffect(() => {
        console.log('LoLO', phoneNumber)
    })

    return (
        <SafeAreaView
            style={styles.bodyContainer}>

            <View style={styles.topView}>

                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {}}
                >
                    <View>

                        <Image
                            style={styles.homeMenu}
                            source={leftarrow}
                            resizeMode='contain'
                        />

                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.middleView}>
                <ScrollView style={styles.backgroundWhite}
                    keyboardShouldPersistTaps={'handled'}
                >

                    <View>

                        <Text
                            style={styles.verifyText}
                        >{'Verify Phone'}</Text>
                        <Text
                            style={styles.phoneNumberText}
                        >{'We have send otp to your phone\nno. ' + phoneNumber}</Text>

                    </View>
                    <View style={{
                        marginLeft: 10,
                        marginRight: 10,

                    }}>

                        <View style={styles.otpViewBox}>
                            <View>






                                <OTPContainer
                                    codeCount={4}
                                    containerStyle={{ marginTop: 20 }}
                                    otpStyles={{
                                        backgroundColor: '#E2E2E7', borderRadius: 10,
                                        keyboardType: 'number'
                                    }}
                                    onFinish={(code) => {
                                        this.setState({ otp: code })

                                        //   this.setCode(code)
                                    }}
                                />
                                <View style={{
                                    marginTop: 20,
                                    flex: 1,
                                    flexDirection: 'row',
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginLeft: 20
                                    }}>
                                        <Image
                                            style={{
                                                height: 15,
                                                width: 15
                                            }}
                                            source={require('../img/time_icon.png')}
                                            resizeMode='contain'
                                        />
                                        <Text
                                            style={{
                                                marginStart: 5,
                                                color: Color.Black,
                                                fontSize: 13,
                                                fontStyle: 'normal',
                                                fontFamily: 'Apercu Pro Regular'
                                            }}
                                        >{this.calculateTimer()}</Text>


                                    </View>

                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        marginRight: 20
                                    }}>
                                        <TouchableOpacity activeOpacity={0.6}
                                            disabled={timerEnable}
                                            onPress={() =>
                                                this.resendOtp()
                                            }>

                                            <Text
                                                style={{
                                                    fontSize: 13,
                                                    color: Color.Black,
                                                    fontStyle: 'normal',
                                                    fontWeight: '300',
                                                    textDecorationLine: 'underline',
                                                    fontFamily: 'Apercu Pro Regular'
                                                }}
                                            >Resend OTP</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity activeOpacity={0.6}
                                    onPress={() =>
                                        this.verifyOTPCall()
                                        //this.registerMember()
                                        //showErrorAlert('Register Successfully!')

                                        // console.log("Register", "Hii")

                                    }
                                    style={{
                                        marginTop: 40,
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 100,
                                        backgroundColor: '#000000',
                                        height: 50,
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}>


                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: Color.White,
                                            fontStyle: 'normal',
                                            borderRadius: 25,
                                            fontFamily: 'Apercu Pro Regular'

                                        }}
                                    >Verify Now</Text>
                                    <View style={{
                                        marginTop: 10,
                                    }}>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity TouchableOpacity={0.6}>
                            <View style={{
                                alignSelf: 'center',
                                flexDirection: 'row',

                            }}>

                            </View>
                        </TouchableOpacity>

                    </View>
                    {
                        this.state.showLoading ?
                            <ActivityIndicator
                                style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: Color.transparent }}
                                size="large"
                                color={Color.Black}
                            /> : null
                    }
                </ScrollView>

            </View>
        </SafeAreaView>
    )

}
export default LoginOtpVerify;