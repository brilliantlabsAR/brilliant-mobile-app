import React, { useEffect } from "react";
import {
    StatusBar,
    View,
    Text,
    SafeAreaView,
    Platform,
    LogBox,
    TouchableOpacity,
    ScrollView,
    BackHandler
} from "react-native";
import { Theme } from "../../models";
import { ShowToast } from "../../utils/toastUtils";
import { styles } from "./styles";
import * as Strings from "../../models";
import { SuccessLoginNavigationProps } from '../../navigations/types';
import * as Routes from "../../models/routes";

const SuccessLogin = (props: SuccessLoginNavigationProps) => {
    const { navigation } = props;
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }
    }, [])

    const handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    }


    return (
        <SafeAreaView
            style={styles.bodyContainer}>
            <StatusBar barStyle="dark-content" backgroundColor={Theme.color.White} />

            <View style={styles.container}>

                <View style={styles.successTextContainer}>
                    <Text style={styles.successTitle}>{Strings.SUCCESS_TEXT}</Text>
                    <Text style={styles.successText}>{Strings.SUCCESS_LOGIN}</Text>
                </View>

                <View style={styles.navigateContainer}>

                    <TouchableOpacity activeOpacity={0.6}
                        onPress={() =>
                            //this.registerMember()
                            // ShowToast('Welcome To Frame App!');
                            navigation.replace(Routes.NAV_APP)
                        }
                    >
                        <View style={styles.textContainer}>

                            <Text style={styles.testStyle} >Ok</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SuccessLogin;