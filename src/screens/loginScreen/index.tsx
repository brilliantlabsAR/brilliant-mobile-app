
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
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { FontFamily, Theme, STRINGS } from "../../models";
import { LoginNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import { CountryCodePicker } from "../../utils/countryCodePicker";
import { TextInput } from 'react-native-paper';
import { leftarrow, smartphone } from "../../assets";
import { Loading } from '../../components/loading';
import * as Routes from "../../models/routes";
import { ShowToast } from "../../utils/toastUtils";
import { Validations } from "../../utils/validationUtils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchLoginData, resetLogin } from "../../redux/authSlices/loginSlice";
import { apiStatus } from "../../redux/apiDataTypes";
import { countryPickerStyle, textInputStyle } from "../../utils/stylesUtils";
import { TopBar } from "../../components/topBar";
import { resetOTPData } from "../../redux/authSlices/otpVerifySlice";
import { resetResendData } from "../../redux/authSlices/otpResendSlice";

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
      navigation.replace(Routes.NAV_LOGIN_VERIFY_SCREEN, { screen: STRINGS.LOGIN, phone: countryCode + phoneNumber })
      setCountryCode("");
      setPhoneNumber("");
    } else if (status === apiStatus.failed) {
      setIsLoading(false);
      ShowToast(userDetails);
    }
  }, [status])


  const loginApiFunc = () => {
    if (Validations.VerifyLogin(countryCode, phoneNumber)) {
      setIsLoading(true);
      dispatch(FetchLoginData({
        phone: phoneNumber,
        cc: countryCode,
        fcmToken: "ijoidfjoijweoifjopkjwcfkopvk operjioivjeoirtgujiojeriotjgioerjop berk pogtker'ktgerpgkrepok",
        deviceType: Platform.OS === 'android' ? 'android' : 'ios'
      }))
    }
  }

  return (
    <SafeAreaView style={styles.bodyContainer}>
      {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        > */}
      <TopBar />
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.signupdescText}>
              {STRINGS.LOGIN_TEXT}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.afterinputContainer}>
              <View>
                <View style={styles.outcountrycodeView}>
                  <TouchableOpacity
                    style={styles.countrycodeView}
                    onPress={() => setIsShow(true)}
                  >
                    <TextInput
                      mode="outlined"
                      label="Country Code"
                      keyboardType="phone-pad"
                      pointerEvents="none"
                      editable={false}
                      value={countryCode}
                      onFocus={() => {
                        setIsShow(true)
                      }}
                      onKeyPress={(keyPress) => {
                        setIsShow(false);
                      }}
                      onChangeText={(countryCode) =>
                        setCountryCode(countryCode)
                      }
                      theme={textInputStyle}
                    />
                  </TouchableOpacity>
                  <View style={styles.gape1} />
                  <View style={styles.gape2}>
                    <TextInput
                      mode="outlined"
                      label="Phone No."
                      keyboardType="phone-pad"
                      value={phoneNumber}
                      onChangeText={(phoneNumber) =>
                        setPhoneNumber(phoneNumber)
                      }
                      right={<TextInput.Icon name={smartphone} size={15} />}
                      theme={textInputStyle}
                    />
                  </View>
                </View>

                <CountryCodePicker
                  show={isShow}
                  lang={"en"}
                  style={countryPickerStyle}
                  // when picker button press you will get the country object with dial code
                  pickerButtonOnPress={(item) => {
                    console.log("hii", item.dial_code);
                    setCountryCode(item.dial_code);
                    setIsShow(false);
                  }}
                  onBackdropPress={() => setIsShow(false)}
                />
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    //this.registerMember()
                    //SimpleToast.show('Register Successfully!',SimpleToast.SHORT)
                    //
                    // console.log("Register", "Hii")
                    loginApiFunc()
                  }
                  style={styles.touchOpacityView}
                >
                  <Text style={styles.loginTextStyle}>{STRINGS.LOGIN}</Text>
                </TouchableOpacity>

              </View>
            </View>

          </View>
          {
            isLoading ?
              <Loading /> : null
          }
        </ScrollView>
      </View>
      {/* </KeyboardAvoidingView>
      </TouchableWithoutFeedback> */}
    </SafeAreaView>
  );
}


export default LoginScreen;