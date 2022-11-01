import React from "react";
import { ActivityIndicator } from "react-native";
import { Theme } from "../../models";
import { styles } from "./styles";

export const Loading = () => {
    return (
        <ActivityIndicator
            style={styles.loaderStyle}
            size="large"
            color={Theme.color.Black}
        />
    );
};