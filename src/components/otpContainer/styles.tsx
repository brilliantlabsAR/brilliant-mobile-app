import {
  StyleSheet,
} from "react-native";
import { FontFamily, Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";

export const styles = StyleSheet.create({

  form: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    marginHorizontal: 4,
    fontSize: normalize(22),
    textAlign: 'center',
    alignContent: 'center',
    color: Theme.color.Black,
    backgroundColor: '#E2E2E7',
    fontFamily: FontFamily.regular,
    opacity: 0.8,
    borderRadius: 10,
    //paddingVertical: 12,
  },

})
