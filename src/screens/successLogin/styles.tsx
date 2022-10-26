import { StyleSheet } from "react-native";
import { FontFamily, Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";


export const styles = StyleSheet.create({
    bodyContainer: {
        backgroundColor: Theme.color.White,
        flex: 1,
    },
    homeMenu: {
        width: 25,
        height: 25,
    },
    container: {
        backgroundColor: Theme.color.White,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    successTextContainer: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    successTitle: {
        marginStart: 5,
        color: Theme.color.Black,
        fontSize: 30,
        fontStyle: 'normal',
        flexDirection: 'row',
        alignSelf: 'center',
        fontFamily: FontFamily.regular
    },
    successText: {
        marginTop: 10,
        color: Theme.color.Black,
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '400',
        flexDirection: 'row',
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: FontFamily.regular
    },
    navigateContainer: {
        marginTop: normalize(20),
        backgroundColor: Theme.color.White,
        paddingBottom: normalize(20),
        borderRadius: normalize(20)
    },
    textContainer: {
        marginTop: 20,
        borderRadius: 80,
        backgroundColor: '#000000',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    testStyle: {
        fontSize: 16,
        color: Theme.color.White,
        fontStyle: 'normal',
        borderRadius: 25,
        paddingLeft: 50,
        paddingRight: 50,
        fontFamily: FontFamily.regular
    }
})
