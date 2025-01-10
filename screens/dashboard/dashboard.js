import React, { useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

import { connect } from "react-redux";
import HolidayList from "../../components/holidayListModal/holidayList.narrow";
import { NotificationList } from "../../components/notification-list";
import { SecondDrawer } from "../../navigation/appStack";
import {
  bdayCrrntMonth,
  newJoin,
  removeMultipleUploadResult,
} from "../../redux/actions/dashboard.action";
import {
  dwrApplicationCount,
  dwrApprovalPending,
  dwrPendingDetails,
} from "../../redux/actions/dwr.action";
import { fetchHolidays } from "../../redux/actions/holiday.action";
import { fetchLeave } from "../../redux/actions/leave.action";
import {
  clearNotifications,
  fetchNotifications,
  markAsRead,
  seenAllNotifications,
} from "../../redux/actions/notifications.action";
import { sendMessage } from "../../redux/actions/sendMessage.action";
import DwrView from "../dwr/dwr-view";
import { NotificationView } from "../notification/notification";
import { SQLDataView } from "../sql-data/sql-data";
import DashboardNarrow from "./dashboard.narrow";
import DashboardWide from "./dashboard.wide";

import moment from "moment";
import { DimensionContext } from "../../components/dimensionContext";
import {
  fetchAttendance,
  fetchAttendanceSummary,
  fetchTeamAttendanceSummary,
  fetchTeamAttendanceSummaryDetails,
} from "../../redux/actions/attendance.action";
import {
  findMyPendingTransaction,
  findTeamPendingTransaction,
} from "../../redux/actions/transaction.action";
import OdApplication from "../od-application/od-app";
import SelectedOdApp from "../od-application/od-selected-details";

import AttendanceSummary from "../../components/regularizeComponent/regularize";
import TeamAttendanceSummary from "../../components/teamAttendanceComponent/teamAttendance";
import Attendance from "../attendance/attendance";
import AttendanceSelected from "../attendance/selected-attendance";
import Calendar from "../calendar/calendar";
import CalendarData from "../calendar/calendarData";
import checkin from "../CheckIn/checkin";
import CompOff from "../comp-off/comp-off";
import CompOffSelected from "../comp-off/comp-off-selected";
import CompensationStack from "../compensation/compensationStack";
import EisStack from "../EIS/eisStack";
import EisWebScreen from "../EIS/eisWebScreen";
import Leave from "../leave/leave";
import SelectedLeaveApp from "../leave/selected-leave";
import CreateOD from "../od-application/addNewOd";
import Shift from "../shift/shift";
import ShiftSelected from "../shift/shift-selected";
import NewTour from "../tour/add-new-tour";
import SelectedTourApp from "../tour/selected-tour";
import Tour from "../tour/tour";
const Dashboard = ({
  notifications,
  fetchNotifications,
  seenAllNotifications,
  clearNotifications,
  markAsRead,
  user,
}) => {
  const { window } = useContext(DimensionContext);
  return (
    <SecondDrawer.Navigator
      drawerPosition={"right"}
      drawerContent={() => (
        <View style={{ margin: 10 }}>
          <NotificationList
            macleods={true}
            data={notifications}
            refreshHandler={fetchNotifications}
            seenAllNotifications={seenAllNotifications}
            clearNotifications={clearNotifications}
            markAsRead={markAsRead}
            user={user}
          ></NotificationList>
        </View>
      )}
    >
      <SecondDrawer.Screen
        name="home"
        options={{ title: "Dashboard" }}
        component={DashboardView}
      />
      <SecondDrawer.Screen
        name="dwr"
        options={{ title: "DWR" }}
        component={DwrView}
      />
      <SecondDrawer.Screen
        name="notification"
        options={{ title: "Notification" }}
        component={NotificationView}
      />
      <SecondDrawer.Screen
        name="sql-data"
        options={{ title: "SQL-Data" }}
        component={SQLDataView}
      />
      <SecondDrawer.Screen
        name="holiday-list"
        component={HolidayList}
        options={{ headerShown: false }}
      />

      <SecondDrawer.Screen
        name="on-duty-application"
        component={OdApplication}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="create-od"
        component={CreateOD}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="selected-od-app"
        component={SelectedOdApp}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="selected-leave-app"
        component={SelectedLeaveApp}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="leave"
        component={Leave}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="shift"
        component={Shift}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="selected-shift"
        component={ShiftSelected}
        options={{ headerShown: false }}
      />

      <SecondDrawer.Screen
        name="tour"
        component={Tour}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="new-tour"
        component={NewTour}
        options={{ headerShown: false }}
      />

      <SecondDrawer.Screen
        name="selected-tour-app"
        component={SelectedTourApp}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="comp-off"
        component={CompOff}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="comp-off-selected"
        component={CompOffSelected}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="calendar"
        component={Calendar}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="attendance"
        component={Attendance}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="attendance-selected"
        component={AttendanceSelected}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="checkindetails"
        component={checkin}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="calendar-data"
        component={CalendarData}
        options={{ headerShown: false }}
      />

      <SecondDrawer.Screen
        name="employee-info"
        component={window.width < 600 ? EisStack : EisWebScreen}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="team-attendance"
        component={TeamAttendanceSummary}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="my-attendance"
        component={AttendanceSummary}
        options={{ headerShown: false }}
      />
      <SecondDrawer.Screen
        name="compensation"
        component={CompensationStack}
        options={{ headerShown: false }}
      />
    </SecondDrawer.Navigator>
  );
};

const mapStateToProps = ({
  messages,
  notifications,
  user,
  multipleUploadResult,
}) => ({
  messages,
  notifications,
  user,
  multipleUploadResult,
});
const DashboardView = connect(mapStateToProps, {
  sendMessage,
  fetchNotifications,
  bdayCrrntMonth,
  newJoin,
  dwrPendingDetails,
  dwrApplicationCount,
  dwrApprovalPending,
  fetchHolidays,
  fetchLeave,
  fetchTeamAttendanceSummary,
  fetchAttendanceSummary,
  fetchAttendance,
  findMyPendingTransaction,
  findTeamPendingTransaction,
  removeMultipleUploadResult,
  fetchTeamAttendanceSummaryDetails,
})(({
  messages,
  sendMessage,
  navigation,
  bdayCrrntMonth,
  newJoin,
  dwrPendingDetails,
  dwrApplicationCount,
  dwrApprovalPending,
  fetchHolidays,
  fetchLeave,
  fetchTeamAttendanceSummary,
  fetchAttendanceSummary,
  fetchAttendance,
  findMyPendingTransaction,
  findTeamPendingTransaction,
  multipleUploadResult,
  removeMultipleUploadResult,
  fetchTeamAttendanceSummaryDetails,
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
    eventToDate = moment(new Date()).format("YYYY-MM-DD");
    fetch();
  }, []);

  const [attendanceSummaryFrom, setAttendanceSummaryFrom] = useState(
    moment(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + (new Date().getDate() > 15 ? 0 : -1),
        16,
        12
      )
    ).format("YYYY-MM-DD")
  );

  const [attendanceSummaryTill, setAttendanceSummaryTill] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [attendanceFrom, setAttendanceFrom] = useState(
    moment(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + (new Date().getDate() > 15 ? 0 : -1),
        16,
        12
      )
    ).format("YYYY-MM-DD")
  );

  const [attendanceTill, setAttendanceTill] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [teamAttendanceDate, setTeamAttendanceDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const fetch = () => {
    bdayCrrntMonth();
    newJoin();
    dwrPendingDetails();
    dwrApplicationCount();
    dwrApprovalPending();
    fetchHolidays();
    fetchLeave();

    fetchTeamAttendanceSummary({
      eventFromDate: teamAttendanceDate,
      eventToDate: teamAttendanceDate,
    });
    fetchTeamAttendanceSummaryDetails({
      eventFromDate: teamAttendanceDate,
      eventToDate: teamAttendanceDate,
    });
    fetchAttendanceSummary({
      eventFromDate: attendanceSummaryFrom,
      eventToDate: attendanceSummaryTill,
    });
    fetchAttendance({
      eventFromDate: attendanceFrom,
      eventToDate: attendanceTill,
    });

    findMyPendingTransaction();
    findTeamPendingTransaction();
  };

  const dimension = useWindowDimensions();

  return (
    <ScrollView
      style={{
        marginLeft: dimension.width < 700 ? 0 : 10,
        right: dimension.width < 700 ? 3 : null,
      }}
      scrollEnabled={true}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={false} onRefresh={fetch} />}
    >
      {dimension.width > 550 ? (
        <DashboardWide
          messages={messages}
          sendMessage={sendMessage}
          onAttendanceSummaryDateChange={(v) => {
            setAttendanceSummaryFrom(moment(v[0]).format("YYYY-MM-DD"));
            setAttendanceSummaryTill(moment(v[1]).format("YYYY-MM-DD"));
          }}
          onTeamAttendanceSummaryDateChange={(v) => {
            setTeamAttendanceDate(moment(v).format("YYYY-MM-DD"));
          }}
          onAttendanceDateChange={(v) => {
            setAttendanceFrom(moment(v[0]).format("YYYY-MM-DD"));
            setAttendanceTill(moment(v[1]).format("YYYY-MM-DD"));
          }}
          navigation={navigation}
        />
      ) : (
        <DashboardNarrow
          messages={messages}
          sendMessage={sendMessage}
          navigation={navigation}
          onAttendanceSummaryDateChange={(v) => {
            setAttendanceSummaryFrom(moment(v[0]).format("YYYY-MM-DD"));
            setAttendanceSummaryTill(moment(v[1]).format("YYYY-MM-DD"));
          }}
          onTeamAttendanceSummaryDateChange={(v) => {
            setTeamAttendanceDate(moment(v).format("YYYY-MM-DD"));
          }}
          onAttendanceDateChange={(v) => {
            setAttendanceFrom(moment(v[0]).format("YYYY-MM-DD"));
            setAttendanceTill(moment(v[1]).format("YYYY-MM-DD"));
          }}
        />
      )}
    </ScrollView>
  );
});

export default connect(mapStateToProps, {
  sendMessage,
  fetchNotifications,
  bdayCrrntMonth,
  newJoin,
  dwrPendingDetails,
  dwrApplicationCount,
  dwrApprovalPending,
  fetchHolidays,
  seenAllNotifications,
  clearNotifications,
  markAsRead,
  fetchLeave,
  removeMultipleUploadResult,
})(Dashboard);
