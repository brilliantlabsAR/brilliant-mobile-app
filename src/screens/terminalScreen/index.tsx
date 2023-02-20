import React, { useState, useEffect, useRef } from "react";
import {
  View,
  BackHandler,
  NativeEventEmitter,
  NativeModules,
  Keyboard,
  Platform,
  Alert,
  PermissionsAndroid,
  requireNativeComponent,
  ScrollView,
  Linking
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import BleManager from 'react-native-ble-manager';
import { stringToBytes } from "convert-string";
import base64 from 'react-native-base64';
import Buffer from '@craftzdog/react-native-buffer';
import * as RNFS from 'react-native-fs';
import * as mainDao from '../../database';
import { DateTime } from "luxon";

import { WebView } from 'react-native-webview';
import { TerminalScreenNavigationProps } from "../../navigations/types";
import { BluetoothConst, LOGIN, PAIRING, WELCOME } from "../../models";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
// import * as mainDao from '../../database';
import { AssetType, AssetStatus, DevicePairingStatus, REPL_ENDPOINT } from "../../models";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDevicePairingStatus } from "../../redux/appSlices/pairingStatusSlice";
import RNExitApp from "react-native-exit-app";
import { Loading } from "../../components/loading";
import { useFocusEffect } from "@react-navigation/native";

type Props = TerminalScreenNavigationProps

let webProp: any = null;

if (Platform.OS === "android") {
  const MyCW = requireNativeComponent('CustomWebView');
  webProp = { 'component': MyCW }
} else {
  webProp = {}
}

