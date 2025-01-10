import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

// import { Linking } from "react-native";
import {
  Agenda,
  Day,
  Inject,
  Month,
  ResourceDirective,
  ResourcesDirective,
  ScheduleComponent,
  Week,
  WorkWeek,
} from "@syncfusion/ej2-react-schedule";
import moment from "moment";
import { connect } from "react-redux";
import "../App.css";
import { fetchAttendanceCalendar } from "../redux/actions/calendar.action";
const AttendanceCalendar = ({
  fetchAttendanceCalendar,
  attendanceCalendar,
  user,
}) => {
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
    fetchAttendanceCalendar({
      empCode: "H014794",
      eventDate: eventFromDate,
      toDate: moment(new Date()).format("YYYY-MM-DD"),
    });
  }, []);
  const calendarData = attendanceCalendar.map((e, i) => {
    return e.dayStatus != null
      ? {
          id: i,
          Subject: e.dayStatus,
          StartTime: new Date(e.eventDate),
          EndTime: new Date(e.eventDate),
          ResourceId: i,
          Id: i,
          Name: e.empName,
          Color: e.bgColor === "#FFFFFF" ? "grey" : e.bgColor,
        }
      : [
          {
            id: i,
            Subject: e.inTime,
            StartTime: new Date(e.eventDate),
            EndTime: new Date(e.eventDate),
            ResourceId: i,
            Id: i,
            Name: e.empName,
            Color: e.bgColor === "#FFFFFF" ? "grey" : e.bgColor,
          },
          {
            id: i,
            Subject: e.outTime,
            StartTime: new Date(e.eventDate),
            EndTime: new Date(e.eventDate),
            ResourceId: i,
            Id: i,
            Name: e.empName,
            Color: e.bgColor === "#FFFFFF" ? "grey" : e.bgColor,
          },
          {
            id: i,
            Subject: e.totalMinutes,
            StartTime: new Date(e.eventDate),
            EndTime: new Date(e.eventDate),
            ResourceId: i,
            Id: i,
            Name: e.empName,
            Color: e.bgColor === "#FFFFFF" ? "grey" : e.bgColor,
          },
        ];
  });

  return (
    <View style={styles.container}>
      <ScheduleComponent
        eventSettings={{
          dataSource: calendarData.flat(),
          allowAdding: false,
          allowEditing: false,
          allowDeleting: false,
        }}
        currentView={"Month"}
      >
        <ResourcesDirective>
          <ResourceDirective
            dataSource={calendarData.flat()}
            colorField="Color"
            idField="Id"
            textField="Name"
            title="Resouce Name"
            name="Resources"
            field="ResourceId"
          ></ResourceDirective>
        </ResourcesDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}></Inject>
      </ScheduleComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "33%",
    height: "33%",
  },
});
const mapStateToProps = ({ attendanceCalendar, user }) => ({
  attendanceCalendar,
  user,
});
export default connect(mapStateToProps, {
  fetchAttendanceCalendar,
})(AttendanceCalendar);
