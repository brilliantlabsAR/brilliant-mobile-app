import React from "react";
import { Text, SafeAreaView } from "react-native";
import { styles } from "./styles";
import UpdateFirmwareComponent from "../../components/updateFirmwareComponent";
import { VersionComponent } from "../../components/versionComponent";

const UpdateFirmwareScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <UpdateFirmwareComponent />
      <Text>
        <VersionComponent />
      </Text>
    </SafeAreaView>
  );
};

export default UpdateFirmwareScreen;
