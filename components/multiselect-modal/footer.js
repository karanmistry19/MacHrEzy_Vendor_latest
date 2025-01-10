import React from "react";
import { StyleSheet, View } from "react-native";

export default function Footer({ name, displayItems }) {
  return (
    // <View style={styles.mainviewStyle}>
    <View style={styles.footer}>{displayItems ? displayItems : <></>}</View>
    // </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "red",
  },
  // bottomButtons: {
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     flex: 1,
  // },
  // footerText: {
  //     color: 'white',
  //     fontWeight: 'bold',
  //     alignItems: 'center',
  //     fontSize: 18,
  // },
  // textStyle: {
  //     alignSelf: 'center',
  //     color: 'orange'
  // },
  // scrollViewStyle: {
  //     borderWidth: 2,
  //     borderColor: 'blue'
  // }
});
