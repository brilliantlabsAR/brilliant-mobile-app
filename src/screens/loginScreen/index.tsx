
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
  Alert
} from "react-native";
import { FontFamily, Theme } from "../../models";
import { LoginNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import { CountryCodePicker } from "../../utils/countryCodePicker";
import { TextInput } from 'react-native-paper';
import { leftarrow, smartphone } from "../../assets";
import { Loading } from '../../components/loading';
import { WELCOME_TO_APP, LOGIN, DONT_HAVE_ACCN, SIGNUP } from "../../models/constants";
import * as Routes from "../../models/routes";
import { ShowToast } from "../../utils/toastUtils";
import { Validations } from "../../utils/validationUtils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchLoginData } from "../../redux/authSlices/loginSlice";
import { apiStatus } from "../../redux/apiDataTypes";

const LoginScreen = (props: LoginNavigationProps) => {

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.login.status)
  const userDetails = useAppSelector(state => state.login.userData);

  useEffect(() => {
    if (status === apiStatus.success) {
      setIsLoading(false);
      navigation.navigate(Routes.NAV_LOGIN_VERIFY_SCREEN, { phoneNumber: countryCode + phoneNumber, screen: LOGIN })
    } else if (status === apiStatus.failed) {
      setIsLoading(false);
      ShowToast(userDetails);
    }
  }, [status])


  const loginApiFunc = () => {
    if (Validations.verifyRequired(countryCode) && Validations.verifyRequired(phoneNumber) && Validations.verifyPhone(phoneNumber)) {
      setIsLoading(true);
      dispatch(FetchLoginData({
        phone: phoneNumber,
        cc: countryCode,
        fcmToken: "ijoidfjoijweoifjopkjwcfkopvk operjioivjeoirtgujiojeriotjgioerjop berk pogtker'ktgerpgkrepok",
        deviceType: "android"
      }))
    }
  }
  const textInputStyle = {
    colors: {
      placeholder: '#A1A1A1',
      text: '#000000', primary: '#A1A1A1',
      // underlineColor: 'transparent',
      background: 'white',

    }, fonts: {
      regular: {
        fontFamily: FontFamily.regular
      }
    },
    roundness: 10
  }
  const countryPickerStyle = {
    // Styles for whole modal [View]
    modal: {
      backgroundColor: Theme.color.White,
      height: '70%'
    },
    // Styles for input [TextInput]
    textInput: {
      borderRadius: 10,
    },
  }
  return (
    <SafeAreaView
      style={styles.bodyContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.color.White} />

      <View style={styles.topView}>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.homeMenu}
            source={leftarrow}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
      <View style={styles.middleView}>
        <ScrollView style={styles.backgroundWhite}>
          <View>
            <Text style={styles.loginText}>{LOGIN}</Text>
            <Text style={styles.welcomeText}>{WELCOME_TO_APP}</Text>
          </View>
          <View style={styles.phoneBox}>
            <View style={styles.phoneBoxTwo}>

              <TouchableOpacity style={styles.touchableCountryBox}
                onPress={() => setIsShow(true)}
              >
                <TextInput
                  mode="outlined"
                  label="Country Code"
                  keyboardType="phone-pad"
                  pointerEvents="none"
                  editable={false}
                  value={countryCode}
                  onFocus={() => { setIsShow(true) }}
                  onKeyPress={keyPress => { setIsShow(false) }}
                  onChangeText={(countryCode) => setCountryCode(countryCode)}
                  theme={textInputStyle}
                />

              </TouchableOpacity>
              <View style={styles.gap1} />
              <View style={styles.gap2}>
                <TextInput
                  mode="outlined"
                  label="Phone No."
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber.replace(/\s/g, ''))}
                  right={<TextInput.Icon name={smartphone} size={15} />}
                  theme={textInputStyle}

                />
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.6}
              onPress={loginApiFunc
                // this.LoginMember()
                //showErrorAlert('Register Successfully!')
                //    this.props.navigation.navigate("LoginOtpVerifyScreen")
                //  console.log("Register", "Hii")

              }
              style={styles.loginButtonStyle}>
              <Text style={styles.loginTextStyle}>{LOGIN}</Text>

            </TouchableOpacity>
            <CountryCodePicker
              show={isShow}
              lang={'en'}
              style={countryPickerStyle}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={(item) => {
                console.log("hii", item.dial_code);
                setCountryCode(item.dial_code);
                setIsShow(false)
              }}
              onBackdropPress={() => setIsShow(false)}
            />

            <View style={styles.signUpView}>

              <Text style={styles.dontSignUp}>{DONT_HAVE_ACCN}
                <Text style={styles.signupTextStyle}
                  onPress={() => { navigation.navigate(Routes.NAV_SIGNUP_SCREEN) }}>{SIGNUP}
                </Text>
              </Text>
              {/* onPress={() => this.props.navigation.navigate("InviteContactScreen")}>Signup</Text></Text> */}

            </View>
          </View>

          {
            isLoading ?
              <Loading /> : null
          }
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}


export default LoginScreen;