import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default function CardData({ label, data = "", style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.data}>{data ? data : "-"}</Text>
    </View>
  );
}

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
  },
});
