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
    Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageCropPicker, { clean } from "react-native-image-crop-picker";
import Modal from 'react-native-modal';
import { API_SLUG_CONTENT, API_LOGIN, Theme } from "../../models";
import { AccountNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
import { Loading } from '../../components/loading';
import { mainUser, blackCamera, userIcon, menuBluetooth, menuDeviceFrame, liveStreaming, menuLicence, menuData, menuHelp } from "../../assets";
import { ASYNC_CONST, STRINGS } from "../../models/constants";
import Footer from "../../components/footer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchMyAccountData } from "../../redux/appSlices/myAccountSlice";
import { apiStatus } from "../../redux/apiDataTypes";
import { FetchProfilePictureData } from "../../redux/appSlices/profilePictureSlice";
import { cleanStorageItem } from "../../utils/asyncUtils";
import {  resetOTPData } from "../../redux/authSlices/otpVerifySlice";
import { resetLogin } from "../../redux/authSlices/loginSlice";
import { resetResendData } from "../../redux/authSlices/otpResendSlice";

const MyAccountScreen = (props: AccountNavigationProps) => {
    const { navigation } = props;
    const [userImageState, setUserImageState] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    let file: any = '';
    const status = useAppSelector(state => state.myAccountSlice.status);
    const userDetails = useAppSelector(state => state.myAccountSlice.userData);


    useEffect(() => {
        setShowLoading(true);
        dispatch(FetchMyAccountData());
    }, []);


    useEffect(() => {
        if (status === apiStatus.success) {
            setShowLoading(false);
            console.log("data-->", userDetails);
            // console.log("data-->2", userDetails.name);
            setFullName(userDetails.name);
            AsyncStorage.setItem('name', userDetails.name);
            AsyncStorage.setItem('countryCode', userDetails.cc);
            AsyncStorage.setItem('phone', userDetails.phone);
            AsyncStorage.setItem('email', userDetails.email);
            if (userDetails.profilePicture == "") {
                setUserImageState('');
            } else {
                setUserImageState(userDetails.profilePicture);
            }
        } else if (status === apiStatus.failed) {
            setShowLoading(false);
        }
    }, [status]);




    const openModal = () => {
        setModalVisible(true);
    }
    const openGallery = () => {
        ImageCropPicker.openPicker({
            compressImageQuality: 0.9,
        }).then(async image => {
            file = {
                uri: Platform.OS === 'android' ? image.path : image.path.replace("file://", ""),
                name: image.path.split("/")[image.path.split("/").length - 1],
                type: 'image/jpeg'
            }
            console.log("check image path", file);

            setModalVisible(false)
            setUserImageState(image.path);
            setShowLoading(true);
            // await axios.post(
            //     Const.API_BASE_URL + Const.API_UPDATE_IMAGE,
            //     data,
            //     { headers: imageHeaders }
            // ).then((res) => {
            //     console.log("image data", res.data)
            // }).catch((e) => {
            //     console.log(e);
            // })
            dispatch(FetchProfilePictureData(file));
            setShowLoading(false);
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
            setUserImageState(image.path);

        }).catch(error => console.log(error))
    }
    const logout = () => {
        Alert.alert(
            "Alert",
            "Are you want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async() => {
                        dispatch(resetLogin());
                        dispatch(resetOTPData());
                        dispatch(resetResendData());
                        cleanStorageItem().then(()=>{
                            navigation.replace(Routes.NAV_SPLASH_SCREEN)
                        });
                        
                    }
                }
            ]
        )
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
                                <Text style={styles.menuText}>{STRINGS.UPDATE_PROFILE}</Text>
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
                                <Text style={styles.menuText}>{STRINGS.UNPAIR_DEVICE}</Text>
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
                                <Text style={styles.menuText}>{STRINGS.UPDATE_DEVICE_FIRMWARE}</Text>
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
                                <Text style={styles.menuText}>{STRINGS.START_LIVE}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.menuBox}
                                onPress={() => {
                                    navigation.navigate(Routes.NAV_HELP_SCREEN, { pageNo: "1" });
                                }}>
                                <Image
                                    style={styles.menuIcon}
                                    source={menuLicence}
                                    resizeMode='contain'
                                />
                                <Text style={styles.menuText}>{STRINGS.LICENSE}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.menuBox}
                                onPress={() => {
                                    navigation.navigate(Routes.NAV_HELP_SCREEN, { pageNo: "2" });
                                }

                                }>
                                <Image
                                    style={styles.menuIcon}
                                    source={menuData}
                                    resizeMode='contain'
                                />
                                <Text style={styles.menuText}>{STRINGS.PRIVACY}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.menuBox}
                                onPress={() => {
                                    navigation.navigate(Routes.NAV_HELP_SCREEN, { pageNo: "3" });
                                }
                                }>
                                <Image
                                    style={styles.menuIcon}
                                    source={menuHelp}
                                    resizeMode='contain'
                                />
                                <Text style={styles.menuText}>{STRINGS.HELP}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6}
                                onPress={() =>
                                    logout()
                                }
                                style={styles.logoutView}>
                                <Text style={styles.logoutText}>Logout</Text>
                            </TouchableOpacity>
                            <View style={styles.heightView} />
                        </View>
                    </View>
                    {
                        showLoading ?
                            <Loading /> : null
                    }
                </ScrollView>
                <Modal
                    isVisible={modalVisible}
                    onBackdropPress={() => setModalVisible(false)}
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
                            <Text style={styles.modalText}>{STRINGS.CHOOSE_GALLARY}</Text>
                        </TouchableOpacity>
                        <View style={styles.modalHeight} />
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.modalBox}
                            onPress={() =>
                                setModalVisible(false)}>
                            <Text style={styles.modalText}>{STRINGS.CANCEL}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            {/* <Footer selectedTab="MyAccount" /> */}
        </SafeAreaView>
    )
};

export default MyAccountScreen;

