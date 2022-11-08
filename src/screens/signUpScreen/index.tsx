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
} from "react-native";
import { TextInput } from "react-native-paper";

import { FontFamily, Theme } from "../../models";
import { SignUpNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
import { leftarrow, smartphone, userIcon, mailIcon } from "../../assets";
import { CountryCodePicker } from "../../utils/countryCodePicker";
import { SIGNUP_TITLE, ALREADY_TITLE, AGREE_TITLE, TERMS_CONDITIONS, LOGIN,SIGNUP} from "../../models/constants"
import {ShowToast} from "../../utils/toastUtils";
import {Validations} from "../../utils/validationUtils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchSignupData } from "../../redux/authSlices/signupSlice";
import { apiStatus } from "../../redux/apiDataTypes";

const SignUpScreen = (props: SignUpNavigationProps) => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [firstName, setfirstName] = useState<string>("");
    const [countryCode, setCountryCode] = useState<string>("");
    const [phoneNumber, setphoneNumber] = useState<string>("");
    const [email, setemail] = useState<string>("");
    const [show, setShow] = useState(false);
    const { navigation } = props;
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.signup.status)
    const userDetails = useAppSelector(state => state.signup.userData);

    useEffect(() => {
        if (status === apiStatus.success) {
          navigation.navigate(Routes.NAV_LOGIN_VERIFY_SCREEN, { phoneNumber: countryCode+phoneNumber,screen: SIGNUP})
        }else if(status === apiStatus.failed){
            ShowToast(userDetails);
        }
    }, [status])

    const signupApiFunc = () => {
        
        if(Validations.verifyRequired(firstName)== true && 
            Validations.verifyRequired(countryCode)== true &&
            Validations.verifyRequired(phoneNumber)== true && 
            Validations.verifyRequired(email)== true){
            if(Validations.verifyEmail(email)== true && Validations.verifyPhone(phoneNumber)== true){
                dispatch(FetchSignupData({
                    phone: phoneNumber,
                    cc: countryCode,
                    name: firstName,
                    email: email
                  }))
            }else{
                 return false;
            }
             
         }else{
             ShowToast("Please fill all the fields");
         }
        
      }



    const textInputStyle = {
        colors: {
            placeholder: "#A1A1A1",
            text: "#000000",
            primary: "#A1A1A1",
            underlineColor: "transparent",
            background: "white",
        },
        fonts: {
            regular: {
                fontFamily: FontFamily.regular,
            },
        },
        roundness: 10,
    };
    const codePickerStyle = {
        // Styles for whole modal [View]
        modal: {
            backgroundColor: Theme.color.White,
            height: "70%",
        },
        // Styles for input [TextInput]
        textInput: {
            borderRadius: 10,
        },
    }
    
    return (
        <SafeAreaView style={styles.bodyContainer}>
            <View style={styles.mainView}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
                    <View>
                        <Image
                            style={styles.homeMenu}
                            source={leftarrow}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.signupText}>{"Sign up"}</Text>
                        <Text style={styles.signupdescText}>
                            {SIGNUP_TITLE}
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.afterinputContainer}>
                            <View>
                                <TextInput
                                    mode="outlined"
                                    label="Full Name"
                                    keyboardType="default"
                                    value={firstName}
                                    //fontSize={15}
                                    onChangeText={(firstName) => setfirstName(firstName)}
                                    right={<TextInput.Icon name={userIcon} size={15} />}
                                    theme={textInputStyle}
                                />
                                <View style={styles.height20px} />
                                <View style={styles.outcountrycodeView}>
                                    <TouchableOpacity
                                        style={styles.countrycodeView}
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
                                                setIsShow(true);
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
                                                setphoneNumber(phoneNumber)
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
                                    onChangeText={(email) => setemail(email.replace(/\s/g, ""))}
                                    right={<TextInput.Icon name={mailIcon} size={15} />}
                                    theme={textInputStyle}
                                />
                                <CountryCodePicker
                                    show={show}
                                    lang={"en"}
                                    style={codePickerStyle}
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
                                        //this.registerMember()
                                        //SimpleToast.show('Register Successfully!',SimpleToast.SHORT)
                                        //
                                        // console.log("Register", "Hii")
                                        signupApiFunc()
                                    }
                                    style={styles.touchOpacityView}
                                >
                                    <Text style={styles.touchOpacityText}>Submit</Text>
                                </TouchableOpacity>
                                <View style={styles.alreadyaccountView}>
                                    <Text style={styles.alreadyaccountText}>
                                        {ALREADY_TITLE}
                                        <Text
                                            style={{ textDecorationLine: "underline" }}
                                            onPress={() => navigation.navigate(Routes.NAV_LOGIN_SCREEN)}
                                        >
                                            {LOGIN}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.termsView}>
                            <Text style={styles.termsText}>
                                {AGREE_TITLE}
                                <Text
                                    style={{ textDecorationLine: "underline" }}
                                    onPress={() => "Coming soon"}
                                >
                                    {TERMS_CONDITIONS}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SignUpScreen;
