import moment from "moment";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { connect } from "react-redux";
import {
  fetchAttendanceSummary,
  fetchTeamAttendanceSummary,
  fetchTeamAttendanceSummaryDetails,
} from "../../redux/actions/attendance.action";
import { addError } from "../../redux/actions/toast.action";

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
function WebBackGround() {
  if (Platform.OS == "web") {
    return styles.DropdownButtonContainer;
  }
}
function TextSize() {
  if (Platform.OS == "android") {
    return { fontSize: 12 };
  }
  return { fontSize: 10 };
}
function DropDown({
  data,
  width = 100,
  height = 400,
  addError,
  fetchAttendanceSummary,
  fetchTeamAttendanceSummary,
  fetchTeamAttendanceSummaryDetails,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(String(new Date().getMonth()));
  const [items, setItems] = useState(data);
  const [variables, setVariables] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let currentDate = new Date(),
      eventFromDate,
      eventToDate;
    eventFromDate = moment(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (currentDate.getDate() > 15 ? 0 : -1),
        16,
        12,
      ),
    ).format("YYYY-MM-DD");
    eventToDate = moment(new Date()).format("YYYY-MM-DD");
    setVariables([eventFromDate, eventToDate]);
  }, []);
  const fetchAttendanceSum = (vv) => {
    fetchAttendanceSummary({
      eventFromDate: formatDate(vv.value[0], "YYYY-MM-DD"),
      eventToDate: formatDate(vv.value[1], "YYYY-MM-DD"),
    });

    setVariables([vv.value[0], vv.value[1]]);
    if (onAttendanceSummaryDateChange) onAttendanceSummaryDateChange(vv.value);
  };
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
    if (onTeamAttendanceSummaryDateChange)
      onTeamAttendanceSummaryDateChange(vv.value);
  };

  return (
    <View
      style={[
        WebBackGround(),
        {
          width: width,
          height: height,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <DropDownPicker
        style={[styles.container, mobileBackGround(width)]}
        open={open}
        value={value}
        items={items}
        showArrowIcon={true}
        placeholder=""
        showTickIcon={false}
        listItemLabelStyle={styles.dropdownContainerLabel}
        selectedItemLabelStyle={styles.selectedLabel}
        dropDownContainerStyle={[
          styles.Dropdowncontainer,
          {
            width: width * 1.5,
            backgroundColor: "#FFFFFF",
            borderColor: "#D2C9F9",
            borderWidth: 2,
          },
        ]}
        listParentLabelStyle={{
          color: "black",
          fontWeight: "600",
          ...mobileDropDowntext(),
        }}
        textStyle={styles.dropDownlabel}
        // ArrowDownIconComponent={()=>customComp()}//****************ArrowUpIconComponent need to be added after finding svg icons.. here icons are images. not able to change color
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
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
})(DropDown);

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
    paddingHorizontal: 10,
    color: "white",
  },
  dropDownlabel: {
    color: "black",
    fontSize: 12,
    fontWeight: "500",
  },
});
