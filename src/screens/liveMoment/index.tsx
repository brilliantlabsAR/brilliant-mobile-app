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
    BackHandler,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Keyboard,
    Dimensions,
    PermissionsAndroid,
    ListRenderItem,
    FlatList,
} from "react-native";
import { Theme } from "../../models";
import { LiveMomentNavigationProps } from "../../navigations/types";
import { mediaLive, whiteUser, search, blackBell, bellFill, roundMinus } from "../../assets";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./styles";
import Contact from 'react-native-contacts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from '../../components/footer';
import * as Routes from "../../models/routes";
import BottomSheet, { BottomSheetRefProps } from '../../components/bottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TextInput } from "react-native-paper";
import { Loading } from '../../components/loading';
import * as String from '../../models/constants';
import GetLocation from "react-native-get-location";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchStreamerAudienceData } from "../../redux/appSlices/streamerAudienceSlice";
import { apiStatus } from "../../redux/apiDataTypes";
import { ShowToast } from "../../utils/toastUtils";
import { FetchLocationData } from "../../redux/appSlices/appLocationSlice";
import { FetchNotificationData } from "../../redux/appSlices/notificationCreateSlice";
import { FetchUserBlockData } from "../../redux/appSlices/userBlockSlice";


type Props = LiveMomentNavigationProps
const { height: SCREEN_HEIGHT } = Dimensions.get('screen');
const { width: SCREEN_WIDTH } = Dimensions.get('screen');
const LiveMomentScreen = (props: Props) => {
    const { navigation, route } = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const bottomSheetRef = useRef(null);
    const Screen = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    };
    const snapPoints = [0, Screen.height / 2, '70%', '100%'];
    const [markers, setMarkers] = useState([
        {
            "id": "123",
            "latLng": {
                latitude: 37.78825,
                longitude: -122.4324,
            },
            "name": "Test One"
        },
        {
            "id": "1232",
            "latLng": {
                latitude: 37.78825,
                longitude: -122.4324,
            },
            "name": "Test One"
        }
    ]);

    const [streamerList, setStreamerList] = useState<any | null[]>([]);
    const [names, setNames] = useState<string[]>([]);

    const [backendContacts, setbackendContacts] = useState([]);
    const [contactList, setcontactList] = useState<any[]>([]);
    const [audienceList, setaudienceList] = useState<any | null[]>(null);
    const [itemClick, setItemClick] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.streamerAudienceSlice.status);
    const streamAudienceData = useAppSelector(state => state.streamerAudienceSlice.userData);
    const locationStatus = useAppSelector(state => state.appLocationSlice.status);
    const notificationStatus = useAppSelector(state => state.notificationCreateSlice.status);
    const blockUserStatus = useAppSelector(state => state.userBlockSlice.status);





    const ref = useRef<BottomSheetRefProps>(null);
    useEffect(() => {
        const isActive = ref?.current?.isActive();
        if (isActive) {
            ref?.current?.scrollTo(-400);
        } else {
            Platform.OS == "ios" ? (
                ref?.current?.scrollTo(-150)
            ) : (
                ref?.current?.scrollTo(-100)
            )
        }

        if (status === apiStatus.success) {
            console.log("data");
            console.log("data-->", streamAudienceData.streamers);
            setStreamerList(streamAudienceData.streamers);
            setaudienceList(streamAudienceData.audience);
        }

    }, [status])
    useEffect(() => {
        if (locationStatus === apiStatus.success) {
            console.log("data-->");

        }
    }, [locationStatus]);
    useEffect(() => {
        if (notificationStatus === apiStatus.success) {
            console.log("Notification-->");

        }
    }, [notificationStatus]);
    useEffect(() => {
        if (blockUserStatus === apiStatus.success) {
            console.log("user Block-->");

        }
    }, [blockUserStatus]);
    useEffect(() => {
        if (blockUserStatus === apiStatus.success) {
            console.log("user Block-->");

        }
    }, [blockUserStatus]);
    useEffect(() => {
        getLocation();
        dispatch(FetchStreamerAudienceData({}))
    }, [])


    const sendNotificationApiFunc = (userId: any) => {
        dispatch(FetchNotificationData({
            "userId": userId
        }))
    }
    const streamerUserBlock = (userId: any) => {
        dispatch(FetchUserBlockData({
            "blockedUser": userId,
            "type": "streamer"
        }))
    }

    async function getLocation() {

        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log('Location', location);
                dispatch(FetchLocationData({
                    "latitude": location.latitude.toString(),
                    "longitude": location.longitude.toString(),
                    "time": location.time.toString()
                }))

            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }
    async function requestContactPermission() {
        try {
            const OsVeri = Platform.Version;
            console.log('Version->', OsVeri)
            if (Platform.Version >= 30) {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                    PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                ])
                if (
                    granted['android.permission.WRITE_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED
                    && granted['android.permission.READ_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED
                    && granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED
                    && granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('You can use the Contacts');
                    getContact();
                } else {
                    console.log('Permission denied');

                }
            } else {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                    PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
                ])
                if (
                    granted['android.permission.WRITE_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED
                    && granted['android.permission.READ_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('You can use the Contacts');
                    getContact();
                } else {
                    console.log('Permission denied');

                }
            }


        } catch (err) {
            console.warn(err)
        }
    }




    useEffect(() => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.',
                'buttonPositive': 'Please accept bare mortal'
            }
        ).then(async () => {
            await Contact.getAll().then((contact) => {
                //console.log(contact)
            });
        });
        getContact();

    }, []);


    async function getContact() {
        try {
            console.log('CONTACT', 'GOOO');
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    'title': 'Contacts',
                    'message': 'This app would like to view your contacts.',
                    'buttonPositive': 'Please accept bare mortal'
                }
            ).then(async () => {
                await Contact.getAll().then((contact) => {
                    // console.log('CONTACT', contact);

                    let result = contact.filter(item => {
                        if (item.phoneNumbers && item.phoneNumbers.length > 0) {
                            var number = item.phoneNumbers[0].number.toString();
                            //  console.log('new', number);

                            return backendContacts.toString().indexOf(number.replace(/ /g, '').replace('(', '').replace(')', '').replace('-', '')) > -1
                        } else {
                            return false;
                        }
                    }
                    )

                    // console.log('result', result);
                    setcontactList(result);
                    setaudienceList(result);

                    //   console.log('HIHIOKOK', contactList)
                })
            }).catch((e) => {
                console.log(e)
            })
        } catch (e) {
            console.log(e);
        }

    }

    const render_streamerList: ListRenderItem<any> = ({ item, index }) => {
        return (
            <View style={styles.contactListContainer}>
                <View style={styles.profilePictureContainer} >
                    {item?.profilePicture == "" ?
                        <View style={styles.placeholder}>
                            <Text style={styles.txt}>{item?.name.substring(0, 1)}</Text>
                        </View> :
                        <View style={styles.placeholder}>
                            <Image
                                style={styles.profileImage}
                                source={{ uri: item?.profilePicture }}
                                resizeMode='cover'
                            />
                        </View>
                    }
                </View>
                <View style={styles.nameListContainer} >
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                {/* {!this.state.audienceList.includes(item) && */}
                <TouchableOpacity style={styles.iconContainer}
                    onPress={() => {
                        //   this.setState({ audienceList: this.state.audienceList.push(item), popupOpen: true })
                        //  this.setState({ audienceList: [...this.state.audienceList, item], popupOpen: true })
                        // this.sentNotification(item.id);
                        // this.setState({ popupOpen: true })
                        // this.setState({ itemClick: true })
                        sendNotificationApiFunc(item.id);

                    }} >
                    <View>
                        {itemClick == true ?

                            <Image
                                style={styles.iconStyle}
                                source={blackBell}
                                // source={require('../img/bell_fill.png')}
                                resizeMode='contain'
                            /> :
                            <Image
                                style={styles.iconStyle}
                                // source={require('../img/black_bell.png')}
                                source={bellFill}
                                resizeMode='contain'
                            />
                        }
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.iconContainer}
                    onPress={() => {
                        // this.setState({ popupOpen: true }, () => {

                        //     this.streamerUserBlock(item.id, item);
                        // });
                        streamerUserBlock(item.id)
                    }}
                >
                    <View >
                        <Image
                            style={styles.iconStyle}
                            source={roundMinus}
                            resizeMode='contain'
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const render_contactList: ListRenderItem<any> = ({ item, index }) => {
        return (
            <View style={styles.contactListContainer}>
                <View style={styles.profilePictureContainer} >
                    {item?.profilePicture == "" ?
                        <View style={styles.placeholder}>
                            <Text style={styles.txt}>{item?.name.substring(0, 1)}</Text>
                        </View> :
                        <View style={styles.placeholder}>
                            <Image
                                style={styles.profileImage}
                                source={{ uri: item?.profilePicture }}
                                resizeMode='cover'
                            />
                        </View>
                    }
                </View>
                <View style={styles.nameListContainer} >
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                {/* {!this.state.audienceList.includes(item) && */}
                <TouchableOpacity style={styles.iconContainer}
                    onPress={() => {
                        //   this.setState({ audienceList: this.state.audienceList.push(item), popupOpen: true })
                        //  this.setState({ audienceList: [...this.state.audienceList, item], popupOpen: true })
                        // this.sentNotification(item.id);
                        // this.setState({ popupOpen: true })
                        // this.setState({ itemClick: true })

                    }} >
                    <View>
                        {itemClick == true ?

                            <Image
                                style={styles.iconStyle}
                                source={blackBell}
                                // source={require('../img/bell_fill.png')}
                                resizeMode='contain'
                            /> :
                            <Image
                                style={styles.iconStyle}
                                // source={require('../img/black_bell.png')}
                                source={bellFill}
                                resizeMode='contain'
                            />
                        }
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.iconContainer}
                    onPress={() => {
                        // this.setState({ popupOpen: true }, () => {

                        //     this.streamerUserBlock(item.id, item);
                        // });
                    }}
                >
                    <View >
                        <Image
                            style={styles.iconStyle}
                            source={roundMinus}
                            resizeMode='contain'
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView
            style={styles.bodyContainer}>
            <GestureHandlerRootView style={styles.container}>
                <View style={styles.topView}>
                    <View style={styles.mapTopView}>
                        <MapView
                            style={StyleSheet.absoluteFillObject}
                            // mapType={'terrain'}

                            //  mapType={Platform.OS == "ios" ? "hybridFlyover" : "hybrid"}
                            mapType={Platform.OS == 'ios' ? 'satelliteFlyover' : 'hybrid'}

                            zoomEnabled
                            pitchEnabled
                            zoomTapEnabled
                            zoomControlEnabled={false}
                            showsCompass={false}
                        >
                            {markers.map((marker, index) => (
                                <Marker
                                    key={marker.id}
                                    coordinate={marker.latLng}
                                    title={marker.name}
                                >
                                    <Image
                                        source={mediaLive}
                                        style={styles.mediaLiveImage}
                                        resizeMode="contain"
                                    />
                                </Marker>
                            ))}
                        </MapView>
                    </View>

                    {/* <View style={styles.container}> */}
                    <BottomSheet ref={ref}>
                        <View style={styles.bottomSheetContainer}>

                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="search contacts"
                                    placeholderTextColor={Theme.color.White}
                                    underlineColor={Theme.color.gray14}
                                // onChangeText={searchText => this.searchText(searchText)}
                                />

                                <View style={styles.searchIconContainer}>
                                    <Image
                                        style={styles.searchIcon}
                                        source={search}
                                        resizeMode='cover'
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.inviteContactContainer}
                                onPress={() => {
                                    // this.setState({ popupOpen: true });
                                    // { console.log('press', this.state.popupOpen) }
                                    navigation.navigate(Routes.NAV_INVITE_CONTACT_SCREEN)
                                }
                                }>
                                <View style={styles.userIconContainer}>
                                    <Image
                                        style={styles.userImage}
                                        source={whiteUser}
                                        resizeMode='cover'
                                    />
                                </View>
                                <Text style={styles.inviteContactText}>{String.INVITE_CONTACT}</Text>
                            </TouchableOpacity>

                            <ScrollView scrollEnabled={true} style={styles.contactList}>
                                <Text style={styles.headerStyle}>{String.STREAMER}</Text>
                                <FlatList
                                    data={streamerList}
                                    scrollEnabled={false}
                                    showsVerticalScrollIndicator={false}
                                    // ItemSeparatorComponent={this.FlatListItemSeparator}
                                    renderItem={render_streamerList}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                <Text style={styles.headerStyle}>{String.AUDIENCE}</Text>
                                <FlatList
                                    data={audienceList}
                                    scrollEnabled={false}
                                    showsVerticalScrollIndicator={false}
                                    // ItemSeparatorComponent={this.FlatListItemSeparator}
                                    renderItem={render_contactList}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </ScrollView>
                        </View>
                    </BottomSheet>
                </View>
            </GestureHandlerRootView >
            <Footer selectedTab="LiveScreen" />
            {
                isLoading ?
                    <Loading /> : null
            }
        </SafeAreaView >
    )
}

export default LiveMomentScreen;