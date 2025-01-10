import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
const AttendanceBalanceCard = ({
  mX,
  mY,
  mB,
  title,
  logo,
  count,
  color = "yellow",
  countColor = "black",
  titleFontSize = 15,
  width,
  icon,
  iconColor,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color,
          flex: 1,
          width: "100%",
          shadowColor: "#101e73",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.17,
          shadowRadius: 3.05,
          elevation: 3,
        },
      ]}
    >
      <View style={[styles.Left, {}]}>
        <FontAwesomeIcon icon={icon} size={25} color={iconColor} />
      </View>
      <View style={[styles.Right]}>
        <Text
          numberOfLines={1}
          style={[styles.text, { fontSize: width * 0.07, textAlign: "left" }]}
        >
          {title}
        </Text>
        <Text
          style={[styles.count, { color: countColor, fontSize: width * 0.1 }]}
        >
          {count}
        </Text>
      </View>
    </View>
  );
};

export default AttendanceBalanceCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
  },
  Left: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "100%",
  },
  Right: {
    paddingHorizontal: 5,
    alignItems: "flex-start",
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    color: "#25282B",
    textAlign: "center",
  },
  count: {
    // fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
});
