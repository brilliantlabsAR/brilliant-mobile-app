import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FontFamily, STRINGS, Theme } from "../../models";
import { UpdateProfileNavigationProps } from "../../navigations/types";
import { userIcon, smartphone, mailIcon } from "../../assets";
import { styles } from "./styles";
import { Loading } from '../../components/loading';
import { TextInput } from 'react-native-paper';
import { CountryCodePicker } from "../../utils/countryCodePicker";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchUpdateProfileData } from "../../redux/appSlices/updateProfileSlice";
import { apiStatus } from "../../redux/apiDataTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Validations } from "../../utils/validationUtils";
import { ShowToast } from "../../utils/toastUtils";
import * as Routes from "../../models/routes";
import { TopBar } from "../../components/topBar";

const textInputStyle = {
  colors: {
    placeholder: '#A1A1A1',
    text: '#000000', primary: '#A1A1A1',
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

const UpdateProfileScreen = (props: UpdateProfileNavigationProps) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState<string | any>('');
  const [countryCode, setCountryCode] = useState<string | any>('');
  const [oldCountryCode, setOldCountryCode] = useState<string | any>('');
  const [phoneNumber, setPhoneNumber] = useState<string | any>('');
  const [oldPhoneNumber, setOldPhoneNumber] = useState<string | any>('');
  const [email, setEmail] = useState<string | any>('');
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.updateProfile.status);
  const userDetails = useAppSelector(state => state.updateProfile.userData);

  useEffect(() => {
    if (status === apiStatus.success) {
      setIsLoading(false);
      // console.log("successfully updated");
      navigation.navigate(Routes.NAV_PROFILE_OTP_SCREEN, { phoneNumber: phoneNumber, countryCode: countryCode, phone: oldCountryCode + oldPhoneNumber, email: email, name: firstName })
    } else if (status === apiStatus.failed) {
      setIsLoading(false);
      ShowToast(userDetails);
    }
  }, [status])

  useEffect(() => {
    AsyncStorage.getItem('name').then((name) => {
      setFirstName(name)
    })
    AsyncStorage.getItem('phone').then((phone) => {
      setPhoneNumber(phone);
      setOldPhoneNumber(phone);
    })
    AsyncStorage.getItem('email').then((emailId) => {
      setEmail(emailId)
    })
    AsyncStorage.getItem('countryCode').then((countryCode) => {
      setCountryCode(countryCode);
      setOldCountryCode(countryCode);
    })
  }, [])

  const updateProfileApiFunc = () => {
    if (Validations.verifyRequired(firstName) == true &&
      Validations.verifyRequired(countryCode) == true &&
      Validations.verifyRequired(phoneNumber) == true &&
      Validations.verifyRequired(email) == true) {
      if (Validations.verifyEmail(email) == true && Validations.verifyPhone(phoneNumber) == true) {
        setIsLoading(true);
        dispatch(FetchUpdateProfileData({
          cc: countryCode,
          name: firstName,
          phone: phoneNumber,
          email: email
        }))

      } else {
        return false;
      }

    } else {
      ShowToast("Please fill all the fields");
    }
  }

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <TopBar title={STRINGS.UPDATE_PROFILE} isTextVisible={true} />

      <View style={styles.spaceView} />
      <CountryCodePicker
        show={show}
        lang={'en'}
        style={countryPickerStyle}

        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          console.log("hii", item.dial_code);
          setCountryCode(item.dial_code);
          setShow(false);
        }}
        onBackdropPress={() => setShow(false)}
      />
      <View style={styles.textInputView}>

        <TextInput
          mode="outlined"
          label="Full Name"
          keyboardType="default"
          value={firstName}
          onChangeText={(firstName) => setFirstName(firstName)}
          right={<TextInput.Icon name={userIcon} size={15} />}
          theme={textInputStyle}
        />

        <View style={styles.countryCodeView}>
          <TouchableOpacity style={styles.countryCodeOpen}
            onPress={() => { setShow(true) }}
          >
            <TextInput
              mode="outlined"
              label="Country Code"
              keyboardType="phone-pad"
              pointerEvents="none"
              editable={false}
              value={countryCode}
              onKeyPress={keyPress => setShow(true)}
              onChangeText={(countryCode) => setCountryCode(countryCode)}
              theme={textInputStyle}
            />

          </TouchableOpacity>
          <View style={styles.smallViewSpace} />
          <View style={styles.mediumViewSpace}>
            <TextInput
              mode="outlined"
              label="Phone No."
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              right={<TextInput.Icon name={smartphone} size={15} />}
              theme={textInputStyle}

            />
          </View>
        </View>
        <TextInput
          mode="outlined"
          label="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => setEmail(email.replace(/\s/g, ''))}
          right={<TextInput.Icon name={mailIcon} size={15} />}
          theme={textInputStyle}
          style={styles.marginTop}

        />
        <TouchableOpacity activeOpacity={0.6}
          onPress={() =>
            updateProfileApiFunc()
          }
          style={styles.updateButtonStyle}>
          <Text style={styles.updateText}>{STRINGS.UPDATE}</Text>
        </TouchableOpacity>

      </View>

      {
        isLoading ?
          <Loading /> : null
      }
    </SafeAreaView>
  )
}
export default UpdateProfileScreen;