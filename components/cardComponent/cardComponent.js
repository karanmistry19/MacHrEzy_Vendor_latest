import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function CardComponent({ children, cardStyle }) {
  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={[styles.container]}
      contentContainerStyle={cardStyle}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 5,
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    padding: 15,
    backgroundColor: "#ffffff",
  },
});
