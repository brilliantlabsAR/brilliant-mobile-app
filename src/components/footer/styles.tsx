import {
    StyleSheet,
    Dimensions
} from "react-native";
import { Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";

const { width, height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
    bodyContainer: {
        backgroundColor: Theme.color.White,
        flex: 1,
        flexDirection: 'column'
    }, homeMenu: {
        width: 25,
        height: 25,
    }, topView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: normalize(60),
        backgroundColor: Theme.color.White,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: normalize(20),
        borderTopLeftRadius: normalize(20),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    }, mediaButtonStyle:
    {
        width: width / 3,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: normalize(20),
        borderTopColor: Theme.color.WhiteFive,
        borderBottomColor: Theme.color.White,
        borderLeftColor: Theme.color.WhiteFive,
        borderRightColor: Theme.color.White,
        borderWidth: 0.5,
        paddingBottom: normalize(7)
    },
    mediaScreenView:
    {
        height: normalize(20),
        width: normalize(20)
    },
    iconView:
    {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    mediaTextStyle:{
        fontFamily: 'ApercuProRegular',
        fontSize: normalize(10),
        marginTop: normalize(5)
    },liveButtonStyle:{
        width: width / 3,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: normalize(7),
        borderTopColor: Theme.color.WhiteFive,
        borderBottomColor: Theme.color.White,
        borderLeftColor: Theme.color.White,
        borderRightColor: Theme.color.White,
        borderWidth: 0.5,
    },
    liveTextStyle:
    {
        fontFamily: 'ApercuProRegular',
        fontSize: normalize(10),
        marginTop: normalize(5)
    },
    accountButtonStyle:{
        width: width / 3,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: normalize(20),
        borderTopColor: Theme.color.WhiteFive,
        borderBottomColor: Theme.color.White,
        borderLeftColor: Theme.color.White,
        borderRightColor: Theme.color.WhiteFive,
        borderWidth: 0.5,
        paddingBottom: normalize(7)
    },
    accountTextStyle:{
        fontFamily: 'ApercuProRegular',
        fontSize: normalize(10),
        marginTop: normalize(5)
    }

})