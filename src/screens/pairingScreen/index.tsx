import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  Platform,
  LogBox,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableHighlight,
  NativeModules,
  NativeEventEmitter,
  PermissionsAndroid,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BleManager, { stopScan } from 'react-native-ble-manager';
import { stringToBytes } from "convert-string";
import NetInfo from '@react-native-community/netinfo';
import { normalize } from "../../utils/dimentionUtils";
import { AssetStatus, AssetType, DevicePairingStatus, FontFamily, Theme } from "../../models";
import { PairingNavigationProps } from "../../navigations/types";
import { mediaDemoImage } from "../../assets";

import { styles } from "./styles";
import * as Routes from "../../models/routes";
import { Loading } from '../../components/loading';
import { BLE_icon, downArrow, logoButton, monocleImage, phone, upArrow } from "../../assets";
import { STRINGS } from "../../models/constants";
import { ShowToast } from "../../utils/toastUtils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDevicePairingStatus } from "../../redux/appSlices/pairingStatusSlice";
import { CustomModal } from "../../components/customModal";
import { CommonButton } from "../../components/commonButton";
import { TopBar } from "../../components/topBar";
import { UIActivityIndicator } from 'react-native-indicators';
import base64 from 'react-native-base64';
import Buffer from '@craftzdog/react-native-buffer';
import * as RNFS from 'react-native-fs';
import * as mainDao from '../../database';
import { DateTime } from "luxon";

