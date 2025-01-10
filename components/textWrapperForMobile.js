import React from "react";
import { StyleSheet, Text, View } from "react-native";
const TextWrapperForMobile = ({ value, header }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 5,
      }}
    >
      {header ? (
        <View
          style={{
            justifyContent: "flex-start",
            flex: 1,
          }}
        >
          <Text style={styles.headerStyle}>{header} :</Text>
        </View>
      ) : (
        <></>
      )}
      <View style={{ justifyContent: "flex-start", flex: 1 }}>
        <Text style={styles.valueStyle}>{value}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#000",
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  valueStyle: {
    fontSize: 15,
    marginRight: 35,
    alignSelf: "flex-start",
  },
});
export default TextWrapperForMobile;
