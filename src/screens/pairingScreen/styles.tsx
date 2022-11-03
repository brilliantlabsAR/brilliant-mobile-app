import {
    StyleSheet,
    Dimensions
} from "react-native";
import { FontFamily, Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({

    bodyContainer: {
        backgroundColor: Theme.color.White,
        flex: 1,
        flexDirection: 'column'
    },
    mainContainer: {
        backgroundColor: Theme.color.White,
        flexDirection: 'column',
        flex: 1,
        marginLeft: normalize(20),
        marginRight: normalize(20)
    },
    mainContainer2: {
        backgroundColor: Theme.color.White
    },
    marginTopView: {
        marginTop: normalize(5)
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        marginLeft: normalize(20),
        marginRight: normalize(20),
        borderRadius: normalize(20)
    },
    insideModalView: {
        flexDirection: 'column'
    },
    height15: {
        height: normalize(15)
    },
    submitButtonView: {
        alignItems: 'center',
        borderRadius: normalize(80),
        backgroundColor: '#000000',
        height: normalize(40),
        marginTop: normalize(10),
        justifyContent: 'center'
    },
    submitText: {
        fontSize: 16,
        color: Theme.color.White,
        fontStyle: 'normal',
        fontFamily: FontFamily.regular
    },
    TouchableView: {
        backgroundColor: Theme.color.LightBlue,
        borderRadius: normalize(10),
    },
    TouchableStyle: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    TouchableText: {
        fontSize: normalize(12),
        fontFamily: FontFamily.regular,
        color: Theme.color.White,
        padding: normalize(10),
    },
    itemSeparatorView: {
        height: 1,
        width: "100%",
        backgroundColor: Theme.color.gray13,
    },
    renderItemMainView: {
        flexDirection: 'row',
        height: normalize(60),
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.color.White
    },
    renderItemView: {
        marginLeft: normalize(10),
        flexDirection: 'column',
        flex: 3,
    },
    renderItemText: {
        fontSize: normalize(14),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular,
    },
    renderItemText2: {
        fontSize: normalize(12),
        color: Theme.color.gray12,
        fontFamily: FontFamily.regular,
    },
    connectTouchView: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    connectView: {
        backgroundColor: Theme.color.blackOne,
        borderRadius: normalize(10),
    },
    connectText: {
        fontSize: normalize(12),
        textAlign: 'center',
        fontFamily: FontFamily.regular,
        color: Theme.color.White,
        padding: normalize(10)
    },
    pairTitleView: {
        marginTop: normalize(50),
    },
    pairTitle: {
        marginStart: 5,
        color: Theme.color.Black,
        fontSize: 30,
        fontStyle: 'normal',
        flexDirection: 'row',
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: FontFamily.bold
    },
    circularProgressView: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: "center",
        marginTop: normalize(50)
    },
    imageView: {
        height: normalize(180),
        width: normalize(180)
    },
    ensureText: {
        fontSize: normalize(14),
        color: Theme.color.Black,
        marginTop: normalize(40),
        fontFamily: FontFamily.regular,
    }

})