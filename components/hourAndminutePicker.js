import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DimensionContext } from "./dimensionContext";

const HourAndMinutePicker = ({ onChange, type, data }) => {
  const { window } = useContext(DimensionContext);

  let hourCount = [];
  let minuteCount = [];
  for (let i = 0; i < 60; i++) {
    if (i < 24) {
      minuteCount.push(i);
      hourCount.push(i);
    } else {
      minuteCount.push(i);
    }
  }
  return (
    <View
      style={{
        height: !type === "hour" ? 310 : window.height / 2.35,
        width: "100%",
      }}
    >
      {type === "hour" ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: window.width > 1100 ? 20 : 10,
            marginTop: 10,
          }}
        >
          {hourCount.map((e, i) => {
            return (
              <TouchableOpacity
                onPress={() => onChange(e)}
                key={e.toString()}
                style={{
                  backgroundColor: data?.getHours() === e ? "red" : "grey",
                  borderRadius: 50,
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  marginLeft: 5,
                  marginTop: 5,
                }}
              >
                <Text style={{ alignSelf: "center", color: "#fff" }}>{e}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: window.width > 1100 ? 20 : 10,
            marginTop: 10,
          }}
        >
          {minuteCount.map((e, i) => {
            return (
              <TouchableOpacity
                onPress={() => onChange(e)}
                key={e.toString()}
                style={{
                  backgroundColor: data?.getMinutes() === e ? "red" : "grey",
                  borderRadius: 50,
                  height: 30,
                  width: 30,
                  justifyContent: "center",
                  marginLeft: 5,
                  marginTop: 5,
                }}
              >
                <Text style={{ alignSelf: "center", color: "#fff" }}>{e}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
// const styles = StyleSheet.create({

// });

export default HourAndMinutePicker;
