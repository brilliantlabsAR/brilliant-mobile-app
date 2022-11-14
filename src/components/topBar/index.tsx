import React, { useState, useEffect, useRef } from "react";
import {
    StatusBar,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from "react-native";
import { leftarrow } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { FooterNavigationProps } from "../../navigations/types";
import { ITopBar } from "../../types";

export const TopBar = (props: ITopBar) => {
    const navigation = useNavigation<FooterNavigationProps>();
    return (
        <View style={styles.topView}>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.goBack()}>
                <Image
                    style={styles.homeMenu}
                    source={leftarrow}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            {props.isTextVisible ?
                <Text style={styles.topTextStyle}>{props.title}</Text>
                : null}
        </View>
    );
};