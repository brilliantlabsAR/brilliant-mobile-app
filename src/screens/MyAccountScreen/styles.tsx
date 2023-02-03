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
        alignItems: 'center',
    },
    mainContainer: {
        height: '90%',
        width: '80%',
        backgroundColor: Theme.color.White,
    },
    menuIconContainer: {
        height: normalize(50),
        backgroundColor: Theme.color.White,
        marginTop: normalize(30),
        alignItems: "flex-end"
    },
    menuIcon: {
        height: normalize(25),
        width: normalize(25)
    },
    firstScrollView: {
        backgroundColor: Theme.color.White
    },
    nameText: {
        color: Theme.color.Black,
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontFamily: FontFamily.bold,
        paddingBottom: normalize(30)
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
    itemIcon: {
        height: normalize(15),
        width: normalize(15)
    },
    menuBox: {
        flexDirection: 'row',
        alignItems: 'center',
        height: normalize(50),
    },
    menuText: {
        fontSize: normalize(13),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular,
        alignItems: 'center',
        marginLeft: normalize(10)
    },
    logoutView: {
        alignItems: 'center',
        borderRadius: normalize(50),
        backgroundColor: Theme.color.White,
        borderColor: '#000000',
        height: normalize(46),
        borderWidth: normalize(1.3),
        justifyContent: 'center',
    },
    logoutText: {
        fontSize: normalize(14),
        color: Theme.color.Black,
        fontStyle: 'normal',
        borderRadius: normalize(25),
        fontFamily: FontFamily.regular

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