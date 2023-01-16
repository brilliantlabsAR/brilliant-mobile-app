import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  Image
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "./styles";
import { STRINGS } from "../../models/constants";
import { RootStackParamList } from "../../navigations";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Routes from "../../models/routes";
import * as mainDao from '../../database';
import { startImage } from "../../assets";

const windowHeight = Dimensions.get('window').height;

type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SplashScreen"
>;

const SplashScreen = ({ navigation }: SplashScreenProps) => {

  useEffect(() => {
    setTimeout(() => {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
          if (result) {
            console.log("ACCESS_FINE_LOCATION Permission is OK");
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
              if (result) {
                console.log("ACCESS_FINE_LOCATION User accept");
              } else {
                console.log("User refuse");
              }
            });
          }
        });
      }
    }, 2000);
    mainDao.connectDatabase();
    mainDao.executeSql(mainDao.createAssetsTableQuery, []);
    AsyncStorage.getItem('userId').then((userId) => {
      if (userId === null) {
        setTimeout(() => {
          navigation.replace(Routes.NAV_LETS_GO_SCREEN)
        }, 4000);
      } else {
        setTimeout(() => {
          navigation.replace(Routes.NAV_APP)
        }, 4000);
      }
    })
  }, [])


  useEffect(() => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
        if (result) {
          console.log("ACCESS_FINE_LOCATION Permission is OK");
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
            if (result) {
              console.log("ACCESS_FINE_LOCATION User accept");
            } else {
              console.log("User refuse");
            }
          });
        }
      });
    }
  }, []);

  return (
    <SafeAreaView
      style={styles.bodyContainer}>
      <View style={styles.textWrapper}>
        <Text style={styles.welcomeTextStyle}>{STRINGS.WELCOME}</Text>
        <Text style={styles.broadCastText}>{STRINGS.WELCOME_TEXT}</Text>
      </View>
      <Image source={startImage} style={styles.monocleImage} />
    </SafeAreaView >
  );
};
export default SplashScreen;


