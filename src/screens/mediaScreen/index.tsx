import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  NativeEventEmitter,
  NativeModules,
  FlatList,
  Alert
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AssetStatus, AssetType, DevicePairingStatus } from "../../models";
import { MediaScreenNavigationProps } from "../../navigations/types";
import { monocleIcon, heartIcon } from "../../assets";
import { STRINGS } from "../../models/constants";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
import * as mainDao from '../../database';
import { Asset } from "../../models";
import BleManager from 'react-native-ble-manager';
import { stringToBytes } from "convert-string";
import base64 from 'react-native-base64';
import Buffer from '@craftzdog/react-native-buffer';
import * as RNFS from 'react-native-fs';
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UIActivityIndicator } from "react-native-indicators";
import { normalize } from "../../utils/dimentionUtils";

type Props = MediaScreenNavigationProps

const MediaScreen = (props: Props) => {
  const { navigation, route } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mediaList, setMediaList] = useState<Asset[]>();
  const [imageArray, setImageArray] = useState<any[]>([]);

  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  useEffect(() => {
    BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
      // Success code
      console.log("Connected peripherals: " + peripheralsArray.length);

    });
    showImage()
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);

    return () => {
      backHandler.remove();
    }
  }, [])

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

  const insertDataToDb = async (
    type: AssetType,
    fileName: string,
    filePath: string
  ) => {
    mainDao.connectDatabase();
    let result = await mainDao.CreateAsset(AssetStatus.Transferred, type, fileName, filePath)
    if (result != null) {
      await console.log('fetch Result', JSON.stringify(result));
      setIsLoading(false);
      navigation.replace(Routes.NAV_MEDIA_SCREEN);
    }
  }

  const handleUpdateValueForCharacteristic = (data: any) => {
    if (data.characteristic == "e5700003-7bac-429a-b4ce-57ff900f479d") {
      // console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic);
      console.log('Received data from Device-----> ' + String.fromCharCode.apply(String, data.value));
      let receiveData = String.fromCharCode.apply(String, data.value);
      console.log('----------------------------------END');

      if (data.value[0] >= 0 && data.value[0] <= 2) {
        if (data.value[0] == 0) {
          setIsLoading(true)
          setImageArray([])
          let fileSize = data.value[5];
          let dataArray = data.value.slice(fileSize + 6);
          // imageArray.push(...dataArray);
          setImageArray(dataArray)
        } else {
          let dataArray = data.value.slice(1);
          // imageArray.push(...dataArray);
          // setImageArray(oldArray => [...oldArray, ...dataArray])
          setImageArray([...imageArray, ...dataArray])
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
                setTimeout(() => {
                  showImage()
                }, 2000);
              })
            })
        }
      }
    }
  }

  const showImage = async (page?: number) => {
    try {
      const fetchAll = await mainDao.GetAssets();

      if (fetchAll != null) {
        await console.log('fetch all Result', JSON.stringify(fetchAll));
        setMediaList(fetchAll);
      }
    } catch (e) {
      console.log("error", e);

    }
  }

  const renderItem = (item: any) => {
    console.log("IMAGE--->", item.filePath + item.fileName)
    return (
      <View style={styles.flatView}>

        <View style={styles.renderViewMiddle} >
          <Image
            style={styles.userImage}
            // source={{ uri: `data:image/png;base64,${item.filePath}` }}
            source={{ uri: "file://" + item.filePath + item.fileName }}
            resizeMode='cover'
          />
          <View style={styles.playButtonView}>
            <Image
              style={styles.playButtonImage}
              source={heartIcon}
              resizeMode='cover'
            />
          </View>
          <View style={styles.timeTextView}>
            <Text style={styles.ItemText}>{'00:15'}</Text>
          </View>
        </View>
      </View>
    );
  }


  return (
    <SafeAreaView style={styles.bodyContainer}>
      <View style={styles.topView}>
        <View style={styles.marginTopFlatList}>
          <Text style={styles.brilliantTextBig}>{STRINGS.BRILLIANT_TEXT}</Text>
        </View>
        {mediaList?.length !== 0 ? (

          <FlatList
            style={styles.marginTopFlatList}
            data={mediaList}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
              renderItem(item)
            }
            keyExtractor={item => item.id.toString()}
            numColumns={3}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{STRINGS.EMPTY_TEXT}</Text>
          </View>
        )
        }

      </View>
      <TouchableOpacity onPress={() => navigation.navigate(Routes.NAV_TERMINAL_SCREEN)}>
        <View
          style={styles.footerLinearStyleTerminal}>
          <Image
            style={styles.footerButtonImage}
            source={monocleIcon}
            resizeMode='contain'
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(Routes.NAV_ACCOUNT_SCREEN)}>
        <View
          style={styles.footerLinearStyle}>
          <Image
            style={styles.footerButtonImage}
            source={monocleIcon}
            resizeMode='contain'
          />
        </View>
      </TouchableOpacity>
      {isLoading ?
        <UIActivityIndicator color='black' style={{ margin: normalize(20) }} />
        : null
      }
    </SafeAreaView>
  )
}
export default MediaScreen;