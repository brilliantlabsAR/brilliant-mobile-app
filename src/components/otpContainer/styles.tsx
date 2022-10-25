import {
    StyleSheet,
} from "react-native";
import { Theme } from "../../models/themes";
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
      backgroundColor: Theme.color.White,
      color: Theme.color.Black,
      fontFamily: 'Apercu Pro Regular',
      opacity: 0.8,
      //paddingVertical: 12,
    },
  
  })
  