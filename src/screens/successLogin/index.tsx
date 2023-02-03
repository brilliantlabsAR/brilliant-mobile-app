import React, { useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { Theme, STRINGS } from "../../models";
import { styles } from "./styles";
import { SuccessLoginNavigationProps } from '../../navigations/types';
import * as Routes from "../../models/routes";

const SuccessLogin = (props: SuccessLoginNavigationProps) => {
  const { navigation } = props;
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
  }, [])

  /** EXIT APP **/
  const handleBackButton = () => {
    Alert.alert(
      'Alert',
      'Are you sure you want to exit',
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: 'OK', onPress: () => { BackHandler.exitApp() } },
      ],
      { cancelable: true, }
    );
    return true;
  }


  return (
    <SafeAreaView
      style={styles.bodyContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.color.White} />
      <View style={styles.container}>
        <View style={styles.successTextContainer}>
          <Text style={styles.successTitle}>{STRINGS.SUCCESS_TEXT}</Text>
          <Text style={styles.successText}>{STRINGS.SUCCESS_LOGIN}</Text>
        </View>
        <View style={styles.navigateContainer}>
          <TouchableOpacity activeOpacity={0.6}
            onPress={() =>
              navigation.replace(Routes.NAV_PAIRING_SCREEN)
            }
          >
            <View style={styles.textContainer}>
              <Text style={styles.testStyle} >{STRINGS.OK}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SuccessLogin;