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
    homeMenu: {
        width: 25,
        height: 25,
    },
    flatView: {
        height: normalize(92),
        borderRadius: 2,
    },
    userImage: {
        height: normalize(90),
        width: normalize(95),
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    topView: {
        backgroundColor: Theme.color.White,
        flex: 1,
        flexDirection: 'column',
        marginLeft: normalize(15),
        marginRight: normalize(15),
        marginTop: normalize(10)
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        color: Theme.color.Black,
        fontSize: 16,
        fontStyle: 'normal',
        flexDirection: 'row',
        fontFamily: FontFamily.regular
    },
    renderViewMiddle: {
        flex: 2,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: normalize(1)
    },
    playButtonView: {
        backgroundColor: Theme.color.White,
        opacity: 0.9,
        height: normalize(25),
        width: normalize(25),
        borderRadius: normalize(50 / 2),
        position: 'absolute',
        alignContent: 'center',
        justifyContent: "center",
        alignItems: 'center',
        bottom: 0,
        left: 0,
        marginLeft: normalize(5),
        marginBottom: normalize(5)
    },
    timeTextView: {
        position: 'absolute',
        alignContent: 'center',
        justifyContent: "center",
        alignItems: 'center',
        bottom: 0,
        right: 0,
        marginRight: normalize(5),
        marginBottom: normalize(5)
    },
    playButtonImage: {
        height: normalize(10),
        width: normalize(10)
    },
    footerButtonImage: {
        height: normalize(30),
        width: normalize(30),
    },
    footerLinearStyle: {
        position: 'absolute',
        left: normalize(250),
        right: 0,
        bottom: 10,
        zIndex: 1,
        elevation: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: normalize(50),
        height: normalize(50),
        borderRadius: normalize(25),
        backgroundColor: Theme.color.Black,
        borderColor: Theme.color.Black,
        borderWidth: 2,
    },
    brilliantTextBig: {
        color: Theme.color.Black,
        fontSize: normalize(15),
        letterSpacing: 5,
        alignSelf: 'center'
    },
    marginTopFlatList: {
        marginTop: normalize(10)
    },
    ItemText: {
        fontSize: normalize(10),
        color: Theme.color.White,
        fontFamily: FontFamily.regular,
    }
})