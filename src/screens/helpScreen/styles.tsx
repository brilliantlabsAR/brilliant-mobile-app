import {
    StyleSheet,
    Dimensions
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
    }, topView: {
        height: normalize(56),
        backgroundColor: Theme.color.White,
        marginTop: normalize(0),
        marginLeft: normalize(25),
        flexDirection: 'row'

    }, backButtonStyle: {
        marginTop: normalize(10)
    }, headerTextStyle: {
        fontSize: normalize(15),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular,
        marginTop: normalize(10),
        marginLeft: normalize(5)
    },middleView:{
        backgroundColor: Theme.color.White,
        flex: 1,
        marginLeft: normalize(20),
        marginRight: normalize(20)
    },lowerView:{
        backgroundColor: Theme.color.White,
        flex: 1,
        marginLeft:normalize(10),
        marginRight:normalize(10)
    },contentTextStyle:{
        fontSize: normalize(14),
        marginTop: 10,
        color: Theme.color.Black,
        fontFamily: FontFamily.regular
    },progressBarStyle:{ 
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        right: 0, 
        left: 0, 
        backgroundColor: Theme.color.transparent }
})