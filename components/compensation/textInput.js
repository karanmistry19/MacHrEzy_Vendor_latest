import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const TextInputComponent = ({ placeholder, label, onChange }) => {
  return (
    <View style={styles.Container}>
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <Text style={styles.text}>{label}</Text>
        <TextInput
          onChange={onChange}
          style={styles.input}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#FFF",
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    height: 50,
    borderRadius: 5,
  },
  input: {
    width: "75%",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    marginLeft: 18,
    alignSelf: "flex-end",
  },
  text: {
    fontWeight: "500",
    fontSize: 14,
    color: "gray",
    marginTop: 15,
  },
});
