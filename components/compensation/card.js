import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "../icons";

const CompensationCard = ({ header, iconName, fill, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={[styles.Container, style]}>
        <View style={styles.view}>
          <Text style={styles.text}>{header}</Text>
          <Icon
            fill={fill}
            name={iconName}
            height={22}
            width={22}
            style={{ marginTop: 10 }}
          ></Icon>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CompensationCard;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "white",
    height: 50,
    // width: "90%",
    // marginLeft: 14,
    // marginRight: 10,
    // borderRadius: 5,

    justifyContent: "center",
    marginBottom: 1,
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    padding: 5,
    marginHorizontal: 10,
    fontSize: 12,
    marginTop: 2,
  },
});
