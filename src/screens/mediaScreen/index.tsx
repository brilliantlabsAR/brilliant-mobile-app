import React, { useState, useEffect, useRef } from "react";
import {
  StatusBar,
  View,
  Text,
  Platform,
  LogBox,
  TouchableOpacity,
  Image,
  BackHandler,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  Dimensions,
  FlatList,
  Alert,
  PermissionsAndroid
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { MediaScreenNavigationProps } from "../../navigations/types";
import { ILoginVerification } from "../../types";
import { leftarrow, calendarIcon, mediaPlay, moreButton, search, mediaDemoImage, logoButton, monocleIcon, heartIcon } from "../../assets";
import { STRINGS } from "../../models/constants";
import { styles } from "./styles";
import Footer from '../../components/footer';
import MapView, { Marker } from "react-native-maps";
import { normalize } from "../../utils/dimentionUtils";
import Contacts from 'react-native-contacts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Routes from "../../models/routes";
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import * as mainDao from '../../database';
import { Asset } from "../../models";

type Props = MediaScreenNavigationProps

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');
const { width: SCREEN_WIDTH } = Dimensions.get('screen');
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

  const handleBackButton = () => {
    //this.props.navigation.goBack();

    BackHandler.exitApp();
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
      <View style={styles.flatview}>

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
          <Text style={styles.brillientTextBig}>{STRINGS.BRILLIANT_TEXT}</Text>
        </View>
        {mediaList?.length !== 0 ? (

          <FlatList
            style={styles.marginTopFlatList}
            data={mediaList}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            // ItemSeparatorComponent={FlatListItemSeparator}
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
      {/* <Footer selectedTab="MediaScreen" /> */}
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