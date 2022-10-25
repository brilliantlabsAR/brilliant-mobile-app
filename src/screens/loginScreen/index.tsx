
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
  ActivityIndicator
} from "react-native";
import { Theme } from "../../models";
import { LoginNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import { CountryPicker } from 'react-native-country-codes-picker';
import { TextInput } from 'react-native-paper';
import { leftarrow, smartphone } from "../../assets";
import * as Routes from "../../models/routes";

const LoginScreen = (props: LoginNavigationProps) => {

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>('');
  const [phoneNumber, setphoneNumber] = useState<string>('');
  let newPhoneNumber = countryCode + phoneNumber;
  const { navigation } = props;

  const textInputStyle = {
    colors: {
      placeholder: '#A1A1A1',
      text: '#000000', primary: '#A1A1A1',
      // underlineColor: 'transparent',
      background: 'white',

    }, fonts: {
      regular: {
        fontFamily: 'ApercuProRegular'
      }
    },
    roundness: 10
  }
  return (
    <SafeAreaView
      style={styles.bodyContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.color.White} />

      <View style={styles.topView}>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => BackHandler.exitApp()}
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

        >

          <View>

            <Text
              style={styles.loginText}
            >{'Login'}</Text>
            <Text
              style={styles.welcomeText}
            >{'Welcome to Frame App'}</Text>

          </View>
          <View>

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
                <View style={{
                  width: '2%',
                  backgroundColor: Theme.color.White,
                }} />
                <View style={{
                  width: '70%',
                  backgroundColor: Theme.color.White,
                }}>
                  <TextInput
                    mode="outlined"
                    label="Phone No."
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={(phoneNumber) => setphoneNumber(phoneNumber.replace(/\s/g, ''))}
                    right={<TextInput.Icon name={smartphone} size={15} />}
                    theme={textInputStyle}

                  />
                </View>


              </View>


              <TouchableOpacity activeOpacity={0.6}
                onPress={() =>
                  // this.LoginMember()
                  //showErrorAlert('Register Successfully!')
                  //    this.props.navigation.navigate("LoginOtpVerifyScreen")
                  //  console.log("Register", "Hii")
                  navigation.navigate(Routes.NAV_LOGIN_VERIFY_SCREEN, { phoneNumber: newPhoneNumber })

                }
                style={styles.loginButtonStyle}>


                <Text
                  style={styles.loginTextStyle}
                >Login</Text>

              </TouchableOpacity>
              <CountryPicker
                show={isShow}
                lang={'en'}
                style={{
                  modal: {
                    backgroundColor: Theme.color.White,
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                  },
                  // Styles for modal backdrop [View]
                  backdrop: {

                  },
                  // Styles for bottom input line [View]
                  line: {

                  },
                  // Styles for list of countries [FlatList]
                  itemsList: {

                  },
                  // Styles for input [TextInput]
                  textInput: {
                    height: 80,
                    borderRadius: 0,

                  },
                  // Styles for country button [TouchableOpacity]
                  countryButtonStyles: {
                    height: 80
                  },
                  // Styles for search message [Text]
                  searchMessageText: {

                  },
                  // Styles for search message container [View]
                  countryMessageContainer: {

                  },
                  // Flag styles [Text]
                  flag: {

                  },
                  // Dial code styles [Text]
                  dialCode: {
                  },
                  // Country name styles [Text]
                  countryName: {


                  },
                }}


                // when picker button press you will get the country object with dial code
                pickerButtonOnPress={(item) => {
                  console.log("hii", item.dial_code);
                  setCountryCode(item.dial_code);
                  setIsShow(false)
                }}
                onBackdropPress={() => setIsShow(false)}
              />

              <View style={styles.signUpView}>

                <Text
                  style={styles.dontSignUp}
                >{'Don\'t have an account? '}
                  <Text style={{
                    textDecorationLine: 'underline',
                  }}
                    onPress={() => { }}>Signup</Text></Text>
                {/* onPress={() => this.props.navigation.navigate("InviteContactScreen")}>Signup</Text></Text> */}



              </View>

            </View>



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
  );
}


export default LoginScreen;