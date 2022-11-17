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
    TouchableHighlight,
    NativeModules,
    NativeEventEmitter,
    PermissionsAndroid
} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Modal, Portal, Provider, TextInput } from 'react-native-paper';
import BleManager from 'react-native-ble-manager';
import { stringToBytes } from "convert-string";
import NetInfo from '@react-native-community/netinfo';
import { normalize } from "../../utils/dimentionUtils";
import { FontFamily, Theme } from "../../models";
import { PairingNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
import { Loading } from '../../components/loading';
import { chasmaIcon } from "../../assets";
import { STRINGS } from "../../models/constants";
import { ShowToast } from "../../utils/toastUtils";

const peripherals = new Map();

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
let concatData: any = '', importWIFI = 'from machine import WiFi';
const PairingScreen = (props: PairingNavigationProps) => {
    const { navigation } = props;
    const [showBLE, setshowBLE] = useState<boolean>(false);
    const [visibleModal, setvisibleModal] = useState<boolean>(false);
    const [ssid, setssid] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [peripheralId, setPeripheralID] = useState<string>("");
    const [peripheralName, setPeripheralName] = useState<string>("");
    const [scanning, setScanning] = useState<boolean>(false);
    const [deviceFound, setDeviceFound] = useState<boolean>(false);
    const [devices, setdevices] = useState<any[]>([]);



    const textInputOutlineStyle = {
        colors: {
            placeholder: '#A1A1A1',
            text: '#000000', primary: '#A1A1A1',
            underlineColor: 'transparent',
            background: 'white',

        }, fonts: {
            regular: {
                fontFamily: FontFamily.regular
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
            <View style={styles.itemSeparatorView} />
        );
    }
    useEffect(() => {
        try {
            if (Platform.OS == 'android') {
                if (Platform.OS === 'android' && Platform.Version >= 23) {
                    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                        if (result) {
                            console.log("Permission is OK");
                        } else {
                            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                                if (result) {
                                    console.log("User accept");
                                } else {
                                    console.log("User refuse");
                                }
                            });
                        }
                    });

                }
                BleManager.enableBluetooth()
                    .then(() => {
                        // Success code
                        console.log("The bluetooth is already enabled or the user confirm");
                    })
                    .catch((error) => {
                        // Failure code
                        console.log("The user refuse to enable bluetooth");
                    });
            }
            BleManager.start({ showAlert: false }).then(() => {
                // Success code
                console.log("Module initialized");
            });
            BleManager.checkState();

            if (Platform.OS == 'ios') {
                setTimeout(() => {
                    connectedDevice();
                }, 1000);
            } else {
                connectedDevice();
            }
        } catch (e) {
            console.log(e);
        }
        return () => {
            // bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
            // bleManagerEmitter.removeListener('BleManagerStopScan', this.handleStopScan);
            // bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
            // bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic);
            //removeEventListner();  //whenever the component removes it will executes
        }
    }, []);


    async function connectedDevice() {
        try {

            await BleManager.scan([], 5, true).then(() => {
                // Success code
                console.log("Scan started");
                setScanning(true);

            });

            await BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
                // Success code
                console.log("Connected peripherals: " + peripheralsArray.length);
            });

            // await NetInfo.fetch("wifi").then(state => {
            //     console.log("SSID", state.details.ssid);
            //     console.log("BSSID", state.details.bssid);
            //     console.log("Is connected?", state.isConnected);
            //     this.setState({ ssid: state.details.ssid })

            // });


            bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
            bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
            bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
            bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
            bleManagerEmitter.addListener(
                "BleManagerCentralManagerWillRestoreState",
                ({ peripheral }) => {
                    console.log(`IOS Received for characteristic-----> ${peripheral}`);
                }
            );
            bleManagerEmitter.addListener(
                "BleManagerDidUpdateNotificationStateFor",
                (peripheral) => {
                    console.log(`IOS Received for characteristic-----> ${peripheral}`);
                }
            );

            bleManagerEmitter.addListener("BleManagerDidUpdateState", (args) => {
                // The new state: args.state
                console.log("Received for characteristic----->", args);

            });

        } catch (e) {
            console.log(e)
        }
    }

    const handleDiscoverPeripheral = (peripheral: any) => {
        console.log('Got ble peripheral', peripheral);
        if (!peripheral.name) {
            peripheral.name = 'NO NAME';
        }
        { console.log('Name---->', peripheral.name) }
        { console.log('Name-IOS--->', peripheral.advertising.localName) }
        if (Platform.OS == 'android') {
            if (peripheral.name === "FRAME" || peripheral.name === "Frame" || peripheral.name === "Monocle") {
                peripherals.set(peripheral.id, peripheral);
                console.log('handleDiscoverPeripheral----->', Array.from(peripherals.values()));
                setdevices(Array.from(peripherals.values()))
                setDeviceFound(true);
                setPeripheralName(peripheral.name);
            } else {
                setDeviceFound(false);
            }
        } else {
            if (peripheral.advertising.localName === "FRAME" || peripheral.advertising.localName === "Frame" || peripheral.advertising.localName === "Monocle") {
                peripherals.set(peripheral.id, peripheral);
                console.log('handleDiscoverPeripheral----->', Array.from(peripherals.values()));
                setdevices(Array.from(peripherals.values()))
                setDeviceFound(true);
            } else {
                setDeviceFound(false);
            }
        }
    }

    const handleUpdateValueForCharacteristic = (data: any) => {
        //console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
        console.log('Received data from Device-----> ' + String.fromCharCode.apply(String, data.value));

        var receiveData = String.fromCharCode.apply(String, data.value);
        var subData = '';
        concatData = concatData + receiveData;//OK1
        console.log("Receive data", typeof (receiveData));
        if (receiveData.includes('OKIMPORT')) {
            console.log("ok response coming");
            //dataWrite("WiFi.add('Sanatan Personal','passpass')\0x4", data.peripheral)
            dataWrite("WiFi.add('A','12345678')\0x4", data.peripheral)
            //dataWrite("p=WiFi.scan() \nprint('SCAN') \nprint(p)\x04", data.peripheral)


        } else if (receiveData.includes("OKSCAN")) {
            console.log("ok scan response coming");

            dataWrite('WiFi.add("A","12345678")\0x4', data.peripheral)
            // dataWrite("print('HI')\x04", data.peripheral);
        } else {
            console.log("ok response not coming");
        }

        // if (concatData.includes(">>>")) {
        //     console.log('COnCATDATA------>', concatData);

        //     //   subData = concatData.substring(concatData.indexOf(">") + 1, concatData.indexOf(">>>")).trim();
        //     subData = concatData.substring(0, concatData.indexOf(">>>")).trim();
        //     console.log('subdata------>', subData);
        //     if (subData == importWIFI) {

        //         console.log('CONDATA------>', importWIFI);
        //         concatData = '';
        //         //goWriteData();
        //     } else if (subData == 'import machine') {
        //         console.log('IMPORT DATA------>', subData);

        //         setTimeout(() => {
        //             //goTesteData();
        //         }, 2000);
        //     } else if (subData.startsWith('WiFi.add(')) {
        //         console.log('DATADATA', subData);
        //         //goWriteStatusData();
        //     }
        //     concatData = ""
        // } else if (receiveData.startsWith('WiFi.add(')) {
        //     console.log('DATADATA', receiveData);
        //     setTimeout(() => {
        //         //goWriteStatusData();
        //     }, 5000);

        // }
        // if (concatData.includes(importWIFI)) {
        //     console.log('CONDATA------>', importWIFI);
        //     this.goWriteData("WiFi.scan()")

        // }
        // console.log('DATAD------>', concatData);
        console.log('----------------------------------');
        //from machine import WiFi >>>

    }

    const handleStopScan = () => {
        console.log('Scan is stopped');
        setScanning(false);
    }
    const startScan = () => {
        BleManager.scan([], 5, true).then(() => {
            // Success code
            console.log("Scan started");
            setScanning(true);

        });

    }
    const handleDisconnectedPeripheral = (data: any) => {
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);
            //setList(Array.from(peripherals.values()));
            setdevices(Array.from(peripherals.values()))

        }
        console.log('DATA ' + data);
        console.log('Disconnected ID ' + data.id);
        console.log('Disconnected from ' + data.peripheral);
    }
    const getPeripheralName = (item: any) => {
        if (item.advertising) {
            if (item.advertising.localName) {
                return item.advertising.localName;
            }
        }

        return item.name;
    };






    const testPeripheral2 = async (peripheral: any) => {
        BleManager.requestMTU(peripheral.id, 512)
            .then((mtu) => {
                // Success code
                console.log("MTU size changed to " + mtu + " bytes");
            })
            .catch((error) => {
                // Failure code
                console.log(error);
            });
        // BleManager.removeBond(peripheral.id)
        //     .then(() => {
        //         console.log("removeBond success");
        //     })
        //     .catch(() => {
        //         console.log("fail to remove the bond");
        //     });
        // BleManager.disconnect(peripheral.id);
        console.log('Peripheral ' + peripheral.id);

        BleManager.createBond(peripheral.id)
            .then(async () => {
                console.log("createBond success or there is already an existing one");
                BleManager.requestMTU(peripheral.id, 512)
                    .then((mtu) => {
                        // Success code
                        console.log("MTU size changed to " + mtu + " bytes");
                    })
                    .catch((error) => {
                        // Failure code
                        console.log(error);
                    });
                if (peripheral) {
                    console.log('Peripheral---> ' + peripheral.id);
                    console.log('Peripheral---> connected ' + peripheral.connected);
                    if (peripheral.connected) {
                        console.log('Peripheral-->connected ' + peripheral.id);
                        BleManager.disconnect(peripheral.id);
                    } else {
                        console.log('Peripheral-->disconnected ' + peripheral.id);
                        await BleManager.connect(peripheral.id).then(async () => {
                            let p = peripherals.get(peripheral.id);
                            if (p) {
                                p.connected = true;
                                peripherals.set(peripheral.id, p);
                                // setList(Array.from(peripherals.values()));

                                setdevices(Array.from(peripherals.values()))
                            }
                            console.log('Connected to ' + peripheral.id);





                            /* Test read current RSSI value */
                            await BleManager.retrieveServices(peripheral.id).then(async (peripheralData) => {
                                console.log('Retrieved peripheral services', peripheralData);
                                console.log('Retrieved peripheral charac', peripheralData.characteristics);
                                // console.log('Retrieved peripheral services', peripheralData.value);
                                // this.setState({ peripheralID: peripheral.id });
                                setPeripheralID(peripheral.id);
                                BleManager.readRSSI(peripheral.id).then((rssi) => {
                                    console.log('Retrieved actual RSSI value', rssi);
                                    let p = peripherals.get(peripheral.id);
                                    if (p) {
                                        p.rssi = rssi;
                                        peripherals.set(peripheral.id, p);
                                        //setList(Array.from(peripherals.values()));
                                        //  this.setState({ devices: peripherals.values() })
                                        setdevices(Array.from(peripherals.values()))

                                    }
                                });
                                BleManager.isPeripheralConnected(
                                    peripheral.id,
                                    []
                                ).then((isConnected) => {
                                    if (isConnected) {
                                        console.log("Peripheral is connected!");
                                        var stringdata = 'GOOD';

                                        // const settingsString = stringdata.join('x');
                                        BleManager.requestMTU(peripheral.id, 512)
                                            .then((mtu) => {
                                                // Success code
                                                console.log("MTU size changed to " + mtu + " bytes");
                                            })
                                            .catch((error) => {
                                                // Failure code
                                                console.log(error);
                                            });




                                    } else {
                                        console.log("Peripheral is NOT connected!");
                                    }
                                });
                                var service = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
                                var UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'
                                var readUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'
                                await BleManager.startNotification(peripheral.id, service, readUUID).then(() => {

                                    console.log('Start notification: ');
                                });

                                BleManager.read(
                                    peripheral.id,
                                    service,
                                    UUID
                                )
                                    .then((readData) => {
                                        // Success code
                                        console.log('Read: ');

                                        // const buffer = Buffer.Buffer.from(readData); //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
                                        // const sensorData = buffer.readUInt8(1, true);
                                        // console.log('Read:2 ' + sensorData);

                                    })
                                    .catch((error) => {
                                        // Failure code
                                        console.log("Read data failure", error);
                                    });
                                var stringdata: string = '';

                                setTimeout(() => {    //1st Command
                                    console.log("1st Command");

                                    dataWrite("\x03", peripheral.id);

                                    setTimeout(() => {//2nd Command
                                        console.log("2nd Command");

                                        dataWrite("\x01", peripheral.id);

                                    }, 3000);
                                    setTimeout(() => {//3rd Command
                                        console.log("3rd Command \\x04");

                                        dataWrite("from machine import WiFi\x04", peripheral.id);
                                        //  dataWrite("print('hi')\x04", peripheral.id);

                                    }, 6000);


                                }, 5000);
                            });



                            //  Test using bleno's pizza example
                            https://github.com/sandeepmistry/bleno/tree/master/examples/pizza

                            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
                                console.log("------------>", peripheralInfo);
                                var service = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
                                var bakeCharacteristic = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
                                var crustCharacteristic = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
                                var demoString = 'help("modules")';

                                // setTimeout(() => {
                                //     BleManager.write(peripheral.id, service, crustCharacteristic, stringToBytes(demoString)).then(() => {
                                //         console.log('Writed NORMAL crust');
                                //         BleManager.write(peripheral.id, service, bakeCharacteristic, [1, 95]).then(() => {
                                //             console.log('Writed 351 temperature, the pizza should be BAKED');

                                //             //var PizzaBakeResult = {
                                //             //  HALF_BAKED: 0,
                                //             //  BAKED:      1,
                                //             //  CRISPY:     2,
                                //             //  BURNT:      3,
                                //             //  ON_FIRE:    4
                                //             //};
                                //         });
                                //     });

                                // }, 200);
                            }).catch((error) => {
                                console.log('Notification error', error);


                            });



                        }).catch((error) => {
                            console.log('Connection error', error);
                        });


                        // var service = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
                        // var UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'

                        // BleManager.connect(peripheral.id)
                        //   .then(() => {
                        //     console.log('connected');
                        //     return BleManager.retrieveServices(peripheral.id);
                        //   })
                        //   .then(() => {
                        //     console.log('retrieveServices');

                        //     return BleManager.startNotification(peripheral.id, service, UUID);
                        //   })
                        //   .then(() => {
                        //     return bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', (data) => {
                        //       console.log('BluetoothUpdateValue', data.value);
                        //       console.log('Read: ' + data.value);
                        //     })
                        //   })
                        //   .catch((error) => console.log('Error: ' + error));


                    }


                }

            })
            .catch(() => {
                console.log("fail to bond");
            });

    }



    const testPeripheral = async (peripheral: any) => {
        BleManager.createBond(peripheral.id)
            .then(async () => {
                console.log("createBond success or there is already an existing one");
                setPeripheralID(peripheral.id);

                if (peripheral) {
                    await BleManager.connect(peripheral.id).then(async () => {
                        setPeripheralID(peripheral.id);
                        let p = peripherals.get(peripheral.id);
                        if (p) {
                            p.connected = true;
                            peripherals.set(peripheral.id, p);
                            setdevices(Array.from(peripherals.values()))
                        }
                        console.log('Connected to ' + peripheral.id);
                        console.log('Device Name ' + peripheral.name);
                        if (peripheral.name == 'Frame' || peripheral.name == 'FRAME') {
                            BleManager.requestMTU(peripheral.id, 256)
                                .then((mtu) => {
                                    // Success code
                                    console.log("MTU size changed to " + mtu + " bytes");
                                    BleManager.retrieveServices(peripheral.id).then(async (peripheralData) => {
                                        console.log('Retrieved peripheral services', peripheralData);
                                        var service = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
                                        var UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'
                                        var readUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'
                                        await BleManager.startNotification(peripheral.id, service, readUUID).then(() => {
                                            console.log('Start notification: ');
                                            setTimeout(() => {    //1st Command
                                                console.log("1st Command");

                                                dataWrite("\x03", peripheral.id);

                                                setTimeout(() => {//2nd Command
                                                    console.log("2nd Command");

                                                    dataWrite("\x01", peripheral.id);

                                                }, 3000);

                                                setTimeout(() => {//3rd Command
                                                    console.log("3rd Command \\x04");

                                                    dataWrite("from machine import WiFi \nprint('IMPORT')\x04", peripheral.id);
                                                    // dataWrite("print('hi')\x04", peripheral.id);

                                                }, 4000);

                                            }, 5000);

                                        }).catch(() => {
                                            console.log("Notification error");

                                        });

                                    }).catch(() => {
                                        console.log("Retrive error");

                                    })
                                })
                                .catch((error) => {
                                    // Failure code
                                    console.log("MTU error ", error);
                                });
                        } else {
                            BleManager.isPeripheralConnected(
                                peripheral.id,
                                []
                            ).then((isConnected) => {
                                if (isConnected) {
                                    console.log("Monocle is connected!");
                                    ShowToast(STRINGS.MONOCLE_CONNECTED)
                                    setTimeout(() => {
                                        navigation.navigate(Routes.NAV_MEDIA_SCREEN);
                                    }, 2000);
                                }
                            });
                        }


                    }).catch(() => {
                        console.log("Device not connected");

                    });
                }

            })
            .catch(() => {
                console.log("fail to bond");
            });
    }


    const dataWrite = (data: any, peripheralId: any) => {
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
        )
            .then((readData) => {
                // Success code
                console.log('write:---> ' + readData);

                // const buffer = Buffer.Buffer.from(readData); //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
                // const sensorData = buffer.readUInt8(1, true);
                // console.log('Read:2 ' + sensorData);

            })
            .catch((error) => {
                // Failure code
                console.log("write data failure", error);
            });
        BleManager.writeWithoutResponse(
            peripheralId,
            service,
            UUID,
            stringToBytes(data),
            256
        )
            .then(() => {
                // Success code
                console.log("Writed:-----" + data);
            })
            .catch((error) => {
                // Failure code
                console.log("WRITE----??", error);
            });

    }




    const renderItem = (item: any) => {
        return (
            <TouchableHighlight onPress={() => console.log('Click')}>
                <View style={styles.renderItemMainView}>

                    <View style={styles.renderItemView} >
                        <Text style={styles.renderItemText}>{getPeripheralName(item)}</Text>
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

                            testPeripheral(item)
                        }}
                    >
                        <View style={styles.connectView} >
                            <Text style={styles.connectText}>{STRINGS.CONNECT}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableHighlight>

        );
    }

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <Provider>
                <View style={styles.mainContainer}>
                    <View style={styles.mainContainer2} >
                        {showBLE == true ?
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
                                            <View style={styles.height15} />

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
                                                    <Text style={styles.submitText}>{STRINGS.SUBMIT}</Text>

                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </Modal>
                                </Portal>
                                <View style={styles.TouchableView}>
                                    <TouchableOpacity style={styles.TouchableStyle}
                                        onPress={() => {
                                            startScan()
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
                                    <Loading /> : null
                                }
                            </View>

                            :
                            <View style={styles.pairTitleView}>
                                <Text style={styles.pairTitle}>{STRINGS.LETS_PAIR_TITLE}</Text>
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
                                    <Text style={styles.ensureText}>{STRINGS.ENSURE_TITLE}</Text>
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