const peripherals = new Map();

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
let concatData: any = '', importWIFI = 'from machine import WiFi';
const PairingScreen = (props: PairingNavigationProps) => {
  const { navigation } = props;
  const [showBLE, setShowBLE] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [connected, setConnected] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [ssid, setSsid] = useState<string>("");
  const [imageIcon, setImageIcon] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [peripheralId, setPeripheralID] = useState<string>("");
  const [peripheralName, setPeripheralName] = useState<string>("");
  const [scanning, setScanning] = useState<boolean>(false);
  const [deviceFound, setDeviceFound] = useState<boolean>(false);
  const [devices, setDevices] = useState<any[]>([]);
  const [ssidList, setSsidList] = useState<any[]>([]);
  const [imageArray, setImageArray] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const pairingStatus: DevicePairingStatus = useAppSelector((state) => state.pairing.status);

  const showModal = () => {
    setVisibleModal(true)
  }
  const hideModal = () => {
    setVisibleModal(false)
  }
  // const FlatListItemSeparator = () => {
  //   return (
  //     <View style={styles.itemSeparatorView} />
  //   );
  // }
  useEffect(() => {
   //mainDao.executeSql(mainDao.dropAssetsTableQrery, []);
    try {
      if (Platform.OS == 'android') {
        if (Platform.OS === 'android' && Platform.Version >= 23) {
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
            if (result) {
              console.log("Permission is OK");
            } else {
              PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                if (result) {
                  console.log("User accept");
                } else {
                  console.log("User refuse");
                }
              });
            }
          });

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
        }, 1000);
      } else {
        connectedDevice();
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      // bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      // bleManagerEmitter.removeListener('BleManagerStopScan', this.handleStopScan);
      // bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
      // bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic);
      //removeEventListner();  //whenever the component removes it will executes
    }
  }, []);

  // useEffect(() => {
  // }, [ssidList]);

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
      navigation.navigate(Routes.NAV_MEDIA_SCREEN);
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

        if (connected) {
          stopScan
        } else {
          testPeripheral(peripheral);
        }
      } else {
        setDeviceFound(false);
      }
    } else {
      if (peripheral.advertising.localName === "FRAME" || peripheral.advertising.localName === "Frame" || peripheral.advertising.localName === "Monocle") {
        peripherals.set(peripheral.id, peripheral);
        console.log('handleDiscoverPeripheral----->', Array.from(peripherals.values()));
        setDevices(Array.from(peripherals.values()))
        setDeviceFound(true);
        testPeripheral(peripheral.id);
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

      if (data.value[0]==2) {
        const z = new Uint8Array(imageArray);
        console.log('Uint8Array-----> ', z);

        const buffer = Buffer.Buffer.from(imageArray)
        console.log("buffer >> " + buffer) //[161,52]  
        let imageBase = base64.encodeFromByteArray(z, Uint8Array);

        console.log('ARRAY PUSH IMAGE BASE-----> ', imageBase);
        var base64Icon = 'data:image/png;base64,' + imageBase;
        setImageIcon(base64Icon);
        const myAlbumPath = RNFS.PicturesDirectoryPath + '/brilliant'
        const path = myAlbumPath + '/'+DateTime.now().toUnixInteger()+'.png'
        // RNFS.writeFile(myAlbumPath, base64Icon, 'base64').then(()=>{
        //   console.log("Success Copy")
        RNFS.mkdir(myAlbumPath)
          .then(() => {
            console.log("Success Copy mkdr")

            RNFS.writeFile(path, imageBase, 'base64').then(() => {
              console.log("Success Copy")
              // RNFS.readFile(path, 'base64')
              // .then(dataUrl => {
              //   console.log('## base64 conversion success', dataUrl);
              // });
              insertDataToDb(AssetType.Image,DateTime.now().toUnixInteger()+'.png', myAlbumPath+"/")

              // setTimeout(() => {
                
              // }, 2000);
            })
          }

          )

      }
      console.log('ARRAY PUSH-----> ', data.value[0]);

    }
    //setImageArray(array);

    console.log('Received data from Device-----> ' + String.fromCharCode.apply(String, data.value));
    console.log('Received array data from Device-----> ' + imageArray);

    var receiveData = String.fromCharCode.apply(String, data.value);

    var subData = '';
    concatData = concatData + receiveData;//OK1
    // if (receiveData.includes('OKIMPORT')) {
    //   console.log("ok response coming");
    //   dataWrite("p=WiFi.scan() \nprint('SCAN') \nprint(p) \x04", data.peripheral)
    //   //dataWrite("WiFi.clear() \nprint('SCAN') \x04", data.peripheral)
    // } else if (receiveData.includes("OKSCAN")) {
    //   console.log("ok scan response coming");

    //   let subData = receiveData.substring(receiveData.indexOf("["), receiveData.indexOf("]") + 1).replace(/'/g, '"').trim();
    //   console.log(JSON.parse(subData));
    //   setSsidList(JSON.parse(subData));
    //   setVisibleModal(true);

    //   //   dataWrite("WiFi.add('Sanatan Home-2G','passpass') \nprint('ADD') \x04", data.peripheral)
    // } else if (receiveData.includes("OKADD")) {
    //   setTimeout(() => {
    //     console.log("Wait for 3 sec");
    //     dataWrite("p=WiFi.status() \nprint('STATUS') \nprint(p)\x04", data.peripheral)
    //     ShowToast("Device connected successfully");
    //   }, 5000);
    // } else if (receiveData.includes('OKSTATUS')) {
    //   dataWrite("p=WiFi.list() \nprint('LIST') \nprint(p)\x04", data.peripheral)

    // } else {
    //   console.log("ok response not coming");
    // }


    if (receiveData.includes('OKIMPORT')) {
      console.log("ok response coming");
      dataWrite("Camera.capture() \nprint('SCAN') \x04", data.peripheral)
      //dataWrite("WiFi.clear() \nprint('SCAN') \x04", data.peripheral)
    } else if (receiveData.includes("OKSCAN")) {
      console.log("ok scan response coming");
      console.log('Receive data---->', data.value);
      //   let subData = receiveData.substring(receiveData.indexOf("["), receiveData.indexOf("]") + 1).replace(/'/g, '"').trim();
      //   console.log(JSON.parse(subData));
      //  setSsidList(JSON.parse(subData));
      //   setVisibleModal(true);

      //   dataWrite("WiFi.add('Sanatan Home-2G','passpass') \nprint('ADD') \x04", data.peripheral)
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
  const getPeripheralName = (item: any) => {
    if (item.advertising) {
      if (item.advertising.localName) {
        return item.advertising.localName;
      }
    }

    return item.name;
  };

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
            setConnected(true);
            console.log("Monocle is connected!");
            ShowToast(STRINGS.MONOCLE_CONNECTED);
            dispatch(setDevicePairingStatus(DevicePairingStatus.Paired));
            setTimeout(() => {
              setShowLoading(false);
              navigation.navigate(Routes.NAV_MEDIA_SCREEN);
            }, 2000);
          }
        });
      }
    }

    if (peripheral.name == 'Frame' || peripheral.name == 'FRAME') {
      BleManager.createBond(peripheral.id)
        .then(async () => {
          console.log("createBond success or there is already an existing one");
          setPeripheralID(peripheral.id);

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
                  setConnected(true);
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
                    //  await BleManager.startNotification(peripheral.id, service, readUUID).then(() => {
                    await BleManager.startNotification(peripheral.id, nordicUartServiceUuid, uartTxCharacteristicUuid).then(() => {
                      console.log('Start notification: ');
                      // setTimeout(() => {    //1st Command
                      //   console.log("1st Command");

                      //   dataWrite("\x03", peripheral.id);

                      //   setTimeout(() => {//2nd Command
                      //     console.log("2nd Command");

                      //     dataWrite("\x01", peripheral.id);

                      //   }, 3000);

                      //   setTimeout(() => {//3rd Command
                      //     console.log("3rd Command \\x04");

                      //     dataWrite("from machine import WiFi \nprint('IMPORT')\x04", peripheral.id);
                      //     // dataWrite("print('hi')\x04", peripheral.id);

                      //   }, 4000);

                      // }, 5000);
                      setTimeout(() => {    //1st Command
                        console.log("1st Command");

                        dataWrite("\x03", peripheral.id);

                        setTimeout(() => {//2nd Command
                          console.log("2nd Command");

                          dataWrite("\x01", peripheral.id);

                        }, 3000);

                        setTimeout(() => {//3rd Command
                          console.log("3rd Command \\x04");

                          dataWrite("from machine import Camera \nprint('IMPORT')\x04", peripheral.id);
                          // dataWrite("print('hi')\x04", peripheral.id);

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

              // else {
              //   BleManager.isPeripheralConnected(
              //     peripheral.id,
              //     []
              //   ).then((isConnected) => {
              //     if (isConnected) {
              //       console.log("Monocle is connected!");
              //       ShowToast(STRINGS.MONOCLE_CONNECTED);
              //       dispatch(setDevicePairingStatus(DevicePairingStatus.Paired));
              //       setTimeout(() => {
              //         navigation.navigate(Routes.NAV_MEDIA_SCREEN);
              //       }, 2000);
              //     }
              //   });
              // }


            }).catch(() => {
              console.log("Device not connected");
              dispatch(setDevicePairingStatus(DevicePairingStatus.PairingError));
            });
          }

        }).catch(() => {
          console.log("fail to bond");
        });
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
    // BleManager.writeWithoutResponse(
    //     peripheralId,
    //     service,
    //     UUID,
    //     stringToBytes(data),
    //     256
    // )
    //     .then(() => {
    //         // Success code
    //         console.log("Writed:-----" + data);
    //     })
    //     .catch((error) => {
    //         // Failure code
    //         console.log("WRITE----??", error);
    //     });

  }

  const addWifi = () => {
    // dataWrite("WiFi.add('Sanatan Home-2G','passpass') \nprint('ADD') \x04", data.peripheral)
    dataWrite(`WiFi.add('${ssid}','${password.trim()}') \nprint('ADD') \x04`, peripheralId)
    hideModal();
  }


  // const renderItem = (item: any) => {
  //   return (
  //     <TouchableHighlight onPress={() => console.log('Click')}>
  //       <View style={styles.renderItemMainView}>
  //         <View style={styles.renderItemView} >
  //           <Text style={styles.renderItemText}>{getPeripheralName(item)}</Text>
  //           <View style={styles.marginTopView}>
  //             <Text style={styles.renderItemText2}> {item.id}</Text>
  //           </View>
  //         </View>
  //         <TouchableOpacity style={styles.connectTouchView}
  //           onPress={() => {
  //             // this.setState({ bluetoothDevice: item }, () => {
  //             //     NetInfo.fetch().then((state) => {
  //             //         console.log('net status', state)
  //             //     })
  //             //     // this.showModal()
  //             //     // this.testPeripheral();
  //             // })

  //             testPeripheral(item)
  //           }}
  //         >
  //           <View style={styles.connectView} >
  //             <Text style={styles.connectText}>{STRINGS.CONNECT}</Text>
  //           </View>
  //         </TouchableOpacity>
  //       </View>
  //     </TouchableHighlight>

  //   );
  // }



  // const renderSSIDItem = (item: any) => {
  //   return (
  //     <TouchableOpacity style={styles.modalView} onPress={() => setSsid(item.ssid)}>
  //       <Text style={styles.renderItemText}>{item.ssid}</Text>
  //     </TouchableOpacity>
  //   );
  // }

  return (
    <SafeAreaView
      style={styles.bodyContainer}>
      <TopBar />
      <View style={styles.middleView}>
        <View style={{ flexDirection: 'row', width: normalize(150), alignItems: 'center', paddingLeft: 20 }}>
          <Text style={styles.verifyText}>{STRINGS.CONNECT}</Text>
          <Image source={BLE_icon} style={styles.bleImageStyle} />
        </View>
        <Text style={styles.phoneNumberText}>{STRINGS.CONNECT_TEXT}</Text>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Image source={monocleImage} style={styles.monocleImage} />
          <Image source={downArrow} style={styles.arrowStyle} />
          {showLoading &&
            <UIActivityIndicator color='black' style={{ margin: 20 }} />
          }
          <Image source={upArrow} style={styles.arrowStyle} />
          <Image source={phone} style={styles.phoneImage} />
        </View>
        {/* <View style={styles.mainContainer2} >
          {showBLE == true ?
            <View style={styles.marginTopView}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                <CustomModal
                  modalVisible={visibleModal}
                  modalVisibleOff={() => setVisibleModal(false)}
                >
                  <View style={styles.modalContainer}>

                    {ssid ? (
                      <>
                        <Text style={styles.renderItemText}>{ssid}</Text>
                        <TextInput
                          placeholder={STRINGS.ENTER_WIFI_PASS}
                          keyboardType="default"
                          value={password}
                          onChangeText={(password) => setPassword(password)}
                          style={styles.modalTextInput}
                        />
                        <View style={styles.modalSubmitView}>
                          <CommonButton
                            buttonLabel={STRINGS.SUBMIT}
                            handlePress={() => { addWifi() }}
                          />
                        </View>
                      </>
                    ) : (
                      <FlatList
                        data={ssidList}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => renderSSIDItem(item)}
                        ListHeaderComponent={() => <Text style={styles.renderItemText}>{[STRINGS.CHOOSE_WIFI_NETWORK]}</Text>}
                        keyExtractor={item => item.auth}
                      />
                    )}
                  </View>
                </CustomModal>
              </KeyboardAvoidingView>
              <View style={styles.TouchableView}>
                <TouchableOpacity style={styles.TouchableStyle}
                  onPress={() => {
                    startScan()
                  }}
                >
                  <Text style={styles.TouchableText}>{'Scan Bluetooth (' + (scanning ? 'on' : 'off') + ')'}</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={devices}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={FlatListItemSeparator}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={item => item.id}
              />
              {scanning ?
                <Loading /> : null
              }
            </View>

            :
            <View style={styles.pairTitleView}>
              <Text style={styles.pairTitle}>{STRINGS.LETS_PAIR_TITLE}</Text>
              <View style={styles.circularProgressView}>
                <AnimatedCircularProgress
                  size={300}
                  width={8}
                  fill={100}
                  duration={5000}
                  tintColor={Theme.color.Black}
                  onAnimationComplete={() => {
                    setShowBLE(true)
                  }}
                  backgroundColor={Theme.color.gray15} >

                  {
                    (fill) => (
                      <Image
                        style={styles.imageView}
                        source={logoButton}
                        resizeMode='contain'
                      />
                    )
                  }
                </AnimatedCircularProgress>
                <Text style={styles.ensureText}>{STRINGS.ENSURE_TITLE}</Text>
              </View>
            </View>
          }
          </View> */}
      </View>
    </SafeAreaView >
  )
};

export default PairingScreen;