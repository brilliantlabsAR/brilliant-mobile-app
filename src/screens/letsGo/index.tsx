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
import AsyncStorage from '@react-native-async-storage/async-storage'
import notifee, { EventType } from '@notifee/react-native';
import GetLocation from "react-native-get-location";
import { styles } from "./styles";
import { STRINGS } from "../../models/constants";
import * as Routes from "../../models/routes";
import * as mainDao from '../../database';
import { LetsGoNavigationProps } from "../../navigations/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetLogin } from "../../redux/authSlices/loginSlice";
import { resetOTPData } from "../../redux/authSlices/otpVerifySlice";
import { resetResendData } from "../../redux/authSlices/otpResendSlice";
import { resetSignUpData } from "../../redux/authSlices/signupSlice";

const windowHeight = Dimensions.get('window').height;

const LetsGoScreen = ({ navigation }: LetsGoNavigationProps) => {
	const dispatch = useAppDispatch();
	const [isShow, setIsShow] = useState<boolean>(false);
	//var isShow:boolean=false;
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
		//this.translateUp();
		Animated.parallel([translateUp, translateUp2]).start(() => {
			{ console.log("Ho12", isShow) }

			Animated.timing(animated3, {
				toValue: 0,
				duration: 1000,
				useNativeDriver: true,
			}).start();

		});
		// { console.log("HIHIHI") }
		// if (Platform.OS === 'android' && Platform.Version >= 23) {
		// 	PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
		// 		if (result) {
		// 			console.log("ACCESS_FINE_LOCATION Permission is OK");
		// 		} else {
		// 			PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
		// 				if (result) {
		// 					console.log("ACCESS_FINE_LOCATION User accept");
		// 				} else {
		// 					console.log("User refuse");
		// 				}
		// 			});
		// 		}
		// 	});
		// }
		// getLocation();
	}, []);
	// async function getLocation() {

	// 	await GetLocation.getCurrentPosition({
	// 		enableHighAccuracy: true,
	// 		timeout: 15000,
	// 	})
	// 		.then(location => {
	// 			console.log('Location', location);

	// 		})
	// 		.catch(error => {
	// 			const { code, message } = error;
	// 			console.warn(code, message);
	// 		})
	// }

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