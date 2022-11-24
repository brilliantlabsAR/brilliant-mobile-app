import {
    StyleSheet,
    Dimensions
} from "react-native";
import { FontFamily, Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({

    bodyContainer: {
        backgroundColor: Theme.color.WhiteSeven,
        flex: 1,
        flexDirection: 'column'
    },
    mainContainer: {
        backgroundColor: Theme.color.WhiteSix,
        flex: 1,
        flexDirection: 'column',
    },
    firstScrollView: {
        backgroundColor: Theme.color.White
    },
    insideFirstScrollView: {
        flexDirection: 'row',
        flex: 1,
        height: normalize(100),
        backgroundColor: Theme.color.WhiteSeven,
    },
    profileImageView: {
        height: normalize(70),
        width: normalize(70),
        padding: normalize(10),
        borderRadius: normalize(180 / 2),
        backgroundColor: Theme.color.DeepBlue,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: normalize(15),
    },
    userImage: {
        justifyContent: 'center',
        position: 'relative',
        height: normalize(50),
        width: normalize(50),
        padding: normalize(10),
        borderRadius: normalize(180 / 2),
        borderColor: Theme.color.White,
    },
    userProfileImage: {
        alignSelf: 'center',
        height: normalize(75),
        width: normalize(75),
        borderRadius: normalize(170 / 2),
    },
    openModalTouch: {
        height: normalize(30),
        width: normalize(30),
        padding: normalize(10),
        borderRadius: normalize(100 / 2),
        backgroundColor: Theme.color.WhiteSix,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(65),
        marginLeft: normalize(60)
    },
    cameraImageView: {
        height: normalize(15),
        width: normalize(15),
    },
    nameText: {
        fontSize: normalize(15),
        color: Theme.color.Black,
        fontFamily: FontFamily.bold,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: normalize(20)
    },
    menuIcon: {
        height: normalize(20),
        width: normalize(20)
    },
    menuBox: {
        flexDirection: 'row',
        alignItems: 'center',
        height: normalize(50),
        marginLeft: normalize(20),
    },
    menuText: {
        fontSize: normalize(12),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular,
        alignItems: 'center',
        marginLeft: normalize(10)
    },
    logoutView: {
        marginBottom: normalize(70),
        alignItems: 'center',
        borderRadius: normalize(100),
        backgroundColor: Theme.color.White,
        borderColor: '#000000',
        height: normalize(40),
        borderWidth: normalize(1.3),
        marginLeft: normalize(25),
        marginRight: normalize(25),
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    logoutText: {
        fontSize: normalize(15),
        color: Theme.color.Black,
        fontStyle: 'normal',
        borderRadius: normalize(25),
        fontFamily: FontFamily.regular

    },
    heightView: {
        backgroundColor: 'transparent',
        height: normalize(60),
    },
    modalMainView: {
        alignSelf: 'center',
        backgroundColor: Theme.color.White,
        width: normalize(220),
        borderRadius: normalize(10)
    },
    modalText: {
        fontSize: normalize(12),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular,
        alignItems: 'center',
        marginLeft: normalize(10),
        textAlign: 'center'
    },
    modalBox: {
        flexDirection: 'row',
        alignItems: 'center',
        height: normalize(50),
        alignSelf: 'center'
    },
    modalHeight: {
        backgroundColor: Theme.color.grayEight,
        height: normalize(0.5),
    },
    footerButtonView: {
        position: 'absolute',
        left: normalize(250),
        right: 0,
        bottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        elevation: 20,
        //shadowColor: 'red',
    },
    footerButtonImage: {
        height: normalize(40),
        width: normalize(40),
    },
    footerLinearStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: normalize(50),
        height: normalize(50),
        borderRadius: normalize(25),
        backgroundColor: 'blue',
        borderColor: Theme.color.Black,
        borderWidth: 2,
    },
    // device firmware modal view
    modalView: {
        alignSelf: 'center',
        width: normalize(300),
        borderRadius: normalize(10),
        backgroundColor: Theme.color.White,
        padding: 35,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    textView: {
        fontFamily: FontFamily.regular,
        fontSize: normalize(15),
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 20,
        color: Theme.color.darkGray,
        marginBottom: 20,
        textAlign: 'center',
    },
    btnTextView: {
        color: Theme.color.Black,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonView: {
        borderRadius: 20,
        margin: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: Theme.color.gray15
    },

})