const TerminalScreen = (props: Props) => {
  const { navigation, route } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bleFileName, setbleFileName] = useState<string>("");
  const [imageArray, setImageArray] = useState<any[]>([]);
  const [webViewHeight, setWebViewHeight] = useState<any>("100%")
  const [currentUrl, setCurrentUrl] = useState<string>(REPL_ENDPOINT);
  const peripheralId = useAppSelector((state): string => String(state.pairing.peripheralId));
  const pairingStatus = useAppSelector((state) => state.pairing.status);
  const dispatch = useAppDispatch();
  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
  const webViewRef: any = useRef(null);

  const insertDataToDb = async (
    type: AssetType,
    fileName: string,
    filePath: string
  ) => {
    mainDao.connectDatabase();
    let result = await mainDao.CreateAsset(AssetStatus.Transferred, type, fileName, filePath)
    if (result != null) {
      console.log('fetch Result', JSON.stringify(result));
    }
  }

  const keyboardHideListener = Keyboard.addListener('keyboardDidHide', (e) => {
    // console.log("keyboard show");
    webViewRef?.current?.injectJavaScript(` replConsole.blur();`);
  });

  useEffect(() => {
    if (Platform.OS == 'android') {
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
      setTimeout(() => {
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
          .then(async () => {
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
        })
      }, 4000)
    } else {
      BleManager.start({ showAlert: false }).then(() => {
        // Success code
        console.log("Module initialized");
      });
    }

    // bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    // bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
    // bleManagerEmitter.addListener('BleManagerStopScan', () => { console.log("scan stopped in terminal ") });
    // bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);

  }, [])

  const reCallListeners = () => {
    bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
    bleManagerEmitter.removeAllListeners('BleManagerDidUpdateValueForCharacteristic');
    bleManagerEmitter.removeAllListeners('BleManagerStopScan');
    bleManagerEmitter.removeAllListeners('BleManagerDisconnectPeripheral');

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
    bleManagerEmitter.addListener('BleManagerStopScan', () => { console.log("scan stopped in terminal ") });
    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
  }

  const handleUpdateValueForCharacteristic = (data: any) => {
    if (data.characteristic != "e5700003-7bac-429a-b4ce-57ff900f479d") {
      // console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic);
      console.log('Received data from Device-----> ' + String.fromCharCode.apply(String, data.value));
      let receiveData = String.fromCharCode.apply(String, data.value);
      sendMessage(receiveData);
      console.log('----------------------------------END');
    } else {
      if (data.value[0] >= 0 && data.value[0] <= 2) {
        if (data.value[0] == 0) {
          setImageArray([])
          let fileSize = data.value[5];
          let dataArray = data.value.slice(fileSize + 6);
          let file_name = String.fromCharCode.apply(String, data.value.slice(6, fileSize + 6))
          setbleFileName(file_name)
          // imageArray.push(...dataArray);
          setImageArray(dataArray)
        } else {
          let dataArray = data.value.slice(1);
          // imageArray.push(...dataArray);
          setImageArray(oldArray => [...oldArray, ...dataArray])
        }

        if (data.value[0] == 2) {
          const z = new Uint8Array(imageArray);
          console.log('Uint8Array-----> ', z);

          const buffer = Buffer.Buffer.from(imageArray)
          console.log("buffer >> " + buffer) //[161,52]  
          let imageBase = base64.encodeFromByteArray(z, Uint8Array);

          console.log('ARRAY PUSH IMAGE BASE-----> ', imageBase);
          var base64Icon = 'data:image/png;base64,' + imageBase;
          const myAlbumPath = RNFS.PicturesDirectoryPath + '/brilliant'
          const path = myAlbumPath + '/' + DateTime.now().toUnixInteger() + '.png'

          RNFS.mkdir(myAlbumPath)
            .then(() => {
              console.log("Success Copy mkdr")

              RNFS.writeFile(path, imageBase, 'base64').then(() => {
                console.log("Success Copy")
                insertDataToDb(AssetType.Image, DateTime.now().toUnixInteger() + '.png', myAlbumPath + "/")
                setImageArray([])
              })
            })
        }
      }
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

  const requestMTU = async function (peripheralID: any) {
    BleManager.requestMTU(peripheralID, Math.floor(Math.random() * 100) + 100)
      .then((mtu) => {
        // Success code
        console.log("MTU size changed to " + mtu + " bytes");
        BleManager.retrieveServices(peripheralID).then(async (peripheralData) => {
          await BleManager.startNotification(peripheralID, BluetoothConst.nordicUartServiceUuid, BluetoothConst.uartTxCharacteristicUuid).then(() => {
            console.log('Start notification: ');
            webViewRef?.current?.injectJavaScript(`onConnectRepl();true;`);
          }).catch(async () => {
            console.log("Notification error");
            await startScan();
          });
        }).catch(async () => {
          console.log("Retrive error");
          await startScan();
        })
      }).catch((error) => {
        // Failure code
        console.log("MTU error ", error);
        BleManager.retrieveServices(peripheralID).then(async (peripheralData) => {
          await BleManager.startNotification(peripheralID, BluetoothConst.nordicUartServiceUuid, BluetoothConst.uartTxCharacteristicUuid).then(() => {
            console.log('Start notification: ');
            webViewRef?.current?.injectJavaScript(`onConnectRepl();true;`);
          }).catch(async () => {
            console.log("Notification error");
            await startScan();

          });
        }).catch(async () => {
          console.log("Retrive error");
          await startScan();
        })
      });
  }

  const connectRetriveNotify = async (peripheralID: any, deviceName: string) => {
    var startNotification = false
    await BleManager.connect(peripheralID).then(async () => {
      console.log('Connected to ' + peripheralID);
      console.log('Device Name ' + deviceName);
      console.log(deviceName + " is connected!");
      dispatch(setDevicePairingStatus({ status: DevicePairingStatus.Paired, id: peripheralID as string }));
      if (currentUrl == REPL_ENDPOINT + PAIRING) {
        // bluetoothDataWrite("\x02", peripheralId);
        webViewRef?.current?.injectJavaScript(`pairingDone();true;`);
      }
      if (currentUrl == REPL_ENDPOINT) {
        if (Platform.OS === 'ios') {
          BleManager.retrieveServices(peripheralID).then(async (peripheralData) => {
            await BleManager.startNotification(peripheralID, BluetoothConst.nordicUartServiceUuid, BluetoothConst.uartTxCharacteristicUuid).then(() => {
              console.log('Start notification: ');
              webViewRef?.current?.injectJavaScript(`onConnectRepl();true;`);
            }).catch(async () => {
              console.log("Notification error");
              await startScan();

            });
          }).catch(async () => {
            console.log("Retrive error");
            await startScan();
          })
        } else {
          setTimeout(async () => {
            await requestMTU(peripheralID)
          }, 2000)

        }

      }

    }).catch(async (err) => {
      console.log("connect error", err);
      await startScan()
    })
  }

  const handleDisconnectedPeripheral = async (data: any) => {
    if (webViewRef) {
      webViewRef.current?.injectJavaScript(`appBleDisconnected();true;`);
    }
    if (currentUrl == REPL_ENDPOINT + PAIRING || currentUrl == REPL_ENDPOINT) {
      await connectRetriveNotify(peripheralId, "MONOCLE");
    }
  }

  /** Go to media **/
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

  const onMessageCallBack = (event: any) => {
    console.log(event.nativeEvent.data)
    console.log("pairing status", DevicePairingStatus.Paired);

    if (pairingStatus == DevicePairingStatus.Paired && peripheralId) {
      bluetoothDataWrite(event.nativeEvent.data, peripheralId)
    } else {
      // console.log("Okkkk")
      handleDisconnectedPeripheral(null)
    }
  }

  const sendMessage = (data: string) => {
    // data = String(data).replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\x1B/g, "\\x1B")
    console.log("response", data)
    let final_data = ` uartStringDataHandler(decodeURI("${encodeURI(data)}")); true;`;
    webViewRef?.current?.injectJavaScript(final_data);
  }

  const disconnectBle = () => {
    bluetoothDataWrite("\x04", peripheralId);
  }

  const checkConnection = async () => {
    BleManager.isPeripheralConnected(
      peripheralId,
      []
    ).then(async (isConnected) => {
      console.log("------------connected-----", isConnected)
      if (!isConnected) {
        await startScan()
      } else {
        await connectRetriveNotify(peripheralId, "MONOCLE");
        // webViewRef?.current?.injectJavaScript(` onConnectRepl();true;`);
      }
    }).catch(async (err) => {
      await startScan()
    })
  }

  const startScan = async () => {
    await BleManager.scan([BluetoothConst.nordicUartServiceUuid, BluetoothConst.rawDataServiceUuid], 5, true).then((res) => {
      // Success code
      console.log("Scan started--->" + res);
      // setScanning(true);
    });
  }

  const bluetoothDataWrite = (data: any, peripheralId: any) => {

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
    })
      .catch((error) => {
        // Failure code
        handleDisconnectedPeripheral(null)
        console.log("write data failure", error);
      });
  }


  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={{ ...styles.topView, "height": webViewHeight, borderBottomColor: "red" }}>
        <WebView
          source={{ uri: REPL_ENDPOINT + WELCOME }}
          ref={webViewRef}
          onMessage={onMessageCallBack}
          scrollEnabled={true}
          // incognito={true}
          overScrollMode={"never"}
          onError={(err) => {
            console.log("error check", err);
          }}
          onLoadEnd={() => {
            setIsLoading(false)
          }}
          cacheMode={'LOAD_NO_CACHE'}
          startInLoadingState={true}
          nativeConfig={webProp}
          renderLoading={() => <Loading />}

          onNavigationStateChange={async (nativeEvent) => {
            console.log("url", nativeEvent);
            // currentUrl = nativeEvent.url
            setCurrentUrl(nativeEvent.url);
            reCallListeners();
            if (currentUrl == REPL_ENDPOINT + PAIRING && !nativeEvent.loading) {
              await BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
                console.log("Connected peripherals: " + peripheralsArray.length);
              });
              await startScan()
            } else if (currentUrl == REPL_ENDPOINT && !nativeEvent.loading) {
              checkConnection()
            } else if (currentUrl == REPL_ENDPOINT + LOGIN && !nativeEvent.loading) {
              disconnectBle()
            }
          }}
          onShouldStartLoadWithRequest={(request) => {
            // Only allow navigating within this website
            if (request.url.includes("github.com/brilliantlabsAR")) {
              Linking.openURL(request.url);
              return false;
            }
            if (request.url.includes(REPL_ENDPOINT) || request.url.includes('discord') || request.url.includes('github.com')) {
              return true;
            } else {
              Linking.openURL(request.url)
              return false;
            }
          }}
        />
      </View>
    </SafeAreaView>
  )
}
export default TerminalScreen;