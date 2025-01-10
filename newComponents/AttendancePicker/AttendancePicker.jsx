import React, { useState } from "react";
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
function AttendancePicker({
  width = "100%",
  height = 400,
  addError,
  fetchAttendanceSummary,
  fetchTeamAttendanceSummary,
  fetchTeamAttendanceSummaryDetails,
  onAttendanceSummaryDateChange,
  variables,
  setVariables,
  updateVariable,
  fontSize,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(String(new Date().getMonth()));
  const [date, setDate] = useState(new Date());
  const fetchAttendanceSum = (vv) => {
    fetchAttendanceSummary({
      eventFromDate: formatDate(vv.value[0], "YYYY-MM-DD"),
      eventToDate: formatDate(vv.value[1], "YYYY-MM-DD"),
    });
    updateVariable(vv);
    if (onAttendanceSummaryDateChange) onAttendanceSummaryDateChange(vv.value);
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
        type={"dateRange"}
        filterConfig={{
          value: variables,
        }}
        onFilterChange={(vv) => fetchAttendanceSum(vv)}
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
})(AttendancePicker);

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
