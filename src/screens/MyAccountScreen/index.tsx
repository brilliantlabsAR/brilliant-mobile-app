import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  BackHandler,
  ScrollView,
  Alert,
  Linking
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccountNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
import { Loading } from "../../components/loading";
import {
  userIcon,
  menuBluetooth,
  updateDevice,
  menuLicence,
  menuData,
  menuHelp,
  hamburgerIcon,
} from "../../assets";
import { STRINGS, BluetoothConst } from "../../models";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchMyAccountData } from "../../redux/appSlices/myAccountSlice";
import { apiStatus } from "../../redux/apiDataTypes";
import { cleanStorageItem } from "../../utils/asyncUtils";
import { resetOTPData } from "../../redux/authSlices/otpVerifySlice";
import { resetLogin } from "../../redux/authSlices/loginSlice";
import { resetResendData } from "../../redux/authSlices/otpResendSlice";
import { setDevicePairingStatus } from "../../redux/appSlices/pairingStatusSlice";
import { DevicePairingStatus } from "../../models";
import { CustomModal } from "../../components/customModal";
import BleManager from 'react-native-ble-manager';
import { stringToBytes } from "convert-string";
import openApp from '../../components/appLInking'

const MyAccountScreen = (props: AccountNavigationProps) => {
  const { navigation } = props;
  const [fullName, setFullName] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [isFirmwareModalVisible, setIsFirmwareModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.myAccountSlice.status);
  const userDetails = useAppSelector((state) => state.myAccountSlice.userData);
  const pairingStatus: DevicePairingStatus = useAppSelector(
    (state) => state.pairing.status
  );
  const peripheralId = useAppSelector((state): string => String(state.pairing.peripheralId));


  useEffect(() => {
    // console.log(peripheralId, '   --->', pairingStatus, "------>", DevicePairingStatus.Paired);
    setShowLoading(true);
    dispatch(FetchMyAccountData());
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  useEffect(() => {
    if (status === apiStatus.success) {
      setShowLoading(false);
      // console.log("data-->", userDetails);
      // console.log("data-->2", userDetails.name);
      setFullName(userDetails.name);
      AsyncStorage.setItem("name", userDetails.name);
      AsyncStorage.setItem("phone", userDetails.phone);
      AsyncStorage.setItem("email", userDetails.email);

    } else if (status === apiStatus.failed) {
      setShowLoading(false);
    }
  }, [status]);

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

  const bluetoothDataWrite = (data: any, peripheralId: any) => {
    console.log("peripheralId", peripheralId);

    console.log('Start write data---->', data);
    BleManager.write(
      peripheralId,
      BluetoothConst.nordicUartServiceUuid,
      BluetoothConst.uartRxCharacteristicUuid,
      stringToBytes(data),
      256
    ).then((readData) => {
      // Success code
      console.log('write:---> ' + readData);
      if (data == "import device;device.update('')") {
        Alert.alert("Ready for update")
      }
    })
      .catch((error) => {
        // Failure code
        // Alert.alert("Bluetooth write failure")
        console.log("write data failure", error);
      });
  }

  const logout = () => {
    Alert.alert(STRINGS.ALERT, STRINGS.ALERT_LOGOUT, [
      {
        text: STRINGS.CANCEL,
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: STRINGS.OK,
        onPress: async () => {
          dispatch(resetLogin());
          dispatch(resetOTPData());
          dispatch(resetResendData());
          cleanStorageItem().then(() => {
            navigation.replace(Routes.NAV_SPLASH_SCREEN);
          });
        },
      },
    ]);
  };

  const handleMonoclePairing = async () => {
    if (pairingStatus === DevicePairingStatus.Paired) {
      BleManager.disconnect(peripheralId as string)
        .then(() => {
          // Success code
          console.log("Disconnected-->");
        })
        .catch((error) => {
          // Failure code
          console.log(error);
        });
      dispatch(setDevicePairingStatus({ status: DevicePairingStatus.Unpaired, id: undefined }));
    }
    setIsFirmwareModalVisible(false);
    navigation.replace(Routes.NAV_TERMINAL_SCREEN);
  };

  const handleFirmware = () => {
    if (pairingStatus == DevicePairingStatus.Paired && peripheralId) {

      // bluetoothDataWrite("\x02", peripheralId)

      setTimeout(() => {
        bluetoothDataWrite("import update;update.micropyton() \r\n", peripheralId);
        openApp({ url: "nRFConnect", appStoreId: "1054362403", playMarketId: 'no.nordicsemi.android.mcp', name: 'nRFConnect' })
      }, 2000);
    } else {
      Alert.alert("Bluetooth disconnected")
    }
  };

  const modalClose = () => {
    setIsFirmwareModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => { navigation.navigate(Routes.NAV_TERMINAL_SCREEN) }}
          style={styles.menuIconContainer}>
          <Image
            style={styles.menuIcon}
            source={hamburgerIcon}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <ScrollView style={styles.firstScrollView}>
          <Text style={styles.nameText}>{fullName}</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.menuBox}
            onPress={() =>
              navigation.navigate(Routes.NAV_UPDATE_PROFILE_SCREEN)
            }
          >
            <Image
              style={styles.itemIcon}
              source={userIcon}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>{STRINGS.UPDATE_PROFILE}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.menuBox}
            onPress={() => {
              handleFirmware();
            }}
          >
            <Image
              style={styles.itemIcon}
              source={updateDevice}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>{STRINGS.UPDATE_DEVICE_FIRMWARE}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.menuBox}
            onPress={() => {
              Linking.openURL('http://brilliantmonocle.com/terms')
            }}
          >
            <Image
              style={styles.itemIcon}
              source={menuLicence}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>{STRINGS.LICENSE}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.menuBox}
            onPress={() => {
              Linking.openURL('http://brilliantmonocle.com/privacy')
            }}
          >
            <Image
              style={styles.itemIcon}
              source={menuData}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>{STRINGS.PRIVACY}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.menuBox}
            onPress={() => {
              Linking.openURL('https://docs.brilliantmonocle.com/')
            }}
          >
            <Image
              style={styles.itemIcon}
              source={menuHelp}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>{STRINGS.HELP}</Text>
          </TouchableOpacity>

          {showLoading ? <Loading /> : null}
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => logout()}
          style={styles.logoutView}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* {isFirmwareModalVisible && ( */}
        <CustomModal
          modalVisible={isFirmwareModalVisible}
          modalVisibleOff={modalClose}
        >
          <View style={styles.modalView}>
            <Text style={styles.textView}>{STRINGS.FIRMWARE_UPDATE_PAIR}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonView} onPress={modalClose}>
                <Text style={styles.btnTextView}>{STRINGS.CLOSE}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonView} onPress={handleMonoclePairing}>
                <Text style={styles.btnTextView}>{STRINGS.PAIR_NOW}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CustomModal>
        {/* )} */}
      </View>
    </SafeAreaView>
  );
};

export default MyAccountScreen;
