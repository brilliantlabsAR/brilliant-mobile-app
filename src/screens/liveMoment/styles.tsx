import {
    StyleSheet,
    Dimensions
} from "react-native";
import { FontFamily, Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";


export const styles = StyleSheet.create({
    bodyContainer: {
        backgroundColor: Theme.color.WhiteSix,
        flex: 1,
        flexDirection: 'column'
    }, homeMenu: {
        width: 25,
        height: 25,
    },
    imgCon: {},
    placeholder: {
        width: normalize(55),
        height: normalize(55),
        borderRadius: normalize(30),
        overflow: 'hidden',
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        justifyContent: 'center',
    }, txt: {
        fontSize: normalize(18),
        color: Theme.color.White
    }, userImage: {
        justifyContent: 'center',
        position: 'relative',
        height: normalize(20),
        width: normalize(20),
        borderColor: Theme.color.White,

    }, topView: {
        backgroundColor: Theme.color.WhiteSix,
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
    mapTopView: {
        backgroundColor: Theme.color.White,
        flex: 1,
    },

    container: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 50,
        borderRadius: 25,
        aspectRatio: 1,
        backgroundColor: 'white',
        opacity: 0.6,
    },
    contactListContainer: {
        flexDirection: 'row',
        flex: 1,
        height: normalize(60),
        marginLeft: normalize(15),
        marginRight: normalize(10)
    },
    profilePictureContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    profileImage: {
        height: normalize(55),
        width: normalize(55)
    },
    nameListContainer: {
        marginLeft: normalize(10),
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        flex: 4,
    },
    name: {
        fontSize: normalize(12),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular,
    },
    iconContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 0.5,
    },
    iconStyle: {
        height: normalize(15),
        width: normalize(15)
    },
    mediaLiveImage: {
        width: normalize(25),
        height: normalize(25)
    },
    bottomSheetContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: normalize(20),
        marginBottom: normalize(60),
        width: '100%',
        padding: normalize(10)
    },
    searchContainer: {
        backgroundColor: Theme.color.gray14,
        opacity: 0.9,
        height: normalize(30),
        width: '100%',
        borderRadius: normalize(15),
        flexDirection: 'row',
        // opacity: 0.4
        paddingVertical: normalize(5)

    },
    searchInput: {
        height: normalize(20),
        fontSize: normalize(10),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular,
        marginLeft: normalize(5),
        borderRadius: normalize(15),
        backgroundColor: Theme.color.gray14,
    },
    searchIconContainer: {
        justifyContent: 'flex-end',
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginRight: normalize(20)
    },
    searchIcon: {
        height: normalize(10),
        width: normalize(10),
    },
    inviteContactContainer: {
        flexDirection: 'row',
        height: normalize(30),
        alignItems: 'center',
        marginHorizontal: normalize(15),
        marginTop: normalize(15),
    },
    userIconContainer: {
        height: normalize(40),
        width: normalize(40),
        padding: normalize(10),
        borderRadius: normalize(180 / 2),
        backgroundColor: Theme.color.Black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inviteContactText: {
        fontSize: normalize(12),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: normalize(15)
    },
    contactList: {
        flex: 1,
        marginTop: 10,
        width: '100%'
    },
    headerStyle: {
        fontSize: normalize(12),
        color: Theme.color.Black,
        opacity: 0.5,
        fontFamily: FontFamily.regular,
        marginTop: normalize(20),
        marginLeft: normalize(15),
        marginRight: normalize(15),
    }
})