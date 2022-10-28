
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
    Keyboard,
    Dimensions
} from "react-native";
import { Theme } from "../../models";
import * as Routes from "../../models/routes";
import { useNavigation } from "@react-navigation/native";
import { FooterNavigationProps } from "../../navigations/types";
import { IFooter } from "../../types";
import { styles } from "./styles";
const { width, height } = Dimensions.get('screen');
import { blackLive, blackPlaylist, blackUser, grayLive, grayPlaylist, grayUser } from "../../assets";

type Props = IFooter
const Footer = (props: Props) => {
    const { selectedTab } = props;
    const navigation = useNavigation<FooterNavigationProps>();
    return (
        <View style={styles.topView}>
            <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.mediaButtonStyle, { backgroundColor: selectedTab == "MediaScreen" ? Theme.color.grayEleven : Theme.color.White }]}
                onPress={() => navigation.replace(Routes.NAV_MEDIA_SCREEN)}
            >
                <View style={styles.mediaScreenView}>
                    <Image
                        source={selectedTab == 'MediaScreen' ? blackPlaylist : grayPlaylist}
                        style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'contain'
                        }} />
                </View>
                <Text style={[styles.mediaTextStyle, { color: selectedTab == 'MediaScreen' ? Theme.color.Black : Theme.color.gray12, }]}>MEDIA</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.liveButtonStyle, { backgroundColor: selectedTab == "LiveScreen" ? Theme.color.grayEleven : Theme.color.White }]}
                onPress={() => navigation.replace(Routes.NAV_LIVE_MOMENT)}
            >
                <View style={styles.mediaScreenView}>
                    <Image
                        source={selectedTab == 'LiveScreen' ? blackLive : grayLive}
                        style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'contain'
                        }} />
                </View>
                <Text style={[styles.liveTextStyle, { color: selectedTab == 'LiveScreen' ? Theme.color.Black : Theme.color.gray12 }]}>LIVE MOMENT</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.accountButtonStyle, { backgroundColor: selectedTab == "MyAccount" ? Theme.color.grayEleven : Theme.color.White }]}
                onPress={() => navigation.replace(Routes.NAV_ACCOUNT_SCREEN)}
            >
                <View style={styles.mediaScreenView}>
                    <Image
                        source={selectedTab == 'MyAccount' ? blackUser : grayUser}
                        style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'contain'
                        }} />
                </View>
                <Text style={[styles.accountTextStyle, { color: selectedTab == 'MyAccount' ? Theme.color.Black : Theme.color.gray12 }]}>MY ACCOUNT</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer;