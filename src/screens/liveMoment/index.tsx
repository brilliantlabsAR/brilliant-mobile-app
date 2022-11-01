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
import * as String from '../../models/constants'

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

    const [streamerList, setStreamerList] = useState<any[]>([
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
    ]);
    const [names, setNames] = useState<string[]>([]);

    const [backendContacts, setbackendContacts] = useState([]);
    const [contactList, setcontactList] = useState<any[]>([]);
    const [audienceList, setaudienceList] = useState<any[]>([]);
    const [itemClick, setItemClick] = useState<boolean>(false);

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
    }, [])


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
                console.log(contact)
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
                    console.log('CONTACT', contact);

                    let result = contact.filter(item => {
                        if (item.phoneNumbers && item.phoneNumbers.length > 0) {
                            var number = item.phoneNumbers[0].number.toString();
                            console.log('new', number);

                            return backendContacts.toString().indexOf(number.replace(/ /g, '').replace('(', '').replace(')', '').replace('-', '')) > -1
                        } else {
                            return false;
                        }
                    }
                    )

                    console.log('result', result);
                    setcontactList(result);
                    setaudienceList(result);

                    console.log('HIHIOKOK', contactList)
                })
            }).catch((e) => {
                console.log(e)
            })
        } catch (e) {
            console.log(e);
        }

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
                            mapType={Platform.OS == "ios" ? "satellite" : "hybrid"}
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
                                    renderItem={render_contactList}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                <Text style={styles.headerStyle}>{String.AUDIENCE}</Text>
                                <FlatList
                                    data={streamerList}
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