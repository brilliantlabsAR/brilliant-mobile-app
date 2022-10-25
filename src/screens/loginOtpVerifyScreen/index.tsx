
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
import { leftarrow, smartphone, timeIcon } from "../../assets";

import { styles } from "./styles";
//import OTPContainer from "../../components/otpContainer";

type Props = ILoginVerification & LoginVerifyNavigationProps

let timerEnable = true;
const LoginOtpVerify = (props: Props) => {
    const { navigation, route } = props;

    const [phoneNumber] = useState<string>(route.params.phoneNumber);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        console.log('LoLO', phoneNumber)
    })

    const calculateTimer = () => {
    };
    function resendOtp() {

    }

    function verifyOTPCall() {

    }
    return (
        <SafeAreaView
            style={styles.bodyContainer}>

            <View style={styles.topView}>

                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { }}
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






                                {/* <OTPContainer
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
                                /> */}
                                <View style={styles.marginView}>
                                    <View style={styles.marginLeft}>
                                        <Image
                                            style={{
                                                height: 15,
                                                width: 15
                                            }}
                                            source={timeIcon}
                                            resizeMode='contain'
                                        />
                                        <Text
                                            style={styles.timerText}
                                        >{"calculateTimer()"}</Text>


                                    </View>

                                    <View style={styles.resendView}>
                                        <TouchableOpacity activeOpacity={0.6}
                                            disabled={timerEnable}
                                            onPress={() =>
                                                resendOtp()
                                            }>

                                            <Text
                                                style={styles.resendText}
                                            >Resend OTP</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity activeOpacity={0.6}
                                    onPress={() =>
                                        verifyOTPCall()
                                        //this.registerMember()
                                        //showErrorAlert('Register Successfully!')

                                        // console.log("Register", "Hii")

                                    }
                                    style={styles.verifyButtonStyle}>


                                    <Text
                                        style={styles.verifyButtonText}
                                    >Verify Now</Text>
                                    <View style={styles.marginTop}>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity activeOpacity={0.6}>
                            <View style={{
                                alignSelf: 'center',
                                flexDirection: 'row',

                            }}>

                            </View>
                        </TouchableOpacity>

                    </View>
                    {
                        isLoading ?
                            <ActivityIndicator
                                style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: Theme.color.transparent }}
                                size="large"
                                color={Theme.color.Black}
                            /> : null
                    }
                </ScrollView>

            </View>
        </SafeAreaView>
    )

}
export default LoginOtpVerify;