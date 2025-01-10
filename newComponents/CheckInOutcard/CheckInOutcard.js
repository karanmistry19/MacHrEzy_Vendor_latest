import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { connect } from "react-redux";
import Button from "../../components/buttons/button";
import {
  fetchAttendanceDaywise,
  fetchUserAttendanceTxn,
} from "../../redux/actions/attendance.action";

const CheckInOutcard = ({
  fetchAttendanceDaywise,
  user,
  attendanceTxnUser,
  isFocused,
  w = 340,
  fetchUserAttendanceTxn,
}) => {
  const dimension = useWindowDimensions();

  const [checkinTime, setCheckInTime] = useState();
  const [checkOutTime, setCheckOutTime] = useState();
  const [checkInDate, setCheckInDate] = useState();

  const [checkOutDate, setCheckOutDate] = useState();
  useEffect(() => {
    let Start = new Date();
    let End = new Date();

    fetchUserAttendanceTxn({ deptCode: user.deptCode, empCode: user.empCode });
    fetchAttendanceDaywise({ user: user, StartDate: Start, EndDate: End });
  }, [user, isFocused]);
  const navigation = useNavigation();

  //   if (attendanceDaywise.length > 0) {
  //     const dates = attendanceDaywise.filter(
  //       (item) =>
  //         moment(item.StartTime).format("DD MMM YYYY") ==
  //         moment().format("DD MMM YYYY")
  //     );
  //     setCheckInTime(
  //       dates.filter((item) => item.Subject.includes("I -")).length > 0
  //         ? dates
  //             .filter((item) => item.Subject.includes("I -"))[0]
  //             .Subject.split(" : ")[0]
  //             .split("-")[1]
  //         : "00:00"
  //     );
  //     setCheckOutTime(
  //       dates.filter((item) => item.Subject.includes("I -")).length > 0
  //         ? dates
  //             .filter((item) => item.Subject.includes("I -"))[0]
  //             .Subject.split(" : ")[1]
  //             .split("-")[1]
  //             .split("(")[0]
  //         : "00:00"
  //     );
  //   }
  // }, [attendanceDaywise]);
  useEffect(() => {
    if (attendanceTxnUser.length > 0) {
      const date = new Date().toJSON().slice(0, 10);
      const eventDate =
        date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
      console.log(eventDate, "eventDate");
      let checkIn = attendanceTxnUser.filter(
        (item) => item.remarks === "CHECK-IN" && item.eventDate === eventDate
      );
      let checkOut = attendanceTxnUser.filter(
        (item) => item.remarks === "CHECK-OUT" && item.eventDate === eventDate
      );
      console.log(checkIn, "checkIn");
      console.log(checkOut, "checkOut");
      if (checkIn.length > 0) {
        let temp = new Date(checkIn[0].fromDate);
        // console.log(check)
        setCheckInTime(moment(checkIn[0].fromDate).utc().format("hh:mm a"));
        setCheckInDate(temp);
      } else {
        setCheckInTime("00:00");
      }
      if (checkOut.length > 0) {
        let temp = new Date(checkOut[0].fromDate.split("Z")[0]);

        setCheckOutTime(moment(checkOut[0].fromDate).utc().format("hh:mm a"));
        setCheckOutDate(temp);
      } else {
        setCheckOutTime("00:00");
      }
    } else {
      setCheckInTime("00:00");
      setCheckOutTime("00:00");
    }
  }, [attendanceTxnUser, isFocused]);

  return (
    <View
      style={[
        styles.container,
        {
          width: "100%",
          height: "100%",
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
          paddingHorizontal: 16,
          paddingVertical: 20,
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
        <View style={[styles.Top, { width: "100%", height: "40%" }]}>
          <Text style={[styles.Toptext, { fontSize: 18 }]}>Today</Text>
        </View>
        {checkinTime && checkOutTime && (
          <View
            style={[
              styles.Bottom,
              { width: "100%", height: "60%", marginTop: 20 },
            ]}
          >
            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              {checkinTime && (
                <Text style={[styles.text, { fontSize: w * 0.04 }]}>
                  Check In : {checkinTime.trim()}
                </Text>
              )}
              {checkinTime.trim() == "00:00" && (
                <Button
                  style={{ marginLeft: "auto", width: 150 }}
                  textStyle={{ fontSize: w * 0.03 }}
                  onPress={() => navigation.navigate("checkindetails")}
                  title={"check in"}
                />
              )}
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              {checkOutTime && (
                <Text style={[styles.text, { fontSize: w * 0.04 }]}>
                  Check Out : {checkOutTime.trim()}
                </Text>
              )}
              {checkinTime.trim() !== "00:00" &&
                checkOutTime.trim() == "00:00" && (
                  <Button
                    style={{ marginLeft: "auto", width: 150 }}
                    textStyle={{ fontSize: w * 0.03 }}
                    onPress={() => navigation.navigate("checkindetails")}
                    title={"check out"}
                  />
                )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = ({ user, attendanceTxnUser, attendanceDaywise }) => ({
  user,
  attendanceTxnUser,
  attendanceDaywise,
});
export default connect(mapStateToProps, {
  fetchAttendanceDaywise,
  fetchUserAttendanceTxn,
})(CheckInOutcard);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  Top: {
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 5,
  },
  Bottom: {
    // justifyContent: "space-around",
    alignItems: "flex-start",
    alignSelf: "flex-end",
    // paddingLeft: 50,
    // height: 60,
  },
  Toptext: {
    fontWeight: "bold",
    color: "#9F232B",
  },
  text: {
    fontWeight: "bold",
    color: "#25282B",
  },
});
