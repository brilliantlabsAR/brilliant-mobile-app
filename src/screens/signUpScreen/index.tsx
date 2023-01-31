import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SignUpNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
import { smartphone, userIcon, mailIcon } from "../../assets";
import { STRINGS } from "../../models/constants"
import { ShowToast } from "../../utils/toastUtils";
import { Validations } from "../../utils/validationUtils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchSignupData } from "../../redux/authSlices/signupSlice";
import { apiStatus } from "../../redux/apiDataTypes";
import { Loading } from "../../components/loading";
import { textInputStyle } from "../../utils/stylesUtils";
import { TopBar } from "../../components/topBar";

const SignUpScreen = (props: SignUpNavigationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.signup.status)
  const userDetails = useAppSelector(state => state.signup.userData);

  useEffect(() => {
    if (status === apiStatus.success) {
      setIsLoading(false);
      setFirstName("");
      setEmail("");
      navigation.replace(Routes.NAV_LOGIN_VERIFY_SCREEN, { screen: STRINGS.SIGNUP, phone: phoneNumber })
      setPhoneNumber("");
    } else if (status === apiStatus.failed) {
      setIsLoading(false);
      ShowToast(userDetails);
    }
  }, [status])

  const signUpApiFunc = () => {
    // console.log("email checking", email);
    Keyboard.dismiss()
    if (Validations.VerifySignup(phoneNumber, firstName, email)) {
      setIsLoading(true);
      dispatch(FetchSignupData({
        phone: phoneNumber,
        name: firstName,
        email: email
      }))
    } else {
      return false;
    }
  }

  const onChangePhone = (value: any) => {
    let newPhone = value.includes("+", 0)
    let phone = value.replace(/[a-zA-Z- #*;(),.<>''{''}''[\]\\''/]/gi, '')
    if (value.length == 1 && !newPhone) {
      setPhoneNumber('+' + phone)
    } else {
      setPhoneNumber(phone)
    }
    if (!newPhone) {
      setPhoneNumber('+' + phone)
    }
  }


  return (
    <SafeAreaView style={styles.bodyContainer}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior='padding'
        >
          <TopBar />
          <View style={styles.mainContainer}>
            <Text style={styles.signUpDescText}>
              {STRINGS.SIGNUP_TITLE}
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                label="Full Name"
                keyboardType="default"
                value={firstName}
                onChangeText={(firstName) => setFirstName(firstName)}
                right={<TextInput.Icon name={userIcon} size={15} />}
                theme={textInputStyle}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                label="Phone No."
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={(phoneNumber) => onChangePhone(phoneNumber)
                }
                right={<TextInput.Icon name={smartphone} size={15} />}
                theme={textInputStyle}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                label="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={(email) => setEmail(email.replace(/\s/g, ""))}
                right={<TextInput.Icon name={mailIcon} size={15} />}
                theme={textInputStyle}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                signUpApiFunc()
              }
              style={styles.signInBtn}
            >
              <Text style={styles.signInTextStyle}>{STRINGS.SUBMIT}</Text>
            </TouchableOpacity>
            {
              isLoading ?
                <Loading /> : null
            }
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUpScreen;
