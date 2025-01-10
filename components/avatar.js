import React from "react";
import { Image, StyleSheet, View } from "react-native";
const Avatar = ({ source, style }) => {
  return (
    <View>
      <Image style={[styles.Image, style]} source={source}></Image>
    </View>
  );
};
const styles = StyleSheet.create({
  Image: {
    width: 30,
    height: 30,
    borderRadius: 50 / 2,
    borderWidth: 3,
    borderColor: "#ffd500",
  },
});
export default Avatar;
