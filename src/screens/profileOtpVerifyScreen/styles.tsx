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
    },
    verifyButtonText: {
        fontSize: 16,
        color: Theme.color.White,
        fontStyle: 'normal',
        borderRadius: 25,
        fontFamily: FontFamily.regular

    },
    otpContainerStyle: {
        marginTop: 20
    },
    otpViewContainer: {
        marginLeft: 10,
        marginRight: 10,
    }
})