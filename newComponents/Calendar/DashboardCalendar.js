import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import {
  fetchAttendance,
  fetchAttendanceDaywise,
  fetchAttendanceSummary,
} from "../../redux/actions/attendance.action";
import { fetchDateSummary } from "../../redux/actions/calendar.action";

function calendarWidth(w) {
  return {
    width: w,
    // height:300//when height is present, it refactors and zoom out and looks like padding in bottom
  };
}
function DashboardCalendar({
  attendanceSummary,
  w = "100%",
  fetchAttendance,
  fetchAttendanceSummary,
  fetchDateSummary,
  fetchAttendanceDaywise,
  user,
  attendanceDaywise,
}) {
  const [width, setWidth] = useState(w);
  function find_dimesions(layout) {
    const { x, y, width, height } = layout;
    setWidth(width);
  }
  const [state, setState] = useState({
    selectedStartDate: null,
  });

  function onDateChange(date) {
    setState({
      selectedStartDate: date,
    });
  }
  const { selectedStartDate } = state;

  const startDate = selectedStartDate ? selectedStartDate.toString() : "";
  const [customDateStyles, setcustomDateStyles] = useState([]);
  useEffect(() => {
    let DatesStyles = [];
    let today = moment(
      new Date(
        new Date(
          new Date(new Date(new Date().setDate(1)).setHours(0)).setMinutes(0),
        ).setSeconds(0),
      ),
    );
    let day = today.clone().startOf("month");
    attendanceDaywise.map((item, i) => {
      if (
        new Date(item.StartTime).toDateString() !== new Date().toDateString()
      ) {
        let obj = {
          textStyle: { color: "#075905", fontWeight: "600" }, // sets the font color
          containerStyle: [], // extra styling for day container
          allowDisabled: true,
          style: {},
          date: moment(attendanceDaywise[i].StartTime).clone(),
        };
        if (item.Subject === "Day: 0.5") {
          obj.style["backgroundColor"] = "#FEFFDD";
          DatesStyles.push(obj);
        } else if (item.Subject === "Day: 1") {
          obj.style["backgroundColor"] = "#D7ECD9";
          DatesStyles.push(obj);
        } else if (item.Subject === "Absent") {
          obj.style["backgroundColor"] = "#FFDDE5";
          // obj.textStyle.color='white'
          DatesStyles.push(obj);
        }
      }
    });
    setcustomDateStyles(() => DatesStyles);
  }, [attendanceDaywise]);
  useEffect(() => {
    let today = moment(
      new Date(
        new Date(
          new Date(new Date(new Date().setDate(1)).setHours(0)).setMinutes(0),
        ).setSeconds(0),
      ),
    );
    updateMonth(today);
  }, []);
  function updateMonth(today) {
    let day = today.clone().startOf("month");
    let endday = today.clone().endOf("month");
    let Start = today.clone()._d;
    let End = endday.clone()._d;
    fetchAttendanceDaywise({ user: user, StartDate: Start, EndDate: End });
  }
  function updateCalendarAttedance(current) {
    let result = updateMonth(current);
    setcustomDateStyles(() => result);
  }
  return (
    <View
      style={[
        styles.container,
        {
          width: w,
        },
      ]}
      onLayout={(event) => {
        find_dimesions(event.nativeEvent.layout);
      }}
    >
      <CalendarPicker
        onDateChange={onDateChange}
        todayTextStyle={{ fontWeight: "bold" }}
        todayBackgroundColor={"#1294F2"}
        customDatesStyles={customDateStyles}
        textStyle={
          {
            // fontSize: w
          }
        }
        onMonthChange={updateCalendarAttedance}
        scrollable={false} //when it is true, month jumps to one more
        width={width}
        previousComponent={<Icon name="chevron-left" />}
        nextComponent={<Icon name="chevron-right" />}
        // {...calendarWidth(w)}
      />
    </View>
  );
}

const mapStateToProps = ({ user, attendanceSummary, attendanceDaywise }) => ({
  user,
  attendanceSummary,
  attendanceDaywise,
});
export default connect(mapStateToProps, {
  fetchAttendance,
  fetchAttendanceSummary,
  fetchDateSummary,
  fetchAttendanceDaywise,
})(DashboardCalendar);
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
});
