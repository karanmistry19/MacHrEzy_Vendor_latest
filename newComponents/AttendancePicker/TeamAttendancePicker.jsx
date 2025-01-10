import moment from "moment";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import {
  fetchAttendanceSummary,
  fetchTeamAttendanceSummary,
  fetchTeamAttendanceSummaryDetails,
} from "../../redux/actions/attendance.action";
import { addError } from "../../redux/actions/toast.action";

import FilterComponent from "../../components/filter/filter";
import { formatDate } from "../../components/utils";

function mobileBackGround(width) {
  if (Platform.OS == "android") {
    return {
      backgroundColor: "#C7BEF0",
      borderRadius: 20,
      width: width * 1.1,
      height: width / 3,
      border: "none",
    };
  }
}
function mobileDropDowntext() {
  if (Platform.OS == "android") {
    return {
      fontSize: 16,
    };
  }
}
function WebAndroidBackGround(fontSize) {
  if (Platform.OS == "web") {
    return { padding: fontSize * 0.5 };
  } else if (Platform.OS == "android") {
    return {
      padding: fontSize * 0.5,
    };
  }
}
function TextSize() {
  if (Platform.OS == "android") {
    return { fontSize: 12 };
  }
  return { fontSize: 10 };
}
function TeamAttendancePicker({
  width = "100%",
  height = 400,
  addError,
  fetchAttendanceSummary,
  fetchTeamAttendanceSummary,
  fetchTeamAttendanceSummaryDetails,
  onTeamAttendanceSummaryDateChange,
  setModalDate,
  date,
  setDate,
  fontSize,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(String(new Date().getMonth()));
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    let currentDate = new Date(),
      eventFromDate,
      eventToDate;
    eventFromDate = moment(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (currentDate.getDate() > 15 ? 0 : -1),
        16,
        12
      )
    ).format("YYYY-MM-DD");
    eventToDate = moment(new Date()).format("YYYY-MM-DD");
    setVariables([eventFromDate, eventToDate]);
  }, []);

  const fetchTeamAttendanceSum = (vv) => {
    fetchTeamAttendanceSummary({
      eventFromDate: formatDate(vv.value, "YYYY-MM-DD"),
      eventToDate: formatDate(vv.value, "YYYY-MM-DD"),
    });
    fetchTeamAttendanceSummaryDetails({
      eventFromDate: formatDate(vv.value, "YYYY-MM-DD"),
      eventToDate: formatDate(vv.value, "YYYY-MM-DD"),
    });
    setDate(vv.value);
    setModalDate(`${moment(new Date(vv.value)).format("DD/MM/yyyy")}`);
    if (onTeamAttendanceSummaryDateChange)
      onTeamAttendanceSummaryDateChange(vv.value);
  };

  return (
    <View
      style={[
        WebAndroidBackGround(fontSize),
        styles.DropdownButtonContainer,
        { width: width },
      ]}
    >
      <FilterComponent
        type={"date"} //dateRange
        filterConfig={{
          value: date, //variables
        }}
        onFilterChange={(vv) => fetchTeamAttendanceSum(vv)}
        addError={addError}
        fontSize={fontSize}
        viewType="card"
      />
    </View>
  );
}
const mapStateToProps = ({ user }) => ({
  user,
});
export default connect(mapStateToProps, {
  fetchAttendanceSummary,
  fetchTeamAttendanceSummary,
  addError,
  fetchTeamAttendanceSummaryDetails,
})(TeamAttendancePicker);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#C7BEF0",
  },
  dropdownContainerLabel: {
    fontSize: 12,
    paddingBottom: 5,
  },
  selectedLabel: {
    fontWeight: "bold",
  },
  Dropdowncontainer: {
    marginTop: 40,
    backgroundColor: "white",
    paddingTop: 5,
    paddingLeft: 10,
    color: "#C7BEF0",
  },
  DropdownButtonContainer: {
    backgroundColor: "#C7BEF0",
    borderRadius: 20,
    // paddingHorizontal: 10,
    color: "white",
    // height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  dropDownlabel: {
    color: "black",
    fontSize: 12,
    fontWeight: "500",
  },
});
