import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Dimensions,
  FlatList,
  Alert
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { MediaScreenNavigationProps } from "../../navigations/types";
import { monocleIcon, heartIcon } from "../../assets";
import { STRINGS } from "../../models/constants";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
import * as mainDao from '../../database';
import { Asset } from "../../models";

type Props = MediaScreenNavigationProps

const MediaScreen = (props: Props) => {
  const { navigation, route } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mediaList, setMediaList] = useState<Asset[]>();

  useEffect(() => {
    showImage()
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

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


  const showImage = async (page?: number) => {
    // try {
    //   const totalPage = await mainDao.GetTotalPage();
    //   // setTotalPage(totalPage);         //for pagination 
    // }
    // catch (e) {
    //   console.log(e);
    // }

    try {
      const fetchAll = await mainDao.GetAssets();

      if (fetchAll != null) {
        // if (page === 1) {              //for pagination 
        await console.log('fetch all Result', JSON.stringify(fetchAll));
        setMediaList(fetchAll);
        // } else {                        //for pagination 
        //   const data = [
        //     ...assetData,
        //     ...fetchAll,
        //   ];
        //   setAssetData(data);
        // }
        // setShowIndicator(false);
        // setRefreshing(false);
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
    </SafeAreaView>
  )
}
export default MediaScreen;