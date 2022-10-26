import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { Theme } from '../../../models';
import { ItemTemplateProps } from "../types/Types";


export const CountryButton = ({ item, name, style, ...rest }: ItemTemplateProps) => (
    <TouchableOpacity
        style={[styles.countryButton, style?.countryButtonStyles]}
        {...rest}
    >
        <Text style={[
            {
                flex: 0.2
            },
            style?.flag
        ]}>
            {item?.flag}
        </Text>
        <Text style={[{
            flex: 0.3,
            fontSize: 16,
            color: Theme.color.Black,
            fontFamily:'ApercuProRegular'
        }, style?.dialCode]}>
            {item?.dial_code}
        </Text>
        <Text style={[{
            flex: 1,
            fontSize: 16,
            color: Theme.color.Black,
            fontFamily:'ApercuProRegular'
        }, style?.countryName]}>
            {name}
        </Text>
    </TouchableOpacity>
);

type StyleKeys = 'countryButton';

const styles: { [key in StyleKeys]: ViewStyle } = {
    countryButton: {
        paddingVertical: 10,
        backgroundColor: Theme.color.WhiteSix,
        width: '100%',
        height: 50,
        paddingHorizontal: 25,
        alignItems: 'center',
        marginVertical: 2,
        flexDirection: 'row',
        borderRadius: 10,
    },
};
