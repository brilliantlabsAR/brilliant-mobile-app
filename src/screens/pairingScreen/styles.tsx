import {
  StyleSheet,
  Dimensions
} from "react-native";
import { FontFamily, Theme } from "../../models/themes";
import { normalize } from "../../utils/dimentionUtils";
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({

  bodyContainer: {
    backgroundColor: Theme.color.White,
    flex: 1,
  },
  middleView: {
    height: '100%',
    marginTop: normalize(10),
    backgroundColor: Theme.color.White,
  },
  verifyText: {
    color: Theme.color.Black,
    fontSize: 30,
    fontStyle: 'normal',
    flexDirection: 'row',
    fontWeight: 'bold',
    fontFamily: FontFamily.bold
  },
  headingContainer: {
    flexDirection: 'row',
    width: normalize(150),
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: 'auto',
  },
  phoneNumberText: {
    paddingLeft: 20,
    marginTop: normalize(20),
    color: Theme.color.Black,
    fontSize: 15,
    fontStyle: 'normal',
    flexDirection: 'row',
    fontFamily: FontFamily.regular
  },
  bleImageStyle: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
    marginStart: 10
  },
  monocleImageContainer: {
    alignItems: 'center',
    width: '100%'
  },
  monocleImage: {
    height: normalize(150),
    width: normalize(150),
    resizeMode: 'contain',
    marginTop: normalize(40)
  },
  arrowStyle: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
    marginVertical: normalize(15)
  },
  arrowStyleSecond: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
    marginTop: normalize(15)
  },
  phoneImage: {
    height: normalize(190),
    width: normalize(190),
    resizeMode: 'contain',
  },
  skipTextContainer: {
    position: 'absolute',
    bottom: normalize(110)
  },
  skipText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    fontFamily: FontFamily.light
  }
})