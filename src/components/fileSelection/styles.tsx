import { StyleSheet } from "react-native";
import { Theme, FontFamily } from "../../models";
import { normalize } from "../../utils/dimentionUtils";

export const styles = StyleSheet.create({
  fileWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    width: 270,
    paddingVertical: 10,
    backgroundColor: Theme.color.graySeven,
    borderRadius: 10,
  },

  textLabel: {
    fontFamily: FontFamily.regular,
    color: Theme.color.darkGray,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: normalize(13),
    textAlign: 'center',
    marginBottom: 5
  },
  fileLabel: {
    fontFamily: FontFamily.regular,
    color: Theme.color.darkGray,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: normalize(13),
    textAlign: 'center',
  }
})

