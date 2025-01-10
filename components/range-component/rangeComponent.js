import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RangeComponent = ({
  start,
  startTimeSuffix,
  end,
  endTimeSuffix,
  highlightColor,
  backgroundColor,
  startTimeTextColor,
  endTimeTextColor,
  pointerColor,
  startTime,
  endTime,
}) => {
  const startingPoint = start * 100;
  const endPoint = 100 - end * 100;

  return (
    <>
      <Text
        style={[
          styles.textStyle,
          {
            marginLeft: start < 0.15 ? "0%" : `${startingPoint - 5}%`,
            color: startTimeTextColor,
          },
        ]}
      >
        {`${startTime} ${startTimeSuffix}`}
      </Text>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <View
          style={[
            styles.start,
            {
              marginLeft: `${startingPoint}%`,
              marginRight: `${endPoint}%`,
              backgroundColor: highlightColor,
            },
          ]}
        >
          <View
            style={[
              styles.circle,
              { position: "absolute", left: 0, backgroundColor: pointerColor },
            ]}
          ></View>
          <View
            style={[
              styles.circle,
              { position: "absolute", right: 0, backgroundColor: pointerColor },
            ]}
          ></View>
        </View>
      </View>
      <View style={styles.timeContainer}>
        {/* <Text
          style={[
            styles.textStyle,
            { marginLeft: `${startingPoint - 2}%`, color: startTimeTextColor },
          ]}
        >
          {`${startTime} ${startTimeSuffix}`}
        </Text> */}
        <Text
          style={[
            styles.textStyle,
            {
              marginLeft: end > 0.8 ? `86%` : `${98 - endPoint}%`,
              color: endTimeTextColor,
            },
          ]}
        >
          {`${endTime} ${endTimeSuffix}`}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 5,
    borderRadius: 20,
  },
  timeContainer: {
    width: "100%",
    flexDirection: "row",
  },
  start: {
    height: 5,
    borderRadius: 5,
    justifyContent: "center",
  },
  textStyle: {
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },
  circle: {
    borderRadius: 5,
    height: 10,
    width: 10,
  },
});

export default RangeComponent;
