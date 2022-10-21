import {
    StyleSheet,
} from "react-native";
import { Theme } from "../../models/themes";
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
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Theme.color.White
    },
    animatedView: {
        flex: 1,
        marginHorizontal: normalize(25),
        justifyContent: 'center',
        alignContent: 'center'
    },
    signUpTextStyle: {
        marginStart: normalize(5),
        color: Theme.color.Black,
        fontSize: normalize(30),
        fontStyle: 'normal',
        flexDirection: 'row',
        fontFamily: 'ApercuProBold'
    },
    liveStreamingText: {
        marginStart: normalize(5),
        color: Theme.color.Black,
        fontSize: normalize(30),
        fontStyle: 'normal',
        flexDirection: 'row',
        fontFamily: 'ApercuProBold'

    },
    broadCastText: {
        marginStart: normalize(5),
        marginTop: normalize(20),
        color: Theme.color.Black,
        fontSize: normalize(15),
        fontStyle: 'normal',
        flexDirection: 'row',
        fontFamily: 'ApercuProRegular'
    },
    middleView: {
        marginTop: normalize(30),
    },
    signUpTouchableView: {
        borderRadius: normalize(100),
        backgroundColor: '#000000',
        height: normalize(50),
        alignItems: 'center',
        justifyContent: 'center',
        activeOpacity: 0.6
    },
    middleSignUpText: {
        fontSize: normalize(16),
        color: Theme.color.White,
        fontStyle: 'normal',
        borderRadius: normalize(25),
        fontFamily: 'ApercuProLight'

    },
    signInText:
    {
        marginTop: normalize(5),
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(100),
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: normalize(2),
        height: normalize(50),
        justifyContent: 'center',
        activeOpacity: 0.6
    },
    loginText: {
        fontSize: 16,
        color: Theme.color.Black,
        fontStyle: 'normal',
        borderRadius: 25,
        fontFamily: 'ApercuProLight'

    },
    brilliantTextSmall: {
        fontSize: 15,
        flex: 1,
        position: 'absolute',
        color: Theme.color.White,
        alignSelf: 'center',
        backgroundColor: Theme.color.DeepBlue
    },
    brillientTextBig: {
        color: Theme.color.Black,
        fontSize: normalize(25),
        letterSpacing: 10,
        position: 'absolute',
        alignSelf: 'center'
    }


})