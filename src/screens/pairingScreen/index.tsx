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
    ScrollView,
    ActivityIndicator,
    FlatList,
    TouchableHighlight
} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Modal, Portal, Provider, TextInput } from 'react-native-paper';
import BleManager from 'react-native-ble-manager';
//import { stringToBytes } from 'convert-string';
import NetInfo from '@react-native-community/netinfo';

import { normalize } from "../../utils/dimentionUtils";
import { Theme } from "../../models";
import { PairingNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
import { chasmaIcon } from "../../assets";
import {ENSURE_TITLE, LETS_PAIR_TITLE, SUBMIT, CONNECT} from "../../models/constants";

const PairingScreen = (props: PairingNavigationProps) => {
    const [showBLE, setshowBLE] = useState<boolean>(false);
    const [visibleModal, setvisibleModal] = useState<boolean>(false);
    const [ssid, setssid] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [scanning, setscanning] = useState<boolean>(false);
    const [devices, setdevices] = useState([]);

    

    const textInputOutlineStyle = {
        colors: {
            placeholder: '#A1A1A1',
            text: '#000000', primary: '#A1A1A1',
            underlineColor: 'transparent',
            background: 'white',

        }, fonts: {
            regular: {
                fontFamily: 'Apercu Pro Regular'
            }
        },
        roundness: 10,
    }
    const showModal = () => {
        setvisibleModal(true)
    }
    const hideModal = () => {
        setvisibleModal(false)
    }
    const FlatListItemSeparator = () => {
        return (
            <View style={styles.itemSeparatorView}/>
        );
    }
    const renderItem = (item) => {
        return (
            <TouchableHighlight onPress={() => console.log('Click')}>
                <View style={styles.renderItemMainView}>

                    <View style={styles.renderItemView} >
                        <Text style={styles.renderItemText}>{this.getPeripheralName(item)}</Text>
                        <View style={styles.marginTopView}>
                            <Text style={styles.renderItemText2}> {item.id}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.connectTouchView}
                        onPress={() => {
                            // this.setState({ bluetoothDevice: item }, () => {
                            //     NetInfo.fetch().then((state) => {
                            //         console.log('net status', state)
                            //     })
                            //     // this.showModal()
                            //     // this.testPeripheral();
                            // })

                            // this.testPeripheral(item)
                        }}
                    >
                        <View style={styles.connectView} >
                            <Text style={styles.connectText}>{CONNECT}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableHighlight>

        );
    }
    
    return(
        <SafeAreaView style={styles.bodyContainer}>
            <Provider>
                <View style={styles.mainContainer}>
                    <View style={styles.mainContainer2} >
                    {showBLE == true?
                        <View style={styles.marginTopView}>
                            <Portal>
                            <Modal visible={visibleModal} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                                    
                                <View style={styles.insideModalView}>

                                    <TextInput
                                        mode="outlined"
                                        label="Enter your SSID/wifi/hotspot name"
                                        keyboardType="default"
                                        value={ssid}
                                        //fontSize={15}
                                        editable={false}
                                        onChangeText={(ssid) => setssid(ssid)}
                                        theme={textInputOutlineStyle}

                                    />
                                    <View style={styles.height15}/>

                                    <TextInput
                                        mode="outlined"
                                        label="Enter your Wifi password"
                                        keyboardType="default"
                                        value={password}
                                        //fontSize={15}
                                        onChangeText={(password) => setpassword(password)}
                                        theme={textInputOutlineStyle}

                                    />
                                    <TouchableOpacity activeOpacity={0.6}
                                        onPress={() => {
                                            //this.wifiConnection();
                                            //SimpleToast.show('Register Successfully!',SimpleToast.SHORT)
                                            // 
                                            //console.log("Register", "Hii")
                                        }}>
                                        <View style={styles.submitButtonView}>
                                            <Text style={styles.submitText}>{SUBMIT}</Text>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            </Portal>
                            <View style={styles.TouchableView}>
                                <TouchableOpacity style={styles.TouchableStyle}
                                    onPress={() => {
                                        //this.startScan()
                                    }}
                                >
                                    <Text style={styles.TouchableText}>{'Scan Bluetooth (' + (scanning ? 'on' : 'off') + ')'}</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={devices}
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                                ItemSeparatorComponent={FlatListItemSeparator}
                                renderItem={({ item }) => renderItem(item)}
                                keyExtractor={item => item.id}

                            />
                            {scanning ?
                                <ActivityIndicator
                                    style={styles.activityIndicatorStyle}
                                    size="large"
                                    color={Theme.color.Black}
                                /> :
                                null
                            }
                        </View>
                        
                        :
                        <View style={styles.pairTitleView}>
                            <Text style={styles.pairTitle}>{LETS_PAIR_TITLE}</Text>
                            <View style={styles.circularProgressView}>
                                <AnimatedCircularProgress
                                    size={300}
                                    width={8}
                                    fill={100}
                                    duration={5000}
                                    tintColor={Theme.color.Black}
                                    onAnimationComplete={() => {
                                        setshowBLE(true)
                                    }}
                                    backgroundColor={Theme.color.gray15} >

                                    {
                                        (fill) => (
                                            <Image
                                                style={styles.imageView}
                                                source={chasmaIcon}
                                                resizeMode='contain'
                                            />
                                        )
                                    }
                                </AnimatedCircularProgress>
                                <Text style={styles.ensureText}>{ENSURE_TITLE}</Text>
                            </View>
                        </View>
                    }        
                    </View>
                </View>
            </Provider>
        </SafeAreaView>
    )
};

export default PairingScreen;