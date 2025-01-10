import React from "react";
import { StyleSheet, View } from "react-native";

export const ModularCard = ({ cardContent, style, children }) => {
  return <View style={[styles.card, style]}>{cardContent || children}</View>;
};

const styles = StyleSheet.create({
  card: {
    minHeight: 276,
    minWidth: 200,
    maxWidth: "100%",
    borderRadius: 15,
    borderColor: "#707070",
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 3 },
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
});
