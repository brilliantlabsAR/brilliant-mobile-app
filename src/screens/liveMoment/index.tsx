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
    PermissionsAndroid
} from "react-native";
import { Theme } from "../../models";
import { LiveMomentNavigationProps } from "../../navigations/types";
import { ILoginVerification } from "../../types";
import { leftarrow, smartphone, mediaLive } from "../../assets";
import OTPContainer from "../../components/otpContainer";
import { ShowToast } from "../../utils/toastUtils";
import * as CONST from '../../models';
const { height: SCREEN_HEIGHT } = Dimensions.get('screen');
const { width: SCREEN_WIDTH } = Dimensions.get('screen');
import MapView, { Marker } from "react-native-maps";
import { styles } from "./styles";
import { normalize } from "../../utils/dimentionUtils";
import Contact from 'react-native-contacts';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = LiveMomentNavigationProps
const LiveMomentScreen = (props: Props) => {
    const { navigation, route } = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [markers, setMarkers] = React.useState([
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
    const [names, setNames] = useState<string[]>([]);

    const [backendContacts,setbackendContacts]=React.useState([]);
    const [contactList,setcontactList]=React.useState<any[]>([]);
    const [audienceList,setaudienceList]=React.useState<any[]>([]);




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
                    setaudienceList(result)

                    console.log('HIHIOKOK', contactList)
                })
            }).catch((e) => {
                console.log(e)
            })
        } catch (e) {
            console.log(e);
        }

    }

    return (

        <SafeAreaView
            style={styles.bodyContainer}>
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
                                    style={{ width: normalize(25), height: normalize(25) }}
                                    resizeMode="contain"
                                />
                            </Marker>
                        ))}
                    </MapView>
                </View>


                {/* <BottomSheet withOverlay={true} isOpen={this.state.popupOpen} sliderMinHeight={Platform.OS == "android" ? 120 : 80} sliderMaxHeight={SCREEN_HEIGHT - 180}    >
            {(onScrollEndDrag) => (

                <ScrollView onScrollEndDrag={onScrollEndDrag}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            marginBottom: Dimension(60),
                            width: '100%'
                        }}
                    >
                        <View style={{
                            backgroundColor: Color.Black,
                            height: 0.2,
                            width: SCREEN_WIDTH,
                            opacity: 0.5
                        }} />

                        <View style={{
                            backgroundColor: Color.gray14,
                            opacity: 0.9,
                            height: Dimension(30),
                            width: '100%',
                            borderRadius: Dimension(15),
                            marginTop: Dimension(20),
                            flex: 1,
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center',
                            opacity: 0.4

                        }}>
                            <TextInput
                                style={{
                                    fontSize: Dimension(10),
                                    color: Color.Black,
                                    fontFamily: 'Apercu Pro Regular',
                                    marginLeft: Dimension(5),
                                    flex: 5,

                                }}
                                placeholder="search contacts"
                                placeholderTextColor={Color.gray}
                                onChangeText={searchText => this.searchText(searchText)}
                            />

                            <View style={{
                                justifyContent: 'flex-end',
                                flex: 1,
                                flexDirection: 'row',
                                alignContent: 'center',
                                alignItems: 'center',
                                marginRight: Dimension(20)
                            }}>
                                <Image
                                    style={{
                                        height: Dimension(10),
                                        width: Dimension(10),
                                    }}
                                    source={require('../img/search.png')}
                                    resizeMode='cover'
                                />
                            </View>

                        </View>
                        <TouchableOpacity style={{
                            marginTop: Dimension(20),
                            marginLeft: Dimension(15),
                            marginRight: Dimension(15),
                        }}
                            onPress={() => {
                                this.setState({ popupOpen: true });
                                { console.log('press', this.state.popupOpen) }
                                this.props.navigation.navigate("InviteContactScreen")
                            }
                            }>
                            <View style={{
                                flexDirection: 'row',
                                flex: 1,

                            }}>

                                <View style={{
                                    height: Dimension(40),
                                    width: Dimension(40),
                                    padding: Dimension(10),
                                    borderRadius: Dimension(180 / 2),
                                    backgroundColor: Color.Black,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                }}

                                >
                                    <Image
                                        style={styles.userImage}
                                        source={require('../img/white_user.png')}
                                        resizeMode='cover'

                                    />
                                </View>
                                <Text
                                    style={{
                                        fontSize: Dimension(12),
                                        color: Color.Black,
                                        fontFamily: 'Apercu Pro Light',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        marginLeft: Dimension(15)
                                    }}
                                >{'Invite Contacts'}</Text>

                            </View>
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: Dimension(12),
                                color: Color.Black,
                                opacity: 0.5,
                                fontFamily: 'Apercu Pro Light',
                                marginTop: Dimension(20),
                                marginLeft: Dimension(15),
                                marginRight: Dimension(15),
                            }}
                        >{'Streamer'}</Text>
                        <FlatList
                            data={this.state.streamerList}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={ContactListItem}
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <Text
                            style={{
                                fontSize: Dimension(12),
                                color: Color.Black,
                                opacity: 0.5,
                                fontFamily: 'Apercu Pro Light',
                                marginTop: Dimension(20),
                                marginLeft: Dimension(15),
                                marginRight: Dimension(15),
                            }}
                        >{'My audience (' + this.state.audienceList.length + ')'}</Text>
                        <FlatList
                            data={this.state.audienceList}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={({ item, index }) =>


                                <View style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    height: Dimension(60),
                                    marginLeft: Dimension(15),
                                    marginRight: Dimension(15),
                                }}>
                                    <View style={{
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }} >
                                        <View style={styles.imgCon}>
                                            {item.profilePicture == "" ?
                                                <View style={styles.placeholder}>
                                                    <Text style={styles.txt}>{item.name.substring(0, 1)}</Text>
                                                </View> :
                                                <View style={styles.placeholder}>
                                                    <Image
                                                        style={{
                                                            height: Dimension(55),
                                                            width: Dimension(55)
                                                        }}
                                                        source={{ uri: item.profilePicture }}
                                                        resizeMode='cover'
                                                    />
                                                </View>
                                            }

                                        </View>

                                    </View>
                                    <View style={{
                                        marginLeft: Dimension(10),
                                        flexDirection: 'column',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }} >
                                        <Text
                                            style={{
                                                fontSize: Dimension(12),
                                                color: Color.Black,
                                                fontFamily: 'Apercu Pro Regular',

                                            }}
                                        >{item.name}</Text>
                                    </View>
                                    <TouchableOpacity style={{
                                        flexDirection: 'row',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        flex: 6
                                    }} activeOpacity={0.6}
                                        onPress={() => {
                                            // this.setState({ audienceList: this.state.audienceList.filter(contact => contact != item), popupOpen: true })
                                            this.setState({ popupOpen: true }, () => {
                                                this.audienceUserBlock(item.id, item, index);
                                            });
                                        }
                                        }>
                                        <View  >
                                            <Image
                                                style={{
                                                    height: Dimension(15),
                                                    width: Dimension(15)
                                                }}
                                                source={require('../img/round_minus.png')}
                                                resizeMode='contain'
                                            />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            }
                            keyExtractor={item => item.id}
                        />

                        <View style={{
                            backgroundColor: 'transparent',
                            height: Dimension(10)
                        }} />

                    </View>

                </ScrollView>
            )}
        </BottomSheet> */}

            </View>
            {
                isLoading ?
                    <ActivityIndicator
                        style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: Theme.color.transparent }}
                        size="large"
                        color={Theme.color.Black}
                    /> : null
            }

        </SafeAreaView>

    )



}
export default LiveMomentScreen;