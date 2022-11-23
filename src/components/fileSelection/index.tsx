import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { UpdateFirmwareFileComponentProps } from "../../types";
type Props = UpdateFirmwareFileComponentProps;

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
