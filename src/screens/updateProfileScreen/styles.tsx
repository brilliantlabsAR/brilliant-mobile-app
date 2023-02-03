import {
  StyleSheet,
} from "react-native";
import { FontFamily, Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";


export const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: Theme.color.White,
    flex: 1,
    flexDirection: 'column'
  },
  textInputView: {
    marginTop: normalize(30),
    backgroundColor: Theme.color.White,
    paddingBottom: 20,
    flex: 1,
    marginLeft: normalize(20),
    marginRight: normalize(20)
  },

  updateButtonStyle: {
    alignItems: 'center',
    backgroundColor: Theme.color.Black,
    height: normalize(40),
    borderRadius: normalize(50),
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    marginBottom: normalize(20)
  },
  updateText: {
    fontSize: 16,
    color: Theme.color.White,
    fontStyle: 'normal',
    borderRadius: 25,
    fontWeight: '400',
    fontFamily: FontFamily.regular
  },
  marginTop: {
    marginTop: normalize(20)
  }
})