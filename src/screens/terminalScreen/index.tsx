import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  NativeEventEmitter,
  NativeModules,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
  FlatList,
  Alert
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
import { monocleIcon, heartIcon } from "../../assets";
import { STRINGS } from "../../models/constants";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
// import * as mainDao from '../../database';
import { AssetType,AssetStatus, DevicePairingStatus,REPL_ENDPOINT } from "../../models";
import { useAppSelector } from "../../redux/hooks";
type Props = TerminalScreenNavigationProps


const TerminalScreen = (props: Props) => {
  const { navigation, route } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bleFileName, setbleFileName] = useState<string>("");
  const [imageArray, setImageArray] = useState<any[]>([]);

  const peripheralId = useAppSelector((state) => state.pairing.peripheralId);
  const pairingStatus = useAppSelector((state) => state.pairing.status);

  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  const insertDataToDb = async (
    type: AssetType,
    fileName: string,
    filePath: string
  ) => {
    mainDao.connectDatabase();
    let result = await mainDao.CreateAsset(AssetStatus.Transferred, type, fileName, filePath)
    if (result != null) {
      await console.log('fetch Result', JSON.stringify(result));
      // setShowLoading(false);
      navigation.replace(Routes.NAV_MEDIA_SCREEN);
    }
  }

  useEffect(() => {
    BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
      // Success code
      console.log("Connected peripherals: " + peripheralsArray.length);
      
    });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
    return () => {
      backHandler.remove();
    }
  }, [])

  const handleUpdateValueForCharacteristic = (data: any) => {
    if(data.characteristic!="e5700003-7bac-429a-b4ce-57ff900f479d"){
      // console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic);
      console.log('Received data from Device-----> ' + String.fromCharCode.apply(String, data.value));
      let receiveData = String.fromCharCode.apply(String, data.value);
      sendMessage(receiveData);
      console.log('----------------------------------END');
    }else{
      if (data.value[0] >= 0 && data.value[0] <= 2) {
        if (data.value[0] == 0) {
          setImageArray([])
          let fileSize = data.value[5];
          let dataArray = data.value.slice(fileSize + 6);
          let file_name = String.fromCharCode.apply(String, data.value.slice(6,fileSize+6))
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
  
  const handleDisconnectedPeripheral = (data: any) => {
    if (webViewRef) {
      webViewRef.current?.injectJavaScript(`controlButtons.forEach(ele => { ele.disabled = true;}); replConsole.value  += "\\nBluetooth error. Are you connected? Try Again!"; connectButton.innerHTML = 'Connect'; true;`);
     setTimeout(() => {
      navigation.navigate(Routes.NAV_PAIRING_SCREEN)
      
     }, 3000);
    }
    
  }


  /** Go to media **/
  const handleBackButton = () => {
    navigation.navigate(Routes.NAV_MEDIA_SCREEN);
    return true
  }

  const webViewRef: any = useRef(null);
  const onMessageCallBack = (event: any) => {
    console.log(event.nativeEvent.data)
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
    let final_data = ` uartStringDataHandler(decodeURI("${encodeURI(data)}")); true;`
    if (webViewRef) {
      webViewRef.current?.injectJavaScript(final_data);
    }
  }

  const bluetoothDataWrite = (data: any, peripheralId: any) => {
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
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={45}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
          <View style={styles.topView}>
            <View style={styles.marginTopFlatList}>
              <Text style={styles.brilliantTextBig}>{STRINGS.BRILLIANT_TEXT}</Text>
            </View>
            {/* {isLoading?<View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{STRINGS.WEB_VIEWLOADING}</Text>
            </View>:null} */}
            <WebView
              source={{ uri: REPL_ENDPOINT }}
              ref={webViewRef}
              onMessage={onMessageCallBack}
              incognito={true}
              onLoadEnd={() => {
                setIsLoading(false)
                bluetoothDataWrite("\x02", peripheralId);
              }}
            />
            <TouchableOpacity onPress={() => navigation.navigate(Routes.NAV_MEDIA_SCREEN)}>
              <View
                style={styles.footerLinearStyle}>
                <Image
                  style={styles.footerButtonImage}
                  source={monocleIcon}
                  resizeMode='contain'
                />
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
export default TerminalScreen;