import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { IUpdateFirmwareFileComponentProps } from "../../types";
type Props = IUpdateFirmwareFileComponentProps;

const FileSelectionComponent = (props: Props) => {
    const { textLabel, fileNameLabel } = props;
    return (
        <View style={styles.fileWrapper}>
            <Text style={styles.textLabel}>{textLabel}</Text>
            <Text style={styles.fileLabel}>{fileNameLabel}</Text>
        </View>
    );
};

export default FileSelectionComponent;
