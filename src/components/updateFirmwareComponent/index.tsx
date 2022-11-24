import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "./styles";
import * as Routes from "../../models";
import FileSelectionComponent from "../fileSelection";
import DocumentPicker from "react-native-document-picker";
import Snackbar from "react-native-snackbar";
import { useNavigation } from "@react-navigation/native";
import { CommonButton } from "../commonButton";
import { UpdateFirmwareNavigationProps } from "../../navigations/types";
import { normalize } from "../../utils/dimentionUtils";

const UpdateFirmwareComponent = () => {
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [fileType, setFileType] = useState("");
  const navigation = useNavigation<UpdateFirmwareNavigationProps>();

  const handleUploadFile = () => {
    DocumentPicker.pickSingle({
      type: DocumentPicker.types.zip,
      // copyTo: "documentDirectory",
    })
      .then((res) => {
        if (res?.name.substring(res?.name.length - 4) !== ".zip") {
          Snackbar.show({
            text: "Only zip file is supported",
            duration: Snackbar.LENGTH_SHORT,
          });
        } else {
          setFileName(res.name);
          setFilePath(res.uri);
          setFileType(res.type ? res.type : "");
        }
      })
      .catch((err) => {
        if (DocumentPicker.isCancel(err)) {
          Snackbar.show({
            text: "You cancelled the picker",
            duration: Snackbar.LENGTH_SHORT,
          });
        } else {
          Snackbar.show({
            text: err,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.styledHeader}>Update Firmware</Text>
      <Text style={[styles.actionTextStyle, styles.componentActionText]}>
        To perform a firmware update on your {"\n"} Monocle,{" "}
        <Text style={[styles.actionTextStyle, styles.actionTextBold]}>
          you will need{" "}
        </Text>
        <Text style={[styles.actionTextStyle, styles.componentActionText]}>
          the ZIP archive of {"\n"} the DFU package copied to this mobile phone.
        </Text>
      </Text>
      <Text style={[styles.actionTextStyle, styles.actionTextSecond]}>
        Once the file is on this phone: {"\n"}
      </Text>
      <Text style={[styles.actionTextStyle, styles.actionTextLines]}>
        1. Tap the “Select Update File” button {"\n"} below.
      </Text>
      <Text style={[styles.actionTextStyle, styles.actionTextLines]}>
        2. Navigate to the location of the update {"\n"} file and select it.
      </Text>
      <Text style={[styles.actionTextStyle, styles.actionTextLines]}>
        3. Tap the “Perform Update” button to {"\n"} begin the Monocle firmware
        update {"\n"} process.
      </Text>
      <View style={styles.wrapperButtons}>
        {fileName !== "" && fileName.length > 3 ? (
          <FileSelectionComponent
            textLabel={"File Selected: "}
            fileNameLabel={fileName}
          />
        ) : null}
      </View>
      <View style={styles.wrapperButtons}>
        {fileName === "" ? (
          <CommonButton
            buttonLabel={"Select Update File"}
            handlePress={() => {
              handleUploadFile();
            }}
          />
        ) : (
          <CommonButton
            buttonLabel={"Perform Firmware Update"}
            handlePress={() => {
              setFileName("");
              setFilePath("");
              setFileType("");
              // navigation.navigate(Routes.NAV_FIRMWARE_PROGRESS, { file: filePath });
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};
export default UpdateFirmwareComponent;
