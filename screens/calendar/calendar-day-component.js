import React from "react";
import { StyleSheet, Text, View } from "react-native";
const CalendarDayComponent = ({
  date,
  events,
  state,
  onPress,
  calendarData,
  children,
}) => {
  const onPressed = () => {
    requestAnimationFrame(() => onPress(date));
  };
  let items = "";
  // const count =
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 30,
          width: 30,
          borderWidth: 1,
          borderColor: "#C8C8C8",
          borderRadius: 50,
          justifyContent: "center",
        }}
      >
        <Text
          onPress={onPressed}
          style={{
            color: state === "disabled" ? "#BEBEBE" : "black",
            fontSize: 15,
            alignSelf: "center",
          }}
        >
          {children}
        </Text>
      </View>

      <Text style={styles.itemsCount}>{events}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  dayItem: {
    textAlign: "center",
    fontFamily: "roboto",
  },
  itemsCount: {
    textAlign: "center",
    fontFamily: "roboto",
    fontSize: 6,
    color: "red",
  },
});

export default CalendarDayComponent;
