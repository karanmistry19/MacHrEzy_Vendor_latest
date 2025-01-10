import React from "react";
import { StyleSheet, Text, View } from "react-native";
const ReportingTitle = ({ header }) => {
  return (
    <View>
      <Text style={styles.text}>{header}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "#9d292a",
    fontSize: 15,
    fontWeight: "bold",
    // padding: 10,
  },
});
export default ReportingTitle;
