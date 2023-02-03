import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StatusBar,
  View,
  Text,
  Platform,
  LogBox,
  TouchableOpacity,
  Image,
  NativeModules,
  NativeEventEmitter,
  PermissionsAndroid,
  BackHandler,
  Alert,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import BleManager, { stopScan } from 'react-native-ble-manager';
import { stringToBytes } from "convert-string";
import { normalize } from "../../utils/dimentionUtils";
import { BluetoothConst, DevicePairingStatus } from "../../models";
import { PairingNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
import { Loading } from '../../components/loading';
import { BLE_icon, downArrow, monocleImage, phone, upArrow } from "../../assets";
import { STRINGS } from "../../models/constants";
import { ShowToast } from "../../utils/toastUtils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDevicePairingError, setDevicePairingStatus } from "../../redux/appSlices/pairingStatusSlice";
import { TopBar } from "../../components/topBar";
import { UIActivityIndicator } from 'react-native-indicators';
import RNExitApp from 'react-native-exit-app';

const peripherals = new Map();

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
let concatData: any = '', importWIFI = 'from machine import WiFi';
const PairingScreen = (props: PairingNavigationProps) => {
  const { navigation } = props;
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [peripheralId, setPeripheralID] = useState<string>("");
  const [peripheralName, setPeripheralName] = useState<string>("");
  const [scanning, setScanning] = useState<boolean>(false);
  const [deviceFound, setDeviceFound] = useState<boolean>(false);
  const [devices, setDevices] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const pairingStatus: DevicePairingStatus = useAppSelector((state) => state.pairing.status);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    // setShowLoading(true);
    return () => {
      backHandler.remove();
    }
  })

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
        { text: 'OK', onPress: () => { Platform.OS == "ios" ? RNExitApp.exitApp() : BackHandler.exitApp() } },
      ],
      { cancelable: true, }
    );

    return true;
  }



  useEffect(() => {
    //mainDao.executeSql(mainDao.dropAssetsTableQrery, []);
    try {

      if (Platform.OS == 'android') {
        try {
          PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT]
          ).then((result) => {
            if (result['android.permission.BLUETOOTH_SCAN']
              && result['android.permission.BLUETOOTH_CONNECT'] === 'granted') {
              console.log('You can use the bluetooth');
              BleManager.enableBluetooth()
                .then(() => {
                  // Success code
                  console.log("The bluetooth is already enabled or the user confirm");
                })
                .catch((error) => {
                  // Failure code
                  console.log("The user refuse to enable bluetooth");
                });
            } else {
              console.log('Permission denied');
              return;
            }
          });

        } catch (err) {
          console.warn(err)
        }
        BleManager.enableBluetooth()
          .then(() => {
            // Success code
            console.log("The bluetooth is already enabled or the user confirm");
          })
          .catch((error) => {
            // Failure code
            console.log("The user refuse to enable bluetooth");
          });
      }



      BleManager.start({ showAlert: false }).then(() => {
        // Success code
        console.log("Module initialized");
      });
      BleManager.checkState();

      if (Platform.OS == 'ios') {
        setTimeout(() => {
          connectedDevice();
        }, 6000);
      } else {
        setTimeout(() => {
          connectedDevice();
        }, 3000);
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
      bleManagerEmitter.removeAllListeners('BleManagerDisconnectPeripheral');
      // bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
      //removeEventListner();  //whenever the component removes it will executes
    }
  }, []);

  const skipPairing = () => {
    navigation.navigate(Routes.NAV_APP);
  }


  async function connectedDevice() {
    try {
      await BleManager.scan([BluetoothConst.nordicUartServiceUuid, BluetoothConst.rawDataServiceUuid], 5, true).then((res) => {
        // Success code
        console.log("Scan started--->" + res);
        setScanning(true);

      });
      await BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        // Success code
        console.log("Connected peripherals: " + peripheralsArray.length);
      });



      bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      // bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
      bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
      bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
      bleManagerEmitter.addListener(
        "BleManagerCentralManagerWillRestoreState",
        ({ peripheral }) => {
          console.log(`IOS Received for characteristic-----> ${peripheral}`);
        }
      );
      bleManagerEmitter.addListener(
        "BleManagerDidUpdateNotificationStateFor",
        (peripheral) => {
          console.log(`IOS Received for characteristic-----> ${peripheral}`);
        }
      );

      bleManagerEmitter.addListener("BleManagerDidUpdateState", (args) => {
        // The new state: args.state
        console.log("Received for characteristic----->", args);

      });

    } catch (e) {
      console.log(e)
    }
  }

  const handleDiscoverPeripheral = (peripheral: any) => {
    if (peripheral.advertising.isConnectable && peripheral.rssi >= -70) {
      console.log('Got ble peripheral', peripheral);
    } else {
      return
    }
    peripheral.name = peripheral.name || 'NO NAME'

    // connect depending on frame or monocle
    if (String(peripheral.advertising.localName).toUpperCase() == "MONOCLE" || String(peripheral.name).toUpperCase() == "MONOCLE") {

      connectRetriveNotify(peripheral.id, "MONOCLE");

    } else if (String(peripheral.advertising.localName).toUpperCase() == "FRAME" || String(peripheral.name).toUpperCase() == "FRAME") {

      if (Platform.OS === "android") {
        BleManager.createBond(peripheral.id)
          .then(async () => {
            console.log("createBond success or there is already an existing one");
            await connectRetriveNotify(peripheral.id, "FRAME")
          }).catch(async (err) => {
            console.log("fail to bond", err);
            await startScan();
          });
      } else {
        connectRetriveNotify(peripheral.id, "FRAME");
      }

    }
  }

  const connectRetriveNotify = async (peripheralId: any, deviceName: string) => {
    await BleManager.connect(peripheralId).then(async () => {
      console.log('Connected to ' + peripheralId);
      console.log('Device Name ' + deviceName);
      console.log(deviceName + " is connected!");
      // ShowToast(STRINGS.MONOCLE_CONNECTED);
      dispatch(setDevicePairingStatus({ status: DevicePairingStatus.Paired, id: peripheralId as string }));
      if (deviceName == "MONOCLE") {
        navigation.replace(Routes.NAV_APP);
      }
      else if (deviceName == "FRAME") {
        BleManager.retrieveServices(peripheralId).then(async (peripheralData) => {

          // await BleManager.startNotification(peripheralID, rawDataServiceUuid, rawDataTxCharacteristicUuid).then(() => {
          //   console.log('Start notification: ONE ');

          // })
          await BleManager.startNotification(peripheralId, BluetoothConst.nordicUartServiceUuid, BluetoothConst.uartTxCharacteristicUuid).then(() => {
            console.log('Start notification: ');
            navigation.replace(Routes.NAV_APP);

          }).catch(async () => {
            console.log("Notification error");
            await startScan();

          });

        }).catch(async () => {
          console.log("Retrive error");
          await startScan();

        })
      }
    }).catch(async (err) => {
      console.log("connect error", err);
      await startScan()
    })
  }

  const handleStopScan = () => {
    console.log('Scan is stopped');
    setScanning(false);
  }
  const startScan = () => {
    // let nordicUartServiceUuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
    // let rawDataServiceUuid = "e5700001-7bac-429a-b4ce-57ff900f479d";

    BleManager.scan([BluetoothConst.nordicUartServiceUuid, BluetoothConst.rawDataServiceUuid], 5, true).then((res) => {
      // Success code
      console.log("Scan started--->" + res);
      setScanning(true);

    });

  }
  const handleDisconnectedPeripheral = (data: any) => {
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setDevices(Array.from(peripherals.values()))
    }
    console.log('Disconnected ID ' + data.id);
    console.log('Disconnected from ' + data.peripheral);
  }

  return (
    <SafeAreaView
      style={styles.bodyContainer}>
      <TopBar navigateTo={() => handleBackButton()} />
      <View style={styles.middleView}>
        <View style={styles.headingContainer}>
          <Text style={styles.verifyText}>{STRINGS.CONNECT}</Text>
          <Image source={BLE_icon} style={styles.bleImageStyle} />
        </View>
        <Text style={styles.phoneNumberText}>{STRINGS.CONNECT_TEXT}</Text>
        <View style={styles.monocleImageContainer}>
          <Image source={monocleImage} style={styles.monocleImage} />
          <Image source={downArrow} style={styles.arrowStyle} />
          {showLoading &&
            <UIActivityIndicator color='black' style={{ margin: normalize(20) }} />
          }
          <Image source={upArrow} style={styles.arrowStyleSecond} />
          <Image source={phone} style={styles.phoneImage} />
          <TouchableOpacity style={styles.skipTextContainer} onPress={() => skipPairing()}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
  )
};

export default PairingScreen;