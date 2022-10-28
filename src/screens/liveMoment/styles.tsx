import {
    StyleSheet,
    Dimensions
} from "react-native";
import { Theme } from "../../models/themes";
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
    }
})