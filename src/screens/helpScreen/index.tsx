import React, { useState, useEffect, useRef } from "react";

import {
    View,
    Text,
    Animated,
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    BackHandler,
    ActivityIndicator
} from "react-native";
import { HelpNavigationProps, InviteContactScreenNavigationProps } from "../../navigations/types";
import { styles } from "./styles";
import { search, leftarrow, shareIcon } from "../../assets";
import { Theme } from "../../models";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchHelpData } from "../../redux/appSlices/helpSlice";
import { apiStatus } from "../../redux/apiDataTypes";

type Props = HelpNavigationProps


const HelpScreen = (props: Props) => {
    const { navigation, route } = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [contactList, setContactList] = React.useState<any[]>([]);
    const [backendContacts, setBackendContacts] = React.useState<any[]>([]);
    const [contactCount, setContactCount] = useState<number>();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [pageNo] = useState<string>(route.params.pageNo);
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.helpSlice.status);
    const helpContent = useAppSelector(state => state.helpSlice.userData);

    useEffect(() => {
        setIsLoading(true);
        dispatch(FetchHelpData({}))
    }, [])
    useEffect(() => {
        if (status === apiStatus.success) {
            setIsLoading(false);
            if (pageNo === "1") {
                setContent(helpContent.licenseAgreement.content);
                setTitle(helpContent.licenseAgreement.title);
            } else if (pageNo === "2") {
                setContent(helpContent.privacyPolicy.content);
                setTitle(helpContent.privacyPolicy.title);
            } else if (pageNo === "3") {
                setContent(helpContent.help.content);
                setTitle(helpContent.help.title);
            }

        } else if (status == apiStatus.failed) {
            return;
        }
    }, [status]);

    return (
        <SafeAreaView
            style={styles.bodyContainer}>

            <View style={styles.topView}>

                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.backButtonStyle}
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                   
                    <Image
                        style={styles.homeMenu}
                        source={leftarrow}
                        resizeMode='contain'
                    />

                </TouchableOpacity>
                <Text
                    style={styles.headerTextStyle}
                >{title}</Text>


            </View>
            <View style={styles.middleView}>
                <ScrollView>
                    <View style={styles.lowerView}>

                        <Text
                            style={styles.contentTextStyle}
                        >{content}</Text>
                    </View>

                </ScrollView>
                {
                    isLoading ?
                        <ActivityIndicator
                            style={styles.progressBarStyle}
                            size="large"
                            color={Theme.color.Black}
                        /> : null
                }
            </View>
        </SafeAreaView>


    )
}

export default HelpScreen;