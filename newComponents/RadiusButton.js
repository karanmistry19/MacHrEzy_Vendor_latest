import React from "react";
import { Text, View } from "react-native";

const RadiusButton = ({
  title,
  BColor = "red",
  BRadius = 10,
  PY = 5,
  PX = 10,
  fontSize,
  fontWeight,
  color,
  onPress,
  ...props
}) => {
  return (
    <View
      style={{
        backgroundColor: BColor,
        borderRadius: BRadius,
        paddingVertical: PY,
        paddingHorizontal: PX,
        ...props,
      }}
    >
      <Text
        style={{ fontSize: fontSize, fontWeight: fontWeight, color: color }}
      >
        {title}
      </Text>
    </View>
  );
};

export default RadiusButton;
