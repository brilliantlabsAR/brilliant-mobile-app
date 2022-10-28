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
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageCropPicker from "react-native-image-crop-picker";
import Modal from 'react-native-modal';

import { normalize } from "../../utils/dimentionUtils";
import { Theme } from "../../models";
import { AccountNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
import { mainUser, blackCamera, userIcon, menuBluetooth, menuDeviceFrame, liveStreaming, menuLicence, menuData, menuHelp } from "../../assets";
import { UPDATE_PROFILE, UNPAIR_DEVICE, UPDATE_DEVICE_FIRMWARE, START_LIVE, LICENSE, PRIVACY, HELP, CHOOSE_GALLARY, CANCEL } from "../../models/constants";

const MyAccountScreen = (props: AccountNavigationProps) => {
    const { navigation } = props;
    const [userImageState, setuserImageState] = useState<string>("");
    const [fullName, setfullName] = useState<string>("");
    const [showLoading, setshowLoading] = useState<boolean>(false);
    const [modalVisible, setmodalVisible] = useState<boolean>(false);
    let file = '';

    const openModal = () => {
        setmodalVisible(true);
    }
    const openGallery = () => {
        ImageCropPicker.openPicker({
            compressImageQuality: 0.9,
        }).then(image => {
            file = {
                uri: Platform.OS === 'android' ? image.path : image.path.replace("file://", ""),
                type: 'image/jpeg',
                name: image.path.split("/")[image.path.split("/").length - 1]
            }

            setmodalVisible(false)
            setuserImageState(image.path);
            setshowLoading(true);
            //uploadProfileImage();
        })
            .catch(error => console.log(error))
    }

    const openCamera = () => {
        ImageCropPicker.openCamera({
            compressImageQuality: 0.9
        }).then(image => {
            file = {
                uri: Platform.OS === 'android' ? image.path : image.path.replace("file://", ""),
                type: 'image/jpeg',
                name: image.path.split("/")[image.path.split("/").length - 1]
            }
            setuserImageState(image.path);

        }).catch(error => console.log(error))
    }

    return (
        <SafeAreaView style={styles.bodyContainer}>
            <View style={styles.mainContainer}>
                <ScrollView style={styles.firstScrollView}>
                    <View>
                        <View style={styles.insideFirstScrollView}>
                            <View style={styles.profileImageView}>
                                {userImageState == '' &&
                                    <Image
                                        style={styles.userImage}
                                        source={mainUser}
                                        resizeMode='cover'

                                    />
                                }
                                {userImageState != '' &&
                                    <Image
                                        style={styles.userProfileImage}
                                        source={{ uri: userImageState }}
                                        resizeMode='cover'

                                    />
                                }
                            </View>
                            <TouchableOpacity style={styles.openModalTouch}
                                onPress={() => openModal()}>
                                <View >

                                    <Image
                                        style={styles.cameraImageView}
                                        source={blackCamera}
                                        resizeMode='cover'

                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.nameText}>{fullName}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.menuBox}
                                onPress={() =>
                                    navigation.navigate(Routes.NAV_UPDATE_PROFILE_SCREEN)}>
                                <Image
                                    style={styles.menuIcon}
                                    source={userIcon}
                                    resizeMode='contain'
                                />
                                <Text style={styles.menuText}>{UPDATE_PROFILE}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.menuBox}
                                onPress={() =>
                                    navigation.navigate(Routes.NAV_START_SCREEN)}>
                                <Image
                                    style={styles.menuIcon}
                                    source={menuBluetooth}
                                    resizeMode='contain'
                                />
                                <Text style={styles.menuText}>{UNPAIR_DEVICE}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.menuBox}
                                onPress={() => { }
                                    // navigation.navigate('RtmpStreamScreen')
                                    //showToast('coming soon')
                                }>
                                <Image
                                    style={styles.menuIcon}
                                    source={menuDeviceFrame}
                                    resizeMode='contain'
                                />
                                <Text style={styles.menuText}>{UPDATE_DEVICE_FIRMWARE}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.menuBox}
                                onPress={() =>
                                // navigation.navigate("LiveStreamingScreen")
                                { }
                                }>
                                <Image
                                    style={styles.menuIcon}
                                    source={liveStreaming}
                                    resizeMode='contain'
                                />
                                <Text style={styles.menuText}>{START_LIVE}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.menuBox}
                                onPress={() => { }
                                    // navigation.navigate("SlugScreen", {
                                    //     pageNo: "1"
                                    // })
                                }>
                                <Image
                                    style={styles.menuIcon}
                                    source={menuLicence}
                                    resizeMode='contain'
                                />
                                <Text style={styles.menuText}>{LICENSE}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.menuBox}
                                onPress={() => { }
                                    // navigation.navigate("SlugScreen", {
                                    //     pageNo: "2"
                                    // })
                                }>
                                <Image
                                    style={styles.menuIcon}
                                    source={menuData}
                                    resizeMode='contain'
                                />
                                <Text style={styles.menuText}>{PRIVACY}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.menuBox}
                                onPress={() =>
                                // navigation.navigate("SlugScreen", {
                                //     pageNo: "3"
                                // })
                                // navigation.navigate('RtmpStreamerScreen')
                                { }
                                }>
                                <Image
                                    style={styles.menuIcon}
                                    source={menuHelp}
                                    resizeMode='contain'
                                />
                                <Text style={styles.menuText}>{HELP}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6}
                                onPress={() =>
                                // logout()
                                { }
                                }
                                style={styles.logoutView}>
                                <Text style={styles.logoutText}>Logout</Text>
                            </TouchableOpacity>
                            <View style={styles.heightView} />
                        </View>
                    </View>
                    {
                        showLoading ?
                            <ActivityIndicator
                                style={styles.activityView}
                                size="large"
                                color={Theme.color.Black}
                            /> : null
                    }
                </ScrollView>
                <Modal
                    isVisible={modalVisible}
                    onBackdropPress={() => setmodalVisible(false)}
                >
                    <View style={styles.modalMainView}>

                        {/* <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.modalBox}
                        onPress={() => this.openCamera()}>

                        <Text style={styles.modalText}>{'Open Camera'}</Text>
                    </TouchableOpacity> */}
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.modalBox}
                            onPress={() => openGallery()}>
                            <Text style={styles.modalText}>{CHOOSE_GALLARY}</Text>
                        </TouchableOpacity>
                        <View style={styles.modalHeight} />
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.modalBox}
                            onPress={() =>
                                setmodalVisible(false)}>
                            <Text style={styles.modalText}>{CANCEL}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
};

export default MyAccountScreen;