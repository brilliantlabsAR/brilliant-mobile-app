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
    mainContainer: {
        height: '70%',
        width: '80%',
        backgroundColor: Theme.color.White,
        marginHorizontal: normalize(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpDescText: {
        fontSize: normalize(14),
        color: Theme.color.Black,
        textAlign: "left",
        fontFamily: FontFamily.regular,
        paddingBottom: normalize(20)
    },
    inputContainer: {
        backgroundColor: Theme.color.White,
        height: normalize(50),
        width: normalize(250),
        justifyContent: 'center',
        borderRadius: normalize(50),
    },
    loginBtn: {
        backgroundColor: '#000000',
        height: normalize(46),
        width: normalize(250),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: normalize(50),
        marginTop: normalize(30)
    },
    loginTextStyle: {
        fontSize: 16,
        color: Theme.color.White,
        fontStyle: 'normal',
        borderRadius: 25,
        fontWeight: '400',
        fontFamily: FontFamily.light

    },
})