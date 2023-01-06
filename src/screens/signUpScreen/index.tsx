import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SignUpNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
import { smartphone, userIcon, mailIcon } from "../../assets";
import { CountryCodePicker } from "../../utils/countryCodePicker";
import { STRINGS } from "../../models/constants"
import { ShowToast } from "../../utils/toastUtils";
import { Validations } from "../../utils/validationUtils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchSignupData } from "../../redux/authSlices/signupSlice";
import { apiStatus } from "../../redux/apiDataTypes";
import { Loading } from "../../components/loading";
import { countryPickerStyle, textInputStyle } from "../../utils/stylesUtils";
import { TopBar } from "../../components/topBar";

const SignUpScreen = (props: SignUpNavigationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [show, setShow] = useState(false);
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.signup.status)
  const userDetails = useAppSelector(state => state.signup.userData);

  useEffect(() => {
    if (status === apiStatus.success) {
      setIsLoading(false);
      setFirstName("");
      setEmail("");
      navigation.replace(Routes.NAV_LOGIN_VERIFY_SCREEN, { screen: STRINGS.SIGNUP, phone: countryCode + phoneNumber })
      setCountryCode("")
      setPhoneNumber("");
    } else if (status === apiStatus.failed) {
      setIsLoading(false);
      ShowToast(userDetails);
    }
  }, [status])

  const signUpApiFunc = () => {
    console.log("email checking", email);

    if (Validations.VerifySignup(phoneNumber, countryCode, firstName, email)) {
      setIsLoading(true);
      dispatch(FetchSignupData({
        phone: phoneNumber,
        cc: countryCode,
        name: firstName,
        email: email
      }))
    } else {
      return false;
    }
  }

  const openCountry = () => {
    setShow(true);
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TopBar />
          <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.signUpDescText}>
                  {STRINGS.SIGNUP_TITLE}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.afterInputContainer}>
                  <View>
                    <TextInput
                      mode="outlined"
                      label="Full Name"
                      keyboardType="default"
                      value={firstName}
                      onChangeText={(firstName) => setFirstName(firstName)}
                      right={<TextInput.Icon name={userIcon} size={15} />}
                      theme={textInputStyle}
                    />
                    <View style={styles.height20px} />
                    <View style={styles.outCountrycodeView}>
                      <TouchableOpacity
                        style={styles.countryCodeView}
                        onPress={() => setShow(true)}
                      >
                        <TextInput
                          mode="outlined"
                          label="Country Code"
                          keyboardType="phone-pad"
                          pointerEvents="none"
                          editable={false}
                          value={countryCode}
                          onFocus={() => {
                            openCountry()
                          }}
                          onKeyPress={(keyPress) => {
                            setShow(false);
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
                    <View style={styles.height20px} />
                    <TextInput
                      mode="outlined"
                      label="Email"
                      keyboardType="email-address"
                      value={email}
                      onChangeText={(email) => setEmail(email.replace(/\s/g, ""))}
                      right={<TextInput.Icon name={mailIcon} size={15} />}
                      theme={textInputStyle}
                    />
                    <CountryCodePicker
                      show={show}
                      lang={"en"}
                      style={countryPickerStyle}
                      // when picker button press you will get the country object with dial code
                      pickerButtonOnPress={(item) => {
                        console.log("hii", item.dial_code);
                        setCountryCode(item.dial_code);
                        setShow(false);
                      }}
                      onBackdropPress={() => setShow(false)}
                    />
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() =>
                        signUpApiFunc()
                      }
                      style={styles.touchOpacityView}
                    >
                      <Text style={styles.touchOpacityText}>Submit</Text>
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
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUpScreen;
