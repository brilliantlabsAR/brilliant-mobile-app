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
    }, homeMenu: {
        width: 35,
        height: 20,
    },
    topView: {
        height: normalize(56),
        backgroundColor: Theme.color.White,
        marginLeft: normalize(15),
        flexDirection: 'row',
        alignItems: 'center'

    },
    topTextStyle: {
        fontSize: normalize(15),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular
    },
    spaceView: {
        backgroundColor: Theme.color.Black,
        height: 0.2,
        width: '100%',

    },
    textInputView:
    {
        marginTop: normalize(30),
        backgroundColor: Theme.color.White,
        paddingBottom: 20,
        flex: 1,
        marginLeft: normalize(20),
        marginRight: normalize(20)
    },
    countryCodeView: {
        flexDirection: 'row',
        width: '100%',
        marginTop: normalize(20)
    },
    countryCodeOpen: {
        width: '28%',
        height: normalize(47),
        backgroundColor: Theme.color.White,
    }, smallViewSpace:
    {
        width: '2%',
        backgroundColor: Theme.color.White,
    },
    mediumViewSpace: {
        width: '70%',
        backgroundColor: Theme.color.White,
    }, updateButtonStyle:
    {
        alignItems: 'center',
        backgroundColor: Theme.color.Black,
        height: normalize(40),
        borderRadius: normalize(50),
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        marginBottom: normalize(20)
    },
    updateText:
    {
        fontSize: 16,
        color: Theme.color.White,
        fontStyle: 'normal',
        borderRadius: 25,
        fontWeight: '400',
        fontFamily: FontFamily.regular

    },
    marginTop: {
        marginTop: normalize(20)
    }
})