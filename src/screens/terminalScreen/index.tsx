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
  ScrollView
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
import { BluetoothConst } from "../../models";
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
      // setShowLoading(false);
      // navigation.replace(Routes.NAV_MEDIA_SCREEN);
    }
  }

  const keyboardHideListener = Keyboard.addListener('keyboardDidHide', (e) => {
    console.log("keyboard show");

    webViewRef?.current?.injectJavaScript(` replConsole.blur();`);
    // webViewRef?.current?.injectJavaScript(` replConsole.setAttribute("rows",20);`);

    // setWebViewHeight("100%")

  });
  // const keyboardShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
  // console.log(e)
  // webViewRef?.current?.injectJavaScript(` replConsole.setAttribute("rows",18);`);

  // setWebViewHeight(e.endCoordinates.screenY+100)
  // });

  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
  //     return true;
  //   });

  //   return () => {
  //     showSubscription.remove();
  //   };
  // }, [webViewRef]);

  useEffect(() => {
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
        .then(async () => {
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

    if (Platform.OS == 'ios') {
      setTimeout(() => {
        connectedDevice();
      }, 1000);
    } else {
      setTimeout(() => {
        connectedDevice();
      }, 3000);
    }
    // // bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
    // bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
    // // bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    // bleManagerEmitter.addListener('BleManagerStopScan', () => {
    //   console.log("scan stopped in terminal ");
    //   BleManager.getDiscoveredPeripherals().then((peripheralsArray) => {
    //     // Success code
    //     console.log("Discovered peripherals: " + peripheralsArray.length);
    //   });
    // });
    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDisconnectPeripheral');
      // bleManagerEmitter.removeAllListeners('BleManagerDidUpdateValueForCharacteristic');
      // Do something that should run on blur
    }
  }, [])

  async function connectedDevice() {
    try {
      await BleManager.scan([BluetoothConst.nordicUartServiceUuid, BluetoothConst.rawDataServiceUuid], 5, true).then((res) => {
        // Success code
        console.log("Scan started--->" + res);
      });
      await BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        // Success code
        console.log("Connected peripherals: " + peripheralsArray.length);
      });

      // bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      // bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
      bleManagerEmitter.addListener('BleManagerStopScan', () => { console.log("scan stopped in terminal ") });
      bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
    } catch (e) {
      console.log(e)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
      // bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
      bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      // bleManagerEmitter.addListener('BleManagerStopScan', () => { console.log("scan stopped in terminal ") });
      checkConnection()
      return () => {
        bleManagerEmitter.removeAllListeners('BleManagerDidUpdateValueForCharacteristic');
        // Do something that should run on blur
      }
    }, [])
  );

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

  const connectRetriveNotify = async (peripheralID: any, deviceName: string) => {
    await BleManager.connect(peripheralID).then(async () => {
      console.log('Connected to ' + peripheralID);
      console.log('Device Name ' + deviceName);
      console.log(deviceName + " is connected!");
      // ShowToast(STRINGS.MONOCLE_CONNECTED);
      dispatch(setDevicePairingStatus({ status: DevicePairingStatus.Paired, id: peripheralID as string }));
      BleManager.requestMTU(peripheralID, 300)
        .then((mtu) => {
          // Success code
          console.log("MTU size changed to " + mtu + " bytes");
          BleManager.retrieveServices(peripheralID).then(async (peripheralData) => {

            // await BleManager.startNotification(peripheralID, rawDataServiceUuid, rawDataTxCharacteristicUuid).then(() => {
            //   console.log('Start notification: ONE ');

            // })
            await BleManager.startNotification(peripheralID, BluetoothConst.nordicUartServiceUuid, BluetoothConst.uartTxCharacteristicUuid).then(() => {
              console.log('Start notification: ');
              setTimeout(() => {
                bluetoothDataWrite("\x02", peripheralID);
                webViewRef?.current?.injectJavaScript(` onConnectRepl();sendUartData("\x03");true;`);
                // connectionDone()
              }, 500);

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

            // await BleManager.startNotification(peripheralID, rawDataServiceUuid, rawDataTxCharacteristicUuid).then(() => {
            //   console.log('Start notification: ONE ');

            // })
            await BleManager.startNotification(peripheralID, BluetoothConst.nordicUartServiceUuid, BluetoothConst.uartTxCharacteristicUuid).then(() => {
              console.log('Start notification: ');
              setTimeout(() => {
                bluetoothDataWrite("\x02", peripheralID);
                webViewRef?.current?.injectJavaScript(` onConnectRepl();sendUartData("\x03");true;`);
                // connectionDone()
              }, 500);

            }).catch(async () => {
              console.log("Notification error");
              await startScan();

            });

          }).catch(async () => {
            console.log("Retrive error");
            await startScan();

          })
        });

    }).catch(async (err) => {
      console.log("connect error", err);
      await startScan()
    })

    // BleManager.isPeripheralConnected(
    //   peripheralID,
    //   []
    // ).then((isConnected) => {
    //   if (isConnected) {

    //   }
    // });
  }
  const handleDisconnectedPeripheral = async (data: any) => {
    if (webViewRef) {
      webViewRef.current?.injectJavaScript(`appBleDisconnected(); true;`);
    }
    await connectRetriveNotify(peripheralId, "MONOCLE");
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
    // special commands
    //for menu /menu
    if (event.nativeEvent.data == "/menu") {
      navigation.navigate(Routes.NAV_ACCOUNT_SCREEN)
      return;
    }
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

  const connectionDone = () => {
    // if (pairingStatus == DevicePairingStatus.Paired && peripheralId) {
    BleManager.isPeripheralConnected(
      peripheralId,
      []
    ).then((isConnected) => {
      if (isConnected) {
        console.log("fire 2");
        bluetoothDataWrite("\x02", peripheralId);
        // webViewRef.current?.injectJavaScript(`appBleDisconnected(); true;`);
        webViewRef?.current?.injectJavaScript(` onConnectRepl();sendUartData("\x03");`);

      }
    });
    // }
  }

  const checkConnection = async () => {
    BleManager.isPeripheralConnected(
      peripheralId,
      []
    ).then((isConnected) => {
      console.log("------------connected-----", isConnected)
      if (!isConnected) {
        connectRetriveNotify(peripheralId, "MONOCLE")
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
      {/* <TouchableWithoutFeedback> */}
      {/* <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // keyboardVerticalOffset={20}
          > */}
      <View style={{ ...styles.topView, "height": webViewHeight, borderBottomColor: "red" }}>
        {/* <View style={styles.marginTopFlatList}>
              <Text style={styles.brilliantTextBig}>{STRINGS.BRILLIANT_TEXT}</Text>
            </View> */}
        {/* {isLoading?<View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{STRINGS.WEB_VIEWLOADING}</Text>
            </View>:null} */}
        <WebView
          source={{ uri: REPL_ENDPOINT }}
          ref={webViewRef}
          onMessage={onMessageCallBack}
          scrollEnabled={true}
          // incognito={true}
          overScrollMode={"never"}
          // scalesPageToFit={true}s
          // injectedJavaScript={`document.getElementsByTagName('meta')[0].remove();const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=1.0,user-scalable=5'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); true;`}
          onLoadEnd={() => {
            setIsLoading(false)
            connectionDone()
          }}
          cacheMode={'LOAD_NO_CACHE'}
          startInLoadingState={true}
          nativeConfig={webProp}
          renderLoading={() => <Loading />}

        />

        {/* <TouchableOpacity onPress={() => navigation.navigate(Routes.NAV_MEDIA_SCREEN)}>
              <View
                style={styles.footerLinearStyle}>
                <Image
                  style={styles.footerButtonImage}
                  source={monocleIcon}
                  resizeMode='contain'
                />
              </View>
            </TouchableOpacity> */}
      </View>
      {/* </KeyboardAvoidingView> */}
      {/* </TouchableWithoutFeedback> */}
    </SafeAreaView>
  )
}
export default TerminalScreen;