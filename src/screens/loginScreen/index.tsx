
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { STRINGS } from "../../models";
import { LoginNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import { TextInput } from 'react-native-paper';
import { smartphone } from "../../assets";
import { Loading } from '../../components/loading';
import * as Routes from "../../models/routes";
import { ShowToast } from "../../utils/toastUtils";
import { Validations } from "../../utils/validationUtils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchLoginData, resetLogin } from "../../redux/authSlices/loginSlice";
import { apiStatus } from "../../redux/apiDataTypes";
import { textInputStyle } from "../../utils/stylesUtils";
import { TopBar } from "../../components/topBar";

const LoginScreen = (props: LoginNavigationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.login.status)
  const userDetails = useAppSelector(state => state.login.userData);


  useEffect(() => {
    if (status === apiStatus.success) {
      setIsLoading(false);
      navigation.replace(Routes.NAV_LOGIN_VERIFY_SCREEN, { screen: STRINGS.LOGIN, phone: phoneNumber })
      setPhoneNumber("");
    } else if (status === apiStatus.failed) {
      setIsLoading(false);
      ShowToast(userDetails);
    }
  }, [status])


  const loginApiFunc = () => {
    Keyboard.dismiss();
    if (Validations.VerifyLogin(phoneNumber)) {
      setIsLoading(true);
      dispatch(FetchLoginData({
        phone: phoneNumber,
        fcmToken: "ijoidfjoijweoifjopkjwcfkopvk operjioivjeoirtgujiojeriotjgioerjop berk pogtker'ktgerpgkrepok",
        deviceType: Platform.OS === 'android' ? 'android' : 'ios'
      }))
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
        >
          <TopBar />
          <View style={styles.mainContainer}>
            <Text style={styles.signUpDescText}>
              {STRINGS.LOGIN_TEXT}
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                label="Phone No."
                maxLength={15}
                keyboardType="phone-pad"
                value={phoneNumber}
                blurOnSubmit={true}
                onChangeText={(phoneNumber) => onChangePhone(phoneNumber)}
                right={<TextInput.Icon name={smartphone} size={15} />}
                theme={textInputStyle}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                loginApiFunc()
              }
              style={styles.loginBtn}
            >
              <Text style={styles.loginTextStyle}>{STRINGS.LOGIN}</Text>
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
}


export default LoginScreen;