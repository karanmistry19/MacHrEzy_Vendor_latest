import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GetFirstLetters = ({ name, style }) => {
  var firstLetters;
  if (name) {
    var firstLetters = name
      .split(" ", 2)
      .map((word) => word[0])
      .join("");
  }

  return (
    <View>
      <Text style={[styles.text, style]}>{firstLetters}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: { color: "#9d292a" },
});
export default GetFirstLetters;
