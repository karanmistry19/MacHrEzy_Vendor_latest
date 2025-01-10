import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "../icons";
const Compensation = ({
  name,
  subDetails,
  lineStyle = true,
  level,
  circle = true,
  style,
  amount,
  amountView = true,
  onPress,
  nameStyle,
  subDetailsStyle,
  containerStyle,
  subDetailsNoOfLine,
}) => {
  return (
    <TouchableOpacity
      style={(styles.container, containerStyle)}
      onPress={onPress}
    >
      <View style={styles.cardContainer}>
        {circle ? (
          <View
            style={[
              styles.circle,
              { borderColor: level ? "#9d292a" : "#FF9300" },
            ]}
          >
            {level ? (
              <Text style={styles.id}>{level}</Text>
            ) : (
              <Icon name="download" fill="rgb(155,43,44)"></Icon>
            )}
          </View>
        ) : (
          <></>
        )}
        <View style={styles.textContainer}>
          <Text style={(styles.name, nameStyle)}>{name}</Text>
          {subDetails ? (
            <Text
              style={(styles.id, subDetailsStyle)}
              numberOfLines={subDetailsNoOfLine}
            >
              {subDetails}
            </Text>
          ) : (
            <></>
          )}
        </View>
        {amountView ? (
          <View style={styles.amount}>
            <Text style={styles.inr}>INR </Text>
            <Text style={styles.inr}>{amount}</Text>
          </View>
        ) : (
          <></>
        )}

        <View style={{ justifyContent: "center" }}>
          <Icon name="rightChevronArrow" fill="rgb(155, 43, 44)"></Icon>
        </View>
      </View>
      {lineStyle ? <View style={styles.line}></View> : <></>}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: "#FFF",
    // borderRadius: 20,
  },
  circle: {
    borderWidth: 2,
    height: 50,
    width: 50,
    borderRadius: 50,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d0d0d0",
  },
  line: {
    justifyContent: "flex-start",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
  },
  id: {
    color: "#9B2B2C",
    fontSize: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: 10,
    alignSelf: "center",
  },
  name: {
    fontSize: 20,
  },
  cardContainer: {
    flexDirection: "row",
    margin: 5,
    justifyContent: "center",
  },
  amount: {
    height: 30,
    width: "30%",
    borderRadius: 9,
    backgroundColor: "#D0D0D0",
    justifyContent: "center",
    alignSelf: "center",
    marginRight: 30,
    flexDirection: "row",
  },
  inr: {
    color: "#9B2B2C",
    fontSize: 15,
    alignSelf: "center",
  },
  img: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 5,
    alignSelf: "center",
  },
});
export default Compensation;
