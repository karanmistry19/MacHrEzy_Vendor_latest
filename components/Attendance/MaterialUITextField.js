import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const MaterialUITextField = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={props.style}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
        ]}
      >
        <Text style={styles.label}>
          {props.label}
          {props?.required && <Text style={{ color: "red" }}> *</Text>}
        </Text>
        <TextInput
          style={[styles.input, { borderWidth: 0 }]}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry}
          onChangeText={props.onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={props?.disabled}
          value={props?.value}
          editable={props?.disabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "#bdbdbd",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  inputContainerFocused: {
    borderColor: "black",
  },
  input: {
    fontSize: 16,
    color: "black",
    borderWidth: 0,
  },
  label: {
    position: "absolute",
    top: -12,
    left: 10,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "Roboto",
    color: "#000000",
    fontWeight: "500",
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
});

export default MaterialUITextField;
