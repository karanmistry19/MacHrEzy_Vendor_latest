import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const InputTextWithLevel = ({
  label,
  value = "",
  onChangeText,
  inputBoxStyle,
  noOfLines = 1,
}) => {
  const [data, setData] = useState("");
  useEffect(() => {
    setData(value);
  }, [value]);
  const onChange = (changedData) => {
    setData(changedData);
    onChangeText(changedData);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onChangeText={onChange}
        style={[styles.data, inputBoxStyle]}
        value={data}
        numberOfLines={noOfLines}
      ></TextInput>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: "#9A9A9A",
    marginVertical: 2,
  },

  data: {
    fontSize: 14,
    color: "#383336",
    borderBottomWidth: 1,
    borderBottomColor: "#707070",
  },
});
export default InputTextWithLevel;
