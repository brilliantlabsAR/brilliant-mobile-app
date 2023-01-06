import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { ICommonButtonProps } from "../../types";
import { styles } from "./styled";

export const CommonButton = (props: ICommonButtonProps) => {
  const { handlePress, buttonLabel } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.label} >{buttonLabel}</Text>
    </TouchableOpacity>
  );
};
