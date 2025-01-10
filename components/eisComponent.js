import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EisComponent({ header, value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header} :</Text>
      <Text style={{ paddingLeft: 30, flex: 1 }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 7,
  },
  header: {
    fontWeight: "700",
    flex: 1,
  },
});
