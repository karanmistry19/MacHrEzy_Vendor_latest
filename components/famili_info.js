import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EisComponent({ header, value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header} :</Text>
      <Text style={{ flexWrap: "wrap", flex: 1 }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
  },
  header: {
    fontWeight: "700",
    width: 200,
  },
});
