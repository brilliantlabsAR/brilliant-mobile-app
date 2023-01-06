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