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
    PermissionsAndroid
} from "react-native";
import { TextInput } from "react-native-paper";
import SwiperFlatList from 'react-native-swiper-flatlist';
import PaginationDot from 'react-native-animated-pagination-dot';
import { normalize } from "../../utils/dimentionUtils";
import { Theme } from "../../models";
import { StartNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import * as Routes from "../../models/routes";
//import { check, PERMISSIONS, RESULTS, checkMultiple, requestMultiple,request } from 'react-native-permissions';
import { chasmaIcon, blackRightArrowIcon, grayRightArrowIcon, blackLeftArrowIcon, grayLeftArrowIcon } from "../../assets";
import { STRINGS } from "../../models/constants"

const StartScreen = (props: StartNavigationProps) => {
    const { navigation } = props;
    const [onboard, setonboard] = useState([
        chasmaIcon,
        chasmaIcon,
        chasmaIcon,
        chasmaIcon
    ]);
    const [currentIndex, setcurrentIndex] = useState<number>(0);
    const [boardingIndex, setboardingIndex] = useState<number>(0);
    const [nextButtonVisible, setnextButtonVisible] = useState<boolean>(true);
    const [backButtonVisible, setbackButtonVisible] = useState<boolean>(false);

    useEffect(() => {
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                if (result) {
                    console.log("ACCESS_FINE_LOCATION Permission is OK");
                } else {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                        if (result) {
                            console.log("ACCESS_FINE_LOCATION User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });


            if (Platform.Version >= 30) {

                try {
                    PermissionsAndroid.requestMultiple(
                        [PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT]
                    ).then((result) => {
                        if (result['android.permission.BLUETOOTH_SCAN']
                            && result['android.permission.BLUETOOTH_CONNECT'] === 'granted') {
                            console.log('You can use the bluetooth');
                        } else {
                            console.log('Permission denied');
                            return;
                        }
                    });


                } catch (err) {
                    console.warn(err)
                }

            }






        }
    })




    const nextButton = () => {
        let pos = currentIndex + 1;
        if (pos == -1) {
            console.log('max');
        } else {
            setcurrentIndex(pos), () => {
                console.log("jo", currentIndex);
                refs.swiper.scrollToIndex({
                    index: currentIndex,
                    animated: true,
                });
            };
        }
        console.log('okLength', (onboard.length));
        console.log('okLength---->', pos >= 3);
        if (pos >= 3) {
            setnextButtonVisible(false)
        } else {
            setnextButtonVisible(true)
            setbackButtonVisible(true)
        }
    };
    const backButton = () => {
        let pos = currentIndex - 1;
        if (pos == 4) {
            console.log('min');
        } else {
            setcurrentIndex(pos), () => {
                console.log("jo", currentIndex);
                refs.swiper.scrollToIndex({
                    index: currentIndex,
                    animated: true,
                });
            };
        }
        console.log('Back button', pos);
        if (pos <= 0) {
            setbackButtonVisible(false)
        } else {
            setnextButtonVisible(true)
            setbackButtonVisible(true)
        }
    };
    return (
        <SafeAreaView style={styles.bodyContainer}>
            <View style={styles.bodyContainerView}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>{STRINGS.START_TITLE}</Text>
                    </View>
                    <View style={styles.swiperView}>
                        <SwiperFlatList
                            //ref='swiper'
                            autoplay={false}
                            autoplayDelay={2}
                            autoplayLoop={false}
                            showPagination={false}

                            data={onboard}
                            onPaginationSelectedIndex={() => console.log('Hiii')}
                            renderItem={({ item }) => (
                                <View style={styles.child}>
                                    <TouchableOpacity activeOpacity={0.6}
                                        onPress={() =>
                                            navigation.navigate(Routes.NAV_PAIRING_SCREEN)
                                            // console.log('pairing screen')
                                        }>
                                        <Image style={styles.sliderImg} source={item} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            onChangeIndex={({ index, prevIndex }) => {
                                console.log({ index, prevIndex });
                                setcurrentIndex(index);
                                setboardingIndex(index);
                            }}

                        />
                    </View>
                    <Text style={styles.instructionTitle}>{STRINGS.START_INST_TITLE}</Text>
                    <View style={styles.nextButtonView}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.nextButtoTouch}
                            onPress={() => nextButton()}
                        >
                            <Text style={[styles.nextButtonText, { color: nextButtonVisible == true ? Theme.color.Black : Theme.color.gray, }]}>{'Next'}</Text>

                            <Image
                                style={styles.menuIcon}
                                source={nextButtonVisible == true ? blackRightArrowIcon : grayRightArrowIcon}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.backTouchView}
                            onPress={() => backButton()}>
                            <Image
                                style={styles.menuIcon}
                                source={backButtonVisible == true ? blackLeftArrowIcon : grayLeftArrowIcon}
                                resizeMode='contain'

                            />

                            <Text style={[styles.backButtonText, { color: backButtonVisible == true ? Theme.color.Black : Theme.color.gray }]}>{'Back'}</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={styles.paginationDotView}>
                        <PaginationDot
                            activeDotColor={'black'}
                            curPage={currentIndex}
                            maxPage={4}
                        />
                    </View>
                    <View style={styles.skipTutorialView}>

                        <Text
                            style={styles.skipTutorialText} onPress={() => navigation.navigate(Routes.NAV_PAIRING_SCREEN)}
                        >{STRINGS.START_TUTORIAL_TITLE}
                        </Text>

                        <View style={styles.marginTopStyle}>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )

};

export default StartScreen;