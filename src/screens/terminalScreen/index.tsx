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
import { Asset } from "../../models";
import { useAppSelector } from "../../redux/hooks";
type Props = TerminalScreenNavigationProps


const TerminalScreen = (props: Props) => {
  const { navigation, route } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mediaList, setMediaList] = useState<Asset[]>();

const peripheralId = useAppSelector((state) => state.pairing.peripheralId);

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      backHandler.remove();
    }
  }, [])
  
  const handleUpdateValueForCharacteristic = (data: any) => {
    //console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic);
    console.log('Received data from Device IMAGE DEMO-----> ' + data.value);
    console.log('Received data from Device-----> ' + String.fromCharCode.apply(String, data.value));
    var receiveData = String.fromCharCode.apply(String, data.value);
    sendMessage(receiveData);
    console.log('----------------------------------END');

  }
  const handleDisconnectedPeripheral = (data: any)=>{
    sendMessage(`controlButtons.forEach(ele => { ele.disabled = false;}); replConsole.value = replConsole.value + "\nDisconnected"; connectButton; connectButton.innerHTML = 'Disconnect'; true;`);
  }

  bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
  bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
  /** Go to media **/
  const handleBackButton = () => {
    navigation.navigate(Routes.NAV_MEDIA_SCREEN);
    return true
  }

  let webref :any = null
   const onMessageCallBack = (event : any) => {
      console.log(event.nativeEvent.data)
      bluetoothDataWrite(event.nativeEvent.data, peripheralId)
       // write to bluetooth 
       // writedata(event.nativeEvent.data)
       
      //  let data = event.nativeEvent.data
      
      //  if(data=="\x03"){
      //   data = "\r\n>>>"
      //  }else{
      //   if(data=="\r\n"){
      //     sendMessage("\r\n"+dataStack)
      //     data = "\r\n>>>"
      //     dataStack = ""
      //    }else{
      //     dataStack = dataStack + data
      //    }
      //  }
         //for test
      //  sendMessage(data)
   }
  
   const sendMessage = (data:string) =>{
      data = String(data).replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t").replace("\x1B", "\\x1B")
      console.log(data)
      let final_data = ` uartStringDataHandler("${data}"); true;` 
      webref.injectJavaScript(final_data);
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
            ref={(r) => (webref = r)}
            onMessage={onMessageCallBack}
            incognito={true}
            onLoadEnd={()=>setIsLoading(false)}
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