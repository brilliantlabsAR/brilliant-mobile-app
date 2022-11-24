import { StyleSheet } from "react-native";
import { Theme, FontFamily } from "../../models";

export const styles = StyleSheet.create({
  version: {
    fontFamily: FontFamily.regular,
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: Theme.color.darkGray
  },
})