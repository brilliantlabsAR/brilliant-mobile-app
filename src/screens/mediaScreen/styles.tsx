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
        width: 25,
        height: 25,
    }, flatview: {
        height: normalize(92),
        borderRadius: 2,
    }, userImage: {
        height: normalize(90),
        width: normalize(95),
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    }, topView: {
        backgroundColor: Theme.color.White,
        flex: 1,
        flexDirection: 'column',
        marginLeft: normalize(15),
        marginRight: normalize(15),
        marginTop: normalize(10)

    }, scrollviewStyle: {
        backgroundColor: Theme.color.White,
        marginBottom: normalize(20),
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
    searchView: {
        backgroundColor: Theme.color.gray14,
        opacity: 0.9,
        height: normalize(30),
        width: '100%',
        borderRadius: normalize(12),
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',

    }, searchText: {
        fontSize: normalize(10),
        color: Theme.color.gray12,
        fontFamily: FontFamily.regular,
        marginLeft: normalize(5),
        flex: 5,
    }, searchIconView: {
        justifyContent: 'flex-end',
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginRight: normalize(15)
    }, searchIcon: {
        height: normalize(10),
        width: normalize(10),

    }, renderViewTop:
    {
        flexDirection: 'row',
        flex: 1
    }, renderViewMiddle: {
        flex: 2,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: normalize(1)
    }, playButtonView: {
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

    }, timeTextView: {
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
    textviewStyle: {
        flex: 3,
        marginTop: normalize(15),
        marginLeft: normalize(15),
        flexDirection: 'column'
    },
    textStyle: {
        fontSize: normalize(12),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular,

    }, calenderTopView: {
        marginTop: normalize(20),
        flexDirection: 'row'
    }, calenderIcon: {
        height: normalize(15),
        width: normalize(15),
    }, dateTextStyle: {
        fontSize: normalize(12),
        color: Theme.color.gray12,
        fontFamily: FontFamily.regular,
        marginLeft: normalize(5)
    }, moreButtonStyle: {
        flex: 0.3,
        marginTop: normalize(15)
    }, menuOptionView: {
        marginTop: normalize(-45),
        backgroundColor: Theme.color.White,
        borderRadius: normalize(5),
        width: normalize(120)
    }, menuView: {
        alignContent: 'center',
        marginLeft: normalize(7)
    }, menuText: {
        fontSize: normalize(12),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular,
        paddingTop: normalize(2),
        paddingBottom: normalize(2)
    }, menuSeparator: {
        backgroundColor: Theme.color.gray,
        height: normalize(0.5)
    }, menuViewOtion: {
        alignContent: 'center',
        marginLeft: normalize(7),
        paddingTop: normalize(5),
        paddingBottom: normalize(5)
    }, menuOptionText: {
        fontSize: normalize(12),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular

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
    }, brillientTextBig: {
        color: Theme.color.Black,
        fontSize: normalize(15),
        letterSpacing: 5,
        alignSelf: 'center'
    }, marginTopFlatList: {
        marginTop: normalize(10)
    }, wishImage: {
        height: normalize(20),
        width: normalize(20),
    }, ItemText: {
        fontSize: normalize(10),
        color: Theme.color.White,
        fontFamily: FontFamily.regular,

    }

})