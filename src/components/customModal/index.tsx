import React, { useState } from "react";
import Modal from "react-native-modal";
import { IChildrenProps, ICustomModalProps } from "../../types";

type Props = IChildrenProps & ICustomModalProps;
export const CustomModal = (props: Props) => {
  const { modalVisible, modalVisibleOff, children } = props;
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={modalVisibleOff}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationOutTiming={800}
      hasBackdrop={true}
    >
      {children}
    </Modal>
  );
};
