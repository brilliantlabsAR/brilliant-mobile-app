import React from "react";
import { Text } from "react-native";
import { styles } from "./styles";
import VersionInfo from "react-native-version-info";

export const VersionComponent = () => {
  return (
    <Text style={styles.version}>
      Monocle App v{VersionInfo.appVersion} (Build {VersionInfo.buildVersion}){" "}
    </Text>
  );
};
