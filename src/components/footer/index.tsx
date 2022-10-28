
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


import { FooterNavigationProps } from "../../navigations/types";
import { IFooter } from "../../types";
import { styles } from "./styles";
const { width, height } = Dimensions.get('screen');
import { blackLive, blackPlaylist, blackUser, grayLive, grayPlaylist, grayUser } from "../../assets";



type Props = IFooter & FooterNavigationProps


const footer = (props: Props) => {
    const { navigation, selectedTab } = props;

    return (
        <View style={styles.topView}>
            <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.mediaButtonStyle, { backgroundColor: selectedTab == "MediaScreen" ? Theme.color.grayEleven : Theme.color.White }]}
                onPress={() => props.navigation.replace("MediaScreen")}
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
                onPress={() => props.navigation.replace("LiveglobeScreen")}
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
                onPress={() => props.navigation.replace("MyAccountScreen")}
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
export default footer;