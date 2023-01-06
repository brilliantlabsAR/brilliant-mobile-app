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
    mainContainer: {
        backgroundColor: Theme.color.White,
        flex: 1,
        flexDirection: 'column',
        margin: normalize(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollContainer: {
        backgroundColor: Theme.color.White,
    },
    headerContainer: {
        // marginRight: 25
    },
    signUpDescText: {
        fontSize: normalize(14),
        marginTop: normalize(10),
        color: Theme.color.Black,
        textAlign: "left",
        fontFamily: FontFamily.regular
    },
    inputContainer: {
        // marginRight: 25
    },
    afterInputContainer: {
        marginTop: normalize(20),
        backgroundColor: Theme.color.White,
        paddingBottom: 20,
        borderRadius: 20
    },
    termsView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    termsText: {
        fontSize: normalize(14),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular,
    },
    outCountrycodeView: {
        flexDirection: "row",
        flex: 1,
        width: "100%",
    },
    countryCodeView: {
        width: '28%',
        height: normalize(47),
        backgroundColor: Theme.color.White,
    },
    gape1: {
        width: "2%",
        backgroundColor: Theme.color.White,
    },
    gape2: {
        width: "70%",
        backgroundColor: Theme.color.White,
    },
    height20px: {
        height: 20
    },
    touchOpacityView: {
        marginTop: 40,
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#000000',
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    touchOpacityText: {
        fontSize: 16,
        color: Theme.color.White,
        fontStyle: 'normal',
        borderRadius: 25,
        fontWeight: '400',
        fontFamily: FontFamily.regular

    },
    alreadyAccountView: {
        marginTop: normalize(20),
        alignContent: 'center',
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    alreadyAccountText: {
        fontSize: 13,
        color: Theme.color.Black,
        fontStyle: 'normal',
        fontFamily: FontFamily.medium,
    }
})