import { StyleSheet } from "react-native";
import { FontFamily, Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";

export const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: Theme.color.White,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  homeMenu: {
    width: 25,
    height: 25,
  },
  topView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Theme.color.White,
  },
  animatedView: {
    flex: 1,
    marginHorizontal: normalize(25),
    justifyContent: "center",
    alignContent: "center",
  },
  signUpTextStyle: {
    marginStart: normalize(5),
    color: Theme.color.Black,
    fontSize: normalize(28),
    fontStyle: "normal",
    flexDirection: "row",
    fontFamily: FontFamily.bold,
    fontWeight: "bold",
  },
  broadCastText: {
    marginStart: normalize(5),
    marginTop: normalize(20),
    color: Theme.color.Black,
    fontSize: normalize(14),
    fontStyle: "normal",
    flexDirection: "row",
    fontFamily: FontFamily.regular,
    lineHeight: normalize(25),
  },
  middleView: {
    marginTop: normalize(30),
  },
  signUpTouchableView: {
    borderRadius: normalize(50),
    backgroundColor: "#000000",
    height: normalize(50),
    alignItems: "center",
    justifyContent: "center",
    activeOpacity: 0.6,
    marginBottom: normalize(20),
  },
  middleSignUpText: {
    fontSize: normalize(16),
    color: Theme.color.White,
    fontStyle: "normal",
    borderRadius: normalize(25),
    fontFamily: FontFamily.light,
  },
  signInText: {
    marginTop: normalize(5),
    alignContent: "center",
    alignItems: "center",
    borderRadius: normalize(50),
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderWidth: normalize(2),
    height: normalize(50),
    justifyContent: "center",
    activeOpacity: 0.6,
  },
  loginText: {
    fontSize: normalize(16),
    color: Theme.color.Black,
    fontStyle: "normal",
    borderRadius: 25,
    fontFamily: FontFamily.light,
  },
  termsText: {
    fontSize: normalize(13),
    color: Theme.color.Black,
    fontFamily: FontFamily.regular,
    textAlign: "center",
    marginTop: normalize(30),
    textDecorationLine: "underline",
  },
});
