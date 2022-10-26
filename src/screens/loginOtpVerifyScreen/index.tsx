
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
    ActivityIndicator,
    Keyboard
} from "react-native";
import { Theme } from "../../models";
import { LoginVerifyNavigationProps } from "../../navigations/types";
import { ILoginVerification } from "../../types";
import { leftarrow, smartphone, timeIcon } from "../../assets";
import { styles } from "./styles";
import OTPContainer from "../../components/otpContainer";
import { ShowToast } from "../../utils/toastUtils";
import * as CONST from '../../models'

type Props = ILoginVerification & LoginVerifyNavigationProps

let timerEnable = true, clockCall: number;
const LoginOtpVerify = (props: Props) => {
    const { navigation, route } = props;

    const [phoneNumber] = useState<string>(route.params.phoneNumber);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(240);
    const [otp, setOtp] = useState<string>('');


    useEffect(() => {
        console.log('LoLO', phoneNumber);
        clockCall = setInterval(() => {
            if (timer === 0) clearInterval(clockCall);
            setTimer(timer - 1)
        }, 1000);
        return () => {
            clearInterval(clockCall)
        }
    })

    const calculateTimer = () => {
        if (timer == 0) {
            timerEnable = false;
            clearInterval(clockCall);
            return ('00:00')
        } else {
            var m = Math.floor(timer % 3600 / 60);
            var s = Math.floor(timer % 3600 % 60);
            return ((m < 10 ? `0${m} :` : `${m} :`) + (s < 10 ? `0${s}` : `${s}`))
        }
    };

    function resendOtp() {
        if (otp == '' || otp == ' ') {
            ShowToast(CONST.OTP_VERIFY);
        } else {
            Keyboard.dismiss();
            setIsLoading(true);
            // this.props.verifyOTP({ phone: phoneNumber, otp: otp })
        }
    }

    function verifyOTPCall() {

    }
    return (
        <SafeAreaView
            style={styles.bodyContainer}>

            <View style={styles.topView}>

                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { () => navigation.goBack() }}
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
                    keyboardShouldPersistTaps={'handled'}>
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
                                    onFinish={(code) => {
                                        setOtp(code)
                                    }}
                                />
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
                                        >{calculateTimer()}</Text>


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