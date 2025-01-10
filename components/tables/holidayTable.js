import React from "react";
import { Text, View } from "react-native";

const HolidayTable = ({ dateOfHoliday, holidayName }) => {
  return (
    <View
      style={{
        height: 60,
        margin: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#A8A8A8",
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 10,
        backgroundColor: "white",
        marginLeft: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginLeft: 5,
          marginTop: 5,
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {holidayName}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={{ marginLeft: 5, marginTop: 5, fontSize: 10 }}>
          {dateOfHoliday.substr(0, 10)}
        </Text>
      </View>
    </View>
  );
};
export default HolidayTable;
