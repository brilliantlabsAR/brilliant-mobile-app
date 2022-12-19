import {
    StyleSheet,
} from "react-native";
import { FontFamily, Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";


export const styles = StyleSheet.create({
    bodyContainer: {
        backgroundColor: Theme.color.White,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    // homeMenu: {
    //     width: 25,
    //     height: 25,
    // },
    // topView: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     backgroundColor: Theme.color.White
    // },
    // animatedView: {
    //     flex: 1,
    //     marginHorizontal: normalize(25),
    //     justifyContent: 'center',
    //     alignContent: 'center'
    // },
    // signUpTextStyle: {
    //     marginStart: normalize(5),
    //     color: Theme.color.Black,
    //     fontSize: normalize(30),
    //     fontStyle: 'normal',
    //     flexDirection: 'row',
    //     fontFamily: FontFamily.bold
    // },
    // liveStreamingText: {
    //     marginStart: normalize(5),
    //     color: Theme.color.Black,
    //     fontSize: normalize(30),
    //     fontStyle: 'normal',
    //     flexDirection: 'row',
    //     fontFamily: FontFamily.bold

    // },
    // broadCastText: {
    //     marginStart: normalize(5),
    //     marginTop: normalize(20),
    //     color: Theme.color.Black,
    //     fontSize: normalize(15),
    //     fontStyle: 'normal',
    //     flexDirection: 'row',
    //     fontFamily: FontFamily.regular
    // },
    // middleView: {
    //     marginTop: normalize(30),
    // },
    // signUpTouchableView: {
    //     borderRadius: normalize(100),
    //     backgroundColor: '#000000',
    //     height: normalize(50),
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     activeOpacity: 0.6
    // },
    // middleSignUpText: {
    //     fontSize: normalize(16),
    //     color: Theme.color.White,
    //     fontStyle: 'normal',
    //     borderRadius: normalize(25),
    //     fontFamily: FontFamily.light

    // },
    // signInText:
    // {
    //     marginTop: normalize(5),
    //     alignContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: normalize(100),
    //     backgroundColor: '#FFFFFF',
    //     borderColor: '#000000',
    //     borderWidth: normalize(2),
    //     height: normalize(50),
    //     justifyContent: 'center',
    //     activeOpacity: 0.6
    // },
    // loginText: {
    //     fontSize: 16,
    //     color: Theme.color.Black,
    //     fontStyle: 'normal',
    //     borderRadius: 25,
    //     fontFamily: FontFamily.light

    // },
    // brilliantTextSmall: {
    //     fontSize: 15,
    //     flex: 1,
    //     position: 'absolute',
    //     color: Theme.color.White,
    //     alignSelf: 'center',
    //     backgroundColor: Theme.color.DeepBlue
    // },
    // brillientTextBig: {
    //     color: Theme.color.Black,
    //     fontSize: normalize(25),
    //     letterSpacing: 10,
    //     position: 'absolute',
    //     alignSelf: 'center'
    // },

    textWrapper: {
        marginStart: normalize(5),
        marginBottom: normalize(100)
    },
    welcomeTextStyle: {
        color: Theme.color.Black,
        fontSize: normalize(28),
        fontStyle: 'normal',
        fontFamily: FontFamily.bold,
        fontWeight: 'bold'
    },
    broadCastText: {
        marginTop: normalize(18),
        color: Theme.color.Black,
        fontSize: normalize(14),
        fontStyle: 'normal',
        fontFamily: FontFamily.regular,
        width: normalize(250),
        lineHeight: normalize(25)
    },
    monocleImage: {
        height: normalize(200),
        width: normalize(180),
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 0,
        right: 0
    },
})