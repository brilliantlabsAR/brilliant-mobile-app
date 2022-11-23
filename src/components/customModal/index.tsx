import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { CustomModalProps } from "../../types";
import { styles } from "./styles";

export const CustomModal = (props: CustomModalProps) => {
  const { modalVisible, modalVisibleOff, pairNow, title } = props;
  const [IsModalVisible] = useState(modalVisible);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={IsModalVisible}
      onRequestClose={modalVisibleOff}
    >
      <TouchableOpacity style={styles.bodyContainer} onPress={modalVisibleOff}>
        <View style={styles.bodyContainer}>
          <View style={styles.modalView}>
            <Text style={styles.textView}>Pair with your Monocle to {title}.</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonView} onPress={modalVisibleOff}>
                <Text style={styles.btnTextView}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonView} onPress={pairNow}>
                <Text style={styles.btnTextView}>Pair now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
