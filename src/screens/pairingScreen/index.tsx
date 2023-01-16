import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  NativeModules,
  NativeEventEmitter,
  PermissionsAndroid,
  BackHandler,
  Alert,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BleManager, { stopScan } from 'react-native-ble-manager';
import { stringToBytes } from "convert-string";
import NetInfo from '@react-native-community/netinfo';
import { normalize } from "../../utils/dimentionUtils";
import { AssetStatus, AssetType, DevicePairingStatus } from "../../models";
import { PairingNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
import { BLE_icon, downArrow, monocleImage, phone, upArrow } from "../../assets";
import { STRINGS } from "../../models/constants";
import { ShowToast } from "../../utils/toastUtils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDevicePairingError, setDevicePairingStatus } from "../../redux/appSlices/pairingStatusSlice";
import { TopBar } from "../../components/topBar";
import { UIActivityIndicator } from 'react-native-indicators';
import base64 from 'react-native-base64';
import Buffer from '@craftzdog/react-native-buffer';
import * as RNFS from 'react-native-fs';
import * as mainDao from '../../database';
import { DateTime } from "luxon";
import RNExitApp from 'react-native-exit-app';

const peripherals = new Map();

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
let concatData: any = '';
const PairingScreen = (props: PairingNavigationProps) => {
  const { navigation } = props;
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [imageIcon, setImageIcon] = useState<string>("");
  const [peripheralId, setPeripheralID] = useState<string>("");
  const [peripheralName, setPeripheralName] = useState<string>("");
  const [scanning, setScanning] = useState<boolean>(false);
  const [deviceFound, setDeviceFound] = useState<boolean>(false);
  const [devices, setDevices] = useState<any[]>([]);
  const [imageArray] = useState<any[]>([]);
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

  const skipPairing = () => {
    navigation.navigate(Routes.NAV_MEDIA_SCREEN);
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


      BleManager.start({ showAlert: false }).then(() => {
        // Success code
        console.log("Module initialized");
      });
      BleManager.checkState();

      if (Platform.OS == 'ios') {
        setTimeout(() => {
          connectedDevice();
        }, 1000);
      } else {
        setTimeout(() => {
          connectedDevice();
        }, 3000);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const insertDataToDb = async (
    type: AssetType,
    fileName: string,
    filePath: string
  ) => {
    mainDao.connectDatabase();
    let result = await mainDao.CreateAsset(AssetStatus.Transferred, type, fileName, filePath)
    if (result != null) {
      await console.log('fetch Result', JSON.stringify(result));
      setShowLoading(false);
      navigation.replace(Routes.NAV_MEDIA_SCREEN);
    }
  }

  async function connectedDevice() {
    try {
      let nordicUartServiceUuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
      let rawDataServiceUuid = "e5700001-7bac-429a-b4ce-57ff900f479d";

      await BleManager.scan([nordicUartServiceUuid, rawDataServiceUuid], 5, true).then((res) => {
        // Success code
        console.log("Scan started--->" + res);
        setScanning(true);

      });
      await BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        // Success code
        console.log("Connected peripherals: " + peripheralsArray.length);
      });

      bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
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
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    { console.log('Name---->', peripheral.name) }
    { console.log('Name-IOS--->', peripheral.advertising.localName) }
    if (Platform.OS == 'android') {
      if (peripheral.name === "FRAME" || peripheral.name === "Frame" || peripheral.name === "Monocle") {
        peripherals.set(peripheral.id, peripheral);
        console.log('handleDiscoverPeripheral----->', Array.from(peripherals.values()));
        setDevices(Array.from(peripherals.values()))
        setDeviceFound(true);
        setPeripheralName(peripheral.name);
        console.log("peripheral id here", peripheral.id);
        // console.log("connected or not", connected);
        testPeripheral(peripheral);
      } else {
        setDeviceFound(false);
      }
    } else {
      if (peripheral.advertising.localName === "FRAME" || peripheral.advertising.localName === "Frame" || peripheral.advertising.localName === "Monocle") {
        peripherals.set(peripheral.id, peripheral);
        console.log('handleDiscoverPeripheral----->', Array.from(peripherals.values()));
        setDevices(Array.from(peripherals.values()))
        setDeviceFound(true);
        testPeripheral(peripheral);
      } else {
        setDeviceFound(false);
      }
    }
  }

  const handleUpdateValueForCharacteristic = (data: any) => {
    //console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic);
    console.log('Received data from Device IMAGE DEMO-----> ' + data.value);
    console.log('Received data from Device Length-----> ', data.value.length);
    let array = [];
    if (data.value[0] >= 0 && data.value[0] <= 2) {
      if (data.value[0] == 0) {
        let fileSize = data.value[5];
        let dataArray = data.value.slice(fileSize + 6);
        console.log('DATATA', dataArray);
        imageArray.push(...dataArray);
      } else {
        let dataArray = data.value.slice(1);
        imageArray.push(...dataArray);
      }

      if (data.value[0] == 2) {
        const z = new Uint8Array(imageArray);
        console.log('Uint8Array-----> ', z);

        const buffer = Buffer.Buffer.from(imageArray)
        console.log("buffer >> " + buffer) //[161,52]  
        let imageBase = base64.encodeFromByteArray(z, Uint8Array);

        console.log('ARRAY PUSH IMAGE BASE-----> ', imageBase);
        var base64Icon = 'data:image/png;base64,' + imageBase;
        setImageIcon(base64Icon);
        const myAlbumPath = RNFS.PicturesDirectoryPath + '/brilliant'
        const path = myAlbumPath + '/' + DateTime.now().toUnixInteger() + '.png'

        RNFS.mkdir(myAlbumPath)
          .then(() => {
            console.log("Success Copy mkdr")

            RNFS.writeFile(path, imageBase, 'base64').then(() => {
              console.log("Success Copy")
              insertDataToDb(AssetType.Image, DateTime.now().toUnixInteger() + '.png', myAlbumPath + "/")
            })
          }
          )
      }
      console.log('ARRAY PUSH-----> ', data.value[0]);
    }

    console.log('Received data from Device-----> ' + String.fromCharCode.apply(String, data.value));
    console.log('Received array data from Device-----> ' + imageArray);

    var receiveData = String.fromCharCode.apply(String, data.value);
    concatData = concatData + receiveData;//OK1

    if (receiveData.includes('OKIMPORT')) {
      console.log("ok response coming");
      dataWrite("camera.capture() \nprint('SCAN') \x04", data.peripheral)
      //dataWrite("WiFi.clear() \nprint('SCAN') \x04", data.peripheral)
    } else if (receiveData.includes("OKSCAN")) {
      console.log("ok scan response coming");
      console.log('Receive data---->', data.value);
    } else if (receiveData.includes("OKADD")) {
      setTimeout(() => {
        console.log("Wait for 3 sec");
        dataWrite("p=WiFi.status() \nprint('STATUS') \nprint(p)\x04", data.peripheral)
        ShowToast("Device connected successfully");
      }, 5000);
    } else if (receiveData.includes('OKSTATUS')) {
      dataWrite("p=WiFi.list() \nprint('LIST') \nprint(p)\x04", data.peripheral)

    } else {
      console.log("ok response not coming");
    }
    console.log('----------------------------------END');

  }

  const handleStopScan = () => {
    console.log('Scan is stopped');
    setScanning(false);
  }
  const startScan = () => {
    let nordicUartServiceUuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
    let rawDataServiceUuid = "e5700001-7bac-429a-b4ce-57ff900f479d";

    BleManager.scan([nordicUartServiceUuid, rawDataServiceUuid], 5, true).then((res) => {
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

  const framePairing = async (peripheral: any) => {
    if (peripheral) {
      await BleManager.connect(peripheral.id).then(async () => {
        setPeripheralID(peripheral.id);
        let p = peripherals.get(peripheral.id);
        if (p) {
          p.connected = true;
          peripherals.set(peripheral.id, p);
          setDevices(Array.from(peripherals.values()))
        }
        console.log('Connected to ' + peripheral.id);
        console.log('Device Name ' + peripheral.name);
        BleManager.isPeripheralConnected(
          peripheral.id,
          []
        ).then((isConnected) => {
          if (isConnected) {
            // setConnected(true);
            console.log("Frame is connected!");
            ShowToast(STRINGS.FRAME_CONNECTED);
          }
        });
        BleManager.requestMTU(peripheral.id, 256)
          .then((mtu) => {
            // Success code
            console.log("MTU size changed to " + mtu + " bytes");
            BleManager.retrieveServices(peripheral.id).then(async (peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);
              var service = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
              var UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'
              var readUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'

              let nordicUartServiceUuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
              let uartRxCharacteristicUuid = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
              let uartTxCharacteristicUuid = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

              let rawDataServiceUuid = "e5700001-7bac-429a-b4ce-57ff900f479d";
              let rawDataRxCharacteristicUuid = "e5700002-7bac-429a-b4ce-57ff900f479d";
              let rawDataTxCharacteristicUuid = "e5700003-7bac-429a-b4ce-57ff900f479d";
              await BleManager.startNotification(peripheral.id, rawDataServiceUuid, rawDataTxCharacteristicUuid).then(() => {
                console.log('Start notification: ONE ');

              })
              await BleManager.startNotification(peripheral.id, nordicUartServiceUuid, uartTxCharacteristicUuid).then(() => {
                console.log('Start notification: ');

                setTimeout(() => {    //1st Command
                  console.log("1st Command");

                  dataWrite("\x03", peripheral.id);

                  setTimeout(() => {//2nd Command
                    console.log("2nd Command");

                    dataWrite("\x01", peripheral.id);

                  }, 3000);

                  setTimeout(() => {//3rd Command
                    console.log("3rd Command \\x04");
                    dataWrite("import camera \nprint('IMPORT')\x04", peripheral.id);
                  }, 4000);
                }, 5000);

              }).catch(() => {
                console.log("Notification error");
              });

            }).catch(() => {
              console.log("Retrive error");
            })
          })
          .catch((error) => {
            // Failure code
            console.log("MTU error ", error);
          });

      }).catch(() => {
        // ShowToast("Device not connected")
        console.log("Device not connected");
        dispatch(setDevicePairingError(DevicePairingStatus.PairingError));
      });
    }
  }

  const testPeripheral = async (peripheral: any) => {
    console.log("peripheral", peripheral.id);

    if (peripheral) {
      if (peripheral.name == 'Monocle' || peripheral.name == 'MONOCLE') {
        await BleManager.connect(peripheral.id).then(async () => {
          setPeripheralID(peripheral.id);
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            setDevices(Array.from(peripherals.values()))
          }
          console.log('Connected to ' + peripheral.id);
          console.log('Device Name ' + peripheral.name);
        })

        BleManager.isPeripheralConnected(
          peripheral.id,
          []
        ).then((isConnected) => {
          if (isConnected) {
            console.log("Monocle is connected!");
            ShowToast(STRINGS.MONOCLE_CONNECTED);
            dispatch(setDevicePairingStatus({ status: DevicePairingStatus.Paired, id: peripheral.id as string }));
            setTimeout(() => {
              setShowLoading(false);
              navigation.replace(Routes.NAV_MEDIA_SCREEN);
            }, 2000);
          }
        });
      }
    }

    if (peripheral.name == 'Frame' || peripheral.name == 'FRAME') {
      if (Platform.OS === "android") {
        BleManager.createBond(peripheral.id)
          .then(async () => {
            console.log("createBond success or there is already an existing one");
            setPeripheralID(peripheral.id);
            framePairing(peripheral)
          }).catch(() => {
            console.log("fail to bond");
          });
      } else {
        framePairing(peripheral)
      }
    }
  }

  const dataWrite = (data: any, peripheralId: any) => {
    var service = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
    var UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'
    var readUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'

    console.log('Start write data---->', data);
    BleManager.write(
      peripheralId,
      service,
      UUID,
      stringToBytes(data),
      256
    )
      .then((readData) => {
        // Success code
        console.log('write:---> ' + readData);
      })
      .catch((error) => {
        // Failure code
        console.log("write data failure", error);
      });
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