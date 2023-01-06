import { StyleSheet } from "react-native";
import { FontFamily, Theme } from "../../models";
import { normalize } from "../../utils/dimentionUtils";

export const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: Theme.color.White,
    flex: 1,
  },
  container: {
    padding: normalize(20)
  },
  styledHeader: {
    fontFamily: FontFamily.regular,
    fontWeight: '600',
    fontSize: 34,
    lineHeight: 47,
    color: Theme.color.darkGray,
    letterSpacing: -2.64,
    textAlign: 'left',
  },
  wrapperButtons: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Theme.color.White,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingVertical: 20,
  },
  componentActionText: {
    fontWeight: '400',
    paddingTop: 20,
    paddingBottom: 5,
  },
  actionTextStyle: {
    fontFamily: FontFamily.regular,
    fontStyle: 'normal',
    fontSize: normalize(13),
    lineHeight: 20,
    color: Theme.color.Black,
    paddingLeft: normalize(20)
  },
  actionTextSecond: {
    fontWeight: '400',
    paddingTop: 15,
    paddingBottom: 5,
  },
  actionTextBold: {
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 5,
  },
  actionTextLines: {
    fontWeight: '400',
    paddingBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  }
})

