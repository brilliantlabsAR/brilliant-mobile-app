import React, { useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import { CommonButtonProps } from "../../types";
import { styles } from "./styled";

export const CommonButton = (props: CommonButtonProps) => {
  const { handlePress, buttonLabel } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.label} >{buttonLabel}</Text>
    </TouchableOpacity>
  );
};
