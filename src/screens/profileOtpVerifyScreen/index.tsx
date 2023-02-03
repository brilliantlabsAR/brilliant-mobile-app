
import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ScrollView,
	Keyboard
} from "react-native";
import { UpdateProfileVerifyNavigationProps } from "../../navigations/types";
import { timeIcon } from "../../assets";
import { STRINGS } from "../../models/constants";
import { styles } from "./styles";
import OTPContainer from "../../components/otpContainer";
import { Loading } from "../../components/loading";
import { ShowToast } from "../../utils/toastUtils";
import { Validations } from "../../utils/validationUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchResendOtpData } from "../../redux/authSlices/otpResendSlice";
import { apiStatus } from "../../redux/apiDataTypes";
import { FetchProfileVerifyData } from "../../redux/appSlices/updateProfileVerifySlice";
import { TopBar } from "../../components/topBar";

type Props = UpdateProfileVerifyNavigationProps
let timerEnable = true;
const ProfileOtpVerify = (props: Props) => {
	const { route } = props;
	const [phoneNumber] = useState<string>(route.params.phoneNumber);
	const [phone] = useState<string>(route.params.phone);
	const [email] = useState<string>(route.params.email);
	const [name] = useState<string>(route.params.name);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [timer, setTimer] = useState<number>(240);
	const [otp, setOtp] = useState<string>('');
	const [blankCheck, setBlankCheck] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const status = useAppSelector(state => state.updateProfileVerifySlice.status);
	const userDetails = useAppSelector(state => state.updateProfileVerifySlice.userData);

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
		if (status === apiStatus.success) {
			setIsLoading(false)
			setBlankCheck(false);
			AsyncStorage.setItem('userId', JSON.stringify(userDetails.id));
			AsyncStorage.setItem('accessToken', JSON.stringify(userDetails.token));
			AsyncStorage.setItem('phone', JSON.stringify(userDetails.phone));
		} else if (status === apiStatus.failed) {
			setOtp('');
			setIsLoading(false);
			setBlankCheck(false);
			ShowToast(userDetails);
		}
	}, [status])



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
		setBlankCheck(true);
		if (!Validations.verifyRequired(phoneNumber)) {
			// navigation.replace(Routes.NAV_LOGIN_SCREEN)
			console.log("error in phone number");
		} else {
			Keyboard.dismiss();
			setTimer(240);
			setIsLoading(true);
			dispatch(FetchResendOtpData({
				phone: phoneNumber,
			}))
		}
	}

	function verifyOTPCall() {
		// console.log("fjhbd", userDetails.phoneNumber);
		// console.log(phoneNumber + '//// ' + otp)
		if (Validations.verifyRequired(otp)) {
			setIsLoading(true)
			dispatch(FetchProfileVerifyData({
				name: name,
				email: email,
				phone: phoneNumber,
				oldPhoneNumber: phone,
				otp: otp
			}))
		}

	}

	return (
		<SafeAreaView
			style={styles.bodyContainer}>
			<TopBar />
			<View style={styles.middleView}>
				<ScrollView style={styles.backgroundWhite}
					keyboardShouldPersistTaps={'handled'}>
					<View>
						<Text style={styles.verifyText}>{STRINGS.VERIFY_OTP_TEXT}</Text>
						<Text style={styles.phoneNumberText}>{STRINGS.SEND_OTP + phoneNumber}</Text>
					</View>
					<View style={styles.otpViewContainer}>

						<View style={styles.otpViewBox}>
							<OTPContainer
								codeCount={4}
								containerStyle={styles.otpContainerStyle}
								onFinish={(code) => {
									setOtp(code)
								}}
								blankCheck={blankCheck}
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
										<Text style={styles.resendText}>{STRINGS.RESEND_OTP}</Text>
									</TouchableOpacity>
								</View>
							</View>

							<TouchableOpacity activeOpacity={0.6}
								onPress={() =>
									verifyOTPCall()
								}
								style={styles.verifyButtonStyle}>

								<Text style={styles.verifyButtonText}>{STRINGS.VERIFY_NOW}</Text>
							</TouchableOpacity>
						</View>
					</View>
					{isLoading ? <Loading /> : null}
				</ScrollView>
			</View>
		</SafeAreaView>
	)

}
export default ProfileOtpVerify;