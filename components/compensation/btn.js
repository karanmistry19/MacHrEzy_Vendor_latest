import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "../icons";

const Btn = ({ icon, fill, title, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnContainer, style]}>
      <LinearGradient
        style={[styles.button, style]}
        locations={[0, 0.7]}
        colors={["#9d292a", "#4E1616"]}
      >
        <Icon fill={fill} name={icon} height={15} width={15}></Icon>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Btn;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    // width: 120,
    height: 120,
    marginTop: 5,
    elevation: 8,
    backgroundColor: "rgb(155, 43, 44)",
    borderRadius: 5,
    shadowColor: "#696969",
    shadowOpacity: 0.8,
    elevation: 2,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 3 },
    padding: 5,
  },
  buttonText: {
    //textAlign:'center',
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    margin: 5,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
});
