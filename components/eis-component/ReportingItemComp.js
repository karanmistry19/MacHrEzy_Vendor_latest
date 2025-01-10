import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GetFirstLetters from "./firstLetterComp";

const ReportingItemComp = ({
  name,
  subDetails,
  navigation,
  nameStyle,
  letterStyle,
  closeer,
  level,
  style,
  lineStyle = true,
}) => {
  return (
    <View>
      <View
        style={[
          styles.container,
          { justifyContent: closeer ? null : "space-between" },
        ]}
      >
        <View style={[styles.index, letterStyle, style]}>
          <GetFirstLetters
            style={[styles.indexText, style]}
            name={level ? level : name}
          ></GetFirstLetters>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.name, nameStyle]}>{name}</Text>
          <Text style={styles.id}>{subDetails}</Text>
        </View>
      </View>
      {lineStyle ? <View style={styles.line}></View> : <></>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  index: {
    borderWidth: 2,
    height: 50,
    width: 50,
    borderRadius: 50,
    borderColor: "#9d292a",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d0d0d0",
  },
  indexText: {
    fontSize: 15,
  },
  textContainer: {
    padding: 15,
    flex: 1,
    justifyContent: "flex-start",
  },
  name: {
    color: "black",
    fontSize: 20,
  },
  line: {
    justifyContent: "flex-start",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
  },
  id: { color: "grey", fontSize: 15 },
});
export default ReportingItemComp;
