
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
import { VERIFY_NOW, RESEND_OTP, } from "../../models/constants";
import { styles } from "./styles";
import OTPContainer from "../../components/otpContainer";
import { Loading } from "../../components/loading";
import * as Strings from '../../models';
import * as Routes from "../../models/routes";
import { ShowToast } from "../../utils/toastUtils";
import { Validations } from "../../utils/validationUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchOtpData } from "../../redux/authSlices/otpVerifySlice";
import { FetchResendOtpData } from "../../redux/authSlices/otpResendSlice";
import { apiStatus } from "../../redux/apiDataTypes";
import { Alert } from "react-native";

type Props = ILoginVerification & LoginVerifyNavigationProps

let timerEnable = true;
const LoginOtpVerify = (props: Props) => {
    const { navigation, route } = props;
    const [phoneNumber] = useState<string>(route.params.phoneNumber);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(240);
    const [otp, setOtp] = useState<string>('');
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.otp.status);
    const resendOtpstatus = useAppSelector(state => state.resendOtp.status);
    const resendOtpDetails = useAppSelector(state => state.resendOtp.userData);
    const userDetails = useAppSelector(state => state.otp.userData);

    useEffect(() => {
        //console.log('LoLO', timer);
        let clockCall = setInterval(() => {
            if (timer === 0) {
                clearInterval(clockCall);
            }
            else {
                setTimer(timer - 1);
            }
        }, 1000);
        return () => {
            clearInterval(clockCall)
        }
    })

    useEffect(() => {
        console.log(status);

        if (status === apiStatus.success) {
            setIsLoading(false)
            AsyncStorage.setItem('userId', JSON.stringify(userDetails.id));
            AsyncStorage.setItem('accessToken', JSON.stringify(userDetails.token));
            AsyncStorage.setItem('phone', JSON.stringify(userDetails.phone));
            //console.log('from otp screen ',userDetails);
            if (route.params.screen == 'Signup') {
                navigation.navigate(Routes.NAV_SUCCESS_LOGIN)
            } else if (route.params.screen == 'Login') {
                navigation.navigate(Routes.NAV_APP)
            }
        } else if (status === apiStatus.failed) {
            ShowToast(userDetails)
        }
    }, [status])

    useEffect(() => {
        if (resendOtpstatus === apiStatus.success) {
            setIsLoading(false);
            console.log("from redddjnkf", resendOtpDetails);
            //ShowToast("Please check Phone no");
        } else if (resendOtpstatus === apiStatus.failed) {
            ShowToast(resendOtpDetails)
        }

    }, [resendOtpstatus])

    const calculateTimer = () => {
        //console.log("timerlog", timer);
        if (timer === 0) {
            timerEnable = false;
            return ('00:00');
        } else {
            var m = Math.floor(timer % 3600 / 60);
            var s = Math.floor(timer % 3600 % 60);
            return ((m < 10 ? `0${m} :` : `${m} :`) + (s < 10 ? `0${s}` : `${s}`))
        }
    };

    function resendOtp() {
        if (phoneNumber == '' || phoneNumber == '') {
            ShowToast(Strings.OTP_VERIFY);
        } else {
            Keyboard.dismiss();
            setTimer(240);
            setIsLoading(true);
            if (Validations.verifyRequired(phoneNumber) == true) {
                dispatch(FetchResendOtpData({
                    phone: phoneNumber,
                }))
            } else {
                ShowToast("Please check Phone no");
            }
        }
    }

    function verifyOTPCall() {
        setIsLoading(true)
        console.log("fjhbd", userDetails.phoneNumber);
        console.log(phoneNumber + '//// ' + otp)
        if (Validations.verifyRequired(otp) == true) {
            dispatch(FetchOtpData({
                phone: phoneNumber,
                otp: otp,
            }))

        } else {
            ShowToast("Please fill OTP");
        }

    }

    return (
        <SafeAreaView
            style={styles.bodyContainer}>
            <View style={styles.topView}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.goBack()}>
                    <View>
                        <Image
                            style={styles.homeMenu}
                            source={leftarrow}
                            resizeMode='contain' />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.middleView}>
                <ScrollView style={styles.backgroundWhite}
                    keyboardShouldPersistTaps={'handled'}>
                    <View>
                        <Text style={styles.verifyText}>{Strings.VERIFY_OTP_TEXT}</Text>
                        <Text style={styles.phoneNumberText}>{Strings.SEND_OTP + phoneNumber}</Text>
                    </View>
                    <View style={styles.otpViewContainer}>

                        <View style={styles.otpViewBox}>
                            <OTPContainer
                                codeCount={4}
                                containerStyle={styles.otpContainerStyle}
                                onFinish={(code) => {
                                    setOtp(code)
                                }}
                            />
                            <View style={styles.marginView}>
                                <View style={styles.timerView}>
                                    <Image
                                        style={styles.timerImage}
                                        source={timeIcon}
                                        resizeMode='contain' />
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
                                        <Text style={styles.resendText}>{RESEND_OTP}</Text>
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

                                <Text style={styles.verifyButtonText}>{VERIFY_NOW}</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                    {isLoading ? <Loading /> : null}
                </ScrollView>

            </View>
        </SafeAreaView>
    )

}
export default LoginOtpVerify;