import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AttendancePicker from "../AttendancePicker/AttendancePicker";
import TeamAttendancePicker from "../AttendancePicker/TeamAttendancePicker";
import Percentagecircle from "../progressCard/Percentagecircle";

let currentDate = new Date();
const eventFromDate = moment(
  new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + (currentDate.getDate() > 15 ? 0 : -1),
    16,
    12
  )
).format("YYYY-MM-DD");
const eventToDate = moment(new Date()).format("YYYY-MM-DD");

const AttendanceCard = ({
  title = "My Attendance",
  percent = 0,
  onPress,
  w = 300,
  dataKey,
  dataValue,
  teamAttendance,
  onAttendanceSummaryDateChange,
  onTeamAttendanceSummaryDateChange,
  setModalDate,
  updateModalAttendace = null,
}) => {
  const [variables, setVariables] = useState([eventFromDate, eventToDate]);
  const [date, setDate] = useState(new Date());
  function updateVariable(vv) {
    setVariables([vv.value[0], vv.value[1]]);
  }
  function updateModalDateForMyAttendance() {
    setModalDate(
      () =>
        `${moment(new Date(variables[0])).format("DD/MM/yyyy")}-${moment(
          new Date(variables[1])
        ).format("DD/MM/yyyy")}`
    );
  }
  function updateModalDateForTeam() {
    setModalDate(() => `${moment(new Date(date)).format("DD/MM/yyyy")}`);
  }
  function updateClickStatus(index) {
    updateModalAttendace && updateModalAttendace(dataKey[index], variables);
  }
  function ColorStatus(key) {
    if (key == "Present") {
      return { color: "blue" };
    } else if (key == "Late") {
      return { color: "#336CFB" };
    } else if (key == "Regularize") {
      return { color: "#FF0000" };
    } else if (key == "Leave" || key == "On Leave") {
      return { color: "#FF0000" };
    } else if (key == "Early Out") {
      return { color: "#FF0000" };
    } else if (key == "Incomplete") {
      return { color: "#FF0000" };
    }
  }
  return (
    <View
      style={[
        {
          width: w,
          height: (w * 1.8) / 3,
          padding: 8,
          // borderRadius: 10,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            width: "100%",
            height: "100%",
            shadowColor: "#101e73",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.17,
            shadowRadius: 3.05,
            elevation: 3,
          },
        ]}
      >
        <View style={[styles.Top, { paddingTop: ((w * 1.8) / 3) * 0.03 }]}>
          <Text style={[{ fontSize: w * 0.05, fontWeight: "600" }]}>
            {title}
          </Text>
          <View>
            {teamAttendance ? (
              <TeamAttendancePicker
                // width={130}
                fontSize={w * 0.03}
                height={30}
                setModalDate={setModalDate}
                onTeamAttendanceSummaryDateChange={
                  onTeamAttendanceSummaryDateChange
                }
                date={date}
                setDate={setDate}
              />
            ) : (
              <AttendancePicker
                // width={w*0.1}
                fontSize={w * 0.03}
                height={30}
                onAttendanceSummaryDateChange={onAttendanceSummaryDateChange}
                variables={variables}
                setVariables={setVariables}
                updateVariable={updateVariable}
              />
            )}
          </View>
        </View>
        <View style={styles.Bottom}>
          <Percentagecircle
            percent={percent ? percent : 100}
            W={0.35 * w}
            H={0.35 * w}
            BW={0.03 * w}
          />
          <View style={styles.BottomRight}>
            <View style={styles.TextContainerLeft}>
              {dataKey?.map((x, i) => (
                <Text
                  key={i}
                  style={[
                    styles.CounterText,
                    {
                      fontSize: w * 0.04,
                      fontWeight: "bold",
                      color: "#25282B",
                    },
                  ]}
                >
                  {x}
                </Text>
              ))}
            </View>
            <View style={styles.TextContainerRight}>
              {dataValue?.map((x, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    onPress(dataKey[i]);
                    updateClickStatus(i);
                    teamAttendance
                      ? updateModalDateForTeam()
                      : updateModalDateForMyAttendance();
                  }}
                >
                  <Text
                    style={[
                      styles.CounterText,
                      { fontSize: w * 0.04, fontWeight: "600" },
                      ColorStatus(dataKey[i]),
                    ]}
                  >
                    {x}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AttendanceCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  Top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  Bottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -50,
    width: "100%",
  },
  BottomRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
    height: "100%",
    marginLeft: 20,
  },
  CounterText: {
    paddingBottom: 5,
  },
  TextContainerLeft: {
    width: "70%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  TextContainerRight: {
    width: "30%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
