import React, { useContext } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { DimensionContext } from "./dimensionContext";

export default function TextInputBox({ textInputStyle, value, heading }) {
  const { window } = useContext(DimensionContext);
  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          fontSize: window.width * 0.009,
          fontWeight: "500",
          marginTop: 20,
          width: window.width / 8,
        }}
      >
        {heading}
      </Text>
      <TextInput
        value={value}
        style={[
          textInputStyle ? textInputStyle : styles.input,
          { width: window.width / 7 },
        ]}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 7,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
  },
});
