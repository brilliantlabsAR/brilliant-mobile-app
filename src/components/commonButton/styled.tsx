import { StyleSheet } from "react-native";
import { Theme, FontFamily } from "../../models";
import { normalize } from "../../utils/dimentionUtils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    minWidth: 180,
    maxWidth: 250,
    backgroundColor: Theme.color.gray15,
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  label: {
    fontFamily: FontFamily.regular,
    color: Theme.color.darkGray,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: normalize(13),
    textAlign: 'center',
  }
})
