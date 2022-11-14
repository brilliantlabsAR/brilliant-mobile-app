
import {
    StyleSheet,
} from "react-native";
import { FontFamily, Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";


export const styles = StyleSheet.create({
    homeMenu: {
        width: 35,
        height: 20,
    },
    topView: {
        height: normalize(56),
        backgroundColor: Theme.color.White,
        marginLeft: normalize(15),
        flexDirection: 'row',
        alignItems: 'center'

    },
    topTextStyle: {
        fontSize: normalize(15),
        color: Theme.color.Black,
        fontFamily: FontFamily.regular
    },

})