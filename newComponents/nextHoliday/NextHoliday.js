import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { formatDate } from "../../components/utils";
import RadiusButton from "../RadiusButton";

function ShadowProp() {
  return {
    shadowColor: "#101e73",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 3,
    width: "60%",
  };
}
const NextHoliday = ({ w = 340, h = 120, buttonFontSize = 14, holidays }) => {
  const [nextHoliday, setNextHoliday] = useState({});
  useEffect(() => {
    let nextHoliday = holidays?.find(
      (x) => new Date(x.dateOfHoliday).getTime() > new Date().getTime(),
    );

    setNextHoliday(nextHoliday);
  }, [holidays]);
  return (
    <View
      style={[
        styles.container,
        {
          width: w,
          height: w * 0.35,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        },
      ]}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          paddingHorizontal: w * 0.05,
          // paddingVertical:w*0.02,
          shadowColor: "#101e73",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.17,
          shadowRadius: 3.05,
          elevation: 3,
        }}
      >
        <View style={[styles.Top, { width: "100%", height: "30%" }]}>
          <RadiusButton
            title="Next Holiday"
            BColor="#fa90b6"
            BRadius={20}
            PY={5}
            PX={15}
            fontSize={w * 0.04}
            fontWeight={"600"}
          />
        </View>
        <View
          style={[styles.Bottom, { width: "100%", flex: 1, height: "70%" }]}
        >
          <View style={[{ width: "100%" }]}>
            <RadiusButton
              title={nextHoliday?.holiName}
              BColor="white"
              BRadius={0}
              PY={5}
              PX={5}
              fontSize={w * 0.035} //1.4
              fontWeight={"500"}
              width={"100%"}
            />
          </View>
          <Text style={[styles.date, { fontSize: w * 0.055 }]}>
            {nextHoliday?.dateOfHoliday ? (
              formatDate(new Date(nextHoliday?.dateOfHoliday))
            ) : (
              <Text>{`No Upcoming Holidays \nfor this year`}</Text>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NextHoliday;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  Top: {
    flex: 1,
    alignItems: "flex-start",
    //backgroundColor:"",
    justifyContent: "center",
  },
  Bottom: {
    alignItems: "flex-start",
    //backgroundColor:"",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    color: "#25282B",
  },
  date: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#25282B",
    paddingLeft: 15,
    paddingTop: 5,
  },
});
