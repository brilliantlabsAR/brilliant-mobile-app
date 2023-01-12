import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  NativeEventEmitter,
  NativeModules,
  Dimensions,
  FlatList,
  Alert
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import BleManager from 'react-native-ble-manager';
import { stringToBytes } from "convert-string";

import { WebView } from 'react-native-webview';
import { TerminalScreenNavigationProps } from "../../navigations/types";
import { monocleIcon, heartIcon } from "../../assets";
import { STRINGS } from "../../models/constants";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
// import * as mainDao from '../../database';
import { Asset, DevicePairingStatus } from "../../models";
import { useAppSelector } from "../../redux/hooks";
type Props = TerminalScreenNavigationProps


const TerminalScreen = (props: Props) => {
  const { navigation, route } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mediaList, setMediaList] = useState<Asset[]>();

  const peripheralId = useAppSelector((state) => state.pairing.peripheralId);
  const pairingStatus = useAppSelector((state) => state.pairing.status);

  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  useEffect(() => {
    BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
      // Success code
      console.log("Connected peripherals: " + peripheralsArray.length);
      bluetoothDataWrite("\x02", peripheralId);
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
    }

  }
  const handleDisconnectedPeripheral = (data: any) => {
    if (webViewRef) {
      webViewRef.current.injectJavaScript(`controlButtons.forEach(ele => { ele.disabled = true;}); replConsole.value  += "\\nBluetooth error. Are you connected?"; connectButton.innerHTML = 'Connect'; true;`);
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
      webViewRef.current.injectJavaScript(final_data);
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
        console.log("write data failure", error);
      });
  }


  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={styles.topView}>
        <View style={styles.marginTopFlatList}>
          <Text style={styles.brilliantTextBig}>{STRINGS.BRILLIANT_TEXT}</Text>
        </View>
        {/* {isLoading?<View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{STRINGS.WEB_VIEWLOADING}</Text>
        </View>:null} */}
        <WebView
          source={{ uri: 'http://139.144.72.206/repl' }}
          ref={webViewRef}
          onMessage={onMessageCallBack}
          incognito={true}
          onLoadEnd={() => setIsLoading(false)}
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
    </SafeAreaView>
  )
}
export default TerminalScreen;