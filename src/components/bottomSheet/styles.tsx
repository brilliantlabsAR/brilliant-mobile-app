import { Dimensions, StyleSheet } from "react-native";
import { Theme } from "../../models";
import { normalize } from "../../utils/dimentionUtils";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT / (1.5),
        width: '100%',
        backgroundColor: Theme.color.White,
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 25,
    },
    lineWrapper: {
        width: "80%",
        height: normalize(30),
        backgroundColor: Theme.color.White,
        alignSelf: 'center',
    },
    line: {
        width: 75,
        height: 5,
        backgroundColor: Theme.color.gray,
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
    },
});