import React, { useState, useEffect, useRef } from "react";
import {
    StatusBar,
    View,
    Text,
    SafeAreaView,
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
import LinearGradient from 'react-native-linear-gradient';
import { MediaScreenNavigationProps } from "../../navigations/types";
import { ILoginVerification } from "../../types";
import { leftarrow, calendarIcon, mediaPlay, moreButton, search, mediaDemoImage, logoButton } from "../../assets";
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

type Props = MediaScreenNavigationProps

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');
const { width: SCREEN_WIDTH } = Dimensions.get('screen');
const MediaScreen = (props: Props) => {
    const { navigation, route } = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mediaList, setMediaList] = React.useState([

        {
            "id": "1",
            "name": "Media File 1\n2022-06-31 12-0.",
            "date": "21 Jan 2022"
        },
        {
            "id": "2",
            "name": "Media File 1\n2022-06-31 12-0.",
            "date": "28 Jan 2021"
        },
        {
            "id": "3",
            "name": "Media File 1\n2022-06-31 12-0.",
            "date": "14 Feb 2021"
        },
        {
            "id": "4",
            "name": "Media File 1\n2022-06-31 12-0.",
            "date": "14 Feb 2021"
        },
        {
            "id": "5",
            "name": "Media File 1\n2022-06-31 12-0.",
            "date": "14 Feb 2021"
        },
        {
            "id": "6",
            "name": "Media File 1\n2022-06-31 12-0.",
            "date": "14 Feb 2021"
        },
        {
            "id": "7",
            "name": "Media File 1\n2022-06-31 12-0.",
            "date": "14 Feb 2021"
        },
        {
            "id": "8",
            "name": "Media File 1\n2022-06-31 12-0.",
            "date": "14 Feb 2021"
        },
        {
            "id": "9",
            "name": "Media File 1\n2022-06-31 12-0.",
            "date": "14 Feb 2021"
        },
        {
            "id": "10",
            "name": "Media File 1\n2022-06-31 12-0.",
            "date": "14 Feb 2021"
        },
        {
            "id": "11",
            "name": "Media File 1\n2022-06-31 12-0.",
            "date": "14 Feb 2021"
        },
        {
            "id": "12",
            "name": "Media File 1\n2022-06-31 12-0.",
            "date": "14 Feb 2021"
        },
        {
            "id": "13",
            "name": "Media File 1\n2022-06-31 12-0.",
            "date": "14 Feb 2021"
        }

    ]);


    useEffect(() => {
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



    return (
        <SafeAreaView style={styles.bodyContainer}>
            <View style={styles.topView}>
                <ScrollView style={styles.scrollviewStyle}>
                    {/* <View style={styles.searchView}>
                        <Text style={styles.searchText}>{STRINGS.SEARCH_MEDIA}</Text>

                        <View style={styles.searchIconView}>
                            <Image
                                style={styles.searchIcon}
                                source={search}
                                resizeMode='cover'

                            />
                        </View>

                    </View> */}

                    <MenuProvider>
                        <FlatList
                            data={mediaList}
                            scrollEnabled={false}

                            showsVerticalScrollIndicator={false}
                            // ItemSeparatorComponent={FlatListItemSeparator}
                            renderItem={({ item }) =>

                                <View style={styles.flatview}>
                                    <View style={styles.renderViewTop}>
                                        <View style={styles.renderViewMiddle} >
                                            <Image
                                                style={styles.userImage}
                                                source={mediaDemoImage}
                                                resizeMode='cover'

                                            />
                                            <View style={styles.playButtonView}>
                                                <Image
                                                    style={styles.playButtonImage}
                                                    source={mediaPlay}
                                                    resizeMode='cover'

                                                />
                                            </View>
                                        </View>
                                        <View style={styles.textviewStyle} >
                                            <Text
                                                style={styles.textStyle}
                                            >{item.name}</Text>
                                            <View style={styles.calenderTopView}>
                                                <Image
                                                    style={styles.calenderIcon}
                                                    source={calendarIcon}
                                                    resizeMode='cover'

                                                />
                                                <Text
                                                    style={styles.dateTextStyle}
                                                >{item.date}</Text>
                                            </View>

                                        </View>
                                        <View style={styles.moreButtonStyle} >


                                            <Menu onSelect={value => Alert.alert(value)}>
                                                <MenuTrigger><Image
                                                    style={styles.playButtonImage}
                                                    source={moreButton}
                                                    resizeMode='cover'
                                                /></MenuTrigger>
                                                <MenuOptions optionsContainerStyle={styles.menuOptionView}>

                                                    <MenuOption onSelect={() => { 'function download' }} style={styles.menuView}>
                                                        <Text
                                                            style={styles.menuText}
                                                        >{STRINGS.RENAME}</Text>
                                                    </MenuOption>
                                                    <View style={styles.menuSeparator} />
                                                    <MenuOption onSelect={() => { 'jo' }} style={styles.menuViewOtion}>
                                                        <Text
                                                            style={styles.menuOptionText}
                                                        >{STRINGS.DOWNLOAD}</Text>
                                                    </MenuOption>
                                                    <View style={styles.menuSeparator} />
                                                    <MenuOption onSelect={() => { 'pokl' }} style={styles.menuViewOtion}>
                                                        <Text
                                                            style={styles.menuOptionText}
                                                        >{STRINGS.DELETE}</Text>
                                                    </MenuOption>
                                                </MenuOptions>
                                            </Menu>

                                        </View>
                                    </View>

                                </View>
                            }
                            keyExtractor={item => item.id}
                        />
                    </MenuProvider>
                </ScrollView>
            </View>
            {/* <Footer selectedTab="MediaScreen" /> */}
            <TouchableOpacity onPress={() => navigation.navigate(Routes.NAV_ACCOUNT_SCREEN)}>
                <View
                    style={styles.footerLinearStyle}>
                    <Image
                        style={styles.footerButtonImage}
                        source={logoButton}
                        resizeMode='cover'
                    />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default MediaScreen;