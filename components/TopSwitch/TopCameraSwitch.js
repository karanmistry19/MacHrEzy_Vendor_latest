import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TopCameraSwitch = ({ width, title, title2, setSelectedTab }) => {
  const [toggleData, setToggleData] = useState(false);

  const grp = width / 10;

  const styles = StyleSheet.create({
    text: {
      textAlign: "center",
      fontSize: 14,
      padding: 5,
      fontFamily: "Roboto",
      color: "black",
      fontWeight: "500",
    },
    textactive: {
      textAlign: "center",
      fontSize: 14,
      padding: 5,
      fontFamily: "Roboto",
      fontWeight: "500",
      color: "white",
    },
    inactive: {
      borderRadius: 99,

      flex: 1,
      width: "100%",
    },
    rightactive: {
      borderWidth: 2,
      borderRadius: 99,
      marginRight: -grp,
      backgroundColor: "#9F232B",
      borderColor: "#9F232B",
      flex: 1,
      zIndex: 1,
      width: "100%",
    },
    leftactive: {
      borderWidth: 2,
      borderRadius: 99,
      marginLeft: -grp,
      zIndex: 1,
      backgroundColor: "#9F232B",
      borderColor: "#9F232B",
      flex: 1,
      width: "100%",
    },
  });
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: width,
        backgroundColor: "#F7F9FB",
        borderRadius: 40,
        padding: 5,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setToggleData(true);
          setSelectedTab(title);
        }}
        style={!toggleData ? styles.inactive : styles.rightactive}
      >
        <Text style={!toggleData ? styles.text : styles.textactive}>
          {title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setToggleData(false);
          setSelectedTab(title2);
        }}
        style={toggleData ? styles.inactive : styles.leftactive}
      >
        <Text style={toggleData ? styles.text : styles.textactive}>
          {title2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopCameraSwitch;
