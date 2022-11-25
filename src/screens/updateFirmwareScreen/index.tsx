import React from "react";
import { Text, SafeAreaView, View } from "react-native";
import { styles } from "./styles";
import UpdateFirmwareComponent from "../../components/updateFirmwareComponent";
import { VersionComponent } from "../../components/versionComponent";

const UpdateFirmwareScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <UpdateFirmwareComponent />
      <View style={styles.versionWrapper}>
        <VersionComponent />
      </View>
    </SafeAreaView>
  );
};

export default UpdateFirmwareScreen;
