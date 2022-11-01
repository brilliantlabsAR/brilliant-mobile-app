import {
    StyleSheet,
} from "react-native";
import { FontFamily, Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";


export const styles = StyleSheet.create({
    bodyContainer: {
        backgroundColor: Theme.color.White,
        flex: 1,
        flexDirection: 'column'
    },
    homeMenu: {
        width: 25,
        height: 25,
    },
    topView: {
        height: normalize(56),
        backgroundColor: Theme.color.White,
        justifyContent: 'center',
        marginTop: normalize(0),
        marginLeft: normalize(23)
    },
    middleView: {
        backgroundColor: Theme.color.White,
        flex: 1,
        flexDirection: 'column',
        marginLeft: 20,
        marginTop: 50

    },
    backgroundWhite: {
        backgroundColor: Theme.color.White,

    },
    verifyText: {
        marginStart: 5,
        color: Theme.color.Black,
        fontSize: 30,
        fontStyle: 'normal',
        flexDirection: 'row',
        fontFamily: FontFamily.bold

    },
    phoneNumberText: {
        marginStart: 5,
        marginTop: 10,
        color: Theme.color.Black,
        fontSize: 15,
        fontStyle: 'normal',
        flexDirection: 'row',
        fontFamily: FontFamily.regular
    },
    otpViewBox: {
        marginTop: 20,
        backgroundColor: Theme.color.White,
        paddingBottom: 20,
        marginRight: 25,
        borderRadius: 20
    },
    phoneBoxTwo: {
        flexDirection: 'row',
        flex: 1,
        width: '100%'
    },
    touchableCountryBox: {
        width: '28%',
        height: normalize(47),
        backgroundColor: Theme.color.White,
    },
    signUpView: {
        marginTop: normalize(20),
        alignContent: 'center',
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    dontSignUp: {
        fontSize: 13,
        color: Theme.color.Black,
        fontStyle: 'normal',
        fontFamily: 'Apercu Pro Medium'

    },
    loginButtonStyle: {
        marginTop: 40,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#000000',
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    loginTextStyle: {
        fontSize: 16,
        color: Theme.color.White,
        fontStyle: 'normal',
        borderRadius: 25,
        fontWeight: '400',
        fontFamily: FontFamily.light

    },
    marginView: {
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
    },
    timerView: {
        flexDirection: 'row',
        marginLeft: 20
    },
    timerText: {
        marginStart: 5,
        color: Theme.color.Black,
        fontSize: 13,
        fontStyle: 'normal',
        fontFamily: FontFamily.regular
    },
    timerImage: {
        height: 15,
        width: 15
    },
    resendView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20
    },
    resendText: {
        fontSize: 13,
        color: Theme.color.Black,
        fontStyle: 'normal',
        fontWeight: '300',
        textDecorationLine: 'underline',
        fontFamily: FontFamily.regular
    },
    verifyButtonStyle: {
        marginTop: 40,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: Theme.color.Black,
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    }, verifyButtonText: {
        fontSize: 16,
        color: Theme.color.White,
        fontStyle: 'normal',
        borderRadius: 25,
        fontFamily: FontFamily.regular

    },
    // marginTop: {
    //     marginTop: 10,
    // },
    otpContainerStyle: {
        marginTop: 20
    },
    otpViewContainer: {
        marginLeft: 10,
        marginRight: 10,
    }
    // textInputOutlineStyle: {
    //     colors: {
    //         placeholder: '#A1A1A1',
    //         text: '#000000', primary: '#A1A1A1',
    //         underlineColor: 'transparent',
    //         background: 'white',

    //     }, fonts: {
    //         regular: {
    //             fontFamily: 'Apercu Pro Regular'
    //         }
    //     },
    //     roundness: 10
    // }

})