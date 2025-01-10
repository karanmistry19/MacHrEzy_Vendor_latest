import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "../icons";

const Button = ({ title, onPress, style, textStyle = {}, icon, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.appButtonContainer,
        style,
        {
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      {icon ? <Icon name={icon} height={15} width={15}></Icon> : <></>}

      <Text
        adjustsFontSizeToFit={true}
        style={[styles.appButtonText, textStyle]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "rgb(155, 43, 44)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 2,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 3 },
    marginLeft: 5,
  },
  appButtonText: {
    color: "#fff",
    alignSelf: "center",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
});
export default Button;
