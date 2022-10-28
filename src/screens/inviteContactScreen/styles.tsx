import {
    StyleSheet,
    Dimensions
} from "react-native";
import { Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";


export const styles = StyleSheet.create({
    bodyContainer: {
        backgroundColor: Theme.color.White,
        flex: 1,
        flexDirection: 'column'
    }, homeMenu: {
        width: normalize(13),
        height: normalize(13),
        justifyContent: 'center'
    }, userImage: {
        justifyContent: 'center',
        position: 'relative',
        height: normalize(20),
        width: normalize(20),

        borderColor: Theme.color.White,

    }, placeholder: {
        width: 55,
        height: 55,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        justifyContent: 'center',
    }, txt: {
        fontSize: 18,
    }, topView: {
        height: normalize(40),
        backgroundColor: Theme.color.White,
        flexDirection: 'row'
    }, backButtonStyle: {
        marginLeft: normalize(20),
        marginTop: normalize(10)
    },headerText:{
        fontSize: normalize(15),
        color: Theme.color.Black,
        marginLeft: normalize(10),
        fontFamily: 'ApercuProRegular',
        marginTop: normalize(7)
    },viewSpace:{
        backgroundColor: Theme.color.Black,
        height: 0.2
    },viewTop:{
        backgroundColor: Theme.color.White,
        flex: 1,
        flexDirection: 'column',
        marginTop: normalize(10)

    },insideScroll:{
        marginLeft: normalize(15),
        marginRight: normalize(15),
    },searchContactView:{
        backgroundColor: Theme.color.gray14,
        opacity: 0.9,
        height: normalize(30),
        width: '100%',
        borderRadius: normalize(12),
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },searchTextInput:{
        fontSize: normalize(10),
        color: Theme.color.gray12,
        fontFamily: 'ApercuProRegular',
        marginLeft: normalize(5),
        flex: 5,
    },searchInconView:{
        justifyContent: 'flex-end',
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginRight: normalize(15)
    },searchImage:{
        height: normalize(10),
        width: normalize(10),
    },inviteTouch:{
        marginTop: normalize(20),
        marginLeft: normalize(15),
        marginRight: normalize(15),
    },shareViewTop:{
        flexDirection: 'row',
        flex: 1,
    },shareView:{
        height: normalize(40),
        width: normalize(40),
        padding: normalize(10),
        borderRadius: normalize(180 / 2),
        backgroundColor: Theme.color.Black,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },shareLinkText:{
        fontSize: normalize(12),
        color: Theme.color.Black,
        fontFamily: 'ApercuProLight',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: normalize(15)
    },contactListText:{
        fontSize: normalize(12),
        color: Theme.color.Black,
        opacity: 0.5,
        fontFamily: 'ApercuProLight',
        marginTop: normalize(20),
        marginLeft: normalize(15),
        marginRight: normalize(15),
    },noConttact:{
        fontSize: normalize(12),
        color: Theme.color.Black,
        fontFamily: 'ApercuProLight',
        marginTop: normalize(20),
        alignItems: 'center',
        alignSelf: 'center'
    },topListView:{
        flexDirection: 'row',
        flex: 1,
        height: normalize(60),
        marginLeft: normalize(15),
        marginRight: normalize(15),
    },middleView:{
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },listNameView:{
        marginTop: normalize(15),
        marginLeft: normalize(20),
        flexDirection: 'column'
    },listNameText:{
        fontSize: normalize(12),
        color: Theme.color.Black,
        fontFamily: 'ApercuProRegular',
    },numberView:{
        marginTop: normalize(5),
    },numberText:{
        fontSize: normalize(12),
        color: Theme.color.gray12,
        fontFamily: 'ApercuProRegular',

    },viewLine:{
        height: 1,
        width: "100%",
        backgroundColor: Theme.color.gray13,
    }

})